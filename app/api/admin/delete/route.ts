import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { imageUrl } = await request.json()
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'No imageUrl provided' }, { status: 400 })
    }

    // Extract file key from URL
    // URL format: https://is3.cloudhost.id/deckobucket/gallery/uuid.jpg
    const urlParts = imageUrl.split('/')
    const bucketIndex = urlParts.findIndex((part: string) => part === process.env.S3_BUCKET)
    
    if (bucketIndex === -1 || bucketIndex + 1 >= urlParts.length) {
      return NextResponse.json({ error: 'Invalid image URL format' }, { status: 400 })
    }
    
    const fileKey = urlParts.slice(bucketIndex + 1).join('/')
    
    // Only allow deletion from gallery folder
    if (!fileKey.startsWith('gallery/')) {
      return NextResponse.json({ 
        error: 'Can only delete files from gallery folder' 
      }, { status: 400 })
    }

    // Initialize S3 client
    const s3Client = new S3Client({
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
      },
      forcePathStyle: true,
    })

    // Delete from S3
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: fileKey,
    })

    await s3Client.send(command)

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully from S3',
      fileKey: fileKey
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({
      error: 'Failed to delete file from S3',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
