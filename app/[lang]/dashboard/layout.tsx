"use client"

import type { ReactNode } from "react"
import { Inter, Cairo } from "next/font/google"
import { useState } from "react"

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

  return (
    <html lang="en" className={`${inter.variable} ${cairo.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <div className="flex h-[100vh]">
          {/* Sidebar Navigation */}
          <div
            id="sidebar"
            className={`transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"} bg-[#213448] text-white h-full flex flex-col fixed`}
          >
            {/* Toggle Button */}
            <button
              className={`absolute -right-3 top-6 z-20 bg-[#213448] border border-[#2e4a67] rounded-full w-6 h-6 flex items-center justify-center focus:outline-none transition-transform ${sidebarOpen ? "" : "rotate-180"}`}
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              style={{ boxShadow: "0 0 0 2px #ECEFCA" }}
            >
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <div className={`p-5 border-b border-[#2e4a67] flex items-center ${sidebarOpen ? "justify-start" : "justify-center"}`}>
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-md">
                <span className="text-[#213448] text-xl font-bold">OA</span>
              </div>
              {sidebarOpen && <div className="ml-2 text-xl font-bold">Online Academy</div>}
            </div>
            <div className="p-5 flex-grow overflow-y-auto">
              <nav>
                <ul className="space-y-2">
                  <li className="mb-1">
                    <span className={`flex items-center p-3 rounded-md bg-[#547792] text-white cursor-pointer ${!sidebarOpen ? "justify-center" : ""}`}>
                      <i className="fa-solid fa-gauge-high w-5 text-center mr-3"></i>
                      {sidebarOpen && <span>Dashboard</span>}
                    </span>
                  </li>
                  <li className="mb-1">
                    <span className={`flex items-center p-3 rounded-md hover:bg-[#2e4a67] transition-colors cursor-pointer ${!sidebarOpen ? "justify-center" : ""}`}>
                      <i className="fa-solid fa-book-open w-5 text-center mr-3"></i>
                      {sidebarOpen && <span>My Courses</span>}
                    </span>
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
              <span className={`flex items-center p-3 rounded-md hover:bg-[#2e4a67] transition-colors cursor-pointer ${!sidebarOpen ? "justify-center" : ""}`}>
                <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center mr-3"></i>
                {sidebarOpen && <span>Logout</span>}
              </span>
            </div>
          </div>
          {/* Main Content */}
          <div id="main-content" className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"} flex-1 bg-[#ECEFCA] overflow-y-auto`}>
            {/* Top Header */}
            <header id="header" className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-[#213448]">My Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-[#547792] transition-colors">
                  <i className="fa-solid fa-bell text-lg"></i>
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">2</span>
                </button>
                <div className="relative">
                  <button className="flex items-center space-x-2">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-[#547792]" />
                    <span className="text-[#213448] font-medium">Michael Thompson</span>
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