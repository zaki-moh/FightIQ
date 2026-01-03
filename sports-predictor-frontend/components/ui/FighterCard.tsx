import React from 'react'
import Card from './Card';
import Image from 'next/image'


interface FighterCardProps {
  fighterName: string;
  isWinner: boolean;
  image?: string;
  confidence?: number;
  subtitle?: string;
  className?: string;
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
            w-full max-w-sm transition
            ${isWinner ? "ring-2 ring-blue-500" : "opacity-80"}
            ${className || ""}
        `}
    > 
        {isWinner && (
            <div className="absolute -top-3 right-3 text-blue-400 text-xl">
            👑
            </div>
        )}

        {subtitle && (
            <p className="text-sm text-white/60 text-center mt-1">
            {subtitle}
            </p>
        )}

        <Image
            src={image || "/fighter-placeholder.png"}
            alt={`${fighterName} photo`}
            className="w-full h-48 object-cover rounded-md"
        />

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