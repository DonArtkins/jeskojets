import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, Plane, Calendar, Users, HeartHandshake, ShieldCheck } from 'lucide-react';
import { AIRPORTS, FLEET_DATA } from '../data/airports';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFrom?: string;
  initialTo?: string;
  initialAircraft?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialFrom = 'DXB',
  initialTo = 'FAB',
  initialAircraft = 'Gulfstream 650ER',
}) => {
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('oneway');
  const [fromCode, setFromCode] = useState<string>(initialFrom);
  const [toCode, setToCode] = useState<string>(initialTo);
  const [departureDate, setDepartureDate] = useState<string>('2026-11-15');
  const [returnDate, setReturnDate] = useState<string>('2026-11-22');
  const [passengers, setPassengers] = useState<number>(4);
  const [selectedAircraft, setSelectedAircraft] = useState<string>(initialAircraft);
  const [hasPet, setHasPet] = useState<boolean>(false);
  const [petDetails, setPetDetails] = useState<string>('1 French bulldog');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  useEffect(() => {
    if (initialFrom) setFromCode(initialFrom);
    if (initialTo) setToCode(initialTo);
    if (initialAircraft) setSelectedAircraft(initialAircraft);
  }, [initialFrom, initialTo, initialAircraft]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `JJ-${fromCode}-${toCode}-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#ECE7E1] rounded-3xl shadow-2xl border border-black/10 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-black/10 flex items-center justify-between bg-white/50">
          <div>
            <span className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#736C63]">
              JESKO JETS CHARTER DISPATCH
            </span>
            <h3 className="font-display font-medium text-2xl text-[#121212]">
              Book the Flight
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 text-[#121212] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Trip Type Selector */}
              <div className="inline-flex p-1 bg-black/5 rounded-full border border-black/10 text-xs">
                <button
                  type="button"
                  onClick={() => setTripType('oneway')}
                  className={`px-4 py-1.5 rounded-full transition-all font-medium ${
                    tripType === 'oneway' ? 'bg-[#121212] text-white shadow-xs' : 'text-[#5E5953] hover:text-black'
                  }`}
                >
                  One-Way
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('roundtrip')}
                  className={`px-4 py-1.5 rounded-full transition-all font-medium ${
                    tripType === 'roundtrip' ? 'bg-[#121212] text-white shadow-xs' : 'text-[#5E5953] hover:text-black'
                  }`}
                >
                  Round-Trip
                </button>
              </div>

              {/* Airport Route Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#736C63] block mb-1.5">
                    Departure (From)
                  </label>
                  <select
                    value={fromCode}
                    onChange={(e) => setFromCode(e.target.value)}
                    className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#121212] focus:outline-hidden focus:border-black font-medium"
                    required
                  >
                    {AIRPORTS.map((a) => (
                      <option key={a.code} value={a.code}>
                        {a.code} — {a.city} ({a.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#736C63] block mb-1.5">
                    Arrival (To)
                  </label>
                  <select
                    value={toCode}
                    onChange={(e) => setToCode(e.target.value)}
                    className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#121212] focus:outline-hidden focus:border-black font-medium"
                    required
                  >
                    {AIRPORTS.map((a) => (
                      <option key={a.code} value={a.code}>
                        {a.code} — {a.city} ({a.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates & Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#736C63] block mb-1.5">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#121212] focus:outline-hidden focus:border-black"
                    required
                  />
                </div>

                {tripType === 'roundtrip' && (
                  <div>
                    <label className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#736C63] block mb-1.5">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#121212] focus:outline-hidden focus:border-black"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#736C63] block mb-1.5">
                    Passengers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#121212] focus:outline-hidden focus:border-black font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Aircraft Selection */}
              <div>
                <label className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#736C63] block mb-1.5">
                  Preferred Aircraft
                </label>
                <select
                  value={selectedAircraft}
                  onChange={(e) => setSelectedAircraft(e.target.value)}
                  className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#121212] focus:outline-hidden focus:border-black font-medium"
                >
                  <option value="Gulfstream 650ER">Gulfstream 650ER (Flagship Ultra-long-range · Up to 12 seats)</option>
                  <option value="Bombardier Global 7500">Bombardier Global 7500 (Four-Zone Stateroom · Up to 14 seats)</option>
                  <option value="Dassault Falcon 8X">Dassault Falcon 8X (Tri-Jet Agile Performance · Up to 12 seats)</option>
                </select>
              </div>

              {/* Pet Accompaniment Checkbox (Feature highlighted in recording!) */}
              <div className="p-4 bg-white/60 rounded-xl border border-black/10 space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasPet}
                    onChange={(e) => setHasPet(e.target.checked)}
                    className="w-4 h-4 rounded text-black focus:ring-black accent-[#121212]"
                  />
                  <span className="text-sm font-medium text-[#121212]">
                    Traveling with pets onboard (Dedicated VIP pet care included)
                  </span>
                </label>
                {hasPet && (
                  <input
                    type="text"
                    value={petDetails}
                    onChange={(e) => setPetDetails(e.target.value)}
                    placeholder="Specify pet species, breed, and weight (e.g. 1 French bulldog, 12 kg)"
                    className="w-full mt-2 bg-white border border-black/10 rounded-lg px-3 py-2 text-xs text-[#121212] focus:outline-hidden"
                  />
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#736C63] block mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g., Alexander Sterling"
                    className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#121212] focus:outline-hidden focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#736C63] block mb-1.5">
                    Direct Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alexander@domain.com"
                    className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#121212] focus:outline-hidden focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#736C63] block mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#121212] focus:outline-hidden focus:border-black"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#121212] hover:bg-black text-white rounded-full font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg"
                >
                  <span>Request Instant Flight Itinerary & Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-[#736C63] text-center mt-2">
                  Our Dubai operations flight desk responds with aircraft confirmation within 15 minutes.
                </p>
              </div>
            </form>
          ) : (
            /* Confirmation Screen */
            <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono-tabular tracking-wider uppercase text-emerald-800 font-semibold">
                  FLIGHT INQUIRY TRANSMITTED
                </span>
                <h4 className="font-display font-medium text-3xl text-[#121212] mt-1">
                  Thank You, {fullName || 'Valued Guest'}
                </h4>
                <p className="text-sm text-[#524E48] mt-2 max-w-md mx-auto">
                  Your charter request for <strong className="text-black">{fromCode} ⇄ {toCode}</strong> on the <strong className="text-black">{selectedAircraft}</strong> has been assigned to our Dubai operations team.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl max-w-sm mx-auto border border-black/10 text-left text-xs font-mono-tabular space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#736C63]">DISPATCH REF:</span>
                  <span className="font-bold text-[#121212]">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736C63]">PASSENGERS:</span>
                  <span className="font-bold text-[#121212]">{passengers} GUESTS</span>
                </div>
                {hasPet && (
                  <div className="flex justify-between text-emerald-800">
                    <span>PET CARE:</span>
                    <span className="font-bold">CONFIRMED ONBOARD</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#736C63]">DISPATCH STATUS:</span>
                  <span className="text-emerald-700 font-bold">WHEELS-UP READY</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-[#121212] text-white rounded-full text-xs font-medium uppercase tracking-wider hover:bg-black"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
