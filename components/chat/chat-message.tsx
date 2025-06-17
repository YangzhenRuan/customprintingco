"use client"
import { Button } from "@/components/ui/button"
import { Check, RefreshCw, Upload, Edit } from "lucide-react" // Added Edit3, MessageSquarePlus
import DemandSummary from "@/components/product/demand-summary"
import PurchaseOrderDisplay from "@/components/product/purchase-order-display"
import UserInfoForm from "@/components/product/user-info-form"
import type { UserInfo } from "@/components/product/user-info-form"
import ProductPreview from "@/components/product/product-preview"
import LogoEditor from "@/components/product/logo-editor"
import Image from "next/image"

// Re-define DesignSpecification here or import if moved to a shared types file
interface DesignSpecification {
  productType?: string
  useCase?: string
  style?: string
  text?: string
  textFont?: string
  textColor?: string
  backgroundColor?: string
  customImage?: string | null
}

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  type:
    | "text"
    | "image" // For AI generated mockup
    | "userImageUpload" // For user uploaded image in chat
    | "confirmation"
    | "demandSummary"
    | "purchaseOrder"
    | "userInfoForm"
    | "orderConfirmation"
    | "logoEditor"
    | "aiSummaryWithActions" // New type
  imageUrl?: string
  timestamp: Date
  poNumber?: string
  confirmationNumber?: string
  logoEditorData?: { productImageUrl?: string }
  designSpecSnapshot?: DesignSpecification // Added for context with aiSummaryWithActions
}

interface CurrentOrderDetailsType {
  description: string
  imageUrl: string
  price: number
  quantity: number
  designBriefSummary?: string
  customizedLogoUrl?: string
}

interface ChatMessageProps {
  message: Message
  currentOrderDetails: CurrentOrderDetailsType // For DemandSummary, PO etc.

  // Handlers for AI Summary Actions
  onLooksGoodContinue: (specSnapshot: DesignSpecification) => void
  onEditThisPart: (specSnapshot: DesignSpecification) => void
  onUploadUserImageForDesign: () => void
  onCreateManually: (specSnapshot: DesignSpecification) => void

  // Handlers for Mockup Preview Actions (after "Looks good, continue")
  onConfirmDesign: () => void // User confirms the AI generated mockup
  onTryAnotherDesign: () => void // User wants to revise after seeing mockup

  // Existing handlers
  onQuantityChange: (quantity: number) => void
  onDescriptionChange: (description: string) => void
  onDesignBriefChange: (brief: string) => void
  onGeneratePO: () => void
  onEditOrderFromPO: () => void
  onProceedToUserInfo: () => void
  onUserInfoSubmit: (userInfo: UserInfo) => void
  onLogoEditorExport: (imageDataUrl: string, originalLogoName?: string) => void
  onCloseLogoEditor: () => void
  poNumber: string
  confirmationNumber: string
}

export default function ChatMessage({
  message,
  currentOrderDetails,
  onLooksGoodContinue,
  onEditThisPart,
  onUploadUserImageForDesign,
  onCreateManually,
  onConfirmDesign,
  onTryAnotherDesign,
  onQuantityChange,
  onDescriptionChange,
  onDesignBriefChange,
  onGeneratePO,
  onEditOrderFromPO,
  onProceedToUserInfo,
  onUserInfoSubmit,
  onLogoEditorExport,
  onCloseLogoEditor,
  poNumber,
  confirmationNumber,
}: ChatMessageProps) {
  const isUser = message.sender === "user"

  let historicalOrderDetails: CurrentOrderDetailsType = currentOrderDetails
  if (message.type === "demandSummary" || message.type === "purchaseOrder") {
    try {
      historicalOrderDetails = JSON.parse(message.content)
    } catch (e) {
      console.error("Failed to parse message content for historical order details", e)
    }
  }

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-2xl p-3 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] ${
          isUser ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"
        } ${
          message.type === "demandSummary" ||
          message.type === "purchaseOrder" ||
          message.type === "userInfoForm" ||
          message.type === "orderConfirmation" ||
          message.type === "logoEditor" ||
          message.type === "aiSummaryWithActions" // Make summary full width
            ? "w-full"
            : ""
        }`}
      >
        {/* User uploaded image in their message */}
        {isUser && message.type === "userImageUpload" && message.imageUrl && (
          <div className="mb-2 max-w-xs">
            <Image
              src={message.imageUrl || "/placeholder.svg"}
              alt="User upload"
              width={200}
              height={200}
              className="rounded-lg object-contain max-h-48 w-auto"
            />
          </div>
        )}

        {/* Standard text content, excluding complex types handled below */}
        {message.content &&
          message.type !== "demandSummary" &&
          message.type !== "purchaseOrder" &&
          message.type !== "userInfoForm" &&
          message.type !== "orderConfirmation" &&
          message.type !== "logoEditor" &&
          message.type !== "aiSummaryWithActions" && // Handled separately
          message.type !== "image" && ( // AI Mockup preview, handled separately
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}

        {/* AI Generated Mockup Preview (type: "image") */}
        {!isUser && message.type === "image" && (
          <div className="space-y-3">
            {message.content && <p className="whitespace-pre-wrap">{message.content}</p>}
            {message.imageUrl && (
              <div className="space-y-3">
                <ProductPreview imageUrl={message.imageUrl} />
                <div className="flex flex-wrap gap-2">
                  <Button onClick={onConfirmDesign} className="flex items-center gap-1 text-sm py-1.5 px-3 h-auto">
                    <Check className="h-4 w-4" />
                    <span>Looks great!</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onTryAnotherDesign}
                    className="flex items-center gap-1 text-sm py-1.5 px-3 h-auto"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Try another</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Summary with Action Buttons */}
        {!isUser && message.type === "aiSummaryWithActions" && (
          <div className="space-y-3">
            <p className="whitespace-pre-wrap font-medium">{message.content}</p>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 pt-2">
              <Button
                onClick={() => message.designSpecSnapshot && onLooksGoodContinue(message.designSpecSnapshot)}
                className="flex items-center justify-center gap-1.5 text-sm py-2 h-auto bg-green-500 hover:bg-green-600 text-white"
                disabled={!message.designSpecSnapshot}
              >
                <Check className="h-4 w-4" />
                Looks good, continue
              </Button>
              <Button
                variant="outline"
                onClick={() => message.designSpecSnapshot && onEditThisPart(message.designSpecSnapshot)}
                className="flex items-center justify-center gap-1.5 text-sm py-2 h-auto"
                disabled={!message.designSpecSnapshot}
              >
                <RefreshCw className="h-4 w-4" />
                Edit this part
              </Button>
              <Button
                variant="outline"
                onClick={onUploadUserImageForDesign}
                className="flex items-center justify-center gap-1.5 text-sm py-2 h-auto"
              >
                <Upload className="h-4 w-4" />
                Upload my own image
              </Button>
              <Button
                variant="outline"
                onClick={() => message.designSpecSnapshot && onCreateManually(message.designSpecSnapshot)}
                className="flex items-center justify-center gap-1.5 text-sm py-2 h-auto"
                disabled={!message.designSpecSnapshot}
              >
                <Edit className="h-4 w-4" />
                Create design manually
              </Button>
            </div>
          </div>
        )}

        {!isUser && message.type === "confirmation" && <p className="whitespace-pre-wrap">{message.content}</p>}

        {!isUser && message.type === "demandSummary" && (
          <DemandSummary
            productDetails={historicalOrderDetails}
            onQuantityChange={onQuantityChange}
            onDescriptionChange={onDescriptionChange}
            onDesignBriefChange={onDesignBriefChange}
            onGeneratePO={onGeneratePO}
          />
        )}

        {!isUser && message.type === "purchaseOrder" && (
          <PurchaseOrderDisplay
            poNumber={message.poNumber || poNumber}
            productDetails={historicalOrderDetails}
            onProceedToUserInfo={onProceedToUserInfo}
            onEditOrder={onEditOrderFromPO}
          />
        )}

        {!isUser && message.type === "userInfoForm" && <UserInfoForm onSubmit={onUserInfoSubmit} />}

        {!isUser && message.type === "orderConfirmation" && (
          <div className="p-2 bg-primary/10 rounded-md">
            <h3 className="font-semibold text-lg text-primary mb-2">Order Request Confirmed!</h3>
            <p className="whitespace-pre-wrap text-sm">{message.content}</p>
          </div>
        )}

        {!isUser && message.type === "logoEditor" && (
          <>
            {message.content && <p className="whitespace-pre-wrap mb-2 text-sm">{message.content}</p>}
            <LogoEditor
              onExportImage={onLogoEditorExport}
              onClose={onCloseLogoEditor}
              productImageUrl={message.logoEditorData?.productImageUrl}
            />
          </>
        )}
      </div>
    </div>
  )
}
