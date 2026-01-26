'use client'

import Link from 'next/link'
import Image from 'next/image'

const NavItems = () => {
  return (
    <ul className="flex items-center gap-6 sm:gap-8">
      <li>
        <Link
          href="/ufc"
          className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12
                    opacity-85 transition-opacity
                    hover:opacity-100 active:opacity-85"
          aria-label="UFC predictions"
        >
          <Image
            src="/assets/icons/UFCcropped.png"
            alt="UFC"
            width={128}
            height={48}
            className="max-h-full max-w-full object-contain"
          />
        </Link>
      </li>

      <li>
        <Link
          href="/one"
          className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12
                    opacity-85 transition-opacity
                    hover:opacity-100 active:opacity-85"
          aria-label="ONE Championship predictions"
        >
          <Image
            src="/assets/icons/OneChampionship.png"
            alt="ONE Championship"
            width={128}
            height={48}
            className="max-h-full max-w-full object-contain"
          />
        </Link>
      </li>

      <li>
        <Link
          href="/toprank"
          className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10
                    opacity-85 transition-opacity
                    hover:opacity-100 hover:fill-[#D20A0A] active:opacity-85 translate-y-[1px]"
          aria-label="Top Rank predictions"
        >
          <Image
            src="/assets/icons/TopRank2.png"
            alt="Top Rank"
            width={128}
            height={48}
            className="max-h-full max-w-full object-contain"
          />
        </Link>
      </li>
    </ul>
  )
}

export default NavItems
