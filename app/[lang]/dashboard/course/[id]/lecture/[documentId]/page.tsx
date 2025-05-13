import { getDictionary } from "@/lib/dictionary"
import LectureClient from "../LectureClient"
import { Locale } from "@/lib/i18n-config"

export default async function LecturePage({ params }: { params: any }) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  return <LectureClient dictionary={dictionary} />
} 