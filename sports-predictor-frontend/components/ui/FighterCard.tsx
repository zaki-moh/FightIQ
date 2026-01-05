import React from 'react'
import Card from './Card'
import Image from 'next/image'

interface FighterCardProps {
  fighterName: string
  isWinner: boolean
  image?: string
  confidence?: number
  subtitle?: string
  className?: string
}

const FighterCard = ({
  fighterName,
  isWinner,
  image,
  confidence,
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
        ${isWinner
          ? "ring-2 ring-blue-500"
          : "opacity-80 hover:scale-[1.02] hover:ring-2 hover:ring-blue-400/50"
        }
        ${className || ""}
      `}
    >
      {isWinner && (
        <div className="absolute top-2 right-2 z-20 bg-black/40 rounded-full px-2 py-1 text-blue-400 text-lg">
          👑
        </div>
      )}

      <h3 className="text-lg text-white font-semibold text-center">
        {fighterName}
      </h3>

      <hr className="my-1 border-t border-white/10" />

      {isWinner && confidence !== undefined && (
        <p className="text-sm text-white/70 text-center">
          Confidence: {(confidence * 100).toFixed(1)}%
        </p>
      )}
    </Card>
  )
}

export default FighterCard
