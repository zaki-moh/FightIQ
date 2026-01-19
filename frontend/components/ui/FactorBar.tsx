import React from 'react'

interface FactorBarProps {
    strength: number;
}
const FactorBar = ({
    strength
}: FactorBarProps) => {
  return (
    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-out"
        style={{
          width: `${Math.max(strength * 100, 8)}%`,
        }}
      />
    </div>
  )
}

export default FactorBar