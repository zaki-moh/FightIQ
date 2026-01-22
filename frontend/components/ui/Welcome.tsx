'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
  BoltIcon,
  ChartBarIcon,
  GlobeAmericasIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid'

import Button from './Button'
import Card from './Card'

const Welcome = () => {
  const router = useRouter()

  return (
<main className="flex flex-col items-center px-4 md:px-6 lg:px-8 pb-16 sm:pb-24">
  <div className="w-full max-w-6xl flex flex-col items-center">
      <section className="mt-14 sm:mt-24 text-center flex flex-col gap-6 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.15]">
          Welcome to FightIQ!
        </h1>

        <p className="text-base sm:text-lg lg:text-xl font-light text-gray-400 leading-relaxed">
          AI-powered predictions for UFC, ONE Championship, and Top Rank fights
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
          <Button variant="primary" size="lg" onClick={() => router.push('/view-predictions')} className="w-full sm:w-auto">
            View predictions
          </Button>

          <Button variant="outline" size="lg" onClick={() => router.push('/learn-more')} className="w-full sm:w-auto">
            Learn more
          </Button>
        </div>
      </section>

      <div className="w-2/3 sm:w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mt-10" />

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center">
        <BoltIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />

        <span className="hidden sm:block text-white/20 text-3xl">|</span>

        <p className="font-semibold text-white text-lg sm:text-xl">
          Real-time ML predictions
        </p>

        <span className="hidden sm:block text-white/20 text-3xl">|</span>

        <p className="font-semibold text-white text-lg sm:text-xl">
          70% accuracy
        </p>
      </div>

      <section className="mt-12 w-full max-w-6xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Card
            icon={<ChartBarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />}
            title="Data-Driven Insights"
            description="Our machine learning pipeline continuously improves accuracy."
            className="p-6 w-full sm:max-w-sm hover:-translate-y-0.5 transition-transform duration-200"
          />

          <Card
            icon={<SparklesIcon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />}
            title="Smart ML Engine"
            description="Advanced models retrain and adapt using real-world performance data."
            className="p-6 w-full sm:max-w-sm hover:-translate-y-0.5 transition-transform duration-200"
          />
        </div>

        <div className="flex justify-center">
          <Card
            icon={<GlobeAmericasIcon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />}
            title="Combat Sports Focus"
            description="Explainable fight predictions tailored to modern MMA promotions, with support expanding over time."
            className="p-6 w-full sm:max-w-sm hover:-translate-y-0.5 transition-transform duration-200"
          />
        </div>
      </section>
      </div>
    </main>
  )
}

export default Welcome
