import { generateImageUrl } from "./image-generator"
import { calculateBaseItemPrice } from "./pricing" // Import from pricing.ts
import type { Product } from "./product"

// calculatePrice is now effectively calculateBaseItemPrice and is in pricing.ts
// createProduct might not be directly used by chat-interface anymore if designSpec drives it,
// but let's keep it for potential other uses or as a reference.
export function createProduct(description: string): Product {
  const imageUrl = generateImageUrl(description)
  const price = calculateBaseItemPrice(description) // Use the one from pricing.ts

  return {
    description,
    imageUrl,
    price, // This is the base price per item
  }
}
