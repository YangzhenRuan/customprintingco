"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, XCircle, Paperclip, X, Edit3 } from "lucide-react"
import ChatMessage from "@/components/chat/chat-message"
import { generateImageUrl } from "@/lib/image-generator" // Corrected import
import type { UserInfo } from "@/components/product/user-info-form"
import { calculateBaseItemPrice, calculateDiscountedPrice } from "@/lib/pricing"

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

type MessageType =
  | "text"
  | "image"
  | "userImageUpload"
  | "confirmation"
  | "demandSummary"
  | "purchaseOrder"
  | "userInfoForm"
  | "orderConfirmation"
  | "logoEditor"
  | "aiSummaryWithActions"

type SenderType = "user" | "ai"

interface Message {
  id: string
  content: string
  sender: SenderType
  type: MessageType
  imageUrl?: string
  timestamp: Date
  poNumber?: string
  confirmationNumber?: string
  logoEditorData?: { productImageUrl?: string }
  designSpecSnapshot?: DesignSpecification
}

type ChatStage =
  | "initial"
  | "gatheringRequirements"
  | "designPreview"
  | "demandSummary"
  | "purchaseOrderReview"
  | "userInfoCollection"
  | "orderConfirmed"
  | "logoEditing"

interface CurrentOrderDetailsType {
  description: string
  imageUrl: string
  basePrice: number // Base price per item BEFORE discount
  pricePerItemAfterDiscount: number
  totalPrice: number
  quantity: number
  designBriefSummary?: string
  customizedLogoUrl?: string
  discountPercentage?: number
  originalTotalPrice?: number
  savings?: number
}

interface ChatInterfaceProps {
  onEndChat: () => void
  initialSelections: { productType: string; useCase: string; style: string }
}

export default function ChatInterface({ onEndChat, initialSelections }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [chatStage, setChatStage] = useState<ChatStage>("initial")
  const [isLoading, setIsLoading] = useState(false)
  const [designSpec, setDesignSpec] = useState<DesignSpecification>({
    productType: initialSelections.productType,
    useCase: initialSelections.useCase,
    style: initialSelections.style,
  })

  const initialBasePrice = calculateBaseItemPrice(
    `${initialSelections.style} ${initialSelections.productType} for ${initialSelections.useCase}`,
  )
  const initialDiscountInfo = calculateDiscountedPrice(initialBasePrice, 1)

  const [currentOrderDetails, setCurrentOrderDetails] = useState<CurrentOrderDetailsType>({
    description: "",
    imageUrl: "",
    basePrice: initialBasePrice,
    pricePerItemAfterDiscount: initialDiscountInfo.pricePerItemAfterDiscount,
    totalPrice: initialDiscountInfo.totalPrice,
    quantity: 1,
    designBriefSummary: "",
    discountPercentage: initialDiscountInfo.discountPercentage,
    originalTotalPrice: initialDiscountInfo.originalTotalPrice,
    savings: initialDiscountInfo.savings,
  })

  const [currentUserInfo, setCurrentUserInfo] = useState<UserInfo | null>(null)
  const [uploadedImageForChat, setUploadedImageForChat] = useState<string | null>(null)
  const [currentPoNumber, setCurrentPoNumber] = useState<string>("")
  const [currentConfirmationNumber, setCurrentConfirmationNumber] = useState<string>("")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const { productType, useCase, style } = initialSelections
    const productLabel = productType.replace("-", " ")
    const introContent = `You're creating a ${style} ${productLabel} for ${useCase.toLowerCase()}. What do you want it to say or feature? You can describe elements, text, colors, or upload an image.`

    const welcomeMessage: Message = {
      id: "ai-initial-context",
      content: introContent,
      sender: "ai",
      type: "text",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
    setChatStage("gatheringRequirements")
    const baseDesc = `${style} ${productLabel} for ${useCase.toLowerCase()}`
    const newBasePrice = calculateBaseItemPrice(baseDesc)
    const newDiscountInfo = calculateDiscountedPrice(newBasePrice, 1) // Initial quantity is 1

    setDesignSpec({ productType, useCase, style })
    setCurrentOrderDetails((prev) => ({
      ...prev,
      description: baseDesc,
      basePrice: newBasePrice,
      pricePerItemAfterDiscount: newDiscountInfo.pricePerItemAfterDiscount,
      totalPrice: newDiscountInfo.totalPrice,
      quantity: 1, // Explicitly set initial quantity
      discountPercentage: newDiscountInfo.discountPercentage,
      originalTotalPrice: newDiscountInfo.originalTotalPrice,
      savings: newDiscountInfo.savings,
    }))
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [initialSelections])

  const handleUserImageUploadForChat = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        setUploadedImageForChat(imageUrl)
        if (!inputValue.trim()) {
          const userMessage: Message = {
            id: `user-${Date.now()}`,
            content: "I'd like to use this image.",
            sender: "user",
            type: "userImageUpload",
            imageUrl: imageUrl,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, userMessage])
          setUploadedImageForChat(null)
          setIsLoading(true)
          processUserRequest(userMessage.content, imageUrl).finally(() => setIsLoading(false))
        }
      }
      reader.readAsDataURL(file)
    }
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeUploadedImagePreview = () => setUploadedImageForChat(null)

  const handleSendMessage = async () => {
    const currentInput = inputValue.trim()
    const currentImage = uploadedImageForChat
    if (!currentInput && !currentImage) return
    if (isInputDisabled) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: currentInput || (currentImage ? "Here's an image I want to use." : "No input"),
      sender: "user",
      type: currentImage ? "userImageUpload" : "text",
      imageUrl: currentImage || undefined,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setUploadedImageForChat(null)
    setIsLoading(true)
    await processUserRequest(currentInput, currentImage || undefined)
    setIsLoading(false)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const processUserRequest = async (userInput: string, userImageUrl?: string) => {
    const newSpec = { ...designSpec }
    if (userImageUrl) newSpec.customImage = userImageUrl
    if (userInput) {
      // Basic parsing, can be improved with NLP/LLM
      if (userInput.toLowerCase().includes("text ") || userInput.toLowerCase().includes("says ")) {
        const match = userInput.match(/text ['"]?(.*?)['"]?$/i) || userInput.match(/says ['"]?(.*?)['"]?$/i)
        if (match && match[1]) newSpec.text = match[1]
      } else {
        // Append to existing text or set if new
        newSpec.text = (newSpec.text ? newSpec.text + "; " : "") + userInput
      }
    }
    setDesignSpec(newSpec)

    let summary = `So far: a ${newSpec.style || ""} ${newSpec.productType?.replace("-", " ") || ""} for ${newSpec.useCase?.toLowerCase() || ""}.`
    if (newSpec.text) summary += ` It should say "${newSpec.text}".`
    if (newSpec.textColor) summary += ` Text color: ${newSpec.textColor}.`
    if (newSpec.textFont) summary += ` Font: ${newSpec.textFont}.`
    if (newSpec.backgroundColor) summary += ` Background: ${newSpec.backgroundColor}.`
    if (newSpec.customImage) summary += ` Includes an uploaded image.`

    const aiSummaryMessage: Message = {
      id: `ai-summary-${Date.now()}`,
      content: summary,
      sender: "ai",
      type: "aiSummaryWithActions",
      timestamp: new Date(),
      designSpecSnapshot: { ...newSpec },
    }
    setMessages((prev) => [...prev, aiSummaryMessage])
    setChatStage("gatheringRequirements")
  }

  const handleLooksGoodContinue = async (specSnapshot: DesignSpecification) => {
    setIsLoading(true)
    const thinkingMessage: Message = {
      id: `ai-thinking-mockup-${Date.now()}`,
      content: "Okay, generating your design mockup...",
      sender: "ai",
      type: "text",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, thinkingMessage])

    const descriptionForMockup = `${specSnapshot.style || ""} ${specSnapshot.productType?.replace("-", " ") || ""} for ${specSnapshot.useCase?.toLowerCase() || ""}, text: ${specSnapshot.text || "N/A"}, custom image: ${specSnapshot.customImage ? "yes" : "no"}`

    // Use generateImageUrl from the new file
    const mockupImageUrl = generateImageUrl(
      descriptionForMockup + (specSnapshot.customImage ? " with uploaded image" : ""),
    )

    const newBasePrice = calculateBaseItemPrice(descriptionForMockup)
    const newDiscountInfo = calculateDiscountedPrice(newBasePrice, currentOrderDetails.quantity)

    setCurrentOrderDetails((prev) => ({
      ...prev,
      description: descriptionForMockup,
      imageUrl: mockupImageUrl,
      basePrice: newBasePrice,
      pricePerItemAfterDiscount: newDiscountInfo.pricePerItemAfterDiscount,
      totalPrice: newDiscountInfo.totalPrice,
      discountPercentage: newDiscountInfo.discountPercentage,
      originalTotalPrice: newDiscountInfo.originalTotalPrice,
      savings: newDiscountInfo.savings,
      designBriefSummary:
        messages.find((m) => m.type === "aiSummaryWithActions" && m.designSpecSnapshot === specSnapshot)?.content ||
        "See chat for details.",
    }))

    setMessages((prev) => {
      const filtered = prev.filter((msg) => msg.id !== thinkingMessage.id)
      return [
        ...filtered,
        {
          id: `ai-mockup-${Date.now()}`,
          content: "Here's a preview of your design! What do you think?",
          sender: "ai",
          type: "image",
          imageUrl: mockupImageUrl,
          timestamp: new Date(),
        },
      ]
    })
    setChatStage("designPreview")
    setIsLoading(false)
  }

  const handleEditThisPart = (specSnapshot: DesignSpecification) => {
    const editPromptMessage: Message = {
      id: `ai-edit-prompt-${Date.now()}`,
      content:
        "Sure, what part of the design would you like to change or add to? (e.g., 'change text to Hello', 'make background blue', 'add a sun graphic')",
      sender: "ai",
      type: "text",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, editPromptMessage])
    setChatStage("gatheringRequirements")
    inputRef.current?.focus()
  }

  const handleUploadUserImageForDesign = () => {
    fileInputRef.current?.click()
  }

  const handleCreateManually = (specSnapshot: DesignSpecification) => {
    const editorMessage: Message = {
      id: `ai-logoeditor-manual-${Date.now()}`,
      content:
        "Okay, let's open the design editor. You can upload a product image as a background and then add elements or your logo.",
      sender: "ai",
      type: "logoEditor",
      timestamp: new Date(),
      logoEditorData: {
        productImageUrl:
          specSnapshot.customImage ||
          (specSnapshot.productType
            ? `/placeholder.svg?width=400&height=450&text=${specSnapshot.productType}`
            : undefined),
      },
    }
    setMessages((prev) => [...prev, editorMessage])
    setChatStage("logoEditing")
  }

  const openLogoEditorFromInput = (productImageUrl?: string) => {
    const pImageUrl = productImageUrl || currentOrderDetails.imageUrl || undefined
    const editorMessage: Message = {
      id: `ai-logoeditor-direct-${Date.now()}`,
      content: "Use the editor below. You can upload a product image as a background, then upload and place your logo.",
      sender: "ai",
      type: "logoEditor",
      timestamp: new Date(),
      logoEditorData: { productImageUrl: pImageUrl },
    }
    setMessages((prev) => [...prev, editorMessage])
    setChatStage("logoEditing")
  }

  const handleLogoEditorExport = (imageDataUrl: string, originalLogoName?: string) => {
    setDesignSpec((prev) => ({
      ...prev,
      customImage: imageDataUrl,
      text: (prev.text || "") + ` (customized with editor: ${originalLogoName || "edited design"})`,
    }))
    const summaryMessage: Message = {
      id: `ai-logoapplied-${Date.now()}`,
      content: `Great! I've updated the design with your manual edits. Here's the summary:`,
      sender: "ai",
      type: "text",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, summaryMessage])
    processUserRequest("", imageDataUrl) // Pass image data to process
    setChatStage("gatheringRequirements")
  }

  const handleCloseLogoEditor = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: `ai-editorclosed-${Date.now()}`,
        content: "Logo editor closed. Here's the current design summary:",
        sender: "ai",
        type: "text",
        timestamp: new Date(),
      },
    ])
    processUserRequest("") // Re-summarize current spec
    setChatStage("gatheringRequirements")
  }

  const handleConfirmDesignAndShowDemandSummary = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-confirm-mockup-${Date.now()}`,
        content: "Looks great!",
        sender: "user",
        type: "text",
        timestamp: new Date(),
      },
      {
        id: `ai-confirm-text-${Date.now()}`,
        content: "Excellent! Please review the design brief and order details. You can make changes if needed.",
        sender: "ai",
        type: "text",
        timestamp: new Date(),
      },
      {
        id: `ai-demandsummary-${Date.now()}`,
        content: JSON.stringify(currentOrderDetails), // Pass the full currentOrderDetails
        sender: "ai",
        type: "demandSummary",
        timestamp: new Date(),
      },
    ])
    setChatStage("demandSummary")
  }

  const handleTryAnotherDesignFromPreview = () => {
    setDesignSpec((prev) => ({ ...prev, customImage: null })) // Reset custom image if trying new AI design
    setMessages((prev) => [
      ...prev,
      {
        id: `user-tryanother-mockup-${Date.now()}`,
        content: "Let's try another design.",
        sender: "user",
        type: "text",
        timestamp: new Date(),
      },
      {
        id: `ai-redesign-${Date.now()}`,
        content: "No problem! What would you like to change in the design? Or describe a new idea.",
        sender: "ai",
        type: "text",
        timestamp: new Date(),
      },
    ])
    setChatStage("gatheringRequirements")
  }

  const handleQuantityChangeFromDemand = (
    quantity: number,
    newPricePerItem: number,
    newTotalPrice: number,
    newDiscountPercentage: number,
    newOriginalTotal: number,
    newSavings: number,
  ) => {
    setCurrentOrderDetails((prev) => ({
      ...prev,
      quantity,
      pricePerItemAfterDiscount: newPricePerItem,
      totalPrice: newTotalPrice,
      discountPercentage: newDiscountPercentage,
      originalTotalPrice: newOriginalTotal,
      savings: newSavings,
    }))
  }

  const handleDescriptionChangeFromDemand = (newDescription: string, newBasePrice: number) => {
    const newDiscountInfo = calculateDiscountedPrice(newBasePrice, currentOrderDetails.quantity)
    setCurrentOrderDetails((prev) => ({
      ...prev,
      description: newDescription,
      basePrice: newBasePrice,
      pricePerItemAfterDiscount: newDiscountInfo.pricePerItemAfterDiscount,
      totalPrice: newDiscountInfo.totalPrice,
      discountPercentage: newDiscountInfo.discountPercentage,
      originalTotalPrice: newDiscountInfo.originalTotalPrice,
      savings: newDiscountInfo.savings,
    }))
    setDesignSpec((prevDs) => ({ ...prevDs, text: newDescription })) // Keep designSpec in sync
  }

  const handleDesignBriefChangeFromDemand = (newBrief: string) =>
    setCurrentOrderDetails((prev) => ({ ...prev, designBriefSummary: newBrief }))

  const handleGeneratePO = () => {
    const poNum = `PO-${Date.now().toString().slice(-6)}`
    setCurrentPoNumber(poNum)
    setMessages((prev) => [
      ...prev,
      {
        id: `ai-generatingpo-text-${Date.now()}`,
        content: "Alright, here is your Purchase Order. Please review it carefully.",
        sender: "ai",
        type: "text",
        timestamp: new Date(),
      },
      {
        id: `ai-po-${Date.now()}`,
        content: JSON.stringify(currentOrderDetails),
        sender: "ai",
        type: "purchaseOrder",
        poNumber: poNum,
        timestamp: new Date(),
      },
    ])
    setChatStage("purchaseOrderReview")
  }

  const handleEditOrderFromPO = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-editpo-${Date.now()}`,
        content: "I'd like to edit my order.",
        sender: "user",
        type: "text",
        timestamp: new Date(),
      },
      {
        id: `ai-editpo-text-${Date.now()}`,
        content: "Okay, let's go back to the order details. What would you like to change?",
        sender: "ai",
        type: "text",
        timestamp: new Date(),
      },
      {
        id: `ai-demandsummary-edit-${Date.now()}`,
        content: JSON.stringify(currentOrderDetails),
        sender: "ai",
        type: "demandSummary",
        timestamp: new Date(),
      },
    ])
    setChatStage("demandSummary")
  }

  const handleProceedToUserInfo = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-proceed-info-${Date.now()}`,
        content: "Confirm & Enter Your Details",
        sender: "user",
        type: "text",
        timestamp: new Date(),
      },
      {
        id: `ai-userinfo-prompt-${Date.now()}`,
        content: "Great! Please provide your information to finalize the order request.",
        sender: "ai",
        type: "text",
        timestamp: new Date(),
      },
      {
        id: `ai-userinfoform-${Date.now()}`,
        content: "{}", // Placeholder for form data if needed
        sender: "ai",
        type: "userInfoForm",
        timestamp: new Date(),
      },
    ])
    setChatStage("userInfoCollection")
  }

  const handleUserInfoSubmit = (userInfo: UserInfo) => {
    setCurrentUserInfo(userInfo)
    const confirmationNum = `CONF-${Date.now().toString().slice(-8)}`
    setCurrentConfirmationNumber(confirmationNum)
    const marketingMessage = userInfo.marketingOptIn
      ? "You've also opted in to receive marketing updates."
      : "You've opted out of marketing updates."
    setMessages((prev) => [
      ...prev,
      {
        id: `user-infosubmit-${Date.now()}`,
        content: `Information submitted for ${userInfo.fullName}.`,
        sender: "user",
        type: "text",
        timestamp: new Date(),
      },
      {
        id: `ai-orderconfirmed-${Date.now()}`,
        content: `Thank you, ${userInfo.fullName}! Your order request has been received.
Your Confirmation Number is: **${confirmationNum}**
PO Number: **${currentPoNumber}**

We will review your request and send a formal quote to **${userInfo.email}** shortly.
You can use your confirmation number to inquire about the status of your order.
${marketingMessage}`,
        sender: "ai",
        type: "orderConfirmation",
        confirmationNumber: confirmationNum,
        timestamp: new Date(),
      },
    ])
    setChatStage("orderConfirmed")
  }

  const restartConversation = () => {
    const { productType, useCase, style } = initialSelections
    const productLabel = productType.replace("-", " ")
    const introContent = `Let's start fresh! You're creating a ${style} ${productLabel} for ${useCase.toLowerCase()}. What do you want it to say or feature?`
    const welcomeMessage: Message = {
      id: "welcome-restart",
      content: introContent,
      sender: "ai",
      type: "text",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
    setChatStage("gatheringRequirements")

    const newBasePrice = calculateBaseItemPrice(`${style} ${productLabel} for ${useCase.toLowerCase()}`)
    const newDiscountInfo = calculateDiscountedPrice(newBasePrice, 1)

    setDesignSpec({ productType, useCase, style })
    setCurrentOrderDetails({
      description: `${style} ${productLabel} for ${useCase.toLowerCase()}`,
      imageUrl: "",
      basePrice: newBasePrice,
      pricePerItemAfterDiscount: newDiscountInfo.pricePerItemAfterDiscount,
      totalPrice: newDiscountInfo.totalPrice,
      quantity: 1,
      designBriefSummary: "",
      discountPercentage: newDiscountInfo.discountPercentage,
      originalTotalPrice: newDiscountInfo.originalTotalPrice,
      savings: newDiscountInfo.savings,
    })
    setCurrentUserInfo(null)
    setUploadedImageForChat(null)
    setCurrentPoNumber("")
    setCurrentConfirmationNumber("")
  }

  const isInputDisabled =
    isLoading ||
    chatStage === "demandSummary" ||
    chatStage === "purchaseOrderReview" ||
    chatStage === "userInfoCollection" ||
    chatStage === "orderConfirmed" ||
    chatStage === "logoEditing"

  return (
    <div className="flex flex-col flex-grow h-full bg-background">
      <div className="flex items-center justify-between p-4 border-b bg-card border-border">
        <h2 className="text-lg font-semibold text-foreground/90">AI Design Assistant</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={restartConversation}>
            Restart
          </Button>
          <Button variant="ghost" size="icon" onClick={onEndChat} title="Close Chat">
            <XCircle className="h-5 w-5 text-foreground/70 hover:text-destructive" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onLooksGoodContinue={handleLooksGoodContinue}
            onEditThisPart={handleEditThisPart}
            onUploadUserImageForDesign={handleUploadUserImageForDesign}
            onCreateManually={handleCreateManually}
            currentOrderDetails={currentOrderDetails}
            onConfirmDesign={handleConfirmDesignAndShowDemandSummary}
            onTryAnotherDesign={handleTryAnotherDesignFromPreview}
            onQuantityChange={handleQuantityChangeFromDemand}
            onDescriptionChange={handleDescriptionChangeFromDemand}
            onDesignBriefChange={handleDesignBriefChangeFromDemand}
            onGeneratePO={handleGeneratePO}
            onEditOrderFromPO={handleEditOrderFromPO}
            onProceedToUserInfo={handleProceedToUserInfo}
            onUserInfoSubmit={handleUserInfoSubmit}
            onLogoEditorExport={handleLogoEditorExport}
            onCloseLogoEditor={handleCloseLogoEditor}
            poNumber={message.poNumber || currentPoNumber}
            confirmationNumber={message.confirmationNumber || currentConfirmationNumber}
          />
        ))}
        {isLoading &&
          chatStage !== "gatheringRequirements" && ( // Only show general "thinking" if not in gathering phase (where summary is the feedback)
            <div className="flex items-center space-x-2 text-sm text-muted-foreground pl-2">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
              <span>AI is thinking...</span>
            </div>
          )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-card border-border">
        {uploadedImageForChat && !isInputDisabled && (
          <div className="mb-2 p-2 border border-border rounded-md bg-background relative max-w-xs">
            <img src={uploadedImageForChat || "/placeholder.svg"} alt="Preview" className="max-h-24 rounded" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={removeUploadedImagePreview}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className="flex items-center space-x-2 max-w-4xl mx-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isInputDisabled}
            aria-label="Attach image for design"
            title="Attach image for design"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleUserImageUploadForChat}
            accept="image/*"
            className="hidden"
          />
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && (inputValue.trim() || uploadedImageForChat) && !isInputDisabled) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder={isInputDisabled ? "Please use controls above or complete the form." : "Describe your idea..."}
            className="flex-1"
            disabled={isInputDisabled}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              openLogoEditorFromInput(
                designSpec.customImage || designSpec.productType
                  ? `/placeholder.svg?width=400&height=450&text=${designSpec.productType}`
                  : undefined,
              )
            }
            disabled={isInputDisabled && chatStage !== "gatheringRequirements" && chatStage !== "designPreview"}
            aria-label="Open Manual Editor"
            title="Open Manual Editor"
          >
            <Edit3 className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={(!inputValue.trim() && !uploadedImageForChat) || isInputDisabled}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
