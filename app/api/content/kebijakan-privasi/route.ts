import { NextRequest, NextResponse } from 'next/server'
import { getContentModel } from '@/lib/models'

export async function GET() {
  try {
    const contentModel = await getContentModel()
    const content = await contentModel.getKebijakanPrivasiContent()
    
    if (!content) {
      // Return default content if none exists
      const defaultContent = {
        title: "Kebijakan Privasi",
        lastUpdated: "2024-01-01",
        sections: [
          {
            title: "1. Pengumpulan Data",
            content: [
              "Kami mengumpulkan informasi pribadi yang Anda berikan saat mendaftar menggunakan layanan kami.",
              "Informasi yang dikumpulkan meliputi nama, nomor telepon, alamat email, dan alamat pengiriman.",
              "Data lokasi dikumpulkan hanya saat Anda menggunakan layanan pengantaran."
            ]
          },
          {
            title: "2. Penggunaan Data",
            content: [
              "Data pribadi digunakan untuk menyediakan layanan yang Anda minta.",
              "Kami menggunakan data untuk meningkatkan kualitas layanan dan pengalaman pengguna.",
              "Data dapat digunakan untuk komunikasi terkait layanan dan promosi."
            ]
          },
          {
            title: "3. Perlindungan Data",
            content: [
              "Kami melindungi data pribadi Anda dengan teknologi keamanan yang sesuai.",
              "Akses ke data pribadi dibatasi untuk karyawan yang membutuhkukan untuk menyediakan layanan.",
              "Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga."
            ]
          }
        ]
      }
      return NextResponse.json(defaultContent)
    }
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching Kebijakan Privasi data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Kebijakan Privasi data' },
      { status: 500 }
    )
  }
}
