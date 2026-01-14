'use client'
import clsx from 'clsx'
import Card from './Card'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { EDGE_ICON, EDGE_LABELS } from '@/constants/constants'

interface FighterCardProps {
  fighterName: string
  isWinner: boolean
  confidence?: number | undefined
  edgeType?: "striking" | "grappling" | "no_clear_advantage" | "weight"
  subtitle?: string
  className?: string
}

const FighterCard = ({
  fighterName,
  isWinner,
  confidence,
  edgeType,
  subtitle,
  className
}: FighterCardProps) => {
  const [animatedPct, setAnimatedPct] = useState(0)
  const pct = Math.max(0, Math.min(1, confidence ?? 0))

  useEffect(() => {
    setAnimatedPct(0)

    const timeout = setTimeout(() => {
      setAnimatedPct(pct)
    }, 100)

    return () => clearTimeout(timeout)
  }, [pct])

  return (
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
    >

      <div className="mt-6 mb-4 text-center space-y-2">
        <div className="flex items-baseline justify-center gap-2">
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
                inline-flex
                items-center
                justify-center
                w-8 h-8
                rounded-full
                bg-blue-500/15
                text-blue-400
                text-sm
                translate-y-[-2px]
              "
              aria-label="Winner"
            >
              👑
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
          {(confidence * 100).toFixed(1)}%
        </span>
      </p>

      {isWinner && edgeType && (
        <div className="mt-2 flex justify-center">
          <span
            className="
              inline-flex items-center gap-1
              px-3 py-1 rounded-full
              bg-blue-500/10 text-blue-300
              border border-blue-400/20
              text-xs font-medium
            "
          >
            <span aria-hidden>{EDGE_ICON[edgeType]}</span>
            {EDGE_LABELS[edgeType]}
          </span>
        </div>
      )}
    </Card>
  )
}

export default FighterCard
