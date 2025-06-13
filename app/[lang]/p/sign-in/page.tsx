import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n-config"
import SignInForm from "./SignInForm"

export default async function SignIn({
  params,
}: {
    params: { lang: Locale }
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <div className="flex min-h-screen bg-[#b9bc9e]">
      {/* Left Side - Logo and Image */}
      <div className="hidden lg:flex w-1/2 bg-[#213448] flex-col items-center justify-center p-10">
        <div className="relative w-full max-w-md">
          <img className="rounded-lg w-full" src="/sign_image.png" alt="students studying on laptops in a modern library setting, educational environment, soft lighting, minimalist style" />
        </div>
        <div className="mt-10 text-center">
          <p className="text-white text-xl font-bold">{dictionary.auth.unlock}</p>
          <p className="text-gray-300 mt-2">{dictionary.auth.joinThousands}</p>
          <div className="flex space-x-8 justify-center mt-8">
            <i className="fa-brands fa-facebook-f text-white text-xl hover:text-[#94B4C1] transition-colors cursor-pointer"></i>
            <i className="fa-brands fa-twitter text-white text-xl hover:text-[#94B4C1] transition-colors cursor-pointer"></i>
            <i className="fa-brands fa-instagram text-white text-xl hover:text-[#94B4C1] transition-colors cursor-pointer"></i>
            <i className="fa-brands fa-linkedin-in text-white text-xl hover:text-[#94B4C1] transition-colors cursor-pointer"></i>
          </div>
        </div>
      </div>
      {/* Right Side - Sign In Form */}
      <div id="signin-container" className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {/* Sign In Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-bold text-[#213448] mb-2">{dictionary.auth.welcomeBack}</h1>
            <p className="text-gray-600 mb-8">{dictionary.auth.signInSubtitle}</p>
            <SignInForm dictionary={dictionary} lang={lang} />
          </div>
          {/* Sign Up Link */}
          <div className="mt-6 text-center text-gray-600">
            {dictionary.auth.noAccount} {" "}
            <a href={`/${lang}/p/sign-up`} className="text-[#547792] font-medium hover:text-[#213448] transition-colors cursor-pointer">
              {dictionary.auth.signUpForFree}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 