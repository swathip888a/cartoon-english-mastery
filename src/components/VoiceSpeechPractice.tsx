import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { sound } from '../utils/audio';

interface VoiceSpeechPracticeProps {
  targetPhrase: string;
  phraseMeaning?: string;
  phoneticNotes?: string;
  onSuccess?: (score: number) => void;
  accentColor?: string;
}

export const VoiceSpeechPractice: React.FC<VoiceSpeechPracticeProps> = ({
  targetPhrase,
  phraseMeaning,
  phoneticNotes,
  onSuccess,
  accentColor = 'pink'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState<string>('');
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check Speech Recognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpokenText('');
        setSimilarityScore(null);
        setFeedbackMessage('Listening... Speak into your microphone now!');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpokenText(transcript);
        evaluateSpeech(transcript);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setFeedbackMessage('Microphone permission denied. Click to enable mic or practice listening!');
        } else {
          setFeedbackMessage('Could not hear clearly. Click the mic icon to try again!');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [targetPhrase]);

  const cleanText = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

  const calculateSimilarity = (spoken: string, target: string): number => {
    const s1 = cleanText(spoken);
    const s2 = cleanText(target);
    if (!s1 || !s2) return 0;
    if (s1 === s2) return 100;

    const words1 = s1.split(/\s+/);
    const words2 = s2.split(/\s+/);

    let matchCount = 0;
    words2.forEach((w) => {
      if (words1.includes(w)) matchCount++;
    });

    const wordMatchRatio = matchCount / words2.length;
    const lengthPenalty = Math.max(0, 1 - Math.abs(words1.length - words2.length) / Math.max(words1.length, words2.length));
    const score = Math.round((wordMatchRatio * 0.75 + lengthPenalty * 0.25) * 100);
    return Math.min(100, Math.max(10, score));
  };

  const evaluateSpeech = (transcript: string) => {
    const score = calculateSimilarity(transcript, targetPhrase);
    setSimilarityScore(score);

    if (score >= 70) {
      sound.playSuccess();
      setFeedbackMessage(`Amazing! ${score}% match. You sound very natural and clear!`);
      if (onSuccess) onSuccess(score);
    } else if (score >= 40) {
      sound.playClick();
      setFeedbackMessage(`Good effort (${score}%). Listen to the audio once more and repeat slowly!`);
    } else {
      setFeedbackMessage(`Got "${transcript}". Try saying: "${targetPhrase}"`);
    }
  };

  const handleListenTarget = () => {
    setIsPlayingAudio(true);
    sound.speakEnglish(targetPhrase, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleToggleMic = () => {
    if (!speechSupported) {
      alert('Speech Recognition is best supported in Chrome, Edge, or Safari browsers.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        if (recognitionRef.current) recognitionRef.current.start();
      } catch {
        // already started
      }
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Interactive Speech & Pronunciation Lab
          </span>
        </div>

        <button
          onClick={handleListenTarget}
          disabled={isPlayingAudio}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/40 text-indigo-300 text-xs font-bold transition-all shadow"
        >
          <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-pink-400' : ''}`} />
          <span>{isPlayingAudio ? 'Speaking...' : 'Listen Native'}</span>
        </button>
      </div>

      {/* Target Phrase Box */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 mb-4">
        <p className="text-lg sm:text-xl font-extrabold text-pink-300 tracking-wide">
          "{targetPhrase}"
        </p>
        {phraseMeaning && (
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            🇯🇵 {phraseMeaning}
          </p>
        )}
        {phoneticNotes && (
          <p className="text-xs text-amber-300/90 mt-2 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg inline-block">
            💡 Pronunciation Tip: {phoneticNotes}
          </p>
        )}
      </div>

      {/* Interactive Microphone & Feedback */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/50 border border-slate-800/60 p-4 rounded-xl">
        <button
          onClick={handleToggleMic}
          className={`relative p-4 rounded-full transition-all duration-300 shadow-xl ${
            isListening
              ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-500/30'
              : 'bg-gradient-to-tr from-pink-600 to-purple-600 text-white hover:scale-105 hover:shadow-pink-500/25'
          }`}
          title="Click to speak this English phrase"
        >
          {isListening ? (
            <MicOff className="w-6 h-6 animate-spin" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>

        <div className="flex-1 w-full text-center sm:text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-400">
              {isListening ? '🎙️ Speak now...' : 'Tap the Mic & Speak in English:'}
            </span>
            {similarityScore !== null && (
              <span
                className={`text-xs font-black px-2 py-0.5 rounded-full ${
                  similarityScore >= 70
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : similarityScore >= 40
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                Accuracy: {similarityScore}%
              </span>
            )}
          </div>

          <p className="text-sm font-medium text-slate-200 min-h-[1.5rem]">
            {spokenText ? (
              <span className="italic text-indigo-300 font-semibold">"{spokenText}"</span>
            ) : (
              <span className="text-slate-500 text-xs">
                {feedbackMessage || 'Press the pink mic button to test your English speaking!'}
              </span>
            )}
          </p>

          {feedbackMessage && spokenText && (
            <p className="text-xs mt-1 text-slate-300 flex items-center gap-1.5">
              {similarityScore && similarityScore >= 70 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline shrink-0" />
              ) : (
                <RotateCcw className="w-3.5 h-3.5 text-amber-400 inline shrink-0" />
              )}
              <span>{feedbackMessage}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
