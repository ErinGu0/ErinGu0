import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WaveWash() {
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for different wave layers
  const wave1Y = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const wave2Y = useTransform(scrollYProgress, [0, 0.3], [0, 60]);
  const wave3Y = useTransform(scrollYProgress, [0, 0.3], [0, 30]);

  return (
    <div className="absolute top-0 left-0 right-0 h-80 overflow-hidden">
      {/* Deep ocean gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#052D38] via-[#052D38]/80 to-transparent z-10" />
      
      {/* Back wave layer - slowest parallax */}
      <motion.svg 
        className="absolute -top-4 w-[140%] -left-[20%] h-full z-20" 
        viewBox="0 0 1800 300" 
        preserveAspectRatio="none"
        style={{ y: wave1Y }}
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#052D38" />
            <stop offset="100%" stopColor="#063845" />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#waveGrad1)"
          d="M-100,180 C150,280 350,80 600,180 C850,280 1050,80 1300,180 C1550,280 1750,80 1900,180 L1900,0 L-100,0 Z"
          animate={{
            d: [
              "M-100,180 C150,280 350,80 600,180 C850,280 1050,80 1300,180 C1550,280 1750,80 1900,180 L1900,0 L-100,0 Z",
              "M-100,120 C150,20 350,220 600,120 C850,20 1050,220 1300,120 C1550,20 1750,220 1900,120 L1900,0 L-100,0 Z",
              "M-100,180 C150,280 350,80 600,180 C850,280 1050,80 1300,180 C1550,280 1750,80 1900,180 L1900,0 L-100,0 Z"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* Middle wave layer */}
      <motion.svg 
        className="absolute top-8 w-[150%] -left-[25%] h-full z-30" 
        viewBox="0 0 1800 300" 
        preserveAspectRatio="none"
        style={{ y: wave2Y }}
      >
        <defs>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#063845" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0A5A6E" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#waveGrad2)"
          d="M-100,200 C100,300 300,100 550,200 C800,300 1000,100 1250,200 C1500,300 1700,100 1900,200 L1900,0 L-100,0 Z"
          animate={{
            d: [
              "M-100,200 C100,300 300,100 550,200 C800,300 1000,100 1250,200 C1500,300 1700,100 1900,200 L1900,0 L-100,0 Z",
              "M-100,150 C100,50 300,250 550,150 C800,50 1000,250 1250,150 C1500,50 1700,250 1900,150 L1900,0 L-100,0 Z",
              "M-100,200 C100,300 300,100 550,200 C800,300 1000,100 1250,200 C1500,300 1700,100 1900,200 L1900,0 L-100,0 Z"
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.svg>

      {/* Front foam wave */}
      <motion.svg 
        className="absolute top-16 w-[160%] -left-[30%] h-full z-40" 
        viewBox="0 0 1800 300" 
        preserveAspectRatio="none"
        style={{ y: wave3Y }}
      >
        <motion.path
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          d="M-100,220 C80,320 280,120 500,220 C720,320 920,120 1140,220 C1360,320 1560,120 1900,220 L1900,0 L-100,0 Z"
          animate={{
            d: [
              "M-100,220 C80,320 280,120 500,220 C720,320 920,120 1140,220 C1360,320 1560,120 1900,220 L1900,0 L-100,0 Z",
              "M-100,180 C80,80 280,280 500,180 C720,80 920,280 1140,180 C1360,80 1560,280 1900,180 L1900,0 L-100,0 Z",
              "M-100,220 C80,320 280,120 500,220 C720,320 920,120 1140,220 C1360,320 1560,120 1900,220 L1900,0 L-100,0 Z"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.svg>

      {/* Foam spray particles */}
      <div className="absolute top-24 left-0 right-0 h-48 pointer-events-none z-50">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ 
              left: `${4 + i * 4}%`,
              width: 3 + Math.random() * 6,
              height: 3 + Math.random() * 6,
              background: `radial-gradient(circle, rgba(255,255,255,${0.4 + Math.random() * 0.4}), rgba(136,197,204,0.3))`,
            }}
            animate={{
              y: [100, 20 + Math.random() * 40, 100],
              x: [0, (Math.random() - 0.5) * 60, 0],
              opacity: [0, 0.8, 0],
              scale: [0.3, 1.5, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Floating light particles */}
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none z-40">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`light-${i}`}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${30 + Math.random() * 50}%`,
              width: 4 + Math.random() * 8,
              height: 4 + Math.random() * 8,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}