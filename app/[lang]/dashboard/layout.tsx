"use client"

import type { ReactNode } from "react"
import { Inter, Cairo } from "next/font/google"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

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

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const [username, setUsername] = useState<string>("")

  // Extract lang from pathname (e.g., /en/dashboard)
  const lang = pathname.split("/")[1] || "en"

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
    <html lang="en" className={`${inter.variable} ${cairo.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <div className="flex h-[100vh]">
          {/* Sidebar Navigation */}
          <div
            id="sidebar"
            className={`transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"} bg-[#213448] text-white h-full flex flex-col fixed`}
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
                    <Link href={`./`} className={`flex items-center p-2 rounded-md cursor-pointer ${pathname.endsWith("dashboard") ? "bg-[#547792] text-white" : "hover:bg-[#2e4a67] transition-colors"} ${!sidebarOpen ? "justify-center" : ""}`}>
                      <i className="fa-solid fa-gauge-high w-5 text-center mr-3"></i>
                      {sidebarOpen && <span>Dashboard</span>}
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href={`./dashboard/my-courses`} className={`flex items-center p-3 rounded-md cursor-pointer ${pathname.includes("my-courses") ? "bg-[#547792] text-white" : "hover:bg-[#2e4a67] transition-colors"} ${!sidebarOpen ? "justify-center" : ""}`}>
                      <i className="fa-solid fa-book-open w-5 text-center mr-3"></i>
                      {sidebarOpen && <span>My Courses</span>}
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className={`mt-8 pt-6 border-t border-[#2e4a67] ${!sidebarOpen ? "hidden" : ""}`}>
                <h3 className="text-sm uppercase text-gray-400 mb-4 font-medium">Account</h3>
                <ul className="space-y-2">
                  <li className="mb-1">
                    <span className="flex items-center p-3 rounded-md hover:bg-[#2e4a67] transition-colors cursor-pointer">
                      <i className="fa-solid fa-user w-5 text-center mr-3"></i>
                      <span>Profile</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`p-5 border-t border-[#2e4a67] ${!sidebarOpen ? "justify-center" : ""}`}>
              <button onClick={handleLogout} className={`flex items-center p-3 rounded-md hover:bg-[#2e4a67] transition-colors cursor-pointer w-full text-left ${!sidebarOpen ? "justify-center" : ""}`}>
                <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center mr-3"></i>
                {sidebarOpen && <span>Logout</span>}
              </button>
            </div>
          </div>
          {/* Main Content */}
          <div
            id="main-content"
            className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"} flex-1 bg-[#ECEFCA] overflow-y-auto`}
            onClick={() => {
              if (sidebarOpen) setSidebarOpen(false)
            }}
          >
            {/* Top Header */}
            <header id="header" className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10">
              
            {/* Toggle Button */}

              <div className="flex items-center">
              <button
                className={`mr-4 border  rounded-full w-6 h-6 flex items-center justify-center focus:outline-none transition-transform ${sidebarOpen ? "" : "rotate-180"}`}
                onClick={() => setSidebarOpen((open) => !open)}
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                style={{ boxShadow: "0 0 0 2px #ECEFCA" }}
              >
                <i className="fa-solid fa-chevron-left text-xs"></i>
              </button>
                <h1 className="text-xl font-bold text-[#213448]">Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="flex items-center space-x-2">
                    <span className="text-[#213448] font-medium">{username || "User"}</span>
                    <i className="fa-solid fa-chevron-down text-gray-500 text-sm"></i>
                  </button>
                </div>
              </div>
            </header>
            <main className="p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
} 