import React from 'react'
import clsx from "clsx"


interface ButtonProps {
    children: React.ReactNode;  
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    onClick?: () => void
    className?: string;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className
}: ButtonProps) => {

  const baseStyles = 
  "rounded-lg font-semibold transition-all duration-200 focus:outline-none";

  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white", 
    secondary: "bg-grey-700 hover:bg-gray-600 text-white",
    outline: "border border-gray-300 text-gray-200 hover:bg-gray-800/90",
    ghost: "text-gray-300 hover:bg-gray-800/30",
  };

  const sizeStyles = {
    sm: "px-5 py-1.5 text-sm",
    md: "px-7 py-2.5 text-md",
    lg: "px-9 py-3 text-lg",
  }
  return (
    <button
    onClick={onClick}
    className={clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    )}>
      {children}
    </button>
  )
}

export default Button