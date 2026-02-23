"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-20 h-[850px] overflow-hidden bg-[#f5f0e8]"
    >
      {/* Background Image animada */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://i.pinimg.com/736x/6a/8d/0e/6a8d0e5665010b804aabba54c3d18fba.jpg"
          alt="Sastre"
          fill
          className="object-cover object-center opacity-90"
          style={{ objectPosition: 'center 55%' }}
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent" />
      </motion.div>

      {/* Contenido animado */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center"
      >
        <div className="max-w-2xl text-white">
          <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-medium tracking-wider uppercase mb-6 bg-white/10 backdrop-blur-sm">
            EST. 1996 LIMA
          </span>

          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-6">
            El Arte de <br />
            <span className="italic">la Sastrería Moderna.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 font-light max-w-lg leading-relaxed">
            Experimenta la cúspide de la elegancia sastrera. Trajes
            diseñados para adaptarse perfectamente a tu estilo de vida y silueta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#bespoke"
              className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-[#dfe1e4] transition-colors text-center min-w-[180px]"
            >
              Comienza tu viaje
            </Link>
            
          </div>
        </div>
      </motion.div>
    </section>
  );
}