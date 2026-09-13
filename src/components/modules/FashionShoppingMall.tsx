import React, { useState } from 'react';
import { 
  CLOTHING_ITEMS, 
  FABRIC_DICTIONARY, 
  COLOR_SHADES_GUIDE, 
  BRAND_COMPANIES, 
  SHOE_ANATOMY_GUIDE, 
  SHOPPING_STORE_DIALOGUE,
  FabricInfo,
  ColorShadeInfo,
  BrandCompanyInfo
} from '../../data/fashionShoppingData';
import { ClothingItem } from '../../types';
import { 
  ShoppingBag, Sparkles, Volume2, CheckCircle2, 
  Tag, Layers, Palette, ShieldCheck, Heart, 
  RotateCcw, ArrowRight, Mic, Info, Building2, Footprints
} from 'lucide-react';
import { VoiceSpeechPractice } from '../VoiceSpeechPractice';

interface FashionShoppingMallProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const FashionShoppingMall: React.FC<FashionShoppingMallProps> = ({ onAddXp }) => {
  const [activeTab, setActiveTab] = useState<'racks' | 'fabrics' | 'colors' | 'shoes' | 'brands' | 'dialogue'>('racks');
  const [selectedItem, setSelectedItem] = useState<ClothingItem>(CLOTHING_ITEMS[0]);
  const [selectedColor, setSelectedColor] = useState<string>(CLOTHING_ITEMS[0].colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [inFittingRoom, setInFittingRoom] = useState<boolean>(false);
  const [cart, setCart] = useState<{ item: ClothingItem; color: string; size: string }[]>([]);
  const [selectedFabric, setSelectedFabric] = useState<FabricInfo>(FABRIC_DICTIONARY[0]);
  const [selectedBrand, setSelectedBrand] = useState<BrandCompanyInfo>(BRAND_COMPANIES[0]);

  // Dialogue state
  const [dialogueStep, setDialogueStep] = useState<number>(0);
  const [dialogueFeedback, setDialogueFeedback] = useState<string | null>(null);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAddToCart = () => {
    setCart(prev => [...prev, { item: selectedItem, color: selectedColor, size: selectedSize }]);
    onAddXp(25, `Added ${selectedItem.name} (${selectedSize}) to Shopping Cart! 🛍️`);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-zinc-900 to-stone-900 text-white p-6 sm:p-8 border border-zinc-700 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              100% Tomboy & Menswear Streetwear Boutique
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Streetwear, Fabrics & Brand Masterclass 🧥
            </h1>
            <p className="text-zinc-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Step inside the streetwear boutique! Discover heavyweight boxy hoodies, tactical cargos, and skate sneakers. Master fabric science, color theory, famous brands, and everyday shopping English with spoken audio!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-zinc-800/90 border border-zinc-700 px-4 py-2 rounded-2xl flex items-center gap-2 shadow">
              <span className="text-xl">🛍️</span>
              <div>
                <div className="text-[10px] uppercase font-bold text-zinc-400">Shopping Cart</div>
                <div className="text-sm font-black text-amber-400">{cart.length} Streetwear Items</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto no-scrollbar border-t border-zinc-800 pt-4">
          {[
            { id: 'racks', label: '👕 Streetwear Racks', count: `${CLOTHING_ITEMS.length} Items` },
            { id: 'fabrics', label: '🧵 Fabrics & Materials', count: 'Dictionary & Meanings' },
            { id: 'colors', label: '🎨 Colors & Shades', count: 'Styling Rules' },
            { id: 'shoes', label: '👟 Shoe & Sneaker Anatomy', count: 'Parts & Care' },
            { id: 'brands', label: '🏢 Top Brands & Companies', count: 'Nike, Carhartt, Uniqlo' },
            { id: 'dialogue', label: '🗣️ Store Dialogue Lab', count: 'Fitting & Cashier' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80 border border-zinc-700/60'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-slate-950 text-amber-300' : 'bg-zinc-700 text-zinc-300'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* 2D Anime Fashion Studio Artwork Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-zinc-950 mt-4">
          <img
            src="/images/anime_fashion_wardrobe_guide.jpg"
            alt="2D Anime Fashion Boutique & Wardrobe Studio"
            className="w-full h-auto object-cover max-h-[360px] mx-auto hover:scale-[1.01] transition-transform duration-300"
          />
          <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 rounded-xl text-xs border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌸👗</span>
              <span className="text-amber-200 font-extrabold">
                2D Anime Styling Studio: High-End Luxury • Fast-Fashion Trends • Streetwear Grails • Color Wheel & Fabric Science
              </span>
            </div>
            <span className="text-pink-300 font-mono text-[11px] font-bold">100% 2D Anime World</span>
          </div>
        </div>
      </div>

      {/* TAB 1: STREETWEAR RACKS & FITTING ROOM */}
      {activeTab === 'racks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Clothing Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-400" />
                Select a Tomboy Streetwear Piece to Inspect
              </h2>
              <span className="text-xs text-slate-400 font-semibold">Tomboy & Menswear Only</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CLOTHING_ITEMS.map((item) => {
                const isSelected = selectedItem.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setSelectedColor(item.colors[0]);
                      setInFittingRoom(false);
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all relative ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400'
                        : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    {item.discountTag && (
                      <span className="absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                        {item.discountTag}
                      </span>
                    )}

                    <div className="text-3xl mb-2">{item.imageEmoji}</div>
                    <h3 className="font-bold text-sm text-slate-100 line-clamp-1">{item.name}</h3>
                    
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-base font-black text-amber-400">${item.price.toFixed(2)}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">${item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="mt-2 text-[11px] text-slate-400 line-clamp-1">
                      {item.material}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Garment Inspector & Fitting Room */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 uppercase tracking-wider">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">{selectedItem.name}</h3>
                  <div className="text-2xl font-black text-amber-400 mt-0.5">${selectedItem.price.toFixed(2)}</div>
                </div>
                <div className="text-5xl p-3 bg-zinc-800 rounded-2xl shadow-inner border border-zinc-700">
                  {selectedItem.imageEmoji}
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Choose Color / Shade:</span>
                  <span className="text-amber-400 font-black">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.colors.map((c: string) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedColor === c
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Select Size (Men's & Unisex):</span>
                  <span className="text-amber-400 font-black">Size {selectedSize}</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {selectedItem.sizes.map((s: string) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 rounded-xl text-xs font-black border transition-all ${
                        selectedSize === s
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material & Care */}
              <div className="p-3.5 bg-zinc-800/80 rounded-2xl border border-zinc-700 text-xs space-y-1.5">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Fabric & Material Composition:
                </div>
                <p className="text-zinc-300">{selectedItem.material}</p>
                <div className="text-[11px] text-zinc-400 pt-1 border-t border-zinc-700/60">
                  <span className="font-bold text-zinc-300">Care: </span>{selectedItem.careInstructions}
                </div>
              </div>

              {/* How to Ask in Store */}
              <div className="p-3.5 bg-amber-500/10 rounded-2xl border border-amber-500/30 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <span>How to Ask the Associate:</span>
                  <button
                    onClick={() => speakText(selectedItem.howToAskInStore)}
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen
                  </button>
                </div>
                <p className="text-slate-200 font-medium italic">"{selectedItem.howToAskInStore}"</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setInFittingRoom(true);
                    onAddXp(15, 'Tried on outfit in Fitting Room #3! 🪞');
                  }}
                  className="py-3 px-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs border border-zinc-600 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>🪞 Try in Fitting Room</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>

              {/* Fitting Room Simulation View */}
              {inFittingRoom && (
                <div className="p-4 rounded-2xl bg-zinc-950 border-2 border-amber-400 animate-in zoom-in-95 duration-200 text-center space-y-2">
                  <div className="text-4xl">🪞</div>
                  <h4 className="font-black text-white text-sm">Fitting Room Mirror View</h4>
                  <p className="text-xs text-amber-200">
                    You are trying on the <span className="font-bold text-white">{selectedItem.name}</span> in <span className="font-bold text-white">{selectedColor}</span> (Size {selectedSize}).
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    ✓ Perfect relaxed tomboy drape & comfortable fit!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FABRICS & MATERIALS DICTIONARY WITH MEANINGS */}
      {activeTab === 'fabrics' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-amber-400" />
              Comprehensive Fabrics & Textiles Dictionary
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              When buying streetwear and tomboy clothes, knowing the fabric tells you how durable, soft, breathable, and warm the clothing will be. Click any fabric below to learn its definition, characteristics, and wash rules!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Fabric List */}
            <div className="lg:col-span-5 space-y-2">
              {FABRIC_DICTIONARY.map((fab) => {
                const isSelected = selectedFabric.id === fab.id;
                return (
                  <button
                    key={fab.id}
                    onClick={() => setSelectedFabric(fab)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg'
                        : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{fab.emoji}</span>
                      <div>
                        <h4 className="font-black text-sm text-slate-100">{fab.name}</h4>
                        <span className="text-[11px] text-amber-400 font-mono">/{fab.pronunciation}/</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                );
              })}
            </div>

            {/* Fabric Inspector Card */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{selectedFabric.emoji}</span>
                      <div>
                        <h3 className="text-2xl font-black text-white">{selectedFabric.name}</h3>
                        <span className="text-xs text-amber-400 font-mono">Pronunciation: /{selectedFabric.pronunciation}/</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => speakText(`${selectedFabric.name}. ${selectedFabric.definition}`)}
                    className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Hear Explanation</span>
                  </button>
                </div>

                {/* Definition */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plain English Definition & Meaning:</h4>
                  <p className="text-slate-100 text-sm sm:text-base leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    {selectedFabric.definition}
                  </p>
                </div>

                {/* Key Characteristics */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Characteristics:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedFabric.characteristics.map((char, i) => (
                      <div key={i} className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-xs font-semibold text-slate-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{char}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Used For & Wash Guide */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-zinc-800 border border-zinc-700 text-xs space-y-1">
                    <span className="font-bold text-amber-300">Best Used For:</span>
                    <p className="text-slate-300">{selectedFabric.bestUsedFor}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-zinc-800 border border-zinc-700 text-xs space-y-1">
                    <span className="font-bold text-amber-300">How to Wash & Care:</span>
                    <p className="text-slate-300">{selectedFabric.howToWash}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COLORS & SHADES LAB */}
      {activeTab === 'colors' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Palette className="w-6 h-6 text-amber-400" />
              Streetwear Color & Shade Palette Guide
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Tomboy streetwear relies on versatile earth tones, deep neutrals, and muted shades that create timeless outfits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLOR_SHADES_GUIDE.map((col) => (
              <div key={col.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-2xl shadow-md border-2 border-white/20"
                    style={{ backgroundColor: col.hex }}
                  />
                  <div>
                    <h3 className="font-black text-white text-base">{col.name}</h3>
                    <span className="text-[11px] font-mono text-amber-400">{col.hex} • {col.category}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Color Meaning:</span>
                  <p className="text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {col.meaning}
                  </p>
                </div>

                <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700/60 text-xs space-y-1">
                  <span className="font-bold text-amber-300">Styling Rule:</span>
                  <p className="text-slate-300">{col.stylingTip}</p>
                </div>

                <div className="text-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Pairs Best With:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {col.pairsWellWith.map((pair, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px] font-bold">
                        {pair}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SHOE & SNEAKER ANATOMY */}
      {activeTab === 'shoes' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Footprints className="w-6 h-6 text-amber-400" />
              Sneakers, Shoes & Skate Footwear Anatomy
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Understand every part of a sneaker from the toe box to the vulcanized rubber outsole, and how to maintain them like a sneakerhead!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SHOE_ANATOMY_GUIDE.map((shoe) => (
              <div key={shoe.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{shoe.emoji}</span>
                  <div>
                    <h3 className="text-lg font-black text-white">{shoe.name}</h3>
                    <span className="text-xs text-amber-400 font-mono">/{shoe.pronunciation}/</span>
                  </div>
                </div>

                <p className="text-sm text-slate-200 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 leading-relaxed">
                  {shoe.definition}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Parts & Anatomy:</h4>
                  <div className="space-y-2">
                    {shoe.keyParts.map((kp, idx) => (
                      <div key={idx} className="p-3 bg-zinc-800 rounded-xl border border-zinc-700 text-xs">
                        <span className="font-bold text-amber-300">{kp.part}: </span>
                        <span className="text-slate-300">{kp.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  <span className="font-bold text-amber-300">Sneaker Care Guide: </span>
                  {shoe.careGuide}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: TOP BRANDS & COMPANIES HALL */}
      {activeTab === 'brands' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-amber-400" />
              World Famous Streetwear Brands & Companies Guide
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Explore the biggest names in streetwear and tomboy fashion: their history, country of origin, price tier, and exact pronunciation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Brand List */}
            <div className="lg:col-span-4 space-y-2">
              {BRAND_COMPANIES.map((brand) => {
                const isSelected = selectedBrand.id === brand.id;
                return (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg'
                        : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{brand.logoEmoji}</span>
                      <div>
                        <h4 className="font-black text-sm text-slate-100">{brand.name}</h4>
                        <span className="text-[11px] text-slate-400">{brand.country}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">{brand.priceTier}</span>
                  </button>
                );
              })}
            </div>

            {/* Brand Details Card */}
            <div className="lg:col-span-8">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedBrand.logoEmoji}</span>
                    <div>
                      <h3 className="text-2xl font-black text-white">{selectedBrand.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>Founded {selectedBrand.founded} in {selectedBrand.country}</span>
                        <span>•</span>
                        <span className="font-bold text-amber-400">Price Tier: {selectedBrand.priceTier}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => speakText(`${selectedBrand.name}. Pronounced ${selectedBrand.pronunciation}. Famous for ${selectedBrand.famousFor}`)}
                    className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Pronounce</span>
                  </button>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                  <span className="font-bold text-amber-400">How to Pronounce: </span>
                  <span className="font-mono text-white text-sm">/{selectedBrand.pronunciation}/</span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">What the Brand is Famous For:</h4>
                  <p className="text-slate-200 text-sm leading-relaxed bg-zinc-800/80 p-4 rounded-2xl border border-zinc-700/60">
                    {selectedBrand.famousFor}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-800 border border-zinc-700 space-y-1.5 text-xs">
                  <span className="font-bold text-amber-300">Tomboy & Streetwear Vibe:</span>
                  <p className="text-slate-300 leading-relaxed">{selectedBrand.tomboyStreetwearVibe}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Iconic Must-Have Products:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedBrand.keyProducts.map((prod, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{prod}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: STORE DIALOGUE LAB & VOICE PRACTICE */}
      {activeTab === 'dialogue' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Mic className="w-6 h-6 text-amber-400" />
              Interactive Store Associate Dialogue & Voice Practice
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Step through real store situations: asking for sizes, entering fitting rooms, and checking out at the cash register.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase">
                  Scenario {dialogueStep + 1} of {SHOPPING_STORE_DIALOGUE.length}
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  {SHOPPING_STORE_DIALOGUE[dialogueStep].situation}
                </h3>
              </div>
            </div>

            {/* Associate Speech Bubble */}
            <div className="p-5 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-start gap-4">
              <span className="text-3xl p-2 rounded-xl bg-zinc-900">👤</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">Store Associate says:</span>
                  <button
                    onClick={() => speakText(SHOPPING_STORE_DIALOGUE[dialogueStep].associatePrompt)}
                    className="flex items-center gap-1 text-xs text-zinc-300 hover:text-white"
                  >
                    <Volume2 className="w-4 h-4" /> Listen
                  </button>
                </div>
                <p className="text-white text-base font-semibold mt-1">
                  "{SHOPPING_STORE_DIALOGUE[dialogueStep].associatePrompt}"
                </p>
              </div>
            </div>

            {/* Response Options */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Choose your response:</h4>
              <div className="space-y-2.5">
                {SHOPPING_STORE_DIALOGUE[dialogueStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDialogueFeedback(opt.tip);
                      if (opt.isNatural) onAddXp(20, 'Polite store interaction! 🌟');
                    }}
                    className="w-full text-left p-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all text-xs sm:text-sm font-semibold text-slate-200 flex items-start justify-between gap-3 group"
                  >
                    <span>"{opt.text}"</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Alert */}
            {dialogueFeedback && (
              <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-medium flex items-center gap-3">
                <Info className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{dialogueFeedback}</span>
              </div>
            )}

            {/* Voice Speech Practice Component */}
            <div className="pt-4 border-t border-slate-800">
              <VoiceSpeechPractice
                targetPhrase={SHOPPING_STORE_DIALOGUE[dialogueStep].options[0].text}
                phraseMeaning="Speak this phrase out loud into your microphone to practice store English!"
                onSuccess={() => onAddXp(30, 'Spoken English Store Practice Success! 🎤')}
              />
            </div>

            {/* Next Scenario */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setDialogueFeedback(null);
                  setDialogueStep((prev) => (prev + 1) % SHOPPING_STORE_DIALOGUE.length);
                }}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2"
              >
                <span>Next Scenario ➔</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
