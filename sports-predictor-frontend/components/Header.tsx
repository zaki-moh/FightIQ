import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="sticky top-0 bg-[#DB1606] shadow-md z-50">
      <div className="flex items-center w-full justify-start">
        <Link href="/"> 
          <Image 
            src="/assets/icons/sportaAI.new.png" 
            alt="logo" 
            width={200} 
            height={200} 
            className="h-16 w-auto cursor-pointer scale-75"
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
