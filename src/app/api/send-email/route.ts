import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { to, subject, html } = await req.json();

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Sastreria Marcel's <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ ok: false, status: res.status, error });
  }

  return NextResponse.json({ ok: true });
}

// ─── Helpers para generar los HTMLs ────────────────────────────────────────────

export function clientEmailHtml({
  first_name,
  service_type,
  dateValue,
  timeValue,
}: {
  first_name: string;
  service_type: string;
  dateValue: string;
  timeValue: string;
}) {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header negro -->
          <tr>
            <td style="background:#000000;padding:36px 40px;text-align:center;">
              <p style="margin:0;color:#d4a017;font-size:11px;letter-spacing:4px;text-transform:uppercase;font-weight:600;">Sastreria Marcel's</p>
              <h1 style="margin:12px 0 0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">Reserva Confirmada</h1>
            </td>
          </tr>
          <!-- Cuerpo -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hola <strong>${first_name}</strong>,</p>
              <p style="margin:0 0 28px;color:#6b7280;font-size:15px;line-height:1.6;">
                Hemos recibido tu solicitud de cita. A continuacion el resumen:
              </p>
              <!-- Tarjeta resumen -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                          <span style="color:#6b7280;font-size:13px;">Servicio</span><br/>
                          <strong style="color:#111827;font-size:15px;">${service_type}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                          <span style="color:#6b7280;font-size:13px;">Fecha</span><br/>
                          <strong style="color:#111827;font-size:15px;">${dateValue}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="color:#6b7280;font-size:13px;">Hora</span><br/>
                          <strong style="color:#111827;font-size:15px;">${timeValue}</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;color:#6b7280;font-size:14px;line-height:1.6;">
                Nos pondremos en contacto contigo a la brevedad para confirmar los detalles finales.
              </p>
              <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
                Si tienes alguna pregunta, puedes escribirnos a
                <a href="mailto:sastreria.marcels.pe@gmail.com" style="color:#000000;font-weight:600;">sastreria.marcels.pe@gmail.com</a>
                o llamarnos al <strong>+51 935 814 870</strong>.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;text-align:center;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">Sastreria Marcel's &bull; Av. Los Dominicos 230, Callao &bull; CP 07041</p>
              <p style="margin:6px 0 0;color:#9ca3af;font-size:12px;">Lun-Sab 9:00-21:00 &bull; Dom 10:00-16:00</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function businessEmailHtml({
  first_name,
  last_name,
  email,
  service_type,
  dateValue,
  timeValue,
  message,
}: {
  first_name: string;
  last_name: string;
  email: string;
  service_type: string;
  dateValue: string;
  timeValue: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#000000;padding:32px 40px;">
              <p style="margin:0;color:#d4a017;font-size:11px;letter-spacing:4px;text-transform:uppercase;font-weight:600;">Nueva Solicitud</p>
              <h1 style="margin:10px 0 0;color:#ffffff;font-size:22px;font-weight:700;">
                ${first_name} ${last_name} ha reservado una cita
              </h1>
            </td>
          </tr>
          <!-- Datos -->
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
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">Este correo fue generado automaticamente desde el formulario de sastreriamarcels.vercel.app</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}