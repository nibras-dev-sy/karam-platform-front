import { getDictionary } from "@/lib/dictionary"
import MyCoursesClient from "./MyCoursesClient"

export default async function MyCoursesPage({ params }: { params: any }) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  return <MyCoursesClient dictionary={dictionary} />
} 