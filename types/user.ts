export interface WatchlistItem {
  id: string;
  animeId: number;
  userId: string;
  addedAt: Date;
  anime: Anime;
}

export interface WatchProgress {
  id: string;
  animeId: number;
  episodeId: string;
  userId: string;
  currentEpisode: number;
  totalEpisodes: number;
  watchedAt: Date;
  progress: number; // percentage
}

export interface Comment {
  id: string;
  userId: string;
  animeId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  user?: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface Like {
  id: string;
  userId: string;
  animeId: number;
  createdAt: Date;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
 autoplay: boolean;
  quality: 'auto' | '1080p' | '720p' | '480p';
  subtitles: boolean;
}
