import { getDictionary } from "@/lib/dictionary"
import CourseClient from "./CourseClient"
import { Locale } from "@/lib/i18n-config"

export default async function CoursePage({ params }: { params: any }) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  return <CourseClient dictionary={dictionary} />
} 