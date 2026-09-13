import React, { useState } from 'react';
import { flashcards } from '../../data/flashcardsData';
import { Flashcard } from '../../types';
import { sound } from '../../utils/audio';
import {
  Layers,
  Sparkles,
  RotateCw,
  CheckCircle2,
  HelpCircle,
  Trophy,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlashcardTrainerProps {
  masteredCards: string[];
  onAddXp: (amount: number, reason: string) => void;
  onMasterCard: (cardId: string) => void;
}

export const FlashcardTrainer: React.FC<FlashcardTrainerProps> = ({
  masteredCards,
  onAddXp,
  onMasterCard,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const card: Flashcard = flashcards[currentIndex] || flashcards[0];
  const isMastered = masteredCards.includes(card.id);

  const handleFlip = () => {
    sound.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    sound.playClick();
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    sound.playClick();
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleMarkMastered = () => {
    if (!isMastered) {
      sound.playSuccess();
      onMasterCard(card.id);
      onAddXp(25, 'Mastered Survival Flashcard! 🧠✨');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/30 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/40 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>SPACED REPETITION MEMORY DOJO</span>
            </span>
            <span className="text-xs text-slate-400">Never Forget Any Survival Rule</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Flashcard Retention Trainer 🧠🎴
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Test your memory on Starbucks ordering formulas, TSA security guidelines, Japanese smart bidet buttons, and healthcare rules with interactive flip cards!
          </p>
        </div>

        {/* Mastered Counter */}
        <div className="bg-slate-800/90 rounded-2xl p-4 border border-indigo-500/40 shadow-xl max-w-xs text-center space-y-1">
          <p className="text-xs text-slate-400 font-bold">CARDS MASTERED</p>
          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
            {masteredCards.length} / {flashcards.length}
          </p>
        </div>
      </div>

      {/* The 3D Flip Flashcard */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div
          onClick={handleFlip}
          className="group relative cursor-pointer min-h-[320px] rounded-3xl p-8 border-2 transition-all duration-500 flex flex-col justify-between shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 hover:scale-[1.02]"
          style={{ borderColor: isFlipped ? '#ec4899' : '#6366f1' }}
        >
          {/* Card Top Indicator */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Card {currentIndex + 1} of {flashcards.length}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Click to Flip</span>
              </span>
              {isMastered && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            </div>
          </div>

          {/* Card Main Question or Answer */}
          <div className="my-6 text-center space-y-4">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-400 block">
              {isFlipped ? 'ANSWER (REVEALED)' : 'SURVIVAL QUESTION'}
            </span>
            <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {isFlipped ? card.answer : card.question}
            </p>
          </div>

          {/* Anime Hint or Bottom Helper */}
          <div className="border-t border-slate-700/80 pt-4 flex items-center justify-between text-xs">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowHint(!showHint);
              }}
              className="text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Anime Hint' : 'Show Anime Hint'}</span>
            </button>

            <span className="text-slate-400">Category: <strong className="text-slate-200 capitalize">{card.category}</strong></span>
          </div>

          {/* Hint Overlay */}
          {showHint && (
            <div className="mt-3 bg-pink-950/40 p-3 rounded-xl border border-pink-500/30 text-xs text-pink-200 text-left animate-fadeIn">
              💡 {card.animeHint}
            </div>
          )}
        </div>

        {/* Card Controls Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleMarkMastered}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              isMastered
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isMastered ? 'Mastered (+25 XP)' : 'Mark as Mastered (+25 XP)'}</span>
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
