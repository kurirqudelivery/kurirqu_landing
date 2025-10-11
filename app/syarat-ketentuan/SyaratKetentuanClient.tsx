"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, FileText, Clock, AlertTriangle, LucideIcon } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

interface Section {
  title: string
  icon?: string
  content: string[]
}

interface SyaratKetentuanData {
  headerTitle: string
  headerSubtitle: string
  lastUpdated: string
  sections: Section[]
  contactButtonText: string
  contactButtonUrl: string
}

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Shield,
  AlertTriangle,
}

export default function SyaratKetentuanClient() {
  const [data, setData] = useState<SyaratKetentuanData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/syarat-ketentuan')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching Syarat & Ketentuan data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6c1618]"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Failed to load content</p>
      </div>
    )
  }

  const getSectionIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || FileText
    return <IconComponent className="h-5 w-5 text-[#af1b1c]" />
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.headerTitle}</h1>
          <p className="text-xl text-white/90">{data.headerSubtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Terakhir diperbarui: {data.lastUpdated}</span>
            </div>
            <p className="text-blue-600">
              Dengan menggunakan layanan KurirQu, Anda menyetujui syarat dan ketentuan berikut.
            </p>
          </div>

          <div className="space-y-8">
            {data.sections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.icon && getSectionIcon(section.icon)}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.content.map((content, contentIndex) => {
                    if (content.includes('<li>')) {
                      // Handle list items
                      const listItems = content.split('<li>').filter(item => item.trim()).map(item => 
                        item.replace('</li>', '').trim()
                      )
                      return (
                        <ul key={contentIndex} className="list-disc list-inside space-y-2 text-gray-700">
                          {listItems.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      )
                    } else {
                      // Handle paragraph content
                      return <p key={contentIndex}>{content}</p>
                    }
                  })}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Untuk pertanyaan lebih lanjut mengenai syarat dan ketentuan ini, silakan hubungi kami.
            </p>
            <Button
              className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] hover:from-[#5a1315] hover:to-[#9a1719] text-white"
              onClick={() => window.open(data.contactButtonUrl, "_blank")}
            >
              {data.contactButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
