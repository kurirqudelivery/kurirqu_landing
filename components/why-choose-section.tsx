"use client"

import { MessageCircle, Smartphone, Users, Clock, CheckCircle, Headphones } from "lucide-react"

export function WhyChooseSection() {
  const reasons = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Tanpa Install Aplikasi",
      description: "Cukup gunakan WhatsApp yang sudah ada di HP Anda, tidak perlu download aplikasi tambahan",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Komunikasi Real-Time",
      description: "Update status pengiriman langsung via chat, foto bukti pengiriman, dan konfirmasi instan",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Interface Familiar",
      description: "Semua orang sudah terbiasa dengan WhatsApp, mudah digunakan untuk segala usia",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Kontak Langsung Kurir",
      description: "Bisa langsung chat atau telepon kurir untuk koordinasi lokasi dan waktu pengiriman",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Konfirmasi Mudah",
      description: "Konfirmasi pesanan, alamat, dan pembayaran cukup dengan sekali chat di WhatsApp",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Customer Service 24/7",
      description: "Tim support siap membantu kapan saja melalui WhatsApp untuk keluhan atau pertanyaan",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-[#6c1618] to-[#af1b1c]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Kenapa Pilih KurirQu?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Kemudahan pesan via WhatsApp tanpa ribet, langsung chat dan kirim!
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{reason.title}</h3>
                <p className="text-white/90 leading-relaxed">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
