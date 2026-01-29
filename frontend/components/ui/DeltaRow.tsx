import React from 'react'

type DeltaDirection = 'winner' | 'loser' | 'neutral'

interface DeltaRowProps {
  label: string
  delta: number          
  unit?: string          
  direction: DeltaDirection
}

const DeltaRow = ({
  label,
  delta,
  unit,
  direction
}: DeltaRowProps) => {
  return (
    <div className="flex flex-row gap-2 w-full">

    </div>
  )
}

export default DeltaRow
