'use client'
import React from 'react'
import PhysicalStat from './PhysicalStat'
import PerformanceMetric from './PerformanceMetric'

interface FighterStatsModalProps {
    open: boolean
    onClose: () => void
    result: FighterStats | null
    error: string | null
}

type Physical = {
  height_in_inches: number
  reach_in_inches: number
  weight_in_lb: number
  age: number
}

type Performance = {
  striking_efficiency: number
  grappling_efficiency: number
  win_ratio: number
  career_stage: string
}

type FighterStats = {
  physical: Physical
  performance: Performance
}

const FighterStatsModal = ({
    open, 
    onClose,
    error,  
    result
 }: FighterStatsModalProps) => {


  if (!open) return null

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
        >
        <div 
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
        />

        <div 
            className="relative 
            bg-[#050D27] 
            rounded-lg 
            p-6 w-full 
            max-w-3xl 
            mx-auto z-10 
            border 
            border-white/10
            max-h-[90vh]
            overflow-y-auto"
        >
            {error && !result && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg mb-4">
                <p className="text-red-300 text-sm">{error}</p>
            </div>
            )}

            {result && 
                <div className="space-y-12 text-left">
                    <h2 className="text-xl font-semibold text-white mb-4">
                            Fighter Stats
                    </h2>

                    <div className="h-px bg-white/10 w-full" />

                    <div className="space-y-4 text-left">
                        <h3 className="text-xs font-semibold tracking-wider text-white/60">
                            PHYSICAL PROFILE
                        </h3>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <PhysicalStat label="Height" value={result.physical.height_in_inches} unit="in" />
                            <PhysicalStat label="Reach" value={result.physical.reach_in_inches} unit="in" />
                            <PhysicalStat label="Weight" value={result.physical.weight_in_lb.toFixed(0)} unit="lbs" />
                            <PhysicalStat label="Age" value={result.physical.age} />
                        </div>

                    </div>

                    <div className="space-y-4 text-left">
                        <div className="h-px bg-white/10 w-full my-4" />
                        <h3 className="text-xs font-semibold tracking-wider text-white/60">
                            PERFORMANCE METRICS
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <PerformanceMetric label="Striking Accuracy" value={result.performance.striking_efficiency} type="numeric" />
                            <PerformanceMetric label="Grappling Accuracy" value={result.performance.grappling_efficiency} type="numeric" />
                            <PerformanceMetric label="Win Ratio" value={result.performance.win_ratio} type="numeric" />
                            <PerformanceMetric label="Career Stage" value={result.performance.career_stage} type="categorical" />
                        </div>
                    </div>
                </div>
            }
        
        </div>
    </div>
  )
}

export default FighterStatsModal