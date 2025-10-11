"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Save } from 'lucide-react'
import { HeroContent } from '@/lib/models'

export default function HeroManagement() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [heroData, setHeroData] = useState<HeroContent>({
    title: '',
    subtitle: '',
    description: '',
    buttonText: '',
    buttonUrl: '',
    imageUrl: '',
    logoUrl: '',
    whatsappUrl: '',
    instructions: {
      step1: '',
      step2: '',
      step3: ''
    }
  })

  useEffect(() => {
    fetchHeroContent()
  }, [])

  const fetchHeroContent = async () => {
    try {
      const response = await fetch('/api/admin/hero')
      if (response.ok) {
        const data = await response.json()
        if (data) {
          // Ensure instructions exists
          setHeroData({
            ...data,
            instructions: data.instructions || {
              step1: '',
              step2: '',
              step3: ''
            }
          })
        }
      }
    } catch (error) {
      console.error('Error fetching hero content:', error)
      setMessage('Error loading content')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      // Clean up data before sending - only send fields that are actually used
      const cleanData = {
        title: heroData.title,
        subtitle: heroData.subtitle,
        logoUrl: heroData.logoUrl || null,
        whatsappUrl: heroData.whatsappUrl || null,
        instructions: heroData.instructions?.step1 || heroData.instructions?.step2 || heroData.instructions?.step3 
          ? {
              step1: heroData.instructions?.step1 || null,
              step2: heroData.instructions?.step2 || null,
              step3: heroData.instructions?.step3 || null
            }
          : null
      }

      console.log('Saving hero data:', JSON.stringify(cleanData, null, 2))

      const response = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanData),
      })

      if (response.ok) {
        setMessage('Content saved successfully!')
      } else {
        const errorData = await response.json()
        console.error('Save error:', errorData)
        setMessage(`Error saving content: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error saving hero content:', error)
      setMessage(`Error saving content: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
        <h2 className="text-3xl font-bold text-gray-900">Hero</h2>
        <p className="text-gray-600 mt-2">Manage your hero section content</p>
        
        <Button
          variant="outline"
          onClick={() => router.push('/admin')}
          className="mb-4 mt-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {message && (
        <Alert className={message.includes('Error') ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          <CardDescription>Update the main hero section content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Main Title</Label>
              <Input
                id="title"
                value={heroData.title}
                onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                placeholder="Kirim Apapun Bisa Dengan KurirQu"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={heroData.subtitle}
                onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                placeholder="Kami siap melayani dengan sepenuh hati"
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                value={heroData.logoUrl || ''}
                onChange={(e) => setHeroData({ ...heroData, logoUrl: e.target.value })}
                placeholder="https://kurirqu-landing.vercel.app/assets/img/logo/kurirqu-logo.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappUrl">WhatsApp URL</Label>
              <Input
                id="whatsappUrl"
                value={heroData.whatsappUrl || ''}
                onChange={(e) => setHeroData({ ...heroData, whatsappUrl: e.target.value })}
                placeholder="https://wa.link/dvsne2"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Instructions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="step1">Step 1</Label>
                <Input
                  id="step1"
                  value={heroData.instructions?.step1 || ''}
                  onChange={(e) => setHeroData({
                    ...heroData,
                    instructions: { 
                      ...heroData.instructions, 
                      step1: e.target.value 
                    }
                  })}
                  placeholder="Hubungi via WhatsApp"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="step2">Step 2</Label>
                <Input
                  id="step2"
                  value={heroData.instructions?.step2 || ''}
                  onChange={(e) => setHeroData({
                    ...heroData,
                    instructions: { 
                      ...heroData.instructions, 
                      step2: e.target.value 
                    }
                  })}
                  placeholder="Sampaikan Detail Pesanan"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="step3">Step 3</Label>
                <Input
                  id="step3"
                  value={heroData.instructions?.step3 || ''}
                  onChange={(e) => setHeroData({
                    ...heroData,
                    instructions: { 
                      ...heroData.instructions, 
                      step3: e.target.value 
                    }
                  })}
                  placeholder="Pesanan Diproses"
                />
              </div>
            </div>
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
  )
}
