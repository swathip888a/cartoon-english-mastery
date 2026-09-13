export interface HotelGuideSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  checklist: string[];
  proTips: string[];
  keyDialogue: { speaker: string; text: string }[];
}

export const hotelGuide: HotelGuideSection[] = [
  {
    id: 'check_in',
    title: 'Hotel Check-In & Security Holds',
    icon: 'KeyRound',
    description: 'What happens at the front desk when you arrive.',
    checklist: [
      'Standard check-in time is usually 3:00 PM or 4:00 PM. If you arrive early, ask for "Early Check-in" or leave your bags at the Bell Desk.',
      'You MUST present a valid Government Photo ID (or Passport) and a Physical Credit Card.',
      'The "Incidental Deposit": The hotel will place a temporary $50-$150/night security hold on your credit card for room damages or minibar snacks. This is released back to your card 3-5 days after checkout.',
      'Ask: "What time is breakfast served?" and "Where are the elevators?".',
    ],
    proTips: [
      'Always use a Credit Card rather than a Debit Card for hotel deposits, so your actual bank account checking funds are not locked up.',
    ],
    keyDialogue: [
      { speaker: 'Front Desk', text: '“Welcome! Checking in today?”' },
      { speaker: 'Swathi', text: '“Hi, yes! I have a reservation under Swathi. Here is my passport and credit card.”' },
      { speaker: 'Front Desk', text: '“Wonderful, you are on the 12th floor in Room 1204. Here are two keycards. Breakfast is on the 2nd floor from 6:30 to 10 AM.”' },
      { speaker: 'Swathi', text: '“Thank you! What is the Wi-Fi password?”' },
    ],
  },
  {
    id: 'minibar_warning',
    title: 'The Sneaky Mini-Bar & Room Amenities',
    icon: 'Refrigerator',
    description: 'How hotel room snacks, drinks, and water bottles work without accidentally getting charged $15 for a chocolate bar!',
    checklist: [
      'Sensor Mini-Bars: Many modern luxury hotels have electronic weight sensors under each snack/drink in the fridge. If you lift a soda for more than 30 seconds, it automatically bills your room!',
      'Complimentary vs Paid Water: Look for a cardboard collar or tag on the bottle saying "Complimentary / With Our Compliments" (Free). If it has a price tag ($6.00), don’t drink it!',
      'Electric Kettle / Coffee Maker: Tea bags and coffee pods sitting next to the machine are almost always complimentary (free).',
    ],
    proTips: [
      'If you accidentally bumped or moved a minibar item and get charged at checkout, simply tell the front desk: "I didn’t consume the item, I just moved it to make room for my medicine/water." They will remove the charge immediately!',
    ],
    keyDialogue: [
      { speaker: 'Swathi', text: '“Excuse me, are the two bottles of water on the nightstand complimentary?”' },
      { speaker: 'Front Desk', text: '“Yes, those are complimentary for our guests!”' },
    ],
  },
  {
    id: 'room_requests',
    title: 'Housekeeping, Thermostats & Requests',
    icon: 'PhoneCall',
    description: 'How to control your room and ask for extra items comfortably.',
    checklist: [
      'The "Do Not Disturb" (DND) Sign: Hang this on your outer door handle if you are sleeping in, working, or do not want housekeeping to enter your room.',
      'Keycard Light Switches: In many European, Asian, and modern hotels, you must insert your room keycard into a slot by the front door to turn on the room lights and AC power!',
      'Calling the Front Desk: Pick up the room phone and press the button labeled "0", "Front Desk", or "Housekeeping".',
    ],
    proTips: [
      'Forgot a toothbrush, toothpaste, razor, sewing kit, or phone charger? Almost every hotel provides them for FREE at the front desk upon request!',
    ],
    keyDialogue: [
      { speaker: 'Swathi (On room phone)', text: '“Hi! This is Swathi in Room 1204. Could we please get two extra bath towels and some extra coffee pods?”' },
      { speaker: 'Housekeeping', text: '“Of course! We will send someone up with those right away.”' },
    ],
  },
  {
    id: 'check_out',
    title: 'Checking Out & Luggage Storage',
    icon: 'LogOut',
    description: 'Wrapping up your stay smoothly.',
    checklist: [
      'Check-out time is usually 11:00 AM or 12:00 PM. (Ask for "Late Checkout at 1:00 PM" in the morning if you need more time).',
      'Do a full room sweep: Check under the bed, behind bathroom doors, inside the closet safe, and unplug all phone chargers!',
      'Drop your keycards in the drop-box or at the front desk.',
      'Luggage Hold: If your flight is in the evening, leave your suitcases with the hotel Concierge/Bell Desk for free! They will give you a claim ticket so you can explore the city unburdened.',
    ],
    proTips: [
      'Tip the bellhop $1-2 per bag when you reclaim your luggage.',
    ],
    keyDialogue: [
      { speaker: 'Swathi', text: '“Good morning! I’m checking out of Room 1204. Could you also hold our bags until 5:00 PM?”' },
      { speaker: 'Front Desk', text: '“Certainly! Here is your luggage claim tag #34. Have a wonderful day in the city!”' },
    ],
  },
];
