'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import AnimeCard from './AnimeCard';
import { Anime } from '@/types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface AnimeRowProps {
  title: string;
  animeList: Anime[];
  variant?: 'default' | 'small' | 'large';
  showInfo?: boolean;
  isLoading?: boolean;
}

export default function AnimeRow({
  title,
  animeList,
  variant = 'default',
  showInfo = true,
  isLoading = false,
}: AnimeRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <section className="py-6">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-40 flex-shrink-0 animate-pulse"
            >
              <div className="aspect-[2/3] bg-gray-800 rounded-xl" />
              <div className="mt-3 h-4 bg-gray-800 rounded w-3/4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 relative group/row">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <FaChevronLeft className="text-white" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <FaChevronRight className="text-white" />
          </button>
        </div>
      </div>

      {/* Anime Scroll Container */}
      <div
        ref={scrollRef}
        className={cn(
          'flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4',
          'scroll-smooth snap-x snap-mandatory'
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {animeList.map((anime, index) => (
          <motion.div
            key={anime.id}
            className="snap-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
          >
            <AnimeCard
              anime={anime}
              index={index}
              variant={variant}
              showInfo={showInfo}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
