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
