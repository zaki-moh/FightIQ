'use client'
// Header navigation links and promotion logo interactions.

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
            className="flex justify-center block w-full rounded-md px-3 py-2 text-white/80
                       hover:bg-white/10 transition-colors"
          >
            UFC
          </Link>
        </li>

        <li>
          <Link
            href="/one"
            className="flex justify-center block w-full rounded-md px-3 py-2 text-white/80
                       hover:bg-white/10 transition-colors"
          >
            ONE
          </Link>
        </li>

        <li>
          <Link
            href="/toprank"
            className="flex justify-center block w-full rounded-md px-3 py-2 text-white/80
                       hover:bg-white/10 transition-colors"
          >
            Top Rank
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
          className="group flex items-center justify-center h-12 w-12
                     transition-transform duration-200 hover:scale-105"
        >
          <Image
            src="/assets/icons/svg/UFCcropped.svg"
            alt="UFC"
            width={128}
            height={48}
            className="object-contain transition-all duration-200 [filter:brightness(0)_invert(1)_drop-shadow(0_0_6px_rgba(220,38,38,0.35))] group-hover:[filter:brightness(0)_invert(1)_drop-shadow(0_0_14px_rgba(220,38,38,0.85))]"
          />
        </Link>
      </li>

      <li>
        <Link
          href="/one"
          className="group flex items-center justify-center h-12 w-12
                     transition-transform duration-200 hover:scale-105"
        >
          <Image
            src="/assets/icons/svg/OneChampionship.svg"
            alt="ONE Championship"
            width={128}
            height={48}
            className="object-contain transition-all duration-200 [filter:brightness(0)_invert(1)_drop-shadow(0_0_8px_rgba(255,255,255,0.45))] group-hover:[filter:brightness(0)_invert(1)_drop-shadow(0_0_15px_rgba(255,255,255,0.95))]"
          />
        </Link>
      </li>

      <li>
        <Link
          href="/toprank"
          className="group flex items-center justify-center h-10 w-10
                     translate-y-[1px] transition-transform duration-200 hover:scale-105"
        >
          <Image
            src="/assets/icons/svg/TopRank2.svg"
            alt="Top Rank"
            width={128}
            height={48}
            className="object-contain transition-all duration-200 [filter:brightness(0)_invert(1)_drop-shadow(0_0_6px_rgba(37,99,235,0.38))] group-hover:[filter:brightness(0)_invert(1)_drop-shadow(0_0_14px_rgba(37,99,235,0.9))]"
          />
        </Link>
      </li>
    </ul>
  )
}

export default NavItems
