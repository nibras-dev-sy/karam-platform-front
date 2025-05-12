"use client"

import Link from "next/link"
import LanguageSwitcher from "./language-switcher"
import type { Locale } from "@/lib/i18n-config"

export default function Header({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: any
}) {
  return (
    <header id="header" className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#213448] flex items-center justify-center rounded-md">
              <span className="text-white text-xl font-bold">OA</span>
            </div>
            <div className="ml-2 text-xl font-bold text-[#213448]">Online Academy</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <span className="text-[#213448] font-medium border-b-2 border-[#547792] cursor-pointer">{dictionary.navbar.home}</span>
          <span className="text-[#213448] font-medium hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.courses}</span>
          <span className="text-[#213448] font-medium hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.about}</span>
          <span className="text-[#213448] font-medium hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.contact}</span>
        </nav>
        <div className="flex items-center space-x-5">
          <button className="text-[#213448] hover:text-[#547792] transition-colors">
            <i className="fa-solid fa-magnifying-glass text-lg"></i>
          </button>
          <Link href={`/${lang}/sign-in`} className="text-[#547792] font-medium hover:text-[#213448] transition-colors cursor-pointer">
            {dictionary.navbar.signIn}
          </Link>
          <Link href={`/${lang}/sign-up`} className="bg-[#547792] text-white px-5 py-2 rounded-md font-medium hover:bg-[#213448] transition-colors cursor-pointer">
            {dictionary.navbar.signUp}
          </Link>
          <LanguageSwitcher currentLang={lang} switchLabel={dictionary.navbar.languageSwitcher} />
        </div>
      </div>
    </header>
  )
}
