import { NextResponse } from 'next/server'
import { getContentModel } from '@/lib/models'

export async function GET() {
  try {
    const contentModel = await getContentModel()
    
    const [hero, services, testimonials, gallery, stats, whyChoose, cta, footer, settings] = await Promise.all([
      contentModel.getHeroContent(),
      contentModel.getServicesContent(),
      contentModel.getTestimonialsContent(),
      contentModel.getGalleryContent(),
      contentModel.getStatsContent(),
      contentModel.getWhyChooseContent(),
      contentModel.getCTAContent(),
      contentModel.getFooterContent(),
      contentModel.getSettingsContent()
    ])

    return NextResponse.json({
      hero: hero || {
        title: 'Kirim Apapun Bisa Dengan KurirQu',
        subtitle: 'Kami siap melayani dengan sepenuh hati',
        logoUrl: 'https://kurirqu-landing.vercel.app/assets/img/logo/kurirqu-logo.png',
        whatsappUrl: 'https://wa.link/dvsne2',
        instructions: {
          step1: 'Hubungi via WhatsApp',
          step2: 'Sampaikan Detail Pesanan',
          step3: 'Pesanan Diproses'
        }
      },
      services: services || {
        title: 'Layanan Kami',
        subtitle: 'Solusi pengiriman terpercaya untuk kebutuhan Anda',
        services: []
      },
      testimonials: testimonials || {
        title: 'Testimoni Pelanggan',
        subtitle: 'Apa kata pelanggan kami tentang layanan kami',
        testimonials: []
      },
      gallery: gallery || {
        title: 'Galeri',
        subtitle: 'Dokumentasi layanan kami',
        images: []
      },
      stats: stats || {
        title: 'Statistik Kami',
        subtitle: 'Bukti komitmen kami dalam melayani Anda',
        stats: []
      },
      whyChoose: whyChoose || {
        title: 'Mengapa Memilih Kami',
        subtitle: 'Alasan mengapa KurirQu adalah pilihan terbaik',
        items: []
      },
      cta: cta || {
        title: 'Siap Mengirim Paket Anda?',
        subtitle: 'Hubungi kami sekarang untuk pengiriman terpercaya',
        buttonText: 'Hubungi Kami',
        buttonUrl: 'https://wa.link/dvsne2'
      },
      footer: footer || {
        companyName: 'KurirQu',
        description: 'Layanan pengiriman terpercaya dan professional di Indonesia',
        address: 'Jl. Contoh No. 123, Jakarta Selatan',
        phone: '+6282236418724',
        email: 'kurirqublitar@gmail.com',
        socialLinks: {}
      },
      settings: settings || {
        siteName: 'KurirQu',
        siteTitle: 'KurirQu - Layanan Pengiriman Terpercaya',
        siteDescription: 'Layanan pengiriman terpercaya dan professional di Indonesia',
        siteUrl: 'https://kurirqu-landing.vercel.app',
        faviconUrl: '',
        logoUrl: '',
        address: 'Indonesia',
        phone: '+6282236418724',
        email: 'kurirqublitar@gmail.com',
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
          email: 'kurirqublitar@gmail.com',
          phone: '+6282236418724',
          whatsapp: 'https://wa.link/dvsne2',
          address: 'Indonesia',
          workingHours: 'Senin - Sabtu: 08:00 - 20:00'
        },
        business: {
          companyName: 'PT. KurirQu Indonesia',
          registrationNumber: '',
          taxId: ''
        }
      }
    })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}
