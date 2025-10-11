import { NextRequest, NextResponse } from 'next/server'
import { getContentModel } from '@/lib/models'
import { sanitizeEmail, isValidEmail } from '@/lib/otp'

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    // Validate input
    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email dan OTP harus diisi' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email tidak valid' },
        { status: 400 }
      )
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: 'OTP harus 6 digit angka' },
        { status: 400 }
      )
    }

    const sanitizedEmail = sanitizeEmail(email)
    const contentModel = await getContentModel()

    // Find valid OTP
    const validOTP = await contentModel.getValidOTP(sanitizedEmail, otp)
    
    if (!validOTP) {
      return NextResponse.json(
        { error: 'OTP tidak valid atau sudah kadaluarsa' },
        { status: 400 }
      )
    }

    // Check attempt limit (max 3 attempts)
    if (validOTP.attempts >= 3) {
      await contentModel.markOTPAsUsed(sanitizedEmail, otp)
      return NextResponse.json(
        { error: 'OTP sudah tidak berlaku. Silakan request OTP baru.' },
        { status: 400 }
      )
    }

    // Mark OTP as used immediately to prevent reuse
    await contentModel.markOTPAsUsed(sanitizedEmail, otp)

    // Check if user exists in database or is master admin
    const masterAdminEmail = process.env.MASTER_ADMIN_EMAIL
    let user = await contentModel.getUserByEmail(sanitizedEmail)
    
    // If user not found in database, check if it's master admin
    if (!user && sanitizedEmail === masterAdminEmail) {
      user = await contentModel.createOrUpdateUser(sanitizedEmail)
    } else if (!user) {
      return NextResponse.json(
        { error: 'Email tidak terdaftar sebagai admin' },
        { status: 401 }
      )
    } else {
      // Update last login for existing user
      user = await contentModel.createOrUpdateUser(sanitizedEmail)
    }

    // Clean up expired OTPs
    await contentModel.cleanupExpiredOTPs()

    // Return success response with user info
    return NextResponse.json({
      success: true,
      message: 'Login berhasil',
      user: {
        email: user.email,
        isActive: user.isActive,
        lastLogin: user.lastLogin
      }
    })

  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
