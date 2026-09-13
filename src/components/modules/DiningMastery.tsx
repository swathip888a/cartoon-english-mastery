import React, { useState } from 'react';
import { diningGuide } from '../../data/diningData';
import { mentors } from '../../data/mentorsData';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { sound } from '../../utils/audio';
import {
  Utensils,
  Receipt,
  GlassWater,
  Calculator,
  CheckCircle2,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiningMasteryProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const DiningMastery: React.FC<DiningMasteryProps> = ({ onAddXp }) => {
  // Tip Calculator State
  const [billAmount, setBillAmount] = useState<number>(45.0);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [splitCount, setSplitCount] = useState<number>(2);

  const tipTotal = (billAmount * tipPercent) / 100;
  const grandTotal = billAmount + tipTotal;
  const perPersonTotal = grandTotal / splitCount;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-950/40 via-slate-900 to-orange-950/30 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40">
              GOURMET DINING & RESTAURANT MASTERY
            </span>
            <span className="text-xs text-slate-400">Led by {mentors.sakura.name}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Dine Out with Supreme Elegance 🍽️✨
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            From greeting the hostess to free tap water vs bottled traps, menu courses, waiter attention gestures, and mastering the US tipping matrix.
          </p>
        </div>

        {/* Sakura Card */}
        <div className="bg-slate-800/90 rounded-2xl p-4 border border-amber-500/40 shadow-xl max-w-xs flex items-center gap-3">
          <img
            src={mentors.sakura.avatar}
            alt="Sakura"
            className="w-12 h-12 rounded-xl object-cover border-2 border-amber-500 flex-shrink-0"
          />
          <div>
            <p className="text-xs font-bold text-amber-300">Sakura-senpai:</p>
            <p className="text-xs text-slate-200 italic mt-0.5">
              “Remember: Always specify ‘Tap water’ if you want complimentary free iced water!”
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column: Dining Phases & Interactive Tip Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 5 Dining Phases */}
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Utensils className="w-5 h-5 text-amber-400" />
            <span>The 5 Lifecycle Stages of Dining Out</span>
          </h2>

          <div className="space-y-4">
            {diningGuide.map((section) => (
              <div
                key={section.id}
                className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 shadow-xl space-y-4"
              >
                <div className="border-b border-slate-700/80 pb-2">
                  <h3 className="font-bold text-base text-white">{section.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{section.summary}</p>
                </div>

                <div className="space-y-3">
                  {section.stepsOrTips.map((tip, idx) => (
                    <div key={idx} className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-amber-300">{tip.title}</p>
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{tip.content}</p>
                      {tip.keyPhrase && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                          <p className="text-xs text-white font-medium italic">{tip.keyPhrase}</p>
                          <AudioSpeakButton text={tip.keyPhrase} size="sm" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Tip & Split Calculator */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-amber-500/40 shadow-2xl space-y-5 sticky top-24">
            <div className="flex items-center gap-2 border-b border-slate-700 pb-3">
              <Calculator className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">Interactive Tip & Bill Splitter</h3>
            </div>

            {/* Bill Amount */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Bill Subtotal ($ USD):
              </label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-base font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Tip Percentage Buttons */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Tip Rate:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 18, 20, 25].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => {
                      sound.playClick();
                      setTipPercent(rate);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      tipPercent === rate
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* Split count */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Split Between (People):
              </label>
              <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-700">
                <button
                  onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                  className="text-slate-400 hover:text-white px-2 font-bold text-base"
                >
                  -
                </button>
                <span className="flex-1 text-center font-bold text-sm text-white">{splitCount} person(s)</span>
                <button
                  onClick={() => setSplitCount(Math.min(10, splitCount + 1))}
                  className="text-slate-400 hover:text-white px-2 font-bold text-base"
                >
                  +
                </button>
              </div>
            </div>

            {/* Summary Outputs */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Tip Amount ({tipPercent}%):</span>
                <span className="font-mono font-bold text-amber-400">${tipTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300 font-bold border-t border-slate-800 pt-2">
                <span>Grand Total:</span>
                <span className="font-mono text-sm text-white">${grandTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-extrabold text-sm border-t border-slate-800 pt-2">
                <span>Each Person Pays:</span>
                <span className="font-mono text-base">${perPersonTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* What to write on the receipt slip */}
            <div className="bg-amber-950/20 p-3 rounded-xl border border-amber-500/20 text-[11px] text-amber-200">
              ✍️ <strong>On Receipt Paper Slip:</strong> Write <code>${tipTotal.toFixed(2)}</code> in Tip line, <code>${grandTotal.toFixed(2)}</code> in Total line, and sign your name!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
