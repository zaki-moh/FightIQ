'use client'

import React from 'react'
import Button from './Button'
import { useRouter } from "next/navigation"
import { BoltIcon } from "@heroicons/react/24/solid";


const Welcome = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/")
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex flex-col w-full items-center justify-center gap-6 mt-32 opacity-0 animate-fade-in delay-0">
        <h1 className="text-5xl font-semibold text-white text-center">
          Welcome to Sporta AI!
        </h1>
        <h2 className="text-xl font-light text-gray-500 text-center animate-fade-in delay-150">AI-powered sports predictions and analytics</h2>
        <div className="flex gap-8">
          <Button variant="primary" size='lg' onClick={onClick} >
            Get started
          </ Button>
          <Button onClick={onClick} size="lg" variant="outline">
            Learn more
          </Button>
        </div>
      </section>

      <div className="w-3/4 mx-auto border-t-2 max-w-4xl bg-white/30 h-[3px] mt-10
        bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
      <div className="flex items-center justify-center gap-6 mt-10">
        <BoltIcon className="w-8 h-8 text-white" />
        
        <p className="text-white/30 text-3xl">|</p>

        <h3 className="font-semibold text-white text-2xl">
          Real-time ML predictions
        </h3>

        <p className="text-white/30 text-3xl">|</p>

        <h3 className="font-semibold text-white text-2xl">
          70% accuracy
        </h3>
      </div>
    </div>
  )
}

export default Welcome