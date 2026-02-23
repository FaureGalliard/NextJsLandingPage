import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter,Roboto, Archivo} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto.variable} ${archivo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
export const metadata: Metadata = {
  metadataBase: new URL("https://sastreria-marcels.vercel.app"), // cambia por tu dominio real

  title: {
    default: "Sastrería Marcel's | Confección a Medida en Callao",
    template: "%s | Sastrería Marcel's",
  },

  description:
    "Sastrería en Callao especializada en ternos a medida, ajustes, alquiler y confección personalizada. Reserva tu cita privada hoy.",

  keywords: [
    "sastrería Callao",
    "ternos a medida en Callao",
    "alquiler de ternos Callao",
    "confección personalizada",
    "ajustes de ternos",
    "sastre en Callao"
  ],

  authors: [{ name: "Sastrería Marcel's" }],
  creator: "Sastrería Marcel's",
  publisher: "Sastrería Marcel's",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
     canonical: "https://sastreria-marcels.vercel.app",
  },

  openGraph: {
    title: "Sastrería Marcel's | Confección a Medida en Callao",
    description:
      "Sastrería en Callao especializada en ternos a medida, ajustes y alquiler de trajes. Atención personalizada.",
    url: "https://sastreria-marcels.vercel.app/",
    siteName: "Sastrería Marcel's",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/public/og-image.jpg", // crea esta imagen en public/
        width: 1200,
        height: 630,
        alt: "Sastrería Marcel's - Confección a Medida",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sastrería Marcel's | Confección a Medida",
    description:
      "Ternos a medida, ajustes y alquiler en Callao. Agenda tu cita .",
    images: ["/public/og-image.jpg"],
  },

  category: "fashion",
};