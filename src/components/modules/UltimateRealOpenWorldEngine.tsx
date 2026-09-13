import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { VoiceSpeechPractice } from '../VoiceSpeechPractice';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Volume2,
  Mic,
  Plane,
  Coffee,
  Sun,
  Moon,
  Car,
  Navigation,
  Key,
  Flame,
  Radio,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Shield,
  Sunset,
  Bed,
  PhoneCall,
  Smartphone,
  Music,
  CreditCard,
  Luggage,
  Award,
  Maximize2,
  Minimize2,
  MessageSquare,
  VolumeX,
  Camera,
  Star,
  DollarSign,
  Compass,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Send,
  UserCheck,
  Building2,
  Trees
} from 'lucide-react';

interface UltimateRealOpenWorldEngineProps {
  onAddXp: (amount: number, reason: string) => void;
  onNavigateTab?: (tabName: string) => void;
}

type TimeOfDay = 'day' | 'sunset' | 'night' | 'neon';
type VehicleModel = 'sports_sedan' | 'luxury_suv' | 'police_cruiser' | 'taxi_cab';
type WeaponItem = 'unarmed' | 'phone' | 'coffee' | 'card' | 'keycard' | 'boarding_pass';

interface TelltaleChoice {
  text: string;
  response: string;
  memoryTag: string;
  xp: number;
  cash: number;
  respect: number;
}

interface TelltaleNPCData {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  gtaTitle: string;
  greeting: string;
  choices: TelltaleChoice[];
}

// Procedural GTA Audio Synthesizer (V8 Engine, Horn, Sirens, Fanfare)
class GTAAudioEngine {
  private ctx: AudioContext | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playHorn() {
    this.init();
    if (!this.ctx) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc2.frequency.setValueAtTime(370, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 0.6);
    osc2.stop(this.ctx.currentTime + 0.6);
  }

  playPoliceSiren() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.linearRampToValueAtTime(950, now + 0.3);
    osc.frequency.linearRampToValueAtTime(650, now + 0.6);
    osc.frequency.linearRampToValueAtTime(950, now + 0.9);
    osc.frequency.linearRampToValueAtTime(650, now + 1.2);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 1.3);
  }

  playMissionPassed() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      gain.gain.setValueAtTime(0.3, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 1.2);
    });
  }

  startEngineSound() {
    this.init();
    if (!this.ctx || this.engineOsc) return;
    try {
      this.engineOsc = this.ctx.createOscillator();
      this.engineGain = this.ctx.createGain();
      this.engineOsc.type = 'sawtooth';
      this.engineOsc.frequency.setValueAtTime(55, this.ctx.currentTime);
      this.engineGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      this.engineOsc.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);
      this.engineOsc.start();
    } catch {}
  }

  updateEnginePitch(speedRatio: number) {
    if (this.ctx && this.engineOsc) {
      const targetFreq = 55 + speedRatio * 180;
      this.engineOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.05);
    }
  }

  stopEngineSound() {
    if (this.engineOsc) {
      try {
        this.engineOsc.stop();
        this.engineOsc.disconnect();
      } catch {}
      this.engineOsc = null;
    }
  }
}

const gtaAudio = new GTAAudioEngine();

// Procedural Photorealistic Canvas Textures
function createLuxuryWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#3e2312';
  ctx.fillRect(0, 0, 512, 512);

  for (let y = 0; y < 512; y += 48) {
    ctx.fillStyle = (y / 48) % 2 === 0 ? '#4a2c17' : '#381f0e';
    ctx.fillRect(0, y, 512, 46);
    ctx.strokeStyle = 'rgba(0,0,0,0.18)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, y + i * 8);
      ctx.bezierCurveTo(150, y + i * 8 + 4, 350, y + i * 8 - 4, 512, y + i * 8 + 2);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  return tex;
}

function createPolishedGraniteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  for (let v = 0; v < 8; v++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 512, 0);
    ctx.bezierCurveTo(Math.random() * 512, 200, Math.random() * 512, 350, Math.random() * 512, 512);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  return tex;
}

function createBuildingFacadeTexture(windowGlowColor: string = '#fef08a'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 512);

  // Modern Office Windows Grid
  for (let y = 16; y < 512; y += 36) {
    for (let x = 16; x < 512; x += 32) {
      const isLit = Math.random() > 0.35;
      ctx.fillStyle = isLit ? windowGlowColor : '#1e293b';
      ctx.fillRect(x, y, 22, 24);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, 22, 24);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 8);
  return tex;
}

function createStarbucksMenuScreenTexture(category: 'espresso' | 'hot_choc' | 'paninis'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 512);
  bgGrad.addColorStop(0, '#064e3b');
  bgGrad.addColorStop(1, '#022c22');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 1010, 498);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Inter, sans-serif';
  ctx.fillText(
    category === 'espresso' ? '☕ BEAN MACHINE / STARBUCKS RESERVE' :
    category === 'hot_choc' ? '🍫 HOT CHOCOLATES, OAT MILK & COLD FOAM' :
    '🥪 ARTISAN BAKERY & TOASTED PANINIS',
    40, 60
  );

  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('HOT & ICED • SHORT (8oz) / TALL (12oz) / GRANDE (16oz) / VENTI (20oz)', 40, 95);

  ctx.font = 'bold 28px Inter, sans-serif';
  const items = category === 'espresso' ? [
    { name: 'Caffè Latte', price: '$4.95', sub: 'Espresso with rich steamed milk and light microfoam' },
    { name: 'Caramel Macchiato', price: '$5.45', sub: 'Steamed vanilla milk marked with espresso and caramel drizzle' },
    { name: 'Blonde Vanilla Latte', price: '$5.25', sub: 'Smooth blonde espresso roast with oat milk & vanilla' },
    { name: 'Caffè Mocha', price: '$5.35', sub: 'Bittersweet cocoa, espresso, steamed milk, and whipped cream' },
  ] : category === 'hot_choc' ? [
    { name: 'Signature Hot Chocolate', price: '$4.85', sub: 'Swathi\'s Pick ⭐ Oat Milk + Blonde Shot + 3x Vanilla + Cold Foam' },
    { name: 'White Hot Chocolate', price: '$4.95', sub: 'Rich buttery white chocolate sauce blended with steamed milk' },
    { name: 'Vanilla Sweet Cold Foam (Add-on)', price: '+$1.25', sub: 'Velvety cold cream cloud sitting on top for contrast' },
    { name: 'Blonde Espresso Shot (Add-on)', price: '+$1.00', sub: 'Cuts chocolate sweetness with nutty crema aroma' },
  ] : [
    { name: 'Tomato & Mozzarella Focaccia Panini', price: '$6.45', sub: 'Fresh mozzarella, roasted tomatoes, basil pesto (Warmed 🔥)' },
    { name: 'Bacon, Gouda & Egg Sandwich', price: '$5.95', sub: 'Applewood smoked bacon & aged Gouda on artisan roll' },
    { name: 'All-Butter French Croissant', price: '$3.85', sub: 'Flaky golden layered pastry toasted in TurboChef' },
    { name: 'Oat Milk Substitution (Oatly)', price: '+$0.70', sub: 'Creamy plant-based milk for silky microfoam' },
  ];

  items.forEach((it, idx) => {
    const y = 165 + idx * 80;
    ctx.fillStyle = idx === 0 ? '#fde047' : '#ffffff';
    ctx.fillText(it.name, 40, y);
    ctx.fillStyle = '#34d399';
    ctx.fillText(it.price, 850, y);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '18px sans-serif';
    ctx.fillText(it.sub, 40, y + 26);
    ctx.font = 'bold 28px Inter, sans-serif';
  });

  return new THREE.CanvasTexture(canvas);
}

function createAirportFidsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, 1024, 512);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 1016, 504);

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 36px monospace';
  ctx.fillText('✈️ LOS SANTOS INTL AIRPORT (LSIA DEPARTURES)', 40, 55);

  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('FLIGHT   DESTINATION            TIME   GATE   STATUS', 40, 100);
  ctx.fillRect(40, 115, 944, 2);

  const flights = [
    { f: 'SQ 529', d: 'Singapore Changi (SIN)', t: '14:45', g: 'B12', s: 'BOARDING NOW', c: '#22c55e' },
    { f: '6E 712', d: 'New Delhi (DEL)', t: '15:10', g: '03', s: 'ON TIME', c: '#38bdf8' },
    { f: 'EK 501', d: 'Dubai Intl (DXB)', t: '15:40', g: 'A08', s: 'SECURITY OPEN', c: '#facc15' },
    { f: 'AI 404', d: 'Visakhapatnam (VTZ)', t: '16:15', g: 'C02', s: 'GATE OPEN', c: '#38bdf8' },
    { f: 'BA 118', d: 'London Heathrow (LHR)', t: '17:00', g: 'B04', s: 'ON TIME', c: '#38bdf8' },
  ];

  flights.forEach((fl, idx) => {
    const y = 160 + idx * 65;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px monospace';
    ctx.fillText(`${fl.f.padEnd(8)} ${fl.d.padEnd(22)} ${fl.t.padEnd(6)} ${fl.g.padEnd(6)}`, 40, y);
    ctx.fillStyle = fl.c;
    ctx.fillText(fl.s, 720, y);
  });

  return new THREE.CanvasTexture(canvas);
}

// 3D Palm Tree Builder for GTA Vinewood Blvd
function createPalmTreeModel(): THREE.Group {
  const palm = new THREE.Group();
  
  // Trunk
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3d2e, roughness: 0.8 });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.4, 9, 8), trunkMat);
  trunk.position.y = 4.5;
  trunk.rotation.z = (Math.random() - 0.5) * 0.12;
  palm.add(trunk);

  // Palm Fronds
  const frondMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6, side: THREE.DoubleSide });
  for (let i = 0; i < 9; i++) {
    const angle = (i / 9) * Math.PI * 2;
    const frond = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 5.2), frondMat);
    frond.position.set(0, 9, 0);
    frond.rotation.y = angle;
    frond.rotation.x = Math.PI / 3;
    palm.add(frond);
  }

  return palm;
}

// 3D GTA Character Model Builder
function createHumanoidModel(uniformColor: number, skinColor: number = 0xffedd5, hairColor: number = 0x3b1d11): THREE.Group {
  const group = new THREE.Group();

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.48, 16, 16), new THREE.MeshStandardMaterial({ color: skinColor }));
  head.position.y = 2.05;
  head.castShadow = true;
  group.add(head);

  // Hair
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.52, 16, 16), new THREE.MeshStandardMaterial({ color: hairColor }));
  hair.position.set(0, 2.15, -0.06);
  group.add(hair);

  // Torso / Jacket
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.46, 1.1, 16), new THREE.MeshStandardMaterial({ color: uniformColor, roughness: 0.3 }));
  torso.position.y = 1.25;
  torso.castShadow = true;
  group.add(torso);

  // Legs
  const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
  const lLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.8, 8), legMat);
  lLeg.position.set(-0.2, 0.4, 0);
  group.add(lLeg);

  const rLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.8, 8), legMat);
  rLeg.position.set(0.2, 0.4, 0);
  group.add(rLeg);

  return group;
}

export const UltimateRealOpenWorldEngine: React.FC<UltimateRealOpenWorldEngineProps> = ({ onAddXp }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Fullscreen GTA Immersion Mode
  const [isFullscreenGTA, setIsFullscreenGTA] = useState<boolean>(false);

  // GTA 5 Player Stats & Progression
  const [playerName] = useState<string>('Swathi');
  const [cashBalance, setCashBalance] = useState<number>(2854920);
  const [cashDelta, setCashDelta] = useState<{ amount: number; type: '+' | '-' } | null>(null);
  const [healthPercent] = useState<number>(100);
  const [armorPercent] = useState<number>(100);
  const [specialAbilityPercent] = useState<number>(85);
  const [wantedStars, setWantedStars] = useState<number>(0);
  const [activeWeaponItem] = useState<WeaponItem>('unarmed');

  // GTA Radio Stations
  const radioStations = [
    { name: 'Los Santos Rock Radio', genre: 'Classic Rock', icon: '🎸' },
    { name: 'Non-Stop Pop 100.7 FM', genre: 'Dance & Pop', icon: '🎧' },
    { name: 'West Coast Classics', genre: 'Golden Era Rap', icon: '🎵' },
    { name: 'Radio Mirror Park', genre: 'Synthwave & Indie', icon: '🌆' },
    { name: 'Space 103.2 FM', genre: 'Funk & Soul', icon: '🕺' },
    { name: 'Radio OFF', genre: 'Mute', icon: '🔇' }
  ];
  const [currentRadioIndex, setCurrentRadioIndex] = useState<number>(1);
  const [showRadioHUD, setShowRadioHUD] = useState<boolean>(false);

  // GTA 5 iFruit Smartphone State
  const [showIFruitPhone, setShowIFruitPhone] = useState<boolean>(false);
  const [phoneScreen, setPhoneScreen] = useState<'home' | 'contacts' | 'bank' | 'gps'>('home');

  // GTA 5 Mission Passed Banner State
  const [missionPassedData, setMissionPassedData] = useState<{ title: string; subtitle: string; xp: number; cash: number } | null>(null);

  // Vehicle & World State
  const [isDriving, setIsDriving] = useState<boolean>(false);
  const [carSpeedKmH, setCarSpeedKmH] = useState<number>(0);
  const [currentLocationName, setCurrentLocationName] = useState<string>('Vinewood Blvd & Maze Bank Plaza');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [activeVehicle, setActiveVehicle] = useState<VehicleModel>('sports_sedan');

  // Telltale / GTA Cinematic Dialogue System
  const [nearbyNpc, setNearbyNpc] = useState<TelltaleNPCData | null>(null);
  const [activeTelltaleDialogue, setActiveTelltaleDialogue] = useState<TelltaleNPCData | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<TelltaleChoice | null>(null);
  const [telltaleNotification, setTelltaleNotification] = useState<string | null>(null);

  // Virtual Analog Touch Joystick
  const [leftStickPos, setLeftStickPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const leftStickVector = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const leftStickActive = useRef<boolean>(false);

  const [rightStickPos, setRightStickPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const rightStickActive = useRef<boolean>(false);
  const cameraAngleYaw = useRef<number>(0);

  // Telltale NPC Dataset with GTA-Flavored English Dialogue
  const telltaleNPCs: TelltaleNPCData[] = [
    {
      id: 'barista_hana',
      name: 'Barista Hana',
      role: 'Starbucks Master Barista ☕',
      gtaTitle: 'BEAN MACHINE RESERVE',
      location: 'Starbucks Reserve Counter',
      avatar: '👩‍🍳',
      greeting: "Hey Swathi! Welcome to Bean Machine Reserve. What handcrafted gourmet order can I brew for you today?",
      choices: [
        {
          text: "☕ Short Signature Hot Chocolate with Oat Milk, Blonde Espresso Shot & Cold Foam, plus a warmed Tomato Panini!",
          response: "Top-tier custom recipe! Steaming the Oatly milk right now and pulling a blonde ristretto shot for that rich golden crema.",
          memoryTag: "Hana marked you as a VIP Gourmet Connoisseur.",
          xp: 100,
          cash: 500,
          respect: 25
        },
        {
          text: "🥪 What's the freshest warm bakery item in the glass showcase?",
          response: "The Tomato & Fresh Mozzarella Focaccia toasted in the TurboChef oven! Golden crispy crust with basil pesto.",
          memoryTag: "Hana shared the secret bakery special.",
          xp: 75,
          cash: 300,
          respect: 20
        },
        {
          text: "💳 Can I tap with Apple Pay and scan my Starbucks Gold Card for 25 Stars?",
          response: "Contactless payment approved with a beep! You just unlocked Gold Tier status.",
          memoryTag: "You collected 25 Starbucks Loyalty Stars.",
          xp: 60,
          cash: 250,
          respect: 15
        },
        {
          text: "🥛 Do you have dairy-free Oatly Barista plant milk in stock?",
          response: "Always in stock! Oatly Barista gives the smoothest microfoam texture for latte art.",
          memoryTag: "Hana noted your preference for plant-based milks.",
          xp: 70,
          cash: 350,
          respect: 20
        }
      ]
    },
    {
      id: 'security_vikram',
      name: 'Officer Vikram',
      role: 'LSIA Airport Security Chief 👮‍♂️',
      gtaTitle: 'LSIA TSA SECURITY CHECKPOINT',
      location: 'Airport Security Metal Detector',
      avatar: '👮‍♂️',
      greeting: "Good afternoon, Ma'am. Please place your electronics, liquids, and metallic items in the scanner tray before stepping through the detector.",
      choices: [
        {
          text: "🛡️ Here is my laptop and liquids in the tray. May I step through the metal detector arch?",
          response: "BEEP (Detector Green Light). Perfect! Your baggage scan is 100% clear. Have a first-class flight!",
          memoryTag: "Officer Vikram stamped your boarding pass with Express Clearance.",
          xp: 120,
          cash: 600,
          respect: 35
        },
        {
          text: "⌚ Do I need to take off my Apple Watch and lightweight blazer jacket?",
          response: "Yes please, place them in the small side basket for a swift and seamless screening.",
          memoryTag: "Officer Vikram appreciated your proactive airport compliance.",
          xp: 80,
          cash: 400,
          respect: 25
        },
        {
          text: "🎫 Here is my Singapore Airlines SQ 529 Boarding Pass and biometric passport.",
          response: "Documents fully verified. Gate B12 is open for Boeing 787 boarding right through the duty-free wing.",
          memoryTag: "Officer Vikram granted VIP Fast-Track access.",
          xp: 90,
          cash: 450,
          respect: 30
        },
        {
          text: "💧 What are the international liquid volume limits for carry-on luggage?",
          response: "Liquids must be in containers of 100ml or less, placed inside one transparent resealable plastic bag.",
          memoryTag: "You learned official IATA international airport regulations.",
          xp: 85,
          cash: 350,
          respect: 20
        }
      ]
    },
    {
      id: 'officer_david',
      name: 'Officer David',
      role: 'Immigration & Border Control 🛂',
      gtaTitle: 'INTERNATIONAL IMMIGRATION DESK',
      location: 'Passport Border Control',
      avatar: '🛂',
      greeting: "Passport and electronic Arrival Card confirmation please. What is the primary purpose and duration of your stay?",
      choices: [
        {
          text: "🛂 Good afternoon Officer. I am visiting for a 5-day holiday and cultural tour, staying at Marina Bay Sands.",
          response: "Biometrics and hotel voucher verified. *THUMP* (Passport Stamped). Welcome to Singapore, Miss Swathi!",
          memoryTag: "Officer David granted a 30-Day Tourism Visa.",
          xp: 150,
          cash: 800,
          respect: 50
        },
        {
          text: "📋 I completed the SG Digital Arrival Card online. Here is the confirmation QR code.",
          response: "Digital arrival record retrieved instantaneously. Smooth and efficient documentation.",
          memoryTag: "Officer David commended your prompt digital registration.",
          xp: 110,
          cash: 500,
          respect: 30
        },
        {
          text: "🏨 Here is my return flight confirmation ticket to Visakhapatnam and hotel booking voucher.",
          response: "Itinerary confirmed. Proceed through the Jewel Rain Vortex concourse.",
          memoryTag: "You proved full onward travel compliance.",
          xp: 95,
          cash: 400,
          respect: 25
        },
        {
          text: "🛍️ Where is the baggage reclaim belt for Singapore Airlines flight SQ 529?",
          response: "Baggage carousel 04 is directly behind the customs declaration green lane.",
          memoryTag: "Officer David directed you to carousel 04.",
          xp: 90,
          cash: 350,
          respect: 20
        }
      ]
    },
    {
      id: 'concierge_marcus',
      name: 'Concierge Marcus',
      role: 'Grand Marina 5-Star Head Concierge 🤵',
      gtaTitle: 'THE GRAND MARINA LUXURY HOTEL',
      location: 'Grand Marina Hotel Lobby',
      avatar: '🤵',
      greeting: "Welcome to The Grand Marina Hotel, Miss Swathi. How may our concierge team assist your stay today?",
      choices: [
        {
          text: "🗝️ Checking in for the Penthouse Suite #808 reservation under Swathi. May I have the RFID keycard?",
          response: "An absolute pleasure! Your Penthouse Suite #808 is prepared with complimentary champagne and city skyline views.",
          memoryTag: "Marcus upgraded your suite with complimentary VIP room service.",
          xp: 140,
          cash: 700,
          respect: 45
        },
        {
          text: "📞 Could I request room service breakfast at 8:00 AM with fresh avocado toast and iced matcha?",
          response: "Duly noted and scheduled with our executive culinary chef. Dial 0 on your suite's rotary telephone for any requests.",
          memoryTag: "Marcus scheduled your luxury breakfast order.",
          xp: 100,
          cash: 450,
          respect: 30
        },
        {
          text: "🚗 Is valet parking available for my sports sedan at the hotel entrance?",
          response: "Our valet team will securely park and wash your vehicle in the underground garage.",
          memoryTag: "Marcus arranged private valet parking.",
          xp: 85,
          cash: 350,
          respect: 25
        },
        {
          text: "🏊 What are the operating hours for the 50th-floor rooftop infinity pool and fitness spa?",
          response: "The infinity pool and wellness spa are open 24/7 exclusively for Penthouse suite guests.",
          memoryTag: "You unlocked 24/7 rooftop spa access.",
          xp: 90,
          cash: 400,
          respect: 25
        }
      ]
    }
  ];

  // Engine Physics & Coordinates
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const playerState = useRef({
    x: 0,
    y: 0,
    z: 0,
    rotY: 0,
    vy: 0,
    isGrounded: true,
    speed: 0.24
  });

  const carState = useRef({
    x: 18,
    y: 0,
    z: 10,
    rotY: 0,
    speed: 0,
    maxSpeed: 0.95,
    accel: 0.03,
    friction: 0.965
  });

  // Award GTA Cash and trigger animated HUD popup
  const awardCash = (amount: number) => {
    setCashBalance(prev => prev + amount);
    setCashDelta({ amount, type: '+' });
    setTimeout(() => setCashDelta(null), 3000);
  };

  // Trigger GTA 5 Style "MISSION PASSED" Banner
  const triggerMissionPassed = (title: string, subtitle: string, xp: number, cash: number) => {
    gtaAudio.playMissionPassed();
    sound.playSuccess();
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
    setMissionPassedData({ title, subtitle, xp, cash });
    awardCash(cash);
    onAddXp(xp, `GTA Mission Passed: ${title} (+${xp} XP, +$${cash}) 🏆`);
    setTimeout(() => {
      setMissionPassedData(null);
    }, 5500);
  };

  // Three.js 3D Open World Engine Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    
    const skyColors: Record<TimeOfDay, number> = {
      day: 0x38bdf8,
      sunset: 0xf97316,
      night: 0x020617,
      neon: 0x0f172a
    };
    scene.background = new THREE.Color(skyColors[timeOfDay]);
    scene.fog = new THREE.FogExp2(skyColors[timeOfDay], timeOfDay === 'day' ? 0.003 : 0.006);

    const camera = new THREE.PerspectiveCamera(62, container.clientWidth / container.clientHeight, 0.1, 1200);
    camera.position.set(0, 5, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = timeOfDay === 'night' ? 0.9 : timeOfDay === 'sunset' ? 1.15 : 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Realistic Lighting Setup
    const ambientColor = timeOfDay === 'sunset' ? 0xfde047 : timeOfDay === 'night' ? 0x1e293b : 0xfffaed;
    const ambient = new THREE.AmbientLight(ambientColor, timeOfDay === 'night' ? 0.45 : 1.1);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(timeOfDay === 'sunset' ? 0xf97316 : 0xfff3d6, timeOfDay === 'night' ? 0.25 : 2.2);
    sun.position.set(timeOfDay === 'sunset' ? 60 : 40, timeOfDay === 'sunset' ? 20 : 70, 40);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    scene.add(sun);

    // 3. World Group Architecture
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Ground Pavement (Polished Granite/Marble)
    const groundMat = new THREE.MeshStandardMaterial({
      map: createPolishedGraniteTexture(),
      roughness: 0.25,
      metalness: 0.15
    });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    worldGroup.add(ground);

    // 4-Lane Asphalt Highway
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.25 });
    const road = new THREE.Mesh(new THREE.PlaneGeometry(26, 420), roadMat);
    road.position.set(18, 0.02, 0);
    road.rotation.x = -Math.PI / 2;
    worldGroup.add(road);

    // Road Yellow Double Center Lines
    for (let y = -200; y <= 200; y += 12) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 6), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
      line.position.set(18, 0.03, y);
      line.rotation.x = -Math.PI / 2;
      worldGroup.add(line);
    }

    // Sidewalk Curbs along the Boulevard
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
    const curbLeft = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.4, 420), curbMat);
    curbLeft.position.set(4, 0.2, 0);
    worldGroup.add(curbLeft);

    const curbRight = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.4, 420), curbMat);
    curbRight.position.set(32, 0.2, 0);
    worldGroup.add(curbRight);

    // Palm Trees Lining the Boulevard
    for (let z = -180; z <= 180; z += 30) {
      const palm1 = createPalmTreeModel();
      palm1.position.set(33.5, 0, z);
      worldGroup.add(palm1);

      const palm2 = createPalmTreeModel();
      palm2.position.set(2.5, 0, z + 15);
      worldGroup.add(palm2);
    }

    // Streetlamps with glowing lanterns & pointlights
    for (let z = -160; z <= 160; z += 35) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 7, 8), new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 }));
      pole.position.set(32, 3.5, z);
      worldGroup.add(pole);

      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
      lamp.position.set(31.2, 7.2, z);
      worldGroup.add(lamp);

      const sl = new THREE.PointLight(0xfef08a, timeOfDay === 'night' || timeOfDay === 'neon' ? 2.5 : 1.2, 25);
      sl.position.set(31.2, 7.0, z);
      worldGroup.add(sl);
    }

    // 🏙️ GTA 5 MAZE BANK TOWER & DOWNTOWN SKYSCRAPERS
    const facadeTex = createBuildingFacadeTexture(timeOfDay === 'night' ? '#fde047' : '#93c5fd');

    // 1. Maze Bank Tower (Center-East Icon)
    const mazeBankTower = new THREE.Mesh(
      new THREE.CylinderGeometry(16, 18, 90, 32),
      new THREE.MeshStandardMaterial({ map: facadeTex, metalness: 0.85, roughness: 0.15 })
    );
    mazeBankTower.position.set(80, 45, -40);
    worldGroup.add(mazeBankTower);

    // Maze Bank Helipad & Red FAA Beacon
    const helipad = new THREE.Mesh(
      new THREE.CylinderGeometry(16.5, 16.5, 1.5, 32),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9 })
    );
    helipad.position.set(80, 90.5, -40);
    worldGroup.add(helipad);

    const faaBeacon = new THREE.PointLight(0xef4444, 4, 60);
    faaBeacon.position.set(80, 93, -40);
    worldGroup.add(faaBeacon);

    // 2. Vinewood Plaza Tower 1
    const tower1 = new THREE.Mesh(
      new THREE.BoxGeometry(26, 65, 26),
      new THREE.MeshStandardMaterial({ map: facadeTex, metalness: 0.8, roughness: 0.2 })
    );
    tower1.position.set(75, 32.5, 45);
    worldGroup.add(tower1);

    // 3. Vinewood Plaza Tower 2
    const tower2 = new THREE.Mesh(
      new THREE.BoxGeometry(32, 50, 22),
      new THREE.MeshStandardMaterial({ map: facadeTex, metalness: 0.8, roughness: 0.2 })
    );
    tower2.position.set(-85, 25, 60);
    worldGroup.add(tower2);

    // --- GTA-STYLE GLOWING IN-WORLD MISSION BEACONS ---
    // 🟢 Green Beacon (Starbucks / Bean Machine)
    const sbBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 0.15, 32),
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.6 })
    );
    sbBeacon.position.set(0, 0.08, -20);
    worldGroup.add(sbBeacon);

    // 🟡 Yellow Beacon (Airport Security Checkpoint)
    const secBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 0.15, 32),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.6 })
    );
    secBeacon.position.set(-68, 0.08, -10);
    worldGroup.add(secBeacon);

    // 🔵 Blue Beacon (Immigration Desk)
    const immBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 0.15, 32),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 })
    );
    immBeacon.position.set(-50, 0.08, -18);
    worldGroup.add(immBeacon);

    // 🔴 Red Beacon (Hotel Lobby)
    const hotelBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 0.15, 32),
      new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.6 })
    );
    hotelBeacon.position.set(0, 0.08, 38);
    worldGroup.add(hotelBeacon);

    // --- BEAN MACHINE / STARBUCKS RESERVE CAFE (North) ---
    const sbGroup = new THREE.Group();
    sbGroup.position.set(0, 0, -25);

    const sbFloorMat = new THREE.MeshStandardMaterial({ map: createLuxuryWoodTexture(), roughness: 0.25, metalness: 0.1 });
    const sbFloor = new THREE.Mesh(new THREE.PlaneGeometry(36, 24), sbFloorMat);
    sbFloor.rotation.x = -Math.PI / 2;
    sbFloor.position.y = 0.05;
    sbGroup.add(sbFloor);

    const sbCounter = new THREE.Mesh(
      new THREE.BoxGeometry(24, 2.4, 4.5),
      new THREE.MeshStandardMaterial({ color: 0x3e2312, roughness: 0.2, metalness: 0.15 })
    );
    sbCounter.position.set(0, 1.2, -6);
    sbCounter.castShadow = true;
    sbGroup.add(sbCounter);

    // 📺 3 Overhead Digital 4K TV Menus
    const screenCategories: ('espresso' | 'hot_choc' | 'paninis')[] = ['espresso', 'hot_choc', 'paninis'];
    screenCategories.forEach((cat, idx) => {
      const xPos = (idx - 1) * 7.5;
      const tvBezel = new THREE.Mesh(
        new THREE.BoxGeometry(7.0, 3.8, 0.25),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 })
      );
      tvBezel.position.set(xPos, 6.8, -6.4);
      sbGroup.add(tvBezel);

      const tvScreen = new THREE.Mesh(
        new THREE.PlaneGeometry(6.8, 3.6),
        new THREE.MeshBasicMaterial({ map: createStarbucksMenuScreenTexture(cat) })
      );
      tvScreen.position.set(xPos, 6.8, -6.24);
      sbGroup.add(tvScreen);
    });

    // 👩‍🍳 3D PERSON 1: BARISTA HANA
    const baristaHanaModel = createHumanoidModel(0x006241);
    baristaHanaModel.position.set(0, 0, -8.2);
    sbGroup.add(baristaHanaModel);

    worldGroup.add(sbGroup);

    // --- SINGAPORE CHANGI JEWEL & LSIA AIRPORT WING (West) ---
    const airportGroup = new THREE.Group();
    airportGroup.position.set(-50, 0, 0);

    const aFloor = new THREE.Mesh(new THREE.PlaneGeometry(60, 80), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.2 }));
    aFloor.rotation.x = -Math.PI / 2;
    aFloor.position.y = 0.06;
    airportGroup.add(aFloor);

    // 🌊 40m Jewel Changi Rain Vortex Waterfall Dome
    const domeGeom = new THREE.CylinderGeometry(14, 16, 22, 24, 1, true);
    const domeMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      transmission: 0.7
    });
    const jewelDome = new THREE.Mesh(domeGeom, domeMat);
    jewelDome.position.set(0, 11, 0);
    airportGroup.add(jewelDome);

    // Cascading Waterfall Particles
    const waterfallCount = 1200;
    const waterfallGeo = new THREE.BufferGeometry();
    const waterfallPos = new Float32Array(waterfallCount * 3);
    for (let i = 0; i < waterfallCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 2.4;
      waterfallPos[i * 3] = Math.cos(angle) * r;
      waterfallPos[i * 3 + 1] = Math.random() * 21;
      waterfallPos[i * 3 + 2] = Math.sin(angle) * r;
    }
    waterfallGeo.setAttribute('position', new THREE.BufferAttribute(waterfallPos, 3));
    const waterfallParticleMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.35,
      transparent: true,
      opacity: 0.8
    });
    const waterfallParticles = new THREE.Points(waterfallGeo, waterfallParticleMat);
    waterfallParticles.position.set(0, 0.5, 0);
    airportGroup.add(waterfallParticles);

    // Live FIDS Flight Board
    const fidsTv = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 6),
      new THREE.MeshBasicMaterial({ map: createAirportFidsTexture() })
    );
    fidsTv.position.set(0, 10, -22);
    airportGroup.add(fidsTv);

    // 👮‍♂️ 3D PERSON 2: OFFICER VIKRAM
    const officerVikramModel = createHumanoidModel(0xd97706);
    officerVikramModel.position.set(-18, 0, -10);
    airportGroup.add(officerVikramModel);

    // 🛂 3D PERSON 3: OFFICER DAVID
    const officerDavidModel = createHumanoidModel(0x1e1b4b);
    officerDavidModel.position.set(0, 0, -18);
    airportGroup.add(officerDavidModel);

    // ✈️ 3D REAL BOEING 787 DREAMLINER JET
    const planeGroup = new THREE.Group();
    const planeBody = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 32, 24),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.8, roughness: 0.2 })
    );
    planeBody.rotation.x = Math.PI / 2;
    planeBody.position.set(0, 6, 28);
    planeGroup.add(planeBody);

    const planeWings = new THREE.Mesh(
      new THREE.BoxGeometry(34, 0.4, 6),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8 })
    );
    planeWings.position.set(0, 5.5, 26);
    planeGroup.add(planeWings);

    airportGroup.add(planeGroup);
    worldGroup.add(airportGroup);

    // --- GRAND MARINA 5-STAR LUXURY HOTEL (East Wing) ---
    const hotelGroup = new THREE.Group();
    hotelGroup.position.set(0, 0, 35);

    const hFloor = new THREE.Mesh(new THREE.PlaneGeometry(40, 24), new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.4 }));
    hFloor.rotation.x = -Math.PI / 2;
    hFloor.position.y = 0.06;
    hotelGroup.add(hFloor);

    const hDesk = new THREE.Mesh(new THREE.BoxGeometry(18, 2.4, 3.5), new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 }));
    hDesk.position.set(0, 1.2, 6);
    hotelGroup.add(hDesk);

    // 🤵 3D PERSON 4: CONCIERGE MARCUS
    const conciergeMarcusModel = createHumanoidModel(0x450a0a);
    conciergeMarcusModel.position.set(0, 0, 7.8);
    hotelGroup.add(conciergeMarcusModel);

    worldGroup.add(hotelGroup);

    // --- 3D DRIVABLE GTA VEHICLES ---
    const carGroup = new THREE.Group();
    const carColor = activeVehicle === 'luxury_suv' ? 0x0f172a : activeVehicle === 'police_cruiser' ? 0x0284c7 : activeVehicle === 'taxi_cab' ? 0xfacc15 : 0xef4444;
    const carBody = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, activeVehicle === 'luxury_suv' ? 1.3 : 0.95, 5.0),
      new THREE.MeshStandardMaterial({ color: carColor, metalness: 0.85, roughness: 0.15 })
    );
    carBody.position.y = activeVehicle === 'luxury_suv' ? 0.9 : 0.7;
    carBody.castShadow = true;
    carGroup.add(carBody);

    const carGlass = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.8, 2.8),
      new THREE.MeshPhysicalMaterial({ color: 0x0f172a, transparent: true, opacity: 0.65 })
    );
    carGlass.position.set(0, activeVehicle === 'luxury_suv' ? 1.8 : 1.5, -0.3);
    carGroup.add(carGlass);

    // Headlights Cones
    const headlampLeft = new THREE.SpotLight(0xffffff, 2.5, 40, Math.PI / 6, 0.4);
    headlampLeft.position.set(-0.8, 0.8, 2.4);
    headlampLeft.target.position.set(-0.8, 0, 15);
    carGroup.add(headlampLeft);
    carGroup.add(headlampLeft.target);

    const headlampRight = new THREE.SpotLight(0xffffff, 2.5, 40, Math.PI / 6, 0.4);
    headlampRight.position.set(0.8, 0.8, 2.4);
    headlampRight.target.position.set(0.8, 0, 15);
    carGroup.add(headlampRight);
    carGroup.add(headlampRight.target);

    // Wheels
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    for (const wx of [-1.3, 1.3]) {
      for (const wz of [-1.6, 1.6]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.35, 16), wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(wx, 0.42, wz);
        carGroup.add(wheel);
      }
    }

    carGroup.position.set(carState.current.x, 0, carState.current.z);
    scene.add(carGroup);

    // --- 3D PLAYABLE CHARACTER (Swathi) ---
    const playerGroup = createHumanoidModel(0xec4899);
    playerGroup.position.set(playerState.current.x, playerState.current.y, playerState.current.z);
    scene.add(playerGroup);

    // 4. Keyboard Controls
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
      if (e.code === 'KeyF') {
        const dist = Math.hypot(playerState.current.x - carState.current.x, playerState.current.z - carState.current.z);
        if (dist < 8 || isDriving) {
          sound.playClick();
          setIsDriving(prev => {
            const next = !prev;
            if (next) gtaAudio.startEngineSound();
            else gtaAudio.stopEngineSound();
            return next;
          });
        }
      }
      if (e.code === 'KeyE' && nearbyNpc) {
        sound.playClick();
        setActiveTelltaleDialogue(nearbyNpc);
        setSelectedChoice(null);
      }
      if (e.code === 'KeyH' && isDriving) {
        gtaAudio.playHorn();
      }
      if (e.code === 'KeyP') {
        sound.playClick();
        setShowIFruitPhone(prev => !prev);
      }
      if (e.code === 'KeyR' && isDriving) {
        sound.playClick();
        setCurrentRadioIndex(prev => (prev + 1) % radioStations.length);
        setShowRadioHUD(true);
        setTimeout(() => setShowRadioHUD(false), 2500);
      }
      if (e.code === 'Space' && playerState.current.isGrounded && !isDriving) {
        playerState.current.vy = 0.26;
        playerState.current.isGrounded = false;
        sound.playClick();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 5. 60 FPS Game Loop
    let animId: number;
    let tick = 0;

    const animate = () => {
      tick++;

      // Pulse beacon opacity like GTA
      const beaconGlow = 0.45 + Math.sin(tick * 0.08) * 0.25;
      sbBeacon.material.opacity = beaconGlow;
      secBeacon.material.opacity = beaconGlow;
      immBeacon.material.opacity = beaconGlow;
      hotelBeacon.material.opacity = beaconGlow;

      // Animate Waterfall Particles
      if (waterfallParticles) {
        const positions = waterfallParticles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < waterfallCount; i++) {
          positions[i * 3 + 1] -= 0.35;
          if (positions[i * 3 + 1] < 0) {
            positions[i * 3 + 1] = 21;
          }
        }
        waterfallParticles.geometry.attributes.position.needsUpdate = true;
      }

      // Check Proximity to 3D NPCs in the world
      const px = playerState.current.x;
      const pz = playerState.current.z;
      let foundNpc: TelltaleNPCData | null = null;

      if (Math.hypot(px - 0, pz - (-20)) < 6) foundNpc = telltaleNPCs[0];
      else if (Math.hypot(px - (-68), pz - (-10)) < 6) foundNpc = telltaleNPCs[1];
      else if (Math.hypot(px - (-50), pz - (-18)) < 6) foundNpc = telltaleNPCs[2];
      else if (Math.hypot(px - 0, pz - 38) < 6) foundNpc = telltaleNPCs[3];

      setNearbyNpc(foundNpc);

      // Read Virtual Joystick + Keys for movement
      const joyX = leftStickVector.current.x;
      const joyY = leftStickVector.current.y;

      if (isDriving) {
        playerGroup.visible = false;
        let throttle = 0;
        let steering = 0;

        if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp'] || joyY < -0.2) throttle += 1;
        if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown'] || joyY > 0.2) throttle -= 1;
        if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft'] || joyX < -0.2) steering -= 1;
        if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight'] || joyX > 0.2) steering += 1;

        if (throttle > 0) {
          carState.current.speed = Math.min(carState.current.maxSpeed, carState.current.speed + carState.current.accel);
        } else if (throttle < 0) {
          carState.current.speed = Math.max(-carState.current.maxSpeed * 0.45, carState.current.speed - carState.current.accel);
        } else {
          carState.current.speed *= carState.current.friction;
        }

        if (Math.abs(carState.current.speed) > 0.01) {
          carState.current.rotY -= steering * 0.038 * (carState.current.speed > 0 ? 1 : -1);
        }

        carState.current.x += Math.sin(carState.current.rotY) * carState.current.speed;
        carState.current.z += Math.cos(carState.current.rotY) * carState.current.speed;

        carGroup.position.set(carState.current.x, 0, carState.current.z);
        carGroup.rotation.y = carState.current.rotY;

        playerState.current.x = carState.current.x;
        playerState.current.z = carState.current.z;
        const currentKmH = Math.round(Math.abs(carState.current.speed) * 160);
        setCarSpeedKmH(currentKmH);
        gtaAudio.updateEnginePitch(Math.abs(carState.current.speed) / carState.current.maxSpeed);

        const cx = carState.current.x;
        const cz = carState.current.z;
        camera.position.set(
          cx - Math.sin(carState.current.rotY) * 10,
          5.2,
          cz - Math.cos(carState.current.rotY) * 10
        );
        camera.lookAt(cx, 1.6, cz);

      } else {
        playerGroup.visible = true;
        const speed = playerState.current.speed * (keysPressed.current['ShiftLeft'] || keysPressed.current['ShiftRight'] ? 1.75 : 1);
        let moveX = 0;
        let moveZ = 0;

        if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp'] || joyY < -0.2) moveZ -= 1;
        if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown'] || joyY > 0.2) moveZ += 1;
        if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft'] || joyX < -0.2) moveX -= 1;
        if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight'] || joyX > 0.2) moveX += 1;

        if (moveX !== 0 || moveZ !== 0) {
          const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
          const nx = moveX / len;
          const nz = moveZ / len;

          const fwdX = -Math.sin(cameraAngleYaw.current);
          const fwdZ = -Math.cos(cameraAngleYaw.current);
          const rgtX = Math.cos(cameraAngleYaw.current);
          const rgtZ = -Math.sin(cameraAngleYaw.current);

          const dx = (nx * rgtX + nz * fwdX) * speed;
          const dz = (nx * rgtZ + nz * fwdZ) * speed;

          playerState.current.x += dx;
          playerState.current.z += dz;
          playerState.current.rotY = Math.atan2(dx, dz);
        }

        // Jump & Gravity
        if (!playerState.current.isGrounded) {
          playerState.current.y += playerState.current.vy;
          playerState.current.vy -= 0.012;
          if (playerState.current.y <= 0) {
            playerState.current.y = 0;
            playerState.current.vy = 0;
            playerState.current.isGrounded = true;
          }
        }

        playerGroup.position.set(playerState.current.x, playerState.current.y, playerState.current.z);
        playerGroup.rotation.y = playerState.current.rotY;

        const tx = playerState.current.x;
        const ty = playerState.current.y + 1.6;
        const tz = playerState.current.z;

        camera.position.set(
          tx + Math.sin(cameraAngleYaw.current) * 8.5,
          ty + 4.2,
          tz + Math.cos(cameraAngleYaw.current) * 8.5
        );
        camera.lookAt(tx, ty, tz);
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      gtaAudio.stopEngineSound();
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isDriving, timeOfDay, activeVehicle, isFullscreenGTA]);

  // Pointer-Captured Touch Joysticks
  const handleLeftPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    leftStickActive.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleLeftPointerMove(e);
  };

  const handleLeftPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!leftStickActive.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.hypot(dx, dy);
    const maxR = 42;
    const clampR = Math.min(dist, maxR);
    const nx = dist > 0 ? (dx / dist) * (clampR / maxR) : 0;
    const ny = dist > 0 ? (dy / dist) * (clampR / maxR) : 0;

    setLeftStickPos({ x: nx * 34, y: ny * 34 });
    leftStickVector.current = { x: nx, y: ny };
  };

  const handleLeftPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    leftStickActive.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    setLeftStickPos({ x: 0, y: 0 });
    leftStickVector.current = { x: 0, y: 0 };
  };

  const handleRightPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    rightStickActive.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleRightPointerMove(e);
  };

  const handleRightPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rightStickActive.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const dx = e.clientX - centerX;
    cameraAngleYaw.current -= dx * 0.004;
    setRightStickPos({ x: Math.max(-28, Math.min(28, dx * 0.6)), y: 0 });
  };

  const handleRightPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    rightStickActive.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    setRightStickPos({ x: 0, y: 0 });
  };

  return (
    <div className={`select-none font-sans ${isFullscreenGTA ? 'fixed inset-0 z-[99999] bg-black w-screen h-screen' : 'space-y-4 max-w-7xl mx-auto'}`}>
      {/* 🏆 GTA 5 "MISSION PASSED" FULL-SCREEN SCREEN */}
      {missionPassedData && (
        <div className="fixed inset-0 z-[100] bg-black/85 flex flex-col items-center justify-center p-6 animate-fadeIn text-center pointer-events-none">
          <div className="w-full max-w-3xl py-8 bg-black/95 border-y-4 border-amber-400 shadow-2xl space-y-3 transform -skew-x-6">
            <h1 className="text-4xl sm:text-6xl font-black tracking-widest text-amber-400 drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)] uppercase font-mono">
              MISSION PASSED
            </h1>
            <p className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider font-mono">
              {missionPassedData.title}
            </p>
            <div className="flex items-center justify-center gap-6 pt-2 font-mono text-base sm:text-lg font-bold">
              <span className="text-emerald-400">RESPECT +</span>
              <span className="text-amber-300">+{missionPassedData.xp} XP</span>
              <span className="text-green-400 font-black">+${missionPassedData.cash.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* 💭 Telltale Notification */}
      {telltaleNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 border-2 border-amber-400 text-amber-200 px-6 py-3 rounded-2xl shadow-2xl font-mono text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>💭 {telltaleNotification}</span>
        </div>
      )}

      {/* 🎮 TOP GTA CONTROL BAR */}
      {!isFullscreenGTA && (
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 rounded-3xl border-2 border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-2xl font-black font-mono">
              ★V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-white tracking-wider uppercase font-mono">GTA V: REAL LOS SANTOS CITY</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-[10px] font-black">
                  MAZE BANK & VINEWOOD SKYLINE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Full 3D City World • Drivable Sports Cars • Boeing 787 Airport • Starbucks Reserve • 5-Star Hotel
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setIsFullscreenGTA(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow cursor-pointer uppercase font-mono"
            >
              <Maximize2 className="w-4 h-4" /> ⛶ FULLSCREEN GTA 5
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveVehicle(prev => prev === 'sports_sedan' ? 'luxury_suv' : prev === 'luxury_suv' ? 'police_cruiser' : prev === 'police_cruiser' ? 'taxi_cab' : 'sports_sedan');
              }}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
            >
              🚗 Swap Vehicle: {activeVehicle === 'sports_sedan' ? '🏎️ Sports Coupe' : activeVehicle === 'luxury_suv' ? '🚙 Luxury SUV' : activeVehicle === 'police_cruiser' ? '🚓 Police Cruiser' : '🚕 Yellow Taxi'}
            </button>
            <button
              onClick={() => setTimeOfDay('day')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer ${timeOfDay === 'day' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <Sun className="w-3.5 h-3.5" /> Day
            </button>
            <button
              onClick={() => setTimeOfDay('sunset')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer ${timeOfDay === 'sunset' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <Sunset className="w-3.5 h-3.5" /> Sunset
            </button>
            <button
              onClick={() => setTimeOfDay('night')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer ${timeOfDay === 'night' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <Moon className="w-3.5 h-3.5" /> Night
            </button>
          </div>
        </div>
      )}

      {/* 🏙️ FULLSCREEN / 3D GTA VIEWPORT & EXACT GTA 5 HUD */}
      <div className={`relative overflow-hidden bg-black shadow-2xl ${isFullscreenGTA ? 'w-screen h-screen' : 'rounded-3xl border-4 border-slate-800 h-[640px]'}`}>
        <div ref={mountRef} className="w-full h-full bg-slate-950 cursor-grab active:cursor-grabbing" />

        {/* Fullscreen Exit Button */}
        {isFullscreenGTA && (
          <button
            onClick={() => setIsFullscreenGTA(false)}
            className="absolute top-4 left-4 z-40 px-4 py-2 bg-black/80 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xl"
          >
            <Minimize2 className="w-4 h-4" /> Exit Fullscreen [Esc]
          </button>
        )}

        {/* 📋 GTA 5 TOP-LEFT HELP PROMPT BOX */}
        <div className={`absolute z-20 pointer-events-none max-w-xs ${isFullscreenGTA ? 'top-16 left-4' : 'top-4 left-4'}`}>
          <div className="bg-black/85 backdrop-blur-md p-3 rounded-xl border border-slate-700 text-white text-[11px] font-mono shadow-2xl space-y-1">
            <div className="font-bold text-amber-400 uppercase">GTA 5 CONTROLS</div>
            <div className="text-slate-300">
              • <span className="text-emerald-400 font-bold">[W][A][S][D] / Joystick</span>: Move & Steer
            </div>
            <div className="text-slate-300">
              • <span className="text-amber-300 font-bold">[F] / [△]</span>: Enter/Exit Cars & Boeing 787
            </div>
            <div className="text-slate-300">
              • <span className="text-sky-300 font-bold">[E] / [💬]</span>: Talk & Practice English
            </div>
            <div className="text-slate-300">
              • <span className="text-pink-300 font-bold">[H] / [◯]</span>: Car Horn & Siren
            </div>
            <div className="text-slate-300">
              • <span className="text-indigo-300 font-bold">[P] / [📱]</span>: iFruit Smartphone
            </div>
          </div>
        </div>

        {/* 🌟 GTA 5 TOP-RIGHT HUD (MONEY, WANTED STARS, WEAPON) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5 pointer-events-none font-mono select-none">
          <div className="flex items-center gap-1 text-base">
            {[1, 2, 3, 4, 5].map(starNum => (
              <Star
                key={starNum}
                className={`w-5 h-5 ${starNum <= wantedStars ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-slate-700'}`}
              />
            ))}
          </div>

          <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-black text-emerald-400 drop-shadow-[0_3px_3px_rgba(0,0,0,0.9)] tracking-tight">
            <span className="text-emerald-500">$</span>
            <span>{cashBalance.toLocaleString()}</span>
          </div>

          {cashDelta && (
            <div className={`text-sm sm:text-base font-black animate-bounce ${cashDelta.type === '+' ? 'text-green-400' : 'text-red-400'}`}>
              {cashDelta.type}${cashDelta.amount.toLocaleString()}
            </div>
          )}

          <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-700 text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <span>{activeWeaponItem === 'coffee' ? '☕ Caramel Macchiato' : activeWeaponItem === 'card' ? '💳 Apple Pay' : activeWeaponItem === 'boarding_pass' ? '🎫 SQ 529 Pass' : activeWeaponItem === 'keycard' ? '🗝️ Suite #808' : activeWeaponItem === 'phone' ? '📱 iFruit 9S' : '👊 Unarmed'}</span>
          </div>
        </div>

        {/* 📻 GTA 5 RADIO HUD */}
        {showRadioHUD && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/90 border-2 border-amber-400 px-6 py-2 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn">
            <span className="text-2xl">{radioStations[currentRadioIndex].icon}</span>
            <div>
              <span className="text-[10px] text-amber-400 uppercase font-mono font-bold block">LOS SANTOS RADIO</span>
              <span className="text-sm font-black text-white">{radioStations[currentRadioIndex].name}</span>
            </div>
          </div>
        )}

        {/* 🗺️ BOTTOM-LEFT GTA 5 RADAR MINI-MAP & HEALTH/ARMOR */}
        <div className="absolute bottom-6 left-6 z-20 flex flex-col items-start gap-1 select-none">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-black/85 border-2 border-slate-600 backdrop-blur-md relative overflow-hidden shadow-2xl p-2 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono font-black text-slate-400">
              <span className="text-amber-400">MAZE BANK / LSIA</span>
              <span className="text-sky-400">N ▲</span>
            </div>

            <div className="relative flex-1 flex items-center justify-center">
              <div className="w-full h-[1px] bg-slate-800 absolute" />
              <div className="h-full w-[1px] bg-slate-800 absolute" />
              <div className="w-16 h-16 rounded-full border border-slate-700/60 absolute" />
              
              <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping top-3 left-4" title="Starbucks" />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping top-4 right-3" title="Airport Security" />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping bottom-4 left-3" title="Immigration" />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping bottom-3 right-4" title="Hotel Lobby" />

              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-cyan-400 shadow-lg transform rotate-0" />
            </div>

            <div className="text-[9px] font-black text-slate-300 truncate font-mono">
              {isDriving ? `CRUISING • ${carSpeedKmH} KM/H` : currentLocationName}
            </div>
          </div>

          <div className="w-36 sm:w-44 flex flex-col gap-1 bg-black/90 p-1.5 rounded-xl border border-slate-800">
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${healthPercent}%` }} />
            </div>
            <div className="flex gap-1">
              <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: `${armorPercent}%` }} />
              </div>
              <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${specialAbilityPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* 💬 TALK / INTERACTION PROMPT */}
        {nearbyNpc && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 animate-bounce">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTelltaleDialogue(nearbyNpc);
                setSelectedChoice(null);
              }}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-2xl border-2 border-white flex items-center gap-2 cursor-pointer font-mono"
            >
              <MessageSquare className="w-5 h-5 text-slate-950" />
              <span>{nearbyNpc.avatar} TALK TO {nearbyNpc.name.toUpperCase()} [PRESS E / TAP]</span>
            </button>
          </div>
        )}

        {/* 📱 GTA TOUCH CONTROLLER CLUSTER */}
        <div
          onPointerDown={handleLeftPointerDown}
          onPointerMove={handleLeftPointerMove}
          onPointerUp={handleLeftPointerUp}
          onPointerCancel={handleLeftPointerUp}
          className="absolute bottom-6 left-44 sm:left-52 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black/80 border-2 border-emerald-500/70 backdrop-blur-md flex items-center justify-center select-none z-30 shadow-2xl cursor-grab active:cursor-grabbing touch-none ring-4 ring-emerald-500/20"
        >
          <div className="absolute text-[9px] font-black text-emerald-400 uppercase font-mono top-1 pointer-events-none">
            ANALOG
          </div>
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 border-2 border-white shadow-2xl pointer-events-none flex items-center justify-center text-slate-950 font-black text-base shadow-emerald-500/50"
            style={{ transform: `translate(${leftStickPos.x}px, ${leftStickPos.y}px)` }}
          >
            🕹️
          </div>
        </div>

        <div
          onPointerDown={handleRightPointerDown}
          onPointerMove={handleRightPointerMove}
          onPointerUp={handleRightPointerUp}
          onPointerCancel={handleRightPointerUp}
          className="absolute bottom-6 right-36 sm:right-40 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black/80 border-2 border-sky-500/70 backdrop-blur-md flex items-center justify-center select-none z-30 shadow-2xl cursor-grab active:cursor-grabbing touch-none ring-4 ring-sky-500/20"
        >
          <div className="absolute text-[9px] font-black text-sky-400 uppercase font-mono top-1 pointer-events-none">
            LOOK 360°
          </div>
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-500 border-2 border-white shadow-2xl pointer-events-none flex items-center justify-center text-white font-black text-base shadow-sky-500/50"
            style={{ transform: `translate(${rightStickPos.x}px, ${rightStickPos.y}px)` }}
          >
            🔄
          </div>
        </div>

        {/* Right Action Cluster (△ ✕ ◻ ◯) */}
        <div className="absolute bottom-6 right-4 z-30 flex flex-col items-center gap-1.5">
          <button
            onClick={() => {
              const dist = Math.hypot(playerState.current.x - carState.current.x, playerState.current.z - carState.current.z);
              if (dist < 12 || isDriving) {
                sound.playClick();
                setIsDriving(prev => {
                  const next = !prev;
                  if (next) gtaAudio.startEngineSound();
                  else gtaAudio.stopEngineSound();
                  return next;
                });
              } else {
                playerState.current.x = carState.current.x;
                playerState.current.z = carState.current.z;
                setIsDriving(true);
                gtaAudio.startEngineSound();
              }
            }}
            className="w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base border-2 border-white shadow-2xl flex items-center justify-center cursor-pointer active:scale-95"
            title="Enter / Exit Vehicle [F]"
          >
            △
          </button>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (!isDriving && playerState.current.isGrounded) {
                  playerState.current.vy = 0.26;
                  playerState.current.isGrounded = false;
                  sound.playClick();
                }
              }}
              className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-400 text-white font-black text-base border-2 border-white shadow-2xl flex items-center justify-center cursor-pointer active:scale-95"
              title="Jump [Space]"
            >
              ◻
            </button>
            <button
              onClick={() => {
                if (isDriving) gtaAudio.playHorn();
                else sound.playClick();
              }}
              className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-400 text-white font-black text-base border-2 border-white shadow-2xl flex items-center justify-center cursor-pointer active:scale-95"
              title="Horn / Action [H]"
            >
              ◯
            </button>
          </div>
          <button
            onPointerDown={() => { keysPressed.current['ShiftLeft'] = true; }}
            onPointerUp={() => { keysPressed.current['ShiftLeft'] = false; }}
            className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-base border-2 border-white shadow-2xl flex items-center justify-center cursor-pointer active:scale-95"
            title="Sprint [Shift]"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 📱 GTA 5 iFRUIT SMARTPHONE MODAL */}
      {showIFruitPhone && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-950 border-4 border-slate-700 rounded-[44px] p-4 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto" />

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
              <span className="font-bold">iFruit 9S • 5G</span>
              <span className="text-amber-400 font-bold">14:45</span>
            </div>

            {phoneScreen === 'home' && (
              <div className="grid grid-cols-3 gap-4 p-2 text-center text-xs">
                <button
                  onClick={() => setPhoneScreen('contacts')}
                  className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span className="text-2xl">👥</span>
                  <span className="text-slate-300 font-bold">Contacts</span>
                </button>
                <button
                  onClick={() => setPhoneScreen('bank')}
                  className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span className="text-2xl">🏦</span>
                  <span className="text-emerald-400 font-bold">Maze Bank</span>
                </button>
                <button
                  onClick={() => setPhoneScreen('gps')}
                  className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span className="text-2xl">🗺️</span>
                  <span className="text-sky-400 font-bold">Quick GPS</span>
                </button>
              </div>
            )}

            {phoneScreen === 'contacts' && (
              <div className="space-y-2 p-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 font-mono">CONTACTS</span>
                  <button onClick={() => setPhoneScreen('home')} className="text-xs text-slate-400">Back</button>
                </div>
                {telltaleNPCs.map(npc => (
                  <button
                    key={npc.id}
                    onClick={() => {
                      sound.playClick();
                      setShowIFruitPhone(false);
                      setActiveTelltaleDialogue(npc);
                    }}
                    className="w-full p-2.5 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 flex items-center justify-between text-left text-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{npc.avatar}</span>
                      <div>
                        <div className="font-black text-white">{npc.name}</div>
                        <div className="text-[10px] text-slate-400">{npc.role}</div>
                      </div>
                    </div>
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                  </button>
                ))}
              </div>
            )}

            {phoneScreen === 'bank' && (
              <div className="space-y-3 p-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 font-mono">MAZE BANK ONLINE</span>
                  <button onClick={() => setPhoneScreen('home')} className="text-xs text-slate-400">Back</button>
                </div>
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-center">
                  <span className="text-xs text-slate-400 uppercase">Available Funds</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                    ${cashBalance.toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {phoneScreen === 'gps' && (
              <div className="space-y-2 p-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400 font-mono">QUICK GPS BEACONS</span>
                  <button onClick={() => setPhoneScreen('home')} className="text-xs text-slate-400">Back</button>
                </div>
                <button
                  onClick={() => {
                    playerState.current.x = 0;
                    playerState.current.z = -20;
                    setShowIFruitPhone(false);
                    sound.playClick();
                  }}
                  className="w-full p-2 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-left text-xs text-emerald-300 font-bold cursor-pointer"
                >
                  🟢 Bean Machine Reserve
                </button>
                <button
                  onClick={() => {
                    playerState.current.x = -68;
                    playerState.current.z = -10;
                    setShowIFruitPhone(false);
                    sound.playClick();
                  }}
                  className="w-full p-2 bg-amber-950/40 border border-amber-500/40 rounded-xl text-left text-xs text-amber-300 font-bold cursor-pointer"
                >
                  🟡 LSIA Airport Security
                </button>
                <button
                  onClick={() => {
                    playerState.current.x = -50;
                    playerState.current.z = -18;
                    setShowIFruitPhone(false);
                    sound.playClick();
                  }}
                  className="w-full p-2 bg-sky-950/40 border border-sky-500/40 rounded-xl text-left text-xs text-sky-300 font-bold cursor-pointer"
                >
                  🔵 Immigration Desk
                </button>
                <button
                  onClick={() => {
                    playerState.current.x = 0;
                    playerState.current.z = 38;
                    setShowIFruitPhone(false);
                    sound.playClick();
                  }}
                  className="w-full p-2 bg-rose-950/40 border border-rose-500/40 rounded-xl text-left text-xs text-rose-300 font-bold cursor-pointer"
                >
                  🔴 Grand Marina Hotel Lobby
                </button>
              </div>
            )}

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowIFruitPhone(false)}
                className="w-28 h-2 bg-slate-700 hover:bg-slate-500 rounded-full mx-auto cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* 🎬 TELLTALE CINEMATIC DIALOGUE HUD */}
      {activeTelltaleDialogue && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-2xl font-black">
                {activeTelltaleDialogue.avatar}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 font-mono">
                  {activeTelltaleDialogue.gtaTitle}
                </span>
                <h3 className="text-xl font-black text-white">{activeTelltaleDialogue.name}</h3>
              </div>
            </div>
            <button
              onClick={() => setActiveTelltaleDialogue(null)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold cursor-pointer"
            >
              ✕ Exit Dialogue
            </button>
          </div>

          <div className="max-w-3xl mx-auto w-full p-4 bg-black/90 border-2 border-amber-500/40 rounded-2xl space-y-2 shadow-2xl my-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase font-mono">{activeTelltaleDialogue.name}</span>
              <AudioSpeakButton text={activeTelltaleDialogue.greeting} label="Listen Voice" className="bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl" />
            </div>
            <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
              "{activeTelltaleDialogue.greeting}"
            </p>
          </div>

          <div className="max-w-4xl mx-auto w-full space-y-3 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {activeTelltaleDialogue.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedChoice(choice);
                    sound.playClick();
                    setTelltaleNotification(choice.memoryTag);
                    setTimeout(() => setTelltaleNotification(null), 4000);
                  }}
                  className={`p-4 rounded-2xl border text-left font-bold transition-all flex flex-col justify-between gap-2 cursor-pointer ${selectedChoice === choice ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 border-white shadow-xl scale-[1.02]' : 'bg-slate-950 text-slate-200 border-slate-800 hover:bg-slate-800'}`}
                >
                  <span>{choice.text}</span>
                  <div className="flex items-center justify-between text-[10px] opacity-75 font-mono">
                    <span>Choice #{idx + 1}</span>
                    <span className="text-emerald-400 font-bold">+{choice.xp} XP • +${choice.cash}</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedChoice && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/50 space-y-3 animate-fadeIn">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase font-mono">{activeTelltaleDialogue.name}'s Response:</span>
                  <p className="text-xs text-white">"{selectedChoice.response}"</p>
                </div>

                <div className="border-t border-slate-800 pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">Speak Choice to Pass GTA Mission:</span>
                    <AudioSpeakButton text={selectedChoice.text} label="Listen Target" className="bg-sky-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl" />
                  </div>
                  <VoiceSpeechPractice
                    targetPhrase={selectedChoice.text}
                    accentColor="emerald"
                    onSuccess={() => {
                      triggerMissionPassed(
                        activeTelltaleDialogue.gtaTitle,
                        `Mastered spoken English dialogue with ${activeTelltaleDialogue.name}!`,
                        selectedChoice.xp,
                        selectedChoice.cash
                      );
                      setActiveTelltaleDialogue(null);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
