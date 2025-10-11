"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export default function ServicesManagement() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [services, setServices] = useState<Service[]>([])
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data?.services || [])
        setTitle(data?.title || '')
        setSubtitle(data?.subtitle || '')
      }
    } catch (error) {
      console.error('Error fetching services:', error)
      setMessage('Error loading services')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ services, title, subtitle }),
      })

      if (response.ok) {
        setMessage('Services saved successfully!')
      } else {
        setMessage('Error saving services')
      }
    } catch (error) {
      console.error('Error saving services:', error)
      setMessage('Error saving services')
    } finally {
      setSaving(false)
    }
  }

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: '',
      description: '',
      icon: ''
    }
    setServices([...services, newService])
  }

  const removeService = (id: string) => {
    setServices(services.filter(service => service.id !== id))
  }

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
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
        <h2 className="text-3xl font-bold text-gray-900">Services</h2>
        <p className="text-gray-600 mt-2">Manage your service offerings</p>
        
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => router.push('/admin')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button onClick={addService}>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>
      </div>

      <div className="space-y-6">

        {message && (
          <Alert className={message.includes('Error') ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {/* Section Header */}
        <Card>
          <CardHeader>
            <CardTitle>Section Header</CardTitle>
            <CardDescription>Manage the title and subtitle for the services section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="section-title">Section Title</Label>
                <Input
                  id="section-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Layanan Kami"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section-subtitle">Section Subtitle</Label>
                <Input
                  id="section-subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g., Solusi pengiriman terpercaya untuk kebutuhan Anda"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {services.map((service, index) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Service {index + 1}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeService(service.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${service.id}`}>Service Title</Label>
                    <Input
                      id={`title-${service.id}`}
                      value={service.title}
                      onChange={(e) => updateService(service.id, 'title', e.target.value)}
                      placeholder="e.g., Same Day Delivery"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`icon-${service.id}`}>Icon Class</Label>
                    <Input
                      id={`icon-${service.id}`}
                      value={service.icon}
                      onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                      placeholder="e.g., fa-truck"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`description-${service.id}`}>Description</Label>
                  <Input
                    id={`description-${service.id}`}
                    value={service.description}
                    onChange={(e) => updateService(service.id, 'description', e.target.value)}
                    placeholder="Brief description of the service"
                  />
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
