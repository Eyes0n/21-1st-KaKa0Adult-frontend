module.exports = {
  images: {
    domain: ['jotasic.github.io'],
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
