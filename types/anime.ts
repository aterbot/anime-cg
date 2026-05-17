export interface AnimeTitle {
  romaji: string;
  english: string | null;
  native: string;
  userPreferred: string;
}

export interface AnimeImage {
  large: string;
  medium: string;
  extraLarge?: string;
  color?: string;
}

export interface AnimeStudio {
  id: number;
  name: string;
  isMain: boolean;
}

export interface AnimeTrailer {
  id: string;
  site: string;
  thumbnail: string;
}

export interface AiringSchedule {
  airingAt: number;
  timeUntilAiring: number;
  episode: number;
}

export interface Anime {
  id: number;
  idMal: number;
  title: AnimeTitle;
  description: string | null;
  type: string;
  format: string;
  status: string;
  episodes: number | null;
  duration: number | null;
  genres: string[];
  synonyms: string[];
  season: string;
  seasonYear: number;
  averageScore: number | null;
  popularity: number | null;
  trending: number | null;
  favourites: number | null;
  coverImage: AnimeImage;
  bannerImage: string | null;
  studios: { edges: { isMain: boolean; node: AnimeStudio }[] };
  trailer: AnimeTrailer | null;
  nextAiringEpisode: AiringSchedule | null;
  source: string;
  hashtag: string | null;
  updatedAt: number;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  description: string | null;
  thumbnail: string;
  isFiller: boolean;
}

export interface VideoSource {
  url: string;
  quality: string;
  isM3U8: boolean;
}

export interface StreamingServers {
  [server: string]: VideoSource[];
}

export interface AnimeInfo {
  id: string;
  idMal?: number;
  title: string;
  description?: string;
  status?: string;
  cover?: string;
  surroundings?: Anime[];
  startDate?: string;
  endDate?: string;
  totalEpisodes?: number;
  episodeList?: Episode[];
  genres?: string[];
  synonyms?: string[];
  otherInfo?: Record<string, string>;
}
