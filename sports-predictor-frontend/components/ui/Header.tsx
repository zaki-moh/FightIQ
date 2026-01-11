'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import NavItems from './NavItems'

const Header = () => {

  return (
    <header className="sticky top-0 bg-[#050D27] shadow-md z-50">
      <div className="flex items-center w-full justify-between px-6 py-2">
        <Link href="/" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-90"> 
          <Image 
            src="/assets/icons/FightIQ.png"
            alt="logo" 
            width={898} 
            height={366} 
            className="h-10 w-auto cursor-pointer"
          />
        </Link>
        <nav>
          <NavItems/>
        </nav>
      </div>
    </header>
  )
}

export default Header
