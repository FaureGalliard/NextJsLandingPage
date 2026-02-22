'use client';

import { useRef } from 'react';

interface CollectionItemProps {
  image: string;
  title: string;
  subtitle: string;
  alt: string;
}

function CollectionItem({ image, title, subtitle, alt }: CollectionItemProps) {
  return (
    <div className="min-w-[300px] md:min-w-[400px] snap-center group cursor-pointer">
      <div className="h-[500px] overflow-hidden rounded-lg relative">
        <img
          src={image}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt={alt}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-serif font-medium">{title}</h3>
          <p className="text-sm text-gray-200 mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Collections() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  const collections = [
    {
      image:
        'https://images.unsplash.com/photo-1594938328870-9623159c8c99?q=80&w=1000&auto=format&fit=crop',
      title: 'Black Tie',
      subtitle: 'Timeless elegance for evening wear',
      alt: 'Tuxedo',
    },
    {
      image:
        'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1000&auto=format&fit=crop',
      title: 'Modern Business',
      subtitle: 'Sharp silhouettes for the boardroom',
      alt: 'Business Suit',
    },
    {
      image:
        'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=1000&auto=format&fit=crop',
      title: 'Smart Casual',
      subtitle: 'Relaxed tailoring for weekends',
      alt: 'Casual Jacket',
    },
    {
      image:
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/028e94e175-c998520b8f20a7bb9545.png',
      title: 'Outerwear',
      subtitle: 'Protection from elements in style',
      alt: 'Overcoat',
    },
  ];

  return (
    <section id="collections" className="py-24 bg-[#f5f0eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
        <div>
          <span className="text-yellow-600 font-medium tracking-widest text-sm uppercase mb-2 block">
            Autumn / Winter 2024
          </span>
          <h2 className="text-3xl md:text-4xl font-serif">Featured Collections</h2>
        </div>
        <div className="hidden md:flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 pb-8 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {collections.map((item) => (
          <CollectionItem key={item.title} {...item} />
        ))}
      </div>

      {/* Mobile Pagination Dots */}
      <div className="flex justify-center space-x-2 mt-4 md:hidden">
        {collections.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === 0 ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}