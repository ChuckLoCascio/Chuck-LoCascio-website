/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // case-study-media uses fs.readdirSync on public + repo case-study folders;
    // tracing pulls hundreds of MB into the work/[slug] serverless bundle (Vercel max 300MB).
    // Exclude those paths from the Node trace; assets still deploy as static files from public/.
    // Use a catch-all route glob so dynamic routes match (bracket paths are awkward in picomatch).
    outputFileTracingExcludes: {
      "**/*": [
        "./public/case-study-images/**/*",
        "./public/case-study-videos/**/*",
        "./case-study-images/**/*",
        "./case-study-videos/**/*",
      ],
    },
  },
};

module.exports = nextConfig;
