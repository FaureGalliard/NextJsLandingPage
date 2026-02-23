'use client';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

interface StepProps {
  number: number;
  title: string;
  description: string;
  active?: boolean;
}

function Step({ number, title, description, active = false }: StepProps) {
  return (
    <div className={`relative pl-12 transition-all duration-500 ${active ? 'scale-105 origin-left' : 'scale-100 origin-left'}`}>
      <div
        className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 shadow-lg transition-all duration-500 ${
          active
            ? 'bg-black text-white scale-110'
            : 'bg-white border-2 border-black text-black scale-100'
        }`}
      >
        {number}
      </div>
      <h3 className={`font-medium mb-2 transition-all duration-500 ${active ? 'text-black text-2xl' : 'text-gray-400 text-xl'}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed transition-colors duration-500 ${active ? 'text-gray-600' : 'text-gray-300'}`}>
        {description}
      </p>
    </div>
  );
}

const stepImages = [
  'https://storage.googleapis.com/uxpilot-auth.appspot.com/7149c4fe2a-d0ee99d18e231635efe7.png',
  'https://i.pinimg.com/736x/fc/46/cc/fc46cc77598b785f441ababf516a8e1b.jpg',
  'https://i.pinimg.com/1200x/de/ef/3c/deef3c375bac0a835cb363cf8c53047f.jpg',
  'https://i.pinimg.com/1200x/03/dc/2c/03dc2cf887e7baab513be07d132ce911.jpg',
];

const imageAlts = ['Fabric Swatches', 'Tailoring Chalk', 'Sewing Machine', 'Finished Suit'];

export default function BespokeProcess() {
  const sectionRef = useRef<HTMLElement>(null);
 
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      title: 'Consulta y Toma de Medidas',
      description:
        'Hablamos sobre tu estilo de vida, preferencias y ocasión. Se toman más de 30 medidas para entender tu postura y constitución únicas.',
    },
    {
      title: 'Selección de Telas',
      description:
        'Elige entre nuestra biblioteca curada de más de 5,000 telas de prestigiosas casas como Loro Piana, Zegna y Holland & Sherry.',
    },
    {
      title: 'Pruebas y Ajustes',
      description:
        'Una prueba provisional nos permite refinar la silueta. Realizamos ajustes precisos para que la prenda se mueva contigo sin esfuerzo.',
    },
    {
      title: 'Entrega Final',
      description:
        'Se presenta tu prenda terminada. Nos aseguramos de que cada detalle sea perfecto antes de que te la lleves.',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const windowMid = window.innerHeight / 2;
      let closest = 0;
      let closestDist = Infinity;

      stepRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const stepMid = rect.top + rect.height / 2;
        const dist = Math.abs(stepMid - windowMid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setActiveStep(closest);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Image layout config: [column (0=left,1=right), height class, margin class]
  const imageLayout = [
    { col: 0, h: 'h-48', mx: 'mr-4' },
    { col: 0, h: 'h-36', mx: 'ml-4' },
    { col: 1, h: 'h-36', mx: '-ml-4' },
    { col: 1, h: 'h-48', mx: '' },
  ];

  return (
    <section
  id="bespoke"
  ref={sectionRef}
  className="py-12 bg-white overflow-hidden"
>
  <motion.div
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.3 }}
  >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">

          {/* Steps */}
          <div className="w-full md:w-1/2">
            <h2 className="text-[#000000] text-3xl md:text-4xl font-serif mb-8">El viaje a Medida</h2>
            <div className="space-y-8 relative text-[#000000]">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100" />
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  ref={(el) => { stepRefs.current[index] = el; }}
                >
                  <Step
                    number={index + 1}
                    title={step.title}
                    description={step.description}
                    active={activeStep === index}
                  />
                </div>
              ))}
            </div>
            <div className="mt-10">
              <a
                href="#appointment"
                className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-all inline-block"
              >
                Reserva tu consulta
              </a>
            </div>
          </div>

          {/* Image Grid */}
          <div className="w-full md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-4">
                {imageLayout.filter(img => img.col === 0).map((img, i) => {
                  const globalIndex = imageLayout.findIndex(
                    (l, idx) => l.col === 0 && imageLayout.filter(x => x.col === 0).indexOf(l) === i
                  );
                  const realIndex = [0, 1][i];
                  const isActive = activeStep === realIndex;
                  return (
                    <motion.div
                      key={realIndex}
                      className={`bg-gray-100 ${img.h} rounded-lg overflow-hidden ${img.mx} relative`}
                      animate={{
                        scale: isActive ? 1.01 : 1,
                        filter: isActive ? 'brightness(1)' : 'brightness(0.9)',
                      }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <Image
                        src={stepImages[realIndex]}
                        alt={imageAlts[realIndex]}
                        fill
                        className="object-cover"
                      />
                      {/* Overlay shimmer on active */}
                      <motion.div
                        className="absolute inset-0 bg-white pointer-events-none"
                        animate={{ opacity: isActive ? 0 : 0.2 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Right column */}
              <div className="space-y-4 pt-8">
                {[2, 3].map((realIndex) => {
                  const img = imageLayout[realIndex];
                  const isActive = activeStep === realIndex;
                  return (
                    <motion.div
                      key={realIndex}
                      className={`bg-gray-100 ${img.h} rounded-lg overflow-hidden ${img.mx} relative`}
                      animate={{
                        scale: isActive ? 1.01 : 1,
                        filter: isActive ? 'brightness(1)' : 'brightness(0.8)',
                      }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <Image
                        src={stepImages[realIndex]}
                        alt={imageAlts[realIndex]}
                        fill
                        className="object-cover object-center"
                      />
                      <motion.div
                        className="absolute inset-0 bg-white pointer-events-none"
                        animate={{ opacity: isActive ? 0 : 0.2 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
    </section>
  );
}