'use client'

import React from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import {
  CloudIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  const learnMore = () => {
    router.push('/learn-more-about-model')
  }

  const viewPredictions = () => {
    router.push('/view-predictions')
  }

  return (
    <main className="flex flex-col w-full items-center px-4 sm:px-6 pb-20 sm:pb-24">
      <section className="max-w-3xl w-full mt-14 sm:mt-20 text-center">
        <h1 className="text-white font-semibold text-3xl sm:text-4xl leading-tight">
          How FightIQ Delivers <br />
          Data-Driven Fight Predictions
        </h1>

        <p className="text-white/60 font-light text-base sm:text-xl mt-4 sm:mt-5 leading-relaxed">
          A transparent look at how historical fight data and machine learning
          are used to generate explainable UFC matchup predictions.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 sm:mt-8">
          <Button
            size="sm"
            variant="primary"
            className="h-12 w-full sm:w-44"
            onClick={viewPredictions}
          >
            View Predictions
          </Button>
        </div>
      </section>

      <div className="my-12 sm:my-20 h-px w-full bg-white/10" />

      <section className="max-w-3xl w-full text-center">
        <h2 className="text-white font-semibold text-2xl sm:text-3xl">
          Why FightIQ Exists
        </h2>

        <p className="text-white/60 text-base sm:text-lg leading-relaxed mt-4">
          Combat sports predictions are often driven by hype, narratives,
          or betting lines. FightIQ was built to take a data-first approach
          using historical fight outcomes and fighter-level metrics to
          produce consistent, explainable predictions.
        </p>
      </section>

      <div className="my-12 sm:my-14 h-px w-full bg-white/10" />

      <section className="max-w-5xl w-full text-center">
        <h2 className="text-white font-semibold text-2xl sm:text-3xl mb-8">
          How FightIQ Works
        </h2>

        <div className="mt-6 w-full flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Card
              title="01 · Historical Data"
              description="Uses curated UFC fight outcomes and fighter-level statistics to construct training examples."
              icon={<CloudIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />}
              className="p-5 sm:p-6 w-full sm:max-w-sm hover:-translate-y-0.5 transition-transform duration-200"
            />

            <Card
              title="02 · Feature Engineering"
              description="Transforms raw statistics into matchup-based differentials such as striking efficiency, grappling efficiency, and physical attributes."
              icon={<Cog6ToothIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />}
              className="p-5 sm:p-6 w-full sm:max-w-sm hover:-translate-y-0.5 transition-transform duration-200"
            />
          </div>

          <div className="flex justify-center sm:mt-2">
            <Card
              title="03 · ML Prediction"
              description="Applies a trained Random Forest model to estimate win probabilities and generate interpretable matchup insights."
              icon={<ChartBarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />}
              className="p-5 sm:p-6 w-full sm:max-w-sm hover:-translate-y-0.5 transition-transform duration-200"
            />
          </div>
        </div>
      </section>

      <div className="my-12 sm:my-14 h-px w-full bg-white/10" />

      <section className="max-w-3xl w-full text-center">
        <h2 className="text-white font-semibold text-2xl sm:text-3xl mb-4">
          Accuracy & Evaluation
        </h2>

        <p className="text-white font-semibold text-lg sm:text-xl">
          ~70% accuracy on held-out historical data
        </p>

        <p className="text-gray-400 font-light mt-3 leading-relaxed text-sm sm:text-base">
          Evaluated using a strict train/test split on historical UFC fight data.
          Predictions shown for past matchups are clearly labeled and excluded
          from accuracy reporting to prevent data leakage.
        </p>
      </section>

      <div className="my-12 sm:my-20 h-px w-full bg-white/10" />

      <section className="max-w-3xl w-full text-center">
        <h3 className="font-semibold text-xl sm:text-2xl text-white">
          Ready to explore FightIQ?
        </h3>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Button
            size="sm"
            variant="primary"
            className="h-12 w-full sm:w-48"
            onClick={viewPredictions}
          >
            View Predictions
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="h-12 w-full sm:w-64 border-white/20 hover:border-white/40"
            onClick={learnMore}
          >
            Learn About the Model
          </Button>
        </div>

        <p className="mt-12 sm:mt-16 text-sm text-white/40">
          Built with Next.js, TypeScript, Python, and scikit-learn.
        </p>
      </section>

    </main>
  )
}

export default Page
