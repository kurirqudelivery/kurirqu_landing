"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Users, 
  Package, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  Settings,
  FileText,
  Image,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Shield,
  UserCheck,
  UserPlus,
  Activity
} from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalPartners: number
  pendingPartners: number
  approvedPartners: number
  rejectedPartners: number
  totalContentSections: number
  lastUpdated: string
}

interface QuickAction {
  title: string
  description: string
  icon: React.ReactNode
  path: string
  color: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      setMessage('')
      
      let totalUsers = 0
      let activeUsers = 0
      let partnersStats = {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
      }
      let errorMessage = ''
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000) // 10 second timeout
      })
      
      // Fetch users stats with timeout
      try {
        const usersPromise = fetch('/api/admin/users')
        const usersResponse = await Promise.race([usersPromise, timeoutPromise]) as Response
        
        if (usersResponse.ok) {
          const usersData = await usersResponse.json()
          const users = usersData.users || []
          totalUsers = users.length || 0
          activeUsers = users.filter((user: any) => user.isActive).length || 0
        } else {
          errorMessage += 'Failed to load users data. '
        }
      } catch (error) {
        console.error('Error fetching users:', error)
        errorMessage += 'Error fetching users. '
      }

      // Fetch partners stats with timeout
      try {
        const partnersPromise = fetch('/api/admin/partners/stats')
        const partnersResponse = await Promise.race([partnersPromise, timeoutPromise]) as Response
        
        if (partnersResponse.ok) {
          const data = await partnersResponse.json()
          partnersStats = data.stats || partnersStats
        } else {
          errorMessage += 'Failed to load partners data. '
        }
      } catch (error) {
        console.error('Error fetching partners:', error)
        errorMessage += 'Error fetching partners. '
      }

      // Fetch content stats
      const contentSections = [
        'hero', 'services', 'testimonials', 'gallery', 
        'stats', 'why-choose', 'cta', 'footer', 'tentang-kami',
        'syarat-ketentuan', 'kebijakan-privasi'
      ]
      
      setDashboardStats({
        totalUsers,
        activeUsers,
        totalPartners: partnersStats.total,
        pendingPartners: partnersStats.pending,
        approvedPartners: partnersStats.approved,
        rejectedPartners: partnersStats.rejected,
        totalContentSections: contentSections.length,
        lastUpdated: new Date().toLocaleString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      })

      if (errorMessage) {
        setMessage(`⚠️ ${errorMessage}Some data may not be current.`)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      setMessage('❌ Error loading dashboard statistics. Please try refreshing the page.')
      
      // Set default stats on error to prevent infinite loading
      setDashboardStats({
        totalUsers: 0,
        activeUsers: 0,
        totalPartners: 0,
        pendingPartners: 0,
        approvedPartners: 0,
        rejectedPartners: 0,
        totalContentSections: 11,
        lastUpdated: new Date().toLocaleString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      })
    } finally {
      setLoading(false)
    }
  }

  const quickActions: QuickAction[] = [
    {
      title: 'Kelola Partner',
      description: 'Lihat dan kelola aplikasi partner',
      icon: <UserCheck className="h-5 w-5" />,
      path: '/admin/partners',
      color: 'bg-blue-500'
    },
    {
      title: 'User Management',
      description: 'Kelola pengguna admin',
      icon: <Users className="h-5 w-5" />,
      path: '/admin/users',
      color: 'bg-green-500'
    },
    {
      title: 'Hero Section',
      description: 'Atur konten utama halaman',
      icon: <Globe className="h-5 w-5" />,
      path: '/admin/hero',
      color: 'bg-purple-500'
    },
    {
      title: 'Statistics',
      description: 'Kelola statistik perusahaan',
      icon: <BarChart3 className="h-5 w-5" />,
      path: '/admin/stats',
      color: 'bg-orange-500'
    },
    {
      title: 'Gallery',
      description: 'Kelola galeri foto',
      icon: <Image className="h-5 w-5" />,
      path: '/admin/gallery',
      color: 'bg-pink-500'
    },
    {
      title: 'Settings',
      description: 'Pengaturan global situs',
      icon: <Settings className="h-5 w-5" />,
      path: '/admin/settings',
      color: 'bg-gray-500'
    }
  ]

  const allManagementActions = [
    {
      title: 'Services',
      description: 'Manage service offerings',
      icon: <Package className="h-4 w-4" />,
      path: '/admin/services'
    },
    {
      title: 'Testimonials',
      description: 'Manage customer testimonials',
      icon: <MessageSquare className="h-4 w-4" />,
      path: '/admin/testimonials'
    },
    {
      title: 'Why Choose Us',
      description: 'Manage value propositions',
      icon: <CheckCircle className="h-4 w-4" />,
      path: '/admin/why-choose'
    },
    {
      title: 'Call to Action',
      description: 'Manage CTA section',
      icon: <Phone className="h-4 w-4" />,
      path: '/admin/cta'
    },
    {
      title: 'Footer',
      description: 'Manage footer information',
      icon: <FileText className="h-4 w-4" />,
      path: '/admin/footer'
    },
    {
      title: 'Tentang Kami',
      description: 'Manage about us content',
      icon: <FileText className="h-4 w-4" />,
      path: '/admin/tentang-kami'
    },
    {
      title: 'Syarat & Ketentuan',
      description: 'Manage terms and conditions',
      icon: <Shield className="h-4 w-4" />,
      path: '/admin/syarat-ketentuan'
    },
    {
      title: 'Kebijakan Privasi',
      description: 'Manage privacy policy',
      icon: <Shield className="h-4 w-4" />,
      path: '/admin/kebijakan-privasi'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Activity className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin KurirQu</h1>
        <p className="text-gray-600 mt-2">Kelola konten dan pantau performa landing page KurirQu</p>
      </div>
      
      {message && (
        <Alert className={message.includes('Error') ? 'border-red-200 bg-red-50 mb-6' : 'border-green-200 bg-green-50 mb-6'}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats?.totalUsers || 0}</div>
            <p className="text-xs text-blue-100">
              {dashboardStats?.activeUsers || 0} active users
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
            <UserPlus className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats?.totalPartners || 0}</div>
            <p className="text-xs text-green-100">
              {dashboardStats?.approvedPartners || 0} approved
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <Clock className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats?.pendingPartners || 0}</div>
            <p className="text-xs text-orange-100">
              Need review
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Sections</CardTitle>
            <FileText className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats?.totalContentSections || 0}</div>
            <p className="text-xs text-purple-100">
              Manageable sections
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(action.path)}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`${action.color} p-3 rounded-lg text-white`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Management Options */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allManagementActions.map((action, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {action.icon}
                  <span>{action.title}</span>
                </CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => router.push(action.path)}
                >
                  Manage
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>System Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p className="text-sm text-gray-900">{dashboardStats?.lastUpdated || 'Never'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">System Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-900">All systems operational</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={fetchDashboardStats}
              className="w-full"
            >
              <Activity className="mr-2 h-4 w-4" />
              Refresh Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
