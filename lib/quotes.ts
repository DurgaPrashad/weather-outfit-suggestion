type WeatherQuote = {
  text: string
  author: string
}

const weatherQuotes: Record<string, WeatherQuote[]> = {
  Clear: [
    {
      text: "Wherever you go, no matter what the weather, always bring your own sunshine.",
      author: "Anthony J. D'Angelo",
    },
    { text: "A sunny day is a happy day.", author: "Anonymous" },
    { text: "Keep your face always toward the sunshine, and shadows will fall behind you.", author: "Walt Whitman" },
  ],
  Clouds: [
    {
      text: "Clouds come floating into my life, no longer to carry rain or usher storm, but to add color to my sunset sky.",
      author: "Rabindranath Tagore",
    },
    { text: "The sky and the clouds are always changing, so enjoy the view.", author: "Anonymous" },
    { text: "Even when clouds grow thick, the sun still pours its light earthward.", author: "Mark Nepo" },
  ],
  Rain: [
    { text: "Some people feel the rain. Others just get wet.", author: "Bob Marley" },
    {
      text: "Let the rain kiss you. Let the rain beat upon your head with silver liquid drops.",
      author: "Langston Hughes",
    },
    { text: "The best thing one can do when it's raining is to let it rain.", author: "Henry Wadsworth Longfellow" },
  ],
  Snow: [
    {
      text: "Snowflakes are one of nature's most fragile things, but just look what they can do when they stick together.",
      author: "Vista M. Kelly",
    },
    { text: "When snow falls, nature listens.", author: "Antoinette van Kleeff" },
    { text: "To appreciate the beauty of a snowflake it is necessary to stand out in the cold.", author: "Aristotle" },
  ],
  Thunderstorm: [
    { text: "The sound of thunder reminds us that we are not in control.", author: "Anonymous" },
    {
      text: "Life isn't about waiting for the storm to pass, it's about learning to dance in the rain.",
      author: "Vivian Greene",
    },
    { text: "Thunderstorms are as much our friends as the sunshine.", author: "Criss Jami" },
  ],
  default: [
    {
      text: "Wherever you go, no matter what the weather, always bring your own sunshine.",
      author: "Anthony J. D'Angelo",
    },
    {
      text: "Weather is a great metaphor for life — sometimes it's good, sometimes it's bad, and there's nothing much you can do about it but carry an umbrella.",
      author: "Terri Guillemets",
    },
    { text: "Climate is what we expect, weather is what we get.", author: "Mark Twain" },
  ],
}

export function getRandomQuote(weatherCondition: string): WeatherQuote {
  const condition = weatherCondition as keyof typeof weatherQuotes
  const quotes = weatherQuotes[condition] || weatherQuotes.default
  return quotes[Math.floor(Math.random() * quotes.length)]
}
