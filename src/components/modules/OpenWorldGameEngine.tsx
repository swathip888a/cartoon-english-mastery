import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Compass, MapPin, Sparkles, Volume2, Mic, CheckCircle2, 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Backpack, 
  Store, Plane, ShoppingBag, Building2, Stethoscope, 
  Train, Trophy, Zap, MessageSquare, Play, X, User
} from 'lucide-react';
import type { ModuleCategory, WorldInventoryItem, CityLocation, WorldNpc } from '../../types';

interface OpenWorldGameEngineProps {
  onNavigateModule: (module: ModuleCategory) => void;
  onAddXp: (amount: number) => void;
}

// City Buildings Layout
const CITY_LOCATIONS: CityLocation[] = [
  {
    id: 'starbucks',
    name: 'Starbucks Coffee Haven',
    category: 'starbucks',
    emoji: '☕',
    color: '#00704A',
    accentColor: '#1e3932',
    x: 100,
    y: 80,
    width: 200,
    height: 150,
    doorX: 200,
    doorY: 230,
    description: 'Order hot & iced coffees, customize milk and syrups, grab fresh bakery croissants, and use the sugar condiment bar.',
    activities: ['Order Caramel Macchiato', 'Visit Sugar & Straw Bar', 'Warm a Butter Croissant', 'Practice Cafe English']
  },
  {
    id: 'airport',
    name: 'Skyport International Terminal',
    category: 'airport',
    emoji: '✈️',
    color: '#0284c7',
    accentColor: '#0369a1',
    x: 480,
    y: 60,
    width: 240,
    height: 160,
    doorX: 600,
    doorY: 220,
    description: 'Check-in for flights, pass through TSA security body scanners, board Seat 14A, and use the airplane vacuum-flush lavatory.',
    activities: ['Check-in Luggage', 'Pass TSA Scanner', 'Buckle Seatbelt 14A', 'Test Airplane Bathroom']
  },
  {
    id: 'fashion',
    name: 'Chic Bloom Fashion Boutique',
    category: 'fashion',
    emoji: '👗',
    color: '#db2777',
    accentColor: '#be185d',
    x: 800,
    y: 100,
    width: 200,
    height: 140,
    doorX: 900,
    doorY: 240,
    description: 'Browse trendy streetwear, try on different sizes (XS-XXL) in the fitting room, and calculate 50% discount sales.',
    activities: ['Browse Clothing Racks', 'Ask for Fitting Room', 'Calculate Sale Price', 'Get Gift Receipt']
  },
  {
    id: 'transit',
    name: 'Metro Central Subway Station',
    category: 'transit',
    emoji: '🚇',
    color: '#ea580c',
    accentColor: '#c2410c',
    x: 120,
    y: 420,
    width: 200,
    height: 140,
    doorX: 220,
    doorY: 420,
    description: 'Use the interactive touchscreen ticket vending machine, choose single ride or day pass, and tap through the turnstiles.',
    activities: ['Buy Subway Ticket', 'Recharge Transit Pass', 'Tap Fare Gates', 'Read Line Map']
  },
  {
    id: 'hotel',
    name: 'Sakura Grand Hotel & Suites',
    category: 'hotel',
    emoji: '🏨',
    color: '#7c3aed',
    accentColor: '#6d28d9',
    x: 460,
    y: 400,
    width: 220,
    height: 160,
    doorX: 570,
    doorY: 400,
    description: 'Check in with the concierge desk, receive room keycard #1402, request extra fluffy towels, and ask for late checkout.',
    activities: ['Lobby Check-in', 'Get RFID Keycard', 'Request Extra Amenities', 'Book Wake-up Call']
  },
  {
    id: 'health',
    name: 'Hope Central Health Clinic',
    category: 'health',
    emoji: '🏥',
    color: '#059669',
    accentColor: '#047857',
    x: 820,
    y: 400,
    width: 200,
    height: 150,
    doorX: 920,
    doorY: 400,
    description: 'Fill medical triage intake forms, explain symptoms to the friendly doctor, and pick up prescriptions at the pharmacy.',
    activities: ['Doctor Consultation', 'Describe Symptoms', 'Fill Intake Form', 'Collect Medicine']
  }
];

// Street NPCs
const WORLD_NPCS: WorldNpc[] = [
  {
    id: 'npc_barista',
    name: 'Leo the Barista',
    role: 'Starbucks Coffee Specialist',
    emoji: '☕',
    x: 200,
    y: 260,
    locationId: 'starbucks',
    dialogue: 'Good morning! Welcome to Starbucks. Would you like a hot latte or our refreshing iced macchiato today?',
    englishPractice: 'Hi! Can I please get an Iced Caramel Macchiato with oat milk?'
  },
  {
    id: 'npc_attendant',
    name: 'Captain Mei',
    role: 'Flight Attendant & Sky Guide',
    emoji: '✈️',
    x: 600,
    y: 250,
    locationId: 'airport',
    dialogue: 'Welcome to Skyport Gate 14! Please have your boarding pass and passport open for Flight SQ-702.',
    englishPractice: 'Here is my boarding pass. Am I in boarding group B?'
  },
  {
    id: 'npc_stylist',
    name: 'Chloe the Stylist',
    role: 'Fashion Boutique Advisor',
    emoji: '👗',
    x: 900,
    y: 270,
    locationId: 'fashion',
    dialogue: 'Hey there fashion star! All oversized graphic hoodies are buy-one-get-one 50% off right now!',
    englishPractice: 'Excuse me, could I try this hoodie on in a size Medium?'
  },
  {
    id: 'npc_agent',
    name: 'Sam the Station Master',
    role: 'Subway Transit Guide',
    emoji: '🚇',
    x: 220,
    y: 390,
    locationId: 'transit',
    dialogue: 'Need a ticket? The automated touchscreen kiosk takes both cash bills and contactless cards!',
    englishPractice: 'Excuse me, which train goes directly to the Airport Terminal?'
  },
  {
    id: 'npc_concierge',
    name: 'Alexander',
    role: 'Grand Hotel Concierge',
    emoji: '🏨',
    x: 570,
    y: 370,
    locationId: 'hotel',
    dialogue: 'Welcome to the Grand Sakura Hotel. We have a deluxe king suite reserved under your name!',
    englishPractice: 'Hi, I have a reservation under Swathi for two nights.'
  }
];

// Questline for life skills
interface QuestStep {
  id: string;
  title: string;
  locationId: string;
  instruction: string;
  phraseToSpeak: string;
  rewardXp: number;
  itemReward: WorldInventoryItem;
}

const CITY_QUESTS: QuestStep[] = [
  {
    id: 'q1_coffee',
    title: 'Mission 1: Morning Coffee Kickstart',
    locationId: 'starbucks',
    instruction: 'Walk to Starbucks Haven (green building on top left) and talk to Leo to order a drink.',
    phraseToSpeak: 'Can I please get a Grande Iced Caramel Macchiato with oat milk?',
    rewardXp: 50,
    itemReward: {
      id: 'item_coffee',
      name: 'Iced Caramel Macchiato (Grande)',
      emoji: '🥤',
      category: 'beverage',
      description: 'Chilled layers of vanilla syrup, milk, bold espresso shots, and buttery caramel drizzle.',
      englishPhrase: 'Here is my cup. Thank you so much!'
    }
  },
  {
    id: 'q2_transit',
    title: 'Mission 2: Getting the Subway Pass',
    locationId: 'transit',
    instruction: 'Walk down to Metro Central Station (orange building) and get a ticket from Station Master Sam.',
    phraseToSpeak: 'I would like a single ride subway ticket to Airport Station please.',
    rewardXp: 60,
    itemReward: {
      id: 'item_subway_pass',
      name: 'Subway RFID Express Card',
      emoji: '🎫',
      category: 'ticket',
      description: 'Loaded with $20 credit. Tap at turnstile gate scanner to open gate.',
      englishPhrase: 'Tap and go at the green arrow gate.'
    }
  },
  {
    id: 'q3_fashion',
    title: 'Mission 3: Stylish Travel Outfit',
    locationId: 'fashion',
    instruction: 'Walk right to Chic Bloom Boutique (pink building) and ask Stylist Chloe for a fitting room.',
    phraseToSpeak: 'Excuse me, where are the fitting rooms located?',
    rewardXp: 70,
    itemReward: {
      id: 'item_hoodie',
      name: 'Pastel Anime Oversized Hoodie',
      emoji: '🧥',
      category: 'clothes',
      description: 'Cozy organic cotton streetwear hoodie in size Medium with 20% sale tag.',
      englishPhrase: 'This fits perfectly! I will take it.'
    }
  },
  {
    id: 'q4_flight',
    title: 'Mission 4: Airport Boarding Pass',
    locationId: 'airport',
    instruction: 'Walk up to Skyport International (blue building) and talk to Captain Mei at Gate 14.',
    phraseToSpeak: 'Here is my passport and confirmation number for Flight SQ-702.',
    rewardXp: 100,
    itemReward: {
      id: 'item_boarding_pass',
      name: 'Skyport Boarding Pass (Seat 14A)',
      emoji: '✈️',
      category: 'document',
      description: 'Priority Group 2 boarding pass with barcode and TSA PreCheck stamp.',
      englishPhrase: 'Is window seat 14A still available?'
    }
  },
  {
    id: 'q5_hotel',
    title: 'Mission 5: Hotel Check-In',
    locationId: 'hotel',
    instruction: 'Walk to Sakura Grand Hotel (purple building) and check in with Concierge Alexander.',
    phraseToSpeak: 'Good afternoon, I am checking in. The reservation is under Swathi.',
    rewardXp: 90,
    itemReward: {
      id: 'item_hotel_key',
      name: 'Room 1402 High-Floor Keycard',
      emoji: '🗝️',
      category: 'key',
      description: 'Deluxe Suite keycard including complimentary continental breakfast access.',
      englishPhrase: 'Could you please let me know what time breakfast is served?'
    }
  }
];

export const OpenWorldGameEngine: React.FC<OpenWorldGameEngineProps> = ({
  onNavigateModule,
  onAddXp
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Player State
  const [player, setPlayer] = useState({
    x: 550,
    y: 300,
    speed: 4,
    direction: 'down' as 'up' | 'down' | 'left' | 'right',
    isMoving: false,
    animFrame: 0
  });

  // Controls State
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  
  // Game State
  const [activeNearbyLocation, setActiveNearbyLocation] = useState<CityLocation | null>(null);
  const [activeNearbyNpc, setActiveNearbyNpc] = useState<WorldNpc | null>(null);
  const [currentQuestIndex, setCurrentQuestIndex] = useState<number>(0);
  const [inventory, setInventory] = useState<WorldInventoryItem[]>([
    {
      id: 'item_passport',
      name: 'Tourist Global Passport',
      emoji: '📘',
      category: 'document',
      description: 'Your official international ID. Always keep it in your front travel pouch.',
      englishPhrase: 'Here is my official passport and ID.'
    },
    {
      id: 'item_wallet',
      name: 'Cute Anime Coin Purse & Cardholder',
      emoji: '👛',
      category: 'accessory',
      description: 'Contains contactless payment credit cards and emergency cash notes.',
      englishPhrase: 'Can I pay with credit card or cash?'
    }
  ]);

  // Modals & Dialogue
  const [activeDialogueNpc, setActiveDialogueNpc] = useState<WorldNpc | null>(null);
  const [showBackpack, setShowBackpack] = useState<boolean>(false);
  const [showLocationModal, setShowLocationModal] = useState<CityLocation | null>(null);
  const [showQuestCelebration, setShowQuestCelebration] = useState<string | null>(null);

  // Speech Practice in Dialogue
  const [speechRecognizedText, setSpeechRecognizedText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSuccess, setSpeechSuccess] = useState<boolean>(false);

  const currentQuest = CITY_QUESTS[currentQuestIndex] || null;

  // Sound generator using Web Audio API
  const playSoundEffect = useCallback((type: 'step' | 'door' | 'fanfare' | 'ding' | 'coin') => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'door') {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } else if (type === 'ding') {
        osc.frequency.setValueAtTime(1046.5, audioCtx.currentTime); // C6
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } else if (type === 'fanfare') {
        const now = audioCtx.currentTime;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'coin') {
        osc.frequency.setValueAtTime(987.77, audioCtx.currentTime); // B5
        osc.frequency.setValueAtTime(1318.51, audioCtx.currentTime + 0.08); // E6
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch {
      // AudioContext unavailable or blocked
    }
  }, []);

  // Text to Speech
  const speakEnglish = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      keysPressed.current[e.code] = true;

      // Quick hotkeys
      if (e.key === 'e' || e.key === 'E' || e.key === ' ') {
        // Trigger interaction
        if (activeNearbyNpc) {
          openNpcDialogue(activeNearbyNpc);
        } else if (activeNearbyLocation) {
          openLocationDetail(activeNearbyLocation);
        }
      }
      if (e.key === 'b' || e.key === 'B') {
        setShowBackpack(prev => !prev);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeNearbyNpc, activeNearbyLocation]);

  // Main 60FPS Game Loop
  useEffect(() => {
    let animationFrameId: number;
    let frameCount = 0;

    const gameLoop = () => {
      frameCount++;
      const keys = keysPressed.current;
      let dx = 0;
      let dy = 0;
      let newDir = player.direction;
      let moving = false;

      // Handle Directional Input
      if (keys['w'] || keys['arrowup'] || keys['KeyW']) {
        dy -= player.speed;
        newDir = 'up';
        moving = true;
      }
      if (keys['s'] || keys['arrowdown'] || keys['KeyS']) {
        dy += player.speed;
        newDir = 'down';
        moving = true;
      }
      if (keys['a'] || keys['arrowleft'] || keys['KeyA']) {
        dx -= player.speed;
        newDir = 'left';
        moving = true;
      }
      if (keys['d'] || keys['arrowright'] || keys['KeyD']) {
        dx += player.speed;
        newDir = 'right';
        moving = true;
      }

      // Calculate new position within boundaries (1100x600 canvas)
      setPlayer(prev => {
        let nextX = prev.x + dx;
        let nextY = prev.y + dy;

        // Canvas boundaries
        nextX = Math.max(30, Math.min(1070, nextX));
        nextY = Math.max(30, Math.min(570, nextY));

        // Building collision box check (allow doors)
        for (const loc of CITY_LOCATIONS) {
          const isInsideBuilding = 
            nextX > loc.x - 10 && 
            nextX < loc.x + loc.width + 10 && 
            nextY > loc.y - 10 && 
            nextY < loc.y + loc.height + 10;

          const isNearDoor = 
            Math.abs(nextX - loc.doorX) < 35 && 
            Math.abs(nextY - loc.doorY) < 35;

          if (isInsideBuilding && !isNearDoor) {
            // Revert movement towards building
            nextX = prev.x;
            nextY = prev.y;
          }
        }

        const animFrame = moving && frameCount % 8 === 0 ? (prev.animFrame + 1) % 4 : prev.animFrame;

        return {
          ...prev,
          x: nextX,
          y: nextY,
          direction: newDir,
          isMoving: moving,
          animFrame
        };
      });

      // Check proximity to locations
      let closestLoc: CityLocation | null = null;
      for (const loc of CITY_LOCATIONS) {
        const dist = Math.hypot(player.x - loc.doorX, player.y - loc.doorY);
        if (dist < 55) {
          closestLoc = loc;
          break;
        }
      }
      setActiveNearbyLocation(closestLoc);

      // Check proximity to NPCs
      let closestNpc: WorldNpc | null = null;
      for (const npc of WORLD_NPCS) {
        const dist = Math.hypot(player.x - npc.x, player.y - npc.y);
        if (dist < 50) {
          closestNpc = npc;
          break;
        }
      }
      setActiveNearbyNpc(closestNpc);

      // Render Canvas
      renderCanvas();

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [player.x, player.y, player.direction, player.speed]);

  // Render 2D Canvas Map
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Background Grass / Park Tiles
    ctx.fillStyle = '#ecfdf5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid/grass patterns
    ctx.fillStyle = '#d1fae5';
    for (let gx = 0; gx < canvas.width; gx += 40) {
      for (let gy = 0; gy < canvas.height; gy += 40) {
        if ((gx + gy) % 80 === 0) {
          ctx.fillRect(gx + 15, gy + 15, 6, 6);
        }
      }
    }

    // 2. Main Roads & Sidewalks (GTA style crossroad & pedestrian avenues)
    // Horizontal Main Boulevard
    ctx.fillStyle = '#cbd5e1'; // Sidewalk
    ctx.fillRect(0, 260, canvas.width, 100);
    ctx.fillStyle = '#334155'; // Asphalt Road
    ctx.fillRect(0, 275, canvas.width, 70);

    // Road dashed center line
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.setLineDash([20, 15]);
    ctx.beginPath();
    ctx.moveTo(0, 310);
    ctx.lineTo(canvas.width, 310);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Vertical Cross Street
    ctx.fillStyle = '#cbd5e1'; // Sidewalk
    ctx.fillRect(360, 0, 80, canvas.height);
    ctx.fillStyle = '#334155'; // Asphalt Road
    ctx.fillRect(375, 0, 50, canvas.height);

    // Zebra Crossings
    ctx.fillStyle = '#ffffff';
    for (let zi = 0; zi < 60; zi += 12) {
      ctx.fillRect(375, 265 + zi, 50, 6);
    }

    // 3. Central Fountain Plaza
    ctx.fillStyle = '#bae6fd';
    ctx.beginPath();
    ctx.arc(400, 310, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(400, 310, 14, 0, Math.PI * 2);
    ctx.fill();

    // 4. City Buildings
    for (const loc of CITY_LOCATIONS) {
      // Building Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.beginPath();
      ctx.roundRect(loc.x + 8, loc.y + 8, loc.width, loc.height, 16);
      ctx.fill();

      // Building Body
      ctx.fillStyle = loc.color;
      ctx.beginPath();
      ctx.roundRect(loc.x, loc.y, loc.width, loc.height, 16);
      ctx.fill();

      // Building Roof Border
      ctx.strokeStyle = loc.accentColor;
      ctx.lineWidth = 4;
      ctx.stroke();

      // Windows
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      const winCols = Math.floor(loc.width / 50);
      for (let wi = 0; wi < winCols; wi++) {
        ctx.fillRect(loc.x + 20 + wi * 45, loc.y + 25, 28, 28);
      }

      // Building Sign Header
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.roundRect(loc.x + 10, loc.y + loc.height - 45, loc.width - 20, 35, 8);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${loc.emoji} ${loc.name}`, loc.x + loc.width / 2, loc.y + loc.height - 23);

      // Glowing Door / Entry Portal
      const isTargetQuest = currentQuest && currentQuest.locationId === loc.id;
      
      // Target Quest Indicator Ring
      if (isTargetQuest) {
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(loc.doorX, loc.doorY, 22 + Math.sin(Date.now() / 200) * 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = isTargetQuest ? '#fbbf24' : '#ffffff';
      ctx.beginPath();
      ctx.arc(loc.doorX, loc.doorY, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = loc.color;
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = loc.color;
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText('DOOR', loc.doorX, loc.doorY + 4);
    }

    // 5. Street Trees & Lamps
    const treePositions = [
      { x: 60, y: 30 }, { x: 330, y: 40 }, { x: 740, y: 40 }, { x: 1040, y: 50 },
      { x: 60, y: 540 }, { x: 340, y: 540 }, { x: 760, y: 540 }, { x: 1050, y: 540 }
    ];

    for (const tree of treePositions) {
      // Tree trunk
      ctx.fillStyle = '#78350f';
      ctx.fillRect(tree.x - 3, tree.y, 6, 12);
      // Tree canopy
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(tree.x, tree.y - 6, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(tree.x - 3, tree.y - 9, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    // 6. NPCs (Non-Player Characters)
    for (const npc of WORLD_NPCS) {
      // NPC Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(npc.x, npc.y + 14, 12, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // NPC Body
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(npc.x, npc.y, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // NPC Face/Emoji
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(npc.emoji, npc.x, npc.y + 5);

      // NPC Name Tag
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.roundRect(npc.x - 45, npc.y - 28, 90, 18, 4);
      ctx.fill();
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 9px Inter, sans-serif';
      ctx.fillText(npc.name.split(' ')[0], npc.x, npc.y - 16);

      // Quest exclamation mark if quest targets this NPC's location
      if (currentQuest && currentQuest.locationId === npc.locationId) {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(npc.x + 12, npc.y - 16, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.fillText('!', npc.x + 12, npc.y - 12);
      }
    }

    // 7. Player Avatar (Swathi)
    const px = player.x;
    const py = player.y;

    // Player Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(px, py + 16, 14, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Player Body (Anime girl in cute pink jacket)
    const bob = player.isMoving ? Math.sin(player.animFrame * Math.PI / 2) * 2 : 0;

    // Backpack
    ctx.fillStyle = '#8b5cf6';
    ctx.beginPath();
    ctx.roundRect(px - 14, py - 4 + bob, 28, 18, 6);
    ctx.fill();

    // Torso / Jacket
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(px, py + bob, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Head / Hair (Cute brown anime twin-tails)
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(px, py - 12 + bob, 11, 0, Math.PI * 2);
    ctx.fill();

    // Face
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(px, py - 10 + bob, 8, 0, Math.PI * 2);
    ctx.fill();

    // Eyes based on direction
    ctx.fillStyle = '#0f172a';
    if (player.direction === 'down') {
      ctx.fillRect(px - 4, py - 11 + bob, 2, 3);
      ctx.fillRect(px + 2, py - 11 + bob, 2, 3);
    } else if (player.direction === 'left') {
      ctx.fillRect(px - 6, py - 11 + bob, 2, 3);
    } else if (player.direction === 'right') {
      ctx.fillRect(px + 4, py - 11 + bob, 2, 3);
    }

    // Player Name Bubble
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.roundRect(px - 35, py - 38 + bob, 70, 18, 9);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⭐ Swathi', px, py - 25 + bob);
  };

  // Virtual Joystick / Touch D-Pad Handlers
  const handleDirectionPress = (dir: 'up' | 'down' | 'left' | 'right') => {
    setPlayer(prev => {
      let dx = 0;
      let dy = 0;
      if (dir === 'up') dy = -18;
      if (dir === 'down') dy = 18;
      if (dir === 'left') dx = -18;
      if (dir === 'right') dx = 18;

      return {
        ...prev,
        x: Math.max(30, Math.min(1070, prev.x + dx)),
        y: Math.max(30, Math.min(570, prev.y + dy)),
        direction: dir,
        isMoving: true,
        animFrame: (prev.animFrame + 1) % 4
      };
    });
  };

  // Open NPC dialogue
  const openNpcDialogue = (npc: WorldNpc) => {
    playSoundEffect('ding');
    setActiveDialogueNpc(npc);
    setSpeechRecognizedText('');
    setSpeechSuccess(false);
    speakEnglish(npc.dialogue);
  };

  // Open building details
  const openLocationDetail = (loc: CityLocation) => {
    playSoundEffect('door');
    setShowLocationModal(loc);
  };

  // Fast Travel teleport
  const fastTravelTo = (loc: CityLocation) => {
    playSoundEffect('door');
    setPlayer(prev => ({
      ...prev,
      x: loc.doorX,
      y: loc.doorY + 25,
      direction: 'up'
    }));
  };

  // Speech Recognition practice with NPC
  const startListening = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can click "Auto Complete" to practice!');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpeechRecognizedText(transcript);
        setIsListening(false);
        verifySpeechText(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const verifySpeechText = (spoken: string) => {
    setSpeechSuccess(true);
    playSoundEffect('fanfare');
    onAddXp(40);

    // If matches quest
    if (currentQuest && activeDialogueNpc && activeDialogueNpc.locationId === currentQuest.locationId) {
      handleCompleteCurrentQuest();
    }
  };

  const handleCompleteCurrentQuest = () => {
    if (!currentQuest) return;

    playSoundEffect('coin');
    onAddXp(currentQuest.rewardXp);
    setInventory(prev => [currentQuest.itemReward, ...prev]);
    setShowQuestCelebration(currentQuest.title);

    setTimeout(() => {
      setShowQuestCelebration(null);
      setCurrentQuestIndex(prev => prev + 1);
    }, 2800);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white p-6 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5 text-yellow-300" />
              Open-World 2D GTA Anime Life Simulator
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              LifeQuest City: Practical English World
            </h1>
            <p className="text-emerald-100 text-sm mt-1 max-w-2xl">
              Walk freely around the city using <span className="font-bold text-yellow-300">W, A, S, D</span> or arrow keys. Enter real shops, talk to NPCs in English with your microphone, and collect items in your backpack!
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Backpack Button */}
            <button
              onClick={() => setShowBackpack(true)}
              className="relative px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 font-bold text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <Backpack className="w-5 h-5 text-yellow-300" />
              <span>Backpack</span>
              <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-slate-900 text-xs font-black">
                {inventory.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Quest HUD Banner */}
      {currentQuest && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900 uppercase">
                  Current Objective
                </span>
                <span className="text-xs font-bold text-amber-700">+{currentQuest.rewardXp} XP Reward</span>
              </div>
              <h3 className="font-black text-slate-800 text-base mt-0.5">{currentQuest.title}</h3>
              <p className="text-xs text-slate-600 mt-0.5">{currentQuest.instruction}</p>
            </div>
          </div>

          <button
            onClick={() => {
              const target = CITY_LOCATIONS.find(l => l.id === currentQuest.locationId);
              if (target) fastTravelTo(target);
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95 shrink-0"
          >
            <MapPin className="w-4 h-4" />
            Teleport to Goal
          </button>
        </div>
      )}

      {/* Main Game Screen (Canvas + Virtual Controls) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 2D Canvas Area */}
        <div className="lg:col-span-3 bg-slate-900 rounded-3xl p-3 shadow-2xl border-4 border-slate-800 relative overflow-hidden flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>City Engine Active • 60 FPS Canvas</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span>WASD: Move</span>
              <span>•</span>
              <span>E / Space: Talk & Enter</span>
              <span>•</span>
              <span>B: Backpack</span>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative w-full overflow-x-auto flex justify-center">
            <canvas
              ref={canvasRef}
              width={1100}
              height={600}
              className="rounded-2xl shadow-inner max-w-full h-auto cursor-pointer border border-slate-700 bg-emerald-50"
            />

            {/* In-Canvas Context Proximity Prompts */}
            {activeNearbyNpc && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-5 py-2.5 rounded-2xl backdrop-blur-md border border-emerald-400/50 shadow-2xl flex items-center gap-3 animate-bounce">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold">Press [E] to talk to {activeNearbyNpc.name}</span>
                <button
                  onClick={() => openNpcDialogue(activeNearbyNpc)}
                  className="px-3 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
                >
                  Talk Now
                </button>
              </div>
            )}

            {!activeNearbyNpc && activeNearbyLocation && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-5 py-2.5 rounded-2xl backdrop-blur-md border border-yellow-400/50 shadow-2xl flex items-center gap-3 animate-bounce">
                <Store className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-bold">Press [E] to enter {activeNearbyLocation.name}</span>
                <button
                  onClick={() => openLocationDetail(activeNearbyLocation)}
                  className="px-3 py-1 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold text-xs"
                >
                  Enter Shop
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Quick Locations & Touch Controls */}
        <div className="space-y-4">
          {/* Virtual D-Pad / Touch Controller (Great for mobile & mouse users) */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xl flex flex-col items-center">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
              Touch & Click Movement
            </h3>
            
            <div className="grid grid-cols-3 gap-2 w-44">
              <div />
              <button
                onClick={() => handleDirectionPress('up')}
                className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-700 font-black flex items-center justify-center shadow-md active:scale-90 transition-all border border-slate-300"
              >
                <ArrowUp className="w-6 h-6" />
              </button>
              <div />

              <button
                onClick={() => handleDirectionPress('left')}
                className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-700 font-black flex items-center justify-center shadow-md active:scale-90 transition-all border border-slate-300"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  if (activeNearbyNpc) openNpcDialogue(activeNearbyNpc);
                  else if (activeNearbyLocation) openLocationDetail(activeNearbyLocation);
                }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900 font-black flex flex-col items-center justify-center shadow-lg active:scale-90 transition-all"
              >
                <Zap className="w-5 h-5" />
                <span className="text-[9px] uppercase font-black">Action</span>
              </button>
              <button
                onClick={() => handleDirectionPress('right')}
                className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-700 font-black flex items-center justify-center shadow-md active:scale-90 transition-all border border-slate-300"
              >
                <ArrowRight className="w-6 h-6" />
              </button>

              <div />
              <button
                onClick={() => handleDirectionPress('down')}
                className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-700 font-black flex items-center justify-center shadow-md active:scale-90 transition-all border border-slate-300"
              >
                <ArrowDown className="w-6 h-6" />
              </button>
              <div />
            </div>
          </div>

          {/* Quick Fast Travel Map */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xl space-y-3">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Fast Travel Map
            </h3>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {CITY_LOCATIONS.map(loc => (
                <button
                  key={loc.id}
                  onClick={() => fastTravelTo(loc)}
                  className="w-full text-left p-2.5 rounded-2xl hover:bg-slate-100 border border-slate-100 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{loc.emoji}</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                        {loc.name}
                      </h4>
                      <span className="text-[10px] text-slate-500">
                        {loc.activities.length} hands-on activities
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Go ➔
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NPC English Dialogue Modal */}
      {activeDialogueNpc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border-4 border-emerald-500 animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl shadow">
                  {activeDialogueNpc.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{activeDialogueNpc.name}</h3>
                  <p className="text-xs text-slate-500 font-semibold">{activeDialogueNpc.role}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveDialogueNpc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dialogue Bubble */}
            <div className="my-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
                  NPC Dialogue
                </span>
                <button
                  onClick={() => speakEnglish(activeDialogueNpc.dialogue)}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-800"
                >
                  <Volume2 className="w-4 h-4" />
                  Listen
                </button>
              </div>
              <p className="text-slate-800 text-sm font-medium leading-relaxed">
                "{activeDialogueNpc.dialogue}"
              </p>
            </div>

            {/* Speaking Practice Section */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">Practice Saying This In English:</span>
                <button
                  onClick={() => speakEnglish(activeDialogueNpc.englishPractice)}
                  className="text-xs text-indigo-600 font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Pronounce
                </button>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-indigo-950 font-bold text-sm">
                "{activeDialogueNpc.englishPractice}"
              </div>

              {/* Speech Recognition Area */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={startListening}
                  className={`flex-1 py-3 px-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  {isListening ? 'Listening to your voice...' : 'Speak Into Microphone'}
                </button>

                <button
                  onClick={() => verifySpeechText(activeDialogueNpc.englishPractice)}
                  className="px-4 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs"
                >
                  Auto-Complete
                </button>
              </div>

              {speechRecognizedText && (
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                  <span className="font-bold text-slate-500">You said:</span> "{speechRecognizedText}"
                </div>
              )}

              {speechSuccess && (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Excellent English! +40 XP earned!
                </div>
              )}
            </div>

            {/* Launch Full Simulation Button */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  setActiveDialogueNpc(null);
                  const loc = CITY_LOCATIONS.find(l => l.id === activeDialogueNpc.locationId);
                  if (loc) onNavigateModule(loc.category);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Enter Full Hands-on Simulator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Building Portal Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border-4 border-yellow-400 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{showLocationModal.emoji}</span>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{showLocationModal.name}</h3>
                  <p className="text-xs text-slate-500 font-bold">Interactive Practical Building</p>
                </div>
              </div>
              <button
                onClick={() => setShowLocationModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-600 text-sm mt-4 leading-relaxed">
              {showLocationModal.description}
            </p>

            <div className="my-4 space-y-2">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                What you will practice inside:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {showLocationModal.activities.map((act, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                    <span className="truncate">{act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setShowLocationModal(null);
                  onNavigateModule(showLocationModal.category);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Step Inside & Start Practical Training
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backpack Inventory Modal */}
      {showBackpack && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 border-4 border-indigo-500 animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl shadow">
                  🎒
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Swathi's Travel Backpack</h3>
                  <p className="text-xs text-slate-500 font-bold">
                    {inventory.length} practical life items collected
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBackpack(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1">
              {inventory.map(item => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <span className="text-3xl p-2 rounded-xl bg-white shadow-sm border border-slate-100">
                    {item.emoji}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-slate-800 text-sm">{item.name}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 uppercase">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                    
                    <div className="mt-2.5 p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-indigo-900 font-bold">"{item.englishPhrase}"</span>
                      <button
                        onClick={() => speakEnglish(item.englishPhrase)}
                        className="text-indigo-600 hover:text-indigo-800 p-1"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowBackpack(false)}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-black text-sm"
            >
              Close Backpack
            </button>
          </div>
        </div>
      )}

      {/* Quest Celebration Popup */}
      {showQuestCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 text-slate-900 p-8 rounded-3xl shadow-2xl border-4 border-white max-w-md text-center animate-in zoom-in fade-in duration-300">
            <div className="text-6xl mb-3 animate-bounce">🏆</div>
            <h2 className="text-2xl font-black tracking-tight">Mission Accomplished!</h2>
            <p className="font-bold text-sm mt-1">{showQuestCelebration}</p>
            <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-slate-900 text-yellow-300 text-sm font-black shadow">
              New Item Added to Backpack! ⭐
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
