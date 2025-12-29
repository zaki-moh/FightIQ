import { useState } from 'react';
import Placeholder from './Placeholder'

const FighterSelector = () => {
    const [fighterA, setFighterA] = useState("")
    const [fighterB, setFighterB] = useState("")

  return (
    <div className="mt-8 flex gap-4 justify-center items-center">
      <input
        type="text"
        placeholder="Enter fighter name"
        className="w-full max-w-xs rounded-md bg-white/5 border border-white/10 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      />

      <Placeholder placeholder="VS" />

      <input
        type="text"
        placeholder="Enter fighter name"
        className="w-full max-w-xs rounded-md bg-white/5 border border-white/10 px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      />
    </div>
  )
}

export default FighterSelector
