'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import NavItems from './NavItems'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid'


const Header = () => {

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky isolate top-0 bg-[#050D27] shadow-md z-50">
      <div className="flex items-center w-full justify-between px-6 h-16">
        <Link href="/" className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-90"> 
          <Image 
            src="/assets/icons/FightIQfinal.png"
            alt="logo" 
            width={1536} 
            height={1024} 
            className="h-8 sm:h-10 w-auto cursor-pointer"
          />
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>

        <nav>
         <nav className="hidden md:block">
            <NavItems />
          </nav>
        </nav>

        {open && (
          <div className="md:hidden px-6 pb-4 pt-2 bg-[#050D27] border-t border-white/10">
            <NavItems mobile={true}/>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
