'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
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
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Zap,
  Shield,
  Globe,
  ChevronRight,
  LogIn,
} from "lucide-react"

const services = [
  { icon: <Store className="w-6 h-6" />, name: "MVP Restaurant", desc: "Gestion complète de restaurant", color: "from-orange-500 to-red-500" },
  { icon: <MessageCircle className="w-6 h-6" />, name: "MVP WhatsApp Business", desc: "Communication professionnelle", color: "from-green-500 to-emerald-500" },
  { icon: <Calculator className="w-6 h-6" />, name: "MVP Finances", desc: "Gestion financière simplifiée", color: "from-blue-500 to-cyan-500" },
  { icon: <GraduationCap className="w-6 h-6" />, name: "MVP École", desc: "Administration scolaire", color: "from-purple-500 to-pink-500" },
  { icon: <Building2 className="w-6 h-6" />, name: "MVP Immobilier", desc: "Gestion immobilière", color: "from-indigo-500 to-purple-500" },
  { icon: <Boxes className="w-6 h-6" />, name: "MVP Stock", desc: "Gestion des stocks", color: "from-amber-500 to-orange-500" },
  { icon: <Bot className="w-6 h-6" />, name: "MVP AI Assistant", desc: "Assistant IA intelligent", color: "from-teal-500 to-green-500" },
  { icon: <Handshake className="w-6 h-6" />, name: "MVP Tontine", desc: "Gestion de tontines", color: "from-pink-500 to-rose-500" },
  { icon: <Scissors className="w-6 h-6" />, name: "MVP Salon", desc: "Gestion salon de coiffure", color: "from-cyan-500 to-blue-500" },
]

const features = [
  { icon: <Zap className="w-5 h-5" />, title: "Déploiement Rapide", desc: "Votre MVP prêt en 48h" },
  { icon: <Shield className="w-5 h-5" />, title: "Sécurisé", desc: "Données protégées et sauvegardées" },
  { icon: <Globe className="w-5 h-5" />, title: "Accessible Partout", desc: "Fonctionne sur tous les appareils" },
  { icon: <Users className="w-5 h-5" />, title: "Support 24/7", desc: "Équipe dédiée à votre succès" },
]

const testimonials = [
  { name: "Amadou D.", role: "Restaurateur", text: "AfriSaaS a transformé mon entreprise. Gestion simplifiée et efficace!", rating: 5 },
  { name: "Fatou M.", role: "Commerçante", text: "Le MVP WhatsApp Business a boosté mes ventes de 40%!", rating: 5 },
  { name: "Kofi A.", role: "Directeur d'école", text: "L'administration scolaire n'a jamais été aussi facile.", rating: 5 },
]

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#D4AF37]">AfriSaaS</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Fonctionnalités</a>
          <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Témoignages</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Tarifs</a>
        </div>

        <div className="flex items-center gap-3">
          {status === "authenticated" ? (
            <Button 
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8960C] hover:from-[#B8960C] hover:to-[#D4AF37] text-white font-semibold"
            >
              Mon Tableau de Bord
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <>
              <Button 
                variant="ghost" 
                onClick={() => router.push("/login")}
                className="text-gray-300 hover:text-white"
              >
                Connexion
              </Button>
              <Button 
                onClick={() => router.push("/login")}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8960C] hover:from-[#B8960C] hover:to-[#D4AF37] text-white font-semibold"
              >
                Commencer
                <ArrowRight className="w-4 h-2 ml-2" />
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30 px-4 py-1.5">
            <Star className="w-3 h-3 mr-2 fill-current" />
            La #1 Plateforme SaaS Panafricaine
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Transformez Votre Entreprise
            <br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5D76E] to-[#D4AF37] bg-clip-text text-transparent">
              Avec Des Solutions Digitales
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            AfriSaaS offre des solutions SaaS adaptées aux réalités africaines. 
            Des outils puissants pour gérer, croître et digitaliser votre entreprise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8960C] hover:from-[#B8960C] hover:to-[#D4AF37] text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-[#D4AF37]/25"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Démarrer Gratuitement
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-700 text-white hover:bg-white/5 px-8 py-6 text-lg"
            >
              Voir la Démo
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-16 border-t border-gray-800">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#D4AF37]">500+</p>
              <p className="text-sm text-gray-500 mt-1">Entreprises</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#10B981]">15+</p>
              <p className="text-sm text-gray-500 mt-1">Pays Africains</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-purple-400">99.9%</p>
              <p className="text-sm text-gray-500 mt-1">Disponibilité</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 px-6 lg:px-12 py-24 bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#0d0d1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30">
              Nos Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Des Solutions Pour Chaque <span className="text-[#D4AF37]">Besoin</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Découvrez notre catalogue de solutions SaaS conçues spécialement pour le marché africain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="group bg-gray-900/50 border-gray-800 hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{service.desc}</p>
                  <Button variant="link" className="p-0 mt-4 text-[#D4AF37] hover:text-[#F5D76E]">
                    En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 lg:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/30">
                Pourquoi Nous Choisir
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Une Plateforme Conçue Pour <span className="text-[#D4AF37]">L'Afrique</span>
              </h2>
              <p className="text-gray-400 mb-8">
                Contrairement aux solutions occidentales, AfriSaaS comprend les défis uniques 
                des entreprises africaines et y apporte des réponses concrètes.
              </p>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-900 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#D4AF37]/20 to-[#10B981]/20 p-1">
                <div className="w-full h-full rounded-3xl bg-[#0a0a0a] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center mx-auto mb-6">
                      <Rocket className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Prêt à Démarrer?</h3>
                    <p className="text-gray-400 mb-6">Rejoignez 500+ entreprises qui font confiance à AfriSaaS</p>
                    <Button 
                      size="lg"
                      onClick={() => router.push("/login")}
                      className="bg-gradient-to-r from-[#D4AF37] to-[#B8960C] hover:from-[#B8960C] hover:to-[#D4AF37] text-white"
                    >
                      <LogIn className="w-5 h-5 mr-2" />
                      Créer Mon Compte
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                ✓ Actif maintenant
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#D4AF37] text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                ★ 4.9/5 avis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 px-6 lg:px-12 py-24 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30">
              Témoignages
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ce Que Disent <span className="text-[#D4AF37]">Nos Clients</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center text-black font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="relative z-10 px-6 lg:px-12 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#10B981]/10 rounded-3xl p-12 border border-[#D4AF37]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à Transformer Votre Entreprise?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Rejoignez la révolution digitale africaine. Commencez gratuitement et 
              évoluez selon vos besoins.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button 
                size="lg"
                onClick={() => router.push("/login")}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8960C] hover:from-[#B8960C] hover:to-[#D4AF37] text-white px-8 py-6 text-lg font-semibold"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Commencer Maintenant
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#10B981]" />
                Essai gratuit
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#10B981]" />
                Sans carte bancaire
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#10B981]" />
                Annulation facile
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-[#D4AF37]">AfriSaaS</span>
              </div>
              <p className="text-sm text-gray-500">
                La plateforme SaaS panafricaine pour les entreprises modernes.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produits</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">MVP Restaurant</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">MVP Finance</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Tous les services</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Carrières</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Statut</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 AfriSaaS. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
