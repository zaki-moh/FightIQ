import React from 'react'
import DeltaRow from './DeltaRow'
import { Labrada } from 'next/font/google'


type FighterInput = {
  name: string
  gender: string | null
}

interface KeyAdvantagesProps {
  strikeDelta: number
  grappleDelta: number
  reachDelta: number
  ageStages: [string, string]
  weightDelta: number
  heightDelta: number
  fighterA: FighterInput
  fighterB: FighterInput
  winnerName: string
}



const KeyAdvantagesDelta = ({
  strikeDelta,
  grappleDelta,
  reachDelta,
  ageStages,
  weightDelta,
  heightDelta,
  fighterA,
  fighterB,
  winnerName
}: KeyAdvantagesProps) => {

  const MINOR_THRESHOLD = 0.01
  type DeltaDirection = 'winner' | 'loser' | 'neutral'


  const STAGE_SCORES: Record<string, number> = {
    "early": 1,
    "early_prime": 2,
    "prime": 3,
    "veteran": 2,
    "late": 1,
  }

  const STAGE_LABELS: Record<string, string> = {
    early: `early in ${fighterA.gender === 'male' ? 'his' : 'her'} career`,
    early_prime: `entering ${fighterA.gender === 'male' ? 'his' : 'her'} prime`,
    prime: `in ${fighterA.gender === 'male' ? 'his' : 'her'} prime`,
    veteran: "a seasoned veteran",
    late: `late in ${fighterA.gender === 'male' ? 'his' : 'her'} career`,
  }

  const STAGE_LABELS_PLURAL: Record<string, string> = {
    early: "early in their careers",
    early_prime: "entering their prime",
    prime: "in their prime",
    veteran: "seasoned veterans",
    late: "late in their careers",
  }

  const buildAgeContext = (a: string, b: string) => {
    const labelA = STAGE_LABELS[a]
    const labelB = STAGE_LABELS[b]

    if (a === b) {
      return `Both fighters are ${STAGE_LABELS_PLURAL[a]}.`
    }

    if (winnerName === fighterA.name) {
      return `${fighterA.name} is ${labelA}, while ${fighterB.name} is ${labelB}.`
    } else {
      return `${fighterB.name} is ${labelB}, while ${fighterA.name} is ${labelA}.`
    }
  }

  const ageDirection: DeltaDirection =
  STAGE_SCORES[ageStages[0]] > STAGE_SCORES[ageStages[1]]
    ? 'winner'  
    : STAGE_SCORES[ageStages[0]] < STAGE_SCORES[ageStages[1]]
    ? 'loser'    
    : 'neutral'


  return (
    <section className="max-w-3xl mt-8 sm:mt-10 px-4 mx-auto">
      <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-4 sm:px-6 sm:py-5 transition-colors duration-300 hover:bg-white/[0.12]">
        <div className="mb-3">
          <h3 className="text-sm font-medium text-white/80">
            Key Advantages
          </h3>
          <p className="mt-0.5 text-xs text-white/60">
            Relative differences between fighters
          </p>
        </div>

        <p className="mt-4 text-xs tracking-wide text-emerald-400/70 text-left max-w-3xl mx-auto">
          Advantages favor <span className="font-semibold text-emerald-400/70">{winnerName}</span>
        </p>

        <div className="h-px bg-white/[0.03] my-2" />
        
      <div className="flex flex-col gap-2">
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

        {Math.abs(weightDelta) >= 10 && (
          <DeltaRow
            label="Weight"
            delta={Math.abs(weightDelta)}
            unit="lbs"
            direction={weightDelta > 0 ? 'winner' : 'loser'}
          />
        )}

        {Math.abs(strikeDelta) > MINOR_THRESHOLD && (
          <DeltaRow
            label="Striking"
            unit='% pp'
            delta={Math.abs(strikeDelta)}
            direction={strikeDelta > 0 ? 'winner' : 'loser'}
          />
        )}

        {Math.abs(grappleDelta) > MINOR_THRESHOLD && (
          <DeltaRow
            label="Grappling"
            unit='% pp'
            delta={Math.abs(grappleDelta)}
            direction={grappleDelta > 0 ? 'winner' : 'loser'}
          />
        )}

        <DeltaRow
          isContext={true}
          label="Age"
          context={buildAgeContext(ageStages[0], ageStages[1])}
          unit=""
          direction={ageDirection}
        />
      </div>
      </div>
    </section>
  )
}

export default KeyAdvantagesDelta
