import Link from "next/link"
import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-2">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <span className="text-foreground font-semibold">Farm Wise</span>
              <p className="text-xs text-muted-foreground mt-1">Empowering Indian farmers with AI</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start space-y-3 md:space-y-0">
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
            <div className="text-xs text-muted-foreground mt-2 md:mt-2">
              © 2025 Farm Wise. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 