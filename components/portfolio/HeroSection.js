import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import WaveBackground from './WaveBackground';
import OrbitingSkills from './OrbitingSkills';

export default function HeroSection() {
  const { scrollY } = useScroll();
  
  // Calculate when wave reaches each element to dissolve it
  // Wave starts at top and moves down, so elements dissolve as wave passes
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  // Elements dissolve progressively as wave moves down
  const subtitleOpacity = useTransform(scrollY, [0, windowHeight * 0.15], [1, 0]);
  const nameOpacity = useTransform(scrollY, [windowHeight * 0.1, windowHeight * 0.25], [1, 0]);
  const descOpacity = useTransform(scrollY, [windowHeight * 0.2, windowHeight * 0.35], [1, 0]);
  const buttonsOpacity = useTransform(scrollY, [windowHeight * 0.25, windowHeight * 0.4], [1, 0]);
  const skillsOpacity = useTransform(scrollY, [windowHeight * 0.3, windowHeight * 0.5], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollY, [windowHeight * 0.35, windowHeight * 0.5], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <WaveBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className="text-center lg:text-left flex-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ opacity: subtitleOpacity }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[#88C5CC] text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-light"
            >
              Computer Science & Neuroscience @ UWaterloo
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ opacity: nameOpacity }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight mb-6"
            >
              Erin<br />
              <span className="font-semibold bg-gradient-to-r from-white via-[#88C5CC] to-[#F5E6D3] bg-clip-text text-transparent">
                Guo
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ opacity: descOpacity }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-white/70 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Creating transformative solutions at the intersection of 
              <span className="text-[#5EEAFF] font-semibold"> healthcare technology</span>,
              <span className="text-[#F5E6D3] font-medium"> cognitive science</span>, and
              <span className="text-white font-medium"> artificial intelligence</span>.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ opacity: buttonsOpacity }}
              transition={{ duration: 0.6, delay: 0.9 }}
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
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-[#88C5CC]/20 backdrop-blur-sm border border-[#88C5CC]/40 rounded-full text-[#88C5CC] hover:bg-[#88C5CC]/30 transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </button>
            </motion.div>
          </div>
          
          {/* Orbiting skills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ opacity: skillsOpacity }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex-shrink-0"
          >
            <OrbitingSkills />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: scrollIndicatorOpacity }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}