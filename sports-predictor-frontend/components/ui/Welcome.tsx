'use client'

import React from 'react'
import Button from './Button'
import { useRouter } from 'next/navigation'
import {
  BoltIcon,
  ChartBarIcon,
  GlobeAmericasIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid'
import Card from './Card'

const Welcome = () => {
  const router = useRouter()

  const learnMore = () => {
    router.push('/learn-more')
  }

  const getStarted = () => {
    router.push('/')
  }

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <section className="flex flex-col w-full items-center justify-center gap-6 mt-20 sm:mt-24 text-center opacity-0 fade-in-up animate-[delay-150ms]">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Welcome to Sporta AI!
        </h1>

        <h2 className="text-base sm:text-lg lg:text-xl font-light text-gray-400 leading-relaxed max-w-2xl">
          AI-powered sports predictions and analytics
        </h2>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-2">
          <Button variant="primary" size="lg" onClick={getStarted}>
            Get started
          </Button>
          <Button variant="outline" size="lg" onClick={learnMore}>
            Learn more
          </Button>
        </div>
      </section>

      <div
        className="
          w-3/4 
          max-w-4xl 
          mx-auto 
          mt-10 
          h-[2px]
          bg-gradient-to-r 
          from-transparent 
          via-white/20 
          to-transparent
        "
      />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 text-center">
        <BoltIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />

        <span className="hidden sm:block text-white/20 text-3xl">|</span>

        <h3 className="font-semibold text-white text-lg sm:text-xl">
          Real-time ML predictions
        </h3>

        <span className="hidden sm:block text-white/20 text-3xl">|</span>

        <h3 className="font-semibold text-white text-lg sm:text-xl">
          70% accuracy
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 fade-in-up animate-[delay-300ms] max-w-6xl w-full">
        <Card
          icon={<ChartBarIcon className="w-10 h-10 text-purple-400" />}
          title="Data-Driven Insights"
          description="Our machine learning pipeline continuously improves accuracy."
        />

        <Card
          icon={<SparklesIcon className="w-10 h-10 text-yellow-400" />}
          title="Smart ML Engine"
          description="Advanced models retrain and adapt using real-world performance data."
        />

        <Card
          icon={<GlobeAmericasIcon className="w-10 h-10 text-cyan-400" />}
          title="Multi-Sport Support"
          description="Predictions tailored to UFC, NBA, NFL, Premier League, and more."
        />
      </div>
    </div>
  )
}

export default Welcome
