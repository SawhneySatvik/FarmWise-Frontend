"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { MessageSquare, Cloud, DollarSign, Clock, Settings } from "lucide-react"

export default function MobileNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isGuest = searchParams.get("guest") === "true"

  const navItems = [
    {
      name: "Chat",
      icon: <MessageSquare className="h-6 w-6" />,
      path: "/chat",
    },
    {
      name: "Weather",
      icon: <Cloud className="h-6 w-6" />,
      path: "/weather",
    },
    {
      name: "Market",
      icon: <DollarSign className="h-6 w-6" />,
      path: "/market",
    },
    {
      name: "History",
      icon: <Clock className="h-6 w-6" />,
      path: "/history",
    },
    {
      name: "Settings",
      icon: <Settings className="h-6 w-6" />,
      path: "/settings",
    },
  ]

  const handleNavigation = (path: string) => {
    // Preserve guest parameter when navigating
    if (isGuest) {
      router.push(`${path}?guest=true`)
    } else {
      router.push(path)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t flex justify-around items-center h-16 shadow-md">
      {navItems.map((item) => {
        const isActive = pathname === item.path
        return (
          <button
            key={item.name}
            className="flex flex-col items-center justify-center w-full h-full"
            onClick={() => handleNavigation(item.path)}
          >
            <div className={isActive ? "text-primary" : "text-secondary"}>{item.icon}</div>
            <span className={`text-xs mt-1 ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
              {item.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}

