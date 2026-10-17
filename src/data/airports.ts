import { Airport, RouteOption, AircraftSpec, Hotspot } from '../types';

export const AIRPORTS: Airport[] = [
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'United Arab Emirates', lat: 25.2532, lng: 55.3657, timezone: 'Asia/Dubai' },
  { code: 'FAB', name: 'Farnborough Airport', city: 'London', country: 'United Kingdom', lat: 51.2758, lng: -0.7763, timezone: 'Europe/London' },
  { code: 'LBG', name: 'Paris–Le Bourget', city: 'Paris', country: 'France', lat: 48.9694, lng: 2.4414, timezone: 'Europe/Paris' },
  { code: 'GVA', name: 'Geneva Airport', city: 'Geneva', country: 'Switzerland', lat: 46.2381, lng: 6.1089, timezone: 'Europe/Zurich' },
  { code: 'JFK', name: 'John F. Kennedy Intl', city: 'New York', country: 'United States', lat: 40.6413, lng: -73.7781, timezone: 'America/New_York' },
  { code: 'TEB', name: 'Teterboro Airport', city: 'New York (NJ)', country: 'United States', lat: 40.8501, lng: -74.0608, timezone: 'America/New_York' },
  { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan', lat: 35.5494, lng: 139.7798, timezone: 'Asia/Tokyo' },
  { code: 'VNY', name: 'Van Nuys Airport', city: 'Los Angeles', country: 'United States', lat: 34.2098, lng: -118.4899, timezone: 'America/Los_Angeles' },
  { code: 'OPF', name: 'Miami-Opa Locka Executive', city: 'Miami', country: 'United States', lat: 25.9074, lng: -80.2784, timezone: 'America/New_York' },
  { code: 'NCE', name: 'Nice Côte d’Azur', city: 'Nice', country: 'France', lat: 43.6584, lng: 7.2159, timezone: 'Europe/Paris' },
  { code: 'MLE', name: 'Velana International', city: 'Malé', country: 'Maldives', lat: 4.1918, lng: 73.5291, timezone: 'Indian/Maldives' },
  { code: 'SIN', name: 'Singapore Changi / Seletar', city: 'Singapore', country: 'Singapore', lat: 1.3644, lng: 103.9915, timezone: 'Asia/Singapore' },
  { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland', lat: 47.4582, lng: 8.5555, timezone: 'Europe/Zurich' },
  { code: 'ASE', name: 'Aspen/Pitkin County', city: 'Aspen', country: 'United States', lat: 39.2232, lng: -106.8688, timezone: 'America/Denver' },
  { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan', lat: 35.5494, lng: 139.7798, timezone: 'Asia/Tokyo' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar', lat: 25.2609, lng: 51.5651, timezone: 'Asia/Qatar' },
  { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia', lat: -33.9399, lng: 151.1753, timezone: 'Australia/Sydney' },
];

export const POPULAR_ROUTES: RouteOption[] = [
  {
    id: 'dxb-fab',
    name: 'Dubai ⇄ London',
    from: AIRPORTS[0], // DXB
    to: AIRPORTS[1],   // FAB
    distanceKm: 5510,
    flightTimeHours: 6.8,
    description: 'Premier financial and diplomacy corridor connecting the Middle East to London’s top VIP business aviation hub.',
    highlight: 'Non-stop ultra-quiet transcontinental cruise',
  },
  {
    id: 'jfk-hnd',
    name: 'New York ⇄ Tokyo',
    from: AIRPORTS[4], // JFK
    to: AIRPORTS[6],   // HND
    distanceKm: 10850,
    flightTimeHours: 12.8,
    description: 'Brings Tokyo and New York an hour closer at Mach 0.90 cruise speed, connecting both financial capitals nonstop.',
    highlight: 'One single stop around the entire globe',
  },
  {
    id: 'dxb-mle',
    name: 'Dubai ⇄ Malé',
    from: AIRPORTS[0], // DXB
    to: AIRPORTS[10],  // MLE
    distanceKm: 3040,
    flightTimeHours: 3.9,
    description: 'Direct VIP leisure route from the Arabian Gulf to private luxury island atolls in the Indian Ocean.',
    highlight: 'Ramp-side seaplane transfers upon arrival',
  },
  {
    id: 'opf-nce',
    name: 'Miami ⇄ Nice',
    from: AIRPORTS[8], // OPF
    to: AIRPORTS[9],   // NCE
    distanceKm: 7780,
    flightTimeHours: 8.9,
    description: 'Transatlantic corridor between South Florida and the French Riviera with bespoke in-flight sommelier service.',
    highlight: 'Direct transatlantic route with zero tech stops',
  },
  {
    id: 'lbg-gva',
    name: 'Paris ⇄ Geneva',
    from: AIRPORTS[2], // LBG
    to: AIRPORTS[3],   // GVA
    distanceKm: 410,
    flightTimeHours: 0.8,
    description: 'Rapid Alpine shuttle for European executive summits, private banking, and luxury chalet retreats.',
    highlight: 'Instant 15-minute tarmac departure clearance',
  },
];

export const FLEET_DATA: AircraftSpec[] = [
  {
    name: 'Gulfstream',
    model: '650ER',
    category: 'Ultra-long-range Aircraft',
    rangeKm: '11,263 KM',
    speedKnots: '488 KNOTS',
    seats: 'Up to 12 seats + 1 cabin service',
    endurance: '16 HRS - Maximum for European based aircraft',
    baggage: '5.52 M³',
    altitude: '15,544 M',
    cabinLength: '14.05 M',
    cabinWidth: '2.46 M',
    cabinHeight: '1.95 M',
    engines: 'Rolls-Royce BR725 A1-12 Turbofans',
    description: 'Featuring wings designed to minimize anything that could disrupt its natural aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 A1-12 engines, the Gulfstream G650ER is engineered for exceptional range and top-end speed.',
  },
  {
    name: 'Bombardier',
    model: 'Global 7500',
    category: 'Four-Zone Flagship Aircraft',
    rangeKm: '14,260 KM',
    speedKnots: '516 KNOTS',
    seats: 'Up to 14 seats + 2 crew rest',
    endurance: '17.5 HRS - Intercontinental Range',
    baggage: '5.50 M³',
    altitude: '15,545 M',
    cabinLength: '16.59 M',
    cabinWidth: '2.44 M',
    cabinHeight: '1.88 M',
    engines: 'GE Passport Turbofans',
    description: 'The industry benchmark for four true living spaces, featuring a dedicated master bedroom with permanent bed, full kitchen, and patented Nuage ergonomic seating.',
  },
  {
    name: 'Dassault',
    model: 'Falcon 8X',
    category: 'Tri-Jet Performance Aircraft',
    rangeKm: '11,945 KM',
    speedKnots: '470 KNOTS',
    seats: 'Up to 12 seats + 1 service',
    endurance: '14 HRS - High Altitude Agility',
    baggage: '4.00 M³',
    altitude: '15,500 M',
    cabinLength: '13.00 M',
    cabinWidth: '2.34 M',
    cabinHeight: '1.88 M',
    engines: '3x Pratt & Whitney Canada PW307D',
    description: 'Equipped with three precision engines for unmatched runway short-field performance and steep approach certification at London City, Lugano, and Aspen.',
  },
];

export const AIRCRAFT_HOTSPOTS: Hotspot[] = [
  {
    id: 'cockpit',
    title: 'PlaneView II Cockpit',
    subtitle: 'Advanced Avionics & HUD',
    description: 'Synthetic Vision-Primary Flight Display (SV-PFD) with Head-Up Display II and Enhanced Vision System for all-weather precision landings.',
    xPercent: 50,
    yPercent: 15,
  },
  {
    id: 'galley',
    title: 'Forward Master Galley',
    subtitle: 'Michelin-Grade In-flight Service',
    description: 'Convection and microwave ovens, dual espresso makers, chilled wine storage, and bespoke porcelain tableware staging area.',
    xPercent: 49,
    yPercent: 28,
  },
  {
    id: 'club_seats',
    title: 'Executive Club Seating',
    subtitle: 'Hand-Stitched Italian Leather',
    description: 'Four fully articulating armchairs with fold-out executive tables, ergonomic lumbar support, and personal cabin climate control dials.',
    xPercent: 49,
    yPercent: 42,
  },
  {
    id: 'conference',
    title: 'Conference & Dining Center',
    subtitle: 'Meetings at 45,000 Feet',
    description: 'Polished walnut four-place dining arrangement with high-speed Ka-band satellite video conferencing connectivity.',
    xPercent: 49,
    yPercent: 57,
  },
  {
    id: 'stateroom',
    title: 'Private Stateroom Suite',
    subtitle: 'Quiet Rest & Master Divan',
    description: 'Private aft compartment featuring a plush berthing divan that converts into a double bed, isolated with soundproofing bulkhead.',
    xPercent: 49,
    yPercent: 70,
  },
  {
    id: 'engines',
    title: 'Rolls-Royce BR725 Engines',
    subtitle: 'Twin High-Thrust Turbofans',
    description: 'Producing 16,900 lbf thrust each, designed with swept swept-fan blades for 35% lower emissions and whisper-quiet cabin acoustics.',
    xPercent: 58,
    yPercent: 78,
  },
];
