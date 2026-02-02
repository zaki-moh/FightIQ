import React from 'react'
import DeltaRow from './DeltaRow'
import { Labrada } from 'next/font/google'

interface KeyAdvantagesProps {
  strikeDelta: number
  grapplingDelta: number
  reachDelta: number
  ageDelta: number
  weightDelta: number
  heightDelta: number
  winnerName: string
}

const KeyAdvantagesDelta = ({
  strikeDelta,
  grapplingDelta,
  reachDelta,
  ageDelta,
  weightDelta,
  heightDelta,
  winnerName
}: KeyAdvantagesProps) => {

  const MINOR_THRESHOLD = 0.01

  return (
    <section className="max-w-3xl mt-8 sm:mt-10 px-4 mx-auto">
      <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-4 sm:px-6 sm:py-5">
        <div className="mb-3">
          <h3 className="text-sm font-medium text-white/80">
            Key Advantages
          </h3>
          <p className="mt-0.5 text-xs text-white/60">
            Relative differences between fighters
          </p>
          <p className="mt-3 text-xs tracking-wide text-emerald-400/70 text-left max-w-3xl mx-auto">
            Advantages favor <span className="font-semibold text-emerald-400/70">{winnerName}</span>
          </p>
        </div>

        <div className="h-px bg-white/[0.03] my-4" />
        
        <div className="flex flex-col gap-2">
          {Math.abs(strikeDelta) > MINOR_THRESHOLD && (
            <DeltaRow
              label="Striking"
              unit='% pp'
              delta={Math.abs(strikeDelta)}
              direction={strikeDelta   > 0 ? 'winner' : 'loser'}
            />
          )}

          {Math.abs(grapplingDelta) > MINOR_THRESHOLD && (
            <DeltaRow
              label="Grappling"
              unit='% pp'
              delta={Math.abs(grapplingDelta)}
              direction={grapplingDelta  > 0 ? 'winner' : 'loser'}
            />
          )}

          {Math.abs(heightDelta) >= 3 && (
            <DeltaRow
              label="Height"
              delta={Math.abs(heightDelta)}
              unit="in."
              direction={heightDelta > 0 ? 'winner' : 'loser'}
            />
          )}

          {Math.abs(reachDelta) > 0.5 && (
            <DeltaRow
              label="Reach"
              unit='in.'
              delta={Math.abs(reachDelta)}
              direction={reachDelta > 0 ? 'winner' : 'loser'}
            />
          )}

          {Math.abs(ageDelta) >= 4 && (
            <DeltaRow
              label="Age"
              delta={Math.abs(ageDelta)}
              unit="yrs"
              direction={ageDelta > 0 ? 'winner' : 'loser'}
            />
          )}

          {Math.abs(weightDelta) >= 10 && (
            <DeltaRow
              label="Weight"
              delta={Math.abs(weightDelta)}
              unit="lbs"
              direction={weightDelta > 0 ? 'winner' : 'loser'}
            />
          )}

        </div>
      </div>
    </section>
  )
}

export default KeyAdvantagesDelta
