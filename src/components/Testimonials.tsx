'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 bg-white">
      <motion.div
         initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <svg className="w-10 h-10 text-gray-200 mx-auto mb-8" fill="currentColor" viewBox="0 0 448 512">
          <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
        </svg>
        <h3 className="text-[#000000] text-2xl md:text-3xl font-serif italic mb-8 leading-relaxed">
          &quot;Quedé contento con cómo quedó mi traje, todo a mi medida. Buen servicio...&quot;
        </h3>
        <div className="flex items-center justify-center space-x-4">
          <img
            src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
            alt="Client"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="font-bold text-gray-900">Jose Garcia</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Abogado</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}