import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PlaneHeroScroll } from './components/PlaneHeroScroll';
import { BetterWayToFly } from './components/BetterWayToFly';
import { FlightPathVisualizer } from './components/FlightPathVisualizer';
import { FleetSection } from './components/FleetSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingFrom, setBookingFrom] = useState('DXB');
  const [bookingTo, setBookingTo] = useState('FAB');
  const [bookingAircraft, setBookingAircraft] = useState('Gulfstream 650ER');

  const handleOpenBooking = () => {
    setBookingOpen(true);
  };

  const handleOpenBookingWithRoute = (from: string, to: string) => {
    setBookingFrom(from);
    setBookingTo(to);
    setBookingOpen(true);
  };

  const handleSelectAircraftForBooking = (aircraftModel: string) => {
    setBookingAircraft(aircraftModel);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#ECE7E1] text-[#121212] flex flex-col font-sans selection:bg-[#121212] selection:text-[#ECE7E1]">
      {/* Top Bar Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Pixel-by-Pixel Replicated Plane Motion Animation & Blueprint Cutaway */}
        <PlaneHeroScroll onOpenBooking={handleOpenBooking} />

        {/* A Better Way to Fly (Recording Frames 00:25 - 00:30: Pets, French bulldog, Dubai Local Time) */}
        <BetterWayToFly />

        {/* Interactive Flight Path Visualization (Global Routes & Radar Geodesic Arcs) */}
        <FlightPathVisualizer onOpenBookingWithRoute={handleOpenBookingWithRoute} />

        {/* Our Fleet (Gulfstream G650ER, Global 7500, Falcon 8X) */}
        <FleetSection onSelectAircraftForBooking={handleSelectAircraftForBooking} />
      </main>

      {/* Luxury Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Interactive Booking Modal / Drawer */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialFrom={bookingFrom}
        initialTo={bookingTo}
        initialAircraft={bookingAircraft}
      />
    </div>
  );
}
