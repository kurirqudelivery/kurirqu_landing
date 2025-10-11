import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db('kurirqu_landing')
    
    const footerData = await db.collection('footer').findOne({})
    
    if (!footerData) {
      return NextResponse.json({
        companyName: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        socialLinks: {
          facebook: '',
          instagram: '',
          twitter: '',
          whatsapp: ''
        }
      })
    }
    
    return NextResponse.json({
      companyName: footerData.companyName || '',
      description: footerData.description || '',
      address: footerData.address || '',
      phone: footerData.phone || '',
      email: footerData.email || '',
      socialLinks: {
        facebook: footerData.socialLinks?.facebook || '',
        instagram: footerData.socialLinks?.instagram || '',
        twitter: footerData.socialLinks?.twitter || '',
        whatsapp: footerData.socialLinks?.whatsapp || ''
      }
    })
  } catch (error) {
    console.error('Error fetching footer content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { companyName, description, address, phone, email, socialLinks } = await request.json()
    
    const client = await clientPromise
    const db = client.db('kurirqu_landing')
    
    await db.collection('footer').updateOne(
      {},
      { 
        $set: { 
          companyName,
          description,
          address,
          phone,
          email,
          socialLinks,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    )
    
    return NextResponse.json({ message: 'Footer content updated successfully' })
  } catch (error) {
    console.error('Error updating footer content:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}
