import React from 'react'
import Image from 'next/image'

const Page = () => {
  return (
    <main className="flex justify-center">
      <div className="flex w-full max-w-3xl flex-col px-6 mt-12 lg:mt-16 gap-12 mb-16 md:mb-20">

        <section className="flex flex-col items-center text-center gap-3">
          <Image
            src="/assets/icons/ZakariaMohamed.png"
            alt="Portrait of Zakaria Mohamed"
            width={72}
            height={72}
            className="rounded-full"
            priority
          />

          <h1 className="text-2xl font-bold leading-tight">
            Zakaria Mohamed
          </h1>

          <p className="text-base">
            Software Engineer · Product-Focused Builder
          </p>

          <p className="text-sm text-white/60">
            Computer Science B.S. · University of Minnesota
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white leading-tight">
            What I Build
          </h2>

          <ul className="list-disc list-inside space-y-2 text-sm text-white/70 max-w-2xl">
            <li>
              Frontend interfaces that prioritize clarity, usability, and visual hierarchy
            </li>
            <li>
              Backend systems and APIs designed for reliability, iteration, and clean data flow
            </li>
            <li>
              End-to-end full-stack applications, from data ingestion to deployed user experience
            </li>
            <li>
              Applied ML and data-driven features used selectively to improve product decisions
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white leading-tight">
            Why FightIQ?
          </h2>

          <p className="text-sm text-white/70 leading-relaxed max-w-2xl">
            FightIQ grew out of my background in combat sports and my interest in how
            data behaves in high-variance environments. I wanted to explore how statistical
            models, domain knowledge, and product design could work together to produce
            predictions that are transparent, contextual, and useful rather than absolute.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white leading-tight">
            Background
          </h2>

          <ul className="space-y-2 text-sm text-white/70 max-w-2xl">
            <li>
              B.S. in Computer Science — University of Minnesota
            </li>
            <li>
              Coursework emphasis in systems, software design, and applied data analysis
            </li>
            <li>
              Project-driven curriculum with production-style team codebases
            </li>
          </ul>
        </section>

        {/* Outside of Coding */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white leading-tight">
            Outside of Coding
          </h2>

          <p className="text-sm text-white/70 leading-relaxed max-w-2xl">
            I train in martial arts, which has shaped how I think about preparation,
            iteration, and decision-making under pressure.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white leading-tight">
            Get in Touch
          </h2>

          <div className="flex flex-wrap gap-6 text-sm">
            <a
              href="/Zakaria_Mohamed_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition"
            >
              Resume
            </a>

            <a
              href="https://github.com/zaki-moh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/zakaria-mohamed-61a89a1b3/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition"
            >
              LinkedIn
            </a>
          </div>
        </section>

      </div>
    </main>
  )
}

export default Page
