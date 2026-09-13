import React from 'react';
import { ModuleCategory, UserStats } from '../types';
import { calculateLevel, getLevelTitle } from '../utils/storage';
import { sound } from '../utils/audio';
import {
  Coffee,
  Plane,
  Car,
  Utensils,
  Hotel,
  Sparkles,
  HeartPulse,
  Languages,
  BookOpen,
  Zap,
  Volume2,
  VolumeX,
  Compass,
  Layers,
  Gamepad2,
  Crown,
  ShoppingBag,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  currentTab: ModuleCategory;
  onSelectTab: (tab: ModuleCategory) => void;
  stats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  stats,
  onUpdateStats,
}) => {
  const { level, currentLevelXp, nextLevelXp, progressPercent } = calculateLevel(stats.xp);
  const levelInfo = getLevelTitle(level);

  const navItems: { id: ModuleCategory; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'openworld', label: '🌍 3D Open-World Universe', icon: <Gamepad2 className="w-4 h-4 text-emerald-400" />, badge: 'FREE ROAM 🎮' },
    { id: 'starbucks', label: '☕ 3D Starbucks Roastery', icon: <Coffee className="w-4 h-4 text-amber-400" />, badge: 'ORDER 3D ☕' },
    { id: 'airport', label: '🛫 3D Airport & Changi Jewel', icon: <Plane className="w-4 h-4 text-sky-400" />, badge: 'FLY 3D 🛫' },
    { id: 'hotel', label: '🏨 3D 5-Star Marina Hotel', icon: <Hotel className="w-4 h-4 text-rose-400" />, badge: 'SUITE 3D 🏨' },
    { id: 'fashion', label: '👗 3D Fashion Boutique', icon: <ShoppingBag className="w-4 h-4 text-purple-400" />, badge: 'SHOP 3D 👗' },
    { id: 'formslab', label: '📋 Official Travel Forms Lab', icon: <BookOpen className="w-4 h-4 text-yellow-400" />, badge: 'DOCUMENTS 📋' },
    { id: 'overview', label: 'Academy HQ', icon: <Compass className="w-4 h-4" /> },
    { id: 'transit', label: 'Transit & Metro', icon: <Car className="w-4 h-4" /> },
    { id: 'dining', label: 'Dining & Restaurants', icon: <Utensils className="w-4 h-4" /> },
    { id: 'restroom', label: 'Smart Bathrooms', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'health', label: 'Health & Clinic', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'english', label: 'English Lingo Dojo', icon: <Languages className="w-4 h-4" />, badge: 'VOICE' },
    { id: 'quests', label: 'Daily Anime Stories', icon: <Crown className="w-4 h-4" />, badge: 'STORY' },
    { id: 'codex', label: 'Pocket Survival Codex', icon: <Zap className="w-4 h-4" /> },
    { id: 'flashcards', label: 'Flashcards Trainer', icon: <Layers className="w-4 h-4" /> },
  ];

  const handleSoundToggle = () => {
    const nextSound = !stats.soundEnabled;
    sound.enabled = nextSound;
    if (nextSound) sound.playClick();
    onUpdateStats({ ...stats, soundEnabled: nextSound });
  };

  const handleXpCelebration = () => {
    sound.playLevelUp();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.1, x: 0.8 },
      colors: ['#ec4899', '#3b82f6', '#10b981', '#f59e0b'],
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
      {/* Top Banner with Swathi's Brand & Level Progress */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* App Title */}
        <div
          onClick={() => {
            sound.playClick();
            onSelectTab('overview');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-500 p-0.5 shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 text-lg sm:text-xl tracking-tight">
                SWATHI'S
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                LIFE ACADEMY
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Sekai Real-World Survival & Mastery Masterclass
            </p>
          </div>
        </div>

        {/* User Level & XP Bar */}
        <div className="flex items-center gap-4">
          <div
            onClick={handleXpCelebration}
            className="flex items-center gap-3 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700/80 cursor-pointer hover:border-pink-500/50 transition-all shadow-inner"
            title="Click for celebratory fanfare!"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs text-white shadow"
              style={{ backgroundColor: levelInfo.color }}
            >
              {level}
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center justify-between text-[11px] gap-2">
                <span className="font-bold text-slate-200">{levelInfo.title}</span>
                <span className="text-pink-400 font-mono font-semibold">
                  {currentLevelXp} / {nextLevelXp} XP
                </span>
              </div>
              <div className="w-28 h-1.5 bg-slate-700 rounded-full overflow-hidden mt-0.5">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-indigo-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`p-2 rounded-xl border transition-all ${
              stats.soundEnabled
                ? 'bg-slate-800 text-pink-400 border-pink-500/30 hover:bg-pink-500/20'
                : 'bg-slate-800/50 text-slate-500 border-slate-700'
            }`}
            title={stats.soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          >
            {stats.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar border-t border-slate-800/60">
        <nav className="flex items-center gap-1.5 py-2 min-w-max">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onSelectTab(item.id);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all relative ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-600/30 to-purple-600/30 text-pink-300 border border-pink-500/40 shadow-sm shadow-pink-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-pink-500 text-white'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
