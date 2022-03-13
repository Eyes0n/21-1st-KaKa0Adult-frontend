module.exports = {
  images: {
    domain: ['jotasic.github.io'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main/newproducts',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/newproducts',
        destination: '/main/newproducts',
      },
    ];
  },
};
