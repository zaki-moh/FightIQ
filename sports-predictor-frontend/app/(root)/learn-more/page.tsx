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
    const router = useRouter();
  
    const learnMore = () => {
      router.push("/learn-more-about-model")
    }

  return (
    <main className="flex flex-col w-full items-center">

      <section className="max-w-3xl w-full px-6 mt-20 text-center">
        <h1 className="text-white font-semibold text-4xl leading-tight">
          How FightIQ Delivers <br />
          Smarter Combat Sports Predictions
        </h1>

        <p className="text-white/60 font-light text-xl mt-5 leading-relaxed">
          A behind-the-scenes look at our machine learning pipeline,
          accuracy validation, and combat-sports analytics.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="ghost"
            size="sm"
            className="h-11 w-40 border border-white/20 hover:border-white/40 text-white"
          >
            Get Started
          </Button>

          <Button
            size="sm"
            variant="primary"
            className="h-11 w-42"
          >
            View Predictions
          </Button>
        </div>
      </section>

      <div className="my-20 h-px w-full bg-white/10" />

      <section className="max-w-3xl w-full px-6 text-center">
        <h2 className="text-white font-semibold text-3xl">
          Why FightIQ Exists
        </h2>

        <p className="text-white/60 text-lg leading-relaxed mt-4">
          Combat sports predictions are often driven by hype, odds movement,
          or intuition. FightIQ was built to take a data-first approach, by
          leveraging historical fight data, fighter-level metrics, and
          machine learning to produce transparent, calibrated predictions
          you can actually trust.
        </p>
      </section>

      <div className="my-14 h-px w-full bg-white/10" />

      <section className="max-w-5xl w-full px-6 text-center">
        <h2 className="text-white font-semibold text-3xl mb-8">
          How FightIQ Works
        </h2>

        <div className="flex flex-col sm:flex-row gap-6">
          <Card
            title="01 · Data Ingestion"
            description="Aggregates historical fight outcomes and fighter-level statistics from multiple trusted data sources."
            icon={<CloudIcon className="h-8 w-8 text-white" />}
          />

          <Card
            title="02 · ML Pipeline"
            description="Performs feature engineering, model training, evaluation, and confidence calibration."
            icon={<Cog6ToothIcon className="h-8 w-8 text-white" />}
          />

          <Card
            title="03 · Prediction Output"
            description="Generates calibrated win-probability predictions for upcoming matchups."
            icon={<ChartBarIcon className="h-8 w-8 text-white" />}
          />
        </div>
      </section>

      <div className="my-14 h-px w-full bg-white/10" />

      <section className="max-w-3xl w-full px-6 text-center">
        <h2 className="text-white font-semibold text-3xl mb-4">
          Accuracy & Transparency
        </h2>

        <p className="text-white font-semibold text-xl">
          ~70% prediction accuracy
        </p>

        <p className="text-gray-400 font-light mt-3 leading-relaxed">
          Evaluated using held-out historical UFC fight data with strict
          train/test splits, ongoing evaluation, and conservative confidence
          calibration to reduce overfitting and false confidence.
        </p>
      </section>

      <div className="my-20 h-px w-full bg-white/10" />

      <section className="max-w-3xl w-full px-6 text-center mb-24">
        <h3 className="font-semibold text-2xl text-white">
          Ready to see FightIQ in action?
        </h3>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            size="sm"
            variant="primary"
            className="h-12 w-48"
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
