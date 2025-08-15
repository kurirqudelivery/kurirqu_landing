import type React from "react"
import { Card } from "@/components/ui/card"
import { Car, UtensilsCrossed, Package } from "lucide-react"

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

export function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Layanan Kami</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Berbagai layanan terpercaya untuk memenuhi kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <ServiceCard
            icon={<Car className="h-8 w-8" />}
            title="Transportasi"
            description="Layanan transportasi cepat dan aman untuk perjalanan Anda dalam kota"
          />
          <ServiceCard
            icon={<UtensilsCrossed className="h-8 w-8" />}
            title="Pesan Makanan"
            description="Pesan makanan favorit Anda dari berbagai restoran dengan pengiriman cepat"
          />
          <ServiceCard
            icon={<Package className="h-8 w-8" />}
            title="Kirim Barang / Delivery"
            description="Kirim barang Anda dengan aman dan tepat waktu ke seluruh kota"
          />
        </div>
      </div>
    </section>
  )
}
