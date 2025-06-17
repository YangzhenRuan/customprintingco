export const DISCOUNT_TIERS = [
  { minQuantity: 1, discountPercentage: 0, label: "Standard Price" },
  { minQuantity: 10, discountPercentage: 5, label: "5% Off Unlocked!" },
  { minQuantity: 25, discountPercentage: 10, label: "10% Off Unlocked!" },
  { minQuantity: 50, discountPercentage: 15, label: "15% Off Unlocked!" },
  { minQuantity: 100, discountPercentage: 20, label: "MAX SAVINGS: 20% Off!" },
] as const // Use "as const" for better type inference

export type DiscountTier = (typeof DISCOUNT_TIERS)[number]

export function getApplicableDiscountTier(quantity: number): DiscountTier {
  let applicableTier: DiscountTier = DISCOUNT_TIERS[0]
  for (let i = DISCOUNT_TIERS.length - 1; i >= 0; i--) {
    if (quantity >= DISCOUNT_TIERS[i].minQuantity) {
      applicableTier = DISCOUNT_TIERS[i]
      break
    }
  }
  return applicableTier
}

export function getNextDiscountTier(quantity: number): DiscountTier | null {
  const currentTier = getApplicableDiscountTier(quantity)
  const currentTierIndex = DISCOUNT_TIERS.findIndex((tier) => tier.minQuantity === currentTier.minQuantity)

  if (currentTierIndex < DISCOUNT_TIERS.length - 1) {
    return DISCOUNT_TIERS[currentTierIndex + 1]
  }
  return null // Already at max discount
}

export function calculateDiscountedPrice(
  basePricePerItem: number,
  quantity: number,
): {
  totalPrice: number
  discountPercentage: number
  pricePerItemAfterDiscount: number
  originalTotalPrice: number
  savings: number
} {
  const tier = getApplicableDiscountTier(quantity)
  const discountPercentage = tier.discountPercentage
  const originalTotalPrice = basePricePerItem * quantity
  const discountAmount = originalTotalPrice * (discountPercentage / 100)
  const totalPrice = originalTotalPrice - discountAmount
  const pricePerItemAfterDiscount = quantity > 0 ? totalPrice / quantity : basePricePerItem

  return {
    totalPrice,
    discountPercentage,
    pricePerItemAfterDiscount,
    originalTotalPrice,
    savings: discountAmount,
  }
}

// This function can remain in ai-service.ts or be moved to pricing.ts
// For now, let's assume it's used to get the BASE price before discounts.
export function calculateBaseItemPrice(description: string): number {
  const lowerDesc = description.toLowerCase()
  let basePrice = 19.99 // Default t-shirt price

  if (lowerDesc.includes("hoodie")) {
    basePrice = 39.99
  } else if (lowerDesc.includes("mug")) {
    basePrice = 14.99
  } else if (lowerDesc.includes("sticker")) {
    basePrice = 4.99
  } else if (lowerDesc.includes("hat")) {
    basePrice = 24.99
  } else if (lowerDesc.includes("t-shirt")) {
    // More specific check for t-shirt
    basePrice = 22.99
  }
  return Number.parseFloat(basePrice.toFixed(2))
}
