'use client'
import React from 'react'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import { useRouter } from 'next/navigation'


const Page = () => {
    const router = useRouter();
    
    const sports = [
        {
            id: 'ufc',
            title: 'UFC',
            logo: '/assets/icons/UFC.webp',
            alt: 'UFC',
        },
        {
            id: 'one',
            title: 'OneChampionship',
            logo: '/assets/icons/OneChampionship.png',
            alt: 'NBA',
        },
        {
            id: 'toprank',
            title: 'TopRank',
            logo: '/assets/icons/TopRank2.png',
            alt: 'NFL',
        },
    ]
    
    const onClick = (src: string) => {
        router.push(`/${src}`)
    }

  return (
    <main className="min-h-[70vh] flex flex-col items-center w-full">
        <h1 className="mt-12 text-3xl sm:text-4xl text-white font-semibold leading-normal">
            Choose a sport
        </h1>
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {sports.map((sport) => (
                <Card 
                    key={sport.id}
                    onClick={() => onClick(sport.id)}
                    className="px-6 py-8 w-48 sm:52 flex flex-col items-center gap-3 cursor-pointer hover:bg-white/10 hover:scale-[1.03] transition-all duration-200"
                    icon={ 
                        <div className="flex justify-center items-center h-24 w-32">
                            <Image width={1024} height={379} src={sport.logo} alt={sport.alt}
                            className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    }
                />
            ))}
        </section>
    </main>
  )
}

export default Page