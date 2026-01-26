'use client'
import Button from '@/components/ui/Button'
import FighterCard from '@/components/ui/FighterCard'
import FighterSelector from '@/components/ui/FighterSelector'
import PredictionExplanation from '@/components/ui/PredictionExplanation'
import React, { useState, useEffect } from 'react'

type PredictionResult = {
  fighterA: string
  fighterB: string
  winner: string
  confidence: number
  probabilities: Record<string, number>
  edge: {
    type: 'striking' | 'grappling' | 'no_clear_advantage' | 'weight' | 'division'
  }
  is_historic: boolean
  explanation: PredictionExplanation
}

const MMA = () => {
  const [fighterA, setFighterA] = useState('')
  const [fighterB, setFighterB] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [selectedA, setSelectedA] = useState<string | null>(null)
  const [selectedB, setSelectedB] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)

  const [isDirty, setIsDirty] = useState(true)

  useEffect(() => {
    setResult(null)
    setError(null)
    setIsDirty(true)
  }, [fighterA, fighterB])

  const handleChangeA = (text: string) => {
    setFighterA(text)
    setSelectedA(null) 
  }

  const handleSelectA = (name: string) => {
    setFighterA(name)
    setSelectedA(name) 
  }

  const handleChangeB = (text: string) => {
    setFighterB(text)
    setSelectedB(null) 
  }

  const handleSelectB = (name: string) => {
    setFighterB(name)
    setSelectedB(name) 
  }

  const inputsFilled =
    selectedA !== null &&
    selectedB !== null &&
    selectedA !== selectedB

  const canPredict =
    inputsFilled &&
    isDirty &&
    !loading


  const handlePredict = async () => {
    setLoading(true)
    setResult(null)
    setError(null)

    const API_URL = process.env.NEXT_PUBLIC_API_URL

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fighterA, fighterB }),
      })

      if (!response.ok) {
        throw new Error('Prediction unavailable')
      }

      const data = await response.json()
      setResult(data)
      setIsDirty(false)

    } catch (err) {
      console.error('Prediction request failed:', err)

      setError(
        'We couldn’t generate a prediction for this matchup. Please select different fighters.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative z-0 flex flex-col items-center pb-16 sm:pb-24">
      <div className="max-w-4xl px-4 sm:px-6 lg:px-0 py-10 sm:py-12 w-full text-center">
        <h1 className="text-white text-3xl sm:text-4xl font-semibold tracking-tight">
          UFC Fight Predictor
        </h1>

        <h2 className="mt-3 sm:mt-4 text-white/60 sm:text-lg text-base">
          Select two fighters to see who our model predicts will win.
        </h2>

        <p className="mt-4 sm:mt-6 text-white/40 text-sm">
          ↓ Enter two fighters below to generate a matchup prediction
        </p>

        <FighterSelector
          fighterA={fighterA}
          fighterB={fighterB}

          onChangeA={handleChangeA}
          onSelectA={handleSelectA}

          onChangeB={handleChangeB}
          onSelectB={handleSelectB}

        />

        <Button
          variant="primary"
          size="lg"
          className="mt-6 sm:mt-4 px-6 sm:px-10 w-full sm:w-auto"
          onClick={handlePredict}
          disabled={!canPredict}
        >
          {loading
            ? 'Predicting...'
            : isDirty
              ? 'Predict'
              : 'Change fighters to re-predict'}
        </Button>

        {result && (
          <div className="mt-9 items-center flex text-white/60 gap-3">
            <div className="h-px px bg-white/10 flex-1"/>
            <span className="font-medium text-xs tracking-wide uppercase ">
              Model prediction
            </span>
            <div className="h-px px bg-white/10 flex-1"/>
          </div>
        )}

        {result?.is_historic && (
          <div className="mt-3 max-w-xl mx-auto rounded-md border-l-2 border-yellow-400/40 bg-yellow-400/5 px-3 py-2">
            <p className="text-xs leading-relaxed text-yellow-300/60">
              <span className="font-medium text-yellow-300/80">⚠️ Historical matchup</span>{" "}
              This fight occurred during FightIQ’s training era.
              Shown for exploration and not included in accuracy metrics.
            </p>
          </div>
        )}

        {result && (
          <div className="mt-9 flex flex-col items-center gap-6 sm:flex-row sm:gap-12 sm:justify-center items-center">
            <FighterCard
              fighterName={fighterA}
              isWinner={result.winner === fighterA}
              confidence={result.probabilities[fighterA]}
              edgeType={result.edge.type}
            />

            <FighterCard
              fighterName={fighterB}
              isWinner={result.winner === fighterB}
              confidence={result.probabilities[fighterB]}
              edgeType={result.edge.type}
            />
          </div>
        )}

        {error && !result && (
          <p className="mt-6 mx-auto max-w-md rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
            {error}
          </p>
        )}
        {result && !error && (
          <div className="mt-10 px-2 sm:px-0 max-w-3xl mx-auto">
            <PredictionExplanation
              name={result.winner}
              explanation={result.explanation}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default MMA
