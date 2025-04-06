"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Calendar, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export default function HistorySection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isGuest = searchParams.get("guest") === "true"
  const [searchQuery, setSearchQuery] = useState("")

  const chatHistory = [
    {
      id: "1",
      date: "Today",
      time: "10:30 AM",
      preview: "What should I plant this season?",
      messages: 6,
      category: "crops",
    },
    {
      id: "2",
      date: "Today",
      time: "08:15 AM",
      preview: "Weather forecast for the week",
      messages: 4,
      category: "weather",
    },
    {
      id: "3",
      date: "Yesterday",
      time: "04:45 PM",
      preview: "Market prices for rice and wheat",
      messages: 8,
      category: "market",
    },
    {
      id: "4",
      date: "Yesterday",
      time: "11:20 AM",
      preview: "Pest control for tomato plants",
      messages: 12,
      category: "crops",
    },
    {
      id: "5",
      date: "2 days ago",
      time: "03:50 PM",
      preview: "Irrigation techniques for dry season",
      messages: 9,
      category: "irrigation",
    },
    {
      id: "6",
      date: "3 days ago",
      time: "09:10 AM",
      preview: "Fertilizer recommendations for maize",
      messages: 7,
      category: "crops",
    },
    {
      id: "7",
      date: "Last week",
      time: "02:30 PM",
      preview: "Livestock vaccination schedule",
      messages: 5,
      category: "livestock",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "crops":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
      case "weather":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800"
      case "market":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-800"
      case "livestock":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-800"
      case "irrigation":
        return "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-200 dark:border-cyan-800"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
    }
  }

  const filteredHistory = chatHistory.filter((chat) => chat.preview.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleChatClick = (id: string) => {
    // In a real app, we would navigate to the specific chat
    router.push(`/chat?id=${id}${isGuest ? "&guest=true" : ""}`)
  }

  if (isGuest) {
    return (
      <Card className="bg-card shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Guest Mode Active</h3>
          <p className="text-muted-foreground mb-6">
            Chat history is not available in guest mode. Sign up to save your conversations.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => router.push("/")}>
            Sign Up Now
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search your conversations..."
            className="pl-10 border-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="border-input">
          <Filter className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      {filteredHistory.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No conversations found matching your search.</p>
          </CardContent>
        </Card>
      ) : (
        filteredHistory.map((chat) => (
          <Card
            key={chat.id}
            className="hover:bg-accent cursor-pointer transition-colors"
            onClick={() => handleChatClick(chat.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium truncate">{chat.preview}</h3>
                    <Badge variant="outline" className={getCategoryColor(chat.category)}>
                      {chat.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {chat.date}, {chat.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm bg-accent px-2 py-1 rounded-full">
                  <MessageSquare className="h-4 w-4 text-secondary" />
                  <span className="font-medium">{chat.messages}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {filteredHistory.length > 0 && (
        <Button
          variant="outline"
          className="w-full mt-2 text-primary border-primary/20 hover:bg-primary/10 hover:text-primary"
        >
          Load More
        </Button>
      )}
    </div>
  )
}

