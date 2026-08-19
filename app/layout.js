import { Fraunces, Jost } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://spacesbyraag.com"),
  title: "Spaces by Raag — Luxury Interior Designers in Gurgaon & Delhi NCR",
  description:
    "Spaces by Raag is a boutique interior design studio creating timeless, quietly luxurious residences across Gurgaon, Delhi NCR and North India — with end-to-end turnkey execution.",
  keywords: [
    "luxury interior designers Gurgaon",
    "interior designers Delhi NCR",
    "turnkey interior designers Gurgaon",
    "villa interior designers Gurgaon",
    "premium interior design Delhi",
  ],
  openGraph: {
    title: "Spaces by Raag — Where Form Finds Feeling",
    description:
      "Timeless, thoughtful interiors and end-to-end execution for premium residences across Delhi NCR.",
    images: ["/images/hero-facade.jpg"],
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#3A2517" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
