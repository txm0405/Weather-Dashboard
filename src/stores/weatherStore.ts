import { create } from 'zustand';

interface WeatherStore {
  selectedLocation: { latitude: number; longitude: number; name: string } | null;
  setSelectedLocation: (location: { latitude: number; longitude: number; name: string }) => void;
  temperatureUnit: 'celsius' | 'fahrenheit';
  setTemperatureUnit: (unit: 'celsius' | 'fahrenheit') => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  temperatureUnit: 'celsius',
  setTemperatureUnit: (unit) => set({ temperatureUnit: unit }),
}));
