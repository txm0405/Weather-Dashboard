import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Loader2, X } from 'lucide-react';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { useWeatherStore } from '@/stores/weatherStore';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const { data: results, isLoading } = useLocationSearch(debouncedQuery);
  const setSelectedLocation = useWeatherStore((state) => state.setSelectedLocation);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = useCallback((result: any) => {
    const locationName = result.admin1
      ? `${result.name}, ${result.admin1}, ${result.country}`
      : `${result.name}, ${result.country}`;
    
    setSelectedLocation({
      latitude: result.latitude,
      longitude: result.longitude,
      name: locationName,
    });
    setQuery('');
    setDebouncedQuery('');
    setShowResults(false);
    setFocusedIndex(-1);
    inputRef.current?.blur();
  }, [setSelectedLocation]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!results || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && results[focusedIndex]) {
          handleSelect(results[focusedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowResults(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [results, focusedIndex, handleSelect]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    setShowResults(false);
    setFocusedIndex(-1);
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative w-full max-w-xl" ref={resultsRef}>
      <div className="relative">
        <Search className="absolute left-3 md:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-4 md:h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Stadt oder Ort suchen..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
            setFocusedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowResults(true)}
          className="h-11 md:h-10 text-base md:text-sm pl-9 md:pl-10 pr-20 md:pr-20 touch-manipulation"
          aria-label="Stadt oder Ort suchen"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={showResults && results && results.length > 0}
          role="combobox"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-9 md:right-10 top-1/2 -translate-y-1/2 h-8 w-8 md:h-7 md:w-7 p-0 hover:bg-accent touch-manipulation active:scale-95 transition-transform"
            aria-label="Suche löschen"
          >
            <X className="w-4 h-4 md:w-3.5 md:h-3.5" />
          </Button>
        )}
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-4 md:h-4 animate-spin text-muted-foreground" aria-label="Lädt..." />
        )}
      </div>

      <AnimatePresence>
        {showResults && results && results.length > 0 && (
          <motion.div
            id="search-results"
            role="listbox"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full bg-card border rounded-md shadow-lg z-50 max-h-60 md:max-h-72 overflow-y-auto"
          >
            {results.map((result, index) => (
              <Button
                key={`${result.latitude}-${result.longitude}-${index}`}
                variant="ghost"
                role="option"
                aria-selected={focusedIndex === index}
                className={`w-full justify-start text-left h-auto py-3 md:py-3 px-3 md:px-4 hover:bg-accent transition-colors touch-manipulation active:scale-98 ${
                  focusedIndex === index ? 'bg-accent' : ''
                }`}
                onClick={() => handleSelect(result)}
              >
                <MapPin className="w-4 h-4 md:w-4 md:h-4 mr-2.5 md:mr-2 shrink-0 text-muted-foreground" aria-hidden="true" />
                <div className="flex flex-col items-start gap-0.5">
                  <span className="font-medium text-sm md:text-base">{result.name}</span>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {result.admin1 ? `${result.admin1}, ` : ''}
                    {result.country}
                  </span>
                </div>
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResults && query.length >= 2 && results && results.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full bg-card border rounded-md shadow-lg z-50 p-4 text-center text-sm text-muted-foreground"
            role="status"
          >
            Keine Ergebnisse gefunden
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
