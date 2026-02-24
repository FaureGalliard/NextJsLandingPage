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

type FilterStatus = 'all' | 'today' | 'upcoming' | 'past';
type ViewMode = 'list' | 'calendar';

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

function isToday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// ── Iconos ───────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
    <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
    <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512">
    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512">
    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
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
function StatCard({ label, value, accent = false, delay = 0 }: {
  label: string; value: number; accent?: boolean; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`rounded-xl p-5 border ${accent ? 'bg-white text-black border-black' : 'bg-white text-black border-gray-100 shadow-sm'}`}
    >
      <p className="text-xs uppercase tracking-widest font-medium mb-3 text-gray-400">{label}</p>
      <p className="text-4xl font-bold text-black">{value}</p>
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
      <motion.div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      >
        <div className="bg-black px-7 py-6 flex items-start justify-between">
          <div>
            <p className="text-yellow-400 text-xs tracking-[0.25em] uppercase font-semibold mb-1.5">Detalle de Cita</p>
            <h2 className="text-white text-2xl font-serif font-bold leading-tight">
              {appt.first_name} {appt.last_name}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors mt-1 p-1">
            <XIcon />
          </button>
        </div>

        <div className="px-7 py-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Estado</span>
            {isToday(appt.appointment_datetime) ? (
              <span className="flex items-center gap-2 text-sm font-medium text-black bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                Hoy
              </span>
            ) : isUpcoming(appt.appointment_datetime) ? (
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

          {[
            { label: 'Email', value: appt.email, isEmail: true },
            { label: 'Servicio', value: appt.service_type },
            { label: 'Fecha', value: formatDate(appt.appointment_datetime) },
            { label: 'Hora', value: formatTime(appt.appointment_datetime) },
          ].map(({ label, value, isEmail }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-medium shrink-0 pt-0.5">{label}</span>
              {isEmail ? (
                <a href={`mailto:${value}`} className="text-sm text-black font-medium hover:text-yellow-600 transition-colors text-right">{value}</a>
              ) : (
                <span className="text-sm text-gray-800 text-right font-medium">{value}</span>
              )}
            </div>
          ))}

          {appt.message && (
            <>
              <div className="border-t border-gray-100" />
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-2">Mensaje</p>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">{appt.message}</p>
              </div>
            </>
          )}

          <div className="border-t border-gray-100 pt-1">
            <p className="text-xs text-gray-300">Registrado el {formatDate(appt.created_at)}</p>
          </div>
        </div>

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

// ── Vista Calendario ──────────────────────────────────────────────────────────
function CalendarView({ appointments, onSelect }: { appointments: Appointment[]; onSelect: (a: Appointment) => void }) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const dayNames = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();

  // Mapa: "YYYY-MM-DD" → Appointment[]
  const apptByDay: Record<string, Appointment[]> = {};
  appointments.forEach((a) => {
    const d = new Date(a.appointment_datetime);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (!apptByDay[key]) apptByDay[key] = [];
    apptByDay[key].push(a);
  });

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Rellenar hasta completar filas de 7
  while (cells.length % 7 !== 0) cells.push(null);

  function prevMonth() { setCurrentMonth(new Date(year, month - 1, 1)); }
  function nextMonth() { setCurrentMonth(new Date(year, month + 1, 1)); }
  function goToday()   { setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1)); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Cabecera del calendario */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-xl font-bold text-black">
            {monthNames[month]} {year}
          </h2>
          <button
            onClick={goToday}
            className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-black hover:text-black transition-colors"
          >
            Hoy
          </button>
        </div>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-black transition-colors">
            <ChevronLeftIcon />
          </button>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-black transition-colors">
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {dayNames.map((d) => (
          <div key={d} className="py-3 text-center text-xs uppercase tracking-widest text-gray-400 font-medium">
            {d}
          </div>
        ))}
      </div>

      {/* Grid de días */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} className="min-h-[90px] border-b border-r border-gray-50" />;
          }

          const cellDate = new Date(year, month, day);
          const key = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          const dayAppts = apptByDay[key] ?? [];
          const isCurrentDay = isSameDay(cellDate, today);
          const isLastInRow = (idx + 1) % 7 === 0;

          return (
            <div
              key={day}
              className={`min-h-[90px] p-2 border-b border-gray-50 ${!isLastInRow ? 'border-r' : ''} ${isCurrentDay ? 'bg-yellow-50/60' : 'hover:bg-gray-50/50'} transition-colors`}
            >
              <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm mb-1 font-medium ${
                isCurrentDay ? 'bg-black text-white' : 'text-gray-700'
              }`}>
                {day}
              </div>
              <div className="space-y-1">
                {dayAppts.slice(0, 2).map((a) => (
                  <button
                    key={a.id}
                    onClick={() => onSelect(a)}
                    className="w-full text-left text-xs px-1.5 py-1 rounded bg-black text-white truncate hover:bg-gray-800 transition-colors leading-tight"
                  >
                    {formatTime(a.appointment_datetime)} {a.first_name}
                  </button>
                ))}
                {dayAppts.length > 2 && (
                  <p className="text-xs text-gray-400 pl-1">+{dayAppts.length - 2} más</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Dashboard principal ───────────────────────────────────────────────────────
export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [view, setView] = useState<ViewMode>('list');
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
      filter === 'all'      ? true :
      filter === 'today'    ? isToday(a.appointment_datetime) :
      filter === 'upcoming' ? isUpcoming(a.appointment_datetime) && !isToday(a.appointment_datetime) :
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

  const todayCount    = appointments.filter((a) => isToday(a.appointment_datetime)).length;
  const upcomingCount = appointments.filter((a) => isUpcoming(a.appointment_datetime) && !isToday(a.appointment_datetime)).length;

  const filters: { key: FilterStatus; label: string }[] = [
    { key: 'all',      label: 'Todas' },
    { key: 'today',    label: 'Hoy' },
    { key: 'upcoming', label: 'Próximas' },
    { key: 'past',     label: 'Pasadas' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <Navbar />

      {/* Hero */}
      <div className="bg-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-semibold block mb-3">
              Panel de Control
            </span>
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
              Citas Agendadas
            </h1>
            <p className="text-gray-400 mt-3 text-base font-light">
              Gestiona y revisa todas las solicitudes recibidas.
            </p>
          </motion.div>

          {/* Stats — solo Hoy y Próximas */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-10 max-w-sm">
            <StatCard label="Hoy"      value={todayCount}    delay={0.1} accent />
            <StatCard label="Próximas" value={upcomingCount} delay={0.2} />
          </div>
        </div>
      </div>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Controles */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Buscador */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon /></span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, email o servicio..."
              className="w-full bg-white border border-gray-200 text-black text-sm rounded-full pl-11 pr-5 py-3 outline-none focus:border-black transition-colors placeholder:text-gray-400 shadow-sm"
            />
          </div>

          {/* Filtros de estado */}
          <div className="flex gap-2 flex-wrap">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  filter === key
                    ? 'bg-black text-white border-black shadow-lg'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Toggle de vista */}
          <div className="flex gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-sm self-start sm:self-auto">
            <button
              onClick={() => setView('list')}
              title="Vista lista"
              className={`p-2 rounded-full transition-all ${view === 'list' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
            >
              <ListIcon />
            </button>
            <button
              onClick={() => setView('calendar')}
              title="Vista calendario"
              className={`p-2 rounded-full transition-all ${view === 'calendar' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
            >
              <CalendarIcon />
            </button>
          </div>
        </div>

        {/* Contenido según estado de carga */}
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
        ) : view === 'calendar' ? (
          /* ── Vista Calendario ── */
          <CalendarView
            appointments={filter === 'all' ? appointments : filtered}
            onSelect={setSelected}
          />
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
                    {['Cliente','Servicio','Fecha','Hora','Estado',''].map((h, i) => (
                      <th key={i} className={`${i < 5 ? 'text-left' : ''} px-6 py-4 text-xs uppercase tracking-widest text-gray-400 font-medium`}>
                        {h}
                      </th>
                    ))}
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
                          <p className="font-semibold text-black font-inter text-base">{appt.first_name} {appt.last_name}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{appt.email}</p>
                        </td>
                        <td className="px-6 py-4"><ServiceBadge type={appt.service_type} /></td>
                        <td className="px-6 py-4 text-gray-700 text-sm">{formatDate(appt.appointment_datetime)}</td>
                        <td className="px-6 py-4 text-gray-700 text-sm">{formatTime(appt.appointment_datetime)}</td>
                        <td className="px-6 py-4">
                          {isToday(appt.appointment_datetime) ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-black bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Hoy
                            </span>
                          ) : isUpcoming(appt.appointment_datetime) ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-black bg-yellow-50 border border-yellow-200 px-2.5 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Próxima
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Pasada
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-xs text-gray-300 group-hover:text-yellow-500 transition-colors font-medium">Ver detalle →</span>
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
                      <p className="font-serif font-semibold text-black text-lg leading-tight">{appt.first_name} {appt.last_name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{appt.email}</p>
                    </div>
                    {isToday(appt.appointment_datetime) ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-black bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Hoy
                      </span>
                    ) : isUpcoming(appt.appointment_datetime) ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-black bg-yellow-50 border border-yellow-200 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Próxima
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Pasada
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <ServiceBadge type={appt.service_type} />
                    <span className="text-gray-400 text-xs">{formatDate(appt.appointment_datetime)} · {formatTime(appt.appointment_datetime)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selected && <DetailModal appt={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}