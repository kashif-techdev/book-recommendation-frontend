/** @type {import('next').NextConfig} */
// Used for server-side rewrites so the browser can call same-origin /api-backend/* (avoids CORS and
// broken builds when NEXT_PUBLIC_API_URL was missing at build time, which would otherwise fall back to localhost).
const backendUrl =
  process.env.BACKEND_URL?.replace(/\/$/, '') ||
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'https://book-recommendation-system-backend-a0fr.onrender.com'

const nextConfig = {
  images: {
    domains: [
      'covers.openlibrary.org',
      'books.google.com',
      'via.placeholder.com',
      'localhost'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api-backend/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
