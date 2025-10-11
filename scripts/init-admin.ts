import { config } from 'dotenv'
import { getContentModel } from '../lib/models'

// Load environment variables
config({ path: '.env.local' })

async function initializeAdmin() {
  try {
    console.log('Initializing KurirQu admin system...')
    console.log('OTP-based authentication system ready!')

    console.log('Seeding initial content...')
    const contentModel = await getContentModel()

    // Seed hero content
    await contentModel.updateHeroContent({
      title: 'Kirim Apapun Bisa Dengan KurirQu',
      subtitle: 'Kami siap melayani dengan sepenuh hati',
      logoUrl: 'https://kurirqu-landing.vercel.app/assets/img/logo/kurirqu-logo.png',
      whatsappUrl: 'https://wa.link/dvsne2',
      instructions: {
        step1: 'Hubungi via WhatsApp',
        step2: 'Sampaikan Detail Pesanan',
        step3: 'Pesanan Diproses'
      }
    })

    // Seed services content
    await contentModel.updateServicesContent({
      title: 'Layanan Kami',
      subtitle: 'Solusi pengiriman terpercaya untuk kebutuhan Anda',
      services: [
        {
          title: 'Pengiriman Reguler',
          description: 'Pengiriman standar dengan harga terjangkau',
          icon: 'truck',
          order: 1
        },
        {
          title: 'Pengiriman Express',
          description: 'Pengiriman cepat untuk kebutuhan mendesak',
          icon: 'zap',
          order: 2
        },
        {
          title: 'Pengiriman Same Day',
          description: 'Pengiriman dalam hari yang sama',
          icon: 'clock',
          order: 3
        }
      ]
    })

    // Seed testimonials content
    await contentModel.updateTestimonialsContent({
      title: 'Testimoni Pelanggan',
      subtitle: 'Apa kata pelanggan kami tentang layanan kami',
      testimonials: [
        {
          name: 'Budi Santoso',
          role: 'Pemilik Toko Online',
          content: 'Layanan KurirQu sangat memuaskan, pengiriman cepat dan aman.',
          avatarUrl: '/placeholder-user.jpg',
          rating: 5,
          order: 1
        },
        {
          name: 'Siti Nurhaliza',
          role: 'Pelanggan Setia',
          content: 'Saya sangat puas dengan pelayanan KurirQu, recommended!',
          avatarUrl: '/placeholder-user.jpg',
          rating: 5,
          order: 2
        }
      ]
    })

    // Seed stats content
    await contentModel.updateStatsContent({
      title: 'Statistik Kami',
      subtitle: 'Bukti komitmen kami dalam melayani Anda',
      stats: [
        {
          label: 'Pengiriman Sukses',
          value: '10,000+',
          description: 'Paket berhasil dikirim',
          order: 1
        },
        {
          label: 'Pelanggan Puas',
          value: '5,000+',
          description: 'Pelanggan setia',
          order: 2
        },
        {
          label: 'Kota Terlayani',
          value: '50+',
          description: 'Kota di seluruh Indonesia',
          order: 3
        },
        {
          label: 'Pengalaman',
          value: '5+',
          description: 'Tahun berpengalaman',
          order: 4
        }
      ]
    })

    // Seed CTA content
    await contentModel.updateCTAContent({
      title: 'Siap Mengirim Paket Anda?',
      subtitle: 'Hubungi kami sekarang untuk pengiriman terpercaya',
      buttonText: 'Hubungi Kami',
      buttonUrl: 'https://wa.link/dvsne2'
    })

    // Seed footer content
    await contentModel.updateFooterContent({
      companyName: 'KurirQu',
      description: 'Layanan pengiriman terpercaya dan professional di Indonesia',
      address: 'Jl. Contoh No. 123, Jakarta Selatan',
      phone: '+62 812-3456-7890',
      email: 'info@kurirqu.com',
      socialLinks: {
        facebook: 'https://facebook.com/kurirqu',
        instagram: 'https://instagram.com/kurirqu',
        whatsapp: 'https://wa.link/dvsne2'
      }
    })

    console.log('Initial content seeded successfully!')
  } catch (error) {
    console.error('Error during initialization:', error)
  }
}

initializeAdmin()
