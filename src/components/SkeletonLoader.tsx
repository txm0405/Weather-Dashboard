import { motion } from 'framer-motion';

export function WeatherCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full p-6 space-y-6"
    >
      <div className="space-y-3">
        <div className="h-8 w-48 bg-muted animate-shimmer rounded-lg" />
        <div className="h-24 w-24 bg-muted animate-shimmer rounded-full mx-auto" />
      </div>
      
      <div className="space-y-2">
        <div className="h-16 w-32 bg-muted animate-shimmer rounded-lg mx-auto" />
        <div className="h-4 w-40 bg-muted animate-shimmer rounded mx-auto" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-muted animate-shimmer rounded-lg" />
        ))}
      </div>
    </motion.div>
  );
}

export function ForecastSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex-shrink-0 w-24 h-40 bg-muted animate-shimmer rounded-xl"
        />
      ))}
    </div>
  );
}
