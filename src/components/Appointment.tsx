'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

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

type ButtonStatus = 'idle' | 'loading' | 'success' | 'error';

function businessEmailHtml(
  first_name: string, last_name: string, email: string,
  service_type: string, dateValue: string, timeValue: string, message: string
) {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#000;padding:32px 40px;">
            <p style="margin:0;color:#d4a017;font-size:11px;letter-spacing:4px;text-transform:uppercase;font-weight:600;">Nueva Solicitud</p>
            <h1 style="margin:10px 0 0;color:#fff;font-size:22px;font-weight:700;">${first_name} ${last_name} ha reservado una cita</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
              <tr><td style="padding:20px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                    <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Cliente</span><br/>
                    <strong style="color:#111827;font-size:15px;">${first_name} ${last_name}</strong>
                  </td></tr>
                  <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                    <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</span><br/>
                    <a href="mailto:${email}" style="color:#000;font-size:15px;font-weight:600;">${email}</a>
                  </td></tr>
                  <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                    <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Servicio</span><br/>
                    <strong style="color:#111827;font-size:15px;">${service_type}</strong>
                  </td></tr>
                  <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                    <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Fecha y Hora</span><br/>
                    <strong style="color:#111827;font-size:15px;">${dateValue} a las ${timeValue}</strong>
                  </td></tr>
                  <tr><td style="padding:8px 0;">
                    <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Mensaje</span><br/>
                    <span style="color:#374151;font-size:15px;">${message || 'Sin mensaje'}</span>
                  </td></tr>
                </table>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">Generado automaticamente desde sastreriamarcels.vercel.app</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default function Appointment() {
  const [status, setStatus] = useState<ButtonStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = new FormData(e.currentTarget);
    const first_name   = form.get('first_name') as string;
    const last_name    = form.get('last_name') as string;
    const email        = form.get('email') as string;
    const service_type = form.get('service_type') as string;
    const dateValue    = form.get('date') as string;
    const timeValue    = form.get('time') as string;
    const message      = (form.get('message') as string) || '';

    const appointmentDatetime =
      dateValue && timeValue
        ? new Date(`${dateValue}T${timeValue}:00`).toISOString()
        : null;

    // 1️⃣ Guardar en Supabase
    const { error } = await supabase.from('appointments').insert([{
      first_name,
      last_name,
      email,
      service_type,
      appointment_datetime: appointmentDatetime,
      message: message || null,
      created_at: new Date().toISOString(),
    }]);

    if (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    // 2️⃣ Enviar correo solo a la empresa
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'sastreria.marcels.pe@gmail.com',
        subject: `Nueva cita: ${first_name} ${last_name} - ${dateValue} ${timeValue}`,
        html: businessEmailHtml(first_name, last_name, email, service_type, dateValue, timeValue, message),
      }),
    });

    setStatus('success');
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus('idle'), 3000);
  };

  const today = new Date().toISOString().split('T')[0];

  const buttonConfig = {
    idle: {
      bg: 'bg-black hover:bg-gray-800',
      label: 'Confirmar Solicitud',
      icon: null,
    },
    loading: {
      bg: 'bg-black',
      label: 'Enviando...',
      icon: (
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ),
    },
    success: {
      bg: 'bg-green-500',
      label: 'Reserva Confirmada',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      bg: 'bg-red-500',
      label: 'Hubo un Problema',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
  };

  const current = buttonConfig[status];

  return (
    <section id="appointment" className="py-24 bg-black text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgb(255,255,255) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
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
              Experimenta nuestro servicio de primera mano. Ya sea que estes buscando un traje
              de boda o actualizando tu vestuario empresarial, nuestros maestros sastres estan
              aqui para guiarte.
            </p>
            <div className="space-y-6 mt-12">
              <ContactItem
                icon={
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 384 512">
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                  </svg>
                }
                title="Callao"
                lines={['Av. Los Dominicos 230', 'Callao, Codigo Postal 07041']}
              />
              <ContactItem
                icon={
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                  </svg>
                }
                title="Telefono"
                lines={['+51 935 814 870', 'sastreria.marcels.pe@gmail.com']}
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
            <form onSubmit={handleSubmit}>
              {/* Nombre + Apellido */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                  <input
                    type="text"
                    name="last_name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                  placeholder="john@ejemplo.com"
                />
              </div>

              {/* Servicio + Fecha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Servicio
                  </label>
                  <div className="relative">
                    <select
                      name="service_type"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none appearance-none bg-white"
                    >
                      <option>Ajustes y Confeccion a Medida</option>
                      <option>Transformacion y Modernizacion de Ropa</option>
                      <option>Alquiler de Ternos</option>
                      <option>Tintoreria y Lavanderia</option>
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
                    name="date"
                    required
                    min={today}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                  />
                </div>
              </div>

              {/* Hora */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora de la cita
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  min="09:00"
                  max="21:00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Horario: Lun-Sab 9:00-21:00 &middot; Dom 10:00-16:00
                </p>
              </div>

              {/* Mensaje */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje (Opcional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                  placeholder="Cualquier requisito o pregunta especifica"
                />
              </div>

              {/* Botón con animación de estado */}
              <motion.button
                type="submit"
                disabled={status !== 'idle'}
                animate={{
                  scale: status === 'success' || status === 'error' ? [1, 1.03, 1] : 1,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`
                  w-full text-white font-medium py-4 rounded-lg shadow-lg
                  flex items-center justify-center gap-2
                  transition-colors duration-500
                  disabled:cursor-not-allowed
                  ${current.bg}
                `}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    {current.icon}
                    {current.label}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Nos pondremos en contacto contigo para confirmar tu cita.
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}