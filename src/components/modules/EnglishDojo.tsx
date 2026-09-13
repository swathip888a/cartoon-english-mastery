import React, { useState } from 'react';
import { englishDojoPhrases } from '../../data/englishDojoData';
import { mentors } from '../../data/mentorsData';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { sound } from '../../utils/audio';
import {
  Languages,
  Sparkles,
  Volume2,
  CheckCircle2,
  MessageSquare,
  Star,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnglishDojoProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const EnglishDojo: React.FC<EnglishDojoProps> = ({ onAddXp }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [practicedIds, setPracticedIds] = useState<string[]>([]);

  const categories = ['All', 'Cafe & Dining', 'Travel & Navigation', 'Dining & Restaurants', 'Hotel & Cafe', 'Everyday Conversation', 'Shopping & Retail', 'Transit & Cabs', 'Health & Wellness'];

  const filteredPhrases = selectedCategory === 'All'
    ? englishDojoPhrases
    : englishDojoPhrases.filter((p) => p.category === selectedCategory);

  const handlePractice = (phraseId: string) => {
    if (!practicedIds.includes(phraseId)) {
      sound.playSuccess();
      const updated = [...practicedIds, phraseId];
      setPracticedIds(updated);
      onAddXp(20, 'Mastered Conversational English Roleplay! 🗣️✨');
      if (updated.length % 3 === 0) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/30 border border-sky-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-bold text-xs border border-sky-500/40">
              CONVERSATIONAL ENGLISH LINGO DOJO
            </span>
            <span className="text-xs text-slate-400">Led by {mentors.ren.name}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The Politeness Matrix & Spoken English Dojo 🗣️🎙️
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Master effortless, natural English conversation. Listen to native speech pronunciation, transform casual blunt phrases into high-elegance requests, and roleplay real-world responses!
          </p>
        </div>

        {/* Ren Card */}
        <div className="bg-slate-800/90 rounded-2xl p-4 border border-sky-500/40 shadow-xl max-w-xs flex items-center gap-3">
          <img
            src={mentors.ren.avatar}
            alt="Ren"
            className="w-12 h-12 rounded-xl object-cover border-2 border-sky-500 flex-shrink-0"
          />
          <div>
            <p className="text-xs font-bold text-sky-300">Ren-kun:</p>
            <p className="text-xs text-slate-200 italic mt-0.5">
              “Adding ‘whenever you have a moment’ turns any simple request into pure diplomacy!”
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick();
              setSelectedCategory(cat);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-sky-500 text-slate-950 font-black shadow-md shadow-sky-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Phrases Grid (The Politeness Matrix Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPhrases.map((phrase) => {
          const isDone = practicedIds.includes(phrase.id);
          return (
            <div
              key={phrase.id}
              className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/80 shadow-2xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3 border-b border-slate-700/80 pb-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 uppercase tracking-wider">
                      {phrase.category}
                    </span>
                    <h3 className="font-bold text-base text-white mt-1">{phrase.scenario}</h3>
                  </div>

                  <AudioSpeakButton text={phrase.audioText} size="sm" label="Pronounce" />
                </div>

                {/* 3-Tier Politeness Level Comparison */}
                <div className="space-y-2.5 text-xs">
                  {/* Tier 1: Casual (Low) */}
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">1. Casual / Blunt:</span>
                      <span className="text-slate-400 font-medium line-through">“{phrase.casualPhrase}”</span>
                    </div>
                  </div>

                  {/* Tier 2: Polite (Medium) */}
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-sky-400 uppercase block">2. Standard Polite:</span>
                      <span className="text-slate-200 font-medium">“{phrase.politePhrase}”</span>
                    </div>
                    <AudioSpeakButton text={phrase.politePhrase} size="sm" />
                  </div>

                  {/* Tier 3: Super Polite (High Diplomacy) */}
                  <div className="bg-gradient-to-r from-sky-950/40 to-indigo-950/40 p-3.5 rounded-xl border-2 border-sky-400/60 shadow-lg shadow-sky-500/10 flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-sky-300 uppercase flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>3. Master High-Elegance (Recommended 🌟):</span>
                      </span>
                      <span className="text-white font-bold text-xs sm:text-sm mt-0.5 block leading-relaxed">
                        “{phrase.superPolitePhrase}”
                      </span>
                    </div>
                    <AudioSpeakButton text={phrase.superPolitePhrase} size="sm" />
                  </div>
                </div>

                {/* Staff / Barista Real Response */}
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 font-bold block mb-0.5">Likely Response from Staff:</span>
                  <p className="text-pink-300 font-medium italic">{phrase.baristaOrStaffResponse}</p>
                </div>

                {/* Pronunciation & Flow Tip */}
                <div className="bg-sky-950/20 p-2.5 rounded-xl border border-sky-500/20 text-[11px] text-sky-200">
                  🎙️ <strong>Flow Tip:</strong> {phrase.pronunciationNotes}
                </div>
              </div>

              {/* Mark Completed Button */}
              <button
                onClick={() => handlePractice(phrase.id)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all mt-3 ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isDone ? 'Phrase Mastered! 🎉' : 'Practice & Claim +20 XP'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
