import { describe, it, expect } from 'vitest';
import { getWeatherDescription, getWeatherIcon } from './api';

describe('Wetter Utility Functions', () => {
  describe('getWeatherDescription', () => {
    it('sollte korrekte Beschreibung für klares Wetter zurückgeben', () => {
      expect(getWeatherDescription(0)).toBe('Klar');
    });

    it('sollte korrekte Beschreibung für Regen zurückgeben', () => {
      expect(getWeatherDescription(61)).toBe('Leichter Regen');
      expect(getWeatherDescription(63)).toBe('Mäßiger Regen');
      expect(getWeatherDescription(65)).toBe('Starker Regen');
    });

    it('sollte korrekte Beschreibung für Schnee zurückgeben', () => {
      expect(getWeatherDescription(71)).toBe('Leichter Schneefall');
    });

    it('sollte "Unbekannt" für ungültige Codes zurückgeben', () => {
      expect(getWeatherDescription(999)).toBe('Unbekannt');
    });
  });

  describe('getWeatherIcon', () => {
    it('sollte Sonnen-Icon für klares Wetter am Tag zurückgeben', () => {
      expect(getWeatherIcon(0, true)).toBe('☀️');
    });

    it('sollte Mond-Icon für klares Wetter in der Nacht zurückgeben', () => {
      expect(getWeatherIcon(0, false)).toBe('🌙');
    });

    it('sollte Regen-Icon für Regenwetter zurückgeben', () => {
      expect(getWeatherIcon(61, true)).toBe('🌧️');
    });

    it('sollte Schnee-Icon für Schneewetter zurückgeben', () => {
      expect(getWeatherIcon(71, true)).toBe('🌨️');
    });

    it('sollte Gewitter-Icon für Gewitter zurückgeben', () => {
      expect(getWeatherIcon(95, true)).toBe('⛈️');
    });
  });
});
