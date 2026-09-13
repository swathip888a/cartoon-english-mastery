import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

interface AudioSpeakButtonProps {
  text: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AudioSpeakButton: React.FC<AudioSpeakButtonProps> = ({
  text,
  label = 'Listen',
  size = 'md',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setIsPlaying(true);
    sound.speakEnglish(text, () => {
      setIsPlaying(false);
    });
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2.5',
  };

  return (
    <button
      onClick={handleSpeak}
      className={`inline-flex items-center font-medium rounded-full transition-all duration-200 shadow-sm ${
        isPlaying
          ? 'bg-pink-500 text-white shadow-pink-500/30 scale-105 animate-pulse'
          : 'bg-indigo-600/10 hover:bg-indigo-600 text-indigo-600 hover:text-white dark:bg-indigo-500/20 dark:text-indigo-300 dark:hover:bg-indigo-600 dark:hover:text-white border border-indigo-500/30'
      } ${sizeClasses[size]} ${className}`}
      title={`Listen to English pronunciation: "${text}"`}
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 animate-spin text-pink-200" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
      <span>{label}</span>
    </button>
  );
};
