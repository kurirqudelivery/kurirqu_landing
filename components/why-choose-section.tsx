"use client"

import { MessageCircle, Smartphone, Users, Clock, CheckCircle, Headphones, Star, Shield, Truck } from "lucide-react"
import { useEffect, useState } from "react"

interface WhyChooseItem {
  title: string
  description: string
  icon: string
  order: number
}

interface WhyChooseData {
  title: string
  subtitle: string
  items: WhyChooseItem[]
}

function getIcon(iconName: string) {
  switch (iconName) {
    case 'message-circle':
      return <MessageCircle className="h-8 w-8" />
    case 'clock':
      return <Clock className="h-8 w-8" />
    case 'smartphone':
      return <Smartphone className="h-8 w-8" />
    case 'users':
      return <Users className="h-8 w-8" />
    case 'check-circle':
      return <CheckCircle className="h-8 w-8" />
    case 'headphones':
      return <Headphones className="h-8 w-8" />
    case 'star':
      return <Star className="h-8 w-8" />
    case 'shield':
      return <Shield className="h-8 w-8" />
    case 'truck':
      return <Truck className="h-8 w-8" />
    default:
      return <CheckCircle className="h-8 w-8" />
  }
}

export function WhyChooseSection() {
  const [whyChooseData, setWhyChooseData] = useState<WhyChooseData>({
    title: 'Kenapa Pilih KurirQu?',
    subtitle: 'Kemudahan pesan via WhatsApp tanpa ribet, langsung chat dan kirim!',
    items: [
      {
        title: 'Tanpa Install Aplikasi',
        description: 'Cukup gunakan WhatsApp yang sudah ada di HP Anda, tidak perlu download aplikasi tambahan',
        icon: 'message-circle',
        order: 1
      },
      {
        title: 'Komunikasi Real-Time',
        description: 'Update status pengiriman langsung via chat, foto bukti pengiriman, dan konfirmasi instan',
        icon: 'clock',
        order: 2
      },
      {
        title: 'Interface Familiar',
        description: 'Semua orang sudah terbiasa dengan WhatsApp, mudah digunakan untuk segala usia',
        icon: 'smartphone',
        order: 3
      },
      {
        title: 'Kontak Langsung Kurir',
        description: 'Bisa langsung chat atau telepon kurir untuk koordinasi lokasi dan waktu pengiriman',
        icon: 'users',
        order: 4
      },
      {
        title: 'Konfirmasi Mudah',
        description: 'Konfirmasi pesanan, alamat, dan pembayaran cukup dengan sekali chat di WhatsApp',
        icon: 'check-circle',
        order: 5
      },
      {
        title: 'Customer Service 24/7',
        description: 'Tim support siap membantu kapan saja melalui WhatsApp untuk keluhan atau pertanyaan',
        icon: 'headphones',
        order: 6
      }
    ]
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.whyChoose) {
          setWhyChooseData(data.whyChoose)
        }
      })
      .catch(error => {
        console.error('Error fetching why-choose content:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const sortedItems = whyChooseData.items.sort((a, b) => a.order - b.order)

  return (
    <section className="py-20 bg-gradient-to-r from-[#6c1618] to-[#af1b1c]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {loading ? (
            <>
              <div className="h-10 w-64 mx-auto skeleton-dark mb-4" />
              <div className="h-6 w-96 mx-auto skeleton-dark" />
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{whyChooseData.title}</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                {whyChooseData.subtitle}
              </p>
            </>
          )}
        </div>

        {loading ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-6">
                <div className="w-16 h-16 skeleton-dark rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-6 w-48 skeleton-dark mb-2" />
                  <div className="h-4 w-full skeleton-dark mb-1" />
                  <div className="h-4 w-3/4 skeleton-dark" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {sortedItems.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group flex items-center gap-6"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(item.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/90 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
