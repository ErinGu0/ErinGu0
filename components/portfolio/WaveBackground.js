import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Users, HeartPulse, Accessibility } from 'lucide-react';
import SeaCreatures from './SeaCreatures';

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

export default function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Lighter ocean gradient base to match inspiration */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A6B7A] via-[#2A8A9A] to-[#3AA5B5]" />

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

      {/* Realistic animated wave layers */}
      <svg
        className="absolute bottom-0 w-full h-[75%]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Teal deep water layer */}
        <motion.path
          initial={{ d: "M0,450 Q360,430 720,450 T1440,450 L1440,800 L0,800 Z" }}
          animate={{
            d: [
              "M0,450 Q360,430 720,450 T1440,450 L1440,800 L0,800 Z",
              "M0,460 Q360,480 720,460 T1440,460 L1440,800 L0,800 Z",
              "M0,450 Q360,430 720,450 T1440,450 L1440,800 L0,800 Z"
            ]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          fill="rgba(42, 138, 154, 0.7)"
        />
        
        {/* Turquoise mid-depth wave */}
        <motion.path
          initial={{ d: "M0,400 C240,370 360,430 600,400 C840,370 1080,430 1320,400 C1380,390 1410,395 1440,400 L1440,800 L0,800 Z" }}
          animate={{
            d: [
              "M0,400 C240,370 360,430 600,400 C840,370 1080,430 1320,400 C1380,390 1410,395 1440,400 L1440,800 L0,800 Z",
              "M0,415 C240,445 360,385 600,415 C840,445 1080,385 1320,415 C1380,425 1410,420 1440,415 L1440,800 L0,800 Z",
              "M0,400 C240,370 360,430 600,400 C840,370 1080,430 1320,400 C1380,390 1410,395 1440,400 L1440,800 L0,800 Z"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          fill="rgba(88, 182, 199, 0.6)"
        />
        
        {/* Bright surface wave with white caps */}
        <motion.path
          initial={{ d: "M0,350 C180,330 240,380 420,360 C600,340 720,390 900,370 C1080,350 1260,400 1440,380 L1440,800 L0,800 Z" }}
          animate={{
            d: [
              "M0,350 C180,330 240,380 420,360 C600,340 720,390 900,370 C1080,350 1260,400 1440,380 L1440,800 L0,800 Z",
              "M0,365 C180,385 240,335 420,355 C600,375 720,325 900,345 C1080,365 1260,315 1440,335 L1440,800 L0,800 Z",
              "M0,350 C180,330 240,380 420,360 C600,340 720,390 900,370 C1080,350 1260,400 1440,380 L1440,800 L0,800 Z"
            ]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          fill="rgba(136, 207, 219, 0.5)"
        />
        
        {/* White foam/crash layer */}
        <motion.path
          initial={{ d: "M0,370 C120,350 180,390 300,370 C420,350 540,390 660,370 C780,350 900,390 1020,370 C1140,350 1260,390 1380,370 C1410,365 1425,367 1440,370 L1440,800 L0,800 Z" }}
          animate={{
            d: [
              "M0,370 C120,350 180,390 300,370 C420,350 540,390 660,370 C780,350 900,390 1020,370 C1140,350 1260,390 1380,370 C1410,365 1425,367 1440,370 L1440,800 L0,800 Z",
              "M0,385 C120,405 180,365 300,385 C420,405 540,365 660,385 C780,405 900,365 1020,385 C1140,405 1260,365 1380,385 C1410,390 1425,388 1440,385 L1440,800 L0,800 Z",
              "M0,370 C120,350 180,390 300,370 C420,350 540,390 660,370 C780,350 900,390 1020,370 C1140,350 1260,390 1380,370 C1410,365 1425,367 1440,370 L1440,800 L0,800 Z"
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          fill="rgba(255, 255, 255, 0.25)"
        />
        
        {/* Sandy beach transition - beige/tan */}
        <motion.path
          initial={{ d: "M0,650 Q360,640 720,650 T1440,650 L1440,800 L0,800 Z" }}
          animate={{
            d: [
              "M0,650 Q360,640 720,650 T1440,650 L1440,800 L0,800 Z",
              "M0,655 Q360,645 720,655 T1440,655 L1440,800 L0,800 Z",
              "M0,650 Q360,640 720,650 T1440,650 L1440,800 L0,800 Z"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          fill="rgba(210, 180, 140, 0.4)"
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