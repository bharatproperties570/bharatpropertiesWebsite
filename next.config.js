export default {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.bharatproperties.co' },
      { protocol: 'https', hostname: 'www.bharatproperties.co' },
      { protocol: 'https', hostname: 'bharatproperties.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512]
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/blog/blog-1',
        destination: '/blog/top-5-investment-locations-in-north-india-for-2026',
        permanent: true,
      },
      {
        source: '/blog/blog-3',
        destination: '/blog/first-time-home-buyer-guide-everything-you-need-to-know',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};
