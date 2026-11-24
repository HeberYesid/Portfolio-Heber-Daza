import { MAX_HISTORY, MAX_QUESTION_LENGTH, MAX_REPLY_LENGTH, type ChatTurn } from '../src/utils/chatContract';
import { PORTFOLIO_CONTEXT } from '../src/utils/portfolioContext';

const MAX_BODY_BYTES = 80 * 1024;
const WINDOW_MS = 60_000;
const REQUESTS_PER_WINDOW = 12;
const TOTAL_TIMEOUT_MS = 8_000;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_PRIMARY = 'recursive/flint-v1.0:free';

type Provider = {
  url: string;
  key: string;
  kind: 'groq' | 'openrouter' | 'gemini';
  model: string;
  quota: { pausedUntil: number };
};

function provider(kind: Provider['kind'], key: string | undefined, url: string, ...models: string[]): Provider[] {
  const quota = { pausedUntil: 0 };
  return key?.trim() ? models.map(model => ({ kind, key: key.trim(), url, model, quota })) : [];
}

function providerRequest(target: Provider, turns: ChatTurn[]): { headers: Record<string, string>; body: object } {
  if (target.kind === 'gemini') return {
    headers: { 'x-goog-api-key': target.key },
    body: {
      systemInstruction: { parts: [{ text: PORTFOLIO_CONTEXT }] },
      contents: turns.map(({ role, content }) => ({ role, parts: [{ text: content }] })),
      generationConfig: { maxOutputTokens: 1024 },
    },
  };

  return {
    headers: { Authorization: `Bearer ${target.key}` },
    body: {
      model: target.model,
      messages: [{ role: 'system', content: PORTFOLIO_CONTEXT }, ...turns.map(({ role, content }) => ({
        role: role === 'model' ? 'assistant' : 'user', content,
      }))],
      ...(target.kind === 'groq'
        ? { max_completion_tokens: 768, reasoning_effort: 'low', include_reasoning: false }
        : { max_tokens: 1024 }),
    },
  };
}

function providerAnswer(kind: Provider['kind'], data: unknown) {
  const result = data as {
    choices?: Array<{ finish_reason?: string; message?: { content?: unknown; refusal?: unknown } }>;
    candidates?: Array<{ finishReason?: string; content?: { parts?: Array<{ text?: string; thought?: boolean }> } }>;
    promptFeedback?: { blockReason?: string };
  } | null;
  if (kind === 'gemini') {
    const candidate = result?.candidates?.[0];
    if (result?.promptFeedback?.blockReason || candidate?.finishReason === 'SAFETY') return { blocked: true };
    if (candidate?.finishReason !== 'STOP') return {};
    return { answer: candidate.content?.parts?.filter(part => !part.thought).map(part => part.text ?? '').join('').trim() };
  }
  const choice = result?.choices?.[0];
  if (choice?.finish_reason === 'content_filter' || choice?.message?.refusal) return { blocked: true };
  const content = choice?.message?.content;
  return choice?.finish_reason === 'stop' && typeof content === 'string' ? { answer: content.trim() } : {};
}

function quotaResume(headers: Headers, now: number) {
  const retryAfter = headers.get('Retry-After');
  const seconds = retryAfter === null ? NaN : Number(retryAfter);
  const retryAt = Number.isFinite(seconds) ? now + seconds * 1000 : Date.parse(retryAfter ?? '');
  const resetAt = Number(headers.get('X-RateLimit-Reset'));
  return Math.max(now + 1000, retryAt || 0, resetAt || 0, retryAt || resetAt ? 0 : now + WINDOW_MS);
}

export interface ChatEnv {
  GROQ_API_KEY?: string;
  OPENROUTER_API_KEY?: string;
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
}

function json(status: number, body: object, headers?: Record<string, string>) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

async function readBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = '';
  for (let chunk = await reader.read(); !chunk.done; chunk = await reader.read()) {
    const { value } = chunk;
    bytes += value.byteLength;
    if (bytes > MAX_BODY_BYTES) {
      void reader.cancel().catch(() => {});
      throw new RangeError();
    }
    text += decoder.decode(value, { stream: true });
  }
  return JSON.parse(text + decoder.decode());
}

export function createChatHandler(env: ChatEnv) {
  const geminiModel = env.GEMINI_MODEL?.trim() || 'gemini-flash-latest';
  const providers = [
    ...provider('groq', env.GROQ_API_KEY, 'https://api.groq.com/openai/v1/chat/completions', 'openai/gpt-oss-20b'),
    ...provider('openrouter', env.OPENROUTER_API_KEY, OPENROUTER_URL, OPENROUTER_PRIMARY, 'openrouter/free'),
    ...provider('gemini', env.GEMINI_API_KEY, `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(geminiModel)}:generateContent`, geminiModel),
  ];
  let windowEnd = 0;
  let requests = 0;

  return async function handleChat(request: Request): Promise<Response> {
    if (request.method !== 'POST') return json(405, { error: 'Método no permitido.' }, { Allow: 'POST' });
    if (request.headers.get('sec-fetch-site') === 'cross-site') return json(403, { error: 'Origen no permitido.' });
    if (!providers.length) return json(503, { error: 'No hay un proveedor de IA configurado.' });
    if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
      return json(415, { error: 'Se requiere JSON.' });
    }
    let body: unknown;
    try {
      body = await readBody(request);
    } catch (error) {
      return error instanceof RangeError
        ? json(413, { error: 'La solicitud es demasiado grande.' })
        : json(400, { error: 'JSON inválido.' });
    }
    const { question, history } = (body ?? {}) as { question?: unknown; history?: unknown };
    if (typeof question !== 'string' || !question.trim() || question.length > MAX_QUESTION_LENGTH
      || !Array.isArray(history) || history.length > MAX_HISTORY || history.length % 2 !== 0
      || !history.every((turn: ChatTurn, index) => turn?.role === (index % 2 === 0 ? 'user' : 'model')
        && typeof turn.content === 'string' && turn.content.trim()
        && turn.content.length <= (turn.role === 'user' ? MAX_QUESTION_LENGTH : MAX_REPLY_LENGTH))) {
      return json(400, { error: 'Pregunta o historial inválidos.' });
    }

    const now = Date.now();
    if (now >= windowEnd) {
      windowEnd = now + WINDOW_MS;
      requests = 0;
    }
    if (requests >= REQUESTS_PER_WINDOW) {
      return json(429, { error: 'El chat alcanzó su límite temporal.' }, {
        'Retry-After': String(Math.ceil((windowEnd - now) / 1000)),
      });
    }
    requests++;

    const turns: ChatTurn[] = [...history.map(({ role, content }: ChatTurn) => ({ role, content: content.slice(0, 800) })),
      { role: 'user', content: question.trim() }];
    const eligible = providers.filter(target => target.quota.pausedUntil <= now);
    for (const [index, target] of eligible.entries()) {
      const remaining = TOTAL_TIMEOUT_MS - (Date.now() - now);
      if (remaining <= 0 || target.quota.pausedUntil > Date.now()) continue;
      // Reserva tiempo para cada alternativa sin quitarle todo el margen al proveedor actual.
      const alternatives = eligible.length - index - 1;
      const timeout = Math.max(1, Math.floor(Math.max(remaining / (alternatives + 1), remaining - 3000 * alternatives)));
      try {
        const { headers, body } = providerRequest(target, turns);
        const upstream = await fetch(target.url, {
          method: 'POST', headers: { 'Content-Type': 'application/json', ...headers },
          redirect: 'error', signal: AbortSignal.timeout(timeout), body: JSON.stringify(body),
        });
        if (upstream.status === 429) target.quota.pausedUntil = quotaResume(upstream.headers, Date.now());
        if (!upstream.ok) {
          void upstream.body?.cancel().catch(() => {});
          continue;
        }
        const { answer, blocked } = providerAnswer(target.kind, await upstream.json());
        if (blocked) return json(422, { error: 'No hay una respuesta generada para esa pregunta.' });
        if (answer) return json(200, { answer: answer.slice(0, MAX_REPLY_LENGTH) });
      } catch {
        // Una red lenta o una respuesta inválida no bloquea al siguiente proveedor.
      }
    }
    const earliest = Math.min(...providers.map(target => target.quota.pausedUntil));
    if (earliest > Date.now()) return json(429, { error: 'Los proveedores alcanzaron su límite temporal.' }, {
      'Retry-After': String(Math.ceil((earliest - Date.now()) / 1000)),
    });
    return json(502, { error: 'Los proveedores no devolvieron una respuesta.' });
  };
}

export default { fetch: createChatHandler({
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: process.env.GEMINI_MODEL,
}) };
