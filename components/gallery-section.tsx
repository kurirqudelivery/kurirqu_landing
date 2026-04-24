"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryItem {
  title: string
  description: string
  imageUrl: string
  order: number
}

interface GalleryData {
  title: string
  subtitle: string
  images: GalleryItem[]
}

export function GallerySection() {
  const [galleryData, setGalleryData] = useState<GalleryData>({
    title: 'Galeri Layanan',
    subtitle: 'Lihat bagaimana kami melayani pelanggan dengan dedikasi tinggi',
    images: [
      {
        title: 'Pengiriman Makanan',
        description: 'Kurir mengantarkan makanan dengan cepat dan aman',
        imageUrl: '/food-delivery-motorcycle.png',
        order: 1
      },
      {
        title: 'Layanan Pengiriman',
        description: 'Kurir dengan paket siap dikirim',
        imageUrl: '/delivery-courier.png',
        order: 2
      }
    ]
  })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.gallery) {
          setGalleryData(data.gallery)
        }
      })
      .catch(error => {
        console.error('Error fetching gallery content:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const sortedImages = galleryData.images.sort((a, b) => a.order - b.order)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % sortedImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? sortedImages.length - 1 : selectedImage - 1)
    }
  }

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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{galleryData.title}</h2>
              <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                {galleryData.subtitle}
              </p>
            </>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 skeleton-dark rounded-lg" />
            ))}
          </div>
        ) : sortedImages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {sortedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.imageUrl || "/placeholder.svg"}
                    alt={image.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                    <p className="text-white text-center px-4 pb-4 font-medium">{image.description}</p>
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
                    src={sortedImages[selectedImage].imageUrl || "/placeholder.svg"}
                    alt={sortedImages[selectedImage].title}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain"
                  />
                  <p className="text-white text-center mt-4 text-lg">{sortedImages[selectedImage].description}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/70">Belum ada gambar galeri tersedia.</p>
          </div>
        )}
      </div>
    </section>
  )
}
