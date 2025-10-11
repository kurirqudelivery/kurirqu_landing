import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getContentModel } from '@/lib/models'
import { authOptions } from '@/lib/auth'

// GET all admin users
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const contentModel = await getContentModel()
    const users = await contentModel.getAllUsers()

    return NextResponse.json({
      success: true,
      users
    })

  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

// POST add new admin user
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { email } = await request.json()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email tidak valid' },
        { status: 400 }
      )
    }

    const contentModel = await getContentModel()

    // Check if user already exists
    const existingUser = await contentModel.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User sudah terdaftar' },
        { status: 409 }
      )
    }

    // Create new user
    const newUser = await contentModel.createOrUpdateUser(email)

    return NextResponse.json({
      success: true,
      message: 'Admin user berhasil ditambahkan',
      user: {
        email: newUser.email,
        isActive: newUser.isActive,
        createdAt: newUser.createdAt
      }
    })

  } catch (error) {
    console.error('Error adding user:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
