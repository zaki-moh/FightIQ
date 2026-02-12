interface PhysicalStatProps {
  label: string
  value: string | number
  unit?: string
}

const PhysicalStat = ({ label, value, unit }: PhysicalStatProps) => {
  return (
    <div className="flex flex-col items-start">
      <span className="text-xs uppercase tracking-wide text-white/40">
        {label}
      </span>

      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold text-white">
          {value}
        </span>
        {unit && (
          <span className="text-xs text-white/50">
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}

export default PhysicalStat
