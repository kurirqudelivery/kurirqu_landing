"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Save } from 'lucide-react'

interface CTAContent {
  title: string
  subtitle: string
  buttonText: string
  buttonUrl: string
  description: string
  qrCodeUrl?: string
}

export default function CTAManagement() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [ctaData, setCTAData] = useState<CTAContent>({
    title: '',
    subtitle: '',
    buttonText: '',
    buttonUrl: '',
    description: ''
  })

  useEffect(() => {
    fetchCTAContent()
  }, [])

  const fetchCTAContent = async () => {
    try {
      const response = await fetch('/api/admin/cta')
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setCTAData(data)
        }
      }
    } catch (error) {
      console.error('Error fetching CTA content:', error)
      setMessage('Error loading content')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/cta', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ctaData),
      })

      if (response.ok) {
        setMessage('Content saved successfully!')
      } else {
        setMessage('Error saving content')
      }
    } catch (error) {
      console.error('Error saving CTA content:', error)
      setMessage('Error saving content')
    } finally {
      setSaving(false)
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
        <h2 className="text-3xl font-bold text-gray-900">CTA</h2>
        <p className="text-gray-600 mt-2">Manage your call to action section</p>
        
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => router.push('/admin')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="space-y-6">

        {message && (
          <Alert className={message.includes('Error') ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>CTA Content</CardTitle>
            <CardDescription>Update the call to action section content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Main Title</Label>
                <Input
                  id="title"
                  value={ctaData.title}
                  onChange={(e) => setCTAData({ ...ctaData, title: e.target.value })}
                  placeholder="Ready to get started?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={ctaData.subtitle}
                  onChange={(e) => setCTAData({ ...ctaData, subtitle: e.target.value })}
                  placeholder="Join thousands of satisfied customers"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={ctaData.buttonText}
                  onChange={(e) => setCTAData({ ...ctaData, buttonText: e.target.value })}
                  placeholder="Get Started Now"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buttonUrl">Button URL</Label>
                <Input
                  id="buttonUrl"
                  value={ctaData.buttonUrl}
                  onChange={(e) => setCTAData({ ...ctaData, buttonUrl: e.target.value })}
                  placeholder="https://wa.link/dvsne2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={ctaData.description}
                onChange={(e) => setCTAData({ ...ctaData, description: e.target.value })}
                placeholder="Contact us today for fast and reliable delivery services"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qrCodeUrl">QR Code URL</Label>
              <Input
                id="qrCodeUrl"
                value={ctaData.qrCodeUrl || ''}
                onChange={(e) => setCTAData({ ...ctaData, qrCodeUrl: e.target.value })}
                placeholder="https://i.postimg.cc/Gpk5wtbR/kurirqudirect.png"
              />
              <p className="text-sm text-gray-500">
                Masukkan URL gambar QR code untuk WhatsApp. Gunakan format PNG atau JPG dengan ukuran minimal 200x200px.
              </p>
              {ctaData.qrCodeUrl && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
                  <img 
                    src={ctaData.qrCodeUrl} 
                    alt="QR Code Preview" 
                    className="w-32 h-32 object-cover border border-gray-300 rounded"
                    onError={(e) => {
                      e.currentTarget.src = "https://i.postimg.cc/Gpk5wtbR/kurirqudirect.png"
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
