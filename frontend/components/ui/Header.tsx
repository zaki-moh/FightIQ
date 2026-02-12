'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import NavItems from './NavItems'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid'


const Header = () => {

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-[#050D27] shadow-md z-50">
      <div className="flex items-center justify-between px-6 h-16">
        <Link href="/">
          <Image
            src="/assets/icons/FightIQfinal.png"
            alt="logo"
            width={1536}
            height={1024}
            className="h-8 sm:h-10 w-auto"
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

        <nav className="hidden md:block">
          <NavItems />
        </nav>
      </div>

      {open && (
        <div className="md:hidden w-full bg-[#050D27] border-t border-white/10">
          <div className="px-6 py-4">
            <NavItems mobile />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
