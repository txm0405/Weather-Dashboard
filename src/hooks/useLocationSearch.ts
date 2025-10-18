import { useQuery } from '@tanstack/react-query';
import { searchLocations } from '@/services/api';

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: ['locations', query],
    queryFn: () => searchLocations(query),
    enabled: query.length >= 2,
    staleTime: 10 * 60 * 1000,
  });
}
