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
  Maximize2
} from 'lucide-react';

interface RealisticWorldSimulatorProps {
  onAddXp: (amount: number, reason: string) => void;
}

export type SimulatorLocation = 
  | 'starbucks_full_experience'
  | 'singapore_changi_jewel'
  | 'vizag_vtz_airport'
  | 'grand_hotel_checkin'
  | 'fashion_shopping_fitting';

interface FormFieldState {
  fullName: string;
  passportNumber: string;
  nationality: string;
  flightNumber: string;
  hotelAddress: string;
  purposeOfVisit: string;
  lengthOfStay: string;
  carryingCashOver10k: boolean;
  carryingPlantsFood: boolean;
  signature: string;
}

export const RealisticWorldSimulator: React.FC<RealisticWorldSimulatorProps> = ({ onAddXp }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Active Simulation Location
  const [currentLocation, setCurrentLocation] = useState<SimulatorLocation>('starbucks_full_experience');
  const [cameraPerspective, setCameraPerspective] = useState<'third_person' | 'first_person'>('third_person');

  // Player state
  const [playerName, setPlayerName] = useState<string>('Swathi');
  const [playerInventory, setPlayerInventory] = useState<string[]>(['Passport', 'Credit Card', 'Smartphone']);
  const [playerStatus, setPlayerStatus] = useState<string>('Ready to explore');

  // --- 1. STARBUCKS REAL CUSTOMER LIFECYCLE STATE ---
  // Steps: 0: Entered Store, 1: At Register (Ordering), 2: Paid (Waiting at Pickup Bar), 3: Drink Called (Picked Up), 4: At Condiment Bar, 5: Sitting at Table & Drinking
  const [starbucksPhase, setStarbucksPhase] = useState<number>(0);
  const [starbucksOrderPlaced, setStarbucksOrderPlaced] = useState<boolean>(false);
  const [starbucksOrderReady, setStarbucksOrderReady] = useState<boolean>(false);
  const [starbucksHasSip, setStarbucksHasSip] = useState<boolean>(false);

  // --- 2. AIRPORT REAL LIFECYCLE STATE (Vizag & Singapore) ---
  // Steps: 0: Outside Curb, 1: Gate Security & DigiYatra ID, 2: Baggage Weighing & Tagging, 3: CISF X-Ray & Frisking, 4: Physical Paper Form Filling, 5: Biometric Passport Gate, 6: Gate Boarding
  const [airportPhase, setAirportPhase] = useState<number>(0);
  const [baggageWeight, setBaggageWeight] = useState<number>(12.8);
  const [digiYatraScanned, setDigiYatraScanned] = useState<boolean>(false);
  const [securityTraysSeparated, setSecurityTraysSeparated] = useState<boolean>(false);
  const [biometricsCleared, setBiometricsCleared] = useState<boolean>(false);

  // --- 3. PHYSICAL IMMIGRATION & HOTEL FORM STATE ---
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormFieldState>({
    fullName: 'Swathi P.',
    passportNumber: 'Z8942103',
    nationality: 'Indian',
    flightNumber: 'SQ 529 (Singapore Airlines)',
    hotelAddress: 'Marina Bay Sands / Sakura Grand Hotel',
    purposeOfVisit: 'Holiday / Tourism & Business Masterclass',
    lengthOfStay: '7 Days',
    carryingCashOver10k: false,
    carryingPlantsFood: false,
    signature: 'Swathi P.'
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // --- 4. HOTEL CHECK-IN REAL EXPERIENCE ---
  const [hotelPhase, setHotelPhase] = useState<number>(0);
  const [hasHotelKeycard, setHasHotelKeycard] = useState<boolean>(false);

  // --- 5. FASHION BOUTIQUE REAL EXPERIENCE ---
  const [fashionPhase, setFashionPhase] = useState<number>(0);
  const [selectedOutfit, setSelectedOutfit] = useState<string>('Oversized Italian Linen Blazer');

  // Three.js Game Loop Refs
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const playerPos = useRef<{ x: number; y: number; z: number; rotY: number; vy: number; isGrounded: boolean }>({
    x: 0,
    y: 0,
    z: 6,
    rotY: 0,
    vy: 0,
    isGrounded: true
  });

  // Target English Dialogue Scripts
  const starbucksScript = "Hi! Can I please get a Short Classic Signature Hot Chocolate with Oat Milk, Blonde Espresso, and 3 pumps of Vanilla, topped with Vanilla Sweet Cold Foam, and a Tomato & Mozzarella Focaccia Panini warmed up?";
  const airportSecurityScript = "Here is my Government ID and mobile boarding pass. My laptop, liquids, and electronics are in separate trays.";
  const airportBaggageScript = "Good morning! I have one check-in suitcase weighing 12.8 kilograms and one cabin handbag. Can I please get a window seat?";
  const hotelScript = "Good afternoon! I have a reservation for a Deluxe High-Floor Suite under Swathi. Could you please let me know what time breakfast is served?";

  // Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(
      currentLocation === 'starbucks_full_experience' ? 0x221611 :
      currentLocation === 'singapore_changi_jewel' ? 0x09182d :
      currentLocation === 'vizag_vtz_airport' ? 0x0f172a :
      currentLocation === 'grand_hotel_checkin' ? 0x24142c : 0x1f1224
    );
    scene.fog = new THREE.FogExp2(scene.background, 0.018);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xfffaed, 1.4);
    sun.position.set(16, 28, 16);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    scene.add(sun);

    const pointLight = new THREE.PointLight(
      currentLocation === 'starbucks_full_experience' ? 0xf59e0b :
      currentLocation === 'singapore_changi_jewel' ? 0x38bdf8 :
      currentLocation === 'vizag_vtz_airport' ? 0x10b981 : 0xd946ef,
      2.5,
      25
    );
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // 3. World Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(90, 90);
    const floorMat = new THREE.MeshStandardMaterial({
      color: currentLocation === 'starbucks_full_experience' ? 0x38231a :
             currentLocation === 'singapore_changi_jewel' ? 0x1e293b :
             currentLocation === 'vizag_vtz_airport' ? 0x334155 : 0x2e1065,
      roughness: 0.3,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    worldGroup.add(floor);

    // Grid Floor
    const grid = new THREE.GridHelper(90, 45, 0x10b981, 0x475569);
    grid.position.y = 0.01;
    worldGroup.add(grid);

    // Particles system for steam or waterfall
    let particles: THREE.Points | null = null;
    let particleCoords: Float32Array | null = null;

    // Build specific 3D Environment geometries
    if (currentLocation === 'starbucks_full_experience') {
      // ☕ 3D STARBUCKS CAFE
      // Main Barista Counter
      const counterMat = new THREE.MeshStandardMaterial({ color: 0x5c2b14, roughness: 0.2 });
      const counter = new THREE.Mesh(new THREE.BoxGeometry(16, 2.2, 3.5), counterMat);
      counter.position.set(0, 1.1, -6);
      counter.castShadow = true;
      worldGroup.add(counter);

      // Green Siren Apron band
      const sirenTrim = new THREE.Mesh(new THREE.BoxGeometry(16.1, 0.4, 3.6), new THREE.MeshStandardMaterial({ color: 0x006241 }));
      sirenTrim.position.set(0, 2.0, -6);
      worldGroup.add(sirenTrim);

      // Espresso Machine
      const espMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 });
      const espMachine = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.6, 2), espMat);
      espMachine.position.set(-3.5, 2.9, -6);
      worldGroup.add(espMachine);

      // Bakery Case (Glass)
      const bakeryMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 });
      const bakeryCase = new THREE.Mesh(new THREE.BoxGeometry(4.5, 1.8, 2.2), bakeryMat);
      bakeryCase.position.set(4, 3.0, -6);
      worldGroup.add(bakeryCase);

      // 3D Paninis on plate inside
      const panini = new THREE.Mesh(new THREE.BoxGeometry(1, 0.35, 0.6), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
      panini.position.set(4, 2.4, -6);
      worldGroup.add(panini);

      // Barista Hana NPC
      const barista = new THREE.Group();
      barista.add(new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffedd5 }))); // Head
      const bBody = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.55, 1.2, 16), new THREE.MeshStandardMaterial({ color: 0x006241 })); // Apron
      bBody.position.y = -1.0;
      barista.add(bBody);
      barista.position.set(0, 2.4, -7.8);
      worldGroup.add(barista);

      // Customer Tables & Comfortable Lounge Chairs
      for (let tx = -1; tx <= 1; tx += 2) {
        const table = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 1.5, 16), new THREE.MeshStandardMaterial({ color: 0x451a03 }));
        table.position.set(tx * 8, 0.75, 4);
        worldGroup.add(table);

        const chair = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 1.2), new THREE.MeshStandardMaterial({ color: 0x006241 }));
        chair.position.set(tx * 8, 0.5, 6);
        worldGroup.add(chair);
      }

      // Condiment Bar Table
      const condTable = new THREE.Mesh(new THREE.BoxGeometry(5, 1.8, 2), new THREE.MeshStandardMaterial({ color: 0x78350f }));
      condTable.position.set(-10, 0.9, 0);
      worldGroup.add(condTable);

    } else if (currentLocation === 'singapore_changi_jewel') {
      // 🌊 SINGAPORE CHANGI JEWEL RAIN VORTEX
      // Central Waterfall Basin
      const basin = new THREE.Mesh(new THREE.CylinderGeometry(6, 7, 2.5, 32), new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4 }));
      basin.position.set(0, 1.25, 0);
      worldGroup.add(basin);

      // Glass Dome Ring
      const domeRing = new THREE.Mesh(new THREE.TorusGeometry(16, 0.5, 16, 64), new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8 }));
      domeRing.rotation.x = Math.PI / 2;
      domeRing.position.set(0, 14, 0);
      worldGroup.add(domeRing);

      // 3D Waterfall Rain Vortex Droplets
      const pCount = 2500;
      const pGeo = new THREE.BufferGeometry();
      particleCoords = new Float32Array(pCount * 3);
      for (let p = 0; p < pCount; p++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 3.2 + 0.6;
        particleCoords[p * 3] = Math.cos(angle) * radius;
        particleCoords[p * 3 + 1] = Math.random() * 14 + 1.2;
        particleCoords[p * 3 + 2] = Math.sin(angle) * radius;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
      particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.28, transparent: true, opacity: 0.85 }));
      worldGroup.add(particles);

      // Indoor Tropical Forest Trees
      for (let t = 0; t < 16; t++) {
        const tAngle = (t / 16) * Math.PI * 2;
        const tDist = 12;
        const treeTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 4, 8), new THREE.MeshStandardMaterial({ color: 0x451a03 }));
        treeTrunk.position.set(Math.cos(tAngle) * tDist, 2, Math.sin(tAngle) * tDist);
        worldGroup.add(treeTrunk);

        const treeTop = new THREE.Mesh(new THREE.DodecahedronGeometry(2, 1), new THREE.MeshStandardMaterial({ color: 0x059669 }));
        treeTop.position.set(Math.cos(tAngle) * tDist, 4.8, Math.sin(tAngle) * tDist);
        worldGroup.add(treeTop);
      }

      // Elevated Skytrain Track
      const track = new THREE.Mesh(new THREE.BoxGeometry(32, 0.6, 3), new THREE.MeshStandardMaterial({ color: 0x64748b }));
      track.position.set(0, 7.5, 8);
      worldGroup.add(track);

    } else if (currentLocation === 'vizag_vtz_airport') {
      // 🛫 VIZAG (VTZ) ALLURI SITARAMA RAJU INTERNATIONAL AIRPORT
      // Terminal Facade
      const terminal = new THREE.Mesh(new THREE.BoxGeometry(28, 7, 3), new THREE.MeshStandardMaterial({ color: 0xf1f5f9 }));
      terminal.position.set(0, 3.5, -16);
      worldGroup.add(terminal);

      // Check-in Desks (IndiGo & Air India)
      const checkin = new THREE.Mesh(new THREE.BoxGeometry(10, 2, 2.5), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
      checkin.position.set(-8, 1, -4);
      worldGroup.add(checkin);

      // Baggage Scale & Conveyor
      const belt = new THREE.Mesh(new THREE.BoxGeometry(10, 0.5, 1.5), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
      belt.position.set(-8, 0.5, -6.5);
      worldGroup.add(belt);

      // Moving Red Suitcase
      const bag = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.6), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
      bag.position.set(-8, 1.0, -6.5);
      worldGroup.add(bag);

      // CISF Security Metal Detector Arch
      const arch = new THREE.Mesh(new THREE.BoxGeometry(3, 4, 0.8), new THREE.MeshStandardMaterial({ color: 0x334155 }));
      arch.position.set(0, 2, -10);
      worldGroup.add(arch);

      // DigiYatra Facial Gate
      const digi = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 0.4), new THREE.MeshStandardMaterial({ color: 0x10b981 }));
      digi.position.set(8, 1.5, 8);
      worldGroup.add(digi);

    } else if (currentLocation === 'grand_hotel_checkin') {
      // 🏨 SAKURA GRAND HOTEL
      // Reception Desk
      const desk = new THREE.Mesh(new THREE.BoxGeometry(14, 2.2, 3), new THREE.MeshStandardMaterial({ color: 0x581c87 }));
      desk.position.set(0, 1.1, -6);
      worldGroup.add(desk);

      // Gold Chandelier
      const chandelier = new THREE.Mesh(new THREE.TorusGeometry(3, 0.3, 16, 32), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 }));
      chandelier.rotation.x = Math.PI / 2;
      chandelier.position.set(0, 8, 0);
      worldGroup.add(chandelier);

      // Elevator Doors
      const elevator = new THREE.Mesh(new THREE.BoxGeometry(4, 5, 0.5), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 }));
      elevator.position.set(9, 2.5, -12);
      worldGroup.add(elevator);

    } else {
      // 👗 FASHION SHOPPING BOUTIQUE
      // Clothing Racks with hanging garments
      for (let r = -1; r <= 1; r += 2) {
        const rackBar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 8, 8), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 }));
        rackBar.rotation.z = Math.PI / 2;
        rackBar.position.set(r * 8, 3, 0);
        worldGroup.add(rackBar);
      }

      // 3D Fitting Room Cabinets
      const fittingRoom = new THREE.Mesh(new THREE.BoxGeometry(4, 5, 4), new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.4 }));
      fittingRoom.position.set(0, 2.5, -10);
      worldGroup.add(fittingRoom);
    }

    // 4. Playable 3D Anime Character (Swathi)
    const player = new THREE.Group();

    // Head
    const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.52, 16, 16), new THREE.MeshStandardMaterial({ color: 0xffedd5 }));
    pHead.position.y = 2.0;
    pHead.castShadow = true;
    player.add(pHead);

    // Hair
    const pHair = new THREE.Mesh(new THREE.SphereGeometry(0.56, 16, 16), new THREE.MeshStandardMaterial({ color: 0x3b1d11 }));
    pHair.position.set(0, 2.1, -0.06);
    player.add(pHair);

    // Body Outfit
    const pTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.48, 1.0, 16), new THREE.MeshStandardMaterial({ color: 0xdb2777 })); // Magenta Blazer
    pTorso.position.y = 1.2;
    pTorso.castShadow = true;
    player.add(pTorso);

    // Travel Handbag / Backpack
    const pBag = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 0.35), new THREE.MeshStandardMaterial({ color: 0x4f46e5 }));
    pBag.position.set(0, 1.25, -0.36);
    player.add(pBag);

    // Legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const pLeftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.75, 8), legMat);
    pLeftLeg.position.set(-0.22, 0.38, 0);
    player.add(pLeftLeg);

    const pRightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.75, 8), legMat);
    pRightLeg.position.set(0.22, 0.38, 0);
    player.add(pRightLeg);

    // Coffee Cup or Passport in Hand
    const heldItem = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.3, 12), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
    heldItem.position.set(0.48, 1.1, 0.22);
    player.add(heldItem);

    player.position.set(playerPos.current.x, playerPos.current.y, playerPos.current.z);
    scene.add(player);

    // 5. Input Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
      if (e.code === 'Space' && playerPos.current.isGrounded) {
        playerPos.current.vy = 0.24;
        playerPos.current.isGrounded = false;
        sound.playClick();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Mouse drag Orbit Controls
    let isMouseDown = false;
    let prevMouseX = 0;
    let cameraYaw = 0;
    let cameraPitch = 0.35;
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
      cameraDistance = Math.max(3, Math.min(20, cameraDistance + e.deltaY * 0.01));
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
      const speed = 0.15;
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

        playerPos.current.x += dx;
        playerPos.current.z += dz;
        playerPos.current.rotY = Math.atan2(dx, dz);

        pLeftLeg.rotation.x = Math.sin(tick * 0.22) * 0.65;
        pRightLeg.rotation.x = -Math.sin(tick * 0.22) * 0.65;
      } else {
        pLeftLeg.rotation.x = 0;
        pRightLeg.rotation.x = 0;
      }

      // Jump & Gravity
      if (!playerPos.current.isGrounded) {
        playerPos.current.y += playerPos.current.vy;
        playerPos.current.vy -= 0.012;
        if (playerPos.current.y <= 0) {
          playerPos.current.y = 0;
          playerPos.current.vy = 0;
          playerPos.current.isGrounded = true;
        }
      }

      // Bounds
      playerPos.current.x = Math.max(-38, Math.min(38, playerPos.current.x));
      playerPos.current.z = Math.max(-38, Math.min(38, playerPos.current.z));

      // Update Player Mesh
      player.position.set(playerPos.current.x, playerPos.current.y, playerPos.current.z);
      player.rotation.y = playerPos.current.rotY;

      // Update Follow Camera
      const tx = playerPos.current.x;
      const ty = playerPos.current.y + 1.6;
      const tz = playerPos.current.z;

      camera.position.set(
        tx + Math.sin(cameraYaw) * Math.cos(cameraPitch) * cameraDistance,
        ty + Math.sin(cameraPitch) * cameraDistance + 2.5,
        tz + Math.cos(cameraYaw) * Math.cos(cameraPitch) * cameraDistance
      );
      camera.lookAt(tx, ty, tz);

      // Animate Waterfall
      if (particles && particleCoords) {
        const cnt = particleCoords.length / 3;
        for (let i = 0; i < cnt; i++) {
          particleCoords[i * 3 + 1] -= 0.28;
          if (particleCoords[i * 3 + 1] <= 1.2) {
            particleCoords[i * 3 + 1] = 14;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
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
  }, [currentLocation]);

  // Teleport between real-world locations
  const handleTeleport = (loc: SimulatorLocation) => {
    sound.playClick();
    setCurrentLocation(loc);
    playerPos.current.x = 0;
    playerPos.current.y = 0;
    playerPos.current.z = 6;
    onAddXp(30, `Entered Real-World 3D Simulator: ${loc.replace(/_/g, ' ')}! 🌍`);
  };

  return (
    <div className="space-y-6">
      {/* Metaverse Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
              Full Real-World 3D Life Simulator & Form Lab Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-3">
              🌍 Real-World Simulator: Go There, Order, Sit & Fill Forms!
            </h2>
            <p className="text-indigo-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              Experience the real world step-by-step! Order at Starbucks and sit at a table, clear Vizag & Singapore Changi Airport security, manually fill physical customs declarations, and check into luxury hotels.
            </p>
          </div>

          {/* 5 Real-World Location Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-2 rounded-2xl border border-slate-800">
            <button
              onClick={() => handleTeleport('starbucks_full_experience')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentLocation === 'starbucks_full_experience'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              ☕ 1. Starbucks Cafe
            </button>
            <button
              onClick={() => handleTeleport('singapore_changi_jewel')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentLocation === 'singapore_changi_jewel'
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🌊 2. Singapore Jewel
            </button>
            <button
              onClick={() => handleTeleport('vizag_vtz_airport')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentLocation === 'vizag_vtz_airport'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🛫 3. Vizag (VTZ)
            </button>
            <button
              onClick={() => handleTeleport('grand_hotel_checkin')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentLocation === 'grand_hotel_checkin'
                  ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🏨 4. Grand Hotel
            </button>
            <button
              onClick={() => handleTeleport('fashion_shopping_fitting')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentLocation === 'fashion_shopping_fitting'
                  ? 'bg-pink-500 text-slate-950 shadow-lg shadow-pink-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              👗 5. Fashion Mall
            </button>
          </div>
        </div>
      </div>

      {/* 3D Viewport Screen */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-indigo-500/40 bg-slate-950 shadow-2xl">
        <div ref={mountRef} className="w-full h-[480px] cursor-grab active:cursor-grabbing bg-slate-950" />

        {/* Top-Left Avatar Status HUD */}
        <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-indigo-500/30 shadow-xl flex items-center gap-3">
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
              Location: {currentLocation.replace(/_/g, ' ').toUpperCase()}
            </p>
          </div>
        </div>

        {/* Top-Right Controls Helper */}
        <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-800 text-slate-300 text-xs flex items-center gap-3">
          <span className="hidden sm:inline font-mono text-[11px] text-amber-300">
            🎮 [WASD] Move • [Space] Jump • [Mouse Drag] 360° View
          </span>
          <button
            onClick={() => setShowFormModal(true)}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" /> Physical Paper Form Lab
          </button>
        </div>
      </div>

      {/* --- LOCATION 1: REAL STARBUCKS CUSTOMER LIFECYCLE CONTROLS --- */}
      {currentLocation === 'starbucks_full_experience' && (
        <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Coffee className="w-4 h-4" /> Live Starbucks Customer Journey
              </div>
              <h3 className="text-xl font-black text-white">
                Step {starbucksPhase + 1} of 5: {
                  starbucksPhase === 0 ? "1. Step up to Cashier Register & Order" :
                  starbucksPhase === 1 ? "2. Confirm Name on Cup & Tap Payment" :
                  starbucksPhase === 2 ? "3. Wait at Pickup Counter (Barista Brewing...)" :
                  starbucksPhase === 3 ? "4. Pick Up Steaming Cup & Visit Condiment Bar" :
                  "5. Sit at Table, Sip Hot Chocolate & Enjoy!"
                }
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setStarbucksPhase(0);
                  setStarbucksOrderPlaced(false);
                  setStarbucksOrderReady(false);
                  setStarbucksHasSip(false);
                }}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart Journey
              </button>
            </div>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Step 1: Order at Register */}
            <div className={`p-4 rounded-2xl border transition-all ${
              starbucksPhase === 0 ? 'bg-emerald-500/15 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-800/30 border-slate-800 opacity-60'
            }`}>
              <div className="text-2xl mb-2">🗣️</div>
              <div className="text-xs font-bold text-white">1. Place Order</div>
              <div className="text-[11px] text-slate-300 mt-1 mb-3">Speak custom order with microphone</div>
              <button
                onClick={() => {
                  sound.playSuccess();
                  setStarbucksPhase(1);
                  setStarbucksOrderPlaced(true);
                  onAddXp(40, "Ordered Swathi's Signature Hot Chocolate! ☕");
                }}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all"
              >
                {starbucksOrderPlaced ? "✓ Order Placed" : "Step to Register"}
              </button>
            </div>

            {/* Step 2: Payment & Cup Name */}
            <div className={`p-4 rounded-2xl border transition-all ${
              starbucksPhase === 1 ? 'bg-emerald-500/15 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-800/30 border-slate-800 opacity-60'
            }`}>
              <div className="text-2xl mb-2">💳</div>
              <div className="text-xs font-bold text-white">2. Tap to Pay ($9.25)</div>
              <div className="text-[11px] text-slate-300 mt-1 mb-3">Name: ✎ Swathi on cup</div>
              <button
                disabled={starbucksPhase !== 1}
                onClick={() => {
                  sound.playSuccess();
                  setStarbucksPhase(2);
                  onAddXp(30, "Paid $9.25 via Apple Pay / Card! 💳");
                  // Simulate barista brewing delay
                  setTimeout(() => {
                    setStarbucksOrderReady(true);
                    setStarbucksPhase(3);
                    sound.playSuccess();
                    onAddXp(30, "Barista called: 'Order for Swathi ready!' 🎉");
                  }, 3500);
                }}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl text-xs transition-all"
              >
                Tap Card & Send Order
              </button>
            </div>

            {/* Step 3: Wait at Pickup Bar */}
            <div className={`p-4 rounded-2xl border transition-all ${
              starbucksPhase === 2 ? 'bg-amber-500/15 border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-slate-800/30 border-slate-800 opacity-60'
            }`}>
              <div className="text-2xl mb-2">⏳</div>
              <div className="text-xs font-bold text-white">3. Waiting at Bar</div>
              <div className="text-[11px] text-slate-300 mt-1 mb-3">Barista is frothing sweet cold foam...</div>
              <div className="w-full py-2 bg-slate-800 text-amber-300 font-bold rounded-xl text-xs text-center animate-pulse">
                {starbucksPhase === 2 ? "Brewing in Progress..." : "Ready at Counter"}
              </div>
            </div>

            {/* Step 4: Pick Up & Condiment Bar */}
            <div className={`p-4 rounded-2xl border transition-all ${
              starbucksPhase === 3 ? 'bg-emerald-500/15 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-800/30 border-slate-800 opacity-60'
            }`}>
              <div className="text-2xl mb-2">🪵</div>
              <div className="text-xs font-bold text-white">4. Grab Sleeve & Straw</div>
              <div className="text-[11px] text-slate-300 mt-1 mb-3">Pick up splash stick & napkin</div>
              <button
                disabled={starbucksPhase !== 3}
                onClick={() => {
                  sound.playSuccess();
                  setStarbucksPhase(4);
                  onAddXp(35, "Collected cup sleeve and splash stick! ☕");
                }}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl text-xs transition-all"
              >
                Grab & Go to Table
              </button>
            </div>

            {/* Step 5: Sit & Sip */}
            <div className={`p-4 rounded-2xl border transition-all ${
              starbucksPhase === 4 ? 'bg-emerald-500/15 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-800/30 border-slate-800 opacity-60'
            }`}>
              <div className="text-2xl mb-2">✨</div>
              <div className="text-xs font-bold text-white">5. Sit & Sip</div>
              <div className="text-[11px] text-slate-300 mt-1 mb-3">Enjoy hot cocoa & mozzarella focaccia</div>
              <button
                disabled={starbucksPhase !== 4}
                onClick={() => {
                  sound.playSuccess();
                  confetti({ particleCount: 120, spread: 80 });
                  setStarbucksHasSip(true);
                  onAddXp(80, "Finished Gourmet Starbucks Experience! ⭐⭐⭐⭐⭐");
                }}
                className="w-full py-2 bg-gradient-to-r from-emerald-400 to-teal-400 hover:scale-105 text-slate-950 font-black rounded-xl text-xs transition-all"
              >
                {starbucksHasSip ? "✓ Ecstatic Sip (+80 XP)" : "Sit Down & Sip"}
              </button>
            </div>
          </div>

          {/* Voice Practice Box */}
          <div className="p-5 bg-gradient-to-r from-emerald-950/70 to-slate-950 rounded-2xl border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Mic className="w-4 h-4" /> Practice Speaking Your Order to the Cashier:
              </span>
              <AudioSpeakButton
                text={starbucksScript}
                label="Listen to Native English"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-xl"
              />
            </div>
            <p className="text-base text-white font-semibold">"{starbucksScript}"</p>
            <VoiceSpeechPractice
              targetPhrase={starbucksScript}
              phraseMeaning="Order: Short Hot Chocolate + Oat Milk + Blonde Espresso + 3 Vanilla + Cold Foam + Warmed Panini"
              accentColor="emerald"
              onSuccess={() => {
                sound.playSuccess();
                confetti({ particleCount: 70, spread: 60 });
                onAddXp(50, "Perfect Voice Order at Starbucks Register! 🎤");
              }}
            />
          </div>
        </div>
      )}

      {/* --- LOCATION 2 & 3: AIRPORT REAL STEP-BY-STEP SIMULATOR --- */}
      {(currentLocation === 'singapore_changi_jewel' || currentLocation === 'vizag_vtz_airport') && (
        <div className="bg-slate-900 border-2 border-sky-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Plane className="w-4 h-4" /> {currentLocation === 'vizag_vtz_airport' ? "Vizag (VTZ) Alluri Sitarama Raju International Airport" : "Singapore Changi Airport (Jewel & Terminal 3)"}
              </div>
              <h3 className="text-xl font-black text-white">
                Airport Mission {airportPhase + 1} of 5: {
                  airportPhase === 0 ? "1. Terminal Entrance ID & DigiYatra Gate" :
                  airportPhase === 1 ? "2. Check-In Counter & Luggage Weight Scale (12.8 kg)" :
                  airportPhase === 2 ? "3. CISF / TSA Security X-Ray Tray Separation" :
                  airportPhase === 3 ? "4. Automated Biometric Passport Control" :
                  "5. Departure Gate B12 & Jetbridge Boarding"
                }
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAirportPhase(0)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 inline mr-1" /> Reset Airport Flow
              </button>
            </div>
          </div>

          {/* Airport Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className={`p-4 rounded-2xl border transition-all ${
              airportPhase === 0 ? 'bg-sky-500/15 border-sky-500 shadow-lg' : 'bg-slate-800/30 border-slate-800 opacity-60'
            }`}>
              <div className="text-2xl mb-2">🏛️</div>
              <div className="text-xs font-bold text-white">1. Entrance ID</div>
              <div className="text-[11px] text-slate-300 mt-1 mb-3">Show Aadhaar / Passport & Ticket</div>
              <button
                onClick={() => {
                  sound.playSuccess();
                  setAirportPhase(1);
                  setDigiYatraScanned(true);
                  onAddXp(35, "Cleared Terminal Entrance ID Check! 🎫");
                }}
                className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs"
              >
                Scan DigiYatra Face
              </button>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              airportPhase === 1 ? 'bg-sky-500/15 border-sky-500 shadow-lg' : 'bg-slate-800/30 border-slate-800 opacity-60'
            }`}>
              <div className="text-2xl mb-2">🧳</div>
              <div className="text-xs font-bold text-white">2. Baggage Drop</div>
              <div className="text-[11px] text-slate-300 mt-1 mb-3">Scale: {baggageWeight} kg / 15 kg max (PASS)</div>
              <button
                disabled={airportPhase !== 1}
                onClick={() => {
                  sound.playSuccess();
                  setAirportPhase(2);
                  onAddXp(40, "Luggage Tagged & Checked in! 🧳");
                }}
                className="w-full py-2 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl text-xs"
              >
                Tag Bag & Get Seat 14A
              </button>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              airportPhase === 2 ? 'bg-sky-500/15 border-sky-500 shadow-lg' : 'bg-slate-800/30 border-slate-800 opacity-60'
            }`}>
              <div className="text-2xl mb-2">🛡️</div>
              <div className="text-xs font-bold text-white">3. Security Tray</div>
              <div className="text-[11px] text-slate-300 mt-1 mb-3">Separate laptop & liquids pouch</div>
              <button
                disabled={airportPhase !== 2}
                onClick={() => {
                  sound.playSuccess();
                  setAirportPhase(3);
                  setSecurityTraysSeparated(true);
                  onAddXp(45, "Cleared CISF / TSA X-Ray Scanner! 🛡️");
                }}
                className="w-full py-2 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl text-xs"
              >
                Pass Metal Detector
              </button>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              airportPhase === 3 ? 'bg-sky-500/15 border-sky-500 shadow-lg' : 'bg-slate-800/30 border-slate-800 opacity-60'
            }`}>
              <div className="text-2xl mb-2">🛂</div>
              <div className="text-xs font-bold text-white">4. Biometrics</div>
              <div className="text-[11px] text-slate-300 mt-1 mb-3">Thumb scan & iris camera</div>
              <button
                disabled={airportPhase !== 3}
                onClick={() => {
                  sound.playSuccess();
                  setAirportPhase(4);
                  setBiometricsCleared(true);
                  onAddXp(50, "Automated Passport Control Cleared in 2s! 🛂");
                }}
                className="w-full py-2 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl text-xs"
              >
                Scan Thumb & Iris
              </button>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              airportPhase === 4 ? 'bg-emerald-500/15 border-emerald-500 shadow-lg' : 'bg-slate-800/30 border-slate-800 opacity-60'
            }`}>
              <div className="text-2xl mb-2">✈️</div>
              <div className="text-xs font-bold text-white">5. Boarding Gate</div>
              <div className="text-[11px] text-slate-300 mt-1 mb-3">Gate B12 • Singapore Airlines SQ 529</div>
              <button
                disabled={airportPhase !== 4}
                onClick={() => {
                  sound.playSuccess();
                  confetti({ particleCount: 120, spread: 80 });
                  onAddXp(100, "Boarded Flight Seat 14A Successfully! ✈️🎉");
                }}
                className="w-full py-2 bg-gradient-to-r from-sky-400 to-emerald-400 hover:scale-105 text-slate-950 font-black rounded-xl text-xs"
              >
                Scan Barcode & Board
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PHYSICAL FORM FILLING LAB MODAL (Customs & Hotel Registration) --- */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-2xl flex items-center justify-center border border-amber-500/40">
                  📋
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Official Physical Document Practice
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Singapore SG Arrival Card & Customs Declaration Form 6059B
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
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">2. Passport Number:</label>
                <input
                  type="text"
                  value={formData.passportNumber}
                  onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">3. Flight Number & Airline:</label>
                <input
                  type="text"
                  value={formData.flightNumber}
                  onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
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

              <div className="sm:col-span-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-amber-300">Customs Declarations:</div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.carryingCashOver10k}
                    onChange={(e) => setFormData({ ...formData, carryingCashOver10k: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <span>Are you carrying currency/cash exceeding $10,000 USD equivalent?</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.carryingPlantsFood}
                    onChange={(e) => setFormData({ ...formData, carryingPlantsFood: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <span>Are you carrying fruits, plants, meat, or live agricultural products?</span>
                </label>
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
                setFormSubmitted(true);
                setShowFormModal(false);
                onAddXp(75, "Completed Official Physical Immigration & Customs Declaration Form! 📋✨");
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black rounded-2xl shadow-xl transition-all text-xs uppercase tracking-wider hover:scale-[1.01]"
            >
              ✓ Submit Declaration Form to Immigration Officer (+75 XP)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
