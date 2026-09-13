import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import {
  Luggage,
  Scale,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  PackageCheck,
  Laptop,
  Flame,
  Droplets,
  Wine
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AirportLuggageSecuritySimProps {
  onAddXp: (amount: number, reason: string) => void;
}

interface SorterItem {
  id: string;
  name: string;
  category: 'laptop_electronics' | 'liquids_100ml' | 'large_liquids' | 'prohibited' | 'normal_clothes';
  icon: string;
  allowedLocation: 'tray_separate' | 'transparent_bag' | 'checked_only' | 'confiscated' | 'keep_in_bag';
  explanation: string;
}

const SECURITY_ITEMS: SorterItem[] = [
  { id: 'laptop', name: 'MacBook / Laptop Computer', category: 'laptop_electronics', icon: 'Laptop', allowedLocation: 'tray_separate', explanation: 'Laptops must be placed in their own separate gray plastic tray at TSA scanners.' },
  { id: 'water_bottle', name: 'Full 500ml Water Bottle', category: 'large_liquids', icon: 'Droplets', allowedLocation: 'confiscated', explanation: 'Liquids over 100ml (3.4 oz) cannot pass through security. Finish or empty it before security!' },
  { id: 'perfume_sample', name: '50ml Travel Perfume Bottle', category: 'liquids_100ml', icon: 'Wine', allowedLocation: 'transparent_bag', explanation: 'Containers under 100ml must all fit together into 1 clear resealable 1-quart plastic bag.' },
  { id: 'powerbank', name: '20,000mAh Lithium Power Bank', category: 'laptop_electronics', icon: 'Flame', allowedLocation: 'keep_in_bag', explanation: 'Lithium battery power banks MUST be in Carry-on luggage; never put in checked luggage (fire hazard)!' },
  { id: 'sweater', name: 'Winter Jacket / Hoodie', category: 'normal_clothes', icon: 'Luggage', allowedLocation: 'tray_separate', explanation: 'Outer heavy jackets, coats, and belts must be removed and placed in a bin.' }
];

export const AirportLuggageSecuritySim: React.FC<AirportLuggageSecuritySimProps> = ({ onAddXp }) => {
  // Luggage Scale State
  const [bagWeightKg, setBagWeightKg] = useState<number>(21.5);
  const [isWeighed, setIsWeighed] = useState<boolean>(false);

  // TSA Sorter State
  const [itemPlacements, setItemPlacements] = useState<Record<string, string>>({});
  const [isSubmittedTSA, setIsSubmittedTSA] = useState<boolean>(false);
  const [sorterScore, setSorterScore] = useState<number>(0);

  const handlePlaceItem = (itemId: string, destination: string) => {
    sound.playClick();
    setItemPlacements((prev) => ({
      ...prev,
      [itemId]: destination
    }));
  };

  const handleEvaluateTSA = () => {
    let correctCount = 0;
    SECURITY_ITEMS.forEach((item) => {
      if (itemPlacements[item.id] === item.allowedLocation) {
        correctCount++;
      }
    });

    setSorterScore(correctCount);
    setIsSubmittedTSA(true);

    if (correctCount === SECURITY_ITEMS.length) {
      sound.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
      onAddXp(50, 'Passed TSA Security Checkpoint with 100% Accuracy! 🛡️✈️');
    } else {
      sound.playClick();
      onAddXp(20, 'Practiced TSA Security Sorter');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Interactive Luggage Weighing Scale */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Interactive Bag Drop & Luggage Scale</h3>
              <p className="text-xs text-slate-400">Standard Economy Checked Bag Allowance: 23 kg (50 lbs)</p>
            </div>
          </div>

          <span
            className={`text-xs font-black px-3 py-1 rounded-full border ${
              bagWeightKg <= 23.0
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
            }`}
          >
            {bagWeightKg <= 23.0 ? '✓ ALLOWED (Under 23kg)' : '⚠️ OVERWEIGHT FEE ($100)'}
          </span>
        </div>

        {/* Digital Scale Readout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="bg-slate-950 border-2 border-blue-500/40 rounded-2xl p-6 text-center space-y-3 shadow-inner">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">DIGITAL WEIGHING DISPLAY</p>
            <p className="text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-cyan-300">
              {bagWeightKg.toFixed(1)} <span className="text-2xl text-blue-400">KG</span>
            </p>
            <p className="text-xs text-slate-400 font-mono">≈ {(bagWeightKg * 2.20462).toFixed(1)} LBS</p>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-300 block">
              Simulate Bag Weight Adjustments:
            </label>
            <div className="flex items-center gap-2">
              {[18.5, 21.5, 23.0, 25.8, 28.2].map((w) => (
                <button
                  key={w}
                  onClick={() => {
                    sound.playClick();
                    setBagWeightKg(w);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs border transition-all ${
                    bagWeightKg === w
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {w} kg
                </button>
              ))}
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              💡 <strong>Check-in Agent Dialogue:</strong>
              {bagWeightKg <= 23.0 ? (
                <p className="text-emerald-300 mt-1 italic">
                  "Your bag is {bagWeightKg} kg, perfectly within the limit! Here is your bag tag claim sticker."
                </p>
              ) : (
                <p className="text-rose-300 mt-1 italic">
                  "Excuse me, this suitcase is {bagWeightKg} kg (over the 23kg limit). You can either repack items into your carry-on or pay the $100 heavy luggage fee."
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive TSA Security Screening Sorter */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">TSA Airport Security Sorter Minigame</h3>
              <p className="text-xs text-slate-400">Sort items into their correct scanning containers before the X-ray machine.</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setItemPlacements({});
              setIsSubmittedTSA(false);
            }}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Sorter
          </button>
        </div>

        {/* Sorter Items */}
        <div className="space-y-4">
          {SECURITY_ITEMS.map((item) => {
            const currentPlacement = itemPlacements[item.id];
            const isCorrect = currentPlacement === item.allowedLocation;
            return (
              <div
                key={item.id}
                className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-sm">
                  <p className="font-bold text-sm text-slate-100">{item.name}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.explanation}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'tray_separate', label: 'Separate Gray Tray' },
                    { id: 'transparent_bag', label: '1-Quart Clear Bag' },
                    { id: 'keep_in_bag', label: 'Keep in Carry-on' },
                    { id: 'confiscated', label: 'Cannot Take (Trash/Drink)' }
                  ].map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handlePlaceItem(item.id, loc.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        currentPlacement === loc.id
                          ? isSubmittedTSA
                            ? isCorrect
                              ? 'bg-emerald-600 text-white border-emerald-400'
                              : 'bg-rose-600 text-white border-rose-400'
                            : 'bg-purple-600 text-white border-purple-400 shadow'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Evaluate Button */}
        <button
          onClick={handleEvaluateTSA}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-600 text-white font-extrabold text-sm shadow-xl hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Verify TSA Security Sorting (+50 XP)</span>
        </button>

        {isSubmittedTSA && (
          <div
            className={`p-4 rounded-2xl border text-center font-bold text-sm ${
              sorterScore === SECURITY_ITEMS.length
                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/50 border-amber-500/40 text-amber-300'
            }`}
          >
            {sorterScore === SECURITY_ITEMS.length
              ? '🎉 100% Security Pass! You breezed through airport security without any alarms.'
              : `You scored ${sorterScore}/${SECURITY_ITEMS.length} correct. Review the explanations above and try again!`}
          </div>
        )}
      </div>
    </div>
  );
};
