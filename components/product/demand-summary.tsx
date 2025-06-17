"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Sparkles, TrendingUp, Gift, Zap } from "lucide-react"
import {
  calculateDiscountedPrice,
  getApplicableDiscountTier,
  getNextDiscountTier,
  calculateBaseItemPrice, // Import this if you need to recalculate base price on description change
  type DiscountTier,
} from "@/lib/pricing"

interface ProductDetailsForDemandSummary {
  description: string
  imageUrl: string
  basePrice: number // Base price per item BEFORE discount
  quantity: number
  designBriefSummary?: string
  // These will be derived and passed if needed, or calculated internally
  pricePerItemAfterDiscount?: number
  totalPrice?: number
  discountPercentage?: number
  originalTotalPrice?: number
  savings?: number
}

interface DemandSummaryProps {
  productDetails: ProductDetailsForDemandSummary
  onQuantityChange: (
    quantity: number,
    newPricePerItem: number,
    newTotalPrice: number,
    newDiscountPercentage: number,
    newOriginalTotal: number,
    newSavings: number,
  ) => void
  onDescriptionChange: (description: string, newBasePrice: number) => void
  onDesignBriefChange: (brief: string) => void
  onGeneratePO: () => void
}

export default function DemandSummary({
  productDetails,
  onQuantityChange,
  onDescriptionChange,
  onDesignBriefChange,
  onGeneratePO,
}: DemandSummaryProps) {
  const [currentDescription, setCurrentDescription] = useState(productDetails.description)
  const [currentBrief, setCurrentBrief] = useState(productDetails.designBriefSummary || "")
  const [currentQuantity, setCurrentQuantity] = useState(productDetails.quantity)

  // State for discount visualization
  const [currentDiscountInfo, setCurrentDiscountInfo] = useState(
    calculateDiscountedPrice(productDetails.basePrice, productDetails.quantity),
  )
  const [activeDiscountTier, setActiveDiscountTier] = useState<DiscountTier>(
    getApplicableDiscountTier(productDetails.quantity),
  )
  const [nextTierInfo, setNextTierInfo] = useState<DiscountTier | null>(getNextDiscountTier(productDetails.quantity))
  const [justReachedTier, setJustReachedTier] = useState<DiscountTier | null>(null)

  useEffect(() => {
    setCurrentDescription(productDetails.description)
    // When description changes, basePrice might change, so recalculate discount info
    const newDiscount = calculateDiscountedPrice(productDetails.basePrice, currentQuantity)
    setCurrentDiscountInfo(newDiscount)
    setActiveDiscountTier(getApplicableDiscountTier(currentQuantity))
    setNextTierInfo(getNextDiscountTier(currentQuantity))
  }, [productDetails.description, productDetails.basePrice, currentQuantity])

  useEffect(() => {
    setCurrentBrief(productDetails.designBriefSummary || "")
  }, [productDetails.designBriefSummary])

  useEffect(() => {
    setCurrentQuantity(productDetails.quantity)
    const newDiscount = calculateDiscountedPrice(productDetails.basePrice, productDetails.quantity)
    setCurrentDiscountInfo(newDiscount)
    setActiveDiscountTier(getApplicableDiscountTier(productDetails.quantity))
    setNextTierInfo(getNextDiscountTier(productDetails.quantity))
  }, [productDetails.quantity, productDetails.basePrice])

  const handleLocalDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentDescription(e.target.value)
  }
  const handleDescriptionBlur = () => {
    const newBasePrice = calculateBaseItemPrice(currentDescription)
    onDescriptionChange(currentDescription, newBasePrice)
  }

  const handleLocalBriefChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentBrief(e.target.value)
  }
  const handleBriefBlur = () => {
    onDesignBriefChange(currentBrief)
  }

  const handleSliderChange = (value: number[]) => {
    const newQuantity = value[0]
    setCurrentQuantity(newQuantity)

    const oldTier = activeDiscountTier
    const newDiscount = calculateDiscountedPrice(productDetails.basePrice, newQuantity)
    const newActiveTier = getApplicableDiscountTier(newQuantity)

    setCurrentDiscountInfo(newDiscount)
    setActiveDiscountTier(newActiveTier)
    setNextTierInfo(getNextDiscountTier(newQuantity))

    if (
      newActiveTier.minQuantity !== oldTier.minQuantity &&
      newActiveTier.discountPercentage > oldTier.discountPercentage
    ) {
      setJustReachedTier(newActiveTier) // Store the tier object
      setTimeout(() => setJustReachedTier(null), 3000) // Animation/display duration
    }

    onQuantityChange(
      newQuantity,
      newDiscount.pricePerItemAfterDiscount,
      newDiscount.totalPrice,
      newDiscount.discountPercentage,
      newDiscount.originalTotalPrice,
      newDiscount.savings,
    )
  }

  const progressToNextTier = nextTierInfo
    ? Math.max(
        0,
        Math.min(
          100,
          ((currentQuantity - activeDiscountTier.minQuantity) /
            (nextTierInfo.minQuantity - activeDiscountTier.minQuantity)) *
            100,
        ),
      )
    : 100

  const getTierIcon = (tier: DiscountTier | null) => {
    if (!tier || tier.discountPercentage === 0) return <Sparkles className="h-5 w-5 text-slate-500" />
    if (tier.discountPercentage <= 5) return <Gift className="h-5 w-5 text-green-500" />
    if (tier.discountPercentage <= 10) return <TrendingUp className="h-5 w-5 text-blue-500" />
    return <Zap className="h-5 w-5 text-orange-500" />
  }

  return (
    <Card className="w-full border-none shadow-none bg-transparent text-foreground">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-medium">Review Your Design Request</CardTitle>
      </CardHeader>

      <CardContent className="px-0 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-4">
            <div className="relative w-full h-48 rounded-md overflow-hidden border border-border bg-card">
              <Image
                src={productDetails.imageUrl || "/placeholder.svg?text=Design"}
                alt="Product mockup"
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity-slider" className="text-sm font-medium">
                Quantity: {currentQuantity}
              </Label>
              <Slider
                id="quantity-slider"
                value={[currentQuantity]}
                min={1}
                max={200}
                step={1}
                onValueChange={handleSliderChange}
                className="w-full [&>span:first-child]:h-3 [&>span:first-child_span]:h-3 [&>span:first-child_span]:w-3 [&>span:first-child_span]:border-2"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="design-brief" className="font-medium mb-1 block">
                Design Brief Summary (Editable)
              </Label>
              <Textarea
                id="design-brief"
                value={currentBrief}
                onChange={handleLocalBriefChange}
                onBlur={handleBriefBlur}
                placeholder="AI's understanding of your key requirements..."
                className="bg-card border-border focus:ring-primary min-h-[100px]"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="design-description" className="font-medium mb-1 block">
                Detailed Notes / Original Request (Editable)
              </Label>
              <Textarea
                id="design-description"
                value={currentDescription}
                onChange={handleLocalDescriptionChange}
                onBlur={handleDescriptionBlur}
                placeholder="Your detailed description or any specific notes..."
                className="bg-card border-border focus:ring-primary min-h-[80px]"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Fancy Discount Meter Section */}
        <div className="p-4 rounded-lg border border-dashed border-primary/50 bg-primary/5 relative overflow-hidden">
          {justReachedTier && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 animate-fade-in">
              <div className="bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 p-4 rounded-lg shadow-2xl text-center transform scale-100 group-hover:scale-105 transition-transform duration-300">
                <Zap
                  className="h-10 w-10 text-white mx-auto mb-2 animate-ping opacity-75"
                  style={{ animationDuration: "1.5s" }}
                />
                <h3 className="text-xl font-bold text-white">{justReachedTier.label}</h3>
                <p className="text-sm text-white/80">You're saving even more!</p>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-md font-semibold text-primary flex items-center">
              {getTierIcon(activeDiscountTier)}
              <span className="ml-2">
                {activeDiscountTier.discountPercentage > 0
                  ? `${activeDiscountTier.discountPercentage}% Discount Active!`
                  : "Volume Discounts Available!"}
              </span>
            </h3>
            {currentDiscountInfo.savings > 0 && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100 animate-fade-in">
                SAVING ${currentDiscountInfo.savings.toFixed(2)}
              </span>
            )}
          </div>
          <Progress
            value={progressToNextTier}
            className="w-full h-3 mb-1 transition-all duration-500 ease-out bg-primary/20 [&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-blue-500"
          />
          {nextTierInfo ? (
            <p className="text-xs text-primary/80 text-center">
              Order{" "}
              <strong className="font-bold">{Math.max(0, nextTierInfo.minQuantity - currentQuantity)} more</strong> to
              reach <strong className="font-bold">{nextTierInfo.discountPercentage}% off</strong>!
            </p>
          ) : (
            <p className="text-xs text-green-600 dark:text-green-400 font-semibold text-center">
              🎉 You've reached the maximum discount!
            </p>
          )}
        </div>

        <div className="text-right mt-4">
          {currentDiscountInfo.discountPercentage > 0 && (
            <p className="text-xs text-foreground/70 line-through">
              Original: ${currentDiscountInfo.originalTotalPrice.toFixed(2)}
            </p>
          )}
          <p className="text-sm font-medium">Estimated Price (after discount)</p>
          <p className="text-xl font-semibold text-primary">${currentDiscountInfo.totalPrice.toFixed(2)}</p>
          {currentQuantity > 0 && (
            <p className="text-xs text-foreground/70">
              (${currentDiscountInfo.pricePerItemAfterDiscount.toFixed(2)} each)
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-0 pt-6">
        <Button className="w-full" onClick={onGeneratePO}>
          Generate Purchase Order
        </Button>
      </CardFooter>
    </Card>
  )
}
