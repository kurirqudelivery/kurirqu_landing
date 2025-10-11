# TODO Sistem Lowongan Kerja Kurirqu

## Frontend Changes
- [ ] Ubah tombol "Hubungi Kami" menjadi "Jadilah Mitra Kami" di navbar
- [ ] Buat halaman form pendaftaran mitra (`/jadilah-mitra`)
- [ ] Implementasi form dengan 5 section:
  - [ ] Data Pribadi
  - [ ] Data Kendaraan  
  - [ ] Dokumen Pendukung
  - [ ] Informasi Tambahan
  - [ ] Persetujuan
- [ ] Tambahkan validasi form
- [ ] Implementasi upload file untuk KTP, SIM, STNK, Selfie
- [ ] Tambahkan loading states dan error handling

## Backend Changes
- [ ] Buat model database untuk pendaftar mitra
- [ ] Buat API route untuk submit pendaftaran
- [ ] Buat API route untuk upload file
- [ ] Tambahkan validasi server-side
- [ ] Implementasi penyimpanan file

## Admin Panel
- [ ] Tambahkan menu "Mitra" di sidebar admin
- [ ] Buat halaman admin untuk manajemen mitra
- [ ] Implementasi switch on/off untuk tampilan menu
- [ ] Buat tabel list pendaftar mitra
- [ ] Tambahkan fitur view detail pendaftar
- [ ] Tambahkan fitur export data
- [ ] Implementasi pagination dan search

## Database Schema
- [ ] Desain schema untuk tabel mitra/partners
- [ ] Tambahkan field untuk file uploads
- [ ] Tambahkan field untuk settings (switch on/off)

## Additional Features
- [ ] Email notification untuk admin saat ada pendaftar baru
- [ ] Email konfirmasi untuk pendaftar
- [ ] Progress tracking status pendaftaran
- [ ] File management untuk dokumen yang diupload
