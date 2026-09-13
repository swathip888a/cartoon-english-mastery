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
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Plane,
  Coffee,
  RotateCcw,
  Zap,
  Info,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Award,
  Layers
} from 'lucide-react';

interface Roblox3DWorldSimulatorProps {
  onAddXp: (amount: number, reason: string) => void;
  onNavigateTab?: (tabName: string) => void;
}

type WorldZone = 'starbucks_cafe' | 'singapore_changi_jewel' | 'vizag_vtz_airport';

interface InteractivePOI {
  id: string;
  name: string;
  x: number;
  z: number;
  radius: number;
  emoji: string;
  actionTitle: string;
  dialogueSpeaker: string;
  dialogueText: string;
  englishExplanation: string;
  bestPracticeTip: string;
  spokenPracticeScript?: string;
  xpReward: number;
}

export const Roblox3DWorldSimulator: React.FC<Roblox3DWorldSimulatorProps> = ({ onAddXp }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeZone, setActiveZone] = useState<WorldZone>('starbucks_cafe');
  const [activeModalPOI, setActiveModalPOI] = useState<InteractivePOI | null>(null);
  const [nearbyPOI, setNearbyPOI] = useState<InteractivePOI | null>(null);
  const [playerName] = useState<string>('Swathi');
  const [cameraView, setCameraView] = useState<'third_person' | 'first_person' | 'birds_eye'>('third_person');
  const [isSprint, setIsSprint] = useState<boolean>(false);
  const [zoneCompletedSteps, setZoneCompletedSteps] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Key tracking for WASD movement
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  // Character state refs for 60fps game loop
  const playerPos = useRef<{ x: number; y: number; z: number; rotY: number; vy: number; isGrounded: boolean }>({
    x: 0,
    y: 0,
    z: 5,
    rotY: 0,
    vy: 0,
    isGrounded: true
  });

  // Points of Interest per Zone
  const POIs: Record<WorldZone, InteractivePOI[]> = {
    starbucks_cafe: [
      {
        id: 'starbucks_register',
        name: 'Main Cashier & Barista Counter',
        x: 0,
        z: -5,
        radius: 3.5,
        emoji: '👩‍🍳',
        actionTitle: 'Order Swathi\'s Gourmet Hot Chocolate & Mozzarella Panini',
        dialogueSpeaker: 'Barista Hana (Starbucks Reserve)',
        dialogueText: 'Welcome to Starbucks! What can I craft fresh for you today?',
        englishExplanation: 'This is the ordering point. Always state your drink size first (Short/Tall/Grande/Venti), followed by milk choices and custom add-ons.',
        bestPracticeTip: 'Pairing Blonde Espresso with Hot Chocolate gives a nutty cocoa aroma without dark roast bitterness!',
        spokenPracticeScript: 'Hi! Can I please get a Short Classic Signature Hot Chocolate with Oat Milk, Blonde Espresso, and 3 pumps of Vanilla, topped with Vanilla Sweet Cold Foam, and a Tomato & Mozzarella Focaccia Panini warmed up?',
        xpReward: 60
      },
      {
        id: 'starbucks_condiment_bar',
        name: 'Sugar, Straw & Condiment Bar',
        x: -7,
        z: 0,
        radius: 3,
        emoji: '🪵',
        actionTitle: 'Condiment Bar (Sugars, Sleeves & Splash Sticks)',
        dialogueSpeaker: 'Cafe Self-Service Station',
        dialogueText: 'Feel free to grab Raw Turbinado Sugar, cinnamon shaker, green hot cup sleeves, and splash sticks.',
        englishExplanation: 'A "Splash Stick" is the little green stopper plugged into hot cup lids so hot coffee doesn\'t splash while driving or walking!',
        bestPracticeTip: 'Grab a kraft cup sleeve for hot drinks so your fingers don\'t get scorched.',
        spokenPracticeScript: 'Excuse me, could I get a hot cup sleeve and a splash stick for my hot chocolate?',
        xpReward: 35
      },
      {
        id: 'starbucks_bakery_case',
        name: 'Bakery & Food Display Case',
        x: 6,
        z: -5,
        radius: 3,
        emoji: '🥪',
        actionTitle: 'Inspect Fresh Bakery & Paninis',
        dialogueSpeaker: 'Bakery Specialist Haru',
        dialogueText: 'All paninis and croissants can be warmed up in our TurboChef rapid ovens in 15 seconds!',
        englishExplanation: 'When asked "Would you like that warmed up?", say "Yes, warmed please!" for melted mozzarella cheese and crispy toasted focaccia bread.',
        bestPracticeTip: 'Warmed Tomato & Mozzarella Focaccia pairs delightfully with hot sweet cocoa.',
        spokenPracticeScript: 'Yes, please warm up the Tomato and Mozzarella Panini!',
        xpReward: 40
      }
    ],
    singapore_changi_jewel: [
      {
        id: 'changi_waterfall',
        name: 'Jewel HSBC Rain Vortex (World\'s Tallest Indoor Waterfall)',
        x: 0,
        z: 0,
        radius: 5,
        emoji: '🌊',
        actionTitle: 'Admire Jewel 7-Story Cascading Waterfall',
        dialogueSpeaker: 'Changi Airport Ambassador',
        dialogueText: 'Welcome to Jewel Changi! The Rain Vortex cascades 40 meters (7 stories) down through the center of our lush indoor Shiseido Forest Valley!',
        englishExplanation: 'Jewel is connected directly to Terminal 1, 2, and 3 via glass pedestrian bridges. It combines nature, luxury shopping, and flight check-ins.',
        bestPracticeTip: 'You can drop your luggage at Jewel Early Check-In up to 24 hours before your flight so you can explore hands-free!',
        spokenPracticeScript: 'Could you please direct me to the Jewel Early Check-in lounge and the Skytrain to Terminal 3?',
        xpReward: 80
      },
      {
        id: 'changi_biometric_gate',
        name: 'Terminal 3 Automated Biometric Passport Gates',
        x: 0,
        z: -12,
        radius: 3.5,
        emoji: '🛂',
        actionTitle: 'Clear Singapore Automated Passport Control',
        dialogueSpeaker: 'Singapore ICA Biometric System',
        dialogueText: 'Please look into the camera and place your thumb on the glass scanner for instant facial & biometric verification.',
        englishExplanation: 'Singapore Changi uses 100% passport-less automated immigration for all departing passengers. No physical stamp is needed!',
        bestPracticeTip: 'Remove hats, masks, and sunglasses before looking into the iris and facial camera for 2-second clearance.',
        spokenPracticeScript: 'My passport is scanned and biometrics verified. Thank you, officer!',
        xpReward: 70
      },
      {
        id: 'changi_skytrain',
        name: 'Inter-Terminal Automated Skytrain',
        x: 10,
        z: 5,
        radius: 3.5,
        emoji: '🚝',
        actionTitle: 'Board Free Aerotrain between Terminals',
        dialogueSpeaker: 'Changi Skytrain Conductor',
        dialogueText: 'This automated elevated monorail takes you directly between Terminal 2, Terminal 3, and Jewel in just 3 minutes!',
        englishExplanation: 'The Skytrain runs every 4 minutes and is completely free of charge for both transit and public passengers.',
        bestPracticeTip: 'The T2-T3 Skytrain track passes directly alongside the waterfall for stunning photos!',
        spokenPracticeScript: 'Which Skytrain platform goes to Departure Gate B12 in Terminal 3?',
        xpReward: 45
      }
    ],
    vizag_vtz_airport: [
      {
        id: 'vtz_entry_gate',
        name: 'Alluri Sitarama Raju International Airport (VTZ) Main Entrance',
        x: 0,
        z: 10,
        radius: 3.5,
        emoji: '🏛️',
        actionTitle: 'CISF Security Entry & DigiYatra Gate',
        dialogueSpeaker: 'CISF Security Officer at Vizag Gate 2',
        dialogueText: 'Namaste! Please keep your Government Photo ID (Aadhaar/Passport) and Airline Ticket ready, or use the DigiYatra Facial Recognition gate.',
        englishExplanation: 'In Indian airports, only ticketed passengers are allowed inside the terminal building. DigiYatra allows contactless entry by scanning your face!',
        bestPracticeTip: 'Keep your digital boarding pass open with phone brightness set to maximum for easy barcode scanning.',
        spokenPracticeScript: 'Here is my Government ID and mobile boarding pass for the flight to Singapore via Hyderabad.',
        xpReward: 65
      },
      {
        id: 'vtz_checkin_counters',
        name: 'IndiGo & Air India Check-in & Baggage Drop',
        x: -8,
        z: -2,
        radius: 3.5,
        emoji: '🧳',
        actionTitle: 'Weigh Check-in Luggage & Get Boarding Pass',
        dialogueSpeaker: 'IndiGo Airline Customer Service Agent',
        dialogueText: 'Good morning! How many check-in bags do you have today? Please place your suitcase on the weighing scale.',
        englishExplanation: 'Standard domestic check-in allowance is 15 kg per passenger, and 7 kg for cabin hand baggage. Make sure battery powerbanks are in your cabin bag only!',
        bestPracticeTip: 'Never put power banks, laptops, or loose lithium batteries into check-in baggage—they must stay in your cabin bag.',
        spokenPracticeScript: 'I have one check-in bag weighing 12 kg and one cabin handbag. Can I please request a window seat?',
        xpReward: 60
      },
      {
        id: 'vtz_security_frisking',
        name: 'CISF Security X-Ray & Metal Detector Frisking',
        x: 0,
        z: -10,
        radius: 3.5,
        emoji: '🛡️',
        actionTitle: 'Pass Through X-Ray Scanner & Metal Detector',
        dialogueSpeaker: 'CISF Security Inspector',
        dialogueText: 'Please remove your laptop, tablet, liquids, and metallic belts. Place them into separate grey plastic trays.',
        englishExplanation: '"Frisking" is the physical pat-down and handheld metal detector check performed after walking through the security arch.',
        bestPracticeTip: 'Empty your pockets completely into your jacket or tray before stepping into the scanner to avoid sounding the alarm beep.',
        spokenPracticeScript: 'My laptop and liquids are separated in the tray. Ready for security screening!',
        xpReward: 70
      }
    ]
  };

  // Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(activeZone === 'starbucks_cafe' ? 0x1a120c : activeZone === 'singapore_changi_jewel' ? 0x0a192f : 0x0f172a);
    scene.fog = new THREE.FogExp2(scene.background, 0.02);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 6, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, activeZone === 'starbucks_cafe' ? 0.7 : 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 1.2);
    sunLight.position.set(15, 25, 15);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // Warm cafe accent lights or cool airport neon
    const accentPoint = new THREE.PointLight(activeZone === 'starbucks_cafe' ? 0xf59e0b : 0x38bdf8, 2, 20);
    accentPoint.position.set(0, 4, -4);
    scene.add(accentPoint);

    // 3. Build 3D Map Environments based on activeZone
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    const floorMat = new THREE.MeshStandardMaterial({
      color: activeZone === 'starbucks_cafe' ? 0x3d271d : activeZone === 'singapore_changi_jewel' ? 0x1e293b : 0x334155,
      roughness: 0.4,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    worldGroup.add(floor);

    // Grid Floor lines for Roblox aesthetic
    const gridHelper = new THREE.GridHelper(80, 40, 0x10b981, 0x475569);
    gridHelper.position.y = 0.01;
    worldGroup.add(gridHelper);

    // Waterfall particle system for Singapore Changi Jewel
    let waterfallParticles: THREE.Points | null = null;
    let particlePositions: Float32Array | null = null;

    if (activeZone === 'starbucks_cafe') {
      // ☕ STARBUCKS CAFE ENVIRONMENT
      // Main Wooden Counter Bar
      const counterGeo = new THREE.BoxGeometry(14, 2, 3);
      const counterMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.3 });
      const counter = new THREE.Mesh(counterGeo, counterMat);
      counter.position.set(0, 1, -5);
      counter.castShadow = true;
      counter.receiveShadow = true;
      worldGroup.add(counter);

      // Emerald Green Starbucks Apron Trim
      const trimGeo = new THREE.BoxGeometry(14.2, 0.4, 3.1);
      const trimMat = new THREE.MeshStandardMaterial({ color: 0x006241 });
      const trim = new THREE.Mesh(trimGeo, trimMat);
      trim.position.set(0, 1.8, -5);
      worldGroup.add(trim);

      // Espresso Machine on counter
      const espGeo = new THREE.BoxGeometry(3, 1.4, 1.8);
      const espMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
      const espressoMachine = new THREE.Mesh(espGeo, espMat);
      espressoMachine.position.set(-3, 2.7, -5);
      espressoMachine.castShadow = true;
      worldGroup.add(espressoMachine);

      // Bakery Showcase (Glass Box)
      const bakeryGeo = new THREE.BoxGeometry(4, 1.6, 2);
      const bakeryMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, roughness: 0.1 });
      const bakeryCase = new THREE.Mesh(bakeryGeo, bakeryMat);
      bakeryCase.position.set(3.5, 2.8, -5);
      worldGroup.add(bakeryCase);

      // 3D Croissants & Paninis inside showcase
      const paniniGeo = new THREE.BoxGeometry(0.9, 0.3, 0.5);
      const paniniMat = new THREE.MeshStandardMaterial({ color: 0xd97706 });
      const paniniMesh = new THREE.Mesh(paniniGeo, paniniMat);
      paniniMesh.position.set(3.5, 2.3, -5);
      worldGroup.add(paniniMesh);

      // Barista Hana NPC (3D Anime Chibi Avatar)
      const baristaGroup = new THREE.Group();
      // Head
      const bHeadGeo = new THREE.SphereGeometry(0.55, 16, 16);
      const bHeadMat = new THREE.MeshStandardMaterial({ color: 0xffedd5 });
      const bHead = new THREE.Mesh(bHeadGeo, bHeadMat);
      bHead.position.y = 2.4;
      baristaGroup.add(bHead);
      // Hair
      const bHairGeo = new THREE.SphereGeometry(0.6, 16, 16);
      const bHairMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12 });
      const bHair = new THREE.Mesh(bHairGeo, bHairMat);
      bHair.position.set(0, 2.5, -0.1);
      baristaGroup.add(bHair);
      // Body / Green Apron
      const bBodyGeo = new THREE.CylinderGeometry(0.4, 0.55, 1.2, 16);
      const bBodyMat = new THREE.MeshStandardMaterial({ color: 0x006241 });
      const bBody = new THREE.Mesh(bBodyGeo, bBodyMat);
      bBody.position.y = 1.4;
      baristaGroup.add(bBody);
      baristaGroup.position.set(0, 0, -6.5);
      worldGroup.add(baristaGroup);

      // Cafe Tables & Chairs
      for (let i = -1; i <= 1; i += 2) {
        const tableGeo = new THREE.CylinderGeometry(1.2, 1.2, 1.4, 16);
        const tableMat = new THREE.MeshStandardMaterial({ color: 0x451a03 });
        const table = new THREE.Mesh(tableGeo, tableMat);
        table.position.set(i * 7, 0.7, 4);
        worldGroup.add(table);
      }
    } else if (activeZone === 'singapore_changi_jewel') {
      // ✈️ SINGAPORE CHANGI JEWEL RAIN VORTEX ENVIRONMENT
      // Circular Waterfall Oculus Basin
      const basinGeo = new THREE.CylinderGeometry(5, 6, 2, 32);
      const basinMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1, metalness: 0.3 });
      const basin = new THREE.Mesh(basinGeo, basinMat);
      basin.position.set(0, 1, 0);
      worldGroup.add(basin);

      // Glass Dome Roof Pillars
      const domeGeo = new THREE.TorusGeometry(14, 0.4, 16, 64);
      const domeMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8 });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.rotation.x = Math.PI / 2;
      dome.position.set(0, 12, 0);
      worldGroup.add(dome);

      // Cascading Waterfall Particles (Thousands of droplets falling in 3D)
      const particleCount = 2000;
      const particlesGeo = new THREE.BufferGeometry();
      particlePositions = new Float32Array(particleCount * 3);

      for (let p = 0; p < particleCount; p++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 2.5 + 0.5;
        particlePositions[p * 3] = Math.cos(angle) * radius;
        particlePositions[p * 3 + 1] = Math.random() * 12 + 1; // Height
        particlePositions[p * 3 + 2] = Math.sin(angle) * radius;
      }
      particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

      const particleMat = new THREE.PointsMaterial({
        color: 0x7dd3fc,
        size: 0.25,
        transparent: true,
        opacity: 0.8
      });
      waterfallParticles = new THREE.Points(particlesGeo, particleMat);
      worldGroup.add(waterfallParticles);

      // Terraced Indoor Garden Trees around Waterfall
      for (let t = 0; t < 12; t++) {
        const tAngle = (t / 12) * Math.PI * 2;
        const tRadius = 10;
        const treeTrunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 3, 8);
        const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x451a03 });
        const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
        trunk.position.set(Math.cos(tAngle) * tRadius, 1.5, Math.sin(tAngle) * tRadius);
        worldGroup.add(trunk);

        const foliageGeo = new THREE.DodecahedronGeometry(1.5, 1);
        const foliageMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.6 });
        const foliage = new THREE.Mesh(foliageGeo, foliageMat);
        foliage.position.set(Math.cos(tAngle) * tRadius, 3.8, Math.sin(tAngle) * tRadius);
        worldGroup.add(foliage);
      }

      // Elevated Skytrain Track
      const trackGeo = new THREE.BoxGeometry(28, 0.5, 2.5);
      const trackMat = new THREE.MeshStandardMaterial({ color: 0x64748b });
      const track = new THREE.Mesh(trackGeo, trackMat);
      track.position.set(0, 6, 7);
      worldGroup.add(track);

      // Automated Biometric Gates at the back
      const gateGeo = new THREE.BoxGeometry(10, 2.5, 1);
      const gateMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
      const gates = new THREE.Mesh(gateGeo, gateMat);
      gates.position.set(0, 1.25, -12);
      worldGroup.add(gates);
    } else {
      // 🛫 VIZAG (VTZ) AIRPORT TERMINAL ENVIRONMENT
      // Terminal Facade & Arches
      const terminalGeo = new THREE.BoxGeometry(24, 6, 2);
      const terminalMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
      const terminal = new THREE.Mesh(terminalGeo, terminalMat);
      terminal.position.set(0, 3, -15);
      worldGroup.add(terminal);

      // Andhra Coastal Palm Trees
      for (let p = -1; p <= 1; p += 2) {
        const palmTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 6, 8), new THREE.MeshStandardMaterial({ color: 0x78350f }));
        palmTrunk.position.set(p * 12, 3, 6);
        worldGroup.add(palmTrunk);
        const palmFoliage = new THREE.Mesh(new THREE.ConeGeometry(3, 2, 8), new THREE.MeshStandardMaterial({ color: 0x16a34a }));
        palmFoliage.position.set(p * 12, 6.5, 6);
        worldGroup.add(palmFoliage);
      }

      // Check-in Desks (IndiGo & Air India)
      const checkinDeskGeo = new THREE.BoxGeometry(8, 1.8, 2.5);
      const checkinDeskMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 }); // IndiGo Blue
      const checkinDesk = new THREE.Mesh(checkinDeskGeo, checkinDeskMat);
      checkinDesk.position.set(-8, 0.9, -2);
      worldGroup.add(checkinDesk);

      // Moving Baggage Conveyor Belt
      const beltGeo = new THREE.BoxGeometry(8, 0.4, 1.2);
      const beltMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
      const belt = new THREE.Mesh(beltGeo, beltMat);
      belt.position.set(-8, 0.4, -4);
      worldGroup.add(belt);

      // Luggage Suitcases on Belt
      const suitcaseGeo = new THREE.BoxGeometry(0.8, 0.5, 0.5);
      const suitcaseMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
      const suitcase = new THREE.Mesh(suitcaseGeo, suitcaseMat);
      suitcase.position.set(-8, 0.8, -4);
      worldGroup.add(suitcase);

      // CISF Security Checkpoint Metal Detector Arch
      const archGeo = new THREE.BoxGeometry(2.5, 3.5, 0.6);
      const archMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
      const arch = new THREE.Mesh(archGeo, archMat);
      arch.position.set(0, 1.75, -10);
      worldGroup.add(arch);

      // DigiYatra Electronic Gate Banner
      const digiBannerGeo = new THREE.BoxGeometry(6, 1.2, 0.2);
      const digiBannerMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
      const digiBanner = new THREE.Mesh(digiBannerGeo, digiBannerMat);
      digiBanner.position.set(0, 4, 10);
      worldGroup.add(digiBanner);
    }

    // 4. Create 3D Playable Avatar (Swathi's Anime Character)
    const playerGroup = new THREE.Group();
    // Character Head
    const headGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffedd5 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.9;
    head.castShadow = true;
    playerGroup.add(head);

    // Anime Hair
    const hairGeo = new THREE.SphereGeometry(0.54, 16, 16);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x3b1d11 });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 2.0, -0.05);
    playerGroup.add(hair);

    // Character Torso (Stylish Hoodie)
    const torsoGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.9, 16);
    const torsoMat = new THREE.MeshStandardMaterial({ color: 0xec4899 }); // Pink Hoodie
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 1.15;
    torso.castShadow = true;
    playerGroup.add(torso);

    // Backpack
    const backpackGeo = new THREE.BoxGeometry(0.5, 0.6, 0.3);
    const backpackMat = new THREE.MeshStandardMaterial({ color: 0x6366f1 });
    const backpack = new THREE.Mesh(backpackGeo, backpackMat);
    backpack.position.set(0, 1.2, -0.32);
    playerGroup.add(backpack);

    // Left & Right Legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.7, 8), legMat);
    leftLeg.position.set(-0.2, 0.35, 0);
    playerGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.7, 8), legMat);
    rightLeg.position.set(0.2, 0.35, 0);
    playerGroup.add(rightLeg);

    // Starbucks Cup Accessory in Hand
    const cupGeo = new THREE.CylinderGeometry(0.12, 0.09, 0.28, 12);
    const cupMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc });
    const heldCup = new THREE.Mesh(cupGeo, cupMat);
    heldCup.position.set(0.45, 1.0, 0.2);
    playerGroup.add(heldCup);

    playerGroup.position.set(playerPos.current.x, playerPos.current.y, playerPos.current.z);
    scene.add(playerGroup);

    // 5. Interactive POI Visual Markers (Glowing pulsating cylinders on floor)
    const currentPOIs = POIs[activeZone];
    const poiMarkers: THREE.Mesh[] = [];

    currentPOIs.forEach((poi) => {
      const markerGeo = new THREE.CylinderGeometry(poi.radius * 0.8, poi.radius * 0.8, 0.15, 24);
      const markerMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.45
      });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(poi.x, 0.08, poi.z);
      scene.add(marker);
      poiMarkers.push(marker);
    });

    // 6. Keyboard Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
      if (e.code === 'KeyE' && nearbyPOI) {
        sound.playClick();
        setActiveModalPOI(nearbyPOI);
      }
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        setIsSprint(true);
      }
      if (e.code === 'Space' && playerPos.current.isGrounded) {
        playerPos.current.vy = 0.22;
        playerPos.current.isGrounded = false;
        sound.playClick();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        setIsSprint(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 7. Mouse Orbit Camera Drag Controls
    let isMouseDown = false;
    let prevMouseX = 0;
    let cameraAngleYaw = 0;
    let cameraPitch = 0.35;
    let cameraDistance = 8;

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      prevMouseX = e.clientX;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      cameraAngleYaw -= deltaX * 0.008;
    };
    const handleMouseUp = () => {
      isMouseDown = false;
    };
    const handleWheel = (e: WheelEvent) => {
      cameraDistance = Math.max(3, Math.min(18, cameraDistance + e.deltaY * 0.01));
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('wheel', handleWheel);

    // 8. 60 FPS Game Loop
    let animationId: number;
    let tick = 0;

    const animate = () => {
      tick++;

      // Player Movement Logic
      const speed = (isSprint ? 0.22 : 0.12);
      let moveX = 0;
      let moveZ = 0;

      if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp']) moveZ -= 1;
      if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown']) moveZ += 1;
      if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft']) moveX -= 1;
      if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight']) moveX += 1;

      if (moveX !== 0 || moveZ !== 0) {
        // Move relative to camera yaw
        const length = Math.sqrt(moveX * moveX + moveZ * moveZ);
        const normX = moveX / length;
        const normZ = moveZ / length;

        const forwardX = -Math.sin(cameraAngleYaw);
        const forwardZ = -Math.cos(cameraAngleYaw);
        const rightX = Math.cos(cameraAngleYaw);
        const rightZ = -Math.sin(cameraAngleYaw);

        const finalDx = (normX * rightX + normZ * forwardX) * speed;
        const finalDz = (normX * rightZ + normZ * forwardZ) * speed;

        playerPos.current.x += finalDx;
        playerPos.current.z += finalDz;

        // Player rotation facing movement direction
        playerPos.current.rotY = Math.atan2(finalDx, finalDz);

        // Animated leg swing
        leftLeg.rotation.x = Math.sin(tick * 0.2) * 0.6;
        rightLeg.rotation.x = -Math.sin(tick * 0.2) * 0.6;
      } else {
        leftLeg.rotation.x = 0;
        rightLeg.rotation.x = 0;
      }

      // Jump & Gravity
      if (!playerPos.current.isGrounded) {
        playerPos.current.y += playerPos.current.vy;
        playerPos.current.vy -= 0.012; // Gravity
        if (playerPos.current.y <= 0) {
          playerPos.current.y = 0;
          playerPos.current.vy = 0;
          playerPos.current.isGrounded = true;
        }
      }

      // Keep inside bounds
      playerPos.current.x = Math.max(-35, Math.min(35, playerPos.current.x));
      playerPos.current.z = Math.max(-35, Math.min(35, playerPos.current.z));

      // Update 3D Character Mesh
      playerGroup.position.set(playerPos.current.x, playerPos.current.y, playerPos.current.z);
      playerGroup.rotation.y = playerPos.current.rotY;

      // Update Camera to follow player smoothly
      const camTargetX = playerPos.current.x;
      const camTargetY = playerPos.current.y + 1.6;
      const camTargetZ = playerPos.current.z;

      const camX = camTargetX + Math.sin(cameraAngleYaw) * Math.cos(cameraPitch) * cameraDistance;
      const camY = camTargetY + Math.sin(cameraPitch) * cameraDistance + 2.5;
      const camZ = camTargetZ + Math.cos(cameraAngleYaw) * Math.cos(cameraPitch) * cameraDistance;

      camera.position.set(camX, camY, camZ);
      camera.lookAt(camTargetX, camTargetY, camTargetZ);

      // Animate Waterfall in Singapore Jewel
      if (waterfallParticles && particlePositions) {
        const count = particlePositions.length / 3;
        for (let i = 0; i < count; i++) {
          particlePositions[i * 3 + 1] -= 0.25; // Fall speed
          if (particlePositions[i * 3 + 1] <= 1) {
            particlePositions[i * 3 + 1] = 12; // Reset to top
          }
        }
        waterfallParticles.geometry.attributes.position.needsUpdate = true;
      }

      // Pulsate POI Rings
      poiMarkers.forEach((m) => {
        m.scale.set(1 + Math.sin(tick * 0.08) * 0.08, 1, 1 + Math.sin(tick * 0.08) * 0.08);
      });

      // Proximity Detection for nearest POI
      let closestPOI: InteractivePOI | null = null;
      let minDistance = 999;

      currentPOIs.forEach((poi) => {
        const dist = Math.hypot(playerPos.current.x - poi.x, playerPos.current.z - poi.z);
        if (dist < poi.radius && dist < minDistance) {
          minDistance = dist;
          closestPOI = poi;
        }
      });

      setNearbyPOI(closestPOI);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
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
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeZone]);

  // Teleport player when changing zone
  const handleSwitchZone = (zone: WorldZone) => {
    sound.playClick();
    setActiveZone(zone);
    playerPos.current.x = 0;
    playerPos.current.y = 0;
    playerPos.current.z = zone === 'starbucks_cafe' ? 4 : zone === 'singapore_changi_jewel' ? 6 : 8;
    setActiveModalPOI(null);
    onAddXp(30, `Teleported to 3D Metaverse: ${zone === 'starbucks_cafe' ? 'Starbucks Reserve' : zone === 'singapore_changi_jewel' ? 'Singapore Changi Jewel' : 'Vizag VTZ Airport'}! ✈️`);
  };

  return (
    <div className="space-y-6">
      {/* 3D Metaverse Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
              Roblox-Style 3D Real-World Walkable Metaverse
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-3">
              🌍 Real-World 3D Simulator: Walk, Visit & Practice!
            </h2>
            <p className="text-indigo-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              Walk into real Starbucks stores and international airports in 3D! Experience where to go, how to order, what to do at security, and master spoken English!
            </p>
          </div>

          {/* Zone Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-2 rounded-2xl border border-slate-800">
            <button
              onClick={() => handleSwitchZone('starbucks_cafe')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeZone === 'starbucks_cafe'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              ☕ 1. Starbucks Reserve
            </button>
            <button
              onClick={() => handleSwitchZone('singapore_changi_jewel')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeZone === 'singapore_changi_jewel'
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🌊 2. Singapore Jewel Changi
            </button>
            <button
              onClick={() => handleSwitchZone('vizag_vtz_airport')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeZone === 'vizag_vtz_airport'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🛫 3. Vizag (VTZ) Airport
            </button>
          </div>
        </div>
      </div>

      {/* 3D Viewport Screen */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-indigo-500/40 bg-slate-950 shadow-2xl">
        {/* Three.js Canvas Container */}
        <div
          ref={mountRef}
          className="w-full h-[520px] cursor-grab active:cursor-grabbing bg-slate-950"
        />

        {/* Floating Top-Left Character Status & Nametag */}
        <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-indigo-500/30 shadow-xl flex items-center gap-3">
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
            <p className="text-[11px] text-indigo-200">
              Zone: {activeZone === 'starbucks_cafe' ? '☕ Kyoto Starbucks Reserve' : activeZone === 'singapore_changi_jewel' ? '🌊 Singapore Jewel Rain Vortex' : '🛫 Vizag VTZ Airport'}
            </p>
          </div>
        </div>

        {/* Floating Top-Right Controls Helper */}
        <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-800 text-slate-300 text-xs flex items-center gap-3">
          <span className="hidden sm:inline font-mono text-[11px] text-amber-300">🎮 [WASD] Move • [Space] Jump • [Shift] Sprint • [Mouse Drag] 360° Look</span>
        </div>

        {/* Floating Proximity Action Button (Roblox [E] Interact) */}
        {nearbyPOI && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-20">
            <button
              onClick={() => {
                sound.playSuccess();
                setActiveModalPOI(nearbyPOI);
              }}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:scale-105 text-slate-950 font-black rounded-2xl shadow-2xl border-2 border-white/60 flex items-center gap-3 text-sm tracking-wide transition-all"
            >
              <span className="text-xl">{nearbyPOI.emoji}</span>
              <span>Press [E] or Tap to: {nearbyPOI.actionTitle}</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Mobile Virtual D-Pad Overlay (Bottom Left) */}
        <div className="absolute bottom-4 left-4 flex flex-col items-center gap-1 sm:hidden bg-slate-950/70 p-2 rounded-2xl border border-slate-800">
          <button
            onMouseDown={() => { keysPressed.current['KeyW'] = true; }}
            onMouseUp={() => { keysPressed.current['KeyW'] = false; }}
            onTouchStart={() => { keysPressed.current['KeyW'] = true; }}
            onTouchEnd={() => { keysPressed.current['KeyW'] = false; }}
            className="w-10 h-10 bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center active:bg-emerald-500"
          >
            ▲
          </button>
          <div className="flex gap-1">
            <button
              onMouseDown={() => { keysPressed.current['KeyA'] = true; }}
              onMouseUp={() => { keysPressed.current['KeyA'] = false; }}
              onTouchStart={() => { keysPressed.current['KeyA'] = true; }}
              onTouchEnd={() => { keysPressed.current['KeyA'] = false; }}
              className="w-10 h-10 bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center active:bg-emerald-500"
            >
              ◀
            </button>
            <button
              onMouseDown={() => { keysPressed.current['KeyS'] = true; }}
              onMouseUp={() => { keysPressed.current['KeyS'] = false; }}
              onTouchStart={() => { keysPressed.current['KeyS'] = true; }}
              onTouchEnd={() => { keysPressed.current['KeyS'] = false; }}
              className="w-10 h-10 bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center active:bg-emerald-500"
            >
              ▼
            </button>
            <button
              onMouseDown={() => { keysPressed.current['KeyD'] = true; }}
              onMouseUp={() => { keysPressed.current['KeyD'] = false; }}
              onTouchStart={() => { keysPressed.current['KeyD'] = true; }}
              onTouchEnd={() => { keysPressed.current['KeyD'] = false; }}
              className="w-10 h-10 bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center active:bg-emerald-500"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Modal when player enters a POI Zone */}
      {activeModalPOI && (
        <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-3xl flex items-center justify-center border border-emerald-500/40">
                {activeModalPOI.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    Live 3D Interaction Station
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full font-bold">
                    +{activeModalPOI.xpReward} XP Available
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{activeModalPOI.name}</h3>
              </div>
            </div>

            <button
              onClick={() => setActiveModalPOI(null)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all"
            >
              ✕ Close
            </button>
          </div>

          {/* Dialogue Speech Card */}
          <div className="p-5 bg-gradient-to-r from-slate-950 to-indigo-950/60 rounded-2xl border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-300">
                🗣️ {activeModalPOI.dialogueSpeaker}:
              </span>
              <AudioSpeakButton
                text={activeModalPOI.dialogueText}
                label="Listen to Audio"
                className="bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl"
              />
            </div>
            <p className="text-base text-slate-100 font-semibold italic leading-relaxed">
              "{activeModalPOI.dialogueText}"
            </p>
          </div>

          {/* Deep Explanation & Real-World Best Practices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Info className="w-4 h-4" /> What is this & What does it mean?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeModalPOI.englishExplanation}
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Pro Traveler Secret & Best Tip:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeModalPOI.bestPracticeTip}
              </p>
            </div>
          </div>

          {/* Microphone Voice Test for this Station */}
          {activeModalPOI.spokenPracticeScript && (
            <div className="space-y-3 border-t border-slate-800 pt-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Mic className="w-4 h-4 text-pink-400" />
                  Practice Your Real-World English Response:
                </div>
                <AudioSpeakButton
                  text={activeModalPOI.spokenPracticeScript}
                  label="Hear Target Voice"
                  className="bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl"
                />
              </div>

              <VoiceSpeechPractice
                targetPhrase={activeModalPOI.spokenPracticeScript}
                phraseMeaning="Say this clearly to the officer/barista"
                accentColor="emerald"
                onSuccess={() => {
                  sound.playSuccess();
                  confetti({ particleCount: 90, spread: 70 });
                  onAddXp(activeModalPOI.xpReward, `Mastered 3D Station: ${activeModalPOI.name}! 🌟`);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
