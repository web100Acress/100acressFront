/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/choose-country',
        destination: '/country/choose',
      },
      {
        source: '/uk',
        destination: '/country/uk',
      },
      {
        source: '/uk/:path*',
        destination: '/country/uk/:path*',
      },
      {
        source: '/usa',
        destination: '/country/usa',
      },
      {
        source: '/usa/:path*',
        destination: '/country/usa/:path*',
      },
      {
        source: '/srilanka',
        destination: '/country/srilanka',
      },
      {
        source: '/srilanka/:path*',
        destination: '/country/srilanka/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
