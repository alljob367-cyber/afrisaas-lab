import { NextResponse } from "next/server"

// Orders data
const orders = [
  {
    id: "ORD-001",
    service: "MVP Restaurant Manager",
    serviceId: "1",
    amount: 25000,
    status: "active" as const,
    createdAt: "2024-12-01",
    renewalDate: "2025-02-01",
    billingCycle: "monthly"
  },
  {
    id: "ORD-002",
    service: "MVP WhatsApp Business CRM",
    serviceId: "2",
    amount: 15000,
    status: "active" as const,
    createdAt: "2024-11-15",
    renewalDate: "2025-01-15",
    billingCycle: "monthly"
  },
  {
    id: "ORD-003",
    service: "MVP Finances & Comptabilité",
    serviceId: "3",
    amount: 20000,
    status: "pending" as const,
    createdAt: "2024-12-10",
    renewalDate: "2025-01-10",
    billingCycle: "monthly"
  },
  {
    id: "ORD-004",
    service: "MVP Restaurant Manager",
    serviceId: "1",
    amount: 25000,
    status: "completed" as const,
    createdAt: "2024-11-01",
    renewalDate: "2024-12-01",
    billingCycle: "monthly"
  },
  {
    id: "ORD-005",
    service: "MVP WhatsApp Business CRM",
    serviceId: "2",
    amount: 15000,
    status: "completed" as const,
    createdAt: "2024-10-15",
    renewalDate: "2024-11-15",
    billingCycle: "monthly"
  }
]

export async function GET() {
  // Calculate summary
  const activeOrders = orders.filter(o => o.status === "active")
  const totalMonthly = activeOrders.reduce((sum, o) => sum + o.amount, 0)
  
  return NextResponse.json({
    orders,
    summary: {
      totalOrders: orders.length,
      activeOrders: activeOrders.length,
      totalMonthlyExpense: totalMonthly,
      pendingOrders: orders.filter(o => o.status === "pending").length
    }
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { action, orderId } = body
  
  if (action === "cancel") {
    return NextResponse.json({
      success: true,
      message: `Commande ${orderId} annulée`
    })
  }
  
  if (action === "renew") {
    return NextResponse.json({
      success: true,
      message: `Commande ${orderId} renouvelée`
    })
  }
  
  return NextResponse.json(
    { error: "Action non reconnue" },
    { status: 400 }
  )
}
