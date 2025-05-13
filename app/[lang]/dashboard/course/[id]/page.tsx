"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getLecturesByCourseStrapi } from "@/lib/strapi"

export default function CoursePage() {
  const { id } = useParams() as { id: string }
  const [lectures, setLectures] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchLectures() {
      setLoading(true)
      setError("")
      try {
        const jwt = localStorage.getItem("strapi_jwt")
        if (!jwt) throw new Error("Not authenticated")
        const data = await getLecturesByCourseStrapi(id, jwt)
        setLectures(data)
      } catch (err: any) {
        setError(err.message || "Failed to load lectures")
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchLectures()
  }, [id])

  // Dummy course info for header (replace with real data if available)
  const courseTitle = lectures[0]?.course?.title || "Course"
  const instructor = "John Smith"
  const totalLectures = lectures.length
  const completedLectures = lectures.filter(l => l.progress).length
  const totalHours = "20 hours total"

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>

  return (
    <div id="course-content" className="p-6">
      {/* Course Header */}
      <div id="course-header" className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#213448]">{courseTitle}</h2>
          <div className="flex items-center">
            <div className="text-[#547792] mr-4">
              <span className="font-bold">Progress:</span>
              <span>{completedLectures}/{totalLectures} lectures</span>
            </div>
            <div className="w-32 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-[#547792] rounded-full"
                style={{ width: totalLectures ? `${(completedLectures / totalLectures) * 100}%` : "0%" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex items-center text-[#547792]">
          <i className="fa-solid fa-user mr-2"></i>
          <span className="mr-6">Instructor: {instructor}</span>
          <i className="fa-solid fa-clock mr-2"></i>
          <span>{totalHours}</span>
        </div>
      </div>
      {/* Lectures List */}
      <div id="lectures-list" className="space-y-4">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-[#213448]">Lectures</h3>
          </div>
          <div className="p-4 space-y-3">
            {lectures.map((lecture, idx) => (
              <div
                key={lecture.documentId}
                id={`lecture-${lecture.documentId}`}
                className={`flex items-center justify-between p-3 ${lecture.progress ? "bg-[#ECEFCA]" : "hover:bg-gray-50"} rounded-lg`}
              >
                <div className="flex items-center">
                  {lecture.progress ? (
                    <i className="fa-solid fa-circle-check text-[#547792] mr-3"></i>
                  ) : (
                    <i className="fa-regular fa-circle text-[#547792] mr-3"></i>
                  )}
                  <div>
                    <h4 className="font-medium text-[#213448]">{idx + 1}. {lecture.title}</h4>
                    <p className="text-sm text-[#547792]">{lecture.description || "No description"}</p>
                  </div>
                </div>
                <button className="text-[#213448] hover:text-[#547792]">
                  {lecture.progress ? (
                    <i className="fa-solid fa-play"></i>
                  ) : (
                    <i className="fa-solid fa-lock"></i>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 