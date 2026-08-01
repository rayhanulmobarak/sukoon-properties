import React, { useState } from 'react';
import { Property } from '../../types';
import { X, Sparkles, Send, Bot, User, Building2, MapPin, ChevronRight } from 'lucide-react';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  properties,
  onSelectProperty,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; property?: Property }>>([
    {
      sender: 'ai',
      text: 'Assalamu Alaikum! I am Sukoon AI, your real estate & property matchmaker for Sukoon Properties Ltd. Ask me anything about Purbachal Smart City plots, Gulshan apartments, RAJA clearance, or bKash payment plans.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg }),
      });
      const data = await res.json();
      
      let matchedProp: Property | undefined = undefined;
      if (userMsg.toLowerCase().includes('purbachal') || userMsg.toLowerCase().includes('katha')) {
        matchedProp = properties.find(p => p.district === 'Purbachal');
      } else if (userMsg.toLowerCase().includes('gulshan') || userMsg.toLowerCase().includes('duplex')) {
        matchedProp = properties.find(p => p.district === 'Gulshan');
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.text || 'Sukoon Properties offers 100% RAJA mutated land in Purbachal Sector 22 & Gulshan 2 Luxury Duplexes. Would you like me to reserve a VIP site visit with Director Rayhanul Mobarak?',
          property: matchedProp,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Sukoon Properties Ltd. offers guaranteed RAJA approved plots in Purbachal Smart City and Gulshan Executive Duplexes. Contact Director Rayhanul Mobarak at sukoonpropertiesltd@gmail.com or +880 1913-780386.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FDFCF8] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#E5E5DF] text-[#2D2926]">
        {/* Drawer Header */}
        <div className="bg-[#5A5A40] text-white p-4 px-6 flex items-center justify-between shadow">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#8C715E] text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-[#FDFCF8]">Sukoon AI Advisor</h3>
              <p className="text-[10px] text-[#E5E5DF]">Gemini Powered Property Matchmaker</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#E5E5DF] hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#5A5A40] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl leading-relaxed space-y-2 ${
                  m.sender === 'user'
                    ? 'bg-[#8C715E] text-white rounded-tr-none'
                    : 'bg-[#F5F5F0] text-[#2D2926] border border-[#E5E5DF] rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>
                {m.property && (
                  <div
                    onClick={() => {
                      onSelectProperty(m.property!);
                      onClose();
                    }}
                    className="bg-white p-2.5 rounded-xl border border-[#E5E5DF] cursor-pointer hover:border-[#5A5A40] transition space-y-1 mt-2 text-[#2D2926]"
                  >
                    <div className="font-serif font-bold text-xs text-[#5A5A40]">{m.property.title}</div>
                    <div className="text-[10px] text-[#8C8C7F]">{m.property.location}</div>
                    <div className="font-serif font-bold text-xs text-[#8C715E]">{m.property.priceFormatted}</div>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-[#8C715E] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  U
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#8C8C7F] italic">
              <Sparkles className="w-4 h-4 text-[#5A5A40] animate-spin" />
              <span>Analyzing Purbachal & Gulshan listings...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-3 bg-[#F5F5F0] border-t border-[#E5E5DF] flex flex-wrap gap-2 text-[10px]">
          <button
            onClick={() => {
              setInput('What is the price of 5 Katha plot in Purbachal?');
            }}
            className="px-2.5 py-1 bg-white border border-[#E5E5DF] rounded-full text-[#5A5A40] hover:bg-[#E5E5DF] transition"
          >
            Purbachal 5 Katha Price?
          </button>
          <button
            onClick={() => {
              setInput('How to pay via bKash installment?');
            }}
            className="px-2.5 py-1 bg-white border border-[#E5E5DF] rounded-full text-[#5A5A40] hover:bg-[#E5E5DF] transition"
          >
            bKash Payment Plan?
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#E5E5DF] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Sukoon AI..."
            className="flex-grow bg-[#F5F5F0] border border-[#E5E5DF] rounded-xl px-3 py-2 text-xs text-[#2D2926] focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#5A5A40] hover:bg-[#484833] text-white rounded-xl text-xs font-bold transition flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
