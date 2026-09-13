export type ModuleCategory = 
  | 'openworld'
  | 'overview'
  | 'starbucks'
  | 'airport'
  | 'transit'
  | 'fashion'
  | 'dining'
  | 'hotel'
  | 'restroom'
  | 'health'
  | 'english'
  | 'formslab'
  | 'quests'
  | 'codex'
  | 'flashcards';

export interface WorldInventoryItem {
  id: string;
  name: string;
  emoji: string;
  category: 'beverage' | 'food' | 'ticket' | 'key' | 'clothes' | 'document' | 'accessory';
  description: string;
  englishPhrase: string;
}

export interface CityLocation {
  id: string;
  name: string;
  category: ModuleCategory;
  emoji: string;
  color: string;
  accentColor: string;
  x: number; // tile coordinates
  y: number;
  width: number;
  height: number;
  doorX: number;
  doorY: number;
  description: string;
  activities: string[];
}

export interface WorldNpc {
  id: string;
  name: string;
  role: string;
  emoji: string;
  x: number;
  y: number;
  dialogue: string;
  englishPractice: string;
  locationId: string;
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  completedQuests: string[];
  masteredFlashcards: string[];
  unlockedBadges: string[];
  soundEnabled: boolean;
  voiceSpeed: number;
}

export interface AnimeMentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  color: string;
  quote: string;
  specialty: string;
}

// Starbucks & Cafe Types
export type CupStyle = 'hot_paper_sleeve' | 'iced_clear_plastic' | 'ceramic_dinein_mug';

export interface CoffeeDrink {
  id: string;
  name: string;
  category: 'espresso' | 'iced' | 'frappuccino' | 'tea_refreshers';
  shortDesc: string;
  tasteProfile: {
    bitterness: number; // 1-5
    sweetness: number;  // 1-5
    milkiness: number;  // 1-5
    caffeineStrength: number; // 1-5
  };
  layers: string[];
  basePrice: number;
  howToOrderTemplate: string;
  proTip: string;
  calorieRange: string;
  recommendedCup: CupStyle;
  recommendedStraw: string;
}

export interface StarbucksFoodItem {
  id: string;
  name: string;
  category: 'bakery' | 'sandwiches' | 'snacks_sweets' | 'protein_boxes';
  shortDesc: string;
  price: number;
  calories: number;
  warmingSupported: boolean;
  defaultWarmed: boolean;
  dietary: string[];
  howToOrderPhrasing: string;
  baristaQuestion: string;
  proTip: string;
  pairsWellWith: string;
}

export interface CondimentItem {
  id: string;
  name: string;
  color: string;
  packetColor: string;
  sweetnessDesc: string;
  category: 'sugar' | 'straw' | 'sleeve_accessory';
  bestUsedFor: string;
}

// Fashion & Shopping Types
export interface ClothingItem {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'outerwear' | 'shoes' | 'accessories';
  price: number;
  originalPrice?: number;
  discountTag?: string;
  colors: string[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  imageEmoji: string;
  material: string;
  careInstructions: string;
  howToAskInStore: string;
}

// Airplane Cabin & Lavatory Types
export interface CabinFeature {
  id: string;
  title: string;
  instruction: string;
  proTip: string;
  sayToFlightAttendant?: string;
}

// Airport Types
export interface AirportStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  icon: string;
  location: string;
  whatHappens: string;
  doThis: string[];
  dontDoThis: string[];
  keyPhrases: { english: string; meaning: string; situation: string }[];
  proSecrets: string;
}

export interface BoardingPassInfo {
  passengerName: string;
  flightNumber: string;
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  terminal: string;
  gate: string;
  boardingTime: string;
  departureTime: string;
  seat: string;
  boardingGroup: string;
  pnrCode: string;
  classType: string;
}

// Interactive Forms Lab Types
export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'select' | 'radio' | 'checkbox' | 'date' | 'number';
  options?: { value: string; label: string; meaning?: string }[];
  helperTip: string;
  englishExplanation: string;
  required?: boolean;
  exampleValue: string;
}

export interface InteractiveFormConfig {
  id: string;
  title: string;
  category: 'airport' | 'hotel' | 'hospital' | 'postal';
  icon: string;
  tagline: string;
  importanceDescription: string;
  fields: FormField[];
}

// English Phrase Types
export interface EnglishPhraseItem {
  id: string;
  category: string;
  scenario: string;
  casualPhrase: string;
  politePhrase: string;
  superPolitePhrase: string;
  baristaOrStaffResponse: string;
  pronunciationNotes: string;
  audioText: string;
  tags: string[];
}

// Flashcard Types
export interface Flashcard {
  id: string;
  category: ModuleCategory;
  question: string;
  answer: string;
  animeHint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

// Quest Types
export interface QuestChoice {
  text: string;
  isCorrect?: boolean;
  feedback: string;
  xpReward: number;
  nextStepIndex: number;
}

export interface QuestStep {
  speakerId: string;
  speakerName: string;
  text: string;
  expression: 'happy' | 'thinking' | 'surprised' | 'serious' | 'proud';
  choices?: QuestChoice[];
}

export interface StoryQuest {
  id: string;
  title: string;
  category: ModuleCategory;
  description: string;
  mentorId: string;
  xpReward: number;
  badgeUnlock?: string;
  steps: QuestStep[];
}

// Pocket Codex Item
export interface CodexEntry {
  id: string;
  title: string;
  category: ModuleCategory;
  tags: string[];
  oneLiner: string;
  emergencyAction?: string;
  cheatSheetList: string[];
  sayThisInEnglish: string;
}
