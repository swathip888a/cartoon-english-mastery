export interface TransitGuideItem {
  id: string;
  category: 'cabs' | 'subway' | 'bus';
  title: string;
  icon: string;
  steps: { title: string; desc: string; tip?: string }[];
  commonMistakes: string[];
  englishDialogue: { speaker: string; text: string; audioNote?: string }[];
  safetyChecklist: string[];
}

export const transitGuides: TransitGuideItem[] = [
  {
    id: 'rideshare_cabs',
    category: 'cabs',
    title: 'Booking & Riding Cabs (Uber, Lyft, Grab, Ola)',
    icon: 'Car',
    steps: [
      {
        title: '1. Set Pickup Spot Accurately',
        desc: 'Open the app, enter your destination, and check the green pickup pin. Drag it to an easy spot with a clear curb (avoid bus stops, red painted curbs, or busy intersections).',
        tip: 'Look for landmarks like "Outside Starbucks on 5th Ave" or the specific building gate.',
      },
      {
        title: '2. Select Ride Tier & Check Price',
        desc: 'Choose your tier: UberX (standard 4 seats), Comfort (extra legroom & newer car), XL (6 seats + suitcases), or Share/Pool.',
        tip: 'Rideshare prices surge during rain and rush hours. If prices are high, wait 5 minutes or walk 1 block away from high-density venue exits.',
      },
      {
        title: '3. The 3-Point Safety Check (CRITICAL)',
        desc: 'When the car arrives, do NOT get in immediately. Check:\n1. License Plate matches app\n2. Car Make/Model/Color matches\n3. Driver face matches photo.',
        tip: 'Ask: "Who are you picking up?" (Do not say "Are you for Swathi?"). A legitimate driver will say your name.',
      },
      {
        title: '4. During the Ride',
        desc: 'Sit in the back right seat (gives you maximum room and safest curb exit). You can politely request temperature or music adjustments.',
      },
      {
        title: '5. Ending the Ride & Tipping',
        desc: 'Check your seat for your phone, wallet, or bag before closing the door. In the US, 15-20% tip in-app is customary for good service.',
      },
    ],
    commonMistakes: [
      'Getting into a car without checking the license plate numbers.',
      'Opening the car door into bike lane traffic (always look back first - "Dutch Reach").',
      'Leaving your smartphone on the back seat.',
    ],
    englishDialogue: [
      { speaker: 'Swathi', text: '“Hi! Good morning, how are you doing?”' },
      { speaker: 'Driver', text: '“Good, thanks! Heading to Central Station, right?”' },
      { speaker: 'Swathi', text: '“Yes, that’s right! Could you please roll up the window a bit?”' },
      { speaker: 'Driver', text: '“Sure thing, here we go.”' },
      { speaker: 'Swathi', text: '“Thank you so much, you can drop me right here by the curb. Have a great day!”' },
    ],
    safetyChecklist: [
      'Share trip status via the app with a friend or family member.',
      'Enable the 4-digit PIN verification feature in Uber/Lyft safety settings.',
      'Keep your phone in your hand or secure pocket at all times.',
    ],
  },
  {
    id: 'subway_metro',
    category: 'subway',
    title: 'Navigating Subways & Metro Trains',
    icon: 'Train',
    steps: [
      {
        title: '1. Buying a Card or Contactless Tap',
        desc: 'Most modern subways (NYC, London Tube, Tokyo, Singapore, Paris) now allow contactless credit/debit card or Apple/Google Pay taps directly at turnstiles! Otherwise, use the ticket vending machine.',
        tip: 'In London/NYC, tap the SAME physical card or phone on entry and exit to cap daily fares.',
      },
      {
        title: '2. Finding Inbound vs Outbound Directions',
        desc: 'Look at the terminus (end of the line) station name on the sign! In NYC: "Uptown / Bronx" vs "Downtown / Brooklyn". In Tokyo: "For Shibuya & Shinjuku".',
      },
      {
        title: '3. Platform Waiting Etiquette',
        desc: 'Stand behind the yellow textured safety line. Wait on the marked sides of the doors so exiting passengers can step off first.',
      },
      {
        title: '4. Riding & Transferring',
        desc: 'Listen for audio announcements: "Transfer available to the 4, 5, 6 trains." Look up at digital route maps above the doors to track remaining stops.',
      },
      {
        title: '5. Exiting & Turnstiles',
        desc: 'Some systems require tapping your card again to calculate distance (e.g. London, Tokyo, Washington DC). Look for signs labeled "Exit / Way Out".',
      },
    ],
    commonMistakes: [
      'Boarding an "Express" train instead of a "Local" train (Express skips smaller stops!). Always check Local vs Express.',
      'Blocking the left side of escalators (In most cities: Stand on the Right, Walk on the Left).',
      'Loud phone calls or speaker audio on the train.',
    ],
    englishDialogue: [
      { speaker: 'Swathi', text: '“Excuse me, does this train stop at 42nd Street Times Square?”' },
      { speaker: 'Commuter', text: '“No, this is an Express train, it skips 42nd. You want the Local train on the next track.”' },
      { speaker: 'Swathi', text: '“Ah, thank you so much! I appreciate it.”' },
    ],
    safetyChecklist: [
      'Keep your bag zipped and in front of you during rush hour crowds.',
      'Stay away from the platform edge while looking at your phone.',
    ],
  },
  {
    id: 'city_buses',
    category: 'bus',
    title: 'Catching City Buses with Confidence',
    icon: 'Bus',
    steps: [
      {
        title: '1. Identifying Your Bus Stop & Route',
        desc: 'Check Google Maps / Apple Maps for the bus route number (e.g., Bus 14, M15). Match the number on the front electronic sign of the bus.',
      },
      {
        title: '2. Hailing the Bus',
        desc: 'When you see your bus approaching, stand near the curb and make eye contact with the driver or give a slight friendly wave so they know you want to board.',
      },
      {
        title: '3. Boarding & Paying',
        desc: 'Board through the front door by the driver. Tap your transit card/phone or insert exact cash change (bus drivers do not give change).',
      },
      {
        title: '4. Signaling Your Stop (The Red Stop Button)',
        desc: 'When your stop is announced as "Next Stop", push the red "STOP" button or pull the yellow cord along the windows to notify the driver.',
        tip: 'Signal at least 15-20 seconds before the stop so the driver has time to brake smoothly.',
      },
      {
        title: '5. Exiting Through the Rear Door',
        desc: 'Exit through the middle or back doors to let new passengers board through the front.',
      },
    ],
    commonMistakes: [
      'Not pressing the stop button and expecting the driver to automatically stop at every empty stop.',
      'Trying to pay with large $20 or $50 paper bills.',
    ],
    englishDialogue: [
      { speaker: 'Swathi', text: '“Hi! Does this bus go near the Art Museum?”' },
      { speaker: 'Driver', text: '“Yep, it stops two blocks away on 8th Street.”' },
      { speaker: 'Swathi', text: '“Awesome, thank you!”' },
      { speaker: 'Swathi (Exiting)', text: '“Thank you, driver!” (Very polite & common in English speaking countries)' },
    ],
    safetyChecklist: [
      'Hold onto poles or handrails immediately upon boarding before the bus accelerates.',
      'Yield priority seats near the front to seniors, pregnant women, and people with disabilities.',
    ],
  },
];
