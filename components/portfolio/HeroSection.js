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
  // Matches the crest's 4s dive (see WaveTransitionOverlay) - a slow,
  // gentle dissolve rather than a quick snap, staggered so the topmost
  // content (subtitle, scroll hint) washes away first, same as the water
  // line reaching it first.
  return { duration: 2.2, delay: delaySec, ease: [0.45, 0, 0.25, 1] };
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
              initial={{ opacity: 0, y: 14 }}
              animate={autoPlay ? washOutTarget() : { opacity: 1, y: 0 }}
              style={autoPlay ? undefined : subtitle}
              transition={autoPlay ? washOutTransition(0) : { duration: 0.45, delay: 0.15 }}
              className="text-[#88C5CC] text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-light"
            >
              Computer Science & Neuroscience @ UWaterloo
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={autoPlay ? washOutTarget() : { opacity: 1, y: 0 }}
              style={autoPlay ? undefined : name}
              transition={autoPlay ? washOutTransition(0.4) : { duration: 0.6, delay: 0.28 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight mb-6"
            >
              Erin<br />
              <span className="font-semibold bg-gradient-to-r from-white via-[#88C5CC] to-[#F5E6D3] bg-clip-text text-transparent">
                Guo
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={autoPlay ? washOutTarget() : { opacity: 1, y: 0 }}
              style={autoPlay ? undefined : desc}
              transition={autoPlay ? washOutTransition(0.8) : { duration: 0.45, delay: 0.4 }}
              className="text-white/70 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Building
              <span className="text-[#5EEAFF] font-semibold"> tech for social good</span>,
              using technology to create tools for
              <span className="text-[#F5E6D3] font-medium"> healthcare access</span> and
              <span className="text-white font-medium"> community impact</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={autoPlay ? washOutTarget() : { opacity: 1, y: 0 }}
              style={autoPlay ? undefined : buttons}
              transition={autoPlay ? washOutTransition(1.2) : { duration: 0.45, delay: 0.5 }}
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
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={autoPlay ? washOutTarget() : { opacity: 1, scale: 1, y: 0 }}
            style={autoPlay ? undefined : skills}
            transition={autoPlay ? washOutTransition(1.2) : { duration: 0.7, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <OrbitingSkills />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - a glowing "dive in" invitation that's hard to
          miss: shimmering label, mouse capsule with a falling dot, and a
          cascade of chevrons sinking like bubbles in reverse */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={autoPlay ? washOutTarget() : { opacity: 1, y: 0 }}
        style={autoPlay ? undefined : scrollHint}
        transition={autoPlay ? washOutTransition(0) : { duration: 0.5, delay: 0.85 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="relative flex flex-col items-center gap-2.5">
          {/* soft pulsing glow behind the whole cue */}
          <motion.div
            className="absolute -inset-6 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(94,234,255,0.22) 0%, transparent 70%)', filter: 'blur(10px)' }}
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.span
            animate={{ y: [0, 6, 0], backgroundPosition: ['0% 50%', '200% 50%'] }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
            }}
            className="text-xs md:text-sm tracking-[0.35em] font-medium bg-gradient-to-r from-white/70 via-[#5EEAFF] to-white/70 bg-clip-text text-transparent"
            style={{ backgroundSize: '200% 100%' }}
          >
            SCROLL TO DIVE IN
          </motion.span>

          {/* cascading chevrons */}
          <div className="flex flex-col items-center -space-y-2.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.1, 0.9, 0.1], y: [0, 4, 8] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-5 h-5 text-[#5EEAFF]" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
