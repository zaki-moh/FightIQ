'use client'
import Button from '@/components/ui/Button'
import FighterSelector from '@/components/ui/FighterSelector'
import React, { useState } from 'react'

const MMA = () => {
  const [fighterA, setFighterA] = useState("")
  const [fighterB, setFighterB] = useState("")
  const [loading, setLoading] = useState(false)

  const canPredict =
    fighterA &&
    fighterB &&
    fighterA !== fighterB &&
    !loading

  const handlePredict = async () => {
    setLoading(true)

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fighterA, fighterB }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Prediction failed")
      }

      const data = await response.json()
      console.log("Prediction result:", data)

    } catch (error) {
      console.error("Error predicting fight:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center">
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

        <FighterSelector
          fighterA={fighterA}
          fighterB={fighterB}
          setFighterA={setFighterA}
          setFighterB={setFighterB}
        />

        <Button
          variant="primary"
          size="lg"
          className="mt-4 px-10"
          onClick={handlePredict}
          disabled={!canPredict}
        >
          {loading ? "Predicting..." : "Predict"}
        </Button>
      </section>
    </main>
  )
}

export default MMA
