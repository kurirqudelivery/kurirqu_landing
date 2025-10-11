"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AdminSidebar } from '@/components/admin-sidebar'
import { AdminHeader } from '@/components/admin-header'

interface AdminLayoutWrapperProps {
  children: React.ReactNode
  title?: string
}

export function AdminLayoutWrapper({ children, title }: AdminLayoutWrapperProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 lg:ml-0">
        <AdminHeader />
        <main className="p-4 sm:p-6 lg:p-8 w-full">
          {title && (
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
            </div>
          )}
          <div className="min-h-[calc(100vh-8rem)] w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
