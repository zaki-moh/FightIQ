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
    <main className="flex flex-col items-center px-4">
      <section className="mt-20 sm:mt-24 text-center flex flex-col gap-6 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Welcome to FightIQ!
        </h1>

        <p className="text-base sm:text-lg lg:text-xl font-light text-gray-400 leading-relaxed">
          AI-powered combat sports predictions and analytics
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
          <Button variant="primary" size="lg" onClick={() => router.push('/view-predictions')}>
            View predictions
          </Button>

          <Button variant="outline" size="lg" onClick={() => router.push('/learn-more')}>
            Learn more
          </Button>
        </div>
      </section>

      <div className="w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mt-10" />

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center">
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

      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        <Card
          icon={<ChartBarIcon className="w-10 h-10 text-purple-400" />}
          title="Data-Driven Insights"
          description="Our machine learning pipeline continuously improves accuracy."
          className="p-6 hover:-translate-y-0.5 transition-transform duration-200"
        />

        <Card
          icon={<SparklesIcon className="w-10 h-10 text-yellow-400" />}
          title="Smart ML Engine"
          description="Advanced models retrain and adapt using real-world performance data."
          className="p-6 hover:-translate-y-0.5 transition-transform duration-200"
        />

        <Card
          icon={<GlobeAmericasIcon className="w-10 h-10 text-cyan-400" />}
          title="Multi-Sport Support"
          description="Predictions tailored to UFC, NBA, NFL, Premier League, and more."
          className="p-6 hover:-translate-y-0.5 transition-transform duration-200"
        />
      </section>
    </main>
  )
}

export default Welcome
