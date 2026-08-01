import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Phone, Sparkles, User, ExternalLink } from 'lucide-react';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string; time: string }[]>([
    {
      sender: 'bot',
      text: 'Assalamu Alaikum! Welcome to Sukoon Properties Ltd. Director Rayhanul Mobarak’s support team is online. How may I assist your property search in Bangladesh today?',
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { sender: 'user' as const, text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    const prompt = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: 'Dhaka / Purbachal', budget: '50 Lakhs BDT', propertyType: prompt }),
      });
      const data = await res.json();
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: data.aiResponse || 'Thank you for your message. Sukoon Properties offers 5 Katha plots in Purbachal & ready duplexes in Gulshan 2.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Thank you for reaching out! You can also connect directly with Director Rayhanul Mobarak’s desk via WhatsApp at +880 1913-780386 or email sukoonpropertiesltd@gmail.com.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <div className="flex flex-col items-end gap-2">
          {/* Quick WhatsApp Floating Button */}
          <a
            href="https://wa.me/8801913780386"
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold transition hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5" /> WhatsApp +880 1913-780386
          </a>

          {/* Main Chat Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 border-2 border-emerald-600 shadow-2xl flex items-center justify-center hover:scale-110 transition relative group"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
          </button>
        </div>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl w-80 sm:w-96 shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[460px] animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs">Sukoon Assistant</h4>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online | Director's Desk
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">
                    S
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-800 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="block text-[9px] text-slate-400 mt-1 text-right">{m.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-[11px] text-slate-400 italic flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500 animate-spin" /> Sukoon AI is analyzing properties...
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="p-2 bg-slate-100 border-t border-slate-200 flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => setInputText('What is the plot price in Purbachal Sector 22?')}
              className="bg-white border border-slate-300 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-emerald-50 hover:text-emerald-800"
            >
              Purbachal Plot Price?
            </button>
            <button
              onClick={() => setInputText('How to book a site visit?')}
              className="bg-white border border-slate-300 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-emerald-50 hover:text-emerald-800"
            >
              Book Site Visit?
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about properties, plots, bKash payments..."
              className="flex-1 bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-700"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-amber-400 p-2.5 rounded-xl shadow transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
