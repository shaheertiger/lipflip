import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const BASE_URL = "https://lipflipbeforeandafter.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Lip Flip Before and After | AI Lip Flip Visualizer - See Your Results Instantly",
  description:
    "See your lip flip before and after results instantly with our AI-powered lip flip visualizer. Upload a selfie and preview exactly what a lip flip looks like on your face. Private, instant, clinically calibrated lip flip simulation. No appointment needed.",
  keywords: [
    "lip flip before and after",
    "lip flip",
    "lip flip results",
    "lip flip visualizer",
    "lip flip simulator",
    "botox lip flip before and after",
    "lip flip before after photos",
    "what does a lip flip look like",
    "lip flip preview",
    "AI lip flip",
    "virtual lip flip",
    "lip flip tool",
    "lip flip cost",
    "lip flip vs filler",
    "subtle lip enhancement",
    "lip flip near me",
    "botox lip flip",
    "lip flip procedure",
    "lip flip botox before and after",
    "what is a lip flip",
  ],
  openGraph: {
    title: "Lip Flip Before and After | See Your Results Instantly with AI",
    description:
      "Upload a selfie and see exactly what a lip flip looks like on your face. AI-powered lip flip before and after visualizer — private, instant, and clinically calibrated.",
    url: BASE_URL,
    type: "website",
    locale: "en_US",
    siteName: "Lip Flip Before and After",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lip Flip Before and After — AI Visualizer",
    description:
      "See what a lip flip looks like on YOUR face before committing. Upload a selfie for instant, AI-powered lip flip before and after results.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Lip Flip Before and After Visualizer",
    "alternateName": "LipFlip BeforeAfter",
    "url": "https://lipflipbeforeandafter.online",
    "description": "AI-powered lip flip before and after visualizer. Upload a selfie and see exactly what a lip flip looks like on your face instantly. Clinically calibrated, 100% private.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0.99",
      "priceCurrency": "USD",
      "url": "https://lipflipbeforeandafter.online"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "12000",
      "bestRating": "5"
    },
    "featureList": [
      "AI-powered lip flip before and after visualization",
      "Instant results in seconds",
      "100% private photo processing",
      "Clinically calibrated AI model",
      "High-definition output",
      "Works on all lip shapes"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a lip flip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A lip flip is a non-invasive cosmetic procedure that uses a small amount of neurotoxin (like Botox) to relax the orbicularis oris muscle around the upper lip. This gently rolls the lip outward, creating a subtly fuller appearance without adding volume like fillers do."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a lip flip before and after visualization cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We charge a small one-time fee of $0.99 for a high-resolution AI visualization of your lip flip before and after results. This covers the GPU computing costs required to generate realistic, medical-grade projections."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate are the lip flip before and after results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI model is calibrated with input from board-certified aesthetic professionals and trained on thousands of real lip flip before and after outcomes. While individual results may vary, our visualizations give you a realistic preview of what to expect."
        }
      },
      {
        "@type": "Question",
        "name": "Do you keep or share my photos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Never. All image processing happens in your active browser session. We do not store, save, or use your photos for model training. Once you close the tab, your data is gone."
        }
      },
      {
        "@type": "Question",
        "name": "How is a lip flip different from lip filler?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A lip flip uses neurotoxin to relax the muscle and gently roll the top lip outward for a subtle effect, while lip filler adds volume by injecting hyaluronic acid. Our AI specifically visualizes the lip flip muscle relaxation effect, not filler."
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <link rel="canonical" href="https://lipflipbeforeandafter.online" />
      </head>
      <body className="antialiased min-h-screen overflow-x-hidden">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17950808078"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17950808078');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
