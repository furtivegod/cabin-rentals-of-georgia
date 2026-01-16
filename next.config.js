/** @type {import('next').NextConfig} */
const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || ''

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.dev',
      },
      {
        protocol: 'https',
        hostname: '**.railway.app',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      // Add custom R2 domain if provided
      ...(r2PublicUrl ? [{
        protocol: 'https',
        hostname: new URL(r2PublicUrl).hostname.replace(/^www\./, ''),
      }] : []),
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
}

module.exports = nextConfig
