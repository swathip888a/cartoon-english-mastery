import { InteractiveFormConfig } from '../types';

export const REAL_WORLD_FORMS: InteractiveFormConfig[] = [
  {
    id: 'customs_declaration',
    title: 'Customs & Border Immigration Arrival Card',
    category: 'airport',
    icon: 'Plane',
    tagline: 'Mandatory arrival document handed out on the plane before landing.',
    importanceDescription: 'Whenever you fly to another country (USA, UK, Canada, Australia, Singapore), flight attendants will give you this physical or digital arrival card. You hand it to the border officer at Passport Control.',
    fields: [
      {
        id: 'full_name',
        label: 'Family Name (Surname) & Given Names',
        placeholder: 'e.g. SWATHI PRIYA',
        type: 'text',
        helperTip: 'Write in ALL CAPITAL LETTERS exactly matching the name printed on your passport photo page.',
        englishExplanation: 'Surname = Last Name (Family name). Given Name = First Name.',
        required: true,
        exampleValue: 'SWATHI PRIYA'
      },
      {
        id: 'passport_number',
        label: 'Passport Number',
        placeholder: 'e.g. N12345678',
        type: 'text',
        helperTip: 'Found in the top right corner of your passport photo page (usually 1 letter followed by 7-8 digits).',
        englishExplanation: 'The unique travel identity number assigned to your passport booklet.',
        required: true,
        exampleValue: 'N84920147'
      },
      {
        id: 'flight_number',
        label: 'Flight Number / Airline Name',
        placeholder: 'e.g. JL051 / UA892',
        type: 'text',
        helperTip: 'Look at your Boarding Pass. It starts with 2 letters (airline code) followed by numbers.',
        englishExplanation: 'Identifies the exact airplane flight you just arrived on.',
        required: true,
        exampleValue: 'NH0108'
      },
      {
        id: 'stay_duration',
        label: 'Intended Length of Stay (Days)',
        placeholder: 'e.g. 7',
        type: 'number',
        helperTip: 'Must match your return flight ticket booking.',
        englishExplanation: 'How many days you will be staying in the country.',
        required: true,
        exampleValue: '10'
      },
      {
        id: 'destination_address',
        label: 'Address & Hotel in Destination Country',
        placeholder: 'e.g. Grand Shinjuku Hotel, 2-11-1 Shinjuku, Tokyo',
        type: 'text',
        helperTip: 'Never leave this blank! Always write your exact hotel name and district address.',
        englishExplanation: 'Immigration officers check this to ensure you have accommodation booked.',
        required: true,
        exampleValue: 'Prince Hotel, 1-30-1 Central District, Tokyo'
      },
      {
        id: 'purpose_of_visit',
        label: 'Primary Purpose of Visit',
        placeholder: 'Select Purpose',
        type: 'select',
        options: [
          { value: 'tourism', label: 'Tourism / Vacation', meaning: 'Sightseeing, leisure, holiday' },
          { value: 'business', label: 'Business / Conference', meaning: 'Meetings, conferences (not working for local salary)' },
          { value: 'visiting_family', label: 'Visiting Friends or Relatives', meaning: 'Staying with relatives' },
          { value: 'study', label: 'Study / Education', meaning: 'Attending university or language school' }
        ],
        helperTip: 'For general holiday travel, select "Tourism / Vacation".',
        englishExplanation: 'The main reason for entering the country.',
        required: true,
        exampleValue: 'tourism'
      },
      {
        id: 'declare_food_plants',
        label: 'Are you bringing Fruits, Vegetables, Meat, or Live Plants?',
        placeholder: 'Select Yes or No',
        type: 'radio',
        options: [
          { value: 'no', label: 'No (I do not have any restricted agriculture goods)' },
          { value: 'yes', label: 'Yes (I have food items to declare for inspection)' }
        ],
        helperTip: 'Fresh apples, bananas, beef jerky, and raw seeds are strictly regulated at international borders. If in doubt, choose Yes or declare it at the red channel!',
        englishExplanation: 'Bio-security laws protect local farms and ecosystems from foreign pests.',
        required: true,
        exampleValue: 'no'
      },
      {
        id: 'declare_cash',
        label: 'Are you carrying Cash / Currency valued over $10,000 USD?',
        placeholder: 'Select Yes or No',
        type: 'radio',
        options: [
          { value: 'no', label: 'No (Carrying less than $10,000 USD equivalent)' },
          { value: 'yes', label: 'Yes (Must submit currency disclosure declaration)' }
        ],
        helperTip: 'Standard travelers carry credit cards and small cash, so select No.',
        englishExplanation: 'Anti-money laundering international standard regulation.',
        required: true,
        exampleValue: 'no'
      }
    ]
  },
  {
    id: 'hotel_registration',
    title: 'Hotel Guest Check-In Registration Card',
    category: 'hotel',
    icon: 'Building',
    tagline: 'Standard registration card presented at the hotel reception desk.',
    importanceDescription: 'When you arrive at a hotel lobby front desk, the receptionist will ask you to review and sign this form along with presenting your passport/ID and credit card for incidentals.',
    fields: [
      {
        id: 'guest_name',
        label: 'Primary Guest Full Name',
        placeholder: 'e.g. Swathi Priya',
        type: 'text',
        helperTip: 'Must match the name used when booking the room online.',
        englishExplanation: 'The primary traveler responsible for the room reservation.',
        required: true,
        exampleValue: 'Swathi Priya'
      },
      {
        id: 'contact_email_phone',
        label: 'Email & Mobile Phone Number',
        placeholder: 'e.g. swathi@example.com / +1-555-0192',
        type: 'text',
        helperTip: 'Include country code (+1, +44, +91) for mobile numbers.',
        englishExplanation: 'Used for sending Wi-Fi passwords, digital receipts, or emergency contact.',
        required: true,
        exampleValue: 'swathi.travel@gmail.com | +1-555-894-2011'
      },
      {
        id: 'checkin_checkout_dates',
        label: 'Check-In & Check-Out Dates',
        placeholder: 'e.g. Sept 14 - Sept 18 (4 Nights)',
        type: 'text',
        helperTip: 'Standard check-in is usually after 3:00 PM; check-out is before 11:00 AM.',
        englishExplanation: 'The total duration of your hotel room stay.',
        required: true,
        exampleValue: 'Sept 14 - Sept 18 (4 Nights)'
      },
      {
        id: 'room_preference',
        label: 'Room & Bed Preferences',
        placeholder: 'Select Preference',
        type: 'select',
        options: [
          { value: 'non_smoking_1king', label: 'Non-Smoking / 1 King Bed' },
          { value: 'non_smoking_2twin', label: 'Non-Smoking / 2 Twin Beds' },
          { value: 'quiet_high_floor', label: 'Non-Smoking / High Floor with View' }
        ],
        helperTip: 'Always choose Non-Smoking unless you specifically need a smoking-designated room.',
        englishExplanation: 'Lets the front desk match your preferred room location.',
        required: true,
        exampleValue: 'non_smoking_1king'
      },
      {
        id: 'deposit_method',
        label: 'Incidental Security Deposit Method',
        placeholder: 'Select Method',
        type: 'select',
        options: [
          { value: 'credit_card_hold', label: 'Credit Card (Temporary hold, released at checkout)' },
          { value: 'debit_card', label: 'Debit Card (Funds temporarily held and refunded)' },
          { value: 'cash_deposit', label: 'Cash Deposit ($100-$200 held in envelope)' }
        ],
        helperTip: 'Hotels place a temporary $50-$100 hold on your card for minibar or room service. It is released automatically.',
        englishExplanation: 'Security guarantee for any additional hotel services used.',
        required: true,
        exampleValue: 'credit_card_hold'
      }
    ]
  },
  {
    id: 'medical_intake',
    title: 'Medical Clinic / Urgent Care Patient Intake Form',
    category: 'hospital',
    icon: 'HeartPulse',
    tagline: 'Medical history and symptoms intake form for clinic visits.',
    importanceDescription: 'If you feel sick abroad and visit an urgent care clinic, the triage nurse gives you this clipboard to document your symptoms, allergies, and emergency contact before the doctor sees you.',
    fields: [
      {
        id: 'patient_name',
        label: 'Patient Full Name & Date of Birth',
        placeholder: 'e.g. Swathi Priya (DOB: 12/04/2000)',
        type: 'text',
        helperTip: 'DOB = Date of Birth (Month/Day/Year in USA, Day/Month/Year in UK/Europe).',
        englishExplanation: 'Official medical record identification.',
        required: true,
        exampleValue: 'Swathi Priya (DOB: Oct 24, 2000)'
      },
      {
        id: 'chief_complaint',
        label: 'Chief Complaint (Main Reason for Today\'s Visit)',
        placeholder: 'e.g. Severe throat pain, fever (101°F / 38.5°C), and dry cough since yesterday',
        type: 'text',
        helperTip: 'Be specific about what body part hurts and when it started.',
        englishExplanation: 'Tells the physician the primary problem requiring treatment.',
        required: true,
        exampleValue: 'High fever, severe sore throat, body chills started 2 days ago'
      },
      {
        id: 'pain_scale',
        label: 'Current Pain Level (0 = No Pain, 10 = Unbearable)',
        placeholder: 'Select Pain Level',
        type: 'select',
        options: [
          { value: 'mild_2', label: '1 - 3: Mild (Noticeable discomfort, can still function)' },
          { value: 'moderate_5', label: '4 - 6: Moderate (Interferes with sleep and daily activities)' },
          { value: 'severe_8', label: '7 - 9: Severe (Hard to focus, intense pain)' },
          { value: 'unbearable_10', label: '10: Worst possible pain imaginable' }
        ],
        helperTip: 'Helps doctors calibrate whether to give pain relievers immediately.',
        englishExplanation: 'Standard medical pain numeric rating scale.',
        required: true,
        exampleValue: 'moderate_5'
      },
      {
        id: 'drug_allergies',
        label: 'Known Drug Allergies (Penicillin, Aspirin, Ibuprofen, etc.)',
        placeholder: 'e.g. No Known Drug Allergies (NKDA) OR Allergic to Penicillin',
        type: 'text',
        helperTip: 'If you have no allergies, write "None" or "NKDA" (No Known Drug Allergies). Never leave blank!',
        englishExplanation: 'Prevents doctors from prescribing medication that could cause an allergic reaction.',
        required: true,
        exampleValue: 'No known drug allergies (NKDA)'
      },
      {
        id: 'emergency_contact',
        label: 'Emergency Contact Person & Phone Number',
        placeholder: 'e.g. Brother: Alex Priya, +1-555-0144',
        type: 'text',
        helperTip: 'A family member or trusted companion who can be called in emergencies.',
        englishExplanation: 'Designated contact person in case of urgent medical decisions.',
        required: true,
        exampleValue: 'Sister: Ananya Priya, +1-555-920-1123'
      }
    ]
  },
  {
    id: 'postal_shipping',
    title: 'International Postal & Courier Shipping Dispatch Form',
    category: 'postal',
    icon: 'Package',
    tagline: 'Dispatch document for sending souvenirs, luggage, or gifts home.',
    importanceDescription: 'When sending boxes from abroad (Post Office, DHL, FedEx) back home, you must fill this shipping manifest with accurate descriptions and values.',
    fields: [
      {
        id: 'sender_info',
        label: 'Sender Name & Current Local Address',
        placeholder: 'e.g. Swathi Priya, Room 402, Prince Hotel Tokyo',
        type: 'text',
        helperTip: 'Your temporary address in the country you are sending from.',
        englishExplanation: 'Where the package originates.',
        required: true,
        exampleValue: 'Swathi Priya, Rm 402, Prince Hotel Tokyo'
      },
      {
        id: 'recipient_info',
        label: 'Recipient Full Name, Destination Address & Postal Code',
        placeholder: 'e.g. 742 Evergreen Terrace, Springfield, OR 97477, USA',
        type: 'text',
        helperTip: 'Double-check the Zip/Postal code and country name.',
        englishExplanation: 'The exact final delivery destination for your parcel.',
        required: true,
        exampleValue: '142 Silicon Valley Blvd, San Jose, CA 95134, USA'
      },
      {
        id: 'contents_description',
        label: 'Detailed Description of Package Contents',
        placeholder: 'e.g. Green tea snacks, cotton t-shirts (3 pcs)',
        type: 'text',
        helperTip: 'Do not write vague words like "Goods" or "Gift". Write "Cotton shirts (2)", "Ceramic mugs (1)".',
        englishExplanation: 'Customs requires itemized descriptions to check for prohibited items.',
        required: true,
        exampleValue: 'Packaged confectionary snacks (2 boxes), Souvenir keychains (4 pcs)'
      },
      {
        id: 'declared_value',
        label: 'Total Declared Value in Currency (USD)',
        placeholder: 'e.g. $45 USD',
        type: 'text',
        helperTip: 'Approximate retail value of items inside for insurance and duty calculations.',
        englishExplanation: 'Customs valuation for tax assessment and postal insurance.',
        required: true,
        exampleValue: '$50 USD'
      }
    ]
  }
];
