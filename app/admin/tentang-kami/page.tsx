"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'

interface Service {
  icon: string
  title: string
  description: string
}

interface TentangKamiData {
  headerTitle: string
  headerSubtitle: string
  storyTitle: string
  storyContent: string[]
  servicesTitle: string
  services: Service[]
  whyChooseTitle: string
  benefits: string[]
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  ctaButtonUrl: string
}

export default function TentangKamiAdmin() {
  const [data, setData] = useState<TentangKamiData>({
    headerTitle: "",
    headerSubtitle: "",
    storyTitle: "",
    storyContent: [],
    servicesTitle: "",
    services: [],
    whyChooseTitle: "",
    benefits: [],
    ctaTitle: "",
    ctaDescription: "",
    ctaButtonText: "",
    ctaButtonUrl: ""
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/tentang-kami')
      const result = await response.json()
      setData(result)
    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal memuat data' })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/tentang-kami', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Data berhasil disimpan!' })
      } else {
        setMessage({ type: 'error', text: 'Gagal menyimpan data' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat menyimpan' })
    } finally {
      setSaving(false)
    }
  }

  const addStoryContent = () => {
    setData(prev => ({
      ...prev,
      storyContent: [...prev.storyContent, ""]
    }))
  }

  const updateStoryContent = (index: number, value: string) => {
    setData(prev => ({
      ...prev,
      storyContent: prev.storyContent.map((item, i) => i === index ? value : item)
    }))
  }

  const removeStoryContent = (index: number) => {
    setData(prev => ({
      ...prev,
      storyContent: prev.storyContent.filter((_, i) => i !== index)
    }))
  }

  const addService = () => {
    setData(prev => ({
      ...prev,
      services: [...prev.services, { icon: "", title: "", description: "" }]
    }))
  }

  const updateService = (index: number, field: keyof Service, value: string) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }))
  }

  const removeService = (index: number) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }))
  }

  const addBenefit = () => {
    setData(prev => ({
      ...prev,
      benefits: [...prev.benefits, ""]
    }))
  }

  const updateBenefit = (index: number, value: string) => {
    setData(prev => ({
      ...prev,
      benefits: prev.benefits.map((item, i) => i === index ? value : item)
    }))
  }

  const removeBenefit = (index: number) => {
    setData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Kelola Tentang Kami</h2>
        <p className="text-gray-600 mt-2">Kelola konten halaman Tentang Kami</p>
      </div>

      {message && (
        <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-8">
        {/* Header Section */}
        <Card>
          <CardHeader>
            <CardTitle>Header</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="headerTitle">Judul Header</Label>
              <Input
                id="headerTitle"
                value={data.headerTitle}
                onChange={(e) => setData(prev => ({ ...prev, headerTitle: e.target.value }))}
                placeholder="Judul header"
              />
            </div>
            <div>
              <Label htmlFor="headerSubtitle">Subtitle Header</Label>
              <Input
                id="headerSubtitle"
                value={data.headerSubtitle}
                onChange={(e) => setData(prev => ({ ...prev, headerSubtitle: e.target.value }))}
                placeholder="Subtitle header"
              />
            </div>
          </CardContent>
        </Card>

        {/* Story Section */}
        <Card>
          <CardHeader>
            <CardTitle>Cerita Kami</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="storyTitle">Judul Cerita</Label>
              <Input
                id="storyTitle"
                value={data.storyTitle}
                onChange={(e) => setData(prev => ({ ...prev, storyTitle: e.target.value }))}
                placeholder="Judul cerita"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Isi Cerita</Label>
                <Button onClick={addStoryContent} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Paragraf
                </Button>
              </div>
              {data.storyContent.map((content, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <textarea
                    className="flex-1 p-2 border rounded-md min-h-[100px] resize-y"
                    value={content}
                    onChange={(e) => updateStoryContent(index, e.target.value)}
                    placeholder={`Paragraf ${index + 1}`}
                  />
                  <Button 
                    onClick={() => removeStoryContent(index)} 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Services Section */}
        <Card>
          <CardHeader>
            <CardTitle>Layanan Kami</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="servicesTitle">Judul Layanan</Label>
              <Input
                id="servicesTitle"
                value={data.servicesTitle}
                onChange={(e) => setData(prev => ({ ...prev, servicesTitle: e.target.value }))}
                placeholder="Judul layanan"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Daftar Layanan</Label>
                <Button onClick={addService} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Layanan
                </Button>
              </div>
              {data.services.map((service, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Layanan {index + 1}</h4>
                    <Button 
                      onClick={() => removeService(index)} 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label>Icon (nama Lucide)</Label>
                      <Input
                        value={service.icon}
                        onChange={(e) => updateService(index, 'icon', e.target.value)}
                        placeholder="Contoh: Truck"
                      />
                    </div>
                    <div>
                      <Label>Judul</Label>
                      <Input
                        value={service.title}
                        onChange={(e) => updateService(index, 'title', e.target.value)}
                        placeholder="Judul layanan"
                      />
                    </div>
                    <div>
                      <Label>Deskripsi</Label>
                      <Input
                        value={service.description}
                        onChange={(e) => updateService(index, 'description', e.target.value)}
                        placeholder="Deskripsi layanan"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Section */}
        <Card>
          <CardHeader>
            <CardTitle>Kenapa Pilih KurirQu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="whyChooseTitle">Judul</Label>
              <Input
                id="whyChooseTitle"
                value={data.whyChooseTitle}
                onChange={(e) => setData(prev => ({ ...prev, whyChooseTitle: e.target.value }))}
                placeholder="Judul"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Keuntungan</Label>
                <Button onClick={addBenefit} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Keuntungan
                </Button>
              </div>
              {data.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    placeholder={`Keuntungan ${index + 1}`}
                  />
                  <Button 
                    onClick={() => removeBenefit(index)} 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card>
          <CardHeader>
            <CardTitle>Call to Action</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ctaTitle">Judul CTA</Label>
              <Input
                id="ctaTitle"
                value={data.ctaTitle}
                onChange={(e) => setData(prev => ({ ...prev, ctaTitle: e.target.value }))}
                placeholder="Judul CTA"
              />
            </div>
            <div>
              <Label htmlFor="ctaDescription">Deskripsi CTA</Label>
              <Input
                id="ctaDescription"
                value={data.ctaDescription}
                onChange={(e) => setData(prev => ({ ...prev, ctaDescription: e.target.value }))}
                placeholder="Deskripsi CTA"
              />
            </div>
            <div>
              <Label htmlFor="ctaButtonText">Teks Tombol</Label>
              <Input
                id="ctaButtonText"
                value={data.ctaButtonText}
                onChange={(e) => setData(prev => ({ ...prev, ctaButtonText: e.target.value }))}
                placeholder="Teks tombol"
              />
            </div>
            <div>
              <Label htmlFor="ctaButtonUrl">URL Tombol</Label>
              <Input
                id="ctaButtonUrl"
                value={data.ctaButtonUrl}
                onChange={(e) => setData(prev => ({ ...prev, ctaButtonUrl: e.target.value }))}
                placeholder="URL tombol"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
