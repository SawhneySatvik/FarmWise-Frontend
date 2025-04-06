"use client"

import { useState } from "react"
import MobileNavigation from "@/components/mobile-navigation"
import Sidebar from "@/components/sidebar"
import TopBar from "@/components/top-bar"
import HistorySection from "@/components/history-section"
import { useMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export default function HistoryPage() {
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile ? (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      ) : (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[280px]">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}

      <div className="flex-1 flex flex-col">
        <TopBar onMenuClick={toggleSidebar} />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-primary">Chat History</h1>
            <HistorySection />
          </div>
        </div>
        {isMobile && <MobileNavigation />}
      </div>
    </div>
  )
}

