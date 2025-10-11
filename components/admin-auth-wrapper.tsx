"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface AdminAuthWrapperProps {
  children: React.ReactNode
}

export function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading
    
    console.log('AdminAuthWrapper - Session:', session)
    console.log('AdminAuthWrapper - Status:', status)
    console.log('AdminAuthWrapper - Environment vars:', {
      NEXT_PUBLIC_AUTHORIZED_ADMINS: process.env.NEXT_PUBLIC_AUTHORIZED_ADMINS,
      NEXT_PUBLIC_MASTER_ADMIN_EMAIL: process.env.NEXT_PUBLIC_MASTER_ADMIN_EMAIL
    })
    
    // Add a small delay to ensure session is fully loaded
    if (!session) {
      console.log('AdminAuthWrapper - No session, redirecting to login')
      // Not authenticated, redirect to login
      router.push('/admin/login')
      return
    }

    // Check if user is authorized admin
    const authorizedEmails = process.env.NEXT_PUBLIC_AUTHORIZED_ADMINS?.split(',').map(e => e.trim()) || []
    const masterAdminEmail = process.env.NEXT_PUBLIC_MASTER_ADMIN_EMAIL
    
    console.log('AdminAuthWrapper - User email:', session.user?.email)
    console.log('AdminAuthWrapper - Master admin:', masterAdminEmail)
    console.log('AdminAuthWrapper - Authorized emails (trimmed):', authorizedEmails)
    
    const userEmail = session.user?.email?.trim()
    const isMasterAdmin = userEmail === masterAdminEmail?.trim()
    const isAuthorized = authorizedEmails.includes(userEmail || '')
    
    console.log('AdminAuthWrapper - Is master admin:', isMasterAdmin)
    console.log('AdminAuthWrapper - Is authorized:', isAuthorized)
    
    if (!isMasterAdmin && !isAuthorized) {
      console.log('AdminAuthWrapper - User not authorized, redirecting to login')
      // Not authorized, redirect to login
      router.push('/admin/login')
      return
    }
    
    console.log('AdminAuthWrapper - User authorized, allowing access')
  }, [session, status, router])

  // Show loading spinner while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600">Checking authentication...</span>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (!session) {
    return null
  }

  // Check authorization (same logic as useEffect)
  const authorizedEmails = process.env.NEXT_PUBLIC_AUTHORIZED_ADMINS?.split(',').map(e => e.trim()) || []
  const masterAdminEmail = process.env.NEXT_PUBLIC_MASTER_ADMIN_EMAIL
  
  const userEmail = session.user?.email?.trim()
  const isMasterAdmin = userEmail === masterAdminEmail?.trim()
  const isAuthorized = authorizedEmails.includes(userEmail || '')
  
  if (!isMasterAdmin && !isAuthorized) {
    return null
  }

  return <>{children}</>
}
