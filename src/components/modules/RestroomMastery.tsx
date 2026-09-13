import React, { useState } from 'react';
import { japaneseBidetButtons, restroomEtiquetteTips } from '../../data/bathroomData';
import { mentors } from '../../data/mentorsData';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { sound } from '../../utils/audio';
import {
  Sparkles,
  AlertTriangle,
  Volume2,
  Sliders,
  Wind,
  Droplets,
  Square,
  ShowerHead,
  DoorClosed,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RestroomMasteryProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const RestroomMastery: React.FC<RestroomMasteryProps> = ({ onAddXp }) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [waterPressure, setWaterPressure] = useState<number>(3);
  const [soundPrivacyPlaying, setSoundPrivacyPlaying] = useState<boolean>(false);
  const [simScore, setSimScore] = useState<number>(0);

  const handleButtonPress = (btnId: string) => {
    sound.playClick();
    if (btnId === 'stop') {
      setActiveAction(null);
      setSoundPrivacyPlaying(false);
      return;
    }

    if (btnId === 'sound_privacy') {
      setSoundPrivacyPlaying(true);
      sound.playFlushStream(4);
      setActiveAction('Playing Otohime Privacy Sound (Water Stream)');
      return;
    }

    if (btnId === 'rear_spray') {
      sound.playFlushStream(2);
      setActiveAction('Rear Wash (Oshiri) Active 🌊');
    } else if (btnId === 'front_bidet') {
      sound.playFlushStream(2);
      setActiveAction('Feminine Bidet Wash Active 🌸');
    } else if (btnId === 'dryer') {
      setActiveAction('Warm Gentle Air Dryer Blowing 💨');
    } else if (btnId === 'flush_big') {
      sound.playFlushStream(3);
      setActiveAction('Full Toilet Flush (大) Executed 🚽');
    } else if (btnId === 'flush_small') {
      sound.playFlushStream(2);
      setActiveAction('Eco Toilet Flush (小) Executed 💧');
    }

    if (simScore === 0) {
      setSimScore(1);
      sound.playSuccess();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      onAddXp(35, 'Mastered High-Tech Washlet Controls! 🚻👑');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-teal-950/40 via-slate-900 to-emerald-950/30 border border-teal-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs border border-teal-500/40">
              RESTROOM & SANCTUARY PROTOCOL
            </span>
            <span className="text-xs text-slate-400">Led by {mentors.aoi.name}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            High-Tech Smart Bathrooms & Public Restrooms 🚻✨
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Master the world-famous Japanese electronic bidet washlets, decode the Kanji buttons, avoid the dreaded red emergency pull-cord mistake, and ask for restrooms politely anywhere.
          </p>
        </div>

        {/* Aoi Card */}
        <div className="bg-slate-800/90 rounded-2xl p-4 border border-teal-500/40 shadow-xl max-w-xs flex items-center gap-3">
          <img
            src={mentors.aoi.avatar}
            alt="Aoi"
            className="w-12 h-12 rounded-xl object-cover border-2 border-teal-500 flex-shrink-0"
          />
          <div>
            <p className="text-xs font-bold text-teal-300">Aoi-chan:</p>
            <p className="text-xs text-slate-200 italic mt-0.5">
              “Remember: The red square button ‘止’ is STOP! Never pull the red hanging wall string!”
            </p>
          </div>
        </div>
      </div>

      {/* Red Alert Banner */}
      <div className="bg-rose-950/40 border-2 border-rose-500/60 rounded-3xl p-5 shadow-2xl flex items-start gap-4">
        <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-2xl text-rose-400 flex-shrink-0">
          <AlertTriangle className="w-7 h-7 animate-bounce" />
        </div>
        <div>
          <h3 className="font-black text-white text-base sm:text-lg">
            🚨 CRITICAL WARNING: The Red Emergency Pull-Cord vs Flush Button!
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
            In international accessible restrooms (Japan, UK, Europe, Australia), there is often a long <strong>RED CORD</strong> hanging from the ceiling. <strong>DO NOT PULL THIS TO FLUSH!</strong> It is a distress signal that triggers sirens and summons paramedics. To flush, look for a lever, wall sensor wave, or the buttons labeled <strong>「大」 / 「小」</strong>.
          </p>
        </div>
      </div>

      {/* Interactive Japanese Bidet Console Simulator */}
      <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-teal-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span>Interactive Japanese Smart Toilet Simulator (ウォシュレット)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click the buttons below to test every washlet feature in real time with audio simulation!
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full border border-teal-500/40">
            Interactive Simulator
          </span>
        </div>

        {/* Live Status Display Screen */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-teal-500/40 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-full ${activeAction ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest">Toilet Status Monitor</p>
              <p className="text-sm font-bold text-teal-300 font-mono">
                {activeAction || 'Idle / Ready • Heated Seat Active (38°C)'}
              </p>
            </div>
          </div>

          {/* Pressure Meter */}
          <div className="flex items-center gap-3 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Water Pressure:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <div
                  key={lvl}
                  onClick={() => setWaterPressure(lvl)}
                  className={`w-3 h-5 rounded cursor-pointer transition-all ${
                    lvl <= waterPressure ? 'bg-teal-400' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* The Button Panel Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {japaneseBidetButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleButtonPress(btn.id)}
              className="group relative bg-slate-900/90 hover:bg-slate-900 p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.03] active:scale-95 text-left shadow-lg flex flex-col justify-between h-32 overflow-hidden"
              style={{ borderColor: `${btn.color}40` }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow"
                  style={{ backgroundColor: btn.color }}
                >
                  {btn.labelKanji}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{btn.labelRomaji}</span>
              </div>

              <div>
                <p className="font-bold text-xs sm:text-sm text-white group-hover:text-teal-300 transition-colors">
                  {btn.labelEnglish}
                </p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{btn.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Restroom Etiquette & English Phrases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {restroomEtiquetteTips.map((tip, idx) => (
          <div key={idx} className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <DoorClosed className="w-5 h-5 text-teal-400" />
              <span>{tip.title}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{tip.content}</p>

            {tip.keyPhrases && (
              <div className="space-y-2 pt-2 border-t border-slate-700">
                <p className="text-[11px] font-bold text-teal-300">English Phrases to Ask:</p>
                {tip.keyPhrases.map((phrase, pIdx) => (
                  <div key={pIdx} className="bg-slate-900/80 p-2.5 rounded-xl flex items-center justify-between gap-2 text-xs">
                    <span className="text-white font-medium">{phrase}</span>
                    <AudioSpeakButton text={phrase} size="sm" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
