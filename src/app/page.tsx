'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Zap,
  Shield,
  Headphones,
  ShoppingBag,
  UtensilsCrossed,
  GraduationCap,
  Heart,
  Building2,
  Truck,
  TreePine,
  Landmark,
  Hammer,
  Grid3X3,
  Eye,
  Monitor,
  ShoppingCart,
  Rocket,
  MessageSquare,
  BarChart3,
  Lightbulb,
  Cpu,
  Bot,
  ChevronRight,
} from "lucide-react"

// Sector data
const sectors = [
  { icon: <ShoppingBag className="w-6 h-6" />, name: "Commerce" },
  { icon: <UtensilsCrossed className="w-6 h-6" />, name: "Restaurant" },
  { icon: <GraduationCap className="w-6 h-6" />, name: "Éducation" },
  { icon: <Heart className="w-6 h-6" />, name: "Santé" },
  { icon: <Building2 className="w-6 h-6" />, name: "Immobilier" },
  { icon: <Truck className="w-6 h-6" />, name: "Transport" },
  { icon: <TreePine className="w-6 h-6" />, name: "Agriculture" },
  { icon: <Landmark className="w-6 h-6" />, name: "Finance" },
  { icon: <Hammer className="w-6 h-6" />, name: "Artisanat" },
  { icon: <Grid3X3 className="w-6 h-6" />, name: "Voir plus" },
]

// MVP Products data
const mvpProducts = [
  {
    id: 1,
    name: "Restaurant Manager",
    description: "Gérez votre restaurant facilement",
    category: "Restaurant",
    price: "199 000 FCFA",
    image: "/images/landing/mvp-restaurant.png",
    badge: "Populaire",
    badgeColor: "bg-green-500",
    link: "/mvp/restaurant-manager",
    available: true,
  },
  {
    id: 2,
    name: "WhatsApp CRM",
    description: "CRM intégré à WhatsApp",
    category: "CRM",
    price: "149 000 FCFA",
    image: "/images/landing/mvp-whatsapp.png",
    badge: "IA",
    badgeColor: "bg-emerald-500",
    link: "/mvp/whatsapp-crm",
    available: true,
  },
  {
    id: 3,
    name: "École Manager",
    description: "Gestion complète d'établissements",
    category: "Éducation",
    price: "179 000 FCFA",
    image: "/images/landing/mvp-ecole.png",
    badge: "Populaire",
    badgeColor: "bg-green-500",
    link: "#",
    available: false,
  },
  {
    id: 4,
    name: "Immo Pro",
    description: "Gérez vos biens immobiliers",
    category: "Immobilier",
    price: "199 000 FCFA",
    image: "/images/landing/mvp-immo.png",
    badge: "Nouveau",
    badgeColor: "bg-blue-500",
    link: "#",
    available: false,
  },
  {
    id: 5,
    name: "Finances Plus",
    description: "Comptabilité & gestion financière",
    category: "Finance",
    price: "159 000 FCFA",
    image: "/images/landing/mvp-finances.png",
    badge: "IA",
    badgeColor: "bg-emerald-500",
    link: "#",
    available: false,
  },
]

// Features data
const features = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Solutions prêtes à l'emploi",
    description: "Des MVP testés et validés pour démarrer rapidement.",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Personnalisation",
    description: "Nous adaptons chaque solution à vos besoins spécifiques.",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Technologies modernes",
    description: "Des solutions performantes, sécurisées et évolutives.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Paiement sécurisé",
    description: "Payez en toute sécurité via Channov (mobile money, carte...).",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Support dédié",
    description: "Une équipe disponible pour vous accompagner.",
  },
]

// How it works steps
const steps = [
  {
    number: "1",
    icon: <Search className="w-8 h-8" />,
    title: "Trouvez votre solution",
    description: "Recherchez votre problème ou parcourez nos catégories.",
  },
  {
    number: "2",
    icon: <Monitor className="w-8 h-8" />,
    title: "Découvrez le MVP",
    description: "Explorez les fonctionnalités, regardez la démo.",
  },
  {
    number: "3",
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "Achetez ou demandez un devis",
    description: "Achetez directement ou demandez une personnalisation.",
  },
  {
    number: "4",
    icon: <Rocket className="w-8 h-8" />,
    title: "Utilisez et développez votre activité",
    description: "Recevez votre solution et faites croître votre business.",
  },
]

// AI Lab features
const aiFeatures = [
  { icon: <Bot className="w-5 h-5" />, text: "Automatisation intelligente" },
  { icon: <MessageSquare className="w-5 h-5" />, text: "Chatbots & WhatsApp IA" },
  { icon: <BarChart3 className="w-5 h-5" />, text: "Analyse prédictive" },
  { icon: <Zap className="w-5 h-5" />, text: "Intégrations avancées" },
]

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Jean Paul K.",
    role: "Restaurateur",
    avatar: "/images/landing/avatar-jean.png",
    text: "Grâce à AfriSaas Lab, j'ai pu digitaliser mon restaurant en quelques jours. Excellent support !",
  },
  {
    id: 2,
    name: "Aicha M.",
    role: "Entrepreneure",
    avatar: "/images/landing/avatar-aicha.png",
    text: "Le CRM WhatsApp a transformé ma relation client. Je le recommande fortement.",
  },
  {
    id: 3,
    name: "Kevin D.",
    role: "Directeur d'école",
    avatar: "/images/landing/avatar-kevin.png",
    text: "Une équipe professionnelle, des solutions fiables et un suivi impeccable.",
  },
  {
    id: 4,
    name: "Fatou M.",
    role: "Commerçante",
    avatar: "/images/landing/avatar-fatou.png",
    text: "Enfin des solutions adaptées à nos réalités africaines. Bravo à l'équipe !",
  },
]

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* ==================== NAVBAR ==================== */}
      <nav className="relative z-50 border-b border-gray-800/50 bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-wide">AFRISAAS</span>
                <span className="block text-xs text-[#10B981] -mt-1">LAB</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#accueil" className="text-sm hover:text-[#D4AF37] transition-colors">Accueil</a>
              <a href="#mvp" className="text-sm hover:text-[#D4AF37] transition-colors">MVP</a>
              <a href="#secteurs" className="text-sm hover:text-[#D4AF37] transition-colors">Secteurs</a>
              <a href="#ia" className="text-sm hover:text-[#D4AF37] transition-colors">Solutions IA</a>
              <a href="#services" className="text-sm hover:text-[#D4AF37] transition-colors">Services</a>
              <a href="#tarifs" className="text-sm hover:text-[#D4AF37] transition-colors">Tarifs</a>
              <a href="#apropos" className="text-sm hover:text-[#D4AF37] transition-colors">À propos</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {status === "authenticated" ? (
                <Button 
                  onClick={() => router.push("/dashboard")}
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-white/5"
                >
                  Mon Tableau de Bord
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={() => router.push("/login")}
                    variant="ghost" 
                    className="text-white hover:bg-white/5 hidden sm:flex"
                  >
                    Se connecter
                  </Button>
                  <Button 
                    onClick={() => router.push("/login")}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#B8960C] hover:from-[#B8960C] hover:to-[#D4AF37] text-black font-semibold"
                  >
                    S'inscrire
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section id="accueil" className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981]/10 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                UN PROBLÈME.<br />
                <span className="text-[#D4AF37]">UNE SOLUTION.</span><br />
                UN <span className="text-[#D4AF37]">MVP</span>.
              </h1>

              <p className="text-lg text-gray-300 max-w-xl">
                Découvrez des solutions digitales prêtes à tester, acheter ou personnaliser pour développer votre activité.
              </p>

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Ex: Je veux gérer mon restaurant, mes clients, mes ventes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 bg-white/10 border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                  />
                </div>
                <Button className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 font-semibold whitespace-nowrap">
                  Rechercher <Search className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Popular Searches */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-gray-500">Recherches populaires :</span>
                {["Restaurant", "CRM", "WhatsApp", "École", "Immobilier", "Commerce"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-sm px-3 py-1 rounded-full border border-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#D4AF37]">+50</p>
                    <p className="text-xs text-gray-500">MVP disponibles</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#10B981]">+300</p>
                    <p className="text-xs text-gray-500">Entrepreneurs équipés</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Grid3X3 className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-500">+15</p>
                    <p className="text-xs text-gray-500">Secteurs couverts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-500">+98%</p>
                    <p className="text-xs text-gray-500">Clients satisfaits</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#10B981]/20 rounded-3xl blur-3xl" />
                <img
                  src="/images/landing/hero-woman.png"
                  alt="AfriSaas - Femme d'affaires africaine"
                  className="relative rounded-3xl w-full max-w-md mx-auto object-cover"
                />
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#D4AF37]/30 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-[#10B981]/30 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTORS SECTION ==================== */}
      <section id="secteurs" className="py-16 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <h2 className="text-lg font-semibold text-[#D4AF37] tracking-wider uppercase">
                Trouvez une Solution par Secteur
              </h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </div>

          {/* Sectors Grid */}
          <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
            {sectors.map((sector, index) => (
              <button
                key={index}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#D4AF37]/50 hover:bg-gray-900 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gray-800 group-hover:bg-[#D4AF37]/10 flex items-center justify-center text-gray-400 group-hover:text-[#D4AF37] transition-colors">
                  {sector.icon}
                </div>
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors text-center">
                  {sector.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MVP POPULAIRES SECTION ==================== */}
      <section id="mvp" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <h2 className="text-2xl font-bold">MVP Populaires</h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
            <a href="#" className="text-[#10B981] hover:text-[#059669] text-sm flex items-center gap-1">
              Voir tous les MVP <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* MVP Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {mvpProducts.map((product) => (
              <Card 
                key={product.id} 
                className={`group bg-gray-900/80 border-gray-800 hover:border-[#D4AF37]/50 overflow-hidden transition-all duration-300 ${
                  product.available ? 'cursor-pointer' : 'opacity-70'
                }`}
                onClick={() => product.available && product.link !== '#' && router.push(product.link)}
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs`}>
                    {product.badge}
                  </Badge>
                  {product.available && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-semibold text-sm">
                        Essayer le MVP →
                      </span>
                    </div>
                  )}
                  {!product.available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white px-4 py-2 rounded-lg font-semibold text-sm bg-gray-800">
                        Bientôt disponible
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {product.name}
                      {product.available && (
                        <span className="ml-2 text-xs text-green-400">● Opérationnel</span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500">{product.description}</p>
                    <p className="text-xs text-[#10B981] mt-1">{product.category}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-800">
                    <p className="text-lg font-bold text-[#D4AF37]">{product.price}<span className="text-xs text-gray-500 font-normal">/mois</span></p>
                  </div>

                  <div className="flex gap-2">
                    {product.available ? (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 border-gray-700 text-white hover:bg-white/5 text-xs"
                          onClick={(e) => { e.stopPropagation(); router.push(product.link) }}
                        >
                          Voir
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-[#D4AF37] hover:bg-[#B8960C] text-black text-xs font-semibold"
                          onClick={(e) => { e.stopPropagation(); router.push(product.link) }}
                        >
                          Essayer
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-white hover:bg-white/5 text-xs" disabled>
                          Voir
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-white hover:bg-white/5 text-xs" disabled>
                          Démo
                        </Button>
                        <Button size="sm" className="flex-1 bg-gray-700 text-gray-400 text-xs font-semibold" disabled>
                          Bientôt
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== POURQUOI CHOISIR SECTION ==================== */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <h2 className="text-2xl font-bold">Pourquoi Choisir AfriSaas Lab ?</h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.slice(0, 5).map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-[#10B981]/50 text-center transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4 text-[#10B981] group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-bold mb-2 group-hover:text-[#10B981] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== COMMENT ÇA MARCHE SECTION ==================== */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <h2 className="text-2xl font-bold">Comment ça Marche ?</h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                {/* Step Number Circle */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#10B981] text-black font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>

                {/* Connector Line (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#10B981] to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI LAB SECTION ==================== */}
      <section id="ia" className="py-20 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0d1f17] to-[#0a0a0a]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
                <Bot className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-400 font-medium">AFRISAAS AI LAB</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold">
                L'IA AU SERVICE DE<br />
                <span className="text-[#D4AF37]">VOTRE CROISSANCE</span>
              </h2>

              <p className="text-gray-400">
                Des solutions intelligentes pour automatiser, analyser et faire passer votre entreprise au niveau supérieur.
              </p>

              <Button className="bg-[#D4AF37] hover:bg-[#B8960C] text-black font-semibold">
                Découvrir nos solutions IA
              </Button>

              {/* AI Features List */}
              <div className="space-y-4 pt-4">
                {aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                      {feature.icon}
                    </div>
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#10B981]/20 rounded-3xl blur-3xl" />
              <img
                src="/images/landing/ai-robot.png"
                alt="AI Robot - AfriSaas Lab"
                className="relative rounded-3xl w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <h2 className="text-2xl font-bold">Ils Nous Font Confiance</h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-gray-900/50 border-gray-800 p-6 hover:border-[#D4AF37]/30 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]/30"
                  />
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 italic">&ldquo;{testimonial.text}&rdquo;</p>
                
                {/* Stars */}
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <div className="w-2 h-2 rounded-full bg-gray-700" />
            <div className="w-2 h-2 rounded-full bg-gray-700" />
            <div className="w-2 h-2 rounded-full bg-gray-700" />
          </div>
        </div>
      </section>

      {/* ==================== CTA FOOTER SECTION ==================== */}
      <section id="tarifs" className="py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 rounded-3xl p-8 md:p-12 border border-gray-700/50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  PRÊT À TRANSFORMER VOTRE IDÉE<br />
                  EN <span className="text-[#D4AF37]">SUCCÈS ?</span>
                </h2>
                <p className="text-gray-400">
                  Rejoignez des centaines d'entrepreneurs qui nous font déjà confiance.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button 
                  onClick={() => router.push("/login")}
                  className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 font-semibold"
                >
                  Parcourir les MVP
                </Button>
                <Button 
                  onClick={() => router.push("/login")}
                  className="bg-[#D4AF37] hover:bg-[#B8960C] text-black px-8 py-4 font-semibold"
                >
                  Demander un devis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer id="apropos" className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-black" />
                </div>
                <span className="font-bold text-[#D4AF37]">AfriSaas Lab</span>
              </div>
              <p className="text-sm text-gray-500">
                La plateforme SaaS panafricaine pour les entreprises modernes.
              </p>
            </div>
            
            {/* Products */}
            <div>
              <h4 className="font-semibold mb-4">Produits</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Restaurant Manager</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">WhatsApp CRM</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">École Manager</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Tous les MVP</a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Statut du service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 AfriSaas Lab. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Conditions d'utilisation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
