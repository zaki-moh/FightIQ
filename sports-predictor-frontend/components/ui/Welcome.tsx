import React from 'react'

const Welcome = () => {
  return (
    <div className="flex items-center justify-center">
      <section className="flex flex-col w-full h-[60vh] flex items-center justify-center gap-6">
        <h1 className="text-5xl font-semibold text-white text-center">
          Welcome to Sporta AI!
        </h1>
        <h2 className="text-xl font-light text-gray-500 text-center">AI-powered sports predictions and analytics</h2>
      </section>
    </div>
  )
}

export default Welcome