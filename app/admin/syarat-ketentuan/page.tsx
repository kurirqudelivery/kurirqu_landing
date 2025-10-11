"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'

interface Section {
  title: string
  content: string[]
}

interface SyaratKetentuanData {
  headerTitle: string
  headerSubtitle: string
  lastUpdated: string
  sections: Section[]
}

export default function SyaratKetentuanAdmin() {
  const [data, setData] = useState<SyaratKetentuanData>({
    headerTitle: "",
    headerSubtitle: "",
    lastUpdated: "",
    sections: []
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/syarat-ketentuan')
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
      const response = await fetch('/api/admin/syarat-ketentuan', {
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

  const addSection = () => {
    setData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: "", content: [""] }]
    }))
  }

  const updateSectionTitle = (index: number, value: string) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === index ? { ...section, title: value } : section
      )
    }))
  }

  const addSectionContent = (sectionIndex: number) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === sectionIndex 
          ? { ...section, content: [...section.content, ""] }
          : section
      )
    }))
  }

  const updateSectionContent = (sectionIndex: number, contentIndex: number, value: string) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === sectionIndex 
          ? { 
              ...section, 
              content: section.content.map((item, j) => 
                j === contentIndex ? value : item
              )
            }
          : section
      )
    }))
  }

  const removeSectionContent = (sectionIndex: number, contentIndex: number) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === sectionIndex 
          ? { 
              ...section, 
              content: section.content.filter((_, j) => j !== contentIndex)
            }
          : section
      )
    }))
  }

  const removeSection = (index: number) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
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
        <h2 className="text-3xl font-bold text-gray-900">Kelola Syarat & Ketentuan</h2>
        <p className="text-gray-600 mt-2">Kelola konten halaman Syarat & Ketentuan</p>
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
            <div>
              <Label htmlFor="lastUpdated">Terakhir Diperbarui</Label>
              <Input
                id="lastUpdated"
                value={data.lastUpdated}
                onChange={(e) => setData(prev => ({ ...prev, lastUpdated: e.target.value }))}
                placeholder="Contoh: 1 Januari 2024"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Daftar Syarat & Ketentuan</CardTitle>
              <Button onClick={addSection} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Tambah Section
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-lg">Section {sectionIndex + 1}</h4>
                  <Button 
                    onClick={() => removeSection(sectionIndex)} 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div>
                  <Label htmlFor={`section-title-${sectionIndex}`}>Judul Section</Label>
                  <Input
                    id={`section-title-${sectionIndex}`}
                    value={section.title}
                    onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                    placeholder="Judul section"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Isi Section</Label>
                    <Button onClick={() => addSectionContent(sectionIndex)} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah Paragraf
                    </Button>
                  </div>
                  {section.content.map((content, contentIndex) => (
                    <div key={contentIndex} className="flex gap-2 mb-2">
                      <textarea
                        className="flex-1 p-2 border rounded-md min-h-[100px] resize-y"
                        value={content}
                        onChange={(e) => updateSectionContent(sectionIndex, contentIndex, e.target.value)}
                        placeholder={`Paragraf ${contentIndex + 1}`}
                      />
                      <Button 
                        onClick={() => removeSectionContent(sectionIndex, contentIndex)} 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {data.sections.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Belum ada section. Klik "Tambah Section" untuk memulai.</p>
              </div>
            )}
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
