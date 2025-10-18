import { motion } from 'framer-motion';

interface AnimatedWeatherIconProps {
  icon: string;
  isDay: boolean;
}

export function AnimatedWeatherIcon({ icon, isDay }: AnimatedWeatherIconProps) {
  if (icon === '☀️' || icon === '🌙') {
    return (
      <motion.div
        className="text-8xl select-none"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {icon}
      </motion.div>
    );
  }
  
  if (icon.includes('🌧️') || icon.includes('⛈️')) {
    return (
      <motion.div
        className="text-8xl select-none"
        animate={{
          y: [0, -5, 0],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {icon}
      </motion.div>
    );
  }
  
  if (icon.includes('☁️')) {
    return (
      <motion.div
        className="text-8xl select-none"
        animate={{
          x: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {icon}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="text-8xl select-none"
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {icon}
    </motion.div>
  );
}
