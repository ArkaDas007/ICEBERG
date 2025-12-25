
import React from 'react';
import { EventItem } from '../types';

interface EventCardProps {
  event: EventItem & { eligibility?: string };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] glass-card transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_20px_60px_-15px_rgba(56,189,248,0.2)] cursor-pointer border border-white/10 hover:border-sky-500/50 flex flex-col md:flex-row bg-slate-950/40">
      
      {/* Featured Image Area - Row-friendly for desktop */}
      <div className="relative h-64 md:h-auto md:w-5/12 overflow-hidden bg-slate-900 shrink-0">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-sky-500/5 text-7xl transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100">
            {event.icon}
          </div>
        )}
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Tag Label */}
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase rounded-full bg-slate-950/90 text-sky-400 border border-sky-500/30 backdrop-blur-md">
            {event.tag}
          </span>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="relative z-10 p-8 md:p-12 flex-1 flex flex-col justify-center bg-gradient-to-b md:bg-gradient-to-l from-transparent via-slate-950/40 to-slate-950">
        <div className="mb-4">
           <span className="text-sky-400 text-xs font-bold uppercase tracking-[0.2em] mb-2 block">{event.targetGroup} Special</span>
           <h3 className="text-3xl md:text-4xl font-bold font-display group-hover:text-sky-300 transition-colors leading-tight tracking-tight text-white">
            {event.title}
          </h3>
        </div>

        {/* New Eligibility Section */}
        {event.eligibility && (
          <div className="mb-4 flex items-center gap-2">
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-300">
                Eligibility: <span className="text-sky-400 font-bold">{event.eligibility}</span>
              </span>
            </div>
          </div>
        )}
        
        <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed group-hover:text-slate-200 transition-colors line-clamp-3">
          {event.description}
        </p>
        
        <div className="mt-auto pt-6 flex justify-end border-t border-white/5 group-hover:border-sky-500/20 transition-colors">
          <div className="flex items-center gap-2 text-white font-bold text-sm bg-white/5 px-6 py-3 rounded-2xl group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-xl border border-white/5 group-hover:border-sky-400">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
        </div>
      </div>
      
      {/* Interactive border glow effect */}
      <div className="absolute inset-0 border-2 border-sky-500/0 group-hover:border-sky-500/20 rounded-[2rem] transition-all duration-500 pointer-events-none" />
    </div>
  );
};

export default EventCard;
