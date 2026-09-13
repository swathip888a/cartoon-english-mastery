import React, { useState } from 'react';
import { healthTriageTiers, symptomVocabulary, medicineLabelDecoders } from '../../data/healthData';
import { mentors } from '../../data/mentorsData';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { sound } from '../../utils/audio';
import {
  HeartPulse,
  Pill,
  Stethoscope,
  AlertOctagon,
  HelpCircle,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HealthMasteryProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const HealthMastery: React.FC<HealthMasteryProps> = ({ onAddXp }) => {
  const [selectedTriageId, setSelectedTriageId] = useState<string>('urgent_care');
  const [activeTab, setActiveTab] = useState<'triage' | 'symptoms' | 'medicine_labels'>('triage');

  const currentTier = healthTriageTiers.find((t) => t.id === selectedTriageId) || healthTriageTiers[1];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40">
              VITALITY & HEALTHCARE MASTERCLASS
            </span>
            <span className="text-xs text-slate-400">Led by {mentors.aoi.name}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Healthcare Triage, Pharmacy & Symptoms 🏥💊
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Know exactly when to go to Pharmacy vs Urgent Care vs Emergency Room (ER), how to describe symptoms clearly in English, and how to read prescription dosage instructions.
          </p>
        </div>

        {/* Aoi Card */}
        <div className="bg-slate-800/90 rounded-2xl p-4 border border-emerald-500/40 shadow-xl max-w-xs flex items-center gap-3">
          <img
            src={mentors.aoi.avatar}
            alt="Aoi"
            className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-500 flex-shrink-0"
          />
          <div>
            <p className="text-xs font-bold text-emerald-300">Aoi-chan:</p>
            <p className="text-xs text-slate-200 italic mt-0.5">
              “For minor sprains or cuts needing stitches, always pick Urgent Care to avoid $2,000 ER bills!”
            </p>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('triage');
          }}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'triage'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Where to Go: ER vs Urgent Care vs Pharmacy</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('symptoms');
          }}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'symptoms'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <HeartPulse className="w-4 h-4" />
          <span>English Symptom Vocabulary (Audio)</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('medicine_labels');
          }}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'medicine_labels'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>Reading Medicine Dosage Labels</span>
        </button>
      </div>

      {/* TAB 1: TRIAGE SELECTOR */}
      {activeTab === 'triage' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {healthTriageTiers.map((tier) => {
              const isSelected = selectedTriageId === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedTriageId(tier.id);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-slate-800 text-white shadow-xl scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  }`}
                  style={{ borderColor: isSelected ? tier.color : undefined }}
                >
                  <h3 className="font-bold text-sm sm:text-base flex items-center gap-2" style={{ color: tier.color }}>
                    {tier.name}
                  </h3>
                  <div className="mt-2 text-xs text-slate-400 space-y-1">
                    <p>💰 Est. Cost: <strong className="text-slate-200">{tier.approxCostTier}</strong></p>
                    <p>⏱️ Wait: <strong className="text-slate-200">{tier.waitTimes}</strong></p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Tier Card */}
          <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-5 shadow-2xl">
            <div className="border-b border-slate-700 pb-3">
              <h2 className="text-xl font-bold text-white" style={{ color: currentTier.color }}>
                {currentTier.name} Protocol
              </h2>
            </div>

            {/* When to Go Checklist */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">When You Should Choose This:</p>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {currentTier.whenToGo.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Say at the Desk */}
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-emerald-300">Exact Words to Speak in English:</p>
                <AudioSpeakButton text={currentTier.whatToSay} size="sm" />
              </div>
              <p className="text-xs sm:text-sm text-white font-medium italic bg-slate-950 p-3 rounded-xl border border-slate-800">
                {currentTier.whatToSay}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SYMPTOM VOCABULARY */}
      {activeTab === 'symptoms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {symptomVocabulary.map((sym, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 flex items-center justify-between gap-3 shadow-lg"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">{sym.term}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-emerald-300">
                    {sym.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{sym.meaning}</p>
              </div>

              <AudioSpeakButton text={sym.term} size="sm" />
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: MEDICINE LABELS */}
      {activeTab === 'medicine_labels' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {medicineLabelDecoders.map((med, idx) => (
              <div key={idx} className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-1 shadow-lg">
                <h3 className="font-bold text-sm text-emerald-300">🏷️ {med.term}</h3>
                <p className="text-xs text-slate-200 leading-relaxed">{med.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
