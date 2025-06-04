"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { getLectureByDocumentIdStrapi, markLectureProgressStrapi } from "@/lib/strapi"
import Hls from "hls.js"

export default function LectureClient({ dictionary }: { dictionary: any }) {
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

  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    async function fetchLecture() {
      setLoading(true)
      setError("")
      try {
        const jwt = localStorage.getItem("strapi_jwt")
        if (!jwt) throw new Error(dictionary.dashboard.notAuthenticated || "Not authenticated")
        const data = await getLectureByDocumentIdStrapi(documentId, jwt)
        setLecture(data)
        setProgressChecked(!!data.progress)
      } catch (err: any) {
        setError(err.message || dictionary.dashboard.errorLoadingLecture || "Failed to load lecture")
      } finally {
        setLoading(false)
      }
    }
    if (documentId) fetchLecture()
  }, [documentId])

  // Use lecture.videoUrl if present, otherwise use lecture.video.url if it is an mp4
  const videoUrl = lecture?.videoUrl || (lecture?.video?.url && lecture.video.url.endsWith('.mp4') ? lecture.video.url : null)

  useEffect(() => {
    if (!videoRef.current || !videoUrl) return
    // If the videoUrl is an mp4, set src directly and do not use HLS.js
    if (videoUrl.endsWith('.mp4')) {
      videoRef.current.src = videoUrl
      return
    }
    // Otherwise, check for HLS support
    if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoUrl
    } else if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(videoUrl)
      hls.attachMedia(videoRef.current)
      return () => {
        hls.destroy()
      }
    }
  }, [videoUrl])

  if (loading) return <div className="text-center py-10">{dictionary.dashboard.loading || "Loading..."}</div>
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>
  if (!lecture) return null

  async function handleProgressChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (progressChecked) return
    setProgressLoading(true)
    try {
      const jwt = localStorage.getItem("strapi_jwt")
      if (!jwt) throw new Error(dictionary.dashboard.notAuthenticated || "Not authenticated")
      await markLectureProgressStrapi(documentId, jwt)
      setProgressChecked(true)
    } catch (err: any) {
      alert(err.message || dictionary.dashboard.progressError || "Failed to mark progress")
    } finally {
      setProgressLoading(false)
    }
  }

  return (
    <div className="mx-auto p-6 py-2">
      <button
        className="mb-6 px-4 py-2 bg-[#547792] text-white rounded hover:bg-[#213448] transition-colors"
        onClick={() => router.push(`/${lang}/dashboard/course/${courseId}`)}
      >
        <i className="fa fa-arrow-left"></i>
      </button>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-[#213448] mb-2">{lecture.title}</h1>
        <p className="text-[#547792] mb-4">{lecture.description}</p>
        {videoUrl && (
          <div className="my-6">
            <video
              ref={videoRef}
              controls
              controlsList="nodownload"
              className="w-full rounded-lg shadow object-contain bg-black"
              onContextMenu={e => e.preventDefault()}
            >
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
            {progressChecked
              ? dictionary.dashboard.completed || "Completed"
              : progressLoading
              ? dictionary.dashboard.marking || "Marking..."
              : dictionary.dashboard.markAsCompleted || "Mark as completed"}
          </label>
        </div>
      </div>
    </div>
  )
} 