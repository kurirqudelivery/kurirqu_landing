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
    
    const whyChooseData = await db.collection('content').findOne({ type: 'why-choose' })
    
    if (!whyChooseData) {
      return NextResponse.json({
        title: '',
        subtitle: '',
        items: []
      })
    }
    
    return NextResponse.json({
      title: whyChooseData.title || '',
      subtitle: whyChooseData.subtitle || '',
      items: whyChooseData.items || []
    })
  } catch (error) {
    console.error('Error fetching why choose items:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, subtitle, items } = await request.json()
    
    const client = await clientPromise
    const db = client.db('kurirqu_landing')
    
    await db.collection('content').updateOne(
      { type: 'why-choose' },
      { 
        $set: { 
          title,
          subtitle,
          items,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    )
    
    return NextResponse.json({ message: 'Content updated successfully' })
  } catch (error) {
    console.error('Error updating why choose items:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}
