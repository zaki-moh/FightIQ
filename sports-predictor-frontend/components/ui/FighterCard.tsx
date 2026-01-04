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
        relative w-full max-w-sm transition
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

    <div className="relative w-full h-60 rounded-md overflow-hidden">
        <Image
          src={image || "/assets/icons/generic_fighter.png"}
          alt={`${fighterName} photo`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 320px"
          priority={isWinner}
        />
      </div>

      {/* Fighter name */}
      <h3 className="mt-3 text-lg text-white font-semibold text-center">
        {fighterName}
      </h3>

      {isWinner && confidence !== undefined && (
        <p className="mt-2 text-sm text-blue-400 text-center">
          Confidence: {(confidence * 100).toFixed(1)}%
        </p>
      )}
    </Card>
  )
}

export default FighterCard
