import React, { useState } from 'react';
import { Menu, X, Phone, Mail, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/40 backdrop-blur-md border-b border-black/5 text-[#121212]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide">
          <button
            onClick={() => scrollTo('hero-plane')}
            className="hover:text-black transition-colors whitespace-nowrap text-[#4A4641] hover:underline underline-offset-8"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('fleet-section')}
            className="hover:text-black transition-colors whitespace-nowrap text-[#4A4641] hover:underline underline-offset-8"
          >
            Our Fleet
          </button>
          <button
            onClick={() => scrollTo('advantages-section')}
            className="hover:text-black transition-colors whitespace-nowrap text-[#4A4641] hover:underline underline-offset-8"
          >
            Advantages
          </button>
          <button
            onClick={() => scrollTo('global-flight-path')}
            className="hover:text-black transition-colors whitespace-nowrap text-[#4A4641] hover:underline underline-offset-8 flex items-center gap-1"
          >
            Global
            <span className="w-1.5 h-1.5 rounded-full bg-[#121212]/40" />
          </button>
        </nav>

        {/* Zone 2: Brand Mark (Jesko Jets) */}
        <a
          href="#hero-plane"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('hero-plane');
          }}
          className="group flex flex-col items-center justify-center text-center cursor-pointer select-none"
        >
          <span className="font-display font-medium text-2xl sm:text-[28px] tracking-[0.22em] uppercase text-[#121212] transition-transform duration-300 group-hover:scale-105">
            Jesko Jets
          </span>
        </a>

        {/* Zone 3: Direct Contacts & Booking CTA */}
        <div className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#4A4641]">
          <a
            href="tel:+971544325050"
            className="hover:text-black transition-colors tracking-wide whitespace-nowrap flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 opacity-60" />
            +971 54 432 5050
          </a>
          <a
            href="mailto:info@jeskojets.com"
            className="hover:text-black transition-colors tracking-wide whitespace-nowrap flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 opacity-60" />
            info@jeskojets.com
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={onOpenBooking}
            className="px-3.5 py-1.5 text-xs font-medium bg-[#121212] text-white rounded-full flex items-center gap-1 shadow-sm"
          >
            <span>Book</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#121212] rounded-lg hover:bg-black/5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ECE7E1]/95 backdrop-blur-xl border-b border-black/10 px-6 py-6 flex flex-col gap-5 text-sm animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => scrollTo('hero-plane')}
            className="text-left font-medium text-[#121212] py-2 border-b border-black/5"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('fleet-section')}
            className="text-left font-medium text-[#121212] py-2 border-b border-black/5"
          >
            Our Fleet (Gulfstream G650ER)
          </button>
          <button
            onClick={() => scrollTo('advantages-section')}
            className="text-left font-medium text-[#121212] py-2 border-b border-black/5"
          >
            Advantages & Pets Onboard
          </button>
          <button
            onClick={() => scrollTo('global-flight-path')}
            className="text-left font-medium text-[#121212] py-2 border-b border-black/5"
          >
            Global Flight Path Visualizer
          </button>

          <div className="pt-2 flex flex-col gap-3 text-xs text-[#5E5953]">
            <a href="tel:+971544325050" className="flex items-center gap-2 text-[#121212] font-medium">
              <Phone className="w-4 h-4 text-[#8C8377]" /> +971 54 432 5050
            </a>
            <a href="mailto:info@jeskojets.com" className="flex items-center gap-2 text-[#121212] font-medium">
              <Mail className="w-4 h-4 text-[#8C8377]" /> info@jeskojets.com
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full mt-2 py-3 bg-[#121212] text-white rounded-full font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2"
          >
            Book the Flight
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
