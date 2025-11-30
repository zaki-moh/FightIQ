import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import NavItems from './NavItems'

const Header = () => {
  return (
    <header className="sticky top-0 bg-[#050D27] shadow-md z-50">
      <div className="flex items-center w-full justify-between pl-8 pr-20">
        <Link href="/"> 
          <Image 
            src="/assets/icons/sportaAI.logo.png"
            alt="logo" 
            width={1526} 
            height={1024} 
            className="h-14 w-auto cursor-pointer scale-165"
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
