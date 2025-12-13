import Button from '@/components/ui/Button'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="max-w-3xl text-left w-full px-6 mt-16">
        <h1 className="text-white font-semibold text-4xl mt-10 leading-normal">
          How FightIQ Delivers <br />
          Smater Combat Sports Predictions 
        </h1>
        <h2 className="text-white/60 font-light text-xl mt-5 leading-normal">
          Behind the scneces of our machine learning engine, <br />
          accuracy pipeline, and multi-sport analytics.
        </h2>
        <Button variant="ghost" size="sm" className="mt-6 h-10 w-36 border border-width/20 hover:border-white/40 text-white">
          Get Started
        </Button>
      </div>
    </div>
  )
}

export default page