import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
      {/* Parallax background particles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Floating light orbs at different depths */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 4 + Math.random() * 12,
              height: 4 + Math.random() * 12,
              background: `radial-gradient(circle, rgba(94,234,255,${0.1 + Math.random() * 0.2}) 0%, transparent 70%)`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 20, 0],
              x: [0, (Math.random() - 0.5) * 30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
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