"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Save, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react'

interface GalleryImage {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
}

export default function GalleryManagement() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch('/api/admin/gallery')
      if (response.ok) {
        const data = await response.json()
        setGalleryImages(data || [])
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error)
      setMessage('Error loading gallery images')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ galleryImages }),
      })

      if (response.ok) {
        setMessage('Gallery saved successfully!')
      } else {
        setMessage('Error saving gallery')
      }
    } catch (error) {
      console.error('Error saving gallery:', error)
      setMessage('Error saving gallery')
    } finally {
      setSaving(false)
    }
  }

  const addGalleryImage = () => {
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      title: '',
      description: '',
      imageUrl: '',
      category: ''
    }
    setGalleryImages([...galleryImages, newImage])
  }

  const removeGalleryImage = async (id: string) => {
    const imageToRemove = galleryImages.find(image => image.id === id)
    
    // Delete from S3 if it's an S3 URL
    if (imageToRemove?.imageUrl && imageToRemove.imageUrl.includes(process.env.NEXT_PUBLIC_S3_ENDPOINT || 'is3.cloudhost.id')) {
      await deleteFromS3(imageToRemove.imageUrl)
    }
    
    // Remove from local state
    setGalleryImages(galleryImages.filter(image => image.id !== id))
    setMessage('Image removed successfully!')
  }

  const updateGalleryImage = (id: string, field: keyof GalleryImage, value: string) => {
    setGalleryImages(galleryImages.map(image => 
      image.id === id ? { ...image, [field]: value } : image
    ))
  }

  const handleImageUpload = async (id: string, file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        updateGalleryImage(id, 'imageUrl', data.url)
        setMessage('Image uploaded successfully!')
      } else {
        const error = await response.json()
        setMessage(`Upload failed: ${error.error}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setMessage('Upload failed. Please try again.')
    }
  }

  const handleFileSelect = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(id, file)
    }
  }

  const deleteFromS3 = async (imageUrl: string) => {
    try {
      const response = await fetch('/api/admin/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('File deleted from S3:', data.message)
      } else {
        const error = await response.json()
        console.error('Failed to delete from S3:', error.error)
      }
    } catch (error) {
      console.error('Error deleting from S3:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Gallery</h2>
        <p className="text-gray-600 mt-2">Manage your image gallery</p>
        
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => router.push('/admin')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button onClick={addGalleryImage}>
            <Plus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </div>
      </div>

      <div className="space-y-6">

        {message && (
          <Alert className={message.includes('Error') ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {galleryImages.map((image, index) => (
            <Card key={image.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Image {index + 1}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeGalleryImage(image.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${image.id}`}>Image Title</Label>
                    <Input
                      id={`title-${image.id}`}
                      value={image.title}
                      onChange={(e) => updateGalleryImage(image.id, 'title', e.target.value)}
                      placeholder="e.g., Delivery Team in Action"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`category-${image.id}`}>Category</Label>
                    <Input
                      id={`category-${image.id}`}
                      value={image.category}
                      onChange={(e) => updateGalleryImage(image.id, 'category', e.target.value)}
                      placeholder="e.g., Team, Delivery, Office"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`description-${image.id}`}>Description</Label>
                  <Input
                    id={`description-${image.id}`}
                    value={image.description}
                    onChange={(e) => updateGalleryImage(image.id, 'description', e.target.value)}
                    placeholder="Brief description of the image"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`imageUrl-${image.id}`}>Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`imageUrl-${image.id}`}
                      value={image.imageUrl}
                      onChange={(e) => updateGalleryImage(image.id, 'imageUrl', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1"
                    />
                    <input
                      type="file"
                      id={`file-upload-${image.id}`}
                      accept="image/*"
                      onChange={(e) => handleFileSelect(image.id, e)}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById(`file-upload-${image.id}`)?.click()}
                      title="Upload image to S3"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)
                  </p>
                </div>
                {image.imageUrl && (
                  <div className="mt-4">
                    <Label>Preview</Label>
                    <div className="mt-2 border rounded-lg p-2 bg-gray-50">
                      <img 
                        src={image.imageUrl} 
                        alt={image.title}
                        className="w-full h-48 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}
