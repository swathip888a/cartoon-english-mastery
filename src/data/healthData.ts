export interface HealthTriageTier {
  id: string;
  name: string;
  icon: string;
  color: string;
  whenToGo: string[];
  examples: string[];
  approxCostTier: string;
  waitTimes: string;
  whatToSay: string;
}

export const healthTriageTiers: HealthTriageTier[] = [
  {
    id: 'pharmacy',
    name: '1. Local Pharmacy (Chemist / Drugstore)',
    icon: 'Pill',
    color: '#10b981',
    whenToGo: [
      'Mild symptoms (headache, minor sore throat, slight fever, motion sickness, seasonal allergies).',
      'Need advice on Over-The-Counter (OTC) medication without seeing a doctor.',
      'Refilling an existing valid prescription.',
    ],
    examples: ['Tylenol / Acetaminophen (fever/pain)', 'Advil / Ibuprofen (inflammation/cramps)', 'Zyrtec / Claritin (allergies)', 'Pepto-Bismol / Tums (stomach upset)', 'Band-aids & antiseptic cream'],
    approxCostTier: '$5 - $25 (Low)',
    waitTimes: '0 - 10 minutes',
    whatToSay: '“Hi! I have a throbbing headache and a dry cough. Could you recommend an over-the-counter medicine that won’t make me drowsy?”',
  },
  {
    id: 'urgent_care',
    name: '2. Urgent Care Clinic / Walk-In Clinic',
    icon: 'Stethoscope',
    color: '#3b82f6',
    whenToGo: [
      'Moderate non-life-threatening illness or injuries that cannot wait 3 days for a primary doctor appointment.',
      'X-rays needed for suspected bone sprain or minor fracture.',
      'Deep cuts needing stitches / sutures, severe flu, ear infections, strep throat, mild asthma attack, urinary tract infection (UTI).',
    ],
    examples: ['Cuts needing 3-5 stitches', 'Twisted ankle needing X-ray', 'High fever persisting 48 hours', 'Severe painful sinus infection'],
    approxCostTier: '$50 - $250 (Moderate / Covered by travel insurance)',
    waitTimes: '15 - 45 minutes',
    whatToSay: '“Hi, I need to see a doctor for a walk-in visit. I twisted my ankle and cannot put weight on my left foot.”',
  },
  {
    id: 'emergency_room',
    name: '3. Emergency Room (ER / A&E / 911 / 112)',
    icon: 'AlertOctagon',
    color: '#ef4444',
    whenToGo: [
      'SEVERE LIFE-THREATENING or organ-threatening emergencies.',
      'Severe chest pain or pressure, difficulty breathing / gasping, sudden weakness / facial drooping (stroke).',
      'Uncontrolled heavy bleeding, head trauma with loss of consciousness, severe anaphylactic allergic reactions.',
    ],
    examples: ['Heart attack signs', 'Severe head concussion', 'Severe anaphylaxis (throat swelling)', 'Car crash trauma'],
    approxCostTier: '$500 - $3,000+ (High - Emergency Hospital Care)',
    waitTimes: 'Immediate triage based on severity',
    whatToSay: 'Call 911 (US) / 112 (EU/Global) / 999 (UK): “This is an emergency. A person is experiencing severe chest pain and trouble breathing at [exact address/street].”',
  },
];

export const symptomVocabulary = [
  { term: 'Throbbing headache', meaning: 'Headache that pulses to your heartbeat rhythm', category: 'Head & Neuro' },
  { term: 'Nausea & Queasy', meaning: 'Feeling like you need to vomit / stomach sickness', category: 'Digestive' },
  { term: 'Sore throat & Scratchy', meaning: 'Pain when swallowing, throat irritation', category: 'Respiratory' },
  { term: 'Chills & Shivering', meaning: 'Feeling freezing cold despite a high internal body temperature', category: 'Fever' },
  { term: 'Sprained / Swollen joint', meaning: 'Stretched ligament, tender and puffed up ankle or wrist', category: 'Musculoskeletal' },
  { term: 'Dizziness / Lightheadedness', meaning: 'Room spinning or feeling faint when standing up', category: 'Head & Neuro' },
  { term: 'Congestion / Stuffy nose', meaning: 'Blocked nasal passages with mucus', category: 'Respiratory' },
  { term: 'Hives & Itching', meaning: 'Red raised allergic bumps on skin', category: 'Dermatology' },
];

export const medicineLabelDecoders = [
  { term: 'Active Ingredient', meaning: 'The actual chemical that cures symptoms (e.g. Acetaminophen, Ibuprofen, Diphenhydramine).' },
  { term: 'Take with food / milk', meaning: 'Take this pill after a meal to prevent stomach upset or acid irritation.' },
  { term: 'May cause drowsiness', meaning: 'Do NOT drive a car or operate heavy machinery after taking this (common in night-time cold meds).' },
  { term: 'Every 4 to 6 hours as needed', meaning: 'Wait at least 4-6 hours between doses. Do not exceed the maximum daily limit (e.g., max 3000mg/day).' },
  { term: 'Non-Drowsy / Daytime formula', meaning: 'Medication does not make you sleepy (safe for work, travel, and driving).' },
];
