import React from 'react'

const ONE = () => {
  return (
    <main className="flex min-h-[60vh] sm:min-h-[70vh] flex-col items-center justify-center text-center px-4 pb-16 sm:pb-24">
        <h1 className="text-2xl sm:max-w-3xl md:text-4xl font-semibold text-white/90">
          ONE Championship predictions coming soon
        </h1>

        <p className="mt-3 text-sm md:text-base text-white/60 max-w-md">
          We’re building data-driven predictions and explainable fight analytics for ONE Championship.
        </p>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </main>
  )
}

export default ONE