import React, { useState } from 'react';
import { INFLIGHT_OPTIONS, AIRPLANE_LAVATORY_STEPS, AirplaneInflightMeal } from '../../data/airplaneCabinData';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { VoiceSpeechPractice } from '../VoiceSpeechPractice';
import { sound } from '../../utils/audio';
import {
  Plane,
  Bell,
  Utensils,
  Sparkles,
  CheckCircle2,
  Lock,
  Unlock,
  Droplets,
  RotateCcw,
  Volume2,
  ShieldAlert,
  ShieldCheck,
  Coffee,
  HelpCircle,
  Tv,
  BookOpen,
  ArrowRight,
  Eye,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AirplaneCabinLavatorySimProps {
  onAddXp: (amount: number, reason: string) => void;
}

export interface CabinVocabItem {
  id: string;
  term: string;
  emoji: string;
  pronunciation: string;
  meaning: string;
  practicalRule: string;
  exampleSentence: string;
}

export const CABIN_VOCABULARY_LIST: CabinVocabItem[] = [
  {
    id: 'overhead_bin',
    term: 'Overhead Storage Bin',
    emoji: '📦',
    pronunciation: 'OH-ver-hed BIN',
    meaning: 'The luggage locker located directly above your row of airplane seats for storing carry-on bags and backpacks.',
    practicalRule: 'Put your roller suitcase wheels-first so the door latches closed cleanly.',
    exampleSentence: 'I put my backpack in the overhead bin and kept my headphones with me.'
  },
  {
    id: 'tray_table',
    term: 'Tray Table',
    emoji: '🍽️',
    pronunciation: 'TRAY TAY-buhl',
    meaning: 'The fold-down plastic desk attached to the back of the seat in front of you for holding your meal, drinks, or laptop.',
    practicalRule: 'Must be locked in the upright and stowed position during takeoff and landing!',
    exampleSentence: 'Lower your tray table when the flight attendant brings your dinner meal.'
  },
  {
    id: 'seatbelt_sign',
    term: 'Fasten Seatbelt Sign',
    emoji: '💺',
    pronunciation: 'FAS-uhn SEET-belt SYNE',
    meaning: 'An illuminated symbol above your seat. When turned ON, you must stay seated with your seatbelt buckled.',
    practicalRule: 'Keep your seatbelt loosely fastened even when sleeping in case of sudden unexpected turbulence.',
    exampleSentence: 'The captain turned on the fasten seatbelt sign due to turbulence ahead.'
  },
  {
    id: 'vacuum_lavatory',
    term: 'Vacuum-Flush Lavatory',
    emoji: '🚻',
    pronunciation: 'VAK-yoom FLUSH LAV-uh-tor-ee',
    meaning: 'The high-altitude airplane toilet that uses powerful pneumatic suction instead of water to flush waste into a holding tank.',
    practicalRule: 'Always close the toilet lid first, then press the blue flush button (*Loud WHOOSH!*).',
    exampleSentence: 'The lavatory door latch showed VACANT in green, so I stepped inside.'
  },
  {
    id: 'turbulence',
    term: 'Turbulence',
    emoji: '💨',
    pronunciation: 'TUR-byoo-luhns',
    meaning: 'Irregular air currents that cause the airplane to bump or vibrate gently in mid-air. It is completely normal and safe.',
    practicalRule: 'Do not panic! Airplanes are engineered to withstand extreme winds without danger.',
    exampleSentence: 'We experienced mild turbulence over the mountains, so the pilot asked us to remain seated.'
  },
  {
    id: 'flight_attendant',
    term: 'Flight Attendant (Cabin Crew)',
    emoji: '🧑‍✈️',
    pronunciation: 'FLYT uh-TEN-duhnt',
    meaning: 'Trained aviation professionals on board who ensure passenger safety, serve meals, and assist with emergencies.',
    practicalRule: 'Press the overhead call button (*DING!*) only if you need water, medical help, or assistance.',
    exampleSentence: 'The flight attendant offered complimentary coffee, tea, and warm snacks.'
  },
  {
    id: 'galley',
    term: 'Airplane Galley',
    emoji: '🍳',
    pronunciation: 'GAL-ee',
    meaning: 'The kitchen area at the front and back of the airplane where flight attendants heat meals, prepare drinks, and store carts.',
    practicalRule: 'Passengers should not congregate or stretch inside the galley while cabin crew are working.',
    exampleSentence: 'The flight attendant rolled the beverage cart out from the rear galley.'
  }
];

export const AirplaneCabinLavatorySim: React.FC<AirplaneCabinLavatorySimProps> = ({ onAddXp }) => {
  const [activeTab, setActiveTab] = useState<'cabin_seat' | 'lavatory_sim' | 'cabin_vocab'>('cabin_seat');

  // Cabin Seat State
  const [seatbeltFastened, setSeatbeltFastened] = useState<boolean>(true);
  const [trayTableDown, setTrayTableDown] = useState<boolean>(true);
  const [overheadBinOpen, setOverheadBinOpen] = useState<boolean>(false);
  const [windowShadeOpen, setWindowShadeOpen] = useState<boolean>(true);
  const [readingLightOn, setReadingLightOn] = useState<boolean>(false);
  const [attendantCalled, setAttendantCalled] = useState<boolean>(false);
  const [selectedMeal, setSelectedMeal] = useState<AirplaneInflightMeal>(INFLIGHT_OPTIONS[0]);
  const [activeTvChannel, setActiveTvChannel] = useState<'flight_map' | 'anime_movie' | 'music'>('flight_map');

  // Lavatory Sim State
  const [isDoorLocked, setIsDoorLocked] = useState<boolean>(false);
  const [seatCoverPlaced, setSeatCoverPlaced] = useState<boolean>(false);
  const [isLidClosed, setIsLidClosed] = useState<boolean>(false);
  const [hasFlushed, setHasFlushed] = useState<boolean>(false);
  const [handsWashed, setHandsWashed] = useState<boolean>(false);
  const [lavatoryCompleted, setLavatoryCompleted] = useState<boolean>(false);

  const handleToggleSeatbelt = () => {
    sound.playClick();
    setSeatbeltFastened(!seatbeltFastened);
  };

  const handleCallAttendant = () => {
    sound.playLevelUp(); // Call chime ding
    setAttendantCalled(true);
    setTimeout(() => {
      setAttendantCalled(false);
    }, 4000);
    onAddXp(20, 'Pressed Flight Attendant Call Button! (*DING!*)');
  };

  const handleFlushToilet = () => {
    if (!isLidClosed) {
      alert('⚠️ Rule: Close the toilet lid first before flushing to keep the cabin fresh!');
      return;
    }
    sound.playFlushStream(2.5);
    setHasFlushed(true);
    onAddXp(25, 'Flushed Airplane Vacuum Toilet! (*WHOOSH!*)');
  };

  const handleCompleteLavatory = () => {
    if (!hasFlushed || !handsWashed) {
      alert('Please remember to flush with the lid closed and wash your hands with soap!');
      return;
    }
    sound.playSuccess();
    setLavatoryCompleted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onAddXp(50, 'Mastered Airplane Lavatory Etiquette! ✈️🚻');
  };

  const handleResetLavatory = () => {
    sound.playClick();
    setIsDoorLocked(false);
    setSeatCoverPlaced(false);
    setIsLidClosed(false);
    setHasFlushed(false);
    setHandsWashed(false);
    setLavatoryCompleted(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-blue-950 border-2 border-sky-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-extrabold text-xs border border-sky-500/40 flex items-center gap-1.5">
                <Plane className="w-4 h-4" /> 35,000 Feet In-Flight Cabin
              </span>
              <span className="text-xs text-amber-300 font-bold">100% Practical Doing</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-200">
              Airplane Cabin & Vacuum Lavatory Simulator ✈️💺🚻
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Explore Row 14 window seat 14A! Buckle your seatbelt with audio chime, open the overhead bin, lower the tray table, choose your in-flight meal, and test the working airplane vacuum toilet!
            </p>
          </div>

          <div className="bg-slate-950/80 border-2 border-sky-500/30 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-2xl font-black">
              💺
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-black">Assigned Seat</p>
              <p className="text-sm font-black text-sky-300">Seat 14A (Window)</p>
            </div>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto no-scrollbar border-t border-sky-900/60 pt-4">
          {[
            { id: 'cabin_seat', label: '💺 Cabin Seat 14A Interactive View', count: 'Tray, Bin & Screen' },
            { id: 'lavatory_sim', label: '🚻 Airplane Vacuum Lavatory', count: 'Working Lock & Flush' },
            { id: 'cabin_vocab', label: '📖 Airplane Vocabulary & Meanings', count: `${CABIN_VOCABULARY_LIST.length} Terms Defined` }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(mode.id as any);
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === mode.id
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20 font-black'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{mode.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === mode.id ? 'bg-slate-950 text-sky-300' : 'bg-slate-800 text-slate-400'}`}>
                {mode.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: INTERACTIVE CABIN SEAT 14A VIEW */}
      {activeTab === 'cabin_seat' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Visual Artwork Feature */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-sky-500/40 shadow-2xl bg-slate-950">
            <img
              src="/images/airplane_cabin_interior.jpg"
              alt="Cartoon Airplane Cabin Interior View Row 14"
              className="w-full h-auto object-cover max-h-[480px] mx-auto hover:scale-[1.01] transition-transform duration-300"
            />
            <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-sky-500/40 text-xs text-sky-300 font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Cruising Altitude: 36,000 ft • Speed: 880 km/h</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-sky-500/40 text-xs text-slate-200 font-bold flex flex-wrap items-center justify-between gap-2">
              <span>✈️ Row 14 Window View: Fluffy Cloud Horizon • Overhead Luggage Locker • Fold-Down Tray Table • Seatbelt Sign</span>
            </div>
          </div>

          {/* Interactive Seat Controls Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Physical Seat Hardware & Controls */}
            <div className="lg:col-span-7 bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
              <h3 className="text-sm font-black uppercase text-amber-300 tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Physical Seat Controls & Gadgets
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Seatbelt Buckle */}
                <button
                  onClick={handleToggleSeatbelt}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    seatbeltFastened
                      ? 'bg-emerald-950/60 border-emerald-400 text-white shadow-lg'
                      : 'bg-rose-950/60 border-rose-400 text-white animate-pulse'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{seatbeltFastened ? '🔒' : '🔓'}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                      seatbeltFastened ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                    }`}>
                      {seatbeltFastened ? 'Buckled' : 'Unbuckled!'}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-white">Seatbelt Tongue & Buckle</div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    {seatbeltFastened ? 'Click to unbuckle when getting up' : 'Click to insert metal tongue into buckle'}
                  </p>
                </button>

                {/* 2. Tray Table */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setTrayTableDown(!trayTableDown);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    trayTableDown
                      ? 'bg-sky-950/60 border-sky-400 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">🍽️</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-sky-500 text-slate-950 uppercase">
                      {trayTableDown ? 'Lowered' : 'Stowed'}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-white">Fold-Down Tray Table</div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    {trayTableDown ? 'Lowered for meals and drinks' : 'Folded up and locked in upright position'}
                  </p>
                </button>

                {/* 3. Overhead Bin */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setOverheadBinOpen(!overheadBinOpen);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    overheadBinOpen
                      ? 'bg-amber-950/60 border-amber-400 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">📦</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-500 text-slate-950 uppercase">
                      {overheadBinOpen ? 'Open Latch' : 'Closed Latch'}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-white">Overhead Luggage Locker</div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    {overheadBinOpen ? 'Backpack stowed wheels-first' : 'Securely locked for flight'}
                  </p>
                </button>

                {/* 4. Flight Attendant Call Bell */}
                <button
                  onClick={handleCallAttendant}
                  className="p-4 rounded-2xl border-2 border-yellow-400/50 bg-yellow-500/15 hover:bg-yellow-500/25 text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl group-hover:scale-110 transition-transform">🔔</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-yellow-400 text-slate-950 uppercase">
                      Ring Call Button
                    </span>
                  </div>
                  <div className="font-bold text-xs text-yellow-300">Call Flight Attendant (*DING!*)</div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    Rings the overhead chime to request water or help.
                  </p>
                </button>
              </div>

              {attendantCalled && (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center gap-3 animate-bounce">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span>*DING!* Flight Attendant Mei arrives: "Hi Swathi, how may I assist you with your flight today?"</span>
                </div>
              )}
            </div>

            {/* Right 5 Cols: In-Flight Meal Service & Spoken Dialogue */}
            <div className="lg:col-span-5 bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
              <h3 className="text-sm font-black uppercase text-sky-300 tracking-wider flex items-center gap-2">
                <Utensils className="w-4 h-4" /> In-Flight Meal & Beverage Service
              </h3>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Select Your Complimentary In-Flight Meal:
                </label>
                <div className="space-y-2">
                  {INFLIGHT_OPTIONS.map((meal) => {
                    const isSelected = selectedMeal.id === meal.id;
                    return (
                      <button
                        key={meal.id}
                        onClick={() => setSelectedMeal(meal)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-sky-500/20 border-sky-400 text-white shadow-md'
                            : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-2xl">{meal.category === 'meal' ? '🍱' : meal.category === 'drink' ? '🥤' : '🎧'}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-xs text-white truncate">{meal.name}</div>
                          <div className="text-[11px] text-slate-400 truncate">{meal.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* What to say to Flight Attendant */}
              <div className="p-4 rounded-2xl bg-sky-950/50 border border-sky-500/30 text-xs space-y-2">
                <div className="flex items-center justify-between text-sky-300 font-bold">
                  <span>How to Ask the Flight Attendant:</span>
                  <AudioSpeakButton text={selectedMeal.howToRequest} />
                </div>
                <p className="text-slate-200 italic font-medium">"{selectedMeal.howToRequest}"</p>
              </div>

              {/* Voice Practice */}
              <VoiceSpeechPractice
                targetPhrase={selectedMeal.howToRequest}
                phraseMeaning="Practice ordering your in-flight meal in clear spoken English!"
                onSuccess={() => onAddXp(30, 'Ordered in-flight meal successfully! 🍛')}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WORKING VACUUM LAVATORY SIMULATOR */}
      {activeTab === 'lavatory_sim' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>🚻</span> The Complete Airplane Vacuum Lavatory Simulator
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Never feel nervous about airplane bathrooms! Step inside, lock the door latch, place a paper seat cover, close the lid, and experience the loud vacuum flush (*WHOOSH!*).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 6 Cols: Physical Lavatory Controls */}
            <div className="lg:col-span-6 bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{isDoorLocked ? '🔒' : '🔓'}</span>
                  <div>
                    <h3 className="font-black text-white text-base">Lavatory Door Latch</h3>
                    <span className={`text-xs font-bold ${isDoorLocked ? 'text-rose-400' : 'text-emerald-400'}`}>
                      Outside Sign shows: {isDoorLocked ? 'OCCUPIED (Red)' : 'VACANT (Green)'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsDoorLocked(!isDoorLocked);
                  }}
                  className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${
                    isDoorLocked ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-slate-950'
                  }`}
                >
                  {isDoorLocked ? 'Unlock Door' : 'Slide to Lock Latch'}
                </button>
              </div>

              {/* Step by Step Action Buttons */}
              <div className="space-y-3">
                {/* 1. Toilet Seat Cover */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setSeatCoverPlaced(!seatCoverPlaced);
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    seatCoverPlaced ? 'bg-emerald-950/60 border-emerald-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>🧻</span>
                    <span className="text-xs font-bold">1. Pull Paper Toilet Seat Cover from Dispenser</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${seatCoverPlaced ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800'}`}>
                    {seatCoverPlaced ? 'Placed' : 'Not Placed'}
                  </span>
                </button>

                {/* 2. Close Toilet Lid */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsLidClosed(!isLidClosed);
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isLidClosed ? 'bg-emerald-950/60 border-emerald-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>🚽</span>
                    <span className="text-xs font-bold">2. Close Toilet Lid Before Flushing (Rule #1)</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${isLidClosed ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800'}`}>
                    {isLidClosed ? 'Lid Closed' : 'Lid Open'}
                  </span>
                </button>

                {/* 3. Vacuum Flush Button */}
                <button
                  onClick={handleFlushToilet}
                  className={`w-full p-4 rounded-2xl border-2 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                    hasFlushed
                      ? 'bg-blue-600 text-white border-blue-400'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-blue-300'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>3. Press Blue Vacuum Flush Button (*WHOOSH!*)</span>
                </button>

                {/* 4. Wash Hands with Soap */}
                <button
                  onClick={() => {
                    sound.playFlushStream(1.5);
                    setHandsWashed(true);
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    handsWashed ? 'bg-emerald-950/60 border-emerald-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>🧼</span>
                    <span className="text-xs font-bold">4. Sensor Sink Tap & Antibacterial Soap</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${handsWashed ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800'}`}>
                    {handsWashed ? 'Washed & Dried' : 'Wash Hands'}
                  </span>
                </button>
              </div>

              {/* Complete / Reset */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCompleteLavatory}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finish Lavatory Experience (+50 XP)</span>
                </button>
                <button
                  onClick={handleResetLavatory}
                  className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 6 Cols: The 4 Golden Airplane Bathroom Rules */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h3 className="text-sm font-black uppercase text-amber-300 tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> The 4 Golden Airplane Bathroom Rules
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <span className="font-bold text-emerald-400">1. Always slide the door latch completely to lock:</span>
                    <p className="text-slate-300">Locking turns on the bright overhead ceiling light and changes the outside sign from green VACANT to red OCCUPIED.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <span className="font-bold text-amber-400">2. Close the lid before pressing flush:</span>
                    <p className="text-slate-300">Airplane toilets use high-power pneumatic vacuum suction (100+ mph air speed!). Closing the lid keeps the air clean and quiet.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <span className="font-bold text-sky-400">3. Throw paper towels in the trash bin flap:</span>
                    <p className="text-slate-300">Never throw thick paper hand towels into the toilet bowl; push them through the spring-loaded metal trash flap under the sink.</p>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <span className="font-bold text-rose-400">4. Return to your seat if turbulence hits:</span>
                    <p className="text-slate-300">If the "Fasten Seatbelt" chime dings while you are in the bathroom, quickly finish washing your hands and return to your seat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AIRPLANE & CABIN VOCABULARY DICTIONARY WITH MEANINGS */}
      {activeTab === 'cabin_vocab' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-sky-400" />
              Complete Airplane & In-Flight Vocabulary Dictionary with Meanings
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every aviation term you will hear on board an airplane explained in plain, simple English with audio pronunciation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CABIN_VOCABULARY_LIST.map((item) => (
              <div key={item.id} className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-2xl bg-slate-950 border border-slate-800">{item.emoji}</span>
                    <div>
                      <h3 className="text-lg font-black text-white">{item.term}</h3>
                      <span className="text-xs font-mono text-sky-400">/{item.pronunciation}/</span>
                    </div>
                  </div>
                  <button
                    onClick={() => sound.speakEnglish(`${item.term}. ${item.meaning}`)}
                    className="p-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40"
                    title="Pronounce and explain"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">Plain Meaning:</span>
                  <p className="text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {item.meaning}
                  </p>
                </div>

                <div className="p-3 bg-sky-950/40 rounded-xl border border-sky-500/20 text-xs space-y-1">
                  <span className="font-bold text-sky-300">Practical Rule on Plane:</span>
                  <p className="text-slate-300">{item.practicalRule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
