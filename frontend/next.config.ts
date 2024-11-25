import type { NextConfig } from "next";

const nextConfig: NextConfig = {

};

module.exports = {
  reactStrictMode: true, // Optional: enable React strict mode
  images: {
    domains: ['maps.googleapis.com'], // Allow images from Google Maps API
  },
};

export default nextConfig;
