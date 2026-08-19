'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, LogIn, UserPlus, Rocket } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCreatingUser, setIsCreatingUser] = useState(false)

  const createTestUser = async () => {
    setIsCreatingUser(true)
    try {
      const res = await fetch("/api/create-test-user", { method: "POST" })
      const data = await res.json()
      if (data.success) {
        setEmail(data.user.email)
        setPassword(data.user.password)
        setError("")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsCreatingUser(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Use NextAuth signIn from next-auth/react for client-side
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      })

      if (result?.error) {
        setError("Email ou mot de passe incorrect")
        setIsLoading(false)
        return
      }

      // Login successful - redirect to dashboard
      console.log("Login successful, redirecting to dashboard...")
      window.location.href = "/dashboard"
      
    } catch (err) {
      console.error("Login error:", err)
      setError("Une erreur est survenue. Veuillez réessayer.")
      setIsLoading(false)
    }
  }

  const fillTestCredentials = () => {
    setEmail("test@afrisaas.com")
    setPassword("Test1234!")
    setError("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#D4AF37]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#10B981]/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm border-[#D4AF37]/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center shadow-lg">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-[#0a0a0a]">
              Bienvenue sur AfriSaaS
            </CardTitle>
            <CardDescription className="text-gray-600">
              Connectez-vous pour accéder à votre tableau de bord
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Test credentials banner */}
          <Alert className="mb-6 border-[#D4AF37]/30 bg-[#D4AF37]/5">
            <AlertDescription className="text-sm">
              <p className="font-medium text-[#0a0a0a] mb-2">🧪 Compte de test disponible</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fillTestCredentials}
                  className="text-xs border-[#D4AF37] text-[#B8960C] hover:bg-[#D4AF37]/10"
                >
                  Remplir les identifiants
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={createTestUser}
                  disabled={isCreatingUser}
                  className="text-xs border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10"
                >
                  {isCreatingUser ? (
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <UserPlus className="w-3 h-3 mr-1" />
                  )}
                  Créer compte test
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          {/* Error message */}
          {error && (
            <Alert className="mb-4 border-red-300 bg-red-50">
              <AlertDescription className="text-red-700 text-sm">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#0a0a0a] font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#0a0a0a] font-medium">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8960C] hover:from-[#B8960C] hover:to-[#D4AF37] text-white font-semibold py-3 shadow-lg transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Se connecter
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-gray-500">
            Vous n&apos;avez pas de compte?{" "}
            <button 
              onClick={createTestUser}
              disabled={isCreatingUser}
              className="text-[#D4AF37] hover:text-[#B8960C] font-medium underline underline-offset-4"
            >
              Créer un compte test
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
