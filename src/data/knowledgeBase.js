// Aviation Knowledge Base - Mock Data for RAG System
export const knowledgeBase = [
    {
        id: 'kb-001',
        title: 'Baggage Policy - Domestic Flights',
        category: 'policy',
        content: `Air Bharat's domestic baggage allowance includes:
• Economy Class: 15 kg check-in + 7 kg cabin baggage
• Business Class: 25 kg check-in + 10 kg cabin baggage  
• Excess baggage charged at ₹350 per kg
• Prohibited items include lithium batteries over 160Wh, flammable liquids, compressed gases
• Sports equipment (golf bags, skis) allowed as special baggage with prior booking
• Musical instruments may be carried as cabin baggage if within size limits (115 cm total)
• Fragile/valuable items should be hand-carried; airline liability limited to ₹350 per kg for checked baggage`,
        metadata: { docType: 'PDF', source: 'Baggage_Policy_v3.2.pdf', lastUpdated: '2025-12-15', chunks: 12 }
    },
    {
        id: 'kb-002',
        title: 'Refund & Cancellation Policy',
        category: 'policy',
        content: `Air Bharat Refund Policy:
• 24-hour free cancellation on all bookings
• Economy Saver: Non-refundable (only taxes refunded)
• Economy Flex: ₹2,500 cancellation fee, rest refunded
• Business Class: ₹1,500 cancellation fee, rest refunded
• No-show: No refund applicable
• Refund processing: 7-10 business days for card, 15 days for bank transfer
• Medical emergencies: Full refund with valid medical certificate
• Flight cancellation by airline: Full refund or rebooking at no extra charge
• Date change fees: Economy ₹2,000 + fare difference; Business ₹1,000 + fare difference`,
        metadata: { docType: 'PDF', source: 'Refund_Policy_2025.pdf', lastUpdated: '2025-11-20', chunks: 8 }
    },
    {
        id: 'kb-003',
        title: 'DGCA Safety Compliance - CAR Section 8',
        category: 'compliance',
        content: `DGCA Civil Aviation Requirements - Section 8:
• All aircraft must undergo C-Check every 18 months or 5,000 flight hours (whichever is earlier)
• Pilot duty limitations: Max 8 hours flight time in 24 hours (domestic), max 30 hours in 7 days
• FDTL (Flight Duty Time Limitations): Augmented crew allows up to 12 hours
• Minimum rest period: 12 hours between duties (extendable rest 10 hours)
• Mandatory Safety Management System (SMS) implementation for all operators
• Incident reporting within 24 hours to DGCA via ASOR (Air Safety Occurrence Report)
• Cabin crew minimum: 1 per 50 passengers
• Emergency equipment check: Daily before first flight of the day`,
        metadata: { docType: 'PDF', source: 'DGCA_CAR_Section8_Rev4.pdf', lastUpdated: '2025-10-01', chunks: 24 }
    },
    {
        id: 'kb-004',
        title: 'A320neo Aircraft Operating Manual',
        category: 'maintenance',
        content: `Airbus A320neo Key Specifications:
• Max passengers: 180 (single-class), 150 (two-class Air Bharat config)
• Range: 6,300 km
• Engines: CFM LEAP-1A (2x) / PW1100G-JM
• Cruise speed: Mach 0.78
• Max altitude: FL410 (41,000 ft)
• Fuel capacity: 24,210 liters
• MTOW: 79,000 kg
Maintenance Schedule:
• A-Check: Every 750 flight hours (approx 3-4 months)
• B-Check: Phased into A-Checks
• C-Check: Every 7,500 flight hours (approx 18-24 months)
• D-Check: Every 30,000 flight hours (approx 8-10 years)  
• Daily Transit Check: Before first departure
• Weekly Check: Detailed visual + fluids top-up`,
        metadata: { docType: 'DOCX', source: 'A320neo_OPS_Manual.docx', lastUpdated: '2025-09-15', chunks: 45 }
    },
    {
        id: 'kb-005',
        title: 'B737-800 Aircraft Operating Manual',
        category: 'maintenance',
        content: `Boeing 737-800 Key Specifications:
• Max passengers: 189 (single-class), 160 (two-class Air Bharat config)
• Range: 5,765 km
• Engines: CFM56-7B (2x)
• Cruise speed: Mach 0.785  
• Max altitude: FL410 (41,000 ft)
• Fuel capacity: 26,020 liters
• MTOW: 79,010 kg
Maintenance Schedule:
• A-Check: Every 600 flight hours
• C-Check: Every 6,000 flight hours
• D-Check: Every 25,000 flight hours
• Engine overhaul: Every 20,000-30,000 cycles
• Landing gear overhaul: Every 10 years / 20,000 cycles`,
        metadata: { docType: 'DOCX', source: 'B737_800_OPS_Manual.docx', lastUpdated: '2025-08-20', chunks: 38 }
    },
    {
        id: 'kb-006',
        title: 'Crew Operations Manual',
        category: 'crew',
        content: `Air Bharat Crew Operations Manual:
Pre-Flight Duties:
• Report 90 minutes before STD (Scheduled Time of Departure)
• Briefing on weather, NOTAMs, passenger special requirements
• Safety equipment check: life vests, oxygen masks, fire extinguishers, first aid kits
• Verify catering, passenger manifest, special meals
In-Flight Procedures:
• Seat belt sign protocol: ON during taxi, takeoff, landing, and turbulence
• Service sequence: complimentary beverages → meal/snack → duty-free
• Turbulence management: Secure cabin, hot service suspended, frequent PA updates
• Medical emergency protocol: Call for medical professional, use onboard medkit, divert if critical
Post-Flight:
• Check cabin for items left behind, damage, security sweep
• Report any incidents, pax feedback, equipment issues
• Minimum turnaround: 35 minutes (domestic), 90 minutes (international)`,
        metadata: { docType: 'PDF', source: 'Crew_Ops_Manual_v5.pdf', lastUpdated: '2025-11-05', chunks: 32 }
    },
    {
        id: 'kb-007',
        title: 'Airport Operations - DEL (Delhi)',
        category: 'airport',
        content: `Indira Gandhi International Airport (DEL):
• IATA: DEL | ICAO: VIDP
• Terminals: T1 (Domestic LCC), T2 (Domestic), T3 (International + Domestic)
• Air Bharat operates from: T2 (Domestic), T3 (International)
• Runways: 3 (09/27, 10/28, 11/29) - CAT IIIB ILS available
• Operating hours: 24/7
• Slot restrictions: Peak hours 0600-1000, 1800-2200 (slot allocation required)
• Ground handling: AI-SATS, Celebi
• VIP/VVIP protocol: Special clearance via protocol officer
• Fog procedures (Oct-Feb): LVP activation at RVR below 550m
Key Contacts:
• ATC Tower: 118.1 MHz
• Ground: 121.9 MHz
• ATIS: 126.4 MHz`,
        metadata: { docType: 'PDF', source: 'Airport_Ops_DEL.pdf', lastUpdated: '2025-12-01', chunks: 18 }
    },
    {
        id: 'kb-008',
        title: 'Airport Operations - BOM (Mumbai)',
        category: 'airport',
        content: `Chhatrapati Shivaji Maharaj International Airport (BOM):
• IATA: BOM | ICAO: VABB
• Terminals: T1 (Domestic), T2 (International + Domestic)
• Air Bharat operates from: T1 (Domestic), T2 (International)
• Runways: 2 (09/27, 14/32) - Intersecting runways, capacity constrained
• Operating hours: 24/7 (noise restrictions 0000-0600)
• Slot restrictions: Heavily congested, prior slot mandatory
• Maximum movements: 46 per hour
• Monsoon procedures (Jun-Sep): Enhanced approach procedures, CAT II/III ops
• Ground handling: Air India SATS
Key Contacts:
• ATC: 119.4 MHz
• Ground: 121.7 MHz`,
        metadata: { docType: 'PDF', source: 'Airport_Ops_BOM.pdf', lastUpdated: '2025-11-15', chunks: 15 }
    },
    {
        id: 'kb-009',
        title: 'Weather Disruption Advisory Protocol',
        category: 'operations',
        content: `Air Bharat Weather Disruption Protocol:
Fog (Visibility < 200m):
• Activate CAT IIIB procedures where available
• Minimum crew qualification: CAT III certified pilots only
• Ground operations: Follow-me vehicles mandatory below 125m RVR
• Passenger communication: Proactive SMS/email every 30 minutes
Thunderstorm:
• No ground operations during active lightning within 5 nm
• Hold aircraft at gate or in hold pattern
• ATC coordination for diversions
• Ramp closure: Ground staff must shelter
Cyclone:
• 48-hour advance planning: Review all services to affected airports
• Pre-position recovery crews & aircraft
• Cancel operations 12 hours before expected landfall
• Resume operations after Met clearance + airport reopening confirmation
Heavy Rain:
• Monitor runway contamination (standing water)
• Reduced braking action advisories to all pilots
• Extended turnaround times`,
        metadata: { docType: 'PDF', source: 'Weather_Advisory_SOP.pdf', lastUpdated: '2025-10-10', chunks: 20 }
    },
    {
        id: 'kb-010',
        title: 'Check-in & Boarding Procedures',
        category: 'operations',
        content: `Air Bharat Check-in & Boarding SOP:
Check-in Windows:
• Web/App check-in: 48 hours to 60 minutes before departure
• Airport counter: 3 hours to 60 minutes (domestic), 4 hours to 75 minutes (international)
• Self-service kiosk: 3 hours to 60 minutes
Boarding Process:
• Boarding begins: 45 minutes before departure (domestic), 60 minutes (international)
• Gate closure: 25 minutes before departure (strict, no exceptions)
• Priority boarding: Business class → Frequent flyers → Passengers needing assistance → Window → Middle → Aisle
Documents Required:
• Domestic: Government photo ID (Aadhaar, PAN, Passport, Voter ID, Driving License)
• International: Valid passport + visa (if applicable) + boarding pass
Special Assistance:
• Wheelchair requests must be made 48 hours in advance
• Unaccompanied minors: Ages 5-12 (mandatory), 12-18 (optional), escort fee ₹3,000`,
        metadata: { docType: 'PDF', source: 'Checkin_Boarding_SOP.pdf', lastUpdated: '2025-12-05', chunks: 14 }
    }
];

export const flights = [
    { flight: 'AB-101', from: 'DEL', to: 'BOM', fromCity: 'New Delhi', toCity: 'Mumbai', dep: '06:00', arr: '08:15', status: 'On Time', aircraft: 'A320neo', gate: 'T2-G14' },
    { flight: 'AB-203', from: 'BOM', to: 'BLR', fromCity: 'Mumbai', toCity: 'Bengaluru', dep: '09:30', arr: '11:15', status: 'On Time', aircraft: 'B737-800', gate: 'T1-G08' },
    { flight: 'AB-305', from: 'DEL', to: 'HYD', fromCity: 'New Delhi', toCity: 'Hyderabad', dep: '11:00', arr: '13:20', status: 'Delayed 45min', aircraft: 'A320neo', gate: 'T2-G22' },
    { flight: 'AB-412', from: 'CCU', to: 'DEL', fromCity: 'Kolkata', toCity: 'New Delhi', dep: '14:00', arr: '16:30', status: 'On Time', aircraft: 'A320neo', gate: 'T3-G05' },
    { flight: 'AB-518', from: 'BLR', to: 'DEL', fromCity: 'Bengaluru', toCity: 'New Delhi', dep: '16:45', arr: '19:30', status: 'On Time', aircraft: 'B737-800', gate: 'T1-G12' },
    { flight: 'AB-624', from: 'HYD', to: 'BOM', fromCity: 'Hyderabad', toCity: 'Mumbai', dep: '18:00', arr: '19:30', status: 'Delayed 20min', aircraft: 'A320neo', gate: 'T2-G09' },
    { flight: 'AB-730', from: 'DEL', to: 'CCU', fromCity: 'New Delhi', toCity: 'Kolkata', dep: '20:00', arr: '22:15', status: 'On Time', aircraft: 'B737-800', gate: 'T2-G18' },
    { flight: 'AB-815', from: 'BOM', to: 'DEL', fromCity: 'Mumbai', toCity: 'New Delhi', dep: '21:30', arr: '23:45', status: 'On Time', aircraft: 'A320neo', gate: 'T1-G03' },
];

export const pnrData = {
    'ABC123': {
        pnr: 'ABC123',
        passenger: 'Rahul Sharma',
        flight: 'AB-101',
        from: 'DEL', to: 'BOM',
        fromCity: 'New Delhi', toCity: 'Mumbai',
        date: '2026-02-22',
        dep: '06:00', arr: '08:15',
        seat: '14A', class: 'Economy',
        status: 'Confirmed',
        aircraft: 'A320neo',
        baggage: '15 kg',
        meal: 'Veg',
        checkedIn: false
    },
    'XYZ789': {
        pnr: 'XYZ789',
        passenger: 'Priya Patel',
        flight: 'AB-305',
        from: 'DEL', to: 'HYD',
        fromCity: 'New Delhi', toCity: 'Hyderabad',
        date: '2026-02-22',
        dep: '11:00', arr: '13:20',
        seat: '3C', class: 'Business',
        status: 'Delayed',
        aircraft: 'A320neo',
        baggage: '25 kg',
        meal: 'Non-Veg',
        checkedIn: true
    },
    'LMN456': {
        pnr: 'LMN456',
        passenger: 'Amit Kumar',
        flight: 'AB-518',
        from: 'BLR', to: 'DEL',
        fromCity: 'Bengaluru', toCity: 'New Delhi',
        date: '2026-02-23',
        dep: '16:45', arr: '19:30',
        seat: '22F', class: 'Economy',
        status: 'Confirmed',
        aircraft: 'B737-800',
        baggage: '15 kg',
        meal: 'Veg',
        checkedIn: false
    }
};

export const airportCodes = {
    DEL: 'Indira Gandhi International, New Delhi',
    BOM: 'Chhatrapati Shivaji Maharaj International, Mumbai',
    BLR: 'Kempegowda International, Bengaluru',
    HYD: 'Rajiv Gandhi International, Hyderabad',
    CCU: 'Netaji Subhas Chandra Bose International, Kolkata',
    MAA: 'Chennai International, Chennai',
    GOI: 'Manohar International, Goa',
    COK: 'Cochin International, Kochi',
    AMD: 'Sardar Vallabhbhai Patel International, Ahmedabad',
    PNQ: 'Pune Airport, Pune',
    JAI: 'Jaipur International, Jaipur',
    LKO: 'Chaudhary Charan Singh International, Lucknow',
    IXC: 'Chandigarh International, Chandigarh',
    GAU: 'Lokpriya Gopinath Bordoloi International, Guwahati',
    SXR: 'Sheikh ul-Alam International, Srinagar',
    VNS: 'Lal Bahadur Shastri International, Varanasi'
};

export const documents = [
    { name: 'Baggage_Policy_v3.2.pdf', type: 'PDF', size: '2.4 MB', status: 'active', chunks: 12, lastProcessed: '2025-12-15' },
    { name: 'Refund_Policy_2025.pdf', type: 'PDF', size: '1.8 MB', status: 'active', chunks: 8, lastProcessed: '2025-11-20' },
    { name: 'DGCA_CAR_Section8_Rev4.pdf', type: 'PDF', size: '5.6 MB', status: 'active', chunks: 24, lastProcessed: '2025-10-01' },
    { name: 'A320neo_OPS_Manual.docx', type: 'DOCX', size: '12.3 MB', status: 'active', chunks: 45, lastProcessed: '2025-09-15' },
    { name: 'B737_800_OPS_Manual.docx', type: 'DOCX', size: '10.1 MB', status: 'active', chunks: 38, lastProcessed: '2025-08-20' },
    { name: 'Crew_Ops_Manual_v5.pdf', type: 'PDF', size: '8.7 MB', status: 'active', chunks: 32, lastProcessed: '2025-11-05' },
    { name: 'Airport_Ops_DEL.pdf', type: 'PDF', size: '3.2 MB', status: 'active', chunks: 18, lastProcessed: '2025-12-01' },
    { name: 'Airport_Ops_BOM.pdf', type: 'PDF', size: '2.9 MB', status: 'active', chunks: 15, lastProcessed: '2025-11-15' },
    { name: 'Weather_Advisory_SOP.pdf', type: 'PDF', size: '4.1 MB', status: 'processing', chunks: 20, lastProcessed: 'Processing...' },
    { name: 'Checkin_Boarding_SOP.pdf', type: 'PDF', size: '2.1 MB', status: 'active', chunks: 14, lastProcessed: '2025-12-05' },
];

export const auditLogs = [
    { action: 'Document uploaded: Weather_Advisory_SOP.pdf', user: 'Admin', time: '2 min ago', type: 'info' },
    { action: 'Query flagged: Low confidence response', user: 'System', time: '15 min ago', type: 'warning' },
    { action: 'New user login: Ground Staff - Rajesh K.', user: 'Auth', time: '32 min ago', type: 'success' },
    { action: 'Knowledge base re-indexed (1,234 chunks)', user: 'System', time: '1 hour ago', type: 'info' },
    { action: 'Document updated: Refund_Policy_2025.pdf', user: 'Admin', time: '2 hours ago', type: 'info' },
    { action: 'Hallucination detected & blocked', user: 'System', time: '3 hours ago', type: 'warning' },
    { action: 'Backup completed successfully', user: 'System', time: '6 hours ago', type: 'success' },
];

export const analyticsData = {
    dailyQueries: [
        { day: 'Mon', queries: 245, resolved: 230 },
        { day: 'Tue', queries: 312, resolved: 295 },
        { day: 'Wed', queries: 289, resolved: 271 },
        { day: 'Thu', queries: 356, resolved: 340 },
        { day: 'Fri', queries: 410, resolved: 388 },
        { day: 'Sat', queries: 198, resolved: 190 },
        { day: 'Sun', queries: 167, resolved: 160 },
    ],
    intentDistribution: [
        { name: 'Flight Status', value: 32 },
        { name: 'Baggage Info', value: 24 },
        { name: 'Refund/Cancel', value: 18 },
        { name: 'Check-in Help', value: 14 },
        { name: 'DGCA Rules', value: 8 },
        { name: 'Other', value: 4 },
    ],
    avgConfidence: 87.3,
    avgLatency: '1.2s',
    hallucinationRate: '2.1%',
    totalQueries: 12847,
    resolvedRate: 94.2,
    activeUsers: 1243,
    documentsIndexed: 10,
    totalChunks: 226,
};
