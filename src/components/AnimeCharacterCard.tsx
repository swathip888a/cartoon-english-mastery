import React from 'react';
import { AnimeMentor } from '../types';
import { Sparkles } from 'lucide-react';

interface AnimeCharacterCardProps {
  mentor: AnimeMentor;
  speechText?: string;
  onClick?: () => void;
  compact?: boolean;
}

export const AnimeCharacterCard: React.FC<AnimeCharacterCardProps> = ({
  mentor,
  speechText,
  onClick,
  compact = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl p-4 transition-all duration-300 border backdrop-blur-md overflow-hidden ${
        onClick ? 'cursor-pointer hover:scale-[1.02]' : ''
      }`}
      style={{
        background: `linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.95))`,
        borderColor: `${mentor.color}40`,
        boxShadow: `0 8px 30px ${mentor.color}15`,
      }}
    >
      {/* Anime Accent Glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-500 group-hover:opacity-60"
        style={{ background: mentor.color }}
      />

      <div className="flex items-start gap-4">
        {/* Mentor Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 p-0.5 shadow-lg relative z-10 transition-transform duration-300 group-hover:scale-105"
            style={{ borderColor: mentor.color }}
          >
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <span
            className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold rounded-md text-white shadow uppercase"
            style={{ backgroundColor: mentor.color }}
          >
            Sensei
          </span>
        </div>

        {/* Mentor Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-white text-base sm:text-lg tracking-wide group-hover:text-pink-300 transition-colors">
              {mentor.name}
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: `${mentor.color}25`, color: mentor.color }}
            >
              {mentor.title}
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Specialty: <strong className="text-slate-300">{mentor.specialty}</strong></span>
          </p>

          {!compact && (
            <div className="mt-3 relative bg-slate-800/80 rounded-xl p-3 border border-slate-700/60 shadow-inner">
              <div
                className="absolute -left-2 top-3 w-3 h-3 bg-slate-800 rotate-45 border-l border-b border-slate-700/60"
              />
              <p className="text-xs sm:text-sm text-pink-200/95 italic relative z-10 leading-relaxed">
                “{speechText || mentor.quote}”
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
