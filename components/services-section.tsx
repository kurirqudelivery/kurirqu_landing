"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { Card } from "@/components/ui/card"
import { Car, UtensilsCrossed, Package, Truck, Zap, Clock } from "lucide-react"

interface Service {
  title: string
  description: string
  icon: string
  order: number
}

interface ServicesData {
  title: string
  subtitle: string
  services: Service[]
}

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className="p-6 bg-white border-t-4 border-t-transparent hover:border-t-[#af1b1c] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <div className="mb-4 flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </Card>
  )
}

function getIcon(iconName: string) {
  switch (iconName) {
    case 'car':
      return <Car className="h-8 w-8" />
    case 'utensils':
      return <UtensilsCrossed className="h-8 w-8" />
    case 'package':
      return <Package className="h-8 w-8" />
    case 'truck':
      return <Truck className="h-8 w-8" />
    case 'zap':
      return <Zap className="h-8 w-8" />
    case 'clock':
      return <Clock className="h-8 w-8" />
    default:
      return <Package className="h-8 w-8" />
  }
}

export function ServicesSection() {
  const [servicesData, setServicesData] = useState<ServicesData>({
    title: 'Layanan Kami',
    subtitle: 'Berbagai layanan terpercaya untuk memenuhi kebutuhan Anda',
    services: [
      {
        title: 'Transportasi',
        description: 'Layanan transportasi cepat dan aman untuk perjalanan Anda dalam kota',
        icon: 'car',
        order: 1
      },
      {
        title: 'Pesan Makanan',
        description: 'Pesan makanan favorit Anda dari berbagai restoran dengan pengiriman cepat',
        icon: 'utensils',
        order: 2
      },
      {
        title: 'Kirim Barang / Delivery',
        description: 'Kirim barang Anda dengan aman dan tepat waktu ke seluruh kota',
        icon: 'package',
        order: 3
      }
    ]
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.services) {
          setServicesData(data.services)
        }
      })
      .catch(error => {
        console.error('Error fetching services content:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {loading ? (
            <>
              <div className="h-10 w-64 mx-auto skeleton mb-4" />
              <div className="h-6 w-96 mx-auto skeleton" />
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{servicesData.title}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {servicesData.subtitle}
              </p>
            </>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-white rounded-lg shadow-lg">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 skeleton rounded-full" />
                </div>
                <div className="h-6 w-32 mx-auto skeleton mb-3" />
                <div className="h-4 w-full skeleton mb-1" />
                <div className="h-4 w-3/4 mx-auto skeleton" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {servicesData.services
              .sort((a, b) => a.order - b.order)
              .map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={getIcon(service.icon)}
                  title={service.title}
                  description={service.description}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  )
}
