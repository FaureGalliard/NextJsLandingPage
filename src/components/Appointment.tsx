'use client';
interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}

function ContactItem({ icon, title, lines }: ContactItemProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-lg">{title}</h4>
        <p className="text-gray-400 mt-1">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default function Appointment() {
  return (
    <section id="appointment" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgb(255,255,255) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Info */}
          <div>
            <span className="text-yellow-500 font-medium tracking-widest text-sm uppercase mb-2 block">
              Visitanos
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Reserva tu <br /> 
              consulta privada
            </h2>
            <p className="text-gray-400 mb-8 text-lg font-light leading-relaxed">
              Experimenta nuestro servicio de primera mano. Ya sea que estés buscando un
              traje de boda o actualizando tu vestuario empresarial, nuestros maestros sastres
              están aquí para guiarte.
            </p>

            <div className="space-y-6 mt-12">
              <ContactItem
                icon={
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 384 512">
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                  </svg>
                }
                title="Callao"
                lines={['Av. Los Dominicos 230 ', 'Callao, Codigo Postal 07041']}
              />
              <ContactItem
                icon={
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                  </svg>
                }
                title="Telefono"
                lines={['+51  935 814 870', 'sastreria.marcels.pe@gmail.com']}
              />
              <ContactItem
                icon={
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                  </svg>
                }
                title="Horario"
                lines={['Lun - Sab: 9:00 - 21:00', 'Dom: 10:00 - 16:00']}
              />
            </div>

            
            
          </div>

          {/* Right Form */}
          <div className="bg-white text-black p-8 md:p-10 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-serif font-bold mb-6">Solicitar Cita</h3>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                  placeholder="john@ejemplo.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Servicio</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none appearance-none bg-white">
                      <option>Ajustes y Confección a Medida</option>
                      <option>Transformación y Modernización de Ropa</option>
                      <option>Alquiler de Ternos</option>
                      <option>Tintorería y Lavandería</option>
                      <option>Alteraciones Especiales</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje (Opcional)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                  placeholder="Cualquier requisito o pregunta específica"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white font-medium py-4 rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Confirmar Solicitud
              </button>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Nos pondremos en contacto contigo para confirmar la hora exacta de tu cita.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}