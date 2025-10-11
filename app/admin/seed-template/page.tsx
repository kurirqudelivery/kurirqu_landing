'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Download, RefreshCw, Database, FileText, Shield, Lock, Users, Star, MessageSquare, Image, BarChart3, Footprints, Phone } from 'lucide-react'

interface SeedItem {
  id: string
  name: string
  description: string
  icon: any
  lastSeeded?: string
  status: 'idle' | 'seeding' | 'success' | 'error'
}

export default function SeedTemplatePage() {
  const [seedItems, setSeedItems] = useState<SeedItem[]>([
    {
      id: 'hero',
      name: 'Hero Section',
      description: 'Template untuk hero section landing page',
      icon: Image,
      status: 'idle'
    },
    {
      id: 'services',
      name: 'Services',
      description: 'Template untuk layanan kurir',
      icon: Star,
      status: 'idle'
    },
    {
      id: 'testimonials',
      name: 'Testimonials',
      description: 'Template untuk testimonial pelanggan',
      icon: MessageSquare,
      status: 'idle'
    },
    {
      id: 'gallery',
      name: 'Gallery',
      description: 'Template untuk galeri foto',
      icon: Image,
      status: 'idle'
    },
    {
      id: 'stats',
      name: 'Statistics',
      description: 'Template untuk statistik perusahaan',
      icon: BarChart3,
      status: 'idle'
    },
    {
      id: 'why-choose',
      name: 'Why Choose Us',
      description: 'Template untuk keunggulan layanan',
      icon: Footprints,
      status: 'idle'
    },
    {
      id: 'cta',
      name: 'Call to Action',
      description: 'Template untuk CTA section',
      icon: Phone,
      status: 'idle'
    },
    {
      id: 'footer',
      name: 'Footer',
      description: 'Template untuk footer website',
      icon: FileText,
      status: 'idle'
    },
    {
      id: 'tentang-kami',
      name: 'Tentang Kami',
      description: 'Template untuk halaman tentang kami',
      icon: Users,
      status: 'idle'
    },
    {
      id: 'syarat-ketentuan',
      name: 'Syarat & Ketentuan',
      description: 'Template untuk halaman syarat dan ketentuan',
      icon: Shield,
      status: 'idle'
    },
    {
      id: 'kebijakan-privasi',
      name: 'Kebijakan Privasi',
      description: 'Template untuk halaman kebijakan privasi',
      icon: Lock,
      status: 'idle'
    }
  ])

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info')
  const [isLoading, setIsLoading] = useState(false)

  const handleSeedItem = async (itemId: string) => {
    setSeedItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'seeding' } : item
    ))
    setMessage('')
    setMessageType('info')

    try {
      const response = await fetch(`/api/admin/seed-template/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        setSeedItems(prev => prev.map(item => 
          item.id === itemId ? { 
            ...item, 
            status: 'success',
            lastSeeded: new Date().toLocaleString('id-ID')
          } : item
        ))
        setMessage(data.message || 'Template berhasil di-seed!')
        setMessageType('success')
      } else {
        setSeedItems(prev => prev.map(item => 
          item.id === itemId ? { ...item, status: 'error' } : item
        ))
        setMessage(data.error || 'Gagal melakukan seed template')
        setMessageType('error')
      }
    } catch (error) {
      setSeedItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, status: 'error' } : item
      ))
      setMessage('Terjadi kesalahan. Silakan coba lagi.')
      setMessageType('error')
    }

    // Reset status after 3 seconds
    setTimeout(() => {
      setSeedItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, status: 'idle' } : item
      ))
    }, 3000)
  }

  const handleSeedAll = async () => {
    setIsLoading(true)
    setMessage('')
    setMessageType('info')

    try {
      const response = await fetch('/api/admin/seed-template/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        // Update all items to success
        setSeedItems(prev => prev.map(item => ({ 
          ...item, 
          status: 'success',
          lastSeeded: new Date().toLocaleString('id-ID')
        })))
        setMessage('Semua template berhasil di-seed! ' + (data.message || ''))
        setMessageType('success')
      } else {
        setMessage(data.error || 'Gagal melakukan seed semua template')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Terjadi kesalahan. Silakan coba lagi.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestoreItem = async (itemId: string) => {
    setSeedItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'seeding' } : item
    ))
    setMessage('')
    setMessageType('info')

    try {
      const response = await fetch(`/api/admin/seed-template/${itemId}/restore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        setSeedItems(prev => prev.map(item => 
          item.id === itemId ? { 
            ...item, 
            status: 'success',
            lastSeeded: new Date().toLocaleString('id-ID')
          } : item
        ))
        setMessage(data.message || 'Template berhasil di-restore!')
        setMessageType('success')
      } else {
        setSeedItems(prev => prev.map(item => 
          item.id === itemId ? { ...item, status: 'error' } : item
        ))
        setMessage(data.error || 'Gagal melakukan restore template')
        setMessageType('error')
      }
    } catch (error) {
      setSeedItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, status: 'error' } : item
      ))
      setMessage('Terjadi kesalahan. Silakan coba lagi.')
      setMessageType('error')
    }

    // Reset status after 3 seconds
    setTimeout(() => {
      setSeedItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, status: 'idle' } : item
      ))
    }, 3000)
  }

  const handleRestoreAll = async () => {
    setIsLoading(true)
    setMessage('')
    setMessageType('info')

    try {
      const response = await fetch('/api/admin/seed-template/restore-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        setSeedItems(prev => prev.map(item => ({ 
          ...item, 
          status: 'success',
          lastSeeded: new Date().toLocaleString('id-ID')
        })))
        setMessage('Semua template berhasil di-restore! ' + (data.message || ''))
        setMessageType('success')
      } else {
        setMessage(data.error || 'Gagal melakukan restore semua template')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Terjadi kesalahan. Silakan coba lagi.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Seed Template</h1>
        <p className="text-gray-600">Kelola template untuk content management dan legal pages</p>
      </div>

      {message && (
        <Alert className={`mb-6 ${messageType === 'error' ? 'border-red-200 bg-red-50' : 
                                messageType === 'success' ? 'border-green-200 bg-green-50' : 
                                'border-blue-200 bg-blue-50'}`}>
          <AlertDescription className={messageType === 'error' ? 'text-red-800' : 
                                          messageType === 'success' ? 'text-green-800' : 
                                          'text-blue-800'}>
            {message}
          </AlertDescription>
        </Alert>
      )}

      {/* Global Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Aksi Global
          </CardTitle>
          <CardDescription>
            Lakukan seeding atau restore untuk semua template sekaligus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              onClick={handleSeedAll}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Seed All Templates
                </>
              )}
            </Button>
            <Button
              onClick={handleRestoreAll}
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Restoring...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restore All Templates
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Template Categories */}
      <div className="grid gap-6">
        {/* Content Management */}
        <Card>
          <CardHeader>
            <CardTitle>Content Management Templates</CardTitle>
            <CardDescription>
              Template untuk konten landing page dan website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {seedItems.filter(item => 
                ['hero', 'services', 'testimonials', 'gallery', 'stats', 'why-choose', 'cta', 'footer'].includes(item.id)
              ).map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold">{item.name}</h3>
                      </div>
                      {item.status === 'seeding' && (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      )}
                      {item.status === 'success' && (
                        <div className="h-4 w-4 bg-green-500 rounded-full" />
                      )}
                      {item.status === 'error' && (
                        <div className="h-4 w-4 bg-red-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    {item.lastSeeded && (
                      <p className="text-xs text-gray-500 mb-3">
                        Last seeded: {item.lastSeeded}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSeedItem(item.id)}
                        disabled={item.status === 'seeding'}
                        className="flex-1"
                      >
                        {item.status === 'seeding' ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Download className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRestoreItem(item.id)}
                        disabled={item.status === 'seeding'}
                      >
                        {item.status === 'seeding' ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Legal Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Legal Pages Templates</CardTitle>
            <CardDescription>
              Template untuk halaman legal dan kebijakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {seedItems.filter(item => 
                ['tentang-kami', 'syarat-ketentuan', 'kebijakan-privasi'].includes(item.id)
              ).map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold">{item.name}</h3>
                      </div>
                      {item.status === 'seeding' && (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      )}
                      {item.status === 'success' && (
                        <div className="h-4 w-4 bg-green-500 rounded-full" />
                      )}
                      {item.status === 'error' && (
                        <div className="h-4 w-4 bg-red-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    {item.lastSeeded && (
                      <p className="text-xs text-gray-500 mb-3">
                        Last seeded: {item.lastSeeded}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSeedItem(item.id)}
                        disabled={item.status === 'seeding'}
                        className="flex-1"
                      >
                        {item.status === 'seeding' ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Download className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRestoreItem(item.id)}
                        disabled={item.status === 'seeding'}
                      >
                        {item.status === 'seeding' ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
