import "server-only"
import type { Locale } from "./i18n-config"

const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  const loader = dictionaries[locale] ?? dictionaries["en"];
  if (!loader) {
    throw new Error(`No dictionary found for locale: ${locale}`);
  }
  return await loader();
};
