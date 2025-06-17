"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, MessageSquarePlus, Shirt, Coffee, Sticker, RedoDot } from "lucide-react"

interface HeroSectionProps {
  onStartChat: (productType?: string, presetPrompt?: string) => void
}

const productExamples = [
  {
    name: "T-Shirt",
    icon: (
      <Shirt className="h-10 w-10 mb-2 text-primary group-hover:text-accent transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
    ),
    presetPrompt: "I'd like to design a custom t-shirt.",
  },
  {
    name: "Coffee Mug",
    icon: (
      <Coffee className="h-10 w-10 mb-2 text-primary group-hover:text-accent transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
    ),
    presetPrompt: "Let's create a unique coffee mug design.",
  },
  {
    name: "Sticker",
    icon: (
      <Sticker className="h-10 w-10 mb-2 text-primary group-hover:text-accent transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
    ),
    presetPrompt: "I want to make some cool stickers.",
  },
  {
    name: "Hoodie",
    icon: (
      <RedoDot className="h-10 w-10 mb-2 text-primary group-hover:text-accent transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
    ), // Consider a specific hoodie icon
    presetPrompt: "Design a custom hoodie for me.",
  },
]

export default function HeroSection({ onStartChat }: HeroSectionProps) {
  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-background to-gray-100 dark:to-slate-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden [perspective:2000px]">
      <div className="text-center max-w-3xl w-full">
        <div className="animate-fade-in-up animation-delay-200 flex justify-center mb-6">
          <Sparkles className="h-16 w-16 text-primary animate-pulse" />
        </div>

        <h1 className="animate-fade-in-up animation-delay-400 text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-pink-500 to-accent">
          Design Custom Merch <span className="block sm:inline">Instantly</span> with AI
        </h1>

        <p className="animate-fade-in-up animation-delay-600 mt-6 text-lg sm:text-xl text-foreground/80 leading-relaxed">
          No more complicated design tools. Just tell our AI assistant what you want, or pick a product below to get
          started!
        </p>

        <div className="animate-fade-in-up animation-delay-800 mt-10">
          <Button
            size="lg"
            onClick={() => onStartChat()} // This will now open the selection modal
            className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <MessageSquarePlus className="h-6 w-6 mr-3 transition-transform duration-300 group-hover:rotate-12" />
            Start Designing with AI
          </Button>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-12 sm:mt-16 animate-fade-in animation-delay-1000">
        <h2 className="text-2xl font-semibold text-center mb-8 text-foreground/90">Or pick a product to begin:</h2>
        <div className="flex overflow-x-auto space-x-6 sm:space-x-8 pb-6 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent justify-center px-4">
          {productExamples.map((item) => (
            <div
              key={item.name}
              onClick={() => onStartChat(item.name, item.presetPrompt)} // This will also open modal, but pre-fill product
              className="group flex-shrink-0 w-44 h-52 sm:w-48 sm:h-60 bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-out border border-border cursor-pointer flex flex-col items-center justify-center p-6 text-center hover:[transform:rotateY(10deg)_rotateX(5deg)_scale(1.05)_translateZ(10px)] will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="transition-all duration-300 ease-out group-hover:[transform:translateZ(30px)]">
                {item.icon}
              </div>
              <p className="font-semibold text-lg text-foreground group-hover:text-accent transition-colors duration-300 ease-out group-hover:[transform:translateZ(20px)]">
                {item.name}
              </p>
              <p className="mt-1 text-xs text-foreground/60 group-hover:text-accent/80 transition-colors duration-300 ease-out group-hover:[transform:translateZ(15px)]">
                Click to design
              </p>
            </div>
          ))}
          {productExamples.length < 4 && <div className="flex-shrink-0 w-px"></div>}{" "}
          {/* Spacer for centering if few items */}
        </div>
      </div>
    </div>
  )
}
