interface PlaceholderProps {
  placeholder: string;
  align?: 'left' | 'center';
  className?: string;
}

const Placeholder = ({ placeholder, align = 'center', className }: PlaceholderProps) => {
  return (
    <span
      className={`text-white/40 z-0 text-sm font-medium opacity-80 ${
        align === 'center' ? 'text-center' : 'text-left'
      } ${className}`}
    >
      {placeholder}
    </span>
  )
}

export default Placeholder
