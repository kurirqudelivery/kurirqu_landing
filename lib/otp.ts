import crypto from 'crypto'

export function generateOTP(length: number = 6): string {
  const digits = '0123456789'
  let OTP = ''
  
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * digits.length)]
  }
  
  return OTP
}

export function generateSecureOTP(length: number = 6): string {
  // Using crypto for more secure random generation
  const buffer = crypto.randomBytes(length)
  const digits = '0123456789'
  let OTP = ''
  
  for (let i = 0; i < length; i++) {
    OTP += digits[buffer[i] % digits.length]
  }
  
  return OTP
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function getOTPExpirationMinutes(minutes: number = 5): Date {
  const now = new Date()
  return new Date(now.getTime() + minutes * 60 * 1000)
}

export function isOTPExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

export function maskEmail(email: string): string {
  const [username, domain] = email.split('@')
  if (username.length <= 3) {
    return `${username[0]}***@${domain}`
  }
  
  const visibleChars = 2
  const maskedUsername = username.substring(0, visibleChars) + '*'.repeat(username.length - visibleChars)
  return `${maskedUsername}@${domain}`
}

export function formatOTPForDisplay(otp: string): string {
  // Format like "123-456" for better readability
  if (otp.length === 6) {
    return `${otp.substring(0, 3)}-${otp.substring(3)}`
  }
  return otp
}

export function generateOTPTemplate(): {
  subject: string
  textMessage: string
} {
  return {
    subject: '🔐 Kode OTP Login KurirQu',
    textMessage: 'Kode OTP Anda adalah: {OTP}. Kode berlaku selama 5 menit. Jangan bagikan kode ini kepada siapapun.'
  }
}
