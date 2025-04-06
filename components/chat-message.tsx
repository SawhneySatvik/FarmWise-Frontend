"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, User, Volume2, VolumeX, Cloud, ArrowUp, ArrowDown, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export type MessageProps = {
  message: {
    id: string
    content: string
    sender: "user" | "ai"
    timestamp: Date
    quickReplies?: string[]
    weatherData?: {
      condition: string
      temperature: number
    }
    marketData?: {
      crop: string
      price: number
      trend: "up" | "down" | "stable"
    }[]
  }
  onQuickReplyClick: (reply: string) => void
  isPlaying: boolean
  onPlayToggle: () => void
}

export default function ChatMessage({ message, onQuickReplyClick, isPlaying, onPlayToggle }: MessageProps) {
  const [showTimestamp, setShowTimestamp] = useState(false)
  
  const toggleTimestamp = () => {
    setShowTimestamp(!showTimestamp)
  }

  return (
    <div 
      className={cn(
        "flex group",
        message.sender === "ai" 
          ? "w-full max-w-4xl" 
          : "w-full max-w-4xl ml-auto justify-end"
      )}
      onClick={toggleTimestamp}
    >
      {message.sender === "ai" && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary/10 text-primary">
          <Sparkles className="h-4 w-4" />
        </div>
      )}
      
      <div 
        className={cn(
          "flex flex-col",
          message.sender === "ai" ? "ml-4 space-y-2" : "mr-4 items-end space-y-2"
        )}
      >
        <div 
          className={cn(
            "flex flex-1 flex-col space-y-2 overflow-hidden",
            message.sender === "user" && "items-end"
          )}
        >
          <div className="flex items-end gap-2">
            {message.sender === "ai" ? (
              <div className="prose prose-neutral dark:prose-invert text-foreground">
                <p>{message.content}</p>
                
                {message.weatherData && (
                  <div className="mt-3 rounded-lg border p-3 bg-background">
                    <div className="flex items-center gap-2 font-medium text-foreground">
                      <Cloud className="h-4 w-4 text-sky-500" />
                      <span>Weather Update</span>
                    </div>
                    <div className="mt-1 text-sm">
                      <p>Current condition: {message.weatherData.condition}</p>
                      <p>Temperature: {message.weatherData.temperature}°C</p>
                    </div>
                  </div>
                )}
                
                {message.marketData && (
                  <div className="mt-3 rounded-lg border p-3 bg-background overflow-x-auto">
                    <div className="font-medium text-foreground mb-2">Market Prices</div>
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-6">Crop</th>
                          <th className="text-right py-2 pr-6">Price (₹/kg)</th>
                          <th className="text-left py-2">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {message.marketData.map((item, index) => (
                          <tr key={index} className={index !== message.marketData!.length - 1 ? "border-b" : ""}>
                            <td className="py-2 pr-6">{item.crop}</td>
                            <td className="text-right py-2 pr-6">{item.price.toFixed(2)}</td>
                            <td className="py-2">
                              <span className="flex items-center">
                                {item.trend === "up" && <ArrowUp className="h-4 w-4 text-green-500 mr-1" />}
                                {item.trend === "down" && <ArrowDown className="h-4 w-4 text-red-500 mr-1" />}
                                {item.trend === "stable" && <ArrowRight className="h-4 w-4 text-amber-500 mr-1" />}
                                {item.trend === "up" && "Rising"}
                                {item.trend === "down" && "Falling"}
                                {item.trend === "stable" && "Stable"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {message.quickReplies && message.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {message.quickReplies.map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-sm bg-muted/50 border-muted hover:bg-muted"
                        onClick={(e) => {
                          e.stopPropagation()
                          onQuickReplyClick(reply)
                        }}
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
                {message.content}
              </div>
            )}
            
            {message.sender === "ai" && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground",
                  isPlaying && "opacity-100"
                )}
                onClick={(e) => {
                  e.stopPropagation()
                  onPlayToggle()
                }}
              >
                {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            )}
          </div>
          
          {showTimestamp && (
            <div className="text-xs text-muted-foreground">
              {format(message.timestamp, "h:mm a, MMM d")}
            </div>
          )}
        </div>
      </div>
      
      {message.sender === "user" && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}

