import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 })
    }
    
    // Direct MongoDB connection
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    const db = client.db()
    
    // Get all OTPs for this email
    const otps = await db.collection('otps')
      .find({ email: email.toLowerCase().trim() })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray()
    
    await client.close()
    
    return NextResponse.json({
      email,
      otps: otps.map((otp: any) => ({
        code: otp.code,
        createdAt: otp.createdAt,
        expiresAt: otp.expiresAt,
        used: otp.used,
        isValid: new Date() <= otp.expiresAt && !otp.used
      }))
    })
    
  } catch (error: any) {
    console.error('Debug OTP error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
