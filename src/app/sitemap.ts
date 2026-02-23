import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sastreriamarcels.vercel.app";

  const staticPages = ["", "bespokeprocess", "appointment"]; // agrega más rutas si tienes
  const pages = staticPages.map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: new Date().toISOString(),
  }));

  return pages;
}