import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Users, HeartPulse, Accessibility } from 'lucide-react';
import SeaCreatures, { StarfishSVG } from './SeaCreatures';

// A tiny four-point star glint - the sparkle you see when sunlight catches
// moving water. Pure CSS/SVG, twinkles in place.
function SunGlint({ left, top, size, delay, duration }) {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ left, top }}
      width={size}
      height={size}
      viewBox="-10 -10 20 20"
      animate={{ opacity: [0, 1, 0], scale: [0.3, 1, 0.3], rotate: [0, 45, 90] }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <path
        d="M0,-9 C0.8,-2.5 2.5,-0.8 9,0 C2.5,0.8 0.8,2.5 0,9 C-0.8,2.5 -2.5,0.8 -9,0 C-2.5,-0.8 -0.8,-2.5 0,-9 Z"
        fill="rgba(255,255,255,0.95)"
      />
      <circle cx="0" cy="0" r="2.2" fill="rgba(255,250,230,0.9)" style={{ filter: 'blur(1px)' }} />
    </motion.svg>
  );
}

const socialGoodBadges = [
  { label: 'Artificial Intelligence for Good', icon: BrainCircuit, left: '54%', top: '72%', duration: 9 },
  { label: 'Community Impact', icon: Users, left: '82%', top: '68%', duration: 10.5 },
  { label: 'Healthcare Access', icon: HeartPulse, left: '60%', top: '87%', duration: 8.5 },
  { label: 'Inclusive Design', icon: Accessibility, left: '88%', top: '85%', duration: 11 }
];

// Deterministic pseudo-random generator so particle layout is identical on
// server and client render (Math.random() during render causes a React
// hydration mismatch since SSR and the client each roll different values).
function seeded(seed) {
  // Integer-only PRNG (mulberry32): Math.sin-based hashes aren't guaranteed
  // bit-identical between the Node SSR pass and the browser's JS engine,
  // which was still tripping React's hydration mismatch check.
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// --- Rolling wave paths ---------------------------------------------------
// The old wave layers animated between two hand-drawn shapes and back
// (A -> B -> A), which reads as water breathing in place - it visibly
// decelerates to a stop at each extreme before reversing. Real swells don't
// pause and reverse, they roll continuously in one direction. So instead
// each layer here is a fixed sine silhouette; only its *phase* advances,
// sampled at even steps and looped with linear easing so the motion never
// slows down or snaps - the same trick real-time water shaders use.
const VB_WIDTH = 1440;
const VB_HEIGHT = 800;

function catmullRomToBezierPath(points) {
  let d = `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

function swellPath({ baseY, amplitude, wavelength, phaseDeg, closed = true }) {
  const phase = (phaseDeg * Math.PI) / 180;
  const numWaves = VB_WIDTH / wavelength;
  const steps = Math.max(8, Math.round(numWaves * 8));
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const x = (VB_WIDTH / steps) * i;
    const y = baseY + amplitude * Math.sin((2 * Math.PI * x) / wavelength + phase);
    pts.push([x, y]);
  }
  const curve = catmullRomToBezierPath(pts);
  return closed ? `${curve} L${VB_WIDTH},${VB_HEIGHT} L0,${VB_HEIGHT} Z` : curve;
}

// Six evenly-spaced phases, plus a final frame identical to the first. With
// repeat: Infinity, the wrap from that last frame back to the start is just
// another equal-length linear step (300deg -> 360deg/0deg) - so the loop
// has no seam and nothing to visibly "reset".
function rollingWave(config) {
  const steps = 6;
  const frames = [];
  for (let i = 0; i < steps; i++) {
    frames.push(swellPath({ ...config, phaseDeg: (360 / steps) * i }));
  }
  frames.push(frames[0]);
  return frames;
}

const rollTransition = (duration) => ({ duration, repeat: Infinity, ease: 'linear' });

// A distant, barely-moving ridge behind the big swell - one more layer of
// depth so the water reads as receding toward a horizon rather than
// stopping at the first swell.
const HORIZON_D = rollingWave({ baseY: 284, amplitude: 18, wavelength: 720 });
const BIG_SWELL_D = rollingWave({ baseY: 315, amplitude: 45, wavelength: 480 });
const TEAL_DEEP_D = rollingWave({ baseY: 450, amplitude: 12, wavelength: 720 });
const TURQUOISE_D = rollingWave({ baseY: 400, amplitude: 30, wavelength: 480 });
const BRIGHT_SURFACE_D = rollingWave({ baseY: 365, amplitude: 25, wavelength: 480 });
const FOAM_CRASH_D = rollingWave({ baseY: 370, amplitude: 20, wavelength: 360 });
const FOAM_CREST_LINE_D = rollingWave({ baseY: 370, amplitude: 20, wavelength: 360, closed: false });
const SECOND_CREST_D = rollingWave({ baseY: 365, amplitude: 25, wavelength: 480, closed: false });
const SANDY_BEACH_D = rollingWave({ baseY: 650, amplitude: 8, wavelength: 720 });
const WET_SAND_D = rollingWave({ baseY: 703, amplitude: 8, wavelength: 720 });
const LACY_FOAM_D = rollingWave({ baseY: 650, amplitude: 10, wavelength: 360, closed: false });

export default function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Lighter ocean gradient base, warmed at the top like a sunlit
          lagoon - the peach band reads as sky/sunlight meeting the water */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A6B7A] via-[#2A8A9A] to-[#3AA5B5]" />
      <div
        className="absolute inset-x-0 top-0 h-[40%] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,214,170,0.20) 0%, rgba(255,236,200,0.10) 35%, transparent 100%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Sunlight breaking through the surface - soft glow + god rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,244,214,0.16) 28%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        {[
          { left: '13%', rotate: -19, width: 100, delay: 0, duration: 11 },
          { left: '32%', rotate: -8, width: 70, delay: 1.3, duration: 13 },
          { left: '50%', rotate: 3, width: 115, delay: 0.6, duration: 10 },
          { left: '68%', rotate: 12, width: 80, delay: 2.1, duration: 12 },
          { left: '85%', rotate: 20, width: 95, delay: 0.9, duration: 14 },
        ].map((ray, i) => (
          <motion.div
            key={i}
            className="absolute -top-24"
            style={{
              left: ray.left,
              width: ray.width,
              height: '150%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.09) 45%, transparent 78%)',
              transform: `rotate(${ray.rotate}deg)`,
              transformOrigin: 'top center',
              filter: 'blur(9px)',
              mixBlendMode: 'screen',
            }}
            animate={{ opacity: [0.12, 0.32, 0.12] }}
            transition={{ duration: ray.duration, repeat: Infinity, delay: ray.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Realistic animated wave layers - each is a fixed sine silhouette
          that rolls forward as its phase advances, so the water reads as
          continuously flowing rather than pulsing in place */}
      <svg
        className="absolute bottom-0 w-full h-[75%]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="travelGlintG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          {/* Vertical glosses for the main body layers - a lighter catch
              of light along each swell's crest fading into its base tone,
              so the layers read as glassy and dimensional rather than
              flat washes of colour. userSpaceOnUse pins them to the
              viewBox regardless of how a given path's "d" morphs. */}
          <linearGradient id="waveGradHorizon" gradientUnits="userSpaceOnUse" x1="0" y1="230" x2="0" y2="500">
            <stop offset="0%" stopColor="rgba(52,132,150,0.30)" />
            <stop offset="100%" stopColor="rgba(14,70,84,0.22)" />
          </linearGradient>
          <linearGradient id="waveGradSwell" gradientUnits="userSpaceOnUse" x1="0" y1="260" x2="0" y2="560">
            <stop offset="0%" stopColor="rgba(64,158,174,0.55)" />
            <stop offset="100%" stopColor="rgba(22,95,110,0.42)" />
          </linearGradient>
          <linearGradient id="waveGradTeal" gradientUnits="userSpaceOnUse" x1="0" y1="420" x2="0" y2="650">
            <stop offset="0%" stopColor="rgba(88,186,201,0.65)" />
            <stop offset="100%" stopColor="rgba(35,120,136,0.68)" />
          </linearGradient>
          <linearGradient id="waveGradTurquoise" gradientUnits="userSpaceOnUse" x1="0" y1="360" x2="0" y2="580">
            <stop offset="0%" stopColor="rgba(168,232,240,0.62)" />
            <stop offset="100%" stopColor="rgba(72,168,184,0.55)" />
          </linearGradient>
          <linearGradient id="waveGradSurface" gradientUnits="userSpaceOnUse" x1="0" y1="330" x2="0" y2="520">
            <stop offset="0%" stopColor="rgba(232,252,255,0.65)" />
            <stop offset="100%" stopColor="rgba(136,207,219,0.42)" />
          </linearGradient>
        </defs>

        {/* Distant hazy ridge - the furthest layer back, barely moving,
            giving the water somewhere to recede to instead of stopping
            abruptly at the first swell */}
        <motion.path
          initial={{ d: HORIZON_D[0] }}
          animate={{ d: HORIZON_D }}
          transition={rollTransition(34)}
          fill="url(#waveGradHorizon)"
        />

        {/* Big slow rolling swell far behind - the long-period wave real
            surf rides on top of */}
        <motion.path
          initial={{ d: BIG_SWELL_D[0] }}
          animate={{ d: BIG_SWELL_D }}
          transition={rollTransition(20)}
          fill="url(#waveGradSwell)"
        />

        {/* Teal deep water layer */}
        <motion.path
          initial={{ d: TEAL_DEEP_D[0] }}
          animate={{ d: TEAL_DEEP_D }}
          transition={rollTransition(16)}
          fill="url(#waveGradTeal)"
        />

        {/* Turquoise mid-depth wave */}
        <motion.path
          initial={{ d: TURQUOISE_D[0] }}
          animate={{ d: TURQUOISE_D }}
          transition={rollTransition(12)}
          fill="url(#waveGradTurquoise)"
        />

        {/* Bright surface wave with white caps */}
        <motion.path
          initial={{ d: BRIGHT_SURFACE_D[0] }}
          animate={{ d: BRIGHT_SURFACE_D }}
          transition={rollTransition(9)}
          fill="url(#waveGradSurface)"
        />

        {/* White foam/crash layer */}
        <motion.path
          initial={{ d: FOAM_CRASH_D[0] }}
          animate={{ d: FOAM_CRASH_D }}
          transition={rollTransition(6)}
          fill="rgba(255, 255, 255, 0.25)"
        />

        {/* Bright foam crest line riding exactly along the breaking edge -
            this is what makes it read as a real wave face, not a shape */}
        <motion.path
          initial={{ d: FOAM_CREST_LINE_D[0] }}
          animate={{ d: FOAM_CREST_LINE_D }}
          transition={rollTransition(6)}
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ filter: 'blur(2.5px)' }}
        />

        {/* Softer secondary crest on the mid swell behind it */}
        <motion.path
          initial={{ d: SECOND_CREST_D[0] }}
          animate={{ d: SECOND_CREST_D }}
          transition={rollTransition(9)}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ filter: 'blur(3px)' }}
        />

        {/* A band of light sliding across the surface, the way a sun
            glint travels across real moving water */}
        <motion.ellipse
          cy="368"
          rx="260"
          ry="34"
          fill="url(#travelGlintG)"
          style={{ mixBlendMode: 'screen', filter: 'blur(6px)' }}
          initial={{ cx: -260, opacity: 0 }}
          animate={{ cx: [-260, 1700], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear', times: [0, 0.18, 0.82, 1] }}
        />

        {/* Sandy beach transition - beige/tan */}
        <motion.path
          initial={{ d: SANDY_BEACH_D[0] }}
          animate={{ d: SANDY_BEACH_D }}
          transition={rollTransition(18)}
          fill="rgba(210, 180, 140, 0.4)"
        />

        {/* Warm wet-sand band deepening toward the bottom edge */}
        <motion.path
          initial={{ d: WET_SAND_D[0] }}
          animate={{ d: WET_SAND_D }}
          transition={rollTransition(20)}
          fill="rgba(228, 196, 150, 0.35)"
        />

        {/* Lacy foam line where the surf meets the sand */}
        <motion.path
          initial={{ d: LACY_FOAM_D[0] }}
          animate={{ d: LACY_FOAM_D }}
          transition={rollTransition(8)}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ filter: 'blur(3px)' }}
        />
      </svg>
      
      {/* Enhanced foam particles - more white, realistic */}
      {[...Array(60)].map((_, i) => {
        const r1 = seeded(i + 1);
        const r2 = seeded(i + 101);
        const r3 = seeded(i + 201);
        const r4 = seeded(i + 301);
        const r5 = seeded(i + 401);
        const r6 = seeded(i + 501);
        const yPosition = 45 + r1 * 30;
        const size = r2 > 0.6 ? 3 : r2 > 0.3 ? 2 : 1;
        return (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${r3 * 100}%`,
              top: `${yPosition}%`,
              filter: 'blur(0.8px)',
            }}
            animate={{
              opacity: [0, 0.95, 0],
              scale: [0, 2.5, 0],
              y: [0, -40, -80],
              x: [0, r4 * 30 - 15, r5 * 50 - 25],
            }}
            transition={{
              duration: 5 + r6 * 4,
              repeat: Infinity,
              delay: r1 * 8,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        );
      })}

      {/* Bright shimmer effects on water surface */}
      {[...Array(25)].map((_, i) => {
        const r1 = seeded(i + 601);
        const r2 = seeded(i + 701);
        const r3 = seeded(i + 801);
        const r4 = seeded(i + 901);
        return (
          <motion.div
            key={`shimmer-${i}`}
            className="absolute w-12 h-px bg-white/40"
            style={{
              left: `${r1 * 100}%`,
              top: `${40 + r2 * 30}%`,
              filter: 'blur(1.5px)',
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scaleX: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + r3 * 2,
              repeat: Infinity,
              delay: r4 * 5,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Sun glitter - four-point star sparkles where light catches the
          moving water, the "diamonds on the sea" effect */}
      {[...Array(14)].map((_, i) => {
        const g1 = seeded(i + 1201);
        const g2 = seeded(i + 1301);
        const g3 = seeded(i + 1401);
        return (
          <SunGlint
            key={`glint-${i}`}
            left={`${4 + g1 * 92}%`}
            top={`${42 + g2 * 26}%`}
            size={8 + g3 * 12}
            delay={g1 * 6}
            duration={2.5 + g2 * 2.5}
          />
        );
      })}

      {/* Beach details resting on the sand */}
      <div className="absolute pointer-events-none" style={{ left: '12%', bottom: '6%', transform: 'rotate(-12deg)' }}>
        <StarfishSVG size={30} />
      </div>
      <div className="absolute pointer-events-none hidden md:block" style={{ left: '72%', bottom: '3%', transform: 'rotate(18deg)' }}>
        <StarfishSVG size={22} tint="rgba(245,230,211,0.55)" />
      </div>

      {/* Sea life drifting through the water and along the sand */}
      <SeaCreatures />

      {/* Social-good pills, drifting gently in the lower water like buoys */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {socialGoodBadges.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.label}
              className="absolute"
              style={{ left: badge.left, top: badge.top }}
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: [0.45, 0.8, 0.45],
                y: [0, -14, 0],
              }}
              transition={{
                duration: badge.duration,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'easeInOut',
              }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <Icon className="w-4 h-4 text-[#5EEAFF] flex-shrink-0" />
                <span className="text-white/80 text-xs md:text-sm font-medium whitespace-nowrap">{badge.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}