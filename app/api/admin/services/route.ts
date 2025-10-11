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
    
    const servicesData = await db.collection('content').findOne({ type: 'services' })
    
    return NextResponse.json(servicesData || { services: [], title: '', subtitle: '' })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { services, title, subtitle } = await request.json()
    
    const client = await clientPromise
    const db = client.db('kurirqu_landing')
    
    await db.collection('content').updateOne(
      { type: 'services' },
      { 
        $set: { 
          services,
          ...(title !== undefined && { title }),
          ...(subtitle !== undefined && { subtitle }),
          updatedAt: new Date()
        }
      },
      { upsert: true }
    )
    
    return NextResponse.json({ message: 'Services updated successfully' })
  } catch (error) {
    console.error('Error updating services:', error)
    return NextResponse.json({ error: 'Failed to update services' }, { status: 500 })
  }
}
