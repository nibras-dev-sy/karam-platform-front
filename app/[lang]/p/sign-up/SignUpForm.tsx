"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signUpStrapi } from "@/lib/strapi"

export default function SignUpForm({ dictionary, lang }: { dictionary: any; lang: string }) {
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [educationMain, setEducationMain] = useState("") // 'ninth' or 'twelfth'
  const [educationDetail, setEducationDetail] = useState("") // 'scientific' or 'literary'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  function getEducationValue() {
    if (educationMain === "ninth") return "ninth"
    if (educationMain === "twelfth" && educationDetail) return `twelfth_${educationDetail}`
    return ""
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const education = getEducationValue()
    try {
      const data = await signUpStrapi({ username: name, mobile, password, education })
      localStorage.setItem("strapi_jwt", data.jwt)
      localStorage.setItem("strapi_user", JSON.stringify(data.user))
      const redirect = searchParams.get("redirect") || `/${lang}/p/sign-in`
      router.push(redirect)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form id="signup-form" onSubmit={handleSubmit}>
      {/* Name Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#213448] mb-2" htmlFor="name">
          {dictionary.auth.name}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <i className="fa-regular fa-user text-gray-500"></i>
          </div>
          <input
            id="name"
            type="text"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#547792] focus:border-[#547792]"
            placeholder={dictionary.auth.namePlaceholder}
            required
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>
      {/* Email Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#213448] mb-2" htmlFor="mobile">
          {dictionary.auth.mobile}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <i className="fa-regular fa-envelope text-gray-500"></i>
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
          />
        </div>
      </div>
      {/* Password Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#213448] mb-2" htmlFor="password">
          {dictionary.auth.password}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <i className="fa-solid fa-lock text-gray-500"></i>
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
      {/* Education Field as check buttons */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#213448] mb-2">
          {dictionary.auth.education || "Education"}
        </label>
        <div className="flex gap-6 mb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="education-main"
              value="ninth"
              checked={educationMain === "ninth"}
              onChange={() => { setEducationMain("ninth"); setEducationDetail("") }}
              disabled={loading}
              className="form-radio h-4 w-4 text-[#547792] border-gray-300"
              required
            />
            <span>{dictionary.auth.educationNinth || "Ninth Grade"}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="education-main"
              value="twelfth"
              checked={educationMain === "twelfth"}
              onChange={() => setEducationMain("twelfth")}
              disabled={loading}
              className="form-radio h-4 w-4 text-[#547792] border-gray-300"
              required
            />
            <span>{dictionary.auth.educationTwelfth || "Twelfth Grade"}</span>
          </label>
        </div>
        {educationMain === "twelfth" && (
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="education-detail"
                value="scientific"
                checked={educationDetail === "scientific"}
                onChange={() => setEducationDetail("scientific")}
                disabled={loading}
                className="form-radio h-4 w-4 text-[#547792] border-gray-300"
                required
              />
              <span>{dictionary.auth.educationTwelfthScientific || "Scientific"}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="education-detail"
                value="literary"
                checked={educationDetail === "literary"}
                onChange={() => setEducationDetail("literary")}
                disabled={loading}
                className="form-radio h-4 w-4 text-[#547792] border-gray-300"
                required
              />
              <span>{dictionary.auth.educationTwelfthLiterary || "Literary"}</span>
            </label>
          </div>
        )}
      </div>
      {/* Error Message */}
      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
      {/* Sign Up Button */}
      <button
        id="signup-button"
        type="submit"
        className="w-full bg-[#213448] hover:bg-[#547792] text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? dictionary.auth.signingUp || "Signing Up..." : dictionary.auth.signUp}
        <i className="fa-solid fa-arrow-right ml-2"></i>
      </button>
    </form>
  )
} 