// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sastreriamarcels.vercel.app";

  const pages = [
    { url: `${baseUrl}/#appointment`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/#services`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/#philosophy`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() }, // la home
  ];

  return pages;
}