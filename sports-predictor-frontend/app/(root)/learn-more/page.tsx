'use client'
import React from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import {
  CloudIcon,
  ChartBarIcon,
  Cog6ToothIcon
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
    <main className="flex flex-col w-full items-center">

      <section className="max-w-3xl w-full px-6 mt-20 text-center">
        <h1 className="text-white font-semibold text-4xl leading-tight">
          How FightIQ Delivers <br />
          Data-Driven Fight Predictions
        </h1>

        <p className="text-white/60 font-light text-xl mt-5 leading-relaxed">
          A transparent look at how historical fight data and machine learning
          are used to generate explainable UFC matchup predictions.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            size="sm"
            variant="primary"
            className="h-12 w-44"
            onClick={viewPredictions}
          >
            View Predictions
          </Button>
        </div>
      </section>

      <div className="my-20 h-px w-full bg-white/10" />

      {/* Why */}
      <section className="max-w-3xl w-full px-6 text-center">
        <h2 className="text-white font-semibold text-3xl">
          Why FightIQ Exists
        </h2>

        <p className="text-white/60 text-lg leading-relaxed mt-4">
          Combat sports predictions are often driven by hype, narratives,
          or betting lines. FightIQ was built to take a data-first approach
          using historical fight outcomes and fighter-level metrics to
          produce consistent, explainable predictions.
        </p>
      </section>

      <div className="my-14 h-px w-full bg-white/10" />

      <section className="max-w-5xl w-full px-6 text-center">
        <h2 className="text-white font-semibold text-3xl mb-8">
          How FightIQ Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          <Card
            title="01 · Historical Data"
            description="Uses curated UFC fight outcomes and fighter-level statistics to construct training examples."
            icon={<CloudIcon className="h-8 w-8 text-white" />}
            className="p-6 hover:-translate-y-0.5 transition-transform duration-200"
          />

          <Card
            title="02 · Feature Engineering"
            description="Transforms raw statistics into matchup-based differentials such as striking efficiency, grappling efficiency, and physical attributes."
            icon={<Cog6ToothIcon className="h-8 w-8 text-white" />}
            className="p-6 hover:-translate-y-0.5 transition-transform duration-200"
          />

          <Card
            title="03 · ML Prediction"
            description="Applies a trained Random Forest model to estimate win probabilities and generate interpretable matchup insights."
            icon={<ChartBarIcon className="h-8 w-8 text-white" />}
            className="p-6 hover:-translate-y-0.5 transition-transform duration-200"
          />
        </div>
      </section>

      <div className="my-14 h-px w-full bg-white/10" />

      {/* Accuracy */}
      <section className="max-w-3xl w-full px-6 text-center">
        <h2 className="text-white font-semibold text-3xl mb-4">
          Accuracy & Evaluation
        </h2>

        <p className="text-white font-semibold text-xl">
          ~70% accuracy on held-out historical data
        </p>

        <p className="text-gray-400 font-light mt-3 leading-relaxed">
          Evaluated using a strict train/test split on historical UFC fight data.
          Predictions shown for past matchups are clearly labeled and excluded
          from accuracy reporting to prevent data leakage.
        </p>
      </section>

      <div className="my-20 h-px w-full bg-white/10" />

      <section className="max-w-3xl w-full px-6 text-center mb-24">
        <h3 className="font-semibold text-2xl text-white">
          Ready to explore FightIQ?
        </h3>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            size="sm"
            variant="primary"
            className="h-12 w-48"
            onClick={viewPredictions}
          >
            View Predictions
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="h-12 w-64 border-white/20 hover:border-white/40"
            onClick={learnMore}
          >
            Learn About the Model
          </Button>
        </div>

        <p className="mt-16 text-sm text-white/40">
          Built with Next.js, TypeScript, Python, and scikit-learn.
        </p>
      </section>

    </main>
  )
}

export default Page
