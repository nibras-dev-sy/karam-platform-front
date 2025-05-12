import type React from "react"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n-config"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Inter, Cairo } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: any
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const dir = lang === "ar" ? "rtl" : "ltr"

  // Update HTML attributes
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }

  return (
    <html lang={lang} dir={dir} className={`${inter.variable} ${cairo.variable}`}>
      <body className={`min-h-screen flex flex-col ${lang === "ar" ? "font-arabic" : "font-sans"}`}>
        <Header lang={lang} dictionary={dictionary} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dictionary={dictionary} />
      </body>
    </html>
  )
}
