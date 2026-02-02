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

    const MAX_DELTA = 100

    const barAlignment =
        direction === 'winner'
        ? 'justify-start'
        : direction === 'loser'
        ? 'justify-end'
        : 'justify-center'

    const barGradient =
    direction === 'winner'
        ? 'from-emerald-500 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.35)]'
        : direction === 'loser'
        ? 'from-slate-500/60 to-slate-400/60 shadow-[0_0_8px_rgba(148,163,184,0.18)]'
        : 'from-white/40 to-white/30'

    const VISUAL_CAP: Record<string, number> = {
        striking: 0.25,
        grappling: 0.25,
        reach: 8,
        age: 8,
        weight: 25,
        height: 8
    }
    const cap = VISUAL_CAP[label.toLowerCase()]
    const widthPct = Math.min((delta / cap) * 100, 100)

  return (
    <div className="grid grid-cols-[75px_1fr_100px] items-center gap-3 w-full">
        <span className="text-xs text-left text-white/55">
            {label}
        </span>

        <div className="relative h-2.5 rounded-full bg-white/5 overflow-hidden">
            <div className={`absolute inset-y-0 ${barAlignment} flex`} style={{ width: '100%' }}>
                <div
                className={`h-full rounded-full bg-gradient-to-r ${barGradient}`}
                style={{ width: `${widthPct}%` }}
                />
            </div>
        </div>

        <span className="text-xs tracking-wide text-white/80 tabular-nums">
            {delta.toFixed(1)}

            {unit && (
                <span className="text-white/50 ml-1">{unit}</span>
            )}

            {unit === "%" && (
                <span className="text-white/40 ml-1">pp</span>
            )}
        </span>
    </div>
  )
}

export default DeltaRow
