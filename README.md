# 🧵 Sastrería Marcel's – Sistema Web de Gestión de Citas

Sistema web fullstack desarrollado para digitalizar la presencia online y la gestión de citas de un negocio local real. Actualmente en producción y en uso por el cliente.

---

## 🚀 Descripción

Aplicación que combina una landing page pública orientada a conversión con un panel administrativo privado para gestión de citas.

- Presencia online del negocio con información y servicios
- Contacto directo vía WhatsApp con mensaje preconfigurado
- Panel administrativo protegido para gestión de citas
- Autenticación segura con persistencia en base de datos remota

---

## 🏗 Arquitectura

### Frontend Público
- Landing page con secciones informativas y de servicios
- Animaciones con Framer Motion
- Botón flotante de WhatsApp con mensaje personalizado
- Diseño responsive optimizado para conversión

### Panel Administrativo (`/dashboard`)
- Ruta protegida mediante middleware
- Autenticación con Supabase Auth
- Gestión de citas con persistencia en base de datos
- Acceso exclusivo para el administrador

---

## 🛠 Stack

| Tecnología | Uso |
|---|---|
| Next.js (App Router) | Framework fullstack |
| Supabase | Auth + PostgreSQL |
| Tailwind CSS | Estilos |
| Framer Motion | Animaciones |
| Vercel | Deploy |

---

## 🔐 Seguridad

- Autenticación con Supabase Auth
- Middleware en `src/middleware.ts` para protección de rutas
- Redirección automática a `/login` si no hay sesión activa
- Variables de entorno para credenciales

---

## 🔮 Mejoras Futuras

- Roles de usuario (admin / empleado)
- Estados de citas (pendiente / confirmada / cancelada)
- Notificaciones automáticas
- Métricas del negocio
- Arquitectura multi-negocio (SaaS)

---

## 👨‍💻 Autor

**Ángel Gabriel Crispín Valdivia**  
Estudiante de Ingeniería de Software y Estadística  
Interesado en desarrollo fullstack, arquitectura de sistemas y digitalización de negocios.

---

## 📌 Estado

🟢 En producción · 🟢 Cliente real · 🟢 Proyecto activo