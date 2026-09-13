import React, { useState } from 'react';
import { codexEntries } from '../../data/codexData';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { sound } from '../../utils/audio';
import {
  Zap,
  Search,
  Copy,
  Check,
  AlertTriangle,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const PocketCodex: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredEntries = codexEntries.filter((entry) => {
    const q = searchQuery.toLowerCase();
    return (
      entry.title.toLowerCase().includes(q) ||
      entry.oneLiner.toLowerCase().includes(q) ||
      entry.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleCopy = (text: string, id: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-950/40 via-slate-900 to-rose-950/30 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>REAL-WORLD EMERGENCY CHEAT SHEETS</span>
            </span>
            <span className="text-xs text-slate-400">Instant 1-Tap Lookup</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Pocket Survival Codex ⚡📖
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Whenever you are outside in the real world (at an airport gate, standing at a Starbucks counter, or hailing a cab) — search any topic below for immediate instructions and exact phrases to speak!
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search anything (e.g., 'Starbucks', 'TSA liquids', 'bidet', 'Uber', 'hotel', 'tip', 'emergency')..."
          className="w-full bg-slate-900/90 border border-slate-700 rounded-2xl pl-12 pr-4 py-3.5 text-sm sm:text-base text-white focus:outline-none focus:border-amber-500 shadow-xl"
        />
      </div>

      {/* Codex Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/80 shadow-2xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3 border-b border-slate-700/80 pb-3">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-700 text-amber-300 uppercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-base text-white mt-1">{entry.title}</h3>
                </div>

                <button
                  onClick={() => handleCopy(entry.sayThisInEnglish, entry.id)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 flex-shrink-0"
                  title="Copy spoken phrase"
                >
                  {copiedId === entry.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === entry.id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* One Liner */}
              <p className="text-xs font-semibold text-amber-300 bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/30">
                ⚡ <strong>Quick Rule:</strong> {entry.oneLiner}
              </p>

              {/* Emergency Action */}
              {entry.emergencyAction && (
                <div className="bg-rose-950/30 p-2.5 rounded-xl border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Warning:</strong> {entry.emergencyAction}</span>
                </div>
              )}

              {/* Cheat Sheet Bullet Points */}
              <ul className="space-y-1 text-xs text-slate-300">
                {entry.cheatSheetList.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Say this in English */}
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Exact English Phrase:</p>
                <p className="text-xs font-bold text-white mt-0.5">{entry.sayThisInEnglish}</p>
              </div>
              <AudioSpeakButton text={entry.sayThisInEnglish} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
