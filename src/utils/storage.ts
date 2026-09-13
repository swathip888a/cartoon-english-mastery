import { UserStats } from '../types';

const STATS_KEY = 'swathi_survival_academy_stats_v1';

const defaultStats: UserStats = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  completedQuests: [],
  masteredFlashcards: [],
  unlockedBadges: ['rookie_survivor'],
  soundEnabled: true,
  voiceSpeed: 0.95,
};

export const getStoredStats = (): UserStats => {
  try {
    const data = localStorage.getItem(STATS_KEY);
    if (!data) return defaultStats;
    return { ...defaultStats, ...JSON.parse(data) };
  } catch {
    return defaultStats;
  }
};

export const saveStats = (stats: UserStats): void => {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
};

export const calculateLevel = (currentXp: number): { level: number; currentLevelXp: number; nextLevelXp: number; progressPercent: number } => {
  let level = 1;
  let prevThreshold = 0;
  let nextThreshold = 100;

  while (currentXp >= nextThreshold) {
    level++;
    prevThreshold = nextThreshold;
    nextThreshold = Math.floor(nextThreshold + 100 + (level * 50));
  }

  const currentLevelXp = currentXp - prevThreshold;
  const neededForThisLevel = nextThreshold - prevThreshold;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentLevelXp / neededForThisLevel) * 100)));

  return { level, currentLevelXp, nextLevelXp: neededForThisLevel, progressPercent };
};

export const getLevelTitle = (level: number): { title: string; badge: string; color: string } => {
  if (level >= 20) return { title: 'Sekai Master Supreme 👑', badge: 'legendary', color: '#f59e0b' };
  if (level >= 15) return { title: 'Global Life Champion 🌍', badge: 'expert', color: '#ec4899' };
  if (level >= 10) return { title: 'World Voyager 🚀', badge: 'voyager', color: '#8b5cf6' };
  if (level >= 7) return { title: 'Urban Survivalist 🏙️', badge: 'veteran', color: '#06b6d4' };
  if (level >= 4) return { title: 'World Explorer 🧭', badge: 'explorer', color: '#10b981' };
  if (level >= 2) return { title: 'Apprentice Adventurer 🎒', badge: 'apprentice', color: '#3b82f6' };
  return { title: 'Novice Citizen 🐣', badge: 'novice', color: '#94a3b8' };
};
