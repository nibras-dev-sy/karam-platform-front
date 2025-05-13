
import type { ReactNode } from "react"
import { Inter, Cairo } from "next/font/google"
import DashboardShell from "./DashboardShell"
import { getDictionary } from "@/lib/dictionary"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export default async function DashboardLayout({ children, params }: { children: ReactNode, params: any }) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={`${inter.variable} ${cairo.variable}`}>
      <body className={`min-h-screen flex flex-col ${lang === "ar" ? "font-arabic" : "font-sans"}`}>
        <DashboardShell lang={lang} dictionary={dictionary}>{children}</DashboardShell>
      </body>
    </html>
  )
} 