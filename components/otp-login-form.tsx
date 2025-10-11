'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface OTPLoginFormProps {
  onSuccess?: () => void
}

export function OTPLoginForm({ onSuccess }: OTPLoginFormProps) {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingOTP, setIsSendingOTP] = useState(false)
  const [showOTPInput, setShowOTPInput] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info')
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()

  const startCountdown = () => {
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSendingOTP(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowOTPInput(true)
        setMessage(`OTP berhasil dikirim ke ${data.email}`)
        setMessageType('success')
        startCountdown()
      } else {
        setMessage(data.error || 'Gagal mengirim OTP')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Terjadi kesalahan. Silakan coba lagi.')
      setMessageType('error')
    } finally {
      setIsSendingOTP(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const result = await signIn('credentials', {
        email,
        otp,
        redirect: false,
      })

      console.log('OTP Login Result:', result)
      
      if (result?.error) {
        console.log('Login failed:', result.error)
        setMessage('OTP tidak valid atau sudah kadaluarsa')
        setMessageType('error')
      } else {
        console.log('Login successful, redirecting to admin...')
        setMessage('Login berhasil!')
        setMessageType('success')
        
        setTimeout(() => {
          console.log('Executing redirect to /admin')
          router.push('/admin')
          router.refresh()
          onSuccess?.()
        }, 1000)
      }
    } catch (error) {
      setMessage('Terjadi kesalahan. Silakan coba lagi.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsSendingOTP(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`OTP baru berhasil dikirim ke ${data.email}`)
        setMessageType('success')
        startCountdown()
        setOtp('') // Clear OTP input
      } else {
        setMessage(data.error || 'Gagal mengirim OTP')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Terjadi kesalahan. Silakan coba lagi.')
      setMessageType('error')
    } finally {
      setIsSendingOTP(false)
    }
  }

  const handleBack = () => {
    setShowOTPInput(false)
    setOtp('')
    setMessage('')
    setCountdown(0)
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Masukkan email untuk menerima kode OTP
        </p>
      </div>

      {message && (
        <Alert className={messageType === 'error' ? 'border-red-200 bg-red-50' : 
                         messageType === 'success' ? 'border-green-200 bg-green-50' : 
                         'border-blue-200 bg-blue-50'}>
          <AlertDescription className={messageType === 'error' ? 'text-red-800' : 
                                          messageType === 'success' ? 'text-green-800' : 
                                          'text-blue-800'}>
            {message}
          </AlertDescription>
        </Alert>
      )}

      {!showOTPInput ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@kurirqu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSendingOTP}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSendingOTP || !email}
          >
            {isSendingOTP ? 'Mengirim OTP...' : 'Kirim OTP'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Kode OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Masukkan 6 digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              required
              disabled={isLoading}
              className="text-center text-lg tracking-widest"
            />
            <p className="text-xs text-gray-500 text-center">
              OTP berlaku selama 5 menit
            </p>
          </div>

          <div className="space-y-2">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? 'Memverifikasi...' : 'Login'}
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1"
                disabled={isLoading}
              >
                Kembali
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleResendOTP}
                disabled={isSendingOTP || countdown > 0}
                className="flex-1"
              >
                {isSendingOTP ? 'Mengirim...' : 
                 countdown > 0 ? `Kirim ulang (${countdown}s)` : 
                 'Kirim ulang'}
              </Button>
            </div>
          </div>
        </form>
      )}

      <div className="text-center text-xs text-gray-500">
        <p>Hubungi administrator jika tidak menerima OTP</p>
      </div>
    </div>
  )
}
