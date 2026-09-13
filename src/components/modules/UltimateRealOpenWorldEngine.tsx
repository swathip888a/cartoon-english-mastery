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
  Utensils
} from 'lucide-react';

interface UltimateRealOpenWorldEngineProps {
  onAddXp: (amount: number, reason: string) => void;
  onNavigateTab?: (tabName: string) => void;
}

// Procedural realistic textures
function createRoadAsphaltTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 512, 512);

  // Road asphalt noise
  for (let i = 0; i < 4000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#334155' : '#0f172a';
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }

  // Yellow dashed lane lines
  ctx.fillStyle = '#facc15';
  for (let y = 30; y < 512; y += 80) {
    ctx.fillRect(250, y, 12, 45);
  }

  // White side shoulder lines
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(20, 0, 8, 512);
  ctx.fillRect(484, 0, 8, 512);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 16);
  return tex;
}

function createSidewalkTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, 0, 256, 256);

  // Concrete slabs
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 3;
  for (let y = 0; y < 256; y += 64) {
    for (let x = 0; x < 256; x += 64) {
      ctx.strokeRect(x, y, 64, 64);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  return tex;
}

interface NPCData {
  id: string;
  name: string;
  role: string;
  zone: string;
  x: number;
  z: number;
  dialogue: string;
  script: string;
  explanation: string;
  actionTitle: string;
  xp: number;
}

export const UltimateRealOpenWorldEngine: React.FC<UltimateRealOpenWorldEngineProps> = ({ onAddXp }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Player & Vehicle State
  const [isDriving, setIsDriving] = useState<boolean>(false);
  const [carSpeedKmH, setCarSpeedKmH] = useState<number>(0);
  const [cameraPerspective, setCameraPerspective] = useState<'third_person' | 'first_person_eyes' | 'car_cockpit'>('third_person');
  const [currentZoneName, setCurrentZoneName] = useState<string>('Kyoto Avenue & Starbucks Plaza');
  const [playerName] = useState<string>('Swathi');

  // Modals & Overlays
  const [activeNpcModal, setActiveNpcModal] = useState<NPCData | null>(null);
  const [showOverheadMenuModal, setShowOverheadMenuModal] = useState<boolean>(false);
  const [showFidsModal, setShowFidsModal] = useState<boolean>(false);
  const [showFormModal, setShowFormModal] = useState<boolean>(false);

  // Interactive Consumables
  const [drinkLiquidPct, setDrinkLiquidPct] = useState<number>(100);
  const [foodBitesLeft, setFoodBitesLeft] = useState<number>(4);

  // Virtual Touch Joystick State
  const [joystickActive, setJoystickActive] = useState<boolean>(false);
  const joystickCenter = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const joystickVector = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // NPCs Across Open World
  const npcs: NPCData[] = [
    {
      id: 'barista_hana',
      name: 'Hana-chan',
      role: 'Master Barista',
      zone: 'Starbucks Reserve Cafe',
      x: 0,
      z: -26,
      dialogue: 'Welcome to Starbucks Reserve! Would you like our Signature Hot Chocolate with Oat Milk and Blonde Espresso?',
      script: 'Hi! Can I please get a Short Classic Signature Hot Chocolate with Oat Milk, Blonde Espresso, and 3 pumps of Vanilla, topped with Vanilla Sweet Cold Foam, and a Tomato & Mozzarella Focaccia Panini warmed up?',
      explanation: 'Short (8 oz) gives maximum rich cocoa flavor. Blonde espresso balances sweetness with nutty aroma!',
      actionTitle: 'Order Custom Drink & Panini',
      xp: 75
    },
    {
      id: 'driving_instructor_dave',
      name: 'Captain Dave',
      role: 'Certified Driving Instructor',
      zone: 'Grand City Highway',
      x: 18,
      z: 10,
      dialogue: 'Ready to drive? Check your rear-view mirror, signal left, and smoothly merge onto the highway. Speed limit is 45 mph!',
      script: 'Checking blind spots, turning on left signal, and merging smoothly into traffic.',
      explanation: 'In real driving, "Checking blind spots" means turning your head over your shoulder before changing lanes.',
      actionTitle: 'Practice Real Highway Driving English',
      xp: 80
    },
    {
      id: 'cisf_officer_sharma',
      name: 'Officer Sharma',
      role: 'CISF Airport Security Gate',
      zone: 'Vizag (VTZ) Airport Entrance',
      x: -30,
      z: 15,
      dialogue: 'Namaste! Please show your Government Photo ID and ticket or scan your DigiYatra face.',
      script: 'Here is my Government ID and mobile boarding pass for the flight to Singapore.',
      explanation: 'In Indian airports, DigiYatra enables 100% paperless biometric entry by looking into the facial camera.',
      actionTitle: 'Clear DigiYatra Entrance Gate',
      xp: 65
    },
    {
      id: 'ica_officer_liam',
      name: 'Officer Liam',
      role: 'Singapore ICA Biometrics',
      zone: 'Singapore Changi Terminal 3',
      x: 35,
      z: -25,
      dialogue: 'Welcome to Singapore! Please place your thumb on the optical scanner and look directly into the camera.',
      script: 'My passport is scanned and biometrics verified. Thank you, officer!',
      explanation: 'Singapore Changi offers automated biometric clearance without physical passport ink stamps.',
      actionTitle: 'Clear Singapore Biometric Passport Gate',
      xp: 70
    },
    {
      id: 'concierge_alexander',
      name: 'Alexander',
      role: 'Chief Hotel Concierge',
      zone: 'Sakura Grand Hotel',
      x: -25,
      z: -25,
      dialogue: 'Good afternoon! Your Deluxe High-Floor Suite 1402 is ready. Here is your RFID keycard.',
      script: 'Good afternoon! I have a reservation under Swathi. What time is breakfast served?',
      explanation: 'Confirming complimentary breakfast hours and check-out time is standard hotel etiquette.',
      actionTitle: 'Complete Hotel Check-In & Get Keycard',
      xp: 70
    }
  ];

  // Target Script
  const fullOrderScript = "Hi! Can I please get a Short Classic Signature Hot Chocolate with Oat Milk, Blonde Espresso, and 3 pumps of Vanilla, topped with Vanilla Sweet Cold Foam, and a Tomato & Mozzarella Focaccia Panini warmed up?";

  // Physics & Game Loop State
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const playerState = useRef({
    x: 0,
    y: 0,
    z: 15,
    rotY: 0,
    vy: 0,
    isGrounded: true,
    speed: 0.18
  });

  const carState = useRef({
    x: 18,
    y: 0,
    z: 12,
    rotY: 0,
    speed: 0,
    maxSpeed: 0.65,
    accel: 0.015,
    friction: 0.96,
    steer: 0
  });

  // 3D Scene Initialization
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    scene.fog = new THREE.FogExp2(0x0f172a, 0.009);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 6, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfffaed, 1.8);
    sun.position.set(30, 60, 30);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    scene.add(sun);

    // 3. World Group Architecture
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Main Ground (Asphalt & Pavement)
    const groundMat = new THREE.MeshStandardMaterial({
      map: createSidewalkTexture(),
      roughness: 0.4
    });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    worldGroup.add(ground);

    // Central 4-Lane City Highway Road
    const roadMat = new THREE.MeshStandardMaterial({
      map: createRoadAsphaltTexture(),
      roughness: 0.25
    });
    const road = new THREE.Mesh(new THREE.PlaneGeometry(24, 160), roadMat);
    road.position.set(18, 0.02, 0);
    road.rotation.x = -Math.PI / 2;
    road.receiveShadow = true;
    worldGroup.add(road);

    // Street Lamps along Road
    for (let l = -60; l <= 60; l += 30) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 7, 8), new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 }));
      pole.position.set(5, 3.5, l);
      worldGroup.add(pole);

      const lamp = new THREE.PointLight(0xfef08a, 2.0, 18);
      lamp.position.set(5, 7, l);
      scene.add(lamp);
    }

    // --- BUILDING 1: REAL STARBUCKS RESERVE SHOP (North) ---
    const sbGroup = new THREE.Group();
    sbGroup.position.set(0, 0, -25);

    // Floor
    const sbFloor = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), new THREE.MeshStandardMaterial({ color: 0x3d271d }));
    sbFloor.rotation.x = -Math.PI / 2;
    sbFloor.position.y = 0.05;
    sbGroup.add(sbFloor);

    // Back Wall
    const sbWall = new THREE.Mesh(new THREE.BoxGeometry(30, 8, 1), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
    sbWall.position.set(0, 4, -10);
    sbGroup.add(sbWall);

    // Main Mahogany Counter
    const sbCounter = new THREE.Mesh(new THREE.BoxGeometry(18, 2.2, 4), new THREE.MeshStandardMaterial({ color: 0x451a03 }));
    sbCounter.position.set(0, 1.1, -4);
    sbGroup.add(sbCounter);

    // Espresso Machine & Bakery Case
    const sbEsp = new THREE.Mesh(new THREE.BoxGeometry(4, 1.6, 2), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 }));
    sbEsp.position.set(-4, 2.9, -4);
    sbGroup.add(sbEsp);

    const sbBakery = new THREE.Mesh(new THREE.BoxGeometry(5, 1.8, 2.2), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 }));
    sbBakery.position.set(4, 3.0, -4);
    sbGroup.add(sbBakery);

    worldGroup.add(sbGroup);

    // --- BUILDING 2: AIRPORT & LIVE FIDS TERMINAL (West) ---
    const apGroup = new THREE.Group();
    apGroup.position.set(-35, 0, 10);
    const apTerminal = new THREE.Mesh(new THREE.BoxGeometry(26, 9, 18), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2 }));
    apTerminal.position.set(0, 4.5, 0);
    apGroup.add(apTerminal);
    worldGroup.add(apGroup);

    // --- BUILDING 3: SINGAPORE CHANGI JEWEL RAIN VORTEX (East) ---
    const jwGroup = new THREE.Group();
    jwGroup.position.set(42, 0, -20);
    const jwBasin = new THREE.Mesh(new THREE.CylinderGeometry(8, 9, 3, 32), new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.5 }));
    jwBasin.position.set(0, 1.5, 0);
    jwGroup.add(jwBasin);

    // Waterfall Particles
    const pCount = 2500;
    const pGeo = new THREE.BufferGeometry();
    const pCoords = new Float32Array(pCount * 3);
    for (let p = 0; p < pCount; p++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 3.5 + 0.8;
      pCoords[p * 3] = Math.cos(angle) * r;
      pCoords[p * 3 + 1] = Math.random() * 14 + 1.5;
      pCoords[p * 3 + 2] = Math.sin(angle) * r;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pCoords, 3));
    const waterfallParticles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.3, transparent: true, opacity: 0.85 }));
    jwGroup.add(waterfallParticles);
    worldGroup.add(jwGroup);

    // --- DRIVABLE 3D CAR (Sports Sedan) ---
    const carGroup = new THREE.Group();
    // Body Chassis
    const carBody = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 4.8), new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.8, roughness: 0.2 }));
    carBody.position.y = 0.65;
    carBody.castShadow = true;
    carGroup.add(carBody);

    // Cabin Roof & Glass
    const carRoof = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.75, 2.6), new THREE.MeshPhysicalMaterial({ color: 0x0f172a, transparent: true, opacity: 0.7 }));
    carRoof.position.set(0, 1.45, -0.3);
    carGroup.add(carRoof);

    // 4 Wheels
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    for (let wx of [-1.25, 1.25]) {
      for (let wz of [-1.5, 1.5]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16), wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(wx, 0.4, wz);
        carGroup.add(wheel);
      }
    }

    // Headlights
    const carHeadlight1 = new THREE.SpotLight(0xfffaed, 3.0, 30, Math.PI / 6);
    carHeadlight1.position.set(-0.8, 0.7, 2.4);
    carHeadlight1.target.position.set(-0.8, 0, 15);
    carGroup.add(carHeadlight1);
    carGroup.add(carHeadlight1.target);

    const carHeadlight2 = new THREE.SpotLight(0xfffaed, 3.0, 30, Math.PI / 6);
    carHeadlight2.position.set(0.8, 0.7, 2.4);
    carHeadlight2.target.position.set(0.8, 0, 15);
    carGroup.add(carHeadlight2);
    carGroup.add(carHeadlight2.target);

    carGroup.position.set(carState.current.x, 0, carState.current.z);
    scene.add(carGroup);

    // --- PLAYABLE 3D CHARACTER (Swathi) ---
    const playerGroup = new THREE.Group();
    // Head
    const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffedd5 }));
    pHead.position.y = 2.0;
    pHead.castShadow = true;
    playerGroup.add(pHead);

    // Hair
    const pHair = new THREE.Mesh(new THREE.SphereGeometry(0.54, 16, 16), new THREE.MeshStandardMaterial({ color: 0x3b1d11 }));
    pHair.position.set(0, 2.1, -0.05);
    playerGroup.add(pHair);

    // Torso Blazer
    const pTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.46, 1.0, 16), new THREE.MeshStandardMaterial({ color: 0xec4899 }));
    pTorso.position.y = 1.2;
    pTorso.castShadow = true;
    playerGroup.add(pTorso);

    // Legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const pLeftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.75, 8), legMat);
    pLeftLeg.position.set(-0.2, 0.38, 0);
    playerGroup.add(pLeftLeg);

    const pRightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.75, 8), legMat);
    pRightLeg.position.set(0.2, 0.38, 0);
    playerGroup.add(pRightLeg);

    playerGroup.position.set(playerState.current.x, playerState.current.y, playerState.current.z);
    scene.add(playerGroup);

    // --- 3D NPC CHARACTERS ON STREET & SHOPS ---
    npcs.forEach((npc) => {
      const npcGroup = new THREE.Group();
      npcGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.48, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffedd5 })));
      const nBody = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 1.0, 16), new THREE.MeshStandardMaterial({ color: npc.id === 'barista_hana' ? 0x006241 : npc.id === 'driving_instructor_dave' ? 0xd97706 : 0x0284c7 }));
      nBody.position.y = -1.0;
      npcGroup.add(nBody);

      // Floating Name Marker
      const ring = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.5, 24), new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, transparent: true, opacity: 0.6 }));
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -1.5;
      npcGroup.add(ring);

      npcGroup.position.set(npc.x, 2.0, npc.z);
      worldGroup.add(npcGroup);
    });

    // 4. Input Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
      if (e.code === 'KeyF') {
        // Toggle Enter/Exit Car
        const distToCar = Math.hypot(playerState.current.x - carState.current.x, playerState.current.z - carState.current.z);
        if (distToCar < 4.5 || isDriving) {
          sound.playClick();
          setIsDriving(prev => !prev);
          onAddXp(30, isDriving ? "Exited Sports Sedan 🚶" : "Entered Sports Sedan 🚗 Ready to Drive!");
        }
      }
      if (e.code === 'Space' && playerState.current.isGrounded && !isDriving) {
        playerState.current.vy = 0.24;
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
      cameraDistance = Math.max(3, Math.min(25, cameraDistance + e.deltaY * 0.01));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel);

    // 5. 60 FPS Render Loop
    let animId: number;
    let tick = 0;

    const animate = () => {
      tick++;

      if (isDriving) {
        // --- CAR DRIVING PHYSICS ---
        playerGroup.visible = false; // Player is inside car

        // Accelerate / Brake / Reverse
        let throttle = 0;
        let steering = 0;

        if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp'] || joystickVector.current.y < -0.2) throttle += 1;
        if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown'] || joystickVector.current.y > 0.2) throttle -= 1;
        if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft'] || joystickVector.current.x < -0.2) steering -= 1;
        if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight'] || joystickVector.current.x > 0.2) steering += 1;

        if (throttle > 0) {
          carState.current.speed = Math.min(carState.current.maxSpeed, carState.current.speed + carState.current.accel);
        } else if (throttle < 0) {
          carState.current.speed = Math.max(-carState.current.maxSpeed * 0.4, carState.current.speed - carState.current.accel);
        } else {
          carState.current.speed *= carState.current.friction;
        }

        if (Math.abs(carState.current.speed) > 0.01) {
          carState.current.rotY -= steering * 0.035 * (carState.current.speed > 0 ? 1 : -1);
        }

        carState.current.x += Math.sin(carState.current.rotY) * carState.current.speed;
        carState.current.z += Math.cos(carState.current.rotY) * carState.current.speed;

        carGroup.position.set(carState.current.x, 0, carState.current.z);
        carGroup.rotation.y = carState.current.rotY;

        // Keep player position synced with car
        playerState.current.x = carState.current.x;
        playerState.current.z = carState.current.z;

        setCarSpeedKmH(Math.round(Math.abs(carState.current.speed) * 160));

        // Follow Camera behind car
        const cx = carState.current.x;
        const cy = 1.8;
        const cz = carState.current.z;

        camera.position.set(
          cx - Math.sin(carState.current.rotY) * 9,
          cy + 4.5,
          cz - Math.cos(carState.current.rotY) * 9
        );
        camera.lookAt(cx, cy + 1, cz);

      } else {
        // --- ON-FOOT WALKING PHYSICS ---
        playerGroup.visible = true;

        const speed = playerState.current.speed;
        let moveX = 0;
        let moveZ = 0;

        if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp'] || joystickVector.current.y < -0.2) moveZ -= 1;
        if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown'] || joystickVector.current.y > 0.2) moveZ += 1;
        if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft'] || joystickVector.current.x < -0.2) moveX -= 1;
        if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight'] || joystickVector.current.x > 0.2) moveX += 1;

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

        playerState.current.x = Math.max(-70, Math.min(70, playerState.current.x));
        playerState.current.z = Math.max(-70, Math.min(70, playerState.current.z));

        playerGroup.position.set(playerState.current.x, playerState.current.y, playerState.current.z);
        playerGroup.rotation.y = playerState.current.rotY;

        // Camera Follow
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

      // Check current zone based on position
      const px = playerState.current.x;
      const pz = playerState.current.z;
      if (pz < -15 && Math.abs(px) < 15) {
        setCurrentZoneName('☕ Starbucks Reserve Cafe & Bakery');
      } else if (px < -20 && pz > 0) {
        setCurrentZoneName('🛫 Vizag (VTZ) Alluri Sitarama Raju Airport');
      } else if (px > 25 && pz < -10) {
        setCurrentZoneName('🌊 Singapore Changi Jewel 40m Rain Vortex');
      } else if (px > 5 && px < 30) {
        setCurrentZoneName('🚗 Grand Highway & Driving School');
      } else {
        setCurrentZoneName('🏙️ Open-World City Plaza');
      }

      // Animate Waterfall
      const coords = pCoords;
      for (let p = 0; p < pCount; p++) {
        coords[p * 3 + 1] -= 0.3;
        if (coords[p * 3 + 1] <= 1.5) {
          coords[p * 3 + 1] = 14;
        }
      }
      pGeo.attributes.position.needsUpdate = true;

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
  }, [isDriving]);

  // Touch Joystick Touch Events
  const handleJoystickStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    joystickCenter.current = { x: touch.clientX, y: touch.clientY };
    setJoystickActive(true);
  };

  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!joystickActive) return;
    const touch = e.touches[0];
    const dx = touch.clientX - joystickCenter.current.x;
    const dy = touch.clientY - joystickCenter.current.y;
    const dist = Math.hypot(dx, dy);
    const maxDist = 40;
    const nx = dist > 0 ? (dx / dist) * Math.min(dist, maxDist) / maxDist : 0;
    const ny = dist > 0 ? (dy / dist) * Math.min(dist, maxDist) / maxDist : 0;
    joystickVector.current = { x: nx, y: ny };
  };

  const handleJoystickEnd = () => {
    setJoystickActive(false);
    joystickVector.current = { x: 0, y: 0 };
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
              Ultimate 3D Real-World Life Simulator & Driving Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-3">
              🌍 100% Real Open World: Drive, Walk, Order & Fly!
            </h2>
            <p className="text-indigo-200/80 text-xs sm:text-sm max-w-2xl mt-0.5">
              Current Zone: <strong className="text-amber-300">{currentZoneName}</strong> • Walk up to characters to talk, press [F] to drive sports cars, inspect overhead Starbucks menu TVs, and board flights!
            </p>
          </div>

          {/* Quick Zone Teleporters */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/90 p-2 rounded-2xl border border-slate-800">
            <button
              onClick={() => {
                sound.playClick();
                playerState.current.x = 0;
                playerState.current.z = -22;
                setIsDriving(false);
                onAddXp(30, "Teleported to Starbucks Reserve! ☕");
              }}
              className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow"
            >
              ☕ Starbucks
            </button>
            <button
              onClick={() => {
                sound.playClick();
                playerState.current.x = -30;
                playerState.current.z = 10;
                setIsDriving(false);
                onAddXp(30, "Teleported to Vizag VTZ Airport! 🛫");
              }}
              className="px-3 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl shadow"
            >
              🛫 Vizag Airport
            </button>
            <button
              onClick={() => {
                sound.playClick();
                playerState.current.x = 42;
                playerState.current.z = -15;
                setIsDriving(false);
                onAddXp(30, "Teleported to Singapore Jewel! 🌊");
              }}
              className="px-3 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow"
            >
              🌊 Jewel Changi
            </button>
            <button
              onClick={() => {
                sound.playClick();
                playerState.current.x = 18;
                playerState.current.z = 12;
                setIsDriving(true);
                onAddXp(40, "Entered Sports Sedan on Highway! 🚗");
              }}
              className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow"
            >
              🚗 Drive Car
            </button>
          </div>
        </div>
      </div>

      {/* 3D Viewport with Virtual On-Screen Analog Joystick */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-indigo-500/40 bg-slate-950 shadow-2xl">
        <div ref={mountRef} className="w-full h-[540px] cursor-grab active:cursor-grabbing bg-slate-950" />

        {/* Top-Left Avatar & Vehicle Speedometer HUD */}
        <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-indigo-500/30 shadow-xl flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center text-xl font-black">
            {isDriving ? '🚗' : '👑'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white">{playerName}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isDriving ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                {isDriving ? `DRIVING: ${carSpeedKmH} KM/H` : 'WALKING'}
              </span>
            </div>
            <p className="text-[11px] text-indigo-200">
              {currentZoneName}
            </p>
          </div>
        </div>

        {/* Top-Right Quick Screens */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setShowOverheadMenuModal(true)}
            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-xl flex items-center gap-1.5 transition-all"
          >
            <Tv className="w-4 h-4" />
            ☕ Starbucks Menu TV
          </button>
          <button
            onClick={() => setShowFidsModal(true)}
            className="px-3.5 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-xl shadow-xl flex items-center gap-1.5 transition-all"
          >
            <Plane className="w-4 h-4" />
            🛫 Airport Flight Board
          </button>
          <button
            onClick={() => setShowFormModal(true)}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-xl flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-4 h-4" />
            📋 Physical Form
          </button>
        </div>

        {/* Floating Driving Prompt when near car */}
        {!isDriving && Math.hypot(playerState.current.x - 18, playerState.current.z - 12) < 5 && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 animate-bounce z-20">
            <button
              onClick={() => {
                sound.playClick();
                setIsDriving(true);
                onAddXp(30, "Entered Car! 🚗");
              }}
              className="px-5 py-2.5 bg-amber-500 text-slate-950 font-black rounded-2xl shadow-2xl text-xs flex items-center gap-2 border border-white"
            >
              <Car className="w-4 h-4" />
              Press [F] or Tap to Drive Sports Car! 🚗
            </button>
          </div>
        )}

        {/* Virtual On-Screen Analog Touch Joystick (Bottom-Left) */}
        <div
          onTouchStart={handleJoystickStart}
          onTouchMove={handleJoystickMove}
          onTouchEnd={handleJoystickEnd}
          className="absolute bottom-6 left-6 w-28 h-28 rounded-full bg-slate-950/75 border-2 border-indigo-500/50 backdrop-blur-md flex items-center justify-center touch-none select-none z-30 shadow-2xl"
        >
          <div
            className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 border border-white shadow-lg transition-transform duration-75 pointer-events-none"
            style={{
              transform: `translate(${joystickVector.current.x * 24}px, ${joystickVector.current.y * 24}px)`
            }}
          />
        </div>

        {/* Action Buttons (Jump / Car Exit) (Bottom-Right) */}
        <div className="absolute bottom-6 right-6 flex items-center gap-3 z-30">
          {isDriving ? (
            <button
              onClick={() => {
                sound.playClick();
                setIsDriving(false);
              }}
              className="px-5 py-3.5 bg-red-500 hover:bg-red-400 text-white font-black rounded-2xl shadow-2xl text-xs flex items-center gap-2 border border-white/50"
            >
              <Car className="w-4 h-4" /> Exit Car [F]
            </button>
          ) : (
            <button
              onClick={() => {
                if (playerState.current.isGrounded) {
                  playerState.current.vy = 0.24;
                  playerState.current.isGrounded = false;
                  sound.playClick();
                }
              }}
              className="px-5 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-2xl shadow-2xl text-xs flex items-center gap-2 border border-white/50"
            >
              🦘 Jump [Space]
            </button>
          )}
        </div>
      </div>

      {/* NPC Interactive Roster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {npcs.map((npc) => (
          <div
            key={npc.id}
            className="p-5 bg-slate-900/90 rounded-3xl border border-indigo-500/30 shadow-xl space-y-3 hover:border-indigo-500 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-black text-lg border border-indigo-500/30">
                  {npc.id === 'barista_hana' ? '👩‍🍳' : npc.id === 'driving_instructor_dave' ? '🚘' : npc.id === 'cisf_officer_sharma' ? '👮‍♂️' : '🛂'}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{npc.name}</h4>
                  <p className="text-[11px] text-slate-400">{npc.role} • {npc.zone}</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                +{npc.xp} XP
              </span>
            </div>

            <p className="text-xs text-slate-300 italic">"{npc.dialogue}"</p>

            <button
              onClick={() => {
                sound.playClick();
                setActiveNpcModal(npc);
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow transition-all flex items-center justify-center gap-1.5"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Talk & Practice English</span>
            </button>
          </div>
        ))}
      </div>

      {/* NPC Conversation & Voice Practice Modal */}
      {activeNpcModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border-2 border-indigo-500/60 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Live Spoken English Simulation
                </span>
                <h3 className="text-xl font-black text-white">
                  Speaking with {activeNpcModal.name} ({activeNpcModal.role})
                </h3>
              </div>
              <button
                onClick={() => setActiveNpcModal(null)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-amber-400">{activeNpcModal.name}:</span>
              <p className="text-sm text-slate-100 font-semibold italic leading-relaxed">"{activeNpcModal.dialogue}"</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">Your Fluent English Response:</span>
                <AudioSpeakButton
                  text={activeNpcModal.script}
                  label="Hear Native Audio"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl"
                />
              </div>
              <p className="text-sm text-white font-bold bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/30">
                "{activeNpcModal.script}"
              </p>
            </div>

            <VoiceSpeechPractice
              targetPhrase={activeNpcModal.script}
              phraseMeaning={activeNpcModal.explanation}
              accentColor="indigo"
              onSuccess={() => {
                sound.playSuccess();
                confetti({ particleCount: 100, spread: 80 });
                setActiveNpcModal(null);
                onAddXp(activeNpcModal.xp, `Mastered Spoken English with ${activeNpcModal.name}! 🌟`);
              }}
            />
          </div>
        </div>
      )}

      {/* Starbucks Digital Overhead Menu Modal */}
      {showOverheadMenuModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Digital Store TV Screen</span>
                <h3 className="text-2xl font-black text-white">Starbucks Reserve Overhead Menu Boards ☕</h3>
              </div>
              <button
                onClick={() => setShowOverheadMenuModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                ✕ Back to World
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 border-b border-slate-800 pb-1">☕ Espresso & Classics</h4>
                <div>Caffè Latte — $4.95</div>
                <div>Caramel Macchiato — $5.45</div>
                <div>Blonde Vanilla Latte — $5.25</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-teal-400 border-b border-slate-800 pb-1">🍫 Cocoa & Cold Foam</h4>
                <div className="text-emerald-300 font-bold">Signature Hot Choc — $4.85 ⭐</div>
                <div>White Hot Chocolate — $4.95</div>
                <div>Sweet Cold Foam Cloud — +$1.25</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-pink-400 border-b border-slate-800 pb-1">🥪 Warmed Paninis</h4>
                <div className="text-amber-300 font-bold">Tomato Mozzarella Panini — $6.45 🔥</div>
                <div>Bacon Gouda Roll — $5.95</div>
                <div>All-Butter Croissant — $3.85</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Airport Live FIDS Flight Board Modal */}
      {showFidsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border-2 border-sky-500/60 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-400">Live Airport Departures (FIDS)</span>
                <h3 className="text-2xl font-black text-white">International Departure Board 🛫</h3>
              </div>
              <button
                onClick={() => setShowFidsModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                ✕ Back to World
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl font-mono text-xs text-sky-200 space-y-2">
              <div className="flex justify-between font-bold text-amber-400 border-b border-slate-800 pb-2">
                <span>FLIGHT</span>
                <span>DESTINATION</span>
                <span>GATE</span>
                <span>STATUS</span>
              </div>
              <div className="flex justify-between py-1 text-white font-bold">
                <span>SQ 529 (Singapore Airlines)</span>
                <span>Singapore Changi (SIN)</span>
                <span className="text-amber-300">Gate B12</span>
                <span className="text-emerald-400 animate-pulse">BOARDING NOW</span>
              </div>
              <div className="flex justify-between py-1">
                <span>6E 712 (IndiGo)</span>
                <span>New Delhi (DEL)</span>
                <span>Gate 03</span>
                <span>ON TIME</span>
              </div>
              <div className="flex justify-between py-1">
                <span>AI 451 (Air India)</span>
                <span>Hyderabad (HYD)</span>
                <span>Gate 01</span>
                <span>SECURITY OPEN</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Physical Paper Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">Physical Travel Documents</span>
                <h3 className="text-xl font-black text-white">Singapore SG Arrival Card & Customs Form 6059B 📋</h3>
              </div>
              <button
                onClick={() => setShowFormModal(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Full Name:</label>
                <input type="text" defaultValue="Swathi P." className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">Passport Number:</label>
                <input type="text" defaultValue="Z8942103" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-400 font-bold mb-1">Hotel Address:</label>
                <input type="text" defaultValue="Marina Bay Sands / Sakura Grand Hotel" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" />
              </div>
            </div>

            <button
              onClick={() => {
                sound.playSuccess();
                confetti({ particleCount: 100, spread: 80 });
                setShowFormModal(false);
                onAddXp(80, "Submitted Official Physical Customs Form! 📋✨");
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black rounded-2xl shadow-xl text-xs uppercase tracking-wider"
            >
              ✓ Sign & Submit Document (+80 XP)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
