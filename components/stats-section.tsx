"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Users, Truck, ShoppingBag, TrendingUp, Award, MapPin } from "lucide-react"
import { useEffect, useState } from "react"

interface StatItem {
  label: string
  value: string
  description: string
  order: number
}

interface StatsData {
  title: string
  subtitle: string
  stats: StatItem[]
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  description: string
}

function StatCard({ icon, label, value, description }: StatCardProps) {
  const [count, setCount] = useState(0)
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    // Extract numeric value from string (handle "10,000+" format)
    const numericValue = parseInt(value.replace(/[^\d]/g, '')) || 0
    const hasPlus = value.includes('+')
    const hasK = value.includes('K') || value.includes('k')
    const hasYear = value.includes('Tahun') || value.includes('Year')
    
    const duration = 2000
    const steps = 60
    const increment = numericValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        // Format the display value based on original format
        if (hasYear) {
          setDisplayValue(value)
        } else if (hasK) {
          setDisplayValue(`${(numericValue / 1000).toFixed(0)}+K`)
        } else if (hasPlus) {
          setDisplayValue(`${numericValue.toLocaleString()}+`)
        } else {
          setDisplayValue(numericValue.toLocaleString())
        }
        clearInterval(timer)
      } else {
        const floorValue = Math.floor(current)
        if (hasYear) {
          setDisplayValue(value)
        } else if (hasK) {
          setDisplayValue(`${(floorValue / 1000).toFixed(0)}+K`)
        } else if (hasPlus) {
          setDisplayValue(`${floorValue.toLocaleString()}+`)
        } else {
          setDisplayValue(floorValue.toLocaleString())
        }
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <Card className="p-6 text-center bg-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="mb-4 flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] rounded-full flex items-center justify-center text-white">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">
        {displayValue}
      </div>
      <div className="text-gray-600 font-medium mb-1">{label}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </Card>
  )
}

function getIcon(index: number) {
  const icons = [<Truck className="h-8 w-8" />, <Users className="h-8 w-8" />, <MapPin className="h-8 w-8" />, <Award className="h-8 w-8" />, <TrendingUp className="h-8 w-8" />, <ShoppingBag className="h-8 w-8" />]
  return icons[index % icons.length]
}

export function StatsSection() {
  const [statsData, setStatsData] = useState<StatsData>({
    title: 'Statistik Kami',
    subtitle: 'Bukti komitmen kami dalam melayani Anda',
    stats: [
      {
        label: 'Pengiriman Sukses',
        value: '10,000+',
        description: 'Paket berhasil dikirim',
        order: 1
      },
      {
        label: 'Pelanggan Puas',
        value: '5,000+',
        description: 'Pelanggan setia',
        order: 2
      },
      {
        label: 'Kota Terlayani',
        value: '50+',
        description: 'Kota di seluruh Indonesia',
        order: 3
      },
      {
        label: 'Pengalaman',
        value: '5+',
        description: 'Tahun berpengalaman',
        order: 4
      }
    ]
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.stats) {
          setStatsData(data.stats)
        }
      })
      .catch(error => {
        console.error('Error fetching stats content:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <section className="py-20 bg-gradient-to-r from-[#6c1618] to-[#af1b1c]">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-16">
          {loading ? (
            <>
              <div className="h-10 w-64 mx-auto skeleton-dark mb-4" />
              <div className="h-6 w-96 mx-auto skeleton-dark" />
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold text-white mb-4">{statsData.title}</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                {statsData.subtitle}
              </p>
            </>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 text-center bg-white/10 rounded-xl">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 skeleton-dark rounded-full" />
                </div>
                <div className="h-8 w-20 mx-auto skeleton-dark mb-2" />
                <div className="h-5 w-28 mx-auto skeleton-dark mb-1" />
                <div className="h-4 w-32 mx-auto skeleton-dark" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {(statsData.stats || [])
              .sort((a, b) => a.order - b.order)
              .map((stat, index) => (
                <StatCard
                  key={index}
                  icon={getIcon(index)}
                  label={stat.label}
                  value={stat.value}
                  description={stat.description}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  )
}
