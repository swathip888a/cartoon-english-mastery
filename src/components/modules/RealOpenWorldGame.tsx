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

export const RealOpenWorldGame: React.FC<RealOpenWorldGameProps> = ({ onAddXp }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Active Zone & Camera
  const [activeDistrict, setActiveDistrict] = useState<WorldDistrict>('district_starbucks');
  const [cameraView, setCameraView] = useState<'third_person' | 'first_person_eyes' | 'birds_eye'>('third_person');
  const [timeOfDay, setTimeOfDay] = useState<'golden_morning' | 'bright_day' | 'cozy_night'>('golden_morning');

  // Interactive In-World Screen Modals
  const [showMenuBoardModal, setShowMenuBoardModal] = useState<boolean>(false);
  const [showFidsFlightModal, setShowFidsFlightModal] = useState<boolean>(false);
  const [showPaperFormModal, setShowPaperFormModal] = useState<boolean>(false);
  const [showItemInspectModal, setShowItemInspectModal] = useState<string | null>(null);

  // Player & Interactive State
  const [playerName] = useState<string>('Swathi');
  const [drinkLiquidPct, setDrinkLiquidPct] = useState<number>(100);
  const [foodBitesLeft, setFoodBitesLeft] = useState<number>(4);
  const [nearbyInteractiveTarget, setNearbyInteractiveTarget] = useState<{
    id: string;
    title: string;
    type: 'screen' | 'npc' | 'station' | 'table';
    action: () => void;
  } | null>(null);

  // Flight Data for Live Airport FIDS Display Board
  const flightData = [
    { flight: 'SQ 529', airline: 'Singapore Airlines', dest: 'Singapore Changi (SIN)', gate: 'B12', time: '14:45', status: 'BOARDING', terminal: 'T3' },
    { flight: '6E 712', airline: 'IndiGo', dest: 'New Delhi (DEL)', gate: 'Gate 3', time: '15:10', status: 'ON TIME', terminal: 'T1' },
    { flight: 'AI 451', airline: 'Air India', dest: 'Hyderabad (HYD)', gate: 'Gate 1', time: '15:30', status: 'SECURITY OPEN', terminal: 'T1' },
    { flight: 'EK 318', airline: 'Emirates', dest: 'Dubai International (DXB)', gate: 'Gate A4', time: '16:00', status: 'ON TIME', terminal: 'T2' },
    { flight: 'JL 036', airline: 'Japan Airlines', dest: 'Tokyo Haneda (HND)', gate: 'Gate C8', time: '16:20', status: 'CHECK-IN OPEN', terminal: 'T3' },
  ];

  // Starbucks Overhead Digital Menu Categories
  const starbucksMenu = {
    espresso: [
      { name: 'Caffè Latte', price: '$4.95', cal: '190 kcal', desc: 'Rich espresso balanced with steamed milk and light layer of foam.' },
      { name: 'Caramel Macchiato', price: '$5.45', cal: '250 kcal', desc: 'Steamed milk with vanilla syrup, marked with espresso and caramel drizzle.' },
      { name: 'Blonde Vanilla Latte', price: '$5.25', cal: '200 kcal', desc: 'Extra smooth blonde espresso roast with velvety milk and vanilla syrup.' },
      { name: 'Caffè Mocha', price: '$5.35', cal: '370 kcal', desc: 'Espresso with bittersweet mocha sauce, steamed milk, and whipped cream.' }
    ],
    chocolate_tea: [
      { name: 'Signature Hot Chocolate', price: '$4.85', cal: '320 kcal', desc: 'Steamed milk with rich dark chocolate cocoa and mocha sauce.', badge: 'Swathi\'s Pick ⭐' },
      { name: 'White Hot Chocolate', price: '$4.95', cal: '390 kcal', desc: 'Buttery white chocolate sauce blended with steamed milk and cream.' },
      { name: 'Iced Matcha Green Tea Latte', price: '$5.65', cal: '200 kcal', desc: 'Smooth sweetened Japanese Uji matcha green tea shaken with milk and ice.' },
      { name: 'Chai Tea Latte', price: '$4.95', cal: '240 kcal', desc: 'Black tea infused with cinnamon, clove, and warm spices steamed with milk.' }
    ],
    custom_addons: [
      { name: 'Oat Milk (Oatly Barista)', price: '+$0.70', desc: 'Creamy, sweet, and nutty plant-based milk that blends flawlessly with cocoa.', tag: 'Creamy Perfection' },
      { name: 'Blonde Espresso Shot', price: '+$1.00', desc: 'Mellow, lightly roasted coffee beans that add depth without dark roast bitterness.', tag: 'Flavor Science' },
      { name: 'Vanilla Syrup (3 Pumps)', price: '+$0.80', desc: 'Madagascar vanilla syrup balancing rich bittersweet chocolate.', tag: 'Sweet Harmony' },
      { name: 'Vanilla Sweet Cold Foam', price: '+$1.25', desc: 'Thick velvety cold cream cloud sitting on top for a hot-and-cold contrast.', tag: 'Sensory Cloud' }
    ],
    bakery_paninis: [
      { name: 'Tomato & Mozzarella Focaccia Panini', price: '$6.45', cal: '360 kcal', desc: 'Melted fresh mozzarella cheese, roasted tomatoes, and basil pesto on toasted focaccia.', badge: 'Warmed Up 🔥' },
      { name: 'Bacon, Gouda & Egg Sandwich', price: '$5.95', cal: '360 kcal', desc: 'Crispy Applewood smoked bacon, aged Gouda cheese, and parmesan frittata on artisan roll.' },
      { name: 'Butter Croissant', price: '$3.85', cal: '260 kcal', desc: 'Traditional French all-butter flaky pastry heated to golden crisp.' }
    ]
  };

  // Form Filling State
  const [formData, setFormData] = useState({
    fullName: 'Swathi P.',
    passportNo: 'Z8942103',
    flightNo: 'SQ 529 (Singapore Airlines)',
    hotelAddress: 'Marina Bay Sands / Sakura Grand Hotel',
    purposeOfVisit: 'Tourism & International Masterclass',
    carryingCashOver10k: false,
    signature: 'Swathi P.'
  });

  // Target Script
  const fullStarbucksScript = "Hi! Can I please get a Short Classic Signature Hot Chocolate with Oat Milk, Blonde Espresso, and 3 pumps of Vanilla, topped with Vanilla Sweet Cold Foam, and a Tomato & Mozzarella Focaccia Panini warmed up?";

  // Input & Physics State
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

  // Three.js 3D Open World Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const skyColors = {
      golden_morning: 0x241712,
      bright_day: 0x0a192f,
      cozy_night: 0x0f0c18
    };
    scene.background = new THREE.Color(skyColors[timeOfDay]);
    scene.fog = new THREE.FogExp2(scene.background, 0.012);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Dynamic Lighting
    const ambient = new THREE.AmbientLight(0xffffff, timeOfDay === 'golden_morning' ? 0.9 : 1.1);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfffaed, 1.6);
    sun.position.set(20, 35, 20);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    scene.add(sun);

    // Dynamic Zone Point Light
    const pointAccent = new THREE.PointLight(
      activeDistrict === 'district_starbucks' ? 0xf59e0b :
      activeDistrict === 'district_changi_jewel' ? 0x38bdf8 :
      activeDistrict === 'district_vizag_airport' ? 0x10b981 : 0xd946ef,
      3.0,
      35
    );
    pointAccent.position.set(0, 6, 0);
    scene.add(pointAccent);

    // 3. World Group Architecture
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(120, 120);
    const floorMat = new THREE.MeshStandardMaterial({
      color: activeDistrict === 'district_starbucks' ? 0x3d271d :
             activeDistrict === 'district_changi_jewel' ? 0x1e293b :
             activeDistrict === 'district_vizag_airport' ? 0x334155 : 0x24142c,
      roughness: 0.25,
      metalness: 0.15
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    worldGroup.add(floor);

    const grid = new THREE.GridHelper(120, 60, 0x10b981, 0x475569);
    grid.position.y = 0.01;
    worldGroup.add(grid);

    // Particles (Steam, Waterfall)
    let particleSystem: THREE.Points | null = null;
    let particleCoords: Float32Array | null = null;

    if (activeDistrict === 'district_starbucks') {
      // ☕ 3D REAL STARBUCKS RESERVE SHOP
      // Main Barista Counter
      const counter = new THREE.Mesh(
        new THREE.BoxGeometry(20, 2.4, 4.5),
        new THREE.MeshStandardMaterial({ color: 0x5c2b14, roughness: 0.2, metalness: 0.1 })
      );
      counter.position.set(0, 1.2, -6);
      counter.castShadow = true;
      worldGroup.add(counter);

      // Overhead Digital Menu TV Screens (Huge Glowing Screens!)
      for (let s = -1; s <= 1; s++) {
        const tvFrame = new THREE.Mesh(
          new THREE.BoxGeometry(4.8, 2.8, 0.2),
          new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 })
        );
        tvFrame.position.set(s * 5.2, 5.5, -5.8);
        worldGroup.add(tvFrame);

        // Glowing Menu Screen Display
        const tvScreen = new THREE.Mesh(
          new THREE.PlaneGeometry(4.5, 2.5),
          new THREE.MeshBasicMaterial({ color: s === -1 ? 0x1e3a8a : s === 0 ? 0x064e3b : 0x78350f })
        );
        tvScreen.position.set(s * 5.2, 5.5, -5.68);
        worldGroup.add(tvScreen);
      }

      // Mastrena II Espresso Machine
      const espMachine = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 1.8, 2.4),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 })
      );
      espMachine.position.set(-4.5, 3.1, -6);
      worldGroup.add(espMachine);

      // Glass Bakery Case
      const bakeryCase = new THREE.Mesh(
        new THREE.BoxGeometry(5.5, 2.0, 2.6),
        new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, roughness: 0.1 })
      );
      bakeryCase.position.set(4.8, 3.2, -6);
      worldGroup.add(bakeryCase);

      // Barista Hana NPC
      const barista = new THREE.Group();
      barista.add(new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffedd5 })));
      const bBody = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.55, 1.3, 16), new THREE.MeshStandardMaterial({ color: 0x006241 }));
      bBody.position.y = -1.1;
      barista.add(bBody);
      barista.position.set(0, 2.5, -7.8);
      worldGroup.add(barista);

      // Customer Tables & Booth Seating
      for (let tx = -1; tx <= 1; tx += 2) {
        const table = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 1.6, 16), new THREE.MeshStandardMaterial({ color: 0x451a03 }));
        table.position.set(tx * 9, 0.8, 5);
        worldGroup.add(table);

        const chair = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.1, 1.5), new THREE.MeshStandardMaterial({ color: 0x006241 }));
        chair.position.set(tx * 9, 0.55, 7.5);
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

      // Waterfall Droplet Particles
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

      // Elevated Skytrain Bridge
      const track = new THREE.Mesh(
        new THREE.BoxGeometry(40, 0.8, 4),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6 })
      );
      track.position.set(0, 9, 10);
      worldGroup.add(track);

    } else if (activeDistrict === 'district_vizag_airport') {
      // 🛫 VIZAG (VTZ) ALLURI SITARAMA RAJU AIRPORT
      const terminal = new THREE.Mesh(
        new THREE.BoxGeometry(32, 9, 4),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })
      );
      terminal.position.set(0, 4.5, -20);
      worldGroup.add(terminal);

      // DigiYatra Electronic Facial Gate
      const digi = new THREE.Mesh(
        new THREE.BoxGeometry(5, 3.5, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x10b981 })
      );
      digi.position.set(10, 1.75, 10);
      worldGroup.add(digi);

      // Check-in Desks & Luggage Scales
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
      arch.position.set(0, 2.5, -12);
      worldGroup.add(arch);

    } else if (activeDistrict === 'district_grand_hotel') {
      // 🏨 SAKURA GRAND HOTEL PRESIDENTIAL SUITE
      const desk = new THREE.Mesh(
        new THREE.BoxGeometry(18, 2.4, 4),
        new THREE.MeshStandardMaterial({ color: 0x581c87, roughness: 0.2 })
      );
      desk.position.set(0, 1.2, -6);
      worldGroup.add(desk);

      const chandelier = new THREE.Mesh(
        new THREE.TorusGeometry(4, 0.4, 16, 32),
        new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 })
      );
      chandelier.rotation.x = Math.PI / 2;
      chandelier.position.set(0, 9.5, 0);
      worldGroup.add(chandelier);

    } else {
      // 👗 MILAN FASHION BOUTIQUE
      for (let r = -1; r <= 1; r += 2) {
        const rackBar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.1, 12, 8),
          new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 })
        );
        rackBar.rotation.z = Math.PI / 2;
        rackBar.position.set(r * 10, 3.2, 0);
        worldGroup.add(rackBar);
      }
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

    // 6. 60 FPS Game Loop
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

      // Camera Perspective Switcher
      if (cameraView === 'first_person_eyes') {
        camera.position.set(playerState.current.x, playerState.current.y + 2.0, playerState.current.z);
        const lookDirX = -Math.sin(cameraYaw);
        const lookDirZ = -Math.cos(cameraYaw);
        camera.lookAt(playerState.current.x + lookDirX * 10, playerState.current.y + 2.0, playerState.current.z + lookDirZ * 10);
      } else if (cameraView === 'birds_eye') {
        camera.position.set(playerState.current.x, playerState.current.y + 22, playerState.current.z + 6);
        camera.lookAt(playerState.current.x, playerState.current.y, playerState.current.z);
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
  }, [activeDistrict, timeOfDay, cameraView]);

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
            <button
              onClick={() => handleTeleport('district_grand_hotel')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeDistrict === 'district_grand_hotel'
                  ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🏨 4. Grand Hotel
            </button>
            <button
              onClick={() => handleTeleport('district_fashion_boutique')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeDistrict === 'district_fashion_boutique'
                  ? 'bg-pink-500 text-slate-950 shadow-lg shadow-pink-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              👗 5. Fashion Mall
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

            {/* 4 Menu Columns just like in real stores! */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Column 1: Espresso & Classics */}
              <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black text-amber-400 uppercase tracking-wide border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>☕ Espresso & Classics</span>
                  <span className="text-[10px] text-slate-400">Hot/Iced</span>
                </h4>
                <div className="space-y-3">
                  {starbucksMenu.espresso.map((item) => (
                    <div key={item.name} className="space-y-0.5">
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span>{item.name}</span>
                        <span className="text-emerald-400">{item.price}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>{item.cal}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Chocolate & Teas */}
              <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black text-teal-400 uppercase tracking-wide border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>🍫 Chocolates & Teas</span>
                  <span className="text-[10px] text-slate-400">Handcrafted</span>
                </h4>
                <div className="space-y-3">
                  {starbucksMenu.chocolate_tea.map((item) => (
                    <div key={item.name} className="space-y-0.5">
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span>{item.name}</span>
                        <span className="text-emerald-400">{item.price}</span>
                      </div>
                      {item.badge && (
                        <span className="inline-block text-[9px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-bold">
                          {item.badge}
                        </span>
                      )}
                      <p className="text-[11px] text-slate-300 leading-tight">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Custom Add-ons */}
              <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black text-pink-400 uppercase tracking-wide border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>✨ Custom Add-on Bar</span>
                  <span className="text-[10px] text-slate-400">Make it Yours</span>
                </h4>
                <div className="space-y-3">
                  {starbucksMenu.custom_addons.map((item) => (
                    <div key={item.name} className="space-y-0.5">
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span>{item.name}</span>
                        <span className="text-emerald-400">{item.price}</span>
                      </div>
                      <span className="inline-block text-[9px] px-1.5 py-0.2 bg-pink-500/20 text-pink-300 rounded font-bold">
                        {item.tag}
                      </span>
                      <p className="text-[11px] text-slate-300 leading-tight">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 4: Warm Bakery & Paninis */}
              <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black text-amber-300 uppercase tracking-wide border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>🥪 Warm Bakery & Paninis</span>
                  <span className="text-[10px] text-slate-400">TurboChef</span>
                </h4>
                <div className="space-y-3">
                  {starbucksMenu.bakery_paninis.map((item) => (
                    <div key={item.name} className="space-y-0.5">
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span>{item.name}</span>
                        <span className="text-emerald-400">{item.price}</span>
                      </div>
                      {item.badge && (
                        <span className="inline-block text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded font-bold">
                          {item.badge}
                        </span>
                      )}
                      <p className="text-[11px] text-slate-300 leading-tight">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Practice Bar */}
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

            {/* Flight Board Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs text-slate-300 font-mono">
                <thead className="bg-slate-900 text-amber-300 uppercase tracking-wider text-[11px] font-sans border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Flight</th>
                    <th className="p-3.5">Airline</th>
                    <th className="p-3.5">Destination</th>
                    <th className="p-3.5">Gate</th>
                    <th className="p-3.5">Time</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {flightData.map((fl) => (
                    <tr key={fl.flight} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3.5 font-bold text-white">{fl.flight}</td>
                      <td className="p-3.5">{fl.airline}</td>
                      <td className="p-3.5 font-semibold text-sky-300">{fl.dest}</td>
                      <td className="p-3.5 font-bold text-amber-400">{fl.gate}</td>
                      <td className="p-3.5">{fl.time}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          fl.status === 'BOARDING' ? 'bg-emerald-500/20 text-emerald-300 animate-pulse' :
                          fl.status === 'ON TIME' ? 'bg-sky-500/20 text-sky-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {fl.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                    Singapore SG Arrival Card & US Customs Declaration Form 6059B
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

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">1. Full Name (as in Passport):</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">2. Passport Number:</label>
                <input
                  type="text"
                  value={formData.passportNo}
                  onChange={(e) => setFormData({ ...formData, passportNo: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">3. Flight Number & Airline:</label>
                <input
                  type="text"
                  value={formData.flightNo}
                  onChange={(e) => setFormData({ ...formData, flightNo: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">4. Hotel / Accommodation Address:</label>
                <input
                  type="text"
                  value={formData.hotelAddress}
                  onChange={(e) => setFormData({ ...formData, hotelAddress: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 font-bold mb-1">5. Purpose of Visit:</label>
                <input
                  type="text"
                  value={formData.purposeOfVisit}
                  onChange={(e) => setFormData({ ...formData, purposeOfVisit: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 font-bold mb-1">Applicant Signature:</label>
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-serif italic text-sm"
                />
              </div>
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
