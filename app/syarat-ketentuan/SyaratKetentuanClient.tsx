"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, FileText, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function SyaratKetentuanClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Syarat & Ketentuan</h1>
          <p className="text-xl text-white/90">Ketentuan penggunaan layanan KurirQu</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Terakhir diperbarui: 1 Januari 2025</span>
            </div>
            <p className="text-blue-600">
              Dengan menggunakan layanan KurirQu, Anda menyetujui syarat dan ketentuan berikut.
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#af1b1c]" />
                  1. Definisi Layanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  KurirQu adalah layanan pengiriman dan kurir yang melayani wilayah Blitar dan sekitarnya. Layanan kami
                  meliputi:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Pengiriman dokumen dan paket</li>
                  <li>Layanan antar makanan dan minuman</li>
                  <li>Belanja dan pengiriman barang</li>
                  <li>Layanan kurir ekspres</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#af1b1c]" />
                  2. Tanggung Jawab Pengguna
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Memberikan informasi yang akurat mengenai alamat pengiriman dan penerima</li>
                  <li>Memastikan barang yang dikirim tidak melanggar hukum atau berbahaya</li>
                  <li>Membayar biaya layanan sesuai dengan tarif yang telah disepakati</li>
                  <li>Memberikan akses yang memadai untuk proses pengambilan dan pengiriman</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#af1b1c]" />
                  3. Barang yang Tidak Dapat Dikirim
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>KurirQu tidak menerima pengiriman untuk barang-barang berikut:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Barang ilegal, narkoba, atau zat terlarang</li>
                  <li>Senjata api, bahan peledak, atau bahan berbahaya</li>
                  <li>Uang tunai dalam jumlah besar</li>
                  <li>Barang mudah rusak tanpa kemasan yang memadai</li>
                  <li>Hewan hidup</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Tarif dan Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Tarif dihitung berdasarkan jarak, berat, dan jenis layanan</li>
                  <li>Pembayaran dapat dilakukan secara tunai atau transfer</li>
                  <li>Biaya tambahan dapat dikenakan untuk layanan di luar jam operasional</li>
                  <li>Tarif dapat berubah sewaktu-waktu dengan pemberitahuan sebelumnya</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Tanggung Jawab KurirQu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Mengantarkan barang sesuai dengan alamat yang diberikan</li>
                  <li>Menjaga keamanan barang selama proses pengiriman</li>
                  <li>Memberikan konfirmasi pengiriman kepada pengirim</li>
                  <li>Mengganti kerugian sesuai dengan ketentuan asuransi yang berlaku</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Pembatasan Tanggung Jawab</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>KurirQu tidak bertanggung jawab atas keterlambatan akibat force majeure</li>
                  <li>Ganti rugi maksimal sebesar nilai barang atau Rp 500.000, mana yang lebih kecil</li>
                  <li>Tidak bertanggung jawab atas kerusakan akibat kemasan yang tidak memadai</li>
                  <li>Klaim kerugian harus dilaporkan maksimal 24 jam setelah pengiriman</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Perubahan Syarat & Ketentuan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  KurirQu berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan melalui
                  website atau media komunikasi resmi kami. Penggunaan layanan setelah perubahan dianggap sebagai
                  persetujuan terhadap syarat dan ketentuan yang baru.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Untuk pertanyaan lebih lanjut mengenai syarat dan ketentuan ini, silakan hubungi kami.
            </p>
            <Button
              className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] hover:from-[#5a1315] hover:to-[#9a1719] text-white"
              onClick={() => window.open("https://wa.link/dvsne2", "_blank")}
            >
              Hubungi KurirQu
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
