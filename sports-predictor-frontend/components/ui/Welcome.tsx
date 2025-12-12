'use client'

import React from 'react'
import Button from './Button'
import { useRouter } from "next/navigation"
import { BoltIcon, ChartBarIcon, GlobeAmericasIcon, SparklesIcon} from "@heroicons/react/24/solid";
import Card from './Card';


const Welcome = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/")
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex flex-col w-full items-center justify-center gap-6 mt-24 opacity-0 fade-in-up animate-[delay-150ms]">
        <h1 className="text-5xl font-semibold text-white text-center">
          Welcome to Sporta AI!
        </h1>
        <h2 className="text-xl font-light text-gray-500 text-center fade-in-up animate-[delay-150ms]">AI-powered sports predictions and analytics</h2>
        <div className="flex gap-8">
          <Button variant="primary" size='lg' onClick={onClick} >
            Get started
          </ Button>
          <Button onClick={onClick} size="lg" variant="outline">
            Learn more
          </Button>
        </div>
      </section>

      <div   className="
                w-3/4 
                max-w-4xl 
                mx-auto 
                mt-10 
                h-[2px]
                bg-gradient-to-r 
                from-transparent 
                via-white/20 
                to-transparent"/>
      <div className="flex items-center justify-center gap-4 mt-6">
        <BoltIcon className="w-8 h-8 text-white" />
        
        <p className="text-white/20 text-3xl">|</p>

        <h3 className="font-semibold text-white text-2xl">
          Real-time ML predictions
        </h3>

        <p className="text-white/30 text-3xl">|</p>

        <h3 className="font-semibold text-white text-2xl">
          70% accuracy
        </h3>
      </div>
      <div className="flex gap-4 mt-12 fade-in-up animate-[delay-300ms]">
        <Card icon={<ChartBarIcon className="w-10 h-10 text-purple-400" />} title="Data-Driven Insights" description="Our machine learning pipeline continuously improves accuracy."/>
        <Card icon={<SparklesIcon className="w-10 h-10 text-yellow-400" />} title="Smart ML Engine" description="Our machine learning pipeline continuously improves accuracy."/>
        <Card icon={<GlobeAmericasIcon className="w-10 h-10 text-cyan-400" />} title="Multi-Sport Support" description="SportaAI adapts its prediction engine to UFC, NBA, NFL, Premier League, and more — tailored to each sport’s unique analytics."/>
      </div>
    </div>
  )
}

export default Welcome