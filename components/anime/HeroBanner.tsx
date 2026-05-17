'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Anime } from '@/types';
import { cn, truncateText } from '@/lib/utils';
import { FaPlay, FaInfoCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface HeroBannerProps {
  animeList: Anime[];
  isLoading?: boolean;
}

export default function HeroBanner({ animeList, isLoading = false }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentAnime = animeList[currentIndex];

  useEffect(() => {
    if (!isAutoPlaying || isLoading || animeList.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animeList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isLoading, animeList.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + animeList.length) % animeList.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % animeList.length);
  };

  if (isLoading || animeList.length === 0) {
    return (
      <div className="relative h-[70vh] md:h-[80vh] bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAnime.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            {currentAnime.bannerImage ? (
              <Image
                src={currentAnime.bannerImage}
                alt={currentAnime.title.english || currentAnime.title.romaji}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-primary-600 to-purple-600" />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-end pb-16 md:pb-20">
            <div className="max-w-2xl space-y-4 md:space-y-6">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                {currentAnime.title.english || currentAnime.title.romaji}
              </motion.h1>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-3 text-sm md:text-base text-gray-300"
              >
                {currentAnime.averageScore && (
                  <span className="px-3 py-1 bg-primary-500/20 border border-primary-500/50 rounded-full text-primary-400 font-semibold">
                    {currentAnime.averageScore}% Score
                  </span>
                )}
                <span>{currentAnime.seasonYear}</span>
                <span>•</
