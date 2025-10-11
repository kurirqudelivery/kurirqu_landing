import { config } from 'dotenv'
import clientPromise from '../lib/mongodb'

// Load environment variables
config({ path: '.env.local' })

async function seedDummyData() {
  const client = await clientPromise
  const db = client.db('kurirqu_landing')

  try {
    // Clear existing data
    await db.collection('content').deleteMany({})
    await db.collection('hero').deleteMany({})

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
      qrCodeUrl: 'https://i.postimg.cc/Gpk5wtbR/kurirqudirect.png',
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
      galleryImages: [
        {
          id: '1',
          title: 'Pengiriman Makanan',
          description: 'Kurir mengantarkan makanan cepat dan aman',
          imageUrl: '/food-delivery-motorcycle.png',
          category: 'Delivery'
        },
        {
          id: '2',
          title: 'Layanan Pengiriman',
          description: 'Layanan pengiriman barang terpercaya',
          imageUrl: '/delivery-courier.png',
          category: 'Service'
        },
        {
          id: '3',
          title: 'Pelanggan Puas',
          description: 'Kepuasan pelanggan adalah prioritas',
          imageUrl: '/pelanggan-terima-pesanan.png',
          category: 'Customer'
        },
        {
          id: '4',
          title: 'Navigasi Cepat',
          description: 'Navigasi cepat melalui lalu lintas',
          imageUrl: '/placeholder-ocufs.png',
          category: 'Navigation'
        },
        {
          id: '5',
          title: 'Tim Profesional',
          description: 'Tim kurir menyiapkan pesanan',
          imageUrl: '/kurir-siapkan-pesanan.png',
          category: 'Team'
        },
        {
          id: '6',
          title: 'Pemesanan Mudah',
          description: 'Pelanggan memesan via aplikasi',
          imageUrl: '/customer-ordering-service-app.png',
          category: 'Ordering'
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
      items: [
        {
          id: '1',
          title: 'Tanpa Install Aplikasi',
          description: 'Cukup gunakan WhatsApp yang sudah ada di HP Anda, tidak perlu download aplikasi tambahan',
          icon: 'MessageCircle'
        },
        {
          id: '2',
          title: 'Komunikasi Real-Time',
          description: 'Update status pengiriman langsung via chat, foto bukti pengiriman, dan konfirmasi instan',
          icon: 'Clock'
        },
        {
          id: '3',
          title: 'Interface Familiar',
          description: 'Semua orang sudah terbiasa dengan WhatsApp, mudah digunakan untuk segala usia',
          icon: 'Smartphone'
        },
        {
          id: '4',
          title: 'Kontak Langsung Kurir',
          description: 'Bisa langsung chat atau telepon kurir untuk koordinasi lokasi dan waktu pengiriman',
          icon: 'Users'
        },
        {
          id: '5',
          title: 'Konfirmasi Mudah',
          description: 'Konfirmasi pesanan, alamat, dan pembayaran cukup dengan sekali chat di WhatsApp',
          icon: 'CheckCircle'
        },
        {
          id: '6',
          title: 'Customer Service 24/7',
          description: 'Tim support siap membantu kapan saja melalui WhatsApp untuk keluhan atau pertanyaan',
          icon: 'Headphones'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    })

    console.log('✅ Dummy data berhasil diisi ke database!')
    console.log('📊 Data yang diisi:')
    console.log('  - Hero content')
    console.log('  - Services (3 items)')
    console.log('  - CTA content')
    console.log('  - Testimonials (4 items)')
    console.log('  - Gallery (6 images)')
    console.log('  - Statistics (3 items)')
    console.log('  - Why Choose Us (6 items)')

  } catch (error) {
    console.error('❌ Error mengisi dummy data:', error)
  } finally {
    await client.close()
  }
}

// Run the seed function
seedDummyData().catch(console.error)
