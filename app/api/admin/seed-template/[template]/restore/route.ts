import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDatabase } from '@/lib/mongodb'

// Template data definitions (same as seed)
const templates: Record<string, any> = {
  hero: {
    title: "KurirQu - Solusi Pengiriman Terpercaya",
    subtitle: "Pengiriman paket cepat, aman, dan terjangkau untuk kebutuhan bisnis dan personal Anda",
    ctaText: "Mulai Kirim Sekarang",
    ctaLink: "/jadilah-mitra",
    backgroundImage: "/delivery-courier.png",
    isActive: true
  },
  services: [
    {
      title: "Pengiriman Reguler",
      description: "Layanan pengiriman standar dengan estimasi 1-3 hari untuk pengiriman dalam kota",
      icon: "📦",
      features: ["Estimasi 1-3 hari", "Asuransi tersedia", "Tracking real-time", "Gratis pickup minimal 5 paket"]
    },
    {
      title: "Pengiriman Express",
      description: "Layanan pengiriman kilat dengan estimasi same day delivery untuk kebutuhan mendesak",
      icon: "🚀",
      features: ["Same day delivery", "Prioritas pengiriman", "Asuransi penuh", "Dedicated courier"]
    },
    {
      title: "Pengiriman Dokumen",
      description: "Layanan khusus untuk pengiriman dokumen penting dengan keamanan terjamin",
      icon: "📄",
      features: ["Keamanan terjamin", "Packaging khusus", "Signature required", "Insurance included"]
    },
    {
      title: "Pengiriman Barang Berharga",
      description: "Layanan premium untuk pengiriman barang berharga dengan proteksi maksimal",
      icon: "💎",
      features: ["Proteksi maksimal", "Asuransi penuh", "Armada khusus", "Tim pengamanan"]
    }
  ],
  testimonials: [
    {
      name: "Budi Santoso",
      role: "Owner Toko Online",
      company: "Fashion Store",
      content: "KurirQu telah membantu bisnis saya berkembang pesat. Pengiriman selalu tepat waktu dan customer service sangat responsif. Sangat direkomendasikan!",
      rating: 5,
      avatar: "/placeholder-user.jpg",
      isActive: true
    },
    {
      name: "Siti Nurhaliza",
      role: "Manager Operasional",
      company: "Tech Indonesia",
      content: "Kami menggunakan KurirQu untuk pengiriman produk ke seluruh Indonesia. Layanan yang konsisten dan dapat diandalkan membuat operasional kami lebih efisien.",
      rating: 5,
      avatar: "/placeholder-user.jpg",
      isActive: true
    },
    {
      name: "Ahmad Wijaya",
      role: "Entrepreneur",
      company: "Kuliner Nusantara",
      content: "Sebagai pelaku UMKM, KurirQu memberikan solusi pengiriman yang terjangkau namun tetap berkualitas. Omset saya meningkat 40% sejak menggunakan layanan ini.",
      rating: 5,
      avatar: "/placeholder-user.jpg",
      isActive: true
    }
  ],
  gallery: [
    {
      title: "Tim KurirQu Siap Mengantarkan",
      description: "Tim profesional kami siap melayani kebutuhan pengiriman Anda",
      image: "/delivery-team-preparing.png",
      category: "team",
      isActive: true
    },
    {
      title: "Pengiriman Paket Aman",
      description: "Setiap paket ditangani dengan hati-hati dan keamanan terjamin",
      image: "/delivery-person-packages.png",
      category: "delivery",
      isActive: true
    },
    {
      title: "Kurir Profesional",
      description: "Kurir kami terlatih untuk memberikan layanan terbaik",
      image: "/motorcycle-courier-street.png",
      category: "courier",
      isActive: true
    },
    {
      title: "Pelanggan Puas",
      description: "Kepuasan pelanggan adalah prioritas utama kami",
      image: "/happy-customer-delivery.png",
      category: "customer",
      isActive: true
    },
    {
      title: "Antar Paket Makanan",
      description: "Layanan khusus pengiriman makanan dengan keamanan terjamin",
      image: "/food-delivery-motorcycle.png",
      category: "food",
      isActive: true
    },
    {
      title: "Persiapan Pengiriman",
      description: "Proses packing yang rapi dan aman untuk setiap paket",
      image: "/kurir-siapkan-pesanan.png",
      category: "preparation",
      isActive: true
    }
  ],
  stats: [
    {
      label: "Pengiriman Sukses",
      value: "50,000+",
      description: "Paket telah kami antarkan dengan selamat"
    },
    {
      label: "Mitra Aktif",
      value: "1,000+",
      description: "Mitra yang bergabung dalam ekosistem KurirQu"
    },
    {
      label: "Kota Terlayani",
      value: "100+",
      description: "Kota dan kabupaten di seluruh Indonesia"
    },
    {
      label: "Kepuasan Pelanggan",
      value: "98%",
      description: "Tingkat kepuasan pelanggan kami"
    }
  ],
  'why-choose': [
    {
      title: "Cepat dan Tepat Waktu",
      description: "Layanan pengiriman dengan estimasi waktu yang akurat dan selalu on-time",
      icon: "⏰"
    },
    {
      title: "Harga Terjangkau",
      description: "Tarif pengiriman kompetitif dengan kualitas layanan terbaik",
      icon: "💰"
    },
    {
      title: "Aman dan Terpercaya",
      description: "Setiap paket diasuransikan dan ditangani oleh tim profesional",
      icon: "🔒"
    },
    {
      title: "Tracking Real-time",
      description: "Monitor paket Anda secara real-time dari pickup hingga delivery",
      icon: "📍"
    },
    {
      title: "Layanan 24/7",
      description: "Customer service siap membantu Anda kapan saja dibutuhkan",
      icon: "🕐"
    },
    {
      title: "Jangkauan Luas",
      description: "Melayani pengiriman ke seluruh Indonesia dengan jaringan yang luas",
      icon: "🗺️"
    }
  ],
  cta: {
    title: "Siap Memulai Pengiriman dengan KurirQu?",
    subtitle: "Bergabunglah dengan ribuan pelanggan puas yang telah mempercayakan pengiriman mereka kepada kami",
    buttonText: "Mulai Sekarang",
    buttonLink: "/jadilah-mitra",
    secondaryButtonText: "Hubungi Kami",
    secondaryButtonLink: "#contact",
    backgroundImage: "/customer-ordering-delivery.png",
    isActive: true
  },
  footer: {
    company: {
      name: "KurirQu",
      description: "Solusi pengiriman terpercaya untuk kebutuhan bisnis dan personal Anda. Cepat, aman, dan terjangkau.",
      address: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110",
      phone: "+62 21 1234 5678",
      email: "info@kurirqu.com"
    },
    quickLinks: [
      { name: "Tentang Kami", href: "/tentang-kami" },
      { name: "Layanan", href: "#services" },
      { name: "Mitra", href: "/jadilah-mitra" },
      { name: "Kontak", href: "#contact" }
    ],
    legalLinks: [
      { name: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
      { name: "Kebijakan Privasi", href: "/kebijakan-privasi" }
    ],
    socialLinks: [
      { name: "Facebook", href: "#", icon: "facebook" },
      { name: "Instagram", href: "#", icon: "instagram" },
      { name: "Twitter", href: "#", icon: "twitter" },
      { name: "LinkedIn", href: "#", icon: "linkedin" }
    ],
    copyright: "© 2024 KurirQu. All rights reserved."
  },
  'tentang-kami': {
    title: "Tentang KurirQu",
    content: `
KurirQu adalah perusahaan jasa pengiriman yang berkomitmen untuk menyediakan solusi logistik terbaik untuk kebutuhan bisnis dan personal di Indonesia. Didirikan pada tahun 2020, kami telah tumbuh menjadi salah satu penyedia layanan pengiriman terpercaya di Indonesia.

## Visi Kami
Menjadi penyedia jasa pengiriman terdepan di Indonesia yang mengutamakan kepuasan pelanggan dan inovasi teknologi.

## Misi Kami
- Memberikan layanan pengiriman yang cepat, aman, dan terjangkau
- Menggunakan teknologi modern untuk meningkatkan efisiensi
- Membangun jaringan yang luas di seluruh Indonesia
- Memberdayakan mitra pengiriman lokal
- Menjadi mitra bisnis yang dapat diandalkan

## Nilai-Nilai Kami
- **Integritas**: Selalu jujur dan transparan dalam setiap transaksi
- **Profesionalisme**: Memberikan layanan terbaik dengan standar tinggi
- **Inovasi**: Terus berinovasi untuk meningkatkan kualitas layanan
- **Kepercayaan**: Membangun kepercayaan dengan konsistensi dan reliabilitas

## Tim Kami
KurirQu didukung oleh tim profesional yang berpengalaman di industri logistik dan teknologi. Kami percaya bahwa tim yang solid adalah kunci untuk memberikan layanan terbaik kepada pelanggan.

## Teknologi
Kami menggunakan teknologi terkini untuk memastikan setiap pengiriman berjalan dengan lancar. Dari sistem tracking real-time hingga manajemen armada yang efisien, teknologi adalah inti dari operasional kami.
    `,
    image: "/indonesian-professional-woman-smiling.png",
    stats: [
      { label: "Tahun Pengalaman", value: "4+" },
      { label: "Tim Profesional", value: "100+" },
      { label: "Pengiriman per Bulan", value: "10,000+" },
      { label: "Tingkat Kepuasan", value: "98%" }
    ]
  },
  'syarat-ketentuan': {
    title: "Syarat & Ketentuan",
    content: `
# Syarat & Ketentuan Layanan KurirQu

## 1. Penggunaan Layanan
Dengan menggunakan layanan KurirQu, Anda setuju untuk mematuhi semua syarat dan ketentuan yang berlaku.

## 2. Pendaftaran Akun
- Pengguna harus berusia minimal 18 tahun
- Data yang diberikan harus valid dan akurat
- Pengguna bertanggung jawab atas keamanan akun

## 3. Layanan Pengiriman
- Jenis layanan yang tersedia: Reguler, Express, Dokumen, Barang Berharga
- Estimasi waktu pengiriman dapat berubah tergantung kondisi
- Berat maksimal per paket: 30kg untuk layanan reguler

## 4. Barang yang Dilarang
- Barang ilegal sesuai hukum Indonesia
- Senjata api dan amunisi
- Narkotika dan obat terlarang
- Bahan peledak dan berbahaya
- Hewan hidup
- Barang mudah rusak tanpa packaging yang tepat

## 5. Tarif dan Pembayaran
- Tarif berdasarkan berat, jarak, dan jenis layanan
- Pembayaran dapat dilakukan secara tunai atau transfer
- Tarif dapat berubah sewaktu-waktu dengan pemberitahuan terlebih dahulu

## 6. Asuransi
- Asuransi tersedia untuk barang berharga
- Klaim asuransi harus diajukan maksimal 3x24 jam
- Dokumen yang diperlukan untuk klaim: bukti pengiriman, foto barang, dan surat keterangan kerusakan

## 7. Pembatalan dan Pengembalian
- Pembatalan dapat dilakukan sebelum proses pickup
- Biaya pembatalan: 50% dari tarif normal
- Pengembalian dana proses 3-5 hari kerja

## 8. Keterlambatan dan Kerugian
- KurirQu tidak bertanggung jawab atas keterlambatan yang disebabkan oleh force majeure
- Ganti rugi maksimal sebesar 10x biaya pengiriman
- Klaim kerugian harus diajukan maksimal 7 hari setelah pengiriman

## 9. Privasi Data
- Data pengguna akan dilindungi sesuai kebijakan privasi
- KurirQu tidak akan menjual atau memberikan data pihak ketiga tanpa persetujuan

## 10. Sengketa
- Sengketa akan diselesaikan secara musyawarah
- Jika tidak ada kesepakatan, akan diselesaikan melalui pengadilan Jakarta

## 11. Perubahan Syarat dan Ketentuan
KurirQu berhak mengubah syarat dan ketentuan sewaktu-waktu dengan pemberitahuan melalui website atau email.

## 12. Kontak
Untuk pertanyaan lebih lanjut, hubungi:
Email: info@kurirqu.com
Phone: +62 21 1234 5678
    `,
    lastUpdated: new Date().toISOString()
  },
  'kebijakan-privasi': {
    title: "Kebijakan Privasi",
    content: `
# Kebijakan Privasi KurirQu

## 1. Pengumpulan Data
Kami mengumpulkan data pribadi yang Anda berikan saat:
- Mendaftar akun
- Menggunakan layanan pengiriman
- Menghubungi customer service
- Mengisi formulir di website

## 2. Jenis Data yang Dikumpulkan
- Data pribadi: nama, email, nomor telepon, alamat
- Data pengiriman: alamat pengirim dan penerima, detail paket
- Data transaksi: riwayat pembayaran, metode pembayaran
- Data penggunaan: log aktivitas, preferensi layanan

## 3. Penggunaan Data
Data Anda digunakan untuk:
- Memproses transaksi pengiriman
- Memberikan layanan pelanggan
- Memperbaiki kualitas layanan
- Mengirim informasi promosi (dengan persetujuan)
- Melakukan analisis bisnis

## 4. Perlindungan Data
- Data dienkripsi dengan teknologi SSL
- Akses data terbatas untuk authorized personnel
- Server terlindungi dengan firewall dan security system
- Backup data rutin untuk mencegah kehilangan

## 5. Berbagi Data Pihak Ketiga
Kami tidak menjual atau menyewakan data pribadi Anda. Data hanya dibagikan dengan:
- Mitra pengiriman untuk proses delivery
- Payment gateway untuk proses pembayaran
- Otoritas hukum jika diminta secara resmi

## 6. Cookies
Website kami menggunakan cookies untuk:
- Mengingat preferensi pengguna
- Menganalisis traffic website
- Mempersonalisasi pengalaman pengguna
- Anda dapat menonaktifkan cookies melalui browser settings

## 7. Hak Data Pribadi
Anda memiliki hak untuk:
- Mengakses data pribadi Anda
- Memperbaiki data yang tidak akurat
- Menghapus data pribadi (kecuali untuk keperluan legal)
- Menolak pengiriman marketing materials

## 8. Retensi Data
Data pribadi akan disimpan selama:
- Akun aktif: selama diperlukan untuk layanan
- Setelah akun ditutup: 2 tahun untuk keperluan legal
- Data transaksi: 7 tahun sesuai ketentuan pajak

## 9. Keamanan Anak
Layanan kami tidak ditujukan untuk anak di bawah 18 tahun. Kami tidak sengaja mengumpulkan data anak di bawah umur.

## 10. Perubahan Kebijakan
Kebijakan privasi dapat diperbarui sewaktu-waktu. Perubahan akan diinformasikan melalui website atau email.

## 11. Kontak Privasi
Untuk pertanyaan seputar privasi data, hubungi:
Email: privacy@kurirqu.com
Phone: +62 21 1234 5678
    `,
    lastUpdated: new Date().toISOString()
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ template: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { template } = await params
    const templateData = templates[template]

    if (!templateData) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    const db = await getDatabase()

    // Check if data exists, if not create it
    switch (template) {
      case 'hero':
        const existingHero = await db.collection('heroes').findOne({})
        if (!existingHero) {
          await db.collection('heroes').insertOne({
            ...templateData,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        } else {
          await db.collection('heroes').updateOne(
            { _id: existingHero._id },
            { 
              $set: {
                ...templateData,
                updatedAt: new Date()
              }
            }
          )
        }
        break

      case 'services':
        const existingServices = await db.collection('services').find({}).toArray()
        if (existingServices.length === 0) {
          await db.collection('services').insertMany(
            templateData.map((service: any, index: number) => ({
              ...service,
              order: index,
              createdAt: new Date(),
              updatedAt: new Date()
            }))
          )
        } else {
          await db.collection('services').deleteMany({})
          await db.collection('services').insertMany(
            templateData.map((service: any, index: number) => ({
              ...service,
              order: index,
              createdAt: new Date(),
              updatedAt: new Date()
            }))
          )
        }
        break

      case 'testimonials':
        const existingTestimonials = await db.collection('testimonials').find({}).toArray()
        if (existingTestimonials.length === 0) {
          await db.collection('testimonials').insertMany(
            templateData.map((testimonial: any, index: number) => ({
              ...testimonial,
              order: index,
              createdAt: new Date(),
              updatedAt: new Date()
            }))
          )
        } else {
          await db.collection('testimonials').deleteMany({})
          await db.collection('testimonials').insertMany(
            templateData.map((testimonial: any, index: number) => ({
              ...testimonial,
              order: index,
              createdAt: new Date(),
              updatedAt: new Date()
            }))
          )
        }
        break

      case 'gallery':
        const existingGallery = await db.collection('gallery').find({}).toArray()
        if (existingGallery.length === 0) {
          await db.collection('gallery').insertMany(
            templateData.map((item: any, index: number) => ({
              ...item,
              order: index,
              createdAt: new Date(),
              updatedAt: new Date()
            }))
          )
        } else {
          await db.collection('gallery').deleteMany({})
          await db.collection('gallery').insertMany(
            templateData.map((item: any, index: number) => ({
              ...item,
              order: index,
              createdAt: new Date(),
              updatedAt: new Date()
            }))
          )
        }
        break

      case 'stats':
        const existingStats = await db.collection('stats').find({}).toArray()
        if (existingStats.length === 0) {
          await db.collection('stats').insertMany(
            templateData.map((stat: any, index: number) => ({
              ...stat,
              order: index,
              createdAt: new Date(),
              updatedAt: new Date()
            }))
          )
        } else {
          await db.collection('stats').deleteMany({})
          await db.collection('stats').insertMany(
            templateData.map((stat: any, index: number) => ({
              ...stat,
              order: index,
              createdAt: new Date(),
              updatedAt: new Date()
            }))
          )
        }
        break

      case 'why-choose':
        const existingWhyChoose = await db.collection('whychoose').find({}).toArray()
        if (existingWhyChoose.length === 0) {
          await db.collection('whychoose').insertMany(
            templateData.map((item: any, index: number) => ({
              ...item,
              order: index,
              createdAt: new Date(),
              updatedAt: new Date()
            }))
          )
        } else {
          await db.collection('whychoose').deleteMany({})
          await db.collection('whychoose').insertMany(
            templateData.map((item: any, index: number) => ({
              ...item,
              order: index,
              createdAt: new Date(),
              updatedAt: new Date()
            }))
          )
        }
        break

      case 'cta':
        const existingCta = await db.collection('ctas').findOne({})
        if (!existingCta) {
          await db.collection('ctas').insertOne({
            ...templateData,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        } else {
          await db.collection('ctas').updateOne(
            { _id: existingCta._id },
            { 
              $set: {
                ...templateData,
                updatedAt: new Date()
              }
            }
          )
        }
        break

      case 'footer':
        const existingFooter = await db.collection('footers').findOne({})
        if (!existingFooter) {
          await db.collection('footers').insertOne({
            ...templateData,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        } else {
          await db.collection('footers').updateOne(
            { _id: existingFooter._id },
            { 
              $set: {
                ...templateData,
                updatedAt: new Date()
              }
            }
          )
        }
        break

      case 'tentang-kami':
        const existingTentangKami = await db.collection('tentangkami').findOne({})
        if (!existingTentangKami) {
          await db.collection('tentangkami').insertOne({
            ...templateData,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        } else {
          await db.collection('tentangkami').updateOne(
            { _id: existingTentangKami._id },
            { 
              $set: {
                ...templateData,
                updatedAt: new Date()
              }
            }
          )
        }
        break

      case 'syarat-ketentuan':
        const existingSyaratKetentuan = await db.collection('syaratketentuan').findOne({})
        if (!existingSyaratKetentuan) {
          await db.collection('syaratketentuan').insertOne({
            ...templateData,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        } else {
          await db.collection('syaratketentuan').updateOne(
            { _id: existingSyaratKetentuan._id },
            { 
              $set: {
                ...templateData,
                updatedAt: new Date()
              }
            }
          )
        }
        break

      case 'kebijakan-privasi':
        const existingKebijakanPrivasi = await db.collection('kebijakanprivasi').findOne({})
        if (!existingKebijakanPrivasi) {
          await db.collection('kebijakanprivasi').insertOne({
            ...templateData,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        } else {
          await db.collection('kebijakanprivasi').updateOne(
            { _id: existingKebijakanPrivasi._id },
            { 
              $set: {
                ...templateData,
                updatedAt: new Date()
              }
            }
          )
        }
        break

      default:
        return NextResponse.json({ error: 'Invalid template type' }, { status: 400 })
    }

    return NextResponse.json({ 
      message: `Template ${template} berhasil di-restore!`,
      template: template
    })

  } catch (error) {
    console.error('Restore template error:', error)
    return NextResponse.json({ 
      error: 'Gagal melakukan restore template' 
    }, { status: 500 })
  }
}
