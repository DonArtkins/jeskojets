import React, { useState, useEffect, useRef } from 'react';
import { Plane, Compass, Play, Pause, RotateCcw, MapPin, Gauge, Shield, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { AIRPORTS, POPULAR_ROUTES } from '../data/airports';
import { Airport, RouteOption } from '../types';

interface FlightPathVisualizerProps {
  onOpenBookingWithRoute?: (from: string, to: string) => void;
}

export const FlightPathVisualizer: React.FC<FlightPathVisualizerProps> = ({ onOpenBookingWithRoute }) => {
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(POPULAR_ROUTES[0]);
  const [originAirport, setOriginAirport] = useState<Airport>(POPULAR_ROUTES[0].from);
  const [destinationAirport, setDestinationAirport] = useState<Airport>(POPULAR_ROUTES[0].to);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [flightProgress, setFlightProgress] = useState<number>(0.25);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Haversine formula to calculate great circle distance in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const currentDistanceKm = calculateDistance(
    originAirport.lat,
    originAirport.lng,
    destinationAirport.lat,
    destinationAirport.lng
  );

  // Flight time at 880 km/h average cruise (Mach 0.88 - 0.90)
  const currentFlightTimeHours = Math.round((currentDistanceKm / 880) * 10) / 10;
  const isNonStop = currentDistanceKm <= 11263;

  // Handle route preset selection
  const handleSelectPreset = (route: RouteOption) => {
    setSelectedRoute(route);
    setOriginAirport(route.from);
    setDestinationAirport(route.to);
    setFlightProgress(0);
    setIsSimulating(true);
  };

  // Convert GPS Coordinates to Equirectangular Canvas coordinates
  const coordToCanvas = (lat: number, lng: number, width: number, height: number) => {
    // longitude: -180 to 180 -> 0 to width
    const x = ((lng + 180) / 360) * width;
    // latitude: 90 to -90 -> 0 to height (clamped slightly to prevent pole distortion)
    const y = ((90 - lat) / 180) * height;
    return { x, y };
  };

  // Animation loop for plane flight along geodesic arc
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (isSimulating) {
        setFlightProgress((prev) => {
          const next = prev + dt * 0.08;
          return next > 1 ? 0 : next;
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isSimulating]);

  // Canvas drawing of map, flight arcs, and jet
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Background: Deep dark luxury aviation chart background
    ctx.fillStyle = '#141413';
    ctx.fillRect(0, 0, width, height);

    // Draw Subtle Coordinate Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    ctx.lineWidth = 1;

    // Longitude lines
    for (let lng = -180; lng <= 180; lng += 30) {
      const x = ((lng + 180) / 360) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Latitude lines
    for (let lat = -60; lat <= 80; lat += 20) {
      const y = ((90 - lat) / 180) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw simplified stylized continental outlines / landmass dots
    ctx.fillStyle = 'rgba(215, 203, 187, 0.06)';
    // Pre-drawn continent silhouettes for instant luxury aesthetics
    const drawLandmass = (pts: [number, number][]) => {
      ctx.beginPath();
      pts.forEach(([lat, lng], idx) => {
        const { x, y } = coordToCanvas(lat, lng, width, height);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
    };

    // Major landmass polygons (simplified world outlines)
    // North America
    drawLandmass([[70, -165], [70, -95], [55, -55], [45, -60], [25, -80], [15, -90], [30, -120], [60, -140]]);
    // South America
    drawLandmass([[10, -75], [5, -50], [-20, -40], [-55, -65], [-50, -75], [-15, -75], [0, -80]]);
    // Europe
    drawLandmass([[70, 25], [60, 30], [40, 30], [35, -10], [50, -10], [60, 5]]);
    // Africa
    drawLandmass([[35, -5], [30, 32], [10, 50], [-35, 20], [-35, 18], [5, 0], [15, -15]]);
    // Asia
    drawLandmass([[75, 60], [75, 170], [60, 160], [35, 125], [10, 105], [20, 80], [25, 60], [40, 50], [60, 45]]);
    // Australia
    drawLandmass([[-12, 130], [-15, 148], [-38, 148], [-35, 115], [-20, 115]]);

    // Background routes (other popular routes in dim champagne gold)
    POPULAR_ROUTES.forEach((r) => {
      if (r.id === selectedRoute.id) return;
      const p1 = coordToCanvas(r.from.lat, r.from.lng, width, height);
      const p2 = coordToCanvas(r.to.lat, r.to.lng, width, height);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(209, 190, 160, 0.15)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 6]);

      // Quadratic curve arc with altitude bulge
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2 - Math.min(Math.abs(p2.x - p1.x) * 0.15, 80);
      ctx.moveTo(p1.x, p1.y);
      ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Active Route: Great Circle Geodesic Arc
    const start = coordToCanvas(originAirport.lat, originAirport.lng, width, height);
    const end = coordToCanvas(destinationAirport.lat, destinationAirport.lng, width, height);

    // Arc midpoint with dynamic curvature based on distance
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const arcHeight = Math.min(dist * 0.22, 120);

    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2 - arcHeight;

    // Draw full trajectory glow
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo(midX, midY, end.x, end.y);
    ctx.strokeStyle = 'rgba(224, 203, 172, 0.25)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw elapsed trajectory (golden solid glowing line up to flightProgress)
    // Compute current position along bezier curve
    const t = flightProgress;
    const currentX = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * midX + t * t * end.x;
    const currentY = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * midY + t * t * end.y;

    // Tangent angle for aircraft rotation
    const tangentX = 2 * (1 - t) * (midX - start.x) + 2 * t * (end.x - midX);
    const tangentY = 2 * (1 - t) * (midY - start.y) + 2 * t * (end.y - midY);
    const heading = Math.atan2(tangentY, tangentX);

    // Active path glow
    ctx.shadowColor = '#E0CBAC';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    // Subdivide path up to t
    ctx.moveTo(start.x, start.y);
    const steps = 40;
    for (let i = 1; i <= Math.floor(steps * t); i++) {
      const stepT = i / steps;
      const px = (1 - stepT) * (1 - stepT) * start.x + 2 * (1 - stepT) * stepT * midX + stepT * stepT * end.x;
      const py = (1 - stepT) * (1 - stepT) * start.y + 2 * (1 - stepT) * stepT * midY + stepT * stepT * end.y;
      ctx.lineTo(px, py);
    }
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = '#E0CBAC';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    // Draw Origin Airport Beacon
    ctx.beginPath();
    ctx.arc(start.x, start.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#E0CBAC';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(start.x, start.y, 8, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(224, 203, 172, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Origin text label
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 11px "Space Mono", monospace';
    ctx.fillText(`${originAirport.code} (${originAirport.city})`, start.x + 10, start.y + 4);

    // Draw Destination Airport Beacon
    ctx.beginPath();
    ctx.arc(end.x, end.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#E0CBAC';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(end.x, end.y, 8, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(224, 203, 172, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Destination text label
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 11px "Space Mono", monospace';
    ctx.fillText(`${destinationAirport.code} (${destinationAirport.city})`, end.x + 10, end.y + 4);

    // Draw Gulfstream Jet at (currentX, currentY) rotated to heading
    ctx.save();
    ctx.translate(currentX, currentY);
    ctx.rotate(heading);

    // Glowing contrail behind aircraft
    const contrailGradient = ctx.createLinearGradient(-35, 0, 0, 0);
    contrailGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    contrailGradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');
    ctx.strokeStyle = contrailGradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-35, 0);
    ctx.lineTo(-5, 0);
    ctx.stroke();

    // Stylized Jet Silhouette (Gulfstream swept-wing silhouette)
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    // Nose
    ctx.moveTo(12, 0);
    // Right wing
    ctx.lineTo(2, 3);
    ctx.lineTo(-4, 14);
    ctx.lineTo(-6, 14);
    ctx.lineTo(-3, 3);
    // Right engine & stabilizer
    ctx.lineTo(-10, 3);
    ctx.lineTo(-13, 8);
    ctx.lineTo(-15, 8);
    ctx.lineTo(-13, 1);
    ctx.lineTo(-14, 0); // tail tip
    // Left engine & stabilizer
    ctx.lineTo(-13, -1);
    ctx.lineTo(-15, -8);
    ctx.lineTo(-13, -8);
    ctx.lineTo(-10, -3);
    // Left wing
    ctx.lineTo(-3, -3);
    ctx.lineTo(-6, -14);
    ctx.lineTo(-4, -14);
    ctx.lineTo(2, -3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Draw all other airport dots quietly
    AIRPORTS.forEach((a) => {
      if (a.code === originAirport.code || a.code === destinationAirport.code) return;
      const { x, y } = coordToCanvas(a.lat, a.lng, width, height);
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
    });
  }, [originAirport, destinationAirport, flightProgress, selectedRoute]);

  // Current real-time simulated flight metrics
  const currentAltitude = Math.round(41000 + Math.sin(flightProgress * Math.PI) * 4000);
  const currentSpeedKnots = 488;
  const currentMach = '0.90';
  const elapsedKm = Math.round(currentDistanceKm * flightProgress);
  const remainingKm = Math.max(0, currentDistanceKm - elapsedKm);

  return (
    <section id="global-flight-path" className="py-24 bg-[#141413] text-[#ECE7E1] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tabular tracking-widest uppercase text-[#D1BEA0] mb-2">
              <Compass className="w-4 h-4" />
              <span>Jesko Jets Worldwide Operations</span>
            </div>
            <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight text-white">
              Global Flight Path
            </h2>
            <p className="text-sm text-[#A8A196] mt-2 max-w-xl">
              Precision non-stop trajectories powered by the Gulfstream G650ER’s 11,263 km range. Connecting financial capitals, secluded retreats, and diplomatic corridors worldwide.
            </p>
          </div>

          {/* Quick Route Preset Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {POPULAR_ROUTES.map((route) => {
              const active = selectedRoute.id === route.id;
              return (
                <button
                  key={route.id}
                  onClick={() => handleSelectPreset(route)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    active
                      ? 'bg-[#E0CBAC] text-[#141413] font-semibold shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-[#C7BFB5] border border-white/10'
                  }`}
                >
                  {route.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Visualizer Stage */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Radar & Global Map Canvas (8 Columns) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/10 bg-[#0F0F0E] shadow-2xl">
            {/* Canvas Area */}
            <div className="relative aspect-[16/9] w-full">
              <canvas
                ref={canvasRef}
                className="w-full h-full block cursor-crosshair"
              />

              {/* Inset Flight Status Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-3 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 text-xs">
                <div className="w-2 h-2 rounded-full bg-[#E0CBAC] animate-pulse" />
                <span className="font-mono-tabular tracking-wider uppercase text-white font-medium">
                  {selectedRoute.name} · EN ROUTE
                </span>
                <span className="text-white/40">|</span>
                <span className="font-mono-tabular text-[#D1BEA0]">
                  G-LXRY (G650ER)
                </span>
              </div>

              {/* Simulation Playback Controls Overlay */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title={isSimulating ? 'Pause flight' : 'Resume flight'}
                >
                  {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setFlightProgress(0);
                    setIsSimulating(true);
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Reset departure"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress Slider on Bottom of Canvas */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div
                  style={{ width: `${flightProgress * 100}%` }}
                  className="h-full bg-[#E0CBAC] transition-all duration-75"
                />
              </div>
            </div>

            {/* Live Telemetry Strip Below Canvas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#181817] border-t border-white/5">
              <div>
                <p className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#8C8377]">
                  ALTITUDE
                </p>
                <p className="font-mono-tabular text-lg font-bold text-white mt-0.5">
                  FL{Math.round(currentAltitude / 100)} <span className="text-xs font-normal text-[#8C8377]">({currentAltitude.toLocaleString()} FT)</span>
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#8C8377]">
                  AIRSPEED
                </p>
                <p className="font-mono-tabular text-lg font-bold text-white mt-0.5">
                  M {currentMach} <span className="text-xs font-normal text-[#8C8377]">({currentSpeedKnots} KTAS)</span>
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#8C8377]">
                  DISTANCE COVERED
                </p>
                <p className="font-mono-tabular text-lg font-bold text-white mt-0.5">
                  {elapsedKm.toLocaleString()} KM <span className="text-xs font-normal text-[#8C8377]">/ {currentDistanceKm.toLocaleString()} KM</span>
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#8C8377]">
                  CABIN PRESSURE
                </p>
                <p className="font-mono-tabular text-lg font-bold text-[#E0CBAC] mt-0.5">
                  3,290 FT <span className="text-xs font-normal text-[#8C8377]">(Sea-level comfort)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Custom Route Calculator & Dispatch Panel (4 Columns) */}
          <div className="lg:col-span-4 bg-[#181817] rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-display font-medium text-lg text-white">Route Dispatcher</span>
                <span className="text-[11px] font-mono-tabular px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                  {isNonStop ? 'NON-STOP CAPABLE' : 'TECH STOP REQUIRED'}
                </span>
              </div>

              {/* Origin Selection */}
              <div className="mt-5">
                <label className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#8C8377] block mb-1.5">
                  Departure Airport
                </label>
                <select
                  value={originAirport.code}
                  onChange={(e) => {
                    const found = AIRPORTS.find((a) => a.code === e.target.value);
                    if (found) {
                      setOriginAirport(found);
                      setFlightProgress(0);
                    }
                  }}
                  className="w-full bg-[#222120] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-[#E0CBAC]"
                >
                  {AIRPORTS.map((a) => (
                    <option key={a.code} value={a.code} className="bg-[#181817] text-white">
                      {a.code} — {a.city}, {a.country} ({a.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination Selection */}
              <div className="mt-4">
                <label className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#8C8377] block mb-1.5">
                  Arrival Destination
                </label>
                <select
                  value={destinationAirport.code}
                  onChange={(e) => {
                    const found = AIRPORTS.find((a) => a.code === e.target.value);
                    if (found) {
                      setDestinationAirport(found);
                      setFlightProgress(0);
                    }
                  }}
                  className="w-full bg-[#222120] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-[#E0CBAC]"
                >
                  {AIRPORTS.map((a) => (
                    <option key={a.code} value={a.code} className="bg-[#181817] text-white">
                      {a.code} — {a.city}, {a.country} ({a.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Flight Specs Summary Card */}
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#8C8377]">Great Circle Distance</span>
                  <span className="font-mono-tabular font-bold text-white text-sm">
                    {currentDistanceKm.toLocaleString()} KM <span className="text-[11px] font-normal text-[#8C8377]">({Math.round(currentDistanceKm * 0.539957).toLocaleString()} NM)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8C8377]">Estimated Flight Duration</span>
                  <span className="font-mono-tabular font-bold text-[#E0CBAC] text-sm">
                    {Math.floor(currentFlightTimeHours)}h {Math.round((currentFlightTimeHours % 1) * 60)}m
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8C8377]">G650ER Maximum Range</span>
                  <span className="font-mono-tabular text-white">
                    11,263 KM
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8C8377]">Direct Fuel Remaining Margin</span>
                  <span className="font-mono-tabular text-emerald-400 font-medium">
                    {Math.max(0, 11263 - currentDistanceKm).toLocaleString()} KM buffer
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  if (onOpenBookingWithRoute) {
                    onOpenBookingWithRoute(originAirport.code, destinationAirport.code);
                  }
                }}
                className="w-full py-3.5 px-5 bg-[#E0CBAC] hover:bg-[#ebd9bd] text-[#141413] rounded-full font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                <span>Request Charter on this Route</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-[#736C63] text-center mt-2.5">
                Guaranteed aircraft departure within 2 hours of flight confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
