import Button from '@/components/ui/Button'
import React from 'react'
import {
  CloudIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import Card from '@/components/ui/Card'

const Page = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="max-w-3xl w-full px-6 mt-16 text-left">

        {/* HERO */}
        <h1 className="text-white font-semibold text-4xl mt-10 leading-normal">
          How FightIQ Delivers <br />
          Smarter Combat Sports Predictions
        </h1>

        <h2 className="text-white/60 font-light text-xl mt-5 leading-normal">
          Behind the scenes of our machine learning engine, <br />
          accuracy pipeline, and combat-sports analytics.
        </h2>

        <Button
          variant="ghost"
          size="sm"
          className="mt-6 h-10 w-36 border border-white/20 hover:border-white/40 text-white"
        >
          Get Started
        </Button>

        {/* HOW IT WORKS */}
        <h1 className="mt-12 text-white font-semibold text-4xl leading-normal">
          How FightIQ Works
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 mt-4">
          <Card
            title="Data Ingestion"
            description="Aggregates historical fight outcomes and fighter-level statistics from multiple sources."
            icon={<CloudIcon className="h-8 w-8 text-white" />}
          />

          <Card
            title="ML Pipeline Processing"
            description="Performs feature engineering, model training, evaluation, and bias mitigation."
            icon={<Cog6ToothIcon className="h-8 w-8 text-white" />}
          />

          <Card
            title="Prediction Output"
            description="Generates calibrated win-probability predictions for upcoming matchups."
            icon={<ChartBarIcon className="h-8 w-8 text-white" />}
          />
        </div>

        {/* ACCURACY */}
        <h1 className="mt-12 text-white font-semibold text-2xl mb-4">
          Accuracy and Transparency
        </h1>

        <h2 className="text-white font-semibold text-xl">
          Approximate prediction accuracy: ~70%
        </h2>

        <p className="text-gray-400 font-light mt-2 mb-6">
          Validated using held-out historical fight data, ongoing evaluation,
          and conservative confidence calibration to reduce overfitting.
        </p>

      </div>
    </div>
  )
}

export default Page
