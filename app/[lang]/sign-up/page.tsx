import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n-config"

export default async function SignUp({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const dictionary = await getDictionary(lang)

  return (
    <div className="flex min-h-screen bg-[#ECEFCA]">
      {/* Left Side - Logo and Image */}
      <div className="hidden lg:flex w-1/2 bg-[#213448] flex-col items-center justify-center p-10">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-white flex items-center justify-center rounded-md">
            <span className="text-[#213448] text-xl font-bold">OA</span>
          </div>
          <div className="ml-3 text-2xl font-bold text-white">Online Academy</div>
        </div>
        <div className="relative w-full max-w-md">
          <img className="rounded-lg shadow-xl w-full" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7b9d4862f1-4fe5d61bedd772168067.png" alt="students studying on laptops in a modern library setting, educational environment, soft lighting, minimalist style" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#213448] to-transparent p-6">
            <p className="text-white text-xl font-bold">{dictionary.auth.unlock}</p>
            <p className="text-gray-300 mt-2">{dictionary.auth.joinThousands}</p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-white text-lg mb-6">{dictionary.auth.trustedBy}</p>
          <div className="flex space-x-8 justify-center">
            <i className="fa-brands fa-facebook-f text-white text-xl hover:text-[#94B4C1] transition-colors cursor-pointer"></i>
            <i className="fa-brands fa-twitter text-white text-xl hover:text-[#94B4C1] transition-colors cursor-pointer"></i>
            <i className="fa-brands fa-instagram text-white text-xl hover:text-[#94B4C1] transition-colors cursor-pointer"></i>
            <i className="fa-brands fa-linkedin-in text-white text-xl hover:text-[#94B4C1] transition-colors cursor-pointer"></i>
          </div>
        </div>
      </div>
      {/* Right Side - Sign Up Form */}
      <div id="signup-container" className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo (visible only on small screens) */}
          <div className="flex items-center justify-center mb-8 lg:hidden">
            <div className="w-10 h-10 bg-[#213448] flex items-center justify-center rounded-md">
              <span className="text-white text-xl font-bold">OA</span>
            </div>
            <div className="ml-2 text-xl font-bold text-[#213448]">Online Academy</div>
          </div>
          {/* Sign Up Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-bold text-[#213448] mb-2">{dictionary.auth.createAccount}</h1>
            <p className="text-gray-600 mb-8">{dictionary.auth.signUpSubtitle}</p>
            <form id="signup-form">
              {/* Name Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#213448] mb-2" htmlFor="name">
                  {dictionary.auth.name}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <i className="fa-regular fa-user text-gray-500"></i>
                  </div>
                  <input
                    id="name"
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#547792] focus:border-[#547792]"
                    placeholder={dictionary.auth.namePlaceholder}
                    required
                  />
                </div>
              </div>
              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#213448] mb-2" htmlFor="email">
                  {dictionary.auth.email}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <i className="fa-regular fa-envelope text-gray-500"></i>
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#547792] focus:border-[#547792]"
                    placeholder={dictionary.auth.emailPlaceholder}
                    required
                  />
                </div>
              </div>
              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#213448] mb-2" htmlFor="password">
                  {dictionary.auth.password}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <i className="fa-solid fa-lock text-gray-500"></i>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#547792] focus:border-[#547792]"
                    placeholder="••••••••••"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer" id="toggle-password">
                    <i className="fa-regular fa-eye text-gray-500"></i>
                  </div>
                </div>
              </div>
              {/* Sign Up Button */}
              <button
                id="signup-button"
                type="submit"
                className="w-full bg-[#213448] hover:bg-[#547792] text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {dictionary.auth.signUp}
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </button>
            </form>
            {/* Or Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">{dictionary.auth.orContinueWith}</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* Social Sign Up */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <i className="fa-brands fa-google text-lg"></i>
              </button>
              <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <i className="fa-brands fa-facebook text-lg"></i>
              </button>
              <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <i className="fa-brands fa-apple text-lg"></i>
              </button>
            </div>
          </div>
          {/* Sign In Link */}
          <div className="mt-6 text-center text-gray-600">
            {dictionary.auth.haveAccount} {" "}
            <a href={`/${lang}/sign-in`} className="text-[#547792] font-medium hover:text-[#213448] transition-colors cursor-pointer">
              {dictionary.auth.signInHere}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 