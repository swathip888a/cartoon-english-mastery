import React, { useState } from 'react';
import { 
  airportSteps, 
  FLIGHT_ROUTES, 
  TRAVEL_VOCABULARY_DICTIONARY,
  VISA_INTERVIEW_SCENARIOS,
  FlightRouteOption,
  VisaScenarioOption
} from '../../data/airportData';
import { mentors } from '../../data/mentorsData';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { VoiceSpeechPractice } from '../VoiceSpeechPractice';
import { AirportLuggageSecuritySim } from './AirportLuggageSecuritySim';
import { AirplaneCabinLavatorySim } from './AirplaneCabinLavatorySim';
import { Roblox3DWorldSimulator } from './Roblox3DWorldSimulator';
import { sound } from '../../utils/audio';
import {
  Plane,
  Luggage,
  ShieldCheck,
  Ticket,
  Clock,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Scale,
  BookOpen,
  Volume2,
  MapPin,
  Building2,
  DoorOpen,
  UserCheck,
  Fingerprint,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AirportMasterclassProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const AirportMasterclass: React.FC<AirportMasterclassProps> = ({ onAddXp }) => {
  const [selectedRoute, setSelectedRoute] = useState<FlightRouteOption>(FLIGHT_ROUTES[0]);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'3d_airport_metaverse' | 'visa_immigration_sim' | 'walkthrough' | 'cabin_lavatory' | 'luggage_security' | 'boarding_pass' | 'vocab_dictionary'>('3d_airport_metaverse');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Visa & Immigration Simulation State
  const [selectedVisaIdx, setSelectedVisaIdx] = useState<number>(0);
  const [selectedStyleIdx, setSelectedStyleIdx] = useState<number>(0);
  const [isFingerprintVerified, setIsFingerprintVerified] = useState<boolean>(false);

  const activeVisaScenario = VISA_INTERVIEW_SCENARIOS[selectedVisaIdx] || VISA_INTERVIEW_SCENARIOS[0];
  const activeResponse = activeVisaScenario.responseStyles[selectedStyleIdx] || activeVisaScenario.responseStyles[0];

  const handleVerifyBiometrics = () => {
    sound.playSuccess();
    setIsFingerprintVerified(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#38bdf8', '#818cf8', '#34d399', '#fbbf24']
    });
    onAddXp(50, `Passed ${activeVisaScenario.title} & Verified Biometrics! 🛂✨`);
  };

  const currentStep = airportSteps[selectedStepIndex];

  const handleCompleteStep = (stepNumber: number) => {
    if (!completedSteps.includes(stepNumber)) {
      sound.playSuccess();
      const updated = [...completedSteps, stepNumber];
      setCompletedSteps(updated);
      onAddXp(30, `Completed Airport Checkpoint #${stepNumber}: ${currentStep.title}! ✈️`);
      if (updated.length === airportSteps.length) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#0284c7', '#38bdf8', '#fbbf24', '#10b981']
        });
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs border border-blue-500/40 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5" /> 2D ANIME AIRPORT & VISA EXPEDITION
            </span>
            <span className="text-xs text-amber-300 font-bold">Consular Visa & Airport Customs</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Airport, Visa Interview & In-Flight Journey ✈️🛂🌍
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Step into the 2D anime border booth! Master real F-1 Student and B1/B2 tourist visa interviews, biometric fingerprint scanners, luggage weight scales, seat 14A, and vacuum lavatories!
          </p>
        </div>

        {/* Selected Route Badge */}
        <div className="bg-slate-800/90 rounded-2xl p-4 border border-blue-500/40 shadow-xl max-w-xs space-y-1">
          <div className="text-[10px] font-black uppercase text-blue-300 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-400" />
            Active Flight Route
          </div>
          <div className="text-sm font-black text-white flex items-center gap-1.5">
            <span>{selectedRoute.airlineEmoji}</span>
            <span>{selectedRoute.fromCode} ➔ {selectedRoute.toCode}</span>
          </div>
          <div className="text-xs text-slate-300">{selectedRoute.airline} ({selectedRoute.flightNumber})</div>
        </div>
      </div>

      {/* Flight Route Selector Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2.5 shadow-xl">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Choose Your Flight Journey:</span>
          <span className="text-blue-400 font-bold">Domestic India & International Abroad</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {FLIGHT_ROUTES.map((route) => {
            const isSelected = selectedRoute.id === route.id;
            return (
              <button
                key={route.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedRoute(route);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30 ring-2 ring-blue-400/40'
                    : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{route.airlineEmoji}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    route.type === 'domestic_india' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {route.type === 'domestic_india' ? 'Domestic' : 'International'}
                  </span>
                </div>
                <div className="font-bold text-xs mt-1 text-white truncate">{route.fromCity} ➔ {route.toCity}</div>
                <div className="text-[11px] opacity-80 mt-0.5">{route.airline} • {route.seat}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: '3d_airport_metaverse', label: '🌍 3D Real-World Airport (Singapore Jewel & Vizag VTZ)', icon: <Compass className="w-4 h-4 text-amber-400" /> },
          { id: 'visa_immigration_sim', label: '🛂 2D Anime Visa & Immigration Lab', icon: <Fingerprint className="w-4 h-4" /> },
          { id: 'walkthrough', label: '🚶 Step-by-Step Airport Pipeline', icon: <Compass className="w-4 h-4" /> },
          { id: 'cabin_lavatory', label: '✈️ In-Flight Seat 14A & Lavatory', icon: <Plane className="w-4 h-4" /> },
          { id: 'luggage_security', label: '🧳 Luggage Scale & CISF/TSA Tray', icon: <Scale className="w-4 h-4" /> },
          { id: 'boarding_pass', label: '🎫 Boarding Pass Decoder', icon: <Ticket className="w-4 h-4" /> },
          { id: 'vocab_dictionary', label: '📖 Travel Terms & Meanings', icon: <BookOpen className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveTab(tab.id as any);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB: 3D REAL-WORLD AIRPORT METAVERSE SIMULATOR */}
      {activeTab === '3d_airport_metaverse' && (
        <div className="space-y-6 animate-fadeIn">
          <Roblox3DWorldSimulator onAddXp={onAddXp} />
        </div>
      )}

      {/* TAB 0: 2D ANIME VISA INTERVIEW & IMMIGRATION SIMULATOR */}
      {activeTab === 'visa_immigration_sim' && (
        <div className="space-y-6 animate-fadeIn">
          {/* 2D Anime Artwork Banner */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-blue-500/40 shadow-2xl bg-slate-950">
            <img
              src={`${import.meta.env.BASE_URL}images/anime_airport_immigration_visa_interview.jpg`}
              alt="2D Anime Airport Immigration & Visa Interview"
              className="w-full h-auto object-cover max-h-[420px] mx-auto hover:scale-[1.01] transition-transform duration-300"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md px-4 py-3 rounded-2xl text-xs border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛂✨</span>
                <span className="text-blue-200 font-extrabold">
                  2D Anime Consular & CBP Border Control: Document Handover • Biometric Fingerprint Scanner • Answering Officer Prompts
                </span>
              </div>
              <span className="text-amber-300 font-mono text-[11px] font-bold">100% Practical Speaking</span>
            </div>
          </div>

          {/* Scenario Selector Grid */}
          <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Fingerprint className="w-4 h-4 text-blue-400" />
                Select Visa & Immigration Scenario ({VISA_INTERVIEW_SCENARIOS.length} Real-World Simulations):
              </label>
              <span className="text-xs text-slate-400">Embassy Interviews & Airport CBP Entry</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {VISA_INTERVIEW_SCENARIOS.map((scen, idx) => {
                const isSelected = selectedVisaIdx === idx;
                return (
                  <button
                    key={scen.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedVisaIdx(idx);
                      setSelectedStyleIdx(0);
                      setIsFingerprintVerified(false);
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all relative ${
                      isSelected
                        ? 'bg-blue-950/60 border-blue-400 text-white shadow-lg ring-2 ring-blue-500/30'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                        {scen.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-white mt-1.5 line-clamp-1">{scen.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{scen.context}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Scenario Simulator Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 5 Cols: Officer Prompt & Document Verification */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-slate-900 border-2 border-blue-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                      OFFICER INTERVIEW BOOTH
                    </span>
                    <h3 className="text-base font-black text-white">{activeVisaScenario.title}</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-bold">
                    {activeVisaScenario.visaType}
                  </span>
                </div>

                {/* Officer Dialogue Bubble */}
                <div className="bg-slate-950 border border-blue-500/40 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-amber-300 flex items-center gap-1">
                      <span>👮‍♂️ Consular / CBP Officer:</span>
                    </span>
                    <AudioSpeakButton text={activeVisaScenario.officerQuestion} />
                  </div>
                  <p className="text-sm text-white font-bold leading-relaxed italic">
                    "{activeVisaScenario.officerQuestion}"
                  </p>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Tone: {activeVisaScenario.officerTone}
                  </p>
                </div>

                {/* Required Documents Checklist */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Required Documents in Hand:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeVisaScenario.requiredDocuments.map((doc, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Biometric Verification Trigger */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-500/30 text-center space-y-3">
                  <div className="text-3xl">🖨️👆</div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Biometric Fingerprint & Passport Stamp</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Place your four fingers on the glowing green scanner.
                    </p>
                  </div>

                  <button
                    onClick={handleVerifyBiometrics}
                    className={`w-full py-2.5 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
                      isFingerprintVerified
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg active:scale-95'
                    }`}
                  >
                    <Fingerprint className="w-4 h-4" />
                    <span>{isFingerprintVerified ? '✓ Biometrics Verified & Visa Approved!' : 'Scan Fingerprints (*BEEP*) + 50 XP'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Response Styles, Breakdown & Voice Practice */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                    Choose Your Answering Style ({activeVisaScenario.responseStyles.length} Styles):
                  </h3>
                  <span className="text-xs text-slate-400">Master Real Spoken English</span>
                </div>

                {/* Style Selector Tabs */}
                <div className="flex flex-wrap gap-2">
                  {activeVisaScenario.responseStyles.map((res, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        sound.playClick();
                        setSelectedStyleIdx(i);
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-black border transition-all ${
                        selectedStyleIdx === i
                          ? res.isSafe
                            ? 'bg-blue-600 text-white border-blue-400 shadow-md ring-2 ring-blue-400/30'
                            : 'bg-rose-600 text-white border-rose-400 shadow-md ring-2 ring-rose-400/30'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{res.styleName}</span>
                    </button>
                  ))}
                </div>

                {/* Active Response Review Card */}
                <div className={`p-5 rounded-2xl border-2 space-y-3 ${
                  activeResponse.isSafe
                    ? 'bg-slate-950 border-blue-500/40'
                    : 'bg-rose-950/30 border-rose-500/60'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      activeResponse.isSafe ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {activeResponse.badge}
                    </span>
                    <AudioSpeakButton text={activeResponse.text} />
                  </div>

                  <p className="text-sm text-slate-100 font-semibold leading-relaxed">
                    "{activeResponse.text}"
                  </p>

                  <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                    activeResponse.isSafe ? 'bg-blue-950/50 text-blue-200 border border-blue-500/20' : 'bg-rose-950/60 text-rose-200 border border-rose-500/30'
                  }`}>
                    <span className="font-bold block mb-0.5">{activeResponse.isSafe ? '💡 Why this answer succeeds:' : '⚠️ Why this triggers rejection:'}</span>
                    {activeResponse.whyGood}
                  </div>
                </div>

                {/* Voice Speech Microphone Practice */}
                <VoiceSpeechPractice
                  targetPhrase={activeResponse.text}
                  phraseMeaning={`Practice speaking your ${activeResponse.styleName} answer clearly for the officer!`}
                  onSuccess={() => onAddXp(35, `Spoke flawless response for ${activeVisaScenario.title}! 🎙️`)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: STEP-BY-STEP AIRPORT PIPELINE */}
      {activeTab === 'walkthrough' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Vertical Step Timeline */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">
              Flight Stages ({completedSteps.length}/{airportSteps.length} Complete)
            </h3>

            <div className="space-y-2">
              {airportSteps.map((step, idx) => {
                const isSelected = selectedStepIndex === idx;
                const isDone = completedSteps.includes(step.stepNumber);

                return (
                  <button
                    key={step.stepNumber}
                    onClick={() => {
                      sound.playClick();
                      setSelectedStepIndex(idx);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 relative ${
                      isSelected
                        ? 'bg-blue-950/60 border-blue-400 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 text-slate-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 ${
                        isDone
                          ? 'bg-emerald-500 text-slate-950'
                          : isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.stepNumber}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {step.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{step.location}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Step Details & Actions */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 uppercase">
                      Checkpoint #{currentStep.stepNumber}
                    </span>
                    <span className="text-xs text-slate-400">{currentStep.location}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {currentStep.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-300 font-semibold mt-0.5">
                    {currentStep.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => handleCompleteStep(currentStep.stepNumber)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                    completedSteps.includes(currentStep.stepNumber)
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{completedSteps.includes(currentStep.stepNumber) ? 'Step Mastered!' : 'Mark Completed (+30 XP)'}</span>
                </button>
              </div>

              {/* What Happens */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-sm text-slate-200 leading-relaxed">
                <span className="font-bold text-amber-300">What happens at this stage: </span>
                {currentStep.whatHappens}
              </div>

              {/* Do This Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> What to do (Best Practices):
                </h4>
                <div className="space-y-2">
                  {currentStep.doThis.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Don't Do This Alert */}
              {currentStep.dontDoThis && currentStep.dontDoThis.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1.5">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Things to Avoid (Mistakes):
                  </h4>
                  {currentStep.dontDoThis.map((dont, idx) => (
                    <p key={idx} className="text-xs text-rose-200 leading-relaxed">
                      • {dont}
                    </p>
                  ))}
                </div>
              )}

              {/* Key Spoken Phrases */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  🗣️ Spoken English to Use Here:
                </h4>
                <div className="space-y-2">
                  {currentStep.keyPhrases.map((phrase, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-white italic">"{phrase.english}"</p>
                        <p className="text-xs text-slate-400">{phrase.meaning}</p>
                      </div>
                      <AudioSpeakButton text={phrase.english} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Voice Speech Practice */}
              {currentStep.keyPhrases.length > 0 && (
                <div className="pt-2 border-t border-slate-800">
                  <VoiceSpeechPractice
                    targetPhrase={currentStep.keyPhrases[0].english}
                    phraseMeaning={currentStep.keyPhrases[0].meaning}
                    onSuccess={() => onAddXp(25, 'Spoken airport English practiced! 🎙️')}
                  />
                </div>
              )}

              {/* Pro Secret Tip */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Kenji's Pro Airport Secret: </span>
                  {currentStep.proSecrets}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IN-FLIGHT CABIN & VACUUM LAVATORY */}
      {activeTab === 'cabin_lavatory' && (
        <AirplaneCabinLavatorySim onAddXp={onAddXp} />
      )}

      {/* TAB 3: LUGGAGE SCALE & CISF/TSA SECURITY SIMULATOR */}
      {activeTab === 'luggage_security' && (
        <AirportLuggageSecuritySim onAddXp={onAddXp} />
      )}

      {/* TAB 4: PASSPORT, VISAS & BOARDING PASS DECODER */}
      {activeTab === 'boarding_pass' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
              Visual Travel Documents Guide
            </span>
            <h2 className="text-2xl font-black text-white mt-1 flex items-center gap-2">
              <Ticket className="w-6 h-6 text-blue-400" />
              Passport, Travel Visas & Boarding Pass Decoder 📘✈️
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              See what real travel documents look like: Your Republic of India Passport, Visa stamps, airline Boarding Passes, Baggage claim tags, and Customs Cards!
            </p>
          </div>

          {/* Embedded Passport & Visa Visual Artwork */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-2xl bg-slate-950">
            <img
              src={`${import.meta.env.BASE_URL}images/passport_visa_guide.jpg`}
              alt="Indian Passport, Visas and Boarding Pass Visual Guide"
              className="w-full h-auto object-cover max-h-[460px] mx-auto hover:scale-[1.01] transition-transform duration-300"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl text-xs text-blue-300 font-bold border border-blue-500/30 flex items-center justify-between">
              <span>📘 Visual Flatlay: Indian Passport • Visa Stamps • Boarding Pass (Seat 14A) • Luggage Tag • Customs Card</span>
            </div>
          </div>

          {/* Document Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>📘</span> Republic of India Passport
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your primary international ID document. Keep it in a water-resistant travel neck pouch. Must have at least 6 months of validity before traveling abroad!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>🛂</span> Visa Stamps & eVisa
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Official permission from foreign governments (e.g. Japan / USA) permitting your entry. The immigration officer stamps your open passport page upon arrival and departure.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <span>🧳</span> Luggage Claim Sticky Tag
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you drop your suitcase at the airport counter, the agent sticks a matching barcode receipt onto your passport. Keep it safe to claim your bag at the destination carousel!
              </p>
            </div>
          </div>

          {/* Interactive Boarding Pass Card */}
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-slate-100 to-blue-50 text-slate-900 rounded-3xl p-6 shadow-2xl border-4 border-blue-500 relative overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-slate-300 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedRoute.airlineEmoji}</span>
                <div>
                  <h3 className="font-black text-lg text-blue-900">{selectedRoute.airline}</h3>
                  <p className="text-xs font-bold text-slate-500">Boarding Pass / Electronic Ticket</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-black text-slate-600">FLIGHT</div>
                <div className="text-xl font-black text-blue-700">{selectedRoute.flightNumber}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 text-center">
              <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Passenger</span>
                <p className="font-black text-slate-800 text-sm">SWATHI / MS</p>
              </div>
              <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Seat</span>
                <p className="font-black text-blue-600 text-lg">{selectedRoute.seat}</p>
              </div>
              <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Gate</span>
                <p className="font-black text-slate-800 text-lg">{selectedRoute.gate}</p>
              </div>
              <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Zone / Group</span>
                <p className="font-black text-amber-600 text-sm">{selectedRoute.boardingGroup}</p>
              </div>
            </div>

            <div className="p-4 bg-blue-950 text-white rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-[10px] text-blue-300 uppercase font-bold">Route</div>
                <div className="font-black text-sm">{selectedRoute.fromCity} ({selectedRoute.fromCode}) ➔ {selectedRoute.toCity} ({selectedRoute.toCode})</div>
              </div>
              <div className="text-right font-mono text-xs">
                <div>{selectedRoute.terminal}</div>
                <div className="text-amber-400 font-bold">Priority Boarding</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TRAVEL VOCABULARY DICTIONARY WITH MEANINGS */}
      {activeTab === 'vocab_dictionary' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              Airport & Aviation Vocabulary Dictionary with Meanings
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every travel word explained in simple English. Learn what each term means, hear how to pronounce it, and understand why it matters when flying!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRAVEL_VOCABULARY_DICTIONARY.map((item) => (
              <div key={item.id} className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-2xl bg-slate-950 border border-slate-800">{item.emoji}</span>
                    <div>
                      <h3 className="text-lg font-black text-white">{item.term}</h3>
                      <span className="text-xs font-mono text-blue-400">/{item.pronunciation}/</span>
                    </div>
                  </div>
                  <button
                    onClick={() => sound.speakEnglish(`${item.term}. ${item.meaning}`)}
                    className="p-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40"
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

                <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-500/20 text-xs space-y-1">
                  <span className="font-bold text-blue-300">Practical Travel Tip:</span>
                  <p className="text-slate-300">{item.practicalTip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
