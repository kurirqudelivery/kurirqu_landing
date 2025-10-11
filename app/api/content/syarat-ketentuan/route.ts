import { NextRequest, NextResponse } from 'next/server'
import { getContentModel } from '@/lib/models'

export async function GET() {
  try {
    const contentModel = await getContentModel()
    const content = await contentModel.getSyaratKetentuanContent()
    
    if (!content) {
      // Return default content if none exists
      const defaultContent = {
        title: "Syarat & Ketentuan",
        lastUpdated: "2024-01-01",
        sections: [
          {
            title: "1. Penggunaan Layanan",
            content: [
              "Layanan KurirQu tersedia untuk pengguna yang berusia minimal 18 tahun atau memiliki persetujuan dari orang tua/wali.",
              "Pengguna bertanggung jawab atas keakuratan informasi yang diberikan saat menggunakan layanan.",
              "Layanan hanya tersedia untuk area jangkauan yang telah ditentukan."
            ]
          },
          {
            title: "2. Pembayaran",
            content: [
              "Pembayaran dapat dilakukan melalui metode yang tersedia di aplikasi.",
              "Harga layanan dapat berubah sewaktu-waktu sesuai dengan kebijakan perusahaan.",
              "Pembayaran harus dilakukan sebelum atau saat layanan digunakan."
            ]
          },
          {
            title: "3. Pembatalan",
            content: [
              "Pembatalan dapat dilakukan maksimal 30 menit sebelum layanan dimulai.",
              "Biaya pembatalan mungkin berlaku sesuai dengan ketentuan yang berlaku.",
              "Pengembalian dana akan diproses sesuai dengan metode pembayaran yang digunakan."
            ]
          }
        ]
      }
      return NextResponse.json(defaultContent)
    }
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching Syarat & Ketentuan data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Syarat & Ketentuan data' },
      { status: 500 }
    )
  }
}
