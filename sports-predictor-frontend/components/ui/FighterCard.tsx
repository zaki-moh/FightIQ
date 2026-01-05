import React from 'react'
import Card from './Card'
import Image from 'next/image'

const EDGE_LABELS: Record<string, string> = {
  striking: "Edge in striking",
  grappling: "Edge in grappling",
  no_clear_advantage: "No clear stylistic advantage"
}

interface FighterCardProps {
  fighterName: string
  isWinner: boolean
  confidence?: number | undefined
  edgeType?: "striking" | "grappling" | "no_clear_advantage"
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
  return (
    <Card
      className={`
        relative min-h-[300px]
        w-80
        px-4 py-5
        flex flex-col gap-2
        transition-colors duration-200
        ${isWinner
          ? "ring-2 ring-blue-500"
          : "opacity-80 hover:scale-[1.02] hover:ring-2 hover:ring-blue-400"
        }
        ${className || ""}
      `}
    >

      <div className="flex items-baseline justify-center gap-2">
        <h3 className="text-lg text-white font-semibold text-center">
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

      <hr className="my-1 border-t border-white/10" />

      <div className="mt-2 h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            isWinner ? "bg-blue-500" : "bg-white/30"
          }`}
          style={{ width: `${confidence * 100}%` }}
        />
      </div>

      <p className="text-sm text-white/50">
        Win Probability
        <span className="ml-1 font-semibold text-white/80">
          {(confidence * 100).toFixed(1)}%
        </span>
      </p>

      {isWinner && edgeType && (
        <p className="text-sm text-white/60 mt-1 text-center">
          {EDGE_LABELS[edgeType]}
        </p>
      )}
    </Card>
  )
}

export default FighterCard
