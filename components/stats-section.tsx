"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Users, Truck, ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number
  suffix?: string
}

function StatCard({ icon, label, value, suffix = "" }: StatCardProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
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
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </Card>
  )
}

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#6c1618] to-[#af1b1c]">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Dipercaya Ribuan Pelanggan</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pelanggan yang telah merasakan layanan pengiriman terpercaya dari KurirQu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <StatCard icon={<Truck className="h-8 w-8" />} label="Layanan" value={10} />
          <StatCard icon={<Users className="h-8 w-8" />} label="Kurir" value={20} />
          <StatCard icon={<ShoppingBag className="h-8 w-8" />} label="Order Masuk" value={1463} />
        </div>
      </div>
    </section>
  )
}
