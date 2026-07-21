import React, { useId } from 'react';
import { motion } from 'framer-motion';

// Delicate line-art sea life with a pearlescent, glittery finish: strokes
// are drawn with a soft aqua-to-pearl gradient instead of flat white, and
// each creature carries a couple of twinkling glints so they catch the
// light as they drift. Still stroke-first with a whisper of fill so they
// read as living outlines, never stickers.

const FILL = 'rgba(255,255,255,0.07)';

// Shared pearlescent gradient defs. Each SVG instance gets its own ids via
// useId so gradients keep resolving even after other instances (e.g. the
// hero) unmount.
function PearlDefs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(240,253,255,0.85)" />
        <stop offset="45%" stopColor="rgba(167,243,255,0.7)" />
        <stop offset="100%" stopColor="rgba(224,249,255,0.55)" />
      </linearGradient>
      <radialGradient id={`${id}-glow`}>
        <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
        <stop offset="100%" stopColor="rgba(167,243,255,0)" />
      </radialGradient>
    </defs>
  );
}

// A tiny twinkling glint pinned to a spot on a creature's body.
function Glint({ cx, cy, r = 1.6, delay = 0, fill }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.3, 0.4] }}
      transition={{ duration: 2.6, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

// Top-down sea turtle, head pointing up (-y); rotate +/-90deg to swim
// horizontally.
export function TurtleSVG({ size = 44 }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="-30 -30 60 60" fill="none" style={{ overflow: 'visible' }}>
      <PearlDefs id={id} />
      <g stroke={`url(#${id}-stroke)`} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill={FILL}>
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
      <Glint cx={-6} cy={-4} fill={`url(#${id}-glow)`} r={2.4} delay={0.4} />
      <Glint cx={7} cy={8} fill={`url(#${id}-glow)`} r={1.8} delay={1.6} />
    </svg>
  );
}

// Side-view fish pointing right; scaleX(-1) to swim left.
export function FishSVG({ size = 30 }) {
  const id = useId();
  const h = size * 0.6;
  return (
    <svg width={size} height={h} viewBox="-20 -12 40 24" fill="none" style={{ overflow: 'visible' }}>
      <PearlDefs id={id} />
      <g stroke={`url(#${id}-stroke)`} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill={FILL}>
        {/* tail */}
        <path d="M-8,0 L-16,-6 C-13.5,-2 -13.5,2 -16,6 Z" />
        {/* body */}
        <path d="M12,0 C8,-6 -2,-7 -8,-3 C-10,-1.5 -10,1.5 -8,3 C-2,7 8,6 12,0 Z" />
        {/* scale shimmer lines */}
        <path d="M-2,-3.5 C0,-1.5 0,1.5 -2,3.5 M3,-4 C5,-1.8 5,1.8 3,4" fill="none" strokeOpacity="0.4" strokeWidth="1" />
        {/* dorsal fin */}
        <path d="M0,-4.5 C2,-8 6,-7 5,-3.5" fill="none" />
        {/* eye */}
        <circle cx="8" cy="-1.5" r="1" fill="rgba(240,253,255,0.8)" stroke="none" />
      </g>
      <Glint cx={2} cy={-1} fill={`url(#${id}-glow)`} r={2} delay={0.9} />
    </svg>
  );
}

// Jellyfish drifting upright - a soft bell with trailing tentacles and a
// faint inner glow, for the deeper sections.
export function JellyfishSVG({ size = 36, glow = 'rgba(167,243,255,0.25)' }) {
  const id = useId();
  return (
    <svg width={size} height={size * 1.5} viewBox="-18 -14 36 54" fill="none" style={{ overflow: 'visible' }}>
      <PearlDefs id={id} />
      {/* inner bioluminescent glow */}
      <motion.ellipse
        cx="0" cy="-4" rx="11" ry="9"
        fill={glow}
        style={{ filter: 'blur(4px)' }}
        animate={{ opacity: [0.35, 0.8, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <g stroke={`url(#${id}-stroke)`} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill={FILL}>
        {/* bell */}
        <path d="M-13,0 C-13,-12 13,-12 13,0 C9,3 4,4 0,4 C-4,4 -9,3 -13,0 Z" />
        {/* frill */}
        <path d="M-13,0 Q-10,3 -7,1 Q-4,4 0,2 Q4,4 7,1 Q10,3 13,0" fill="none" strokeOpacity="0.55" />
      </g>
      {/* tentacles, swaying gently */}
      {[-8, -3, 2, 7].map((x, i) => (
        <motion.path
          key={i}
          d={`M${x},4 C${x - 2},14 ${x + 2},22 ${x - 1},32`}
          stroke={`url(#${id}-stroke)`}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          strokeOpacity="0.6"
          animate={{ d: [
            `M${x},4 C${x - 2},14 ${x + 2},22 ${x - 1},32`,
            `M${x},4 C${x + 2},14 ${x - 2},22 ${x + 1},32`,
            `M${x},4 C${x - 2},14 ${x + 2},22 ${x - 1},32`,
          ] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
      <Glint cx={-4} cy={-5} fill={`url(#${id}-glow)`} r={2.2} delay={0.5} />
      <Glint cx={5} cy={-2} fill={`url(#${id}-glow)`} r={1.6} delay={1.8} />
    </svg>
  );
}

// Manta ray gliding right; wide graceful wings.
export function MantaSVG({ size = 60 }) {
  const id = useId();
  return (
    <svg width={size} height={size * 0.5} viewBox="-30 -15 60 30" fill="none" style={{ overflow: 'visible' }}>
      <PearlDefs id={id} />
      <g stroke={`url(#${id}-stroke)`} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill={FILL}>
        {/* wings + body in one sweep */}
        <motion.path
          d="M0,-2 C-8,-12 -24,-10 -28,-4 C-20,-2 -12,2 -6,5 C-3,6.5 3,6.5 6,5 C12,2 20,-2 28,-4 C24,-10 8,-12 0,-2 Z"
          animate={{ d: [
            'M0,-2 C-8,-12 -24,-10 -28,-4 C-20,-2 -12,2 -6,5 C-3,6.5 3,6.5 6,5 C12,2 20,-2 28,-4 C24,-10 8,-12 0,-2 Z',
            'M0,-2 C-8,-4 -24,-14 -28,-8 C-20,-4 -12,1 -6,5 C-3,6.5 3,6.5 6,5 C12,1 20,-4 28,-8 C24,-14 8,-4 0,-2 Z',
            'M0,-2 C-8,-12 -24,-10 -28,-4 C-20,-2 -12,2 -6,5 C-3,6.5 3,6.5 6,5 C12,2 20,-2 28,-4 C24,-10 8,-12 0,-2 Z',
          ] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* tail */}
        <path d="M0,6 C-1,10 -1,13 0,15" fill="none" strokeOpacity="0.6" />
        {/* cephalic fins */}
        <path d="M-3,-6 C-4,-9 -2,-10 -1,-8 M3,-6 C4,-9 2,-10 1,-8" fill="none" strokeOpacity="0.6" />
      </g>
      <Glint cx={-10} cy={-3} fill={`url(#${id}-glow)`} r={2.2} delay={1.1} />
      <Glint cx={12} cy={-2} fill={`url(#${id}-glow)`} r={1.8} delay={2.3} />
    </svg>
  );
}

// Seahorse facing right, gently curled.
export function SeahorseSVG({ size = 30 }) {
  const id = useId();
  return (
    <svg width={size} height={size * 1.6} viewBox="-10 -20 24 44" fill="none" style={{ overflow: 'visible' }}>
      <PearlDefs id={id} />
      <g stroke={`url(#${id}-stroke)`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill={FILL}>
        {/* head + snout */}
        <path d="M2,-16 C6,-17 9,-15 10,-13 L13,-12 L10,-11 C9,-9 7,-8 5,-8" />
        {/* body curve */}
        <path d="M5,-8 C10,-4 10,4 6,9 C3,13 -3,14 -4,10 C-5,7 -2,6 0,8 C1,10 0,12 -2,12" fill="none" />
        <path d="M2,-16 C-2,-15 -4,-12 -3,-9 C-2,-6 1,-6 5,-8" />
        {/* dorsal fin */}
        <path d="M8,-4 C11,-3 11,1 8,2" fill="none" strokeOpacity="0.6" />
        {/* belly ridges */}
        <path d="M2,-4 L6,-5 M2,0 L7,0 M1,4 L6,5" fill="none" strokeOpacity="0.4" strokeWidth="0.9" />
        {/* eye */}
        <circle cx="5" cy="-13" r="0.9" fill="rgba(240,253,255,0.8)" stroke="none" />
      </g>
      <Glint cx={4} cy={-2} fill={`url(#${id}-glow)`} r={1.8} delay={0.7} />
    </svg>
  );
}

// Starfish resting on the sand.
export function StarfishSVG({ size = 26, tint = 'rgba(232,168,124,0.6)' }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="-15 -15 30 30" fill="none" style={{ overflow: 'visible' }}>
      <PearlDefs id={id} />
      <g stroke={tint} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="rgba(232,168,124,0.08)">
        <path d="M0,-13 L3,-4 L12,-4 L5,2 L8,11 L0,6 L-8,11 L-5,2 L-12,-4 L-3,-4 Z" />
        <circle cx="0" cy="0" r="1" strokeOpacity="0.5" />
      </g>
      <Glint cx={0} cy={-6} fill={`url(#${id}-glow)`} r={1.5} delay={1.4} />
    </svg>
  );
}

// A faint trail of glitter following a swimmer - three staggered twinkles
// drifting behind the creature.
function GlitterTrail({ direction = 'right' }) {
  const side = direction === 'right' ? -1 : 1;
  return (
    <div className="absolute top-1/2 pointer-events-none" style={{ [direction === 'right' ? 'left' : 'right']: -8 }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: 2.5 - i * 0.5,
            height: 2.5 - i * 0.5,
            left: side * (6 + i * 10),
            top: (i % 2 === 0 ? -1 : 1) * (3 + i * 2),
            boxShadow: '0 0 6px rgba(167,243,255,0.9)',
          }}
          animate={{ opacity: [0, 0.85, 0], scale: [0.4, 1.2, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.55, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// One creature drifting across the scene: a slow linear traverse with a
// gentle bob/wiggle layered on top. Negative delays start each swimmer
// mid-journey so the water is already populated on load.
export function Swimmer({ top, duration, delay, direction = 'right', bob = 8, bobDuration = 6, wiggle = 3, opacity = 0.5, sparkle = false, children }) {
  const xRange = direction === 'right' ? ['-8vw', '108vw'] : ['108vw', '-8vw'];
  return (
    <motion.div
      className="absolute left-0"
      style={{ top }}
      animate={{ x: xRange }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      <motion.div
        className="relative"
        style={{ opacity }}
        animate={{ y: [0, -bob, 0], rotate: [-wiggle, wiggle, -wiggle] }}
        transition={{ duration: bobDuration, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
        {sparkle && <GlitterTrail direction={direction} />}
      </motion.div>
    </motion.div>
  );
}

// The hero's cast: turtles gliding through open water and along the sand,
// lone fish, and a little school swimming the other way - each trailing a
// whisper of glitter.
export default function SeaCreatures() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* big turtle cruising the open water */}
      <Swimmer top="38%" duration={75} delay={-30} direction="right" bob={9} bobDuration={7} wiggle={2} opacity={0.55} sparkle>
        <div style={{ transform: 'rotate(90deg)' }}>
          <TurtleSVG size={48} />
        </div>
      </Swimmer>

      {/* lone fish heading the other way */}
      <Swimmer top="52%" duration={48} delay={-12} direction="left" bob={7} bobDuration={4.5} wiggle={4} opacity={0.5} sparkle>
        <div style={{ transform: 'scaleX(-1)' }}>
          <FishSVG size={30} />
        </div>
      </Swimmer>

      {/* small school keeping loose formation */}
      <Swimmer top="60%" duration={55} delay={-40} direction="right" bob={6} bobDuration={3.8} wiggle={4} opacity={0.45} sparkle>
        <div className="relative">
          <FishSVG size={18} />
          <div className="absolute" style={{ left: -26, top: 10 }}><FishSVG size={15} /></div>
          <div className="absolute" style={{ left: -14, top: -12 }}><FishSVG size={13} /></div>
        </div>
      </Swimmer>

      {/* solo fish deeper down */}
      <Swimmer top="70%" duration={62} delay={-5} direction="right" bob={5} bobDuration={5} wiggle={3} opacity={0.4} sparkle>
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
