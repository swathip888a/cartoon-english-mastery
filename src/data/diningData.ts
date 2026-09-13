export interface DiningGuideSection {
  id: string;
  title: string;
  icon: string;
  summary: string;
  stepsOrTips: { title: string; content: string; keyPhrase?: string }[];
}

export const diningGuide: DiningGuideSection[] = [
  {
    id: 'greeting_seating',
    title: 'Entering & Getting Seated',
    icon: 'UtensilsCrossed',
    summary: 'How to greet the host/hostess and request a table gracefully.',
    stepsOrTips: [
      {
        title: 'Wait to be Seated vs Seat Yourself',
        content: 'Look for a sign saying "Please Wait to Be Seated". If present, stand at the host stand. Do not wander in to take a table on your own unless a sign says "Seat Yourself".',
        keyPhrase: '“Hi! Table for two, please.” / “Do you have a table for one near the window?”',
      },
      {
        title: 'Reservations',
        content: 'If you booked a table online (e.g. OpenTable, Resy), tell the host immediately.',
        keyPhrase: '“Hi, I have a reservation under Swathi for 7:00 PM.”',
      },
      {
        title: 'Coat / Bag Placement',
        content: 'Hang your jacket on the chair back or coat rack. Place backpacks on the floor between your feet or on an empty chair; never place personal bags on the dining tabletop.',
      },
    ],
  },
  {
    id: 'drinks_water',
    title: 'The Water & Drinks Question',
    icon: 'GlassWater',
    summary: 'In western restaurants, the waiter will ask for your water preference within 2 minutes of sitting down.',
    stepsOrTips: [
      {
        title: 'Tap Water vs Bottled vs Sparkling',
        content: 'In the US/Canada/UK/Australia, "Tap water" (regular filtered tap with ice) is 100% FREE and unlimited! If you say "Still water" or "Bottled water", they may bring an expensive $8 bottle.',
        keyPhrase: '“Just regular tap water with ice, please.” / “Could we get sparkling water with lemon?”',
      },
      {
        title: 'Ordering Appetizers & Drinks First',
        content: 'The server will usually take drink orders first, giving you 5-10 minutes to browse the food menu.',
        keyPhrase: '“We need a few more minutes to look over the menu, but could we start with two lemonades?”',
      },
    ],
  },
  {
    id: 'menu_decoding',
    title: 'Decoding Menu Sections & Food Allergies',
    icon: 'BookOpen',
    summary: 'Understanding Appetizers (Starters), Mains (Entrées), Sides, and dietary requests.',
    stepsOrTips: [
      {
        title: 'Course Structure',
        content: '• Starters / Appetizers: Small sharing plates (wings, soup, calamari)\n• Mains / Entrées: The core large meal (steak, pasta, burger, bowl)\n• Sides: Extras like fries, salad, mashed potatoes\n• Desserts: Sweet dishes after the meal.',
      },
      {
        title: 'Allergies & Dietary Customizations',
        content: 'Always state allergies clearly so the kitchen can prepare your food on separate cookware.',
        keyPhrase: '“I am severely allergic to peanuts/shellfish/gluten. Is this dish safe?” / “Can I substitute the fries with a side salad?”',
      },
      {
        title: 'Steak Doneness (Rare to Well-Done)',
        content: '• Rare (cool red center)\n• Medium Rare (warm pink-red center, chef recommendation)\n• Medium (warm pink center)\n• Well-Done (fully browned throughout, firmer).',
        keyPhrase: '“I’d like the sirloin cooked Medium Rare, please.”',
      },
    ],
  },
  {
    id: 'service_signals',
    title: 'Getting Waiter Attention & Table Signals',
    icon: 'Hand',
    summary: 'The proper body language and signals used in restaurants.',
    stepsOrTips: [
      {
        title: 'How to Get Attention Politely',
        content: 'Never snap your fingers, whistle, or shout "Hey!". Make eye contact with your server when they look toward your area and give a gentle one-finger or small hand raise.',
        keyPhrase: '“Excuse me, whenever you have a moment, could we get some extra napkins?”',
      },
      {
        title: 'Fork and Knife Placement Signals',
        content: '• Still Eating / Paused: Place fork and knife in an inverted "V" (triangle) on your plate.\n• Finished: Place fork and knife parallel together at the 4:20 clock position on your plate. This tells the server they may clear your plate.',
      },
    ],
  },
  {
    id: 'paying_tipping',
    title: 'Requesting the Check & Tipping Guide',
    icon: 'Receipt',
    summary: 'Everything about paying, splitting bills, and tip percentages.',
    stepsOrTips: [
      {
        title: 'Asking for the Bill',
        content: 'In the US, servers will not bring the bill until you ask (or they ask "Can I get you anything else, or are you ready for the check?").',
        keyPhrase: '“Could we please get the check whenever you’re ready?” / “Can we split the check onto two cards?”',
      },
      {
        title: 'US Tipping Matrix',
        content: '• 15%: Standard / Acceptable baseline service\n• 18% - 20%: Good to Great service (Most common standard in US cities)\n• 22%+: Outstanding, exceptional service\n• Check for "Auto-Gratuity" (For parties of 6+, restaurants often add an automatic 18% tip, so do not double tip!).',
      },
    ],
  },
];
