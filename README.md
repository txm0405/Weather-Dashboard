# Wetter Dashboard

Ein modernes, reaktionsfähiges Wetter-Dashboard mit Echtzeit-Wetterdaten und Vorhersagen.

## Features

- 🌡️ Aktuelle Wetterbedingungen (Temperatur, Luftfeuchtigkeit, Wind, Luftdruck)
- 📊 Temperaturverlauf als interaktives Diagramm
- 🕐 48-Stunden Vorhersage
- 📅 7-Tage Wettervorhersage
- 🔍 Standortsuche mit Autocomplete
- 📍 Automatische Standorterkennung via Geolocation
- 🌓 Dark Mode Unterstützung
- 📱 Vollständig responsive (Mobile-First Design)
- ♿ Barrierefrei (ARIA-Labels, Keyboard-Navigation)

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts
- **Testing**: Vitest + React Testing Library
- **API**: Open-Meteo (keine API-Keys erforderlich)

## Setup

### Voraussetzungen

- Node.js 18+ und npm

### Installation

```bash
# Repository klonen
git clone https://github.com/txm0405/Weather-Dashboard.git

# In Projektverzeichnis wechseln
cd Weather-Dashboard

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Anwendung ist dann unter `http://localhost:8080` verfügbar.

### Umgebungsvariablen

Erstellen Sie eine `.env` Datei basierend auf `.env.example`:

```bash
cp .env.example .env
```

Die Standardkonfiguration verwendet Open-Meteo und benötigt keine API-Keys.

## Scripts

```bash
# Entwicklungsserver starten
npm run dev

# Production Build erstellen
npm run build

# Production Build lokal testen
npm run preview

# Tests ausführen
npm run test

# Tests mit UI
npm run test:ui

# Type Checking
npm run type-check
```

## Tests

Das Projekt enthält Unit Tests für:
- Custom Hooks (`useWeather`)
- Komponenten (`WeatherCard`)
- Utility Functions (`getWeatherDescription`, `getWeatherIcon`)

Tests ausführen:
```bash
npm run test
```

## Deployment

### Vercel

```bash
# Vercel CLI installieren
npm i -g vercel

# Deployen
vercel
```

### Netlify

```bash
# Netlify CLI installieren
npm i -g netlify-cli

# Deployen
netlify deploy
```

Oder nutzen Sie die Web-Oberflächen und verbinden Sie Ihr Git Repository.

## Projektstruktur

```
src/
├── components/        # React Komponenten
│   ├── ui/           # shadcn/ui Basis-Komponenten
│   ├── WeatherCard.tsx
│   ├── SearchBar.tsx
│   ├── HourlyForecast.tsx
│   ├── DailyForecast.tsx
│   └── TemperatureChart.tsx
├── hooks/            # Custom React Hooks
│   ├── useWeather.ts
│   ├── useGeolocation.ts
│   └── useLocationSearch.ts
├── services/         # API Services
│   └── api.ts
├── stores/           # Zustand Stores
│   └── weatherStore.ts
├── types/            # TypeScript Typen
│   └── weather.ts
├── pages/            # Seiten
│   └── Index.tsx
└── test/             # Test Setup
    └── setup.ts
```

## Architektur-Entscheidungen

- **TanStack Query** für serverseitiges State Management mit automatischem Caching und Stale-While-Revalidate
- **Zustand** für minimalen clientseitigen globalen State (Standortauswahl)
- **Open-Meteo API** als zuverlässige, kostenlose Wetterdaten-Quelle ohne API-Key Requirement
- **shadcn/ui** für konsistente, zugängliche UI-Komponenten mit voller Kontrolle
- **Mobile-First Design** für optimale Performance auf allen Geräten

## Browser Support

- Chrome/Edge (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)

## Lizenz

MIT
