import { NextResponse } from "next/server"

// Notifications data
const notifications = [
  {
    id: "1",
    title: "Nouveau MVP disponible !",
    message: "MVP Salon de coiffure est maintenant disponible",
    type: "info" as const,
    read: false,
    createdAt: new Date().toISOString(),
    action: "/mvp/salon"
  },
  {
    id: "2",
    title: "Rappel de renouvellement",
    message: "Votre abonnement WhatsApp Business expire dans 5 jours",
    type: "warning" as const,
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    action: "/dashboard"
  },
  {
    id: "3",
    title: "Paiement reçu",
    message: "Votre paiement de 25 000 FCFA a été confirmé",
    type: "success" as const,
    read: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    action: "/dashboard"
  },
  {
    id: "4",
    title: "Bienvenue sur AfriSaaS !",
    message: "Découvrez nos solutions adaptées aux entreprises africaines",
    type: "info" as const,
    read: true,
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    action: "/"
  }
]

export async function GET() {
  const unreadCount = notifications.filter(n => !n.read).length
  return NextResponse.json({ 
    notifications,
    unreadCount 
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { action, notificationId } = body
  
  if (action === "markRead") {
    return NextResponse.json({ 
      success: true, 
      message: `Notification ${notificationId} marquée comme lue` 
    })
  }
  
  if (action === "markAllRead") {
    return NextResponse.json({ 
      success: true, 
      message: "Toutes les notifications marquées comme lues" 
    })
  }
  
  return NextResponse.json(
    { error: "Action non reconnue" },
    { status: 400 }
  )
}
