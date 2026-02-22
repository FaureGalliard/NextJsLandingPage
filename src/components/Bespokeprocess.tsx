import Image from 'next/image';

interface StepProps {
  number: number;
  title: string;
  description: string;
  active?: boolean;
}

function Step({ number, title, description, active = false }: StepProps) {
  return (
    <div className="relative pl-12">
      <div
        className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 shadow-lg ${
          active
            ? 'bg-black text-white'
            : 'bg-white border-2 border-black text-black'
        }`}
      >
        {number}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function BespokeProcess() {
  const steps = [
    {
      title: 'Consulta y Toma de Medidas',
      description:
        'Hablamos sobre tu estilo de vida, preferencias y ocasión. Se toman más de 30 medidas para entender tu postura y constitución únicas.',
      active: true,
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


  return (
    <section id="bespoke" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Steps */}
          <div className="w-full md:w-1/2">
            <h2 className="text-[#000000] text-3xl md:text-4xl font-serif mb-8">El viaje a Medida</h2>

            <div className="space-y-8 relative text-[#000000]">
              {/* Connecting Line */}
              <div className=" absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100" />

              {steps.map((step, index) => (
                <Step
                  key={step.title}
                  number={index + 1}
                  title={step.title}
                  description={step.description}
                  active={step.active}
                />
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
              <div className="space-y-4">
                {/* Imagen 1 */}
                <div className="bg-gray-100 h-48 rounded-lg overflow-hidden mr-4 relative">
                  <Image
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7149c4fe2a-d0ee99d18e231635efe7.png"
                    alt="Fabric Swatches"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Imagen 2 */}
                <div className="bg-gray-100 h-36 rounded-lg overflow-hidden ml-4 relative">
                  <Image
                    src="https://i.pinimg.com/736x/fc/46/cc/fc46cc77598b785f441ababf516a8e1b.jpg"
                    alt="Tailoring Chalk"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                {/* Imagen 3 */}
                <div className="bg-gray-100 h-36 rounded-lg overflow-hidden -ml-4 relative">
                  <Image
                    src="https://i.pinimg.com/1200x/de/ef/3c/deef3c375bac0a835cb363cf8c53047f.jpg"
                    alt="Sewing Machine"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Imagen 4 */}
                <div className="bg-gray-100 h-48 rounded-lg overflow-hidden relative">
                  <Image
                    src="https://i.pinimg.com/1200x/03/dc/2c/03dc2cf887e7baab513be07d132ce911.jpg"
                    alt="Finished Suit"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500 object-center"
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      
    </section>
  );
}