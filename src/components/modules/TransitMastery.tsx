import React, { useState } from 'react';
import { transitGuides } from '../../data/transitData';
import { mentors } from '../../data/mentorsData';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { VoiceSpeechPractice } from '../VoiceSpeechPractice';
import { TransitKioskSimulator } from './TransitKioskSimulator';
import { sound } from '../../utils/audio';
import {
  Car,
  Train,
  Bus,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Ticket
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TransitMasteryProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const TransitMastery: React.FC<TransitMasteryProps> = ({ onAddXp }) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>('rideshare_cabs');
  const [practicedGuides, setPracticedGuides] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'kiosk_simulator' | 'guides'>('kiosk_simulator');

  const currentGuide = transitGuides.find((g) => g.id === selectedGuideId) || transitGuides[0];

  const handlePracticeGuide = (guideId: string) => {
    if (!practicedGuides.includes(guideId)) {
      sound.playSuccess();
      const next = [...practicedGuides, guideId];
      setPracticedGuides(next);
      onAddXp(30, `Mastered ${currentGuide.title}! 🚖🌟`);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-blue-950/30 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/40 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5" /> URBAN TRANSIT & METRO NAVIGATOR
            </span>
            <span className="text-xs text-slate-400">Led by {mentors.kenji.name}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Cabs, Subways, Ticket Kiosks & City Buses 🚖🚇
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            From operating station ticket vending touchscreens to safety-verifying your Uber driver and ringing the bus stop bell without hesitation!
          </p>
        </div>

        {/* Kenji Card */}
        <div className="bg-slate-800/90 rounded-2xl p-4 border border-indigo-500/40 shadow-xl max-w-xs flex items-center gap-3">
          <img
            src={mentors.kenji.avatar}
            alt="Kenji"
            className="w-12 h-12 rounded-xl object-cover border-2 border-indigo-500 flex-shrink-0"
          />
          <div>
            <p className="text-xs font-bold text-indigo-300">Kenji-sensei:</p>
            <p className="text-xs text-slate-200 italic mt-0.5">
              “Always ask your cab driver: ‘Who are you picking up?’ Never volunteer your name first!”
            </p>
          </div>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('kiosk_simulator');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'kiosk_simulator'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Interactive Ticket Machine Simulator</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('guides');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'guides'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Cabs, Metro & Bus Guides</span>
        </button>
      </div>

      {activeTab === 'kiosk_simulator' ? (
        <TransitKioskSimulator onAddXp={onAddXp} />
      ) : (
        <div className="space-y-6">
          {/* Guide Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {transitGuides.map((guide) => {
              const isSelected = selectedGuideId === guide.id;
              const isDone = practicedGuides.includes(guide.id);
              return (
                <button
                  key={guide.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedGuideId(guide.id);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-xl shadow-indigo-500/20 scale-[1.02]'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {guide.category === 'cabs' && <Car className="w-5 h-5 text-amber-400" />}
                      {guide.category === 'subway' && <Train className="w-5 h-5 text-blue-400" />}
                      {guide.category === 'bus' && <Bus className="w-5 h-5 text-emerald-400" />}
                      <h3 className="font-bold text-sm">{guide.title}</h3>
                    </div>
                    <p className={`text-xs ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {guide.steps.length} Core Checkpoints
                    </p>
                  </div>

                  {isDone && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Active Guide Content */}
          <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-700/80 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>{currentGuide.title}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Step-by-step masterclass with practical drills and live audio dialogues.
                </p>
              </div>

              <button
                onClick={() => handlePracticeGuide(currentGuide.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  practicedGuides.includes(currentGuide.id)
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {practicedGuides.includes(currentGuide.id)
                    ? 'Mastered ✓'
                    : 'Mark Completed (+30 XP)'}
                </span>
              </button>
            </div>

            {/* Step Checkpoints */}
            <div className="space-y-4">
              {currentGuide.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-white text-sm sm:text-base">{step.title}</h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-10">
                    {step.desc}
                  </p>

                  {step.tip && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-xs text-amber-200/90 ml-10">
                      💡 <strong>Pro Tip:</strong> {step.tip}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* English Dialogue with Audio & Voice Speech Practice */}
            {currentGuide.englishDialogue && currentGuide.englishDialogue.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-700/80">
                <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Real-World English Dialogue:
                </h3>
                <div className="space-y-2.5">
                  {currentGuide.englishDialogue.map((d, i) => (
                    <div
                      key={i}
                      className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2"
                    >
                      <div className="text-xs text-slate-200">
                        <span className="font-bold text-indigo-400">{d.speaker}: </span>
                        <span>{d.text}</span>
                      </div>
                      <AudioSpeakButton text={d.text} />
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <VoiceSpeechPractice
                    targetPhrase={currentGuide.englishDialogue[0].text.replace(/[“”"]/g, '')}
                    phraseMeaning={`English dialogue for ${currentGuide.title}`}
                    onSuccess={() => onAddXp(20, 'Spoke transit English phrase')}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
