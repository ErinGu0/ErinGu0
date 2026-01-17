import React from 'react';
import { motion } from 'framer-motion';

export default function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Lighter ocean gradient base to match inspiration */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A6B7A] via-[#2A8A9A] to-[#3AA5B5]" />
      
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
        const yPosition = 45 + Math.random() * 30;
        const size = Math.random() > 0.6 ? 3 : Math.random() > 0.3 ? 2 : 1;
        return (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${yPosition}%`,
              filter: 'blur(0.8px)',
            }}
            animate={{
              opacity: [0, 0.95, 0],
              scale: [0, 2.5, 0],
              y: [0, -40, -80],
              x: [0, Math.random() * 30 - 15, Math.random() * 50 - 25],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        );
      })}
      
      {/* Bright shimmer effects on water surface */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`shimmer-${i}`}
          className="absolute w-12 h-px bg-white/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${40 + Math.random() * 30}%`,
            filter: 'blur(1.5px)',
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scaleX: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}