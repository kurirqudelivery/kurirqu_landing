import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('kurirqu_landing')
    
    const settingsData = await db.collection('settings').findOne({})
    
    if (!settingsData) {
      return NextResponse.json({
        siteName: 'KurirQu',
        siteTitle: 'KurirQu - Layanan Pengiriman Terpercaya',
        siteDescription: 'Layanan pengiriman terpercaya dan professional di Indonesia',
        siteUrl: 'https://kurirqu-landing.vercel.app',
        faviconUrl: '',
        logoUrl: '',
        address: '',
        phone: '',
        email: '',
        whatsapp: '',
        socialLinks: {
          facebook: '',
          instagram: '',
          twitter: '',
          youtube: '',
          linkedin: ''
        },
        seo: {
          metaTitle: 'KurirQu - Layanan Pengiriman Terpercaya',
          metaDescription: 'Layanan pengiriman terpercaya dan professional di Indonesia',
          keywords: 'pengiriman, kurir, delivery, logistics',
          ogImage: ''
        },
        contact: {
          email: '',
          phone: '',
          whatsapp: '',
          address: '',
          workingHours: 'Senin - Sabtu: 08:00 - 20:00'
        },
        business: {
          companyName: '',
          registrationNumber: '',
          taxId: ''
        }
      })
    }
    
    return NextResponse.json(settingsData)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}
