"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

interface FooterData {
  companyName: string
  description: string
  address: string
  phone: string
  email: string
  socialLinks: {
    facebook?: string
    instagram?: string
    twitter?: string
    whatsapp?: string
  }
}

export function Footer() {
  const [footerData, setFooterData] = useState<FooterData>({
    companyName: 'KurirQu',
    description: 'Layanan kurir terpercaya yang siap melayani kebutuhan pengiriman Anda 24/7. Kami berkomitmen memberikan pelayanan terbaik dengan harga terjangkau.',
    address: 'Jl. Griya Jati Permai, Sukorejo, Kec. Sukorejo, Kota Blitar, Jawa Timur 66121',
    phone: '+62 822-3641-8724',
    email: 'kurirqublitar@gmail.com',
    socialLinks: {
      facebook: 'https://facebook.com/kurirqu',
      instagram: 'https://instagram.com/kurirqu',
      twitter: 'https://twitter.com/kurirqu',
      whatsapp: 'https://wa.link/dvsne2'
    }
  })

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.footer) {
          setFooterData(data.footer)
        }
      })
      .catch(error => {
        console.error('Error fetching footer content:', error)
      })
  }, [])

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] bg-clip-text text-transparent">
              {footerData.companyName}
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {footerData.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#af1b1c]" />
                <span className="text-gray-300">{footerData.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#af1b1c]" />
                <span className="text-gray-300">{footerData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#af1b1c]" />
                <span className="text-gray-300">{footerData.phone}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <Link href="/tentang-kami" className="text-gray-300 hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Layanan
                </a>
              </li>
              <li>
                <Link href="/syarat-ketentuan" className="text-gray-300 hover:text-white transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-privasi" className="text-gray-300 hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">Dapatkan update terbaru dan promo menarik</p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Email Anda"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="w-full bg-gradient-to-r from-[#6c1618] to-[#af1b1c] hover:from-[#5a1315] hover:to-[#9a1719] text-white">
                Berlangganan
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {footerData.socialLinks.facebook && (
              <a href={footerData.socialLinks.facebook} className="text-gray-400 hover:text-[#af1b1c] transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6" />
              </a>
            )}
            {footerData.socialLinks.instagram && (
              <a href={footerData.socialLinks.instagram} className="text-gray-400 hover:text-[#af1b1c] transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6" />
              </a>
            )}
            {footerData.socialLinks.twitter && (
              <a href={footerData.socialLinks.twitter} className="text-gray-400 hover:text-[#af1b1c] transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-6 w-6" />
              </a>
            )}
          </div>

          <p className="text-gray-400 text-center md:text-right">© 2025 {footerData.companyName}. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
