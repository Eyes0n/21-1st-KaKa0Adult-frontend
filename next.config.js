module.exports = {
  images: {
    domain: ['jotasic.github.io'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main/products/new',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [];
  },
};
