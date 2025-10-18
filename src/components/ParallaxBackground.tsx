import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxBackgroundProps {
  isDay: boolean;
}

export function ParallaxBackground({ isDay }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const y3 = useTransform(scrollY, [0, 300], [0, -150]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 opacity-20"
      >
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl ${
          isDay ? 'bg-yellow-300' : 'bg-blue-400'
        }`} />
      </motion.div>
      
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 opacity-15"
      >
        <div className={`absolute top-40 right-20 w-48 h-48 rounded-full blur-3xl ${
          isDay ? 'bg-orange-300' : 'bg-purple-400'
        }`} />
      </motion.div>
      
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 opacity-10"
      >
        <div className={`absolute bottom-20 left-1/3 w-64 h-64 rounded-full blur-3xl ${
          isDay ? 'bg-blue-200' : 'bg-indigo-500'
        }`} />
      </motion.div>
    </div>
  );
}
