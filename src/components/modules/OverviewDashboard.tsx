import React from 'react';
import { ModuleCategory, UserStats } from '../../types';
import { mentors } from '../../data/mentorsData';
import { AnimeCharacterCard } from '../AnimeCharacterCard';
import { sound } from '../../utils/audio';
import { calculateLevel, getLevelTitle } from '../../utils/storage';
import {
  Coffee,
  Plane,
  Car,
  Utensils,
  Hotel,
  Sparkles,
  HeartPulse,
  Languages,
  Crown,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle,
  Trophy,
  Star,
  Gamepad2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OverviewDashboardProps {
  stats: UserStats;
  onSelectTab: (tab: ModuleCategory) => void;
  onAddXp: (amount: number, reason: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  stats,
  onSelectTab,
  onAddXp,
}) => {
  const { level, currentLevelXp, nextLevelXp, progressPercent } = calculateLevel(stats.xp);
  const levelInfo = getLevelTitle(level);

  const modules = [
    {
      id: 'openworld' as ModuleCategory,
      title: 'GTA Life RPG: Open-World City',
      subtitle: 'Walk around town with WASD/touch joystick, visit Starbucks, board flights & talk to NPCs in English!',
      mentor: mentors.sakura,
      icon: <Gamepad2 className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/40',
      statsCount: 'Full 2D Playable City 🎮',
    },
    {
      id: 'starbucks' as ModuleCategory,
      title: 'Starbucks & Coffee Mastery',
      subtitle: 'From sizing to secret syrup formulas, bakery items & interactive barista simulator',
      mentor: mentors.sakura,
      icon: <Coffee className="w-6 h-6 text-pink-400" />,
      color: 'from-pink-500/20 to-rose-500/10',
      border: 'border-pink-500/30',
      statsCount: 'Drinks, Bakery & Cashier',
    },
    {
      id: 'airport' as ModuleCategory,
      title: 'Airport & Flight Expedition',
      subtitle: '10-step full checkpoint guide, TSA 3-1-1 rules, luggage scale & boarding pass decoder',
      mentor: mentors.kenji,
      icon: <Plane className="w-6 h-6 text-blue-400" />,
      color: 'from-blue-500/20 to-cyan-500/10',
      border: 'border-blue-500/30',
      statsCount: '10 Checkpoints & TSA Sim',
    },
    {
      id: 'transit' as ModuleCategory,
      title: 'Transit, Metro & Ticket Kiosk',
      subtitle: 'Interactive touchscreen ticket machine, Uber safety, and bus navigation',
      mentor: mentors.kenji,
      icon: <Car className="w-6 h-6 text-indigo-400" />,
      color: 'from-indigo-500/20 to-violet-500/10',
      border: 'border-indigo-500/30',
      statsCount: 'Ticket Machine & Guides',
    },
    {
      id: 'formslab' as ModuleCategory,
      title: 'Real-World Forms Lab',
      subtitle: 'Interactive customs cards, hotel registration & medical intake paperwork',
      mentor: mentors.sakura,
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      color: 'from-cyan-500/20 to-sky-500/10',
      border: 'border-cyan-500/30',
      statsCount: '4 Interactive Forms',
    },
    {
      id: 'english' as ModuleCategory,
      title: 'Conversational English Dojo',
      subtitle: '3-tier politeness comparison & real-time microphone voice scoring',
      mentor: mentors.ren,
      icon: <Languages className="w-6 h-6 text-sky-400" />,
      color: 'from-sky-500/20 to-blue-500/10',
      border: 'border-sky-500/30',
      statsCount: 'Audio + Voice Mic',
    },
    {
      id: 'quests' as ModuleCategory,
      title: 'Daily Anime Stories & RPG',
      subtitle: '5 Daily Life Episodes (Cafe, Airport, Hotel, Dining, Clinic) with branching choices',
      mentor: mentors.sakura,
      icon: <Crown className="w-6 h-6 text-yellow-400" />,
      color: 'from-yellow-500/20 to-amber-500/10',
      border: 'border-yellow-500/30',
      statsCount: '5 Anime Story Episodes',
    },
    {
      id: 'dining' as ModuleCategory,
      title: 'Dining & Restaurants',
      subtitle: 'Table greetings, free tap water, menu courses, tipping 18-20% guide',
      mentor: mentors.sakura,
      icon: <Utensils className="w-6 h-6 text-amber-400" />,
      color: 'from-amber-500/20 to-orange-500/10',
      border: 'border-amber-500/30',
      statsCount: '5 Dining Phases',
    },
    {
      id: 'hotel' as ModuleCategory,
      title: 'Hotels & Accommodations',
      subtitle: 'Check-in credit holds, sneaky sensor minibars, room key switches',
      mentor: mentors.ren,
      icon: <Hotel className="w-6 h-6 text-purple-400" />,
      color: 'from-purple-500/20 to-fuchsia-500/10',
      border: 'border-purple-500/30',
      statsCount: '4 Stay Checklists',
    },
    {
      id: 'restroom' as ModuleCategory,
      title: 'Smart Restrooms & Japanese Washlets',
      subtitle: 'Interactive bidet console, avoiding red emergency cord catastrophe',
      mentor: mentors.aoi,
      icon: <Sparkles className="w-6 h-6 text-teal-400" />,
      color: 'from-teal-500/20 to-emerald-500/10',
      border: 'border-teal-500/30',
      statsCount: 'Interactive Bidet Sim',
    },
    {
      id: 'health' as ModuleCategory,
      title: 'Health, Emergency & Pharmacy',
      subtitle: 'Triage helper (ER vs Urgent Care vs Pharmacy) & medicine labels',
      mentor: mentors.aoi,
      icon: <HeartPulse className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-500/20 to-green-500/10',
      border: 'border-emerald-500/30',
      statsCount: 'Triage & Symptom Vocab',
    },
    {
      id: 'fashion' as ModuleCategory,
      title: 'Fashion & Shopping Mall',
      subtitle: 'Clothing sizes (XS-XXL), fitting rooms, discounts, and cashier checkout',
      mentor: mentors.sakura,
      icon: <Layers className="w-6 h-6 text-pink-400" />,
      color: 'from-pink-500/20 to-purple-500/10',
      border: 'border-pink-500/30',
      statsCount: 'Boutique & Fitting Rooms',
    },
  ];

  const handleClaimDailyGift = () => {
    sound.playSuccess();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
    onAddXp(50, 'Daily World Explorer Gift Claimed! 🌟');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-10 overflow-hidden border border-pink-500/30 bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SWATHI’S WORLD SURVIVAL HQ</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Master the Real World with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300">
                Total Confidence
              </span>
              ! 🌸
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every detail decoded pin-to-pin: ordering Starbucks like a pro barista, gliding through international airport security, navigating cabs & subways, restaurant etiquette, high-tech Japanese smart restrooms, healthcare emergency triage, and spoken English mastery with audio pronunciation!
            </p>

            {/* Action Bar */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab('openworld');
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-black text-sm shadow-xl shadow-emerald-500/30 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 border-2 border-emerald-300/40"
              >
                <Gamepad2 className="w-5 h-5 text-yellow-300 animate-bounce" />
                <span>Play GTA Life RPG Mode (WASD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab('quests');
                }}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-pink-500/25 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                <Crown className="w-4 h-4" />
                <span>Anime Story Chapters</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab('codex');
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-pink-500/40 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Pocket Survival Codex (Quick Search)</span>
              </button>

              <button
                onClick={handleClaimDailyGift}
                className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                <Star className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>Claim +50 XP Daily Gift</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="w-full lg:w-80 bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-white text-sm">Adventurer Status</span>
              </div>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${levelInfo.color}25`, color: levelInfo.color }}
              >
                Level {level}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Current Rank:</span>
                <span className="text-slate-200 font-bold">{levelInfo.title}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Total Experience:</span>
                <span className="text-pink-400 font-mono font-bold">{stats.xp} XP</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Next Level:</span>
                <span className="text-slate-300 font-mono">
                  {currentLevelXp} / {nextLevelXp} XP ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-slate-900/60 p-2 rounded-lg">
                <p className="text-slate-400">Quests Done</p>
                <p className="text-base font-extrabold text-pink-400">{stats.completedQuests.length} / 3</p>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg">
                <p className="text-slate-400">Cards Mastered</p>
                <p className="text-base font-extrabold text-indigo-400">{stats.masteredFlashcards.length} / 10</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Your Anime Mentors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>Your Personal Anime Mentors</span>
              <Sparkles className="w-5 h-5 text-pink-400" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Each mentor specializes in guiding you through different real-world challenges!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimeCharacterCard
            mentor={mentors.sakura}
            onClick={() => {
              sound.playClick();
              onSelectTab('starbucks');
            }}
          />
          <AnimeCharacterCard
            mentor={mentors.kenji}
            onClick={() => {
              sound.playClick();
              onSelectTab('airport');
            }}
          />
          <AnimeCharacterCard
            mentor={mentors.aoi}
            onClick={() => {
              sound.playClick();
              onSelectTab('restroom');
            }}
          />
          <AnimeCharacterCard
            mentor={mentors.ren}
            onClick={() => {
              sound.playClick();
              onSelectTab('english');
            }}
          />
        </div>
      </div>

      {/* 8 Core Academy Survival Modules Grid */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>Explore All 8 Survival Academies</span>
            <span className="text-xs px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold">PIN-TO-PIN GUIDES</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click any module below to dive deep into interactive simulators, checklists, audio phrases, and pro secrets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((mod) => (
            <div
              key={mod.id}
              onClick={() => {
                sound.playClick();
                onSelectTab(mod.id);
              }}
              className={`group relative rounded-2xl p-5 border ${mod.border} bg-gradient-to-br ${mod.color} bg-slate-900/80 backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-pink-500/10 flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                    {mod.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700">
                    {mod.statsCount}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-pink-300 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {mod.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-pink-400 transition-colors">
                <span className="flex items-center gap-1.5">
                  <img
                    src={mod.mentor.avatar}
                    alt={mod.mentor.name}
                    className="w-5 h-5 rounded-full object-cover border border-slate-600"
                  />
                  <span>{mod.mentor.name}</span>
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
