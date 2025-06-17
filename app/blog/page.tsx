"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User, ChevronRight } from "lucide-react"

const categories = [
  { id: "all", label: "All", active: true },
  { id: "product", label: "Product", active: false },
  { id: "ai", label: "AI & Design", active: false },
  { id: "business", label: "Business", active: false },
  { id: "tutorials", label: "Tutorials", active: false },
]

const featuredArticle = {
  id: "ai-design-revolution",
  category: "Product",
  title: "AI Design Revolution: How Machine Learning is Transforming Custom Merchandise",
  excerpt:
    "Discover how our AI-powered design system is revolutionizing the custom merchandise industry, making professional-quality designs accessible to everyone through intelligent automation and creative assistance.",
  author: {
    name: "Sarah Chen",
    role: "Head of AI Design",
    avatar: "/placeholder.svg?width=40&height=40&text=SC",
  },
  date: "December 15, 2024",
  readTime: "5 min read",
  image: "/placeholder.svg?width=600&height=400&text=AI+Design+Dashboard",
  slug: "ai-design-revolution",
}

const recentArticles = [
  {
    id: "sustainable-printing",
    category: "Business",
    title: "Sustainable Printing: Our Commitment to Eco-Friendly Merchandise",
    excerpt: "Learn about our new eco-friendly printing processes and sustainable material options.",
    author: { name: "Mike Rodriguez", role: "Sustainability Lead" },
    date: "December 12, 2024",
    readTime: "3 min read",
    image: "/placeholder.svg?width=300&height=200&text=Eco+Printing",
  },
  {
    id: "bulk-order-guide",
    category: "Tutorials",
    title: "Complete Guide to Bulk Orders: Tips for Large-Scale Custom Merchandise",
    excerpt: "Everything you need to know about placing and managing large volume orders efficiently.",
    author: { name: "Jennifer Park", role: "Customer Success" },
    date: "December 10, 2024",
    readTime: "7 min read",
    image: "/placeholder.svg?width=300&height=200&text=Bulk+Orders",
  },
  {
    id: "design-trends-2025",
    category: "AI & Design",
    title: "2025 Design Trends: What's Next in Custom Merchandise",
    excerpt: "Explore the upcoming design trends that will shape custom merchandise in 2025.",
    author: { name: "Alex Thompson", role: "Creative Director" },
    date: "December 8, 2024",
    readTime: "4 min read",
    image: "/placeholder.svg?width=300&height=200&text=Design+Trends",
  },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary font-medium">Blog</span>
            </div>
            <Link href="/" className="text-sm text-primary hover:underline flex items-center">
              Back to CustomPrintingCo.com
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section with Featured Article */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-pink-500/90 to-orange-400/90" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                {featuredArticle.category}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">{featuredArticle.title}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Image
                    src={featuredArticle.author.avatar || "/placeholder.svg"}
                    alt={featuredArticle.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{featuredArticle.author.name}</p>
                    <p className="text-sm text-white/80">{featuredArticle.author.role}</p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-white/90 mb-8 leading-relaxed">{featuredArticle.excerpt}</p>

              <Link href={`/blog/${featuredArticle.slug}`}>
                <Button variant="secondary" size="lg" className="bg-white text-gray-900 hover:bg-white/90">
                  Read more
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Image
                  src={featuredArticle.image || "/placeholder.svg"}
                  alt="AI Design Dashboard"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Latest Articles</h2>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest insights, tips, and trends in AI-powered custom merchandise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <article key={article.id} className="group cursor-pointer">
                <Link href={`/blog/${article.id}`}>
                  <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <Badge variant="outline" className="mb-3">
                        {article.category}
                      </Badge>
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{article.author.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Stay in the Loop</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest updates on AI design innovations, new features, and industry insights delivered to your
              inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg" className="px-8">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">No spam, unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
