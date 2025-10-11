import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getContentModel } from '@/lib/models'

// GET - Fetch Kebijakan Privasi content
export async function GET() {
  try {
    const contentModel = await getContentModel()
    const content = await contentModel.getKebijakanPrivasiContent()
    
    if (!content) {
      // Return default content if none exists
      const defaultContent = {
        headerTitle: "Kebijakan Privasi",
        headerSubtitle: "Komitmen kami dalam melindungi data pribadi Anda",
        sections: [
          {
            title: "1. Informasi yang Kami Kumpulkan",
            icon: "Database",
            content: [
              "Kami mengumpulkan informasi berikut untuk memberikan layanan terbaik:",
              "Informasi Pribadi: Nama, nomor telepon, alamat email",
              "Informasi Alamat: Alamat pengambilan dan pengiriman",
              "Informasi Transaksi: Detail pesanan, metode pembayaran",
              "Informasi Komunikasi: Riwayat chat WhatsApp untuk keperluan layanan"
            ]
          },
          {
            title: "2. Bagaimana Kami Menggunakan Informasi",
            icon: "Eye",
            content: [
              "Informasi yang dikumpulkan digunakan untuk:",
              "Memproses dan melaksanakan pesanan pengiriman",
              "Berkomunikasi dengan Anda mengenai status pesanan",
              "Memberikan layanan pelanggan yang optimal",
              "Meningkatkan kualitas layanan kami",
              "Mengirimkan informasi promosi (dengan persetujuan Anda)"
            ]
          },
          {
            title: "3. Keamanan Data",
            icon: "Lock",
            content: [
              "Kami menerapkan langkah-langkah keamanan untuk melindungi data Anda:",
              "Enkripsi data sensitif selama transmisi",
              "Akses terbatas hanya untuk karyawan yang berwenang",
              "Penyimpanan data di server yang aman",
              "Pemantauan keamanan secara berkala",
              "Backup data secara rutin untuk mencegah kehilangan"
            ]
          },
          {
            title: "4. Berbagi Informasi dengan Pihak Ketiga",
            icon: "UserCheck",
            content: [
              "Kami tidak menjual atau menyewakan data pribadi Anda. Informasi hanya dibagikan dalam kondisi berikut:",
              "Dengan persetujuan eksplisit dari Anda",
              "Untuk memenuhi kewajiban hukum",
              "Kepada mitra kurir untuk keperluan pengiriman",
              "Dalam situasi darurat untuk melindungi keselamatan"
            ]
          },
          {
            title: "5. Hak-Hak Anda",
            content: [
              "Sebagai pengguna layanan KurirQu, Anda memiliki hak untuk:",
              "Mengakses data pribadi yang kami simpan",
              "Meminta koreksi data yang tidak akurat",
              "Meminta penghapusan data pribadi Anda",
              "Menolak penggunaan data untuk tujuan pemasaran",
              "Meminta portabilitas data Anda"
            ]
          },
          {
            title: "6. Cookies dan Teknologi Pelacakan",
            content: [
              "Website kami menggunakan cookies untuk meningkatkan pengalaman pengguna. Cookies membantu kami memahami preferensi Anda dan memberikan layanan yang lebih personal. Anda dapat mengatur browser untuk menolak cookies, namun hal ini mungkin mempengaruhi fungsionalitas website."
            ]
          },
          {
            title: "7. Penyimpanan Data",
            content: [
              "Data pribadi Anda akan disimpan selama diperlukan untuk memberikan layanan atau sesuai dengan ketentuan hukum yang berlaku. Data transaksi akan disimpan minimal 5 tahun untuk keperluan audit dan perpajakan."
            ]
          },
          {
            title: "8. Perubahan Kebijakan Privasi",
            content: [
              "Kebijakan privasi ini dapat diperbarui sewaktu-waktu untuk mencerminkan perubahan dalam praktik kami atau peraturan yang berlaku. Perubahan signifikan akan diberitahukan melalui email atau pemberitahuan di website kami."
            ]
          },
          {
            title: "9. Hubungi Kami",
            content: [
              "Jika Anda memiliki pertanyaan atau kekhawatiran mengenai kebijakan privasi ini, atau ingin menggunakan hak-hak Anda terkait data pribadi, silakan hubungi kami:",
              "Email: privacy@kurirqu.com",
              "WhatsApp: +62 822-3641-8724",
              "Alamat: Jl. Griya Jati Permai, Sukorejo, Kec. Sukorejo, Kota Blitar, Jawa Timur 66121"
            ]
          }
        ],
        contactButtonText: "Hubungi Kami",
        contactButtonUrl: "https://wa.link/dvsne2"
      }
      return NextResponse.json(defaultContent)
    }
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching Kebijakan Privasi content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Kebijakan Privasi content' },
      { status: 500 }
    )
  }
}

// PUT - Update Kebijakan Privasi content
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
    
    await contentModel.updateKebijakanPrivasiContent(data)
    
    return NextResponse.json({ success: true, message: 'Kebijakan Privasi content updated successfully' })
  } catch (error) {
    console.error('Error updating Kebijakan Privasi content:', error)
    return NextResponse.json(
      { error: 'Failed to update Kebijakan Privasi content' },
      { status: 500 }
    )
  }
}
