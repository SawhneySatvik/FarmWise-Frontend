"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Bell, User, Lock, Globe, ArrowLeft, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TopBar from "@/components/top-bar"
import { Sidebar } from "@/components/sidebar"
import MobileNavigation from "@/components/mobile-navigation"
import { useMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export default function SettingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isGuest = searchParams.get("guest") === "true"
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [language, setLanguage] = useState("english")
  const [units, setUnits] = useState("metric")
  const [darkMode, setDarkMode] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("+1-555-123-4567")
  const [name, setName] = useState("John Farmer")

  const handleSaveSettings = () => {
    // In a real app, we would save the settings to the server
    alert("Settings saved successfully!")
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
            <div className="flex items-center mb-6">
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">Settings</h1>
              {isGuest && (
                <Badge
                  variant="outline"
                  className="ml-3 bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-800"
                >
                  Guest Mode
                </Badge>
              )}
            </div>

            {isGuest ? (
              <Card>
                <CardHeader>
                  <CardTitle>Limited Access</CardTitle>
                  <CardDescription>
                    Settings are limited in guest mode. Create an account to access all features.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => router.push("/")}
                  >
                    Create Account
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="account" className="text-base">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="text-base">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="text-base">
                    <Globe className="h-4 w-4 mr-2" />
                    Preferences
                  </TabsTrigger>
                  <TabsTrigger value="security" className="text-base">
                    <Lock className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Update your account details and personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex items-center">
                          <Input
                            id="phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="outline" className="ml-2">
                            Verify
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-end">
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={handleSaveSettings}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>Configure how you want to receive notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Push Notifications</h3>
                          <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                        </div>
                        <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Notification Sounds</h3>
                          <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                        </div>
                        <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                      </div>

                      <Separator />

                      <div className="flex justify-end">
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={handleSaveSettings}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>App Preferences</CardTitle>
                      <CardDescription>Customize your app experience.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="hindi">Hindi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="units">Measurement Units</Label>
                        <Select value={units} onValueChange={setUnits}>
                          <SelectTrigger id="units">
                            <SelectValue placeholder="Select units" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="metric">Metric (°C, km)</SelectItem>
                            <SelectItem value="imperial">Imperial (°F, miles)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Dark Mode</h3>
                          <p className="text-sm text-muted-foreground">Use dark theme</p>
                        </div>
                        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                      </div>

                      <Separator />

                      <div className="flex justify-end">
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={handleSaveSettings}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your account security.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>

                      <Separator />

                      <div className="flex justify-end">
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={handleSaveSettings}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>

        {isMobile && <MobileNavigation />}
      </div>
    </div>
  )
}

