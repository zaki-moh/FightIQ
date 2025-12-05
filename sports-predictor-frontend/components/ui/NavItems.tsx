'use client'
import Link from 'next/link'
import Image from 'next/image'

const NavItems = () => {
  return (
    <ul className="flex flex-row gap-4 font-bold">
      <li className="w-26 flex justify-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
        <Link href="#">
          <Image
            src="/assets/icons/UFC.webp"
            alt="UFC"
            width={1024}
            height={379}
            className="h-10 w-auto cursor-pointer scale-60"
          />
        </Link>
      </li>

      <li className="w-16 flex justify-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
        <Link href="#">
          <Image
            src="/assets/icons/NBA.png"
            alt="NBA"
            width={1024}
            height={379}
            className="h-10 w-auto cursor-pointer sclae-110"
          />
        </Link>
      </li>

      <li className="w-16 flex justify-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
        <Link href="#">
          <Image
            src="/assets/icons/NFLlogo.png"
            alt="NFL"
            width={1024}
            height={379}
            className="h-10 w-auto cursor-pointer sclae-110"
          />
        </Link>
      </li>

      <li className="w-16 flex justify-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90">
        <Link href="#">
          <Image
            src="/assets/icons/PremLeugue.png"
            alt="Premier League"
            width={1024}
            height={379}
            className="h-10 w-auto cursor-pointer scale-110"
          />
        </Link>
      </li>
    </ul>
  )
}

export default NavItems
