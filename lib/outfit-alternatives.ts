interface OutfitAlternative {
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
  style: "casual" | "formal" | "sporty" | "trendy"
}

export function getOutfitAlternatives(temperature: number, weatherCondition: string): OutfitAlternative[] {
  const alternatives: OutfitAlternative[] = []

  // Very Cold Weather (Below 0°C)
  if (temperature < 0) {
    alternatives.push(
      {
        id: "winter-casual",
        name: "Winter Casual",
        description: "Warm and comfortable for freezing temperatures",
        items: [
          {
            type: "base",
            name: "Thermal Underwear",
            description: "Moisture-wicking base layer",
            alternatives: ["Merino wool base layer", "Synthetic thermal set", "Cotton long underwear"],
          },
          {
            type: "top",
            name: "Heavy Sweater",
            description: "Thick knit for insulation",
            alternatives: ["Wool pullover", "Fleece jacket", "Cashmere sweater", "Chunky cardigan"],
          },
          {
            type: "outer",
            name: "Winter Parka",
            description: "Insulated and windproof",
            alternatives: ["Down jacket", "Wool coat", "Puffer jacket", "Ski jacket"],
          },
          {
            type: "bottom",
            name: "Insulated Pants",
            description: "Warm and comfortable",
            alternatives: ["Thermal leggings + jeans", "Wool pants", "Fleece-lined pants", "Snow pants"],
          },
          {
            type: "footwear",
            name: "Winter Boots",
            description: "Waterproof and insulated",
            alternatives: ["Snow boots", "Insulated hiking boots", "Fur-lined boots", "Thermal rain boots"],
          },
        ],
        accessories: [
          {
            type: "head",
            name: "Winter Hat",
            description: "Covers ears completely",
            alternatives: ["Beanie", "Trapper hat", "Wool cap", "Fleece headband"],
          },
          {
            type: "hands",
            name: "Insulated Gloves",
            description: "Waterproof and warm",
            alternatives: ["Mittens", "Heated gloves", "Wool gloves", "Ski gloves"],
          },
          {
            type: "neck",
            name: "Thick Scarf",
            description: "Covers neck and face",
            alternatives: ["Neck warmer", "Balaclava", "Wool scarf", "Fleece neck gaiter"],
          },
        ],
        colors: {
          primary: ["Black", "Navy", "Charcoal", "Dark Brown"],
          secondary: ["Burgundy", "Forest Green", "Deep Purple", "Maroon"],
          accent: ["Red", "Orange", "Bright Blue", "Yellow"],
        },
        style: "casual",
      },
      {
        id: "winter-formal",
        name: "Winter Formal",
        description: "Professional look for cold weather",
        items: [
          {
            type: "base",
            name: "Dress Shirt",
            description: "Crisp and professional",
            alternatives: ["Button-down shirt", "Turtleneck", "Blouse", "Polo shirt"],
          },
          {
            type: "top",
            name: "Wool Blazer",
            description: "Structured and warm",
            alternatives: ["Suit jacket", "Cardigan", "Vest", "Sweater blazer"],
          },
          {
            type: "outer",
            name: "Wool Overcoat",
            description: "Classic and sophisticated",
            alternatives: ["Trench coat", "Peacoat", "Cashmere coat", "Long wool coat"],
          },
          {
            type: "bottom",
            name: "Dress Pants",
            description: "Tailored and warm",
            alternatives: ["Wool trousers", "Dress slacks", "Thermal-lined pants", "Suit pants"],
          },
          {
            type: "footwear",
            name: "Leather Boots",
            description: "Professional and warm",
            alternatives: ["Oxford shoes", "Dress boots", "Loafers", "Formal boots"],
          },
        ],
        accessories: [
          {
            type: "neck",
            name: "Silk Scarf",
            description: "Elegant and warm",
            alternatives: ["Wool scarf", "Cashmere scarf", "Tie", "Bow tie"],
          },
          {
            type: "hands",
            name: "Leather Gloves",
            description: "Professional appearance",
            alternatives: ["Wool gloves", "Cashmere gloves", "Driving gloves", "Dress gloves"],
          },
        ],
        colors: {
          primary: ["Black", "Navy", "Charcoal", "Dark Gray"],
          secondary: ["Burgundy", "Deep Blue", "Forest Green", "Brown"],
          accent: ["Silver", "Gold", "Deep Red", "Royal Blue"],
        },
        style: "formal",
      },
    )
  }
  // Cold Weather (0-10°C)
  else if (temperature >= 0 && temperature < 10) {
    alternatives.push(
      {
        id: "cold-casual",
        name: "Cold Weather Casual",
        description: "Comfortable layers for chilly days",
        items: [
          {
            type: "top",
            name: "Long-Sleeve Shirt",
            description: "Comfortable base layer",
            alternatives: ["Henley shirt", "Thermal top", "Cotton tee", "Flannel shirt"],
          },
          {
            type: "mid",
            name: "Sweater",
            description: "Warm middle layer",
            alternatives: ["Hoodie", "Cardigan", "Pullover", "Fleece jacket"],
          },
          {
            type: "outer",
            name: "Jacket",
            description: "Wind and cold protection",
            alternatives: ["Denim jacket", "Bomber jacket", "Windbreaker", "Light coat"],
          },
          {
            type: "bottom",
            name: "Jeans",
            description: "Sturdy and warm",
            alternatives: ["Chinos", "Corduroy pants", "Thermal leggings", "Cargo pants"],
          },
          {
            type: "footwear",
            name: "Sneakers",
            description: "Comfortable and versatile",
            alternatives: ["Boots", "Loafers", "High-tops", "Canvas shoes"],
          },
        ],
        accessories: [
          {
            type: "head",
            name: "Beanie",
            description: "Keeps head warm",
            alternatives: ["Baseball cap", "Knit hat", "Headband", "Beret"],
          },
          {
            type: "neck",
            name: "Light Scarf",
            description: "Added warmth",
            alternatives: ["Neck warmer", "Bandana", "Infinity scarf", "Lightweight wrap"],
          },
        ],
        colors: {
          primary: ["Navy", "Gray", "Black", "Brown"],
          secondary: ["Olive", "Burgundy", "Teal", "Rust"],
          accent: ["Orange", "Yellow", "Red", "Blue"],
        },
        style: "casual",
      },
      {
        id: "cold-sporty",
        name: "Cold Weather Athletic",
        description: "Active wear for cold conditions",
        items: [
          {
            type: "top",
            name: "Athletic Base Layer",
            description: "Moisture-wicking material",
            alternatives: [
              "Compression shirt",
              "Thermal athletic top",
              "Long-sleeve athletic tee",
              "Performance shirt",
            ],
          },
          {
            type: "mid",
            name: "Athletic Hoodie",
            description: "Warm and flexible",
            alternatives: ["Track jacket", "Fleece pullover", "Athletic sweater", "Zip-up hoodie"],
          },
          {
            type: "outer",
            name: "Athletic Jacket",
            description: "Weather-resistant",
            alternatives: ["Windbreaker", "Running jacket", "Softshell jacket", "Athletic vest"],
          },
          {
            type: "bottom",
            name: "Athletic Pants",
            description: "Flexible and warm",
            alternatives: ["Joggers", "Track pants", "Athletic leggings", "Sweatpants"],
          },
          {
            type: "footwear",
            name: "Athletic Shoes",
            description: "Supportive and comfortable",
            alternatives: ["Running shoes", "Cross-trainers", "High-top sneakers", "Athletic boots"],
          },
        ],
        accessories: [
          {
            type: "head",
            name: "Athletic Beanie",
            description: "Moisture-wicking headwear",
            alternatives: ["Sports cap", "Headband", "Thermal hat", "Athletic visor"],
          },
          {
            type: "hands",
            name: "Athletic Gloves",
            description: "Grip and warmth",
            alternatives: ["Running gloves", "Workout gloves", "Thermal gloves", "Fingerless gloves"],
          },
        ],
        colors: {
          primary: ["Black", "Navy", "Gray", "Dark Blue"],
          secondary: ["Red", "Green", "Purple", "Orange"],
          accent: ["Neon Yellow", "Bright Blue", "Hot Pink", "Electric Green"],
        },
        style: "sporty",
      },
    )
  }
  // Mild Weather (10-20°C)
  else if (temperature >= 10 && temperature < 20) {
    alternatives.push(
      {
        id: "mild-casual",
        name: "Mild Weather Casual",
        description: "Perfect for comfortable spring/fall days",
        items: [
          {
            type: "top",
            name: "T-Shirt",
            description: "Comfortable and breathable",
            alternatives: ["Long-sleeve tee", "Polo shirt", "Tank top", "Henley"],
          },
          {
            type: "outer",
            name: "Light Cardigan",
            description: "Easy to remove if warm",
            alternatives: ["Light jacket", "Denim jacket", "Blazer", "Zip-up hoodie"],
          },
          {
            type: "bottom",
            name: "Jeans",
            description: "Classic and versatile",
            alternatives: ["Chinos", "Khakis", "Casual pants", "Denim shorts"],
          },
          {
            type: "footwear",
            name: "Sneakers",
            description: "Comfortable for walking",
            alternatives: ["Loafers", "Canvas shoes", "Boat shoes", "Casual boots"],
          },
        ],
        accessories: [
          {
            type: "eyes",
            name: "Sunglasses",
            description: "For sunny moments",
            alternatives: ["Reading glasses", "Blue light glasses", "Fashion glasses", "Sports sunglasses"],
          },
        ],
        colors: {
          primary: ["Blue", "Gray", "White", "Khaki"],
          secondary: ["Green", "Purple", "Teal", "Coral"],
          accent: ["Yellow", "Orange", "Pink", "Turquoise"],
        },
        style: "casual",
      },
      {
        id: "mild-trendy",
        name: "Mild Weather Trendy",
        description: "Fashion-forward for pleasant weather",
        items: [
          {
            type: "top",
            name: "Stylish Blouse",
            description: "Trendy and comfortable",
            alternatives: ["Crop top", "Off-shoulder top", "Graphic tee", "Vintage shirt"],
          },
          {
            type: "outer",
            name: "Trendy Jacket",
            description: "Statement piece",
            alternatives: ["Leather jacket", "Bomber jacket", "Oversized blazer", "Kimono"],
          },
          {
            type: "bottom",
            name: "Fashionable Pants",
            description: "On-trend bottoms",
            alternatives: ["High-waisted jeans", "Wide-leg pants", "Culottes", "Palazzo pants"],
          },
          {
            type: "footwear",
            name: "Trendy Shoes",
            description: "Fashion-forward footwear",
            alternatives: ["Platform sneakers", "Ankle boots", "Espadrilles", "Fashion sneakers"],
          },
        ],
        accessories: [
          {
            type: "jewelry",
            name: "Statement Jewelry",
            description: "Eye-catching accessories",
            alternatives: ["Layered necklaces", "Bold earrings", "Stacked bracelets", "Statement rings"],
          },
          {
            type: "bag",
            name: "Trendy Bag",
            description: "Fashionable and functional",
            alternatives: ["Crossbody bag", "Tote bag", "Backpack", "Belt bag"],
          },
        ],
        colors: {
          primary: ["White", "Black", "Beige", "Denim Blue"],
          secondary: ["Sage Green", "Dusty Pink", "Lavender", "Terracotta"],
          accent: ["Gold", "Rose Gold", "Coral", "Mint"],
        },
        style: "trendy",
      },
    )
  }
  // Warm Weather (20-30°C)
  else if (temperature >= 20 && temperature < 30) {
    alternatives.push(
      {
        id: "warm-casual",
        name: "Warm Weather Casual",
        description: "Light and breezy for warm days",
        items: [
          {
            type: "top",
            name: "Light T-Shirt",
            description: "Breathable and comfortable",
            alternatives: ["Tank top", "Sleeveless blouse", "Linen shirt", "Cotton tee"],
          },
          {
            type: "bottom",
            name: "Shorts",
            description: "Cool and comfortable",
            alternatives: ["Linen pants", "Capri pants", "Skirt", "Light jeans"],
          },
          {
            type: "footwear",
            name: "Sandals",
            description: "Breathable footwear",
            alternatives: ["Canvas sneakers", "Flip-flops", "Espadrilles", "Boat shoes"],
          },
        ],
        accessories: [
          {
            type: "head",
            name: "Sun Hat",
            description: "Protection from sun",
            alternatives: ["Baseball cap", "Visor", "Bucket hat", "Wide-brim hat"],
          },
          {
            type: "eyes",
            name: "Sunglasses",
            description: "UV protection",
            alternatives: ["Polarized sunglasses", "Fashion sunglasses", "Sport sunglasses", "Vintage frames"],
          },
        ],
        colors: {
          primary: ["White", "Light Blue", "Beige", "Khaki"],
          secondary: ["Coral", "Mint", "Lavender", "Peach"],
          accent: ["Bright Yellow", "Turquoise", "Hot Pink", "Lime Green"],
        },
        style: "casual",
      },
      {
        id: "warm-beach",
        name: "Beach/Resort Style",
        description: "Perfect for vacation or beach days",
        items: [
          {
            type: "top",
            name: "Flowy Top",
            description: "Light and airy",
            alternatives: ["Beach cover-up", "Kimono", "Camisole", "Halter top"],
          },
          {
            type: "bottom",
            name: "Flowy Shorts",
            description: "Comfortable and breezy",
            alternatives: ["Maxi skirt", "Beach pants", "Sarong", "Palazzo shorts"],
          },
          {
            type: "footwear",
            name: "Beach Sandals",
            description: "Easy to slip on/off",
            alternatives: ["Flip-flops", "Water shoes", "Espadrilles", "Barefoot"],
          },
        ],
        accessories: [
          {
            type: "head",
            name: "Wide-Brim Hat",
            description: "Maximum sun protection",
            alternatives: ["Straw hat", "Floppy hat", "Sun visor", "Bandana"],
          },
          {
            type: "bag",
            name: "Beach Bag",
            description: "Large and practical",
            alternatives: ["Tote bag", "Mesh bag", "Waterproof bag", "Straw bag"],
          },
        ],
        colors: {
          primary: ["White", "Cream", "Light Blue", "Sand"],
          secondary: ["Coral", "Aqua", "Sunset Orange", "Shell Pink"],
          accent: ["Tropical Green", "Ocean Blue", "Sunset Yellow", "Flamingo Pink"],
        },
        style: "casual",
      },
    )
  }
  // Hot Weather (30°C+)
  else {
    alternatives.push({
      id: "hot-minimal",
      name: "Hot Weather Minimal",
      description: "Minimal clothing for maximum cooling",
      items: [
        {
          type: "top",
          name: "Tank Top",
          description: "Maximum breathability",
          alternatives: ["Sleeveless shirt", "Crop top", "Tube top", "Bandeau"],
        },
        {
          type: "bottom",
          name: "Light Shorts",
          description: "Minimal coverage",
          alternatives: ["Mini skirt", "Hot pants", "Bike shorts", "Board shorts"],
        },
        {
          type: "footwear",
          name: "Minimal Sandals",
          description: "Barely there footwear",
          alternatives: ["Flip-flops", "Slides", "Water shoes", "Barefoot"],
        },
      ],
      accessories: [
        {
          type: "head",
          name: "Sun Protection",
          description: "Essential for hot sun",
          alternatives: ["Wide-brim hat", "Baseball cap", "Visor", "UV umbrella"],
        },
        {
          type: "skin",
          name: "Sunscreen",
          description: "SPF 50+ recommended",
          alternatives: ["Zinc oxide", "Mineral sunscreen", "Spray sunscreen", "Tinted sunscreen"],
        },
      ],
      colors: {
        primary: ["White", "Ice Blue", "Pale Yellow", "Mint"],
        secondary: ["Light Pink", "Powder Blue", "Cream", "Pale Green"],
        accent: ["Bright White", "Silver", "Light Gold", "Crystal Blue"],
      },
      style: "casual",
    })
  }

  // Weather-specific modifications
  if (weatherCondition.toLowerCase().includes("rain")) {
    alternatives.forEach((alt) => {
      alt.items.push({
        type: "rain",
        name: "Rain Protection",
        description: "Stay dry in wet weather",
        alternatives: ["Raincoat", "Waterproof jacket", "Poncho", "Umbrella"],
      })
      alt.accessories.push({
        type: "feet",
        name: "Waterproof Footwear",
        description: "Keep feet dry",
        alternatives: ["Rain boots", "Waterproof shoes", "Galoshes", "Water-resistant sneakers"],
      })
    })
  }

  if (weatherCondition.toLowerCase().includes("snow")) {
    alternatives.forEach((alt) => {
      alt.accessories.push({
        type: "traction",
        name: "Snow Gear",
        description: "Safety in snow",
        alternatives: ["Snow boots", "Ice grips", "Thermal socks", "Waterproof gloves"],
      })
    })
  }

  return alternatives
}
