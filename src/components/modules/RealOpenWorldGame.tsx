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
  CloudRain,
  Sliders,
  Radio,
  Headphones,
  Navigation,
  Utensils,
  Tv,
  Store,
  Building,
  Key,
  Flame,
  ArrowUpRight
} from 'lucide-react';

interface RealOpenWorldGameProps {
  onAddXp: (amount: number, reason: string) => void;
  onNavigateTab?: (tabName: string) => void;
}

type WorldDistrict = 
  | 'district_starbucks'
  | 'district_changi_jewel'
  | 'district_vizag_airport'
  | 'district_grand_hotel'
  | 'district_fashion_boutique';

// Helper to create rich high-res procedural Canvas Textures for Three.js
function createWoodFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  ctx.fillStyle = '#4a2e1b';
  ctx.fillRect(0, 0, 512, 512);

  // Draw wooden planks with grain
  const plankH = 64;
  for (let y = 0; y < 512; y += plankH) {
    const isAlt = (y / plankH) % 2 === 0;
    const plankW = 256;
    for (let x = (isAlt ? 0 : -128); x < 512; x += plankW) {
      ctx.fillStyle = (x + y) % 3 === 0 ? '#5a3821' : (x + y) % 3 === 1 ? '#432817' : '#51321d';
      ctx.fillRect(x + 2, y + 2, plankW - 4, plankH - 4);
      
      // Wood grain lines
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1;
      for (let g = 0; g < 4; g++) {
        ctx.beginPath();
        ctx.moveTo(x, y + 10 + g * 12);
        ctx.lineTo(x + plankW, y + 12 + g * 12);
        ctx.stroke();
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  return tex;
}

function createSubwayTileTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  ctx.fillStyle = '#1e293b'; // Dark grout
  ctx.fillRect(0, 0, 512, 512);

  const tileH = 40;
  const tileW = 80;
  for (let y = 0; y < 512; y += tileH) {
    const isShift = (y / tileH) % 2 === 1;
    for (let x = (isShift ? -tileW / 2 : 0); x < 512; x += tileW) {
      // Warm white glossy ceramic tile
      const grad = ctx.createLinearGradient(x, y, x + tileW, y + tileH);
      grad.addColorStop(0, '#f8fafc');
      grad.addColorStop(0.8, '#e2e8f0');
      grad.addColorStop(1, '#cbd5e1');
      ctx.fillStyle = grad;
      ctx.fillRect(x + 2, y + 2, tileW - 4, tileH - 4);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 2);
  return tex;
}

function createStarbucksMenuScreenTexture(type: 'espresso' | 'choc_tea' | 'bakery'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  // High-def Starbucks Digital Board Background
  const grad = ctx.createLinearGradient(0, 0, 1024, 512);
  if (type === 'espresso') {
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#1e293b');
  } else if (type === 'choc_tea') {
    grad.addColorStop(0, '#064e3b');
    grad.addColorStop(1, '#022c22');
  } else {
    grad.addColorStop(0, '#451a03');
    grad.addColorStop(1, '#291102');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Border & Header
  ctx.strokeStyle = '#006241';
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, 1012, 500);

  // Siren Brand Logo Header
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(
    type === 'espresso' ? '☕ STARBUCKS ESPRESSO & CLASSICS' :
    type === 'choc_tea' ? '🍫 CHOCOLATES, TEAS & SWEET COLD FOAM' :
    '🥪 ARTISAN BAKERY, PANINIS & BREAKFAST',
    40, 60
  );

  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('HOT & ICED • SHORT / TALL / GRANDE / VENTI', 40, 95);

  // Menu items list
  ctx.font = 'bold 26px sans-serif';
  ctx.fillStyle = '#f8fafc';
  
  if (type === 'espresso') {
    const items = [
      { name: 'Caffè Latte', price: '$4.95', sub: 'Steamed milk with rich signature espresso' },
      { name: 'Caramel Macchiato', price: '$5.45', sub: 'Vanilla, steamed milk, marked with espresso & caramel' },
      { name: 'Blonde Vanilla Latte', price: '$5.25', sub: 'Smooth blonde roast with velvety oat milk & vanilla' },
      { name: 'Caffè Mocha', price: '$5.35', sub: 'Bittersweet mocha sauce, espresso, and whipped cream' },
    ];
    items.forEach((it, idx) => {
      const y = 160 + idx * 80;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(it.name, 40, y);
      ctx.fillStyle = '#34d399';
      ctx.fillText(it.price, 850, y);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '18px sans-serif';
      ctx.fillText(it.sub, 40, y + 26);
      ctx.font = 'bold 26px sans-serif';
    });
  } else if (type === 'choc_tea') {
    const items = [
      { name: 'Signature Hot Chocolate', price: '$4.85', sub: 'Swathi\'s Choice ⭐ Oat Milk + Blonde Shot + 3x Vanilla + Cold Foam' },
      { name: 'White Hot Chocolate', price: '$4.95', sub: 'Rich buttery white chocolate with steamed microfoam' },
      { name: 'Iced Matcha Green Tea Latte', price: '$5.65', sub: 'Japanese Uji matcha green tea with creamy milk & ice' },
      { name: 'Vanilla Sweet Cold Foam (Add-on)', price: '+$1.25', sub: 'Velvety cold cream cloud sitting atop your hot/iced drink' },
    ];
    items.forEach((it, idx) => {
      const y = 160 + idx * 80;
      ctx.fillStyle = idx === 0 ? '#fde047' : '#ffffff';
      ctx.fillText(it.name, 40, y);
      ctx.fillStyle = '#34d399';
      ctx.fillText(it.price, 850, y);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '18px sans-serif';
      ctx.fillText(it.sub, 40, y + 26);
      ctx.font = 'bold 26px sans-serif';
    });
  } else {
    const items = [
      { name: 'Tomato & Mozzarella Focaccia Panini', price: '$6.45', sub: 'Fresh mozzarella, roasted tomatoes, basil pesto (Warmed Up 🔥)' },
      { name: 'Bacon, Gouda & Egg Sandwich', price: '$5.95', sub: 'Applewood smoked bacon & parmesan frittata on artisan roll' },
      { name: 'All-Butter French Croissant', price: '$3.85', sub: 'Flaky golden layered pastry toasted in rapid TurboChef' },
      { name: 'Oat Milk Substitution Bar', price: '+$0.70', sub: 'Oatly Barista Edition for maximum creamy texture' },
    ];
    items.forEach((it, idx) => {
      const y = 160 + idx * 80;
      ctx.fillStyle = idx === 0 ? '#fde047' : '#ffffff';
      ctx.fillText(it.name, 40, y);
      ctx.fillStyle = '#34d399';
      ctx.fillText(it.price, 850, y);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '18px sans-serif';
      ctx.fillText(it.sub, 40, y + 26);
      ctx.font = 'bold 26px sans-serif';
    });
  }

  return new THREE.CanvasTexture(canvas);
}

function createAirportFidsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1024, 512);

  // Header
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('🛫 DEPARTURES / FLIGHT INFORMATION (FIDS)', 30, 50);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('FLIGHT     AIRLINE             DESTINATION          GATE   TIME   STATUS', 30, 90);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(30, 105);
  ctx.lineTo(994, 105);
  ctx.stroke();

  const flights = [
    { code: 'SQ 529', airline: 'Singapore Airlines', dest: 'Singapore Changi (SIN)', gate: 'B12', time: '14:45', status: 'BOARDING', color: '#10b981' },
    { code: '6E 712', airline: 'IndiGo Airlines', dest: 'New Delhi (DEL)', gate: '03', time: '15:10', status: 'ON TIME', color: '#38bdf8' },
    { code: 'AI 451', airline: 'Air India', dest: 'Hyderabad (HYD)', gate: '01', time: '15:30', status: 'SECURITY OPEN', color: '#f59e0b' },
    { code: 'EK 318', airline: 'Emirates', dest: 'Dubai Intl (DXB)', gate: 'A4', time: '16:00', status: 'ON TIME', color: '#38bdf8' },
    { code: 'JL 036', airline: 'Japan Airlines', dest: 'Tokyo Haneda (HND)', gate: 'C8', time: '16:20', status: 'CHECK-IN OPEN', color: '#cbd5e1' },
  ];

  flights.forEach((fl, idx) => {
    const y = 150 + idx * 70;
    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(fl.code.padEnd(10), 30, y);
    ctx.fillText(fl.airline.padEnd(20), 160, y);
    ctx.fillStyle = '#7dd3fc';
    ctx.fillText(fl.dest.padEnd(22), 430, y);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(fl.gate.padEnd(6), 750, y);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(fl.time.padEnd(6), 840, y);
    ctx.fillStyle = fl.color;
    ctx.fillText(fl.status, 920, y);
  });

  return new THREE.CanvasTexture(canvas);
}

export const RealOpenWorldGame: React.FC<RealOpenWorldGameProps> = ({ onAddXp }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Active District & Modes
  const [activeDistrict, setActiveDistrict] = useState<WorldDistrict>('district_starbucks');
  const [cameraView, setCameraView] = useState<'third_person' | 'first_person_eyes'>('third_person');

  // Modals
  const [showMenuBoardModal, setShowMenuBoardModal] = useState<boolean>(false);
  const [showFidsFlightModal, setShowFidsFlightModal] = useState<boolean>(false);
  const [showPaperFormModal, setShowPaperFormModal] = useState<boolean>(false);

  // Player & Interactive State
  const [playerName] = useState<string>('Swathi');
  const [drinkLiquidPct, setDrinkLiquidPct] = useState<number>(100);
  const [foodBitesLeft, setFoodBitesLeft] = useState<number>(4);

  // Target Script
  const fullStarbucksScript = "Hi! Can I please get a Short Classic Signature Hot Chocolate with Oat Milk, Blonde Espresso, and 3 pumps of Vanilla, topped with Vanilla Sweet Cold Foam, and a Tomato & Mozzarella Focaccia Panini warmed up?";

  // Input & Physics
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const playerState = useRef({
    x: 0,
    y: 0,
    z: 6,
    rotY: 0,
    vy: 0,
    isGrounded: true,
    speed: 0.16
  });

  // 3D Scene Initialization
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(
      activeDistrict === 'district_starbucks' ? 0x241712 :
      activeDistrict === 'district_changi_jewel' ? 0x09182d : 0x0f172a
    );
    scene.fog = new THREE.FogExp2(scene.background, 0.01);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 4.5, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambient = new THREE.AmbientLight(0xfffaed, 0.9);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff7ed, 1.8);
    sun.position.set(20, 40, 20);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    scene.add(sun);

    // Warm cafe pendant lights
    const warmLight1 = new THREE.PointLight(0xf59e0b, 2.5, 25);
    warmLight1.position.set(-4, 5, -4);
    scene.add(warmLight1);

    const warmLight2 = new THREE.PointLight(0x10b981, 2.5, 25);
    warmLight2.position.set(4, 5, -4);
    scene.add(warmLight2);

    // 3. World Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Floor with Rich Wood Planks Texture
    const floorGeo = new THREE.PlaneGeometry(120, 120);
    const floorMat = new THREE.MeshStandardMaterial({
      map: createWoodFloorTexture(),
      roughness: 0.3,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    worldGroup.add(floor);

    // Specific Environments
    let particleSystem: THREE.Points | null = null;
    let particleCoords: Float32Array | null = null;

    if (activeDistrict === 'district_starbucks') {
      // ☕ FULL REALISTIC STARBUCKS RESERVE CAFE INTERIOR

      // Back Wall with Subway Ceramic Tiles
      const wallGeo = new THREE.BoxGeometry(36, 12, 1);
      const wallMat = new THREE.MeshStandardMaterial({
        map: createSubwayTileTexture(),
        roughness: 0.2
      });
      const backWall = new THREE.Mesh(wallGeo, wallMat);
      backWall.position.set(0, 6, -12);
      backWall.receiveShadow = true;
      worldGroup.add(backWall);

      // Main Barista Counter (Dark Walnut Wood)
      const counterGeo = new THREE.BoxGeometry(22, 2.4, 4.5);
      const counterMat = new THREE.MeshStandardMaterial({
        color: 0x451a03,
        roughness: 0.2,
        metalness: 0.1
      });
      const counter = new THREE.Mesh(counterGeo, counterMat);
      counter.position.set(0, 1.2, -6);
      counter.castShadow = true;
      counter.receiveShadow = true;
      worldGroup.add(counter);

      // Emerald Green Trim
      const trim = new THREE.Mesh(
        new THREE.BoxGeometry(22.1, 0.45, 4.6),
        new THREE.MeshStandardMaterial({ color: 0x006241, roughness: 0.3 })
      );
      trim.position.set(0, 2.2, -6);
      worldGroup.add(trim);

      // 📺 3 GIANT OVERHEAD DIGITAL MENU TV SCREENS WITH REAL TEXTURES!
      const screenTypes: ('espresso' | 'choc_tea' | 'bakery')[] = ['espresso', 'choc_tea', 'bakery'];
      screenTypes.forEach((stype, idx) => {
        const xPos = (idx - 1) * 6.5;
        
        // TV Bezel Frame
        const tvBezel = new THREE.Mesh(
          new THREE.BoxGeometry(6.0, 3.2, 0.25),
          new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.1 })
        );
        tvBezel.position.set(xPos, 6.2, -6.2);
        worldGroup.add(tvBezel);

        // High-Def Digital Menu Screen Surface
        const tvScreen = new THREE.Mesh(
          new THREE.PlaneGeometry(5.8, 3.0),
          new THREE.MeshBasicMaterial({ map: createStarbucksMenuScreenTexture(stype) })
        );
        tvScreen.position.set(xPos, 6.2, -6.06);
        worldGroup.add(tvScreen);
      });

      // Commercial Espresso Machine (Mastrena II)
      const espMachine = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 1.8, 2.4),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.1 })
      );
      espMachine.position.set(-5, 3.1, -6);
      espMachine.castShadow = true;
      worldGroup.add(espMachine);

      // Glass Bakery Display Case
      const bakeryCase = new THREE.Mesh(
        new THREE.BoxGeometry(6, 2.2, 2.8),
        new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, roughness: 0.05 })
      );
      bakeryCase.position.set(5.5, 3.3, -6);
      worldGroup.add(bakeryCase);

      // 3D Croissant & Panini inside case
      const panini = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.4, 0.7),
        new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 })
      );
      panini.position.set(5.5, 2.5, -6);
      worldGroup.add(panini);

      // Barista Hana NPC
      const barista = new THREE.Group();
      barista.add(new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffedd5 })));
      const bBody = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.55, 1.3, 16), new THREE.MeshStandardMaterial({ color: 0x006241 }));
      bBody.position.y = -1.1;
      barista.add(bBody);
      barista.position.set(0, 2.5, -8.2);
      worldGroup.add(barista);

      // Cafe Seating Tables & Tatami Booths
      for (let t = -1; t <= 1; t += 2) {
        const table = new THREE.Mesh(
          new THREE.CylinderGeometry(1.6, 1.6, 1.6, 16),
          new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.2 })
        );
        table.position.set(t * 9.5, 0.8, 5);
        worldGroup.add(table);

        const chair = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, 1.1, 1.5),
          new THREE.MeshStandardMaterial({ color: 0x006241 })
        );
        chair.position.set(t * 9.5, 0.55, 7.5);
        worldGroup.add(chair);
      }

    } else if (activeDistrict === 'district_changi_jewel') {
      // 🌊 SINGAPORE CHANGI JEWEL 40-METER RAIN VORTEX
      const basin = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 9, 3.5, 32),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.5, roughness: 0.2 })
      );
      basin.position.set(0, 1.75, 0);
      worldGroup.add(basin);

      const domeRing = new THREE.Mesh(
        new THREE.TorusGeometry(20, 0.7, 16, 64),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9 })
      );
      domeRing.rotation.x = Math.PI / 2;
      domeRing.position.set(0, 16, 0);
      worldGroup.add(domeRing);

      // Waterfall Droplets
      const pCount = 3500;
      const pGeo = new THREE.BufferGeometry();
      particleCoords = new Float32Array(pCount * 3);
      for (let p = 0; p < pCount; p++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 4.0 + 0.8;
        particleCoords[p * 3] = Math.cos(angle) * radius;
        particleCoords[p * 3 + 1] = Math.random() * 16 + 1.6;
        particleCoords[p * 3 + 2] = Math.sin(angle) * radius;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
      particleSystem = new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.32, transparent: true, opacity: 0.85 })
      );
      worldGroup.add(particleSystem);

      // Elevated Skytrain Track
      const track = new THREE.Mesh(
        new THREE.BoxGeometry(40, 0.8, 4),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6 })
      );
      track.position.set(0, 9, 10);
      worldGroup.add(track);

    } else {
      // 🛫 VIZAG (VTZ) ALLURI SITARAMA RAJU AIRPORT & FIDS BOARD
      // Giant Glowing FIDS Screen on Wall
      const fidsScreen = new THREE.Mesh(
        new THREE.PlaneGeometry(16, 8),
        new THREE.MeshBasicMaterial({ map: createAirportFidsTexture() })
      );
      fidsScreen.position.set(0, 6, -14.8);
      worldGroup.add(fidsScreen);

      // Check-in Desks
      const checkinDesk = new THREE.Mesh(
        new THREE.BoxGeometry(14, 2.4, 3.5),
        new THREE.MeshStandardMaterial({ color: 0x0284c7 })
      );
      checkinDesk.position.set(-10, 1.2, -4);
      worldGroup.add(checkinDesk);

      // CISF Metal Detector Arch
      const arch = new THREE.Mesh(
        new THREE.BoxGeometry(4, 5, 1),
        new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 })
      );
      arch.position.set(0, 2.5, -10);
      worldGroup.add(arch);
    }

    // 4. Playable 3D Character (Swathi)
    const playerGroup = new THREE.Group();

    // Head
    const pHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.52, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xffedd5 })
    );
    pHead.position.y = 2.05;
    pHead.castShadow = true;
    playerGroup.add(pHead);

    // Hair
    const pHair = new THREE.Mesh(
      new THREE.SphereGeometry(0.56, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x3b1d11 })
    );
    pHair.position.set(0, 2.15, -0.06);
    playerGroup.add(pHair);

    // Outfit Torso
    const pTorso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.48, 1.05, 16),
      new THREE.MeshStandardMaterial({ color: 0xec4899 }) // Chic Pink Blazer
    );
    pTorso.position.y = 1.25;
    pTorso.castShadow = true;
    playerGroup.add(pTorso);

    // Backpack
    const pBag = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.65, 0.35),
      new THREE.MeshStandardMaterial({ color: 0x6366f1 })
    );
    pBag.position.set(0, 1.3, -0.36);
    playerGroup.add(pBag);

    // Legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const pLeftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.8, 8), legMat);
    pLeftLeg.position.set(-0.22, 0.4, 0);
    playerGroup.add(pLeftLeg);

    const pRightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.8, 8), legMat);
    pRightLeg.position.set(0.22, 0.4, 0);
    playerGroup.add(pRightLeg);

    // Steaming Cup in Hand
    const heldItemMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.09, 0.32, 12),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc })
    );
    heldItemMesh.position.set(0.48, 1.15, 0.24);
    playerGroup.add(heldItemMesh);

    playerGroup.position.set(playerState.current.x, playerState.current.y, playerState.current.z);
    scene.add(playerGroup);

    // 5. Input Controls
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
      if (e.code === 'Space' && playerState.current.isGrounded) {
        playerState.current.vy = 0.25;
        playerState.current.isGrounded = false;
        sound.playClick();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let isMouseDown = false;
    let prevMouseX = 0;
    let cameraYaw = 0;
    let cameraPitch = 0.32;
    let cameraDistance = 9;

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      prevMouseX = e.clientX;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const dx = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      cameraYaw -= dx * 0.008;
    };
    const handleMouseUp = () => { isMouseDown = false; };
    const handleWheel = (e: WheelEvent) => {
      cameraDistance = Math.max(3, Math.min(22, cameraDistance + e.deltaY * 0.01));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel);

    // 6. 60 FPS Render Loop
    let animId: number;
    let tick = 0;

    const animate = () => {
      tick++;

      // Player Movement
      const speed = playerState.current.speed;
      let moveX = 0;
      let moveZ = 0;

      if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp']) moveZ -= 1;
      if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown']) moveZ += 1;
      if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft']) moveX -= 1;
      if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight']) moveX += 1;

      if (moveX !== 0 || moveZ !== 0) {
        const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
        const nx = moveX / len;
        const nz = moveZ / len;

        const fwdX = -Math.sin(cameraYaw);
        const fwdZ = -Math.cos(cameraYaw);
        const rgtX = Math.cos(cameraYaw);
        const rgtZ = -Math.sin(cameraYaw);

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

      playerState.current.x = Math.max(-45, Math.min(45, playerState.current.x));
      playerState.current.z = Math.max(-45, Math.min(45, playerState.current.z));

      // Mesh Transform
      playerGroup.position.set(playerState.current.x, playerState.current.y, playerState.current.z);
      playerGroup.rotation.y = playerState.current.rotY;

      // Camera Perspective
      if (cameraView === 'first_person_eyes') {
        camera.position.set(playerState.current.x, playerState.current.y + 2.0, playerState.current.z);
        const lookDirX = -Math.sin(cameraYaw);
        const lookDirZ = -Math.cos(cameraYaw);
        camera.lookAt(playerState.current.x + lookDirX * 10, playerState.current.y + 2.0, playerState.current.z + lookDirZ * 10);
      } else {
        const tx = playerState.current.x;
        const ty = playerState.current.y + 1.6;
        const tz = playerState.current.z;

        camera.position.set(
          tx + Math.sin(cameraYaw) * Math.cos(cameraPitch) * cameraDistance,
          ty + Math.sin(cameraPitch) * cameraDistance + 2.5,
          tz + Math.cos(cameraYaw) * Math.cos(cameraPitch) * cameraDistance
        );
        camera.lookAt(tx, ty, tz);
      }

      // Animate Waterfall
      if (particleSystem && particleCoords) {
        const cnt = particleCoords.length / 3;
        for (let i = 0; i < cnt; i++) {
          particleCoords[i * 3 + 1] -= 0.3;
          if (particleCoords[i * 3 + 1] <= 1.5) {
            particleCoords[i * 3 + 1] = 16;
          }
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
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
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeDistrict, cameraView]);

  // Teleport to district
  const handleTeleport = (district: WorldDistrict) => {
    sound.playClick();
    setActiveDistrict(district);
    playerState.current.x = 0;
    playerState.current.y = 0;
    playerState.current.z = 6;
    onAddXp(35, `Entered Real Open-World District: ${district.replace('district_', '').toUpperCase()}! 🌍✨`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Metaverse Main Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 rounded-3xl border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
              Full 3D Real Open-World Game Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-3">
              🌍 Real Open-World Simulator: Go Wherever You Want!
            </h2>
            <p className="text-emerald-100/80 text-xs sm:text-sm max-w-2xl mt-0.5">
              100% Free Roam! Walk up to real overhead Starbucks digital menu screens, browse airport departure FIDS, clear biometric gates, and fill physical customs forms!
            </p>
          </div>

          {/* District Quick Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/90 p-2 rounded-2xl border border-slate-800">
            <button
              onClick={() => handleTeleport('district_starbucks')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeDistrict === 'district_starbucks'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              ☕ 1. Starbucks Shop
            </button>
            <button
              onClick={() => handleTeleport('district_changi_jewel')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeDistrict === 'district_changi_jewel'
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🌊 2. Singapore Jewel
            </button>
            <button
              onClick={() => handleTeleport('district_vizag_airport')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeDistrict === 'district_vizag_airport'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🛫 3. Vizag (VTZ) Airport
            </button>
          </div>
        </div>
      </div>

      {/* 3D Real Viewport Screen */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 bg-slate-950 shadow-2xl">
        <div ref={mountRef} className="w-full h-[520px] cursor-grab active:cursor-grabbing bg-slate-950" />

        {/* Top-Left Avatar HUD */}
        <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/30 shadow-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center text-lg font-black">
            👑
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white">[VIP] {playerName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                Level 10 Explorer
              </span>
            </div>
            <p className="text-[11px] text-emerald-200">
              District: {activeDistrict.replace('district_', '').toUpperCase()}
            </p>
          </div>
        </div>

        {/* Top-Right Interactive In-World Action Screens */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {activeDistrict === 'district_starbucks' && (
            <button
              onClick={() => setShowMenuBoardModal(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:scale-105 text-slate-950 font-black text-xs rounded-xl shadow-xl flex items-center gap-1.5 transition-all"
            >
              <Tv className="w-4 h-4" />
              ☕ Inspect Overhead Menu Screens
            </button>
          )}

          {(activeDistrict === 'district_changi_jewel' || activeDistrict === 'district_vizag_airport') && (
            <button
              onClick={() => setShowFidsFlightModal(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-sky-500 to-blue-400 hover:scale-105 text-slate-950 font-black text-xs rounded-xl shadow-xl flex items-center gap-1.5 transition-all"
            >
              <Tv className="w-4 h-4" />
              🛫 View Live Airport Flight Screen (FIDS)
            </button>
          )}

          <button
            onClick={() => setShowPaperFormModal(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:scale-105 text-slate-950 font-black text-xs rounded-xl shadow-xl flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-4 h-4" />
            📋 Physical Form Lab
          </button>
        </div>

        {/* Bottom Interactive Hands-On Overlay */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md p-2 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              sound.playSuccess();
              setDrinkLiquidPct(prev => Math.max(0, prev - 25));
              onAddXp(20, "Sipped delicious Hot Chocolate with Sweet Cold Foam! ☕");
            }}
            className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-500/40 font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <Coffee className="w-3.5 h-3.5" /> Sip Drink ({drinkLiquidPct}%)
          </button>

          <button
            onClick={() => {
              sound.playSuccess();
              setFoodBitesLeft(prev => Math.max(0, prev - 1));
              onAddXp(20, "Ate a crispy warm bite of Mozzarella Focaccia! 🥪");
            }}
            className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/40 font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <Utensils className="w-3.5 h-3.5" /> Eat Panini ({foodBitesLeft} Bites)
          </button>
        </div>
      </div>

      {/* Voice Practice Box */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 rounded-3xl border border-emerald-500/40 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-pink-400" />
            <h3 className="font-bold text-white text-base">Practice Your Live Real-World Spoken Order:</h3>
          </div>
          <AudioSpeakButton
            text={fullStarbucksScript}
            label="Listen Target Pronunciation"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-xl shadow"
          />
        </div>

        <p className="text-sm text-emerald-100 font-semibold leading-relaxed">
          "{fullStarbucksScript}"
        </p>

        <VoiceSpeechPractice
          targetPhrase={fullStarbucksScript}
          phraseMeaning="Order: Short Hot Chocolate + Oat Milk + Blonde Espresso + 3 Vanilla + Cold Foam + Warmed Panini"
          accentColor="emerald"
          onSuccess={() => {
            sound.playSuccess();
            confetti({ particleCount: 100, spread: 80 });
            onAddXp(80, "Perfect Spoken English Masterpiece Order! 🎤✨");
          }}
        />
      </div>

      {/* --- MODAL 1: REAL OVERHEAD STARBUCKS MENU SCREENS --- */}
      {showMenuBoardModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-3xl flex items-center justify-center border border-emerald-500/40">
                  📺
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    Live Digital Store Display Board
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    Starbucks Reserve Overhead Menu Boards ☕
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowMenuBoardModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                ✕ Back to Cafe
              </button>
            </div>

            <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-emerald-100">
                <span className="font-bold text-emerald-300">Swathi's Masterpiece Order: </span>
                "Short Signature Hot Chocolate + Oat Milk + Blonde Espresso + 3 Vanilla + Cold Foam + Warmed Panini"
              </div>
              <AudioSpeakButton
                text={fullStarbucksScript}
                label="Hear Master Order"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl shadow"
              />
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: REAL AIRPORT LIVE FLIGHT DISPLAY BOARD (FIDS) --- */}
      {showFidsFlightModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border-2 border-sky-500/60 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-3xl flex items-center justify-center border border-sky-500/40">
                  🛫
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-sky-400">
                    Live Flight Information Display System (FIDS)
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    International Departures Board
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowFidsFlightModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                ✕ Back to Terminal
              </button>
            </div>

            <div className="p-4 bg-sky-950/60 rounded-2xl border border-sky-500/30 flex items-center justify-between text-xs text-sky-100">
              <span>⭐ Your Flight: <strong className="text-white">SQ 529 to Singapore Changi</strong> • Gate B12 • Status: <strong className="text-emerald-400">BOARDING NOW</strong></span>
              <AudioSpeakButton
                text="Attention passengers on Singapore Airlines flight SQ 529 to Singapore Changi. Final boarding call is now in progress at Gate B12."
                label="Play Gate Announcement"
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: PHYSICAL PAPER FORM FILLING LAB --- */}
      {showPaperFormModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-2xl flex items-center justify-center border border-amber-500/40">
                  📋
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                    Official Physical Document Practice
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Singapore SG Arrival Card & Customs Declaration Form 6059B
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowPaperFormModal(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <button
              onClick={() => {
                sound.playSuccess();
                confetti({ particleCount: 100, spread: 70 });
                setShowPaperFormModal(false);
                onAddXp(80, "Completed Official Physical Customs Declaration Form! 📋✨");
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black rounded-2xl shadow-xl transition-all text-xs uppercase tracking-wider hover:scale-[1.01]"
            >
              ✓ Sign & Submit Form to Immigration Officer (+80 XP)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
