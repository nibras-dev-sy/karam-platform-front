export const i18n = {
  defaultLocale: "en",
  locales: ["en", "ar"],
}

export const locales = ['en', 'ar'] as const;
export type Locale = typeof locales[number]; // "en" | "ar"