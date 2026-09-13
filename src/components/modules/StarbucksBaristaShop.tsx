import React, { useState } from 'react';
import { coffeeDrinks, starbucksSizes, milkOptions, roastOptions, COFFEE_VOCABULARY_DICTIONARY, CoffeeVocabEntry } from '../../data/starbucksData';
import { STARBUCKS_FOOD_ITEMS, CONDIMENT_BAR_ITEMS, STARBUCKS_CASHIER_FLOW } from '../../data/starbucksFoodData';
import { CoffeeDrink, CupStyle, StarbucksFoodItem, CondimentItem } from '../../types';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { VoiceSpeechPractice } from '../VoiceSpeechPractice';
import { sound } from '../../utils/audio';
import {
  Coffee,
  Sparkles,
  Flame,
  Check,
  Plus,
  Zap,
  Cookie,
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle2,
  Mic,
  RotateCcw,
  Layers,
  Heart,
  BookOpen,
  Volume2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StarbucksBaristaShopProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const StarbucksBaristaShop: React.FC<StarbucksBaristaShopProps> = ({ onAddXp }) => {
  const [activeShopMode, setActiveShopMode] = useState<'visual_cups_guide' | 'barista_builder' | 'best_worst_combos' | 'vocabulary_dictionary' | 'cashier_sim'>('barista_builder');
  const [selectedDrink, setSelectedDrink] = useState<CoffeeDrink>(coffeeDrinks[0]);
  const [cupStyle, setCupStyle] = useState<CupStyle>('iced_clear_plastic');
  const [selectedFood, setSelectedFood] = useState<StarbucksFoodItem>(STARBUCKS_FOOD_ITEMS[0]);
  const [includeFood, setIncludeFood] = useState<boolean>(true);
  const [foodWarmed, setFoodWarmed] = useState<boolean>(true);

  // Customizer options
  const [customSize, setCustomSize] = useState<string>('Grande');
  const [customMilk, setCustomMilk] = useState<string>('Oat Milk');
  const [hasEspressoShotAddon, setHasEspressoShotAddon] = useState<boolean>(false);
  const [customRoast, setCustomRoast] = useState<string>('Blonde Espresso');
  const [customSyrup, setCustomSyrup] = useState<string>('Vanilla');
  const [syrupPumps, setSyrupPumps] = useState<number>(3);
  const [hasExtraColdFoam, setHasExtraColdFoam] = useState<boolean>(true);
  const [hasExtraDrizzle, setHasExtraDrizzle] = useState<boolean>(true);

  // Condiment bar additions
  const [selectedSugars, setSelectedSugars] = useState<string[]>(['Sugar in the Raw (Turbinado Brown)']);
  const [selectedStraw, setSelectedStraw] = useState<string>('Classic Starbucks Green Straw');
  const [hasSleeve, setHasSleeve] = useState<boolean>(false);
  const [hasSplashStick, setHasSplashStick] = useState<boolean>(false);

  // Barista Cashier Step
  const [cashierStepIdx, setCashierStepIdx] = useState<number>(0);
  const [isCashierComplete, setIsCashierComplete] = useState<boolean>(false);

  // Dialogue style selection for infinite realistic spoken variations
  const [dialogueStyleIndex, setDialogueStyleIndex] = useState<number>(0);

  // Load Swathi's Signature Gourmet Combo directly with 1 click
  const handleLoadSwathiCombo = () => {
    sound.playClick();
    const hotChoc = coffeeDrinks.find(d => d.id === 'signature_hot_chocolate') || coffeeDrinks[0];
    const tomatoPanini = STARBUCKS_FOOD_ITEMS.find(f => f.id === 'tomato_mozzarella_panini') || STARBUCKS_FOOD_ITEMS[0];

    setSelectedDrink(hotChoc);
    setCupStyle('hot_paper_sleeve');
    setCustomSize('Short');
    setCustomMilk('Oat Milk');
    setHasEspressoShotAddon(true);
    setCustomRoast('Blonde Espresso');
    setCustomSyrup('Vanilla');
    setSyrupPumps(3);
    setHasExtraColdFoam(true);
    setHasExtraDrizzle(false);
    setSelectedFood(tomatoPanini);
    setIncludeFood(true);
    setFoodWarmed(true);
    setHasSleeve(true);
    setDialogueStyleIndex(0);
    onAddXp(35, "Loaded Swathi's Signature Short Hot Chocolate & Mozzarella Panini Combo! ☕🥪✨");
  };

  // Randomize realistic delicious combos
  const handleRandomizeCombo = () => {
    sound.playClick();
    const randomDrink = coffeeDrinks[Math.floor(Math.random() * coffeeDrinks.length)];
    const sizes = ['Short', 'Tall', 'Grande', 'Venti'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    const milks = ['Oat Milk', 'Almond Milk', 'Whole Milk', 'Vanilla Soy Milk', 'Coconut Milk'];
    const randomMilk = milks[Math.floor(Math.random() * milks.length)];
    const syrups = ['Vanilla', 'Caramel', 'Hazelnut', 'Brown Sugar', 'Toffee Nut'];
    const randomSyrup = syrups[Math.floor(Math.random() * syrups.length)];
    const randomPumps = Math.floor(Math.random() * 4) + 1;
    const randomFood = STARBUCKS_FOOD_ITEMS[Math.floor(Math.random() * STARBUCKS_FOOD_ITEMS.length)];

    setSelectedDrink(randomDrink);
    setCupStyle(randomDrink.recommendedCup);
    setCustomSize(randomSize);
    setCustomMilk(randomMilk);
    setCustomSyrup(randomSyrup);
    setSyrupPumps(randomPumps);
    setHasExtraColdFoam(randomDrink.category === 'iced' || Math.random() > 0.5);
    setHasExtraDrizzle(Math.random() > 0.5);
    setSelectedFood(randomFood);
    setIncludeFood(true);
    setFoodWarmed(randomFood.warmingSupported);
    setDialogueStyleIndex(prev => (prev + 1) % 3);
    if (randomDrink.id === 'signature_hot_chocolate' || randomDrink.id === 'white_hot_chocolate') {
      setHasEspressoShotAddon(Math.random() > 0.5);
      setCustomRoast('Blonde Espresso');
    } else {
      setHasEspressoShotAddon(false);
    }
    onAddXp(20, `Randomized a new delicious Starbucks combo: ${randomDrink.name}! ☕`);
  };

  const calculateTotal = () => {
    let base = selectedDrink.basePrice;
    if (customSize === 'Venti') base += 0.80;
    if (customSize === 'Trenta') base += 1.20;
    if (hasExtraColdFoam) base += 1.25;
    if (hasEspressoShotAddon) base += 1.00;
    if (includeFood) base += selectedFood.price;
    return base;
  };

  const total = calculateTotal();

  // Smart Order Script Generator with Multiple Dynamic Phrasing Styles
  const isEspressoBased = selectedDrink.category === 'espresso' && selectedDrink.id !== 'signature_hot_chocolate' && selectedDrink.id !== 'white_hot_chocolate';

  const dialoguePhrasings = [
    {
      styleName: "🌟 Polite & Clear",
      badge: "Best for Beginners",
      script: `Hi! Can I please get a ${customSize} ${selectedDrink.name} with ${customMilk}${
        isEspressoBased ? `, ${customRoast}` : hasEspressoShotAddon ? `, ${customRoast}` : ''
      }${syrupPumps > 0 ? `, and ${syrupPumps} pumps of ${customSyrup}` : ''}${
        hasExtraColdFoam ? ', topped with Vanilla Sweet Cold Foam' : ''
      }${hasExtraDrizzle ? ', with caramel drizzle' : ''}${
        includeFood ? `, and a ${selectedFood.name}${foodWarmed ? ' warmed up' : ''}` : ''
      }?`
    },
    {
      styleName: "⚡ Fast & Natural",
      badge: "Everyday Native",
      script: `Hey! Could I grab a ${customSize} ${selectedDrink.name} made with ${customMilk}${
        isEspressoBased ? `, ${customRoast}` : hasEspressoShotAddon ? `, add a shot of ${customRoast}` : ''
      }${syrupPumps > 0 ? `, ${syrupPumps} pumps of ${customSyrup}` : ''}${
        hasExtraColdFoam ? ', with Vanilla Sweet Cold Foam on top' : ''
      }${hasExtraDrizzle ? ', and caramel drizzle' : ''}${
        includeFood ? `, and could you warm up a ${selectedFood.name} for me?` : '?'
      }`
    },
    {
      styleName: "🚗 Drive-thru Shorthand",
      badge: "Barista Pro Level",
      script: `Good morning! I'd like a ${customSize} ${selectedDrink.name}, sub ${customMilk}${
        isEspressoBased ? `, ${customRoast}` : hasEspressoShotAddon ? `, add a single ${customRoast}` : ''
      }${syrupPumps > 0 ? `, ${syrupPumps} pumps ${customSyrup}` : ''}${
        hasExtraColdFoam ? ', add Vanilla Sweet Cold Foam' : ''
      }${hasExtraDrizzle ? ', extra caramel drizzle' : ''}${
        includeFood ? `, and one ${selectedFood.name} ${foodWarmed ? 'warmed' : ''} please.` : ' please.'
      }`
    },
    {
      styleName: "🎀 Cheerful & Sweet",
      badge: "Cute Anime Style",
      script: `Hello! May I please have a delicious ${customSize} ${selectedDrink.name} with ${customMilk}${
        isEspressoBased ? `, ${customRoast}` : hasEspressoShotAddon ? `, with an extra shot of ${customRoast}` : ''
      }${syrupPumps > 0 ? `, and ${syrupPumps} pumps of ${customSyrup}` : ''}${
        hasExtraColdFoam ? ', topped with a fluffy cloud of Vanilla Sweet Cold Foam' : ''
      }${hasExtraDrizzle ? ', and yummy caramel drizzle' : ''}${
        includeFood ? `, plus a warm ${selectedFood.name}` : ''
      }! Thank you so much!`
    },
    {
      styleName: "💼 Executive Quick Rush",
      badge: "Business Corporate",
      script: `Hi, I need a ${customSize} ${selectedDrink.name} with ${customMilk}${
        isEspressoBased ? `, ${customRoast}` : hasEspressoShotAddon ? `, 1 shot of ${customRoast}` : ''
      }${syrupPumps > 0 ? `, ${syrupPumps} pumps ${customSyrup}` : ''}${
        hasExtraColdFoam ? ', cold foam' : ''
      }${hasExtraDrizzle ? ', caramel drizzle' : ''}${
        includeFood ? `, and a warmed ${selectedFood.name} to go` : ' to go'
      }, please. Thanks.`
    },
    {
      styleName: "🏖️ Chill & Laid-Back",
      badge: "West Coast Vibe",
      script: `What's up! Lemme get a ${customSize} ${selectedDrink.name} on ${customMilk}${
        isEspressoBased ? `, ${customRoast}` : hasEspressoShotAddon ? `, throw in a ${customRoast} shot` : ''
      }${syrupPumps > 0 ? `, ${syrupPumps} pumps of ${customSyrup}` : ''}${
        hasExtraColdFoam ? ', sweet cold foam on top' : ''
      }${hasExtraDrizzle ? ', caramel drizzle' : ''}${
        includeFood ? `, and hook me up with a toasted ${selectedFood.name}` : ''
      }. Appreciate it!`
    },
    {
      styleName: "📱 Mobile Pickup Check-in",
      badge: "App Order Pickup",
      script: `Hi there! I'm here to pick up a mobile order for Swathi — a ${customSize} ${selectedDrink.name}${includeFood ? ` and ${selectedFood.name}` : ''}. Thank you!`
    }
  ];

  const currentDialogue = dialoguePhrasings[dialogueStyleIndex % dialoguePhrasings.length];
  const generatedOrderScript = currentDialogue.script;

  const handleToggleSugar = (sugarName: string) => {
    sound.playClick();
    if (selectedSugars.includes(sugarName)) {
      setSelectedSugars(prev => prev.filter(s => s !== sugarName));
    } else {
      setSelectedSugars(prev => [...prev, sugarName]);
    }
  };

  const handleFinishCashier = () => {
    setIsCashierComplete(true);
    sound.playLevelUp();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#10b981', '#f59e0b', '#ec4899', '#3b82f6']
    });
    onAddXp(60, 'Completed Cartoon Starbucks Cashier Order! ☕🥐');
  };

  const activeCashier = STARBUCKS_CASHIER_FLOW[cashierStepIdx];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950/40 border-2 border-emerald-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/40 flex items-center gap-1.5">
                <Coffee className="w-4 h-4" /> Cartoon Coffee Bar & Bakery
              </span>
              <span className="text-xs text-amber-300 font-bold">100% Practical English</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-200 to-yellow-200">
              The Full Cartoon Starbucks Cafe Simulator ☕🥐✨
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Never be confused again! Learn all cup sizes (Short to Trenta), cup types, hot chocolates, espresso drinks, add-on customizations, and best vs worst ordering secrets!
            </p>
          </div>

          <div className="bg-slate-950/80 border-2 border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-black">
              ☕
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-black">Cafe Status</p>
              <p className="text-sm font-black text-emerald-300">Fresh Brew Ready</p>
            </div>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto no-scrollbar border-t border-emerald-900/60 pt-4">
          {[
            { id: 'barista_builder', label: '☕ Build & Customize Drinks', count: 'Visual Layer Builder' },
            { id: 'visual_cups_guide', label: '🖼️ Visual Cups & Drink Anatomy', count: 'Real Illustrated Guide' },
            { id: 'best_worst_combos', label: '🌟 Best vs Worst Combos', count: 'Secrets & Mistakes' },
            { id: 'vocabulary_dictionary', label: '📖 Coffee Dictionary & Meanings', count: `${COFFEE_VOCABULARY_DICTIONARY.length} Terms Defined` },
            { id: 'cashier_sim', label: '🎙️ Barista Cashier Speech Lab', count: 'Voice Microphone' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                sound.playClick();
                setActiveShopMode(mode.id as any);
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeShopMode === mode.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{mode.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeShopMode === mode.id ? 'bg-slate-950 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                {mode.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 🖼️ VISUAL CUPS & DRINK ANATOMY GUIDE */}
      {activeShopMode === 'visual_cups_guide' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Section 1: Cup Sizes Comparison */}
          <div className="bg-slate-900/90 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  Visual Sizing Chart
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  1. Starbucks Cup Sizes Lined Up (Short to Trenta) 📏
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Why are Starbucks sizes weird? "Tall" is actually small, "Grande" (GRAHN-day) means medium, and "Venti" (VEN-tee) means 20 in Italian!
                </p>
              </div>
            </div>

            {/* Embedded Visual Artwork */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-slate-950">
              <img
                src={`${import.meta.env.BASE_URL}images/starbucks_cups_lineup.jpg`}
                alt="Starbucks Cup Sizes Lineup"
                className="w-full h-auto object-cover max-h-[460px] mx-auto hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl text-xs text-emerald-300 font-bold border border-emerald-500/30 flex items-center justify-between">
                <span>⭐ Visual Reference: Short (8oz) • Tall (12oz) • Grande (16oz) • Venti Hot (20oz) • Venti Iced (24oz) • Trenta (31oz)</span>
                <span className="text-amber-300 text-[11px] hidden sm:inline">Iced Venti is larger (24oz) to make room for ice cubes!</span>
              </div>
            </div>

            {/* Interactive Cards for Each Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {starbucksSizes.map((size) => (
                <div key={size.name} className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-4 shadow-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-white text-base">{size.name}</h3>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      {size.volumeOz} ({size.volumeMl})
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{size.description}</p>
                  <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px] font-semibold text-slate-400">
                    <div className="bg-slate-900 p-1.5 rounded-lg text-center">
                      <span className="block text-amber-400 font-bold">{size.shotsHot}</span>
                      <span>Espresso</span>
                    </div>
                    <div className="bg-slate-900 p-1.5 rounded-lg text-center">
                      <span className="block text-amber-400 font-bold">{size.pumpsSyrup}</span>
                      <span>Syrup Pumps</span>
                    </div>
                    <div className="bg-slate-900 p-1.5 rounded-lg text-center">
                      <span className="block text-amber-400 font-bold">{size.caffeineMg}</span>
                      <span>Caffeine</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Visual Drink Layer Recipes */}
          <div className="bg-slate-900/90 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Coffee Layer Anatomy
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  2. Visual Recipe Guide: How Drinks Are Made ☕✨
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  See the exact cross-section layer cuts: Espresso, Americano, Caffè Latte, Cappuccino, Caramel Macchiato, Mocha, Cold Brew with Cold Foam, and Frappuccino!
                </p>
              </div>
            </div>

            {/* Embedded Drink Layers Artwork */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-slate-950">
              <img
                src={`${import.meta.env.BASE_URL}images/starbucks_drinks_guide.jpg`}
                alt="Starbucks Drink Recipes Visual Guide"
                className="w-full h-auto object-cover max-h-[500px] mx-auto hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl text-xs text-amber-300 font-bold border border-emerald-500/30">
                ☕ Cross-Section Guide: Espresso Crema • Steamed Milk • Microfoam • Vanilla Cold Foam Float • Caramel Drizzle Crosshatch
              </div>
            </div>
          </div>

          {/* Section 3: Cup Styles & Condiments Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cup Styles */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>🥤</span> The 4 Types of Cups Explained
              </h3>
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <span>☕</span> 1. Hot Paper Cup + Cardboard Sleeve
                  </div>
                  <p className="text-slate-300">White insulated paper cup. Always grab a brown corrugated cardboard sleeve from the counter so your hands do not get burned!</p>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <span>🥤</span> 2. Clear Iced Plastic Cup + Straw / Nitro Sip Lid
                  </div>
                  <p className="text-slate-300">Transparent plastic showing layered drinks. Comes with either a green plastic straw or a strawless nitro lid designed for cold foam sips.</p>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-blue-300 flex items-center gap-1.5">
                    <span>🍵</span> 3. Ceramic Dine-In Mug
                  </div>
                  <p className="text-slate-300">If you are drinking inside the cafe, ask for a "For-Here ceramic mug" for an authentic coffeehouse experience and less paper waste.</p>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-purple-300 flex items-center gap-1.5">
                    <span>✨</span> 4. Personal Reusable Tumbler
                  </div>
                  <p className="text-slate-300">Bring your own clean tumbler to Starbucks! You get a $0.10 discount and 25 bonus stars in the Starbucks Rewards app.</p>
                </div>
              </div>
            </div>

            {/* Condiment Bar & Sugar Packets */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>🧂</span> Sugar Packets & Condiment Bar
              </h3>
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-white border border-slate-400" /> White Sugar Packet (Classic)
                  </div>
                  <p className="text-slate-300">Standard pure granulated cane sugar (4 grams per packet). Adds clean, direct sweetness.</p>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-amber-700" /> Sugar in the Raw (Turbinado Brown Packet)
                  </div>
                  <p className="text-slate-300">Coarse, unrefined brown crystals with natural molasses flavor. Excellent in hot lattes!</p>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-yellow-300 flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-yellow-400" /> Splenda (Yellow Packet) / Stevia (Green)
                  </div>
                  <p className="text-slate-300">Zero-calorie plant & artificial sweeteners. 1 packet equals the sweetness of 2 spoons of sugar.</p>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>🟢</span> Green Splash Stick (Stopper)
                  </div>
                  <p className="text-slate-300">A small green stick with the Starbucks siren on top. Plug it into your hot lid sip hole to stop hot coffee from spilling when driving or walking!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VOCABULARY DICTIONARY MODE */}
      {activeShopMode === 'vocabulary_dictionary' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              Complete Starbucks & Coffee Vocabulary Dictionary with Meanings
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every coffee term decoded in plain, simple English. Click the speaker icon to hear native American pronunciation, learn what it means, and see how to use it when ordering!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COFFEE_VOCABULARY_DICTIONARY.map((vocab) => (
              <div key={vocab.id} className="bg-slate-900/90 border-2 border-slate-800 hover:border-emerald-500/40 rounded-3xl p-5 shadow-xl space-y-3 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl p-2 rounded-2xl bg-slate-950 border border-slate-800">{vocab.emoji}</span>
                    <div>
                      <h3 className="text-lg font-black text-white">{vocab.term}</h3>
                      <span className="text-xs font-mono text-emerald-400">/{vocab.pronunciation}/</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      sound.speakEnglish(`${vocab.term}. ${vocab.meaning}`);
                    }}
                    className="p-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
                    title="Pronounce and explain"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">Plain Meaning:</span>
                  <p className="text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {vocab.meaning}
                  </p>
                </div>

                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/20 text-xs space-y-1">
                  <span className="font-bold text-emerald-300">How to use in conversation:</span>
                  <p className="text-slate-300 italic font-medium">"{vocab.exampleSentence}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🌟 BEST VS WORST COMBINATIONS GUIDE */}
      {activeShopMode === 'best_worst_combos' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              Barista Secrets: Best Drink Combinations vs Worst Mistakes! 🌟❌
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Wondering what actually tastes delicious and what combinations you should NEVER order? Here is the official barista guide!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 🌟 5 BEST BARISTA COMBINATIONS */}
            <div className="bg-slate-900/90 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-black text-emerald-400 flex items-center gap-2">
                  <span>🏆</span> 5 BEST Drink Combinations to Order
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Barista Approved</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-white text-sm">1. The TikTok Iced White Mocha</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Liquid Dessert</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-emerald-400">Order: </span>
                    "Grande Iced White Chocolate Mocha with Oat Milk, Vanilla Sweet Cold Foam on top, and extra caramel drizzle."
                  </p>
                  <p className="text-[11px] text-slate-400 italic">Why it's amazing: Sweet white chocolate and bold espresso layered under thick vanilla cold foam with buttery caramel.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-white text-sm">2. The Cozy Creamy Hot Cocoa</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">Ultimate Warmth</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-emerald-400">Order: </span>
                    "Grande Signature Hot Chocolate with Oat Milk and 2 pumps of Hazelnut syrup."
                  </p>
                  <p className="text-[11px] text-slate-400 italic">Why it's amazing: Oat milk makes hot chocolate 2x creamier without being heavy, and hazelnut gives it a Nutella taste!</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-white text-sm">3. The Dirty Spiced Chai</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Warm & Energizing</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-emerald-400">Order: </span>
                    "Grande Iced Chai Tea Latte with Oat Milk and 1 added shot of Blonde Espresso."
                  </p>
                  <p className="text-[11px] text-slate-400 italic">Why it's amazing: Adding 1 espresso shot to spiced chai cuts the sweetness and gives smooth, long-lasting energy.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-white text-sm">4. Iced Brown Sugar Shaken Espresso</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Low Calorie (120 kcal)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-emerald-400">Order: </span>
                    "Grande Iced Brown Sugar Oatmilk Shaken Espresso with Blonde Roast."
                  </p>
                  <p className="text-[11px] text-slate-400 italic">Why it's amazing: Shaking the espresso with ice and cinnamon creates natural velvety froth with only 120 calories!</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-white text-sm">5. The Pink Drink with Cold Foam</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">Sunny Refreshment</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-emerald-400">Order: </span>
                    "Venti Strawberry Açaí Refresher made with Coconut Milk (Pink Drink) and light ice."
                  </p>
                  <p className="text-[11px] text-slate-400 italic">Why it's amazing: Asking for "light ice" gives you 30% more refreshing strawberry coconut drink!</p>
                </div>
              </div>
            </div>

            {/* ❌ 5 WORST MISTAKES TO AVOID */}
            <div className="bg-slate-900/90 border-2 border-rose-500/40 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-black text-rose-400 flex items-center gap-2">
                  <span>❌</span> 5 WORST Ordering Mistakes to Avoid
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">Common Errors</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-rose-300 text-sm">1. Ordering Cold Foam on a Piping Hot Drink</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">Melts Instantly</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-rose-400">The Problem: </span>
                    Cold foam is cold frothed cream. Putting it on hot coffee immediately melts it into regular warm milk cream.
                  </p>
                  <p className="text-[11px] text-emerald-300">✓ Better: Order cold foam on Iced Cold Brews, Iced Mochas, and Iced Lattes only!</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-rose-300 text-sm">2. Asking for a "Trenta" Hot Latte or Cappuccino</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">Not Allowed</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-rose-400">The Problem: </span>
                    Trenta (31 oz) is only allowed for Cold Brews, Iced Teas, and Refreshers. Starbucks will not serve espresso drinks in Trenta.
                  </p>
                  <p className="text-[11px] text-emerald-300">✓ Better: For large espresso drinks, order a Venti (20oz Hot / 24oz Iced).</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-rose-300 text-sm">3. Asking the Barista to "Warm Up" a Cake Pop</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">Plastic Melts</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-rose-400">The Problem: </span>
                    Cake pops have a hard chocolate shell on a plastic stick. Putting it in the 500°F oven melts the stick into a puddle!
                  </p>
                  <p className="text-[11px] text-emerald-300">✓ Better: Eat cake pops cold straight from the pastry case. Warm up croissants and cookies instead!</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-rose-300 text-sm">4. Pronouncing Espresso as "Expresso" (with an X)</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">Pronunciation</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-rose-400">The Problem: </span>
                    There is no letter "X" in espresso! Saying "expresso" is the #1 mistake coffee beginners make.
                  </p>
                  <p className="text-[11px] text-emerald-300">✓ Better: Pronounce it clearly as <span className="font-mono font-bold">/eh-SPRESS-oh/</span>.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-rose-300 text-sm">5. Adding 8+ Pumps of Syrup in a Small Cup</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">Sugar Overload</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-rose-400">The Problem: </span>
                    8 pumps of syrup takes up half of a Tall (12oz) cup, making the drink overwhelmingly sweet and hiding the coffee flavor.
                  </p>
                  <p className="text-[11px] text-emerald-300">✓ Better: Standard Grande comes with 4 pumps. For subtle sweetness, ask for "2 pumps of syrup".</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BARISTA BUILDER & CASHIER WORKSTATION */}
      {activeShopMode !== 'visual_cups_guide' && activeShopMode !== 'best_worst_combos' && activeShopMode !== 'vocabulary_dictionary' && (
      <div className="space-y-6">
        {/* Quick Presets Bar */}
        <div className="bg-slate-900/95 border-2 border-amber-500/40 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <h3 className="text-sm sm:text-base font-black text-amber-300">
                1-Click Gourmet Drink & Food Presets
              </h3>
            </div>
            <span className="text-xs text-slate-400">Click any preset to auto-configure the complete order & dialogue!</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <button
              onClick={handleLoadSwathiCombo}
              className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-emerald-500/20 border-2 border-amber-400/80 hover:border-amber-300 text-left transition-all active:scale-95 shadow-lg group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-200 group-hover:text-amber-100 flex items-center gap-1">
                  ⭐ Swathi's Signature Combo
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/30 text-amber-200">Gourmet</span>
              </div>
              <p className="text-[11px] text-slate-200 mt-1 font-semibold leading-tight">
                Short Hot Choc + Oat Milk + Blonde Shot + 3 Vanilla + Cold Foam + Warmed Panini
              </p>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                const whiteMocha = coffeeDrinks.find(d => d.id === 'white_chocolate_mocha') || coffeeDrinks[0];
                const croissant = STARBUCKS_FOOD_ITEMS.find(f => f.id === 'butter_croissant') || STARBUCKS_FOOD_ITEMS[0];
                setSelectedDrink(whiteMocha);
                setCupStyle('iced_clear_plastic');
                setCustomSize('Grande');
                setCustomMilk('Oat Milk');
                setHasEspressoShotAddon(false);
                setCustomRoast('Signature Espresso Roast');
                setCustomSyrup('Caramel');
                setSyrupPumps(3);
                setHasExtraColdFoam(true);
                setHasExtraDrizzle(true);
                setSelectedFood(croissant);
                setIncludeFood(true);
                setFoodWarmed(true);
                setDialogueStyleIndex(0);
                onAddXp(25, 'Loaded TikTok Viral Iced White Mocha Preset! 🥤');
              }}
              className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-400 text-left transition-all active:scale-95 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-300">🍨 TikTok Iced White Mocha</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Viral</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-tight">
                Grande Iced White Mocha + Oat Milk + Cold Foam + Caramel Drizzle + Croissant
              </p>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                const shaken = coffeeDrinks.find(d => d.id === 'brown_sugar_oatmilk_shaken') || coffeeDrinks[0];
                const eggBites = STARBUCKS_FOOD_ITEMS.find(f => f.id === 'egg_white_bites') || STARBUCKS_FOOD_ITEMS[0];
                setSelectedDrink(shaken);
                setCupStyle('iced_clear_plastic');
                setCustomSize('Grande');
                setCustomMilk('Oat Milk');
                setHasEspressoShotAddon(false);
                setCustomRoast('Blonde Espresso');
                setCustomSyrup('Brown Sugar');
                setSyrupPumps(4);
                setHasExtraColdFoam(false);
                setHasExtraDrizzle(false);
                setSelectedFood(eggBites);
                setIncludeFood(true);
                setFoodWarmed(true);
                setDialogueStyleIndex(1);
                onAddXp(25, 'Loaded Iced Brown Sugar Shaken Espresso Preset! 🤎');
              }}
              className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-400 text-left transition-all active:scale-95 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-300">🤎 Brown Sugar Shaken Espresso</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">Low Cal</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-tight">
                Grande Shaken Espresso + Blonde Roast + Oat Milk + Egg White Bites
              </p>
            </button>

            <button
              onClick={handleRandomizeCombo}
              className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-pink-400 text-left transition-all active:scale-95 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-pink-300">🎲 Surprise Combo</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300">Random</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-tight">
                Generate dynamic new combinations & spoken variations with 1 click!
              </p>
            </button>
          </div>
        </div>

        {/* 2D Anime Starbucks Barista Counter Guide */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-slate-950">
          <img
            src={`${import.meta.env.BASE_URL}images/anime_starbucks_barista_cafe.jpg`}
            alt="2D Anime Starbucks Barista Cafe"
            className="w-full h-auto object-cover max-h-[440px] mx-auto hover:scale-[1.01] transition-transform duration-300"
          />
          <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md px-4 py-3 rounded-2xl text-xs border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌸☕</span>
              <span className="text-emerald-300 font-extrabold">
                2D Anime Baristas Mei-chan & Haru-kun: Fresh Blonde Espresso • Steamed Oat Milk • Vanilla Sweet Cold Foam • Warm Panini
              </span>
            </div>
            <span className="text-amber-300 font-mono text-[11px] font-bold">100% 2D Anime World</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Cols: Customizer & Condiment Station */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Cup Style Selector */}
            <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <span>1. Choose Cup Type (Paper vs Plastic vs Mug)</span>
                </label>
                <button
                  onClick={handleRandomizeCombo}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-xs shadow flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <span>🎲 Surprise Me (Random Combo)</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'hot_paper_sleeve',
                    title: 'Hot Paper Cup + Sleeve',
                    icon: '☕',
                    desc: 'Insulated paper cup with cardboard heat sleeve and drink stopper.'
                  },
                  {
                    id: 'iced_clear_plastic',
                    title: 'Clear Iced Cup + Straw',
                    icon: '🥤',
                    desc: 'Transparent cup with visible ice cubes, cold foam, and green straw.'
                  },
                  {
                    id: 'ceramic_dinein_mug',
                    title: 'Ceramic Dine-In Mug',
                    icon: '🍵',
                    desc: 'Heavy porcelain cafe mug for enjoying your coffee inside.'
                  }
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      sound.playClick();
                      setCupStyle(style.id as any);
                      if (style.id === 'hot_paper_sleeve') setHasSleeve(true);
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      cupStyle === style.id
                        ? 'bg-emerald-950/60 border-emerald-400 text-white shadow-lg ring-2 ring-emerald-500/20'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl block mb-1.5">{style.icon}</span>
                    <p className="font-extrabold text-xs text-white">{style.title}</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-snug">{style.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Base Drink Picker */}
            <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-amber-300">
                  2. Select Drink from Menu ({coffeeDrinks.length} Options)
                </label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
                {coffeeDrinks.map((drink) => (
                  <button
                    key={drink.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedDrink(drink);
                      setCupStyle(drink.recommendedCup);
                    }}
                    className={`p-3 rounded-2xl text-left border-2 transition-all ${
                      selectedDrink.id === drink.id
                        ? 'bg-pink-950/50 border-pink-400 text-white ring-2 ring-pink-500/20'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <p className="font-black text-xs text-white line-clamp-1">{drink.name}</p>
                    <p className="text-[10px] text-pink-300 font-bold mt-1">${drink.basePrice.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Milk & Size Adjustments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-amber-300">
                  3. Cup Size
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['Short', 'Tall', 'Grande', 'Venti'].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        sound.playClick();
                        setCustomSize(s);
                      }}
                      className={`py-2.5 rounded-xl font-black text-xs border transition-all ${
                        customSize === s
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-amber-300">
                  4. Milk Alternative
                </label>
                <select
                  value={customMilk}
                  onChange={(e) => setCustomMilk(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-100 outline-none focus:border-emerald-400"
                >
                  <option value="Oat Milk">Oat Milk (Barista Blend - Ultra Creamy)</option>
                  <option value="Almond Milk">Almond Milk (Nutty & Light)</option>
                  <option value="Vanilla Soy Milk">Vanilla Soy Milk (Classic)</option>
                  <option value="Coconut Milk">Coconut Milk (Tropical Sweetness)</option>
                  <option value="Whole Milk">Whole Milk (Rich Dairy)</option>
                  <option value="Non-Fat Milk">Non-Fat / Skim Milk</option>
                  <option value="Breve (Half & Half)">Breve / Half & Half (Ultra Rich)</option>
                </select>
              </div>
            </div>

            {/* Custom Shots, Syrups & Cold Foam Add-ons */}
            <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <label className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center justify-between">
                <span>5. Custom Add-ons (Shots, Syrups & Foams)</span>
                <span className="text-[10px] text-emerald-400 font-mono">Custom Modifications</span>
              </label>

              {/* Espresso Shot Roast & Add-on */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">☕ Espresso Roast / Shot:</span>
                    <label className="text-[11px] text-amber-300 flex items-center gap-1 cursor-pointer font-bold">
                      <input
                        type="checkbox"
                        checked={hasEspressoShotAddon}
                        onChange={(e) => setHasEspressoShotAddon(e.target.checked)}
                        className="rounded text-amber-500"
                      />
                      Add Shot (+ $1.00)
                    </label>
                  </div>
                  <select
                    value={customRoast}
                    onChange={(e) => setCustomRoast(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-amber-200 outline-none"
                  >
                    <option value="Blonde Espresso">Blonde Espresso (Smooth, Sweet, Citrus & High Caffeine)</option>
                    <option value="Signature Espresso Roast">Signature Dark Roast (Bold & Caramelly)</option>
                    <option value="Decaf Espresso">Decaf Espresso (99.9% Caffeine Free)</option>
                    <option value="Ristretto Shots">Ristretto (Short pull - Sweeter & Concentrated)</option>
                  </select>
                </div>

                {/* Syrups & Pumps */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">🍯 Flavor Syrup & Pumps:</span>
                    <span className="text-xs font-mono font-bold text-amber-300">{syrupPumps} Pumps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={customSyrup}
                      onChange={(e) => setCustomSyrup(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-amber-200 outline-none"
                    >
                      <option value="Vanilla">Vanilla Syrup</option>
                      <option value="Caramel">Caramel Syrup</option>
                      <option value="Hazelnut">Hazelnut Syrup</option>
                      <option value="Brown Sugar">Brown Sugar Syrup</option>
                      <option value="Toffee Nut">Toffee Nut Syrup</option>
                      <option value="Peppermint">Peppermint Syrup</option>
                      <option value="Mocha Sauce">Bittersweet Mocha Sauce</option>
                    </select>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSyrupPumps(Math.max(0, syrupPumps - 1))}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-white font-black text-xs hover:bg-slate-700"
                      >
                        -
                      </button>
                      <button
                        onClick={() => setSyrupPumps(Math.min(8, syrupPumps + 1))}
                        className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs hover:bg-emerald-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cold Foam & Drizzle Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <label className={`p-3 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  hasExtraColdFoam ? 'bg-emerald-950/50 border-emerald-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hasExtraColdFoam}
                      onChange={(e) => setHasExtraColdFoam(e.target.checked)}
                      className="rounded text-emerald-500"
                    />
                    <span className="text-xs font-bold">☁️ Vanilla Sweet Cold Foam (+ $1.25)</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300">Velvety Cloud</span>
                </label>

                <label className={`p-3 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  hasExtraDrizzle ? 'bg-amber-950/50 border-amber-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hasExtraDrizzle}
                      onChange={(e) => setHasExtraDrizzle(e.target.checked)}
                      className="rounded text-amber-500"
                    />
                    <span className="text-xs font-bold">🍯 Caramel Drizzle (Crosshatch)</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300">Sweet Swirl</span>
                </label>
              </div>
            </div>

            {/* 5. Condiment Bar Station: Sugar Packets, Straws, Sleeves */}
            <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <span>6. Condiment Bar Accessories (Sugar Packets & Straws)</span>
                </label>
                <span className="text-[10px] text-slate-400">Self-Service Counter</span>
              </div>

              {/* Sugar Packets */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-300">Pick Sugar / Sweetener Packets:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CONDIMENT_BAR_ITEMS.filter((c) => c.category === 'sugar').map((item) => {
                    const isChecked = selectedSugars.includes(item.name);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleToggleSugar(item.name)}
                        className={`p-2.5 rounded-xl border-2 text-left transition-all flex items-start justify-between gap-2 ${
                          isChecked
                            ? `${item.color} shadow-md`
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <p className="font-extrabold text-xs">{item.name}</p>
                          <p className="text-[10px] opacity-80 mt-0.5">{item.sweetnessDesc}</p>
                        </div>
                        <span className="text-xs font-black">{isChecked ? '✓' : '+'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sleeves & Splash Sticks */}
              <div className="flex flex-wrap gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <input
                    type="checkbox"
                    checked={hasSleeve}
                    onChange={(e) => setHasSleeve(e.target.checked)}
                    className="rounded text-emerald-500 focus:ring-emerald-400"
                  />
                  <span>Add Cardboard Heat Sleeve (Protects fingers)</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <input
                    type="checkbox"
                    checked={hasSplashStick}
                    onChange={(e) => setHasSplashStick(e.target.checked)}
                    className="rounded text-emerald-500 focus:ring-emerald-400"
                  />
                  <span>Add Green Splash Stick Stopper (Stops spills)</span>
                </label>
              </div>
            </div>

            {/* 6. Bakery & Warm Snacks Case */}
            <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-amber-400" />
                  <span>7. Bakery Case & Warm Snacks</span>
                </label>
                <button
                  onClick={() => setIncludeFood(!includeFood)}
                  className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                    includeFood
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {includeFood ? 'Included ✓' : '+ Add Food'}
                </button>
              </div>

              {includeFood && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {STARBUCKS_FOOD_ITEMS.map((food) => (
                      <button
                        key={food.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedFood(food);
                        }}
                        className={`p-2.5 rounded-xl border-2 text-left transition-all ${
                          selectedFood.id === food.id
                            ? 'bg-amber-950/50 border-amber-400 text-white shadow'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <p className="font-bold text-xs truncate">{food.name}</p>
                        <p className="text-[10px] text-amber-300 font-mono mt-0.5">${food.price.toFixed(2)}</p>
                      </button>
                    ))}
                  </div>

                  {selectedFood.warmingSupported && (
                    <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer pt-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <input
                        type="checkbox"
                        checked={foodWarmed}
                        onChange={(e) => setFoodWarmed(e.target.checked)}
                        className="rounded text-amber-500 focus:ring-amber-400"
                      />
                      <span>Warm up in oven ("Yes, please warm it up!") 🔥</span>
                    </label>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Cols: Animated Cartoon Cup, Dynamic Dialogue Phrasings & In-Depth Meaning */}
          <div className="lg:col-span-5 space-y-6">
            {/* Animated Cartoon Cup Box */}
            <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-5 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                  LIVE RECIPE & CUP VISUALIZER
                </span>
                <span className="text-xs font-mono font-black text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Cartoon Cup Graphic Render */}
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-center relative overflow-hidden">
                {/* Cup Graphic */}
                <div className="relative mx-auto w-32 h-44 flex flex-col justify-end">
                  {/* Straw Render */}
                  {cupStyle === 'iced_clear_plastic' && (
                    <div className="absolute top-[-20px] right-6 w-3.5 h-16 bg-emerald-500 rounded-t-full border border-emerald-300 z-20 shadow-md rotate-12" />
                  )}

                  {/* Splash Stick Stopper */}
                  {hasSplashStick && cupStyle === 'hot_paper_sleeve' && (
                    <div className="absolute top-[-10px] left-10 w-2 h-6 bg-emerald-400 rounded-full z-20 shadow" />
                  )}

                  {/* Cup Container */}
                  <div
                    className={`w-full h-full rounded-b-3xl rounded-t-lg border-4 flex flex-col justify-end overflow-hidden shadow-2xl relative ${
                      cupStyle === 'iced_clear_plastic'
                        ? 'bg-sky-900/20 border-cyan-400/80 backdrop-blur-sm'
                        : cupStyle === 'hot_paper_sleeve'
                        ? 'bg-amber-100/90 border-amber-300 text-slate-900'
                        : 'bg-emerald-800/80 border-emerald-400 text-white'
                    }`}
                  >
                    {/* Cardboard Sleeve Render */}
                    {hasSleeve && cupStyle === 'hot_paper_sleeve' && (
                      <div className="absolute inset-x-0 top-14 h-14 bg-amber-900/90 border-y-2 border-amber-700 text-amber-200 text-[9px] font-black uppercase flex items-center justify-center tracking-widest z-10 shadow">
                        HEAT SLEEVE
                      </div>
                    )}

                    {/* Drink Layers */}
                    <div className="w-full flex-1 flex flex-col justify-end">
                      {hasExtraColdFoam && (
                        <div className="h-8 bg-white/95 border-b border-amber-100 flex items-center justify-center text-[9px] font-black text-slate-900">
                          Sweet Cold Foam
                        </div>
                      )}
                      <div className="h-16 bg-amber-800/70 flex items-center justify-center text-[9px] font-bold text-amber-100 px-1 text-center">
                        {(isEspressoBased || hasEspressoShotAddon) ? customRoast : selectedDrink.name} + {customMilk}
                      </div>
                      {syrupPumps > 0 && (
                        <div className="h-6 bg-amber-950 flex items-center justify-center text-[8px] font-mono text-amber-300">
                          {syrupPumps} Pumps {customSyrup}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Drink Name & Sizing */}
                <div className="mt-4 space-y-1">
                  <p className="text-base font-black text-white">{selectedDrink.name}</p>
                  <p className="text-xs text-emerald-400 font-semibold">
                    {customSize} • {customMilk} • {selectedSugars.length > 0 ? selectedSugars.join(', ') : 'No Sugar Added'}
                  </p>
                  {includeFood && (
                    <p className="text-xs text-amber-300 font-medium">
                      + {selectedFood.name} ({foodWarmed ? 'Warmed' : 'Standard'})
                    </p>
                  )}
                </div>
              </div>

              {/* Dynamic Phrasing Switcher Tabs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                    Spoken Phrasing Variation:
                  </span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setDialogueStyleIndex(prev => (prev + 1) % dialoguePhrasings.length);
                    }}
                    className="text-[10px] text-emerald-300 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>🔄 Switch Style</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {dialoguePhrasings.map((d, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.playClick();
                        setDialogueStyleIndex(idx);
                      }}
                      className={`py-1.5 px-2.5 rounded-xl text-[10px] font-black border transition-all ${
                        dialogueStyleIndex % dialoguePhrasings.length === idx
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md ring-2 ring-emerald-400/30'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {d.styleName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exact English Phrasing & Audio */}
              <div className="bg-slate-950 border border-emerald-500/30 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-emerald-400 uppercase">
                    🗣️ {currentDialogue.styleName} ({currentDialogue.badge}):
                  </span>
                  <AudioSpeakButton text={generatedOrderScript} />
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed italic">
                  "{generatedOrderScript}"
                </p>
              </div>

              {/* Speaking Practice Mic */}
              <VoiceSpeechPractice
                targetPhrase={generatedOrderScript}
                phraseMeaning="Practice speaking your complete coffee & bakery order aloud!"
                onSuccess={() => onAddXp(30, 'Spoke complete Starbucks order flawlessly!')}
              />

              {/* 📖 COMPLETE DEEP-DIVE MEANING INSPECTOR */}
              <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-black text-xs">
                  <span>📖</span>
                  <span>Add-on Meaning & Ingredient Breakdown:</span>
                </div>

                <div className="space-y-2 text-[11px] leading-relaxed text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-400 block">☕ What is "Blonde Espresso"?</span>
                    <p>
                      Light-roasted espresso beans roasted for less time. It tastes smoother, sweeter, and less bitter with citrus notes, and contains slightly <strong>more caffeine</strong> than dark roast!
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-pink-300 block">☁️ What is "Vanilla Sweet Cold Foam"?</span>
                    <p>
                      A specialty cold topping made by blending heavy whipping cream, 2% milk, and vanilla syrup in a high-speed frother. It floats like a velvety sweet dessert cloud on top of hot or iced drinks!
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-300 block">🥛 Why choose "Oat Milk"?</span>
                    <p>
                      Starbucks uses Oatly Barista Blend. It is ultra-creamy, naturally sweet, steams into thick microfoam, and is 100% plant-based and lactose-free.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-orange-300 block">🥪 What is "Tomato & Mozzarella Focaccia Warmed Up"?</span>
                    <p>
                      Italian herb focaccia bread layered with fresh mozzarella, roasted red tomatoes, and basil pesto. Saying <em>"warmed up"</em> toasts it in the 500°F Turbochef oven until the mozzarella melts into a gooey cheese pull.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cashier Interactive Practice */}
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <p className="text-xs font-bold text-slate-300">
                  Barista Question #{cashierStepIdx + 1}:
                </p>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-emerald-200 font-bold">
                  ☕ "{activeCashier.baristaPrompt}"
                </div>

                <div className="flex items-center gap-2">
                  {activeCashier.sampleAnswers.map((ans, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        sound.speakEnglish(ans.text);
                        if (cashierStepIdx < STARBUCKS_CASHIER_FLOW.length - 1) {
                          setCashierStepIdx(cashierStepIdx + 1);
                        } else {
                          handleFinishCashier();
                        }
                      }}
                      className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-400 text-[11px] font-bold text-slate-200 transition-all text-left"
                    >
                      "{ans.text}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
