import { NextResponse } from 'next/server'
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3'

export async function GET() {
  try {
    // Test S3 connection
    const s3Client = new S3Client({
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
      },
      forcePathStyle: true, // Required for non-AWS S3 providers
    })

    // Try to list buckets to test connection
    const command = new ListBucketsCommand({})
    const response = await s3Client.send(command)

    return NextResponse.json({
      success: true,
      message: 'S3 connection successful!',
      buckets: response.Buckets,
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      bucket: process.env.S3_BUCKET
    })
  } catch (error) {
    console.error('S3 connection error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to connect to S3',
      details: error instanceof Error ? error.message : 'Unknown error',
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      bucket: process.env.S3_BUCKET
    }, { status: 500 })
  }
}
