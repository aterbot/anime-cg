import axios from 'axios';
import { API_CONFIG } from '@/config/constants';
import { Anime, AniListResponse, SearchParams } from '@/types';

const ANILIST_URL = API_CONFIG.ANILIST_URL;

/**
 * AniList GraphQL Query for anime data
 */
const ANIME_QUERY = `
  query ($page: Int, $perPage: Int, $search: String, $genre: String, $sort: [MediaSort], $season: MediaSeason, $seasonYear: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(search: $search, type: ANIME, genre: $genre, sort: $sort, season: $season, seasonYear: $seasonYear) {
        id
        idMal
        title {
          romaji
          english
          native
          userPreferred
        }
        description(asHtml: false)
        type
        format
        status
        episodes
        duration
        genres
        synonyms
        season
        seasonYear
        averageScore
        popularity
        trending
        favourites
        coverImage {
          large
          medium
          extraLarge
          color
        }
        bannerImage
        studios(isMain: true) {
          edges {
            isMain
            node {
              id
              name
            }
          }
        }
        trailer {
          id
          site
          thumbnail
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        source
        hashtag
        updatedAt
      }
    }
  }
`;

/**
 * Query for single anime details
 */
const ANIME_DETAILS_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      idMal
      title {
        romaji
        english
        native
        userPreferred
      }
      description(asHtml: false)
      type
      format
      status
      episodes
      duration
      genres
      synonyms
      season
      seasonYear
      averageScore
      popularity
      trending
      favourites
      coverImage {
        large
        medium
        extraLarge
        color
      }
      bannerImage
      studios(isMain: true) {
        edges {
          isMain
          node {
            id
            name
          }
        }
      }
      trailer {
        id
        site
        thumbnail
      }
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      source
      hashtag
      updatedAt
      recommendations {
        edges {
          node {
            mediaRecommendation {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
                medium
              }
              episodes
              status
              averageScore
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch anime from AniList API
 */
export async function fetchAniListAnime(params: SearchParams = {}) {
  try {
    const variables = {
      page: params.page || 1,
      perPage: params.perPage || 20,
      search: params.search || null,
      genre: params.genre || null,
      sort: params.sort || ['POPULARITY_DESC'],
      season: params.season || null,
      seasonYear: params.seasonYear || null,
    };

    const response = await axios.post<AniListResponse>(
      ANILIST_URL,
      {
        query: ANIME_QUERY,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    return response.data.data.Page;
  } catch (error) {
    console.error('Error fetching from AniList:', error);
    throw error;
  }
}

/**
 * Fetch single anime by ID
 */
export async function fetchAnimeById(id: number) {
  try {
    const response = await axios.post<AniListResponse>(
      ANILIST_URL,
      {
        query: ANIME_DETAILS_QUERY,
        variables: { id },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    return response.data.data.Media;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
}

/**
 * Fetch trending anime
 */
export async function fetchTrendingAnime(perPage = 12) {
  return fetchAniListAnime({ perPage, sort: ['TRENDING_DESC'] });
}

/**
 * Fetch popular anime
 */
export async function fetchPopularAnime(perPage = 12) {
  return fetchAniListAnime({ perPage, sort: ['POPULARITY_DESC'] });
}

/**
 * Fetch top rated anime
 */
export async function fetchTopRatedAnime(perPage = 12) {
  return fetchAniListAnime({ perPage, sort: ['SCORE_DESC'] });
}

/**
 * Fetch seasonal anime
 */
export async function fetchSeasonalAnime(season: string = 'AUTO', perPage = 12) {
  return fetchAniListAnime({ perPage, season });
}

/**
 * Search anime
 */
export async function searchAnime(query: string, page = 1, perPage = 20) {
  return fetchAniListAnime({ search: query, page, perPage });
}

/**
 * Fetch anime by genre
 */
export async function fetchByGenre(genre: string, perPage = 12) {
  return fetchAniListAnime({ genre, perPage });
}
