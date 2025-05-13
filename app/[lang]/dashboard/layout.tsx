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
  const dir = lang === "ar" ? "rtl" : "ltr"
  const dictionary = await getDictionary(lang)

  // Update HTML attributes
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }
  return (
    <html lang={lang} dir={dir} className={`${inter.variable} ${cairo.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`min-h-screen flex flex-col ${lang === "ar" ? "font-arabic" : "font-sans"}`}>
        <DashboardShell lang={lang} dictionary={dictionary}>{children}</DashboardShell>
      </body>
    </html>
  )
} 