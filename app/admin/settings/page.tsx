"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Save, Globe, Phone, Mail, Building, Search, Megaphone, Upload, X, Image as ImageIcon } from 'lucide-react'

interface SiteSettings {
  siteName: string
  siteTitle: string
  siteDescription: string
  siteUrl: string
  faviconUrl: string
  logoUrl: string
  address: string
  phone: string
  email: string
  whatsapp: string
  socialLinks: {
    facebook: string
    instagram: string
    twitter: string
    youtube: string
    linkedin: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string
    ogImage: string
  }
  contact: {
    email: string
    phone: string
    whatsapp: string
    address: string
    workingHours: string
  }
  business: {
    companyName: string
    registrationNumber: string
    taxId: string
  }
}

export default function SettingsManagement() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'contact' | 'business' | 'social'>('general')
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingFavicon, setUploadingFavicon] = useState(false)
  
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    siteTitle: '',
    siteDescription: '',
    siteUrl: '',
    faviconUrl: '',
    logoUrl: '',
    address: '',
    phone: '',
    email: '',
    whatsapp: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
      linkedin: ''
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      ogImage: ''
    },
    contact: {
      email: '',
      phone: '',
      whatsapp: '',
      address: '',
      workingHours: ''
    },
    business: {
      companyName: '',
      registrationNumber: '',
      taxId: ''
    }
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      setMessage('Error loading settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        const data = await response.json()
        setMessage('Settings saved successfully!')
        console.log('Save response:', data)
      } else {
        const errorData = await response.json()
        console.error('Save error response:', errorData)
        setMessage(`Error saving settings: ${errorData.details || errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage(`Error saving settings: ${error instanceof Error ? error.message : 'Network error'}`)
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateNestedField = (category: string, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof SiteSettings] as any),
        [field]: value
      }
    }))
  }

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingLogo(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'logo')

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        updateField('logoUrl', data.url)
        setMessage('Logo uploaded successfully!')
      } else {
        const errorData = await response.json()
        setMessage(`Error uploading logo: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error uploading logo:', error)
      setMessage('Error uploading logo')
    } finally {
      setUploadingLogo(false)
    }
  }

  const handleFaviconUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingFavicon(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'favicon')

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        updateField('faviconUrl', data.url)
        setMessage('Favicon uploaded successfully!')
      } else {
        const errorData = await response.json()
        setMessage(`Error uploading favicon: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error uploading favicon:', error)
      setMessage('Error uploading favicon')
    } finally {
      setUploadingFavicon(false)
    }
  }

  const removeLogo = async () => {
    if (!settings.logoUrl) return

    try {
      // Extract filename from URL
      const filename = settings.logoUrl.split('/').pop()
      if (filename) {
        await fetch('/api/admin/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename }),
        })
      }
      updateField('logoUrl', '')
      setMessage('Logo removed successfully!')
    } catch (error) {
      console.error('Error removing logo:', error)
      setMessage('Error removing logo')
    }
  }

  const removeFavicon = async () => {
    if (!settings.faviconUrl) return

    try {
      // Extract filename from URL
      const filename = settings.faviconUrl.split('/').pop()
      if (filename) {
        await fetch('/api/admin/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename }),
        })
      }
      updateField('faviconUrl', '')
      setMessage('Favicon removed successfully!')
    } catch (error) {
      console.error('Error removing favicon:', error)
      setMessage('Error removing favicon')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'business', label: 'Business', icon: Building },
    { id: 'social', label: 'Social', icon: Megaphone },
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-2">Manage global site settings and configurations</p>
        
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

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-[#af1b1c] text-[#af1b1c]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic site information and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input
                      id="site-name"
                      value={settings.siteName}
                      onChange={(e) => updateField('siteName', e.target.value)}
                      placeholder="e.g., KurirQu"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-url">Site URL</Label>
                    <Input
                      id="site-url"
                      value={settings.siteUrl}
                      onChange={(e) => updateField('siteUrl', e.target.value)}
                      placeholder="https://kurirqu-landing.vercel.app"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-title">Site Title</Label>
                  <Input
                    id="site-title"
                    value={settings.siteTitle}
                    onChange={(e) => updateField('siteTitle', e.target.value)}
                    placeholder="Site title for browser tab"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Input
                    id="site-description"
                    value={settings.siteDescription}
                    onChange={(e) => updateField('siteDescription', e.target.value)}
                    placeholder="Brief description of your site"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Logo Upload */}
                  <div className="space-y-3">
                    <Label htmlFor="logo-upload">Logo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                      {settings.logoUrl ? (
                        <div className="space-y-3">
                          <div className="relative">
                            <img
                              src={settings.logoUrl}
                              alt="Logo preview"
                              className="w-full h-32 object-contain rounded-lg bg-gray-50"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={removeLogo}
                              disabled={uploadingLogo}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => document.getElementById('logo-upload')?.click()}
                              disabled={uploadingLogo}
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              {uploadingLogo ? 'Uploading...' : 'Change Logo'}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-3">
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <p>Click to upload logo</p>
                            <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('logo-upload')?.click()}
                            disabled={uploadingLogo}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            {uploadingLogo ? 'Uploading...' : 'Choose Logo'}
                          </Button>
                        </div>
                      )}
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        disabled={uploadingLogo}
                      />
                    </div>
                  </div>

                  {/* Favicon Upload */}
                  <div className="space-y-3">
                    <Label htmlFor="favicon-upload">Favicon</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                      {settings.faviconUrl ? (
                        <div className="space-y-3">
                          <div className="relative">
                            <img
                              src={settings.faviconUrl}
                              alt="Favicon preview"
                              className="w-16 h-16 mx-auto object-contain rounded-lg bg-gray-50 border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={removeFavicon}
                              disabled={uploadingFavicon}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => document.getElementById('favicon-upload')?.click()}
                              disabled={uploadingFavicon}
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              {uploadingFavicon ? 'Uploading...' : 'Change Favicon'}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-3">
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <p>Click to upload favicon</p>
                            <p className="text-xs">ICO, PNG up to 2MB</p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('favicon-upload')?.click()}
                            disabled={uploadingFavicon}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            {uploadingFavicon ? 'Uploading...' : 'Choose Favicon'}
                          </Button>
                        </div>
                      )}
                      <input
                        id="favicon-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFaviconUpload}
                        className="hidden"
                        disabled={uploadingFavicon}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'seo' && (
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Search engine optimization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={settings.seo.metaTitle}
                    onChange={(e) => updateNestedField('seo', 'metaTitle', e.target.value)}
                    placeholder="SEO meta title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Input
                    id="meta-description"
                    value={settings.seo.metaDescription}
                    onChange={(e) => updateNestedField('seo', 'metaDescription', e.target.value)}
                    placeholder="SEO meta description"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    value={settings.seo.keywords}
                    onChange={(e) => updateNestedField('seo', 'keywords', e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="og-image">OG Image</Label>
                  <Input
                    id="og-image"
                    value={settings.seo.ogImage}
                    onChange={(e) => updateNestedField('seo', 'ogImage', e.target.value)}
                    placeholder="https://example.com/og-image.jpg"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'contact' && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Business contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={settings.contact.email}
                      onChange={(e) => updateNestedField('contact', 'email', e.target.value)}
                      placeholder="contact@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input
                      id="contact-phone"
                      value={settings.contact.phone}
                      onChange={(e) => updateNestedField('contact', 'phone', e.target.value)}
                      placeholder="+6282236418724"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-whatsapp">WhatsApp</Label>
                  <Input
                    id="contact-whatsapp"
                    value={settings.contact.whatsapp}
                    onChange={(e) => updateNestedField('contact', 'whatsapp', e.target.value)}
                    placeholder="https://wa.link/yourlink"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-address">Address</Label>
                  <Input
                    id="contact-address"
                    value={settings.contact.address}
                    onChange={(e) => updateNestedField('contact', 'address', e.target.value)}
                    placeholder="Your business address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="working-hours">Working Hours</Label>
                  <Input
                    id="working-hours"
                    value={settings.contact.workingHours}
                    onChange={(e) => updateNestedField('contact', 'workingHours', e.target.value)}
                    placeholder="Senin - Sabtu: 08:00 - 20:00"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'business' && (
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Legal business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-company">Company Name</Label>
                  <Input
                    id="business-company"
                    value={settings.business.companyName}
                    onChange={(e) => updateNestedField('business', 'companyName', e.target.value)}
                    placeholder="PT. Example Company"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration-number">Registration Number</Label>
                  <Input
                    id="registration-number"
                    value={settings.business.registrationNumber}
                    onChange={(e) => updateNestedField('business', 'registrationNumber', e.target.value)}
                    placeholder="1234567890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID</Label>
                  <Input
                    id="tax-id"
                    value={settings.business.taxId}
                    onChange={(e) => updateNestedField('business', 'taxId', e.target.value)}
                    placeholder="123456789012345"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'social' && (
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Social media profile links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="social-facebook">Facebook</Label>
                    <Input
                      id="social-facebook"
                      value={settings.socialLinks.facebook}
                      onChange={(e) => updateNestedField('socialLinks', 'facebook', e.target.value)}
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="social-instagram">Instagram</Label>
                    <Input
                      id="social-instagram"
                      value={settings.socialLinks.instagram}
                      onChange={(e) => updateNestedField('socialLinks', 'instagram', e.target.value)}
                      placeholder="https://instagram.com/yourprofile"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="social-twitter">Twitter</Label>
                    <Input
                      id="social-twitter"
                      value={settings.socialLinks.twitter}
                      onChange={(e) => updateNestedField('socialLinks', 'twitter', e.target.value)}
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="social-youtube">YouTube</Label>
                    <Input
                      id="social-youtube"
                      value={settings.socialLinks.youtube}
                      onChange={(e) => updateNestedField('socialLinks', 'youtube', e.target.value)}
                      placeholder="https://youtube.com/yourchannel"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="social-linkedin">LinkedIn</Label>
                    <Input
                      id="social-linkedin"
                      value={settings.socialLinks.linkedin}
                      onChange={(e) => updateNestedField('socialLinks', 'linkedin', e.target.value)}
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </div>
  )
}
