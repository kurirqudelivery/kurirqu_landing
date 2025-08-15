"use client"

import { Card } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

const testimonials = [
  {
    name: "Budi Santoso",
    avatar: "/indonesian-man-smiling.png",
    rating: 5,
    text: "Pelayanan KurirQu sangat memuaskan! Kurir selalu tepat waktu dan ramah. Makanan yang dipesan selalu sampai dalam kondisi baik.",
  },
  {
    name: "Sari Dewi",
    avatar: "/indonesian-professional-woman-smiling.png",
    rating: 5,
    text: "Sudah beberapa kali menggunakan jasa KurirQu untuk kirim barang. Selalu aman dan cepat sampai tujuan. Highly recommended!",
  },
  {
    name: "Ahmad Rahman",
    avatar: "/young-indonesian-man-happy.png",
    rating: 5,
    text: "Aplikasi mudah digunakan, harga terjangkau, dan pelayanan excellent. KurirQu adalah pilihan terbaik untuk delivery di kota ini.",
  },
  {
    name: "Maya Putri",
    avatar: "/indonesian-woman-headshot.png",
    rating: 4,
    text: "Sangat puas dengan layanan transportasi KurirQu. Driver profesional dan kendaraan bersih. Pasti akan menggunakan lagi.",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Testimoni Pelanggan</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dengar langsung dari pelanggan yang puas dengan layanan kami
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="p-8 bg-white shadow-xl">
            <div className="text-center">
              <div className="mb-6">
                <Image
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900">{testimonials[currentIndex].name}</h3>
              </div>

              <div className="flex justify-center mb-6">{renderStars(testimonials[currentIndex].rating)}</div>

              <blockquote className="text-lg text-gray-700 italic leading-relaxed max-w-2xl mx-auto">
                "{testimonials[currentIndex].text}"
              </blockquote>
            </div>
          </Card>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#af1b1c] transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#af1b1c] transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-gradient-to-r from-[#6c1618] to-[#af1b1c]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
