"use client"

import { useEffect, useState } from "react"
import { getCoursesStrapi, activateCourseCodeStrapi } from "@/lib/strapi"
import { useRouter, usePathname } from "next/navigation"

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [activationCode, setActivationCode] = useState("")
  const [activating, setActivating] = useState(false)
  const [activationError, setActivationError] = useState("")
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [addedCourses, setAddedCourses] = useState<any[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const lang = pathname.split("/")[1] || "en"

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

  useEffect(() => {
    fetchCourses()
  }, [])

  async function handleActivate(e: React.FormEvent) {
    e.preventDefault()
    setActivating(true)
    setActivationError("")
    try {
      const jwt = localStorage.getItem("strapi_jwt")
      if (!jwt) throw new Error("Not authenticated")
      const result = await activateCourseCodeStrapi(activationCode, jwt)
      setAddedCourses(result.addedCourses || [])
      setShowPopup(false)
      setShowSuccessPopup(true)
      setActivationCode("")
    } catch (err: any) {
      setActivationError(err.message || "Activation failed")
    } finally {
      setActivating(false)
    }
  }

  function handleCloseSuccess() {
    setShowSuccessPopup(false)
    fetchCourses()
  }

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>

  return (
    <>
      <div className="flex justify-end mb-8">
        <button className="bg-[#213448] hover:bg-[#547792] text-white font-medium py-2 px-6 rounded-lg transition duration-200" onClick={() => setShowPopup(true)}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course: any) => (
          <div
            key={course.id}
            id={`course-card-${course.id}`}
            className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => router.push(`/${lang}/dashboard/course/${course.id}`)}
          >
            <img
              className="w-full h-48 object-cover"
              src={course.image || "/placeholder.jpg"}
              alt="Course thumbnail"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#213448] mb-2">{course.title}</h3>
              <p className="text-[#547792] mb-4 text-sm">{course.description || "No description available."}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={course.techer?.image || "/placeholder_image.png"}
                    alt="Instructor"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="ml-2 text-sm text-[#547792]">
                    {course.teacher?.name || "Unknown Instructor"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Activation Code Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => { setShowPopup(false); setActivationError(""); }}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#213448]">Activate Course</h2>
            <form onSubmit={handleActivate}>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#547792]"
                placeholder="Enter Activation Code"
                value={activationCode}
                onChange={e => setActivationCode(e.target.value)}
                required
                disabled={activating}
              />
              {activationError && <div className="mb-4 text-red-600 text-sm">{activationError}</div>}
              <button
                type="submit"
                className="w-full bg-[#213448] hover:bg-[#547792] text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                disabled={activating}
              >
                {activating ? "Activating..." : "Activate"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              onClick={handleCloseSuccess}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#213448]">Activation Successful</h2>
            <div className="space-y-4">
              {addedCourses.map((course: any) => (
                <div key={course.id} className="bg-[#ECEFCA] rounded-lg p-4">
                  <h3 className="text-lg font-bold text-[#213448] mb-1">{course.title}</h3>
                  <p className="text-[#547792] text-sm mb-1">{course.description || "No description available."}</p>
                  <span className="text-xs text-gray-500">Course ID: {course.documentId}</span>
                </div>
              ))}
            </div>
            <button
              className="mt-6 w-full bg-[#213448] hover:bg-[#547792] text-white font-medium py-3 px-4 rounded-lg transition duration-200"
              onClick={handleCloseSuccess}
            >
              Back to My Courses
            </button>
          </div>
        </div>
      )}
    </>
  )
} 