"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorSwatch } from "./color-swatch"

interface OutfitAlternativeCardProps {
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
  isActive?: boolean
  onClick?: () => void
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

export function OutfitAlternativeCard({ alternative, isActive, onClick }: OutfitAlternativeCardProps) {
  const getStyleColor = (style: string) => {
    switch (style) {
      case "casual":
        return "bg-blue-100 text-blue-800"
      case "formal":
        return "bg-purple-100 text-purple-800"
      case "sporty":
        return "bg-green-100 text-green-800"
      case "trendy":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isActive ? "ring-2 ring-blue-500 shadow-md" : ""
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{alternative.name}</CardTitle>
            <CardDescription className="text-sm mt-1">{alternative.description}</CardDescription>
          </div>
          <Badge className={getStyleColor(alternative.style)} variant="secondary">
            {alternative.style}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="items" className="w-full">
          <TabsList className="grid w-full grid-cols-3 text-xs">
            <TabsTrigger value="items" className="text-xs">
              Items
            </TabsTrigger>
            <TabsTrigger value="accessories" className="text-xs">
              Accessories
            </TabsTrigger>
            <TabsTrigger value="colors" className="text-xs">
              Colors
            </TabsTrigger>
          </TabsList>
          <TabsContent value="items" className="mt-3">
            <div className="space-y-2">
              {alternative.items.slice(0, 3).map((item, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500 mb-1">{item.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.alternatives.slice(0, 2).map((alt, altIndex) => (
                      <Badge key={altIndex} variant="outline" className="text-xs">
                        {alt}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="accessories" className="mt-3">
            <div className="space-y-2">
              {alternative.accessories.slice(0, 3).map((accessory, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{accessory.name}</p>
                  <p className="text-xs text-gray-500 mb-1">{accessory.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {accessory.alternatives.slice(0, 2).map((alt, altIndex) => (
                      <Badge key={altIndex} variant="outline" className="text-xs">
                        {alt}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="colors" className="mt-3">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium mb-2">Primary Colors</p>
                <div className="flex gap-1">
                  {alternative.colors.primary.slice(0, 4).map((color, index) => (
                    <ColorSwatch
                      key={index}
                      color={colorHexMap[color] || "#808080"}
                      name={color}
                      size="sm"
                      showName={false}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium mb-2">Accent Colors</p>
                <div className="flex gap-1">
                  {alternative.colors.accent.slice(0, 4).map((color, index) => (
                    <ColorSwatch
                      key={index}
                      color={colorHexMap[color] || "#808080"}
                      name={color}
                      size="sm"
                      showName={false}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
