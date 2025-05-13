"use client"

import { useEffect, useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { getLectureByDocumentIdStrapi, markLectureProgressStrapi } from "@/lib/strapi"

export default function LecturePage() {
  const { documentId } = useParams() as { documentId: string }
  const [lecture, setLecture] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [error, setError] = useState("")
  const [progressChecked, setProgressChecked] = useState(false)
  const [progressLoading, setProgressLoading] = useState(false)
    const pathname = usePathname()
    const lang = pathname.split("/")[1] || "en"
    const courseId = pathname.split("/")[4]

  useEffect(() => {
    async function fetchLecture() {
      setLoading(true)
      setError("")
      try {
        const jwt = localStorage.getItem("strapi_jwt")
        if (!jwt) throw new Error("Not authenticated")
        const data = await getLectureByDocumentIdStrapi(documentId, jwt)
        setLecture(data)
        setProgressChecked(!!data.progress)
      } catch (err: any) {
        setError(err.message || "Failed to load lecture")
      } finally {
        setLoading(false)
      }
    }
    if (documentId) fetchLecture()
  }, [documentId])

  async function handleProgressChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (progressChecked) return
    setProgressLoading(true)
    try {
      const jwt = localStorage.getItem("strapi_jwt")
      if (!jwt) throw new Error("Not authenticated")
      await markLectureProgressStrapi(documentId, jwt)
      setProgressChecked(true)
    } catch (err: any) {
      alert(err.message || "Failed to mark progress")
    } finally {
      setProgressLoading(false)
    }
  }

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>
  if (!lecture) return null

  const videoUrl = lecture.video?.url ? (lecture.video.url.startsWith("http") ? lecture.video.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${lecture.video.url}`) : null

  return (
    <div className="max-w-4xl mx-auto p-6 py-2">
            <button
        className="mb-6 px-4 py-2 bg-[#547792] text-white rounded hover:bg-[#213448] transition-colors"
        onClick={() => router.push(`/${lang}/dashboard/course/${courseId}`)}
      >
        <i className="fa fa-arrow-left mr-2"></i> Back to My Courses
      </button>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-[#213448] mb-2">{lecture.title}</h1>
        <p className="text-[#547792] mb-4">{lecture.description}</p>
        {videoUrl && (
          <div className="my-6">
            <video controls className="w-full h-[480px] max-h-[70vh] rounded-lg shadow object-contain bg-black">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            id="progress-checkbox"
            className="w-5 h-5 text-[#547792] border-gray-300 rounded focus:ring-[#547792] mr-2"
            checked={progressChecked}
            disabled={progressChecked || progressLoading}
            onChange={handleProgressChange}
          />
          <label htmlFor="progress-checkbox" className="text-[#213448] font-medium select-none">
            {progressChecked ? "Completed" : progressLoading ? "Marking..." : "Mark as completed"}
          </label>
        </div>
      </div>
    </div>
  )
} 