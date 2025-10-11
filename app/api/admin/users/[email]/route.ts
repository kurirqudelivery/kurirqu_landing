import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getContentModel } from '@/lib/models'
import { authOptions } from '@/lib/auth'

// DELETE admin user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { email } = params
    const masterAdminEmail = process.env.MASTER_ADMIN_EMAIL

    // Prevent deleting master admin
    if (email === masterAdminEmail) {
      return NextResponse.json(
        { error: 'Tidak dapat menghapus master admin' },
        { status: 403 }
      )
    }

    // Prevent self-deletion
    if (session.user?.email === email) {
      return NextResponse.json(
        { error: 'Tidak dapat menghapus akun sendiri' },
        { status: 403 }
      )
    }

    const contentModel = await getContentModel()

    // Check if user exists
    const existingUser = await contentModel.getUserByEmail(email)
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      )
    }

    // Delete user
    await contentModel.deleteUser(email)

    return NextResponse.json({
      success: true,
      message: 'Admin user berhasil dihapus'
    })

  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
