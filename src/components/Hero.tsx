import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-20 h-[850px] overflow-hidden bg-[#f5f0e8]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop"
          alt="Master Tailor at work"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-medium tracking-wider uppercase mb-6 bg-white/10 backdrop-blur-sm">
            EST. 1996 LIMA
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-6">
            The Art of <br />
            <span className="italic">Modern Tailoring.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 font-light max-w-lg leading-relaxed">
            Experience the pinnacle of sartorial elegance. Handcrafted suits
            designed to fit your lifestyle and your silhouette perfectly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#appointment"
              className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors text-center min-w-[180px]"
            >
              Start Your Journey
            </Link>
            <Link
              href="#collections"
              className="px-8 py-4 border border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors text-center min-w-[180px]"
            >
              View Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}