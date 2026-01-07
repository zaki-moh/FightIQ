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

  let filteredA: Fighter[] = []

  if (fighterA.length >= 2) {
    filteredA = fighters.filter((f) => {
      return (
        f.name.toLowerCase().includes(fighterA.toLowerCase()) &&
        f.name !== fighterB
      )
    })
  }

  let filteredB: Fighter[] = []

  if (fighterB.length >= 2) {
    filteredB = fighters.filter((f) => {
      return (
        f.name.toLowerCase().includes(fighterB.toLowerCase()) &&
        f.name !== fighterA
      )
    })
  }

  return (
    <div className="mt-6 flex justify-center gap-8 items-center">
      {/* Fighter A */}
      <div className="relative z-50 w-full max-w-xs">
        <input
          type="text"
          value={fighterA}
          onChange={(e) => {
            onChangeA(e.target.value)
            setOpenA(e.target.value.length >= 2)
          }}
          onBlur={() => {setOpenA(false)}}
          placeholder="Enter fighter name"
          className={clsx(
            'w-full bg-white/5 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40',
            openA ? 'rounded-t-md rounded-b-none' : 'rounded-md'
          )}
        />

        {openA && (
          <div className="absolute z-50 w-full rounded-md bg-black border border-white/10 max-h-60 overflow-y-auto">
            {filteredA.length > 0 ? (
              filteredA.slice(0, 10).map((f) => (
                <div
                  key={f.id}
                  onMouseDown={() => {
                    onSelectA(f.name)
                    setOpenA(false)
                  }}
                  className="
                    px-4 py-2
                    text-white text-sm
                    cursor-pointer
                    transition-colors
                    hover:bg-blue-500/15
                    active:bg-blue-500/25
                  "
                >
                  {f.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-white/50 text-sm cursor-default">
                No results found
              </div>
            )}
          </div>
        )}
      </div>

      <Placeholder placeholder="VS" />

      {/* Fighter B */}
      <div className="relative z-50 w-full max-w-xs">
        <input
          type="text"
          value={fighterB}
          onChange={(e) => {
            onChangeB(e.target.value)
            setOpenB(e.target.value.length >= 2)
          }}
          onBlur={() => {setOpenB(false)}}
          placeholder="Enter fighter name"
          className={clsx(
            'w-full bg-white/5 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40',
            openB ? 'rounded-t-md rounded-b-none' : 'rounded-md'
          )}
        />

        {openB && (
          <div className="absolute z-50 w-full rounded-md bg-black border border-white/10 max-h-60 overflow-y-auto">
            {filteredB.length > 0 ? (
              filteredB.slice(0, 10).map((f) => (
                <div
                  key={f.id}
                  onMouseDown={() => {
                    onSelectB(f.name)
                    setOpenB(false)
                  }}
                  onBlur={() => {setOpenB(false)}}
                  className="
                    px-4 py-2
                    text-white text-sm
                    cursor-pointer
                    transition-colors
                    hover:bg-blue-500/15
                    active:bg-blue-500/25
                  "
                >
                  {f.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-white/50 text-sm cursor-default">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default FighterSelector
