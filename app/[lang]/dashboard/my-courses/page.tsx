"use client"

import { useEffect, useState } from "react"
import { getCoursesStrapi } from "@/lib/strapi"

const PLACEHOLDER_IMAGE = "https://storage.googleapis.com/uxpilot-auth.appspot.com/1cac03a7d8-ddaff9f4f1360e2a0802.png"
const PLACEHOLDER_AVATAR = "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true)
      setError("")
      try {
        const jwt = localStorage.getItem("strapi_jwt")
        if (!jwt) throw new Error("Not authenticated")
        const data = await getCoursesStrapi(jwt)
        setCourses(data)
      } catch (err: any) {
        setError(err.message || "Failed to load courses")
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course: any) => (
        <div key={course.id} id={`course-card-${course.id}`} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <img
            className="w-full h-48 object-cover"
            src={course.image || PLACEHOLDER_IMAGE}
            alt="Course thumbnail"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#213448] mb-2">{course.title}</h3>
            <p className="text-[#547792] mb-4 text-sm">{course.description || "No description available."}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={course.users?.[0]?.avatar || PLACEHOLDER_AVATAR}
                  alt="Instructor"
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-2 text-sm text-[#547792]">
                  {course.users?.[0]?.username || "Unknown Instructor"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 