"use client"

import Link from "next/link"
import LanguageSwitcher from "./language-switcher"
import type { Locale } from "@/lib/i18n-config"
import { useEffect, useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

export default function Header({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: any
}) {
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isRtl = lang === "ar"

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
      <div className={`container mx-auto px-5 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center ${isRtl ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            <span className="text-xl font-semibold text-[#213448]">{dictionary.navbar.title}</span>
          </Link>
        </div>
        <nav className={`hidden md:flex items-center ${isRtl ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
          <Link href={`/${lang}/p`} className="text-[#213448] font-medium border-b-2 border-[#547792] cursor-pointer">{dictionary.navbar.home}</Link>
          <Link href={`/${lang}/p/support`} className="text-[#213448] font-medium hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.support}</Link>
          <Link href={`/${lang}/p/join-us`} className="text-[#213448] font-medium hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.joinUs}</Link>
        </nav>
        <div className={`hidden md:flex items-center ${isRtl ? 'space-x-reverse space-x-5' : 'space-x-5'}`}>
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
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none border border-gray-200"
          onClick={() => setMobileMenuOpen(true)}
          aria-label={dictionary.navbar.menu || "Open menu"}
        >
          <i className="fa fa-bars text-2xl text-[#213448]"></i>
        </button>
        <Transition show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-50 md:hidden" onClose={setMobileMenuOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>
            <div className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} w-4/5 max-w-xs h-full bg-white shadow-lg flex flex-col p-6 ${isRtl ? 'items-end' : 'items-start'}`}>
              <button
                className="mb-6 p-2 rounded focus:outline-none border border-gray-200 self-end"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={dictionary.navbar.close || "Close menu"}
              >
                <i className="fa fa-times text-2xl text-[#213448]"></i>
              </button>
              <nav className={`flex flex-col gap-4 w-full ${isRtl ? 'items-end' : 'items-start'}`}> 
                <Link href={`/${lang}/p`} className="text-[#213448] font-medium border-b-2 border-[#547792] cursor-pointer w-full" onClick={() => setMobileMenuOpen(false)}>{dictionary.navbar.home}</Link>
                <Link href={`/${lang}/p/about`} className="text-[#213448] font-medium hover:text-[#547792] transition-colors cursor-pointer w-full" onClick={() => setMobileMenuOpen(false)}>{dictionary.navbar.about}</Link>
                <Link href={`/${lang}/p/join-us`} className="text-[#213448] font-medium hover:text-[#547792] transition-colors cursor-pointer w-full" onClick={() => setMobileMenuOpen(false)}>{dictionary.navbar.joinUs || "Join Us"}</Link>
              </nav>
              <div className={`flex flex-col gap-4 mt-8 w-full ${isRtl ? 'items-end' : 'items-start'}`}> 
                {user ? (
                  <>
                    <Link href={`/${lang}/dashboard/my-courses`} className="bg-[#547792] text-white px-5 py-2 rounded-md font-medium hover:bg-[#213448] transition-colors cursor-pointer w-full text-center" onClick={() => setMobileMenuOpen(false)}>
                      {dictionary.navbar.dashboard}
                    </Link>
                    <button
                      onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                      className="text-[#e06251] font-medium hover:text-[#c45445] transition-colors cursor-pointer w-full text-center"
                    >
                      {dictionary.navbar.logout || "Logout"}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={`/${lang}/p/sign-in`} className="text-[#547792] font-medium hover:text-[#213448] transition-colors cursor-pointer w-full text-center" onClick={() => setMobileMenuOpen(false)}>
                      {dictionary.navbar.signIn}
                    </Link>
                    <Link href={`/${lang}/p/sign-up`} className="bg-[#547792] text-white px-5 py-2 rounded-md font-medium hover:bg-[#213448] transition-colors cursor-pointer w-full text-center" onClick={() => setMobileMenuOpen(false)}>
                      {dictionary.navbar.signUp}
                    </Link>
                  </>
                )}
                <div className="w-full flex justify-center mt-2">
                  <LanguageSwitcher currentLang={lang} switchLabel={dictionary.navbar.languageSwitcher} />
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </header>
  )
}
