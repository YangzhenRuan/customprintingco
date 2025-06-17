import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ProductPreviewProps {
  imageUrl: string
}

export default function ProductPreview({ imageUrl }: ProductPreviewProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full h-64">
          <Image src={imageUrl || "/placeholder.svg"} alt="Product mockup" fill className="object-contain" />
        </div>
      </CardContent>
    </Card>
  )
}
