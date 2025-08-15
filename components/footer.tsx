import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#6c1618] to-[#af1b1c] bg-clip-text text-transparent">
              KurirQu
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Layanan kurir terpercaya yang siap melayani kebutuhan pengiriman Anda 24/7. Kami berkomitmen memberikan
              pelayanan terbaik dengan harga terjangkau.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#af1b1c]" />
                <span className="text-gray-300">
                  Jl. Griya Jati Permai, Sukorejo, Kec. Sukorejo, Kota Blitar, Jawa Timur 66121
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#af1b1c]" />
                <span className="text-gray-300">info@kurirqu.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#af1b1c]" />
                <span className="text-gray-300">+62 822-3641-8724</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Kebijakan Privasi
                </a>
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
            <a href="#" className="text-gray-400 hover:text-[#af1b1c] transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#af1b1c] transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#af1b1c] transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
          </div>

          <p className="text-gray-400 text-center md:text-right">© 2025 KurirQu. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
