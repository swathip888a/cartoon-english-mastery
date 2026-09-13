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
  Film
} from 'lucide-react';

interface UltimateRealOpenWorldEngineProps {
  onAddXp: (amount: number, reason: string) => void;
  onNavigateTab?: (tabName: string) => void;
}

type TimeOfDay = 'day' | 'sunset' | 'night' | 'neon';
type VehicleType = 'sports_sedan' | 'luxury_suv';

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

export const UltimateRealOpenWorldEngine: React.FC<UltimateRealOpenWorldEngineProps> = ({ onAddXp }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Player & Simulation State
  const [playerName] = useState<string>('Swathi');
  const [isDriving, setIsDriving] = useState<boolean>(false);
  const [carSpeedKmH, setCarSpeedKmH] = useState<number>(0);
  const [currentLocationName, setCurrentLocationName] = useState<string>('Kyoto Starbucks Reserve & City Plaza');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [activeVehicle, setActiveVehicle] = useState<VehicleType>('sports_sedan');

  // Cinematic Story Walkthrough State
  const [activeStoryScene, setActiveStoryScene] = useState<'none' | 'starbucks_movie' | 'airport_movie'>('none');
  const [sbStoryStep, setSbStoryStep] = useState<number>(1);
  const [airportStoryStep, setAirportStoryStep] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash'>('card');
  const [paymentDone, setPaymentDone] = useState<boolean>(false);

  // Real-World Interactive Modals
  const [showOverheadMenuModal, setShowOverheadMenuModal] = useState<boolean>(false);
  const [showFidsModal, setShowFidsModal] = useState<boolean>(false);
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [showHotelModal, setShowHotelModal] = useState<boolean>(false);
  const [showAirportStagesModal, setShowAirportStagesModal] = useState<boolean>(false);
  const [showStarbucksCustomizerModal, setShowStarbucksCustomizerModal] = useState<boolean>(false);
  const [showSmartphoneModal, setShowSmartphoneModal] = useState<boolean>(false);
  const [showFashionModal, setShowFashionModal] = useState<boolean>(false);
  const [showInflightModal, setShowInflightModal] = useState<boolean>(false);

  // Starbucks Custom Recipe Builder State
  const [drinkBase, setDrinkBase] = useState<string>('Signature Hot Chocolate');
  const [drinkSize, setDrinkSize] = useState<string>('Short (8oz)');
  const [milkType, setMilkType] = useState<string>('Oat Milk (Oatly Barista)');
  const [espressoType, setEspressoType] = useState<string>('Blonde Espresso Shot (+1 Shot)');
  const [syrupPumps, setSyrupPumps] = useState<number>(3);
  const [syrupFlavor, setSyrupFlavor] = useState<string>('Vanilla Syrup');
  const [toppings, setToppings] = useState<string[]>(['Vanilla Sweet Cold Foam']);
  const [warmedFood, setWarmedFood] = useState<string>('Tomato & Mozzarella Focaccia Panini (Warmed Up 🔥)');

  // Consumables & Gameplay Metrics
  const [coffeeLiquidLevel, setCoffeeLiquidLevel] = useState<number>(100);
  const [paniniBitesLeft, setPaniniBitesLeft] = useState<number>(4);
  const [hasHotelKeycard, setHasHotelKeycard] = useState<boolean>(false);
  const [hasBoardingPass, setHasBoardingPass] = useState<boolean>(false);
  const [outfitColor, setOutfitColor] = useState<number>(0xec4899); // Rose Pink

  // --- DUAL ON-SCREEN VIRTUAL JOYSTICK STATE (MOUSE & TOUCH) ---
  const [leftStickPos, setLeftStickPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const leftStickVector = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const leftStickActive = useRef<boolean>(false);

  const [rightStickPos, setRightStickPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const rightStickActive = useRef<boolean>(false);
  const cameraAngleYaw = useRef<number>(0);

  // Dynamic Natural English Sentence Generated from Customizer
  const generatedStarbucksOrder = `Hi! Can I please get a ${drinkSize.split(' ')[0]} ${drinkBase} with ${milkType.split(' ')[0]} Milk, ${espressoType.includes('Blonde') ? 'a Blonde Espresso Shot' : 'Decaf'}, and ${syrupPumps} pumps of ${syrupFlavor.split(' ')[0]}, topped with ${toppings.join(' and ')}, and a ${warmedFood.split('(')[0].trim()} warmed up?`;

  const airportImmigrationScript = "Good afternoon, Officer. I am here in Singapore for a five-day vacation and cultural tour. I will be staying at Marina Bay Sands.";
  const hotelCheckinScript = "Hello! I have a reservation under the name Swathi. Could I please have a high-floor room with a skyline view and two keycards?";
  const inflightMealScript = "Excuse me! Could I please have the Creamy Truffle Pasta for dinner, a bottle of sparkling water with lemon, and an extra blanket?";

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
    
    // Dynamic Sky Color based on timeOfDay
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

    // Warm cafe pendant lights
    const warmLight1 = new THREE.PointLight(0xf59e0b, 3.5, 30);
    warmLight1.position.set(-5, 7, -24);
    scene.add(warmLight1);

    const warmLight2 = new THREE.PointLight(0x10b981, 3.5, 30);
    warmLight2.position.set(5, 7, -24);
    scene.add(warmLight2);

    // 3. World Group Architecture
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Ground Pavement (Polished Granite/Marble)
    const groundMat = new THREE.MeshStandardMaterial({
      map: createPolishedMarbleTexture(),
      roughness: 0.25,
      metalness: 0.15
    });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(280, 280), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    worldGroup.add(ground);

    // 4-Lane Asphalt Highway
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.25 });
    const road = new THREE.Mesh(new THREE.PlaneGeometry(26, 260), roadMat);
    road.position.set(18, 0.02, 0);
    road.rotation.x = -Math.PI / 2;
    worldGroup.add(road);

    // Road Yellow Dashed Lines
    for (let y = -120; y <= 120; y += 12) {
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

    // Modern City Skyscrapers
    const buildingColors = [0x0f172a, 0x1e1b4b, 0x1e293b, 0x090d16];
    for (let i = 0; i < 10; i++) {
      const h = 30 + Math.random() * 45;
      const bMesh = new THREE.Mesh(
        new THREE.BoxGeometry(16, h, 16),
        new THREE.MeshStandardMaterial({ color: buildingColors[i % buildingColors.length], roughness: 0.2, metalness: 0.6 })
      );
      bMesh.position.set(48 + (i % 2) * 18, h / 2, -90 + i * 20);
      worldGroup.add(bMesh);
    }

    // --- REALISTIC STARBUCKS RESERVE CAFE (North) ---
    const sbGroup = new THREE.Group();
    sbGroup.position.set(0, 0, -25);

    // Real Hardwood Floor
    const sbFloorMat = new THREE.MeshStandardMaterial({
      map: createLuxuryWoodTexture(),
      roughness: 0.25,
      metalness: 0.1
    });
    const sbFloor = new THREE.Mesh(new THREE.PlaneGeometry(36, 24), sbFloorMat);
    sbFloor.rotation.x = -Math.PI / 2;
    sbFloor.position.y = 0.05;
    sbGroup.add(sbFloor);

    // Back Ceramic Wall
    const sbBackWall = new THREE.Mesh(new THREE.BoxGeometry(36, 10, 1), new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.2 }));
    sbBackWall.position.set(0, 5, -12);
    sbGroup.add(sbBackWall);

    // Main Mahogany Counter
    const sbCounter = new THREE.Mesh(
      new THREE.BoxGeometry(24, 2.4, 4.5),
      new THREE.MeshStandardMaterial({ color: 0x3e2312, roughness: 0.2, metalness: 0.15 })
    );
    sbCounter.position.set(0, 1.2, -6);
    sbCounter.castShadow = true;
    sbGroup.add(sbCounter);

    // Emerald Green Siren Ribbon Trim
    const sbTrim = new THREE.Mesh(
      new THREE.BoxGeometry(24.1, 0.45, 4.6),
      new THREE.MeshStandardMaterial({ color: 0x006241, roughness: 0.3 })
    );
    sbTrim.position.set(0, 2.2, -6);
    sbGroup.add(sbTrim);

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

    // Mastrena II Espresso Machine
    const espMachine = new THREE.Mesh(
      new THREE.BoxGeometry(4.8, 2.0, 2.6),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.1 })
    );
    espMachine.position.set(-6, 3.2, -6);
    sbGroup.add(espMachine);

    // Coffee Steam Particle System
    const steamCount = 60;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = -6 + (Math.random() - 0.5) * 1.5;
      steamPositions[i * 3 + 1] = 4.2 + Math.random() * 2.5;
      steamPositions[i * 3 + 2] = -6 + (Math.random() - 0.5) * 1.5;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.35,
      transparent: true,
      opacity: 0.35
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    sbGroup.add(steamParticles);

    // Bakery Showcase with Paninis
    const bakeryShowcase = new THREE.Mesh(
      new THREE.BoxGeometry(6.5, 2.2, 2.8),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, roughness: 0.05 })
    );
    bakeryShowcase.position.set(6, 3.3, -6);
    sbGroup.add(bakeryShowcase);

    // Barista Hana NPC
    const barista = new THREE.Group();
    barista.add(new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffedd5 })));
    const bBody = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.55, 1.3, 16), new THREE.MeshStandardMaterial({ color: 0x006241 }));
    bBody.position.y = -1.1;
    barista.add(bBody);
    barista.position.set(0, 2.5, -8.4);
    sbGroup.add(barista);

    worldGroup.add(sbGroup);

    // --- SINGAPORE CHANGI JEWEL & RAIN VORTEX AIRPORT (West Wing) ---
    const airportGroup = new THREE.Group();
    airportGroup.position.set(-50, 0, 0);

    // Terminal Floor
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

    // Cascading 1200-Particle Rain Vortex Waterfall
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

    // Giant Airport Live Flight Board (FIDS) Screen
    const fidsTv = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 6),
      new THREE.MeshBasicMaterial({ map: createAirportFidsTexture() })
    );
    fidsTv.position.set(0, 10, -22);
    airportGroup.add(fidsTv);

    // DigiYatra & Security X-Ray Gates
    const dyGate = new THREE.Mesh(
      new THREE.BoxGeometry(6, 4, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.7 })
    );
    dyGate.position.set(-15, 2, -10);
    airportGroup.add(dyGate);

    // Luggage Carousel
    const carousel = new THREE.Mesh(
      new THREE.TorusGeometry(6, 1.3, 12, 24),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3 })
    );
    carousel.rotation.x = Math.PI / 2;
    carousel.position.set(15, 0.6, -10);
    airportGroup.add(carousel);

    worldGroup.add(airportGroup);

    // --- GRAND MARINA 5-STAR LUXURY HOTEL (East Wing) ---
    const hotelGroup = new THREE.Group();
    hotelGroup.position.set(0, 0, 35);

    // Luxury Red Carpet Lobby Floor
    const hFloor = new THREE.Mesh(new THREE.PlaneGeometry(40, 24), new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.4 }));
    hFloor.rotation.x = -Math.PI / 2;
    hFloor.position.y = 0.06;
    hotelGroup.add(hFloor);

    // Hotel Golden Reception Desk
    const hDesk = new THREE.Mesh(new THREE.BoxGeometry(18, 2.4, 3.5), new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 }));
    hDesk.position.set(0, 1.2, 6);
    hotelGroup.add(hDesk);

    // Hotel Signboard
    const hSign = new THREE.Mesh(new THREE.BoxGeometry(20, 2.5, 0.4), new THREE.MeshStandardMaterial({ color: 0x450a0a, metalness: 0.9 }));
    hSign.position.set(0, 6.5, 8);
    hotelGroup.add(hSign);

    // Hotel Concierge Marcus NPC
    const concierge = new THREE.Group();
    concierge.add(new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffedd5 })));
    const cBody = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.55, 1.3, 16), new THREE.MeshStandardMaterial({ color: 0x1e1b4b }));
    cBody.position.y = -1.1;
    concierge.add(cBody);
    concierge.position.set(0, 2.5, 7.8);
    hotelGroup.add(concierge);

    worldGroup.add(hotelGroup);

    // --- 3D DRIVABLE SPORTS SEDAN & LUXURY SUV ---
    const carGroup = new THREE.Group();
    // Chassis
    const carBody = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, activeVehicle === 'luxury_suv' ? 1.3 : 0.95, 5.0),
      new THREE.MeshStandardMaterial({ color: activeVehicle === 'luxury_suv' ? 0x0f172a : 0xef4444, metalness: 0.85, roughness: 0.15 })
    );
    carBody.position.y = activeVehicle === 'luxury_suv' ? 0.9 : 0.7;
    carBody.castShadow = true;
    carGroup.add(carBody);

    // Glass Canopy
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

    // Headlight Spotlights
    const hl1 = new THREE.SpotLight(0xfffaed, timeOfDay === 'night' ? 5.0 : 3.5, 40, Math.PI / 6);
    hl1.position.set(-0.9, 0.75, 2.5);
    hl1.target.position.set(-0.9, 0, 18);
    carGroup.add(hl1);
    carGroup.add(hl1.target);

    const hl2 = new THREE.SpotLight(0xfffaed, timeOfDay === 'night' ? 5.0 : 3.5, 40, Math.PI / 6);
    hl2.position.set(0.9, 0.75, 2.5);
    hl2.target.position.set(0.9, 0, 18);
    carGroup.add(hl2);
    carGroup.add(hl2.target);

    carGroup.position.set(carState.current.x, 0, carState.current.z);
    scene.add(carGroup);

    // --- 3D PLAYABLE CHARACTER (Swathi) ---
    const playerGroup = new THREE.Group();
    // Head
    const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.52, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffedd5 }));
    pHead.position.y = 2.05;
    pHead.castShadow = true;
    playerGroup.add(pHead);

    // Hair
    const pHair = new THREE.Mesh(new THREE.SphereGeometry(0.56, 16, 16), new THREE.MeshStandardMaterial({ color: 0x3b1d11 }));
    pHair.position.set(0, 2.15, -0.06);
    playerGroup.add(pHair);

    // Torso Blazer
    const pTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.48, 1.05, 16), new THREE.MeshStandardMaterial({ color: outfitColor }));
    pTorso.position.y = 1.25;
    pTorso.castShadow = true;
    playerGroup.add(pTorso);

    // Legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const pLeftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.8, 8), legMat);
    pLeftLeg.position.set(-0.22, 0.4, 0);
    playerGroup.add(pLeftLeg);

    const pRightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.8, 8), legMat);
    pRightLeg.position.set(0.22, 0.4, 0);
    playerGroup.add(pRightLeg);

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

    // 5. 60 FPS Game Loop with Particle Animation
    let animId: number;
    let tick = 0;

    const animate = () => {
      tick++;

      // Animate Waterfall Particles
      if (waterfallParticles) {
        const positions = waterfallParticles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < waterfallCount; i++) {
          positions[i * 3 + 1] -= 0.35; // fall down
          if (positions[i * 3 + 1] < 0) {
            positions[i * 3 + 1] = 21; // reset to top of dome
          }
        }
        waterfallParticles.geometry.attributes.position.needsUpdate = true;
      }

      // Animate Coffee Steam Particles
      if (steamParticles) {
        const positions = steamParticles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < steamCount; i++) {
          positions[i * 3 + 1] += 0.03; // rise up
          if (positions[i * 3 + 1] > 7.0) {
            positions[i * 3 + 1] = 4.2; // reset
          }
        }
        steamParticles.geometry.attributes.position.needsUpdate = true;
      }

      // Read Virtual Joystick + Keys for movement
      const joyX = leftStickVector.current.x;
      const joyY = leftStickVector.current.y;

      if (isDriving) {
        // --- DRIVING VEHICLE PHYSICS ---
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

        // Camera chase
        const cx = carState.current.x;
        const cz = carState.current.z;
        camera.position.set(
          cx - Math.sin(carState.current.rotY) * 10,
          5.2,
          cz - Math.cos(carState.current.rotY) * 10
        );
        camera.lookAt(cx, 1.6, cz);

      } else {
        // --- ON FOOT WALKING PHYSICS ---
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

          pLeftLeg.rotation.x = Math.sin(tick * 0.22) * 0.65;
          pRightLeg.rotation.x = -Math.sin(tick * 0.22) * 0.65;
        } else {
          pLeftLeg.rotation.x = 0;
          pRightLeg.rotation.x = 0;
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

        // Camera Follow
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
  }, [isDriving, timeOfDay, activeVehicle, outfitColor]);

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
      {/* Top Banner with Real-Time Sky, Smartphone Launcher & Cinematic Movie Modes */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
              Ultimate 3D Real Open-World Life Simulator & Movie Story Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-3">
              🎬 Real Life RPG: Walk, Check Menus, Order, Pay & Eat!
            </h2>
            <p className="text-indigo-200/80 text-xs sm:text-sm max-w-2xl mt-0.5">
              100% Free Roam! Experience real Starbucks ordering with card/cash payment & sitting, airport departure journey & Jewel waterfall, in-flight Boeing 787 dining, and luxury hotel suite!
            </p>
          </div>

          {/* Time of Day & Cinematic Quick Play buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/90 p-2 rounded-2xl border border-slate-800">
            {/* Day/Night Preset Selector */}
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

            {/* Cinematic Movie Mode Buttons */}
            <button
              onClick={() => {
                sound.playClick();
                setActiveStoryScene('starbucks_movie');
                setSbStoryStep(1);
                playerState.current.x = 0;
                playerState.current.z = -20;
                setIsDriving(false);
                setCurrentLocationName('Starbucks Reserve Kyoto & Roastery');
              }}
              className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
            >
              <Film className="w-4 h-4" /> 🎬 Starbucks Movie Roleplay
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveStoryScene('airport_movie');
                setAirportStoryStep(1);
                playerState.current.x = -50;
                playerState.current.z = 0;
                setIsDriving(false);
                setCurrentLocationName('Singapore Jewel Changi Rain Vortex 🛫');
              }}
              className="px-3 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
            >
              <Film className="w-4 h-4" /> 🎬 Airport Movie Journey
            </button>

            {/* In-Game Smartphone Button */}
            <button
              onClick={() => setShowSmartphoneModal(true)}
              className="px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" /> 📱 Phone
            </button>
          </div>
        </div>
      </div>

      {/* 🎬 CINEMATIC STARBUCKS MOVIE RPG EXPERIENCE */}
      {activeStoryScene === 'starbucks_movie' && (
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-2 border-emerald-500/60 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">☕</span>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Cinematic RPG Story Mode</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Full Starbucks Experience: Walk In ➔ Order ➔ Pay ➔ Sit & Eat 🥪</h3>
              </div>
            </div>
            <button
              onClick={() => setActiveStoryScene('none')}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
            >
              ✕ Exit Movie Mode
            </button>
          </div>

          {/* Step Progress Bar */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className={`p-2.5 rounded-xl font-bold border transition-all ${sbStoryStep === 1 ? 'bg-emerald-500 text-slate-950 border-white shadow' : sbStoryStep > 1 ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
              1. Check 4K Menus
            </div>
            <div className={`p-2.5 rounded-xl font-bold border transition-all ${sbStoryStep === 2 ? 'bg-emerald-500 text-slate-950 border-white shadow' : sbStoryStep > 2 ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
              2. Speak Order
            </div>
            <div className={`p-2.5 rounded-xl font-bold border transition-all ${sbStoryStep === 3 ? 'bg-emerald-500 text-slate-950 border-white shadow' : sbStoryStep > 3 ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
              3. Pay Card/Cash
            </div>
            <div className={`p-2.5 rounded-xl font-bold border transition-all ${sbStoryStep === 4 ? 'bg-emerald-500 text-slate-950 border-white shadow' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
              4. Sit & Enjoy Tasting
            </div>
          </div>

          {/* Step 1: Check Overhead Menus */}
          {sbStoryStep === 1 && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  👀
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">Step 1: Swathi looks up at the 3 Giant 4K Overhead Digital Menu TVs</h4>
                  <p className="text-xs text-emerald-200">
                    "Take a moment to browse the authentic Starbucks Reserve board. Notice the size choices (Short 8oz, Tall 12oz, Grande 16oz, Venti 20oz) and specialty milk substitutions."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400 block mb-1">☕ Espresso Classics</span>
                  <div>Caffè Latte — $4.95</div>
                  <div>Caramel Macchiato — $5.45</div>
                  <div>Blonde Vanilla Latte — $5.25</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="font-bold text-teal-400 block mb-1">🍫 Cocoa & Cold Foam</span>
                  <div className="text-emerald-300 font-bold">Signature Hot Choc — $4.85 ⭐</div>
                  <div>White Hot Choc — $4.95</div>
                  <div>Sweet Cold Foam Cloud — +$1.25</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="font-bold text-pink-400 block mb-1">🥪 Warmed Paninis</span>
                  <div className="text-amber-300 font-bold">Tomato Mozzarella — $6.45 🔥</div>
                  <div>Bacon Gouda Roll — $5.95</div>
                  <div>All-Butter Croissant — $3.85</div>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setSbStoryStep(2);
                }}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl shadow-xl text-xs uppercase tracking-wider cursor-pointer"
              >
                ➔ Next: Walk to Cashier Counter & Order
              </button>
            </div>
          )}

          {/* Step 2: Speak Order */}
          {sbStoryStep === 2 && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  👩‍💼
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Barista Hana:</span>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-bold">Register 01</span>
                  </div>
                  <p className="text-xs text-emerald-100">
                    "Hi there! Welcome to Starbucks Reserve. What can I get started for you today, Swathi?"
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Speak Your Full Real-World Order:</span>
                  <AudioSpeakButton text={generatedStarbucksOrder} label="Listen Target" className="bg-emerald-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl" />
                </div>
                <p className="text-xs text-white font-semibold">"{generatedStarbucksOrder}"</p>
                <VoiceSpeechPractice
                  targetPhrase={generatedStarbucksOrder}
                  accentColor="emerald"
                  onSuccess={() => {
                    sound.playSuccess();
                    onAddXp(60, "Spoke Perfect Custom Starbucks Order! 🎤✨");
                  }}
                />
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setSbStoryStep(3);
                }}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl shadow-xl text-xs uppercase tracking-wider cursor-pointer"
              >
                ➔ Next: Pay at POS Terminal ($11.30)
              </button>
            </div>
          )}

          {/* Step 3: Pay with Card / Apple Pay / Cash */}
          {sbStoryStep === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white text-sm">Starbucks POS Touchscreen Terminal</span>
                  <span className="text-xs font-mono font-bold text-amber-400">Total: $11.30</span>
                </div>

                <p className="text-xs text-slate-300">
                  Choose how Swathi pays for her drink and warmed focaccia panini:
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setPaymentMethod('card');
                      sound.playClick();
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold ${paymentMethod === 'card' ? 'bg-amber-500 text-slate-950 border-white shadow' : 'bg-slate-900 text-slate-300 border-slate-800'}`}
                  >
                    <CreditCard className="w-5 h-5" /> 💳 Tap Card
                  </button>
                  <button
                    onClick={() => {
                      setPaymentMethod('apple_pay');
                      sound.playClick();
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold ${paymentMethod === 'apple_pay' ? 'bg-sky-500 text-slate-950 border-white shadow' : 'bg-slate-900 text-slate-300 border-slate-800'}`}
                  >
                    <Smartphone className="w-5 h-5" /> 📱 Apple Pay
                  </button>
                  <button
                    onClick={() => {
                      setPaymentMethod('cash');
                      sound.playClick();
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold ${paymentMethod === 'cash' ? 'bg-emerald-500 text-slate-950 border-white shadow' : 'bg-slate-900 text-slate-300 border-slate-800'}`}
                  >
                    <Banknote className="w-5 h-5" /> 💵 Cash ($20)
                  </button>
                </div>

                <button
                  onClick={() => {
                    sound.playSuccess();
                    setPaymentDone(true);
                    confetti({ particleCount: 70, spread: 70 });
                    onAddXp(50, `Paid $11.30 via ${paymentMethod.toUpperCase()}! 💳✨`);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-lg active:scale-95"
                >
                  ✓ Tap & Complete Payment (BEEP!)
                </button>
              </div>

              {paymentDone && (
                <button
                  onClick={() => {
                    sound.playClick();
                    setSbStoryStep(4);
                  }}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl shadow-xl text-xs uppercase tracking-wider cursor-pointer animate-pulse"
                >
                  ➔ Pick Up Order & Sit at Velvet Table
                </button>
              )}
            </div>
          )}

          {/* Step 4: Sit & Enjoy Tasting */}
          {sbStoryStep === 4 && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  🪑
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">Step 4: Swathi is seated in the cozy velvet armchair by the window</h4>
                  <p className="text-xs text-emerald-200">
                    "Hold your warm cup, take sips, and enjoy your crispy heated mozzarella focaccia panini. Listen to the cafe background jazz."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Sip Coffee */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-2.5">
                  <div className="flex justify-between font-bold text-emerald-300">
                    <span>☕ Hot Chocolate: {coffeeLiquidLevel}%</span>
                    <button onClick={() => setCoffeeLiquidLevel(100)} className="text-[10px] text-slate-400">Refill</button>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-700 to-amber-500 h-full transition-all" style={{ width: `${coffeeLiquidLevel}%` }} />
                  </div>
                  <button
                    disabled={coffeeLiquidLevel <= 0}
                    onClick={() => {
                      sound.playClick();
                      setCoffeeLiquidLevel(prev => Math.max(0, prev - 25));
                      if (coffeeLiquidLevel - 25 <= 0) {
                        confetti({ particleCount: 80, spread: 80 });
                        onAddXp(50, "Finished your entire cup of hot chocolate! ☕✨");
                      }
                    }}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black rounded-xl shadow cursor-pointer"
                  >
                    ☕ Take a Sip (Gulp!)
                  </button>
                </div>

                {/* Eat Panini */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-2.5">
                  <div className="flex justify-between font-bold text-amber-300">
                    <span>🥪 Panini: {paniniBitesLeft} Bites Left</span>
                    <button onClick={() => setPaniniBitesLeft(4)} className="text-[10px] text-slate-400">New Order</button>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all" style={{ width: `${(paniniBitesLeft / 4) * 100}%` }} />
                  </div>
                  <button
                    disabled={paniniBitesLeft <= 0}
                    onClick={() => {
                      sound.playClick();
                      setPaniniBitesLeft(prev => Math.max(0, prev - 1));
                      if (paniniBitesLeft - 1 <= 0) {
                        confetti({ particleCount: 80, spread: 80 });
                        onAddXp(50, "Finished delicious warm Tomato Mozzarella Panini! 🥪✨");
                      }
                    }}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black rounded-xl shadow cursor-pointer"
                  >
                    🥪 Take a Bite (Crunch!)
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playSuccess();
                  confetti({ particleCount: 100, spread: 80 });
                  setActiveStoryScene('none');
                  onAddXp(100, "Completed Full Starbucks Real Life Experience! ☕🎉");
                }}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black rounded-2xl shadow-2xl text-xs uppercase tracking-wider cursor-pointer"
              >
                🎉 Complete Starbucks Story (+100 XP) ➔ Return to World
              </button>
            </div>
          )}
        </div>
      )}

      {/* 🎬 CINEMATIC AIRPORT MOVIE RPG JOURNEY */}
      {activeStoryScene === 'airport_movie' && (
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border-2 border-sky-500/60 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-sky-500/30 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛫</span>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-400">Cinematic Airport Movie Journey</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Full International Flight: DigiYatra ➔ Baggage ➔ Security ➔ Waterfall ➔ Boarding ✈️</h3>
              </div>
            </div>
            <button
              onClick={() => setActiveStoryScene('none')}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
            >
              ✕ Exit Movie Mode
            </button>
          </div>

          {/* Airport Movie Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-sky-500/30 space-y-2">
              <span className="font-bold text-sky-400 block">1. DigiYatra Face Scan</span>
              <p className="text-slate-300">Facial biometric scan at terminal entrance gate.</p>
              <button
                onClick={() => {
                  sound.playSuccess();
                  onAddXp(40, "DigiYatra Facial Scan Verified! 📸");
                }}
                className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl"
              >
                📸 Scan Face
              </button>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-sky-500/30 space-y-2">
              <span className="font-bold text-amber-400 block">2. Baggage Weigh-In</span>
              <p className="text-slate-300">Weigh luggage (18.4 kg) & print SQ 529 pass.</p>
              <button
                onClick={() => {
                  sound.playSuccess();
                  setHasBoardingPass(true);
                  onAddXp(40, "Boarding Pass Printed Seat 14A! 🎫");
                }}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
              >
                🎫 Print Pass
              </button>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-sky-500/30 space-y-2">
              <span className="font-bold text-emerald-400 block">3. TSA Metal Arch</span>
              <p className="text-slate-300">Trays for laptop & liquids, walk through scanner.</p>
              <button
                onClick={() => {
                  sound.playSuccess();
                  onAddXp(40, "Security Screening Cleared! 🛡️");
                }}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl"
              >
                🛡️ Walk Arch
              </button>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-sky-500/30 space-y-2">
              <span className="font-bold text-pink-400 block">4. Changi Waterfall</span>
              <p className="text-slate-300">40m Rain Vortex & board Boeing 787.</p>
              <button
                onClick={() => {
                  sound.playSuccess();
                  confetti({ particleCount: 100, spread: 80 });
                  onAddXp(80, "Boarded Boeing 787 to Singapore! 🛫✨");
                }}
                className="w-full py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl"
              >
                🛫 Board Flight
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3D Viewport with Dual Joysticks & Interactive Controls */}
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

      {/* Voice Practice Box */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 rounded-3xl border border-emerald-500/40 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-pink-400" />
            <h3 className="font-bold text-white text-base">Live Spoken English Roleplay Order:</h3>
          </div>
          <AudioSpeakButton
            text={generatedStarbucksOrder}
            label="Listen Target Pronunciation"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-xl shadow cursor-pointer"
          />
        </div>

        <p className="text-sm text-emerald-100 font-semibold leading-relaxed">
          "{generatedStarbucksOrder}"
        </p>

        <VoiceSpeechPractice
          targetPhrase={generatedStarbucksOrder}
          phraseMeaning="Real Custom Starbucks Order Sentence with exact modifiers and bakery items"
          accentColor="emerald"
          onSuccess={() => {
            sound.playSuccess();
            confetti({ particleCount: 100, spread: 80 });
            onAddXp(100, "Mastered Custom Live Starbucks Spoken Order! ☕🎤✨");
          }}
        />
      </div>

      {/* 📱 INTERACTIVE IN-GAME SMARTPHONE (SwathiPhone 15 Pro) */}
      {showSmartphoneModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border-4 border-slate-700 rounded-[40px] max-w-md w-full p-6 shadow-2xl space-y-6 relative overflow-hidden text-white">
            <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto -mt-2 mb-2 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-800" />
            </div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-pink-400" />
                <span className="font-black text-sm">SwathiPhone 15 Pro</span>
              </div>
              <button
                onClick={() => setShowSmartphoneModal(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <button
                onClick={() => {
                  setShowSmartphoneModal(false);
                  setActiveStoryScene('starbucks_movie');
                  setSbStoryStep(1);
                }}
                className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex flex-col items-center gap-2 hover:scale-105 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center text-xl font-bold">
                  ☕
                </div>
                <span className="font-bold text-emerald-300">Starbucks RPG</span>
              </button>

              <button
                onClick={() => {
                  setShowSmartphoneModal(false);
                  setActiveStoryScene('airport_movie');
                  setAirportStoryStep(1);
                }}
                className="p-4 bg-sky-950/60 border border-sky-500/40 rounded-2xl flex flex-col items-center gap-2 hover:scale-105 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center text-xl font-bold">
                  ✈️
                </div>
                <span className="font-bold text-sky-300">Airport Journey</span>
              </button>

              <button
                onClick={() => {
                  setShowSmartphoneModal(false);
                  setShowHotelModal(true);
                }}
                className="p-4 bg-rose-950/60 border border-rose-500/40 rounded-2xl flex flex-col items-center gap-2 hover:scale-105 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-slate-950 flex items-center justify-center text-xl font-bold">
                  🏨
                </div>
                <span className="font-bold text-rose-300">Hotel Key</span>
              </button>
            </div>

            <div className="p-4 bg-gradient-to-r from-sky-900 to-indigo-950 rounded-2xl border border-sky-500/40 space-y-2 text-xs">
              <div className="flex items-center justify-between text-sky-300 font-bold">
                <span>SINGAPORE AIRLINES (SQ 529)</span>
                <QrCode className="w-5 h-5" />
              </div>
              <div className="flex justify-between font-mono">
                <div>PASSENGER: SWATHI P.</div>
                <div>SEAT: 14A</div>
              </div>
              <div className="text-[10px] text-sky-200">GATE B12 • BOARDING 14:15 • CHANGI JEWEL TERMINAL 3</div>
            </div>
          </div>
        </div>
      )}

      {/* 🏨 GRAND 5-STAR HOTEL MODAL */}
      {showHotelModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border-2 border-rose-500/60 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-rose-400">Grand Marina 5-Star Luxury Resort</span>
                <h3 className="text-2xl font-black text-white">Hotel Reception & Penthouse Suite #808 🏨</h3>
              </div>
              <button
                onClick={() => setShowHotelModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                ✕ Back to World
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-rose-500/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                🤵
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">Concierge Marcus:</span>
                  <span className="text-[10px] px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded-full font-bold">Front Desk</span>
                </div>
                <p className="text-xs text-rose-100">
                  "Welcome to the Grand Marina Hotel, Miss Swathi! May I assist you with checking in or carrying your luggage up to your Penthouse Suite?"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <Key className="w-4 h-4" /> RFID Keycard Status
                </div>
                <div className={`p-3 rounded-xl border ${hasHotelKeycard ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                  {hasHotelKeycard ? '✓ Keycard #808 Active (Penthouse Skyline Floor)' : 'Keycard not yet issued'}
                </div>
                <button
                  onClick={() => {
                    sound.playSuccess();
                    setHasHotelKeycard(true);
                    onAddXp(50, "Received 5-Star Hotel RFID Keycard! 🔑");
                  }}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow cursor-pointer"
                >
                  🔑 Check In & Collect Keycard (+50 XP)
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sky-400">
                  <PhoneCall className="w-4 h-4" /> Room Service Telephone
                </div>
                <p className="text-slate-300">
                  Order English Breakfast, Club Sandwich, and Fresh Chamomile Tea directly to your room.
                </p>
                <button
                  onClick={() => {
                    sound.playSuccess();
                    confetti({ particleCount: 60, spread: 70 });
                    onAddXp(60, "Ordered 5-Star Room Service English Breakfast! 🍳");
                  }}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow cursor-pointer"
                >
                  🍳 Call Room Service (+60 XP)
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">Practice Hotel Check-In English:</span>
                <AudioSpeakButton text={hotelCheckinScript} label="Listen" className="bg-rose-500 text-white text-xs px-3 py-1 rounded-xl" />
              </div>
              <p className="text-xs text-rose-200">"{hotelCheckinScript}"</p>
              <VoiceSpeechPractice
                targetPhrase={hotelCheckinScript}
                accentColor="rose"
                onSuccess={() => {
                  sound.playSuccess();
                  confetti({ particleCount: 80, spread: 70 });
                  onAddXp(80, "Mastered Hotel Check-In Spoken English! 🏨✨");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
