"use client"

import Link from "next/link"
import { Printer, Search, LogIn, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors">
            <Printer className="h-6 w-6" />
            <span className="hidden sm:inline">CustomPrintingCo</span>
            <span className="sm:hidden">CPC</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              首页
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              博客
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              关于我们
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              联系我们
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/track-order">
              <Button variant="ghost" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                订单查询
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                登录
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                博客
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                关于我们
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                联系我们
              </Link>
              <div className="pt-2 border-t">
                <Link
                  href="/track-order"
                  className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  订单查询
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  登录
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
