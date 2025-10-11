import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { OTPLoginForm } from '@/components/otp-login-form'
import { AdminSessionProvider } from '@/components/admin-session-provider'

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">🚚</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            KurirQu Admin
          </CardTitle>
          <CardDescription>
            Login dengan OTP untuk mengelola konten landing page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminSessionProvider>
            <OTPLoginForm />
          </AdminSessionProvider>
        </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Butuh bantuan? Hubungi administrator sistem
          </p>
        </div>
      </div>
    </div>
  )
}
