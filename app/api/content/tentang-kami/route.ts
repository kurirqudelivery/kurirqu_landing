import { NextRequest, NextResponse } from 'next/server'
import { getContentModel } from '@/lib/models'

export async function GET() {
  try {
    const contentModel = await getContentModel()
    const content = await contentModel.getTentangKamiContent()
    
    if (!content) {
      // Return default content if none exists
      const defaultContent = {
        headerTitle: "Tentang KurirQu",
        headerSubtitle: "Solusi praktis untuk semua kebutuhan harian Anda, cukup lewat WhatsApp",
        storyTitle: "Cerita Kami",
        storyContent: [
          "Di tengah kesibukan, orang sering males ribet harus download aplikasi baru cuma buat pesan layanan. Dari situ lahirlah KurirQu: solusi praktis untuk semua kebutuhan harian Anda, cukup lewat WhatsApp.",
          "Kami paham hampir semua orang Indonesia pakai WhatsApp setiap hari. Jadi, kami buat segalanya lebih gampang: tinggal chat admin, langsung order. Tanpa ribet install aplikasi, tanpa repot bikin akun."
        ],
        servicesTitle: "Layanan Kami",
        services: [
          {
            icon: "Truck",
            title: "Antar Paket & Dokumen",
            description: "Kirim paket atau dokumen penting dengan cepat, aman, dan tepat waktu."
          },
          {
            icon: "UtensilsCrossed",
            title: "Antar Makanan",
            description: "Mau makanan favorit? Tinggal chat, kami antar langsung ke lokasi Anda."
          },
          {
            icon: "Car",
            title: "Ojek Motor & Mobil",
            description: "Butuh tumpangan motor atau mobil? Tinggal pesan, kami segera jemput."
          },
          {
            icon: "CarTaxiFront",
            title: "Rental Mobil",
            description: "Sewa mobil harian atau untuk perjalanan khusus, gampang lewat WhatsApp."
          },
          {
            icon: "Sparkles",
            title: "Jasa Bersih-Bersih",
            description: "Rumah, kos, atau kantor jadi lebih bersih tanpa ribet cari orang."
          }
        ],
        whyChooseTitle: "Kenapa Pilih KurirQu?",
        benefits: [
          "Cuma lewat WhatsApp – pesan apapun cukup chat admin.",
          "Tanpa aplikasi tambahan – gak perlu download atau daftar akun.",
          "Praktis & Cepat – semua layanan bisa diproses dalam hitungan menit.",
          "Layanan lengkap – dari antar paket, makanan, transportasi, sampai bersih-bersih."
        ],
        ctaTitle: "💡 Dengan KurirQu, hidup jadi lebih mudah.",
        ctaDescription: "Karena semua bisa beres hanya lewat satu chat di WhatsApp.",
        ctaButtonText: "Chat Admin Sekarang",
        ctaButtonUrl: "https://wa.link/dvsne2"
      }
      return NextResponse.json(defaultContent)
    }
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching Tentang Kami data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Tentang Kami data' },
      { status: 500 }
    )
  }
}
