import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import WaveBackground from './WaveBackground';
import OrbitingSkills from './OrbitingSkills';

// Maps overall wave progress to a per-element dissolve state: elements
// nearest the top of the hero get washed away first, matching the water
// line rising from the top of the screen.
function washState(progress, start, end) {
  const t = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  const eased = t * t * (3 - 2 * t); // smoothstep, avoids a linear/mechanical feel
  return {
    opacity: 1 - eased,
    y: eased * 46,
    x: Math.sin(progress * 10) * 5 * eased,
    filter: `blur(${eased * 14}px)`,
  };
}

// autoPlay (touch) wash-out target/transition for a given element, keyed
// by a stagger delay in seconds. Unlike the continuous wash* values below
// (recomputed every render from a live `wash` number, which requires a
// steady stream of React state updates - main-thread work that iOS can
// stall during an active touch gesture), this is one declarative
// animate() call using only compositor-safe properties (opacity, y via
// transform, filter), triggered once and played out by the browser
// independent of further JS - immune to that stall the same way the
// sea creatures are.
function washOutTarget() {
  return { opacity: 0, y: 46, x: 0, filter: 'blur(14px)' };
}
function washOutTransition(delaySec) {
  return { duration: 0.45, delay: delaySec, ease: [0.4, 0, 1, 1] };
}

export default function HeroSection({ wash = 0, onNavigate, autoPlay = false }) {
  const subtitle = washState(wash, 0, 0.16);
  const name = washState(wash, 0.08, 0.3);
  const desc = washState(wash, 0.2, 0.42);
  const buttons = washState(wash, 0.3, 0.5);
  const skills = washState(wash, 0.32, 0.56);
  const scrollHint = washState(wash, 0, 0.08);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <WaveBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
          {/* Text content */}
          <div className="text-center lg:text-left flex-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={autoPlay ? washOutTarget() : { opacity: 1 }}
              style={autoPlay ? undefined : subtitle}
              transition={autoPlay ? washOutTransition(0) : { duration: 0.6, delay: 0.4 }}
              className="text-[#88C5CC] text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-light"
            >
              Computer Science & Neuroscience @ UWaterloo
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={autoPlay ? washOutTarget() : { opacity: 1, y: 0 }}
              style={autoPlay ? undefined : name}
              transition={autoPlay ? washOutTransition(0.05) : { duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight mb-6"
            >
              Erin<br />
              <span className="font-semibold bg-gradient-to-r from-white via-[#88C5CC] to-[#F5E6D3] bg-clip-text text-transparent">
                Guo
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={autoPlay ? washOutTarget() : { opacity: 1 }}
              style={autoPlay ? undefined : desc}
              transition={autoPlay ? washOutTransition(0.1) : { duration: 0.6, delay: 0.7 }}
              className="text-white/70 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Building
              <span className="text-[#5EEAFF] font-semibold"> tech for social good</span>,
              using technology to create tools for
              <span className="text-[#F5E6D3] font-medium"> healthcare access</span> and
              <span className="text-white font-medium"> community impact</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={autoPlay ? washOutTarget() : { opacity: 1, y: 0 }}
              style={autoPlay ? undefined : buttons}
              transition={autoPlay ? washOutTransition(0.15) : { duration: 0.6, delay: 0.9 }}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://github.com/ErinGu0"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                View GitHub
              </a>
              <button
                onClick={() =>
                  onNavigate
                    ? onNavigate('contact')
                    : document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
                }
                className="px-6 py-3 bg-[#88C5CC]/20 backdrop-blur-sm border border-[#88C5CC]/40 rounded-full text-[#88C5CC] hover:bg-[#88C5CC]/30 transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </button>
            </motion.div>
          </div>

          {/* Orbiting skills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={autoPlay ? washOutTarget() : { opacity: 1, scale: 1 }}
            style={autoPlay ? undefined : skills}
            transition={autoPlay ? washOutTransition(0.15) : { duration: 1, delay: 0.5 }}
            className="flex-shrink-0"
          >
            <OrbitingSkills />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={autoPlay ? washOutTarget() : { opacity: 1 }}
        style={autoPlay ? undefined : scrollHint}
        transition={autoPlay ? washOutTransition(0) : { delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs tracking-widest">SCROLL TO DIVE IN</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
