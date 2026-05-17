import { useState, useCallback, useEffect } from 'react';
import { debounce } from '@/utils';
import { useAnimeSearch } from './useAnime';
import { Anime } from '@/types';

export function useDebouncedSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Anime[]>([]);
  const { anime, loading, error, search } = useAnimeSearch();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      await search(searchQuery, 1);
    }, 300),
    [search]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  useEffect(() => {
    setSuggestions(anime.slice(0, 8));
  }, [anime]);

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  return {
    query,
    suggestions,
    loading,
    error,
    handleSearch,
    clearSearch,
  };
}
