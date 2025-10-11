# KurirQu OTP Login System Setup

## Overview

Sistem login admin KurirQu sekarang menggunakan OTP (One-Time Password) yang dikirim melalui email untuk autentikasi yang lebih aman.

## Environment Variables yang Diperlukan

Tambahkan variabel berikut ke file `.env.local`:

```env
# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Email (email yang diizinkan untuk login)
ADMIN_EMAIL=admin@kurirqu.com
```

## Setup Gmail SMTP

1. **Buka Google Account Settings**: https://myaccount.google.com/
2. **Aktifkan 2-Step Verification** jika belum aktif
3. **Generate App Password**:
   - Pergi ke Security → 2-Step Verification → App passwords
   - Pilih "Mail" dan "Other (Custom name)"
   - Beri nama "KurirQu Admin"
   - Copy password yang dihasilkan
4. **Gunakan App Password** sebagai `EMAIL_PASS` di environment variables

## Cara Menggunakan OTP Login

### Step 1: Request OTP
1. Buka halaman admin: `http://localhost:3002/admin/login`
2. Masukkan email admin (sesuai `ADMIN_EMAIL`)
3. Klik "Kirim OTP"
4. OTP akan dikirim ke email tersebut

### Step 2: Verifikasi OTP
1. Masukkan 6 digit OTP yang diterima via email
2. Klik "Login"
3. Jika berhasil, akan diarahkan ke dashboard admin

## Fitur OTP

- ✅ **Validasi 5 menit**: OTP berlaku selama 5 menit
- ✅ **Rate Limiting**: Maksimal 3 percobaan verifikasi
- ✅ **Resend OTP**: Dapat mengirim ulang OTP setelah 60 detik
- ✅ **Auto Cleanup**: OTP kadaluarsa otomatis
- ✅ **Secure**: Menggunakan crypto untuk generate OTP

## Testing OTP System

### 1. Test Email Service
```bash
curl -X POST http://localhost:3002/api/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@kurirqu.com"}'
```

### 2. Test OTP Verification
```bash
curl -X POST http://localhost:3002/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@kurirqu.com", "otp": "123456"}'
```

## Troubleshooting

### Email Tidak Terkirim
1. Pastikan Gmail SMTP configuration benar
2. Check apakah App Password sudah di-generate
3. Pastikan email port (587) tidak diblokir firewall

### OTP Tidak Valid
1. Pastikan OTP masih dalam 5 menit
2. Check apakah OTP sudah digunakan sebelumnya
3. Pastikan email yang dimasukkan sama dengan saat request

### Login Gagal
1. Check console logs untuk error messages
2. Pastikan NextAuth session configuration benar
3. Verify database connection

## Security Features

- **OTP Expiration**: 5 menit
- **Attempt Limiting**: Maksimal 3 percobaan
- **Email Validation**: Hanya email terdaftar yang bisa request OTP
- **Secure Storage**: OTP di-hash sebelum disimpan
- **Auto Cleanup**: OTP expired otomatis dihapus

## Database Collections

### users
```javascript
{
  _id: ObjectId,
  email: "admin@kurirqu.com",
  role: "admin",
  createdAt: Date,
  lastLogin: Date
}
```

### otps
```javascript
{
  _id: ObjectId,
  email: "admin@kurirqu.com",
  otp: "hashed_otp",
  attempts: 0,
  isUsed: false,
  expiresAt: Date,
  createdAt: Date
}
```

## Next Steps

1. **Production Setup**: Gunakan email service provider yang lebih robust (SendGrid, AWS SES)
2. **Rate Limiting**: Tambahkan rate limiting untuk request OTP
3. **Audit Logs**: Log semua aktivitas login
4. **Multi-Admin**: Support multiple admin users dengan roles berbeda

## Support

Jika mengalami masalah:
1. Check browser console untuk errors
2. Verify environment variables
3. Test SMTP connection manual
4. Check MongoDB connection