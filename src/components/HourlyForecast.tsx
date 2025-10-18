import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getWeatherIcon } from '@/services/api';
import type { WeatherData } from '@/types/weather';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface HourlyForecastProps {
  data: WeatherData;
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  const { hourly } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="w-full backdrop-blur-sm bg-card/95 border-border/50">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-lg md:text-xl">48-Stunden Vorhersage</CardTitle>
        </CardHeader>
        <CardContent className="px-3 md:px-6 pb-4 md:pb-6">
          <ScrollArea className="w-full -mx-3 md:mx-0">
            <div className="flex gap-2 md:gap-3 pb-4 px-3 md:px-0" style={{ scrollSnapType: 'x mandatory' }}>
              {hourly.time.map((time, index) => (
                <motion.div
                  key={time}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center gap-1.5 md:gap-2 min-w-[72px] md:min-w-[80px] p-2.5 md:p-3 rounded-xl bg-gradient-to-br from-accent/80 to-accent/40 hover:from-accent hover:to-accent/60 transition-all duration-300 cursor-pointer touch-manipulation"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <p className="text-xs md:text-sm font-medium">
                    {format(new Date(time), 'HH:mm', { locale: de })}
                  </p>
                  <p className="text-[10px] md:text-xs text-muted-foreground capitalize">
                    {format(new Date(time), 'EEE', { locale: de })}
                  </p>
                  <motion.span
                    className="text-2xl md:text-3xl"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {getWeatherIcon(hourly.weatherCode[index], true)}
                  </motion.span>
                  <p className="text-base md:text-lg font-semibold">
                    {Math.round(hourly.temperature[index])}°
                  </p>
                  {hourly.precipitation[index] > 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] md:text-xs text-blue-500 font-medium"
                    >
                      💧 {hourly.precipitation[index].toFixed(1)}mm
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
}
