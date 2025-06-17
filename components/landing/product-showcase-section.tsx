"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Palette, Zap, Leaf, ArrowRight } from "lucide-react"

const showcaseItems = [
  {
    icon: <Users className="h-10 w-10 text-primary mb-4" />,
    title: "Bulk Orders & Group Buys",
    description:
      "Planning a big event or outfitting your team? Get custom quotes and dedicated support for large volume orders.",
    linkText: "Get a Quote",
    href: "/bulk-orders", // Placeholder, these pages would need to be created or linked
  },
  {
    icon: <Palette className="h-10 w-10 text-primary mb-4" />,
    title: "Pro Design Services",
    description:
      "Have an idea but need design help? Our professional designers can create stunning visuals tailored to your needs.",
    linkText: "Explore Services",
    href: "/pro-design-services",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary mb-4" />,
    title: "Express Production",
    description: "Need your custom merchandise in a hurry? Opt for our expedited production and shipping options.",
    linkText: "Check Availability",
    href: "/express-production",
  },
  {
    icon: <Leaf className="h-10 w-10 text-primary mb-4" />,
    title: "Eco-Friendly Options",
    description: "Committed to sustainability? Discover our range of eco-friendly products and printing methods.",
    linkText: "Learn More",
    href: "/eco-friendly-options",
  },
]

export default function ProductShowcaseSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">More Than Just AI Design</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            At CustomPrintingCo.com, we offer a comprehensive suite of printing solutions to meet all your custom
            merchandise needs. Explore our specialized services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {showcaseItems.map((item) => (
            <Card
              key={item.title}
              className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-card"
            >
              <CardHeader className="items-center text-center p-6">
                {item.icon}
                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0 text-center">
                <CardDescription className="text-foreground/70 mb-6">{item.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Link href={item.href}>
                  <Button variant="outline" className="w-full group">
                    {item.linkText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
