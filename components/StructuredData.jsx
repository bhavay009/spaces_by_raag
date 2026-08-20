import { site, services } from "@/lib/site";

/**
 * schema.org markup so Google can read the studio as a local business —
 * supports the PRD's organic-search and Google Ads readiness requirements.
 */
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    additionalType: "https://en.wikipedia.org/wiki/Interior_design",
    name: site.name,
    description:
      "Boutique interior design studio creating timeless, quietly luxurious residences across Gurgaon, Delhi NCR and North India, with end-to-end turnkey execution.",
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/images/hero-facade.jpg`,
    priceRange: "₹₹₹₹",
    address: { "@type": "PostalAddress", addressRegion: "Delhi NCR", addressCountry: "IN" },
    areaServed: ["Gurgaon", "Delhi", "Noida", "Faridabad", "Delhi NCR", "North India"].map(
      (name) => ({ "@type": "Place", name })
    ),
    founder: {
      "@type": "Person",
      name: "Ridham Girotra",
      jobTitle: "Founder & Designer",
    },
    sameAs: [site.instagram],
    knowsAbout: services.map((s) => s.title),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ // JSON.stringify does not escape "</script>"; harmless today (all values
        // are developer-authored) but keeps this safe if it ever goes dynamic.
        __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
