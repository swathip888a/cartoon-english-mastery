import React, { useState, useEffect } from 'react';
import { ModuleCategory, UserStats } from './types';
import { getStoredStats, saveStats, calculateLevel } from './utils/storage';
import { sound } from './utils/audio';

import { Navbar } from './components/Navbar';
import { OverviewDashboard } from './components/modules/OverviewDashboard';
import { StarbucksMastery } from './components/modules/StarbucksMastery';
import { AirportMasterclass } from './components/modules/AirportMasterclass';
import { TransitMastery } from './components/modules/TransitMastery';
import { DiningMastery } from './components/modules/DiningMastery';
import { HotelMastery } from './components/modules/HotelMastery';
import { RestroomMastery } from './components/modules/RestroomMastery';
import { HealthMastery } from './components/modules/HealthMastery';
import { EnglishDojo } from './components/modules/EnglishDojo';
import { VisualNovelQuests } from './components/modules/VisualNovelQuests';
import { PocketCodex } from './components/modules/PocketCodex';
import { FlashcardTrainer } from './components/modules/FlashcardTrainer';
import { FormFillingLab } from './components/modules/FormFillingLab';
import { FashionShoppingMall } from './components/modules/FashionShoppingMall';
import { OpenWorldGameEngine } from './components/modules/OpenWorldGameEngine';
import { RealOpenWorldGame } from './components/modules/RealOpenWorldGame';
import { UltimateRealOpenWorldEngine } from './components/modules/UltimateRealOpenWorldEngine';
import { Sparkles, Trophy, Heart, Coffee, ShieldCheck, Gamepad2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(getStoredStats());
  const [currentTab, setCurrentTab] = useState<ModuleCategory>('openworld');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  const addXp = (amount: number, reason: string) => {
    const prevLevel = calculateLevel(stats.xp).level;
    const nextXp = stats.xp + amount;
    const nextLevel = calculateLevel(nextXp).level;

    setStats((prev) => ({
      ...prev,
      xp: nextXp,
      level: nextLevel,
    }));

    setToastMessage(`+${amount} XP: ${reason}`);
    setTimeout(() => setToastMessage(null), 3000);

    if (nextLevel > prevLevel) {
      sound.playLevelUp();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.4 },
        colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'],
      });
    }
  };

  const handleCompleteQuest = (questId: string) => {
    if (!stats.completedQuests.includes(questId)) {
      setStats((prev) => ({
        ...prev,
        completedQuests: [...prev.completedQuests, questId],
      }));
    }
  };

  const handleMasterCard = (cardId: string) => {
    if (!stats.masteredFlashcards.includes(cardId)) {
      setStats((prev) => ({
        ...prev,
        masteredFlashcards: [...prev.masteredFlashcards, cardId],
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      {/* Dynamic Background Glow Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] right-[15%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px]" />
      </div>

      {/* Floating XP Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-2xl border border-pink-400/50 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        stats={stats}
        onUpdateStats={setStats}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {currentTab === 'openworld' && (
          <UltimateRealOpenWorldEngine
            onNavigateTab={(mod) => {
              setCurrentTab(mod as any);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddXp={(amount, reason) => addXp(amount, reason)}
          />
        )}

        {currentTab === 'overview' && (
          <OverviewDashboard
            stats={stats}
            onSelectTab={setCurrentTab}
            onAddXp={addXp}
          />
        )}

        {currentTab === 'starbucks' && (
          <StarbucksMastery onAddXp={addXp} />
        )}

        {currentTab === 'airport' && (
          <AirportMasterclass onAddXp={addXp} />
        )}

        {currentTab === 'transit' && (
          <TransitMastery onAddXp={addXp} />
        )}

        {currentTab === 'fashion' && (
          <FashionShoppingMall onAddXp={addXp} />
        )}

        {currentTab === 'dining' && (
          <DiningMastery onAddXp={addXp} />
        )}

        {currentTab === 'hotel' && (
          <HotelMastery onAddXp={addXp} />
        )}

        {currentTab === 'restroom' && (
          <RestroomMastery onAddXp={addXp} />
        )}

        {currentTab === 'health' && (
          <HealthMastery onAddXp={addXp} />
        )}

        {currentTab === 'english' && (
          <EnglishDojo onAddXp={addXp} />
        )}

        {currentTab === 'formslab' && (
          <FormFillingLab onAddXp={addXp} />
        )}

        {currentTab === 'quests' && (
          <VisualNovelQuests
            completedQuests={stats.completedQuests}
            onAddXp={addXp}
            onCompleteQuest={handleCompleteQuest}
          />
        )}

        {currentTab === 'codex' && (
          <PocketCodex />
        )}

        {currentTab === 'flashcards' && (
          <FlashcardTrainer
            masteredCards={stats.masteredFlashcards}
            onAddXp={addXp}
            onMasterCard={handleMasterCard}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-6 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
              SWATHI'S LIFE SURVIVAL ACADEMY
            </span>
            <span>• Cartoon Real-World Simulator</span>
          </div>

          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> for fearless real-world adventures!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
