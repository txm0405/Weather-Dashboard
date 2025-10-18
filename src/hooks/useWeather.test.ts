import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWeather } from './useWeather';
import * as api from '@/services/api';
import React from 'react';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
  
  return Wrapper;
};

describe('useWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sollte keine Daten abrufen wenn Koordinaten null sind', () => {
    const { result } = renderHook(
      () => useWeather(null, null),
      { wrapper: createWrapper() }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('sollte Wetterdaten abrufen mit gültigen Koordinaten', async () => {
    const mockWeatherData = {
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
        name: 'Test Stadt',
        latitude: 52.52,
        longitude: 13.405,
      },
    };

    vi.spyOn(api, 'fetchWeatherData').mockResolvedValue(mockWeatherData);

    const { result } = renderHook(
      () => useWeather(52.52, 13.405, 'Test Stadt'),
      { wrapper: createWrapper() }
    );

    await vi.waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockWeatherData);
  });

  it('sollte Fehler handhaben', async () => {
    vi.spyOn(api, 'fetchWeatherData').mockRejectedValue(
      new Error('API Fehler')
    );

    const { result } = renderHook(
      () => useWeather(52.52, 13.405),
      { wrapper: createWrapper() }
    );

    await vi.waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
