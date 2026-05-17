import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

/**
 * Supabase client for database operations
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Get watchlist for user
 */
export async function getWatchlist(userId: string) {
  const { data, error } = await supabase
    .from('watchlist')
    .select('*')
    .eq('user_id', userId)
    .order('added_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

/**
 * Add to watchlist
 */
export async function addToWatchlist(userId: string, animeId: number) {
  const { data, error } = await supabase
    .from('watchlist')
    .insert([{ user_id: userId, anime_id: animeId }])
    .select();
  
  if (error) throw error;
  return data;
}

/**
 * Remove from watchlist
 */
export async function removeFromWatchlist(userId: string, animeId: number) {
  const { error } = await supabase
    .from('watchlist')
    .delete()
    .eq('user_id', userId)
    .eq('anime_id', animeId);
  
  if (error) throw error;
}

/**
 * Update watch progress
 */
export async function updateProgress(
  userId: string,
  animeId: number,
  episode: number,
  totalEpisodes: number,
  progress: number
) {
  const { data, error } = await supabase
    .from('watch_progress')
    .upsert({
      user_id: userId,
      anime_id: animeId,
      current_episode: episode,
      total_episodes: totalEpisodes,
      progress,
      watched_at: new Date().toISOString(),
    })
    .select();
  
  if (error) throw error;
  return data;
}

/**
 * Get continue watching list
 */
export async function getContinueWatching(userId: string) {
  const { data, error } = await supabase
    .from('watch_progress')
    .select('*')
    .eq('user_id', userId)
    .order('watched_at', { ascending: false })
    .limit(10);
  
  if (error) throw error;
  return data;
}
