/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingExcludes: {
    '/work/[slug]': [
      './case-study-videos/**/*',
      './public/case-study-videos/**/*',
      './public/case-study-images/**/*',
    ],
  },
};

module.exports = nextConfig;
