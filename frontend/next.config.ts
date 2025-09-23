import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  publicRuntimeConfig: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  },
  serverRuntimeConfig: {
    API_URL: process.env.API_URL || 'http://backend:8000/api',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:8000/api/:path*/',
      },
    ];
  },
};

export default nextConfig;
