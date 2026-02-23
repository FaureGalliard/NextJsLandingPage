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

export default function PoliticaCookies() {
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
          <h1 className="text-4xl font-serif text-black mb-3">Política de Cookies</h1>
          <p className="text-gray-400 text-xs">Última actualización: febrero 2026</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10">

          <Section title="Introducción">
            <p>
              Sastrería Marcel&apos;s describe en el presente documento la Política de Cookies que regula el sitio web
              con el objetivo de garantizar la privacidad del usuario (en adelante <strong>&quot;EL USUARIO&quot;</strong>).
            </p>
            <p>
              Las cookies utilizadas en este sitio web permiten a Sastrería Marcel&apos;s facilitar el uso y navegación,
              garantizar el acceso a determinadas funcionalidades y adicionalmente, nos ayudan a mejorar la calidad
              del sitio web de acuerdo con los hábitos y estilos de navegación de EL USUARIO.
            </p>
            <p>
              Sastrería Marcel&apos;s utiliza cookies estrictamente necesarias y esenciales para que usted utilice el
              sitio web y que este funcione correctamente. Asimismo, otras cookies sirven para mejorar el rendimiento
              y su experiencia. Se informa que se procederá a la recopilación y almacenamiento de los datos personales.
            </p>
            <p>
              En nuestro sitio web utilizamos cookies propias y de terceros. De acuerdo con ello, Sastrería Marcel&apos;s
              transfiere dentro y fuera del territorio peruano los datos personales de EL USUARIO a terceras empresas,
              según las finalidades determinadas en la presente política.
            </p>
          </Section>

          <Section title="¿Qué son las Cookies?">
            <p>
              Las cookies son pequeños archivos de texto que los sitios web almacenan en su ordenador, smartphone,
              tablet o cualquier otro dispositivo de acceso a Internet, con la finalidad de recordar información
              sobre su visita.
            </p>
          </Section>

          <Section title="¿Para qué sirven?">
            <p>
              Las cookies sirven para reconocer el dispositivo de EL USUARIO cuando vuelve a visitar el sitio web,
              facilitándole su uso al recordar sus preferencias y configuración de navegación (idioma, país, etc.).
              Asimismo, sirven para mejorar los servicios que ofrecemos y para recopilar información estadística
              que nos permite entender cómo EL USUARIO utiliza el sitio.
            </p>
            <p>
              Las cookies se asocian únicamente a un usuario anónimo y su dispositivo, y no proporcionan referencias
              que permitan deducir datos personales. No pueden dañar su dispositivo y nos ayudan a identificar y
              resolver errores.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mt-2">
              <p className="font-medium text-black text-sm mb-2">Ante la información sobre cookies, EL USUARIO puede:</p>
              <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                <li>Aceptar todas las cookies y no volver a ver el aviso durante la sesión.</li>
                <li>
                  Si EL USUARIO decide no elegir entre la aceptación o modificación de la configuración,
                  el aviso se seguirá mostrando durante la navegación.
                </li>
              </ul>
            </div>
          </Section>

          <Section title="Tipos de Cookies">
            <p>Según la entidad que gestione las cookies, se distinguen las siguientes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-semibold text-black text-sm mb-1">🍪 Cookies propias</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Son aquellas que se envían al dispositivo de EL USUARIO desde el sitio web gestionado
                  por el propio titular del sitio web.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-semibold text-black text-sm mb-1">🌐 Cookies de terceros</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Son aquellas que se envían desde el sitio web pero que son gestionadas por una entidad
                  diferente al titular del sitio, que trata los datos obtenidos.
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Las cookies utilizadas en este sitio no identifican personalmente a EL USUARIO; solo proporcionan
              información estadística anónima sobre la navegación. Puede deshabilitarlas configurando su navegador.
            </p>
          </Section>

          <Section title="Gestión de las Cookies">
            <p>
              EL USUARIO puede configurar su navegador para establecer que solo los sitios web de confianza puedan
              gestionar cookies, permitiéndole seleccionar sus preferencias.
            </p>
            <p>
              Si EL USUARIO decide no autorizar el tratamiento, solo se usarán las cookies técnicas, imprescindibles
              para la navegación. En este caso, no se almacenará ninguna otra cookie.
            </p>
            <p>
              Si EL USUARIO rechaza o borra las cookies, Sastrería Marcel&apos;s no podrá mantener sus preferencias;
              algunas características de las páginas no estarán operativas, y cada vez que navegue por el sitio
              se solicitará nuevamente su autorización.
            </p>
            <p>
              Es posible eliminar las cookies o impedir su registro en cualquier momento mediante la modificación
              de los parámetros de configuración de su navegador. En la mayoría de los navegadores se puede advertir
              la presencia de cookies o rechazarlas automáticamente.
            </p>
          </Section>

          <Section title="Vigencia y Modificación de la Política">
            <p>
              Sastrería Marcel&apos;s puede modificar esta Política de Cookies en función de exigencias legislativas,
              reglamentarias, jurisprudenciales, o con la finalidad de adaptar dicha política a las instrucciones
              de la Autoridad Nacional de Protección de Datos Personales, así como por criterios propios institucionales.
            </p>
            <p>
              Si los cambios son significativos, se informará a EL USUARIO a través de un correo electrónico enviado
              al email registrado. Dado que la política puede ser actualizada periódicamente, se sugiere revisarla
              de forma regular en el sitio web.
            </p>
          </Section>

          {/* Footer info */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Para consultas sobre esta política, contáctanos en{' '}
              <a href="mailto:sastreria.marcels.pe@gmail.com" className="text-black underline underline-offset-2">
                sastreria.marcels.pe@gmail.com
              </a>
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}