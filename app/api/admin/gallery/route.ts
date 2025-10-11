import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getContentModel } from '@/lib/models'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const contentModel = await getContentModel()
    const galleryData = await contentModel.getGalleryContent()
    
    // Transform images to galleryImages format for admin
    const galleryImages = galleryData?.images?.map((img, index) => ({
      id: img._id?.toString() || index.toString(),
      title: img.title,
      description: img.description,
      imageUrl: img.imageUrl,
      category: img.category
    })) || []
    
    return NextResponse.json(galleryImages)
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { galleryImages } = await request.json()
    
    // Transform galleryImages back to images format
    const images = galleryImages.map((img: any, index: number) => ({
      title: img.title,
      description: img.description,
      imageUrl: img.imageUrl,
      category: img.category,
      order: index + 1
    }))
    
    const contentModel = await getContentModel()
    await contentModel.updateGalleryContent({ images })
    
    return NextResponse.json({ message: 'Gallery updated successfully' })
  } catch (error) {
    console.error('Error updating gallery:', error)
    return NextResponse.json({ error: 'Failed to update gallery' }, { status: 500 })
  }
}
