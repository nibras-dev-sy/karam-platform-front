"use client"

import Link from "next/link"
import LanguageSwitcher from "./language-switcher"
import type { Locale } from "@/lib/i18n-config"
import { useEffect, useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { usePathname } from "next/navigation"

export default function Header({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: any
}) {
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname();

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
      <div className="container mx-auto px-5 flex items-center justify-between gap-8">
        <div className="flex items-center gap-3 min-w-[180px]">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            <span className="text-xl font-semibold text-[#213448] text-right whitespace-nowrap">{dictionary.navbar.title}</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <Link
            href={`/${lang}/p`}
            className={`text-[#213448] font-medium cursor-pointer ${pathname === `/${lang}/p` ? 'border-b-2 border-[#547792]' : 'hover:text-[#547792] transition-colors'}`}
          >
            {dictionary.navbar.home}
          </Link>
          <Link
            href={`/${lang}/p/support`}
            className={`text-[#213448] font-medium cursor-pointer ${pathname === `/${lang}/p/support` ? 'border-b-2 border-[#547792]' : 'hover:text-[#547792] transition-colors'}`}
          >
            {dictionary.navbar.support}
          </Link>
          <Link
            href={`/${lang}/p/join-us`}
            className={`text-[#213448] font-medium cursor-pointer ${pathname === `/${lang}/p/join-us` ? 'border-b-2 border-[#547792]' : 'hover:text-[#547792] transition-colors'}`}
          >
            {dictionary.navbar.joinUs}
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-5 min-w-[220px] justify-end">
          {user ? (
            <>
              <Link href={`/${lang}/dashboard/my-courses`}
                className="bg-[#547792] text-white px-5 py-2 rounded-md font-medium hover:bg-[#213448] transition-colors cursor-pointer whitespace-nowrap">
                {dictionary.navbar.dashboard}
              </Link>
              <button
                onClick={handleLogout}
                className="text-[#e06251] font-medium hover:text-[#c45445] transition-colors cursor-pointer whitespace-nowrap"
              >
                {dictionary.navbar.logout || "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link href={`/${lang}/p/sign-in`} className="text-[#547792] font-medium hover:text-[#213448] transition-colors cursor-pointer whitespace-nowrap">
                {dictionary.navbar.signIn}
              </Link>
              <Link href={`/${lang}/p/sign-up`} className="bg-[#547792] text-white px-5 py-2 rounded-md font-medium hover:bg-[#213448] transition-colors cursor-pointer whitespace-nowrap">
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
            <div className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-lg flex flex-col p-6 items-start">
              <button
                className="mb-6 p-2 rounded focus:outline-none border border-gray-200 self-end"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={dictionary.navbar.close || "Close menu"}
              >
                <i className="fa fa-times text-2xl text-[#213448]"></i>
              </button>
              <nav className="flex flex-col gap-4 w-full items-start"> 
                <Link
                  href={`/${lang}/p`}
                  className={`text-[#213448] font-medium cursor-pointer w-full text-right ${pathname === `/${lang}/p` ? 'border-b-2 border-[#547792]' : 'hover:text-[#547792] transition-colors'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {dictionary.navbar.home}
                </Link>
                <Link
                  href={`/${lang}/p/about`}
                  className={`text-[#213448] font-medium cursor-pointer w-full text-right ${pathname === `/${lang}/p/about` ? 'border-b-2 border-[#547792]' : 'hover:text-[#547792] transition-colors'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {dictionary.navbar.about}
                </Link>
                <Link
                  href={`/${lang}/p/join-us`}
                  className={`text-[#213448] font-medium cursor-pointer w-full text-right ${pathname === `/${lang}/p/join-us` ? 'border-b-2 border-[#547792]' : 'hover:text-[#547792] transition-colors'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {dictionary.navbar.joinUs || "Join Us"}
                </Link>
              </nav>
              <div className="flex flex-col gap-4 mt-8 w-full items-start"> 
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
