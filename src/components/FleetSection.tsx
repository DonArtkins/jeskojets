import React, { useState } from 'react';
import { ArrowUpRight, Check, ShieldCheck, Gauge, Users, Compass, Wind } from 'lucide-react';
import { FLEET_DATA } from '../data/airports';
import { AircraftSpec } from '../types';

interface FleetSectionProps {
  onSelectAircraftForBooking: (model: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectAircraftForBooking }) => {
  const [selectedAircraft, setSelectedAircraft] = useState<AircraftSpec>(FLEET_DATA[0]);

  return (
    <section id="fleet-section" className="py-24 bg-[#E5DFD7] text-[#121212] border-t border-black/5">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <span className="text-xs font-mono-tabular uppercase tracking-widest text-[#736C63] mb-2 block">
              PRECISION AVIATION ASSETS
            </span>
            <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#121212]">
              Our Fleet
            </h2>
          </div>

          {/* Fleet Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {FLEET_DATA.map((aircraft) => {
              const active = selectedAircraft.model === aircraft.model;
              return (
                <button
                  key={aircraft.model}
                  onClick={() => setSelectedAircraft(aircraft)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    active
                      ? 'bg-[#121212] text-white shadow-md'
                      : 'bg-white/50 hover:bg-white text-[#4A4641] border border-black/10'
                  }`}
                >
                  {aircraft.name} {aircraft.model}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Fleet Spec Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Key Highlights & Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#8C8377]">
                {selectedAircraft.category}
              </span>
              <h3 className="font-display font-bold text-4xl sm:text-5xl text-[#121212] mt-1">
                {selectedAircraft.name} <span className="font-light">{selectedAircraft.model}</span>
              </h3>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-[#4A4641] max-w-xl">
              {selectedAircraft.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-black/10">
              <div>
                <p className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#736C63]">
                  OPERATING RANGE
                </p>
                <p className="font-mono-tabular text-xl font-bold text-[#121212] mt-0.5">
                  {selectedAircraft.rangeKm}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#736C63]">
                  MAX CRUISE SPEED
                </p>
                <p className="font-mono-tabular text-xl font-bold text-[#121212] mt-0.5">
                  {selectedAircraft.speedKnots}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#736C63]">
                  SERVICE CEILING
                </p>
                <p className="font-mono-tabular text-xl font-bold text-[#121212] mt-0.5">
                  {selectedAircraft.altitude}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#736C63]">
                  CABIN SEATING
                </p>
                <p className="text-xs sm:text-sm font-semibold text-[#121212] mt-0.5">
                  {selectedAircraft.seats}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#736C63]">
                  BAGGAGE VOLUME
                </p>
                <p className="text-xs sm:text-sm font-semibold text-[#121212] mt-0.5">
                  {selectedAircraft.baggage}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#736C63]">
                  PROPULSION
                </p>
                <p className="text-xs font-semibold text-[#121212] mt-0.5 truncate">
                  {selectedAircraft.engines}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onSelectAircraftForBooking(`${selectedAircraft.name} ${selectedAircraft.model}`)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#121212] text-white hover:bg-black rounded-full text-xs font-medium uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 shadow-md"
              >
                <span>Charter this Aircraft</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Cabin Dimensions Card (6 cols) */}
          <div className="lg:col-span-6 bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-black/10 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <span className="font-display font-medium text-base text-[#121212]">
                Architectural Cabin Metrics
              </span>
              <span className="text-xs font-mono-tabular text-[#736C63]">
                {selectedAircraft.model}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm py-2 border-b border-black/5">
                <span className="text-[#5E5953]">Cabin Length</span>
                <span className="font-mono-tabular font-bold text-[#121212]">
                  {selectedAircraft.cabinLength}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm py-2 border-b border-black/5">
                <span className="text-[#5E5953]">Cabin Width (Centerline)</span>
                <span className="font-mono-tabular font-bold text-[#121212]">
                  {selectedAircraft.cabinWidth}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm py-2 border-b border-black/5">
                <span className="text-[#5E5953]">Cabin Height (Stand-up headroom)</span>
                <span className="font-mono-tabular font-bold text-[#121212]">
                  {selectedAircraft.cabinHeight}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm py-2 border-b border-black/5">
                <span className="text-[#5E5953]">Maximum Endurance</span>
                <span className="font-mono-tabular font-bold text-[#121212]">
                  {selectedAircraft.endurance}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm py-2">
                <span className="text-[#5E5953]">Air Circulation Cycle</span>
                <span className="font-mono-tabular font-bold text-emerald-800">
                  100% Fresh Air every 2 minutes
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#ECE7E1] text-xs text-[#524E48] leading-relaxed">
              Every aircraft in the Jesko Jets fleet adheres to the highest European EASA and FAA Part 135 airworthiness standards with Wyvern Wingman and ARGUS Platinum safety certification.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
