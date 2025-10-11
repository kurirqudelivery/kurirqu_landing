import { NextRequest, NextResponse } from 'next/server'
import { getContentModel } from '@/lib/models'
import { emailService } from '@/lib/email'
import { generateSecureOTP, getOTPExpirationMinutes, isValidEmail, sanitizeEmail, maskEmail } from '@/lib/otp'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email tidak valid' },
        { status: 400 }
      )
    }

    const sanitizedEmail = sanitizeEmail(email)
    const contentModel = await getContentModel()

    // Check if user exists in database or is master admin
    const masterAdminEmail = process.env.MASTER_ADMIN_EMAIL
    const existingUser = await contentModel.getUserByEmail(sanitizedEmail)
    
    if (!existingUser && sanitizedEmail !== masterAdminEmail) {
      return NextResponse.json(
        { error: 'Email tidak terdaftar sebagai admin' },
        { status: 401 }
      )
    }

    // Rate limiting: Check if there's already a valid OTP sent in the last 1 minute
    // const existingOTP = await contentModel.getValidOTP(sanitizedEmail, '')
    // if (existingOTP) {
    //   // Check if the last OTP was sent less than 1 minute ago
    //   const oneMinuteAgo = new Date(Date.now() - 60 * 1000)
    //   if (existingOTP.createdAt > oneMinuteAgo) {
    //     return NextResponse.json(
    //       { 
    //         error: 'Tunggu 1 menit sebelum meminta OTP baru',
    //         retryAfter: 60
    //       },
    //       { status: 429 }
    //     )
    //   }
    // }

    // Generate new OTP
    const otpCode = generateSecureOTP(6)
    const expiresAt = getOTPExpirationMinutes(5)
    
    // Log OTP for testing (remove in production)
    console.log(`🔐 Generated OTP for ${sanitizedEmail}: ${otpCode}`)

    // Save OTP to database
    console.log('Creating OTP for email:', sanitizedEmail, 'code:', otpCode)
    await contentModel.createOTP(sanitizedEmail, otpCode, expiresAt)
    console.log('OTP created successfully')

    // Send OTP via email
    const emailSent = await emailService.sendOTP(sanitizedEmail, otpCode)

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Gagal mengirim email. Silakan coba lagi.' },
        { status: 500 }
      )
    }

    // Clean up expired OTPs
    await contentModel.cleanupExpiredOTPs()

    // Return success response (don't include the actual OTP)
    return NextResponse.json({
      success: true,
      message: 'OTP berhasil dikirim ke email',
      email: maskEmail(sanitizedEmail),
      expiresIn: 300 // 5 minutes in seconds
    })

  } catch (error) {
    console.error('Error requesting OTP:', error)
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
