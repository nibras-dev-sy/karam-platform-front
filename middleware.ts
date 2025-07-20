import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "@/lib/i18n-config"
import Negotiator from "negotiator"
import { match as matchLocale } from "@formatjs/intl-localematcher"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/p`) && !pathname.startsWith(`/${locale}/dashboard`),
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = 'ar'

    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(new URL(`/${locale}/p${pathname.startsWith(`/${locale}`) ? "" : "/"}${pathname}`, request.url))
  }
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and image files
  matcher: ["/((?!api|_next/static|_next/image|sitemap.xml|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|ico)).*)"],
}
