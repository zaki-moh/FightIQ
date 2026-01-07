import React from 'react'
import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className
}: ButtonProps) => {

  const baseStyles =
    "rounded-lg font-semibold transition-all duration-200 focus:outline-none"

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-500",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    outline: "border border-gray-300 text-gray-200 hover:bg-gray-800/90",
    ghost: "text-gray-300 bg-gray-700/30 hover:bg-gray-500/30 backdrop-blur-sm",
  }

  const sizeStyles = {
    sm: "px-5 py-1.5 text-sm",
    md: "px-7 py-2.5 text-md",
    lg: "px-9 py-3 text-lg",
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        disabled
          ? "cursor-not-allowed bg-gray-700/30 text-gray-400 backdrop-blur-sm"
          : variantStyles[variant],
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
