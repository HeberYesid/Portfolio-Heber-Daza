import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PORTFOLIO_CONTEXT } from '../utils/portfolioContext';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();

  const suggestedQuestions = [
    "¿Cuáles son tus habilidades técnicas?",
    "Háblame de tu experiencia laboral",
    "¿Qué proyectos has desarrollado?",
    "¿Cómo puedo contactarte?",
  ];

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (messageText: string) => {
    if (!apiKey || !messageText.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user', content: messageText } as Message];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-flash-latest',
      });

      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        systemInstruction: {
          role: 'user',
          parts: [{ text: PORTFOLIO_CONTEXT }],
        },
        generationConfig: {
          maxOutputTokens: 4000,
        },
      });

      const result = await chat.sendMessageStream(messageText);

      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;

        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', content: fullResponse };
          return updated;
        });
      }
    } catch (error: unknown) {
      console.error('Error DETALLADO al generar respuesta:', error);

      let errorMessage: string;

      if (error instanceof Error) {
        const msg = error.message;

        if (msg.includes('403') || msg.includes('SERVICE_DISABLED')) {
          errorMessage = 'El servicio de IA no está disponible en este momento. Esto puede deberse a mantenimiento o a que la API no está habilitada en este proyecto. Intenta de nuevo en unos minutos.';
        } else if (msg.includes('429')) {
          errorMessage = 'Has alcanzado el limite de uso gratuito de la IA por ahora. La cuota se reinicia automaticamente. Intenta de nuevo mas tarde.';
        } else if (msg.includes('404')) {
          errorMessage = 'El modelo de IA solicitado ya no esta disponible. Contacta al administrador para actualizarlo.';
        } else if (msg.includes('depleted') || msg.includes('prepayment')) {
          errorMessage = 'Los creditos de la API se han agotado. Contacta al administrador para recargarlos.';
        } else {
          errorMessage = 'Ocurrio un error inesperado al comunicarse con la IA. Intenta de nuevo en unos segundos.';
        }
      } else {
        errorMessage = 'Ocurrio un error inesperado. Intenta de nuevo.';
      }

      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: errorMessage
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  return (
    <section className="flex flex-col h-[600px] w-full">
      <span className="component-label text-trace mb-3 block">DIAGNOSTIC INTERFACE · AI CHAT</span>
      <h2 className="text-3xl lg:text-4xl font-bold text-silkscreen tracking-tight mb-8">
        Asistente IA
      </h2>

      <div className="chip-body flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-trace/10 bg-plane-ground flex items-center gap-3">
          <div className="w-9 h-9 rounded-pad bg-trace/10 border border-trace/30 flex items-center justify-center">
            <Bot className="w-5 h-5 text-trace-bright" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-silkscreen tracking-tight">
                AI Assistant
              </h3>
              <Sparkles className="w-3 h-3 text-copper animate-pulse" />
            </div>
            <p className="font-mono text-[0.625rem] text-silkscreen-dim tracking-wider">
              Pregúntame sobre el perfil de Heber
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`led-indicator ${apiKey ? 'bg-led-green animate-led-blink' : 'bg-led-amber'}`} />
            <span className="font-mono text-[0.5rem] text-silkscreen-dim tracking-[0.2em]">
              {apiKey ? 'DISPONIBLE' : 'SIN CONFIGURAR'}
            </span>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-5 bg-substrate/50 scroll-smooth"
        >
          {!apiKey ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center px-4">
              <p className="text-sm text-silkscreen-dim">El asistente no está disponible en este momento.</p>
              <a className="text-sm text-trace-bright underline" href="#contact">Ir a Contacto</a>
            </div>
          ) : messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-14 h-14 rounded-pad border-2 border-trace/20 bg-trace/5 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-trace" />
                </div>
                <div>
                  <p className="text-sm font-medium text-silkscreen mb-1">
                    ¡Hola! Soy el asistente virtual.
                  </p>
                  <p className="font-mono text-xs text-silkscreen-dim tracking-wider">
                    Selecciona una pregunta o escribe la tuya.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(question)}
                    className="p-3 text-xs text-left font-mono bg-substrate-raised border border-via-ring/30 rounded-pad hover:border-trace/50 hover:bg-trace/5 transition-all duration-200 text-silkscreen-dim hover:text-trace-bright tracking-wider"
                  >
                    {'> '}{question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-pad flex items-center justify-center border ${
                  message.role === 'user'
                    ? 'bg-trace/10 border-trace/30'
                    : 'bg-copper/10 border-copper/30'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-trace" />
                ) : (
                  <Bot className="w-4 h-4 text-copper" />
                )}
              </div>

              <div
                className={`max-w-[80%] rounded-component px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-trace/10 border border-trace/20 text-silkscreen'
                    : 'bg-substrate-raised border border-via-ring/20 text-silkscreen'
                }`}
              >
                <div className="text-sm leading-relaxed">
                  {message.role === 'model' ? (
                    <div className="prose-invert max-w-none text-sm prose-p:my-1 prose-headings:my-2 prose-strong:text-copper prose-a:text-trace-bright prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-code:text-trace">
                      <ReactMarkdown
                        components={{
                          p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          ul: ({...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                          li: ({...props}) => <li className="mb-0" {...props} />,
                          strong: ({...props}) => <strong className="font-bold text-silkscreen" {...props} />,
                          a: ({...props}) => <a className="text-trace-bright hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-pad bg-copper/10 border border-copper/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-copper" />
              </div>
              <div className="bg-substrate-raised border border-via-ring/20 rounded-component px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-trace" />
                <span className="font-mono text-xs text-silkscreen-dim tracking-wider">PROCESANDO...</span>
              </div>
            </div>
          )}
        </div>

        {apiKey && <div className="p-4 bg-substrate-raised border-t border-trace/10">
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
            <div className="min-w-0 flex-1">
              <input
                type="text"
                aria-label="Pregunta para el asistente"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta aquí..."
                className="w-full px-4 py-2.5 rounded-pad border border-via-ring/30 bg-substrate text-base sm:text-sm text-silkscreen placeholder:text-silkscreen-dim focus:border-trace/50 transition-colors font-mono tracking-wider"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 bg-trace/10 border border-trace/30 text-trace-bright font-mono text-xs tracking-wider rounded-pad hover:bg-trace/15 hover:border-trace/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>ENVIAR</span>
                  <Send className="w-3 h-3" />
                </>
              )}
            </button>
          </form>
        </div>}
      </div>
    </section>
  );
};

export default Chatbot;
