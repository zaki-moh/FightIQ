import React from 'react'

const page = () => {

  return (
    <main className="flex flex-col w-full items-center">
        <section className="mt-16 max-w-3xl px-6 text-left"> 
            <h1 className="text-white text-4xl font-semibold leading-tight">
                How the FightIQ Model Predicts Fight Outcomes
            </h1>
            <p className="mt-4 leading-relaxed text-white/60 text-lg">
                This page provides a detailed breakdown of the machine learning model
                behind FightIQ, including how data is processed, how predictions are
                generated, and how accuracy is evaluated.
            </p>
        </section>

        <div className="my-16 w-full h-px bg-white/10"/>

        <section className="max-w-3xl px-6 w-full text-left">
            <h2 className="leading-snug text-2xl font-semibold text-white">
                Problem Formulation
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed text-lg">
                At a high level, the model is trained to predict the probability of
                a fighter winning a given matchup based on historical fight data
                and fighter-level statistics.
            </p>
        </section>
    </main>
  )
}

export default page