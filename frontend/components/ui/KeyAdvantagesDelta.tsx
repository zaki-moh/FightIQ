import React from 'react'

interface KeyAdvantagesProps {
  strikeDelta: number
  grapplingDelta: number
  reachDelta: number
  ageDelta: number
}

const KeyAdvantagesDelta = ({
  strikeDelta,
  grapplingDelta,
  reachDelta,
  ageDelta
}: KeyAdvantagesProps) => {
  return (
    <section className="max-w-3xl mt-8 sm:mt-10 px-4 mx-auto">
      <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-4 sm:px-6 sm:py-5">
        <div className="mb-3">
          <h3 className="text-sm font-medium text-white/90">
            Key Advantages
          </h3>
          <p className="mt-0.5 text-xs text-white/50">
            Relative differences between fighters
          </p>
        </div>
            
      </div>
    </section>
  )
}

export default KeyAdvantagesDelta
