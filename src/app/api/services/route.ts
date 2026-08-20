import { NextResponse } from "next/server"

// All available MVP services
const services = [
  {
    id: "1",
    name: "MVP Restaurant Manager",
    slug: "restaurant-manager",
    description: "Système complet de gestion restaurant avec menu, commandes, facturation",
    longDescription: "Solution tout-en-un pour les restaurants africains. Gérez vos menus, suivez les commandes en temps réel, générez des factures et analysez vos performances.",
    image: "/images/mvp-restaurant.jpg",
    price: 25000,
    priceYearly: 250000,
    priceUnit: "FCFA",
    category: "Restauration",
    badge: "Populaire",
    features: [
      "Gestion des menus et cartes",
      "Suivi des commandes en temps réel",
      "Facturation automatique",
      "Tableau de bord analytique",
      "Gestion des tables",
      "Rapports de ventes"
    ],
    demoUrl: "/mvp/restaurant-manager",
    popular: true
  },
  {
    id: "2",
    name: "MVP WhatsApp Business CRM",
    slug: "whatsapp-crm",
    description: "CRM intégré à WhatsApp pour gérer vos clients et conversations",
    longDescription: "Centralisez toutes vos conversations WhatsApp. Répondez rapidement, automatisez les messages courants et suivez l'historique de chaque client.",
    image: "/images/mvp-whatsapp.jpg",
    price: 15000,
    priceYearly: 150000,
    priceUnit: "FCFA",
    category: "Communication",
    badge: "Nouveau",
    features: [
      "Chat multi-comptes WhatsApp",
      "Templates de messages prédéfinis",
      "Automatisation des réponses",
      "Analytics des conversations",
      "Gestion des contacts",
      "Notes internes par contact"
    ],
    demoUrl: "/mvp/whatsapp-crm",
    popular: true
  },
  {
    id: "3",
    name: "MVP Finances & Comptabilité",
    slug: "finances",
    description: "Gestion financière complète pour PME africaines",
    longDescription: "Simplifiez votre comptabilité. Suivez vos revenus et dépenses, générez des rapports financiers et restez en conformité fiscale.",
    image: "/images/mvp-finances.jpg",
    price: 20000,
    priceYearly: 200000,
    priceUnit: "FCFA",
    category: "Finance",
    badge: "Essentiel",
    features: [
      "Comptabilité simplifiée",
      "Rapports financiers détaillés",
      "Gestion des dépenses",
      "Facturation professionnelle",
      "Suivi des impôts",
      "Export vers Excel/PDF"
    ],
    demoUrl: "#",
    popular: false
  },
  {
    id: "4",
    name: "MVP École & Éducation",
    slug: "ecole",
    description: "Plateforme de gestion scolaire pour établissements africains",
    longDescription: "Digitalisez votre établissement scolaire. Gérez les élèves, les enseignants, les emplois du temps et la communication avec les parents.",
    image: "/images/mvp-ecole.jpg",
    price: 30000,
    priceYearly: 300000,
    priceUnit: "FCFA",
    category: "Éducation",
    badge: "Nouveau",
    features: [
      "Gestion complète des élèves",
      "Emploi du temps interactif",
      "Notes et bulletins en ligne",
      "Paiements des frais scolaires",
      "Portail parent/élève",
      "Communication enseignant-parent"
    ],
    demoUrl: "#",
    popular: false
  },
  {
    id: "5",
    name: "MVP Immobilier",
    slug: "immo",
    description: "Gestion immobilière complète : biens, locataires, loyers",
    longDescription: "Gérez votre portefolio immobilier efficacement. Suivez les loyers, gérez les contrats et communiquez avec vos locataires.",
    image: "/images/mvp-immo.jpg",
    price: 35000,
    priceYearly: 350000,
    priceUnit: "FCFA",
    category: "Immobilier",
    badge: "Premium",
    features: [
      "Gestion des biens immobiliers",
      "Suivi des loyers et paiements",
      "Contrats de location digitalisés",
      "Rapports de performance",
      "Gestion des maintenances",
      "Espace locataire dédié"
    ],
    demoUrl: "#",
    popular: false
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const slug = searchParams.get("slug")
  
  let filteredServices = services
  
  if (category) {
    filteredServices = filteredServices.filter(s => s.category.toLowerCase() === category.toLowerCase())
  }
  
  if (slug) {
    filteredServices = filteredServices.filter(s => s.slug === slug)
  }
  
  // Get unique categories
  const categories = [...new Set(services.map(s => s.category))]
  
  return NextResponse.json({ 
    services: filteredServices,
    categories,
    total: filteredServices.length
  })
}
