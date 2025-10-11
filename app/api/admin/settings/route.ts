import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import clientPromise from '@/lib/mongodb'

interface SiteSettings {
  siteName: string
  siteTitle: string
  siteDescription: string
  siteUrl: string
  faviconUrl: string
  logoUrl: string
  address: string
  phone: string
  email: string
  whatsapp: string
  socialLinks: {
    facebook: string
    instagram: string
    twitter: string
    youtube: string
    linkedin: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string
    ogImage: string
  }
  contact: {
    email: string
    phone: string
    whatsapp: string
    address: string
    workingHours: string
  }
  business: {
    companyName: string
    registrationNumber: string
    taxId: string
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await request.json()
    console.log('Received settings data:', JSON.stringify(settings, null, 2))
    
    // Remove MongoDB-specific fields that shouldn't be updated
    const { _id, createdAt, updatedAt, ...updateData } = settings
    
    // Validate required fields structure
    const requiredFields = {
      siteName: 'string',
      siteTitle: 'string',
      siteDescription: 'string',
      siteUrl: 'string',
      faviconUrl: 'string',
      logoUrl: 'string',
      address: 'string',
      phone: 'string',
      email: 'string',
      whatsapp: 'string',
      socialLinks: 'object',
      seo: 'object',
      contact: 'object',
      business: 'object'
    }

    for (const [field, expectedType] of Object.entries(requiredFields)) {
      if (!(field in updateData)) {
        console.log(`Missing field: ${field}`)
        return NextResponse.json({ 
          error: `Missing required field: ${field}` 
        }, { status: 400 })
      }
      
      if (expectedType === 'object' && typeof updateData[field] !== 'object') {
        console.log(`Invalid type for ${field}: expected object, got ${typeof updateData[field]}`)
        return NextResponse.json({ 
          error: `Invalid type for ${field}: expected object` 
        }, { status: 400 })
      }
      
      if (expectedType === 'string' && typeof updateData[field] !== 'string') {
        console.log(`Invalid type for ${field}: expected string, got ${typeof updateData[field]}`)
        return NextResponse.json({ 
          error: `Invalid type for ${field}: expected string` 
        }, { status: 400 })
      }
    }
    
    const client = await clientPromise
    const db = client.db('kurirqu_landing')
    
    const result = await db.collection('settings').updateOne(
      {},
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    )
    
    console.log('Update result:', result)
    
    return NextResponse.json({ 
      message: 'Settings updated successfully',
      result: result
    })
  } catch (error) {
    console.error('Error updating settings:', error)
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json({ 
      error: 'Failed to update settings',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
