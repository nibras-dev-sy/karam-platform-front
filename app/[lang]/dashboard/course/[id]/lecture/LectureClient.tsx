"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { getLectureByDocumentIdStrapi, markLectureProgressStrapi, getLectureUploadUrlStrapi, updateLectureVideoUrlStrapi } from "@/lib/strapi"
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

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedUrl, setUploadedUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("strapi_user")
      if (userStr) {
        try {
          const user = JSON.parse(userStr)
          setIsAdmin(user.isAdmin || false)
        } catch {
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }
    }
  }, [])

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

  async function handleUploadClick() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // reset so same file can be selected again
      fileInputRef.current.click()
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadProgress(0)
    setUploadedUrl("")
    try {
      const jwt = localStorage.getItem("strapi_jwt")
      if (!jwt) throw new Error(dictionary.dashboard.notAuthenticated || "Not authenticated")
      // 1. Get signed upload URL
      const { uploadUrl } = await getLectureUploadUrlStrapi(file.name, file.type, jwt)
      // 2. Upload file to S3
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open("PUT", uploadUrl)
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setUploadProgress(Math.round((event.loaded / event.total) * 100))
          }
        }
        xhr.onload = () => {
          if (xhr.status === 200) {
            setUploadedUrl(uploadUrl.split('?')[0]) // S3 object URL (without query params)
            console.log(uploadedUrl)
            // Update lecture videoUrl in backend
            updateLectureVideoUrlStrapi(documentId, uploadUrl.split('?')[0], jwt)
              .then(() => {
                // Optionally, you can refetch lecture or show a success message
              })
              .catch((err) => {
                alert(err.message || "Failed to update lecture video URL")
              })
            resolve()
          } else {
            reject(new Error("Upload failed"))
          }
        }
        xhr.onerror = () => reject(new Error("Upload failed"))
        xhr.setRequestHeader('Content-Type', file.type)
        xhr.send(file)
      })
    } catch (err: any) {
      alert(err.message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

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
        {
        isAdmin && (
          <div className="mb-6">
            <button
              type="button"
              className="px-4 py-2 bg-[#547792] text-white rounded hover:bg-[#213448] transition-colors mr-2"
              onClick={handleUploadClick}
              disabled={uploading}
            >
              <i className="fa fa-upload mr-2"></i>{dictionary.dashboard.uploadVideo}
            </button>
            <input
              type="file"
              accept="video/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {uploading && (
              <div className="mt-2 w-full max-w-xs">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-4 bg-[#547792] transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-[#213448] mt-1">{uploadProgress}%</div>
              </div>
            )}
          </div>
        )}
        {lecture?.videoUrl && lecture.videoUrl.endsWith('.mp4') && (
          <div className="my-6">
            <video
              src={lecture.videoUrl}
              controls
              controlsList="nodownload"
              className="w-full rounded-lg shadow object-contain bg-black"
              onContextMenu={e => e.preventDefault()}
            >
            </video>
          </div>
        )}
        {
          !isAdmin && (
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
          )}
      </div>
      {
        (lecture.examLink || lecture.examFile?.url) && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            {/* Exam Section */}
            <div>
              <h2 className="text-xl font-semibold text-[#213448] mb-4">
                {dictionary.dashboard.examSection || "Exam Section"}
              </h2>
              {lecture.examLink && (
                <div className="mb-2">
                  <a
                    href={lecture.examLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-[#547792] text-white rounded hover:bg-[#213448] transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(lecture.examLink, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <i className="fa fa-link mr-2"></i>
                    {dictionary.dashboard.examLink || "Exam Link"}
                  </a>
                </div>
              )}
              {lecture.examFile?.url && (
                <div className="mb-2">
                  <a
                    href={lecture.examFile.url}
                    download
                    className="inline-block px-4 py-2 bg-[#547792] text-white rounded hover:bg-[#213448] transition-colors"
                  >
                    <i className="fa fa-download mr-2"></i>
                    {dictionary.dashboard.downloadExam || "Download Exam"}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  )
} 