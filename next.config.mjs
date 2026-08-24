/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next's dev-tools bubble (bottom-left). Development only — it never shipped
  // to production — but it sits over the design while reviewing.
  devIndicators: false,
  // Keep production builds out of .next so `npm run build` can never
  // invalidate a running dev server's chunk manifest.
  distDir: process.env.BUILD_DIR || '.next',
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2200],
    qualities: [75, 90],
  },
  poweredByHeader: false,
  compress: true,

  // Baseline hardening. A full CSP is deliberately left out for now: it needs
  // to allowlist googletagmanager.com for GA4 and would silently break
  // analytics if added without testing that path.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
