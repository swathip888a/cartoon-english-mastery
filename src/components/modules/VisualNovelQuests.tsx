import React, { useState } from 'react';
import { storyQuests } from '../../data/questStories';
import { DAILY_LIFE_EPISODES } from '../../data/storyEpisodesData';
import { mentors } from '../../data/mentorsData';
import { StoryQuest, QuestStep } from '../../types';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { VoiceSpeechPractice } from '../VoiceSpeechPractice';
import { sound } from '../../utils/audio';
import {
  Crown,
  Sparkles,
  Trophy,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Zap,
  BookOpen,
  Compass,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VisualNovelQuestsProps {
  completedQuests: string[];
  onAddXp: (amount: number, reason: string) => void;
  onCompleteQuest: (questId: string) => void;
}

export const VisualNovelQuests: React.FC<VisualNovelQuestsProps> = ({
  completedQuests,
  onAddXp,
  onCompleteQuest,
}) => {
  const allQuests = [...DAILY_LIFE_EPISODES, ...storyQuests];
  const [selectedQuest, setSelectedQuest] = useState<StoryQuest>(allQuests[0]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [activeStoryCategory, setActiveStoryCategory] = useState<'all' | 'daily_episodes' | 'special_quests'>('all');

  const step: QuestStep = selectedQuest.steps[currentStepIdx] || selectedQuest.steps[0];
  const mentor = mentors[selectedQuest.mentorId] || mentors.sakura;

  const handleSelectQuest = (quest: StoryQuest) => {
    sound.playClick();
    setSelectedQuest(quest);
    setCurrentStepIdx(0);
    setFeedbackMessage(null);
    setIsFinished(false);
  };

  const handleChoice = (choice: { text: string; isCorrect?: boolean; feedback: string; xpReward: number; nextStepIndex: number }) => {
    sound.playClick();
    setFeedbackMessage(choice.feedback);
    onAddXp(choice.xpReward, `Quest Decision: ${choice.isCorrect ? 'Correct Choice!' : 'Learned Choice'}`);

    if (choice.isCorrect) {
      sound.playXpGain();
    }

    setTimeout(() => {
      if (choice.nextStepIndex >= selectedQuest.steps.length - 1) {
        setIsFinished(true);
        setCurrentStepIdx(selectedQuest.steps.length - 1);
        sound.playLevelUp();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981'],
        });
        onCompleteQuest(selectedQuest.id);
        onAddXp(selectedQuest.xpReward, `Completed Quest: ${selectedQuest.title}! 🏆`);
      } else {
        setCurrentStepIdx(choice.nextStepIndex);
        setFeedbackMessage(null);
      }
    }, 1500);
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentStepIdx(0);
    setFeedbackMessage(null);
    setIsFinished(false);
  };

  const filteredQuests = allQuests.filter((q) => {
    if (activeStoryCategory === 'daily_episodes') return q.id.startsWith('episode_');
    if (activeStoryCategory === 'special_quests') return !q.id.startsWith('episode_');
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-950/40 via-slate-900 to-pink-950/30 border border-purple-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/40 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> ANIME VISUAL NOVEL & DAILY LIFE RPG
            </span>
            <span className="text-xs text-slate-400">Interactive Story Mode</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Daily Life Anime Adventures & Scenarios 🌸📖
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Experience real-world days abroad through interactive dialogue with your anime mentors. Make choices, speak English phrases, and earn badges!
          </p>
        </div>

        <div className="bg-slate-800/90 rounded-2xl p-4 border border-purple-500/40 shadow-xl max-w-xs flex items-center gap-3">
          <Award className="w-8 h-8 text-amber-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-purple-300">Episodes Cleared:</p>
            <p className="text-lg font-black text-white">
              {completedQuests.length} / {allQuests.length} Stories
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'all', label: '🌟 All Episodes & Quests' },
          { id: 'daily_episodes', label: '📖 Daily Life Episodes (1-5)' },
          { id: 'special_quests', label: '⚡ Mastery Skill Challenges' }
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => {
              sound.playClick();
              setActiveStoryCategory(c.id as any);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeStoryCategory === c.id
                ? 'bg-purple-600 text-white shadow'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quest List Selector */}
        <div className="lg:col-span-4 space-y-2.5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select an Adventure:
          </p>
          {filteredQuests.map((quest) => {
            const isSelected = selectedQuest.id === quest.id;
            const isDone = completedQuests.includes(quest.id);
            const qMentor = mentors[quest.mentorId] || mentors.sakura;

            return (
              <button
                key={quest.id}
                onClick={() => handleSelectQuest(quest)}
                className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-purple-600/20 border-purple-500 text-white ring-2 ring-purple-500/30'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <img
                  src={qMentor.avatar}
                  alt={qMentor.name}
                  className="w-10 h-10 rounded-xl object-cover border border-purple-400 flex-shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="font-bold text-xs sm:text-sm truncate">{quest.title}</p>
                    {isDone && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                        CLEARED
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{quest.description}</p>
                  <span className="text-[10px] font-bold text-amber-300 font-mono mt-1 inline-block">
                    +{quest.xpReward} XP REWARD
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Visual Novel Story Box */}
        <div className="lg:col-span-8">
          <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md min-h-[480px] flex flex-col justify-between">
            {/* Header / Progress bar */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                  {selectedQuest.title}
                </span>
                <span className="text-xs text-slate-400">
                  Scene {currentStepIdx + 1} of {selectedQuest.steps.length}
                </span>
              </div>

              {/* Character Dialogue Box */}
              <div className="flex flex-col sm:flex-row items-start gap-4 bg-slate-950/70 p-5 rounded-2xl border border-slate-800 relative">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-500 shadow-lg flex-shrink-0"
                />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black text-purple-300 uppercase tracking-wide">
                      {step.speakerName || mentor.name}
                    </p>
                    <AudioSpeakButton text={step.text} />
                  </div>
                  <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                    "{step.text}"
                  </p>
                </div>
              </div>
            </div>

            {/* Decision Choices or Ending Screen */}
            {!isFinished ? (
              <div className="space-y-4">
                {feedbackMessage && (
                  <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs sm:text-sm text-purple-200 font-semibold animate-bounce">
                    ✨ {feedbackMessage}
                  </div>
                )}

                {step.choices && step.choices.length > 0 && (
                  <div className="space-y-2.5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Choose your response in English:
                    </p>
                    {step.choices.map((choice, i) => (
                      <button
                        key={i}
                        onClick={() => handleChoice(choice)}
                        className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-purple-900/60 hover:to-slate-800 border border-slate-700 hover:border-purple-400 text-xs sm:text-sm font-bold text-slate-100 transition-all flex items-center justify-between group shadow-lg"
                      >
                        <span>"{choice.text}"</span>
                        <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Voice Pronunciation Practice for dialogue */}
                {step.choices && step.choices[0] && (
                  <div className="pt-2">
                    <VoiceSpeechPractice
                      targetPhrase={step.choices[0].text}
                      phraseMeaning="Speak your dialogue choice out loud!"
                      onSuccess={() => onAddXp(20, 'Spoke story choice in English')}
                    />
                  </div>
                )}
              </div>
            ) : (
              /* Quest Completed Screen */
              <div className="text-center py-8 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
                  <Trophy className="w-8 h-8 text-slate-950" />
                </div>
                <h3 className="text-2xl font-black text-white">Episode Successfully Cleared!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  You navigated the entire real-world scenario seamlessly and earned the badge{' '}
                  <span className="font-bold text-amber-300">{selectedQuest.badgeUnlock}</span>!
                </p>

                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" /> Replay Episode
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
