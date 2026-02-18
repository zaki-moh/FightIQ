'use client'
// Fighter autocomplete component used on the UFC prediction page.
// Uses API-backed search with static fallback for resilience.
import { useEffect, useState } from 'react'
import { fighters as fallbackFighters } from '@/data/fighters'
import Placeholder from './Placeholder'
import clsx from 'clsx'

interface FighterSelectorProps {
  fighterA: string
  fighterB: string
  onChangeA: (value: string) => void
  onSelectA: (name: string, gender: string) => void
  onChangeB: (value: string) => void
  onSelectB: (name: string, gender: string) => void
}

type FighterOption = {
  id: number
  name: string
  gender: string
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
  const [filteredA, setFilteredA] = useState<FighterOption[]>([])
  const [filteredB, setFilteredB] = useState<FighterOption[]>([])

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const fallbackSearch = (query: string, excludeName: string): FighterOption[] => {
    return fallbackFighters
      .filter(
        (f) =>
          f.name.toLowerCase().includes(query.toLowerCase()) &&
          f.name !== excludeName
      )
      .slice(0, 10)
  }

  useEffect(() => {
    const query = fighterA.trim()
    if (query.length < 2) {
      setFilteredA([])
      return
    }

    if (!API_URL) {
      setFilteredA(fallbackSearch(query, fighterB))
      return
    }

    const controller = new AbortController()
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `${API_URL}/fighters?query=${encodeURIComponent(query)}&exclude_name=${encodeURIComponent(fighterB)}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Fighter search failed')
        }

        const data = (await response.json()) as FighterOption[]
        setFilteredA(data.slice(0, 10))
      } catch {
        setFilteredA(fallbackSearch(query, fighterB))
      }
    }, 180)

    return () => {
      controller.abort()
      clearTimeout(timeout)
    }
  }, [API_URL, fighterA, fighterB])

  useEffect(() => {
    const query = fighterB.trim()
    if (query.length < 2) {
      setFilteredB([])
      return
    }

    if (!API_URL) {
      setFilteredB(fallbackSearch(query, fighterA))
      return
    }

    const controller = new AbortController()
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `${API_URL}/fighters?query=${encodeURIComponent(query)}&exclude_name=${encodeURIComponent(fighterA)}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Fighter search failed')
        }

        const data = (await response.json()) as FighterOption[]
        setFilteredB(data.slice(0, 10))
      } catch {
        setFilteredB(fallbackSearch(query, fighterA))
      }
    }, 180)

    return () => {
      controller.abort()
      clearTimeout(timeout)
    }
  }, [API_URL, fighterA, fighterB])

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
                      onSelectA(f.name, f.gender)
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
                      onSelectB(f.name, f.gender)
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
