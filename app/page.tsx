"use client"
import { useState, useEffect } from "react"

import ChatInterface from "@/components/chat/chat-interface"
import HeroSection from "@/components/landing/hero-section"
import ProductShowcaseSection from "@/components/landing/product-showcase-section"
import ProductCategoriesSection from "@/components/landing/product-categories-section"
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
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false)
  const [initialSelectionsForChat, setInitialSelectionsForChat] = useState<any>(null)
  const [initialProductForModal, setInitialProductForModal] = useState<string | undefined>(undefined)

  const handleOpenSelectionModal = (productType?: string) => {
    setInitialProductForModal(productType)
    setIsSelectionModalOpen(true)
  }

  const handleCloseSelectionModal = () => {
    setIsSelectionModalOpen(false)
    setInitialProductForModal(undefined)
  }

  const handleSelectionComplete = (selections: any) => {
    setInitialSelectionsForChat(selections)
    setIsSelectionModalOpen(false)
    setIsChatActive(true)
  }

  const handleEndChat = () => {
    setIsChatActive(false)
    setInitialSelectionsForChat(null)
  }

  // If chat is active, show full-screen chat
  if (isChatActive && initialSelectionsForChat) {
    return (
      <ChatInterface 
        onEndChat={handleEndChat} 
        initialSelections={initialSelectionsForChat} 
      />
    )
  }

  return (
    <>
      <HeroSection onStartChat={handleOpenSelectionModal} />
      <ProductShowcaseSection />
      <ProductCategoriesSection />
      
      <SelectionModal
        isOpen={isSelectionModalOpen}
        onClose={handleCloseSelectionModal}
        onComplete={handleSelectionComplete}
        initialProductType={initialProductForModal}
      />
    </>
  )
}
