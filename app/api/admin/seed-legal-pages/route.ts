import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase()
    
    // Seed Tentang Kami data
    const tentangKamiData = {
      headerTitle: "Tentang KurirQu",
      headerSubtitle: "Solusi praktis untuk semua kebutuhan harian Anda, cukup lewat WhatsApp",
      storyTitle: "Cerita Kami",
      storyContent: [
        "Di tengah kesibukan, orang sering males ribet harus download aplikasi baru cuma buat pesan layanan. Dari situ lahirlah <strong class=\"text-[#6c1618]\">KurirQu</strong>: solusi praktis untuk semua kebutuhan harian Anda, cukup lewat WhatsApp.",
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

    // Seed Syarat & Ketentuan data
    const syaratKetentuanData = {
      headerTitle: "Syarat & Ketentuan",
      headerSubtitle: "Ketentuan penggunaan layanan KurirQu",
      lastUpdated: "1 Januari 2025",
      sections: [
        {
          title: "1. Definisi Layanan",
          icon: "FileText",
          content: [
            "KurirQu adalah layanan pengiriman dan kurir yang melayani wilayah Blitar dan sekitarnya. Layanan kami meliputi:",
            "<li>Pengiriman dokumen dan paket</li><li>Layanan antar makanan dan minuman</li><li>Belanja dan pengiriman barang</li><li>Layanan kurir ekspres</li>"
          ]
        },
        {
          title: "2. Tanggung Jawab Pengguna",
          icon: "Shield",
          content: [
            "<li>Memberikan informasi yang akurat mengenai alamat pengiriman dan penerima</li><li>Memastikan barang yang dikirim tidak melanggar hukum atau berbahaya</li><li>Membayar biaya layanan sesuai dengan tarif yang telah disepakati</li><li>Memberikan akses yang memadai untuk proses pengambilan dan pengiriman</li>"
          ]
        },
        {
          title: "3. Barang yang Tidak Dapat Dikirim",
          icon: "AlertTriangle",
          content: [
            "KurirQu tidak menerima pengiriman untuk barang-barang berikut:",
            "<li>Barang ilegal, narkoba, atau zat terlarang</li><li>Senjata api, bahan peledak, atau bahan berbahaya</li><li>Uang tunai dalam jumlah besar</li><li>Barang mudah rusak tanpa kemasan yang memadai</li><li>Hewan hidup</li>"
          ]
        },
        {
          title: "4. Tarif dan Pembayaran",
          content: [
            "<li>Tarif dihitung berdasarkan jarak, berat, dan jenis layanan</li><li>Pembayaran dapat dilakukan secara tunai atau transfer</li><li>Biaya tambahan dapat dikenakan untuk layanan di luar jam operasional</li><li>Tarif dapat berubah sewaktu-waktu dengan pemberitahuan sebelumnya</li>"
          ]
        },
        {
          title: "5. Tanggung Jawab KurirQu",
          content: [
            "<li>Mengantarkan barang sesuai dengan alamat yang diberikan</li><li>Menjaga keamanan barang selama proses pengiriman</li><li>Memberikan konfirmasi pengiriman kepada pengirim</li><li>Mengganti kerugian sesuai dengan ketentuan asuransi yang berlaku</li>"
          ]
        },
        {
          title: "6. Pembatasan Tanggung Jawab",
          content: [
            "<li>KurirQu tidak bertanggung jawab atas keterlambatan akibat force majeure</li><li>Ganti rugi maksimal sebesar nilai barang atau Rp 500.000, mana yang lebih kecil</li><li>Tidak bertanggung jawab atas kerusakan akibat kemasan yang tidak memadai</li><li>Klaim kerugian harus dilaporkan maksimal 24 jam setelah pengiriman</li>"
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

    // Seed Kebijakan Privasi data
    const kebijakanPrivasiData = {
      headerTitle: "Kebijakan Privasi",
      headerSubtitle: "Komitmen kami dalam melindungi data pribadi Anda",
      sections: [
        {
          title: "1. Informasi yang Kami Kumpulkan",
          icon: "Database",
          content: [
            "Kami mengumpulkan informasi berikut untuk memberikan layanan terbaik:",
            "<li><strong>Informasi Pribadi:</strong> Nama, nomor telepon, alamat email</li><li><strong>Informasi Alamat:</strong> Alamat pengambilan dan pengiriman</li><li><strong>Informasi Transaksi:</strong> Detail pesanan, metode pembayaran</li><li><strong>Informasi Komunikasi:</strong> Riwayat chat WhatsApp untuk keperluan layanan</li>"
          ]
        },
        {
          title: "2. Bagaimana Kami Menggunakan Informasi",
          icon: "Eye",
          content: [
            "Informasi yang dikumpulkan digunakan untuk:",
            "<li>Memproses dan melaksanakan pesanan pengiriman</li><li>Berkomunikasi dengan Anda mengenai status pesanan</li><li>Memberikan layanan pelanggan yang optimal</li><li>Meningkatkan kualitas layanan kami</li><li>Mengirimkan informasi promosi (dengan persetujuan Anda)</li>"
          ]
        },
        {
          title: "3. Keamanan Data",
          icon: "Lock",
          content: [
            "Kami menerapkan langkah-langkah keamanan untuk melindungi data Anda:",
            "<li>Enkripsi data sensitif selama transmisi</li><li>Akses terbatas hanya untuk karyawan yang berwenang</li><li>Penyimpanan data di server yang aman</li><li>Pemantauan keamanan secara berkala</li><li>Backup data secara rutin untuk mencegah kehilangan</li>"
          ]
        },
        {
          title: "4. Berbagi Informasi dengan Pihak Ketiga",
          icon: "UserCheck",
          content: [
            "Kami tidak menjual atau menyewakan data pribadi Anda. Informasi hanya dibagikan dalam kondisi berikut:",
            "<li>Dengan persetujuan eksplisit dari Anda</li><li>Untuk memenuhi kewajiban hukum</li><li>Kepada mitra kurir untuk keperluan pengiriman</li><li>Dalam situasi darurat untuk melindungi keselamatan</li>"
          ]
        },
        {
          title: "5. Hak-Hak Anda",
          content: [
            "Sebagai pengguna layanan KurirQu, Anda memiliki hak untuk:",
            "<li>Mengakses data pribadi yang kami simpan</li><li>Meminta koreksi data yang tidak akurat</li><li>Meminta penghapusan data pribadi Anda</li><li>Menolak penggunaan data untuk tujuan pemasaran</li><li>Meminta portabilitas data Anda</li>"
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
            '<div class="bg-gray-50 p-4 rounded-lg"><p><strong>Email:</strong> privacy@kurirqu.com</p><p><strong>WhatsApp:</strong> +62 822-3641-8724</p><p><strong>Alamat:</strong> Jl. Griya Jati Permai, Sukorejo, Kec. Sukorejo, Kota Blitar, Jawa Timur 66121</p></div>'
          ]
        }
      ],
      contactButtonText: "Hubungi Kami",
      contactButtonUrl: "https://wa.link/dvsne2"
    }

    // Insert or update data in database
    await db.collection('tentangkami').updateOne(
      { _id: 'tentangkami' },
      { $set: { _id: 'tentangkami', ...tentangKamiData } },
      { upsert: true }
    )

    await db.collection('syaratketentuan').updateOne(
      { _id: 'syaratketentuan' },
      { $set: { _id: 'syaratketentuan', ...syaratKetentuanData } },
      { upsert: true }
    )

    await db.collection('kebijakanprivasi').updateOne(
      { _id: 'kebijakanprivasi' },
      { $set: { _id: 'kebijakanprivasi', ...kebijakanPrivasiData } },
      { upsert: true }
    )

    return NextResponse.json({
      success: true,
      message: '✅ Legal pages data seeded successfully!',
      details: [
        '📄 Tentang Kami data inserted',
        '📋 Syarat & Ketentuan data inserted',
        '🔒 Kebijakan Privasi data inserted'
      ]
    })

  } catch (error) {
    console.error('❌ Error seeding legal pages:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: '❌ Error seeding legal pages',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
