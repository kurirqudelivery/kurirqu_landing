import { NextRequest, NextResponse } from 'next/server'
import { getContentModel } from '@/lib/models'
import { sendPartnershipConfirmationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    console.log('Received partnership application data:', {
      ...data,
      fotoSTNK: data.fotoSTNK ? '[FILE_URL]' : null,
      fotoKTP: data.fotoKTP ? '[FILE_URL]' : null,
      fotoSIM: data.fotoSIM ? '[FILE_URL]' : null,
      fotoSelfie: data.fotoSelfie ? '[FILE_URL]' : null,
    })
    
    // Validate required fields
    const requiredFields = [
      'email', 'nama', 'jenisKelamin', 'tanggalLahir', 'alamatRumah',
      'nomorHp', 'nomorWhatsApp', 'jenisKendaraan', 'merkTypeKendaraan',
      'nomorPolisi', 'tahunKendaraan', 'fotoSTNK', 'fotoKTP', 'fotoSIM',
      'fotoSelfie', 'pernahJadiKurir', 'waktuKerja', 'siapTraining',
      'setujuBPJS', 'dataBenar', 'setujuSyarat'
    ]
    
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        console.log(`Validation failed for field: ${field}, value:`, data[field])
        return NextResponse.json(
          { error: `Field ${field} is required` },
          { status: 400 }
        )
      }
    }

    // Special validation for pengalamanKurir - only required if pernahJadiKurir is true
    if (data.pernahJadiKurir === true && !data.pengalamanKurir) {
      return NextResponse.json(
        { error: 'Field pengalamanKurir is required when pernahJadiKurir is true' },
        { status: 400 }
      )
    }

    // Validate array fields
    if (!Array.isArray(data.waktuKerja) || data.waktuKerja.length === 0) {
      return NextResponse.json(
        { error: 'Field waktuKerja must be a non-empty array' },
        { status: 400 }
      )
    }

    // Convert date string to Date object
    data.tanggalLahir = new Date(data.tanggalLahir)
    
    // Validate date
    if (isNaN(data.tanggalLahir.getTime())) {
      return NextResponse.json(
        { error: 'Invalid tanggal lahir format' },
        { status: 400 }
      )
    }

    // Validate year
    const currentYear = new Date().getFullYear()
    if (data.tahunKendaraan < 1900 || data.tahunKendaraan > currentYear + 1) {
      return NextResponse.json(
        { error: 'Invalid tahun kendaraan' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate phone numbers (basic validation)
    const phoneRegex = /^[+]?[0-9]{10,15}$/
    if (!phoneRegex.test(data.nomorHp.replace(/[-\s]/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid nomor HP format' },
        { status: 400 }
      )
    }

    if (!phoneRegex.test(data.nomorWhatsApp.replace(/[-\s]/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid nomor WhatsApp format' },
        { status: 400 }
      )
    }

    const model = await getContentModel()
    const application = await model.createPartnerApplication(data)

    // Send confirmation email to user
    try {
      await sendPartnershipConfirmationEmail(data.email, data.nama)
      console.log('Partnership confirmation email sent to:', data.email)
    } catch (emailError) {
      console.error('Failed to send partnership confirmation email:', emailError)
      // Continue with response even if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      id: application._id
    })
  } catch (error) {
    console.error('Error submitting partnership application:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
