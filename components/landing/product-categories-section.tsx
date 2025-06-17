import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  CreditCard, 
  FileText, 
  Shirt, 
  Gift, 
  ArrowRight,
  Star,
  TrendingUp
} from "lucide-react"

const featuredCategories = [
  {
    id: "business-cards",
    title: "名片与卡片",
    description: "专业商务名片，让第一印象更深刻",
    icon: CreditCard,
    color: "bg-blue-500",
    href: "/products/business-cards",
    popular: true,
    stats: "1000+ 设计模板"
  },
  {
    id: "marketing",
    title: "宣传印刷品",
    description: "传单、宣传册，提升品牌知名度",
    icon: FileText,
    color: "bg-green-500",
    href: "/products/marketing",
    popular: true,
    stats: "48小时 快速交付"
  },
  {
    id: "apparel",
    title: "服装定制",
    description: "个性化T恤、帽子，展现独特风格",
    icon: Shirt,
    color: "bg-red-500",
    href: "/products/apparel",
    trending: true,
    stats: "环保材料 舒适穿着"
  },
  {
    id: "promotional",
    title: "促销礼品",
    description: "企业礼品定制，增强客户关系",
    icon: Gift,
    color: "bg-indigo-500",
    href: "/products/promotional",
    trending: true,
    stats: "批量优惠 性价比高"
  }
]

export default function ProductCategoriesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            热门产品分类
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            从商务名片到个性服装，我们提供全方位的定制印刷服务
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 relative overflow-hidden bg-background">
                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-1">
                  {category.popular && (
                    <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      热门
                    </div>
                  )}
                  {category.trending && (
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      趋势
                    </div>
                  )}
                </div>

                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="mb-4">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                      {category.stats}
                    </span>
                  </div>
                  
                  <Link href={category.href}>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                      查看产品
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button size="lg" variant="outline" className="text-lg px-8">
              查看所有产品分类
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
} 