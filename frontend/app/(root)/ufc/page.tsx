'use client'
// Main UFC prediction flow page:
// - fighter selection
// - API prediction request
// - warning/result rendering
import Button from '@/components/ui/Button'
import FighterCard from '@/components/ui/FighterCard'
import FighterSelector from '@/components/ui/FighterSelector'
import KeyAdvantagesDelta from '@/components/ui/KeyAdvantagesDelta'
import PredictionExplanation from '@/components/ui/PredictionExplanation'
import RecentMatchups, {
  type RecentMatchup,
} from '@/components/ui/RecentMatchups'
import React, { useState, useEffect } from 'react'

type FighterInput = {
  name: string
  gender: string | null
}

type PredictionWarning = {
  type: 'gender_mismatch' | 'extreme_weight_mismatch'
  message: string
}

type PredictionResult = {
  fighterA: {
    name: string
    gender: string
  }
  fighterB: {
    name: string
    gender: string
  }
  winner: string
  confidence: number
  probabilities: Record<string, number>
  edge: {
    type:
      | 'striking'
      | 'grappling'
      | 'no_clear_advantage'
      | 'weight'
  }
  is_historic: boolean
  explanation: PredictionExplanation
  strikeDelta: number
  grappleDelta: number
  reachDelta: number
  ageStageA: string
  ageStageB: string
  weightDelta: number
  heightDelta: number
  warning: PredictionWarning | undefined
}

const RECENT_MATCHUPS_KEY = 'fightiq.recent-matchups'
const RECENT_MATCHUPS_LIMIT = 8

const MMA = () => {
  const [fighterA, setFighterA] = useState<FighterInput>({
    name: '',
    gender: null,
  })

  const [fighterB, setFighterB] = useState<FighterInput>({
    name: '',
    gender: null,
  })

  const [error, setError] = useState<string | null>(null)

  const [selectedA, setSelectedA] = useState<string | null>(null)
  const [selectedB, setSelectedB] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)

  const [isDirty, setIsDirty] = useState(true)

  const [recentMatchups, setRecentMatchups] = useState<RecentMatchup[]>([])

  useEffect(() => {
    try {
      const rawMatchups = window.localStorage.getItem(RECENT_MATCHUPS_KEY)
      if (!rawMatchups) return

      const parsed = JSON.parse(rawMatchups) as RecentMatchup[]
      if (!Array.isArray(parsed)) return

      setRecentMatchups(parsed.slice(0, RECENT_MATCHUPS_LIMIT))
    } catch (loadError) {
      console.warn('Unable to load recent matchups from localStorage', loadError)
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(
        RECENT_MATCHUPS_KEY,
        JSON.stringify(recentMatchups)
      )
    } catch (saveError) {
      console.warn('Unable to save recent matchups to localStorage', saveError)
    }
  }, [recentMatchups])

  useEffect(() => {
    setResult(null)
    setError(null)
    setIsDirty(true)
  }, [fighterA, fighterB])

  const handleChangeA = (text: string) => {
    setFighterA({ name: text, gender: null })
    setSelectedA(null)
  }

  const handleChangeB = (text: string) => {
    setFighterB({ name: text, gender: null })
    setSelectedB(null)
  }

  const handleSelectA = (name: string, gender: string) => {
    setFighterA({ name, gender })
    setSelectedA(name)
  }

  const handleSelectB = (name: string, gender: string) => {
    setFighterB({ name, gender })
    setSelectedB(name)
  }

  const inputsFilled =
    selectedA !== null &&
    selectedB !== null &&
    selectedA !== selectedB

  const canPredict = inputsFilled && isDirty && !loading

  const handleLoadRecentMatchup = (matchup: RecentMatchup) => {
    setFighterA(matchup.fighterA)
    setFighterB(matchup.fighterB)
    setSelectedA(matchup.fighterA.name)
    setSelectedB(matchup.fighterB.name)
    void handlePredict(matchup.fighterA, matchup.fighterB)
  }

  const handleClearRecentMatchups = () => {
    setRecentMatchups([])
  }

  const handlePredict = async (
    fighterAToPredict: FighterInput = fighterA,
    fighterBToPredict: FighterInput = fighterB
  ) => {
    setLoading(true)
    setResult(null)
    setError(null)

    const API_URL = process.env.NEXT_PUBLIC_API_URL

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fighterA: fighterAToPredict.name,
          fighterB: fighterBToPredict.name,
        }),
      })

      if (!response.ok) {
        throw new Error('Prediction unavailable')
      }

      const data: PredictionResult = await response.json()
      setResult(data)
      setIsDirty(false)

      if (!data.warning) {
        const newItem: RecentMatchup = {
          fighterA: { ...fighterAToPredict },
          fighterB: { ...fighterBToPredict },
          winner: data.winner,
          confidence: data.confidence,
          createdAt: new Date().toISOString(),
        }

        setRecentMatchups(prev => {
          const deduped = prev.filter(matchup => {

            const existingPair = [
              matchup.fighterA.name.toLowerCase(),
              matchup.fighterB.name.toLowerCase(),
            ].sort()
            
            const newPair = [
              newItem.fighterA.name.toLowerCase(),
              newItem.fighterB.name.toLowerCase(),
            ].sort()
            
            return !(existingPair[0] === newPair[0] && existingPair[1] === newPair[1])
          })

          return [newItem, ...deduped].slice(0, RECENT_MATCHUPS_LIMIT)
        })
      }
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
          fighterA={fighterA.name}
          fighterB={fighterB.name}
          onChangeA={handleChangeA}
          onSelectA={handleSelectA}
          onChangeB={handleChangeB}
          onSelectB={handleSelectB}
        />

        <Button
          variant="primary"
          size="lg"
          className="mt-6 sm:mt-4 px-6 sm:px-10 w-full sm:w-auto"
          onClick={() => void handlePredict()}
          disabled={!canPredict}
        >
          {loading
            ? 'Predicting...'
            : isDirty
            ? 'Predict'
            : 'Change fighters to re-predict'}
        </Button>

        <RecentMatchups
          matchups={recentMatchups}
          onLoadMatchup={handleLoadRecentMatchup}
          onClearMatchups={handleClearRecentMatchups}
        />

        {result != null && result.warning && result.warning.type == "extreme_weight_mismatch" && (
          <div className="mt-4 max-w-xl mx-auto rounded-md border-l-2 border-amber-400/40 bg-amber-400/5 px-4 py-3">
            <div className="flex items-start gap-3 text-left">
              <span className="text-amber-300/90">⚠️</span>

              <div className="flex flex-col">
                <span className="font-medium text-amber-300/90">
                  Warning
                </span>

                <span className="mt-1 text-amber-300/70 text-sm leading-relaxed">
                  This matchup has a{" "}
                  <span className="font-medium text-amber-300/90">
                    {result.warning.message}
                  </span>{" "}
                  size difference, which falls outside the range of realistic sanctioned fights used to train the model.
                </span>
              </div>
            </div>
          </div>
        )}

        {result != null && result.warning && result.warning.type == "gender_mismatch" && (
          <div className="mt-8 mb-6 max-w-2xl mx-auto rounded-md border-l-2 border-amber-400/40 bg-amber-400/5 px-4 py-3">
            <div className="flex gap-3 items-start text-left">
              
              <span className="text-amber-300/80 text-sm">⚠️</span>

              <div className="flex flex-col">
                <span className="font-medium text-amber-300/90 text-sm">
                  Warning
                </span>

                <span className="mt-1 text-amber-300/70 text-sm leading-relaxed">
                  {result.warning.message}
                </span>
              </div>

            </div>
          </div>
        )}

        {result && !result.warning && (
          <div className="mt-9 items-center flex text-white/60 gap-3">
            <div className="h-px px bg-white/10 flex-1" />
            <span className="font-medium text-xs tracking-wide uppercase ">
              Model prediction
            </span>
            <div className="h-px px bg-white/10 flex-1" />
          </div>
        )}

        {result?.is_historic && (
          <div className="mt-3 max-w-xl mx-auto rounded-md border-l-2 border-yellow-400/40 bg-yellow-400/5 px-3 py-2">
            <p className="text-xs leading-relaxed text-yellow-300/60">
              <span className="font-medium text-yellow-300/80">
                ⚠️ Historical matchup
              </span>{' '}
              This fight occurred during FightIQ’s training era. Shown for
              exploration and not included in accuracy metrics.
            </p>
          </div>
        )}

        {result && !result.warning && (
          <div className="mt-9 flex flex-col items-center gap-6 sm:flex-row sm:gap-12 sm:justify-center">
            <FighterCard
              fighterName={fighterA.name}
              isWinner={result.winner === fighterA.name}
              confidence={result.probabilities[fighterA.name]}
              edgeType={result.edge.type}
            />

            <FighterCard
              fighterName={fighterB.name}
              isWinner={result.winner === fighterB.name}
              confidence={result.probabilities[fighterB.name]}
              edgeType={result.edge.type}
            />
          </div>
        )}

        {error && !result && (
          <p className="mt-6 mx-auto max-w-md rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
            {error}
          </p>
        )}

        {result && !result.warning && !error && (
          <div className="mt-10 px-2 sm:px-0 max-w-3xl mx-auto">
            <KeyAdvantagesDelta
              strikeDelta={result.strikeDelta}
              grappleDelta={result.grappleDelta}
              reachDelta={result.reachDelta}
              ageStages={[result.ageStageA, result.ageStageB]}
              weightDelta={result.weightDelta}
              heightDelta={result.heightDelta}
              fighterA={fighterA}
              fighterB={fighterB}
              winnerName={result.winner}
            />

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
