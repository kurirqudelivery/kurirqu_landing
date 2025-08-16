import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "KurirQu - Jasa Kurir Terpercaya Blitar | Kirim Makanan, Barang & Transportasi",
  description:
    "Layanan kurir profesional di Blitar, Jawa Timur. Pengiriman makanan, barang, dan transportasi 24/7. Hubungi via WhatsApp untuk pemesanan cepat dan mudah.",
  keywords:
    "kurir blitar, jasa kurir, pengiriman makanan blitar, kurir online, transportasi blitar, kirim barang, delivery service, kurirqu",
  authors: [{ name: "KurirQu" }],
  creator: "KurirQu",
  publisher: "KurirQu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kurirqu.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KurirQu - Jasa Kurir Terpercaya Blitar",
    description:
      "Layanan kurir profesional di Blitar. Pengiriman makanan, barang, dan transportasi 24/7. Pesan sekarang via WhatsApp!",
    url: "https://kurirqu.vercel.app",
    siteName: "KurirQu",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KurirQu - Jasa Kurir Terpercaya Blitar",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KurirQu - Jasa Kurir Terpercaya Blitar",
    description: "Layanan kurir profesional di Blitar. Pengiriman makanan, barang, dan transportasi 24/7.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "KurirQu",
  image: "https://kurirqu.vercel.app/og-image.png",
  description: "Layanan kurir profesional di Blitar, Jawa Timur. Pengiriman makanan, barang, dan transportasi 24/7.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Griya Jati Permai, Sukorejo",
    addressLocality: "Blitar",
    addressRegion: "Jawa Timur",
    postalCode: "66121",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -8.0956,
    longitude: 112.1681,
  },
  telephone: "+62 822-3641-8724",
  url: "https://kurirqu.vercel.app",
  sameAs: ["https://wa.link/dvsne2"],
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "$$",
  serviceArea: {
    "@type": "City",
    name: "Blitar",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Layanan KurirQu",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pengiriman Makanan",
          description: "Layanan antar makanan cepat dan aman",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pengiriman Barang",
          description: "Kirim dokumen, paket, dan barang lainnya",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Transportasi",
          description: "Layanan transportasi dalam kota",
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className="font-sans">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
