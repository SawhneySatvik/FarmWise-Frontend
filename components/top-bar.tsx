"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, Bell, Menu } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/hooks/use-auth"

interface TopBarProps {
  onMenuClick?: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, logout } = useAuth()
  const isGuest = searchParams.get("guest") === "true"
  const [displayName, setDisplayName] = useState<string>("User")
  const isMobile = useMobile()

  // Update display name when user info changes
  useEffect(() => {
    if (isGuest) {
      setDisplayName("Guest User")
    } else if (user) {
      setDisplayName(user.username || user.phone_number)
    } else {
      setDisplayName("User")
    }
  }, [user, isGuest])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="flex items-center justify-between p-4 border-b bg-card shadow-sm">
      <div className="flex items-center">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-2 md:hidden">
            <Menu className="h-5 w-5 text-secondary" />
          </Button>
        )}
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
        <h1 className="text-xl font-bold text-primary">AgenticAI Farming</h1>
      </div>

      <div className="flex items-center gap-2">
        {isGuest && (
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => router.push("/")}
          >
            Sign Up
          </Button>
        )}

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                <User className="h-5 w-5 text-secondary" />
              </div>
              <span className="text-sm hidden md:inline">{displayName}</span>
              {isGuest && (
                <Badge
                  variant="outline"
                  className="ml-1 text-xs bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-800"
                >
                  Guest
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!isGuest && (
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => router.push("/settings")}>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="flex items-center gap-2 text-destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>{isGuest ? "Exit Guest Mode" : "Logout"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

