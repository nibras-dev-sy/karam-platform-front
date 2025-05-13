"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import LanguageSwitcher from "@/components/language-switcher"

export default function DashboardShell({ lang, dictionary, children }: { lang: string, dictionary: any, children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
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
      {/* Sidebar Navigation */}
      <div
        id="sidebar"
        className={`transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"} bg-[#213448] text-white h-full flex flex-col fixed z-20 ${lang === "ar" ? "right-0" : "left-0"}`}
        onClick={() => {
          if (!sidebarOpen) setSidebarOpen(true)
        }}
      >
        <div className={`p-5 border-b border-[#2e4a67] flex items-center ${sidebarOpen ? "justify-start" : "justify-center"}`}>
          <Link href="/">
            <img src={sidebarOpen ? "/logo.png" : "/logo_small.png"} alt="Logo" className="h-12 w-auto h-9 w-auto filter invert brightness-0" />
          </Link>
        </div>
        <div className="p-3 flex-grow overflow-y-auto">
          <nav>
            <ul className="space-y-2">
              <li className="mb-1">
                <Link href={`/${lang}/dashboard`} className={`gap-2 flex items-center p-3 rounded-md cursor-pointer ${pathname.endsWith("dashboard") ? "bg-[#547792] text-white" : "hover:bg-[#2e4a67] transition-colors"} ${!sidebarOpen ? "justify-center" : ""}`}>
                  <i className="fa-solid fa-gauge-high w-5 text-center"></i>
                  {sidebarOpen && <span>{dictionary.dashboard.dashboard}</span>}
                </Link>
              </li>
              <li className="mb-1">
                <Link href={`/${lang}/dashboard/my-courses`} className={`gap-2 flex items-center p-3 rounded-md cursor-pointer ${pathname.includes("my-courses") ? "bg-[#547792] text-white" : "hover:bg-[#2e4a67] transition-colors"} ${!sidebarOpen ? "justify-center" : ""}`}>
                  <i className="fa-solid fa-book-open w-5 text-center"></i>
                  {sidebarOpen && <span>{dictionary.dashboard.myCourses}</span>}
                </Link>
              </li>
            </ul>
          </nav>
          <div className={`mt-8 pt-6 border-t border-[#2e4a67] ${!sidebarOpen ? "hidden" : ""}`}> 
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
        <div className={`p-5 border-t border-[#2e4a67] ${!sidebarOpen ? "justify-center" : ""}`}> 
          <button onClick={handleLogout} className={`gap-2 flex items-center p-3 rounded-md hover:bg-[#2e4a67] transition-colors cursor-pointer w-full text-left ${!sidebarOpen ? "justify-center" : ""}`}> 
            <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i>
            {sidebarOpen && <span>{dictionary.dashboard.logout}</span>}
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div
        id="main-content"
        className={`transition-all duration-300 flex-1 bg-[#f7f5ed] overflow-y-auto flex flex-col min-h-screen ${sidebarOpen ? (lang === "ar" ? "mr-64" : "ml-64") : (lang === "ar" ? "mr-16" : "ml-16")}`}
        onClick={() => {
          if (sidebarOpen) setSidebarOpen(false)
        }}
      >
        {/* Top Header */}
        <header id="header" className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              className={`border rounded-full w-6 h-6 flex items-center justify-center focus:outline-none transition-transform ${sidebarOpen ? "" : "rotate-180"}`}
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <h1 className="text-xl font-bold text-[#213448]">{dictionary.dashboard.dashboard}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="flex items-center gap-2">
                <span className="text-[#213448] font-medium">{username || "User"}</span>
                <i className="fa-solid fa-chevron-down text-gray-500 text-sm"></i>
              </button>
            </div>
            <LanguageSwitcher currentLang={lang} switchLabel={dictionary.navbar.languageSwitcher} />
          </div>
        </header>
        <main className="p-8 flex-1">{children}</main>
        <footer className="w-full bg-gray-100 text-gray-500 text-xs text-center py-2 border-t border-gray-200 mt-auto">
          © {new Date().getFullYear()} Al Karam Academy. All rights reserved.
        </footer>
      </div>
    </div>
  )
} 