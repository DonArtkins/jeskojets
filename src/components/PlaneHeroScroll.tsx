import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Volume2, VolumeX, ChevronDown, Eye, Sliders } from 'lucide-react';
import { GulfstreamInteractiveJet } from './GulfstreamInteractiveJet';
import { Hotspot } from '../types';

const SKY_IMAGE = '/src/assets/images/luxury_sky_clouds_1792240029812.jpg';

interface PlaneHeroScrollProps {
  onOpenBooking: () => void;
}

export const PlaneHeroScroll: React.FC<PlaneHeroScrollProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [viewModeOverride, setViewModeOverride] = useState<'auto' | 'exterior' | 'cutaway'>('auto');
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Link scroll progress in container (420vh scroll distance for buttery smoothness)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [progressVal, setProgressVal] = useState<number>(0);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setProgressVal(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // SCROLL PROGRESS TIMELINE (0.0 to 1.0):
  // 0.00 - 0.15: Initial hero sky view, "Book the Flight" pill button visible.
  // 0.15 - 0.48: "Fly in Luxury" editorial typography slides in; jet nose enters from below and ascends to center.
  // 0.48 - 0.60: "Fly in Luxury" fades out; Gulfstream 650ER technical specs slide in on left/right.
  // 0.58 - 0.78: Wings and Rolls-Royce engines smoothly fade out! Fuselage dissolves into cabin interior cutaway!
  // 0.78 - 0.95: Full cabin interior cutaway and technical specs pinned and inspected.
  // 0.95 - 1.00: Aircraft gently scrolls up to make way for "A BETTER WAY TO FLY".

  // Sky Backdrop Opacity (Fades from 1 to 0 into warm luxury sandy beige)
  const skyOpacity = useTransform(scrollYProgress, [0.05, 0.35], [1, 0]);

  // Initial "Book the Flight" CTA pill opacity
  const initialCtaOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);

  // Plane vertical translation (ascends from 100vh below screen to center 0vh)
  const planeY = useTransform(
    scrollYProgress,
    [0.05, 0.42, 0.88, 1.0],
    ['92vh', '0vh', '0vh', '-35vh']
  );

  // Plane scale (slight responsive breathing for depth)
  const planeScale = useTransform(
    scrollYProgress,
    [0.05, 0.42, 0.65, 0.9],
    [0.9, 1.0, 0.96, 0.94]
  );

  // Stage 1 Editorial Typography ("Fly in" / "Luxury")
  const stage1Opacity = useTransform(
    scrollYProgress,
    [0.12, 0.22, 0.44, 0.52],
    [0, 1, 1, 0]
  );
  const stage1LeftX = useTransform(scrollYProgress, [0.12, 0.24], [-60, 0]);
  const stage1RightX = useTransform(scrollYProgress, [0.12, 0.24], [60, 0]);

  // Stage 2 Gulfstream 650ER Specs & Editorial Copy (Frames 00:21 - 00:24)
  const stage2Opacity = useTransform(
    scrollYProgress,
    [0.52, 0.62, 0.92, 1.0],
    [0, 1, 1, 0]
  );
  const stage2SpecsX = useTransform(scrollYProgress, [0.52, 0.62], [-40, 0]);
  const stage2RightX = useTransform(scrollYProgress, [0.52, 0.62], [40, 0]);

  // Continuous Wings Opacity Transform (Fade out as we enter cabin cutaway mode)
  const rawWingsOpacity = useTransform(scrollYProgress, [0.56, 0.72], [1, 0]);
  // Exterior Fuselage Opacity Transform (Dissolves into cabin interior)
  const rawExteriorOpacity = useTransform(scrollYProgress, [0.56, 0.72], [1, 0]);
  // Cabin Cutaway Opacity Transform
  const rawInteriorOpacity = useTransform(scrollYProgress, [0.56, 0.72], [0, 1]);

  // Calculated Opacity based on manual viewModeOverride
  const effectiveWingsOpacity =
    viewModeOverride === 'exterior' ? 1 :
    viewModeOverride === 'cutaway' ? 0 :
    progressVal <= 0.56 ? 1 :
    progressVal >= 0.72 ? 0 :
    1 - (progressVal - 0.56) / 0.16;

  const effectiveExteriorOpacity =
    viewModeOverride === 'exterior' ? 1 :
    viewModeOverride === 'cutaway' ? 0 :
    progressVal <= 0.56 ? 1 :
    progressVal >= 0.72 ? 0 :
    1 - (progressVal - 0.56) / 0.16;

  const effectiveInteriorOpacity =
    viewModeOverride === 'exterior' ? 0 :
    viewModeOverride === 'cutaway' ? 1 :
    progressVal <= 0.56 ? 0 :
    progressVal >= 0.72 ? 1 :
    (progressVal - 0.56) / 0.16;

  // Sound generator using Web Audio API
  const toggleSound = () => {
    if (!audioActive) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 220;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 1.2);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();

        setAudioActive(true);
      } catch (e) {
        console.error('Audio init error:', e);
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setAudioActive(false);
    }
  };

  const handleScrub = (targetProgress: number) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
    const targetScrollY = containerRef.current.offsetTop + totalHeight * targetProgress;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <section
      id="hero-plane"
      ref={containerRef}
      className="relative h-[420vh] bg-[#DDD4CA] select-none"
    >
      {/* Sticky Viewport Stage: Pinned in view as user scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Layer 1: Sky & Atmosphere Clouds (00:00 - 00:06) */}
        <motion.div
          style={{ opacity: skyOpacity }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <img
            src={SKY_IMAGE}
            alt="Atmospheric sky"
            className="w-full h-full object-cover object-top scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#C0D4E4]/40 via-white/20 to-[#DDD4CA]" />
        </motion.div>

        {/* Layer 2: Warm Sandy Taupe/Beige Tone (matching video 00:16-00:25) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E7E0D6] via-[#DDD4CA] to-[#D5CBBF] -z-10" />

        {/* Layer 3: Editorial Typography - Stage 1 ("Fly in" / "Luxury" at 00:06 - 00:18) */}
        <motion.div
          style={{ opacity: stage1Opacity }}
          className="absolute inset-0 max-w-[1440px] mx-auto px-6 sm:px-12 flex items-center justify-between pointer-events-none z-10"
        >
          {/* Left Block */}
          <motion.div style={{ x: stage1LeftX }} className="max-w-md pt-8">
            <h1 className="font-display font-medium text-6xl sm:text-7xl md:text-8xl tracking-tight text-[#141413] leading-[0.95]">
              Fly in
            </h1>
            <div className="mt-8 space-y-1 text-sm sm:text-base font-normal text-[#3E3A35] tracking-wide">
              <p className="font-medium text-lg text-[#141413]">Luxury</p>
              <p>that moves</p>
              <p>with you</p>
            </div>
          </motion.div>

          {/* Right Block */}
          <motion.div style={{ x: stage1RightX }} className="max-w-md pt-8 text-right flex flex-col items-end">
            <h2 className="font-display font-medium text-6xl sm:text-7xl md:text-8xl tracking-tight text-[#141413] leading-[0.95]">
              Luxury
            </h2>
            <div className="mt-8 max-w-sm text-left">
              <div className="flex items-center justify-between text-xs tracking-widest font-mono-tabular text-[#635C53] uppercase border-b border-black/10 pb-2 mb-3">
                <span className="font-semibold text-[#141413]">GULFSTREAM</span>
                <span>03/2016</span>
              </div>
              <p className="text-xs sm:text-[13px] leading-relaxed text-[#544F48]">
                Featuring wings designed to minimize anything that could disrupt its natural aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 A1-12 engines, the Gulfstream G650 is engineered for exceptional range and top-end speed.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Layer 4: Stage 2 Gulfstream 650ER Specifications & Cabin Narrative (00:21 - 00:24) */}
        <motion.div
          style={{ opacity: stage2Opacity }}
          className="absolute inset-0 max-w-[1440px] mx-auto px-6 sm:px-12 flex items-center justify-between pointer-events-none z-20"
        >
          {/* Left Specifications Column */}
          <motion.div
            style={{ x: stage2SpecsX }}
            className="w-[280px] sm:w-[320px] pointer-events-auto flex flex-col justify-center space-y-6 text-[#141413]"
          >
            <div>
              <span className="text-sm font-medium tracking-wide text-[#787066] uppercase">Gulfstream</span>
              <h3 className="font-display font-bold text-5xl sm:text-6xl tracking-tight text-[#141413] mt-0.5">
                650ER
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-left border-t border-black/10 pt-5">
              <div>
                <p className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#787066]">
                  MAXIMUM OPERATING RANGE
                </p>
                <p className="text-base sm:text-lg font-bold font-mono-tabular text-[#141413] mt-0.5">
                  11,263 KM
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#787066]">
                  SPEED
                </p>
                <p className="text-base sm:text-lg font-bold font-mono-tabular text-[#141413] mt-0.5">
                  488 KNOTS
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#787066]">
                  PASSENGERS
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#141413] mt-0.5">
                  UP TO 12 SEATS + 1 CABIN SERVICE
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#787066]">
                  ENDURANCE
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#141413] mt-0.5">
                  16 HRS - MAXIMUM FOR EUROPEAN BASED AIRCRAFT
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#787066]">
                  BAGGAGE CAPACITY
                </p>
                <p className="text-sm sm:text-base font-bold font-mono-tabular text-[#141413] mt-0.5">
                  5.52 M³
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono-tabular tracking-wider uppercase text-[#787066]">
                  CRUISING ALTITUDE
                </p>
                <p className="text-sm sm:text-base font-bold font-mono-tabular text-[#141413] mt-0.5">
                  15,544 M
                </p>
              </div>
            </div>

            {/* Dimensional Specifications */}
            <div className="border-t border-black/10 pt-4 text-xs font-mono-tabular">
              <p className="text-[10px] uppercase tracking-wider text-[#787066] mb-2 font-semibold">
                SPECIFICATION
              </p>
              <div className="flex items-center justify-between text-[#3E3A35] py-1 border-b border-black/5">
                <span>CABIN LENGTH</span>
                <span className="font-bold text-[#141413]">14.05 M</span>
              </div>
              <div className="flex items-center justify-between text-[#3E3A35] py-1 border-b border-black/5">
                <span>CABIN WIDTH</span>
                <span className="font-bold text-[#141413]">2.46 M</span>
              </div>
              <div className="flex items-center justify-between text-[#3E3A35] py-1">
                <span>CABIN HEIGHT</span>
                <span className="font-bold text-[#141413]">1.95 M</span>
              </div>
            </div>
          </motion.div>

          {/* Right Editorial Copy Column */}
          <motion.div
            style={{ x: stage2RightX }}
            className="w-[280px] sm:w-[320px] pointer-events-auto flex flex-col justify-center space-y-6 text-[#141413]"
          >
            <div>
              <p className="font-display text-2xl sm:text-3xl text-[#141413] leading-snug">
                Ultra-long-range
                <br />
                Aircraft
              </p>
              <p className="text-[11px] font-mono-tabular tracking-widest text-[#787066] uppercase mt-2">
                DIRECT ACCESS TO PRIVATE TRAVEL
              </p>
            </div>

            <div className="border-t border-black/10 pt-4">
              <p className="text-xs sm:text-[13px] leading-relaxed text-[#4F4A43]">
                A true time-saving machine: it brings Tokyo and New York an hour closer, and at 92% of the speed of sound, it can circle the globe with just a single stop.
              </p>
            </div>

            {/* Aircraft View Toggle Buttons */}
            <div className="pt-2">
              <p className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#787066] mb-2">
                AIRCRAFT PERSPECTIVE
              </p>
              <div className="inline-flex p-1 bg-black/5 rounded-full border border-black/10 text-xs">
                <button
                  onClick={() => setViewModeOverride('exterior')}
                  className={`px-3 py-1 rounded-full transition-all text-xs font-medium ${
                    viewModeOverride === 'exterior' || (viewModeOverride === 'auto' && progressVal < 0.6)
                      ? 'bg-white text-black shadow-xs font-semibold'
                      : 'text-[#696258] hover:text-black'
                  }`}
                >
                  3D Exterior
                </button>
                <button
                  onClick={() => setViewModeOverride('cutaway')}
                  className={`px-3 py-1 rounded-full transition-all text-xs font-medium ${
                    viewModeOverride === 'cutaway' || (viewModeOverride === 'auto' && progressVal >= 0.6)
                      ? 'bg-white text-black shadow-xs font-semibold'
                      : 'text-[#696258] hover:text-black'
                  }`}
                >
                  Cabin Seating
                </button>
                {viewModeOverride !== 'auto' && (
                  <button
                    onClick={() => setViewModeOverride('auto')}
                    className="px-2 py-1 text-[11px] text-[#8C8377] hover:text-black"
                    title="Return to scroll driven mode"
                  >
                    Auto
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ======================================================== */}
        {/* CENTER AIRCRAFT CARRIER: THE GULFSTREAM G650ER MOTION    */}
        {/* ======================================================== */}
        <motion.div
          style={{
            y: planeY,
            scale: planeScale,
          }}
          className="relative z-15 w-[360px] sm:w-[500px] md:w-[600px] lg:w-[680px] h-[82vh] flex items-center justify-center pointer-events-auto"
        >
          {/* Exact Gulfstream G650ER with independent Wings and Cabin Cutaway layers */}
          <GulfstreamInteractiveJet
            wingsOpacity={effectiveWingsOpacity}
            exteriorOpacity={effectiveExteriorOpacity}
            interiorOpacity={effectiveInteriorOpacity}
            selectedHotspot={selectedHotspot}
            onSelectHotspot={setSelectedHotspot}
            className="w-full h-full"
          />
        </motion.div>

        {/* Initial Floating Pill Button ("Book the Flight ↗") matching 00:00 - 00:05 */}
        <motion.div
          style={{
            opacity: initialCtaOpacity,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40"
        >
          <button
            onClick={onOpenBooking}
            className="group flex items-center gap-2.5 px-6 py-3 bg-white/90 hover:bg-white text-[#121212] rounded-full shadow-lg border border-black/10 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="font-display text-sm tracking-wide font-medium">Book the Flight</span>
            <div className="w-5 h-5 rounded-full bg-[#121212] text-white flex items-center justify-center transition-transform group-hover:rotate-45">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </motion.div>

        {/* Ambient Bottom Controls & Scrubber */}
        <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-[#736C63] z-30 pointer-events-auto">
          {/* Audio Ambiance Toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white border border-black/10 transition-colors shadow-xs cursor-pointer"
            title={audioActive ? 'Mute luxury cabin acoustics' : 'Enable ambient jet turbine hum'}
          >
            {audioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-black" />
                <span className="text-[11px] font-medium text-black">Acoustics: Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
                <span className="text-[11px]">Audio</span>
              </>
            )}
          </button>

          {/* Interactive Scrub / Phase Indicator */}
          <div className="hidden md:flex items-center gap-4 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-black/10 shadow-xs">
            <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#8A8175]">
              Animation Scrub
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScrub(0)}
                className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                  progressVal < 0.2 ? 'bg-black text-white font-medium' : 'hover:text-black'
                }`}
              >
                01. Sky Entrance
              </button>
              <button
                onClick={() => handleScrub(0.36)}
                className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                  progressVal >= 0.2 && progressVal < 0.58 ? 'bg-black text-white font-medium' : 'hover:text-black'
                }`}
              >
                02. Full 3D Jet
              </button>
              <button
                onClick={() => handleScrub(0.82)}
                className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                  progressVal >= 0.58 ? 'bg-black text-white font-medium' : 'hover:text-black'
                }`}
              >
                03. Cabin Cutaway
              </button>
            </div>
            <span className="font-mono-tabular text-[11px] font-medium text-black">
              {Math.round(progressVal * 100)}%
            </span>
          </div>

          {/* Scroll Down Prompt Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#736C63]">
            <span>Scroll to Fly</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
};
