'use client'
import { useState } from 'react'
import { fighters, Fighter } from '@/data/fighters'
import Placeholder from './Placeholder'
import clsx from 'clsx'

interface FighterSelectorProps {
  fighterA: string
  fighterB: string
  onChangeA: (value: string) => void
  onSelectA: (name: string) => void
  onChangeB: (value: string) => void
  onSelectB: (name: string) => void
}

const FighterSelector = ({
  fighterA,
  fighterB,
  onChangeA,
  onSelectA,
  onChangeB,
  onSelectB,
}: FighterSelectorProps) => {
  const [openA, setOpenA] = useState(false)
  const [openB, setOpenB] = useState(false)

  const filteredA =
    fighterA.length >= 2
      ? fighters.filter(
          (f) =>
            f.name.toLowerCase().includes(fighterA.toLowerCase()) &&
            f.name !== fighterB
        )
      : []

  const filteredB =
    fighterB.length >= 2
      ? fighters.filter(
          (f) =>
            f.name.toLowerCase().includes(fighterB.toLowerCase()) &&
            f.name !== fighterA
        )
      : []

  return (
    <div className="mt-6 w-full max-w-xl mx-auto px-2">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={fighterA}
            onChange={(e) => {
              onChangeA(e.target.value)
              setOpenA(e.target.value.length >= 2)
            }}
            onBlur={() => {
              setTimeout(() => setOpenA(false), 150)
            }}
            placeholder="Enter fighter name"
            className={clsx(
              'w-full bg-white/5 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40',
              openA ? 'rounded-t-md rounded-b-none' : 'rounded-md'
            )}
          />

          {openA && (
            <div className="absolute z-20 w-full rounded-b-md bg-black border border-white/10 max-h-60 overflow-y-auto">
              {filteredA.length > 0 ? (
                filteredA.slice(0, 10).map((f) => (
                  <div
                    key={f.id}
                    onMouseDown={() => {
                      onSelectA(f.name)
                      setOpenA(false)
                    }}
                    className="px-4 py-2 text-white text-sm cursor-pointer hover:bg-blue-500/15 active:bg-blue-500/25"
                  >
                    {f.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-white/50 text-sm">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="hidden sm:block">
          <Placeholder placeholder="VS" />
        </div>
        <div className="sm:hidden text-white/40 text-xs">VS</div>

        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={fighterB}
            onChange={(e) => {
              onChangeB(e.target.value)
              setOpenB(e.target.value.length >= 2)
            }}
            onBlur={() => {
              setTimeout(() => setOpenB(false), 150)
            }}
            placeholder="Enter fighter name"
            className={clsx(
              'w-full bg-white/5 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40',
              openB ? 'rounded-t-md rounded-b-none' : 'rounded-md'
            )}
          />

          {openB && (
            <div className="absolute z-20 w-full rounded-b-md bg-black border border-white/10 max-h-60 overflow-y-auto">
              {filteredB.length > 0 ? (
                filteredB.slice(0, 10).map((f) => (
                  <div
                    key={f.id}
                    onMouseDown={() => {
                      onSelectB(f.name)
                      setOpenB(false)
                    }}
                    className="px-4 py-2 text-white text-sm cursor-pointer hover:bg-blue-500/15 active:bg-blue-500/25"
                  >
                    {f.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-white/50 text-sm">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FighterSelector
