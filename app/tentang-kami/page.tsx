import type { Metadata } from "next"
import TentangKamiClient from "./TentangKamiClient"

export const metadata: Metadata = {
  title: "Tentang KurirQu - Jasa Kurir Terpercaya Blitar | Layanan WhatsApp",
  description:
    "Kenali lebih dekat KurirQu, layanan kurir profesional di Blitar. Antar paket, makanan, transportasi, dan jasa bersih-bersih cukup lewat WhatsApp. Praktis tanpa aplikasi!",
  keywords:
    "tentang kurirqu, profil perusahaan kurir blitar, sejarah kurirqu, visi misi kurir, layanan whatsapp delivery",
  openGraph: {
    title: "Tentang KurirQu - Jasa Kurir Terpercaya Blitar",
    description: "Kenali lebih dekat KurirQu, layanan kurir profesional di Blitar. Semua layanan cukup lewat WhatsApp!",
    url: "/tentang-kami",
    type: "website",
  },
  alternates: {
    canonical: "/tentang-kami",
  },
}

export default function TentangKami() {
  return <TentangKamiClient />
}
