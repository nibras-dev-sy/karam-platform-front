"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signInStrapi } from "@/lib/strapi"

export default function SignInForm({ dictionary, lang }: { dictionary: any; lang: string }) {
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const data = await signInStrapi({ identifier: mobile, password })
      // Store JWT in localStorage (or cookie for production)
      localStorage.setItem("strapi_jwt", data.jwt)
      localStorage.setItem("strapi_user", JSON.stringify(data.user))
      // Redirect to home or previous page
      const redirect = searchParams.get("redirect") || `/${lang}/dashboard/my-courses`
      router.push(redirect)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form id="signin-form" onSubmit={handleSubmit}>
      {/* Email Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#213448] mb-2" htmlFor="mobile">
          {dictionary.auth.mobile}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <i className="fa fa-phone text-gray-500 p-2"></i>
          </div>
          <input
            id="mobile"
            type="mobile"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#547792] focus:border-[#547792]"
            placeholder={dictionary.auth.mobilePlaceholder}
            required
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            disabled={loading}
            pattern="^09\d{8}$"
          />
        </div>
      </div>
      {/* Password Field */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-[#213448]" htmlFor="password">
            {dictionary.auth.password}
          </label>
          <span className="text-sm text-[#547792] hover:text-[#213448] transition-colors cursor-pointer">
            {dictionary.auth.forgotPassword}
          </span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <i className="fa-solid fa-lock text-gray-500  p-2"></i>
          </div>
          <input
            id="password"
            type="password"
            className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#547792] focus:border-[#547792]"
            placeholder="••••••••••"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer" id="toggle-password">
            <i className="fa-regular fa-eye text-gray-500"></i>
          </div>
        </div>
      </div>
      {/* Remember Me */}
      <div className="flex items-center mb-6">
        <input type="checkbox" id="remember" className="w-4 h-4 text-[#547792] border-gray-300 rounded focus:ring-[#547792]" />
        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">{dictionary.auth.rememberMe}</label>
      </div>
      {/* Error Message */}
      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
      {/* Sign In Button */}
      <button
        id="signin-button"
        type="submit"
        className="w-full bg-[#213448] hover:bg-[#547792] text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? dictionary.auth.signingIn || "Signing In..." : dictionary.auth.signIn}
        <i className="fa-solid fa-arrow-right ml-2"></i>
      </button>
    </form>
  )
} 