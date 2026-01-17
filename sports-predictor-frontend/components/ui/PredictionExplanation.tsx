import React from 'react'
import FactorBar from './FactorBar';

interface PredictionProps {
  name: string;
  explanation: PredictionExplanation;
}

const PredictionExplanations = ({
  name,
  explanation,
}: PredictionProps) => {

  const factors =
    explanation?.factors?.map(f => ({
      label: f.type,
      description: f.description,
      importance: f.importance,
      advantage: f.advantage,
    })) ?? []

    const maxAdvantage = Math.max(
      ...factors.map((f) => f.advantage), 1
    )

    const normalizedFactors = factors.map((f) => ({
      ...f,
      strength: f.advantage / maxAdvantage
    }))
    
  return (
    <section className="max-w-3xl mt-10 px-4 mx-auto">
      <div className="rounded-xl bg-white/5 border border-white/5 p-4 sm:p-6">
        <h3 className="mt-2 sm:mt-4 text-sm sm:text-base text-white/90 font-medium text-center tracking-wide">
          Why the model favors {name} 
        </h3>

        <div className="my-8 h-px bg-white/10" />

        <p className="mt-4 text-white/80 text-sm text-center leading-relaxed">
          {explanation.summary}
        </p>

        <div className="my-6 h-px bg-white/5" />

        <ul className="space-y-3">
          {normalizedFactors.map((f, idx) => (
            <li key={f.label} className="flex flex-col sm:flex-row gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 rounded-full items-center justify-center bg-blue-500/20 text-blue-400 text-xs font-semibold">
                {idx + 1}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <p className="text-white/80 text-sm leading-snug">
                  {f.description}
                </p>

                <FactorBar strength={f.strength} />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[11px] text-white/35 text-center italic">
          Factors are ranked by importance and relative magnitude.
        </p>
      </div>
    </section>
  )
}

export default PredictionExplanations