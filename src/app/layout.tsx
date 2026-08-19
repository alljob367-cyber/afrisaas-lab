import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AfriSaaS - Plateforme SaaS Panafricaine",
  description: "La première plateforme SaaS panafricaine. Des solutions digitales adaptées aux entreprises africaines.",
  keywords: ["AfriSaaS", "SaaS", "Afrique", "Digital", "Entreprise", "MVP"],
  authors: [{ name: "AfriSaaS Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AfriSaaS - Plateforme SaaS Panafricaine",
    description: "Des solutions digitales puissantes pour les entreprises africaines",
    siteName: "AfriSaaS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
