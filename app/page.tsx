"use client"
import { useState, useEffect } from "react"

import AppHeader from "@/components/layout/app-header"
import AppFooter from "@/components/layout/app-footer"
import ChatInterface from "@/components/chat/chat-interface"
import HeroSection from "@/components/landing/hero-section"
import ProductShowcaseSection from "@/components/landing/product-showcase-section"
import SelectionModal from "@/components/selection/selection-modal"

const productTypesList = [
  { id: "t-shirt", label: "T-Shirt" },
  { id: "sticker", label: "Sticker" },
  { id: "mug", label: "Mug" },
  { id: "hoodie", label: "Hoodie" },
]
const useCasesList = [
  { id: "personal", label: "Personal Use" },
  { id: "promo", label: "Promotional" },
  { id: "gift", label: "As a Gift" },
  { id: "team", label: "For a Team" },
]
const stylePreferencesList = [
  { id: "minimal", label: "Minimalist" },
  { id: "bold", label: "Bold & Graphic" },
  { id: "playful", label: "Playful & Fun" },
  { id: "trendy", label: "Modern & Trendy" },
]

export default function HomePage() {
  const [isChatActive, setIsChatActive] = useState(false)
  // Store the complete initial selections object for ChatInterface
  const [initialSelectionsForChat, setInitialSelectionsForChat] = useState<{
    productType: string
    useCase: string
    style: string
  } | null>(null)

  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false)
  const [initialProductForModal, setInitialProductForModal] = useState<string | undefined>(undefined)

  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      .scrollbar-thin::-webkit-scrollbar { height: 8px; width: 8px; }
      .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
      .scrollbar-thin::-webkit-scrollbar-thumb { background-color: hsl(var(--primary) / 0.5); border-radius: 10px; border: 2px solid transparent; background-clip: content-box; }
      .scrollbar-thin::-webkit-scrollbar-thumb:hover { background-color: hsl(var(--primary)); }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const handleOpenSelectionModal = (productType?: string, presetPrompt?: string) => {
    setInitialProductForModal(productType) // Will be undefined if no specific product clicked
    setIsSelectionModalOpen(true)
  }

  const handleCloseSelectionModal = () => {
    setIsSelectionModalOpen(false)
    setInitialProductForModal(undefined)
  }

  const handleSelectionComplete = (productType: string, useCase: string, style: string) => {
    setInitialSelectionsForChat({ productType, useCase, style })
    setIsSelectionModalOpen(false)
    setIsChatActive(true)
  }

  const handleEndChat = () => {
    setIsChatActive(false)
    setInitialSelectionsForChat(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow flex flex-col">
        {isChatActive && initialSelectionsForChat ? (
          <ChatInterface onEndChat={handleEndChat} initialSelections={initialSelectionsForChat} />
        ) : (
          <>
            <HeroSection onStartChat={handleOpenSelectionModal} />
            <ProductShowcaseSection />
          </>
        )}
      </main>
      <AppFooter />

      <SelectionModal
        isOpen={isSelectionModalOpen}
        onClose={handleCloseSelectionModal}
        onComplete={handleSelectionComplete}
        initialProductType={initialProductForModal}
      />
    </div>
  )
}
