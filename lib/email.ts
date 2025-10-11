import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    console.log('Email config:', {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? '***' : 'undefined'
    });

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      await this.transporter.verify()
      
      const mailOptions = {
        from: `"KurirQu" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      }

      const result = await this.transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', result.messageId)
      return true
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }
  }

  async sendOTP(email: string, otp: string): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kode OTP KurirQu</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            color: #6c1618;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .otp-container {
            background: #f8f9fa;
            padding: 25px;
            text-align: center;
            border-radius: 8px;
            margin: 20px 0;
            border: 2px dashed #6c1618;
          }
          .otp-code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #6c1618;
            margin: 15px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
          }
          .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚚 KurirQu</div>
            <h2>🔐 Kode OTP Login</h2>
          </div>
          
          <p>Halo,</p>
          <p>Berikut adalah kode OTP (One-Time Password) untuk login ke admin panel KurirQu:</p>
          
          <div class="otp-container">
            <p style="margin: 0; font-weight: bold;">KODE ANDA:</p>
            <div class="otp-code">${otp}</div>
          </div>
          
          <div class="warning">
            <strong>⚠️ Penting:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Kode berlaku selama <strong>5 menit</strong></li>
              <li>Jangan bagikan kode ini kepada siapapun</li>
              <li>Kami tidak akan pernah meminta kode OTP melalui telepon atau chat</li>
            </ul>
          </div>
          
          <p>Jika Anda tidak merasa melakukan permintaan login, silakan abaikan email ini.</p>
          
          <div class="footer">
            <p>© 2024 KurirQu - Solusi praktis untuk kebutuhan harian Anda</p>
            <p style="font-size: 12px;">Email ini dikirim secara otomatis, jangan balas email ini.</p>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: email,
      subject: '🔐 Kode OTP Login KurirQu',
      html
    })
  }

  async sendPartnershipStatusUpdate(email: string, name: string, status: 'approved' | 'rejected', notes?: string): Promise<boolean> {
    const isApproved = status === 'approved'
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${isApproved ? 'Selamat! Pendaftaran Mitra KurirQu Disetujui' : 'Update Status Pendaftaran Mitra KurirQu'}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            color: #6c1618;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .status-container {
            padding: 25px;
            text-align: center;
            border-radius: 8px;
            margin: 20px 0;
            border: 2px solid ${isApproved ? '#28a745' : '#dc3545'};
            background: ${isApproved ? '#d4edda' : '#f8d7da'};
          }
          .status-icon {
            font-size: 48px;
            color: ${isApproved ? '#28a745' : '#dc3545'};
            margin-bottom: 15px;
          }
          .info-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #6c1618;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
          }
          .highlight {
            color: #6c1618;
            font-weight: bold;
          }
          .next-steps {
            background: ${isApproved ? '#e8f5e8' : '#fff3cd'};
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid ${isApproved ? '#28a745' : '#ffc107'};
          }
          .notes-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #6c1618;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚚 KurirQu</div>
            <h2>${isApproved ? '🎉 Selamat! Pendaftaran Disetujui' : '📋 Update Status Pendaftaran'}</h2>
            <p>Halo, ${name}!</p>
          </div>
          
          <div class="status-container">
            <div class="status-icon">${isApproved ? '✅' : '❌'}</div>
            <h3>Status Aplikasi Anda: <strong>${isApproved ? 'DISETUJUI' : 'DITOLAK'}</strong></h3>
            <p>${isApproved ? 'Selamat! Pendaftaran Anda sebagai mitra KurirQu telah disetujui.' : 'Mohon maaf, setelah review, pendaftaran Anda belum dapat disetujui saat ini.'}</p>
          </div>
          
          ${notes ? `
            <div class="notes-box">
              <h4>📝 Catatan dari Tim KurirQu:</h4>
              <p>${notes}</p>
            </div>
          ` : ''}
          
          ${isApproved ? `
            <div class="next-steps">
              <h4>🎯 Langkah Selanjutnya:</h4>
              <ol>
                <li><strong>Interview</strong> - Tim kami akan menghubungi Anda dalam 1-2 hari kerja untuk interview singkat</li>
                <li><strong>Training</strong> - Anda akan mengikuti training tentang prosedur kerja KurirQu</li>
                <li><strong>Siap Bermitra</strong> - Setelah training, Anda siap memulai perjalanan sebagai mitra KurirQu</li>
              </ol>
              <p><strong>📞 Kami akan menghubungi Anda melalui WhatsApp yang terdaftar.</strong></p>
            </div>
          ` : `
            <div class="next-steps">
              <h4>💡 Informasi Tambahan:</h4>
              <p>Anda dapat mengajukan kembali pendaftaran di masa mendatang jika sudah memenuhi persyaratan yang dibutuhkan.</p>
              <p>Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan.</p>
            </div>
          `}
          
          <div class="info-box">
            <h4>📞 Butuh Bantuan?</h4>
            <p>Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami:</p>
            <p>
              📧 Email: kurirqublitar@gmail.com<br>
              📞 WhatsApp: +6282236418724
            </p>
          </div>
          
          <div class="footer">
            <p>© 2024 KurirQu - Solusi praktis untuk kebutuhan harian Anda</p>
            <p style="font-size: 12px;">Email ini dikirim secara otomatis, jangan balas email ini.</p>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: email,
      subject: `${isApproved ? '🎉 Selamat! Pendaftaran Mitra KurirQu Disetujui' : '📋 Update Status Pendaftaran KurirQu'}`,
      html
    })
  }

  async sendPartnershipConfirmation(email: string, name: string): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Konfirmasi Pendaftaran Mitra KurirQu</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            color: #6c1618;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .success-container {
            background: #d4edda;
            padding: 25px;
            text-align: center;
            border-radius: 8px;
            margin: 20px 0;
            border: 2px solid #c3e6cb;
          }
          .success-icon {
            font-size: 48px;
            color: #28a745;
            margin-bottom: 15px;
          }
          .info-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #6c1618;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
          }
          .highlight {
            color: #6c1618;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚚 KurirQu</div>
            <h2>Selamat Bergabung, ${name}!</h2>
          </div>
          
          <div class="success-container">
            <div class="success-icon">✅</div>
            <h3>Pendaftaran Berhasil!</h3>
            <p>Terima kasih telah mendaftar sebagai mitra KurirQu.</p>
          </div>
          
          <div class="info-box">
            <h4>📋 Status Aplikasi Anda:</h4>
            <p>Aplikasi Anda telah <span class="highlight">diterima dan sedang dalam proses review</span> oleh tim kami.</p>
            <p>Tim kami akan menghubungi Anda dalam <strong>1-3 hari kerja</strong> melalui:</p>
            <ul>
              <li>📞 Nomor WhatsApp yang Anda daftarkan</li>
              <li>📧 Email yang Anda gunakan untuk pendaftaran</li>
            </ul>
          </div>
          
          <div class="info-box">
            <h4>🔄 Proses Selanjutnya:</h4>
            <ol>
              <li><strong>Review Dokumen</strong> - Tim kami akan memverifikasi semua dokumen yang Anda upload</li>
              <li><strong>Interview</strong> - Jika dokumen lengkap, kami akan menghubungi untuk interview singkat</li>
              <li><strong>Training</strong> - Anda akan mengikuti training singkat tentang prosedur kerja KurirQu</li>
            </ol>
          </div>
          
          <div class="info-box">
            <h4>📞 Butuh Bantuan?</h4>
            <p>Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami:</p>
            <p>
              📧 Email: kurirqublitar@gmail.com<br>
              📞 WhatsApp: +6282236418724
            </p>
          </div>
          
          <div class="footer">
            <p>© 2024 KurirQu - Solusi praktis untuk kebutuhan harian Anda</p>
            <p style="font-size: 12px;">Email ini dikirim secara otomatis, jangan balas email ini.</p>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: email,
      subject: '✅ Pendaftaran Mitra KurirQu Berhasil - Sedang Direview',
      html
    })
  }
}

export const emailService = new EmailService()

// Export fungsi untuk kemudahan penggunaan
export async function sendPartnershipConfirmationEmail(to: string, name: string) {
  return await emailService.sendPartnershipConfirmation(to, name)
}

export async function sendPartnershipStatusUpdateEmail(to: string, name: string, status: 'approved' | 'rejected', notes?: string) {
  return await emailService.sendPartnershipStatusUpdate(to, name, status, notes)
}
