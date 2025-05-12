"use client"

import { usePathname, useRouter } from "next/navigation"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { useCallback } from "react"

export default function LanguageSwitcher({
  currentLang,
  switchLabel,
}: {
  currentLang: string
  switchLabel: string
}) {
  const pathName = usePathname()
  const router = useRouter()

  const redirectedPathName = useCallback(
    (locale: string) => {
      if (!pathName) return "/"
      const segments = pathName.split("/")
      segments[1] = locale
      return segments.join("/")
    },
    [pathName],
  )

  return (
    <Select
      value={currentLang}
      onValueChange={val => {
        if (val !== currentLang) {
          router.push(redirectedPathName(val))
        }
      }}
    >
      <SelectTrigger className="w-16 h-8 text-xs border-gray-300 bg-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="en">En</SelectItem>
        <SelectItem value="ar">Ar</SelectItem>
      </SelectContent>
    </Select>
  )
}
