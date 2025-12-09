'use client'
import Link from 'next/link'
import Image from 'next/image'

const NavItems = () => {

  return (
    <ul className="flex flex-row gap-10 font-bold">
      <li className="flex items-center justify-center w-16 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90 hover:opacity-90">
        <Link href="#">
          <Image
            src="/assets/icons/UFC.webp"
            alt="UFC"
            width={1024}
            height={379}
            className="h-10 w-auto object-contain cursor-pointer"
          />
        </Link>
      </li>

      <li className="flex justify-center items-center w-16 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90 hover:opacity-90">
        <Link href="#">
          <Image
            src="/assets/icons/NBA.png"
            alt="NBA"
            width={1024}
            height={379}
            className="h-10 w-auto object-contain cursor-pointer"
          />
        </Link>
      </li>

      <li className="flex justify-center items-center w-16 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90 hover:opacity-90">
        <Link href="#">
          <Image
            src="/assets/icons/NFLlogo.png"
            alt="NFL"
            width={1024}
            height={379}
            className="h-10 w-auto object-contain cursor-pointer"
          />
        </Link>
      </li>

      <li className="flex justify-center items-center w-16 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90 hover:opacity-90">
        <Link href="#">
          <Image
            src="/assets/icons/PremLeug.png"
            alt="Premier League"
            width={1024}
            height={379}
            className="h-10 w-auto object-contain cursor-pointer"
          />
        </Link>
      </li>
    </ul>
  )
}

export default NavItems
