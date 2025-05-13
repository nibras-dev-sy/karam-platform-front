"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getLectureByDocumentIdStrapi } from "@/lib/strapi"

export default function LecturePage() {
  const { documentId } = useParams() as { documentId: string }
  const [lecture, setLecture] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchLecture() {
      setLoading(true)
      setError("")
      try {
        const jwt = localStorage.getItem("strapi_jwt")
        if (!jwt) throw new Error("Not authenticated")
        const data = await getLectureByDocumentIdStrapi(documentId, jwt)
        setLecture(data)
      } catch (err: any) {
        setError(err.message || "Failed to load lecture")
      } finally {
        setLoading(false)
      }
    }
    if (documentId) fetchLecture()
  }, [documentId])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>
  if (!lecture) return null

  const videoUrl = lecture.video?.url ? (lecture.video.url.startsWith("http") ? lecture.video.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${lecture.video.url}`) : null

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-[#213448] mb-2">{lecture.title}</h1>
        <p className="text-[#547792] mb-4">{lecture.description}</p>
        {videoUrl && (
          <div className="my-6">
            <video controls className="w-full rounded-lg shadow">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  )
} 