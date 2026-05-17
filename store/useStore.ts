import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Anime, Episode } from '@/types';

interface AnimeStore {
  // State
  watchlist: number[];
  continueWatching: { animeId: number; episode: number; anime: Anime }[];
  currentAnime: Anime | null;
  currentEpisode: Episode | null;
  
  // Watchlist actions
  addToWatchlist: (animeId: number) => void;
  removeFromWatchlist: (animeId: number) => void;
  isInWatchlist: (animeId: number) => boolean;
  
  // Continue watching actions
  updateProgress: (animeId: number, episode: number, anime: Anime) => void;
  getProgress: (animeId: number) => number | null;
  clearProgress: (animeId: number) => void;
  
  // Current anime/actions
  setCurrentAnime: (anime: Anime | null) => void;
  setCurrentEpisode: (episode: Episode | null) => void;
}

export const useStore = create<AnimeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      watchlist: [],
      continueWatching: [],
      currentAnime: null,
      currentEpisode: null,

      // Watchlist actions
      addToWatchlist: (animeId) =>
        set((state) => ({
          watchlist: [...state.watchlist, animeId],
        })),

      removeFromWatchlist: (animeId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((id) => id !== animeId),
        })),

      isInWatchlist: (animeId) => get().watchlist.includes(animeId),

      // Continue watching actions
      updateProgress: (animeId, episode, anime) =>
        set((state) => {
          const existing = state.continueWatching.findIndex(
            (item) => item.animeId === animeId
          );
          
          if (existing >= 0) {
            const updated = [...state.continueWatching];
            updated[existing] = { animeId, episode, anime };
            return { continueWatching: updated };
          }
          
          return {
            continueWatching: [
              ...state.continueWatching.slice(0, 9),
              { animeId, episode, anime },
            ],
          };
        }),

      getProgress: (animeId) => {
        const item = get().continueWatching.find(
          (item) => item.animeId === animeId
        );
        return item?.episode || null;
      },

      clearProgress: (animeId) =>
        set((state) => ({
          continueWatching: state.continueWatching.filter(
            (item) => item.animeId !== animeId
          ),
        })),

      // Current anime actions
      setCurrentAnime: (anime) => set({ currentAnime: anime }),
      setCurrentEpisode: (episode) => set({ currentEpisode: episode }),
    }),
    {
      name: 'anime-storage',
      partialize: (state) => ({
        watchlist: state.watchlist,
        continueWatching: state.continueWatching,
      }),
    }
  )
);
