
import React, { useState, useRef, useEffect } from 'react';
import { getCareerGuidance } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isLoading) return;

    const userText = textToSend.trim();
    const userMsg: ChatMessage = { role: 'user', parts: userText };
    
    // Capture history before adding current user message to state
    const currentHistory = [...messages];
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getCareerGuidance(userText, currentHistory);
      const botMsg: ChatMessage = { role: 'model', parts: response || 'The cosmos is silent. Try reframing your query, explorer.' };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = { role: 'model', parts: "Uplink interrupted by a solar flare. Please try again." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[550px] flex flex-col rounded-[2rem] glass-card shadow-[0_0_50px_rgba(56,189,248,0.3)] overflow-hidden border border-sky-500/30 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-900/60 to-indigo-900/60 p-5 flex justify-between items-center border-b border-sky-500/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-3 h-3 bg-sky-400 rounded-full ${isLoading ? 'animate-ping' : ''}`}></div>
                <div className="absolute inset-0 w-3 h-3 bg-sky-400 rounded-full opacity-50"></div>
              </div>
              <div>
                <span className="font-stylish font-bold text-xs tracking-widest text-white uppercase block">Cosmos AI Guide</span>
                <span className="text-[10px] text-sky-300 font-mono-tech uppercase">Technical Uplink Active</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          
          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/40">
            {messages.length === 0 && (
              <div className="text-center mt-10 px-4 animate-in fade-in duration-700">
                <div className="w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-sky-500/20 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                  <span className="text-3xl">🧊</span>
                </div>
                <h4 className="text-white font-stylish font-bold text-sm mb-2 uppercase tracking-tighter">Initialize Technical Uplink</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Greetings, explorer. I am the Cosmos Intelligence. Ask me about hacking roadmaps, SBH preparation, or deep event lore.
                </p>
                <div className="mt-8 flex flex-col gap-2">
                  <button onClick={() => handleSend("What is ICEBERG HACKS?")} className="text-[11px] bg-white/5 hover:bg-sky-500/20 border border-white/10 rounded-xl px-4 py-2 text-slate-300 transition-all text-left">What is ICEBERG HACKS?</button>
                  <button onClick={() => handleSend("Give me a hacking challenge ideas")} className="text-[11px] bg-white/5 hover:bg-sky-500/20 border border-white/10 rounded-xl px-4 py-2 text-slate-300 transition-all text-left">Give me hackathon ideas</button>
                  <button onClick={() => handleSend("How to prepare for SBH?")} className="text-[11px] bg-white/5 hover:bg-sky-500/20 border border-white/10 rounded-xl px-4 py-2 text-slate-300 transition-all text-left">How to prepare for SBH?</button>
                </div>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                  m.role === 'user' 
                    ? 'bg-sky-600 text-white font-medium rounded-tr-none' 
                    : 'bg-slate-900/90 text-slate-200 border border-white/10 rounded-tl-none font-light backdrop-blur-md'
                }`}>
                  {m.parts}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-slate-900/80 p-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-duration:0.6s]"></div>
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.1s]"></div>
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-950/80 border-t border-white/5">
            <div className="relative flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query the cosmos..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 text-white placeholder-slate-500 transition-all"
                disabled={isLoading}
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:hover:bg-sky-500 p-3 rounded-xl text-white transition-all shadow-lg shadow-sky-500/20 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(56,189,248,0.4)] hover:bg-sky-400 transition-all hover:scale-110 active:scale-95 group relative border-2 border-sky-400/20"
        >
          <div className="absolute inset-0 rounded-full bg-sky-400 animate-pulse opacity-20"></div>
          <svg className="text-white group-hover:rotate-12 transition-transform relative z-10" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>
      )}
    </div>
  );
};

export default AIChatBot;
