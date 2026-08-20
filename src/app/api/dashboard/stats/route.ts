import { NextResponse } from "next/server"

// Simulated stats data - in production, this would come from database
export async function GET() {
  const stats = {
    activeServices: 3,
    monthlyExpenses: 60000,
    totalOrders: 12,
    nextRenewalDays: 5,
    nextRenewalService: "WhatsApp Business",
    monthlyGrowth: "+12%",
    newOrders: 3,
    currency: "FCFA"
  }
  
  return NextResponse.json(stats)
}
