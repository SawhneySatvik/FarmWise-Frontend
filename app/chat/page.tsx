"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Sidebar } from "@/components/sidebar"
import ChatInterface from "@/components/chat-interface"
import TopBar from "@/components/top-bar"
import { Loader2 } from "lucide-react"

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isGuest = searchParams.get("guest") === "true"

  useEffect(() => {
    if (!authLoading) {
      // If not logged in and not in guest mode, redirect to login
      if (!user && !isGuest) {
        router.push("/")
      } else {
        setLoading(false)
      }
    }
  }, [user, authLoading, router, isGuest])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (loading || authLoading) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-[280px]' : ''}`}>
        <TopBar onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-hidden">
          <ChatInterface />
        </main>
      </div>
    </div>
  )
}

