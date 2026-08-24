// Single source of truth for brand + contact details. Easy to update later.
export const site = {
  name: "Spaces by Raag",
  tagline: "Spaces, thoughtfully designed. Beautifully executed.",
  phone: "+91 93111 35630",
  phoneRaw: "919311135630",
  email: "spacesbyraag@gmail.com",
  instagram: "https://instagram.com/spacesbyraag",
  instagramHandle: "@spacesbyraag",
  whatsappMessage:
    "Hi, I came across the Spaces by Raag website and would like to discuss a project.",
  location: "Delhi NCR · North India",
  // Canonical origin. Set NEXT_PUBLIC_SITE_URL in the host env once the real
  // domain is live; the fallback keeps metadata valid before then.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://spaces-by-raag.vercel.app").replace(/\/$/, ""),
};

// Floating button + footer link. PRD lists WhatsApp as a V1 requirement.
export const whatsappUrl = `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const strip = [
  "Tailored Design",
  "Turnkey Execution",
  "Detail-Driven Delivery",
  "Project Management",
];

export const credentials = [
  { value: "14+", label: "Years of Experience" },
  { value: "140+", label: "Projects Completed" },
  { value: "12+", label: "Cities Served — India & Abroad" },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Founder", href: "#founder" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  { n: "01", title: "Interior Design", note: "Concept, layouts, material palettes and detailed design." },
  { n: "02", title: "Turnkey Execution", note: "End-to-end delivery, on site, to programme." },
  { n: "03", title: "Renovations & Remodelling", note: "Reworking existing homes with minimal disruption." },
  { n: "04", title: "Custom Furniture & Joinery", note: "Bespoke pieces made to the space." },
  { n: "05", title: "Facade Design", note: "Elevations that hold their own on the street." },
  { n: "06", title: "Project Management", note: "Vendors, timelines and quality, coordinated." },
];

// Every figure below is taken from the Spaces by Raag Brand Deck.
export const projects = [
  {
    slug: "m3m",
    name: "Residence at M3M",
    location: "Gurgaon, India",
    type: "Penthouse",
    value: "₹ 5 Cr",
    area: "13,000 sq. ft.",
    scope: "Interior Design, Execution & Furniture",
    blurb:
      "Soft neutrals, bespoke detailing and statement lighting come together to craft interiors that are sophisticated, inviting and designed for everyday living.",
    images: ["m3m-1", "m3m-2", "m3m-3", "m3m-4"],
    alt: "Double-height living room with bespoke joinery and sculptural pendant lighting at a 13,000 sq ft penthouse in M3M, Gurgaon",
  },
  {
    slug: "aavaas",
    name: "Aavaas",
    location: "Gurgaon, India",
    type: "Villa",
    value: "₹ 1.7 Cr",
    area: "5,300 sq. ft.",
    scope: "Interior Design, Execution & Furniture",
    blurb:
      "A sanctuary where modern elegance meets everyday comfort — rooted in natural textures, timeless aesthetics and thoughtful details.",
    images: ["aavaas-1", "aavaas-2", "aavaas-3", "aavaas-4"],
    alt: "Warm naturally-lit living and dining space with timber detailing in a 5,300 sq ft villa in Gurgaon",
  },
  {
    slug: "australian-edit",
    name: "The Australian Edit",
    location: "Sydney, Australia",
    type: "Duplex",
    value: "35,000 AUD",
    area: "5,000 sq. ft.",
    scope: "Interior Design & Consulting only",
    blurb:
      "Warm timber finishes, a soothing neutral palette and abundant natural light — every space designed to evoke calm and effortless luxury.",
    images: ["australia-1", "australia-2", "australia-3", "australia-4"],
    alt: "Light-filled open plan kitchen and terrace with pale timber joinery in a duplex in Sydney, Australia",
  },
  {
    slug: "vilasa",
    name: "The Vilasa",
    location: "Gurgaon, India",
    type: "Villa",
    value: "₹ 1.1 Cr",
    area: "4,900 sq. ft.",
    scope: "Interior Design, Execution & Furniture",
    blurb:
      "A resort-inspired retreat with warm textures, statement lighting and thoughtfully crafted spaces. Earthy elegance meets modern comfort.",
    images: ["vilasa-1", "vilasa-2", "vilasa-3", "vilasa-4"],
    alt: "Double-height living area with woven pendant lights and an indoor water feature in a villa in Gurgaon",
  },
  {
    slug: "residential-retreat",
    name: "A Residential Retreat",
    location: "Gurgaon, India",
    type: "Independent Floor",
    value: "₹ 1.2 Cr",
    area: "4,900 sq. ft.",
    scope: "Interior Design, Execution & Furniture",
    blurb:
      "Rich tones, elegant details and contemporary design. From intimate living spaces to inviting bedrooms, every corner feels warm and intentional.",
    images: ["retreat-1", "retreat-2", "retreat-3", "retreat-4"],
    alt: "Contemporary living room with a deep blue sofa, bespoke panelling and layered lighting in an independent floor in Gurgaon",
  },
  {
    slug: "facades",
    name: "Front Facades",
    location: "Delhi NCR",
    type: "Facade Design",
    scope: "Architectural Facades & Elevations",
    blurb:
      "Front facades that blend timeless elegance with modern architecture — considered massing, warm material and lighting that carries after dark.",
    images: ["facade-1", "facade-2", "facade-3", "facade-4", "facade-5"],
    alt: "Contemporary residential facade with warm architectural lighting at dusk in Delhi NCR",
  },
  {
    slug: "offices",
    name: "Boutique Workspaces",
    location: "Delhi NCR",
    type: "Office Interiors",
    scope: "Interior Design & Execution",
    blurb:
      "Workspaces planned to balance functionality, comfort and contemporary aesthetics — refined environments that still feel easy to work in.",
    images: ["office-1", "office-2", "office-3", "office-4"],
    alt: "Contemporary boutique office interior with warm timber workstations and glazed partitions in Delhi NCR",
  },
  {
    slug: "residences",
    name: "The Residences",
    location: "Delhi NCR",
    type: "Residential Interiors",
    scope: "Interior Design, Execution & Furniture",
    blurb:
      "Spaces designed thoughtfully and residences meant to be lived in beautifully — a selection of homes across Delhi NCR.",
    images: ["residence-1", "residence-2", "residence-3", "residence-4", "residence-5"],
    alt: "Elegant residential living room with layered lighting and custom furniture in Delhi NCR",
  },
];

export const budgets = [
  "Below INR 1 Cr",
  "INR 1-2 Cr",
  "INR 2-3 Cr",
  "INR 3-5 Cr",
  "INR 5 Cr+",
];
