import { NextRequest, NextResponse } from 'next/server'
import { getContentModel } from '@/lib/models'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const contentModel = await getContentModel()
    const heroContent = await contentModel.getHeroContent()
    
    return NextResponse.json(heroContent)
  } catch (error) {
    console.error('Error fetching hero content:', error)
    return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const contentModel = await getContentModel()
    await contentModel.updateHeroContent(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating hero content:', error)
    return NextResponse.json({ error: 'Failed to update hero content' }, { status: 500 })
  }
}
