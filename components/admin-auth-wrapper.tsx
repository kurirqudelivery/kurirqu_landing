"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface AdminAuthWrapperProps {
  children: React.ReactNode
}

export function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuthorization = async () => {
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
        setIsCheckingAuth(false)
        return
      }

      const userEmail = session.user?.email?.trim()
      
      // Check if user is master admin (from environment variable)
      const masterAdminEmail = process.env.NEXT_PUBLIC_MASTER_ADMIN_EMAIL?.trim()
      const isMasterAdmin = userEmail === masterAdminEmail
      
      // Check if user is in environment authorized list (for backward compatibility)
      const authorizedEmails = process.env.NEXT_PUBLIC_AUTHORIZED_ADMINS?.split(',').map(e => e.trim()) || []
      const isEnvAuthorized = authorizedEmails.includes(userEmail || '')
      
      console.log('AdminAuthWrapper - User email:', userEmail)
      console.log('AdminAuthWrapper - Master admin:', masterAdminEmail)
      console.log('AdminAuthWrapper - Authorized emails (trimmed):', authorizedEmails)
      console.log('AdminAuthWrapper - Is master admin:', isMasterAdmin)
      console.log('AdminAuthWrapper - Is env authorized:', isEnvAuthorized)
      
      // If master admin or in env list, authorize immediately
      if (isMasterAdmin || isEnvAuthorized) {
        console.log('AdminAuthWrapper - User authorized via environment, allowing access')
        setIsAuthorized(true)
        setIsCheckingAuth(false)
        return
      }
      
      // Otherwise, check against database
      try {
        console.log('AdminAuthWrapper - Checking database authorization for:', userEmail)
        const response = await fetch('/api/admin/users')
        
        if (response.ok) {
          const data = await response.json()
          const users = data.users || []
          const dbUser = users.find((user: any) => user.email === userEmail && user.isActive)
          
          console.log('AdminAuthWrapper - Database users:', users)
          console.log('AdminAuthWrapper - Found user in database:', dbUser)
          
          if (dbUser) {
            console.log('AdminAuthWrapper - User authorized via database, allowing access')
            setIsAuthorized(true)
          } else {
            console.log('AdminAuthWrapper - User not found in database or inactive, redirecting to login')
            router.push('/admin/login')
          }
        } else {
          console.error('AdminAuthWrapper - Failed to fetch users from database')
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('AdminAuthWrapper - Error checking database authorization:', error)
        router.push('/admin/login')
      }
      
      setIsCheckingAuth(false)
    }

    checkAuthorization()
  }, [session, status, router])

  // Show loading spinner while checking authentication
  if (status === 'loading' || isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600">Checking authentication...</span>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated or authorized
  if (!session || !isAuthorized) {
    return null
  }

  return <>{children}</>
}
