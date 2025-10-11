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
    
    const testimonialsData = await db.collection('content').findOne({ type: 'testimonials' })
    
    return NextResponse.json(testimonialsData || { testimonials: [], title: '', subtitle: '' })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { testimonials, title, subtitle } = await request.json()
    
    const client = await clientPromise
    const db = client.db('kurirqu_landing')
    
    const updateData: any = {
      testimonials,
      updatedAt: new Date()
    }
    
    if (title !== undefined) updateData.title = title
    if (subtitle !== undefined) updateData.subtitle = subtitle
    
    await db.collection('content').updateOne(
      { type: 'testimonials' },
      { 
        $set: updateData
      },
      { upsert: true }
    )
    
    return NextResponse.json({ message: 'Testimonials updated successfully' })
  } catch (error) {
    console.error('Error updating testimonials:', error)
    return NextResponse.json({ error: 'Failed to update testimonials' }, { status: 500 })
  }
}
