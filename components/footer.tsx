"use client"

import type React from "react"
import { useState } from "react"
import type { Locale } from "@/lib/i18n-config"

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-[#213448] flex items-center justify-center rounded-md">
                <span className="text-white text-xl font-bold">OA</span>
              </div>
              <div className="ml-2 text-xl font-bold text-[#213448]">Online Academy</div>
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
              <li><span className="text-gray-600 hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.courses}</span></li>
              <li><span className="text-gray-600 hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.about}</span></li>
              <li><span className="text-gray-600 hover:text-[#547792] transition-colors cursor-pointer">{dictionary.navbar.contact}</span></li>
              <li><span className="text-gray-600 hover:text-[#547792] transition-colors cursor-pointer">{dictionary.footer.blog}</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#213448] mb-6">{dictionary.footer.categories}</h3>
            <ul className="space-y-3">
              <li><span className="text-gray-600 hover:text-[#547792] transition-colors cursor-pointer">{dictionary.footer.programming}</span></li>
              <li><span className="text-gray-600 hover:text-[#547792] transition-colors cursor-pointer">{dictionary.footer.dataScience}</span></li>
              <li><span className="text-gray-600 hover:text-[#547792] transition-colors cursor-pointer">{dictionary.footer.business}</span></li>
              <li><span className="text-gray-600 hover:text-[#547792] transition-colors cursor-pointer">{dictionary.footer.design}</span></li>
              <li><span className="text-gray-600 hover:text-[#547792] transition-colors cursor-pointer">{dictionary.footer.marketing}</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#213448] mb-6">{dictionary.footer.subscribe}</h3>
            <p className="text-gray-600 mb-4">{dictionary.footer.subscribeDesc}</p>
            <form onSubmit={handleSubmit}>
              <div className="flex mb-4">
                <input
                  type="email"
                  placeholder={dictionary.footer.emailPlaceholder}
                  className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-[#547792]"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" className="bg-[#213448] text-white px-4 py-2 rounded-r-md hover:bg-[#547792] transition-colors">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </form>
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
