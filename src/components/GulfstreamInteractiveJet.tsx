import React from 'react';
import { AIRCRAFT_HOTSPOTS } from '../data/airports';
import { Hotspot } from '../types';

interface GulfstreamInteractiveJetProps {
  wingsOpacity: number; // 1 to 0 (wings & engines fade out in stage 2)
  exteriorOpacity: number; // 1 to 0 (metallic fuselage exterior)
  interiorOpacity: number; // 0 to 1 (cabin cutaway floor plan)
  selectedHotspot?: Hotspot | null;
  onSelectHotspot?: (hotspot: Hotspot | null) => void;
  className?: string;
}

export const GulfstreamInteractiveJet: React.FC<GulfstreamInteractiveJetProps> = ({
  wingsOpacity = 1,
  exteriorOpacity = 1,
  interiorOpacity = 0,
  selectedHotspot,
  onSelectHotspot,
  className = '',
}) => {
  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <svg
        viewBox="0 0 800 1000"
        className="w-full h-full overflow-visible drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Champagne & Pearl Paint Gradients */}
          <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A8275" />
            <stop offset="15%" stopColor="#D4C9BC" />
            <stop offset="38%" stopColor="#F5EFE6" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="62%" stopColor="#E8DFD5" />
            <stop offset="85%" stopColor="#B3A89A" />
            <stop offset="100%" stopColor="#7A7266" />
          </linearGradient>

          <linearGradient id="fuselageShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#E3DCD3" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#CDC4B7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9C9284" stopOpacity="0.6" />
          </linearGradient>

          {/* Swept Wing Gradients */}
          <linearGradient id="leftWingGrad" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#BDB4A8" />
            <stop offset="30%" stopColor="#DDD4C8" />
            <stop offset="65%" stopColor="#EDE6DC" />
            <stop offset="90%" stopColor="#C4B9AC" />
            <stop offset="100%" stopColor="#9E9486" />
          </linearGradient>

          <linearGradient id="rightWingGrad" x1="100%" y1="0%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#BDB4A8" />
            <stop offset="30%" stopColor="#DDD4C8" />
            <stop offset="65%" stopColor="#EDE6DC" />
            <stop offset="90%" stopColor="#C4B9AC" />
            <stop offset="100%" stopColor="#9E9486" />
          </linearGradient>

          {/* Rolls-Royce Engine Nacelle Gradients */}
          <linearGradient id="engineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6E665A" />
            <stop offset="25%" stopColor="#D8CEC2" />
            <stop offset="55%" stopColor="#F7F2EB" />
            <stop offset="80%" stopColor="#C4B9AB" />
            <stop offset="100%" stopColor="#5E564B" />
          </linearGradient>

          {/* Cockpit Window Glare */}
          <linearGradient id="cockpitGlass" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0B131C" />
            <stop offset="50%" stopColor="#1E2E3D" />
            <stop offset="85%" stopColor="#355269" />
            <stop offset="100%" stopColor="#0A121A" />
          </linearGradient>

          {/* Shadow Filter */}
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="16" />
            <feOffset dx="0" dy="24" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.22" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* GROUP 1: WINGS, WINGLETS, ROLLS-ROYCE ENGINES & T-TAIL  */}
        {/* Fades smoothly to 0 in Stage 2 (Specs & Cabin Blueprint) */}
        {/* ======================================================== */}
        <g
          id="wings-and-engines-group"
          style={{
            opacity: wingsOpacity,
            transition: 'opacity 0.15s ease-out',
            transformOrigin: '400px 500px',
          }}
        >
          {/* Aerodynamic Wing Drop Shadows */}
          <path
            d="M 368 470 L 70 655 L 75 665 L 140 645 L 368 590 Z"
            fill="rgba(0,0,0,0.12)"
            filter="blur(12px)"
          />
          <path
            d="M 432 470 L 730 655 L 725 665 L 660 645 L 432 590 Z"
            fill="rgba(0,0,0,0.12)"
            filter="blur(12px)"
          />

          {/* LEFT SWEPT WING */}
          {/* Leading edge starts at root (368, 460), sweeps out to winglet (60, 640) */}
          <path
            d="M 368 460 
               L 80 635 
               L 65 628 
               L 55 645 
               L 85 650 
               L 160 632 
               L 260 608 
               L 368 585 Z"
            fill="url(#leftWingGrad)"
            stroke="#948B7E"
            strokeWidth="0.8"
          />

          {/* Left Winglet (Angled upward aerodynamic fin) */}
          <path
            d="M 65 628 L 52 590 L 62 593 L 78 638 Z"
            fill="#D5CBC0"
            stroke="#7C7366"
            strokeWidth="0.8"
          />
          {/* Left Wingtip Navigation Light (Red) */}
          <circle cx="52" cy="590" r="2.5" fill="#EF4444" />

          {/* Left Wing Panel Lines & Flap Fairings */}
          <line x1="368" y1="510" x2="160" y2="618" stroke="#A89E91" strokeWidth="0.75" strokeDasharray="6,4" />
          <line x1="368" y1="545" x2="210" y2="615" stroke="#A89E91" strokeWidth="0.75" />
          {/* Flap Track Fairing Canoes */}
          <rect x="220" y="605" width="6" height="26" rx="3" fill="#B3A89A" stroke="#877D70" strokeWidth="0.5" />
          <rect x="290" y="585" width="6" height="26" rx="3" fill="#B3A89A" stroke="#877D70" strokeWidth="0.5" />

          {/* RIGHT SWEPT WING */}
          <path
            d="M 432 460 
               L 720 635 
               L 735 628 
               L 745 645 
               L 715 650 
               L 640 632 
               L 540 608 
               L 432 585 Z"
            fill="url(#rightWingGrad)"
            stroke="#948B7E"
            strokeWidth="0.8"
          />

          {/* Right Winglet (Angled upward aerodynamic fin) */}
          <path
            d="M 735 628 L 748 590 L 738 593 L 722 638 Z"
            fill="#D5CBC0"
            stroke="#7C7366"
            strokeWidth="0.8"
          />
          {/* Right Wingtip Navigation Light (Green) */}
          <circle cx="748" cy="590" r="2.5" fill="#10B981" />

          {/* Right Wing Panel Lines & Flap Fairings */}
          <line x1="432" y1="510" x2="640" y2="618" stroke="#A89E91" strokeWidth="0.75" strokeDasharray="6,4" />
          <line x1="432" y1="545" x2="590" y2="615" stroke="#A89E91" strokeWidth="0.75" />
          <rect x="574" y="605" width="6" height="26" rx="3" fill="#B3A89A" stroke="#877D70" strokeWidth="0.5" />
          <rect x="504" y="585" width="6" height="26" rx="3" fill="#B3A89A" stroke="#877D70" strokeWidth="0.5" />

          {/* Aircraft Registration Code on Right Wing as in recording ("G-LXRY") */}
          <text
            x="615"
            y="575"
            fill="#807669"
            fontSize="14"
            fontFamily="'Space Mono', monospace"
            fontWeight="bold"
            letterSpacing="2"
            transform="rotate(-18 615 575)"
          >
            G-LXRY
          </text>

          {/* ENGINE PYLONS (Connect nacelles to aft fuselage) */}
          <rect x="316" y="695" width="56" height="18" rx="4" fill="#A89E90" stroke="#70685D" strokeWidth="0.8" />
          <rect x="428" y="695" width="56" height="18" rx="4" fill="#A89E90" stroke="#70685D" strokeWidth="0.8" />

          {/* LEFT ROLLS-ROYCE BR725 ENGINE NACELLE */}
          <g id="left-engine">
            {/* Nacelle Body */}
            <path
              d="M 305 648 
                 C 305 638, 345 638, 345 648 
                 L 347 755 
                 C 347 768, 303 768, 303 755 Z"
              fill="url(#engineGrad)"
              stroke="#7E7568"
              strokeWidth="0.8"
            />
            {/* Chrome Intake Lip Ring */}
            <ellipse cx="325" cy="648" rx="20" ry="8" fill="#3D3830" stroke="#EFE9E0" strokeWidth="2.5" />
            <ellipse cx="325" cy="648" rx="14" ry="5" fill="#141413" />
            {/* Turbine Spinner */}
            <circle cx="325" cy="648" r="4" fill="#C2B8AC" />
            {/* Exhaust Cone */}
            <path d="M 312 755 L 325 780 L 338 755 Z" fill="#2E2A24" stroke="#5E574D" strokeWidth="0.6" />
          </g>

          {/* RIGHT ROLLS-ROYCE BR725 ENGINE NACELLE */}
          <g id="right-engine">
            <path
              d="M 455 648 
                 C 455 638, 495 638, 495 648 
                 L 497 755 
                 C 497 768, 453 768, 453 755 Z"
              fill="url(#engineGrad)"
              stroke="#7E7568"
              strokeWidth="0.8"
            />
            <ellipse cx="475" cy="648" rx="20" ry="8" fill="#3D3830" stroke="#EFE9E0" strokeWidth="2.5" />
            <ellipse cx="475" cy="648" rx="14" ry="5" fill="#141413" />
            <circle cx="475" cy="648" r="4" fill="#C2B8AC" />
            <path d="M 462 755 L 475 780 L 488 755 Z" fill="#2E2A24" stroke="#5E574D" strokeWidth="0.6" />
          </g>

          {/* T-TAIL HORIZONTAL STABILIZER & ELEVATORS */}
          <path
            d="M 400 855 
               L 260 895 
               L 255 918 
               L 390 905 
               L 400 918 
               L 410 905 
               L 545 918 
               L 540 895 Z"
            fill="url(#engineGrad)"
            stroke="#877E71"
            strokeWidth="0.8"
          />
          {/* Elevator Hinge Lines */}
          <line x1="262" y1="908" x2="390" y2="898" stroke="#756D60" strokeWidth="0.75" />
          <line x1="538" y1="908" x2="410" y2="898" stroke="#756D60" strokeWidth="0.75" />
        </g>

        {/* ======================================================== */}
        {/* GROUP 2: FUSELAGE EXTERIOR (METALLIC CHAMPAGNE PAINT)   */}
        {/* Fades out in Stage 2 to reveal Interior Seating Cutaway   */}
        {/* ======================================================== */}
        <g
          id="fuselage-exterior"
          style={{
            opacity: exteriorOpacity,
            transition: 'opacity 0.15s ease-out',
          }}
        >
          {/* Fuselage Silhouette Path */}
          <path
            d="M 400 85 
               C 382 110, 368 165, 368 250 
               L 368 760 
               C 368 815, 385 870, 400 915 
               C 415 870, 432 815, 432 760 
               L 432 250 
               C 432 165, 418 110, 400 85 Z"
            fill="url(#fuselageGrad)"
            stroke="#8A8275"
            strokeWidth="0.9"
          />

          {/* Fuselage Centerline Specular Highlight */}
          <path
            d="M 400 95 L 400 900"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeOpacity="0.45"
            filter="blur(1px)"
          />

          {/* COCKPIT WINDSHIELD (4 Curved Aerodynamic Glass Panes) */}
          <g id="cockpit-windows">
            {/* Left Captain Pane */}
            <path
              d="M 398 135 L 378 152 L 376 168 L 398 156 Z"
              fill="url(#cockpitGlass)"
              stroke="#546575"
              strokeWidth="0.8"
            />
            {/* Right First Officer Pane */}
            <path
              d="M 402 135 L 422 152 L 424 168 L 402 156 Z"
              fill="url(#cockpitGlass)"
              stroke="#546575"
              strokeWidth="0.8"
            />
            {/* Left Brow Window */}
            <path
              d="M 374 156 L 369 170 L 373 173 L 376 168 Z"
              fill="url(#cockpitGlass)"
            />
            {/* Right Brow Window */}
            <path
              d="M 426 156 L 431 170 L 427 173 L 424 168 Z"
              fill="url(#cockpitGlass)"
            />
          </g>

          {/* GULFSTREAM SIGNATURE PANORAMIC OVAL WINDOWS (16 per side) */}
          <g id="exterior-windows" fill="#1A2530" stroke="#D1C6B8" strokeWidth="0.6">
            {[230, 260, 290, 320, 350, 380, 410, 440, 470, 500, 530, 560, 590, 620, 650, 680].map((yVal, i) => (
              <React.Fragment key={i}>
                {/* Left side window */}
                <ellipse cx="370" cy={yVal} rx="2.4" ry="4.5" />
                {/* Right side window */}
                <ellipse cx="430" cy={yVal} rx="2.4" ry="4.5" />
              </React.Fragment>
            ))}
          </g>

          {/* Vertical Fin Dorsal Fairing */}
          <path
            d="M 397 740 L 400 710 L 403 740 L 402 880 L 398 880 Z"
            fill="#BDB3A6"
            stroke="#8A8275"
            strokeWidth="0.6"
          />
        </g>

        {/* ======================================================== */}
        {/* GROUP 3: INTERIOR CABIN CUTAWAY (SEATS, TABLES, BED)     */}
        {/* Fades in in Stage 2 (Matching Recording Frames 00:22-25)  */}
        {/* ======================================================== */}
        <g
          id="fuselage-interior-cutaway"
          style={{
            opacity: interiorOpacity,
            transition: 'opacity 0.15s ease-out',
          }}
        >
          {/* Fuselage Structural Outer Hull (Clean Architectural Outline) */}
          <path
            d="M 400 85 
               C 382 110, 368 165, 368 250 
               L 368 760 
               C 368 815, 385 870, 400 915 
               C 415 870, 432 815, 432 760 
               L 432 250 
               C 432 165, 418 110, 400 85 Z"
            fill="#FAF7F2"
            stroke="#33302B"
            strokeWidth="2"
          />

          {/* Insulation / Cabin Wall Inner Margin */}
          <path
            d="M 400 92 
               C 384 115, 372 168, 372 250 
               L 372 755 
               C 372 805, 386 860, 400 905 
               C 414 860, 428 805, 428 755 
               L 428 250 
               C 428 168, 416 115, 400 92 Z"
            fill="#F4ECE1"
            stroke="#CFC4B6"
            strokeWidth="1"
          />

          {/* Center Cabin Aisle Runner Carpet */}
          <rect x="393" y="195" width="14" height="665" fill="#E8DED1" />

          {/* Radome Nose Compartment */}
          <path d="M 400 88 C 386 108, 376 130, 373 145 L 427 145 C 424 130, 414 108, 400 88 Z" fill="#E5DCCE" />
          <line x1="373" y1="145" x2="427" y2="145" stroke="#33302B" strokeWidth="1.5" />
          <text x="400" y="125" fill="#786F62" fontSize="7" fontFamily="'Space Mono', monospace" textAnchor="middle">RADOME</text>

          {/* 1. COCKPIT FLIGHT DECK (Y=145 to Y=210) */}
          <g id="interior-cockpit">
            {/* Instrument Glare Shield */}
            <path d="M 374 150 C 386 147, 414 147, 426 150 L 426 160 C 414 158, 386 158, 374 160 Z" fill="#2B2A27" />
            <text x="400" y="157" fill="#8C8375" fontSize="6" fontFamily="'Space Mono', monospace" textAnchor="middle">AVIONICS</text>
            
            {/* Captain Seat (Left) */}
            <rect x="376" y="166" width="15" height="18" rx="3" fill="#D6CBBF" stroke="#2B2A27" strokeWidth="1" />
            <rect x="378" y="163" width="11" height="4" rx="1.5" fill="#5E564A" />
            {/* First Officer Seat (Right) */}
            <rect x="409" y="166" width="15" height="18" rx="3" fill="#D6CBBF" stroke="#2B2A27" strokeWidth="1" />
            <rect x="411" y="163" width="11" height="4" rx="1.5" fill="#5E564A" />
            {/* Center Pedestal Console */}
            <rect x="394" y="167" width="12" height="22" fill="#3D3A35" stroke="#2B2A27" strokeWidth="0.8" />
            {/* Flight Deck Bulkhead Divider Door */}
            <line x1="372" y1="205" x2="428" y2="205" stroke="#33302B" strokeWidth="1.5" />
          </g>

          {/* 2. FORWARD GALLEY & CREW LAVATORY (Y=205 to Y=280) */}
          <g id="interior-galley">
            {/* Galley Prep Counter & Storage (Right) */}
            <rect x="408" y="210" width="18" height="55" fill="#E2D7C8" stroke="#33302B" strokeWidth="1" />
            <rect x="411" y="215" width="12" height="10" fill="#BDB09E" />
            <circle cx="417" cy="235" r="3" fill="#A89A86" />
            <rect x="411" y="245" width="12" height="14" fill="#BDB09E" />

            {/* Crew Rest / Storage (Left) */}
            <rect x="374" y="210" width="16" height="55" fill="#E2D7C8" stroke="#33302B" strokeWidth="1" />
            <line x1="374" y1="237" x2="390" y2="237" stroke="#33302B" strokeWidth="0.8" />
            {/* Passenger Cabin Acoustic Bulkhead */}
            <line x1="372" y1="275" x2="428" y2="275" stroke="#33302B" strokeWidth="1.5" />
          </g>

          {/* 3. FORWARD CABIN: 4 VIP CLUB SEATS (Y=280 to Y=430) */}
          <g id="interior-club-seats">
            {/* Seat 1 (Forward Left) */}
            <rect x="375" y="285" width="17" height="20" rx="3" fill="#EDE4D8" stroke="#2B2A27" strokeWidth="1.2" />
            <rect x="377" y="303" width="13" height="4" rx="1.5" fill="#8C7F6E" />
            {/* Seat 2 (Aft Left, facing Seat 1) */}
            <rect x="375" y="350" width="17" height="20" rx="3" fill="#EDE4D8" stroke="#2B2A27" strokeWidth="1.2" />
            <rect x="377" y="348" width="13" height="4" rx="1.5" fill="#8C7F6E" />
            {/* Fold-Out Walnut Table Left */}
            <rect x="374" y="316" width="18" height="24" rx="2" fill="#9C6B46" stroke="#2B2A27" strokeWidth="1" />

            {/* Seat 3 (Forward Right) */}
            <rect x="408" y="285" width="17" height="20" rx="3" fill="#EDE4D8" stroke="#2B2A27" strokeWidth="1.2" />
            <rect x="410" y="303" width="13" height="4" rx="1.5" fill="#8C7F6E" />
            {/* Seat 4 (Aft Right, facing Seat 3) */}
            <rect x="408" y="350" width="17" height="20" rx="3" fill="#EDE4D8" stroke="#2B2A27" strokeWidth="1.2" />
            <rect x="410" y="348" width="13" height="4" rx="1.5" fill="#8C7F6E" />
            {/* Fold-Out Walnut Table Right */}
            <rect x="408" y="316" width="18" height="24" rx="2" fill="#9C6B46" stroke="#2B2A27" strokeWidth="1" />
          </g>

          {/* 4. MID CABIN: CONFERENCE DINING TABLE & SUITE (Y=420 to Y=580) */}
          <g id="interior-conference">
            <line x1="372" y1="415" x2="428" y2="415" stroke="#C4B7A6" strokeWidth="1" strokeDasharray="3,3" />

            {/* 4-Place Dining Table Center-Left */}
            <rect x="374" y="445" width="22" height="44" rx="3" fill="#8F5C37" stroke="#2B2A27" strokeWidth="1.2" />
            {/* Dining Table Place Settings */}
            <circle cx="385" cy="457" r="3" fill="#FAF7F2" stroke="#42392E" strokeWidth="0.5" />
            <circle cx="385" cy="477" r="3" fill="#FAF7F2" stroke="#42392E" strokeWidth="0.5" />

            {/* Dining Armchairs */}
            <rect x="375" y="423" width="16" height="16" rx="3" fill="#EDE4D8" stroke="#2B2A27" strokeWidth="1.2" />
            <rect x="375" y="495" width="16" height="16" rx="3" fill="#EDE4D8" stroke="#2B2A27" strokeWidth="1.2" />

            {/* Opposite Credenza & Entertainment Center (Right) */}
            <rect x="410" y="435" width="16" height="65" rx="2" fill="#A1744D" stroke="#2B2A27" strokeWidth="1" />
            <text x="418" y="470" fill="#FAF7F2" fontSize="5" fontFamily="'Space Mono', monospace" textAnchor="middle" transform="rotate(90 418 470)">CREDENZA</text>
          </g>

          {/* 5. AFT PRIVATE STATEROOM SUITE WITH BERTHING DIVAN (Y=580 to Y=730) */}
          <g id="interior-stateroom">
            {/* Solid Privacy Bulkhead Divider with Sliding Door */}
            <line x1="372" y1="575" x2="428" y2="575" stroke="#33302B" strokeWidth="1.8" />
            
            {/* 3-Seat Berthing Divan Sofa (Left) - Converts to Double Bed! */}
            <rect x="374" y="590" width="19" height="75" rx="4" fill="#E8DEC8" stroke="#2B2A27" strokeWidth="1.2" />
            {/* Divan Cushions */}
            <line x1="374" y1="615" x2="393" y2="615" stroke="#8C7D68" strokeWidth="0.8" />
            <line x1="374" y1="640" x2="393" y2="640" stroke="#8C7D68" strokeWidth="0.8" />
            {/* Pillows */}
            <rect x="375" y="592" width="17" height="8" rx="2" fill="#C2B199" />
            <rect x="375" y="655" width="17" height="8" rx="2" fill="#C2B199" />

            {/* Executive Armchair (Right) */}
            <rect x="408" y="605" width="18" height="20" rx="3" fill="#EDE4D8" stroke="#2B2A27" strokeWidth="1.2" />
            <rect x="410" y="623" width="14" height="4" rx="1.5" fill="#8C7F6E" />
            {/* Personal Coffee Table */}
            <rect x="409" y="635" width="17" height="15" rx="2" fill="#9C6B46" stroke="#2B2A27" strokeWidth="0.8" />
          </g>

          {/* 6. AFT MASTER LAVATORY & BAGGAGE BAY (Y=730 to Y=870) */}
          <g id="interior-lavatory">
            <line x1="372" y1="730" x2="428" y2="730" stroke="#33302B" strokeWidth="1.8" />

            {/* VIP Restroom Area */}
            <rect x="374" y="736" width="22" height="36" fill="#F0E8DC" stroke="#33302B" strokeWidth="1" />
            {/* Porcelain Toilet Bowl */}
            <ellipse cx="385" cy="752" rx="6" ry="8" fill="#FFFFFF" stroke="#33302B" strokeWidth="0.8" />
            {/* Vanity Sink & Mirror */}
            <rect x="405" y="736" width="21" height="24" fill="#D6C7B4" stroke="#33302B" strokeWidth="1" />
            <ellipse cx="415" cy="748" rx="4" ry="4" fill="#FFFFFF" stroke="#33302B" strokeWidth="0.6" />

            {/* In-Flight Accessible Baggage Bay */}
            <line x1="372" y1="785" x2="428" y2="785" stroke="#33302B" strokeWidth="1.5" />
            <path d="M 374 790 L 426 790 L 418 850 L 382 850 Z" fill="#E0D6C8" stroke="#33302B" strokeWidth="1" />
            <text x="400" y="825" fill="#695F52" fontSize="7" fontFamily="'Space Mono', monospace" textAnchor="middle">BAGGAGE 5.52 M³</text>
          </g>

          {/* Panoramic Windows on Cutaway Margin */}
          {[230, 260, 290, 320, 350, 380, 410, 440, 470, 500, 530, 560, 590, 620, 650, 680].map((yVal, i) => (
            <React.Fragment key={`win-${i}`}>
              <rect x="367" y={yVal - 4} width="4" height="8" rx="2" fill="#FFFFFF" stroke="#33302B" strokeWidth="0.8" />
              <rect x="429" y={yVal - 4} width="4" height="8" rx="2" fill="#FFFFFF" stroke="#33302B" strokeWidth="0.8" />
            </React.Fragment>
          ))}
        </g>
      </svg>
    </div>
  );
};
