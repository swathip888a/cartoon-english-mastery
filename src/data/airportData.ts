import { AirportStep, BoardingPassInfo } from '../types';

export interface FlightRouteOption {
  id: string;
  type: 'domestic_india' | 'international_abroad';
  airline: string;
  flightNumber: string;
  airlineEmoji: string;
  fromCity: string;
  fromCode: string;
  fromAirportName: string;
  toCity: string;
  toCode: string;
  toAirportName: string;
  terminal: string;
  gate: string;
  seat: string;
  boardingGroup: string;
  baggageAllowance: {
    cabinBag: string;
    checkInBag: string;
  };
  securityAuthority: string; // "CISF Security" in India, "TSA / Border Police" abroad
  idRequirement: string;
}

export const FLIGHT_ROUTES: FlightRouteOption[] = [
  {
    id: 'blr_to_bom',
    type: 'domestic_india',
    airline: 'IndiGo Airlines',
    flightNumber: '6E-5321',
    airlineEmoji: '✈️',
    fromCity: 'Bangalore (Bengaluru)',
    fromCode: 'BLR',
    fromAirportName: 'Kempegowda International Airport (T1)',
    toCity: 'Mumbai',
    toCode: 'BOM',
    toAirportName: 'Chhatrapati Shivaji Maharaj Airport (T2)',
    terminal: 'Terminal 1',
    gate: 'Gate 18B',
    seat: '14A (Window)',
    boardingGroup: 'Zone 2',
    baggageAllowance: {
      cabinBag: '7 kg Hand Bag / Backpack',
      checkInBag: '15 kg Check-in Suitcase (1 piece)'
    },
    securityAuthority: 'CISF (Central Industrial Security Force)',
    idRequirement: 'Aadhaar Card / Voter ID / Passport / Driving License + Ticket PDF'
  },
  {
    id: 'blr_to_del',
    type: 'domestic_india',
    airline: 'Air India',
    flightNumber: 'AI-804',
    airlineEmoji: '🇮🇳',
    fromCity: 'Bangalore (Bengaluru)',
    fromCode: 'BLR',
    fromAirportName: 'Kempegowda International Airport (T2)',
    toCity: 'New Delhi',
    toCode: 'DEL',
    toAirportName: 'Indira Gandhi International Airport (T3)',
    terminal: 'Terminal 2',
    gate: 'Gate 24',
    seat: '12F (Window)',
    boardingGroup: 'Group B',
    baggageAllowance: {
      cabinBag: '7 kg Hand Bag',
      checkInBag: '15 kg Check-in Luggage'
    },
    securityAuthority: 'CISF Security',
    idRequirement: 'Govt Photo ID (Aadhaar / Passport) + DigiYatra Face Scan or Ticket'
  },
  {
    id: 'india_to_tokyo',
    type: 'international_abroad',
    airline: 'Japan Airlines (JAL)',
    flightNumber: 'JL-754',
    airlineEmoji: '🇯🇵',
    fromCity: 'Bangalore / Delhi',
    fromCode: 'BLR',
    fromAirportName: 'Kempegowda Int. Airport (T2 International)',
    toCity: 'Tokyo, Japan',
    toCode: 'NRT',
    toAirportName: 'Tokyo Narita International Airport',
    terminal: 'International Departures',
    gate: 'Gate 42A',
    seat: '21K (Window)',
    boardingGroup: 'Group 3',
    baggageAllowance: {
      cabinBag: '10 kg Hand Bag + Laptop Pouch',
      checkInBag: '2 x 23 kg Checked Suitcases (Total 46 kg)'
    },
    securityAuthority: 'Immigration Bureau & Aviation Police',
    idRequirement: 'Original Passport (min 6 months validity) + Japan Tourist Visa / eVisa'
  },
  {
    id: 'india_to_nyc',
    type: 'international_abroad',
    airline: 'Air India / United Airlines',
    flightNumber: 'AI-101 / UA-830',
    airlineEmoji: '🇺🇸',
    fromCity: 'Mumbai / Delhi',
    fromCode: 'BOM',
    fromAirportName: 'Chhatrapati Shivaji Maharaj Airport (T2)',
    toCity: 'New York City',
    toCode: 'JFK',
    toAirportName: 'John F. Kennedy International Airport (T4)',
    terminal: 'Terminal 2 International',
    gate: 'Gate 54',
    seat: '14A (Window)',
    boardingGroup: 'Group 2',
    baggageAllowance: {
      cabinBag: '7 kg Hand Bag + Personal Item',
      checkInBag: '2 x 23 kg Checked Bags'
    },
    securityAuthority: 'Immigration & TSA Border Control',
    idRequirement: 'Original Passport + US B1/B2 Tourist / Student Visa + US Customs Form'
  }
];

export const sampleBoardingPass: BoardingPassInfo = {
  passengerName: 'SWATHI / MS',
  flightNumber: '6E-5321',
  fromCity: 'Bangalore',
  fromCode: 'BLR',
  toCity: 'Mumbai',
  toCode: 'BOM',
  terminal: 'Terminal 1',
  gate: 'Gate 18B',
  boardingTime: '10:45 AM',
  departureTime: '11:25 AM',
  seat: '14A (Window)',
  boardingGroup: 'Zone 2',
  pnrCode: '6E9K2W',
  classType: 'Economy Class',
};

// Travel Vocabulary Glossary with full plain definitions
export interface TravelVocabEntry {
  id: string;
  term: string;
  emoji: string;
  pronunciation: string;
  meaning: string;
  practicalTip: string;
  exampleSentence: string;
}

export const TRAVEL_VOCABULARY_DICTIONARY: TravelVocabEntry[] = [
  {
    id: 'boarding_pass',
    term: 'Boarding Pass',
    emoji: '🎫',
    pronunciation: 'BORD-ing PASS',
    meaning: 'The official document (printed card or on your phone screen) that gives you permission to board the airplane. It shows your seat number, flight number, gate, and boarding time.',
    practicalTip: 'Always keep your boarding pass and photo ID in your hand until you sit down on the plane.',
    exampleSentence: 'Please have your boarding pass and passport open for scanning at Gate 18.'
  },
  {
    id: 'cisf_tsa',
    term: 'CISF / TSA Security',
    emoji: '👮',
    pronunciation: 'SEE-eye-ess-eff / TEE-ess-ay',
    meaning: 'The official government security officers at the airport. In India, it is the CISF (Central Industrial Security Force). In America, it is the TSA (Transportation Security Administration).',
    practicalTip: 'In Indian airports, CISF officers check your ticket and Aadhaar/Passport before entering the terminal building door.',
    exampleSentence: 'Show your ticket on your phone and Aadhaar card to the CISF officer at Gate 3.'
  },
  {
    id: 'carry_on_vs_checked',
    term: 'Carry-On (Cabin Bag) vs Checked Luggage',
    emoji: '🧳',
    pronunciation: 'KAIR-ee ON vs CHEKT LUG-ij',
    meaning: 'Carry-On is the small backpack/trolley (up to 7kg in India) you take inside the plane cabin with you. Checked luggage is the heavy suitcase you drop at the airline counter which goes into the airplane cargo hold underneath.',
    practicalTip: 'Never put power banks, laptops, or valuable jewelry in checked bags. Keep them in your carry-on.',
    exampleSentence: 'My checked suitcase weighed 14.2 kg, so it was under the 15 kg domestic limit.'
  },
  {
    id: 'jet_bridge',
    term: 'Jet Bridge (Aerobridge)',
    emoji: '🌉',
    pronunciation: 'JET BRIJ / AIR-oh-brij',
    meaning: 'The enclosed, elevated movable walking tunnel that connects the airport gate terminal door directly to the airplane door.',
    practicalTip: 'Walk straight down the jet bridge, have your boarding pass ready to show the flight attendant at the airplane door.',
    exampleSentence: 'We walked down the jet bridge and entered the aircraft at door 2L.'
  },
  {
    id: 'overhead_bin',
    term: 'Overhead Luggage Bin',
    emoji: '📦',
    pronunciation: 'OH-ver-hed BIN',
    meaning: 'The closing storage lockers located directly above the passenger seats in the airplane cabin for storing carry-on trolley bags and backpacks.',
    practicalTip: 'Place your trolley bag wheels-first into the overhead bin so the door latches closed smoothly.',
    exampleSentence: 'I put my backpack in the overhead bin above seat 14A and took my seat.'
  },
  {
    id: 'baggage_carousel',
    term: 'Baggage Carousel (Belt)',
    emoji: '🔄',
    pronunciation: 'BAG-ij KAIR-uh-sel',
    meaning: 'The motorized circular conveyor belt in the arrival hall where checked suitcases from the airplane come out for passengers to collect.',
    practicalTip: 'Check the arrival TV screen to find which Belt Number (e.g. Belt #4) your flight bags will arrive on.',
    exampleSentence: 'Flight 6E-5321 luggage is coming on Belt Number 4.'
  },
  {
    id: 'customs_green_channel',
    term: 'Customs: Green Channel vs Red Channel',
    emoji: '🟢',
    pronunciation: 'KUS-tumz GREEN CHAN-el',
    meaning: 'The border inspection exit. Walk through the Green Channel if you have "Nothing to Declare" (standard personal items). Walk through the Red Channel if carrying commercial goods or excess cash.',
    practicalTip: 'Normal tourists with clothes and personal electronics simply walk straight out through the Green Channel.',
    exampleSentence: 'I walked through the Green Channel with my suitcase and exited to the taxi stand.'
  },
  {
    id: 'layover',
    term: 'Layover / Transit (Connecting Flight)',
    emoji: '⏳',
    pronunciation: 'LAY-oh-ver / TRAN-zit',
    meaning: 'A scheduled stop or waiting time at an intermediate airport between flights before reaching your final destination.',
    practicalTip: 'If your layover is 2 hours, look for "Flight Transfers / Connecting Flights" signs without exiting to the public lobby.',
    exampleSentence: 'We have a 2-hour layover in Tokyo before boarding our flight to San Francisco.'
  }
];

export const airportSteps: AirportStep[] = [
  {
    stepNumber: 1,
    title: 'Terminal Gate Entry & ID Verification',
    subtitle: 'Entrance door check by CISF / Airport Security',
    icon: 'Building2',
    location: 'Airport Main Entrance',
    whatHappens: 'In India (BLR/BOM/DEL), airport security officers check your flight ticket (printout or phone PDF) and original government photo ID (Aadhaar/Passport) before you enter.',
    doThis: [
      'Have your flight ticket PDF open on your phone or printed paper ready in hand.',
      'Hold your original Aadhaar Card, Passport, or Voter ID alongside your ticket.',
      'Stand in the entry queue and show both to the CISF security officer with a smile.',
      'If using DigiYatra in Bangalore/Delhi, look at the facial recognition camera scanner to open the e-gate automatically!'
    ],
    dontDoThis: [
      'Do not keep your ID inside your packed luggage. Keep it in your travel pouch.',
    ],
    keyPhrases: [
      { english: 'Here is my flight ticket and Aadhaar card.', meaning: 'Showing credentials at the entry gate.', situation: 'At entrance gate' },
      { english: 'Is this the entry gate for IndiGo / Air India domestic departures?', meaning: 'Confirming the right door.', situation: 'Outside terminal' }
    ],
    proSecrets: 'Bangalore (BLR) and Delhi (DEL) have DigiYatra lanes. If enrolled, you can breeze through in 5 seconds just by looking at the camera!'
  },
  {
    stepNumber: 2,
    title: 'Check-In Kiosk & Baggage Drop',
    subtitle: 'Getting your boarding pass & dropping suitcases',
    icon: 'Ticket',
    location: 'Airline Check-In Hall',
    whatHappens: 'Using the touchscreen kiosk or airline counter to print your boarding pass and drop heavy check-in suitcases (15kg domestic / 23kg international).',
    doThis: [
      'Type your 6-character PNR code (e.g. 6E9K2W) on the touchscreen to print your Boarding Pass.',
      'Print your luggage baggage tags and stick the long tag through your suitcase handle.',
      'Place your suitcase on the conveyor scale (watch the digital weight display).',
      'Keep the small barcode baggage claim sticker safe!'
    ],
    dontDoThis: [
      'Do not pack power banks or loose lithium batteries in check-in bags (keep in hand bag).',
    ],
    keyPhrases: [
      { english: 'Could I please get a window seat?', meaning: 'Asking for seat 14A or similar window view.', situation: 'At check-in counter' },
      { english: 'Is my check-in bag within the 15 kg weight limit?', meaning: 'Checking luggage scale.', situation: 'At bag drop' }
    ],
    proSecrets: 'Window seats on daytime domestic flights in India give stunning aerial views of the Western Ghats and coastlines!'
  },
  {
    stepNumber: 3,
    title: 'Security Screening (CISF / TSA Arch)',
    subtitle: 'Plastic trays for electronics & body scanner',
    icon: 'ShieldCheck',
    location: 'Security Checkpoint',
    whatHappens: 'Placing your backpack, laptop, mobile phone, and metallic items into plastic trays for X-ray scanning while you walk through the metal detector arch.',
    doThis: [
      'Take 2 plastic trays from the stack.',
      'Tray 1: Take out your Laptop, Tablet, and Mobile Phone (lay them flat).',
      'Tray 2: Your backpack, jacket, metal belt, watch, and coins.',
      'Walk through the metal detector arch when the security officer waves you forward.',
      'Step onto the wooden frisking pedestal and hold your arms out for the hand scanner.',
      'Collect all your trays at the other side and put your phone/watch back on.'
    ],
    dontDoThis: [
      'Do not carry liquids over 100ml in your hand luggage (finish water bottles before security).',
      'Never carry scissors, knives, or lighters in hand baggage.'
    ],
    keyPhrases: [
      { english: 'Do I need to take my laptop and chargers out of my bag?', meaning: 'Asking security about electronics rules.', situation: 'At security trays' },
      { english: 'Excuse me, where can I collect my plastic tray?', meaning: 'Finding your luggage after the X-ray.', situation: 'Past the scanner' }
    ],
    proSecrets: 'Keep your laptop in a quick-access front zipper compartment of your backpack so you can pull it out in 3 seconds flat!'
  },
  {
    stepNumber: 4,
    title: 'Immigration & Passport Control (Abroad Flights)',
    subtitle: 'For flights to Japan, USA, or international destinations',
    icon: 'Passport',
    location: 'International Border Bureau',
    whatHappens: 'Immigration officers verify your passport, travel visa (e.g. Japan eVisa or US Visa), and stamp your passport with the official departure seal.',
    doThis: [
      'Remove your passport cover/case and hand your open passport + boarding pass to the officer.',
      'Look into the camera for the digital biometric facial photo.',
      'Place your right/left index fingers on the glass fingerprint scanner if requested.',
      'Answer clearly in English if asked your travel purpose (e.g. "Tourism / Vacation").'
    ],
    dontDoThis: [
      'Do not use mobile phones or take photos in the Immigration hall (strictly prohibited).',
    ],
    keyPhrases: [
      { english: 'I am traveling to Tokyo for a 10-day vacation.', meaning: 'Stating travel purpose.', situation: 'At immigration desk' },
      { english: 'Here is my passport and return flight ticket.', meaning: 'Providing proof of return.', situation: 'To border officer' }
    ],
    proSecrets: 'Always have the address of your hotel in Tokyo or New York saved offline in your notes app in case the officer asks where you are staying!'
  },
  {
    stepNumber: 5,
    title: 'Duty-Free, Food Court & Boarding Gate',
    subtitle: 'Hearing gate announcements & walking the jet bridge',
    icon: 'Plane',
    location: 'Gate 18B / 42A',
    whatHappens: 'Relaxing at the gate, grabbing snacks, listening for your boarding zone call, and scanning your boarding pass barcode at the gate door.',
    doThis: [
      'Locate your Gate (e.g. Gate 18B) on the display screens and check how many minutes walk it is.',
      'Listen for the announcement: "We are now inviting passengers in Zone 2 / Window seats to board."',
      'Join the boarding line, show your boarding pass barcode under the optical glass scanner (*BEEP!*).',
      'Walk down the jet bridge into the airplane!'
    ],
    dontDoThis: [
      'Do not rush when Group 1 is called if you are in Group 3. Wait comfortably until your zone is called.'
    ],
    keyPhrases: [
      { english: 'Is this the boarding gate for IndiGo flight 6E-5321 to Mumbai?', meaning: 'Double-checking gate.', situation: 'At boarding desk' },
      { english: 'Can I carry this hot coffee onto the aircraft?', meaning: 'Checking beverage rules.', situation: 'At gate entry' }
    ],
    proSecrets: 'Free drinking water refilling stations are available near all gates after security, so carry an empty reusable bottle to fill up for free!'
  },
  {
    stepNumber: 6,
    title: 'Airplane In-Flight Experience (Seat 14A)',
    subtitle: 'Cabin seating, meals, flight attendant bell & vacuum lavatory',
    icon: 'Armchair',
    location: 'Inside the Aircraft',
    whatHappens: 'Finding row 14, stowing backpack in the overhead bin, buckling seatbelt with a chime, choosing in-flight meals, and using the high-altitude vacuum lavatory.',
    doThis: [
      'Look at the row numbers above the seats (14A is a left-side window seat).',
      'Stow your large bag in the overhead bin; keep small purse/headphones under the seat in front of you.',
      'Insert the metal tongue into the seatbelt buckle until it clicks (*CLICK!*); pull the strap tight.',
      'When the food cart arrives, choose your meal: "Vegetarian Thali / Sandwich please."',
      'If you need water, press the Flight Attendant Call Button (*DING!*).',
      'To use the lavatory: slide the door lock to OCCUPIED, and press the blue vacuum flush button.'
    ],
    dontDoThis: [
      'Do not unbuckle your seatbelt whenever the "Fasten Seatbelt" overhead sign is illuminated.',
    ],
    keyPhrases: [
      { english: 'Excuse me, could I please have a glass of water?', meaning: 'Asking flight attendant.', situation: 'In flight' },
      { english: 'I requested a vegetarian meal option, please.', meaning: 'Specifying meal choice.', situation: 'During meal service' }
    ],
    proSecrets: 'To prevent ear popping pressure during takeoff and landing, swallow water, chew gum, or gently yawn!'
  },
  {
    stepNumber: 7,
    title: 'Arrival, Baggage Carousel & Green Customs Exit',
    subtitle: 'Collecting suitcases & stepping into your new destination city',
    icon: 'DoorOpen',
    location: 'Arrivals Hall',
    whatHappens: 'Deplaning, following signs to "Baggage Claim", collecting your luggage from Carousel Belt #4, and walking through the Green Customs exit.',
    doThis: [
      'Follow the yellow signs marked "Baggage Claim / Exit".',
      'Look at the arrival screen for your flight number (6E-5321) and find the Belt Number (Belt 4).',
      'Spot your suitcase on the moving carousel, lift it by the handle with both hands.',
      'Check the name tag on the bag to ensure it is yours.',
      'Walk out through the "Green Channel - Nothing to Declare" exit doors to the airport taxi rank or metro station!'
    ],
    dontDoThis: [
      'Do not leave the baggage hall without your checked bags. Once you exit through customs doors, you cannot walk back in!'
    ],
    keyPhrases: [
      { english: 'Excuse me, where is Baggage Carousel Belt Number 4?', meaning: 'Finding your luggage belt.', situation: 'In arrival hall' },
      { english: 'Where is the airport taxi pickup zone or metro station?', meaning: 'Heading to your hotel.', situation: 'At arrival exit' }
    ],
    proSecrets: 'Put a bright neon ribbon or cute sticker on your suitcase so you can spot it in 2 seconds on the carousel among 200 black bags!'
  }
];
