"use client"

import { useState, useEffect } from "react"
import type React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import SelectionStep from "./selection-step" // Assuming this component is already created
import { X, Shirt, Sticker, Coffee, Gift, Users, Sparkles, Palette, Zap, TrendingUp, ArrowLeft } from "lucide-react"

type SelectionStepType = "productType" | "useCase" | "stylePreference"

interface ProductOption {
  id: string
  label: string
  icon: React.ElementType
}
interface UseCaseOption {
  id: string
  label: string
  icon: React.ElementType
}
interface StyleOption {
  id: string
  label: string
  icon: React.ElementType
}

const productTypes: ProductOption[] = [
  { id: "t-shirt", label: "T-Shirt", icon: Shirt },
  { id: "sticker", label: "Sticker", icon: Sticker },
  { id: "mug", label: "Mug", icon: Coffee },
  { id: "hoodie", label: "Hoodie", icon: Users },
]

const useCases: UseCaseOption[] = [
  { id: "personal", label: "Personal Use", icon: Sparkles },
  { id: "promo", label: "Promotional", icon: Gift },
  { id: "gift", label: "As a Gift", icon: Gift },
  { id: "team", label: "For a Team", icon: Users },
]

const stylePreferences: StyleOption[] = [
  { id: "minimal", label: "Minimalist", icon: Palette },
  { id: "bold", label: "Bold & Graphic", icon: Zap },
  { id: "playful", label: "Playful & Fun", icon: Sparkles },
  { id: "trendy", label: "Modern & Trendy", icon: TrendingUp },
]

interface SelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (productType: string, useCase: string, style: string) => void
  initialProductType?: string // To pre-select if user clicked a specific product card
}

export default function SelectionModal({ isOpen, onClose, onComplete, initialProductType }: SelectionModalProps) {
  const [currentStep, setCurrentStep] = useState<SelectionStepType>("productType")
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(initialProductType)
  const [selectedUseCase, setSelectedUseCase] = useState<string | undefined>(undefined)
  const [selectedStyle, setSelectedStyle] = useState<string | undefined>(undefined)
  const [isLoadingNextStep, setIsLoadingNextStep] = useState(false)

  useEffect(() => {
    // If an initial product type is provided and the modal opens,
    // potentially skip to the next step if it's a valid product.
    if (isOpen && initialProductType && productTypes.some((p) => p.id === initialProductType)) {
      setSelectedProduct(initialProductType)
      setCurrentStep("useCase")
    } else if (isOpen) {
      // Reset to first step if no valid initial product or modal reopens
      setCurrentStep("productType")
      setSelectedProduct(undefined) // Clear previous selection if modal reopens without initialProduct
    }
    setSelectedUseCase(undefined) // Always clear subsequent selections when modal opens/product changes
    setSelectedStyle(undefined)
  }, [isOpen, initialProductType])

  const simulateLoading = (callback: () => void) => {
    setIsLoadingNextStep(true)
    setTimeout(() => {
      callback()
      setIsLoadingNextStep(false)
    }, 300) // Shorter delay for modal
  }

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId)
    simulateLoading(() => setCurrentStep("useCase"))
  }

  const handleUseCaseSelect = (useCaseId: string) => {
    setSelectedUseCase(useCaseId)
    simulateLoading(() => setCurrentStep("stylePreference"))
  }

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId)
    // Completion is handled by the "Start AI Chat" button now
  }

  const handleBack = () => {
    if (currentStep === "stylePreference") {
      setCurrentStep("useCase")
    } else if (currentStep === "useCase") {
      setCurrentStep("productType")
    }
  }

  const handleConfirmSelections = () => {
    if (selectedProduct && selectedUseCase && selectedStyle) {
      onComplete(selectedProduct, selectedUseCase, selectedStyle)
    }
  }

  const canConfirm = selectedProduct && selectedUseCase && selectedStyle

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "productType":
        return (
          <SelectionStep
            title="What would you like to create?"
            description="Choose a product to start."
            options={productTypes}
            onSelect={handleProductSelect}
            selectedOption={selectedProduct}
            isLoading={isLoadingNextStep}
          />
        )
      case "useCase":
        return (
          <SelectionStep
            title="What's the occasion?"
            description={`How will you use your custom ${selectedProduct || "item"}?`}
            options={useCases}
            onSelect={handleUseCaseSelect}
            selectedOption={selectedUseCase}
            isLoading={isLoadingNextStep}
          />
        )
      case "stylePreference":
        return (
          <SelectionStep
            title="Choose a style preference"
            description={`What style are you aiming for?`}
            options={stylePreferences}
            onSelect={handleStyleSelect}
            selectedOption={selectedStyle}
            isLoading={isLoadingNextStep}
          />
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">Let's Get Started</DialogTitle>
          <DialogDescription>Tell us a bit about what you're looking for.</DialogDescription>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="p-4 sm:p-6 flex-grow flex flex-col justify-center overflow-y-auto">{renderCurrentStep()}</div>

        <DialogFooter className="p-6 pt-4 border-t flex justify-between items-center">
          {currentStep !== "productType" ? (
            <Button variant="outline" onClick={handleBack} disabled={isLoadingNextStep}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div /> // Placeholder to keep "Start AI Chat" button to the right
          )}
          <Button onClick={handleConfirmSelections} disabled={!canConfirm || isLoadingNextStep}>
            Start AI Chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
