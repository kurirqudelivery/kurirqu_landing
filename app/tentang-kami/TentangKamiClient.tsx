"use client"

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
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function TentangKamiClient() {
  const services = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Antar Paket & Dokumen",
      description: "Kirim paket atau dokumen penting dengan cepat, aman, dan tepat waktu.",
    },
    {
      icon: <UtensilsCrossed className="h-8 w-8" />,
      title: "Antar Makanan",
      description: "Mau makanan favorit? Tinggal chat, kami antar langsung ke lokasi Anda.",
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: "Ojek Motor & Mobil",
      description: "Butuh tumpangan motor atau mobil? Tinggal pesan, kami segera jemput.",
    },
    {
      icon: <CarTaxiFront className="h-8 w-8" />,
      title: "Rental Mobil",
      description: "Sewa mobil harian atau untuk perjalanan khusus, gampang lewat WhatsApp.",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Jasa Bersih-Bersih",
      description: "Rumah, kos, atau kantor jadi lebih bersih tanpa ribet cari orang.",
    },
  ]

  const benefits = [
    "Cuma lewat WhatsApp – pesan apapun cukup chat admin.",
    "Tanpa aplikasi tambahan – gak perlu download atau daftar akun.",
    "Praktis & Cepat – semua layanan bisa diproses dalam hitungan menit.",
    "Layanan lengkap – dari antar paket, makanan, transportasi, sampai bersih-bersih.",
  ]

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang KurirQu</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Solusi praktis untuk semua kebutuhan harian Anda, cukup lewat WhatsApp
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Cerita Kami</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] mx-auto mb-8"></div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-xl mb-8">
                Di tengah kesibukan, orang sering males ribet harus download aplikasi baru cuma buat pesan layanan. Dari
                situ lahirlah <strong className="text-[#6c1618]">KurirQu</strong>: solusi praktis untuk semua kebutuhan
                harian Anda, cukup lewat WhatsApp.
              </p>

              <p className="text-lg mb-8">
                Kami paham hampir semua orang Indonesia pakai WhatsApp setiap hari. Jadi, kami buat segalanya lebih
                gampang: tinggal chat admin, langsung order. Tanpa ribet install aplikasi, tanpa repot bikin akun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Layanan Kami</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] rounded-full flex items-center justify-center text-white mx-auto mb-6">
                      {service.icon}
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Kenapa Pilih KurirQu?</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] mx-auto mb-8"></div>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">💡 Dengan KurirQu, hidup jadi lebih mudah.</h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Karena semua bisa beres hanya lewat satu chat di WhatsApp.
              </p>
            </div>

            <Button
              size="lg"
              className="bg-white text-[#6c1618] hover:bg-gray-100 text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => window.open("https://wa.link/dvsne2", "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat Admin Sekarang
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
