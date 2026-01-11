import React from 'react'

interface AboutModalProps {
    open: boolean;
    onClose: () => void;
}

const aboutModal = ({
    open, 
    onClose
  }:AboutModalProps) => {
    
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-items-center bg-">

    </div>
  )
}

export default aboutModal