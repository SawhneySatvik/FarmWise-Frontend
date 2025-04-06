import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, Droplets, Wind, Thermometer } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function WeatherSection() {
  const forecast = [
    {
      day: "Today",
      condition: "Sunny",
      temperature: 30,
      icon: <Sun className="h-10 w-10 text-yellow-500" />,
      humidity: "65%",
      wind: "10 km/h",
      precipitation: "0%",
    },
    {
      day: "Tomorrow",
      condition: "Partly Cloudy",
      temperature: 28,
      icon: <Cloud className="h-10 w-10 text-muted-foreground" />,
      humidity: "70%",
      wind: "12 km/h",
      precipitation: "10%",
    },
    {
      day: "Wednesday",
      condition: "Rain",
      temperature: 26,
      icon: <CloudRain className="h-10 w-10 text-blue-500" />,
      humidity: "85%",
      wind: "15 km/h",
      precipitation: "60%",
    },
    {
      day: "Thursday",
      condition: "Sunny",
      temperature: 29,
      icon: <Sun className="h-10 w-10 text-yellow-500" />,
      humidity: "60%",
      wind: "8 km/h",
      precipitation: "0%",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-sm overflow-hidden">
        <div className="bg-primary text-primary-foreground p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">{forecast[0].temperature}°C</h2>
              <p className="text-primary-foreground/80">{forecast[0].condition}</p>
              <p className="text-primary-foreground/80 text-sm mt-1">Today</p>
            </div>
            <div className="text-center">{forecast[0].icon}</div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2">
              <div className="flex justify-center mb-1">
                <Droplets className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-medium">{forecast[0].humidity}</p>
            </div>
            <div className="p-2">
              <div className="flex justify-center mb-1">
                <Wind className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-medium">{forecast[0].wind}</p>
            </div>
            <div className="p-2">
              <div className="flex justify-center mb-1">
                <CloudRain className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <p className="text-sm text-muted-foreground">Precipitation</p>
              <p className="font-medium">{forecast[0].precipitation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">3-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-1">
              {forecast.slice(1).map((day, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-accent transition-colors min-w-[150px]"
                >
                  <p className="font-medium text-foreground">{day.day}</p>
                  <div className="flex justify-center my-3">{day.icon}</div>
                  <p className="text-2xl font-bold">{day.temperature}°C</p>
                  <p className="text-sm text-muted-foreground">{day.condition}</p>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Weather Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-amber-100 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="bg-amber-200 dark:bg-amber-800 p-2 rounded-full">
                <Thermometer className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">Heat Advisory</p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  High temperatures expected over the next 48 hours. Ensure proper hydration for crops and livestock.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Farming Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 p-3 border border-primary/20 rounded-lg bg-primary/5">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground mt-0.5">
                1
              </div>
              <p className="text-foreground">
                Consider early morning irrigation to minimize water loss due to evaporation.
              </p>
            </li>
            <li className="flex items-start gap-3 p-3 border border-primary/20 rounded-lg bg-primary/5">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground mt-0.5">
                2
              </div>
              <p className="text-foreground">Apply mulch to retain soil moisture during the hot days ahead.</p>
            </li>
            <li className="flex items-start gap-3 p-3 border border-primary/20 rounded-lg bg-primary/5">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground mt-0.5">
                3
              </div>
              <p className="text-foreground">
                Monitor for heat stress in livestock and provide adequate shade and water.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

