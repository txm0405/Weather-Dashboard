import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { WeatherCard } from './WeatherCard';
import type { WeatherData } from '@/types/weather';

const mockWeatherData: WeatherData = {
  current: {
    temperature: 20,
    feelsLike: 18,
    humidity: 65,
    pressure: 1013,
    windSpeed: 15,
    windDirection: 180,
    visibility: 10000,
    weatherCode: 0,
    isDay: true,
    time: '2025-01-15T12:00',
  },
  daily: {
    time: ['2025-01-15'],
    temperatureMax: [22],
    temperatureMin: [15],
    weatherCode: [0],
    sunrise: ['2025-01-15T07:30'],
    sunset: ['2025-01-15T17:45'],
    uvIndexMax: [3.5],
    precipitationSum: [0],
  },
  hourly: {
    time: ['2025-01-15T12:00'],
    temperature: [20],
    weatherCode: [0],
    precipitation: [0],
  },
  location: {
    name: 'Berlin',
    latitude: 52.52,
    longitude: 13.405,
  },
};

describe('WeatherCard', () => {
  it('sollte Standortnamen anzeigen', () => {
    const { getByText } = render(<WeatherCard data={mockWeatherData} />);
    expect(getByText('Berlin')).toBeInTheDocument();
  });

  it('sollte aktuelle Temperatur anzeigen', () => {
    const { getByText } = render(<WeatherCard data={mockWeatherData} />);
    expect(getByText('20°C')).toBeInTheDocument();
  });

  it('sollte gefühlte Temperatur anzeigen', () => {
    const { getByText } = render(<WeatherCard data={mockWeatherData} />);
    expect(getByText(/Gefühlt wie 18°C/)).toBeInTheDocument();
  });

  it('sollte Luftfeuchtigkeit anzeigen', () => {
    const { getByText } = render(<WeatherCard data={mockWeatherData} />);
    expect(getByText('65%')).toBeInTheDocument();
  });

  it('sollte Windgeschwindigkeit anzeigen', () => {
    const { getByText } = render(<WeatherCard data={mockWeatherData} />);
    expect(getByText('15 km/h')).toBeInTheDocument();
  });

  it('sollte UV-Index anzeigen', () => {
    const { getByText } = render(<WeatherCard data={mockWeatherData} />);
    expect(getByText('3.5')).toBeInTheDocument();
  });
});
