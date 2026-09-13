import React, { useState } from 'react';
import { hotelGuide } from '../../data/hotelData';
import { mentors } from '../../data/mentorsData';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { sound } from '../../utils/audio';
import {
  Hotel,
  KeyRound,
  Refrigerator,
  PhoneCall,
  LogOut,
  Sparkles,
  AlertOctagon,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HotelMasteryProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const HotelMastery: React.FC<HotelMasteryProps> = ({ onAddXp }) => {
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const handleComplete = (id: string) => {
    if (!completedSections.includes(id)) {
      sound.playSuccess();
      const updated = [...completedSections, id];
      setCompletedSections(updated);
      onAddXp(25, 'Mastered Hotel Stay Checkpoint! 🏨✨');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/30 border border-purple-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/40">
              CONCIERGE & HOTEL MASTERY
            </span>
            <span className="text-xs text-slate-400">Led by {mentors.ren.name}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Check-In, Minibars & Luxury Hotel Protocols 🏨🔑
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Never get surprised by security deposit holds, sensor-triggered minibars, or keycard power slots. Experience seamless hotel stays worldwide.
          </p>
        </div>

        {/* Ren Card */}
        <div className="bg-slate-800/90 rounded-2xl p-4 border border-purple-500/40 shadow-xl max-w-xs flex items-center gap-3">
          <img
            src={mentors.ren.avatar}
            alt="Ren"
            className="w-12 h-12 rounded-xl object-cover border-2 border-purple-500 flex-shrink-0"
          />
          <div>
            <p className="text-xs font-bold text-purple-300">Ren-kun:</p>
            <p className="text-xs text-slate-200 italic mt-0.5">
              “Always leave your luggage at the front desk Bell Desk for free if your room isn’t ready yet!”
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Hotel Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotelGuide.map((section) => {
          const isDone = completedSections.includes(section.id);
          return (
            <div
              key={section.id}
              className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/80 shadow-2xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3 border-b border-slate-700/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                      {section.id === 'check_in' && <KeyRound className="w-5 h-5" />}
                      {section.id === 'minibar_warning' && <Refrigerator className="w-5 h-5" />}
                      {section.id === 'room_requests' && <PhoneCall className="w-5 h-5" />}
                      {section.id === 'check_out' && <LogOut className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">{section.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{section.description}</p>
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-purple-300 uppercase tracking-wider">Protocol Checklist:</p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {section.checklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro Tips */}
                {section.proTips.length > 0 && (
                  <div className="bg-purple-950/30 p-3 rounded-xl border border-purple-500/20 text-xs text-purple-200">
                    ✨ <strong>Concierge Secret:</strong> {section.proTips[0]}
                  </div>
                )}

                {/* Spoken Dialogue */}
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-[11px] font-bold text-slate-400">Exact Words to Speak:</p>
                  {section.keyDialogue.map((d, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 text-xs">
                      <p className="text-slate-200">
                        <strong className="text-purple-300">{d.speaker}:</strong> {d.text}
                      </p>
                      <AudioSpeakButton text={d.text} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleComplete(section.id)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all mt-2 ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isDone ? 'Section Mastered! 🎉' : 'Mark Completed (+25 XP)'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
