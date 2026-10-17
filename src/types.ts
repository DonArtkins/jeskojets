export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
}

export interface RouteOption {
  id: string;
  name: string;
  from: Airport;
  to: Airport;
  distanceKm: number;
  flightTimeHours: number;
  description: string;
  highlight: string;
}

export interface AircraftSpec {
  name: string;
  model: string;
  category: string;
  rangeKm: string;
  speedKnots: string;
  seats: string;
  endurance: string;
  baggage: string;
  altitude: string;
  cabinLength: string;
  cabinWidth: string;
  cabinHeight: string;
  engines: string;
  description: string;
}

export interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  xPercent: number; // relative to aircraft image width
  yPercent: number; // relative to aircraft image height
}
