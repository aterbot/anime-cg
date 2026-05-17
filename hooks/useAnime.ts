import { useState, useEffect, useCallback } from 'react';
import { Anime } from '@/types';
import {
  fetchTrendingAnime,
  fetchPopularAnime,
  fetchTopRatedAnime,
  fetchSeasonalAnime,
  searchAnime,
  fetchAnimeById,
} from '@/services/anilist.service';

export function useTrendingAnime(perPage = 12) {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnime = async () => {
      try {
        setLoading(true);
        const data = await fetchTrendingAnime(perPage);
        setAnime(data.media);
      } catch (err) {
        setError('Failed to load trending anime');
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
  }, [perPage]);

  return { anime, loading, error };
}

export function usePopularAnime(perPage = 12) {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnime = async () => {
      try {
        setLoading(true);
        const data = await fetchPopularAnime(perPage);
        setAnime(data.media);
      } catch (err) {
        setError('Failed to load popular anime');
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
  }, [perPage]);

  return { anime, loading, error };
}

export function useTopRatedAnime(perPage = 12) {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnime = async () => {
      try {
        setLoading(true);
        const data = await fetchTopRatedAnime(perPage);
        setAnime(data.media);
      } catch (err) {
        setError('Failed to load top rated anime');
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
  }, [perPage]);

  return { anime, loading, error };
}

export function useSeasonalAnime(season: string = 'AUTO') {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnime = async () => {
      try {
        setLoading(true);
        const data = await fetchSeasonalAnime(season);
        setAnime(data.media);
      } catch (err) {
        setError('Failed to load seasonal anime');
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
  }, [season]);

  return { anime, loading, error };
}

export function useAnimeSearch() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string, page = 1) => {
    if (!query.trim()) {
      setAnime([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchAnime(query, page);
      setAnime(data.media);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { anime, loading, error, search };
}

export function useAnimeById(id: number) {
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnime = async () => {
      try {
        setLoading(true);
        const data = await fetchAnimeById(id);
        setAnime(data);
      } catch (err) {
        setError('Failed to load anime details');
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
  }, [id]);

  return { anime, loading, error };
}
