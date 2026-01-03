import React from 'react'

interface CardProps {
  icon?: React.ReactNode
  title?: string
  description?: string
  className?: string
  onClick?: () => void
}

const Card = ({
  icon,
  title,
  description,
  className = '',
  onClick,
}: CardProps) => {
  const isClickable = Boolean(onClick)

  return (
    <div
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onClick) onClick()
      }}
      className={`
        bg-white/5 backdrop-blur-sm rounded-xl border border-white/10
        transition-all duration-200
        ${isClickable ? 'cursor-pointer hover:bg-white/10 hover:border-white/20 hover:scale-[1.03]' : ''}
        ${className}
      `}
    >
      <div className="mb-4">{icon}</div>

      {title && (
        <h3 className="text-white text-xl font-bold mb-2">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-white/60">
          {description}
        </p>
      )}
    </div>
  )
}

export default Card
