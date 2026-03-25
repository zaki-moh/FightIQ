'use client'
import { motion } from 'framer-motion'
import React from 'react'

const FadeInSection = ({children}: {children: React.ReactNode}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default FadeInSection