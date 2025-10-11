"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Save } from 'lucide-react'

interface FooterData {
  companyName: string
  description: string
  address: string
  phone: string
  email: string
  socialLinks: {
    facebook: string
    instagram: string
    twitter: string
    whatsapp: string
  }
}

export default function FooterManagement() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [footerData, setFooterData] = useState<FooterData>({
    companyName: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      whatsapp: ''
    }
  })

  useEffect(() => {
    fetchFooterData()
  }, [])

  const fetchFooterData = async () => {
    try {
      const response = await fetch('/api/admin/footer')
      if (response.ok) {
        const data = await response.json()
        setFooterData(data)
      }
    } catch (error) {
      console.error('Error fetching footer data:', error)
      setMessage('Error loading content')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/footer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(footerData),
      })

      if (response.ok) {
        setMessage('Footer content saved successfully!')
      } else {
        setMessage('Error saving content')
      }
    } catch (error) {
      console.error('Error saving footer data:', error)
      setMessage('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof FooterData, value: string) => {
    setFooterData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateSocialLink = (platform: keyof FooterData['socialLinks'], value: string) => {
    setFooterData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }))
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
        <h2 className="text-3xl font-bold text-gray-900">Footer</h2>
        <p className="text-gray-600 mt-2">Manage your footer information and social links</p>
        
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

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Basic company details displayed in the footer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={footerData.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  placeholder="e.g., KurirQu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={footerData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="e.g., kurirqublitar@gmail.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={footerData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Brief description of your company"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={footerData.address}
                onChange={(e) => updateField('address', e.target.value)}
                placeholder="Your company address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={footerData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="e.g., +6282236418724"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>Links to your social media profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={footerData.socialLinks.facebook}
                  onChange={(e) => updateSocialLink('facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={footerData.socialLinks.instagram}
                  onChange={(e) => updateSocialLink('instagram', e.target.value)}
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={footerData.socialLinks.twitter}
                  onChange={(e) => updateSocialLink('twitter', e.target.value)}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={footerData.socialLinks.whatsapp}
                  onChange={(e) => updateSocialLink('whatsapp', e.target.value)}
                  placeholder="https://wa.link/yourlink"
                />
              </div>
            </div>
          </CardContent>
        </Card>

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
