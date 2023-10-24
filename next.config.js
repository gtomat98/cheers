/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: [
    'page.tsx',
    'api.ts',
    'api.tsx',
    'page.ts',
    'page.jsx',
    'api.js',
  ],
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
