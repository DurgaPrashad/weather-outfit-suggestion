"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Cloud,
  CloudRain,
  Droplets,
  Loader2,
  MapPin,
  Search,
  Sun,
  Umbrella,
  Wind,
  Thermometer,
  Palette,
  Shirt,
  AlertCircle,
  Sparkles,
} from "lucide-react"
import { fetchWeather, fetchWeatherByCoords } from "@/lib/weather-service"
import { getRandomQuote } from "@/lib/quotes"
import { getOutfitAlternatives } from "@/lib/outfit-alternatives"
import { OutfitAlternativeCard } from "@/components/outfit-alternative-card"
import { DetailedOutfitView } from "@/components/detailed-outfit-view"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Home() {
  const [city, setCity] = useState("")
  const [savedCity, setSavedCity] = useState("")
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [outfitAlternatives, setOutfitAlternatives] = useState<any[]>([])
  const [selectedAlternative, setSelectedAlternative] = useState<any>(null)
  const [quote, setQuote] = useState({ text: "", author: "" })
  const [usingGeolocation, setUsingGeolocation] = useState(false)
  const [activeTab, setActiveTab] = useState("alternatives")

  useEffect(() => {
    // Try to get user's location first
    if (navigator.geolocation) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByLocation(position.coords.latitude, position.coords.longitude)
          setUsingGeolocation(true)
        },
        (error) => {
          console.log("Geolocation error, using default city")
          loadDefaultCity()
        },
        { timeout: 8000, enableHighAccuracy: false },
      )
    } else {
      loadDefaultCity()
    }
  }, [])

  const loadDefaultCity = () => {
    const storedCity = localStorage.getItem("weatherCity")
    const defaultCity = storedCity || "London"
    setSavedCity(defaultCity)
    setCity(defaultCity)
    fetchWeatherData(defaultCity)
  }

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    setLoading(true)
    setError("")

    try {
      const weatherData = await fetchWeatherByCoords(lat, lon)
      processWeatherData(weatherData)
      setUsingGeolocation(true)
    } catch (err: any) {
      console.error("Error in fetchWeatherByLocation:", err)
      setError("Using default weather data for demonstration.")
      loadDefaultCity()
    } finally {
      setLoading(false)
    }
  }

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true)
    setError("")

    try {
      const weatherData = await fetchWeather(cityName)
      processWeatherData(weatherData)

      // Save city to localStorage
      localStorage.setItem("weatherCity", cityName)
      setSavedCity(cityName)
    } catch (err: any) {
      console.error("Error in fetchWeatherData:", err)
      setError("Using sample weather data for demonstration.")

      // Use sample data to ensure the app always works
      const sampleWeather = {
        name: cityName,
        sys: { country: "XX" },
        main: { temp: 18, feels_like: 16, humidity: 65, pressure: 1013 },
        weather: [{ main: "Clear", description: "clear sky" }],
        wind: { speed: 2.5 },
      }
      processWeatherData(sampleWeather)
    } finally {
      setLoading(false)
    }
  }

  const processWeatherData = (weatherData: any) => {
    setWeather(weatherData)
    setSavedCity(weatherData.name)
    setCity(weatherData.name)

    // Generate outfit alternatives based on weather
    const alternatives = getOutfitAlternatives(weatherData.main.temp, weatherData.weather[0].main)
    setOutfitAlternatives(alternatives)
    setSelectedAlternative(alternatives[0] || null)

    // Get a random quote based on weather condition
    setQuote(getRandomQuote(weatherData.weather[0].main))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      fetchWeatherData(city)
      setUsingGeolocation(false)
    }
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-8 w-8 sm:h-12 sm:w-12 text-amber-500" />
      case "clouds":
        return <Cloud className="h-8 w-8 sm:h-12 sm:w-12 text-slate-500" />
      case "rain":
      case "drizzle":
        return <CloudRain className="h-8 w-8 sm:h-12 sm:w-12 text-cyan-500" />
      case "thunderstorm":
        return <Umbrella className="h-8 w-8 sm:h-12 sm:w-12 text-indigo-500" />
      case "snow":
        return <Droplets className="h-8 w-8 sm:h-12 sm:w-12 text-sky-200" />
      default:
        return <Cloud className="h-8 w-8 sm:h-12 sm:w-12 text-slate-400" />
    }
  }

  const getBackgroundGradient = (condition: string) => {
    if (!condition) return "from-sky-50 to-white"

    switch (condition.toLowerCase()) {
      case "clear":
        return "from-amber-50 via-orange-50 to-sky-100"
      case "clouds":
        return "from-slate-100 via-gray-50 to-slate-50"
      case "rain":
      case "drizzle":
        return "from-cyan-50 via-blue-50 to-slate-100"
      case "thunderstorm":
        return "from-indigo-100 via-purple-50 to-slate-200"
      case "snow":
        return "from-blue-50 via-sky-50 to-slate-50"
      default:
        return "from-sky-50 to-white"
    }
  }

  const getCardBorderColor = (condition: string) => {
    if (!condition) return "border-t-sky-400"

    switch (condition.toLowerCase()) {
      case "clear":
        return "border-t-amber-400"
      case "clouds":
        return "border-t-slate-400"
      case "rain":
        return "border-t-cyan-400"
      case "thunderstorm":
        return "border-t-indigo-400"
      case "snow":
        return "border-t-sky-300"
      default:
        return "border-t-sky-400"
    }
  }

  return (
    <main
      className={`min-h-screen bg-gradient-to-br ${weather ? getBackgroundGradient(weather.weather[0].main) : "from-sky-50 to-white"} p-2 sm:p-4`}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500" />
            What to Wear Today?
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500" />
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Get personalized outfit suggestions based on your local weather
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-4 sm:mb-8">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 text-sm sm:text-base"
            />
            <Button type="submit" disabled={loading} className="bg-sky-600 hover:bg-sky-700 px-3 sm:px-4">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </form>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="max-w-md mx-auto mb-4 sm:mb-8">
            <Alert variant="default" className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">Notice</AlertTitle>
              <AlertDescription className="text-amber-700">{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Weather Card */}
        {weather && (
          <div className="max-w-4xl mx-auto mb-4 sm:mb-8">
            <Card className={`shadow-lg border-t-4 ${getCardBorderColor(weather.weather[0].main)}`}>
              <CardHeader className="pb-2 sm:pb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <div>
                    <CardTitle className="text-lg sm:text-xl flex items-center flex-wrap gap-1 sm:gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {weather.name}, {weather.sys.country}
                      </span>
                      {usingGeolocation && (
                        <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                          Current Location
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </div>
                  <div className="flex justify-center sm:justify-end">{getWeatherIcon(weather.weather[0].main)}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="text-3xl sm:text-4xl font-bold">{Math.round(weather.main.temp)}°C</div>
                    <div className="text-gray-600 text-center sm:text-right">
                      <div className="text-sm sm:text-base">
                        {weather.weather[0].description.charAt(0).toUpperCase() +
                          weather.weather[0].description.slice(1)}
                      </div>
                      <div className="text-xs sm:text-sm">Feels like {Math.round(weather.main.feels_like)}°C</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="bg-sky-50 p-2 sm:p-3 rounded-md flex flex-col items-center">
                      <Wind className="h-3 w-3 sm:h-4 sm:w-4 text-sky-600 mb-1" />
                      <span className="text-xs text-gray-500">Wind</span>
                      <span className="text-xs sm:text-sm font-medium">{Math.round(weather.wind.speed)} m/s</span>
                    </div>
                    <div className="bg-sky-50 p-2 sm:p-3 rounded-md flex flex-col items-center">
                      <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-sky-600 mb-1" />
                      <span className="text-xs text-gray-500">Humidity</span>
                      <span className="text-xs sm:text-sm font-medium">{weather.main.humidity}%</span>
                    </div>
                    <div className="bg-sky-50 p-2 sm:p-3 rounded-md flex flex-col items-center">
                      <Thermometer className="h-3 w-3 sm:h-4 sm:w-4 text-sky-600 mb-1" />
                      <span className="text-xs text-gray-500">Pressure</span>
                      <span className="text-xs sm:text-sm font-medium">{weather.main.pressure} hPa</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 italic text-xs sm:text-sm text-gray-600 rounded-b-lg">
                <div className="w-full text-center">
                  <p>"{quote.text}"</p>
                  <p className="text-xs mt-1">— {quote.author}</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Outfit Suggestions */}
        {outfitAlternatives.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
                <TabsTrigger value="alternatives" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Shirt className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Outfit</span> Options
                </TabsTrigger>
                <TabsTrigger value="detailed" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Palette className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Detailed</span> View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="alternatives" className="mt-0">
                <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {outfitAlternatives.map((alternative, index) => (
                    <OutfitAlternativeCard
                      key={alternative.id}
                      alternative={alternative}
                      isActive={selectedAlternative?.id === alternative.id}
                      onClick={() => {
                        setSelectedAlternative(alternative)
                        setActiveTab("detailed")
                      }}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="mt-0">
                {selectedAlternative ? (
                  <DetailedOutfitView alternative={selectedAlternative} />
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-500 text-sm sm:text-base">
                      Select an outfit option to see detailed recommendations
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {!weather && !loading && (
          <div className="text-center text-gray-500 mt-8 sm:mt-12">
            <p className="text-sm sm:text-base">Enter your city to get personalized outfit suggestions</p>
          </div>
        )}
      </div>
    </main>
  )
}
