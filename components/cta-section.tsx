"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight, Smartphone, Clock } from "lucide-react"
import Image from "next/image"

interface CTAData {
  title: string
  subtitle: string
  buttonText: string
  buttonUrl: string
  description?: string
  qrCodeUrl?: string
}

export function CTASection() {
  const [ctaData, setCtaData] = useState<CTAData>({
    title: 'Siap Untuk Memesan?',
    subtitle: 'Bergabunglah dengan ribuan pelanggan yang sudah merasakan kemudahan layanan KurirQu',
    buttonText: 'Hubungi KurirQu',
    buttonUrl: 'https://wa.link/dvsne2',
    description: 'Pesan sekarang dan nikmati pengiriman cepat, aman, dan terpercaya!'
  })

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.cta) {
          setCtaData(data.cta)
        }
      })
      .catch(error => {
        console.error('Error fetching CTA content:', error)
      })
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">{ctaData.title}</h2>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              {ctaData.subtitle}
            </p>
            {ctaData.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {ctaData.description}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - QR Code */}
            <div className="text-center md:text-left">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-md mx-auto md:mx-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Scan & Pesan Langsung!</h3>
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-6 mb-6">
                  <Image
                    src={ctaData.qrCodeUrl || "https://i.postimg.cc/Gpk5wtbR/kurirqudirect.png"}
                    alt="QR Code WhatsApp KurirQu"
                    width={200}
                    height={200}
                    className="mx-auto rounded-xl"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                  <Smartphone className="h-5 w-5" />
                  <span className="font-medium">Buka kamera HP Anda</span>
                </div>
                <p className="text-sm text-gray-500">Arahkan ke QR code dan langsung terhubung ke WhatsApp kami</p>
              </div>
            </div>

            {/* Right Column - CTA Button and Benefits */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Atau Klik Tombol di Bawah</h3>

              <Button
                size="lg"
                className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] hover:from-[#5a1315] hover:to-[#9a1719] text-white rounded-full px-12 py-6 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-8"
                onClick={() => window.open(ctaData.buttonUrl, "_blank")}
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                {ctaData.buttonText}
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] rounded-full"></div>
                  <span className="font-medium">Respon cepat dalam 5 menit</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] rounded-full"></div>
                  <span className="font-medium">Konsultasi gratis untuk kebutuhan Anda</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] rounded-full"></div>
                  <span className="font-medium">Tim profesional siap melayani 24/7</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">Layanan 24/7!</span>
                </div>
                <p className="text-sm text-blue-600">
                  Kami siap melayani kebutuhan pengiriman Anda kapan saja. Tim profesional kami standby untuk memberikan
                  pelayanan terbaik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
