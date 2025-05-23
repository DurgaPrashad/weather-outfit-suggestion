interface ColorSwatchProps {
  color: string
  name: string
  size?: "sm" | "md" | "lg"
  showName?: boolean
}

export function ColorSwatch({ color, name, size = "md", showName = true }: ColorSwatchProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${sizeClasses[size]} rounded-full border border-gray-200 shadow-sm`}
        style={{ backgroundColor: color }}
        title={name}
      />
      {showName && <span className="text-xs mt-1 text-gray-700">{name}</span>}
    </div>
  )
}
