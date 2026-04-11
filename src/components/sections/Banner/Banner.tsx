'use client';

import React from 'react';

interface BannerProps {
  desktopSrc?: string;
  laptopSrc?: string;
  mobileSrc?: string;
  alt?: string;
}

const Banner: React.FC<BannerProps> = ({
  desktopSrc = 'https://placehold.co/1920x800/ee144b/FFFFFF?text=Desktop+Banner+1920x800',
  laptopSrc = 'https://placehold.co/1440x700/1F1F1F/FFFFFF?text=Laptop+Banner+1440x700',
  mobileSrc = 'https://placehold.co/375x500/0D0D0D/FFFFFF?text=Mobile+Banner+375x500',
  alt = 'Promotional Banner',
}) => {
  return (
    <section className="w-full max-w-none p-0 pt-0">
      <div className="relative w-full overflow-hidden">
        <picture>
          {/* Mobile: up to 768px */}
          <source media="(max-width: 768px)" srcSet={mobileSrc} />
          {/* Laptop: 769px to 1440px */}
          <source media="(max-width: 1440px)" srcSet={laptopSrc} />
          {/* Desktop: 1441px and above */}
          <img
            src={desktopSrc}
            alt={alt}
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </picture>
      </div>
    </section>
  );
};

export default Banner;
