import { Badge } from "@/components/ui/badge"

interface OutfitItemProps {
  name: string
  description: string
  type: string
}

export function OutfitItem({ name, description, type }: OutfitItemProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "top":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "mid":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
      case "outer":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "bottom":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "footwear":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "head":
      case "hands":
      case "neck":
      case "eyes":
      case "skin":
        return "bg-rose-100 text-rose-800 hover:bg-rose-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="flex items-center gap-2 p-2 rounded-md bg-white border border-gray-100">
      <Badge className={`${getTypeColor(type)} font-normal`} variant="secondary">
        {type}
      </Badge>
      <div>
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  )
}
