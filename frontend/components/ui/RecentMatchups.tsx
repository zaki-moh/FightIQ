import React, { useState } from 'react'
import Button from './Button'

type RecentFighter = {
  name: string
  gender: string | null
}

export type RecentMatchup = {
  fighterA: RecentFighter
  fighterB: RecentFighter
  winner: string
  confidence: number
  createdAt: string
}

interface RecentMatchupsProps {
  matchups: RecentMatchup[]
  onLoadMatchup: (matchup: RecentMatchup) => void
  onClearMatchups: () => void
}

const formatRecentTime = (createdAt: string): string => {
  const parsed = new Date(createdAt)
  if (Number.isNaN(parsed.getTime())) return 'Unknown time'
  return parsed.toLocaleString()
}

const RecentMatchups = ({
  matchups,
  onLoadMatchup,
  onClearMatchups,
}: RecentMatchupsProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (matchups.length === 0) return null

  if (!isExpanded) {
    return (
      <section className="mt-6 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(true)}
          className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.04] text-white/85 hover:bg-white/[0.08] hover:text-white"
        >
          <span>Recent Matchups</span>
          <span className="text-xs text-white/60">({matchups.length})</span>
          <span className="text-xs text-white/60">▼</span>
        </Button>
      </section>
    )
  }

  return (
    <section className="mt-6 max-w-2xl mx-auto rounded-lg border border-white/10 bg-white/5 px-4 py-3">
      <div className="grid grid-cols-[1fr_120px] items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(prev => !prev)}
          className="justify-self-start inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] text-white/85 hover:bg-white/[0.08] hover:text-white"
        >
          <span>Recent Matchups</span>
          <span className="text-xs text-white/55">({matchups.length})</span>
          <span className="text-xs text-white/60">▲</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearMatchups}
          className="justify-self-end w-full px-0 py-1 text-xs border border-white/15 bg-white/[0.02] text-white/65 hover:text-white hover:bg-white/[0.08] -translate-x-1"
        >
          Clear
        </Button>
      </div>

      <div className="mt-3 flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
        {matchups.map(matchup => (
          <div
            key={`${matchup.fighterA.name}-${matchup.fighterB.name}-${matchup.createdAt}`}
            className="grid grid-cols-1 sm:grid-cols-[1fr_120px] items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-left"
          >
            <div className="flex flex-col">
              <span className="text-sm text-white/85">
                {matchup.fighterA.name} vs {matchup.fighterB.name}
              </span>
              <span className="text-xs text-white/55">
                Winner: {matchup.winner} ({(matchup.confidence * 100).toFixed(1)}%)
              </span>
              <span className="text-[11px] text-white/40">
                {formatRecentTime(matchup.createdAt)}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onLoadMatchup(matchup)}
              className="justify-self-end w-full px-0 py-1 text-xs border-white/20 text-white/80 hover:text-white hover:bg-white/10"
            >
              Load
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentMatchups
