export const MAX_QUESTION_LENGTH = 600;
export const MAX_REPLY_LENGTH = 6000;
export const MAX_HISTORY = 4;

export interface ChatTurn {
  role: 'user' | 'model';
  content: string;
}

export type ChatProvider = 'groq' | 'openrouter' | 'gemini';

export interface GeneratedChatReply {
  answer: string;
  provider: ChatProvider;
  model?: string;
}

export function isChatModelId(value: unknown): value is string {
  return typeof value === 'string' && value === value.trim()
    && /^[a-z0-9][a-z0-9./:_-]{0,127}$/i.test(value) && value.toLowerCase() !== 'openrouter/free';
}
