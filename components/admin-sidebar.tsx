"use client"

import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Image, 
  MessageSquare, 
  Image as Photos, 
  BarChart3, 
  Star, 
  Phone, 
  Footprints,
  LogOut,
  Menu,
  Settings,
  FileText,
  ChevronDown,
  ChevronRight,
  Users,
  Shield,
  Lock
} from 'lucide-react'
import { useState } from 'react'

const navigationGroups = [
  {
    title: 'Main',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Content Management',
    items: [
      { name: 'Hero Section', href: '/admin/hero', icon: Image },
      { name: 'Services', href: '/admin/services', icon: Star },
      { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
      { name: 'Gallery', href: '/admin/gallery', icon: Photos },
      { name: 'Statistics', href: '/admin/stats', icon: BarChart3 },
      { name: 'Why Choose Us', href: '/admin/why-choose', icon: Footprints },
      { name: 'Call to Action', href: '/admin/cta', icon: Phone },
    ]
  },
  {
    title: 'Legal Pages',
    items: [
      { name: 'Tentang Kami', href: '/admin/tentang-kami', icon: Users },
      { name: 'Syarat & Ketentuan', href: '/admin/syarat-ketentuan', icon: Shield },
      { name: 'Kebijakan Privasi', href: '/admin/kebijakan-privasi', icon: Lock },
    ]
  },
  {
    title: 'Partnership Management',
    items: [
      { name: 'Mitra', href: '/admin/partners', icon: Users },
      { name: 'Partnership Settings', href: '/admin/partnership-settings', icon: Settings },
    ]
  },
  {
    title: 'Admin Management',
    items: [
      { name: 'Admin Users', href: '/admin/users', icon: Users },
    ]
  },
  {
    title: 'Site Configuration',
    items: [
      { name: 'Footer', href: '/admin/footer', icon: FileText },
      { name: 'Global Settings', href: '/admin/settings', icon: Settings },
      { name: 'Seed Template', href: '/admin/seed-template', icon: Settings },
    ]
  }
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/admin/login')
  }

  const toggleGroup = (groupTitle: string) => {
    setCollapsedGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    )
  }

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:fixed lg:translate-x-0 lg:inset-y-auto lg:flex-shrink-0 lg:h-screen",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">KurirQu Admin</h1>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              ×
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
            {navigationGroups.map((group) => {
              const isCollapsed = collapsedGroups.includes(group.title)
              
              return (
                <div key={group.title} className="space-y-2">
                  {/* Group Header */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-3 py-2 h-auto text-sm font-semibold text-gray-600 hover:text-gray-900"
                    onClick={() => toggleGroup(group.title)}
                  >
                    <span>{group.title}</span>
                    {isCollapsed ? (
                      <ChevronRight className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  
                  {/* Group Items */}
                  {!isCollapsed && (
                    <div className="space-y-1 pl-2">
                      {group.items.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <Button
                            key={item.name}
                            variant={isActive ? "default" : "ghost"}
                            className={cn(
                              "w-full justify-start text-sm",
                              isActive && "bg-red-600 hover:bg-red-700 text-white"
                            )}
                            onClick={() => {
                              router.push(item.href)
                              setSidebarOpen(false)
                            }}
                          >
                            <item.icon className="mr-3 h-4 w-4" />
                            {item.name}
                          </Button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="bg-white shadow-md"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}
