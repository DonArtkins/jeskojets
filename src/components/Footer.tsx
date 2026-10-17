import React from 'react';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121212] text-[#ECE7E1] py-16 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-display font-medium text-3xl tracking-[0.2em] uppercase text-white">
              Jesko Jets
            </span>
            <p className="text-sm text-[#A8A196] leading-relaxed max-w-sm">
              Ultra-long-range private aviation designed for international executives and global leaders. Seamless point-to-point journeys across 150+ countries.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs font-mono-tabular text-[#CFC8BE]">
              <a href="tel:+971544325050" className="hover:text-white flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 opacity-60" /> +971 54 432 5050
              </a>
              <a href="mailto:info@jeskojets.com" className="hover:text-white flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 opacity-60" /> info@jeskojets.com
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <p className="font-mono-tabular uppercase tracking-wider text-[#736C63]">
              Navigation
            </p>
            <ul className="space-y-2 text-[#C7BFB5]">
              <li>
                <button onClick={() => scrollTo('hero-plane')} className="hover:text-white transition-colors">
                  Gulfstream 650ER Motion
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('fleet-section')} className="hover:text-white transition-colors">
                  Our Fleet Specifications
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('advantages-section')} className="hover:text-white transition-colors">
                  Pet Travel & Onboard Care
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('global-flight-path')} className="hover:text-white transition-colors">
                  Global Flight Path Visualizer
                </button>
              </li>
            </ul>
          </div>

          {/* Operations Hubs (4 cols) */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <p className="font-mono-tabular uppercase tracking-wider text-[#736C63]">
              Global Operations Centers
            </p>
            <div className="space-y-2 text-[#A8A196]">
              <p><strong className="text-white">Dubai:</strong> DIFC Gate Precinct 4, Dubai, UAE</p>
              <p><strong className="text-white">London:</strong> Farnborough Airport Terminal, Hampshire, UK</p>
              <p><strong className="text-white">Miami:</strong> Opa-Locka Executive Airport, FL, USA</p>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#121212] hover:bg-[#ECE7E1] rounded-full text-xs font-medium uppercase tracking-wider transition-transform hover:scale-105"
              >
                <span>Book the Flight</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal / Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#736C63] font-mono-tabular gap-4">
          <p>© 2026 Jesko Jets Charter Aviation. All rights reserved.</p>
          <p>EASA & FAA Part 135 Worldwide Air Carrier Standards · Wyvern Wingman & ARGUS Platinum</p>
        </div>
      </div>
    </footer>
  );
};
