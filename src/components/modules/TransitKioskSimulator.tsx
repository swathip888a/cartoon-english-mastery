import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import {
  Train,
  CreditCard,
  Banknote,
  Smartphone,
  Sparkles,
  CheckCircle,
  MapPin,
  Users,
  Ticket,
  ChevronRight,
  RotateCcw,
  Zap,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TransitKioskSimulatorProps {
  onAddXp: (amount: number, reason: string) => void;
}

interface Station {
  id: string;
  name: string;
  japaneseName: string;
  line: string;
  fare: number;
  timeMin: number;
}

const STATIONS: Station[] = [
  { id: 'shinjuku', name: 'Shinjuku Station (新宿)', japaneseName: 'しんじゅく', line: 'JR Yamanote Line', fare: 2.10, timeMin: 14 },
  { id: 'shibuya', name: 'Shibuya Scramble (渋谷)', japaneseName: 'しぶや', line: 'Ginza & Yamanote', fare: 2.10, timeMin: 18 },
  { id: 'akihabara', name: 'Akihabara Electric Town (秋葉原)', japaneseName: 'あきはばら', line: 'JR Chuo-Sobu', fare: 2.80, timeMin: 12 },
  { id: 'asakusa', name: 'Asakusa Senso-ji (浅草)', japaneseName: 'あさくさ', line: 'Asakusa Subway', fare: 3.20, timeMin: 22 },
  { id: 'haneda_airport', name: 'Haneda Airport Terminal (羽田空港)', japaneseName: 'はねだくうこう', line: 'Tokyo Monorail', fare: 5.60, timeMin: 32 },
  { id: 'ginza', name: 'Ginza Shopping Central (銀座)', japaneseName: 'ぎんざ', line: 'Marunouchi Line', fare: 2.40, timeMin: 8 }
];

export const TransitKioskSimulator: React.FC<TransitKioskSimulatorProps> = ({ onAddXp }) => {
  const [ticketType, setTicketType] = useState<'single' | 'roundtrip' | 'daypass' | 'ic_recharge'>('single');
  const [selectedStation, setSelectedStation] = useState<Station>(STATIONS[0]);
  const [passengers, setPassengers] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'contactless' | 'ic_card'>('contactless');
  const [isPurchased, setIsPurchased] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  const calculateTotalFare = () => {
    if (ticketType === 'daypass') return 8.50 * passengers;
    if (ticketType === 'ic_recharge') return 20.00;
    if (ticketType === 'roundtrip') return selectedStation.fare * 2 * passengers;
    return selectedStation.fare * passengers;
  };

  const total = calculateTotalFare();

  const handlePurchase = () => {
    sound.playSuccess();
    setIsPurchased(true);
    confetti({
      particleCount: 110,
      spread: 70,
      origin: { y: 0.5 }
    });
    onAddXp(50, `Purchased ${ticketType} transit ticket to ${selectedStation.name}`);
  };

  const handleReset = () => {
    sound.playClick();
    setIsPurchased(false);
    setActiveStep(1);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
                <Train className="w-3.5 h-3.5" /> Metro & Train Station Simulator
              </span>
              <span className="text-xs text-slate-400">自動券売機・タッチパネル操作</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-200">
              Interactive Touchscreen Ticket Machine
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Step up to the station ticket kiosk. Select your destination, pick single journey or 1-day pass, and pay using contactless cards or cash.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/60 border border-emerald-500/30 px-4 py-3 rounded-2xl">
            <Ticket className="w-6 h-6 text-emerald-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Kiosk Mode</p>
              <p className="text-lg font-black text-emerald-300">Active Simulation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Kiosk Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* The Touchscreen Machine */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border-4 border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Machine Top Bezel */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-white">METRO TOUCHSCREEN TICKET DISPENSER</h2>
                  <p className="text-xs text-emerald-400 font-mono">AUTOMATED TICKET VENDING SYSTEM v4.2</p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Start Over
              </button>
            </div>

            {!isPurchased ? (
              <div className="space-y-6">
                {/* Step 1: Select Ticket Category */}
                <div>
                  <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2.5 block">
                    Step 1: Choose Ticket Type (切符の種類)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'single', label: 'Single Journey', desc: 'One-way Trip', tag: '$' },
                      { id: 'roundtrip', label: 'Round-Trip', desc: 'Return Ticket', tag: '2x' },
                      { id: 'daypass', label: '1-Day Pass', desc: 'Unlimited Rides', tag: 'Pass' },
                      { id: 'ic_recharge', label: 'IC Card Top-Up', desc: 'Add $20 Balance', tag: 'IC' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setTicketType(t.id as any);
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          ticketType === t.id
                            ? 'bg-emerald-950/60 border-emerald-400 text-white ring-2 ring-emerald-500/20 shadow-md'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md inline-block mb-1.5">
                          {t.tag}
                        </span>
                        <p className="font-bold text-xs">{t.label}</p>
                        <p className="text-[11px] text-slate-400">{t.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Destination Selector (if not 1-day pass) */}
                {ticketType !== 'daypass' && ticketType !== 'ic_recharge' && (
                  <div>
                    <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2.5 block">
                      Step 2: Select Destination Station (行先駅の選択)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {STATIONS.map((station) => (
                        <button
                          key={station.id}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setSelectedStation(station);
                          }}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                            selectedStation.id === station.id
                              ? 'bg-teal-950/60 border-teal-400 text-white ring-2 ring-teal-500/20 shadow-md'
                              : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <p className="font-bold text-sm text-slate-100">{station.name}</p>
                            <p className="text-xs text-teal-400">{station.line} • ~{station.timeMin} mins</p>
                          </div>
                          <span className="text-sm font-black text-emerald-300 font-mono">
                            ${station.fare.toFixed(2)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Passenger Count */}
                {ticketType !== 'ic_recharge' && (
                  <div>
                    <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2.5 block">
                      Step 3: Number of Passengers (人数)
                    </label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setPassengers(num);
                          }}
                          className={`flex-1 py-3 rounded-xl font-extrabold text-sm border transition-all ${
                            passengers === num
                              ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {num} {num === 1 ? 'Adult' : 'Adults'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Payment Selector & Checkout */}
                <div>
                  <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2.5 block">
                    Step 4: Select Payment Method (お支払い)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'contactless', label: 'Apple Pay / Tap', icon: <Smartphone className="w-4 h-4" /> },
                      { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard className="w-4 h-4" /> },
                      { id: 'cash', label: 'Insert Cash Notes', icon: <Banknote className="w-4 h-4" /> }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setPaymentMethod(p.id as any);
                        }}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                          paymentMethod === p.id
                            ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {p.icon}
                        <span className="text-xs font-bold text-center">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confirm Pay Button */}
                <button
                  type="button"
                  onClick={handlePurchase}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-slate-950 font-black text-base shadow-xl hover:shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>PAY ${total.toFixed(2)} & PRINT TICKET (+50 XP)</span>
                </button>
              </div>
            ) : (
              /* Printed Ticket Animation Output */
              <div className="space-y-6 text-center py-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-black text-white">Payment Accepted! Ticket Dispensed</h3>
                <p className="text-xs text-slate-400">Please take your printed transit card from the ticket tray below.</p>

                {/* Visual Printed Ticket */}
                <div className="max-w-md mx-auto bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 text-slate-900 rounded-2xl p-6 border-2 border-dashed border-amber-400 shadow-2xl text-left relative overflow-hidden font-mono">
                  <div className="flex items-center justify-between border-b-2 border-slate-800/20 pb-3 mb-3">
                    <span className="font-extrabold text-xs tracking-widest uppercase">TOKYO METRO TRANSIT PASS</span>
                    <span className="text-xs font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded">
                      {ticketType.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">FROM:</span>
                      <span className="font-bold">CENTRAL STATION (東京駅)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">TO:</span>
                      <span className="font-extrabold text-emerald-800">
                        {ticketType === 'daypass' ? 'ALL ZONES UNLIMITED' : selectedStation.name.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">PASSENGERS:</span>
                      <span className="font-bold">{passengers} ADULT(S)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">FARE PAID:</span>
                      <span className="font-extrabold text-sm text-slate-900">${total.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/20 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">VALID ON DATE OF ISSUE</span>
                    <span className="font-mono text-xs tracking-widest font-black">||| | || |||| | |||</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow"
                >
                  Buy Another Ticket
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Station Guide & English Phrases */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl sticky top-24">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Essential Station English Phrases
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="font-bold text-slate-200">"Excuse me, which line goes to Shinjuku?"</p>
                <p className="text-slate-400 mt-0.5">🇯🇵 すみません、新宿へ行くにはどの路線に乗ればいいですか？</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="font-bold text-slate-200">"Where can I buy a subway day pass?"</p>
                <p className="text-slate-400 mt-0.5">🇯🇵 地下鉄の1日乗車券はどこで買えますか？</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <p className="font-bold text-slate-200">"Does this train stop at Haneda Airport?"</p>
                <p className="text-slate-400 mt-0.5">🇯🇵 この電車は羽田空港に停車しますか？</p>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-800/40 p-3.5 rounded-xl text-emerald-200/90">
                <p className="font-bold text-emerald-300 mb-1">💡 Pro Transit Tip:</p>
                <p>
                  Most subway ticket machines have an "English" language button in the top-right corner. Keep small cash ($1, $5, $10 or ¥1,000 notes) handy if you don't have a contactless card!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
