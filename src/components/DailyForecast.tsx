import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getWeatherIcon, getWeatherDescription } from '@/services/api';
import type { WeatherData } from '@/types/weather';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Droplets } from 'lucide-react';

interface DailyForecastProps {
  data: WeatherData;
}

export function DailyForecast({ data }: DailyForecastProps) {
  const { daily } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="w-full backdrop-blur-sm bg-card/95 border-border/50">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-lg md:text-xl">7-Tage Vorhersage</CardTitle>
        </CardHeader>
        <CardContent className="px-3 md:px-6 pb-4 md:pb-6">
          <div className="space-y-2 md:space-y-3">
            {daily.time.map((time, index) => (
              <motion.div
                key={time}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between gap-2 md:gap-4 p-2.5 md:p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-default touch-manipulation"
              >
                <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                <p className="font-medium text-sm md:text-base w-16 md:w-24 capitalize shrink-0">
                  {index === 0
                    ? 'Heute'
                    : format(new Date(time), 'EEEE', { locale: de })}
                </p>
                <motion.span
                  className="text-2xl md:text-3xl shrink-0"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {getWeatherIcon(daily.weatherCode[index], true)}
                </motion.span>
                <p className="text-xs md:text-sm text-muted-foreground hidden sm:block flex-1 min-w-0 truncate">
                  {getWeatherDescription(daily.weatherCode[index])}
                </p>
              </div>

              <div className="flex items-center gap-2 md:gap-4 shrink-0">
                {daily.precipitationSum[index] > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="hidden sm:flex items-center gap-1 text-xs md:text-sm text-blue-500"
                  >
                    <Droplets className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
                    <span>{daily.precipitationSum[index].toFixed(0)}mm</span>
                  </motion.div>
                )}
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="text-muted-foreground text-xs md:text-sm">
                    {Math.round(daily.temperatureMin[index])}°
                  </span>
                  <div className="w-12 md:w-20 h-1 md:h-1.5 bg-gradient-to-r from-blue-400 via-yellow-400 to-red-400 rounded-full" aria-hidden="true" />
                  <span className="font-semibold text-sm md:text-base">
                    {Math.round(daily.temperatureMax[index])}°
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}
