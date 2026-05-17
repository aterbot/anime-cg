import axios from 'axios';
import { API_CONFIG } from '@/config/constants';
import { AnimeInfo, Episode, VideoSource } from '@/types';

const CONSUMET_URL = API_CONFIG.CONSUMET_URL;

/**
 * Fetch anime info from Consumet API
 */
export async function fetchAnimeInfo(animeId: string): Promise<AnimeInfo> {
  try {
    const response = await axios.get<AnimeInfo>(
      `${CONSUMET_URL}/anime/gogoanime/info/${animeId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching anime info:', error);
    throw error;
  }
}

/**
 * Fetch episode sources/streaming links
 */
export async function fetchEpisodeSources(
  episodeId: string,
  server: string = 'gogostream'
): Promise<{ sources: VideoSource[]; subtitles: unknown[] }> {
  try {
    const response = await axios.get(
      `${CONSUMET_URL}/anime/gogoanime/watch/${episodeId}?server=${server}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching episode sources:', error);
    throw error;
  }
}

/**
 * Search anime on Consumet
 */
export async function searchAnime(query: string, page = 1) {
  try {
    const response = await axios.get(
      `${CONSUMET_URL}/anime/gogoanime/${encodeURIComponent(query)}?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
}

/**
 * Fetch recent episodes
 */
export async function fetchRecentEpisodes(page = 1) {
  try {
    const response = await axios.get(
      `${CONSUMET_URL}/anime/gogoanime/recent-episodes?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching recent episodes:', error);
    throw error;
  }
}

/**
 * Get server list
 */
export function getServerList(): string[] {
  return ['gogostream', 'vidstreaming', 'megacloud', 'streamsb', 'doodstream'];
}
