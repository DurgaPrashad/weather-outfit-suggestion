import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ColorSwatch } from "./color-swatch"

interface DetailedOutfitViewProps {
  alternative: {
    id: string
    name: string
    description: string
    items: {
      type: string
      name: string
      description: string
      alternatives: string[]
    }[]
    accessories: {
      type: string
      name: string
      description: string
      alternatives: string[]
    }[]
    colors: {
      primary: string[]
      secondary: string[]
      accent: string[]
    }
    style: string
  }
}

const colorHexMap: Record<string, string> = {
  // Primary colors
  Black: "#000000",
  White: "#FFFFFF",
  Navy: "#000080",
  Gray: "#808080",
  "Dark Gray": "#A9A9A9",
  Charcoal: "#36454F",
  Brown: "#8B4513",
  "Dark Brown": "#654321",
  Blue: "#0000FF",
  "Dark Blue": "#00008B",
  Khaki: "#F0E68C",
  Beige: "#F5F5DC",
  "Denim Blue": "#1560BD",

  // Secondary colors
  Burgundy: "#800020",
  "Forest Green": "#228B22",
  "Deep Purple": "#301934",
  Maroon: "#800000",
  Olive: "#808000",
  Teal: "#008080",
  Rust: "#B7410E",
  Green: "#008000",
  Purple: "#800080",
  Coral: "#FF7F50",
  "Sage Green": "#9CAF88",
  "Dusty Pink": "#D4A5A5",
  Lavender: "#E6E6FA",
  Terracotta: "#E2725B",

  // Accent colors
  Red: "#FF0000",
  Orange: "#FFA500",
  "Bright Blue": "#0080FF",
  Yellow: "#FFFF00",
  "Bright Yellow": "#FFFF00",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  "Deep Red": "#8B0000",
  "Royal Blue": "#4169E1",
  "Neon Yellow": "#FFFF00",
  "Hot Pink": "#FF69B4",
  "Electric Green": "#00FF00",
  Turquoise: "#40E0D0",
  Pink: "#FFC0CB",
  "Rose Gold": "#E8B4B8",
  Mint: "#98FB98",
  "Light Blue": "#ADD8E6",
  "Ice Blue": "#B0E0E6",
  "Pale Yellow": "#FFFFE0",
  "Light Pink": "#FFB6C1",
  "Powder Blue": "#B0E0E6",
  Cream: "#FFFDD0",
  "Pale Green": "#98FB98",
  "Crystal Blue": "#68A0B0",
  Peach: "#FFCBA4",
  "Sunset Orange": "#FF8C69",
  "Shell Pink": "#FDB5A6",
  "Tropical Green": "#00CC99",
  "Ocean Blue": "#006994",
  "Sunset Yellow": "#FFD23F",
  "Flamingo Pink": "#FC8EAC",
  Sand: "#C2B280",
  Aqua: "#00FFFF",
  "Lime Green": "#32CD32",
}

export function DetailedOutfitView({ alternative }: DetailedOutfitViewProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "base":
      case "top":
        return "bg-blue-100 text-blue-800"
      case "mid":
      case "outer":
        return "bg-indigo-100 text-indigo-800"
      case "bottom":
        return "bg-green-100 text-green-800"
      case "footwear":
        return "bg-amber-100 text-amber-800"
      case "head":
      case "hands":
      case "neck":
      case "eyes":
        return "bg-rose-100 text-rose-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {alternative.name}
            <Badge variant="secondary" className="ml-2">
              {alternative.style}
            </Badge>
          </CardTitle>
          <CardDescription>{alternative.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Clothing Items */}
          <div>
            <h3 className="font-semibold mb-3">Clothing Items</h3>
            <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
              {alternative.items.map((item, index) => (
                <div key={index} className="p-3 border rounded-lg bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getTypeColor(item.type)} variant="secondary">
                      {item.type}
                    </Badge>
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-700">Alternatives:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.alternatives.map((alt, altIndex) => (
                        <Badge key={altIndex} variant="outline" className="text-xs">
                          {alt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessories */}
          {alternative.accessories.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-3">Accessories</h3>
                <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
                  {alternative.accessories.map((accessory, index) => (
                    <div key={index} className="p-3 border rounded-lg bg-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTypeColor(accessory.type)} variant="secondary">
                          {accessory.type}
                        </Badge>
                        <span className="font-medium text-sm">{accessory.name}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{accessory.description}</p>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-700">Alternatives:</p>
                        <div className="flex flex-wrap gap-1">
                          {accessory.alternatives.map((alt, altIndex) => (
                            <Badge key={altIndex} variant="outline" className="text-xs">
                              {alt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Color Palette */}
          <Separator />
          <div>
            <h3 className="font-semibold mb-3">Recommended Color Palette</h3>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Primary Colors</h4>
                <div className="grid grid-cols-4 gap-2">
                  {alternative.colors.primary.map((color, index) => (
                    <ColorSwatch
                      key={index}
                      color={colorHexMap[color] || "#808080"}
                      name={color}
                      size="md"
                      showName={true}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Secondary Colors</h4>
                <div className="grid grid-cols-4 gap-2">
                  {alternative.colors.secondary.map((color, index) => (
                    <ColorSwatch
                      key={index}
                      color={colorHexMap[color] || "#808080"}
                      name={color}
                      size="md"
                      showName={true}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Accent Colors</h4>
                <div className="grid grid-cols-4 gap-2">
                  {alternative.colors.accent.map((color, index) => (
                    <ColorSwatch
                      key={index}
                      color={colorHexMap[color] || "#808080"}
                      name={color}
                      size="md"
                      showName={true}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
