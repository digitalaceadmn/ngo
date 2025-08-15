/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  publicRuntimeConfig: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  },
  serverRuntimeConfig: {
    API_URL: process.env.API_URL || 'http://backend:8000/api',
  },
}

module.exports = nextConfig