'use client'
import React from 'react'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  const go = (path: string) => router.push(`/${path}`)

  return (
    <main className="min-h-[70vh] flex flex-col items-center w-full px-4 sm:px-6 pb-16 sm:pb-24">
      <h1 className="mt-8 sm:mt-12 text-3xl sm:text-4xl text-white font-semibold leading-normal text-center">
        Choose a sport
      </h1>

      <section className="mt-10 w-full max-w-4xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Card
            onClick={() => go('ufc')}
            className="px-6 py-8 w-full sm:w-52 flex flex-col items-center gap-3 cursor-pointer
                       hover:bg-white/10 active:scale-[0.98] hover:scale-[1.03]
                       transition-all duration-200"
            icon={
              <div className="flex justify-center items-center h-24 w-32">
                <Image
                  width={1024}
                  height={379}
                  src="/assets/icons/UFCcropped.png"
                  alt="UFC"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            }
          />

          <Card
            onClick={() => go('one')}
            className="px-6 py-8 w-full sm:w-52 flex flex-col items-center gap-3 cursor-pointer
                       hover:bg-white/10 active:scale-[0.98] hover:scale-[1.03]
                       transition-all duration-200"
            icon={
              <div className="flex justify-center items-center h-24 w-32">
                <Image
                  width={1024}
                  height={379}
                  src="/assets/icons/OneChampionship.png"
                  alt="ONE Championship"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            }
          />
        </div>

        <div className="flex justify-center sm:mt-2">
          <Card
            onClick={() => go('toprank')}
            className="px-6 py-8 w-full sm:w-52 flex flex-col items-center gap-3 cursor-pointer
                       hover:bg-white/10 active:scale-[0.98] hover:scale-[1.03]
                       transition-all duration-200"
            icon={
              <div className="flex justify-center items-center h-24 w-32">
                <Image
                  width={1024}
                  height={379}
                  src="/assets/icons/TopRank2.png"
                  alt="Top Rank"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            }
          />
        </div>
      </section>
    </main>
  )
}

export default Page
