import { NextRequest, NextResponse } from 'next/server'
import { getContentModel } from '@/lib/models'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as any
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || undefined

    const model = await getContentModel()
    const result = await model.getPartnerApplications({
      status,
      page,
      limit,
      search
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching partner applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch partner applications' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const model = await getContentModel()
    
    const application = await model.createPartnerApplication(data)

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error creating partner application:', error)
    return NextResponse.json(
      { error: 'Failed to create partner application' },
      { status: 500 }
    )
  }
}
