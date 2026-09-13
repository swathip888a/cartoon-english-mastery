export interface BidetButtonInfo {
  id: string;
  labelKanji: string;
  labelRomaji: string;
  labelEnglish: string;
  iconName: string;
  description: string;
  color: string;
}

export const japaneseBidetButtons: BidetButtonInfo[] = [
  {
    id: 'stop',
    labelKanji: '止',
    labelRomaji: 'Tome',
    labelEnglish: 'STOP (Cancel any action)',
    iconName: 'Square',
    description: 'The most important button! Press this to instantly stop water spray, bidet, or warm dryer.',
    color: '#ef4444',
  },
  {
    id: 'rear_spray',
    labelKanji: 'おしり',
    labelRomaji: 'Oshiri',
    labelEnglish: 'Rear Wash / Spray',
    iconName: 'ShowerHead',
    description: 'Activates a gentle targeted water spray for the rear. Pressing again often enables pulsating massage mode.',
    color: '#3b82f6',
  },
  {
    id: 'front_bidet',
    labelKanji: 'ビデ',
    labelRomaji: 'Bide',
    labelEnglish: 'Feminine Bidet Wash',
    iconName: 'Sparkles',
    description: 'Activates the front soft wash stream specifically designed for women.',
    color: '#ec4899',
  },
  {
    id: 'dryer',
    labelKanji: '乾燥',
    labelRomaji: 'Kansou',
    labelEnglish: 'Warm Air Dryer',
    iconName: 'Wind',
    description: 'Blows warm gentle air to dry you after using the wash functions.',
    color: '#f59e0b',
  },
  {
    id: 'sound_privacy',
    labelKanji: '音姫 / 音',
    labelRomaji: 'Otohime',
    labelEnglish: 'Sound Privacy Flusher',
    iconName: 'Volume2',
    description: 'Plays artificial flushing water or birdsong sounds for 2 minutes to mask bathroom sounds without wasting actual water.',
    color: '#8b5cf6',
  },
  {
    id: 'water_pressure',
    labelKanji: '水勢 (強 / 弱)',
    labelRomaji: 'Suisei (Kyou / Jaku)',
    labelEnglish: 'Water Pressure (+ / -)',
    iconName: 'Sliders',
    description: 'Adjusts the spray strength from soft gentle mist to firmer cleansing stream.',
    color: '#10b981',
  },
  {
    id: 'flush_big',
    labelKanji: '大',
    labelRomaji: 'Dai',
    labelEnglish: 'Full Flush (Solid waste)',
    iconName: 'Droplets',
    description: 'Standard full volume toilet bowl flush.',
    color: '#06b6d4',
  },
  {
    id: 'flush_small',
    labelKanji: '小',
    labelRomaji: 'Shou',
    labelEnglish: 'Eco / Small Flush (Liquid)',
    iconName: 'Droplet',
    description: 'Water-saving smaller flush for liquid waste.',
    color: '#14b8a6',
  },
];

export const restroomEtiquetteTips = [
  {
    title: '🚨 RED EMERGENCY CORD WARNING (Crucial!)',
    content: 'In many countries (UK, Japan, Australia, Singapore, Europe), accessible restrooms have a RED pull-string or red emergency call button on the wall.\nDO NOT PULL THIS TO FLUSH THE TOILET! Pulling this cord triggers a loud siren and brings emergency medical security rushing to your stall.',
    icon: 'AlertTriangle',
    severity: 'danger',
  },
  {
    title: 'Asking for the Restroom in Public',
    content: 'In restaurants, cafes, or shops, you can politely ask the cashier or staff for the restroom location and keypad door code.',
    keyPhrases: [
      '“Excuse me, where is the restroom / bathroom?” (US / Canada)',
      '“Excuse me, could you tell me where the toilet / loo is?” (UK / Europe / Australia)',
      '“What is the four-digit code for the restroom door, please?”',
    ],
    icon: 'DoorClosed',
    severity: 'info',
  },
  {
    title: 'Flushable Paper vs Sanitary Bins',
    content: '• Toilet Paper: In the US, UK, Japan, Australia, and Western Europe, standard toilet paper goes DIRECTLY into the toilet bowl and is flushed down.\n• In parts of Latin America, Greece, and Southeast Asia where plumbing pipes are narrow, paper must go into the small trash bin next to the toilet (look for signage: "Do not flush paper").\n• Pads & Tampons: NEVER flush sanitary pads, tampons, or wet wipes down the toilet anywhere in the world! Wrap them and place them into the designated wall sanitary bin.',
    icon: 'Trash2',
    severity: 'warning',
  },
  {
    title: 'Stall Locks & Occupancy Indicators',
    content: '• Red / "Occupied" = Stall is locked and in use.\n• Green / White / "Vacant" = Stall is empty and available.\n• If locked from inside, turn the thumb latch clockwise or slide the bolt until the external dot turns RED.',
    icon: 'Lock',
    severity: 'info',
  },
];
