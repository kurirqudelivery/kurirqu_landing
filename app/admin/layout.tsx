"use client"

import { AdminAuthWrapper } from '@/components/admin-auth-wrapper'
import { AdminSidebar } from '@/components/admin-sidebar'
import { AdminHeader } from '@/components/admin-header'
import { usePathname } from 'next/navigation'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <AdminAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="lg:ml-64">
          <AdminHeader />
          <main className="min-h-screen bg-gray-50">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminAuthWrapper>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>
}
