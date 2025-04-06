"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Mic, Sparkles, Info, CornerDownLeft, Plus } from "lucide-react"
import ChatMessage from "@/components/chat-message"
import { useSearchParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { chatService } from "@/services"
import type { ChatMessage as ChatMessageType } from "@/services/chat-service"

type Message = {
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

export default function ChatInterface() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isGuest = searchParams.get("guest") === "true"
  const chatId = searchParams.get("id")

  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<number | null>(chatId ? parseInt(chatId) : null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Load existing chat session or create a new one
  useEffect(() => {
    async function initializeChat() {
      try {
        if (isGuest) {
          // For guest users, just show a welcome message
          setMessages([{
            id: "welcome",
            content: "Hello! You're using AgenticAI Farming as a guest. You can ask me anything about farming, but to save your conversations, you'll need to create an account.",
            sender: "ai" as const,
            timestamp: new Date(),
            quickReplies: ["Check weather", "Market prices", "Crop suggestions"],
          }]);
          return;
        }
        
        // If chatId is provided, load that session
        if (chatId) {
          const sessionData = await chatService.getSession(parseInt(chatId));
          const formattedMessages = sessionData.messages.map(msg => ({
            id: msg.id.toString(),
            content: msg.content,
            sender: msg.role === 'user' ? ('user' as const) : ('ai' as const),
            timestamp: new Date(msg.created_at),
            // Extract quick replies from metadata if available
            quickReplies: msg.role === 'assistant' && msg.metadata?.quick_replies 
              ? msg.metadata.quick_replies 
              : undefined,
          }));
          setMessages(formattedMessages);
          setSessionId(parseInt(chatId));
        } else {
          // Create a new session if no chatId
          const newSession = await chatService.createSession("New Conversation");
          setSessionId(newSession.id);
          
          // Use the welcome message from the response
          setMessages([{
            id: newSession.welcome_message.id.toString(),
            content: newSession.welcome_message.content,
            sender: 'ai' as const,
            timestamp: new Date(newSession.welcome_message.created_at),
            quickReplies: ["Check weather", "Market prices", "Crop suggestions"],
          }]);
          
          // Update URL to include session ID
          router.push(`/chat?id=${newSession.id}`, { scroll: false });
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast({
          title: "Error",
          description: "Failed to load chat session. Please try again.",
          variant: "destructive",
        });
        
        // Fallback to a default welcome message
        setMessages([{
          id: "error",
          content: "Welcome to FarmWise! There was an issue connecting to the server. Some features may be limited.",
          sender: "ai" as const,
          timestamp: new Date(),
          quickReplies: ["Check weather", "Market prices", "Crop suggestions"],
        }]);
      }
    }
    
    initializeChat();
  }, [chatId, isGuest, router]);

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessageContent = inputValue.trim();
    setInputValue("");
    
    // Add user message to UI immediately
    const tempUserMessageId = `temp-${Date.now()}`;
    const newUserMessage: Message = {
      id: tempUserMessageId,
      content: userMessageContent,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsThinking(true);
    
    try {
      if (isGuest) {
        // For guest mode, use direct query
        const response = await chatService.directQuery(userMessageContent);
        
        const aiMessage: Message = {
          id: `guest-${Date.now()}`,
          content: response.response,
          sender: "ai",
          timestamp: new Date(),
          // Add quick replies if available in metadata
          quickReplies: response.metadata?.quick_replies,
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } else if (sessionId) {
        // For authenticated users with a session
        const response = await chatService.sendMessage(sessionId, userMessageContent);
        
        // Update user message with real ID
        setMessages(prev => 
          prev.map(msg => 
            msg.id === tempUserMessageId
              ? {
                  ...msg,
                  id: response.user_message.id.toString()
                }
              : msg
          )
        );
        
        // Add AI response
        const aiMessage: Message = {
          id: response.ai_message.id.toString(),
          content: response.ai_message.content,
          sender: "ai",
          timestamp: new Date(response.ai_message.created_at),
          // Add quick replies if available in metadata
          quickReplies: response.ai_message.metadata?.quick_replies,
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      
      // Remove thinking state and allow retry
      setMessages(prev => prev.filter(msg => msg.id !== tempUserMessageId));
    } finally {
      setIsThinking(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    // Focus the input after setting the value
    setTimeout(() => {
      inputRef.current?.focus();
      handleSendMessage();
    }, 100);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real app, we would start/stop voice recording
  }

  const togglePlayMessage = (messageId: string) => {
    if (playingMessageId === messageId) {
      setPlayingMessageId(null)
    } else {
      setPlayingMessageId(messageId)
      // In a real app, we would play the message using text-to-speech
      // For demo purposes, we'll just set a timeout to stop "playing" after 3 seconds
      setTimeout(() => {
        setPlayingMessageId(null)
      }, 3000)
    }
  }

  const startNewChat = () => {
    if (isGuest) {
      window.location.href = "/chat?guest=true"
    } else {
      window.location.href = "/chat"
    }
  }

  return (
    <div className="relative flex flex-col h-full w-full bg-background">
      {/* Guest mode banner */}
      {isGuest && (
        <div className="bg-amber-100 dark:bg-amber-900/30 p-2 text-center text-sm">
          <p className="flex items-center justify-center gap-2">
            <Info className="h-4 w-4" />
            <span>
              You're in guest mode. <a href="/login" className="font-medium underline">Sign in</a> to save your conversations.
            </span>
          </p>
        </div>
      )}
      
      {/* Chat title bar */}
      <div className="border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="font-semibold truncate">
            {sessionId ? `Conversation #${sessionId}` : "New Conversation"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Create new conversation
              router.push('/chat');
            }}
          >
            <Plus className="h-4 w-4 mr-1" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isPlaying={playingMessageId === message.id}
            onPlayToggle={() =>
              setPlayingMessageId(playingMessageId === message.id ? null : message.id)
            }
            onQuickReplyClick={handleQuickReply}
          />
        ))}
        
        {isThinking && (
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-muted/50 w-fit">
            <div className="space-y-2 leading-relaxed text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-foreground/30 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-foreground/30 animate-pulse delay-100"></div>
                <div className="h-2 w-2 rounded-full bg-foreground/30 animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - updated with cylindrical design */}
      <div className="border-t p-4 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl">
          <div className="relative flex items-center rounded-full border bg-background shadow-sm focus-within:ring-1 focus-within:ring-primary">
            {/* Suggestion box for guest users */}
            {isGuest && messages.length <= 1 && !inputValue && (
              <div className="absolute -top-32 left-0 right-0 bg-card p-3 rounded-lg border shadow-sm">
                <p className="text-sm font-medium mb-2">Try asking about:</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-primary/5 border-primary/20 hover:bg-primary/10"
                    onClick={() => handleQuickReply("What crops should I plant this season?")}
                  >
                    Crop recommendations
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-primary/5 border-primary/20 hover:bg-primary/10"
                    onClick={() => handleQuickReply("Weather forecast for next week")}
                  >
                    Weather forecast
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-primary/5 border-primary/20 hover:bg-primary/10" 
                    onClick={() => handleQuickReply("Current market prices for rice")}
                  >
                    Market prices
                  </Button>
                </div>
              </div>
            )}
            
            <Input
              ref={inputRef}
              className="px-4 py-6 border-none focus-visible:ring-0 w-full rounded-full bg-transparent"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            
            <div className="flex items-center pr-3 space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground rounded-full h-9 w-9"
                onClick={toggleRecording}
                disabled={isThinking}
              >
                <Mic className={cn("h-5 w-5", isRecording && "text-red-500")} />
                <span className="sr-only">Toggle voice input</span>
              </Button>
              
              <Button
                size="icon"
                className="rounded-full bg-primary h-9 w-9 hover:bg-primary/90 text-primary-foreground"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isThinking}
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-2 text-center">
            <p className="text-xs text-muted-foreground">
              FarmWise can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

