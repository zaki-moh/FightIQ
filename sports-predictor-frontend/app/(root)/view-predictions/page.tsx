import React from 'react'
import Image from 'next/image'
import Card from '@/components/ui/Card'


const page = () => {
    const sports = [
        {
            id: 'mma',
            title: 'MMA',
            logo: '/assets/icons/UFC.webp',
            alt: 'UFC',
        },
        {
            id: 'nba',
            title: 'NBA',
            logo: '/assets/icons/NBA.png',
            alt: 'NBA',
        },
        {
            id: 'nfl',
            title: 'NFL',
            logo: '/assets/icons/NFLlogo.png',
            alt: 'NFL',
        },
        {
            id: 'premier-league',
            title: 'Premier League',
            logo: '/assets/icons/PremLeug.png',
            alt: 'Premier League',
        },
    ]

  return (
    <main className="flex flex-col items-center w-full">
        <h1 className="mt-12 text-4xl text-white font-semibold leading-normal">
            Choose a sport
        </h1>
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sports.map((sport) => (
                <Card 
                    key={sport.id}
                    title={sport.title}
                    className="p-6 w-64"
                    icon={<Image width={1024} height={379} src={sport.logo} alt={sport.alt}
                    className="h-16 w-auto object-contain"
                    />}
                />
            ))}
        </section>
    </main>
  )
}

export default page