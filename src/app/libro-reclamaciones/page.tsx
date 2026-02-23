'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
type TipoPersona = 'natural' | 'juridica';
type TipoBien = 'producto' | 'servicio';
type TipoReclamacion = 'reclamo' | 'queja';

export default function LibroReclamaciones() {
  const [tipoPersona, setTipoPersona] = useState<TipoPersona>('natural');
  const [tipoBien, setTipoBien] = useState<TipoBien>('servicio');
  const [tipoReclamacion, setTipoReclamacion] = useState<TipoReclamacion>('reclamo');
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-sm';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <>
    <Navbar />
    <section className="py-16 bg-white min-h-screen">
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-yellow-600 font-medium tracking-widest text-sm uppercase mb-2">
            Sastrería Marcel&apos;s
          </p>
          <h1 className="text-4xl font-serif text-black mb-3">Libro de Reclamaciones</h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571),
            ponemos a tu disposición nuestro Libro de Reclamaciones virtual.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            <span className="text-xs text-gray-600">Tu queja o reclamo será atendido en un plazo máximo de 30 días hábiles.</span>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif text-black mb-3">Reclamación enviada</h2>
            <p className="text-gray-500 text-sm mb-8">
              Hemos recibido tu reclamación. Nos pondremos en contacto contigo a la brevedad posible.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
            >
              Nueva reclamación
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-8"
          >
            {/* 1. Identificación del consumidor */}
            <div>
              <h2 className="text-lg font-serif font-semibold text-black mb-4 pb-2 border-b border-gray-100">
                1. Identificación del Consumidor
              </h2>

              {/* Tipo de persona */}
              <div className="flex gap-4 mb-5">
                {(['natural', 'juridica'] as TipoPersona[]).map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setTipoPersona(tipo)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                      tipoPersona === tipo
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {tipo === 'natural' ? 'Persona Natural' : 'Persona Jurídica'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Nombre completo *</label>
                  <input type="text" required className={inputClass} placeholder="Juan Pérez García" />
                </div>
                <div>
                  <label className={labelClass}>DNI / RUC *</label>
                  <input type="text" required className={inputClass} placeholder="12345678" />
                </div>
                <div>
                  <label className={labelClass}>Correo electrónico *</label>
                  <input type="email" required className={inputClass} placeholder="juan@ejemplo.com" />
                </div>
                <div>
                  <label className={labelClass}>Teléfono *</label>
                  <input type="tel" required className={inputClass} placeholder="+51 999 999 999" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Dirección</label>
                  <input type="text" className={inputClass} placeholder="Av. Ejemplo 123, Lima" />
                </div>
              </div>
            </div>

            {/* 2. Identificación del bien */}
            <div>
              <h2 className="text-lg font-serif font-semibold text-black mb-4 pb-2 border-b border-gray-100">
                2. Identificación del Bien Contratado
              </h2>

              <div className="flex gap-4 mb-5">
                {(['producto', 'servicio'] as TipoBien[]).map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setTipoBien(tipo)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                      tipoBien === tipo
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {tipo === 'producto' ? 'Producto' : 'Servicio'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Descripción del {tipoBien} *</label>
                  <input
                    type="text"
                    required
                    className={inputClass}
                    placeholder={tipoBien === 'producto' ? 'Ej: Traje a medida azul marino' : 'Ej: Confección de traje bespoke'}
                  />
                </div>
                <div>
                  <label className={labelClass}>Monto reclamado (S/.)</label>
                  <input type="number" className={inputClass} placeholder="0.00" min="0" step="0.01" />
                </div>
                <div>
                  <label className={labelClass}>Fecha de atención *</label>
                  <input type="date" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>N° de pedido / boleta (opcional)</label>
                  <input type="text" className={inputClass} placeholder="B001-00123" />
                </div>
              </div>
            </div>

            {/* 3. Detalle de la reclamación */}
            <div>
              <h2 className="text-lg font-serif font-semibold text-black mb-4 pb-2 border-b border-gray-100">
                3. Detalle de la Reclamación
              </h2>

              {/* Tipo */}
              <div className="flex gap-4 mb-5">
                {(['reclamo', 'queja'] as TipoReclamacion[]).map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setTipoReclamacion(tipo)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                      tipoReclamacion === tipo
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {tipo === 'reclamo' ? 'Reclamo' : 'Queja'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mb-4">
                {tipoReclamacion === 'reclamo'
                  ? 'Reclamo: Disconformidad relacionada con los productos o servicios.'
                  : 'Queja: Disconformidad no relacionada a los productos o servicios; o malestar o descontento respecto a la atención al público.'}
              </p>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Descripción de la reclamación *</label>
                  <textarea
                    required
                    rows={4}
                    className={inputClass}
                    placeholder="Describe detalladamente el motivo de tu reclamo o queja..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Pedido del consumidor *</label>
                  <textarea
                    required
                    rows={3}
                    className={inputClass}
                    placeholder="¿Qué solución esperas de Sastrería Marcel's?"
                  />
                </div>
              </div>
            </div>

            {/* Firma y envío */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required className="mt-1 accent-black" />
                <span className="text-xs text-gray-500 leading-relaxed">
                  Declaro que la información proporcionada es verídica y autorizo a Sastrería Marcel&apos;s
                  a contactarme para atender mi reclamación conforme a la Ley N° 29571.
                </span>
              </label>

              <button
                type="submit"
                className="mt-6 w-full bg-black text-white font-medium py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
              >
                Enviar Reclamación
              </button>
              <p className="text-xs text-gray-400 mt-3 text-center">
                La respuesta será enviada al correo electrónico indicado en un plazo máximo de 30 días hábiles.
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </section>
    <Footer />
    </>
  );
}