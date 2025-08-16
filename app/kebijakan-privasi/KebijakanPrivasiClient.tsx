"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from "lucide-react"
import Link from "next/link"

export default function KebijakanPrivasiClient() {
  return (
    <div className="min-h-screen bg-white">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kebijakan Privasi</h1>
          <p className="text-xl text-white/90">Komitmen kami dalam melindungi data pribadi Anda</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">Privasi Anda adalah Prioritas Kami</span>
            </div>
            <p className="text-green-600">
              KurirQu berkomitmen untuk melindungi dan menghormati privasi data pribadi Anda.
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-[#af1b1c]" />
                  1. Informasi yang Kami Kumpulkan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Kami mengumpulkan informasi berikut untuk memberikan layanan terbaik:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Informasi Pribadi:</strong> Nama, nomor telepon, alamat email
                  </li>
                  <li>
                    <strong>Informasi Alamat:</strong> Alamat pengambilan dan pengiriman
                  </li>
                  <li>
                    <strong>Informasi Transaksi:</strong> Detail pesanan, metode pembayaran
                  </li>
                  <li>
                    <strong>Informasi Komunikasi:</strong> Riwayat chat WhatsApp untuk keperluan layanan
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-[#af1b1c]" />
                  2. Bagaimana Kami Menggunakan Informasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Informasi yang dikumpulkan digunakan untuk:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Memproses dan melaksanakan pesanan pengiriman</li>
                  <li>Berkomunikasi dengan Anda mengenai status pesanan</li>
                  <li>Memberikan layanan pelanggan yang optimal</li>
                  <li>Meningkatkan kualitas layanan kami</li>
                  <li>Mengirimkan informasi promosi (dengan persetujuan Anda)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-[#af1b1c]" />
                  3. Keamanan Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Kami menerapkan langkah-langkah keamanan untuk melindungi data Anda:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Enkripsi data sensitif selama transmisi</li>
                  <li>Akses terbatas hanya untuk karyawan yang berwenang</li>
                  <li>Penyimpanan data di server yang aman</li>
                  <li>Pemantauan keamanan secara berkala</li>
                  <li>Backup data secara rutin untuk mencegah kehilangan</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-[#af1b1c]" />
                  4. Berbagi Informasi dengan Pihak Ketiga
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Kami tidak menjual atau menyewakan data pribadi Anda. Informasi hanya dibagikan dalam kondisi berikut:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Dengan persetujuan eksplisit dari Anda</li>
                  <li>Untuk memenuhi kewajiban hukum</li>
                  <li>Kepada mitra kurir untuk keperluan pengiriman</li>
                  <li>Dalam situasi darurat untuk melindungi keselamatan</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Hak-Hak Anda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Sebagai pengguna layanan KurirQu, Anda memiliki hak untuk:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Mengakses data pribadi yang kami simpan</li>
                  <li>Meminta koreksi data yang tidak akurat</li>
                  <li>Meminta penghapusan data pribadi Anda</li>
                  <li>Menolak penggunaan data untuk tujuan pemasaran</li>
                  <li>Meminta portabilitas data Anda</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cookies dan Teknologi Pelacakan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Website kami menggunakan cookies untuk meningkatkan pengalaman pengguna. Cookies membantu kami
                  memahami preferensi Anda dan memberikan layanan yang lebih personal. Anda dapat mengatur browser untuk
                  menolak cookies, namun hal ini mungkin mempengaruhi fungsionalitas website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Penyimpanan Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Data pribadi Anda akan disimpan selama diperlukan untuk memberikan layanan atau sesuai dengan
                  ketentuan hukum yang berlaku. Data transaksi akan disimpan minimal 5 tahun untuk keperluan audit dan
                  perpajakan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Perubahan Kebijakan Privasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Kebijakan privasi ini dapat diperbarui sewaktu-waktu untuk mencerminkan perubahan dalam praktik kami
                  atau peraturan yang berlaku. Perubahan signifikan akan diberitahukan melalui email atau pemberitahuan
                  di website kami.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Hubungi Kami</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Jika Anda memiliki pertanyaan atau kekhawatiran mengenai kebijakan privasi ini, atau ingin menggunakan
                  hak-hak Anda terkait data pribadi, silakan hubungi kami:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>
                    <strong>Email:</strong> privacy@kurirqu.com
                  </p>
                  <p>
                    <strong>WhatsApp:</strong> +62 822-3641-8724
                  </p>
                  <p>
                    <strong>Alamat:</strong> Jl. Griya Jati Permai, Sukorejo, Kec. Sukorejo, Kota Blitar, Jawa Timur
                    66121
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Terima kasih atas kepercayaan Anda menggunakan layanan KurirQu.</p>
            <Button
              className="bg-gradient-to-r from-[#6c1618] to-[#af1b1c] hover:from-[#5a1315] hover:to-[#9a1719] text-white"
              onClick={() => window.open("https://wa.link/dvsne2", "_blank")}
            >
              Hubungi Kami
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
