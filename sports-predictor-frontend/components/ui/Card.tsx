import React from 'react'
interface CardProps {
    icon: React.ReactNode;
    title: string
    description: string;
    className?: string;
}

const Card = ({
    icon,
    title, 
    description,
    className
}: CardProps) => {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all mt-10 w-80 ${className}`}>
        <div className="mb-4">{icon}</div>
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/60">{description}</p>
    </div>
  )
}

export default Card