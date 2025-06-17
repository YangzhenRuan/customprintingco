import Link from "next/link"
import { Printer, Search, LogIn } from "lucide-react"

export default function AppHeader() {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Printer className="h-7 w-7" />
            <span>CustomPrintingCo.com</span>
          </Link>
          <nav className="flex items-center space-x-3 sm:space-x-4">
            <Link href="/blog" className="text-sm sm:text-base text-foreground/80 hover:text-primary transition-colors">
              Blog
            </Link>
            {/* Minimal version might hide these, but keeping for now */}
            <Link
              href="/track-order"
              className="text-sm sm:text-base text-foreground/80 hover:text-primary transition-colors flex items-center gap-1"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              Track Order
            </Link>
            <Link
              href="/login"
              className="text-sm sm:text-base text-foreground/80 hover:text-primary transition-colors flex items-center gap-1"
            >
              <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
