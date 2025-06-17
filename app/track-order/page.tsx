"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, CheckCircle, Loader2, AlertCircle } from "lucide-react" // Added UserCircle

// Mock order statuses - Added customerName
const mockOrderData: {
  [key: string]: { status: string; details: string; lastUpdate: string; customerName: string }
} = {
  "CONF-12345678": {
    status: "Processing",
    details: "Your design is being reviewed by our team. A formal quote will be sent to your email soon.",
    lastUpdate: "2025-06-01 10:00 AM",
    customerName: "Jane Doe",
  },
  "CONF-87654321": {
    status: "Quote Sent",
    details: "A formal quote has been sent to your registered email address. Please check your inbox and spam folder.",
    lastUpdate: "2025-06-02 02:30 PM",
    customerName: "John Smith",
  },
  "CONF-11223344": {
    status: "Awaiting Payment",
    details: "Quote approved. We are awaiting payment to proceed with production.",
    lastUpdate: "2025-06-03 11:15 AM",
    customerName: "Alice Johnson",
  },
  "CONF-55667788": {
    status: "In Production",
    details: "Payment received. Your custom merchandise is now in production. Estimated completion: 3-5 business days.",
    lastUpdate: "2025-06-04 09:00 AM",
    customerName: "Robert Brown",
  },
  "CONF-99001122": {
    status: "Shipped",
    details: "Your order has been shipped! Tracking number: XYZ123ABC. Estimated delivery: 2-3 business days.",
    lastUpdate: "2025-06-07 04:45 PM",
    customerName: "Emily Davis",
  },
  // Example for testing with a name from UserInfoForm
  "CONF-63A2B4CD": {
    // Example: CONF- + last 8 of Date.now()
    status: "Order Confirmed",
    details: "Your order request has been received and is pending review. A formal quote will be sent to your email.",
    lastUpdate: "2025-06-08 09:00 AM",
    customerName: "Test User One", // Match a name you might submit via UserInfoForm
  },
}

type OrderStatus = "initial" | "loading" | "found" | "notFound" | "error"

export default function TrackOrderPage() {
  const [confirmationNumber, setConfirmationNumber] = useState("")
  const [fullName, setFullName] = useState("") // New state for full name
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("initial")
  const [orderDetails, setOrderDetails] = useState<{ status: string; details: string; lastUpdate: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!confirmationNumber.trim() || !fullName.trim()) {
      // Validate both fields
      setError("Please enter both confirmation number and full name.")
      setOrderStatus("error")
      return
    }
    setOrderStatus("loading")
    setError(null)
    setOrderDetails(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const confNumUpper = confirmationNumber.toUpperCase().trim()
    const fullNameLower = fullName.toLowerCase().trim()

    const foundOrder = mockOrderData[confNumUpper]

    if (foundOrder && foundOrder.customerName.toLowerCase().trim() === fullNameLower) {
      setOrderDetails(foundOrder)
      setOrderStatus("found")
    } else {
      setOrderStatus("notFound")
    }
  }

  const getStatusIcon = () => {
    if (!orderDetails) return <Info className="h-5 w-5" />
    switch (orderDetails.status.toLowerCase()) {
      case "processing":
      case "in production":
      case "order confirmed":
        return <Loader2 className="h-5 w-5 animate-spin" />
      case "quote sent":
      case "awaiting payment":
        return <Info className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const resetSearch = () => {
    setOrderStatus("initial")
    setOrderDetails(null)
    setError(null)
  }

  return (
    <div className="container mx-auto p-4 sm:p-8 flex-grow">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-primary">
              Check Your Order Status
            </CardTitle>
            <CardDescription className="text-center text-foreground/70">
              Enter your confirmation number and full name to see the latest updates on your order.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="confirmationNumber" className="block text-sm font-medium text-foreground/90">
                  Confirmation Number
                </label>
                <Input
                  id="confirmationNumber"
                  type="text"
                  value={confirmationNumber}
                  onChange={(e) => {
                    setConfirmationNumber(e.target.value)
                    if (orderStatus !== "initial" && orderStatus !== "loading") resetSearch()
                  }}
                  placeholder="e.g., CONF-12345678"
                  className="bg-background border-border focus:ring-primary text-base"
                  required
                />
              </div>
              <div className="space-y-2">
                {" "}
                {/* New field for Full Name */}
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground/90">
                  Full Name (as provided during order)
                </label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value)
                    if (orderStatus !== "initial" && orderStatus !== "loading") resetSearch()
                  }}
                  placeholder="e.g., Jane Doe"
                  className="bg-background border-border focus:ring-primary text-base"
                  required
                />
              </div>
              <Button type="submit" className="w-full text-base py-3" disabled={orderStatus === "loading"}>
                {orderStatus === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  "Track Order"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {orderStatus === "error" && error && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {orderStatus === "found" && orderDetails && (
          <Card className="mt-6 shadow-md">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center gap-3">
                {getStatusIcon()}
                <CardTitle className="text-xl">Order Status: {orderDetails.status}</CardTitle>
              </div>
              <CardDescription>
                For: {orderDetails.customerName} | Confirmation #: {confirmationNumber.toUpperCase().trim()}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <p className="text-foreground/90">{orderDetails.details}</p>
              <p className="text-sm text-foreground/60">Last Updated: {orderDetails.lastUpdate}</p>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-foreground/50">
                If you have any questions, please contact support with your confirmation number.
              </p>
            </CardFooter>
          </Card>
        )}

        {orderStatus === "notFound" && (
          <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Order Not Found or Details Mismatch</AlertTitle>
            <AlertDescription>
              We couldn&apos;t find an order with that confirmation number and full name combination. Please
              double-check the details and try again. Ensure the name matches the one provided during order placement.
              If the issue persists, contact support.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
