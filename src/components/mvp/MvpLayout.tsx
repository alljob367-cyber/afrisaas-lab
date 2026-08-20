'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface MvpLayoutProps {
  children: ReactNode
  mvpName: string
  mvpIcon: ReactNode
  mvpColor: string
  navItems?: {
    label: string
    icon: ReactNode
    href: string
    active?: boolean
  }[]
}

export default function MvpLayout({ 
  children, 
  mvpName, 
  mvpIcon, 
  mvpColor,
  navItems = []
}: MvpLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  const defaultNavItems = [
    { label: 'Tableau de bord', icon: <LayoutDashboard className="w-5 h-5" />, href: '#dashboard', active: true },
    { label: 'Gestion', icon: <UtensilsCrossed className="w-5 h-5" />, href: '#manage' },
    { label: 'Commandes', icon: <ShoppingCart className="w-5 h-5" />, href: '#orders' },
    { label: 'Clients', icon: <Users className="w-5 h-5" />, href: '#customers' },
    { label: 'Paramètres', icon: <Settings className="w-5 h-5" />, href: '#settings' },
  ]

  const items = navItems.length > 0 ? navItems : defaultNavItems

  const handleSignOut = async () => {
    await signOut({ redirectTo: '/login' })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0a0a0a] text-white transition-all duration-300 flex flex-col`}>
        {/* MVP Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${mvpColor} flex items-center justify-center flex-shrink-0`}>
              {mvpIcon}
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-bold text-sm">{mvpName}</p>
                <p className="text-xs text-gray-500">AfriSaaS</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {items.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                item.active 
                  ? `${mvpColor.replace('bg-', 'bg-')}/10 text-${mvpColor.includes('orange') ? 'orange' : mvpColor.includes('green') ? 'green' : 'blue'}-400` 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center text-black font-bold text-sm">
              U
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Utilisateur</p>
                <p className="text-xs text-gray-500">Plan Pro</p>
              </div>
            )}
            <button 
              onClick={handleSignOut}
              className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-xl font-bold text-gray-900">{mvpName}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
              </Button>

              <Button 
                onClick={() => router.push('/dashboard')}
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                Retour au Marketplace
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
