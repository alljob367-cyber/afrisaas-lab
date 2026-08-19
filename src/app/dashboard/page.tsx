'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
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
} from "lucide-react"

// Types
interface Order {
  id: string
  product: string
  image: string
  status: 'active' | 'pending' | 'expired'
  price: string
  renewalDate: string
}

interface RecommendedProduct {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  badgeText: string
  color: string
}

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  color: string
}

// Status configuration
const statusConfig = {
  active: { label: 'Actif', className: 'bg-green-100 text-green-800' },
  pending: { label: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
  expired: { label: 'Expiré', className: 'bg-red-100 text-red-800' },
}

// Sample orders data
const sampleOrders: Order[] = [
  {
    id: '1',
    product: 'MVP Restaurant',
    image: '/images/mvp-restaurant.png',
    status: 'active',
    price: '25 000 FCFA/mois',
    renewalDate: '2024-02-15',
  },
  {
    id: '2',
    product: 'MVP WhatsApp Business',
    image: '/images/mvp-whatsapp.png',
    status: 'active',
    price: '15 000 FCFA/mois',
    renewalDate: '2024-02-10',
  },
  {
    id: '3',
    product: 'MVP Finances',
    image: '/images/mvp-finances.png',
    status: 'pending',
    price: '20 000 FCFA/mois',
    renewalDate: '2024-02-20',
  },
]

// Recommended products
const recommendedProducts: RecommendedProduct[] = [
  {
    id: '1',
    name: 'MVP École',
    description: 'Gestion scolaire complète',
    icon: <GraduationCap className="w-5 h-5" />,
    badgeText: 'Nouveau',
    color: 'bg-blue-500',
  },
  {
    id: '2',
    name: 'MVP Immobilier',
    description: 'Gestion immobilière',
    icon: <Building2 className="w-5 h-5" />,
    badgeText: 'Populaire',
    color: 'bg-purple-500',
  },
  {
    id: '3',
    name: 'MVP Stock',
    description: 'Gestion de stock',
    icon: <Boxes className="w-5 h-5" />,
    badgeText: '-20%',
    color: 'bg-orange-500',
  },
  {
    id: '4',
    name: 'MVP AI Assistant',
    description: 'Assistant IA intelligent',
    icon: <Bot className="w-5 h-5" />,
    badgeText: 'IA',
    color: 'bg-emerald-500',
  },
  {
    id: '5',
    name: 'MVP Tontine',
    description: 'Gestion de tontines',
    icon: <Handshake className="w-5 h-5" />,
    badgeText: 'Tendance',
    color: 'bg-pink-500',
  },
  {
    id: '6',
    name: 'MVP Salon',
    description: 'Gestion de salon de coiffure',
    icon: <Scissors className="w-5 h-5" />,
    badgeText: 'Nouveau',
    color: 'bg-cyan-500',
  },
]

// Quick actions
const quickActions: QuickAction[] = [
  { id: '1', label: 'Nouvelle commande', icon: <Plus className="w-4 h-4" />, href: '#', color: 'bg-[#D4AF37] text-white' },
  { id: '2', label: 'Support client', icon: <Headphones className="w-4 h-4" />, href: '#', color: 'bg-[#10B981] text-white' },
  { id: '3', label: 'Facturation', icon: <DollarSign className="w-4 h-4" />, href: '#', color: 'bg-blue-500 text-white' },
  { id: '4', label: 'Paramètres', icon: <Settings className="w-4 h-4" />, href: '#', color: 'bg-gray-600 text-white' },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]" />
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  const handleSignOut = async () => {
    await signOut({ redirectTo: "/login" })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0a0a0a] text-white transition-all duration-300 flex flex-col`}>
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
        <nav className="flex-1 p-4 space-y-2">
          {/* Section: Tableau de bord */}
          {sidebarOpen && (
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Principal
            </p>
          )}
          
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Tableau de bord</span>}
          </button>

          {sidebarOpen && (
            <>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-3 px-3">
                Mes Activités
              </p>
              
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span>Mes Commandes</span>
              </button>
              
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                <Package className="w-5 h-5" />
                <span>Mes Services</span>
              </button>

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-3 px-3">
                Support
              </p>
              
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span>Aide & Support</span>
              </button>

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-3 px-3">
                Mon Compte
              </p>
              
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
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
      <main className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#0a0a0a]">
                Bienvenue, {session?.user?.name?.split(' ')[0] || 'Utilisateur'} 👋
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher..." 
                  className="pl-10 w-64 border-gray-300 focus:border-[#D4AF37]"
                />
              </div>
              
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 flex gap-6">
          {/* Center Content */}
          <div className="flex-1 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-[#D4AF37]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Services actifs</p>
                      <p className="text-2xl font-bold text-[#0a0a0a] mt-1">3</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12% ce mois</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#10B981]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Dépenses mensuelles</p>
                      <p className="text-2xl font-bold text-[#0a0a0a] mt-1">60K</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-[#10B981]" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">FCFA / mois</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Commandes totales</p>
                      <p className="text-2xl font-bold text-[#0a0a0a] mt-1">12</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>+3 nouvelles</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Prochain renouvellement</p>
                      <p className="text-2xl font-bold text-[#0a0a0a] mt-1">5j</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">WhatsApp Business</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Services Table */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-[#0a0a0a]">Mes services actifs</CardTitle>
                    <CardDescription>Gérez vos abonnements SaaS</CardDescription>
                  </div>
                  <Button className="bg-[#D4AF37] hover:bg-[#B8960C] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau service
                  </Button>
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
                      {sampleOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden">
                                <img 
                                  src={order.image} 
                                  alt={order.product}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder.svg'
                                  }}
                                />
                              </div>
                              <span className="font-medium text-[#0a0a0a]">{order.product}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={statusConfig[order.status].className}>
                              {statusConfig[order.status].label}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{order.price}</td>
                          <td className="py-3 px-4 text-gray-600">{order.renewalDate}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm" className="text-[#D4AF37] hover:bg-[#D4AF37]/10">
                              Gérer <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </td>
                        </tr>
                      ))}
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
                  <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                    Voir tout <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedProducts.map((product) => (
                    <Card key={product.id} className="border border-gray-200 hover:border-[#D4AF37]/50 hover:shadow-md transition-all cursor-pointer group">
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
                        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
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
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center`}>
                      {action.icon}
                    </div>
                    <span className="font-medium text-sm text-[#0a0a0a]">{action.label}</span>
                  </button>
                ))}
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
                <Button className="w-full bg-[#D4AF37] hover:bg-[#B8960C] text-white">
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
                <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                  Nous contacter
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
