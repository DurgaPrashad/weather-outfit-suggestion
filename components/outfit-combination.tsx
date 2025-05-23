import { ColorSwatch } from "./color-swatch"

interface OutfitCombinationProps {
  topColor: {
    name: string
    hex: string
  }
  bottomColor: {
    name: string
    hex: string
  }
  description: string
}

export function OutfitCombination({ topColor, bottomColor, description }: OutfitCombinationProps) {
  return (
    <div className="flex flex-col p-3 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex flex-col items-center">
          <ColorSwatch color={topColor.hex} name={topColor.name} size="md" showName={false} />
          <span className="text-xs mt-1">Top</span>
        </div>
        <div className="text-gray-400">+</div>
        <div className="flex flex-col items-center">
          <ColorSwatch color={bottomColor.hex} name={bottomColor.name} size="md" showName={false} />
          <span className="text-xs mt-1">Bottom</span>
        </div>
        <div className="ml-auto text-sm font-medium">
          {topColor.name} / {bottomColor.name}
        </div>
      </div>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  )
}
