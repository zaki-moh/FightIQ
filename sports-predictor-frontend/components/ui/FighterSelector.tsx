'use client'
import { useState } from 'react'
import { fighters, Fighter } from "@/data/fighters"
import Placeholder from './Placeholder'

const FighterSelector = () => {
  const [fighterA, setFighterA] = useState("")
  const [fighterB, setFighterB] = useState("")

  let filteredA: Fighter[] = []
  let filteredB: Fighter[] = []

  if (fighterA.length > 0) {
    filteredA = fighters.filter((f) =>
      f.name.toLowerCase().includes(fighterA.toLowerCase())
    )
  }

  if (fighterB.length > 0) {
    filteredB = fighters.filter((f) =>
      f.name.toLowerCase().includes(fighterB.toLowerCase())
    )
  }

  return (
    <div className="mt-8 flex gap-4 justify-center items-start">

      {/* Fighter A */}
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          value={fighterA}
          onChange={(e) => setFighterA(e.target.value)}
          placeholder="Enter fighter name"
          className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />

        {filteredA.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-black border border-white/10 max-h-60 overflow-y-auto">
            {filteredA.slice(0, 10).map((f) => (
              <div
                key={f.id}
                onClick={() => setFighterA(f.name)}
                className="px-4 py-2 text-white text-sm cursor-pointer hover:bg-white/10"
              >
                {f.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <Placeholder placeholder="VS" />

      {/* Fighter B */}
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          value={fighterB}
          onChange={(e) => setFighterB(e.target.value)}
          placeholder="Enter fighter name"
          className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />

        {filteredB.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-black border border-white/10 max-h-60 overflow-y-auto">
            {filteredB.slice(0, 10).map((f) => (
              <div
                key={f.id}
                onClick={() => setFighterB(f.name)}
                className="px-4 py-2 text-white text-sm cursor-pointer hover:bg-white/10"
              >
                {f.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FighterSelector
