import { site } from "@/lib/site";

// Mirrors the `robots` metadata in app/layout.js: crawling is only opened up
// once NEXT_PUBLIC_SITE_URL points at the real domain, so the vercel.app
// placeholder never gets indexed and later needs migrating away from.
const live = !!process.env.NEXT_PUBLIC_SITE_URL;

export default function robots() {
  return {
    rules: live
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
