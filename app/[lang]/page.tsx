import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n-config"

export default async function Home({
  params,
}: {
  params: { lang: Locale }
}) {
  const { lang } = params
  const dictionary = await getDictionary(lang)

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="bg-[#ECEFCA] py-16 md:py-24">
        <div className="container mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-[#213448] leading-tight mb-6">
                {dictionary.hero.title}
              </h1>
              <p className="text-lg text-gray-700 mb-8">{dictionary.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <span className="bg-[#213448] text-white px-8 py-3 rounded-md font-medium hover:bg-[#547792] transition-colors text-center cursor-pointer">
                  {dictionary.hero.explore}
                </span>
                <span className="border border-[#213448] text-[#213448] px-8 py-3 rounded-md font-medium hover:bg-[#213448] hover:text-white transition-colors text-center cursor-pointer">
                  {dictionary.hero.learnMore}
                </span>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  className="rounded-lg shadow-xl"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/77233029e7-67c3542adb07ec65fe31.png"
                  alt="modern e-learning platform with students studying on laptops, professional lighting, educational environment, clean design"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#213448] mb-4">{dictionary.stats.title}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">{dictionary.stats.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div id="stat-card-1" className="bg-[#ECEFCA] p-6 rounded-lg text-center">
              <div className="text-[#213448] mb-2">
                <i className="fa-solid fa-users text-4xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-[#213448] mb-2">25K+</h3>
              <p className="text-gray-600">{dictionary.stats.students}</p>
            </div>
            <div id="stat-card-2" className="bg-[#ECEFCA] p-6 rounded-lg text-center">
              <div className="text-[#213448] mb-2">
                <i className="fa-solid fa-book-open text-4xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-[#213448] mb-2">1,200+</h3>
              <p className="text-gray-600">{dictionary.stats.courses}</p>
            </div>
            <div id="stat-card-3" className="bg-[#ECEFCA] p-6 rounded-lg text-center">
              <div className="text-[#213448] mb-2">
                <i className="fa-solid fa-chalkboard-user text-4xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-[#213448] mb-2">300+</h3>
              <p className="text-gray-600">{dictionary.stats.instructors}</p>
            </div>
            <div id="stat-card-4" className="bg-[#ECEFCA] p-6 rounded-lg text-center">
              <div className="text-[#213448] mb-2">
                <i className="fa-solid fa-medal text-4xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-[#213448] mb-2">98%</h3>
              <p className="text-gray-600">{dictionary.stats.satisfaction}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 bg-[#213448] text-white">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{dictionary.cta.title}</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">{dictionary.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <span className="bg-[#547792] text-white px-8 py-3 rounded-md font-medium hover:bg-[#94B4C1] transition-colors cursor-pointer">
              {dictionary.cta.getStarted}
            </span>
            <span className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-[#213448] transition-colors cursor-pointer">
              {dictionary.cta.browse}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
