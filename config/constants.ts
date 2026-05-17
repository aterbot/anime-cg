// API Configuration
export const API_CONFIG = {
  ANILIST_URL: process.env.NEXT_PUBLIC_ANILIST_API_URL || 'https://graphql.anilist.co',
  JIKAN_URL: process.env.NEXT_PUBLIC_JIKAN_API_URL || 'https://api.jikan.moe/v4',
  CONSUMET_URL: process.env.NEXT_PUBLIC_CONSUMET_API_URL || 'https://api.consumet.org',
};

// Application Configuration
export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || 'AnimeStream',
  URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  DEFAULT_PAGE_SIZE: 20,
  HERO_ANIME_COUNT: 5,
  ROW_ANIME_COUNT: 12,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 50,
};

// Video Player Settings
export const PLAYER_CONFIG = {
  DEFAULT_PLAYBACK_RATE: 1,
  AVAILABLE_SPEEDS: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  AUTO_NEXT_TIMEOUT: 10, // seconds
};

// Genre List
export const GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Slice of Life',
  'Sports', 'Supernatural', 'Mecha', 'Music', 'Psychological',
  'School', 'Isekai', 'Shounen', 'Shoujo', 'Seinen', 'Josei'
];
