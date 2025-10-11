"use client"

import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface SiteSettings {
  siteName: string
  logoUrl: string
  whatsapp: string
}

interface PartnershipSettings {
  showPartnershipMenu: boolean
  partnershipButtonText: string
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'KurirQu',
    logoUrl: 'https://kurirqu-landing.vercel.app/assets/img/logo/kurirqu-logo.png',
    whatsapp: 'https://wa.link/dvsne2'
  })
  const [partnershipSettings, setPartnershipSettings] = useState<PartnershipSettings>({
    showPartnershipMenu: false,
    partnershipButtonText: 'Jadilah Mitra Kami'
  })
  const pathname = usePathname()

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings')
        const data = await response.json()
        setSettings({
          siteName: data.siteName || 'KurirQu',
          logoUrl: data.logoUrl || 'https://kurirqu-landing.vercel.app/assets/img/logo/kurirqu-logo.png',
          whatsapp: data.whatsapp || 'https://wa.link/dvsne2'
        })
      } catch (error) {
        console.error('Error fetching settings:', error)
      }
    }
    
    const fetchPartnershipSettings = async () => {
      try {
        const response = await fetch('/api/partnership-settings')
        const data = await response.json()
        setPartnershipSettings(data)
      } catch (error) {
        console.error('Error fetching partnership settings:', error)
      }
    }
    
    fetchSettings()
    fetchPartnershipSettings()
  }, [])

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/tentang-kami", label: "Tentang Kami" },
    { href: "/syarat-ketentuan", label: "Syarat & Ketentuan" },
    { href: "/kebijakan-privasi", label: "Kebijakan Privasi" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="relative z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={settings.logoUrl}
              alt={`${settings.siteName} Logo`}
              width={40}
              height={40}
              className="transition-transform duration-300 hover:scale-105"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-[#6c1618] to-[#af1b1c] bg-clip-text text-transparent">
              {settings.siteName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-300 font-medium ${
                  isActive(link.href)
                    ? "text-[#6c1618] border-b-2 border-[#6c1618] pb-1"
                    : "text-gray-700 hover:text-[#6c1618]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {partnershipSettings.showPartnershipMenu ? (
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] hover:from-[#5a1315] hover:to-[#9a1719] text-white rounded-full px-6 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = '/jadilah-mitra'}
              >
                <Phone className="mr-2 h-4 w-4" />
                {partnershipSettings.partnershipButtonText}
              </Button>
            ) : (
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] hover:from-[#5a1315] hover:to-[#9a1719] text-white rounded-full px-6 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => window.open(settings.whatsapp, "_blank")}
              >
                <Phone className="mr-2 h-4 w-4" />
                Hubungi Kami
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-300 font-medium py-2 ${
                    isActive(link.href) ? "text-[#6c1618] font-semibold" : "text-gray-700 hover:text-[#6c1618]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {partnershipSettings.showPartnershipMenu ? (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] hover:from-[#5a1315] hover:to-[#9a1719] text-white rounded-full px-6 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-fit"
                  onClick={() => {
                    window.location.href = '/jadilah-mitra'
                    setIsMenuOpen(false)
                  }}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {partnershipSettings.partnershipButtonText}
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] hover:from-[#5a1315] hover:to-[#9a1719] text-white rounded-full px-6 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-fit"
                  onClick={() => {
                    window.open(settings.whatsapp, "_blank")
                    setIsMenuOpen(false)
                  }}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Hubungi Kami
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
