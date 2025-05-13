"use client"

import Link from "next/link"
import LanguageSwitcher from "./language-switcher"
import type { Locale } from "@/lib/i18n-config"
import { useEffect, useState } from "react"

export default function Header({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: any
}) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("strapi_user")
      if (userStr) {
        try {
          setUser(JSON.parse(userStr))
        } catch {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem("strapi_jwt")
    localStorage.removeItem("strapi_user")
    window.location.reload()
  }

  return (
    <header id="header" className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href={`/${lang}/p`} className="text-[#213448] font-medium border-b-2 border-[#547792] cursor-pointer">{dictionary.navbar.home}</Link>
          <Link href={`/${lang}/p/about`} className="text-[#213448] font-medium hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.about}</Link>
          <span className="text-[#213448] font-medium hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.contact}</span>
        </nav>
        <div className="flex items-center space-x-5">
          {user ? (
            <>
              <Link href={`/${lang}/dashboard/my-courses`}
                className="bg-[#547792] text-white px-5 py-2 rounded-md font-medium hover:bg-[#213448] transition-colors cursor-pointer">
                {dictionary.navbar.dashboard}
              </Link>
              <button
                onClick={handleLogout}
                className="text-[#e06251] font-medium hover:text-[#c45445] transition-colors cursor-pointer"
              >
                {dictionary.navbar.logout || "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link href={`/${lang}/p/sign-in`} className="text-[#547792] font-medium hover:text-[#213448] transition-colors cursor-pointer">
                {dictionary.navbar.signIn}
              </Link>
              <Link href={`/${lang}/p/sign-up`} className="bg-[#547792] text-white px-5 py-2 rounded-md font-medium hover:bg-[#213448] transition-colors cursor-pointer">
                {dictionary.navbar.signUp}
              </Link>
            </>
          )}
          <LanguageSwitcher currentLang={lang} switchLabel={dictionary.navbar.languageSwitcher} />
        </div>
      </div>
    </header>
  )
}
