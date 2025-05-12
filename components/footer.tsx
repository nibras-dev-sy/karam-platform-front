"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Linkedin, Twitter, Facebook, Instagram, Send } from "lucide-react"
import type { Locale } from "@/lib/i18n-config"

export default function Footer({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: any
}) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing email:", email)
    setEmail("")
    // Here you would typically send this to your API
  }

  return (
    <footer id="footer">

    </footer>
  )
}
