import React from 'react'

interface PredictionProps {
  name: string;
}
const PredictionExplanations = ({
  name,
}: PredictionProps) => {
  return (
    <section className="max-w-3xl mt-10 px-4 mx-auto">
      <div className="rounded-xl bg-white/5 border border-white/5  p-6">
        <h3 className="mt-4 text-white/90 text-base font-medium text-center tracking-wide">
          Why the model favors {name} 
        </h3>
        <div className="my-8 h-px bg-white/10" />
      </div>
    </section>
  )
}

export default PredictionExplanations