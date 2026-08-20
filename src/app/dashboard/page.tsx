'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  MessageSquare,
  Settings,
  LogOut,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Star,
  Headphones,
  Zap,
  Rocket,
  Store,
  MessageCircle,
  Calculator,
  GraduationCap,
  Building2,
  Boxes,
  Bot,
  Handshake,
  Scissors,
  ChevronRight,
  ExternalLink,
  X,
  Check,
  AlertCircle,
  CreditCard,
  FileText,
  HelpCircle,
  User,
  RefreshCw,
  Eye,
  EyeOff,
  Send,
  Loader2
} from "lucide-react"

// Types
interface DashboardStats {
  activeServices: number
  monthlyExpenses: number
  totalOrders: number
  nextRenewalDays: number
  nextRenewalService: string
  monthlyGrowth: string
  newOrders: number
  currency: string
}

interface Order {
  id: string
  service: string
  serviceId: string
  amount: number
  status: 'active' | 'pending' | 'completed' | 'cancelled'
  createdAt: string
  renewalDate: string
  billingCycle: string
}

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  read: boolean
  createdAt: string
  action: string
}

interface Service {
  id: string
  name: string
  slug: string
  description: string
  image: string
  price: number
  priceYearly: number
  priceUnit: string
  category: string
  badge?: string
  features: string[]
  demoUrl: string
  popular: boolean
}

interface RecommendedProduct {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  badgeText: string
  color: string
  slug: string
}

// Status configuration
const statusConfig = {
  active: { label: 'Actif', className: 'bg-green-100 text-green-800' },
  pending: { label: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
  completed: { label: 'Terminé', className: 'bg-gray-100 text-gray-800' },
  cancelled: { label: 'Annulé', className: 'bg-red-100 text-red-800' },
}

const notificationIcons = {
  info: <Info className="w-4 h-4 text-blue-500" />,
  warning: <AlertCircle className="w-4 h-4 text-yellow-500" />,
  success: <Check className="w-4 h-4 text-green-500" />,
  error: <X className="w-4 h-4 text-red-500" />,
}

function Info({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  )
}

// Recommended products data
const getRecommendedProducts = (services: Service[]): RecommendedProduct[] => {
  const iconMap: Record<string, React.ReactNode> = {
    'Éducation': <GraduationCap className="w-5 h-5" />,
    'Immobilier': <Building2 className="w-5 h-5" />,
    'Finance': <Calculator className="w-5 h-5" />,
    'Communication': <MessageSquare className="w-5 h-5" />,
    'Restauration': <Store className="w-5 h-5" />,
  }
  
  const colorMap: Record<string, string> = {
    'Éducation': 'bg-blue-500',
    'Immobilier': 'bg-purple-500',
    'Finance': 'bg-orange-500',
    'Communication': 'bg-emerald-500',
    'Restauration': 'bg-red-500',
  }
  
  const badgeMap: Record<string, string> = {
    'Éducation': 'Nouveau',
    'Immobilier': 'Populaire',
    'Finance': '-20%',
    'Communication': 'IA',
    'Restauration': 'Top',
  }
  
  return services.slice(0, 6).map(service => ({
    id: service.id,
    name: service.name.replace('MVP ', ''),
    description: service.description,
    icon: iconMap[service.category] || <Boxes className="w-5 h-5" />,
    badgeText: service.badge || badgeMap[service.category] || 'Nouveau',
    color: colorMap[service.category] || 'bg-gray-500',
    slug: service.slug,
  }))
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  
  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  
  // UI states
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('')
  const [showSupportChat, setShowSupportChat] = useState(false)
  const [supportMessage, setSupportMessage] = useState('')
  const [sendingSupport, setSendingSupport] = useState(false)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'services' | 'settings'>('dashboard')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      const [statsRes, ordersRes, notifsRes, servicesRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/dashboard/orders'),
        fetch('/api/dashboard/notifications'),
        fetch('/api/services'),
      ])
      
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
      
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json()
        setOrders(ordersData.orders || [])
      }
      
      if (notifsRes.ok) {
        const notifsData = await notifsRes.json()
        setNotifications(notifsData.notifications || [])
        setUnreadCount(notifsData.unreadCount || 0)
      }
      
      if (servicesRes.ok) {
        const servicesData = await servicesRes.json()
        setServices(servicesData.services || [])
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      showToast('Erreur de chargement des données', 'error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (status === "authenticated") {
      fetchDashboardData()
    }
  }, [status, fetchDashboardData])

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ redirectTo: "/login" })
  }

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      await fetch('/api/dashboard/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'markRead', notificationId })
      })
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await fetch('/api/dashboard/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'markAllRead' })
      })
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  // Handle new order
  const handleNewOrder = async () => {
    if (!selectedService) {
      showToast('Veuillez sélectionner un service', 'error')
      return
    }
    
    try {
      const response = await fetch('/api/dashboard/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'renew', orderId: selectedService })
      })
      
      if (response.ok) {
        showToast('Commande créée avec succès !', 'success')
        setShowNewOrderModal(false)
        setSelectedService('')
        fetchDashboardData()
      }
    } catch (error) {
      showToast('Erreur lors de la création de la commande', 'error')
    }
  }

  // Handle support message
  const handleSendSupport = async () => {
    if (!supportMessage.trim()) return
    
    setSendingSupport(true)
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1000))
    showToast('Message envoyé ! Nous vous répondrons bientôt.', 'success')
    setSupportMessage('')
    setSendingSupport(false)
    setShowSupportChat(false)
  }

  // Cancel order
  const handleCancelOrder = async (orderId: string) => {
    try {
      const response = await fetch('/api/dashboard/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel', orderId })
      })
      
      if (response.ok) {
        showToast('Commande annulée', 'info')
        fetchDashboardData()
      }
    } catch (error) {
      showToast("Erreur lors de l'annulation", 'error')
    }
  }

  // Filter orders by search
  const filteredOrders = orders.filter(order =>
    order.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Loading state
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#D4AF37] mx-auto mb-4" />
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  const recommendedProducts = getRecommendedProducts(services)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static z-50 h-screen bg-[#0a0a0a] text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center flex-shrink-0">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg text-[#D4AF37]">AfriSaaS</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Section: Principal */}
          {sidebarOpen && (
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Principal
            </p>
          )}
          
          <button 
            onClick={() => { setActiveTab('dashboard'); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              activeTab === 'dashboard' 
                ? 'bg-[#D4AF37]/10 text-[#D4AF37]' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Tableau de bord</span>}
          </button>

          {sidebarOpen && (
            <>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-3 px-3">
                Mes Activités
              </p>
              
              <button 
                onClick={() => { setActiveTab('orders'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37]' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Mes Commandes</span>
                {orders.filter(o => o.status === 'active').length > 0 && (
                  <Badge className="ml-auto bg-[#D4AF37] text-black text-xs">
                    {orders.filter(o => o.status === 'active').length}
                  </Badge>
                )}
              </button>
              
              <button 
                onClick={() => { setActiveTab('services'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === 'services' 
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37]' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Mes Services</span>
              </button>

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-3 px-3">
                Support
              </p>
              
              <button 
                onClick={() => { setShowSupportChat(true); setMobileSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Aide & Support</span>
              </button>

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-3 px-3">
                Mon Compte
              </p>
              
              <button 
                onClick={() => { setActiveTab('settings'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37]' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Paramètres</span>
              </button>
            </>
          )}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 bg-[#D4AF37]">
              <AvatarFallback className="text-black font-semibold text-sm">
                {session?.user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{session?.user?.name || 'Utilisateur'}</p>
                <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
              </div>
            )}
            <button 
              onClick={handleSignOut}
              className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <LayoutDashboard className="w-5 h-5" />
              </button>
              
              {/* Toggle sidebar button (desktop) */}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100"
              >
                <LayoutDashboard className="w-5 h-5 text-gray-400" />
              </button>
              
              <h1 className="text-xl md:text-2xl font-bold text-[#0a0a0a]">
                Bienvenue, {session?.user?.name?.split(' ')[0] || 'Utilisateur'} 👋
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-gray-300 focus:border-[#D4AF37]"
                />
              </div>
              
              {/* Notifications */}
              <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs text-[#D4AF37] h-auto p-0"
                        onClick={markAllAsRead}
                      >
                        Tout marquer comme lu
                      </Button>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      Aucune notification
                    </div>
                  ) : (
                    notifications.slice(0, 5).map((notif) => (
                      <DropdownMenuItem 
                        key={notif.id}
                        className={`p-3 cursor-pointer ${!notif.read ? 'bg-[#D4AF37]/5' : ''}`}
                        onClick={() => markAsRead(notif.id)}
                      >
                        <div className="flex gap-3 w-full">
                          <div className="mt-0.5">{notificationIcons[notif.type]}</div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${!notif.read ? 'font-semibold' : ''}`}>{notif.title}</p>
                            <p className="text-xs text-gray-500 truncate">{notif.message}</p>
                          </div>
                          {!notif.read && (
                            <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center justify-center text-[#D4AF37]">
                    Voir toutes les notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User avatar dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="w-8 h-8 bg-[#D4AF37]">
                      <AvatarFallback className="text-black text-sm">
                        {session?.user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{session?.user?.name || 'Utilisateur'}</span>
                      <span className="text-xs font-normal text-gray-500">{session?.user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                    <User className="mr-2 h-4 w-4" />
                    Mon Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Facturation
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 flex gap-6 flex-1">
          {/* Center Content */}
          <div className="flex-1 space-y-6 min-w-0">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-[#D4AF37] hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Services actifs</p>
                      <p className="text-2xl font-bold text-[#0a0a0a] mt-1">{stats?.activeServices || 0}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>{stats?.monthlyGrowth || '+0%'} ce mois</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#10B981] hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Dépenses mensuelles</p>
                      <p className="text-2xl font-bold text-[#0a0a0a] mt-1">
                        {stats?.monthlyExpenses ? `${(stats.monthlyExpenses / 1000).toFixed(0)}K` : '0K'}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-[#10B981]" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{stats?.currency || 'FCFA'} / mois</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Commandes totales</p>
                      <p className="text-2xl font-bold text-[#0a0a0a] mt-1">{stats?.totalOrders || 0}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>+{stats?.newOrders || 0} nouvelles</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Prochain renouvellement</p>
                      <p className="text-2xl font-bold text-[#0a0a0a] mt-1">{stats?.nextRenewalDays || 0}j</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 truncate">{stats?.nextRenewalService || '-'}</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Services Table */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg text-[#0a0a0a]">Mes services actifs</CardTitle>
                    <CardDescription>Gérez vos abonnements SaaS</CardDescription>
                  </div>
                  <Dialog open={showNewOrderModal} onOpenChange={setShowNewOrderModal}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#D4AF37] hover:bg-[#B8960C] text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau service
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Créer une nouvelle commande</DialogTitle>
                        <DialogDescription>
                          Sélectionnez un service pour souscrire un nouvel abonnement
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <label className="text-sm font-medium mb-2 block">Choisir un service</label>
                        <select 
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">-- Sélectionner --</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name} - {(service.price / 1000).toFixed(0)}K {service.priceUnit}/mois
                            </option>
                          ))}
                        </select>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewOrderModal(false)}>
                          Annuler
                        </Button>
                        <Button 
                          onClick={handleNewOrder}
                          className="bg-[#D4AF37] hover:bg-[#B8960C] text-white"
                          disabled={!selectedService}
                        >
                          Confirmer la commande
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Service</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Statut</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Prix</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Renouvellement</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-gray-500">
                            Aucune commande trouvée
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 flex items-center justify-center">
                                  <Package className="w-5 h-5 text-[#D4AF37]" />
                                </div>
                                <div>
                                  <span className="font-medium text-[#0a0a0a] block">{order.service}</span>
                                  <span className="text-xs text-gray-500">{order.id}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={statusConfig[order.status].className}>
                                {statusConfig[order.status].label}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-medium text-[#0a0a0a]">
                                {(order.amount / 1000).toFixed(0)}K {stats?.currency}
                              </span>
                              <span className="text-xs text-gray-500 block">/{order.billingCycle === 'monthly' ? 'mois' : 'an'}</span>
                            </td>
                            <td className="py-3 px-4 text-gray-600 text-sm">
                              {new Date(order.renewalDate).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {order.status === 'active' && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-red-600 hover:bg-red-50"
                                    onClick={() => handleCancelOrder(order.id)}
                                  >
                                    Annuler
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-[#D4AF37] hover:bg-[#D4AF37]/10"
                                  onClick={() => router.push(`/mvp/${services.find(s => s.id === order.serviceId)?.slug || ''}`)}
                                >
                                  Ouvrir <ExternalLink className="w-3 h-3 ml-1" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-[#0a0a0a]">Recommandations pour vous</CardTitle>
                    <CardDescription>Découvrez nos nouveaux services populaires</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
                    onClick={() => window.location.href = '/#secteurs'}
                  >
                    Voir tout <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedProducts.map((product) => (
                    <Card 
                      key={product.id} 
                      className="border border-gray-200 hover:border-[#D4AF37]/50 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => router.push(`/mvp/${product.slug}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-10 h-10 rounded-lg ${product.color} text-white flex items-center justify-center`}>
                            {product.icon}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {product.badgeText}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-[#0a0a0a] group-hover:text-[#D4AF37] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                        <Button variant="link" className="p-0 h-auto mt-3 text-[#D4AF37]">
                          Découvrir <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <aside className="w-80 space-y-6 hidden xl:block">
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base text-[#0a0a0a]">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  onClick={() => setShowNewOrderModal(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37] text-white flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm text-[#0a0a0a]">Nouvelle commande</span>
                </button>
                
                <button
                  onClick={() => setShowSupportChat(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#10B981] text-white flex items-center justify-center">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm text-[#0a0a0a]">Support client</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm text-[#0a0a0a]">Facturation</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-600 text-white flex items-center justify-center">
                    <Settings className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm text-[#0a0a0a]">Paramètres</span>
                </button>
              </CardContent>
            </Card>

            {/* Support Widget */}
            <Card className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e] text-white">
              <CardContent className="p-5">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-4">
                  <Headphones className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-bold text-lg mb-2">Besoin d'aide?</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Notre équipe est disponible 24/7 pour vous accompagner.
                </p>
                <Button 
                  className="w-full bg-[#D4AF37] hover:bg-[#B8960C] text-white"
                  onClick={() => setShowSupportChat(true)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chattez avec nous
                </Button>
              </CardContent>
            </Card>

            {/* Promo Card */}
            <Card className="border-2 border-dashed border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/5 to-transparent">
              <CardContent className="p-5 text-center">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-3">
                  <Star className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="font-bold text-[#0a0a0a] mb-2">Solution sur mesure?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Besoin d'une solution personnalisée pour votre entreprise?
                </p>
                <Button 
                  variant="outline" 
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  onClick={() => setShowSupportChat(true)}
                >
                  Nous contacter
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      {/* Support Chat Modal */}
      <Dialog open={showSupportChat} onOpenChange={setShowSupportChat}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-[#D4AF37]" />
              Support Client
            </DialogTitle>
            <DialogDescription>
              Comment pouvons-nous vous aider? Réponse sous 2h.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: <HelpCircle className="w-4 h-4" />, label: 'Question technique' },
                { icon: <CreditCard className="w-4 h-4" />, label: 'Problème de paiement' },
                { icon: <Package className="w-4 h-4" />, label: 'Problème service' },
                { icon: <FileText className="w-4 h-4" />, label: 'Facture' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSupportMessage(item.label + ': ')}
                  className="flex items-center gap-2 p-2 rounded-lg border hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors text-sm"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Input
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="Décrivez votre problème..."
                className="pr-10"
                onKeyDown={(e) => e.key === 'Enter' && handleSendSupport()}
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={handleSendSupport}
                disabled={!supportMessage.trim() || sendingSupport}
              >
                {sendingSupport ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-green-500' :
          toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white animate-in slide-in-from-right`}>
          {toast.type === 'success' && <Check className="w-4 h-4" />}
          {toast.type === 'error' && <X className="w-4 h-4" />}
          {toast.type === 'info' && <Info className="w-4 h-4" />}
          <span className="text-sm">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Action Button for mobile */}
      <button
        onClick={() => setShowNewOrderModal(true)}
        className="fixed bottom-6 right-6 xl:hidden w-14 h-14 bg-[#D4AF37] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#B8960C] transition-colors z-30"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}
