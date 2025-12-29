import FighterSelector from '@/components/ui/FighterSelector'
import React from 'react'

const MMA = () => {
  return (
    <main className="flex flex-col items-center ">
      <section className="max-w-4xl py-12 w-full text-center">
        <h1 className="text-white text-4xl font-semibold tracking-tight">
          UFC Fight Predictor
        </h1>
        <h2 className="mt-4 text-white/60 text-lg">
          Select two fighters to see who our model predicts will win.
        </h2>
        <p className="mt-6 text-white/40 text-sm">
          ↓ Enter two fighters below to generate a matchup prediction
        </p>
        <FighterSelector />
      </section>
    </main>

  )
}

export default MMA