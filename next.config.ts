import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
       {
        protocol: 'https',
        hostname: 'storage.googleapis.com', 
      },
      {
        protocol: 'https',
        hostname: "cdn.shopify.com",
      }
    ],
  },
};

export default nextConfig;