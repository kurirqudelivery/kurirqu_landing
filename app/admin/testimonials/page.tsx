"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatarUrl: string
  rating: number
}

export default function TestimonialsManagement() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials')
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched testimonials data:', data)
        setTestimonials(data.testimonials || [])
        setTitle(data.title || '')
        setSubtitle(data.subtitle || '')
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setMessage('Error loading testimonials')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          testimonials,
          title,
          subtitle
        }),
      })

      if (response.ok) {
        setMessage('Testimonials saved successfully!')
      } else {
        setMessage('Error saving testimonials')
      }
    } catch (error) {
      console.error('Error saving testimonials:', error)
      setMessage('Error saving testimonials')
    } finally {
      setSaving(false)
    }
  }

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: '',
      role: '',
      content: '',
      avatarUrl: '',
      rating: 5
    }
    setTestimonials([...testimonials, newTestimonial])
  }

  const removeTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id))
  }

  const updateTestimonial = (id: string, field: keyof Testimonial, value: string | number) => {
    setTestimonials(testimonials.map(testimonial => 
      testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
    ))
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
        <h2 className="text-3xl font-bold text-gray-900">Testimonials</h2>
        <p className="text-gray-600 mt-2">Manage customer testimonials</p>
        
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => router.push('/admin')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button onClick={addTestimonial}>
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
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
            <CardTitle>Section Header</CardTitle>
            <CardDescription>Manage the testimonials section title and subtitle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="section-title">Section Title</Label>
                <Input
                  id="section-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Apa Kata Pelanggan Kami"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section-subtitle">Section Subtitle</Label>
                <Input
                  id="section-subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Kepuasan pelanggan adalah prioritas utama kami"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Testimonial {index + 1}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeTestimonial(testimonial.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${testimonial.id}`}>Customer Name</Label>
                    <Input
                      id={`name-${testimonial.id}`}
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(testimonial.id, 'name', e.target.value)}
                      placeholder="e.g., John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`role-${testimonial.id}`}>Role/Company</Label>
                    <Input
                      id={`role-${testimonial.id}`}
                      value={testimonial.role}
                      onChange={(e) => updateTestimonial(testimonial.id, 'role', e.target.value)}
                      placeholder="e.g., CEO, Tech Company"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`content-${testimonial.id}`}>Testimonial Content</Label>
                  <Input
                    id={`content-${testimonial.id}`}
                    value={testimonial.content}
                    onChange={(e) => updateTestimonial(testimonial.id, 'content', e.target.value)}
                    placeholder="What the customer said about your service"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`avatar-${testimonial.id}`}>Avatar URL</Label>
                    <Input
                      id={`avatar-${testimonial.id}`}
                      value={testimonial.avatarUrl}
                      onChange={(e) => updateTestimonial(testimonial.id, 'avatarUrl', e.target.value)}
                      placeholder="URL to customer avatar image"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`rating-${testimonial.id}`}>Rating (1-5)</Label>
                    <Input
                      id={`rating-${testimonial.id}`}
                      type="number"
                      min="1"
                      max="5"
                      value={testimonial.rating}
                      onChange={(e) => updateTestimonial(testimonial.id, 'rating', parseInt(e.target.value) || 5)}
                      placeholder="5"
                    />
                  </div>
                </div>
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
