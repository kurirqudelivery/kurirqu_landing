"use client"

import { Card } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface TestimonialItem {
  name: string
  role: string
  content: string
  avatarUrl: string
  rating: number
  order: number
}

interface TestimonialsData {
  title: string
  subtitle: string
  testimonials: TestimonialItem[]
}

export function TestimonialsSection() {
  const [testimonialsData, setTestimonialsData] = useState<TestimonialsData>({
    title: 'Testimoni Pelanggan',
    subtitle: 'Apa kata pelanggan kami tentang layanan kami',
    testimonials: [
      {
        name: "Budi Santoso",
        role: "Pemilik Toko Online",
        content: "Layanan KurirQu sangat memuaskan, pengiriman cepat dan aman.",
        avatarUrl: "/placeholder-user.jpg",
        rating: 5,
        order: 1
      },
      {
        name: "Siti Nurhaliza",
        role: "Pelanggan Setia",
        content: "Saya sangat puas dengan pelayanan KurirQu, recommended!",
        avatarUrl: "/placeholder-user.jpg",
        rating: 5,
        order: 2
      }
    ]
  })
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.testimonials) {
          setTestimonialsData(data.testimonials)
        }
      })
      .catch(error => {
        console.error('Error fetching testimonials content:', error)
      })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonialsData.testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.testimonials.length - 1 : prev - 1))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const sortedTestimonials = testimonialsData.testimonials.sort((a, b) => a.order - b.order)

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{testimonialsData.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {testimonialsData.subtitle}
          </p>
        </div>

        {sortedTestimonials.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8 bg-white shadow-xl">
              <div className="text-center">
                <div className="mb-6">
                  <Image
                    src={sortedTestimonials[currentIndex].avatarUrl || "/placeholder.svg"}
                    alt={sortedTestimonials[currentIndex].name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{sortedTestimonials[currentIndex].name}</h3>
                  <p className="text-gray-600">{sortedTestimonials[currentIndex].role}</p>
                </div>

                <div className="flex justify-center mb-6">{renderStars(sortedTestimonials[currentIndex].rating)}</div>

                <blockquote className="text-lg text-gray-700 italic leading-relaxed max-w-2xl mx-auto">
                  "{sortedTestimonials[currentIndex].content}"
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
              {sortedTestimonials.map((_, index) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada testimoni tersedia.</p>
          </div>
        )}
      </div>
    </section>
  )
}
