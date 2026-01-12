import React from 'react'
import Button from './Button'

interface AboutModalProps {
  open: boolean
  onClose: () => void
}

const AboutModal = ({ open, onClose }: AboutModalProps) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-sm rounded-lg bg-[#0b1220] border border-white/10 p-5 text-center">
        <h2 className="text-xl font-semibold text-white">
          About FightIQ
        </h2>

        <p className="mt-3 text-sm text-white/70">
          FightIQ is a combat sports analytics platform focused on delivering
          clear, explainable fight predictions.
        </p>

        <p className="mt-3 text-xs text-white/50">
          UFC supported. Additional promotions in development.
        </p>

        <div className="mt-5">
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AboutModal
