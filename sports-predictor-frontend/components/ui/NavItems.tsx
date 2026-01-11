'use client'
import Link from 'next/link'
import Image from 'next/image'

const NavItems = () => {

  return (
    <ul className="flex flex-row gap-10 font-bold">
      <li className="flex items-center justify-center w-14 h-8 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-90 hover:opacity-90">
        <Link href="/ufc">
          <Image
            src="/assets/icons/UFC.webp"
            alt="UFC"
            width={1024}
            height={379}
            className="object-contain cursor-pointer"
          />
        </Link>
      </li>

      <li className="flex justify-center items-center w-14 h-8 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-90 hover:opacity-90">
        <Link href="/one">
          <Image
            src="/assets/icons/OneChampionship.png"
            alt="NBA"
            width={1024}
            height={379}
            className="object-contain cursor-pointer"
          />
        </Link>
      </li>

      <li className="flex justify-center items-center w-14 h-8 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-90 hover:opacity-90">
        <Link href="/toprank">
          <Image
            src="/assets/icons/TopRank.png"
            alt="NFL"
            width={1024}
            height={379}
            className="h-full w-auto object-contain scale-[0.85]"
          />
        </Link>
      </li>
    </ul>
  )
}

export default NavItems
