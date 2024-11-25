module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
      {
        protocol: 'http',
        hostname: '13.235.113.210',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src *; connect-src *; script-src 'unsafe-inline' 'unsafe-eval' *; style-src 'unsafe-inline' *;",
          },
        ],
      },
    ];
  },
};
