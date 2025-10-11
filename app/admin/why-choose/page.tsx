"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'

interface WhyChooseItem {
  id: string
  title: string
  description: string
  icon: string
}

export default function WhyChooseManagement() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [items, setItems] = useState<WhyChooseItem[]>([])
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')

  useEffect(() => {
    fetchWhyChooseItems()
  }, [])

  const fetchWhyChooseItems = async () => {
    try {
      const response = await fetch('/api/admin/why-choose')
      if (response.ok) {
        const data = await response.json()
        setTitle(data.title || '')
        setSubtitle(data.subtitle || '')
        setItems(data.items || [])
      }
    } catch (error) {
      console.error('Error fetching why choose items:', error)
      setMessage('Error loading content')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/why-choose', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, subtitle, items }),
      })

      if (response.ok) {
        setMessage('Content saved successfully!')
      } else {
        setMessage('Error saving content')
      }
    } catch (error) {
      console.error('Error saving why choose items:', error)
      setMessage('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  const addItem = () => {
    const newItem: WhyChooseItem = {
      id: Date.now().toString(),
      title: '',
      description: '',
      icon: ''
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (id: string, field: keyof WhyChooseItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
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
        <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
        <p className="text-gray-600 mt-2">Manage your value propositions</p>
        
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => router.push('/admin')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button onClick={addItem}>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="space-y-6">

        {message && (
          <Alert className={message.includes('Error') ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {/* Section Title and Subtitle */}
        <Card>
          <CardHeader>
            <CardTitle>Section Settings</CardTitle>
            <CardDescription>Configure the main title and subtitle for this section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="section-title">Section Title</Label>
              <Input
                id="section-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Why Choose Us"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-subtitle">Section Subtitle</Label>
              <Input
                id="section-subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g., Discover the benefits of our services"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {items.map((item, index) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Item {index + 1}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${item.id}`}>Title</Label>
                    <Input
                      id={`title-${item.id}`}
                      value={item.title}
                      onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                      placeholder="e.g., Fast Delivery"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`icon-${item.id}`}>Icon Class</Label>
                    <Input
                      id={`icon-${item.id}`}
                      value={item.icon}
                      onChange={(e) => updateItem(item.id, 'icon', e.target.value)}
                      placeholder="e.g., fa-bolt"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`description-${item.id}`}>Description</Label>
                  <Input
                    id={`description-${item.id}`}
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Brief description of this value proposition"
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
