import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WaveTransition({ children, direction = 'left' }) {
  const [ref, setRef] = useState(null);
  const { scrollYProgress } = useScroll({
    target: ref ? { current: ref } : undefined,
    offset: ["start end", "end start"]
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    direction === 'left' 
      ? ['-100%', '0%', '0%', '100%']
      : ['100%', '0%', '0%', '-100%']
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const blur = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(20px)']
  );

  return (
    <motion.div
      ref={setRef}
      style={{ x, opacity, filter: blur }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}