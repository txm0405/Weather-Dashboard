import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getWeatherIcon, getWeatherDescription } from '@/services/api';
import { AnimatedWeatherIcon } from '@/components/AnimatedWeatherIcon';
import { ParallaxBackground } from '@/components/ParallaxBackground';
import type { WeatherData } from '@/types/weather';
import { Wind, Droplets, Gauge, Eye, Sunrise, Sunset, Sun } from 'lucide-react';
import { useState } from 'react';

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const { current, daily, location } = data;
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const convertTemp = (celsius: number) => {
    if (unit === 'F') {
      return Math.round((celsius * 9/5) + 32);
    }
    return Math.round(celsius);
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <Card className="w-full overflow-hidden backdrop-blur-sm bg-card/95 border-border/50 shadow-xl">
        <ParallaxBackground isDay={current.isDay} />
        
        <CardHeader className="relative z-10 pb-3 md:pb-6">
          <CardTitle className="text-xl md:text-2xl flex items-center justify-between gap-2">
            <motion.span variants={itemVariants} className="truncate flex-1 min-w-0">
              {location.name}
            </motion.span>
            <motion.div variants={itemVariants} className="flex gap-1.5 md:gap-2 shrink-0">
              <Button
                variant={unit === 'C' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUnit('C')}
                className="w-10 h-9 md:w-12 md:h-10 text-sm md:text-base touch-manipulation transition-all duration-200 active:scale-95"
                aria-label="Celsius anzeigen"
              >
                °C
              </Button>
              <Button
                variant={unit === 'F' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUnit('F')}
                className="w-10 h-9 md:w-12 md:h-10 text-sm md:text-base touch-manipulation transition-all duration-200 active:scale-95"
                aria-label="Fahrenheit anzeigen"
              >
                °F
              </Button>
            </motion.div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 md:space-y-6 relative z-10 px-4 md:px-6 pb-4 md:pb-6">
          <motion.div variants={itemVariants} className="text-center">
            <div className="scale-90 md:scale-100">
              <AnimatedWeatherIcon 
                icon={getWeatherIcon(current.weatherCode, current.isDay)}
                isDay={current.isDay}
              />
            </div>
            <motion.div 
              className="text-5xl md:text-7xl font-bold mt-3 md:mt-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {convertTemp(current.temperature)}°{unit}
            </motion.div>
            <p className="text-muted-foreground text-base md:text-lg mt-2">
              {getWeatherDescription(current.weatherCode)}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Gefühlt wie {convertTemp(current.feelsLike)}°{unit}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2 md:gap-4">
            {[
              { icon: Wind, label: 'Wind', value: `${Math.round(current.windSpeed)} km/h` },
              { icon: Droplets, label: 'Luftfeuchtigkeit', value: `${current.humidity}%` },
              { icon: Gauge, label: 'Luftdruck', value: `${Math.round(current.pressure)} hPa` },
              { icon: Eye, label: 'Sicht', value: `${(current.visibility / 1000).toFixed(1)} km` },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-200 cursor-default touch-manipulation"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground shrink-0" aria-hidden="true" />
                <div className="text-xs md:text-sm min-w-0">
                  <p className="text-muted-foreground truncate leading-tight">{item.label}</p>
                  <p className="font-semibold truncate mt-0.5">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-2 md:gap-4 pt-3 md:pt-4 border-t border-border/50"
          >
            {[
              { icon: Sunrise, label: 'Sonnenaufgang', value: formatTime(daily.sunrise[0]) },
              { icon: Sunset, label: 'Sonnenuntergang', value: formatTime(daily.sunset[0]) },
              { icon: Sun, label: 'UV-Index', value: daily.uvIndexMax[0].toFixed(1) },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-lg hover:bg-accent/30 transition-colors duration-200 touch-manipulation"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" aria-hidden="true" />
                <p className="text-[10px] md:text-xs text-muted-foreground text-center leading-tight px-1">
                  {item.label}
                </p>
                <p className="text-xs md:text-sm font-medium">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
