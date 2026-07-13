import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FishSVG, TurtleSVG } from './SeaCreatures';

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

export default function OceanSection({ children, className = "", id }) {
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
          like light catching a layer of water at the top of the section */}
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

      {/* A lone fish and a distant turtle drifting through this depth band */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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