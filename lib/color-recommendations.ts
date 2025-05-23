type ColorPalette = {
  name: string
  hex: string
  isNeutral?: boolean
}

type OutfitColors = {
  tops: ColorPalette[]
  bottoms: ColorPalette[]
  combinations: {
    top: ColorPalette
    bottom: ColorPalette
    description: string
  }[]
}

// Color palettes organized by category and climate appropriateness
const colorPalettes = {
  // Warm colors - good for cold weather
  warm: [
    { name: "Burgundy", hex: "#800020" },
    { name: "Rust", hex: "#B7410E" },
    { name: "Mustard", hex: "#E1AD01" },
    { name: "Terracotta", hex: "#C66B3D" },
    { name: "Olive", hex: "#708238" },
    { name: "Camel", hex: "#C19A6B" },
    { name: "Chocolate", hex: "#7B3F00" },
    { name: "Cinnamon", hex: "#D2691E" },
  ],
  // Cool colors - versatile for many weather conditions
  cool: [
    { name: "Navy", hex: "#000080" },
    { name: "Teal", hex: "#008080" },
    { name: "Forest Green", hex: "#228B22" },
    { name: "Slate Blue", hex: "#6A5ACD" },
    { name: "Plum", hex: "#8E4585" },
    { name: "Emerald", hex: "#046307" },
    { name: "Indigo", hex: "#4B0082" },
    { name: "Cobalt", hex: "#0047AB" },
  ],
  // Light colors - good for hot weather
  light: [
    { name: "Sky Blue", hex: "#87CEEB" },
    { name: "Mint", hex: "#98FB98" },
    { name: "Lavender", hex: "#E6E6FA" },
    { name: "Peach", hex: "#FFDAB9" },
    { name: "Light Yellow", hex: "#FFFFE0" },
    { name: "Powder Blue", hex: "#B0E0E6" },
    { name: "Pale Pink", hex: "#FADADD" },
    { name: "Ivory", hex: "#FFFFF0" },
  ],
  // Bright colors - good for clear days
  bright: [
    { name: "Coral", hex: "#FF7F50" },
    { name: "Turquoise", hex: "#40E0D0" },
    { name: "Hot Pink", hex: "#FF69B4" },
    { name: "Lime Green", hex: "#32CD32" },
    { name: "Bright Yellow", hex: "#FFFF00" },
    { name: "Electric Blue", hex: "#7DF9FF" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Tangerine", hex: "#F28500" },
  ],
  // Neutral colors - versatile for all conditions
  neutral: [
    { name: "Black", hex: "#000000", isNeutral: true },
    { name: "White", hex: "#FFFFFF", isNeutral: true },
    { name: "Gray", hex: "#808080", isNeutral: true },
    { name: "Beige", hex: "#F5F5DC", isNeutral: true },
    { name: "Khaki", hex: "#C3B091", isNeutral: true },
    { name: "Charcoal", hex: "#36454F", isNeutral: true },
    { name: "Cream", hex: "#FFFDD0", isNeutral: true },
    { name: "Navy", hex: "#000080", isNeutral: true },
  ],
  // Muted colors - good for cloudy days
  muted: [
    { name: "Sage", hex: "#BCB88A" },
    { name: "Mauve", hex: "#E0B0FF" },
    { name: "Dusty Blue", hex: "#8A9A9A" },
    { name: "Taupe", hex: "#483C32" },
    { name: "Dusty Rose", hex: "#DCAE96" },
    { name: "Slate Gray", hex: "#708090" },
    { name: "Muted Teal", hex: "#66CDAA" },
    { name: "Faded Denim", hex: "#6F8FAF" },
  ],
  // Dark colors - good for evening or formal occasions
  dark: [
    { name: "Maroon", hex: "#800000" },
    { name: "Deep Purple", hex: "#301934" },
    { name: "Hunter Green", hex: "#355E3B" },
    { name: "Midnight Blue", hex: "#191970" },
    { name: "Espresso", hex: "#3C2414" },
    { name: "Eggplant", hex: "#614051" },
    { name: "Charcoal Gray", hex: "#36454F" },
    { name: "Deep Teal", hex: "#004D4D" },
  ],
}

// Helper function to get random items from an array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Helper function to create color combinations
function createCombinations(tops: ColorPalette[], bottoms: ColorPalette[], count = 4) {
  const combinations = []
  const allTops = [...tops]
  const allBottoms = [...bottoms]

  // Add some neutral options if not already included
  const neutralTops = colorPalettes.neutral.filter((color) => !tops.some((top) => top.name === color.name))
  const neutralBottoms = colorPalettes.neutral.filter((color) => !bottoms.some((bottom) => bottom.name === color.name))

  allTops.push(...getRandomItems(neutralTops, 2))
  allBottoms.push(...getRandomItems(neutralBottoms, 2))

  // Create combinations
  for (let i = 0; i < count; i++) {
    const top = allTops[i % allTops.length]
    const bottom = allBottoms[(i + 1) % allBottoms.length]

    let description = ""
    if (top.isNeutral && !bottom.isNeutral) {
      description = `A ${top.name.toLowerCase()} top pairs well with ${bottom.name.toLowerCase()} bottoms for a balanced look.`
    } else if (!top.isNeutral && bottom.isNeutral) {
      description = `The ${top.name.toLowerCase()} top creates a focal point against ${bottom.name.toLowerCase()} bottoms.`
    } else {
      description = `${top.name} and ${bottom.name} create a harmonious color combination.`
    }

    combinations.push({ top, bottom, description })
  }

  return combinations
}

export function getTimeOfDay(): "morning" | "afternoon" | "evening" {
  const hour = new Date().getHours()
  if (hour < 12) return "morning"
  if (hour < 18) return "afternoon"
  return "evening"
}

export function getColorRecommendations(
  temperature: number,
  weatherCondition: string,
  timeOfDay: "morning" | "afternoon" | "evening" = "afternoon",
): OutfitColors {
  // Base color selection on weather and temperature
  let topColors: ColorPalette[] = []
  let bottomColors: ColorPalette[] = []

  // Temperature-based recommendations
  if (temperature < 0) {
    // Very cold - warm, dark colors
    topColors = getRandomItems([...colorPalettes.warm, ...colorPalettes.dark], 4)
    bottomColors = getRandomItems([...colorPalettes.neutral, ...colorPalettes.dark], 4)
  } else if (temperature >= 0 && temperature < 10) {
    // Cold - warm colors and neutrals
    topColors = getRandomItems([...colorPalettes.warm, ...colorPalettes.cool], 4)
    bottomColors = getRandomItems([...colorPalettes.neutral, ...colorPalettes.dark], 4)
  } else if (temperature >= 10 && temperature < 15) {
    // Cool - mix of warm and cool colors
    topColors = getRandomItems([...colorPalettes.cool, ...colorPalettes.muted], 4)
    bottomColors = getRandomItems([...colorPalettes.neutral, ...colorPalettes.cool], 4)
  } else if (temperature >= 15 && temperature < 20) {
    // Mild - balanced palette
    topColors = getRandomItems([...colorPalettes.cool, ...colorPalettes.muted, ...colorPalettes.bright], 4)
    bottomColors = getRandomItems([...colorPalettes.neutral, ...colorPalettes.cool], 4)
  } else if (temperature >= 20 && temperature < 25) {
    // Warm - lighter colors
    topColors = getRandomItems([...colorPalettes.light, ...colorPalettes.bright], 4)
    bottomColors = getRandomItems([...colorPalettes.neutral, ...colorPalettes.light], 4)
  } else if (temperature >= 25 && temperature < 30) {
    // Hot - light and bright colors
    topColors = getRandomItems([...colorPalettes.light, ...colorPalettes.bright], 4)
    bottomColors = getRandomItems([...colorPalettes.light, ...colorPalettes.neutral], 4)
  } else {
    // Very hot - very light colors
    topColors = getRandomItems([...colorPalettes.light], 4)
    bottomColors = getRandomItems([...colorPalettes.light, ...colorPalettes.neutral], 4)
  }

  // Weather condition adjustments
  switch (weatherCondition.toLowerCase()) {
    case "clear":
      // Bright, sunny day - add some bright colors
      topColors = [...topColors, ...getRandomItems(colorPalettes.bright, 2)]
      break
    case "clouds":
      // Cloudy day - add some muted and cool tones
      topColors = [...topColors, ...getRandomItems(colorPalettes.muted, 2)]
      break
    case "rain":
    case "drizzle":
      // Rainy day - cool and muted colors
      topColors = [...topColors, ...getRandomItems(colorPalettes.cool, 2)]
      bottomColors = [...bottomColors, ...getRandomItems(colorPalettes.dark, 2)]
      break
    case "snow":
      // Snowy day - cool colors and whites
      topColors = [...topColors, ...getRandomItems(colorPalettes.cool, 2)]
      bottomColors = [...bottomColors, ...getRandomItems(colorPalettes.dark, 2)]
      break
    case "thunderstorm":
      // Dramatic weather - dramatic colors
      topColors = [...topColors, ...getRandomItems(colorPalettes.dark, 2)]
      bottomColors = [...bottomColors, ...getRandomItems(colorPalettes.dark, 2)]
      break
  }

  // Time of day adjustments
  if (timeOfDay === "morning") {
    // Brighter colors for morning
    topColors = [...topColors, ...getRandomItems(colorPalettes.bright, 1)]
  } else if (timeOfDay === "evening") {
    // Deeper colors for evening
    topColors = [...topColors, ...getRandomItems(colorPalettes.dark, 1)]
  }

  // Remove duplicates
  topColors = topColors.filter((color, index, self) => index === self.findIndex((c) => c.name === color.name))
  bottomColors = bottomColors.filter((color, index, self) => index === self.findIndex((c) => c.name === color.name))

  // Create outfit combinations
  const combinations = createCombinations(topColors, bottomColors)

  return {
    tops: topColors.slice(0, 6),
    bottoms: bottomColors.slice(0, 6),
    combinations: combinations.slice(0, 4),
  }
}
