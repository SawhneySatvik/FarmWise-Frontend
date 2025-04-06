"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowRight, Mail, Smartphone, User, Lock, Eye, EyeOff, CheckCircle, Loader2, UserIcon, PhoneCall } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function LoginForm() {
  const router = useRouter()
  const { login, register } = useAuth()
  
  const [mode, setMode] = useState("login")
  const [loading, setLoading] = useState(false)
  
  // Form states
  const [username, setUsername] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!phoneNumber || !password) {
      toast.error("Please fill in all required fields")
      return
    }
    
    console.log("Attempting login with:", { phoneNumber, password })
    setLoading(true)
    
    try {
      await login(phoneNumber, password)
      
      // Save in localStorage if rememberMe is checked
      if (rememberMe) {
        localStorage.setItem("rememberedPhone", phoneNumber)
      }
      
      console.log("Login successful!")
      toast.success("Login successful!")
      router.push("/chat")
    } catch (error: any) {
      console.error("Login error:", error)
      toast.error(error.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!username || !phoneNumber || !password) {
      toast.error("Please fill in all required fields")
      return
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    
    console.log("Attempting registration with:", { username, phoneNumber, password, email })
    setLoading(true)
    
    try {
      await register(username, phoneNumber, password, email || undefined)
      console.log("Registration successful!")
      toast.success("Registration successful!")
      router.push("/chat")
    } catch (error: any) {
      console.error("Registration error:", error)
      toast.error(error.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGuestAccess = () => {
    setLoading(true)
    
    try {
      // Navigate to the chat page with guest parameter
      router.push("/chat?guest=true")
      
      // Show success message
      toast.success("Continuing as guest", {
        description: "You can try all features, but your data won't be saved.",
        position: "bottom-center",
      })
    } catch (error) {
      toast.error("Failed to continue as guest", {
        description: "Please try again or create an account.",
        position: "bottom-center",
      })
    } finally {
      setLoading(false)
    }
  }

  // Load remembered phone number if available
  useEffect(() => {
    const savedPhone = localStorage.getItem("rememberedPhone")
    if (savedPhone) {
      setPhoneNumber(savedPhone)
      setRememberMe(true)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="flex border-b">
          <button
            type="button"
            className={cn(
              "flex-1 px-4 py-3 text-center font-medium transition-colors",
              mode === "login" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={cn(
              "flex-1 px-4 py-3 text-center font-medium transition-colors",
              mode === "register" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    className="pl-10"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-xs" type="button">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') setRememberMe(checked);
                }} />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="flex items-center justify-center gap-2" onClick={handleGuestAccess}>
                  <span className="text-amber-600 dark:text-amber-400">
                    <UserIcon className="h-4 w-4" />
                  </span>
                  Guest Mode
                </Button>
                <Button variant="outline" type="button" className="flex items-center justify-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">
                    <PhoneCall className="h-4 w-4" />
                  </span>
                  OTP Login
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Enter a username"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-phone">Phone Number</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-phone"
                    placeholder="+91 98765 43210"
                    className="pl-10"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms} 
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') setAgreedToTerms(checked);
                  }}
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Privacy Policy</a>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading || !agreedToTerms}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or try without account</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                type="button" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGuestAccess}
              >
                <UserIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                Continue as Guest
              </Button>
            </form>
          )}
        </div>
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        By continuing, you acknowledge that you have read and understood our{" "}
        <a href="#" className="underline underline-offset-2 hover:text-primary">Terms of Service</a> and{" "}
        <a href="#" className="underline underline-offset-2 hover:text-primary">Privacy Policy</a>.
      </div>
    </div>
  )
}

