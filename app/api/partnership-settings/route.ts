import { NextResponse } from 'next/server'
import { getContentModel } from '@/lib/models'

export async function GET() {
  try {
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
