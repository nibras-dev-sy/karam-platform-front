import { getDictionary } from "@/lib/dictionary"
import ProfileClient from "./ProfileClient"
import { Locale } from "@/lib/i18n-config"

export default async function ProfilePage({ params }: { params: any }) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  return <ProfileClient dictionary={dictionary} />
} 