'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
// ── Tipos ────────────────────────────────────────────────────────────────────
interface Appointment {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  service_type: string;
  appointment_datetime: string;
  message: string | null;
  created_at: string;
}

type FilterStatus = 'all' | 'upcoming' | 'past';

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-PE', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('es-PE', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

function isUpcoming(iso: string) {
  return new Date(iso) >= new Date();
}

// ── Iconos ───────────────────────────────────────────────────────────────────
const ScissorsIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
    <path d="M256 192l-39.5-39.5c4.9-12.6 7.5-26.2 7.5-40.5C224 50.1 173.9 0 112 0S0 50.1 0 112s50.1 112 112 112c14.3 0 27.9-2.7 40.5-7.5L192 256l-39.5 39.5c-12.6-4.9-26.2-7.5-40.5-7.5C50.1 288 0 338.1 0 400s50.1 112 112 112s112-50.1 112-112c0-14.3-2.7-27.9-7.5-40.5L499.2 76.8c7.1-7.1 7.1-18.5 0-25.6c-28.3-28.3-74.1-28.3-102.4 0L256 192zm22.6 150.6L396.8 460.8c28.3 28.3 74.1 28.3 102.4 0c7.1-7.1 7.1-18.5 0-25.6L342.6 278.6l-64 64z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
    <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 448 512">
    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 384 512">
    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
  </svg>
);

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label, value, accent = false, delay = 0,
}: {
  label: string; value: number; accent?: boolean; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`rounded-xl p-5 border ${
        accent
          ? 'bg-[#ffffff] text-black border-black'
          : 'bg-white text-black border-gray-100 shadow-sm'
      }`}
    >
      <p className={`text-xs uppercase tracking-widest font-medium mb-3 ${accent ? 'text-gray-400' : 'text-gray-400'}`}>
        {label}
      </p>
      <p className={`text-4xl font-serif font-bold ${accent ? 'text-black' : 'text-black'}`}>
        {value}
      </p>
    </motion.div>
  );
}

// ── Badge de servicio ─────────────────────────────────────────────────────────
function ServiceBadge({ type }: { type: string }) {
  const short: Record<string, string> = {
    'Ajustes y Confeccion a Medida': 'Ajustes',
    'Transformacion y Modernizacion de Ropa': 'Modernización',
    'Alquiler de Ternos': 'Alquiler',
    'Tintoreria y Lavanderia': 'Tintorería',
    'Alteraciones Especiales': 'Alteraciones',
  };
  return (
    <span className="inline-block text-xs border border-gray-200 text-gray-600 rounded-full px-3 py-1 font-medium bg-gray-50">
      {short[type] ?? type}
    </span>
  );
}

// ── Modal de detalle ──────────────────────────────────────────────────────────
function DetailModal({ appt, onClose }: { appt: Appointment; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      >
        {/* Header */}
        <div className="bg-black px-7 py-6 flex items-start justify-between">
          <div>
            <p className="text-yellow-400 text-xs tracking-[0.25em] uppercase font-semibold mb-1.5">
              Detalle de Cita
            </p>
            <h2 className="text-white text-2xl font-serif font-bold leading-tight">
              {appt.first_name} {appt.last_name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors mt-1 p-1"
          >
            <XIcon />
          </button>
        </div>

        {/* Separador dorado */}
      

        {/* Body */}
        <div className="px-7 py-6 space-y-5">
          {/* Estado */}
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Estado</span>
            {isUpcoming(appt.appointment_datetime) ? (
              <span className="flex items-center gap-2 text-sm font-medium text-black bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />
                Próxima
              </span>
            ) : (
              <span className="flex items-center gap-2 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                Pasada
              </span>
            )}
          </div>

          <div className="border-t border-gray-100" />

          {/* Datos */}
          {[
            { label: 'Email', value: appt.email, isEmail: true },
            { label: 'Servicio', value: appt.service_type },
            { label: 'Fecha', value: formatDate(appt.appointment_datetime) },
            { label: 'Hora', value: formatTime(appt.appointment_datetime) },
          ].map(({ label, value, isEmail }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-medium shrink-0 pt-0.5">
                {label}
              </span>
              {isEmail ? (
                <a href={`mailto:${value}`} className="text-sm text-black font-medium hover:text-yellow-600 transition-colors text-right">
                  {value}
                </a>
              ) : (
                <span className="text-sm text-gray-800 text-right font-medium">{value}</span>
              )}
            </div>
          ))}

          {/* Mensaje */}
          {appt.message && (
            <>
              <div className="border-t border-gray-100" />
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-2">Mensaje</p>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                  {appt.message}
                </p>
              </div>
            </>
          )}

          <div className="border-t border-gray-100 pt-1">
            <p className="text-xs text-gray-300">
              Registrado el {formatDate(appt.created_at)}
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-7 pb-7">
          <a
            href={`mailto:${appt.email}?subject=Tu cita en Sastrería Marcel's`}
            className="w-full flex items-center justify-center gap-2 bg-black text-white text-sm font-medium py-3.5 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <MailIcon />
            Contactar cliente
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Dashboard principal ───────────────────────────────────────────────────────
export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Appointment | null>(null);

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_datetime', { ascending: true });
      if (!error && data) setAppointments(data);
      setLoading(false);
    }
    fetchAppointments();
  }, []);

  const filtered = appointments.filter((a) => {
    const matchFilter =
      filter === 'all' ? true :
      filter === 'upcoming' ? isUpcoming(a.appointment_datetime) :
      !isUpcoming(a.appointment_datetime);
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      a.first_name.toLowerCase().includes(q) ||
      a.last_name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.service_type.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const total    = appointments.length;
  const upcoming = appointments.filter((a) => isUpcoming(a.appointment_datetime)).length;
  const past     = total - upcoming;

  return (
    <div className="min-h-screen bg-[#f5f0eb]">

      {/* Navbar — misma estética que el sitio */}
      <Navbar/>

      {/* Hero del dashboard */}
      <div className="bg-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-semibold block mb-3">
              Panel de Control
            </span>
            <h1 className="text-white text-4xl md:text-5xl font- font-bold leading-tight">
              Citas Agendadas
            </h1>
            <p className="text-gray-400 mt-3 text-ms font-light">
              Gestiona y revisa todas las solicitudes recibidas.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            <StatCard label="Total de citas"   value={total}    delay={0.1} />
            <StatCard label="Próximas"         value={upcoming} delay={0.2} accent />
            <StatCard label="Completadas"      value={past}     delay={0.3} />
          </div>
        </div>
      </div>

     

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Controles */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Buscador */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, email o servicio..."
              className="w-full bg-white border border-gray-200 text-black text-sm rounded-full pl-11 pr-5 py-3 outline-none focus:border-black transition-colors placeholder:text-gray-400 shadow-sm"
            />
          </div>
          {/* Filtros */}
          <div className="flex gap-2">
            {(['all', 'upcoming', 'past'] as FilterStatus[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  filter === f
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
                }`}
              >
                {f === 'all' ? 'Todas' : f === 'upcoming' ? 'Próximas' : 'Pasadas'}
              </button>
            ))}
          </div>
        </div>

        {/* Estado de carga */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-4">
              <svg className="w-7 h-7 animate-spin text-black" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <p className="text-sm text-gray-400 uppercase tracking-widest">Cargando</p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-300">
            <CalendarIcon />
            <p className="text-sm mt-4 text-gray-400">No hay citas que coincidan.</p>
          </div>
        ) : (
          <>
            {/* Desktop — tabla */}
            <div className="font-inter hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-medium">
                      Cliente
                    </th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-medium">
                      Servicio
                    </th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-medium">
                      Fecha
                    </th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-medium">
                      Hora
                    </th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-medium">
                      Estado
                    </th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((appt, i) => (
                      <motion.tr
                        key={appt.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => setSelected(appt)}
                        className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-black font-inter text-base">
                            {appt.first_name} {appt.last_name}
                          </p>
                          <p className="text-gray-400 text-xs mt-0.5">{appt.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <ServiceBadge type={appt.service_type} />
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm">
                          {formatDate(appt.appointment_datetime)}
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm">
                          {formatTime(appt.appointment_datetime)}
                        </td>
                        <td className="px-6 py-4">
                          {isUpcoming(appt.appointment_datetime) ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-black bg-yellow-50 border border-yellow-200 px-2.5 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                              Próxima
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                              Pasada
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-xs text-gray-300 group-hover:text-yellow-500 transition-colors font-medium">
                            Ver detalle →
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile — cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((appt, i) => (
                <motion.div
                  key={appt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(appt)}
                  className="bg-white border border-gray-100 rounded-xl p-5 cursor-pointer shadow-sm active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-serif font-semibold text-black text-lg leading-tight">
                        {appt.first_name} {appt.last_name}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">{appt.email}</p>
                    </div>
                    {isUpcoming(appt.appointment_datetime) ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-black bg-yellow-50 border border-yellow-200 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                        Próxima
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        Pasada
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <ServiceBadge type={appt.service_type} />
                    <span className="text-gray-400 text-xs">
                      {formatDate(appt.appointment_datetime)} · {formatTime(appt.appointment_datetime)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            
          </>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <DetailModal appt={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}