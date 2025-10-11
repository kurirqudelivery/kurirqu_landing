"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import Image from "next/image"
import { Navbar } from "./navbar"

interface HeroData {
  title: string
  subtitle: string
  logoUrl?: string
  whatsappUrl?: string
  instructions?: {
    step1?: string
    step2?: string
    step3?: string
  }
}

export function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData>({
    title: 'Kirim Apapun Bisa Dengan KurirQu',
    subtitle: 'Kami siap melayani dengan sepenuh hati',
    logoUrl: 'https://kurirqu-landing.vercel.app/assets/img/logo/kurirqu-logo.png',
    whatsappUrl: 'https://wa.link/dvsne2',
    instructions: {
      step1: 'Hubungi via WhatsApp',
      step2: 'Sampaikan Detail Pesanan',
      step3: 'Pesanan Diproses'
    }
  })

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.hero) {
          setHeroData(data.hero)
        }
      })
      .catch(error => {
        console.error('Error fetching hero content:', error)
      })
  }, [])

  return (
    <section className="relative h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/80 pointer-events-none" />

      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <div className="relative group">
                <Image
                  src={heroData.logoUrl || 'https://kurirqu-landing.vercel.app/assets/img/logo/kurirqu-logo.png'}
                  alt="KurirQu Logo"
                  width={150}
                  height={150}
                  className="transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
                />
              </div>
            </div>

            {/* Main heading */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {heroData.title.split(' ').map((word, index) => 
                word === 'KurirQu' ? (
                  <span key={index} className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] bg-clip-text text-transparent">
                    {word}{' '}
                  </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              {heroData.subtitle}
            </p>

            {/* CTA Button */}
            <div className="mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] hover:from-[#5a1315] hover:to-[#9a1719] text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => window.open(heroData.whatsappUrl || 'https://wa.link/dvsne2', "_blank")}
              >
                <Phone className="mr-2 h-5 w-5" />
                Pesan Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 rounded-2xl p-4 max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Proses Pemesanan Sederhana:</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <span>{heroData.instructions?.step1 || 'Hubungi via WhatsApp'}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 rotate-90 md:rotate-0" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <span>{heroData.instructions?.step2 || 'Sampaikan Detail Pesanan'}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 rotate-90 md:rotate-0" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <span>{heroData.instructions?.step3 || 'Pesanan Diproses'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
