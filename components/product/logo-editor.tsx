"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, ImageIcon, Download, Trash2, XCircle } from "lucide-react"

const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 450
const DEFAULT_PRODUCT_IMAGE_URL = "/placeholder.svg?width=400&height=450&text=Product&bgColor=f0f0f0&textColor=333333"

interface LogoProperties {
  x: number
  y: number
  scale: number
  angle: number // in degrees
  width?: number
  height?: number
}

interface LogoEditorProps {
  onExportImage: (imageDataUrl: string, originalLogoName?: string) => void
  onClose?: () => void
  productImageUrl?: string // Initial product image from chat state
}

export default function LogoEditor({
  onExportImage,
  onClose,
  productImageUrl: initialProductImageUrl, // Renamed for clarity
}: LogoEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null)
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null)
  const [logoFileName, setLogoFileName] = useState<string | undefined>(undefined)
  const [productImageFileName, setProductImageFileName] = useState<string | undefined>(undefined)

  const [logoProps, setLogoProps] = useState<LogoProperties>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    scale: 0.3,
    angle: 0,
  })

  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<{ x: number; y: number; logoX: number; logoY: number } | null>(null)

  useEffect(() => {
    const bgImg = new Image()
    bgImg.crossOrigin = "anonymous"
    // Use initialProductImageUrl if provided, otherwise default
    bgImg.src = initialProductImageUrl || DEFAULT_PRODUCT_IMAGE_URL
    bgImg.onload = () => setBackgroundImage(bgImg)
    bgImg.onerror = () => {
      console.error("Failed to load background image:", initialProductImageUrl)
      // Fallback to truly default placeholder on error
      const fallbackImg = new Image()
      fallbackImg.crossOrigin = "anonymous"
      fallbackImg.src = DEFAULT_PRODUCT_IMAGE_URL
      fallbackImg.onload = () => setBackgroundImage(fallbackImg)
    }
  }, [initialProductImageUrl])

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    if (backgroundImage) {
      ctx.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }

    if (logoImage && logoProps.width && logoProps.height) {
      ctx.save()
      const scaledWidth = logoProps.width * logoProps.scale
      const scaledHeight = logoProps.height * logoProps.scale
      ctx.translate(logoProps.x, logoProps.y)
      ctx.rotate((logoProps.angle * Math.PI) / 180)
      ctx.drawImage(logoImage, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight)
      ctx.restore()
    }
  }, [backgroundImage, logoImage, logoProps])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  const handleProductImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setProductImageFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          setBackgroundImage(img) // Update background image state
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const aspectRatio = img.width / img.height
          let initialWidth = 100
          let initialHeight = 100 / aspectRatio
          if (initialHeight > 100) {
            initialHeight = 100
            initialWidth = 100 * aspectRatio
          }
          const initialScale = Math.min(initialWidth / img.width, initialHeight / img.height, 0.3)

          setLogoImage(img)
          setLogoProps({
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2,
            scale: initialScale,
            angle: 0,
            width: img.width,
            height: img.height,
          })
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const getMousePos = (
    canvas: HTMLCanvasElement,
    evt: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent,
  ) => {
    const rect = canvas.getBoundingClientRect()
    let clientX, clientY
    if ("touches" in evt) {
      clientX = evt.touches[0].clientX
      clientY = evt.touches[0].clientY
    } else {
      clientX = evt.clientX
      clientY = evt.clientY
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  const isPointInLogo = (mouseX: number, mouseY: number) => {
    if (!logoImage || !logoProps.width || !logoProps.height) return false
    const scaledWidth = logoProps.width * logoProps.scale
    const scaledHeight = logoProps.height * logoProps.scale
    const logoLeft = logoProps.x - scaledWidth / 2
    const logoRight = logoProps.x + scaledWidth / 2
    const logoTop = logoProps.y - scaledHeight / 2
    const logoBottom = logoProps.y + scaledHeight / 2
    return mouseX >= logoLeft && mouseX <= logoRight && mouseY >= logoTop && mouseY <= logoBottom
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!logoImage || !canvasRef.current) return
    const pos = getMousePos(canvasRef.current, e)
    if (isPointInLogo(pos.x, pos.y)) {
      setIsDragging(true)
      setDragStart({ x: pos.x, y: pos.y, logoX: logoProps.x, logoY: logoProps.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !dragStart || !logoImage || !canvasRef.current) return
    const pos = getMousePos(canvasRef.current, e)
    const dx = pos.x - dragStart.x
    const dy = pos.y - dragStart.y
    setLogoProps((prev) => ({ ...prev, x: dragStart.logoX + dx, y: dragStart.logoY + dy }))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragStart(null)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!logoImage || !canvasRef.current) return
    const pos = getMousePos(canvasRef.current, e)
    if (isPointInLogo(pos.x, pos.y)) {
      setIsDragging(true)
      setDragStart({ x: pos.x, y: pos.y, logoX: logoProps.x, logoY: logoProps.y })
      e.preventDefault()
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || !dragStart || !logoImage || !canvasRef.current) return
    const pos = getMousePos(canvasRef.current, e)
    const dx = pos.x - dragStart.x
    const dy = pos.y - dragStart.y
    setLogoProps((prev) => ({ ...prev, x: dragStart.logoX + dx, y: dragStart.logoY + dy }))
    e.preventDefault()
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setDragStart(null)
  }

  const handleScaleChange = (value: number[]) => {
    setLogoProps((prev) => ({ ...prev, scale: value[0] }))
  }

  const handleAngleChange = (value: number[]) => {
    setLogoProps((prev) => ({ ...prev, angle: value[0] }))
  }

  const handleExport = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png")
      onExportImage(dataURL, logoFileName)
    }
  }

  const handleRemoveLogo = () => {
    setLogoImage(null)
    setLogoFileName(undefined)
    setLogoProps({
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      scale: 0.3,
      angle: 0,
      width: undefined,
      height: undefined,
    })
  }

  return (
    <Card className="w-full shadow-lg border-border bg-card text-foreground">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Logo Customizer</CardTitle>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-destructive"
          >
            <XCircle className="h-5 w-5" />
          </Button>
        )}
      </CardHeader>
      <CardDescription className="px-6 pb-4 text-sm">
        Upload product image (optional), then upload and place your logo.
      </CardDescription>
      <CardContent className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:w-auto md:flex-shrink-0 flex justify-center">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="border border-gray-300 dark:border-gray-700 rounded-md shadow-inner bg-slate-50 dark:bg-slate-800 cursor-grab active:cursor-grabbing max-w-full h-auto"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: "none" }}
          />
        </div>

        <div className="w-full md:flex-1 space-y-3 p-1">
          <div>
            <Label htmlFor="product-image-upload-chat" className="mb-1 block text-xs font-medium">
              <ImageIcon className="inline-block mr-1 h-4 w-4" /> Upload Product Image (Background)
            </Label>
            <Input
              id="product-image-upload-chat"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleProductImageUpload}
              className="text-xs file:mr-2 file:py-1.5 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-muted file:text-muted-foreground hover:file:bg-muted/80"
            />
            {productImageFileName && <p className="text-xs text-muted-foreground mt-1">BG: {productImageFileName}</p>}
          </div>
          <hr className="border-border" />
          <div>
            <Label htmlFor="logo-upload-chat" className="mb-1 block text-xs font-medium">
              <Upload className="inline-block mr-1 h-4 w-4" /> Upload Logo
            </Label>
            <Input
              id="logo-upload-chat"
              type="file"
              accept="image/png, image/jpeg" // PNG is best for logos with transparency
              onChange={handleLogoUpload}
              className="text-xs file:mr-2 file:py-1.5 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            {logoFileName && <p className="text-xs text-muted-foreground mt-1">Logo: {logoFileName}</p>}
          </div>

          {logoImage && (
            <>
              <div>
                <Label htmlFor="scale-slider-chat" className="mb-1 block text-xs font-medium">
                  Scale: {logoProps.scale.toFixed(2)}x
                </Label>
                <Slider
                  id="scale-slider-chat"
                  min={0.05}
                  max={1.5}
                  step={0.01}
                  value={[logoProps.scale]}
                  onValueChange={handleScaleChange}
                />
              </div>

              <div>
                <Label htmlFor="angle-slider-chat" className="mb-1 block text-xs font-medium">
                  Angle: {logoProps.angle.toFixed(0)}°
                </Label>
                <Slider
                  id="angle-slider-chat"
                  min={0}
                  max={360}
                  step={1}
                  value={[logoProps.angle]}
                  onValueChange={handleAngleChange}
                />
              </div>
              <div className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" onClick={handleRemoveLogo} className="flex-1 text-xs">
                  <Trash2 className="mr-1 h-3 w-3" /> Remove Logo
                </Button>
                <Button size="sm" onClick={handleExport} className="flex-1 text-xs bg-primary hover:bg-primary/90">
                  <Download className="mr-1 h-3 w-3" /> Apply to Design
                </Button>
              </div>
            </>
          )}
          {!logoImage && (
            <p className="text-xs text-muted-foreground text-center py-4">Upload a logo to start customizing.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
