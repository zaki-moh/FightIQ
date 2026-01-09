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
    type: 'striking' | 'grappling' | 'no_clear_advantage'
  }
  explanation: PredictionExplanation
}

const MMA = () => {
  const [fighterA, setFighterA] = useState('')
  const [fighterB, setFighterB] = useState('')

  const [selectedA, setSelectedA] = useState<string | null>(null)
  const [selectedB, setSelectedB] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)

  const [isDirty, setIsDirty] = useState(true)

  useEffect(() => {
    setResult(null)
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

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fighterA, fighterB }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Prediction failed')
      }

      setResult(data)
      setIsDirty(false) 
    } catch (error) {
      console.error('Error predicting fight:', error)
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

          onChangeA={handleChangeA}
          onSelectA={handleSelectA}

          onChangeB={handleChangeB}
          onSelectB={handleSelectB}

        />

        <Button
          variant="primary"
          size="lg"
          className="mt-4 px-10"
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
          <div className="text-white mt-6">
            <p>
              Winner:{' '}
              <span className="font-semibold">{result.winner}</span>
            </p>
            <p>
              Confidence:{' '}
              {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
        )}

        {result && (
          <div className="flex mt-8 gap-12 w-full justify-center">
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
        {result && (
          <PredictionExplanation name={result.winner} explanation={result.explanation}/>
        )}
      </section>
    </main>
  )
}

export default MMA
