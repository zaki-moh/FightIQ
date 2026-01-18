import React from 'react'
import Button from './Button'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

const ContactModal = ({
    open,
    onClose,
}:ContactModalProps) => {

  if (!open) return null

  return (
<div 
  className="fixed inset-0 z-50 flex items-center justify-center px-4"
  onClick={(e) => e.stopPropagation()}
  >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-sm rounded-lg bg-[#0b1220] border border-white/10 p-5 text-center">
        <h2 className="text-lg font-semibold text-white tracking-tight">
          Contact
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm text-white/70 leading-relaxed">
          Have a question, feedback, or suggestion about FightIQ?
          Feel free to reach out.
        </p>

        <a
          href="mailto:zakaria.mohamed.mn@gmail.com"
          className="mt-4 block text-sm text-blue-400 hover:text-blue-300 underline"
        >
          zakaria.mohamed.mn@gmail.com
        </a>

        <div className="mt-6">
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ContactModal