'use client';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-serif font-semibold text-black mb-3 pb-2 border-b border-gray-100">
        {title}
      </h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

const databases = [
  { name: 'Clientes', icon: '👤', desc: 'Datos de clientes para gestión de pedidos, ventas y atención personalizada.' },
 
  { name: 'Libro de Reclamaciones', icon: '📋', desc: 'Registro de quejas y reclamos conforme a la Ley N° 29571.' },
  
];

const purposes = [
  'Promoción de los servicios y productos que ofrecemos.',
  'Coordinar la visita, venta, entrega, tramitación y exhibición de productos.',
  'Verificación y consulta de información de clientes, trabajadores y Libro de Reclamaciones.',
  'Seguridad y videovigilancia de nuestras instalaciones.',
  'Compartir información con contratistas o proveedores vinculados a la prestación del servicio.',
  'Obtener datos de contacto para relaciones contractuales, laborales y comerciales.',
  'Atención de consultas, reclamos y seguimiento de operaciones.',
];

export default function PoliticaPrivacidad() {
  return (
    <section className="py-16 bg-white min-h-screen">
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.05 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-yellow-600 font-medium tracking-widest text-sm uppercase mb-2">
            Sastrería Marcel&apos;s
          </p>
          <h1 className="text-4xl font-serif text-black mb-3">Política de Privacidad</h1>
          <p className="text-gray-400 text-xs">Última actualización: febrero 2026</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10">

          {/* Intro */}
          <Section title="Introducción">
            <p>
              El presente aviso tiene como propósito principal informar a nuestros usuarios y visitantes
              (en adelante, los <strong>Titulares de los Datos Personales</strong>), respecto del tratamiento
              de datos personales que realiza <strong>Sastrería Marcel&apos;s</strong>, con domicilio en
              Av. Los Dominicos 230, Callao, y el cumplimiento de todas las disposiciones contenidas en la
              Ley de Protección de Datos Personales – Ley N° 29733, su Reglamento y normas complementarias.
            </p>
          </Section>

          {/* Finalidad */}
          <Section title="Finalidad de los Datos Personales Solicitados">
            <p>
              Sastrería Marcel&apos;s podrá solicitar a los Titulares de los Datos Personales la información
              correspondiente con las siguientes finalidades:
            </p>
            <ul className="space-y-2 mt-2">
              {purposes.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mt-3">
              <p className="text-xs text-gray-500 leading-relaxed">
                Sastrería Marcel&apos;s reconoce el derecho de los Titulares a manifestar su negativa respecto
                al uso y tratamiento de sus Datos Personales cuando consideren que la información proporcionada
                no cumple ninguna de las funciones descritas, o si los datos no son necesarios para el
                establecimiento de una relación contractual.
              </p>
            </div>
          </Section>

          {/* Obtención */}
          <Section title="Obtención y Tratamiento de los Datos Personales">
            <p>
              Sastrería Marcel&apos;s podrá obtener información sobre el Titular por cualquier medio permitido
              por la Ley, incluyendo —mas no limitándose a— la obtención de manera presencial o mediante
              plataformas electrónicas y/o páginas web.
            </p>
            <p>
              El Titular, mediante el ingreso de sus datos en la página web o su entrega presencial,
              autoriza expresamente a Sastrería Marcel&apos;s a tratar la información facilitada de conformidad
              con las disposiciones de la Ley. Los datos serán procesados y protegidos a través de medios
              digitales, técnicos y/o administrativos para garantizar un óptimo nivel de seguridad.
            </p>
            <p>
              Los datos personales serán tratados de forma leal y lícita, y no serán utilizados para
              finalidades incompatibles con las especificadas. Sastrería Marcel&apos;s se compromete a adoptar
              todas las medidas de control y seguridad necesarias para evitar la alteración, uso indebido,
              pérdida o acceso no autorizado por terceros.
            </p>
            <p>
              El Titular declara que toda la información puesta a disposición de Sastrería Marcel&apos;s es
              exacta, cierta y brindada de buena fe, liberando a Sastrería Marcel&apos;s de cualquier
              responsabilidad en relación a la veracidad de dicha información.
            </p>
          </Section>

          {/* Bases de datos */}
          <Section title="Bases de Datos">
            <p>
              Los datos personales recabados serán almacenados e incorporados en los siguientes Bancos
              de Datos Personales, titularidad de Sastrería Marcel&apos;s, los cuales se encuentran en proceso
              de inscripción ante el Registro Nacional de Datos Personales del Ministerio de Justicia del Perú:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {databases.map((db) => (
                <div key={db.name} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-semibold text-black text-sm mb-1">
                    {db.icon} {db.name}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">{db.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Transferencia */}
          <Section title="Transferencia de Datos Personales">
            <p>
              El Titular autoriza y concede su expresa conformidad a Sastrería Marcel&apos;s para compartir
              y encargar el tratamiento de su información personal a proveedores de servicios, tanto a
              nivel nacional como internacional, exclusivamente para los tratamientos mencionados.
            </p>
            <p>
              En los casos en que no se requiera la identidad del Titular, Sastrería Marcel&apos;s procurará
              que la información pase por un proceso de disociación o anonimización para evitar la
              vulneración de sus derechos.
            </p>
            <p>
              En todos los casos de transferencia, Sastrería Marcel&apos;s garantizará que los receptores
              actuarán conforme a lo dispuesto en la Ley, utilizando los datos únicamente para las
              finalidades correspondientes. Esto incluye principalmente —mas no se limita a— empresas
              de e-commerce, transporte de productos y autoridades del Estado.
            </p>
          </Section>

          {/* Redes sociales */}
          <Section title="Redes Sociales">
            <p>
              Las redes sociales constituyen plataformas de comunicación ajenas a Sastrería Marcel&apos;s y,
              por ello, no se encuentran bajo su responsabilidad. La información y datos proporcionados
              por el Titular dentro de las redes sociales en las que Sastrería Marcel&apos;s sea usuario no
              constituyen en ningún momento parte de la información personal sujeta a la protección de
              esta Política de Privacidad, siendo responsabilidad de la empresa prestadora de esa
              plataforma y de quien los publica.
            </p>
          </Section>

          {/* Comunicaciones */}
          <Section title="Comunicaciones y Modificaciones">
            <p>
              Con motivo de la mejora continua de nuestros procesos, Sastrería Marcel&apos;s podrá realizar
              modificaciones y correcciones a esta Política de Privacidad. Por favor, verifique estos
              términos regularmente para consultar los cambios que puedan haber existido.
            </p>
            <p>
              Cualquier modificación total o parcial se dará a conocer a través de alguno de los
              siguientes medios: comunicado por escrito al domicilio del Titular, publicación en nuestras
              instalaciones, correo electrónico, mensaje al teléfono móvil, cualquier medio electrónico
              utilizado en operaciones con Sastrería Marcel&apos;s, o a través del sitio web.
            </p>
          </Section>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Para consultas sobre esta política, contáctanos en{' '}
              <a
                href="mailto:sastreria.marcels.pe@gmail.com"
                className="text-black underline underline-offset-2"
              >
                sastreria.marcels.pe@gmail.com
              </a>{' '}
              o llámanos al{' '}
              <a href="tel:+51935814870" className="text-black underline underline-offset-2">
                +51 935 814 870
              </a>
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}