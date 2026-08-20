import Script from "next/script";

/**
 * Google Analytics 4. Renders nothing until NEXT_PUBLIC_GA_ID is set, so the
 * measurement ID lives in the host's env rather than the repo, and local
 * development never pollutes the client's analytics.
 */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${id}');`}
      </Script>
    </>
  );
}
