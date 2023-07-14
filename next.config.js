/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
