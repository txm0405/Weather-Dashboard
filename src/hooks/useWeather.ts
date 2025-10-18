import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '@/services/api';

export function useWeather(
  latitude: number | null,
  longitude: number | null,
  locationName?: string
) {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => {
      if (latitude === null || longitude === null) {
        throw new Error('Koordinaten erforderlich');
      }
      return fetchWeatherData(latitude, longitude, locationName);
    },
    enabled: latitude !== null && longitude !== null,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
