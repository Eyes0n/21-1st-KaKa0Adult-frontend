/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domain: ['jotasic.github.io', 'picsum.photos'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products/new',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
