'use client'
import Link from 'next/link'
import Image from 'next/image'

const NavItems = () => {
  return (
    <ul className="flex flex-row gap-10 py-2 font-bold">
      <li>
        <Link href="#">
          <Image
            src="/assets/icons/UFC.webp"
            alt="UFC"
            width={1024}
            height={379}
            className="h-10 w-auto cursor-pointer"
          />
        </Link>
      </li>

      <li>
        <Link href="#">
          <Image
            src="/assets/icons/NBA.png"
            alt="NBA"
            width={1024}
            height={379}
            className="h-10 w-auto cursor-pointer"
          />
        </Link>
      </li>

      <li>
        <Link href="#">
          <Image
            src="/assets/icons/NFLlogo.png"
            alt="NFL"
            width={1024}
            height={379}
            className="h-10 w-auto cursor-pointer"
          />
        </Link>
      </li>

      <li>
        <Link href="#">
          <Image
            src="/assets/icons/PremLeugue.png"
            alt="Premier League"
            width={1024}
            height={379}
            className="h-10 w-auto cursor-pointer"
          />
        </Link>
      </li>
    </ul>
  )
}

export default NavItems
