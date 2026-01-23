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
          FightIQ
        </h1>

        <p className="text-base sm:text-lg lg:text-xl font-light text-white/65 leading-relaxed">
          Predict Fight Outcomes with Explainable Machine Learning
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

        <p className="font-semibold text-white text-lg sm:text-xl">
          Real-time ML predictions
        </p>

        <span className="hidden sm:block text-white/20 text-3xl">|</span>

        <p className="font-semibold text-white text-lg sm:text-xl">
          ~70% accuracy on historical fight data
        </p>
      </div>

      <section className="mt-8 w-full max-w-6xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Card
            icon={<ChartBarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />}
            title="Data-Driven Insights"
            description="Features are derived from historical fight data and aggregated fighter statistics, enabling consistent, data-driven predictions."
            className="p-6 w-full sm:w-[420px] hover:-translate-y-0.5 transition-transform duration-200 bg-white/7 border-white/10"
          />

          <Card
            icon={<SparklesIcon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />}
            title="Smart ML Engine"
            description="A trained ML model evaluates matchup features at inference time, balancing predictive performance with explainability."
            className="p-6 w-full sm:w-[420px] hover:-translate-y-0.5 transition-transform duration-200 bg-white/7 border-white/10"
          />
        </div>

        <div className="flex justify-center">
          <Card
            icon={<GlobeAmericasIcon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />}
            title="Combat Sports Focus"
            description="The system is designed around combat sports domains, with features and explanations aligned to how fights are analyzed in MMA."
            className="p-6 w-full sm:w-[420px] hover:-translate-y-0.5 transition-transform duration-200 bg-white/7 border-white/10"
          />
        </div>
      </section>

      <section className="mt-20 px-6 flex flex-col items-center"> 
        <h1 className="text-2xl sm:text-3xl font-semibold text-white">
          How FightIQ works
        </h1>
        <p className="mt-4 max-w-2xl text-center text-white/70">
          A high-level view of how predictions flow through the system, from input to explainable output.
        </p>


        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl">
          <div>
            <h3 className="text-lg font-semibold text-white ">
              1. User Input
            </h3>
            <p className="mt-2 font-sm text-white/70 max-w-xs">
              Select two fighters in the UI and submit a prediction request from the frontend.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white ">
              2. Backend Inference
            </h3>
            <p className="mt-2 font-sm text-white/70 max-w-xs">
              The FastAPI backend validates the request, constructs matchup features from both fighters, and runs the trained machine learning model to generate a prediction.           
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              3. Explainable Output
            </h3>
            <p className="mt-2 font-sm text-white/70 max-w-xs">
              The system returns win probabilities, a predicted winner, and ranked contributing factors that explain the model’s decision.
            </p>
          </div>

        </div>
      </section>
      </div>
    </main>
  )
}

export default Welcome
