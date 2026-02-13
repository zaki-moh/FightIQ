'use client'
import clsx from 'clsx'
import Card from './Card'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { EDGE_ICON, EDGE_CONTEXT } from '@/constants/constants'
import { TrophyIcon } from '@heroicons/react/24/solid'
import FighterStatsModal from './FighterStatsModal'


interface FighterCardProps {
  fighterName: string
  isWinner: boolean
  confidence?: number 
  edgeType?: "striking" | "grappling" | "no_clear_advantage" | "weight"
  subtitle?: string
  className?: string
}

type Physical = {
  height_in_inches: number
  reach_in_inches: number
  weight_in_lb: number
  age: number
}

type Performance = {
  striking_efficiency: number
  grappling_efficiency: number
  win_ratio: number
  career_stage: 'early' | 'early prime' | 'prime' | 'veteran' | 'late'
}

type FighterStats = {
  physical: Physical
  performance: Performance
}

const FighterCard = ({
  fighterName,
  isWinner,
  confidence,
  edgeType,
  className
}: FighterCardProps) => {
 

  const [animatedPct, setAnimatedPct] = useState(0)
  const pct = Math.max(0, Math.min(1, confidence ?? 0))
  const [result, setResult] = useState<FighterStats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setAnimatedPct(0)

    const timeout = setTimeout(() => {
      setAnimatedPct(pct)
    }, 100)

    return () => clearTimeout(timeout)
  }, [pct])

  const [openFighterStatsModal, setOpenFighterStatsModal] = useState(false)

  const handleOpen = async () => {
    setOpenFighterStatsModal(true)

    const API_URL = process.env.NEXT_PUBLIC_API_URL
    if (!API_URL) {
      setError('API URL not configured')
      return
    }

    try {
      const res = await fetch(
        `${API_URL}/fighters/${encodeURIComponent(fighterName)}/stats`
      )

      if (!res.ok) {
        throw new Error('Failed to fetch fighter stats')
      }

      const data = await res.json()
      setResult(data)

    } catch (error) {
      console.error('Fighter stats request failed:', error)
      setError('Failed to load fighter stats')
    }
  }

  const handleClose = () => {
    setOpenFighterStatsModal(false)
  }

  return (
    <div>
      <Card
        className={`
          relative min-h-[300px]
          w-80
          px-4 py-5
          flex flex-col gap-2
          transition-colors duration-200
          ${isWinner
            ? "ring-2 ring-blue-400 "
            : "opacity-85 border border-white/10 hover:ring-1 hover:ring-white/20"
          }
          ${className || ""}
        `}
        onClick={handleOpen}
      >

        <div className="mt-6 mb-4 text-center space-y-2">
          <div className="flex items-baseline justify-center gap-3.5">
            <h3
              className={clsx(
                'text-lg text-white',
                isWinner ? 'font-bold' : 'font-semibold'
              )}
            >
              {fighterName}
            </h3>

            {isWinner && (
              <span
                className="
                  relative
                  inline-flex items-center justify-center
                  w-9 h-9 rounded-full

                  bg-gradient-to-br
                  from-blue-300/40
                  to-blue-900/60

                  ring-2 ring-blue-900/70
                  shadow-[0_4px_12px_rgba(0,0,0,0.5)]
                  drop-shadow-sm
                  before:content-['']
                  before:absolute before:inset-[2px]
                  before:rounded-full
                  before:bg-gradient-to-br
                  before:from-white/20
                  before:to-transparent
                "
                aria-label="Winner"
              >
                <TrophyIcon className="w-4 h-4 text-blue-300" />
              </span>
            )}
          </div>

          <hr className="border-t border-white/10" />
        </div>

        <div className="mt-2 h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all
              duration-700 ease-in-out ${
              isWinner ? "bg-blue-500" : "bg-white/30"
            }`}
            style={{ width: `${animatedPct * 100}%` }}
          />
        </div>

        <p className="text-sm text-white/45 text-center">
          Win Probability
          <span className="ml-1 font-semibold text-white/80">
              {((confidence ?? 0) * 100).toFixed(1)}%
          </span>
        </p>

        {isWinner && edgeType && (
          <div className="mt-3 flex justify-center">
            <span
              className="
                inline-flex items-center gap-1
                px-3 py-1 rounded-full
                bg-blue-400/10 text-blue-300
                border border-blue-500/30
                text-xs font-medium
              "
            >
              {(() => {
                const EdgeIcon = EDGE_ICON[edgeType]
                return <EdgeIcon className="w-4 h-5 mr-1 text-slate-300" />
              })()}
              {EDGE_CONTEXT[edgeType]}
            </span>
          </div>
        )}
      </Card>

      <FighterStatsModal 
        open={openFighterStatsModal}
        onClose={handleClose}
        error={error}
        result={result}
      />
    </div>
  )
}

export default FighterCard
