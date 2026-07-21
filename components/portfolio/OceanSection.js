import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FishSVG, TurtleSVG, JellyfishSVG, MantaSVG, SeahorseSVG, Swimmer } from './SeaCreatures';

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

// A jellyfish rising slowly through a section - vertical drift with a
// gentle horizontal sway, restarting from below.
function DriftingJelly({ left, size, duration, delay, opacity = 0.3, glow }) {
  return (
    <motion.div
      className="absolute"
      style={{ left, bottom: '-12%' }}
      animate={{ y: ['0%', '-160%'] }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      <motion.div
        style={{ opacity }}
        animate={{ x: [0, 14, -10, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <JellyfishSVG size={size} glow={glow} />
      </motion.div>
    </motion.div>
  );
}

// The sea bed itself: soft dark sand-dune silhouettes settling along the
// bottom of the floor section, with a faint cool glow resting on them.
function SeaFloorBed() {
  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: 180 }}>
      <svg className="absolute inset-x-0 bottom-0 w-full h-full" viewBox="0 0 1440 180" preserveAspectRatio="none">
        <path
          d="M0,110 C180,90 340,125 520,105 C700,88 880,120 1060,102 C1240,86 1360,112 1440,100 L1440,180 L0,180 Z"
          fill="rgba(5,25,32,0.7)"
        />
        <path
          d="M0,140 C220,124 420,152 640,136 C860,122 1080,150 1300,134 C1360,130 1410,136 1440,132 L1440,180 L0,180 Z"
          fill="rgba(2,14,19,0.85)"
        />
      </svg>
      {/* faint moonlight-through-water glow resting on the dunes */}
      <div
        className="absolute inset-x-0 bottom-10 h-16"
        style={{
          background: 'radial-gradient(ellipse 50% 100% at 50% 100%, rgba(94,234,255,0.07) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

// Depth-specific supporting cast layered behind the content. The water gets
// stranger and more luminous the deeper the page goes.
function DepthCast({ depth }) {
  if (depth === 'mid') {
    return (
      <>
        <Swimmer top="14%" duration={90} delay={-25} direction="right" bob={10} bobDuration={8} wiggle={2} opacity={0.22}>
          <MantaSVG size={72} />
        </Swimmer>
        <Swimmer top="48%" duration={58} delay={-18} direction="left" bob={6} bobDuration={4.5} wiggle={4} opacity={0.24} sparkle>
          <div className="relative" style={{ transform: 'scaleX(-1)' }}>
            <FishSVG size={22} />
            <div className="absolute" style={{ left: -24, top: 9 }}><FishSVG size={17} /></div>
            <div className="absolute" style={{ left: -13, top: -11 }}><FishSVG size={14} /></div>
          </div>
        </Swimmer>
        <DriftingJelly left="12%" size={30} duration={46} delay={-14} opacity={0.3} glow="rgba(94,234,255,0.4)" />
        <DriftingJelly left="70%" size={24} duration={54} delay={-30} opacity={0.26} glow="rgba(167,243,255,0.35)" />
      </>
    );
  }
  if (depth === 'deep') {
    return (
      <>
        <DriftingJelly left="8%" size={38} duration={40} delay={-8} opacity={0.38} glow="rgba(94,234,255,0.5)" />
        <DriftingJelly left="84%" size={26} duration={52} delay={-30} opacity={0.3} glow="rgba(167,243,255,0.45)" />
        <DriftingJelly left="44%" size={20} duration={60} delay={-18} opacity={0.24} glow="rgba(94,234,255,0.4)" />
        <Swimmer top="34%" duration={70} delay={-20} direction="left" bob={5} bobDuration={6} wiggle={3} opacity={0.2}>
          <div style={{ transform: 'scaleX(-1)' }}>
            <SeahorseSVG size={26} />
          </div>
        </Swimmer>
        <Swimmer top="72%" duration={100} delay={-45} direction="right" bob={8} bobDuration={9} wiggle={2} opacity={0.16}>
          <MantaSVG size={56} />
        </Swimmer>
      </>
    );
  }
  // 'floor' (the sea bed): no animals at all - just the sparkle field
  // rendered separately.
  return null;
}

// Twinkling bioluminescent plankton - the glittery starfield of the deep
// sea. Every depth band gets some; the sea floor gets the densest, most
// magical version, complete with tiny four-point star glints.
function BioGlitter({ count = 26, stars = 0 }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(stars)].map((_, i) => {
        const s1 = seeded(i + 3101);
        const s2 = seeded(i + 3201);
        const s3 = seeded(i + 3301);
        return (
          <motion.svg
            key={`star-${i}`}
            className="absolute"
            style={{ left: `${s1 * 100}%`, top: `${s2 * 100}%` }}
            width={8 + s3 * 10}
            height={8 + s3 * 10}
            viewBox="-10 -10 20 20"
            animate={{ opacity: [0, 0.9, 0], scale: [0.3, 1, 0.3], rotate: [0, 60] }}
            transition={{ duration: 3.5 + s3 * 3, repeat: Infinity, delay: s1 * 8, ease: 'easeInOut' }}
          >
            <path
              d="M0,-9 C0.7,-2.5 2.5,-0.7 9,0 C2.5,0.7 0.7,2.5 0,9 C-0.7,2.5 -2.5,0.7 -9,0 C-2.5,-0.7 -0.7,-2.5 0,-9 Z"
              fill="rgba(167,243,255,0.9)"
            />
            <circle cx="0" cy="0" r="2" fill="rgba(255,255,255,0.9)" style={{ filter: 'blur(1px)' }} />
          </motion.svg>
        );
      })}
      {[...Array(count)].map((_, i) => {
        const a1 = seeded(i + 2101);
        const a2 = seeded(i + 2201);
        const a3 = seeded(i + 2301);
        const a4 = seeded(i + 2401);
        const size = 1.5 + a3 * 2.5;
        return (
          <motion.div
            key={`bio-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${a1 * 100}%`,
              top: `${a2 * 100}%`,
              width: size,
              height: size,
              background: a4 > 0.5 ? '#5EEAFF' : '#A7F3FF',
              boxShadow: `0 0 ${6 + a3 * 8}px rgba(94,234,255,0.8)`,
            }}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0.3, 1.2, 0.3],
              y: [0, -(6 + a4 * 14)],
            }}
            transition={{
              duration: 3 + a3 * 4,
              repeat: Infinity,
              delay: a1 * 7,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}

export default function OceanSection({ children, className = "", id, depth }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for depth effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Slow ambient glow drifting through the background, so the water
          reads as alive even before any particles catch the eye */}
      <motion.div
        className="absolute -inset-1/4 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(94,234,255,0.10) 0%, transparent 60%)',
        }}
        animate={{
          x: ['-8%', '8%', '-8%'],
          y: ['-6%', '6%', '-6%'],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Faint undulating boundary where this depth band begins - reads
          like light catching a layer of water at the top of the section.
          Skipped on the sea floor: down there the water should just fade
          seamlessly into the bed, not show a bright banding line. */}
      {depth !== 'floor' && (
      <svg
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: '90px' }}
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
      >
        <motion.path
          fill="rgba(94,234,255,0.05)"
          initial={{ d: 'M0,0 L0,38 C240,62 480,18 720,40 C960,60 1200,22 1440,40 L1440,0 Z' }}
          animate={{
            d: [
              'M0,0 L0,38 C240,62 480,18 720,40 C960,60 1200,22 1440,40 L1440,0 Z',
              'M0,0 L0,30 C240,10 480,58 720,34 C960,14 1200,54 1440,30 L1440,0 Z',
              'M0,0 L0,38 C240,62 480,18 720,40 C960,60 1200,22 1440,40 L1440,0 Z',
            ],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          fill="rgba(255,255,255,0.04)"
          initial={{ d: 'M0,0 L0,52 C240,74 480,34 720,54 C960,72 1200,36 1440,52 L1440,0 Z' }}
          animate={{
            d: [
              'M0,0 L0,52 C240,74 480,34 720,54 C960,72 1200,36 1440,52 L1440,0 Z',
              'M0,0 L0,44 C240,26 480,68 720,46 C960,28 1200,64 1440,44 L1440,0 Z',
              'M0,0 L0,52 C240,74 480,34 720,54 C960,72 1200,36 1440,52 L1440,0 Z',
            ],
          }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </svg>
      )}

      {/* A lone fish and a distant turtle drifting through this depth band,
          plus the depth-specific cast (mantas, jellies, seahorses...).
          The sea floor ('floor') stays creature-free - only sparkles. */}
      {depth !== 'floor' && (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <DepthCast depth={depth} />
        <motion.div
          className="absolute left-0"
          style={{ top: '26%' }}
          animate={{ x: ['-8vw', '108vw'] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear', delay: -35 }}
        >
          <motion.div
            style={{ opacity: 0.25 }}
            animate={{ y: [0, -7, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FishSVG size={26} />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute left-0"
          style={{ top: '68%' }}
          animate={{ x: ['108vw', '-8vw'] }}
          transition={{ duration: 110, repeat: Infinity, ease: 'linear', delay: -70 }}
        >
          <motion.div
            style={{ opacity: 0.18 }}
            animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div style={{ transform: 'rotate(-90deg)' }}>
              <TurtleSVG size={30} />
            </div>
          </motion.div>
        </motion.div>
      </div>
      )}

      {/* Parallax background particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Floating light orbs at different depths */}
        {[...Array(15)].map((_, i) => {
          const r1 = seeded(i + 1);
          const r2 = seeded(i + 101);
          const r3 = seeded(i + 201);
          const r4 = seeded(i + 301);
          const r5 = seeded(i + 401);
          const r6 = seeded(i + 501);
          const r7 = seeded(i + 601);
          const r8 = seeded(i + 701);
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${r1 * 100}%`,
                top: `${r2 * 100}%`,
                width: 4 + r3 * 12,
                height: 4 + r4 * 12,
                background: `radial-gradient(circle, rgba(94,234,255,${0.1 + r5 * 0.2}) 0%, transparent 70%)`,
              }}
              animate={{
                y: [0, -30 - r6 * 20, 0],
                x: [0, (r7 - 0.5) * 30, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 6 + r8 * 4,
                repeat: Infinity,
                delay: r1 * 3,
                ease: "easeInOut"
              }}
            />
          );
        })}

        {/* Marine snow - tiny motes sinking slowly, the way debris drifts
            down through deep water */}
        {[...Array(12)].map((_, i) => {
          const s1 = seeded(i + 811);
          const s2 = seeded(i + 911);
          const s3 = seeded(i + 1011);
          const s4 = seeded(i + 1111);
          return (
            <motion.div
              key={`snow-${i}`}
              className="absolute rounded-full bg-white/40"
              style={{
                left: `${s1 * 100}%`,
                top: `${s2 * 70}%`,
                width: 1.5 + s3 * 2,
                height: 1.5 + s3 * 2,
                filter: 'blur(0.5px)',
              }}
              animate={{
                y: [0, 90 + s4 * 70],
                x: [0, (s3 - 0.5) * 40],
                opacity: [0, 0.45, 0],
              }}
              transition={{
                duration: 15 + s4 * 9,
                repeat: Infinity,
                delay: s1 * 12,
                ease: 'linear',
              }}
            />
          );
        })}
      </motion.div>

      {/* Bioluminescent glitter at every depth; the sea floor gets the
          densest, prettiest field with star glints */}
      {depth === 'floor' ? <BioGlitter count={40} stars={10} /> : depth ? <BioGlitter count={18} /> : null}

      {/* The sand dunes of the sea bed, only at the very bottom */}
      {depth === 'floor' && <SeaFloorBed />}

      {/* Content with parallax */}
      <motion.div
        className="relative z-10"
        style={{ opacity }}
      >
        {children}
      </motion.div>
    </section>
  );
}