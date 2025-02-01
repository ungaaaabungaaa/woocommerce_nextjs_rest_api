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
      {
        protocol: 'https',
        hostname: 'clothvillage.com',
      },
      // Add more patterns here
      {
        protocol: 'https',
        hostname: 'nextui.org',
      },
      {
        protocol: 'https',
        hostname: 'www.w3.org',
      },
      {
        protocol: 'https',
        hostname: 'backend.clothvillage.com',
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
            value: "default-src * 'unsafe-inline' 'unsafe-eval' http: https: data: blob:; connect-src * 'unsafe-inline' 'unsafe-eval' http: https: data: blob:;",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};