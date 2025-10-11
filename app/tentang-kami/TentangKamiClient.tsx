"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Truck,
  UtensilsCrossed,
  Car,
  CarTaxiFront,
  Sparkles,
  CheckCircle,
  MessageCircle,
  ArrowLeft,
  LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

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

const iconMap: Record<string, LucideIcon> = {
  Truck,
  UtensilsCrossed,
  Car,
  CarTaxiFront,
  Sparkles,
}

export default function TentangKamiClient() {
  const [data, setData] = useState<TentangKamiData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/tentang-kami')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching Tentang Kami data:', error)
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

  const getServiceIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Truck
    return <IconComponent className="h-8 w-8" />
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Kembali ke Beranda
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.headerTitle}</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {data.headerSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{data.storyTitle}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] mx-auto mb-8"></div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {data.storyContent.map((paragraph, index) => (
                <p key={index} className={`${index === 0 ? 'text-xl mb-8' : 'text-lg mb-8'}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{data.servicesTitle}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.services.map((service, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] rounded-full flex items-center justify-center text-white mx-auto mb-6">
                      {getServiceIcon(service.icon)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{data.whyChooseTitle}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] mx-auto mb-8"></div>
            </div>

            <div className="space-y-6">
              {data.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{data.ctaTitle}</h2>
              <p className="text-xl text-white/90 leading-relaxed">
                {data.ctaDescription}
              </p>
            </div>

            <Button
              size="lg"
              className="bg-white text-[#6c1618] hover:bg-gray-100 text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => window.open(data.ctaButtonUrl, "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {data.ctaButtonText}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
