"use client"

import type { LucideIcon } from "lucide-react"
import OptionCard from "./option-card"

interface Option {
  id: string
  label: string
  icon?: LucideIcon
}

interface SelectionStepProps {
  title: string
  description: string
  options: Option[]
  onSelect: (optionId: string) => void
  selectedOption?: string
  isLoading?: boolean
}

export default function SelectionStep({
  title,
  description,
  options,
  onSelect,
  selectedOption,
  isLoading,
}: SelectionStepProps) {
  return (
    <div className="flex-grow flex flex-col items-center justify-center py-6 px-2 sm:px-4 text-center animate-fade-in-up">
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{title}</h1>
      <p className="text-lg text-foreground/70 mb-10 max-w-xl">{description}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            label={option.label}
            icon={option.icon}
            onClick={() => !isLoading && onSelect(option.id)}
            isSelected={selectedOption === option.id}
          />
        ))}
      </div>
      {isLoading && <p className="mt-8 text-primary animate-pulse">Loading next step...</p>}
    </div>
  )
}
