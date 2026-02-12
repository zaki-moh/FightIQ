'use client'

import Link from 'next/link'
import Image from 'next/image'

interface NavItemsProps {
  mobile?: boolean
}

const NavItems = ({ mobile }: NavItemsProps) => {
  if (mobile) {
    return (
      <ul className="flex flex-col gap-4">
        <li>
          <Link
            href="/ufc"
            className="block w-full rounded-md px-3 py-2 text-white/80
                       hover:bg-white/10 transition-colors"
          >
            UFC Predictions
          </Link>
        </li>

        <li>
          <Link
            href="/one"
            className="block w-full rounded-md px-3 py-2 text-white/80
                       hover:bg-white/10 transition-colors"
          >
            ONE Championship Predictions
          </Link>
        </li>

        <li>
          <Link
            href="/toprank"
            className="block w-full rounded-md px-3 py-2 text-white/80
                       hover:bg-white/10 transition-colors"
          >
            Top Rank Predictions
          </Link>
        </li>
      </ul>
    )
  }

  return (
    <ul className="flex items-center gap-6 sm:gap-8">
      <li>
        <Link
          href="/ufc"
          className="flex items-center justify-center h-12 w-12
                     opacity-85 transition-opacity hover:opacity-100"
        >
          <Image
            src="/assets/icons/UFCcropped.png"
            alt="UFC"
            width={128}
            height={48}
            className="object-contain"
          />
        </Link>
      </li>

      <li>
        <Link
          href="/one"
          className="flex items-center justify-center h-12 w-12
                     opacity-85 transition-opacity hover:opacity-100"
        >
          <Image
            src="/assets/icons/OneChampionship.png"
            alt="ONE Championship"
            width={128}
            height={48}
            className="object-contain"
          />
        </Link>
      </li>

      <li>
        <Link
          href="/toprank"
          className="flex items-center justify-center h-10 w-10
                     opacity-85 transition-opacity hover:opacity-100 translate-y-[1px]"
        >
          <Image
            src="/assets/icons/TopRank2.png"
            alt="Top Rank"
            width={128}
            height={48}
            className="object-contain"
          />
        </Link>
      </li>
    </ul>
  )
}

export default NavItems
