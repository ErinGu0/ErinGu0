import React from 'react';
import { motion } from 'framer-motion';

// Delicate line-art sea life in translucent white, matching the foam and
// shimmer tones. Everything is stroke-first with a whisper of fill so the
// creatures read as living outlines drifting through the water, never as
// stickers pasted on top of it.

const STROKE = 'rgba(240,253,255,0.65)';
const FILL = 'rgba(255,255,255,0.07)';

// Top-down sea turtle, head pointing up (-y); rotate +/-90deg to swim
// horizontally.
export function TurtleSVG({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="-30 -30 60 60" fill="none">
      <g stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill={FILL}>
        {/* head */}
        <circle cx="0" cy="-22" r="5" />
        {/* front flippers */}
        <path d="M-11,-9 C-21,-15 -28,-8 -22,-1 C-18,3 -12,-1 -11,-6 Z" />
        <path d="M11,-9 C21,-15 28,-8 22,-1 C18,3 12,-1 11,-6 Z" />
        {/* rear flippers */}
        <path d="M-9,13 C-15,20 -10,25 -5,19 C-3,16 -5,14 -9,13 Z" />
        <path d="M9,13 C15,20 10,25 5,19 C3,16 5,14 9,13 Z" />
        {/* tail */}
        <path d="M-2,17 L0,25 L2,17 Z" />
        {/* shell on top so its outline stays clean */}
        <ellipse cx="0" cy="1" rx="13" ry="17" />
        {/* shell scute pattern */}
        <path d="M-8,-8 Q0,-12 8,-8 M-10,1 Q0,-3 10,1 M-8,10 Q0,6 8,10" fill="none" strokeOpacity="0.55" />
      </g>
    </svg>
  );
}

// Side-view fish pointing right; scaleX(-1) to swim left.
export function FishSVG({ size = 30 }) {
  const h = size * 0.6;
  return (
    <svg width={size} height={h} viewBox="-20 -12 40 24" fill="none">
      <g stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill={FILL}>
        {/* tail */}
        <path d="M-8,0 L-16,-6 C-13.5,-2 -13.5,2 -16,6 Z" />
        {/* body */}
        <path d="M12,0 C8,-6 -2,-7 -8,-3 C-10,-1.5 -10,1.5 -8,3 C-2,7 8,6 12,0 Z" />
        {/* dorsal fin */}
        <path d="M0,-4.5 C2,-8 6,-7 5,-3.5" fill="none" />
        {/* eye */}
        <circle cx="8" cy="-1.5" r="1" fill={STROKE} stroke="none" />
      </g>
    </svg>
  );
}

// One creature drifting across the scene: a slow linear traverse with a
// gentle bob/wiggle layered on top. Negative delays start each swimmer
// mid-journey so the water is already populated on load.
function Swimmer({ top, duration, delay, direction = 'right', bob = 8, bobDuration = 6, wiggle = 3, opacity = 0.5, children }) {
  const xRange = direction === 'right' ? ['-8vw', '108vw'] : ['108vw', '-8vw'];
  return (
    <motion.div
      className="absolute left-0"
      style={{ top }}
      animate={{ x: xRange }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, -bob, 0], rotate: [-wiggle, wiggle, -wiggle] }}
        transition={{ duration: bobDuration, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// The hero's cast: turtles gliding through open water and along the sand,
// lone fish, and a little school swimming the other way.
export default function SeaCreatures() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* big turtle cruising the open water */}
      <Swimmer top="38%" duration={75} delay={-30} direction="right" bob={9} bobDuration={7} wiggle={2} opacity={0.55}>
        <div style={{ transform: 'rotate(90deg)' }}>
          <TurtleSVG size={48} />
        </div>
      </Swimmer>

      {/* lone fish heading the other way */}
      <Swimmer top="52%" duration={48} delay={-12} direction="left" bob={7} bobDuration={4.5} wiggle={4} opacity={0.5}>
        <div style={{ transform: 'scaleX(-1)' }}>
          <FishSVG size={30} />
        </div>
      </Swimmer>

      {/* small school keeping loose formation */}
      <Swimmer top="60%" duration={55} delay={-40} direction="right" bob={6} bobDuration={3.8} wiggle={4} opacity={0.45}>
        <div className="relative">
          <FishSVG size={18} />
          <div className="absolute" style={{ left: -26, top: 10 }}><FishSVG size={15} /></div>
          <div className="absolute" style={{ left: -14, top: -12 }}><FishSVG size={13} /></div>
        </div>
      </Swimmer>

      {/* solo fish deeper down */}
      <Swimmer top="70%" duration={62} delay={-5} direction="right" bob={5} bobDuration={5} wiggle={3} opacity={0.4}>
        <FishSVG size={24} />
      </Swimmer>

      {/* little turtle making its way along the beach */}
      <Swimmer top="85%" duration={95} delay={-50} direction="left" bob={3} bobDuration={8} wiggle={2} opacity={0.5}>
        <div style={{ transform: 'rotate(-90deg)' }}>
          <TurtleSVG size={32} />
        </div>
      </Swimmer>
    </div>
  );
}
