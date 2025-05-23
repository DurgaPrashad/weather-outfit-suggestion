type WeatherCondition = "Clear" | "Clouds" | "Rain" | "Drizzle" | "Thunderstorm" | "Snow" | "Mist" | "Fog" | string

interface OutfitItem {
  type: string
  name: string
  description: string
}

interface OutfitSuggestion {
  description: string
  items: OutfitItem[]
  accessories: OutfitItem[]
}

// Helper function to get time of day
function getTimeOfDay(): "morning" | "afternoon" | "evening" | "night" {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return "morning"
  if (hour >= 12 && hour < 17) return "afternoon"
  if (hour >= 17 && hour < 21) return "evening"
  return "night"
}

export function getOutfitSuggestion(temperature: number, condition: WeatherCondition): OutfitSuggestion {
  // Base outfit items based on temperature
  let baseItems: OutfitItem[] = []
  let baseAccessories: OutfitItem[] = []
  let description = ""

  // Very cold (below 0°C)
  if (temperature < 0) {
    description = "It's freezing outside! Bundle up with multiple warm layers."
    baseItems = [
      { type: "top", name: "Thermal Undershirt", description: "A moisture-wicking base layer" },
      { type: "mid", name: "Heavy Sweater", description: "Wool or fleece for maximum insulation" },
      { type: "outer", name: "Winter Parka", description: "A windproof, insulated coat" },
      { type: "bottom", name: "Thermal Leggings", description: "As a base layer for your legs" },
      { type: "bottom", name: "Insulated Pants", description: "Thick pants to keep your legs warm" },
      { type: "footwear", name: "Insulated Boots", description: "Waterproof with good traction" },
    ]
    baseAccessories = [
      { type: "head", name: "Winter Hat", description: "Covers ears and retains heat" },
      { type: "hands", name: "Insulated Gloves", description: "Waterproof and warm" },
      { type: "neck", name: "Thick Scarf", description: "To protect your neck and face" },
    ]
  }
  // Cold (0-10°C)
  else if (temperature >= 0 && temperature < 10) {
    description = "It's quite cold today. Layer up for warmth."
    baseItems = [
      { type: "top", name: "Long-Sleeve Shirt", description: "As a base layer" },
      { type: "mid", name: "Sweater", description: "For insulation" },
      { type: "outer", name: "Winter Coat", description: "For protection against the cold" },
      { type: "bottom", name: "Jeans or Warm Pants", description: "Denim or thicker material" },
      { type: "footwear", name: "Closed Boots", description: "To keep feet warm" },
    ]
    baseAccessories = [
      { type: "head", name: "Beanie", description: "To keep your head warm" },
      { type: "hands", name: "Gloves", description: "To protect your hands" },
      { type: "neck", name: "Scarf", description: "For neck warmth" },
    ]
  }
  // Cool (10-15°C)
  else if (temperature >= 10 && temperature < 15) {
    description = "It's cool but manageable. A light jacket should suffice."
    baseItems = [
      { type: "top", name: "Long-Sleeve Shirt", description: "As a comfortable base" },
      { type: "outer", name: "Light Jacket", description: "For wind protection" },
      { type: "bottom", name: "Jeans or Pants", description: "Regular weight" },
      { type: "footwear", name: "Sneakers or Loafers", description: "Comfortable closed shoes" },
    ]
    baseAccessories = [{ type: "neck", name: "Light Scarf", description: "Optional for added warmth" }]
  }
  // Mild (15-20°C)
  else if (temperature >= 15 && temperature < 20) {
    description = "The weather is mild today. Light layers are perfect."
    baseItems = [
      { type: "top", name: "T-Shirt or Light Long-Sleeve", description: "Depending on your preference" },
      { type: "outer", name: "Light Sweater or Cardigan", description: "For cooler moments" },
      { type: "bottom", name: "Jeans or Casual Pants", description: "Regular weight" },
      { type: "footwear", name: "Sneakers or Casual Shoes", description: "Comfortable everyday shoes" },
    ]
    baseAccessories = []
  }
  // Warm (20-25°C)
  else if (temperature >= 20 && temperature < 25) {
    description = "It's pleasantly warm. Light, breathable clothing is ideal."
    baseItems = [
      { type: "top", name: "T-Shirt", description: "Light and breathable" },
      { type: "bottom", name: "Light Pants or Jeans", description: "Regular or lightweight" },
      { type: "footwear", name: "Sneakers or Loafers", description: "Comfortable shoes" },
    ]
    baseAccessories = []
  }
  // Hot (25-30°C)
  else if (temperature >= 25 && temperature < 30) {
    description = "It's hot today. Wear light, loose-fitting clothes to stay cool."
    baseItems = [
      { type: "top", name: "Short-Sleeve Shirt", description: "Lightweight and breathable" },
      { type: "bottom", name: "Shorts or Light Pants", description: "To keep cool" },
      { type: "footwear", name: "Sandals or Light Shoes", description: "Breathable footwear" },
    ]
    baseAccessories = [{ type: "head", name: "Sun Hat", description: "For sun protection" }]
  }
  // Very hot (30°C+)
  else {
    description = "It's very hot! Wear minimal, light clothing and stay hydrated."
    baseItems = [
      { type: "top", name: "Light T-Shirt or Tank Top", description: "The lighter the better" },
      { type: "bottom", name: "Shorts", description: "Light and airy" },
      { type: "footwear", name: "Sandals", description: "To keep feet cool" },
    ]
    baseAccessories = [
      { type: "head", name: "Sun Hat", description: "Essential for sun protection" },
      { type: "eyes", name: "Sunglasses", description: "To protect your eyes" },
    ]
  }

  // Weather condition modifiers
  let conditionItems: OutfitItem[] = []
  let conditionAccessories: OutfitItem[] = []
  let conditionDescription = ""

  switch (condition.toLowerCase()) {
    case "rain":
    case "drizzle":
    case "thunderstorm":
      conditionDescription = " Don't forget rain protection!"
      conditionItems = [
        { type: "outer", name: "Raincoat or Waterproof Jacket", description: "To stay dry" },
        { type: "footwear", name: "Waterproof Shoes", description: "To keep feet dry" },
      ]
      conditionAccessories = [{ type: "hand", name: "Umbrella", description: "For rain protection" }]
      break
    case "snow":
      conditionDescription = " Be prepared for snow and slippery conditions."
      conditionItems = [{ type: "footwear", name: "Waterproof Snow Boots", description: "With good traction" }]
      conditionAccessories = [{ type: "hands", name: "Waterproof Gloves", description: "To keep hands dry and warm" }]
      break
    case "clear":
      if (temperature > 20) {
        conditionDescription = " It's sunny, so protect yourself from the sun."
        conditionAccessories = [
          { type: "eyes", name: "Sunglasses", description: "UV protection" },
          { type: "skin", name: "Sunscreen", description: "SPF 30+ recommended" },
        ]
      }
      break
    case "mist":
    case "fog":
      conditionDescription = " Visibility might be low, wear visible colors."
      conditionAccessories = [
        { type: "visibility", name: "Bright or Reflective Items", description: "For better visibility" },
      ]
      break
  }

  // Time of day adjustments
  const timeOfDay = getTimeOfDay()
  let timeItems: OutfitItem[] = []
  let timeAccessories: OutfitItem[] = []
  let timeDescription = ""

  if (timeOfDay === "morning" || timeOfDay === "evening") {
    if (temperature < 20) {
      timeDescription = ` ${timeOfDay === "morning" ? "Morning" : "Evening"} temperatures might be cooler.`
      timeItems = [{ type: "outer", name: "Light Layer", description: "For temperature changes" }]
    }
  } else if (timeOfDay === "night") {
    timeDescription = " It's nighttime, so bring an extra layer for cooler temperatures."
    timeItems = [{ type: "outer", name: "Extra Layer", description: "For nighttime temperature drop" }]
    if (temperature < 15) {
      timeAccessories = [{ type: "visibility", name: "Reflective Item", description: "For visibility in the dark" }]
    }
  }

  // Combine all items and descriptions
  const finalDescription = description + conditionDescription + timeDescription
  const finalItems = [...baseItems, ...conditionItems, ...timeItems].filter(
    (item, index, self) => index === self.findIndex((t) => t.type === item.type && t.name === item.name),
  )
  const finalAccessories = [...baseAccessories, ...conditionAccessories, ...timeAccessories].filter(
    (item, index, self) => index === self.findIndex((t) => t.type === item.type && t.name === item.name),
  )

  return {
    description: finalDescription,
    items: finalItems,
    accessories: finalAccessories,
  }
}

// Function to get a simple text description for backward compatibility
export function getOutfitSuggestionText(temperature: number, condition: WeatherCondition): string {
  const suggestion = getOutfitSuggestion(temperature, condition)

  const itemsText = suggestion.items.map((item) => item.name).join(", ")
  const accessoriesText =
    suggestion.accessories.length > 0
      ? ` Accessories: ${suggestion.accessories.map((acc) => acc.name).join(", ")}.`
      : ""

  return `${suggestion.description} Wear: ${itemsText}.${accessoriesText}`
}
