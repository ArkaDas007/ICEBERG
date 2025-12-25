import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import EventCard from './components/EventCard';
import AIChatBot from './components/AIChatBot';
import { EventItem } from './types';

type ViewType = 'home' | 'about' | 'events' | 'team' | 'mission';

import { TEAM_MEMBERS, TeamTab } from './data';

interface EventItemWithEligibility extends EventItem {
  eligibility: string;
}

const FALLBACK_ASSETS = {
  background: "https://images.unsplash.com/photo-1635944095210-23114a1fb7c0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWNlYmVyZ3xlbnwwfHwwfHx8MA%3D%3D",
  freshers: "/Fresher.jpeg",
  pro: "/Pro.jpeg",
  workshop: "/Level.jpeg"
};


const OBJECTIVES = [
  "Provide early exposure to engineering problem-solving for first-year students",
  "Strengthen idea visualization and conceptual communication skills for second-year students",
  "Enhance placement readiness and interpersonal skills among third-year students",
  "Foster innovation through project-based learning",
  "Provide mentorship and expert guidance",
  "Encourage teamwork, leadership, and communication",
  "Prepare students for SBH – Smart Bengal Hackathon",
  "Strengthen collaboration between IEI, IIC, and CHS"
];

const INITIAL_EVENTS: EventItemWithEligibility[] = [
  {
    id: '1',
    title: 'ICEBERG HACKS -- Freshers Edition 2025-26',
    targetGroup: '1st years',
    eligibility: '1st Years only',
    description: 'This is the core hackathon event of ICEBERG COSMOS 2025, designed to introduce first-year students to structured problem-solving, teamwork, and prototype development. Problem statements will be released on 17th December, allowing participants sufficient development time before the final evaluation.',
    icon: '🧊',
    tag: 'Hackathon',
    imageUrl: FALLBACK_ASSETS.freshers,
    relevantInfo: [
      'Duration: 17th December - 5th January',
      'Teams develop prototypes',
      'Faculty and alumni mentorship',
      'Interim guidance and reviews'
    ]
  },
  {
    id: '2',
    title: 'ICEBERG HACKS -- Pro Edition 2025-26',
    targetGroup: '2nd years',
    eligibility: '2nd Years only',
    description: 'This event serves as the final round (Round 2) of the Poster Presentation Challenge, exclusively for second-year students. It concludes an already ongoing competition and is included within ICEBERG COSMOS for unified scheduling and combined prize distribution. The hackathon remains the primary focus of the series.',
    icon: '⚡',
    tag: 'Hackathon',
    imageUrl: FALLBACK_ASSETS.pro,
    relevantInfo: [
      'Date: 5th January',
      'Poster display',
      'Concept explanation',
      'Final evaluation'
    ]
  },
  {
    id: '3',
    title: 'LEVEL UP -- Workshop 2025-26',
    targetGroup: '3rd years',
    eligibility: '3rd Years (priority), others may join',
    description: 'A placement and career readiness workshop featuring expert talks on Skill-Based Hiring (SBH), Smart Bengal Hackathon preparation, resume building, industry expectations, and career planning. While primarily targeted at third-year students, participation is open to all interested students.',
    icon: '🚀',
    tag: 'Workshop',
    imageUrl: FALLBACK_ASSETS.workshop,
    relevantInfo: [
      'Date: 6th January',
      'Venue: College Auditorium',
      'Expert talks on placements and career readiness',
      'SBH (Smart Bengal Hackathon) preparation guidance',
      'Industry expectations and skill roadmap',
      'Interactive Q&A session'
    ]
  }
];

const Snowfall: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<{ id: number; left: string; delay: string; duration: string; size: string; opacity: number }[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${10 + Math.random() * 15}s`,
      size: `${2 + Math.random() * 4}px`,
      opacity: 0.2 + Math.random() * 0.5,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full animate-snow"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            top: '-10px',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Simple, direct LogoImage component.
 * It uses the provided filename directly as the src, as they are confirmed to be in the root directory.
 */
const LogoImage: React.FC<{ className?: string; src?: string }> = ({ 
  className = "w-full h-full object-contain p-0",
  src = "/IEI.jpeg"
}) => {
  return (
    <img 
      src={src} 
      alt="Logo" 
      className={className}
      loading="eager"
    />
  );
};

const LogoSlot: React.FC<{ size?: string; className?: string; src?: string }> = ({ size = "w-16 h-16", className = "", src }) => (
  <div className={`${size} rounded-full border-2 border-sky-500/50 flex items-center justify-center bg-white shadow-[0_0_20px_rgba(56,189,248,0.3)] overflow-hidden transition-all duration-300 ${className}`}>
    <LogoImage src={src} />
  </div>
);

const TriangularLogos: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center ${className}`}>
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
      <path 
        d="M 50 15 L 15 85 L 85 85 Z" 
        fill="none" 
        stroke="rgba(56, 189, 248, 0.4)" 
        strokeWidth="1.5" 
        strokeDasharray="4 2" 
      />
    </svg>
    {/* TOP: IEI.jpeg */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2">
      <LogoSlot size="w-9 h-9 md:w-12 md:h-12" src="/IEI.jpeg" />
    </div>
    {/* BOTTOM LEFT: IIC.jpeg */}
    <div className="absolute bottom-0 left-0">
      <LogoSlot size="w-9 h-9 md:w-12 md:h-12" src="/IIC.jpeg" />
    </div>
    {/* BOTTOM RIGHT: CHS.jpeg */}
    <div className="absolute bottom-0 right-0">
      <LogoSlot size="w-9 h-9 md:w-12 md:h-12" src="/CHS.jpeg" />
    </div>
  </div>
);

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 6500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-radial-at-c from-sky-500/10 to-transparent blur-[120px] animate-pulse-slow" />
      
      {/* Logos configuration: Top, Bottom-Left, Bottom-Right triangular layout logic requested */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
      </div>

      <div className="absolute left-6 top-6 md:left-10 md:top-10 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000 delay-500 fill-mode-both">
        <LogoSlot size="w-12 h-12 md:w-16 md:h-16" src="/RCC.png" /> 
        <LogoSlot size="w-12 h-12 md:w-16 md:h-16" src="/IEI.jpeg" />
      </div>
      
      <div className="absolute right-6 top-6 md:right-10 md:top-10 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000 delay-700 fill-mode-both">
        <LogoSlot size="w-12 h-12 md:w-16 md:h-16" src="/IIC.jpeg" />
        <LogoSlot size="w-12 h-12 md:w-16 md:h-16" src="/CHS.jpeg" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-7xl">
        <h1 className="text-6xl md:text-9xl font-stylish font-black tracking-[-0.05em] text-white uppercase animate-splash-title glow-text mb-4 leading-none italic">
          ICEBERG <br className="md:hidden" /> COSMOS
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-stylish font-bold tracking-[0.4em] text-sky-400 uppercase animate-splash-subtitle mb-16 opacity-0 fill-mode-forwards">
          ICEBERG HACKS
        </h2>
        
        <div className="space-y-6 animate-splash-footer opacity-0 fill-mode-forwards">
          <p className="text-sm md:text-xl font-stylish font-medium tracking-[0.3em] text-slate-300 uppercase leading-relaxed">
            POWERED BY <span className="text-sky-400 font-bold">IE(I) STUDENT CHAPTER</span>, <span className="text-white">DEPT. OF IT, 2025</span>
          </p>
          <div className="flex items-center justify-center gap-4">
             <div className="h-[1px] w-8 md:w-20 bg-sky-500/30" />
             <p className="text-[11px] md:text-base font-stylish font-semibold tracking-[0.6em] text-slate-400 uppercase">
                IN COLLABORATION WITH <span className="text-white">IIC</span> AND <span className="text-white">CHS</span>
             </p>
             <div className="h-[1px] w-8 md:w-20 bg-sky-500/30" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes splash-title {
          0% { opacity: 0; transform: scale(1.15) translateY(-30px); filter: blur(25px); }
          40% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes splash-subtitle {
          0% { opacity: 0; transform: translateY(40px) scale(0.9); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes splash-footer {
          0% { opacity: 0; transform: translateY(30px); filter: blur(15px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-splash-title {
          animation: splash-title 3.0s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-splash-subtitle {
          animation: splash-subtitle 2.5s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
        }
        .animate-splash-footer {
          animation: splash-footer 2.5s cubic-bezier(0.16, 1, 0.3, 1) 2.2s forwards;
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [view, setView] = useState<ViewType>('home');
  const [activeTeamTab, setActiveTeamTab] = useState<TeamTab>('organizers');
  const [selectedEvent, setSelectedEvent] = useState<EventItemWithEligibility | null>(null);
  const [backgroundUrl, setBackgroundUrl] = useState<string>(FALLBACK_ASSETS.background);
  const [events, setEvents] = useState<EventItemWithEligibility[]>(INITIAL_EVENTS);

  useEffect(() => {
    const generateAssets = async () => {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const fetchAsset = async (prompt: string, config: any = { imageConfig: { aspectRatio: "16:9" } }) => {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: { parts: [{ text: prompt }] },
            config
          });
          const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
          return part?.inlineData ? `data:image/png;base64,${part.inlineData.data}` : null;
        } catch (e: any) {
          console.warn(`Asset generation failed: ${e?.message}`);
          return null;
        }
      };

      const bgImg = await fetchAsset("A hyper-realistic cinematic cross-section of a massive majestic iceberg floating in a dark deep ocean. Glowing blue base, cinematic lighting, 8k resolution.");
      if (bgImg) setBackgroundUrl(bgImg);  
    };

    generateAssets();
  }, []);

  const closeDetail = () => setSelectedEvent(null);
  const getHighlightsOnly = (info: string[]) => info.filter(i => !i.startsWith('Duration:') && !i.startsWith('Date:'));
  const getEventDate = (info: string[]) => {
    const dateItem = info.find(i => i.startsWith('Duration:') || i.startsWith('Date:'));
    return dateItem ? dateItem.split(': ')[1] : '';
  };

  const renderHome = () => (
    <>
      <section id="about" className="max-w-5xl mx-auto text-center mb-40 mt-10">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-stylish font-black mb-10 leading-[0.9] glow-text text-white tracking-tighter uppercase">
          ICEBERG <br />
          <span className="vibrant-shimmer">COSMOS 2025</span>
        </h1>
        <div className="space-y-8 text-lg md:text-2xl text-slate-200 leading-relaxed font-light max-w-4xl mx-auto backdrop-blur-md bg-slate-950/50 p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <p className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both font-display">
            ICEBERG COSMOS 2025 is a flagship multi-event technical initiative organized by the 
            <span className="text-sky-400 font-medium"> IE(I) Students’ Chapter</span>, 
            Department of Information Technology, RCC Institute of Information Technology, in collaboration with 
            <span className="text-indigo-400 font-medium"> IIC</span> and <span className="text-purple-400 font-medium">CHS</span>.
          </p>
          <p className="animate-in fade-in slide-in-from-bottom-4 delay-200 duration-700 fill-mode-both text-slate-300 text-base md:text-lg italic leading-loose font-display">
            The event is structured as a year-wise technical and career development ecosystem comprising three 
            distinct sub-events, each catering to a specific academic year. The initiative aims to foster innovation, 
            strengthen problem-solving skills, and enhance career readiness among students.
          </p>
        </div>
      </section>

      <section id="objectives" className="scroll-mt-24 mb-32 max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-8xl font-display font-black mb-4 tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">
            OBJECTIVE
          </h2>
          <div className="h-1 w-24 bg-sky-500 mx-auto rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OBJECTIVES.map((obj, idx) => (
            <div key={idx} className="group relative glass-card p-8 rounded-3xl border border-white/10 hover:border-sky-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col gap-4">
                <span className="font-mono-tech text-3xl text-sky-500 font-bold opacity-20 group-hover:opacity-100 transition-all group-hover:scale-110">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="font-mono-tech text-base text-slate-200 leading-relaxed group-hover:text-white transition-colors">
                  {obj}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="events" className="scroll-mt-24 mb-48 max-w-6xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-8xl font-display font-black mb-4 tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">
            EVENTS
          </h2>
          <p className="text-sky-400 font-display font-bold tracking-[0.4em] uppercase text-sm mb-4">A Triple Threat Technical Tier</p>
        </div>
        <div className="flex flex-col gap-16 max-w-4xl mx-auto">
          {events.map((event) => (
            <div key={event.id} className="w-full transform transition-all" onClick={() => setSelectedEvent(event)}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </section>

      <section id="mission" className="max-w-6xl mx-auto mb-40">
         <div className="glass-card rounded-[4rem] p-12 md:p-24 relative overflow-hidden group border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
           <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-sky-500/10 rounded-full blur-[140px] -mr-80 -mt-80 transition-all duration-1000 group-hover:bg-sky-500/20" />
           <div className="relative z-10 text-center">
             <div className="inline-flex items-center gap-4 mb-16">
               <div className="h-[1px] w-8 bg-sky-500" />
               <span className="text-sky-400 font-mono-tech font-bold tracking-[0.6em] uppercase text-xs">The Collective Vision</span>
               <div className="h-[1px] w-8 bg-sky-500" />
             </div>
             <div className="max-w-4xl mx-auto relative">
               <p className="text-2xl md:text-4xl font-stylish font-bold text-white leading-relaxed tracking-tight mb-12">
                ICEBERG COSMOS 2025 establishes a <span className="text-sky-400">structured, year-wise technical growth pipeline</span> that nurtures innovation, research capability, and career readiness.
               </p>
               <div className="mt-12 space-y-4">
                 <p className="text-lg md:text-xl text-slate-300 leading-loose font-light font-display">
                   The event strengthens preparation for <span className="text-white font-medium border-b border-sky-500/50">SBH – Smart Bengal Hackathon</span> and enhances the institution’s technical and competitive standing.
                 </p>
               </div>
             </div>
           </div>
         </div>
      </section>
    </>
  );

  const renderAboutView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 max-w-6xl mx-auto pt-20">
      <div className="text-center mb-20">
        <h2 className="text-6xl md:text-9xl font-stylish font-black mb-4 tracking-tighter uppercase italic text-white glow-text">ABOUT</h2>
        <div className="h-1 w-24 bg-sky-500 mx-auto rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
      </div>
      <div className="glass-card rounded-[3rem] p-12 md:p-20 border border-white/10 shadow-2xl space-y-16">
        <p className="text-2xl md:text-3xl font-display text-white leading-relaxed text-center">
          ICEBERG COSMOS 2025 is a flagship multi-event technical initiative organized by the <span className="text-sky-400 font-bold">IE(I) Students’ Chapter</span>, Department of Information Technology, RCC Institute of Information Technology, in collaboration with <span className="text-indigo-400 font-bold">IIC</span> and <span className="text-purple-400 font-bold">CHS</span>.
        </p>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light text-center">
          The event is structured as a year-wise technical and career development ecosystem comprising three distinct sub-events, each catering to a specific academic year. The initiative aims to foster innovation, strengthen problem-solving skills, and enhance career readiness among students.
        </p>
        
        <div className="pt-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-stylish font-bold text-sky-400 uppercase tracking-widest">COLLABORATORS</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 items-center">
            <div className="flex flex-col items-center gap-6 group">
               <LogoSlot size="w-28 h-28 md:w-40 md:h-40" src="IIC.jpeg" className="group-hover:border-sky-500 transition-all duration-500" />
               <span className="text-white font-stylish font-bold tracking-widest text-lg">IIC</span>
               <div className="h-0.5 w-0 group-hover:w-full bg-sky-500 transition-all duration-500" />
            </div>
            <div className="flex flex-col items-center gap-6 group">
               <LogoSlot size="w-28 h-28 md:w-40 md:h-40" src="CHS.jpeg" className="group-hover:border-white transition-all duration-500" />
               <span className="text-white font-stylish font-bold tracking-widest text-lg">CHS</span>
               <div className="h-0.5 w-0 group-hover:w-full bg-white transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventsView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 max-w-6xl mx-auto pt-20">
      <div className="text-center mb-20">
        <h2 className="text-6xl md:text-9xl font-stylish font-black mb-4 tracking-tighter uppercase italic text-white glow-text">EVENTS</h2>
        <div className="h-1 w-24 bg-sky-500 mx-auto rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
      </div>
      
      <div className="flex flex-col gap-16 max-w-5xl mx-auto mb-32">
        {events.map((event) => (
          <div key={event.id} className="w-full transform transition-all" onClick={() => setSelectedEvent(event)}>
            <div className="glass-card p-4 rounded-[2.5rem] border border-white/5">
              <EventCard event={event} />
              <div className="px-12 py-6 bg-slate-900/30 rounded-b-[2rem] mt-2 flex justify-center items-center text-sm font-mono-tech uppercase">
                <span className="text-slate-500">Event Date: <span className="text-sky-400 font-bold">{getEventDate(event.relevantInfo)}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto mb-40">
        <div className="text-center mb-12">
          <h3 className="text-5xl font-stylish font-black text-white glow-text">ELIGIBILITY</h3>
          <div className="h-[1px] w-24 bg-sky-500 mx-auto mt-4" />
        </div>
        <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-sky-500/10 font-stylish text-sky-400 text-xs uppercase tracking-[0.2em] border-b border-white/10">
              <tr>
                <th className="px-12 py-8">Event</th>
                <th className="px-12 py-8">Eligible Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-12 py-8 font-bold text-white text-lg">ICEBERG HACKS — Freshers Edition</td>
                <td className="px-12 py-8 font-mono-tech text-sky-400">1st Years only</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-12 py-8 font-bold text-white text-lg">ICEBERG HACKS — Pro Edition</td>
                <td className="px-12 py-8 font-mono-tech text-sky-400">2nd Years only</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-12 py-8 font-bold text-white text-lg">LEVEL UP Workshop</td>
                <td className="px-12 py-8 font-mono-tech text-sky-400">3rd Years (priority), others may join</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTeamView = () => {
    const currentMembers = TEAM_MEMBERS.filter(m => m.category === activeTeamTab);
    
    return (
      <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 max-w-7xl mx-auto pt-20">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-9xl font-stylish font-black mb-4 tracking-tighter uppercase italic text-white glow-text">TEAM</h2>
          <div className="h-1 w-24 bg-sky-500 mx-auto rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
        </div>

        <div className="flex justify-center gap-4 md:gap-8 mb-16 flex-wrap px-4">
          {(['organizers', 'co-organizers', 'core'] as TeamTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTeamTab(tab)}
              className={`px-8 py-3 rounded-2xl font-stylish font-bold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 border ${
                activeTeamTab === tab 
                  ? 'bg-sky-500 text-white border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.4)]' 
                  : 'bg-slate-900/50 text-slate-400 border-white/5 hover:border-white/20'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 mb-32">
          {currentMembers.map((member) => (
            <div 
              key={member.id} 
              className="group glass-card rounded-3xl p-8 border border-white/10 hover:border-sky-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col items-center text-center"
            >
              {/* UPDATED SQUARE PHOTO FRAME */}
              <div className="w-24 h-24 rounded-2xl bg-slate-900 border-2 border-dashed border-sky-500/30 flex items-center justify-center text-4xl mb-6 group-hover:border-sky-500 group-hover:bg-sky-500/10 transition-all duration-500 shadow-inner overflow-hidden">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  member.avatarIcon || '👤'
                )}
              </div>
              
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{member.name}</h4>
              <p className="text-slate-400 font-mono-tech text-xs uppercase tracking-widest group-hover:text-slate-200 transition-colors">{member.role}</p>
              
              <div className="mt-8 flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="w-8 h-8 rounded-lg bg-white/5 hover:bg-sky-500/20 flex items-center justify-center cursor-pointer border border-white/5 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 hover:bg-sky-500/20 flex items-center justify-center cursor-pointer border border-white/5 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMissionView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 max-w-6xl mx-auto pt-20 h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-20">
        <h2 className="text-6xl md:text-9xl font-stylish font-black mb-4 tracking-tighter uppercase italic text-white glow-text">MISSION</h2>
        <div className="h-1 w-24 bg-sky-500 mx-auto rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
      </div>
      <div className="glass-card rounded-[3rem] p-10 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden group text-center">
         <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-sky-500/10 rounded-full blur-[120px] -mr-80 -mt-80" />
         <p className="text-xl md:text-3xl font-stylish font-bold text-white leading-tight mb-10 relative z-10">
           ICEBERG COSMOS 2025 establishes a <span className="text-sky-400">structured, year-wise technical growth pipeline</span> that nurtures innovation, research capability, and career readiness.
         </p>
         <div className="h-[1px] w-24 bg-sky-500 mx-auto mb-10 relative z-10" />
         <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light relative z-10">
           The event strengthens preparation for <span className="text-white font-medium">SBH – Smart Bengal Hackathon</span> and enhances the institution’s technical and competitive standing.
         </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden text-slate-50 bg-[#020617]">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      <div className={`transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <div className="fixed inset-0 z-0">
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out scale-105 animate-subtle-zoom`}
            style={{ 
              backgroundImage: `url("${backgroundUrl}")`,
              filter: 'contrast(1.4) brightness(0.3) saturate(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/95 via-[#020617]/40 to-[#020617]" />
        </div>

        <Snowfall />

        <div className="absolute top-28 right-6 md:top-32 md:right-10 z-[30] pointer-events-none hidden lg:block">
           <TriangularLogos className="opacity-100" />
        </div>

        <div className="relative z-10">
          <nav className="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/10 bg-slate-950/40">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-lg shadow-sky-500/20 border border-sky-500/20">
                <LogoImage src="ICEBERG.jpeg" />
              </div>
              <span className="text-xl font-stylish font-bold tracking-tighter text-white uppercase">ICEBERG <span className="text-sky-400">COSMOS</span></span>
            </div>
            
            <div className="hidden md:flex gap-12 items-center text-sm font-stylish font-bold tracking-widest uppercase ml-auto mr-4 md:mr-6">
              <button onClick={() => setView('home')} className={`hover:text-sky-400 transition-colors ${view === 'home' ? 'text-sky-400' : 'text-slate-300'}`}>Home</button>
              <button onClick={() => setView('about')} className={`hover:text-sky-400 transition-colors ${view === 'about' ? 'text-sky-400' : 'text-slate-300'}`}>About</button>
              <button onClick={() => setView('events')} className={`hover:text-sky-400 transition-colors ${view === 'events' ? 'text-sky-400' : 'text-slate-300'}`}>Events</button>
              <button onClick={() => setView('team')} className={`hover:text-sky-400 transition-colors ${view === 'team' ? 'text-sky-400' : 'text-slate-300'}`}>Team</button>
              <button onClick={() => setView('mission')} className={`hover:text-sky-400 transition-colors ${view === 'mission' ? 'text-sky-400' : 'text-slate-300'}`}>Mission</button>
            </div>
          </nav>

          <main className="container mx-auto px-6 pt-32 pb-24">
            {view === 'home' && renderHome()}
            {view === 'about' && renderAboutView()}
            {view === 'events' && renderEventsView()}
            {view === 'team' && renderTeamView()}
            {view === 'mission' && renderMissionView()}
          </main>

          <footer className="border-t border-white/10 py-20 bg-slate-950/95 backdrop-blur-2xl">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-sky-500/30">
                  <LogoImage src="/ICEBERG.jpeg" 
                  className="w-full h-full object-cover p-0"/>
                </div>
                <div>
                  <span className="text-lg font-stylish font-bold tracking-tight text-white block">ICEBERG COSMOS 2025-26</span>
                </div>
              </div>
              
              <div className="text-slate-400 text-sm text-center leading-loose">
                Organized by <span className="text-white font-medium">IE(I) Students' Chapter</span>, Dept. of IT <br />
                In collaboration with <span className="text-white font-medium">IIC</span> & <span className="text-white font-medium">CHS</span> <br />
                © 2025 RCC Institute of Information Technology.
              </div>

              <div className="flex gap-10 justify-center md:justify-end text-slate-400 uppercase text-xs font-bold tracking-widest">
                <a href="https://www.instagram.com/ieisc_rcciit?igsh=ZjZydjNxMnJ1cm5h" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-all"
                >
                  Instagram
                </a>
                <a href="https://www.linkedin.com/company/ie-i-student-chapter-rcciit/" target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-all"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </div>

        <AIChatBot />

        {selectedEvent && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in-95 duration-300">
            <div className="absolute inset-0 bg-[#020617]/98 backdrop-blur-3xl" onClick={closeDetail} />
            <div className="relative w-full max-w-5xl glass-card rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(56,189,248,0.25)] flex flex-col md:flex-row max-h-[95vh]">
              <div className="w-full md:w-5/12 bg-slate-950 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
                {selectedEvent.imageUrl ? (
                  <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-full object-cover rounded-[2rem] shadow-2xl" />
                ) : (
                  <span className="text-[10rem]">{selectedEvent.icon}</span>
                )}
              </div>

              <div className="w-full md:w-7/12 p-8 md:p-16 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
                <button onClick={closeDetail} className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                <span className="inline-block px-5 py-2 mb-6 text-xs font-bold tracking-[0.3em] uppercase rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  {selectedEvent.tag}
                </span>
                <h3 className="text-4xl md:text-5xl font-bold font-display mb-8 text-white tracking-tight leading-tight">
                  {selectedEvent.title}
                </h3>
                
                <div className="space-y-10">
                  <p className="text-slate-200 text-xl leading-relaxed font-light">{selectedEvent.description}</p>
                  
                  <div className="pt-10 border-t border-white/10">
                    <h4 className="text-sky-400 font-stylish font-bold text-lg mb-4 uppercase tracking-widest">EVENT DATE</h4>
                    <p className="text-white text-2xl font-mono-tech mb-8">{getEventDate(selectedEvent.relevantInfo)}</p>

                    <h4 className="text-sky-400 font-stylish font-bold text-lg mb-8 uppercase tracking-widest">KEY HIGHLIGHTS</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {getHighlightsOnly(selectedEvent.relevantInfo).map((info, i) => (
                        <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="mt-1.5 w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                          <span className="text-slate-300 text-base leading-snug">{info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-16 flex justify-end">
                  <button onClick={closeDetail} className="px-10 py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold transition-all shadow-xl shadow-sky-500/20">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes snow {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(110vh) translateX(0); }
        }
        .animate-snow {
          animation-name: snow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 40s ease-in-out infinite alternate;
        }
        @keyframes subtle-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; border-color: rgba(255, 255, 255, 0.1); }
          50% { opacity: 0.7; border-color: rgba(56, 189, 248, 0.4); }
        }
      `}</style>
    </div>
  );
};

export default App;