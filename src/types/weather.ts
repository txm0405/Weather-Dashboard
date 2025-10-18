export interface WeatherData {
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    visibility: number;
    weatherCode: number;
    isDay: boolean;
    time: string;
  };
  daily: {
    time: string[];
    temperatureMax: number[];
    temperatureMin: number[];
    weatherCode: number[];
    sunrise: string[];
    sunset: string[];
    uvIndexMax: number[];
    precipitationSum: number[];
  };
  hourly: {
    time: string[];
    temperature: number[];
    weatherCode: number[];
    precipitation: number[];
  };
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
}

export interface SearchResult {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}
