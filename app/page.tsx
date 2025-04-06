import { redirect } from "next/navigation"
import Image from "next/image"
import LoginForm from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sprout, Droplets, CloudSun, ShoppingBag, Users } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/hooks/use-auth"

// Create a simple placeholder for the hero image since the actual image is missing
const PlaceholderImage = () => (
  <div className="relative w-full max-w-lg aspect-square bg-primary/10 rounded-lg flex items-center justify-center">
    <Sprout className="h-24 w-24 text-primary/40" />
    <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-lg"></div>
  </div>
);

export default function Home() {
  // In a real app, we would check if the user is authenticated
  const isAuthenticated = false

  if (isAuthenticated) {
    redirect("/chat")
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-background pt-16">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-green-500/5 blur-3xl"></div>
          
          <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:space-x-12 relative z-10">
            {/* Left Column: Text content */}
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sprout className="h-4 w-4 mr-2" />
                AI-Powered Smart Farming
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Revolutionizing Indian Agriculture with <span className="text-primary">AgenticAI</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Get personalized crop recommendations, real-time weather insights, and market intelligence—all through a 
                simple conversation with your AI farming assistant.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="#auth-section">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#features">
                    Explore Features
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Right Column: Image/Illustration */}
            <div className="md:w-1/2 flex justify-center">
              {/* Use a placeholder until we have the actual image */}
              <PlaceholderImage />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Designed for Indian Farmers</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI combines agricultural science with local knowledge to deliver accessible, 
                actionable insights for farmers across India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sprout className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Crop Recommendations</h3>
                <p className="text-muted-foreground">
                  Get personalized suggestions based on your soil type, weather conditions, and market trends.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CloudSun className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Weather Insights</h3>
                <p className="text-muted-foreground">
                  Receive timely weather forecasts and actionable advice to protect your crops.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Market Intelligence</h3>
                <p className="text-muted-foreground">
                  Access real-time market prices and trends to sell your produce at the best time.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Irrigation Planning</h3>
                <p className="text-muted-foreground">
                  Optimize water usage with smart irrigation schedules tailored to your crops and soil.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multilingual Support</h3>
                <p className="text-muted-foreground">
                  Chat with our AI in your preferred Indian language for a comfortable experience.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 6V2H8" />
                    <path d="m8 11.99-5.5 6.35a2 2 0 0 0 .85 3.14l5.39 1.84a2 2 0 0 0 2.56-1.97l-.17-5.76" />
                    <path d="m21.72 16.74-4.92-1.96a2 2 0 0 0-2.56 1.97l.17 5.76a2 2 0 0 0 2.56 1.97l5.39-1.84a2 2 0 0 0 .85-3.14l-1.49-1.77Z" />
                    <path d="M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Pest & Disease Control</h3>
                <p className="text-muted-foreground">
                  Identify and address crop diseases and pests with eco-friendly solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted by Farmers</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how AgenticAI is transforming farming practices across India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">RS</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Rajesh Singh</h4>
                    <p className="text-sm text-muted-foreground">Wheat Farmer, Punjab</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The weather alerts saved my crop during an unexpected storm. I'm impressed by how accurate the predictions are."
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">KP</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Kavitha Patel</h4>
                    <p className="text-sm text-muted-foreground">Rice Farmer, Tamil Nadu</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Being able to chat in Tamil makes everything so simple. The market price updates helped me increase my profits by 15%."
                </p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">AD</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Amit Desai</h4>
                    <p className="text-sm text-muted-foreground">Vegetable Grower, Maharashtra</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The pest identification feature is phenomenal. I was able to catch an infestation early and save my entire tomato crop."
                </p>
              </div>
            </div>
      </div>
        </section>

        {/* Auth Section */}
        <section id="auth-section" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 2a10 10 0 0 1 10 10h-10V2z" />
                <path d="M12 12l-8 8" />
                <path d="M12 12l8 8" />
                <path d="M12 12l-8 -8" />
                <path d="M12 12l8 -8" />
              </svg>
            </div>
          </div>
                <h2 className="text-3xl font-bold text-primary mb-2">AgenticAI Farming</h2>
          <p className="text-muted-foreground">Your AI-powered farming assistant</p>
        </div>
        <LoginForm />
      </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                      <path d="M12 2a10 10 0 0 1 10 10h-10V2z" />
                      <path d="M12 12l-8 8" />
                      <path d="M12 12l8 8" />
                      <path d="M12 12l-8 -8" />
                      <path d="M12 12l8 -8" />
                    </svg>
                  </div>
                  <span className="text-foreground font-semibold">AgenticAI Farming</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">© 2024 AgenticAI. All rights reserved.</p>
              </div>
              <div className="flex gap-6">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
    </main>
    </>
  )
}

