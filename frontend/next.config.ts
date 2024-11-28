import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Optional: enable React strict mode
  images: {
    domains: ['maps.googleapis.com'], // Allow images from Google Maps API
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ride/estimate',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
