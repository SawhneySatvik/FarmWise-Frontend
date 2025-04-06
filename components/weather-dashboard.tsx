import WeatherSection from "@/components/weather-section"

export default function WeatherDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Weather Forecast & Insights</h1>
      <p className="text-muted-foreground mb-8">
        Get real-time weather updates and agricultural recommendations tailored for your region.
      </p>
      <WeatherSection />
    </div>
  )
} 