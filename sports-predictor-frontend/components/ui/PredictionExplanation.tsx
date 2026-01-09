import React from 'react'

interface PredictionProps {
  name: string;
  explanation: PredictionExplanation;
}
const PredictionExplanations = ({
  name,
  explanation,
}: PredictionProps) => {
  return (
    <section className="max-w-3xl mt-10 px-4 mx-auto">
      <div className="rounded-xl bg-white/5 border border-white/5  p-5">
        <h3 className="mt-4 text-white/90 text-base font-medium text-center tracking-wide">
          Why the model favors {name} 
        </h3>

        <div className="my-8 h-px bg-white/10" />

        <p className="mt-4 text-white/80 text-sm text-center leading-relaxed">
          {explanation.summary}
        </p>

        <div className="my-6 h-px bg-white/5" />

        <p className="text-xs text-white/40 text-center mb-6">
          Based on comparative performance metrics
        </p>

        <ul className="space-y-4">
          {explanation.factors.map((f, idx) => (
            <li key={f.type} className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 rounded-full items-center justify-center bg-blue-500/20 text-blue-400 text-xs font-semibold">
                {idx + 1}
              </div>
              <div className="flex flex-col items-start">
                <p className="text-white/90 text-sm font-medium">
                  {f.description}
                </p>
                <p className="text-white/50 text-xs mt-1">
                   Impact score: {f.advantage.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
          <p className="mt-6 text-xs text-white/35 text-center italic">
            Factors are ranked by importance and relative magnitude.
          </p>
        </ul>
      </div>
    </section>
  )
}

export default PredictionExplanations