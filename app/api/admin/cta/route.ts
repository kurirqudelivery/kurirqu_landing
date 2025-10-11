import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getContentModel } from '@/lib/models'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const contentModel = await getContentModel()
    const ctaData = await contentModel.getCTAContent()
    
    return NextResponse.json(ctaData || {
      title: '',
      subtitle: '',
      buttonText: '',
      buttonUrl: '',
      description: '',
      qrCodeUrl: ''
    })
  } catch (error) {
    console.error('Error fetching CTA content:', error)
    return NextResponse.json({ error: 'Failed to fetch CTA content' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const ctaData = await request.json()
    
    const contentModel = await getContentModel()
    await contentModel.updateCTAContent(ctaData)
    
    return NextResponse.json({ message: 'CTA content updated successfully' })
  } catch (error) {
    console.error('Error updating CTA content:', error)
    return NextResponse.json({ error: 'Failed to update CTA content' }, { status: 500 })
  }
}
