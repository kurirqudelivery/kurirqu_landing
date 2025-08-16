import type { Metadata } from "next"
import SyaratKetentuanClient from "./SyaratKetentuanClient"

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - KurirQu Blitar | Ketentuan Layanan Kurir",
  description:
    "Baca syarat dan ketentuan penggunaan layanan KurirQu. Ketahui hak dan kewajiban pengguna, tarif, tanggung jawab, dan kebijakan pengiriman kurir Blitar.",
  keywords: "syarat ketentuan kurirqu, terms of service kurir blitar, kebijakan pengiriman, aturan layanan kurir",
  openGraph: {
    title: "Syarat & Ketentuan - KurirQu Blitar",
    description: "Syarat dan ketentuan penggunaan layanan kurir KurirQu di Blitar, Jawa Timur.",
    url: "/syarat-ketentuan",
    type: "website",
  },
  alternates: {
    canonical: "/syarat-ketentuan",
  },
  robots: {
    index: true,
    follow: false,
  },
}

export default function SyaratKetentuan() {
  return <SyaratKetentuanClient />
}
