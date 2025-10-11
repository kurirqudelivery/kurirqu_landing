import { NextResponse } from 'next/server'
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
    const stats = await model.getPartnerApplicationsStats()

    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Error fetching partner stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch partner stats' },
      { status: 500 }
    )
  }
}
