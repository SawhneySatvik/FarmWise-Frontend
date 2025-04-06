"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Leaf, User, MessageSquare, SunMoon, BarChart } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  // Track scroll position for transparency effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on path change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { name: "Chat", href: "/chat", icon: MessageSquare },
    { name: "Weather", href: "/weather", icon: SunMoon },
    { name: "Market", href: "/market", icon: BarChart },
  ]

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      isScrolled 
        ? "bg-background/90 backdrop-blur-md border-border/50 shadow-sm py-3" 
        : "bg-transparent border-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-foreground hover:opacity-80 transition-opacity"
        >
          <div className="h-8 w-8 rounded-full bg-primary/90 flex items-center justify-center">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className={cn(
            "font-semibold transition-all duration-300",
            isScrolled ? "text-lg" : "text-xl"
          )}>
            Farm <span className="text-primary font-bold"> Wise</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Desktop Right Side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center space-x-4">
              <Link 
                href="/profile" 
                className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
              >
                <User className="h-4 w-4" />
                <span>{user.username}</span>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => logout()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              asChild 
              size="sm"
              className="btn-harvest"
            >
              <Link href="/#auth-section">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 md:hidden text-foreground hover:bg-accent/50 rounded-md"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-grow">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded-md",
                    pathname === link.href 
                      ? "bg-accent/30 text-primary" 
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              )
            })}
            
            <div className="pt-2 border-t border-border flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              
              {user ? (
                <>
                  <Link 
                    href="/profile" 
                    className="flex items-center space-x-2 p-2 rounded-md text-muted-foreground"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user.username}</span>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => logout()}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  asChild 
                  className="btn-harvest w-full"
                >
                  <Link href="/#auth-section">Sign In</Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
} 