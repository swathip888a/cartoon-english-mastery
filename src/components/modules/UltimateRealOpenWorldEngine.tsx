import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { VoiceSpeechPractice } from '../VoiceSpeechPractice';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Compass,
  MapPin,
  Sparkles,
  Volume2,
  Mic,
  CheckCircle2,
  Plane,
  Coffee,
  RotateCcw,
  Zap,
  Info,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Award,
  Layers,
  FileText,
  Hotel,
  ShoppingBag,
  Clock,
  User,
  Check,
  CreditCard,
  Luggage,
  Smile,
  Maximize2,
  Eye,
  Sun,
  Moon,
  Car,
  Gauge,
  Navigation,
  Key,
  Flame,
  ArrowUpRight,
  Tv,
  Utensils,
  Camera,
  Radio,
  Play,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Shield,
  Sunset,
  CloudRain,
  Sliders,
  CheckSquare,
  Bed,
  PhoneCall,
  Bell,
  Smartphone,
  Music,
  Shirt,
  Heart,
  QrCode,
  VolumeX,
  Banknote,
  Film,
  MessageSquare,
  FlameKindling
} from 'lucide-react';

interface UltimateRealOpenWorldEngineProps {
  onAddXp: (amount: number, reason: string) => void;
  onNavigateTab?: (tabName: string) => void;
}

type TimeOfDay = 'day' | 'sunset' | 'night' | 'neon';
type VehicleType = 'sports_sedan' | 'luxury_suv';

interface TelltaleChoice {
  text: string;
  response: string;
  memoryTag: string;
  xp: number;
}

interface TelltaleNPCData {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  greeting: string;
  choices: TelltaleChoice[];
}

// Procedural Photorealistic Textures
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
    
    // Fine wood grain
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

function createPolishedMarbleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1e293b'; // Slate Marble
  ctx.fillRect(0, 0, 512, 512);

  // Marble Veins
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

function createStarbucksMenuScreenTexture(category: 'espresso' | 'hot_choc' | 'paninis'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 512);
  bgGrad.addColorStop(0, '#064e3b'); // Starbucks Green
  bgGrad.addColorStop(1, '#022c22');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Frame & Logo
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 1010, 498);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Inter, sans-serif';
  ctx.fillText(
    category === 'espresso' ? '☕ STARBUCKS RESERVE ESPRESSO & CLASSICS' :
    category === 'hot_choc' ? '🍫 HOT CHOCOLATES, OAT MILK & SWEET COLD FOAM' :
    '🥪 ARTISAN BAKERY & WARMED FOCACCIA PANINIS',
    40, 60
  );

  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('HOT & ICED • SHORT (8oz) / TALL (12oz) / GRANDE (16oz) / VENTI (20oz)', 40, 95);

  ctx.font = 'bold 28px Inter, sans-serif';
  if (category === 'espresso') {
    const items = [
      { name: 'Caffè Latte', price: '$4.95', sub: 'Espresso with rich steamed milk and light microfoam' },
      { name: 'Caramel Macchiato', price: '$5.45', sub: 'Steamed vanilla milk marked with espresso and caramel drizzle' },
      { name: 'Blonde Vanilla Latte', price: '$5.25', sub: 'Smooth blonde espresso roast with oat milk & vanilla' },
      { name: 'Caffè Mocha', price: '$5.35', sub: 'Bittersweet cocoa, espresso, steamed milk, and whipped cream' },
    ];
    items.forEach((it, idx) => {
      const y = 165 + idx * 80;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(it.name, 40, y);
      ctx.fillStyle = '#34d399';
      ctx.fillText(it.price, 850, y);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '18px sans-serif';
      ctx.fillText(it.sub, 40, y + 26);
      ctx.font = 'bold 28px Inter, sans-serif';
    });
  } else if (category === 'hot_choc') {
    const items = [
      { name: 'Signature Hot Chocolate', price: '$4.85', sub: 'Swathi\'s Pick ⭐ Oat Milk + Blonde Shot + 3x Vanilla + Cold Foam' },
      { name: 'White Hot Chocolate', price: '$4.95', sub: 'Rich buttery white chocolate sauce blended with steamed milk' },
      { name: 'Vanilla Sweet Cold Foam (Add-on)', price: '+$1.25', sub: 'Velvety cold cream cloud sitting on top for hot-cold contrast' },
      { name: 'Blonde Espresso Shot (Add-on)', price: '+$1.00', sub: 'Cuts chocolate sweetness with subtle nutty crema aroma' },
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
  } else {
    const items = [
      { name: 'Tomato & Mozzarella Focaccia Panini', price: '$6.45', sub: 'Fresh mozzarella, roasted tomatoes, basil pesto (Warmed Up 🔥)' },
      { name: 'Bacon, Gouda & Egg Sandwich', price: '$5.95', sub: 'Applewood smoked bacon & aged Gouda on artisan roll' },
      { name: 'All-Butter French Croissant', price: '$3.85', sub: 'Flaky golden layered pastry toasted in rapid TurboChef' },
      { name: 'Oat Milk Substitution (Oatly Barista)', price: '+$0.70', sub: 'Creamy plant-based milk engineered for silky microfoam' },
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
  }

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

  // Header
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 36px monospace';
  ctx.fillText('✈️ INTERNATIONAL DEPARTURES & TRANSIT (LIVE FIDS)', 40, 55);

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

// 3D Humanoid Model Builder Helper
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

  // Torso / Uniform
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.46, 1.1, 16), new THREE.MeshStandardMaterial({ color: uniformColor }));
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

  // Player & Simulation State
  const [playerName] = useState<string>('Swathi');
  const [isDriving, setIsDriving] = useState<boolean>(false);
  const [carSpeedKmH, setCarSpeedKmH] = useState<number>(0);
  const [currentLocationName, setCurrentLocationName] = useState<string>('Kyoto Starbucks Reserve & City Plaza');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [activeVehicle, setActiveVehicle] = useState<VehicleType>('sports_sedan');

  // GTA-Style Proximity & Telltale Dialogue State
  const [nearbyNpc, setNearbyNpc] = useState<TelltaleNPCData | null>(null);
  const [activeTelltaleDialogue, setActiveTelltaleDialogue] = useState<TelltaleNPCData | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<TelltaleChoice | null>(null);
  const [telltaleNotification, setTelltaleNotification] = useState<string | null>(null);

  // Modals
  const [showSmartphoneModal, setShowSmartphoneModal] = useState<boolean>(false);

  // --- DUAL ON-SCREEN VIRTUAL JOYSTICK STATE (MOUSE & TOUCH) ---
  const [leftStickPos, setLeftStickPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const leftStickVector = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const leftStickActive = useRef<boolean>(false);

  const [rightStickPos, setRightStickPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const rightStickActive = useRef<boolean>(false);
  const cameraAngleYaw = useRef<number>(0);

  // Telltale / Walking Dead Style Dialogue Datasets with Meaningful Choices
  const telltaleNPCs: TelltaleNPCData[] = [
    {
      id: 'barista_hana',
      name: 'Barista Hana',
      role: 'Starbucks Master Barista ☕',
      location: 'Starbucks Reserve Counter',
      avatar: '👩‍🍳',
      greeting: "Hi Swathi! Welcome to Starbucks Reserve. What can I handcrafted for you today?",
      choices: [
        {
          text: "☕ Can I get a Short Signature Hot Chocolate with Oat Milk and Cold Foam, plus a warmed Tomato Panini?",
          response: "Excellent gourmet taste! I'll craft that right away with steamed Oatly milk and pull a blonde shot for balance.",
          memoryTag: "Hana was impressed by your precise coffee ordering mastery.",
          xp: 80
        },
        {
          text: "🥪 What do you recommend from the fresh bakery showcase today?",
          response: "The Tomato & Mozzarella Focaccia Panini warmed up is our top favorite! It pairs heavenly with our cocoa drinks.",
          memoryTag: "Hana appreciated your curiosity about the bakery.",
          xp: 60
        },
        {
          text: "💳 Can I pay using Apple Pay and scan my Starbucks Rewards barcode?",
          response: "Of course! Just hold your phone near the contactless reader. BEEP! Payment approved!",
          memoryTag: "You collected 25 Starbucks Gold Stars.",
          xp: 50
        },
        {
          text: "🥛 Do you have dairy-free Oatly Barista oat milk available?",
          response: "Yes! Oatly Barista is our signature plant milk, engineered for rich, silky microfoam.",
          memoryTag: "Hana noted your preference for plant-based milks.",
          xp: 60
        }
      ]
    },
    {
      id: 'security_vikram',
      name: 'Security Officer Vikram',
      role: 'CISF Airport Security Guard 👮‍♂️',
      location: 'Airport Security Metal Detector',
      avatar: '👮‍♂️',
      greeting: "Good afternoon, Ma'am. Please take out your electronic devices and liquids into the grey tray before stepping through the arch.",
      choices: [
        {
          text: "🛡️ Here is my laptop and liquids in the tray. May I step through the detector?",
          response: "Thank you for your cooperation, Ma'am. Step through... BEEP (All clear!). Have a safe flight!",
          memoryTag: "Officer Vikram stamped your boarding pass with a security clearance seal.",
          xp: 80
        },
        {
          text: "⌚ Do I need to remove my wristwatch and winter jacket as well?",
          response: "Yes please, place them in the small side basket. It ensures a quick and smooth screening.",
          memoryTag: "Officer Vikram appreciated your proactive compliance.",
          xp: 65
        },
        {
          text: "🎫 Here is my physical boarding pass and passport for stamping.",
          response: "Everything is in order. Gate B12 is straight ahead on the right concourse.",
          memoryTag: "Officer Vikram directed you to Gate B12.",
          xp: 60
        },
        {
          text: "💧 Is a 100ml water bottle allowed through international security?",
          response: "Only empty reusable bottles or sealed liquids under 100ml in clear zip bags are allowed.",
          memoryTag: "You learned international IATA liquid restriction rules.",
          xp: 70
        }
      ]
    },
    {
      id: 'officer_david',
      name: 'Immigration Officer David',
      role: 'Singapore ICA Border Control 🛂',
      location: 'Immigration Passport Control',
      avatar: '🛂',
      greeting: "Passport and electronic SG Arrival Card please. What is the primary purpose and duration of your visit to Singapore?",
      choices: [
        {
          text: "🛂 Good afternoon Officer. I am here for a 5-day vacation and cultural tour, staying at Marina Bay Sands.",
          response: "Thank you Miss Swathi. Welcome to Singapore! *THUMP* (Passport Stamped). Enjoy the Jewel Waterfall!",
          memoryTag: "Officer David granted a 30-day tourist entry pass.",
          xp: 90
        },
        {
          text: "📋 I submitted my SG Arrival Card online yesterday. Here is the confirmation QR code.",
          response: "Biometric match confirmed on our e-Gate system. Your paperwork is immaculate.",
          memoryTag: "Officer David noted your complete digital documentation.",
          xp: 85
        },
        {
          text: "🏨 Here is my confirmed hotel booking voucher and return flight ticket to Vizag.",
          response: "Return travel itinerary verified. Proceed through the baggage reclaim hall.",
          memoryTag: "You smoothly proved your onward travel itinerary.",
          xp: 75
        },
        {
          text: "🛍️ May I know where the Duty-Free baggage carousel for SQ 529 is located?",
          response: "Baggage belt 04 is directly behind the customs clearance exit.",
          memoryTag: "Officer David guided you to baggage carousel 04.",
          xp: 65
        }
      ]
    },
    {
      id: 'concierge_marcus',
      name: 'Concierge Marcus',
      role: 'Grand Marina 5-Star Hotel 🤵',
      location: 'Hotel Grand Lobby',
      avatar: '🤵',
      greeting: "Welcome to the Grand Marina Hotel, Miss Swathi! It is an absolute privilege to host you. How may I facilitate your stay today?",
      choices: [
        {
          text: "🏨 Hello Marcus! I have a reservation for the Penthouse Suite #808 with a skyline balcony view.",
          response: "A magnificent selection! Here is your gold RFID keycard #808. The elevator is to your left.",
          memoryTag: "Marcus upgraded your suite with complimentary fruit champagne.",
          xp: 85
        },
        {
          text: "🍳 Could you arrange an English Breakfast room service delivery for 8:00 AM tomorrow?",
          response: "Consider it arranged! Fresh scrambled eggs, toasted sourdough, and Earl Grey tea will arrive at 8 sharp.",
          memoryTag: "Breakfast room service was scheduled.",
          xp: 70
        },
        {
          text: "🧳 May the bellhop bring my check-in luggage up to Suite #808?",
          response: "Our bellhop team is already transporting your suitcases to your room, Miss Swathi.",
          memoryTag: "Marcus ensured VIP baggage handling.",
          xp: 65
        },
        {
          text: "🚗 Is valet parking available for my sports car in the private underground garage?",
          response: "Yes, our 24/7 valet service will park and charge your vehicle securely.",
          memoryTag: "Your car was parked in the VIP underground bay.",
          xp: 65
        }
      ]
    }
  ];

  // Physics Refs
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const playerState = useRef({
    x: 0,
    y: 0,
    z: 14,
    rotY: 0,
    vy: 0,
    isGrounded: true,
    speed: 0.22
  });

  const carState = useRef({
    x: 18,
    y: 0,
    z: 10,
    rotY: 0,
    speed: 0,
    maxSpeed: 0.85,
    accel: 0.024,
    friction: 0.96
  });

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
    scene.fog = new THREE.FogExp2(skyColors[timeOfDay], timeOfDay === 'day' ? 0.005 : 0.009);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 6, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = timeOfDay === 'night' ? 0.85 : timeOfDay === 'sunset' ? 1.1 : 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Realistic Lighting Setup
    const ambientColor = timeOfDay === 'sunset' ? 0xfde047 : timeOfDay === 'night' ? 0x1e293b : 0xfffaed;
    const ambient = new THREE.AmbientLight(ambientColor, timeOfDay === 'night' ? 0.4 : 1.1);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(timeOfDay === 'sunset' ? 0xf97316 : 0xfff3d6, timeOfDay === 'night' ? 0.2 : 2.2);
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
      map: createPolishedMarbleTexture(),
      roughness: 0.25,
      metalness: 0.15
    });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    worldGroup.add(ground);

    // 4-Lane Asphalt Highway
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.25 });
    const road = new THREE.Mesh(new THREE.PlaneGeometry(26, 280), roadMat);
    road.position.set(18, 0.02, 0);
    road.rotation.x = -Math.PI / 2;
    worldGroup.add(road);

    // Road Yellow Dashed Lines
    for (let y = -130; y <= 130; y += 12) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 6), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
      line.position.set(18, 0.03, y);
      line.rotation.x = -Math.PI / 2;
      worldGroup.add(line);
    }

    // Streetlamps with glowing lanterns & pointlights
    for (let z = -100; z <= 100; z += 35) {
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

    // --- GTA-STYLE GLOWING IN-WORLD INTERACTION BEACONS ---
    // 🟢 Green Beacon (Starbucks)
    const sbBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 0.15, 32),
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.55 })
    );
    sbBeacon.position.set(0, 0.08, -20);
    worldGroup.add(sbBeacon);

    // 🟡 Yellow Beacon (Airport Security)
    const secBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 0.15, 32),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.55 })
    );
    secBeacon.position.set(-68, 0.08, -10);
    worldGroup.add(secBeacon);

    // 🔵 Blue Beacon (Immigration Desk)
    const immBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 0.15, 32),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55 })
    );
    immBeacon.position.set(-50, 0.08, -18);
    worldGroup.add(immBeacon);

    // 🔴 Red Beacon (Hotel Lobby)
    const hotelBeacon = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 0.15, 32),
      new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.55 })
    );
    hotelBeacon.position.set(0, 0.08, 38);
    worldGroup.add(hotelBeacon);

    // --- REALISTIC STARBUCKS RESERVE CAFE (North) ---
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

    // 📺 3 GIANT HIGH-DEF OVERHEAD DIGITAL MENU TV SCREENS!
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

    // 👩‍🍳 3D PERSON 1: BARISTA HANA (Standing behind counter)
    const baristaHanaModel = createHumanoidModel(0x006241); // Green Apron
    baristaHanaModel.position.set(0, 0, -8.2);
    sbGroup.add(baristaHanaModel);

    worldGroup.add(sbGroup);

    // --- SINGAPORE CHANGI JEWEL & AIRPORT WING (West) ---
    const airportGroup = new THREE.Group();
    airportGroup.position.set(-50, 0, 0);

    const aFloor = new THREE.Mesh(new THREE.PlaneGeometry(60, 80), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.2 }));
    aFloor.rotation.x = -Math.PI / 2;
    aFloor.position.y = 0.06;
    airportGroup.add(aFloor);

    // 🌊 40m JEWEL CHANGI RAIN VORTEX WATERFALL DOME
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

    // 👮‍♂️ 3D PERSON 2: SECURITY OFFICER VIKRAM
    const officerVikramModel = createHumanoidModel(0xd97706);
    officerVikramModel.position.set(-18, 0, -10);
    airportGroup.add(officerVikramModel);

    // 🛂 3D PERSON 3: IMMIGRATION OFFICER DAVID
    const officerDavidModel = createHumanoidModel(0x1e1b4b);
    officerDavidModel.position.set(0, 0, -18);
    airportGroup.add(officerDavidModel);

    // ✈️ 3D REAL BOEING 787 DREAMLINER AIRPLANE
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

    // --- 3D DRIVABLE SPORTS SEDAN & LUXURY SUV ---
    const carGroup = new THREE.Group();
    const carBody = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, activeVehicle === 'luxury_suv' ? 1.3 : 0.95, 5.0),
      new THREE.MeshStandardMaterial({ color: activeVehicle === 'luxury_suv' ? 0x0f172a : 0xef4444, metalness: 0.85, roughness: 0.15 })
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

    // Wheels
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    for (let wx of [-1.3, 1.3]) {
      for (let wz of [-1.6, 1.6]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.35, 16), wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(wx, 0.42, wz);
        carGroup.add(wheel);
      }
    }

    carGroup.position.set(carState.current.x, 0, carState.current.z);
    scene.add(carGroup);

    // --- 3D PLAYABLE CHARACTER (Swathi) ---
    const playerGroup = createHumanoidModel(0xec4899); // Swathi's Rose Pink Blazer
    playerGroup.position.set(playerState.current.x, playerState.current.y, playerState.current.z);
    scene.add(playerGroup);

    // 4. Keyboard Controls
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
      if (e.code === 'KeyF') {
        const dist = Math.hypot(playerState.current.x - carState.current.x, playerState.current.z - carState.current.z);
        if (dist < 6 || isDriving) {
          sound.playClick();
          setIsDriving(prev => !prev);
        }
      }
      if (e.code === 'KeyE' && nearbyNpc) {
        sound.playClick();
        setActiveTelltaleDialogue(nearbyNpc);
        setSelectedChoice(null);
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
      const beaconGlow = 0.4 + Math.sin(tick * 0.08) * 0.25;
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

      if (Math.hypot(px - 0, pz - (-20)) < 6) foundNpc = telltaleNPCs[0]; // Hana
      else if (Math.hypot(px - (-68), pz - (-10)) < 6) foundNpc = telltaleNPCs[1]; // Vikram
      else if (Math.hypot(px - (-50), pz - (-18)) < 6) foundNpc = telltaleNPCs[2]; // David
      else if (Math.hypot(px - 0, pz - 38) < 6) foundNpc = telltaleNPCs[3]; // Marcus

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
        setCarSpeedKmH(Math.round(Math.abs(carState.current.speed) * 160));

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
        const speed = playerState.current.speed;
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
          tx + Math.sin(cameraAngleYaw.current) * 9,
          ty + 4.5,
          tz + Math.cos(cameraAngleYaw.current) * 9
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
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isDriving, timeOfDay, activeVehicle]);

  // Universal HTML5 Pointer-Captured Joystick Handlers (Desktop Mouse & Touch)
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
    cameraAngleYaw.current -= dx * 0.0035;
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Telltale Memory Notification Bar (Like "Hana will remember that...") */}
      {telltaleNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 border-2 border-amber-400 text-amber-200 px-6 py-3 rounded-2xl shadow-2xl font-mono text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>💭 {telltaleNotification}</span>
        </div>
      )}

      {/* Top Banner with Real-Time Sky, Smartphone Launcher & Sector Teleporters */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
              GTA 5 + Telltale Style 3D Real Life Simulator Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-3">
              🎮 GTA-Style Open World & Telltale Story Choices
            </h2>
            <p className="text-indigo-200/80 text-xs sm:text-sm max-w-2xl mt-0.5">
              100% Free Roam! Walk into glowing GTA beacons, interact directly with 3D people, pick your dialogue branches, drive sports cars, and fly through airport gates!
            </p>
          </div>

          {/* Quick Teleporters & Settings */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/90 p-2 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setTimeOfDay('day')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${timeOfDay === 'day' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
                title="Sunny Midday"
              >
                <Sun className="w-3.5 h-3.5" /> Day
              </button>
              <button
                onClick={() => setTimeOfDay('sunset')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${timeOfDay === 'sunset' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                title="Golden Sunset"
              >
                <Sunset className="w-3.5 h-3.5" /> Sunset
              </button>
              <button
                onClick={() => setTimeOfDay('night')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${timeOfDay === 'night' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                title="Midnight City Lights"
              >
                <Moon className="w-3.5 h-3.5" /> Night
              </button>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                playerState.current.x = 0;
                playerState.current.z = -20;
                setIsDriving(false);
                setCurrentLocationName('Starbucks Reserve Counter');
              }}
              className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer"
            >
              🟢 Starbucks Beacon
            </button>
            <button
              onClick={() => {
                sound.playClick();
                playerState.current.x = -68;
                playerState.current.z = -10;
                setIsDriving(false);
                setCurrentLocationName('Airport Security Checkpoint');
              }}
              className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer"
            >
              🟡 Security Beacon
            </button>
            <button
              onClick={() => {
                sound.playClick();
                playerState.current.x = -50;
                playerState.current.z = -18;
                setIsDriving(false);
                setCurrentLocationName('Passport Immigration Desk');
              }}
              className="px-3 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer"
            >
              🔵 Immigration Beacon
            </button>
            <button
              onClick={() => {
                sound.playClick();
                playerState.current.x = 0;
                playerState.current.z = 38;
                setIsDriving(false);
                setCurrentLocationName('Grand Marina Hotel Lobby');
              }}
              className="px-3 py-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer"
            >
              🔴 Hotel Beacon
            </button>
          </div>
        </div>
      </div>

      {/* 3D Viewport with Dual Joysticks & GTA Interaction Trigger */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-indigo-500/40 bg-slate-950 shadow-2xl">
        <div ref={mountRef} className="w-full h-[560px] cursor-grab active:cursor-grabbing bg-slate-950" />

        {/* Top-Left Avatar & Speedometer HUD */}
        <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-indigo-500/30 shadow-xl flex items-center gap-3 pointer-events-none">
          <div className="w-11 h-11 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center text-xl font-black">
            {isDriving ? (activeVehicle === 'luxury_suv' ? '🚙' : '🏎️') : '👑'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white">{playerName}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isDriving ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                {isDriving ? `DRIVING: ${carSpeedKmH} KM/H` : 'WALKING'}
              </span>
            </div>
            <p className="text-[11px] text-indigo-200 font-medium">
              {isDriving ? 'Highway Cruising (Speed Limit 45 mph)' : currentLocationName}
            </p>
          </div>
        </div>

        {/* 💬 GTA-STYLE INTERACTION BUTTON PROMPT (Appears when near beacon or person) */}
        {nearbyNpc && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 animate-bounce">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTelltaleDialogue(nearbyNpc);
                setSelectedChoice(null);
              }}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-2xl border-2 border-white flex items-center gap-2 cursor-pointer hover:scale-105 transition-all"
            >
              <MessageSquare className="w-5 h-5 text-slate-950" />
              <span>{nearbyNpc.avatar} Talk to {nearbyNpc.name} ({nearbyNpc.role}) [Press E or Tap]</span>
            </button>
          </div>
        )}

        {/* --- DUAL ON-SCREEN VIRTUAL JOYSTICKS (WORKS WITH BOTH MOUSE & MULTI-TOUCH) --- */}
        {/* Left Joystick: Movement */}
        <div
          onPointerDown={handleLeftPointerDown}
          onPointerMove={handleLeftPointerMove}
          onPointerUp={handleLeftPointerUp}
          onPointerCancel={handleLeftPointerUp}
          className="absolute bottom-6 left-6 w-36 h-36 rounded-full bg-slate-950/85 border-2 border-emerald-500/70 backdrop-blur-md flex items-center justify-center select-none z-30 shadow-2xl cursor-grab active:cursor-grabbing touch-none ring-4 ring-emerald-500/20"
        >
          <div className="absolute text-[10px] font-black text-emerald-400 uppercase tracking-widest top-2 pointer-events-none">
            Move Joystick
          </div>
          <div className="absolute top-1 text-emerald-500/40 text-[9px] font-mono pointer-events-none">▲</div>
          <div className="absolute bottom-1 text-emerald-500/40 text-[9px] font-mono pointer-events-none">▼</div>
          <div className="absolute left-1 text-emerald-500/40 text-[9px] font-mono pointer-events-none">◀</div>
          <div className="absolute right-1 text-emerald-500/40 text-[9px] font-mono pointer-events-none">▶</div>

          <div
            className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 border-2 border-white shadow-2xl pointer-events-none transition-transform duration-75 flex items-center justify-center text-slate-950 font-black text-lg shadow-emerald-500/50"
            style={{ transform: `translate(${leftStickPos.x}px, ${leftStickPos.y}px)` }}
          >
            🕹️
          </div>
        </div>

        {/* Right Joystick: 360° Camera Look */}
        <div
          onPointerDown={handleRightPointerDown}
          onPointerMove={handleRightPointerMove}
          onPointerUp={handleRightPointerUp}
          onPointerCancel={handleRightPointerUp}
          className="absolute bottom-6 right-6 w-36 h-36 rounded-full bg-slate-950/85 border-2 border-sky-500/70 backdrop-blur-md flex items-center justify-center select-none z-30 shadow-2xl cursor-grab active:cursor-grabbing touch-none ring-4 ring-sky-500/20"
        >
          <div className="absolute text-[10px] font-black text-sky-400 uppercase tracking-widest top-2 pointer-events-none">
            Camera 360°
          </div>
          <div className="absolute left-1 text-sky-500/40 text-[9px] font-mono pointer-events-none">◀</div>
          <div className="absolute right-1 text-sky-500/40 text-[9px] font-mono pointer-events-none">▶</div>

          <div
            className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-500 border-2 border-white shadow-2xl pointer-events-none transition-transform duration-75 flex items-center justify-center text-white font-black text-lg shadow-sky-500/50"
            style={{ transform: `translate(${rightStickPos.x}px, ${rightStickPos.y}px)` }}
          >
            🔄
          </div>
        </div>

        {/* Center Control HUD (Driving D-Pad & Quick Action Buttons) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
          {isDriving ? (
            <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md p-2 rounded-2xl border border-amber-500/50 shadow-2xl">
              <button
                onPointerDown={() => { keysPressed.current['KeyW'] = true; }}
                onPointerUp={() => { keysPressed.current['KeyW'] = false; }}
                onPointerCancel={() => { keysPressed.current['KeyW'] = false; }}
                className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs flex items-center gap-1 shadow cursor-pointer active:scale-95"
              >
                <ArrowUp className="w-4 h-4" /> GAS
              </button>
              <button
                onPointerDown={() => { keysPressed.current['KeyS'] = true; }}
                onPointerUp={() => { keysPressed.current['KeyS'] = false; }}
                onPointerCancel={() => { keysPressed.current['KeyS'] = false; }}
                className="px-3.5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl text-xs flex items-center gap-1 shadow cursor-pointer active:scale-95"
              >
                <ArrowDown className="w-4 h-4" /> BRAKE
              </button>
              <button
                onPointerDown={() => { keysPressed.current['KeyA'] = true; }}
                onPointerUp={() => { keysPressed.current['KeyA'] = false; }}
                onPointerCancel={() => { keysPressed.current['KeyA'] = false; }}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-xl text-xs shadow cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onPointerDown={() => { keysPressed.current['KeyD'] = true; }}
                onPointerUp={() => { keysPressed.current['KeyD'] = false; }}
                onPointerCancel={() => { keysPressed.current['KeyD'] = false; }}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-xl text-xs shadow cursor-pointer active:scale-95"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  confetti({ particleCount: 40, spread: 60 });
                }}
                className="px-3 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1 shadow cursor-pointer active:scale-95"
              >
                📢 HORN
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveVehicle(prev => prev === 'sports_sedan' ? 'luxury_suv' : 'sports_sedan');
                }}
                className="px-3 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-xs shadow cursor-pointer active:scale-95"
              >
                🔄 {activeVehicle === 'sports_sedan' ? 'SUV' : 'Sedan'}
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsDriving(false);
                }}
                className="px-3 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs flex items-center gap-1 shadow cursor-pointer active:scale-95"
              >
                <Car className="w-4 h-4" /> EXIT
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (playerState.current.isGrounded) {
                    playerState.current.vy = 0.26;
                    playerState.current.isGrounded = false;
                    sound.playClick();
                  }
                }}
                className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-2xl text-xs flex items-center gap-1.5 border border-indigo-400/50 cursor-pointer active:scale-95"
              >
                🦘 Jump [Space]
              </button>
              <button
                onClick={() => {
                  const dist = Math.hypot(playerState.current.x - carState.current.x, playerState.current.z - carState.current.z);
                  if (dist < 10) {
                    sound.playClick();
                    setIsDriving(true);
                  } else {
                    sound.playClick();
                    playerState.current.x = carState.current.x;
                    playerState.current.z = carState.current.z;
                    setIsDriving(true);
                  }
                }}
                className="px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-2xl text-xs flex items-center gap-1.5 border border-white cursor-pointer active:scale-95"
              >
                🚗 Drive Car [F]
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🎬 TELLTALE / WALKING DEAD STYLE INTERACTIVE CINEMATIC DIALOGUE HUD */}
      {activeTelltaleDialogue && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-3xl font-black">
                  {activeTelltaleDialogue.avatar}
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400">{activeTelltaleDialogue.location}</span>
                  <h3 className="text-2xl font-black text-white">{activeTelltaleDialogue.name}</h3>
                  <p className="text-xs text-slate-400">{activeTelltaleDialogue.role}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTelltaleDialogue(null)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                ✕ Exit Conversation
              </button>
            </div>

            {/* NPC Speech Line with Voice Playback */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{activeTelltaleDialogue.name} says:</span>
                <AudioSpeakButton text={activeTelltaleDialogue.greeting} label="Listen NPC" className="bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl" />
              </div>
              <p className="text-sm text-white font-medium leading-relaxed">
                "{activeTelltaleDialogue.greeting}"
              </p>
            </div>

            {/* Telltale 4-Way Dialogue Choice Wheel */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Choose Swathi's Spoken Response:</span>
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
                    <span className="text-[10px] opacity-75 font-mono">+{choice.xp} XP • Choice #{idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* If choice selected, show response and live microphone practice */}
            {selectedChoice && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 space-y-3 animate-fadeIn">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase">{activeTelltaleDialogue.name}'s Reply:</span>
                  <p className="text-xs text-white">"{selectedChoice.response}"</p>
                </div>

                <div className="border-t border-slate-800 pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">Practice Pronouncing Your Response:</span>
                    <AudioSpeakButton text={selectedChoice.text} label="Listen Target" className="bg-sky-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl" />
                  </div>
                  <VoiceSpeechPractice
                    targetPhrase={selectedChoice.text}
                    accentColor="emerald"
                    onSuccess={() => {
                      sound.playSuccess();
                      confetti({ particleCount: 90, spread: 80 });
                      onAddXp(selectedChoice.xp, `Mastered Spoken Choice with ${activeTelltaleDialogue.name}! 🎤✨`);
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
