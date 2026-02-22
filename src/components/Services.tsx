const CheckIcon = () => (
  <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 448 512">
    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-3 h-3 ml-2" fill="currentColor" viewBox="0 0 448 512">
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
  </svg>
);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  popular?: boolean;
  elevated?: boolean;
}

function ServiceCard({ icon, title, description, features, popular = false, elevated = false }: ServiceCardProps) {
  return (
    <div
      className={`bg-white p-8 rounded-xl transition-all duration-300 group relative overflow-hidden border ${
        elevated
          ? 'shadow-lg hover:shadow-2xl border-gray-100 transform md:-translate-y-4'
          : 'shadow-sm hover:shadow-xl border-transparent hover:border-gray-100'
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          POPULAR
        </div>
      )}
      <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-black transition-colors">
        <span className="text-gray-800 group-hover:text-white transition-colors">{icon}</span>
      </div>
      <h3 className="text-xl font-serif font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">{description}</p>
      <ul className="space-y-2 mb-8 text-sm text-gray-500">
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>
      <a href="#" className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-600 transition-colors">
        Learn More <ArrowRightIcon />
      </a>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
          <path d="M.2 468.9C2.7 493.1 23.1 512 48 512l96 0 320 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-48 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-64-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-64-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-48c0-26.5-21.5-48-48-48L48 0C21.5 0 0 21.5 0 48L0 368l0 96c0 1.7 .1 3.3 .2 4.9z" />
        </svg>
      ),
      title: 'Made to Measure',
      description:
        'An excellent entry into custom clothing. We adapt our existing house patterns to your measurements for a superior fit compared to off-the-rack.',
      features: ['15+ Body Measurements', '4-6 Weeks Delivery', '500+ Fabric Options'],
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
          <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
        </svg>
      ),
      title: 'Custom Bespoke',
      description:
        'The ultimate sartorial experience. A unique paper pattern is drafted from scratch for your body, ensuring a flawless fit and limitless customization.',
      features: ['40+ Body Measurements', 'Unlimited Fittings', '3000+ Premium Fabrics'],
      popular: true,
      elevated: true,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 640 512">
          <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" />
        </svg>
      ),
      title: 'Wedding & Formal',
      description:
        'Impeccable attire for your most important moments. From classic tuxedos to morning suits, we ensure you look your absolute best.',
      features: ['Wedding Party Packages', 'Rush Service Available', 'Styling Consultation'],
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#f5f0eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Tailoring Services</h2>
          <p className="text-gray-600">Choose the level of customization that suits your needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}