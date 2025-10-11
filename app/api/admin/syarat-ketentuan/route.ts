import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getContentModel } from '@/lib/models'

// GET - Fetch Syarat Ketentuan content
export async function GET() {
  try {
    const contentModel = await getContentModel()
    const content = await contentModel.getSyaratKetentuanContent()
    
    if (!content) {
      // Return default content if none exists
      const defaultContent = {
        headerTitle: "Syarat & Ketentuan",
        headerSubtitle: "Ketentuan penggunaan layanan KurirQu",
        lastUpdated: "1 Januari 2025",
        sections: [
          {
            title: "1. Definisi Layanan",
            icon: "FileText",
            content: [
              "KurirQu adalah layanan pengiriman dan kurir yang melayani wilayah Blitar dan sekitarnya. Layanan kami meliputi:",
              "Pengiriman dokumen dan paket",
              "Layanan antar makanan dan minuman",
              "Belanja dan pengiriman barang",
              "Layanan kurir ekspres"
            ]
          },
          {
            title: "2. Tanggung Jawab Pengguna",
            icon: "Shield",
            content: [
              "Memberikan informasi yang akurat mengenai alamat pengiriman dan penerima",
              "Memastikan barang yang dikirim tidak melanggar hukum atau berbahaya",
              "Membayar biaya layanan sesuai dengan tarif yang telah disepakati",
              "Memberikan akses yang memadai untuk proses pengambilan dan pengiriman"
            ]
          },
          {
            title: "3. Barang yang Tidak Dapat Dikirim",
            icon: "AlertTriangle",
            content: [
              "KurirQu tidak menerima pengiriman untuk barang-barang berikut:",
              "Barang ilegal, narkoba, atau zat terlarang",
              "Senjata api, bahan peledak, atau bahan berbahaya",
              "Uang tunai dalam jumlah besar",
              "Barang mudah rusak tanpa kemasan yang memadai",
              "Hewan hidup"
            ]
          },
          {
            title: "4. Tarif dan Pembayaran",
            content: [
              "Tarif dihitung berdasarkan jarak, berat, dan jenis layanan",
              "Pembayaran dapat dilakukan secara tunai atau transfer",
              "Biaya tambahan dapat dikenakan untuk layanan di luar jam operasional",
              "Tarif dapat berubah sewaktu-waktu dengan pemberitahuan sebelumnya"
            ]
          },
          {
            title: "5. Tanggung Jawab KurirQu",
            content: [
              "Mengantarkan barang sesuai dengan alamat yang diberikan",
              "Menjaga keamanan barang selama proses pengiriman",
              "Memberikan konfirmasi pengiriman kepada pengirim",
              "Mengganti kerugian sesuai dengan ketentuan asuransi yang berlaku"
            ]
          },
          {
            title: "6. Pembatasan Tanggung Jawab",
            content: [
              "KurirQu tidak bertanggung jawab atas keterlambatan akibat force majeure",
              "Ganti rugi maksimal sebesar nilai barang atau Rp 500.000, mana yang lebih kecil",
              "Tidak bertanggung jawab atas kerusakan akibat kemasan yang tidak memadai",
              "Klaim kerugian harus dilaporkan maksimal 24 jam setelah pengiriman"
            ]
          },
          {
            title: "7. Perubahan Syarat & Ketentuan",
            content: [
              "KurirQu berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan melalui website atau media komunikasi resmi kami. Penggunaan layanan setelah perubahan dianggap sebagai persetujuan terhadap syarat dan ketentuan yang baru."
            ]
          }
        ],
        contactButtonText: "Hubungi KurirQu",
        contactButtonUrl: "https://wa.link/dvsne2"
      }
      return NextResponse.json(defaultContent)
    }
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching Syarat Ketentuan content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Syarat Ketentuan content' },
      { status: 500 }
    )
  }
}

// PUT - Update Syarat Ketentuan content
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const contentModel = await getContentModel()
    
    await contentModel.updateSyaratKetentuanContent(data)
    
    return NextResponse.json({ success: true, message: 'Syarat Ketentuan content updated successfully' })
  } catch (error) {
    console.error('Error updating Syarat Ketentuan content:', error)
    return NextResponse.json(
      { error: 'Failed to update Syarat Ketentuan content' },
      { status: 500 }
    )
  }
}
