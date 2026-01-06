'use client'
import { useState } from 'react'
import { fighters, Fighter } from "@/data/fighters"
import Placeholder from './Placeholder'

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
    <div className="mt-6 flex justify-center gap-8 items-center">

      {/* Fighter A */}
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          value={fighterA}
          onChange={(e) => {
            onChangeA(e.target.value)
            setOpenA(e.target.value.length >= 2)
          }}
          onBlur={() => {
            setTimeout(() => setOpenA(false), 100)
          }}
          placeholder="Enter fighter name"
          className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />

        {openA && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-black border border-white/10 max-h-60 overflow-y-auto">
            {filteredA.length > 0 ? (
              filteredA.slice(0, 10).map((f) => (
                <div
                  key={f.id}
                  onClick={() => {
                    onSelectA(f.name)
                    setOpenA(false)
                  }}
                  className="px-4 py-2 text-white text-sm cursor-pointer hover:bg-white/10"
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
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          value={fighterB}
          onChange={(e) => {
            onChangeB(e.target.value)
            setOpenB(e.target.value.length >= 2)
          }}
          onBlur={() => {
            setTimeout(() => setOpenB(false), 100)
          }}
          placeholder="Enter fighter name"
          className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />

        {openB && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-black border border-white/10 max-h-60 overflow-y-auto">
            {filteredB.length > 0 ? (
              filteredB.slice(0, 10).map((f) => (
                <div
                  key={f.id}
                  onClick={() => {
                    onSelectB(f.name)
                    setOpenB(false)
                  }}
                  className="px-4 py-2 text-white text-sm cursor-pointer hover:bg-white/10"
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
