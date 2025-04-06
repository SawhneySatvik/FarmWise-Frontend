import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Minus, DollarSign, BarChart, LineChart, ArrowUpRight } from "lucide-react"

export default function MarketSection() {
  const cropPrices = [
    { crop: "Rice", price: 0.6, trend: "up", change: "+5%", image: "🌾" },
    { crop: "Maize", price: 0.5, trend: "down", change: "-3%", image: "🌽" },
    { crop: "Wheat", price: 0.75, trend: "stable", change: "0%", image: "🌾" },
    { crop: "Soybeans", price: 0.85, trend: "up", change: "+2%", image: "🫘" },
    { crop: "Cotton", price: 1.2, trend: "down", change: "-1%", image: "🧶" },
    { crop: "Sugarcane", price: 0.3, trend: "up", change: "+4%", image: "🍬" },
  ]

  const livestockPrices = [
    { animal: "Cattle", price: 2.5, trend: "up", change: "+3%", image: "🐄" },
    { animal: "Goat", price: 3.2, trend: "stable", change: "0%", image: "🐐" },
    { animal: "Chicken", price: 1.8, trend: "down", change: "-2%", image: "🐓" },
    { animal: "Sheep", price: 2.9, trend: "up", change: "+1%", image: "🐑" },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "down":
        return <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
      case "stable":
        return <Minus className="h-5 w-5 text-muted-foreground" />
      default:
        return null
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600 dark:text-green-400"
      case "down":
        return "text-red-600 dark:text-red-400"
      case "stable":
        return "text-muted-foreground"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-sm overflow-hidden">
        <div className="bg-primary text-primary-foreground p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold mb-2">Market Overview</h2>
          <p className="text-primary-foreground/80">
            Today's market shows strong prices for rice and soybeans. Consider selling these crops if you have stock.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-primary-foreground/60" />
            <span className="text-primary-foreground/60">Updated 30 minutes ago</span>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="crops" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="crops" className="text-base">
            Crops
          </TabsTrigger>
          <TabsTrigger value="livestock" className="text-base">
            Livestock
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crops">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Current Crop Prices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cropPrices.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.image}</span>
                      <span className="font-medium text-foreground">{item.crop}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-green-700 dark:text-green-400 font-bold">${item.price.toFixed(2)}/kg</span>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(item.trend)}
                        <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>{item.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="livestock">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Current Livestock Prices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {livestockPrices.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.image}</span>
                      <span className="font-medium text-foreground">{item.animal}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-green-700 dark:text-green-400 font-bold">${item.price.toFixed(2)}/kg</span>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(item.trend)}
                        <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>{item.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-green-200 dark:bg-green-800 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Rising Prices</p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Rice, Soybeans, and Sugarcane prices are trending upward due to increased demand and lower supply.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-red-200 dark:bg-red-800 p-2 rounded-full">
                  <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-red-800 dark:text-red-200">Falling Prices</p>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    Maize and Cotton prices are declining due to surplus production and reduced export demand.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-blue-200 dark:bg-blue-800 p-2 rounded-full">
                  <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">Market Forecast</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Prices for Rice and Cattle are expected to continue rising over the next month. Consider selling
                    these commodities if you have stock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

