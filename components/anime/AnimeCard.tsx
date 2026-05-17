'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Anime } from '@/types';
import { cn, truncateText, formatDate } from '@/lib/utils';
import { FaPlay, FaHeart, FaStar } from 'react-icons/fa';
import { useStore } from '@/store/useStore';

interface AnimeCardProps {
  anime: Anime;
  index?: number;
  variant?: 'default' | "small" | 'large';
  showInfo?: boolean;
}

export default function AnimeCard({
  anime,
  index = 0,
  variant = 'default',
  showInfo = true,
}: AnimeCardProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useStore();
  const inWatchlist = isInWatchlist(anime.id);

  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(anime.id);
    } else {
      addToWatchlist(anime.id);
    }
  };

  const variants = {
    default: 'w-40 md:w-48',
    small: 'w-32 md:w-36',
    large: 'w-56 md:w-64',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={cn(
        'relative group cursor-pointer rounded-xl overflow-hidden',
        variants[variant],
        'flex-shrink-0 anime-card-hover'
      )}
    >
      {/* Cover Image */}
      <Link href={`/anime/${anime.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
          <Image
            src={anime.coverImage.extraLarge || anime.coverImage.large}
            alt={anime.title.english || anime.title.romaji}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 256px"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <FaPlay className="text-white text-xl ml-1" />
            </div>
          </div>

          {/* Score badge */}
          {anime.averageScore && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg flex items-center gap-1">
              <FaStar className="text-yellow-400 text-xs" />
              <span className="text-white text-xs font-semibold">{anime.averageScore}%</span>
            </div>
          )}

          {/* Watchlist button */}
          <button
            onClick={handleToggleWatchlist}
            className="absolute top-2 right-2 p-2 rounded-full bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary-500"
          >
            <FaHeart className={cn(
              'text-sm transition-colors',
              inWatchlist ? 'text-primary-500' : 'text-white'
            )} />
          </button>

          {/* Episode count */}
          {anime.episodes && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg">
              <span className="text-white text-xs">{anime.episodes} eps</span>
            </div>
          )}
        </div>

        {/* Anime Info */}
        {showInfo && (
          <div className="mt-3 space-y-1">
            <h3 className="font-semibold text-white text-sm md:text-base line-clamp-1 group-hover:text-primary-500 transition-colors">
              {anime.title.english || anime.title.romaji}
            </h3>
            
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{anime.seasonYear}</span>
              <span>•</span>
              <span>{anime.format === 'TV' ? 'TV' : anime.format}</span>
            </div>

            {anime.genres && anime.genres.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {anime.genres.slice(0, 2).map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
