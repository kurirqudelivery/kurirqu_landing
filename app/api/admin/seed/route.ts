import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import clientPromise from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db('kurirqu_landing')

    // Clear existing data
    await db.collection('content').deleteMany({})
    await db.collection('hero').deleteMany({})
    await db.collection('whychoose').deleteMany({})
    await db.collection('settings').deleteMany({})

    // Hero Data
    await db.collection('hero').insertOne({
      title: "KurirQu - Layanan Pengiriman Terpercaya",
      subtitle: "Cepat, Aman, dan Terpercaya untuk Semua Kebutuhan Pengiriman Anda",
      description: "Solusi pengiriman terbaik untuk bisnis dan personal Anda. Dengan tim kurir profesional dan teknologi terkini, kami memastikan paket Anda sampai dengan aman dan tepat waktu.",
      buttonText: "Hubungi Kami",
      buttonUrl: "https://wa.link/dvsne2",
      imageUrl: "https://i.postimg.cc/Gpk5wtbR/kurirqudirect.png",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Services Data
    await db.collection('content').insertOne({
      type: 'services',
      services: [
        {
          id: '1',
          title: 'Transportasi',
          description: 'Layanan transportasi cepat dan aman untuk perjalanan Anda dalam kota',
          icon: 'Car'
        },
        {
          id: '2',
          title: 'Pesan Makanan',
          description: 'Pesan makanan favorit Anda dari berbagai restoran dengan pengiriman cepat',
          icon: 'UtensilsCrossed'
        },
        {
          id: '3',
          title: 'Kirim Barang / Delivery',
          description: 'Kirim barang Anda dengan aman dan tepat waktu ke seluruh kota',
          icon: 'Package'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // CTA Data
    await db.collection('content').insertOne({
      type: 'cta',
      title: 'Siap Untuk Memesan?',
      subtitle: 'Bergabunglah dengan ribuan pelanggan yang sudah merasakan kemudahan layanan KurirQu',
      buttonText: 'Hubungi KurirQu',
      buttonUrl: 'https://wa.link/dvsne2',
      description: 'Pesan sekarang dan nikmati pengiriman cepat, aman, dan terpercaya!',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Testimonials Data
    await db.collection('content').insertOne({
      type: 'testimonials',
      testimonials: [
        {
          id: '1',
          name: 'Budi Santoso',
          role: 'Pelanggan Setia',
          content: 'Pelayanan KurirQu sangat memuaskan! Kurir selalu tepat waktu dan ramah. Makanan yang dipesan selalu sampai dalam kondisi baik.',
          avatarUrl: '/indonesian-man-smiling.png',
          rating: 5
        },
        {
          id: '2',
          name: 'Sari Dewi',
          role: 'Pengusaha Online',
          content: 'Sudah beberapa kali menggunakan jasa KurirQu untuk kirim barang. Selalu aman dan cepat sampai tujuan. Highly recommended!',
          avatarUrl: '/indonesian-professional-woman-smiling.png',
          rating: 5
        },
        {
          id: '3',
          name: 'Ahmad Rahman',
          role: 'Mahasiswa',
          content: 'Aplikasi mudah digunakan, harga terjangkau, dan pelayanan excellent. KurirQu adalah pilihan terbaik untuk delivery di kota ini.',
          avatarUrl: '/young-indonesian-man-happy.png',
          rating: 5
        },
        {
          id: '4',
          name: 'Maya Putri',
          role: 'Professional',
          content: 'Sangat puas dengan layanan transportasi KurirQu. Driver profesional dan kendaraan bersih. Pasti akan menggunakan lagi.',
          avatarUrl: '/indonesian-woman-headshot.png',
          rating: 4
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Gallery Data
    await db.collection('content').insertOne({
      type: 'gallery',
      title: 'Galeri Layanan',
      subtitle: 'Lihat bagaimana kami melayani pelanggan dengan dedikasi tinggi',
      images: [
        {
          title: 'Pengiriman Makanan',
          description: 'Kurir mengantarkan makanan dengan cepat dan aman',
          imageUrl: '/food-delivery-motorcycle.png',
          order: 1
        },
        {
          title: 'Layanan Pengiriman',
          description: 'Kurir dengan paket siap dikirim',
          imageUrl: '/delivery-courier.png',
          order: 2
        },
        {
          title: 'Pelanggan Puas',
          description: 'Pelanggan menerima pesanan dengan senyum',
          imageUrl: '/pelanggan-terima-pesanan.png',
          order: 3
        },
        {
          title: 'Tim Profesional',
          description: 'Tim kurir menyiapkan pesanan',
          imageUrl: '/delivery-team-preparing.png',
          order: 4
        },
        {
          title: 'Kurir Siap',
          description: 'Kurir siap untuk pengiriman',
          imageUrl: '/kurir-siapkan-pesanan.png',
          order: 5
        },
        {
          title: 'Pemesanan Mudah',
          description: 'Pelanggan memesan via aplikasi',
          imageUrl: '/customer-ordering-service-app.png',
          order: 6
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Stats Data
    await db.collection('content').insertOne({
      type: 'stats',
      stats: [
        {
          id: '1',
          label: 'Layanan',
          value: '10',
          description: 'Berbagai layanan pengiriman'
        },
        {
          id: '2',
          label: 'Kurir',
          value: '20',
          description: 'Kurir profesional siap melayani'
        },
        {
          id: '3',
          label: 'Order Masuk',
          value: '1,463',
          description: 'Pesanan yang telah diproses'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Why Choose Data
    await db.collection('content').insertOne({
      type: 'why-choose',
      title: 'Kenapa Pilih KurirQu?',
      subtitle: 'Kemudahan pesan via WhatsApp tanpa ribet, langsung chat dan kirim!',
      items: [
        {
          title: 'Tanpa Install Aplikasi',
          description: 'Cukup gunakan WhatsApp yang sudah ada di HP Anda, tidak perlu download aplikasi tambahan',
          icon: 'message-circle',
          order: 1
        },
        {
          title: 'Komunikasi Real-Time',
          description: 'Update status pengiriman langsung via chat, foto bukti pengiriman, dan konfirmasi instan',
          icon: 'clock',
          order: 2
        },
        {
          title: 'Interface Familiar',
          description: 'Semua orang sudah terbiasa dengan WhatsApp, mudah digunakan untuk segala usia',
          icon: 'smartphone',
          order: 3
        },
        {
          title: 'Kontak Langsung Kurir',
          description: 'Bisa langsung chat atau telepon kurir untuk koordinasi lokasi dan waktu pengiriman',
          icon: 'users',
          order: 4
        },
        {
          title: 'Konfirmasi Mudah',
          description: 'Konfirmasi pesanan, alamat, dan pembayaran cukup dengan sekali chat di WhatsApp',
          icon: 'check-circle',
          order: 5
        },
        {
          title: 'Customer Service 24/7',
          description: 'Tim support siap membantu kapan saja melalui WhatsApp untuk keluhan atau pertanyaan',
          icon: 'headphones',
          order: 6
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Settings Data
    await db.collection('settings').insertOne({
      siteName: 'KurirQu',
      siteTitle: 'KurirQu - Layanan Pengiriman Terpercaya',
      siteDescription: 'Layanan pengiriman terpercaya dan professional di Indonesia',
      siteUrl: 'https://kurirqu-landing.vercel.app',
      faviconUrl: '',
      logoUrl: '',
      address: 'Indonesia',
      phone: '+62 812-3456-7890',
      email: 'info@kurirqu.com',
      whatsapp: 'https://wa.link/dvsne2',
      socialLinks: {
        facebook: 'https://facebook.com/kurirqu',
        instagram: 'https://instagram.com/kurirqu',
        twitter: 'https://twitter.com/kurirqu',
        youtube: 'https://youtube.com/@kurirqu',
        linkedin: 'https://linkedin.com/company/kurirqu'
      },
      seo: {
        metaTitle: 'KurirQu - Layanan Pengiriman Terpercaya di Indonesia',
        metaDescription: 'Layanan pengiriman terpercaya dan professional di Indonesia. Cepat, aman, dan terpercaya untuk transportasi, makanan, dan pengiriman barang.',
        keywords: 'pengiriman, kurir, delivery, logistics, transportasi, pesan makanan, kirim barang, Indonesia, kurirqu',
        ogImage: ''
      },
      contact: {
        email: 'info@kurirqu.com',
        phone: '+62 812-3456-7890',
        whatsapp: 'https://wa.link/dvsne2',
        address: 'Indonesia',
        workingHours: 'Senin - Sabtu: 08:00 - 20:00'
      },
      business: {
        companyName: 'PT. KurirQu Indonesia',
        registrationNumber: '',
        taxId: ''
      },
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return NextResponse.json({ 
      message: '✅ Dummy data berhasil diisi ke database!',
      data: {
        'Hero content': '✅',
        'Services': '3 items ✅',
        'CTA content': '✅',
        'Testimonials': '4 items ✅',
        'Gallery': '6 images ✅',
        'Statistics': '3 items ✅',
        'Why Choose Us': '6 items ✅',
        'Global Settings': '✅'
      }
    })

  } catch (error) {
    console.error('Error seeding dummy data:', error)
    return NextResponse.json({ error: 'Failed to seed dummy data' }, { status: 500 })
  }
}
