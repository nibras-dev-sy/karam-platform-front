"use client"

import { useState, useEffect, Fragment } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import LanguageSwitcher from "@/components/language-switcher"
import { Dialog, Transition } from "@headlessui/react"

export default function DashboardShell({ lang, dictionary, children }: { lang: string, dictionary: any, children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [username, setUsername] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("strapi_user")
      if (userStr) {
        try {
          const user = JSON.parse(userStr)
          setUsername(user.username || user.name || "User")
        } catch {
          setUsername("User")
        }
      } else {
        setUsername("")
      }
    }
  }, [])

  function handleLogout() {
    localStorage.clear()
    router.push(`/${lang}/p`)
  }

  return (
    <div className="flex h-[100vh]" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Sidebar for desktop */}
      <div
        id="sidebar"
        className={`hidden md:flex transition-all duration-300 w-64 bg-[#213448] text-white h-full flex-col fixed z-20 ${lang === "ar" ? "right-0" : "left-0"}`}
      >
        <div className={`p-5 border-b border-[#2e4a67] flex items-center justify-start`}>
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto filter invert brightness-0" />
            <span className="text-xl font-semibold text-white">{dictionary.navbar.title}</span>
          </Link>
        </div>
        <div className="p-3 flex-grow overflow-y-auto">
          <nav>
            <ul className="space-y-2">
              <li className="mb-1">
                <Link href={`/${lang}/dashboard/my-courses`} className={`gap-2 flex items-center p-3 rounded-md cursor-pointer ${pathname.includes("my-courses") ? "bg-[#547792] text-white" : "hover:bg-[#2e4a67] transition-colors"}`}>
                  <i className="fa-solid fa-book-open w-5 text-center"></i>
                  <span>{dictionary.dashboard.myCourses}</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-8 pt-6 border-t border-[#2e4a67]">
            <h3 className="text-sm uppercase text-gray-400 mb-4 font-medium">{dictionary.dashboard.account}</h3>
            <ul className="space-y-2">
              <li className="mb-1">
                <Link href={`/${lang}/dashboard/profile`} className="gap-2 flex items-center p-3 rounded-md hover:bg-[#2e4a67] transition-colors cursor-pointer">
                  <i className="fa-solid fa-user w-5 text-center"></i>
                  <span>{dictionary.dashboard.profile}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-5 border-t border-[#2e4a67]"> 
          <button onClick={handleLogout} className="gap-2 flex items-center p-3 rounded-md hover:bg-[#2e4a67] transition-colors cursor-pointer w-full text-left"> 
            <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i>
            <span>{dictionary.dashboard.logout}</span>
          </button>
        </div>
      </div>
      {/* Sidebar for mobile (Dialog) */}
      <Transition show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-40 md:hidden" onClose={setSidebarOpen}>
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
          <div className={`fixed top-0 ${lang === "ar" ? 'right-0' : 'left-0'} w-4/5 max-w-xs h-full bg-[#213448] text-white shadow-lg flex flex-col p-6 z-50`}>
            {/* Logo for mobile sidebar */}
            <div className="mb-6 flex items-center justify-between">
              <Link href="/">
                <img src="/logo.png" alt="Logo" className="h-12 w-auto filter invert brightness-0" />
              </Link>
              {/* Close button for mobile sidebar */}
              <button
                className="p-1 rounded focus:outline-none border border-gray-200 self-end bg-white text-[#213448]"
                onClick={() => setSidebarOpen(false)}
                aria-label={dictionary.navbar.close || "Close menu"}
              >
                <i className="fa fa-times text-2xl"></i>
              </button>
            </div>
            <nav className="flex flex-col gap-4 w-full">
              <Link href={`/${lang}/dashboard/my-courses`} className="gap-2 flex items-center p-3 rounded-md cursor-pointer hover:bg-[#2e4a67] transition-colors w-full text-white" onClick={() => setSidebarOpen(false)}>
                <i className="fa-solid fa-book-open w-5 text-center"></i>
                <span>{dictionary.dashboard.myCourses}</span>
              </Link>
              <Link href={`/${lang}/dashboard/profile`} className="gap-2 flex items-center p-3 rounded-md hover:bg-[#2e4a67] transition-colors cursor-pointer w-full text-white" onClick={() => setSidebarOpen(false)}>
                <i className="fa-solid fa-user w-5 text-center"></i>
                <span>{dictionary.dashboard.profile}</span>
              </Link>
              <button onClick={() => { setSidebarOpen(false); handleLogout(); }} className="gap-2 flex items-center p-3 rounded-md hover:bg-[#2e4a67] transition-colors cursor-pointer w-full text-left text-white">
                <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i>
                <span>{dictionary.dashboard.logout}</span>
              </button>
            </nav>
          </div>
        </Dialog>
      </Transition>
      {/* Main Content */}
      <div
        id="main-content"
        className={`flex-1 bg-[#f7f5ed] overflow-y-auto flex flex-col min-h-screen ${lang === "ar" ? "md:mr-64" : "md:ml-64"}`}
      >
        {/* Top Header */}
        <header id="header" className="bg-white shadow-sm py-4 px-4 md:px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Hamburger for mobile */}
            <button
              className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none border border-gray-200"
              onClick={() => setSidebarOpen(true)}
              aria-label={dictionary.navbar.menu || "Open menu"}
            >
              <i className="fa fa-bars text-2xl text-[#213448]"></i>
            </button>
            <h1 className="text-xl font-bold text-[#213448]">{dictionary.dashboard.dashboard}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* Hide username on mobile, show on md+ */}
              <button className="hidden md:flex items-center gap-2">
                <span className="text-[#213448] font-medium">{username || "User"}</span>
                <i className="fa-solid fa-chevron-down text-gray-500 text-sm"></i>
              </button>
            </div>
            <LanguageSwitcher currentLang={lang} switchLabel={dictionary.navbar.languageSwitcher} />
          </div>
        </header>
        <main className="p-4 md:p-8 flex-1">{children}</main>
        <footer className="w-full bg-gray-100 text-gray-500 text-xs text-center py-2 border-t border-gray-200 mt-auto">
          © {new Date().getFullYear()} Al Karam Academy. All rights reserved.
        </footer>
      </div>
    </div>
  )
} 