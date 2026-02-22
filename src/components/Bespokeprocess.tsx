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
      title: 'Consultation & Measurement',
      description:
        'We discuss your lifestyle, preferences, and occasion. Over 30 measurements are taken to understand your unique posture and build.',
      active: true,
    },
    {
      title: 'Fabric Selection',
      description:
        'Choose from our curated library of over 5,000 fabrics from world-renowned mills like Loro Piana, Zegna, and Holland & Sherry.',
    },
    {
      title: 'Fittings & Adjustments',
      description:
        'A basted fitting allows us to refine the silhouette. We make precise adjustments to ensure the garment moves with you effortlessly.',
    },
    {
      title: 'Final Delivery',
      description:
        'Your finished garment is presented. We ensure every detail is perfect before you take it home.',
    },
  ];

  return (
    <section id="bespoke" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Steps */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">The Bespoke Journey</h2>

            <div className="space-y-8 relative">
              {/* Connecting Line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100" />

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
                Book Your Consultation
              </a>
            </div>
          </div>

          {/* Image Grid */}
          <div className="w-full md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gray-100 h-64 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    alt="Fabric Swatches"
                  />
                </div>
                <div className="bg-gray-100 h-48 rounded-lg overflow-hidden translate-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    alt="Tailoring Chalk"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="bg-gray-100 h-48 rounded-lg overflow-hidden -translate-x-4">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7149c4fe2a-d0ee99d18e231635efe7.png"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    alt="Sewing Machine"
                  />
                </div>
                <div className="bg-gray-100 h-64 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    alt="Finished Suit"
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