import React, { useState, useEffect } from 'react';
import { Plus, Minus, ShieldCheck, Clock, Utensils, Zap, Sparkles } from 'lucide-react';

const FRENCHIE_IMAGE = '/src/assets/images/luxury_jet_frenchie_1792240029596.jpg';
const DINING_IMAGE = '/src/assets/images/luxury_jet_dining_1792240030184.jpg';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
  image: string;
  imageAlt: string;
  tag: string;
}

const ITEMS: AccordionItem[] = [
  {
    id: 'pets',
    title: 'Pets',
    content:
      'Traveling with pets on a private jet means comfort and peace of mind for both owners and their companions. Our dedicated team ensures seamless arrangements, from documentation and safety to onboard care, so that your pet enjoys the same level of attention and luxury as you do. Every detail is managed to create a stress-free and enjoyable journey for everyone on board.',
    image: FRENCHIE_IMAGE,
    imageAlt: 'French bulldog sitting comfortably on private jet cream leather seat',
    tag: 'Pet-Friendly Jet Charter',
  },
  {
    id: 'availability',
    title: '24/7 availability',
    content:
      'Around-the-clock flight operations centers in Dubai, London, and Miami. Access to over 5,000 airports worldwide with aircraft wheels-up dispatch guaranteed in as little as 2 hours from confirmation, day or night.',
    image: FRENCHIE_IMAGE,
    imageAlt: '24/7 Global flight readiness',
    tag: 'Instant Global Dispatch',
  },
  {
    id: 'services',
    title: 'Onboard services',
    content:
      'Bespoke culinary journeys curated with Michelin-starred catering partners, temperature-controlled vintage champagne cellars, high-speed Ka-band satellite Wi-Fi, and personalized cabin climate zones tailored to your exact circadian rhythm.',
    image: DINING_IMAGE,
    imageAlt: 'VIP private dining service inside Gulfstream cabin',
    tag: 'Michelin-Grade In-flight Service',
  },
  {
    id: 'efficient',
    title: 'Efficient',
    content:
      'Direct ramp-side vehicle transfers right to the aircraft boarding stairs. Private VIP customs clearance with zero terminal delays and optimal Great Circle flight routing, saving up to 3 hours per intercontinental journey.',
    image: FRENCHIE_IMAGE,
    imageAlt: 'Seamless private ramp access and efficiency',
    tag: 'Zero-Queue Airport Experience',
  },
];

export const BetterWayToFly: React.FC = () => {
  const [openId, setOpenId] = useState<string>('pets');
  const [dubaiTime, setDubaiTime] = useState<string>('16:21');

  // Real-time Dubai clock (Asia/Dubai) as shown in the recording at 00:27
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setDubaiTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeItem = ITEMS.find((i) => i.id === openId) || ITEMS[0];

  return (
    <section id="advantages-section" className="py-28 bg-[#DDD4CA] text-[#121212] border-t border-black/5">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Accordion (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-mono-tabular uppercase tracking-widest text-[#736C63] mb-8 block">
              A BETTER WAY TO FLY
            </span>

            <div className="divide-y divide-black/10">
              {ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className="py-6 first:pt-0">
                    <button
                      onClick={() => setOpenId(isOpen ? '' : item.id)}
                      className="w-full flex items-center justify-between text-left group cursor-pointer"
                    >
                      <span className="font-display font-medium text-2xl sm:text-3xl text-[#121212] group-hover:text-black transition-colors">
                        {item.title}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-[#121212] transition-colors group-hover:border-black/30">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="mt-4 pr-6 animate-in fade-in duration-300">
                        <p className="text-sm sm:text-base leading-relaxed text-[#4A4641] max-w-xl">
                          {item.content}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Showcase (6 cols) matching video 00:27 */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/5 border border-black/10 aspect-[4/3] w-full">
              <img
                src={activeItem.image}
                alt={activeItem.imageAlt}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Inset Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Tag on Top Left */}
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-[#121212] border border-black/5">
                {activeItem.tag}
              </div>

              {/* Bottom Right Dubai Time Widget matching 00:27 */}
              <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg border border-black/10 flex items-center gap-4 text-[#121212]">
                <div className="text-right">
                  <p className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#736C63]">
                    LOCAL TIME
                  </p>
                  <p className="font-mono-tabular text-xl font-bold tracking-tight text-[#121212]">
                    {dubaiTime}
                  </p>
                </div>
                <div className="h-8 w-px bg-black/10" />
                <div>
                  <p className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#736C63]">
                    HEADQUARTERS
                  </p>
                  <p className="font-display text-sm font-semibold text-[#121212]">
                    DUBAI, UAE
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
