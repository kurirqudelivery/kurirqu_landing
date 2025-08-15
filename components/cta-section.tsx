import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Siap Untuk Memesan?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Jangan tunggu lagi! Hubungi kami sekarang melalui WhatsApp dan rasakan kemudahan layanan KurirQu
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] hover:from-[#5a1315] hover:to-[#9a1719] text-white rounded-full px-12 py-6 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="mr-3 h-6 w-6" />
            Hubungi WhatsApp
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>

          <p className="text-gray-500 mt-4">Respon cepat dalam 5 menit</p>
        </div>
      </div>
    </section>
  )
}
