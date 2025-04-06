import MarketSection from "@/components/market-section"

export default function MarketDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Market Prices & Trends</h1>
      <p className="text-muted-foreground mb-8">
        Stay updated with the latest crop and livestock prices to make informed selling decisions.
      </p>
      <MarketSection />
    </div>
  )
} 