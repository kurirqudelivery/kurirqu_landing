"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  {
    src: "/food-delivery-motorcycle.png",
    alt: "Kurir mengantarkan makanan",
    caption: "Pengiriman makanan cepat dan aman",
  },
  {
    src: "/delivery-courier.png",
    alt: "Kurir dengan paket",
    caption: "Layanan pengiriman barang terpercaya",
  },
  {
    src: "/pelanggan-terima-pesanan.png",
    alt: "Pelanggan senang menerima pesanan",
    caption: "Kepuasan pelanggan adalah prioritas",
  },
  {
    src: "/placeholder-ocufs.png",
    alt: "Kurir motor di jalan",
    caption: "Navigasi cepat melalui lalu lintas",
  },
  {
    src: "/kurir-siapkan-pesanan.png",
    alt: "Tim kurir menyiapkan pesanan",
    caption: "Tim profesional siap melayani",
  },
  {
    src: "/customer-ordering-service-app.png",
    alt: "Pelanggan memesan via aplikasi",
    caption: "Pemesanan mudah melalui WhatsApp",
  },
]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-r from-[#6c1618] to-[#af1b1c]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Galeri Layanan</h2>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Lihat bagaimana kami melayani pelanggan dengan dedikasi tinggi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                <p className="text-white text-center px-4 pb-4 font-medium">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <div className="max-w-4xl max-h-full">
              <Image
                src={galleryImages[selectedImage].src || "/placeholder.svg"}
                alt={galleryImages[selectedImage].alt}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />
              <p className="text-white text-center mt-4 text-lg">{galleryImages[selectedImage].caption}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
