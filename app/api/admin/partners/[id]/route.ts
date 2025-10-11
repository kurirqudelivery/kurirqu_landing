import { NextRequest, NextResponse } from 'next/server'
import { getContentModel } from '@/lib/models'
import { sendPartnershipStatusUpdateEmail } from '@/lib/email'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, notes, reviewedBy, sendEmailNotification = true } = await request.json()
    
    // Validate status
    if (!['approved', 'rejected', 'review'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be approved, rejected, or review' },
        { status: 400 }
      )
    }

    const model = await getContentModel()
    
    // Get the application details first
    const application = await model.getPartnerApplicationById(params.id)
    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    // Update the application status
    await model.updatePartnerApplicationStatus(
      params.id,
      status,
      reviewedBy || 'Admin',
      notes
    )

    // Send email notification to the applicant only if checkbox is checked
    let emailSent = false
    if (sendEmailNotification) {
      try {
        await sendPartnershipStatusUpdateEmail(
          application.email,
          application.nama,
          status as 'approved' | 'rejected',
          notes
        )
        emailSent = true
        console.log(`Status update email sent to ${application.email} for status: ${status}`)
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError)
        // Continue with response even if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: `Application status updated to ${status} successfully${sendEmailNotification ? ' and email sent' : ''}`,
      applicationId: params.id,
      emailSent
    })
  } catch (error) {
    console.error('Error updating partnership application status:', error)
    return NextResponse.json(
      { error: 'Failed to update application status' },
      { status: 500 }
    )
  }
}
