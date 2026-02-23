'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface SectionProps {
  number?: string;
  title: string;
  children: React.ReactNode;
}

function Section({ number, title, children }: SectionProps) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-serif font-semibold text-black mb-3 pb-2 border-b border-gray-100">
        {number && <span className="text-gray-400 mr-2">{number}.</span>}
        {title}
      </h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

const serviciosPrincipales = [
  { icon: '✂️', nombre: 'Ajustes y Confección', desc: 'Camisas, pantalones, vestidos y trajes a medida con acabados perfectos.' },
  { icon: '🔄', nombre: 'Transformación de Ropa', desc: 'Agrandar, reducir o modernizar prendas existentes.' },
  { icon: '👔', nombre: 'Alquiler de Ternos', desc: 'Ternos elegantes para cualquier ocasión especial.' },
  { icon: '🧺', nombre: 'Tintorería', desc: 'Cuidado profesional para mantener las prendas impecables.' },
  { icon: '💧', nombre: 'Lavandería', desc: 'Limpieza delicada para todo tipo de ropa.' },
];

const serviciosExtra = [
  'Ajustes de cuello y mangas',
  'Reducción y ampliación de tallas',
  'Arreglos de cierres y botones',
  'Dobladillos de pantalones y faldas',
  'Confección de ternos, camisas y vestidos a medida',
];

const tabs = [
  'Uso y Acceso',
  'Servicios',
  'Garantías y Cambios',
  'Datos Personales',
  'Legal',
];

export default function TerminosCondiciones() {
  const [activeTab, setActiveTab] = useState(0);

  return (
     <>
    <Navbar />
    <section className="py-16 bg-white min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.05 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-yellow-600 font-medium tracking-widest text-sm uppercase mb-2">
            Sastrería Marcel&apos;s
          </p>
          <h1 className="text-4xl font-serif text-black mb-2">Términos y Condiciones</h1>
          <p className="text-gray-400 text-xs">Fecha de efectividad: enero 2026</p>
        </div>

        {/* Intro card */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8 text-sm text-gray-600 leading-relaxed">
          El presente documento regula los Términos y Condiciones de uso del sitio web de{' '}
          <strong>Sastrería Marcel&apos;s</strong>, con domicilio en Av. Los Dominicos 230, Callao
          (RPC: +51 935 814 870). Al utilizar el sitio, usted confirma que conoce y acepta todos
          los T&C. Sastrería Marcel&apos;s puede modificarlos en cualquier momento; se recomienda
          revisarlos periódicamente. El uso del sitio y los contratos celebrados por su medio
          se rigen por las leyes de la República del Perú.
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                activeTab === i
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10">

          {/* Tab 0: Uso y Acceso */}
          {activeTab === 0 && (
            <div>
              <Section number="1" title="Aceptación de los Términos y Condiciones">
                <p>
                  Al usar el sitio, usted confirma que ha leído y comprendido estos T&C y acepta
                  cumplir con ellos. Sastrería Marcel&apos;s se reserva el derecho de modificarlos en
                  cualquier momento; las modificaciones entrarán en vigor desde su publicación.
                </p>
                <p>
                  Si no está de acuerdo con alguna modificación, debe notificarlo a{' '}
                  <a href="mailto:sastreria.marcels.pe@gmail.com" className="text-black underline underline-offset-2">
                    sastreria.marcels.pe@gmail.com
                  </a>{' '}
                  con el asunto: <em>Cancelación de Uso</em>.
                </p>
              </Section>

              <Section number="2" title="Uso del Sitio">
                <p>
                  El Usuario deberá utilizar el sitio de conformidad con la moral, las buenas costumbres
                  y las leyes de la República del Perú. Sastrería Marcel&apos;s podrá denegar el acceso a
                  quienes infrinjan los T&C sin previo aviso.
                </p>
                <p>
                  Queda prohibido: enviar spam o correos no solicitados, recolectar datos de terceros
                  sin consentimiento, crear identidades falsas, transmitir contenido inapropiado o
                  malware, o interferir con el uso del sitio por parte de otros usuarios.
                </p>
              </Section>

              <Section number="3" title="Contenido y Acceso al Sitio">
                <p>
                  Sastrería Marcel&apos;s se compromete a mantener información actualizada y correcta,
                  pero no se responsabiliza por posibles errores u omisiones. Se reserva el derecho
                  de modificar o interrumpir contenidos sin aviso previo.
                </p>
                <p>
                  El sitio procura estar disponible 24/7, aunque por razones de mantenimiento el
                  acceso puede interrumpirse ocasionalmente sin que ello genere responsabilidad
                  frente al Usuario.
                </p>
                <p>
                  Para reportar errores, escriba a{' '}
                  <a href="mailto:sastreria.marcels.pe@gmail.com" className="text-black underline underline-offset-2">
                    sastreria.marcels.pe@gmail.com
                  </a>{' '}
                  con el asunto: <em>Error en Página Web</em>.
                </p>
              </Section>

              <Section number="4" title="Propiedad Intelectual">
                <p>
                  Las marcas, contenidos y elementos del sitio son propiedad exclusiva de Sastrería
                  Marcel&apos;s, protegidos por el Decreto Legislativo N° 822. El acceso al sitio no
                  otorga ningún derecho distinto al de consultar su contenido.
                </p>
                <p>
                  Para solicitudes de uso de propiedad intelectual, escriba a{' '}
                  <a href="mailto:sastreria.marcels.pe@gmail.com" className="text-black underline underline-offset-2">
                    sastreria.marcels.pe@gmail.com
                  </a>{' '}
                  con el asunto: <em>Solicitud de Uso de Propiedad Intelectual</em>.
                </p>
              </Section>
            </div>
          )}

          {/* Tab 1: Servicios */}
          {activeTab === 1 && (
            <div>
              <Section number="5" title="Servicios Ofrecidos">
                <p>
                  Sastrería Marcel&apos;s ofrece los siguientes servicios de forma presencial en su local
                  de Av. Los Dominicos 230, Callao. Las consultas y reservas pueden coordinarse a
                  través del sitio web o vía WhatsApp.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {serviciosPrincipales.map((s) => (
                    <div key={s.nombre} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="font-semibold text-black text-sm mb-1">
                        {s.icon} {s.nombre}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section number="" title="Servicios Específicos Adicionales">
                <ul className="space-y-2 mt-1">
                  {serviciosExtra.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section number="6" title="Autorización de Confección">
                <p>
                  Al solicitar un servicio de confección o ajuste, el Usuario autoriza a Sastrería
                  Marcel&apos;s a proceder con el trabajo según la orden de servicio acordada. Por tratarse
                  de prendas a medida, los cambios en el pedido podrán estar relacionados a las medidas,
                  mas no se podrá modificar el diseño una vez iniciada la confección.
                </p>
                <p>
                  Si el Usuario decide no continuar y solicita reembolso, Sastrería Marcel&apos;s evaluará
                  el estado del pedido a la fecha de solicitud y procederá de forma proporcional al
                  avance del trabajo.
                </p>
              </Section>

              <Section number="7" title="Pruebas Programadas y Tiempos de Confección">
                <p>
                  El Usuario se obliga a asistir en la fecha programada para la prueba. Si no asiste,
                  Sastrería Marcel&apos;s no asume responsabilidad sobre el plazo de entrega final.
                </p>
                <div className="overflow-hidden rounded-xl border border-gray-100 mt-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left px-4 py-3 font-medium text-gray-700">Prenda</th>
                        <th className="text-right px-4 py-3 font-medium text-gray-700">Plazo estimado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { item: 'Camisa a medida', tiempo: '7 días hábiles' },
                        { item: 'Pantalón (telas en stock)', tiempo: '15 días hábiles' },
                        { item: 'Traje 2 o 3 piezas (stock)', tiempo: '35 días hábiles' },
                        { item: 'Prendas de catálogo / importación', tiempo: '40–45 días hábiles' },
                        { item: 'Ajustes y arreglos simples', tiempo: 'A coordinar' },
                      ].map((t, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                          <td className="px-4 py-3 text-gray-600">{t.item}</td>
                          <td className="px-4 py-3 text-right text-gray-800 font-medium">{t.tiempo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  * Los plazos son válidos siempre que el Usuario cumpla con asistir a las pruebas programadas.
                </p>
              </Section>

              <Section number="8" title="Pagos">
                <p>
                  Los pagos por los servicios se realizan directamente en el local de Sastrería Marcel&apos;s
                  o según el medio acordado con el asesor. Cualquier pago pendiente debe ser cancelado
                  al momento de la entrega final de la prenda. Sastrería Marcel&apos;s puede retener la
                  entrega hasta la cancelación total del saldo.
                </p>
              </Section>
            </div>
          )}

          {/* Tab 2: Garantías y Cambios */}
          {activeTab === 2 && (
            <div>
              <Section number="9" title="Garantía de los Servicios">
                <p>
                  La garantía del servicio del atelier es de <strong>30 días calendario</strong> contabilizados
                  desde la entrega de la prenda. Cubre defectos de confección detectados posteriormente a la entrega.
                </p>
              </Section>

              <Section number="10" title="Garantía de los Productos">
                <p>La garantía no cubre:</p>
                <ul className="space-y-1 mt-2">
                  {['Deterioro normal por uso.', 'Uso indebido de la prenda.', 'Daños por falta de cuidado del Usuario o terceros.'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                    <p className="text-xs text-gray-500">Corbatas y pañuelos</p>
                    <p className="font-semibold text-black mt-1">30 días calendario</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                    <p className="text-xs text-gray-500">Otros productos</p>
                    <p className="font-semibold text-black mt-1">30 días calendario</p>
                  </div>
                </div>
              </Section>

              <Section number="11" title="Política de Cambios y Devoluciones">
                <p>
                  Las solicitudes de cambio serán evaluadas conforme al Artículo 97° de la Ley N° 29571 —
                  Código de Protección y Defensa del Consumidor. El cambio se realizará por un valor igual.
                </p>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mt-3">
                  <p className="text-xs text-amber-800 font-medium mb-2">Condiciones para cambios:</p>
                  <ul className="space-y-1 text-xs text-amber-700">
                    <li>• Solicitarse dentro de los 15 días calendario desde la entrega.</li>
                    <li>• Prenda en perfecto estado con etiquetas y empaques originales.</li>
                    <li>• No se admite cambio de ropa interior.</li>
                    <li>• No se realizan reembolsos de dinero; puede negociarse un nuevo servicio o prenda de igual categoría.</li>
                  </ul>
                </div>
              </Section>

              <Section number="12" title="Pedidos de Urgencia">
                <p>
                  Si el asesor comercial autoriza la confección en un periodo menor al estándar,
                  Sastrería Marcel&apos;s hará lo posible por cumplir con la fecha proyectada, la cual
                  podrá estar sujeta a cambios según la disponibilidad y el cumplimiento del Usuario
                  con las pruebas.
                </p>
              </Section>
            </div>
          )}

          {/* Tab 3: Datos Personales */}
          {activeTab === 3 && (
            <div>
              <Section number="13" title="Tratamiento de Datos Personales">
                <p>
                  Al acceder a los servicios del sitio o al registrar sus datos de forma presencial,
                  el Usuario otorga su consentimiento libre, previo, informado e inequívoco a
                  Sastrería Marcel&apos;s como responsable del tratamiento de sus datos personales,
                  conforme a la Ley N° 29733 — Ley de Protección de Datos Personales.
                </p>
                <p>
                  Los datos podrán ser utilizados para: coordinación de servicios y entregas,
                  atención de consultas y reclamos, verificación de identidad, videovigilancia
                  en instalaciones, y comunicaciones relacionadas con los servicios contratados.
                </p>
              </Section>

              <Section number="14" title="Derechos ARCO">
                <p>
                  El Usuario mantiene los <strong>Derechos ARCO</strong> (Acceso, Rectificación,
                  Cancelación y Oposición). Para ejercerlos, escriba a{' '}
                  <a href="mailto:sastreria.marcels.pe@gmail.com" className="text-black underline underline-offset-2">
                    sastreria.marcels.pe@gmail.com
                  </a>{' '}
                  con el asunto: <em>Ejercicio Derechos ARCO</em>. La solicitud será atendida
                  a la brevedad posible.
                </p>
              </Section>

              <Section number="15" title="Seguridad de los Datos">
                <p>
                  Sastrería Marcel&apos;s aplica medidas técnicas y organizativas para proteger los datos
                  del Usuario frente a manipulaciones, pérdidas o accesos no autorizados. Estas
                  medidas se actualizan continuamente en correlación con la evolución tecnológica.
                </p>
                <p>
                  Para consultas sobre seguridad de datos, escriba a{' '}
                  <a href="mailto:sastreria.marcels.pe@gmail.com" className="text-black underline underline-offset-2">
                    sastreria.marcels.pe@gmail.com
                  </a>{' '}
                  con el asunto: <em>Sobre Seguridad de Datos Personales</em>.
                </p>
              </Section>
            </div>
          )}

          {/* Tab 4: Legal */}
          {activeTab === 4 && (
            <div>
              <Section number="16" title="Responsabilidad">
                <p>
                  Sastrería Marcel&apos;s no se hace responsable de interrupciones del servicio, presencia
                  de malware en el sitio, contenido de sitios externos enlazados, ni de daños directos
                  o indirectos derivados del uso o imposibilidad de uso del sitio.
                </p>
                <p>
                  El Usuario se compromete a indemnizar a Sastrería Marcel&apos;s ante cualquier acción,
                  pérdida o daño derivado de la violación de estos T&C por parte del Usuario.
                </p>
              </Section>

              <Section number="17" title="Jurisdicción y Ley Aplicable">
                <p>
                  El sitio y sus T&C se rigen por las leyes de la República del Perú. Cualquier
                  litigio será resuelto ante tribunales peruanos, ya sean judiciales o arbitrales.
                  Si algún artículo se declarara nulo, el resto de disposiciones seguirán siendo
                  válidas y aplicables.
                </p>
              </Section>

              <Section number="18" title="Comunicaciones y Modificaciones">
                <p>
                  Para consultas, quejas o reclamos sobre el uso del sitio o los servicios contratados,
                  contáctenos en{' '}
                  <a href="mailto:sastreria.marcels.pe@gmail.com" className="text-black underline underline-offset-2">
                    sastreria.marcels.pe@gmail.com
                  </a>.
                </p>
                <p>
                  Sastrería Marcel&apos;s podrá modificar estos T&C en cualquier momento. Los cambios
                  serán informados a través del sitio web, correo electrónico u otros medios de
                  comunicación disponibles.
                </p>
              </Section>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              ¿Tienes dudas? Escríbenos a{' '}
              <a href="mailto:sastreria.marcels.pe@gmail.com" className="text-black underline underline-offset-2">
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
    <Footer />
    </>
  );
}