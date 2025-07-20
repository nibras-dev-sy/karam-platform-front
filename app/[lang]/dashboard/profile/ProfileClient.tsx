"use client"

import { useEffect, useState } from "react"

export default function ProfileClient({ dictionary }: { dictionary: any }) {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess("")
    setError("")
    try {
      const jwt = localStorage.getItem("strapi_jwt")
      if (!jwt) throw new Error(dictionary.dashboard.notAuthenticated || "Not authenticated")
      const userStr = localStorage.getItem("strapi_user")
      if (!userStr) throw new Error(dictionary.dashboard.notAuthenticated || "User not found")
      const user = JSON.parse(userStr)
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          email: user.email,
          ...(password ? { password } : {}),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error?.message || data?.message || dictionary.profile.error || "Failed to update profile")
      localStorage.setItem("strapi_user", JSON.stringify(data))
      setSuccess(dictionary.profile.success || "Profile updated successfully.")
      setPassword("")
    } catch (err: any) {
      setError(err.message || dictionary.profile.error || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow mt-10">
      <h1 className="text-2xl font-bold text-[#213448] mb-6">{dictionary.profile.editProfile || "Edit Profile"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#213448] mb-2" htmlFor="password">{dictionary.profile.newPassword || "New Password"}</label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#547792] focus:border-[#547792]"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={dictionary.profile.passwordPlaceholder || "Leave blank to keep current password"}
            disabled={loading}
          />
        </div>
        {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-[#213448] hover:bg-[#547792] text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (dictionary.profile.saving || "Saving...") : (dictionary.profile.saveChanges || "Save Changes")}
        </button>
      </form>
    </div>
  )
} 