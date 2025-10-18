import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useWeather } from '@/hooks/useWeather';
import { useWeatherStore } from '@/stores/weatherStore';
import { SearchBar } from '@/components/SearchBar';
import { WeatherCard } from '@/components/WeatherCard';
import { HourlyForecast } from '@/components/HourlyForecast';
import { DailyForecast } from '@/components/DailyForecast';
import { TemperatureChart } from '@/components/TemperatureChart';
import { WeatherCardSkeleton, ForecastSkeleton } from '@/components/SkeletonLoader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

const Index = () => {
  const { latitude: geoLat, longitude: geoLon, error: geoError, loading: geoLoading } = useGeolocation();
  const selectedLocation = useWeatherStore((state) => state.selectedLocation);
  
  const DEFAULT_LAT = 52.52;
  const DEFAULT_LON = 13.405;
  const DEFAULT_NAME = 'Berlin';
  
  const latitude = selectedLocation?.latitude ?? geoLat ?? DEFAULT_LAT;
  const longitude = selectedLocation?.longitude ?? geoLon ?? DEFAULT_LON;
  const locationName = selectedLocation?.name ?? (geoLat ? 'Aktueller Standort' : DEFAULT_NAME);

  const { data: weatherData, isLoading, error } = useWeather(latitude, longitude, locationName);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/40 px-4 py-3 md:py-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex-1">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Wetter Dashboard
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Aktuelle Wetterdaten und Vorhersagen
              </p>
            </div>
            <div className="ml-3 md:ml-4">
              <DarkModeToggle />
            </div>
          </div>
        </header>
        
        <div className="px-3 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6">

          <div className="flex justify-center">
            <SearchBar />
          </div>

        {geoError && !selectedLocation && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Standortzugriff nicht möglich. Bitte suchen Sie nach einer Stadt.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error instanceof Error ? error.message : 'Fehler beim Laden der Wetterdaten'}
            </AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="space-y-6">
            <WeatherCardSkeleton />
            <ForecastSkeleton />
          </div>
        )}

          {weatherData && (
            <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-1">
                  <WeatherCard data={weatherData} />
                </div>
                <div className="lg:col-span-2">
                  <TemperatureChart data={weatherData} />
                </div>
              </div>

              <HourlyForecast data={weatherData} />
              <DailyForecast data={weatherData} />
            </div>
          )}

          <footer className="text-center py-6 md:py-8 text-xs md:text-sm text-muted-foreground">
            <p>Daten bereitgestellt von Open-Meteo API</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
