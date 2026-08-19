import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST() {
  try {
    // Check if test user already exists
    const existingUser = await db.user.findUnique({
      where: { email: "test@afrisaas.com" },
    })

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: "Test user already exists",
        user: { email: "test@afrisaas.com", password: "Test1234!" },
      })
    }

    // Create test user
    const hashedPassword = await bcrypt.hash("Test1234!", 12)
    
    const user = await db.user.create({
      data: {
        name: "Jean Paul K.",
        email: "test@afrisaas.com",
        password: hashedPassword,
        role: "USER",
      },
    })

    return NextResponse.json({
      success: true,
      message: "Test user created successfully",
      user: { 
        id: user.id,
        email: "test@afrisaas.com", 
        password: "Test1234!" 
      },
    })
  } catch (error) {
    console.error("Error creating test user:", error)
    return NextResponse.json(
      { success: false, message: "Error creating test user" },
      { status: 500 }
    )
  }
}
