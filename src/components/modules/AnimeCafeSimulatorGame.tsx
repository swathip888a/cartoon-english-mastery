import React, { useState, useEffect, useRef } from 'react';
import { CoffeeDrink, StarbucksFoodItem } from '../../types';
import { coffeeDrinks } from '../../data/starbucksData';
import { STARBUCKS_FOOD_ITEMS } from '../../data/starbucksFoodData';
import { AudioSpeakButton } from '../AudioSpeakButton';
import { VoiceSpeechPractice } from '../VoiceSpeechPractice';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Volume2,
  Mic,
  Flame,
  Award,
  Zap,
  Coffee,
  Heart,
  ChevronRight,
  Smile,
  Music,
  ShoppingBag
} from 'lucide-react';

interface AnimeCafeSimulatorGameProps {
  onAddXp: (amount: number, reason: string) => void;
}

// Sound synthesizer using Web Audio API for rich simulator SFX
class CafeSoundEffects {
  private ctx: AudioContext | null = null;

  private initCtx() {
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

  // Steam wand hiss
  playSteamHiss() {
    this.initCtx();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.4));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3200;
    filter.Q.value = 1.8;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  // Syrup squirt
  playPumpSquirt() {
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // Espresso drip
  playEspressoDrip() {
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  // Toaster bell Ding!
  playToasterBell() {
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1560, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 1.2);
  }

  // Cashier Register Ka-Ching!
  playKaChing() {
    this.initCtx();
    if (!this.ctx) return;
    const freqs = [987.77, 1318.51, 1975.53];
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const startTime = this.ctx.currentTime + idx * 0.08;
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }
}

const cafeAudio = new CafeSoundEffects();

export const AnimeCafeSimulatorGame: React.FC<AnimeCafeSimulatorGameProps> = ({ onAddXp }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game States
  const [gameMode, setGameMode] = useState<'customer_order' | 'barista_crafting'>('customer_order');
  const [playerName, setPlayerName] = useState<string>('Swathi');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [baristaMood, setBaristaMood] = useState<'happy' | 'talking' | 'crafting' | 'delighted'>('happy');
  const [dialogueText, setDialogueText] = useState<string>("Welcome to Starbucks Kyoto! 🌸 I'm Hana-chan. What can I brew for you today?");
  
  // Crafting Progress State (Step-by-Step Cooking Simulator)
  const [craftingStep, setCraftingStep] = useState<number>(1); // 1: Pumps, 2: Espresso, 3: Oat Milk, 4: Cold Foam, 5: Panini, 6: Served
  const [pumpsCompleted, setPumpsCompleted] = useState<number>(0);
  const [espressoBrewed, setEspressoBrewed] = useState<boolean>(false);
  const [milkSteamed, setMilkSteamed] = useState<boolean>(false);
  const [coldFoamWhipped, setColdFoamWhipped] = useState<boolean>(false);
  const [paniniWarmed, setPaniniWarmed] = useState<boolean>(false);
  const [paniniTimer, setPaniniTimer] = useState<number>(0);
  const [gameScore, setGameScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Order Details (Defaults to Swathi's Signature Order)
  const [orderCombo] = useState({
    drinkName: "Signature Hot Chocolate",
    size: "Short (8 oz)",
    milk: "Oat Milk",
    espresso: "1 Shot Blonde Espresso",
    syrup: "Vanilla Syrup",
    pumps: 3,
    topping: "Vanilla Sweet Cold Foam",
    food: "Tomato & Mozzarella Focaccia Panini",
    foodWarmed: true,
    totalPrice: "$9.25"
  });

  // Target English Order Script
  const fullOrderScript = "Hi! Can I please get a Short Classic Signature Hot Chocolate with Oat Milk, Blonde Espresso, and 3 pumps of Vanilla, topped with Vanilla Sweet Cold Foam, and a Tomato & Mozzarella Focaccia Panini warmed up?";

  // Canvas Animation Frame Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let tick = 0;

    // Particles system
    const steamParticles: Array<{ x: number; y: number; size: number; alpha: number; speedY: number }> = [];
    const sparkleParticles: Array<{ x: number; y: number; size: number; alpha: number; rot: number }> = [];

    // Pre-seed particles
    for (let i = 0; i < 18; i++) {
      steamParticles.push({
        x: 480 + (Math.random() * 40 - 20),
        y: 280 + Math.random() * 40,
        size: Math.random() * 8 + 4,
        alpha: Math.random() * 0.6 + 0.2,
        speedY: Math.random() * 0.6 + 0.4
      });
    }

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Cafe Counter Background (Warm Wood & Anime Starbucks vibe)
      const gradBg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradBg.addColorStop(0, '#2d1b18');
      gradBg.addColorStop(0.4, '#4a2f27');
      gradBg.addColorStop(1, '#1b120f');
      ctx.fillStyle = gradBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Shelf & Blackboard
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(40, 20, 320, 110);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 20, 320, 110);

      // Chalkboard Text
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.fillText('☕ STARBUCKS KYOTO SPECIAL', 55, 45);
      ctx.fillStyle = '#a7f3d0';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText('• Signature Hot Chocolate + Oat Milk', 55, 68);
      ctx.fillText('• 1x Blonde Shot & 3 Pumps Vanilla', 55, 86);
      ctx.fillText('• Vanilla Sweet Cold Foam ☁️', 55, 104);
      ctx.fillText('• Tomato Mozzarella Panini 🥪', 55, 122);

      // Espresso Machine on the right
      ctx.fillStyle = '#334155';
      ctx.fillRect(680, 100, 180, 140);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(700, 120, 140, 25);
      ctx.fillStyle = '#e2e8f0';
      // Group head & portafilter
      ctx.fillStyle = '#64748b';
      ctx.fillRect(720, 145, 40, 30);
      ctx.fillRect(780, 145, 40, 30);
      // Gauge dials
      ctx.beginPath();
      ctx.arc(715, 110, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#f8fafc';
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.stroke();

      // Steam wand
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(830, 145);
      ctx.lineTo(845, 190);
      ctx.stroke();

      // Draw Steam Particles from espresso machine & cup
      steamParticles.forEach(p => {
        p.y -= p.speedY;
        p.alpha -= 0.003;
        if (p.y < 120 || p.alpha <= 0) {
          p.y = 260 + Math.random() * 20;
          p.x = 480 + (Math.random() * 40 - 20);
          p.alpha = Math.random() * 0.6 + 0.3;
        }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 2. Counter Top (Wooden bar)
      const counterGrad = ctx.createLinearGradient(0, 250, 0, canvas.height);
      counterGrad.addColorStop(0, '#b45309');
      counterGrad.addColorStop(0.15, '#78350f');
      counterGrad.addColorStop(1, '#451a03');
      ctx.fillStyle = counterGrad;
      ctx.fillRect(0, 250, canvas.width, canvas.height - 250);

      // Counter edge highlight
      ctx.fillStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.fillRect(0, 250, canvas.width, 6);

      // 3. Draw Anime Barista "Hana-chan" (Left-Center)
      const hanaX = 520;
      const hanaY = 130;
      const breathingOffset = Math.sin(tick * 0.05) * 3;

      // Anime Body / Green Apron
      ctx.save();
      ctx.translate(0, breathingOffset);
      
      // Apron Dress
      ctx.fillStyle = '#006241'; // Starbucks Green
      ctx.beginPath();
      ctx.moveTo(hanaX - 55, hanaY + 110);
      ctx.lineTo(hanaX + 55, hanaY + 110);
      ctx.lineTo(hanaX + 70, hanaY + 230);
      ctx.lineTo(hanaX - 70, hanaY + 230);
      ctx.closePath();
      ctx.fill();

      // Siren Logo on Apron
      ctx.beginPath();
      ctx.arc(hanaX, hanaY + 160, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#004730';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#006241';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('★ SIREN ★', hanaX, hanaY + 163);

      // White Inner Shirt
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(hanaX - 35, hanaY + 70);
      ctx.lineTo(hanaX + 35, hanaY + 70);
      ctx.lineTo(hanaX + 45, hanaY + 115);
      ctx.lineTo(hanaX - 45, hanaY + 115);
      ctx.closePath();
      ctx.fill();

      // Name Badge: "HANA"
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(hanaX - 40, hanaY + 125, 30, 12);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 8px sans-serif';
      ctx.fillText('HANA', hanaX - 25, hanaY + 134);

      // Anime Head & Face
      // Neck
      ctx.fillStyle = '#fed7aa';
      ctx.fillRect(hanaX - 12, hanaY + 50, 24, 25);

      // Head Shape
      ctx.beginPath();
      ctx.arc(hanaX, hanaY + 30, 36, 0, Math.PI * 2);
      ctx.fillStyle = '#ffedd5';
      ctx.fill();

      // Anime Hair (Brown twin hair bangs)
      ctx.fillStyle = '#7c2d12';
      ctx.beginPath();
      ctx.arc(hanaX, hanaY + 22, 42, Math.PI, Math.PI * 2);
      ctx.fill();
      // Bangs
      ctx.beginPath();
      ctx.moveTo(hanaX - 40, hanaY + 20);
      ctx.quadraticCurveTo(hanaX - 20, hanaY + 45, hanaX - 10, hanaY + 30);
      ctx.quadraticCurveTo(hanaX, hanaY + 48, hanaX + 10, hanaY + 30);
      ctx.quadraticCurveTo(hanaX + 25, hanaY + 45, hanaX + 40, hanaY + 20);
      ctx.closePath();
      ctx.fill();

      // Hair flower clip
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(hanaX + 30, hanaY + 15, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(hanaX + 30, hanaY + 15, 3, 0, Math.PI * 2);
      ctx.fill();

      // Anime Eyes (Big Emerald Green Anime Eyes with Blinking)
      const isBlinking = tick % 160 > 152;
      if (isBlinking) {
        // Closed happy eyes
        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(hanaX - 16, hanaY + 32, 8, Math.PI * 0.1, Math.PI * 0.9);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(hanaX + 16, hanaY + 32, 8, Math.PI * 0.1, Math.PI * 0.9);
        ctx.stroke();
      } else {
        // Open Sparkly Anime Eyes
        ctx.fillStyle = '#059669';
        // Left Eye
        ctx.beginPath();
        ctx.ellipse(hanaX - 16, hanaY + 30, 9, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        // Right Eye
        ctx.beginPath();
        ctx.ellipse(hanaX + 16, hanaY + 30, 9, 13, 0, 0, Math.PI * 2);
        ctx.fill();

        // Highlights in eyes
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(hanaX - 18, hanaY + 26, 4, 0, Math.PI * 2);
        ctx.arc(hanaX + 14, hanaY + 26, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(hanaX - 13, hanaY + 34, 2, 0, Math.PI * 2);
        ctx.arc(hanaX + 19, hanaY + 34, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Anime Blush
      ctx.fillStyle = 'rgba(244, 63, 94, 0.35)';
      ctx.beginPath();
      ctx.ellipse(hanaX - 25, hanaY + 38, 7, 4, 0, 0, Math.PI * 2);
      ctx.ellipse(hanaX + 25, hanaY + 38, 7, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Mouth (Animated Talking synced or cute smile)
      const isTalking = (baristaMood === 'talking' || tick % 30 < 15);
      ctx.strokeStyle = '#991b1b';
      ctx.fillStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (isTalking) {
        ctx.arc(hanaX, hanaY + 45, 6, 0, Math.PI);
        ctx.fill();
      } else {
        ctx.arc(hanaX, hanaY + 44, 5, 0.2, Math.PI - 0.2);
        ctx.stroke();
      }

      // Barista Hands & Holding Milk Pitcher
      ctx.fillStyle = '#64748b'; // Stainless Pitcher
      ctx.beginPath();
      ctx.roundRect(hanaX - 60, hanaY + 160, 32, 45, 4);
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(hanaX - 60, hanaY + 160, 32, 8);

      ctx.restore();

      // 4. Draw The Coffee Cup on Counter (Real-time Custom Liquid Filling!)
      const cupX = 380;
      const cupY = 270;
      const cupW = 85;
      const cupH = 120;

      // Draw Cup Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.ellipse(cupX + cupW / 2, cupY + cupH + 5, cupW / 2 + 10, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // White Starbucks Paper Cup Body
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cupX + 8, cupY);
      ctx.lineTo(cupX + cupW - 8, cupY);
      ctx.lineTo(cupX + cupW - 16, cupY + cupH);
      ctx.lineTo(cupX + 16, cupY + cupH);
      ctx.closePath();
      ctx.clip();

      // Base Cup color
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(cupX, cupY, cupW, cupH);

      // Layer 1: Hot Chocolate & Mocha base
      const liquidLevel = (craftingStep >= 2 || espressoBrewed) ? cupH * 0.75 : cupH * 0.3;
      ctx.fillStyle = '#3e2723'; // Dark Rich Chocolate
      ctx.fillRect(cupX, cupY + cupH - liquidLevel, cupW, liquidLevel);

      // Layer 2: Blonde Espresso Swirl
      if (espressoBrewed || craftingStep >= 3) {
        ctx.fillStyle = '#d97706'; // Golden Crema
        ctx.fillRect(cupX, cupY + cupH - liquidLevel, cupW, 14);
      }

      // Layer 3: Oat Milk creamy blend
      if (milkSteamed || craftingStep >= 4) {
        const oatGrad = ctx.createLinearGradient(0, cupY + cupH - liquidLevel, 0, cupY + cupH);
        oatGrad.addColorStop(0, '#fef3c7');
        oatGrad.addColorStop(0.3, '#78350f');
        ctx.fillStyle = oatGrad;
        ctx.fillRect(cupX, cupY + cupH - liquidLevel, cupW, liquidLevel * 0.85);
      }

      // Kraft Cup Sleeve with Swathi's name!
      ctx.fillStyle = '#b45309';
      ctx.fillRect(cupX + 5, cupY + cupH * 0.38, cupW - 10, cupH * 0.34);
      ctx.fillStyle = '#451a03';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`✎ ${playerName}`, cupX + 16, cupY + cupH * 0.56);

      // Siren Logo on Cup
      ctx.beginPath();
      ctx.arc(cupX + cupW / 2, cupY + cupH * 0.52, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#006241';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // Top Lid / Cold Foam Cloud
      if (coldFoamWhipped || craftingStep >= 5) {
        // Fluffy Sweet Cold Foam Cloud
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(cupX + cupW / 2, cupY - 4, cupW / 2 + 6, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(cupX + cupW / 2 - 14, cupY - 10, 10, 0, Math.PI * 2);
        ctx.arc(cupX + cupW / 2 + 12, cupY - 12, 12, 0, Math.PI * 2);
        ctx.arc(cupX + cupW / 2, cupY - 14, 11, 0, Math.PI * 2);
        ctx.fill();

        // Chocolate shavings on top
        ctx.fillStyle = '#451a03';
        for (let s = 0; s < 7; s++) {
          ctx.fillRect(cupX + 25 + s * 6, cupY - 12 + (s % 3) * 3, 3, 2);
        }

        // Anime Sparkles on Foam
        if (Math.random() > 0.6) {
          sparkleParticles.push({
            x: cupX + 15 + Math.random() * (cupW - 30),
            y: cupY - 20 + Math.random() * 15,
            size: Math.random() * 4 + 2,
            alpha: 1,
            rot: Math.random() * Math.PI
          });
        }
      } else {
        // Standard White Dome Lid
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.roundRect(cupX + 4, cupY - 8, cupW - 8, 10, [6, 6, 0, 0]);
        ctx.fill();
        ctx.fillStyle = '#006241'; // Green Splash Stick
        ctx.fillRect(cupX + cupW / 2 - 2, cupY - 22, 4, 16);
      }

      // Draw Panini Sandwiches on Plate next to drink
      const plateX = 220;
      const plateY = 320;
      // White ceramic plate
      ctx.fillStyle = '#f1f5f9';
      ctx.beginPath();
      ctx.ellipse(plateX + 50, plateY + 20, 60, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Focaccia Panini Bread
      ctx.fillStyle = paniniWarmed ? '#b45309' : '#d97706'; // Golden toasted
      ctx.beginPath();
      ctx.roundRect(plateX + 10, plateY - 8, 80, 28, 8);
      ctx.fill();

      // Grill Marks
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2.5;
      for (let g = 0; g < 4; g++) {
        ctx.beginPath();
        ctx.moveTo(plateX + 22 + g * 16, plateY - 6);
        ctx.lineTo(plateX + 32 + g * 16, plateY + 16);
        ctx.stroke();
      }

      // Melted Mozzarella Cheese & Red Tomato slice
      ctx.fillStyle = '#ef4444'; // Tomato
      ctx.fillRect(plateX + 18, plateY + 10, 16, 5);
      ctx.fillStyle = '#fef08a'; // Melted Mozzarella Cheese Pull
      ctx.beginPath();
      ctx.moveTo(plateX + 34, plateY + 10);
      ctx.quadraticCurveTo(plateX + 48, plateY + 26, plateX + 62, plateY + 10);
      ctx.lineTo(plateX + 62, plateY + 14);
      ctx.quadraticCurveTo(plateX + 48, plateY + 30, plateX + 34, plateY + 14);
      ctx.closePath();
      ctx.fill();

      // 5. Draw Sparkle Particles
      sparkleParticles.forEach((sp, idx) => {
        sp.alpha -= 0.02;
        if (sp.alpha <= 0) {
          sparkleParticles.splice(idx, 1);
          return;
        }
        ctx.save();
        ctx.globalAlpha = sp.alpha;
        ctx.fillStyle = '#fde047';
        ctx.translate(sp.x, sp.y);
        ctx.rotate(sp.rot + tick * 0.05);
        ctx.beginPath();
        ctx.moveTo(0, -sp.size);
        ctx.lineTo(sp.size * 0.3, -sp.size * 0.3);
        ctx.lineTo(sp.size, 0);
        ctx.lineTo(sp.size * 0.3, sp.size * 0.3);
        ctx.lineTo(0, sp.size);
        ctx.lineTo(-sp.size * 0.3, sp.size * 0.3);
        ctx.lineTo(-sp.size, 0);
        ctx.lineTo(-sp.size * 0.3, -sp.size * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      // 6. Draw Anime Onomatopoeia Banner
      if (craftingStep === 1 && pumpsCompleted > 0) {
        drawAnimePopup(ctx, 430, 210, `💧 SQUIRT x${pumpsCompleted}! (Vanilla Syrup)`);
      } else if (craftingStep === 2 && espressoBrewed) {
        drawAnimePopup(ctx, 420, 200, `☕ GOLDEN BLONDE SHOT!`);
      } else if (craftingStep === 3 && milkSteamed) {
        drawAnimePopup(ctx, 420, 200, `♨️ STEAMED OAT MILK (150°F)!`);
      } else if (craftingStep === 4 && coldFoamWhipped) {
        drawAnimePopup(ctx, 420, 200, `☁️ SWEET COLD FOAM CLOUD! ✨`);
      } else if (craftingStep === 5 && paniniWarmed) {
        drawAnimePopup(ctx, 230, 260, `🥪 WARM CRISPY FOCACCIA! 🧀`);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const drawAnimePopup = (c: CanvasRenderingContext2D, x: number, y: number, text: string) => {
      c.save();
      c.fillStyle = '#f43f5e';
      c.shadowColor = '#000000';
      c.shadowBlur = 8;
      c.beginPath();
      c.roundRect(x - 10, y - 18, 210, 28, 8);
      c.fill();
      c.fillStyle = '#ffffff';
      c.font = 'bold 11px Inter, sans-serif';
      c.textAlign = 'left';
      c.fillText(text, x, y);
      c.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [craftingStep, pumpsCompleted, espressoBrewed, milkSteamed, coldFoamWhipped, paniniWarmed, baristaMood, playerName]);

  // Crafting actions
  const handlePumpSyrup = () => {
    cafeAudio.playPumpSquirt();
    const next = pumpsCompleted + 1;
    setPumpsCompleted(next);
    if (next >= 3) {
      sound.playSuccess();
      setCraftingStep(2);
      setDialogueText("3 pumps of Madagascar Vanilla added! Now let's pull a golden Blonde Espresso shot ☕");
      onAddXp(20, "Added 3 pumps of Vanilla Syrup! 💧");
    }
  };

  const handleBrewEspresso = () => {
    cafeAudio.playEspressoDrip();
    setEspressoBrewed(true);
    setDialogueText("Smooth blonde espresso extraction complete! Zero bitterness, maximum sweetness.");
    sound.playSuccess();
    setTimeout(() => {
      setCraftingStep(3);
      onAddXp(25, "Pulled 1 Shot of Blonde Roast Espresso! ☕");
    }, 700);
  };

  const handleSteamMilk = () => {
    cafeAudio.playSteamHiss();
    setMilkSteamed(true);
    setDialogueText("Oat milk microfoam steamed to perfection at 150°F! Swirling into the hot chocolate base 🥛");
    sound.playSuccess();
    setTimeout(() => {
      setCraftingStep(4);
      onAddXp(25, "Steamed Creamy Oat Milk! 🥛");
    }, 800);
  };

  const handleWhipColdFoam = () => {
    cafeAudio.playSteamHiss();
    setColdFoamWhipped(true);
    setDialogueText("Velvety Vanilla Sweet Cold Foam layered on top! Look at that cloud texture ☁️✨");
    sound.playSuccess();
    setTimeout(() => {
      setCraftingStep(5);
      onAddXp(30, "Layered Vanilla Sweet Cold Foam! ☁️");
    }, 800);
  };

  const handleWarmPanini = () => {
    cafeAudio.playToasterBell();
    setPaniniWarmed(true);
    setDialogueText("Ding! Tomato & Mozzarella Focaccia toasted to golden perfection! Crispy outside, gooey melted cheese inside 🥪🧀");
    sound.playSuccess();
    setTimeout(() => {
      setCraftingStep(6);
      setIsCompleted(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onAddXp(50, "Warmed Mozzarella Focaccia Panini & Served Order! 🎉");
    }, 900);
  };

  const handleResetSimulator = () => {
    sound.playClick();
    setCraftingStep(1);
    setPumpsCompleted(0);
    setEspressoBrewed(false);
    setMilkSteamed(false);
    setColdFoamWhipped(false);
    setPaniniWarmed(false);
    setIsCompleted(false);
    setDialogueText("Let's craft another fresh customized gourmet drink! What order shall we prepare?");
  };

  return (
    <div className="space-y-6">
      {/* Game Mode Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-amber-950 p-6 rounded-3xl border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              2D Anime Coffee Simulator Game Engine
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              ☕ Starbucks Kyoto: Anime Real-World Simulator
            </h2>
            <p className="text-emerald-100/80 text-sm max-w-2xl">
              Step directly into a 60 FPS real-time animated Kyoto cafe! Speak with Anime Barista Hana-chan, craft customized drinks step-by-step, steam oat milk, pull blonde shots, and toast mozzarella paninis.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-700/60">
            <button
              onClick={() => {
                sound.playClick();
                setGameMode('customer_order');
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                gameMode === 'customer_order'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Mic className="w-4 h-4" />
              1. Customer Voice Order
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setGameMode('barista_crafting');
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                gameMode === 'barista_crafting'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Zap className="w-4 h-4" />
              2. Play as Barista (Crafting Game)
            </button>
          </div>
        </div>
      </div>

      {/* 2D Anime Canvas Game Simulator Viewport */}
      <div className="bg-slate-900 rounded-3xl border-2 border-emerald-500/40 p-4 shadow-2xl relative overflow-hidden">
        {/* Canvas Display */}
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-[16/9] max-h-[500px] w-full flex items-center justify-center border border-slate-800">
          <canvas
            ref={canvasRef}
            width={1000}
            height={560}
            className="w-full h-full object-contain cursor-crosshair"
          />

          {/* Anime Dialogue Visual Novel Overlay (Bottom of Canvas) */}
          <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border-2 border-amber-500/50 shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-700 border-2 border-amber-400 overflow-hidden flex items-center justify-center text-xl flex-shrink-0 shadow-lg">
                👩‍🍳
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-amber-300 text-sm tracking-wide">Barista Hana (Kyoto Branch)</span>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40 font-bold">
                    Lv. 10 Master Barista
                  </span>
                </div>
                <p className="text-white text-sm font-medium mt-0.5 leading-relaxed">
                  "{dialogueText}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <AudioSpeakButton
                text={dialogueText}
                label="Listen"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Game Stations */}
      {gameMode === 'customer_order' ? (
        /* CUSTOMER ORDERING SIMULATOR */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Order Script & Spoken Practice */}
          <div className="lg:col-span-8 bg-slate-900/90 rounded-3xl p-6 border border-emerald-500/30 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Order Practice: Swathi's Custom Starbucks Script</h3>
                  <p className="text-xs text-slate-400">Speak this exact fluent sentence into your microphone to trigger Barista Hana!</p>
                </div>
              </div>
              <AudioSpeakButton
                text={fullOrderScript}
                label="Play Full Audio"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg"
              />
            </div>

            {/* Target Script Box */}
            <div className="p-5 bg-gradient-to-r from-emerald-950/60 to-slate-950 rounded-2xl border border-emerald-500/40 space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Target Spoken English Order:
              </div>
              <p className="text-lg text-emerald-50 font-semibold leading-relaxed">
                "{fullOrderScript}"
              </p>
            </div>

            {/* Microphone Voice Test */}
            <VoiceSpeechPractice
              targetPhrase={fullOrderScript}
              phraseMeaning="Order: Short Hot Chocolate + Oat Milk + Blonde Espresso + 3 Vanilla + Cold Foam + Warmed Panini"
              phoneticNotes="Say smoothly in 1 breath: 'Hi! Can I please get a Short Classic Signature Hot Chocolate with Oat Milk...'"
              accentColor="emerald"
              onSuccess={() => {
                sound.playSuccess();
                confetti({ particleCount: 80, spread: 60 });
                setDialogueText("Arigatou gozaimasu! Perfect pronunciation, Swathi! I'm starting your Short Hot Chocolate with Blonde shot & Sweet Cold Foam right away! ☕✨");
                onAddXp(60, "Perfect Spoken Starbucks Order Pronunciation! 🎤✨");
              }}
            />

            {/* Interactive Ordering Step Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setDialogueText("A Short Hot Chocolate with Oat Milk and Blonde Espresso? Excellent choice! That espresso cuts the sweetness and gives a nutty aroma!");
                  onAddXp(15, "Learned taste science of Blonde shot with Hot Choc!");
                }}
                className="p-4 bg-slate-800/80 hover:bg-slate-700/80 rounded-2xl border border-slate-700 text-left transition-all hover:scale-[1.02]"
              >
                <div className="text-xs font-bold text-amber-400">Add Blonde Espresso Shot</div>
                <div className="text-[11px] text-slate-300 mt-1">Gives rich coffee depth without bitter dark roast burn.</div>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setDialogueText("3 pumps of vanilla syrup! Perfectly balances the rich dark cocoa and creamy oat milk.");
                  onAddXp(15, "Learned syrup pump sweetness balance!");
                }}
                className="p-4 bg-slate-800/80 hover:bg-slate-700/80 rounded-2xl border border-slate-700 text-left transition-all hover:scale-[1.02]"
              >
                <div className="text-xs font-bold text-teal-400">3 Pumps Vanilla Syrup</div>
                <div className="text-[11px] text-slate-300 mt-1">Short size standard is 2 pumps; 3 gives gourmet vanilla richness.</div>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setDialogueText("Vanilla Sweet Cold Foam on top! You'll get cool velvety cream on top and warm chocolate underneath!");
                  onAddXp(15, "Learned Hot-Cold temperature contrast sensory!");
                }}
                className="p-4 bg-slate-800/80 hover:bg-slate-700/80 rounded-2xl border border-slate-700 text-left transition-all hover:scale-[1.02]"
              >
                <div className="text-xs font-bold text-pink-400">Vanilla Sweet Cold Foam</div>
                <div className="text-[11px] text-slate-300 mt-1">Creates an irresistible hot-and-cold velvety mouthfeel.</div>
              </button>
            </div>
          </div>

          {/* Live Order Receipt Summary Card */}
          <div className="lg:col-span-4 bg-slate-900/90 rounded-3xl p-6 border border-amber-500/30 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">Current Ticket Summary</h3>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Customer Name:</span>
                <span className="font-bold text-amber-300">{playerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Cup Size:</span>
                <span className="font-bold text-white">Short (8 oz / 236 ml)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Base Beverage:</span>
                <span className="font-bold text-emerald-300">Signature Hot Chocolate</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Milk Substitute:</span>
                <span className="font-bold text-amber-200">Oat Milk (Oatly Barista)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Roast Shot:</span>
                <span className="font-bold text-amber-400">1x Blonde Espresso</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Syrup Flavor:</span>
                <span className="font-bold text-teal-300">3 Pumps Vanilla</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Cold Foam Top:</span>
                <span className="font-bold text-pink-300">Vanilla Sweet Cold Foam</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Bakery Food:</span>
                <span className="font-bold text-amber-300">Tomato Mozzarella Panini</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Warming Option:</span>
                <span className="font-bold text-green-400">Warmed Up (TurboChef)</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-black text-white">
                <span>Estimated Total:</span>
                <span className="text-emerald-400">$9.25</span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playSuccess();
                cafeAudio.playKaChing();
                confetti({ particleCount: 70, spread: 50 });
                setDialogueText("Payment approved! Moving to the Barista Crafting Station to watch your order get handmade!");
                setGameMode('barista_crafting');
                onAddXp(30, "Paid at Starbucks Cashier! 💳");
              }}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl shadow-lg transition-all text-xs uppercase tracking-wider"
            >
              💳 Pay & Send Order to Barista Counter
            </button>
          </div>
        </div>
      ) : (
        /* BARISTA CRAFTING GAME SIMULATOR */
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-amber-500/40 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Interactive Barista Station
              </div>
              <h3 className="text-xl font-black text-white">
                Step {craftingStep} of 5: {
                  craftingStep === 1 ? "Pump 3x Vanilla Syrup into Cup" :
                  craftingStep === 2 ? "Extract 1 Shot Blonde Espresso" :
                  craftingStep === 3 ? "Steam Creamy Oat Milk to 150°F" :
                  craftingStep === 4 ? "Whip & Layer Vanilla Sweet Cold Foam" :
                  craftingStep === 5 ? "Toast Tomato & Mozzarella Focaccia Panini" :
                  "Order Completed & Ready to Serve!"
                }
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetSimulator}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Drink
              </button>
            </div>
          </div>

          {/* Step Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Step 1: Pump Syrup */}
            <div className={`p-4 rounded-2xl border transition-all ${
              craftingStep === 1
                ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/20'
                : pumpsCompleted >= 3
                ? 'bg-slate-800/40 border-emerald-500/40 opacity-70'
                : 'bg-slate-800/20 border-slate-800 opacity-40'
            }`}>
              <div className="text-2xl mb-2">🥫</div>
              <div className="text-xs font-bold text-white">1. Vanilla Syrup</div>
              <div className="text-[11px] text-slate-400 mt-1 mb-3">Pumps: {pumpsCompleted}/3</div>
              <button
                onClick={handlePumpSyrup}
                disabled={craftingStep !== 1 || pumpsCompleted >= 3}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl text-xs transition-all"
              >
                {pumpsCompleted >= 3 ? "✓ 3 Pumps Added" : `Press Pump (${pumpsCompleted}/3)`}
              </button>
            </div>

            {/* Step 2: Espresso */}
            <div className={`p-4 rounded-2xl border transition-all ${
              craftingStep === 2
                ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/20'
                : espressoBrewed
                ? 'bg-slate-800/40 border-emerald-500/40 opacity-70'
                : 'bg-slate-800/20 border-slate-800 opacity-40'
            }`}>
              <div className="text-2xl mb-2">☕</div>
              <div className="text-xs font-bold text-white">2. Blonde Shot</div>
              <div className="text-[11px] text-slate-400 mt-1 mb-3">Mellow & Golden</div>
              <button
                onClick={handleBrewEspresso}
                disabled={craftingStep !== 2 || espressoBrewed}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl text-xs transition-all"
              >
                {espressoBrewed ? "✓ Shot Pulled" : "Pull Blonde Shot"}
              </button>
            </div>

            {/* Step 3: Steam Oat Milk */}
            <div className={`p-4 rounded-2xl border transition-all ${
              craftingStep === 3
                ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/20'
                : milkSteamed
                ? 'bg-slate-800/40 border-emerald-500/40 opacity-70'
                : 'bg-slate-800/20 border-slate-800 opacity-40'
            }`}>
              <div className="text-2xl mb-2">🥛</div>
              <div className="text-xs font-bold text-white">3. Steam Oat Milk</div>
              <div className="text-[11px] text-slate-400 mt-1 mb-3">Steam wand to 150°F</div>
              <button
                onClick={handleSteamMilk}
                disabled={craftingStep !== 3 || milkSteamed}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl text-xs transition-all"
              >
                {milkSteamed ? "✓ Oat Milk Poured" : "Steam & Pour"}
              </button>
            </div>

            {/* Step 4: Cold Foam */}
            <div className={`p-4 rounded-2xl border transition-all ${
              craftingStep === 4
                ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/20'
                : coldFoamWhipped
                ? 'bg-slate-800/40 border-emerald-500/40 opacity-70'
                : 'bg-slate-800/20 border-slate-800 opacity-40'
            }`}>
              <div className="text-2xl mb-2">☁️</div>
              <div className="text-xs font-bold text-white">4. Sweet Cold Foam</div>
              <div className="text-[11px] text-slate-400 mt-1 mb-3">Velvety Cloud Layer</div>
              <button
                onClick={handleWhipColdFoam}
                disabled={craftingStep !== 4 || coldFoamWhipped}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl text-xs transition-all"
              >
                {coldFoamWhipped ? "✓ Foam Layered" : "Whip & Spoon"}
              </button>
            </div>

            {/* Step 5: TurboChef Panini */}
            <div className={`p-4 rounded-2xl border transition-all ${
              craftingStep === 5
                ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/20'
                : paniniWarmed
                ? 'bg-slate-800/40 border-emerald-500/40 opacity-70'
                : 'bg-slate-800/20 border-slate-800 opacity-40'
            }`}>
              <div className="text-2xl mb-2">🥪</div>
              <div className="text-xs font-bold text-white">5. TurboChef Panini</div>
              <div className="text-[11px] text-slate-400 mt-1 mb-3">Melted Mozzarella</div>
              <button
                onClick={handleWarmPanini}
                disabled={craftingStep !== 5 || paniniWarmed}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl text-xs transition-all"
              >
                {paniniWarmed ? "✓ Panini Crisped" : "Toast in Oven (15s)"}
              </button>
            </div>
          </div>

          {/* Finished Banner */}
          {isCompleted && (
            <div className="p-6 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 rounded-2xl border-2 border-emerald-400 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center text-3xl shadow-lg">
                  🏆
                </div>
                <div>
                  <div className="text-emerald-300 font-bold text-xs uppercase tracking-wider">Order Hand-Off Complete!</div>
                  <h4 className="text-lg font-black text-white">
                    "Order for {playerName}! Short Signature Hot Chocolate & Warmed Panini Ready!"
                  </h4>
                  <p className="text-xs text-emerald-100/70 mt-0.5">
                    Rating: ⭐⭐⭐⭐⭐ (5.0 / 5.0) Perfect microfoam texture, creamy blonde balance, and crispy mozzarella melt!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AudioSpeakButton
                  text={`Order for ${playerName}! Short Signature Hot Chocolate with Oat milk, Blonde Espresso, 3 pumps Vanilla, Sweet Cold Foam, and warm Tomato Mozzarella Panini ready at the pick up counter!`}
                  label="Hear Hand-Off Call"
                  className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl shadow-lg"
                />
                <button
                  onClick={handleResetSimulator}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2 rounded-xl border border-slate-700"
                >
                  Brew Another
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
