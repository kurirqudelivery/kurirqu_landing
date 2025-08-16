import type { Metadata } from "next"
import KebijakanPrivasiClient from "./KebijakanPrivasiClient"

export const metadata: Metadata = {
  title: "Kebijakan Privasi - KurirQu Blitar | Perlindungan Data Pribadi",
  description:
    "Kebijakan privasi KurirQu dalam melindungi data pribadi pengguna. Komitmen keamanan informasi dan transparansi penggunaan data layanan kurir Blitar.",
  keywords: "kebijakan privasi kurirqu, privacy policy kurir blitar, perlindungan data pribadi, keamanan informasi",
  openGraph: {
    title: "Kebijakan Privasi - KurirQu Blitar",
    description: "Komitmen KurirQu dalam melindungi privasi dan keamanan data pribadi pengguna layanan kurir.",
    url: "/kebijakan-privasi",
    type: "website",
  },
  alternates: {
    canonical: "/kebijakan-privasi",
  },
  robots: {
    index: true,
    follow: false,
  },
}

export default function KebijakanPrivasi() {
  return <KebijakanPrivasiClient />
}
