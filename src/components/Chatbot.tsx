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
    if (!messageText.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user', content: messageText } as Message];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      
      if (!apiKey) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: 'Error: La API Key no está configurada. Por favor configura VITE_GEMINI_API_KEY en tu archivo .env' 
        }]);
        setIsLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash', 
      });

      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      const finalPrompt = `${PORTFOLIO_CONTEXT}\n\nPregunta del usuario: ${messageText}`;

      const result = await chat.sendMessageStream(finalPrompt);
      
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
    } catch (error: any) {
      console.error('Error DETALLADO al generar respuesta:', error); 
      let errorMessage = 'Lo siento, ha ocurrido un error al procesar tu solicitud.';
      
      if (error.message) {
        errorMessage += ` Detalles: ${error.message}`;
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
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[600px] w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            AI Assistant <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pregúntame sobre el perfil de Heber
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50 dark:bg-gray-900/50 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-8 px-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center animate-bounce duration-[2000ms]">
                <MessageSquare className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">¡Hola! Soy el asistente virtual.</p>
                <p className="text-sm">Selecciona una pregunta o escribe la tuya.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  className="p-3 text-sm text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium">
                    {question}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
              message.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                  : 'bg-gradient-to-br from-purple-500 to-purple-600'
              }`}
            >
              {message.role === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-sm ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-sm'
              }`}
            >
              <div className="markdown-body text-sm md:text-base leading-relaxed">
                {message.role === 'model' ? (
                   <div className="prose dark:prose-invert max-w-none prose-sm prose-p:my-1 prose-headings:my-2 prose-strong:text-purple-600 dark:prose-strong:text-purple-400">
                     <ReactMarkdown 
                       components={{
                         p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                         ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                         li: ({node, ...props}) => <li className="mb-0" {...props} />,
                         strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
                         a: ({node, ...props}) => <a className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
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
             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center animate-pulse">
                <Bot className="w-5 h-5 text-white" />
             </div>
             <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-700 flex items-center gap-2 shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Escribiendo...</span>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta aquí..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 min-w-[100px]"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Enviar</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};


export default Chatbot;
