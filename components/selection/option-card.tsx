"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface OptionCardProps {
  icon?: LucideIcon
  label: string
  onClick: () => void
  isSelected?: boolean
}

export default function OptionCard({ icon: Icon, label, onClick, isSelected }: OptionCardProps) {
  return (
    <Card
      className={`cursor-pointer hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1
            ${isSelected ? "ring-2 ring-primary shadow-lg bg-primary/10" : "bg-card"}
            w-full h-36 sm:h-40 flex flex-col items-center justify-center text-center p-2 sm:p-3`}
      onClick={onClick}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      <CardContent className="flex flex-col items-center justify-center p-2">
        {Icon && <Icon className={`h-10 w-10 mb-3 ${isSelected ? "text-primary" : "text-foreground/70"}`} />}
        <p className={`font-semibold text-md ${isSelected ? "text-primary" : "text-foreground"}`}>{label}</p>
      </CardContent>
    </Card>
  )
}
