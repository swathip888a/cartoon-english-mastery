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
  Utensils
} from 'lucide-react';

interface AAAWorldSimulatorProps {
  onAddXp: (amount: number, reason: string) => void;
}

export type SceneLocation = 
  | 'starbucks_kyoto_reserve'
  | 'singapore_changi_jewel_vortex'
  | 'vizag_alluri_sitarama_airport'
  | 'grand_luxury_presidential_suite'
  | 'milan_fashion_boutique_runway';

export type TimeOfDay = 'morning_golden' | 'bright_day' | 'cozy_night_twilight';
export type CameraMode = 'third_person_follow' | 'first_person_eyes' | 'cinematic_orbit' | 'birds_eye_drone';

export const AAAWorldSimulator: React.FC<AAAWorldSimulatorProps> = ({ onAddXp }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Simulation Controls & Modes
  const [activeLocation, setActiveLocation] = useState<SceneLocation>('starbucks_kyoto_reserve');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning_golden');
  const [cameraMode, setCameraMode] = useState<CameraMode>('third_person_follow');
  const [soundAtmosphere, setSoundAtmosphere] = useState<boolean>(true);

  // Player State
  const [playerName] = useState<string>('Swathi');
  const [characterEmote, setCharacterEmote] = useState<'idle' | 'sip_coffee' | 'inspect_passport' | 'wave_hello'>('idle');
  const [heldItem3D, setHeldItem3D] = useState<'steaming_cup' | 'passport_ticket' | 'shopping_bag' | 'hotel_keycard'>('steaming_cup');
  const [liquidLevel, setLiquidLevel] = useState<number>(100); // 100% full cup to 0% after sips
  const [foodBitesLeft, setFoodBitesLeft] = useState<number>(4); // Panini bites

  // Active Story & Mission Progress per Location
  const [missionStep, setMissionStep] = useState<number>(1);
  const [missionLog, setMissionLog] = useState<string[]>([]);
  const [voiceScore, setVoiceScore] = useState<number | null>(null);

  // Physical Form Inspector Modal
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [formType, setFormType] = useState<'customs_declaration' | 'hotel_registration' | 'tax_free_invoice'>('customs_declaration');

  // Input & Physics State Refs
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const playerState = useRef({
    x: 0,
    y: 0,
    z: 6,
    rotY: 0,
    vy: 0,
    isGrounded: true,
    speed: 0.16,
    stamina: 100
  });

  // Mission Scripts & Audio Data
  const currentMission = {
    starbucks_kyoto_reserve: {
      title: "Starbucks Kyoto Reserve Morning Ritual ☕",
      subtitle: "Full End-to-End Customer Experience",
      steps: [
        {
          step: 1,
          name: "Step up to the Register",
          speaker: "Barista Hana-chan",
          dialogue: "Good morning, Swathi! Welcome to Starbucks Reserve Kyoto. What fresh brew can I craft for you today?",
          script: "Hi! Can I please get a Short Classic Signature Hot Chocolate with Oat Milk, Blonde Espresso, and 3 pumps of Vanilla, topped with Vanilla Sweet Cold Foam, and a Tomato & Mozzarella Focaccia Panini warmed up?",
          explanation: "Ordering Short size (8 oz) gives you the richest cocoa-to-milk ratio. Adding a Blonde Espresso shot cuts the cocoa sweetness with subtle nutty notes!",
          actionLabel: "Place Custom Order via Mic",
          xp: 60
        },
        {
          step: 2,
          name: "Payment & Barcode Scanning",
          speaker: "Contactless NFC Terminal",
          dialogue: "Your total is $9.25. Please tap your Apple Pay, card, or scan your Starbucks Rewards App.",
          script: "I'll pay with Apple Pay. Can I also scan my Starbucks Rewards barcode for stars?",
          explanation: "In international stores, always say 'I'll tap to pay' or 'Apple Pay please' for frictionless payments.",
          actionLabel: "Tap Card & Scan Rewards ($9.25)",
          xp: 40
        },
        {
          step: 3,
          name: "Pickup Counter Call & Hand-off",
          speaker: "Barista Haru (Master Brewer)",
          dialogue: "Order for Swathi! Short Signature Hot Chocolate with Blonde shot & Warmed Mozzarella Panini ready at the bar!",
          script: "Thank you so much! It looks delicious. Have a wonderful day!",
          explanation: "Check the cup sleeve for your name `✎ Swathi` and ensure the white cold foam layer sits beautifully atop the dark chocolate.",
          actionLabel: "Pick Up Steaming Cup & Panini Plate",
          xp: 50
        },
        {
          step: 4,
          name: "Condiment Bar & Table Lounge",
          speaker: "Cafe Self-Service Station",
          dialogue: "Take a kraft cup sleeve, green splash stick, and turbinado raw sugar brown packets.",
          script: "Excuse me, where can I find the splash sticks and extra paper napkins?",
          explanation: "A 'Splash Stick' prevents hot coffee from splashing while walking or driving.",
          actionLabel: "Equip Sleeve & Splash Stick",
          xp: 35
        },
        {
          step: 5,
          name: "Sit at Cozy Tatami Booth & Sip",
          speaker: "Mindful Tasting Experience",
          dialogue: "Take a sip of the velvety Vanilla Sweet Cold Foam and hot chocolate below, followed by a bite of warm focaccia.",
          script: "The contrast between the chilled sweet cold foam and hot cocoa is magnificent!",
          explanation: "This hot-and-cold sensory experience is Starbucks' signature flavor science.",
          actionLabel: "Take a Hot Sip & Bite Mozzarella Panini",
          xp: 80
        }
      ]
    },
    singapore_changi_jewel_vortex: {
      title: "Singapore Changi Airport (Jewel & T3) 🌊",
      subtitle: "The World's Best Airport Experience",
      steps: [
        {
          step: 1,
          name: "Arrive at Jewel Rain Vortex",
          speaker: "Changi Airport Ambassador",
          dialogue: "Welcome to Jewel Changi! Before you is the 40-meter HSBC Rain Vortex cascading down through the Shiseido Forest Valley.",
          script: "Could you please direct me to the Jewel Early Check-in lounge and the Skytrain to Terminal 3?",
          explanation: "Jewel is connected directly to Terminal 1, 2, and 3 via indoor climate-controlled glass canopy bridges.",
          actionLabel: "Explore Rain Vortex Waterfall",
          xp: 70
        },
        {
          step: 2,
          name: "Automated Biometric Clearance",
          speaker: "Singapore ICA Automated Gate",
          dialogue: "Please place your thumb on the glass scanner and look directly into the camera lens.",
          script: "My passport is scanned and biometrics verified. Zero physical stamps needed in Singapore!",
          explanation: "Singapore Changi uses 100% passport-less automated biometric gates for international departures.",
          actionLabel: "Scan Thumb & Face Biometrics",
          xp: 65
        },
        {
          step: 3,
          name: "Board Automated Skytrain to Gate B12",
          speaker: "Changi Skytrain Conductor",
          dialogue: "This free automated elevated monorail takes you to Terminal 3 Departure Gates in 3 minutes.",
          script: "Is this the direct Skytrain platform for Gate B12 in Terminal 3?",
          explanation: "The Skytrain runs every 4 minutes and gives you a 360° panoramic view of the cascading waterfall.",
          actionLabel: "Ride Skytrain to Gate B12",
          xp: 50
        }
      ]
    },
    vizag_alluri_sitarama_airport: {
      title: "Vizag Alluri Sitarama Raju Airport (VTZ) 🛫",
      subtitle: "Authentic Indian Airport Masterclass",
      steps: [
        {
          step: 1,
          name: "Terminal Entrance & DigiYatra Gate",
          speaker: "CISF Security Officer at Gate 2",
          dialogue: "Namaste! Please show your Government Photo ID (Aadhaar/Passport) and ticket, or scan your DigiYatra face.",
          script: "Here is my Government ID and mobile boarding pass for the flight to Singapore via Hyderabad.",
          explanation: "In Indian airports, only valid ticketed passengers are allowed inside. DigiYatra allows contactless facial entry!",
          actionLabel: "Scan DigiYatra Face & Show ID",
          xp: 60
        },
        {
          step: 2,
          name: "Baggage Drop & Weighing Scale",
          speaker: "IndiGo / Air India Customer Service Agent",
          dialogue: "Good morning! Please place your check-in suitcase on the scale. 15 kg limit for domestic, 30 kg for international.",
          script: "I have one check-in bag weighing 12.8 kg and one cabin handbag. Can I please request a window seat?",
          explanation: "Powerbanks and loose lithium batteries MUST go into your cabin handbag, never in checked baggage.",
          actionLabel: "Weigh Suitcase (12.8 kg - PASS)",
          xp: 60
        },
        {
          step: 3,
          name: "CISF Security Frisking & X-Ray Tray",
          speaker: "CISF Security Inspector",
          dialogue: "Please remove your laptop, tablet, charger cables, and metallic belts into separate grey trays.",
          script: "My electronics and liquids pouch are in separate trays. Ready for security screening!",
          explanation: "Frisking is the physical metal detector check performed after walking through the security arch.",
          actionLabel: "Pass Security Arch & Frisking",
          xp: 75
        }
      ]
    },
    grand_luxury_presidential_suite: {
      title: "Sakura Grand 5-Star Hotel & Suite 🏨",
      subtitle: "Luxury Concierge & Room Service Experience",
      steps: [
        {
          step: 1,
          name: "Front Desk Registration & Check-in",
          speaker: "Chief Concierge Alexander",
          dialogue: "Welcome to the Sakura Grand Hotel! We have your Deluxe High-Floor Suite 1402 prepared.",
          script: "Good afternoon! I have a reservation for a Deluxe Suite under Swathi. What time is breakfast served?",
          explanation: "Always confirm check-out time and complimentary continental breakfast hours at the front desk.",
          actionLabel: "Sign Hotel Registration & Get Keycard",
          xp: 70
        },
        {
          step: 2,
          name: "Unlock Suite 1402 & Room Service Call",
          speaker: "In-Room Dining Concierge",
          dialogue: "Room 1402 unlocked! Would you like to order evening tea, fresh fruit basket, or extra bath towels?",
          script: "Hello, room service? Could I please order hot chamomile tea and extra goose-down pillows?",
          explanation: "Dial '0' or the dedicated 'In-Room Dining' button on your hotel room telephone.",
          actionLabel: "Practice Room Service Phone Call",
          xp: 65
        }
      ]
    },
    milan_fashion_boutique_runway: {
      title: "Milan Fashion Boutique & Fitting Studio 👗",
      subtitle: "High-End Styling, Fitting & Tax-Free Shopping",
      steps: [
        {
          step: 1,
          name: "Browse Garment Racks & Ask for Size",
          speaker: "Fashion Stylist Isabella",
          dialogue: "Bonjour! This Italian linen blazer and cashmere overcoat just arrived from our Milan atelier.",
          script: "Excuse me, do you have this oversized linen blazer in a size Small or Medium?",
          explanation: "In European boutiques, ask 'May I try this on in the fitting room?' before taking garments.",
          actionLabel: "Ask for Size & Go to Fitting Room",
          xp: 60
        },
        {
          step: 2,
          name: "Fitting Room Mirror & Tax-Free Invoice",
          speaker: "Boutique Cashier Desk",
          dialogue: "It fits you impeccably! Would you like a Global Blue Tax-Free VAT refund invoice for customs?",
          script: "Yes please! Could you prepare a Tax-Free refund form for my passport?",
          explanation: "Tax-Free shopping allows international tourists to claim back 12-22% VAT at the airport customs desk.",
          actionLabel: "Request Tax-Free VAT Receipt",
          xp: 70
        }
      ]
    }
  };

  const currentMissionData = currentMission[activeLocation];
  const activeStepData = currentMissionData.steps[missionStep - 1] || currentMissionData.steps[0];

  // 3D Scene Initialization & AAA Render Pipeline
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Environment Lighting
    const scene = new THREE.Scene();
    
    // Dynamic Sky Colors based on Time of Day
    const skyColors = {
      morning_golden: 0x2b1d19,
      bright_day: 0x0c213f,
      cozy_night_twilight: 0x110c1c
    };
    scene.background = new THREE.Color(skyColors[timeOfDay]);
    scene.fog = new THREE.FogExp2(scene.background, 0.015);

    // 2. Camera & High Performance WebGL Renderer
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Dynamic Sunlight & Ambient Shaders
    const ambientLight = new THREE.AmbientLight(0xffffff, timeOfDay === 'morning_golden' ? 0.9 : timeOfDay === 'bright_day' ? 1.1 : 0.6);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(timeOfDay === 'morning_golden' ? 0xffedd5 : 0xf8fafc, 1.5);
    sun.position.set(18, 30, 18);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    scene.add(sun);

    // Accent Lighting (Warm Coffee Gold / Neon Sky Blue / Lavender Luxury)
    const accentColor = 
      activeLocation === 'starbucks_kyoto_reserve' ? 0xf59e0b :
      activeLocation === 'singapore_changi_jewel_vortex' ? 0x38bdf8 :
      activeLocation === 'vizag_alluri_sitarama_airport' ? 0x10b981 : 0xd946ef;
    
    const pointAccent = new THREE.PointLight(accentColor, 2.8, 30);
    pointAccent.position.set(0, 6, 0);
    scene.add(pointAccent);

    // 4. World Group Architecture
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // High Quality PBR Floor
    const floorGeo = new THREE.PlaneGeometry(100, 100);
    const floorMat = new THREE.MeshStandardMaterial({
      color: activeLocation === 'starbucks_kyoto_reserve' ? 0x3d271d :
             activeLocation === 'singapore_changi_jewel_vortex' ? 0x1e293b :
             activeLocation === 'vizag_alluri_sitarama_airport' ? 0x334155 : 0x24142c,
      roughness: 0.25,
      metalness: 0.15
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    worldGroup.add(floor);

    // Grid Overlay
    const grid = new THREE.GridHelper(100, 50, 0x10b981, 0x475569);
    grid.position.y = 0.01;
    worldGroup.add(grid);

    // Specific 3D Architectures
    let particleSystem: THREE.Points | null = null;
    let particlePositions: Float32Array | null = null;

    if (activeLocation === 'starbucks_kyoto_reserve') {
      // ☕ 3D STARBUCKS RESERVE KYOTO
      // Polished Mahogany Barista Counter
      const counter = new THREE.Mesh(
        new THREE.BoxGeometry(18, 2.4, 4),
        new THREE.MeshStandardMaterial({ color: 0x5c2b14, roughness: 0.2, metalness: 0.1 })
      );
      counter.position.set(0, 1.2, -6);
      counter.castShadow = true;
      worldGroup.add(counter);

      // Siren Emerald Accent Band
      const trim = new THREE.Mesh(
        new THREE.BoxGeometry(18.1, 0.45, 4.1),
        new THREE.MeshStandardMaterial({ color: 0x006241, roughness: 0.3 })
      );
      trim.position.set(0, 2.2, -6);
      worldGroup.add(trim);

      // Commercial Espresso Machine (Mastrena II)
      const espMachine = new THREE.Mesh(
        new THREE.BoxGeometry(4, 1.8, 2.2),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 })
      );
      espMachine.position.set(-4, 3.1, -6);
      worldGroup.add(espMachine);

      // Glass Bakery Case with Warmed Focaccia Paninis
      const bakeryCase = new THREE.Mesh(
        new THREE.BoxGeometry(5, 2, 2.4),
        new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, roughness: 0.1 })
      );
      bakeryCase.position.set(4.5, 3.2, -6);
      worldGroup.add(bakeryCase);

      const paniniMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.4, 0.7),
        new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 })
      );
      paniniMesh.position.set(4.5, 2.5, -6);
      worldGroup.add(paniniMesh);

      // Barista Hana NPC
      const barista = new THREE.Group();
      barista.add(new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffedd5 })));
      const bBody = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.55, 1.3, 16), new THREE.MeshStandardMaterial({ color: 0x006241 }));
      bBody.position.y = -1.1;
      barista.add(bBody);
      barista.position.set(0, 2.5, -7.8);
      worldGroup.add(barista);

      // Coffee Tables & Cozy Booth Seating
      for (let t = -1; t <= 1; t += 2) {
        const table = new THREE.Mesh(
          new THREE.CylinderGeometry(1.5, 1.5, 1.6, 16),
          new THREE.MeshStandardMaterial({ color: 0x451a03 })
        );
        table.position.set(t * 8.5, 0.8, 4);
        worldGroup.add(table);

        const chair = new THREE.Mesh(
          new THREE.BoxGeometry(1.4, 1.1, 1.4),
          new THREE.MeshStandardMaterial({ color: 0x006241 })
        );
        chair.position.set(t * 8.5, 0.55, 6.2);
        worldGroup.add(chair);
      }

    } else if (activeLocation === 'singapore_changi_jewel_vortex') {
      // 🌊 SINGAPORE CHANGI JEWEL RAIN VORTEX
      const basin = new THREE.Mesh(
        new THREE.CylinderGeometry(7, 8, 3, 32),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.5, roughness: 0.2 })
      );
      basin.position.set(0, 1.5, 0);
      worldGroup.add(basin);

      const domeRing = new THREE.Mesh(
        new THREE.TorusGeometry(18, 0.6, 16, 64),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9 })
      );
      domeRing.rotation.x = Math.PI / 2;
      domeRing.position.set(0, 15, 0);
      worldGroup.add(domeRing);

      // 3D Cascading Waterfall Particles
      const pCount = 3000;
      const pGeo = new THREE.BufferGeometry();
      particlePositions = new Float32Array(pCount * 3);
      for (let p = 0; p < pCount; p++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 3.5 + 0.8;
        particlePositions[p * 3] = Math.cos(angle) * radius;
        particlePositions[p * 3 + 1] = Math.random() * 15 + 1.5;
        particlePositions[p * 3 + 2] = Math.sin(angle) * radius;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleSystem = new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.3, transparent: true, opacity: 0.85 })
      );
      worldGroup.add(particleSystem);

      // Terraced Tropical Garden Trees
      for (let t = 0; t < 18; t++) {
        const tAngle = (t / 18) * Math.PI * 2;
        const tDist = 13.5;
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.4, 0.5, 4.5, 8),
          new THREE.MeshStandardMaterial({ color: 0x451a03 })
        );
        trunk.position.set(Math.cos(tAngle) * tDist, 2.25, Math.sin(tAngle) * tDist);
        worldGroup.add(trunk);

        const treeTop = new THREE.Mesh(
          new THREE.DodecahedronGeometry(2.2, 1),
          new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.6 })
        );
        treeTop.position.set(Math.cos(tAngle) * tDist, 5.5, Math.sin(tAngle) * tDist);
        worldGroup.add(treeTop);
      }

      // Elevated Skytrain Bridge
      const track = new THREE.Mesh(
        new THREE.BoxGeometry(36, 0.7, 3.5),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6 })
      );
      track.position.set(0, 8, 9);
      worldGroup.add(track);

    } else if (activeLocation === 'vizag_alluri_sitarama_airport') {
      // 🛫 VIZAG VTZ INTERNATIONAL AIRPORT
      const terminal = new THREE.Mesh(
        new THREE.BoxGeometry(30, 8, 3.5),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })
      );
      terminal.position.set(0, 4, -18);
      worldGroup.add(terminal);

      // Check-in Counter Desks
      const checkinDesk = new THREE.Mesh(
        new THREE.BoxGeometry(12, 2.2, 3),
        new THREE.MeshStandardMaterial({ color: 0x0284c7 })
      );
      checkinDesk.position.set(-9, 1.1, -4);
      worldGroup.add(checkinDesk);

      // Baggage Scale & Conveyor
      const belt = new THREE.Mesh(
        new THREE.BoxGeometry(12, 0.5, 1.8),
        new THREE.MeshStandardMaterial({ color: 0x0f172a })
      );
      belt.position.set(-9, 0.5, -7);
      worldGroup.add(belt);

      // CISF Security Metal Detector Arch
      const arch = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, 4.5, 0.9),
        new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 })
      );
      arch.position.set(0, 2.25, -11);
      worldGroup.add(arch);

    } else if (activeLocation === 'grand_luxury_presidential_suite') {
      // 🏨 SAKURA GRAND HOTEL PRESIDENTIAL SUITE
      const desk = new THREE.Mesh(
        new THREE.BoxGeometry(16, 2.4, 3.5),
        new THREE.MeshStandardMaterial({ color: 0x581c87, roughness: 0.2 })
      );
      desk.position.set(0, 1.2, -6);
      worldGroup.add(desk);

      const chandelier = new THREE.Mesh(
        new THREE.TorusGeometry(3.5, 0.35, 16, 32),
        new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 })
      );
      chandelier.rotation.x = Math.PI / 2;
      chandelier.position.set(0, 9, 0);
      worldGroup.add(chandelier);

    } else {
      // 👗 MILAN FASHION BOUTIQUE
      for (let r = -1; r <= 1; r += 2) {
        const rackBar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.1, 10, 8),
          new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 })
        );
        rackBar.rotation.z = Math.PI / 2;
        rackBar.position.set(r * 9, 3.2, 0);
        worldGroup.add(rackBar);
      }

      const fittingRoom = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 5.5, 4.5),
        new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.3 })
      );
      fittingRoom.position.set(0, 2.75, -11);
      worldGroup.add(fittingRoom);
    }

    // 5. Playable 3D Anime Character (Swathi)
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

    // Travel Backpack
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

    // Steaming Cup / Passport in Hand
    const heldItemMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.09, 0.32, 12),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc })
    );
    heldItemMesh.position.set(0.48, 1.15, 0.24);
    playerGroup.add(heldItemMesh);

    playerGroup.position.set(playerState.current.x, playerState.current.y, playerState.current.z);
    scene.add(playerGroup);

    // 6. Keyboard & Mouse Controls
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

    // 7. 60 FPS Game Loop
    let animId: number;
    let tick = 0;

    const animate = () => {
      tick++;

      // Player Movement Logic
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

      // Boundaries
      playerState.current.x = Math.max(-42, Math.min(42, playerState.current.x));
      playerState.current.z = Math.max(-42, Math.min(42, playerState.current.z));

      // Mesh Transform
      playerGroup.position.set(playerState.current.x, playerState.current.y, playerState.current.z);
      playerGroup.rotation.y = playerState.current.rotY;

      // Camera Perspective Switcher
      if (cameraMode === 'first_person_eyes') {
        camera.position.set(playerState.current.x, playerState.current.y + 2.0, playerState.current.z);
        const lookDirX = -Math.sin(cameraYaw);
        const lookDirZ = -Math.cos(cameraYaw);
        camera.lookAt(playerState.current.x + lookDirX * 10, playerState.current.y + 2.0, playerState.current.z + lookDirZ * 10);
      } else if (cameraMode === 'birds_eye_drone') {
        camera.position.set(playerState.current.x, playerState.current.y + 20, playerState.current.z + 5);
        camera.lookAt(playerState.current.x, playerState.current.y, playerState.current.z);
      } else {
        // Third person follow
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

      // Animate Waterfall Particles
      if (particleSystem && particlePositions) {
        const cnt = particlePositions.length / 3;
        for (let i = 0; i < cnt; i++) {
          particlePositions[i * 3 + 1] -= 0.3;
          if (particlePositions[i * 3 + 1] <= 1.5) {
            particlePositions[i * 3 + 1] = 16;
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
  }, [activeLocation, timeOfDay, cameraMode]);

  // Teleport between locations
  const handleTeleportScene = (loc: SceneLocation) => {
    sound.playClick();
    setActiveLocation(loc);
    setMissionStep(1);
    playerState.current.x = 0;
    playerState.current.y = 0;
    playerState.current.z = 6;
    onAddXp(35, `Teleported to AAA Real Simulator: ${loc.replace(/_/g, ' ')}! 🌍✨`);
  };

  // Execute Step Action
  const handleAdvanceMission = () => {
    sound.playSuccess();
    confetti({ particleCount: 90, spread: 70 });
    onAddXp(activeStepData.xp, `Completed Mission Step ${missionStep}: ${activeStepData.name}! 🌟`);
    
    if (missionStep < currentMissionData.steps.length) {
      setMissionStep(prev => prev + 1);
    } else {
      sound.playLevelUp();
      confetti({ particleCount: 150, spread: 100 });
      onAddXp(120, `Completed Full Real-World Scenario: ${currentMissionData.title}! 🏆`);
    }
  };

  return (
    <div className="space-y-6">
      {/* AAA Top Bar Controls */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
              AAA Next-Gen Real-World Simulator & Form Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-3">
              🌍 {currentMissionData.title}
            </h2>
            <p className="text-indigo-200/80 text-xs sm:text-sm max-w-2xl mt-0.5">
              {currentMissionData.subtitle} • Walk, order, sit, sip, clear automated biometrics, and fill physical customs forms!
            </p>
          </div>

          {/* Quick Environment Controls (Day/Night, Camera, Location) */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-2 rounded-2xl border border-slate-800">
            {/* Camera Switcher */}
            <button
              onClick={() => {
                sound.playClick();
                setCameraMode(prev => 
                  prev === 'third_person_follow' ? 'first_person_eyes' :
                  prev === 'first_person_eyes' ? 'birds_eye_drone' : 'third_person_follow'
                );
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
            >
              <Eye className="w-3.5 h-3.5" />
              {cameraMode === 'third_person_follow' ? "3rd Person" : cameraMode === 'first_person_eyes' ? "1st Person Eyes" : "Drone View"}
            </button>

            {/* Time of Day */}
            <button
              onClick={() => {
                sound.playClick();
                setTimeOfDay(prev => prev === 'morning_golden' ? 'bright_day' : prev === 'bright_day' ? 'cozy_night_twilight' : 'morning_golden');
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
            >
              {timeOfDay === 'morning_golden' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
              {timeOfDay === 'morning_golden' ? "Golden Morning" : timeOfDay === 'bright_day' ? "Bright Daylight" : "Cozy Twilight"}
            </button>
          </div>
        </div>

        {/* 5 Real-World Location Switcher Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar border-t border-indigo-900/60 pt-3">
          {[
            { id: 'starbucks_kyoto_reserve', label: '☕ 1. Starbucks Kyoto Reserve', badge: 'Order & Sit' },
            { id: 'singapore_changi_jewel_vortex', label: '🌊 2. Singapore Jewel Changi', badge: '40m Waterfall' },
            { id: 'vizag_alluri_sitarama_airport', label: '🛫 3. Vizag (VTZ) Airport', badge: 'DigiYatra & CISF' },
            { id: 'grand_luxury_presidential_suite', label: '🏨 4. Sakura Grand Suite', badge: 'Concierge & Keycard' },
            { id: 'milan_fashion_boutique_runway', label: '👗 5. Milan Fashion Boutique', badge: 'Fitting Room' },
          ].map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleTeleportScene(loc.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeLocation === loc.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{loc.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeLocation === loc.id ? 'bg-slate-950 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                {loc.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Real-World Viewport */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-indigo-500/40 bg-slate-950 shadow-2xl">
        <div ref={mountRef} className="w-full h-[500px] cursor-grab active:cursor-grabbing bg-slate-950" />

        {/* Top-Left Avatar Status HUD */}
        <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-indigo-500/30 shadow-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center text-lg font-black">
            👑
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white">[VIP] {playerName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                Step {missionStep} of {currentMissionData.steps.length}
              </span>
            </div>
            <p className="text-[11px] text-indigo-200">
              Holding: ☕ Steaming Short Hot Chocolate ({liquidLevel}% Full)
            </p>
          </div>
        </div>

        {/* Top-Right Action: Physical Form Inspector */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setShowFormModal(true);
            }}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:scale-105 text-slate-950 font-black text-xs rounded-xl shadow-xl flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-4 h-4" />
            📋 Physical Paper Form Lab
          </button>
        </div>

        {/* Interactive Hands-On Action Overlay (Sip, Eat, Wave) */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md p-2 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              sound.playSuccess();
              setLiquidLevel(prev => Math.max(0, prev - 25));
              onAddXp(20, "Took a rich sip of Hot Chocolate & Sweet Cold Foam! ☕");
            }}
            className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-500/40 font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <Coffee className="w-3.5 h-3.5" /> Sip Drink ({liquidLevel}%)
          </button>

          <button
            onClick={() => {
              sound.playSuccess();
              setFoodBitesLeft(prev => Math.max(0, prev - 1));
              onAddXp(20, "Ate a warm bite of Mozzarella Focaccia Panini! 🥪");
            }}
            className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/40 font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <Utensils className="w-3.5 h-3.5" /> Eat Panini ({foodBitesLeft} Bites)
          </button>
        </div>
      </div>

      {/* Real-World Mission Action Hub */}
      <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> Live Interactive Mission Step {missionStep} of {currentMissionData.steps.length}
            </div>
            <h3 className="text-xl font-black text-white mt-0.5">
              {activeStepData.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMissionStep(1)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restart Mission
            </button>
          </div>
        </div>

        {/* Dialogue Card */}
        <div className="p-5 bg-gradient-to-r from-slate-950 to-indigo-950/60 rounded-2xl border border-indigo-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-300">
              🗣️ {activeStepData.speaker}:
            </span>
            <AudioSpeakButton
              text={activeStepData.dialogue}
              label="Listen to Audio"
              className="bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl"
            />
          </div>
          <p className="text-base text-slate-100 font-semibold italic leading-relaxed">
            "{activeStepData.dialogue}"
          </p>
        </div>

        {/* English Deep Meaning & Taste Science */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <Info className="w-4 h-4" /> Real-World Meaning & Taste Science:
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeStepData.explanation}
          </p>
        </div>

        {/* Voice Practice & Step Advance */}
        <div className="space-y-4 border-t border-slate-800 pt-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <Mic className="w-4 h-4 text-pink-400" />
              Practice Your English Response into Microphone:
            </div>
            <AudioSpeakButton
              text={activeStepData.script}
              label="Hear Target Voice"
              className="bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl"
            />
          </div>

          <VoiceSpeechPractice
            targetPhrase={activeStepData.script}
            phraseMeaning="Say this clearly to the officer/barista"
            accentColor="emerald"
            onSuccess={() => {
              handleAdvanceMission();
            }}
          />

          <button
            onClick={handleAdvanceMission}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:scale-[1.01] text-slate-950 font-black rounded-2xl shadow-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>{activeStepData.actionLabel} (+{activeStepData.xp} XP)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Physical Paper Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-2xl flex items-center justify-center border border-amber-500/40">
                  📋
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Official Document Practice
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Singapore SG Arrival Card & US Customs Declaration Form 6059B
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowFormModal(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">1. Full Name (as in Passport):</label>
                <input
                  type="text"
                  defaultValue="Swathi P."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">2. Passport Number:</label>
                <input
                  type="text"
                  defaultValue="Z8942103"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">3. Flight Number & Airline:</label>
                <input
                  type="text"
                  defaultValue="SQ 529 (Singapore Airlines)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">4. Hotel / Accommodation Address:</label>
                <input
                  type="text"
                  defaultValue="Marina Bay Sands / Sakura Grand Hotel"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 font-bold mb-1">5. Purpose of Visit:</label>
                <input
                  type="text"
                  defaultValue="Holiday / Tourism & Business Masterclass"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 font-bold mb-1">Applicant Signature:</label>
                <input
                  type="text"
                  defaultValue="Swathi P."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-serif italic text-sm"
                />
              </div>
            </div>

            <button
              onClick={() => {
                sound.playSuccess();
                confetti({ particleCount: 100, spread: 70 });
                setShowFormModal(false);
                onAddXp(80, "Completed Official Physical Customs Declaration Form! 📋✨");
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black rounded-2xl shadow-xl transition-all text-xs uppercase tracking-wider hover:scale-[1.01]"
            >
              ✓ Sign & Submit Declaration Form (+80 XP)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
