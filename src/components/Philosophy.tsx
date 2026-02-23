"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 bg-white">
     <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/97fbf8034f-6f2370fd6a45ac0b8bda.png"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  alt="Fabric details"
                />
                <img
                  src="https://i.pinimg.com/1200x/79/8e/4b/798e4b023dad68cbab84f1e1b3b72b2a.jpg"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  alt="Stitching detail"
                />
              </div>
              <div className="space-y-4">
                <img
                  src="https://i.pinimg.com/736x/61/2f/77/612f7726dd9cfe7c07ea10a2c8dbd652.jpg"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  alt="Man in suit"
                />
                <img
                  src="https://i.pinimg.com/1200x/c8/e3/fa/c8e3fabd48c1a139950083e827b07736.jpg"
                  className="w-full h-64 object-center object-cover rounded-lg shadow-md"
                  alt="Tailor measuring"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2">
            <span className="font-inter text-yellow-600 font-medium tracking-widest text-sm uppercase mb-2 block">
              Nuestra Filosofía
            </span>
            <h2 className="text-[#000000] text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Precisión en cada puntada, elegancia en cada detalle.
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Creemos que cada prenda es más que solo ropa; es una declaración de intenciones. Nuestros maestros sastres combinan técnicas con siluetas modernas para realizar ajustes y mejoras que hacen que tu ropa sea verdaderamente única para ti.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Desde la consulta inicial hasta la prueba final, nuestro proceso está diseñado para ser tan agradable como minucioso. Solo utilizamos telas de la mejor calidad de Perú, asegurando que tus prendas luzcan impecables y resistan el paso del tiempo.
            </p>

            <div className="flex items-center space-x-8 mt-8">
              <div>
                <h4 className="text-[#000000] text-3xl font-serif font-bold">20+</h4>
                <p className="text-sm text-[#000000] uppercase tracking-wide mt-1">
                  Años de Experiencia
                </p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <h4 className="text-[#000000] text-3xl font-serif font-bold">2k+</h4>
                <p className="text-sm text-[#000000] uppercase tracking-wide mt-1">
                  Trajes confeccionados
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}