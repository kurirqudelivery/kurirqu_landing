"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AdminSidebar } from '@/components/admin-sidebar'
import { AdminHeader } from '@/components/admin-header'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminDemo() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [heroData, setHeroData] = useState({
    title: 'Kirim Apapun Bisa Dengan KurirQu',
    subtitle: 'Kami siap melayani dengan sepenuh hati',
    logoUrl: 'https://kurirqu-landing.vercel.app/assets/img/logo/kurirqu-logo.png',
    whatsappUrl: 'https://wa.link/dvsne2',
    instructions: {
      step1: 'Hubungi via WhatsApp',
      step2: 'Sampaikan Detail Pesanan',
      step3: 'Pesanan Diproses'
    }
  })

  const handleSave = () => {
    setMessage('Demo: Content saved successfully! (In production, this would save to MongoDB)')
    setTimeout(() => setMessage(''), 3000)
  }

  const handlePreview = () => {
    const newWindow = window.open('/', '_blank')
    if (newWindow) {
      newWindow.onload = () => {
        // In a real app, this would update the content
        newWindow.alert('Demo: This would show the updated content on the landing page')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="p-6">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.push('/admin')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-900">Admin Demo</h1>
            <p className="text-gray-600">Demo of content management functionality</p>
          </div>

          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <AlertDescription>
              This is a demo version showing the admin interface. In production, this would connect to MongoDB to save and retrieve content.
            </AlertDescription>
          </Alert>

          {message && (
            <Alert className={message.includes('Error') ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Hero Section Demo</CardTitle>
              <CardDescription>Try editing the hero section content below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Main Title</Label>
                  <Input
                    id="title"
                    value={heroData.title}
                    onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                    placeholder="Kirim Apapun Bisa Dengan KurirQu"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={heroData.subtitle}
                    onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                    placeholder="Kami siap melayani dengan sepenuh hati"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    value={heroData.logoUrl}
                    onChange={(e) => setHeroData({ ...heroData, logoUrl: e.target.value })}
                    placeholder="https://kurirqu-landing.vercel.app/assets/img/logo/kurirqu-logo.png"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsappUrl">WhatsApp URL</Label>
                  <Input
                    id="whatsappUrl"
                    value={heroData.whatsappUrl}
                    onChange={(e) => setHeroData({ ...heroData, whatsappUrl: e.target.value })}
                    placeholder="https://wa.link/dvsne2"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Instructions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="step1">Step 1</Label>
                    <Input
                      id="step1"
                      value={heroData.instructions.step1}
                      onChange={(e) => setHeroData({
                        ...heroData,
                        instructions: { ...heroData.instructions, step1: e.target.value }
                      })}
                      placeholder="Hubungi via WhatsApp"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="step2">Step 2</Label>
                    <Input
                      id="step2"
                      value={heroData.instructions.step2}
                      onChange={(e) => setHeroData({
                        ...heroData,
                        instructions: { ...heroData.instructions, step2: e.target.value }
                      })}
                      placeholder="Sampaikan Detail Pesanan"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="step3">Step 3</Label>
                    <Input
                      id="step3"
                      value={heroData.instructions.step3}
                      onChange={(e) => setHeroData({
                        ...heroData,
                        instructions: { ...heroData.instructions, step3: e.target.value }
                      })}
                      placeholder="Pesanan Diproses"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes (Demo)
                </Button>
                <Button variant="outline" onClick={handlePreview}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview on Landing Page
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how your changes would look on the landing page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-lg border">
                <div className="text-center">
                  <div className="mb-4">
                    <img 
                      src={heroData.logoUrl} 
                      alt="Logo" 
                      className="h-20 mx-auto"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-logo.png'
                      }}
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {heroData.title.split('KurirQu')[0]}{" "}
                    <span className="text-red-700">KurirQu</span>
                    {heroData.title.split('KurirQu')[1] || ''}
                  </h2>
                  <p className="text-gray-600 mb-4">{heroData.subtitle}</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-center gap-4 text-sm">
                      <div>1. {heroData.instructions.step1}</div>
                      <div>→</div>
                      <div>2. {heroData.instructions.step2}</div>
                      <div>→</div>
                      <div>3. {heroData.instructions.step3}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
