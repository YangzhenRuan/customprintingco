"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
// calculateDiscountedPrice is not needed here if all info is passed in productDetails
// import { calculateDiscountedPrice } from "@/lib/pricing";

interface ProductDetailsForPO {
  description: string
  imageUrl: string
  basePrice: number // Base price per item BEFORE discount
  quantity: number
  designBriefSummary?: string
  // These should now be passed from ChatInterface's currentOrderDetails
  pricePerItemAfterDiscount: number
  totalPrice: number // This is the subtotal after discount
  discountPercentage?: number
  originalTotalPrice?: number
  savings?: number
}

interface PurchaseOrderDisplayProps {
  poNumber: string
  productDetails: ProductDetailsForPO
  onProceedToUserInfo: () => void
  onEditOrder: () => void
}

export default function PurchaseOrderDisplay({
  poNumber,
  productDetails,
  onProceedToUserInfo,
  onEditOrder,
}: PurchaseOrderDisplayProps) {
  const {
    description,
    imageUrl,
    basePrice,
    quantity,
    pricePerItemAfterDiscount,
    totalPrice: discountedSubtotal, // Renaming for clarity
    discountPercentage,
    originalTotalPrice,
    savings,
  } = productDetails

  const taxRate = 0.08 // Example tax rate 8%
  const taxAmount = discountedSubtotal * taxRate
  const finalTotal = discountedSubtotal + taxAmount

  return (
    <Card className="w-full bg-card text-foreground border-border shadow-lg">
      <CardHeader className="bg-muted/30 p-4 rounded-t-lg">
        <CardTitle className="text-xl text-primary">Purchase Order: #{poNumber}</CardTitle>
        <CardDescription>Date: {new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {productDetails.designBriefSummary && (
          <>
            <div>
              <h4 className="font-semibold text-md mb-1">Design Brief Summary:</h4>
              <p className="text-sm text-foreground/80 whitespace-pre-wrap bg-background/50 p-2 rounded-md border border-border">
                {productDetails.designBriefSummary}
              </p>
            </div>
            <Separator />
          </>
        )}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden border border-border bg-white flex-shrink-0">
            <Image
              src={imageUrl || "/placeholder.svg?text=Design"}
              alt="Product mockup"
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Item: Custom Designed Product</h3>
            <p className="text-sm text-foreground/80 mt-1 whitespace-pre-wrap">
              <strong>Details:</strong> {description}
            </p>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <span className="font-medium">Unit Price (Base):</span> ${basePrice.toFixed(2)}
          </div>
          <div>
            <span className="font-medium">Quantity:</span> {quantity}
          </div>

          {originalTotalPrice !== undefined && ( // Check if originalTotalPrice is available
            <div>
              <span className="font-medium">Original Subtotal:</span> ${originalTotalPrice.toFixed(2)}
            </div>
          )}

          {discountPercentage !== undefined && discountPercentage > 0 && savings !== undefined && (
            <>
              <div>
                <span className="font-medium text-green-600 dark:text-green-400">
                  Volume Discount ({discountPercentage}%):
                </span>
                <span className="text-green-600 dark:text-green-400"> -${savings.toFixed(2)}</span>
              </div>
              <div>
                <span className="font-medium">Subtotal (After Discount):</span> ${discountedSubtotal.toFixed(2)}
              </div>
            </>
          )}
          {(discountPercentage === undefined || discountPercentage === 0) && originalTotalPrice !== undefined && (
            <div>
              <span className="font-medium">Subtotal:</span> ${originalTotalPrice.toFixed(2)}
            </div>
          )}
          {/* Fallback if originalTotalPrice is not available but discountedSubtotal is */}
          {(discountPercentage === undefined || discountPercentage === 0) && originalTotalPrice === undefined && (
            <div>
              <span className="font-medium">Subtotal:</span> ${discountedSubtotal.toFixed(2)}
            </div>
          )}

          <div>
            <span className="font-medium">Estimated Tax ({(taxRate * 100).toFixed(0)}%):</span> ${taxAmount.toFixed(2)}
          </div>
        </div>

        <Separator />

        <div className="text-right">
          <p className="text-lg font-bold text-primary">Estimated Total: ${finalTotal.toFixed(2)}</p>
          <p className="text-xs text-foreground/60">A formal quote will be provided.</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 flex flex-col sm:flex-row gap-2 justify-end border-t border-border bg-muted/30 rounded-b-lg">
        <Button variant="outline" onClick={onEditOrder}>
          Edit Order
        </Button>
        <Button onClick={onProceedToUserInfo} className="w-full sm:w-auto">
          Confirm & Enter Your Details
        </Button>
      </CardFooter>
    </Card>
  )
}
