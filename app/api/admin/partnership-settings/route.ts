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

    const model = await getContentModel()
    const settings = await model.getPartnershipSettings()

    return NextResponse.json(settings || {
      showPartnershipMenu: false,
      partnershipButtonText: 'Jadilah Mitra Kami'
    })
  } catch (error) {
    console.error('Error fetching partnership settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch partnership settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const model = await getContentModel()
    
    await model.updatePartnershipSettings(data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating partnership settings:', error)
    return NextResponse.json(
      { error: 'Failed to update partnership settings' },
      { status: 500 }
    )
  }
}
