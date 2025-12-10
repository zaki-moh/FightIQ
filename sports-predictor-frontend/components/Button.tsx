import React from 'react'
import clsx from "clsx"


interface ButtonProps {
    children: React.ReactNode;  
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    onClick?: () => void
    className?: string;
}

const Button = () => {
  return (
    <div>Button</div>
  )
}

export default Button