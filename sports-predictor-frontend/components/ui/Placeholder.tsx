interface PlaceholderProps {
  placeholder: string;
  align?: 'left' | 'center';
}

const Placeholder = ({ placeholder, align = 'center' }: PlaceholderProps) => {
  return (
    <span
      className={`text-white/40 text-sm font-medium opacity-80 ${
        align === 'center' ? 'text-center' : 'text-left'
      }`}
    >
      {placeholder}
    </span>
  )
}

export default Placeholder
