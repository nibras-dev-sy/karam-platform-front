"use client"

import type React from "react"
import { useState } from "react"
import type { Locale } from "@/lib/i18n-config"
import Link from "next/link"

export default function Footer({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: any
}) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <footer id="footer" className="bg-[#ECEFCA] py-12">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Link href="/">
                <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
              </Link>
            </div>
            <p className="text-gray-600 mb-6">{dictionary.footer.about}</p>
            <div className="flex space-x-4">
              <span className="text-[#213448] hover:text-[#547792] transition-colors cursor-pointer">
                <i className="fa-brands fa-facebook-f text-xl"></i>
              </span>
              <span className="text-[#213448] hover:text-[#547792] transition-colors cursor-pointer">
                <i className="fa-brands fa-twitter text-xl"></i>
              </span>
              <span className="text-[#213448] hover:text-[#547792] transition-colors cursor-pointer">
                <i className="fa-brands fa-instagram text-xl"></i>
              </span>
              <span className="text-[#213448] hover:text-[#547792] transition-colors cursor-pointer">
                <i className="fa-brands fa-linkedin-in text-xl"></i>
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#213448] mb-6">{dictionary.footer.explore}</h3>
            <ul className="space-y-3">
              <li><span className="text-gray-600 hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.home}</span></li>
              <li><span className="text-gray-600 hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.about}</span></li>
              <li><span className="text-gray-600 hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.joinUs}</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#213448] mb-6">{dictionary.footer.subscribe}</h3>
            <div>{dictionary.footer.contactUsOn} {"+963996785533"}</div>
            <p className="text-gray-600 text-sm">{dictionary.footer.terms}</p>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-12 pt-8 text-center">
          <p className="text-gray-600">{dictionary.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
