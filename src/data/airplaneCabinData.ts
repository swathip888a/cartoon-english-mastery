export interface AirplaneInflightMeal {
  id: string;
  name: string;
  category: 'meal' | 'drink' | 'snack';
  description: string;
  dietary: string;
  howToRequest: string;
}

export const INFLIGHT_OPTIONS: AirplaneInflightMeal[] = [
  {
    id: 'chicken_rice',
    name: 'Grilled Herb Chicken with Steamed Rice & Veggies',
    category: 'meal',
    description: 'Hot main entree served with warm bread roll, butter, and a chocolate mousse dessert.',
    dietary: 'Gluten-conscious option',
    howToRequest: 'Could I please have the chicken and rice option?'
  },
  {
    id: 'vegetarian_pasta',
    name: 'Creamy Spinach & Tomato Penne Pasta',
    category: 'meal',
    description: 'Warm artisan pasta topped with melted parmesan cheese and a fresh side garden salad.',
    dietary: '100% Vegetarian',
    howToRequest: 'I would like the vegetarian pasta meal, please.'
  },
  {
    id: 'ginger_ale',
    name: 'Canned Ginger Ale with Ice & Lemon',
    category: 'drink',
    description: 'Refreshing sparkling soda that helps soothe motion sickness and stomach discomfort.',
    dietary: 'Caffeine-Free',
    howToRequest: 'May I get a cup of ginger ale with ice and a slice of lemon, please?'
  },
  {
    id: 'hot_green_tea',
    name: 'Hot Green Tea / Coffee in Paper Cup',
    category: 'drink',
    description: 'Freshly brewed piping hot beverage served with sugar and creamer on request.',
    dietary: 'Sugar-Free',
    howToRequest: 'Could I get a hot green tea with one sugar packet, please?'
  },
  {
    id: 'warm_blanket_headphones',
    name: 'Sanitized Cabin Blanket & Inflight Earphones',
    category: 'snack',
    description: 'Complimentary travel comfort pack for long-haul overnight flights.',
    dietary: 'Comfort Pack',
    howToRequest: 'Excuse me, could I request an extra blanket and a set of headphones, please?'
  }
];

export interface LavatoryStep {
  stepNumber: number;
  title: string;
  action: string;
  rule: string;
  proTip: string;
}

export const AIRPLANE_LAVATORY_STEPS: LavatoryStep[] = [
  {
    stepNumber: 1,
    title: 'Check the Sign Before Getting Up',
    action: 'Look above the aisle. If the sign is illuminated in Green with a walking figure, it is VACANT. If illuminated in Red or has a "Return to Seat" seatbelt sign chime, stay seated!',
    rule: 'Never stand in line when the Seatbelt sign is on (turbulence danger).',
    proTip: 'Go to the bathroom right after meal service trays are collected.'
  },
  {
    stepNumber: 2,
    title: 'Slide the Inner Door Lock Completely',
    action: 'Once inside, slide the large metal latch all the way to the right. This turns on the bright ceiling lights and changes the outside sign to OCCUPIED (Red).',
    rule: 'If you do not slide the latch, the lights will stay dim and someone might accidentally open the door on you!',
    proTip: 'Always double-check the lock latch before doing anything else.'
  },
  {
    stepNumber: 3,
    title: 'Pull Paper Toilet Seat Cover & Sit',
    action: 'Pull one paper cover from the wall dispenser, pop out the center flap, and lay it across the toilet seat before sitting down.',
    rule: 'Never squat on airplane toilet seats.',
    proTip: 'The center flap hangs forward so it gets automatically sucked in when flushed.'
  },
  {
    stepNumber: 4,
    title: 'Close Lid & Press the Blue Flush Button',
    action: 'Close the plastic toilet lid first, then press the large Blue Flush button. The airplane vacuum suction creates a loud WHOOSH sound!',
    rule: 'Always close the toilet lid before pressing flush to keep the air fresh.',
    proTip: 'Never flush paper towels, sanitary pads, or plastic bottles down airplane toilets (they clog the whole plane).'
  },
  {
    stepNumber: 5,
    title: 'Wash Hands & Wipe the Sink',
    action: 'Push the water faucet lever, lather antibacterial soap, rinse, and dry your hands with disposable paper towels. Toss the paper towel into the spring-loaded trash flap.',
    rule: 'Do NOT throw wet towels into the toilet bowl.',
    proTip: 'Use a paper towel to push down the trash flap so your clean hands stay clean!'
  }
];
