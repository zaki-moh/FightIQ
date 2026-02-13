import React from 'react'
import { LiaAngleDoubleLeftSolid } from 'react-icons/lia'

type PerformanceMetricProps =
  | {
      type: 'numeric'
      label: string
      value: number
    }
  | {
      type: 'categorical'
      label: string
      value: 'early' | 'early_prime' | 'prime' | 'veteran' | 'late'
    }

const stageStyles = {
  "early": "bg-teal-400/10 text-teal-300 border-teal-400/30",
  "early_prime": "bg-green-400/10 text-green-300 border-green-400/30",
  "prime": "bg-blue-400/10 text-blue-300 border-blue-400/30",
  "veteran": "bg-purple-400/10 text-purple-300 border-purple-400/30",
  "late": "bg-amber-400/10 text-amber-300 border-amber-400/30"
}

const PerformanceMetric = (props: PerformanceMetricProps) => {
  if (props.type === 'categorical') {
    return (
        <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-white/40">
                Career Stage
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stageStyles[props.value] || 'bg-white/10 text-white/50 border-white/20'}`}>
                {props.value}
            </span>
        </div>
    )
  }

  const value = props.value
  const tier =
    value >= 0.8 ? 'Elite' :
    value >= 0.65 ? 'Strong' :
    'Average'

  const barGradient =
    value >= 0.8
      ? 'from-blue-500/85 to-blue-400/85 shadow-[0_0_8px_rgba(59,130,246,0.25)]'
      : value >= 0.65
      ? 'from-blue-500/80 to-blue-400/80 shadow-[0_0_8px_rgba(59,130,246,0.25)]'
      : 'from-blue-500/55 to-blue-400/55'

  const pct = Math.max(0, Math.min(100, value * 100))

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-white/40">
          {props.label}
        </span>
        <span className="text-xs font-medium text-white/60">
          {tier}
        </span>
      </div>

      <div className="h-3 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barGradient}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default PerformanceMetric