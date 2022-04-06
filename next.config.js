module.exports = {
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
