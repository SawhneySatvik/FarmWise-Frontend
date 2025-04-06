"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import {
  LayoutDashboard,
  MessageCircle,
  Cloud,
  BarChart3,
  Settings,
  HelpCircle,
  Info,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  className?: string
}

export function Sidebar({ isOpen = true, onClose, className }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const isGuest = searchParams.get("guest") === "true"
  const guestParam = isGuest ? "?guest=true" : ""

  // Generate chat history items - these would come from a real API
  const [chatHistory, setChatHistory] = useState<{ id: string; title: string }[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API
    if (!isGuest && user) {
      setChatHistory([
        { id: "1", title: "Crop recommendations for my farm" },
        { id: "2", title: "Pest control for rice" },
        { id: "3", title: "Water management during summer" },
      ])
    } else {
      setChatHistory([])
    }
  }, [isGuest, user])

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      requiresAuth: true
    },
    {
      title: "Chat",
      href: "/chat",
      icon: MessageCircle,
      requiresAuth: false
    },
    {
      title: "Weather",
      href: "/weather",
      icon: Cloud,
      requiresAuth: false
    },
    {
      title: "Market Trends",
      href: "/market",
      icon: BarChart3,
      requiresAuth: false
    }
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-50 h-full w-[280px] border-r bg-card shadow-sm transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold">
          AgenticAI
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto md:hidden" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)] px-3 py-4">
        <div className="mb-4">
          <Button 
            className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => router.push(`/chat/new${guestParam}`)}
          >
            <MessageCircle className="h-5 w-5" />
            <span>New Chat</span>
          </Button>
        </div>

        <nav className="grid grid-flow-row auto-rows-max gap-1">
          {navItems
            .filter(item => !item.requiresAuth || (user && !isGuest))
            .map((item) => (
              <Button
                key={item.href}
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className="w-full justify-start gap-2 text-base"
                onClick={() => router.push(`${item.href}${guestParam}`)}
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span>{item.title}</span>
              </Button>
            ))}
        </nav>

        {!isGuest && user && chatHistory.length > 0 && (
          <div className="mt-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Recent Chats
            </div>
            <div className="grid grid-flow-row auto-rows-max gap-1">
              {chatHistory.map((chat) => (
                <Button
                  key={chat.id}
                  variant="ghost"
                  className="w-full justify-start truncate text-sm"
                  onClick={() => router.push(`/chat/${chat.id}${guestParam}`)}
                >
                  <MessageCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{chat.title}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4">
          <div className="grid grid-flow-row auto-rows-max gap-1">
            {!isGuest && user && (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-sm"
                onClick={() => router.push(`/settings${guestParam}`)}
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span>Settings</span>
              </Button>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-sm"
              onClick={() => router.push(`/help${guestParam}`)}
            >
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
              <span>Help & FAQ</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-sm"
              onClick={() => router.push(`/about${guestParam}`)}
            >
              <Info className="h-4 w-4 text-muted-foreground" />
              <span>About</span>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}

