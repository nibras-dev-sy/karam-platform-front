import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n-config'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default async function SupportPage({
    params,
}: {
    params: { lang: Locale }
}) {
    const { lang } = await params
    const dictionary = await getDictionary(lang)

    return (
        <div className="max-w-xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-[#213448] mb-8 text-center">
                {dictionary.support.title}
            </h1>
            <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center">
                <div className="text-lg font-semibold text-[#547792] mb-2">
                    {dictionary.support.support}
                </div>
                <a href={`tel:+9639995400571`} className="text-2xl text-[#213448] font-bold mb-1" dir="ltr">{"+9639995400571"}</a>
                <div className="flex items-center gap-4 mt-2">
                    <a href={`tel:+9639995400571`} className="text-[#547792] hover:text-[#213448] transition-colors">
                        <i className="fa fa-phone text-xl"></i>
                    </a>
                    <a href={`https://wa.me/9639995400571`} className="text-[#547792] hover:text-[#213448] transition-colors">
                        <i className="fa fa-whatsapp text-xl"></i>
                    </a>
                </div>
            </div>
        </div>
    )
} 