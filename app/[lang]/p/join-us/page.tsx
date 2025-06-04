import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n-config'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default async function JoinUsPage({
    params,
}: {
    params: { lang: Locale }
}) {
    const { lang } = await params
    const dictionary = await getDictionary(lang)

    return (
        <div className="max-w-xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-[#213448] mb-8 text-center">
                {dictionary.joinUs?.title || 'Join Us'}
            </h1>
            <div className="mb-6 p-6 bg-white rounded-lg shadow flex flex-col items-center">
                <div className="text-lg font-semibold text-[#547792] mb-2">
                    {dictionary.joinUs?.sales || 'Sales'}
                </div>
                <a href={`tel:+963996785533`} className="text-2xl text-[#213448] font-bold mb-1">{"+963996785533"}</a>
                <span className="text-[#547792]">{dictionary.joinUs?.call || 'Call us'}</span>
            </div>
            <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center">
                <div className="text-lg font-semibold text-[#547792] mb-2">
                    {dictionary.joinUs?.support || 'Support'}
                </div>
                <a href={`tel:+963996785533`} className="text-2xl text-[#213448] font-bold mb-1">{"+963996785533"}</a>
                <span className="text-[#547792]">{dictionary.joinUs?.call || 'Call us'}</span>
            </div>
        </div>
    )
} 