import type { WeatherData, SearchResult } from '@/types/weather';

const WEATHER_API = 'https://api.open-meteo.com/v1';
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1';

export async function fetchWeatherData(
  latitude: number,
  longitude: number,
  locationName: string = 'Aktueller Standort'
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,visibility',
    hourly: 'temperature_2m,weather_code,precipitation',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum',
    timezone: 'auto',
    forecast_days: '7',
  });

  const response = await fetch(`${WEATHER_API}/forecast?${params}`);
  
  if (!response.ok) {
    throw new Error('Wetterdaten konnten nicht geladen werden');
  }

  const data = await response.json();

  return {
    current: {
      temperature: data.current.temperature_2m,
      feelsLike: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      pressure: data.current.surface_pressure,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      visibility: data.current.visibility,
      weatherCode: data.current.weather_code,
      isDay: data.current.is_day === 1,
      time: data.current.time,
    },
    daily: {
      time: data.daily.time,
      temperatureMax: data.daily.temperature_2m_max,
      temperatureMin: data.daily.temperature_2m_min,
      weatherCode: data.daily.weather_code,
      sunrise: data.daily.sunrise,
      sunset: data.daily.sunset,
      uvIndexMax: data.daily.uv_index_max,
      precipitationSum: data.daily.precipitation_sum,
    },
    hourly: {
      time: data.hourly.time.slice(0, 48),
      temperature: data.hourly.temperature_2m.slice(0, 48),
      weatherCode: data.hourly.weather_code.slice(0, 48),
      precipitation: data.hourly.precipitation.slice(0, 48),
    },
    location: {
      name: locationName,
      latitude,
      longitude,
    },
  };
}

export async function searchLocations(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    name: query,
    count: '5',
    language: 'de',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_API}/search?${params}`);
  
  if (!response.ok) {
    throw new Error('Ortssuche fehlgeschlagen');
  }

  const data = await response.json();

  if (!data.results) {
    return [];
  }

  return data.results.map((result: any) => ({
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
    admin1: result.admin1,
  }));
}

export function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: 'Klar',
    1: 'Überwiegend klar',
    2: 'Teilweise bewölkt',
    3: 'Bewölkt',
    45: 'Neblig',
    48: 'Nebel mit Reifablagerung',
    51: 'Leichter Nieselregen',
    53: 'Mäßiger Nieselregen',
    55: 'Starker Nieselregen',
    61: 'Leichter Regen',
    63: 'Mäßiger Regen',
    65: 'Starker Regen',
    71: 'Leichter Schneefall',
    73: 'Mäßiger Schneefall',
    75: 'Starker Schneefall',
    77: 'Schneegriesel',
    80: 'Leichte Regenschauer',
    81: 'Mäßige Regenschauer',
    82: 'Starke Regenschauer',
    85: 'Leichte Schneeschauer',
    86: 'Starke Schneeschauer',
    95: 'Gewitter',
    96: 'Gewitter mit leichtem Hagel',
    99: 'Gewitter mit starkem Hagel',
  };

  return descriptions[code] || 'Unbekannt';
}

export function getWeatherIcon(code: number, isDay: boolean = true): string {
  if (code === 0 || code === 1) return isDay ? '☀️' : '🌙';
  if (code === 2) return isDay ? '⛅' : '☁️';
  if (code === 3) return '☁️';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 55) return '🌦️';
  if (code >= 61 && code <= 65) return '🌧️';
  if (code >= 71 && code <= 77) return '🌨️';
  if (code >= 80 && code <= 82) return '🌧️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95) return '⛈️';
  return '☁️';
}
