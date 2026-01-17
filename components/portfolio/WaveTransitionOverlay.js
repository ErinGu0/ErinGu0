import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WaveTransitionOverlay({ waveProgress, phase }) {
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Wave height based on progress
  const waveHeight = waveProgress * (windowHeight + 200);
  const waveOpacity = Math.min(waveProgress * 8, 1);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-x-0 top-0 pointer-events-none z-30"
        style={{ 
          height: phase === 'wave' ? waveHeight : '100vh',
          opacity: phase === 'wave' ? waveOpacity : 1,
        }}
        animate={{
          height: phase === 'pause' || phase === 'education' ? '100vh' : waveHeight
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Gradient background */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #052D38 0%, #063845 40%, #0A5A6E 70%, #0D6B82 100%)'
          }}
          animate={{
            opacity: phase === 'education' ? 0 : 1
          }}
          transition={{ duration: 2 }}
        />
        
        {/* Enhanced particles during pause phase */}
        <div className="absolute inset-0 overflow-hidden">
          {phase === 'pause' && (
            <>
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`pause-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: 3 + Math.random() * 8,
                    height: 3 + Math.random() * 8,
                    background: `radial-gradient(circle, rgba(94,234,255,${0.2 + Math.random() * 0.3}) 0%, transparent 70%)`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.7, 0],
                    scale: [0, 1.5, 1, 0],
                    y: [-20, -100 - Math.random() * 100],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </>
          )}
          
          {/* Regular particles during wave */}
          {phase === 'wave' && (
            <>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`wave-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${10 + i * 8}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    width: 4 + Math.random() * 6,
                    height: 4 + Math.random() * 6,
                    background: `radial-gradient(circle, rgba(94,234,255,${0.15 + Math.random() * 0.1}) 0%, transparent 70%)`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </>
          )}
        </div>
        
        {/* Wave crest - only show during wave phase */}
        {phase === 'wave' && (
          <svg 
            className="absolute bottom-0 left-0 right-0 w-full"
            style={{ height: '200px', transform: 'translateY(50%)' }}
            viewBox="0 0 1440 200" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveCrestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0D6B82" />
                <stop offset="50%" stopColor="#0A5A6E" stopOpacity="0.5" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Main wave shape */}
            <motion.path
              fill="url(#waveCrestGrad)"
              d="M0,0 Q360,140 720,70 T1440,90 L1440,0 L0,0 Z"
              animate={{
                d: [
                  "M0,0 Q360,140 720,70 T1440,90 L1440,0 L0,0 Z",
                  "M0,0 Q360,70 720,120 T1440,60 L1440,0 L0,0 Z",
                  "M0,0 Q360,140 720,70 T1440,90 L1440,0 L0,0 Z"
                ]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Glowing highlight */}
            <motion.path
              fill="none"
              stroke="rgba(94,234,255,0.4)"
              strokeWidth="2"
              filter="url(#glow)"
              d="M0,10 Q360,150 720,80 T1440,100"
              animate={{
                d: [
                  "M0,10 Q360,150 720,80 T1440,100",
                  "M0,10 Q360,80 720,130 T1440,70",
                  "M0,10 Q360,150 720,80 T1440,100"
                ]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Secondary foam layer */}
            <motion.path
              fill="none"
              stroke="rgba(136,197,204,0.2)"
              strokeWidth="1.5"
              d="M0,25 Q360,165 720,95 T1440,115"
              animate={{
                d: [
                  "M0,25 Q360,165 720,95 T1440,115",
                  "M0,25 Q360,95 720,145 T1440,85",
                  "M0,25 Q360,165 720,95 T1440,115"
                ]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
          </svg>
        )}
        
        {/* Shimmering effect during pause */}
        {phase === 'pause' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5EEAFF]/5 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}