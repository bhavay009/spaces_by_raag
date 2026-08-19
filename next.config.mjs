/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep production builds out of .next so `npm run build` can never
  // invalidate a running dev server's chunk manifest.
  distDir: process.env.BUILD_DIR || '.next',
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2200],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
