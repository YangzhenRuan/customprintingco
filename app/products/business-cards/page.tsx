import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  CreditCard, 
  Star, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Clock
} from "lucide-react"

const businessCardProducts = [
  {
    id: "standard",
    name: "标准名片",
    description: "经济实惠的专业名片，适合日常商务使用",
    price: "¥0.8",
    priceUnit: "起/张",
    image: "/placeholder.jpg",
    features: ["350g铜版纸", "四色印刷", "标准尺寸", "48小时交付"],
    popular: false,
    badge: "经济实惠"
  },
  {
    id: "premium",
    name: "高端名片",
    description: "高品质材料和工艺，彰显专业形象",
    price: "¥1.5",
    priceUnit: "起/张",
    image: "/placeholder.jpg",
    features: ["400g特种纸", "UV光油", "圆角处理", "24小时交付"],
    popular: true,
    badge: "热门推荐"
  },
  {
    id: "plastic",
    name: "塑料名片",
    description: "防水耐用的塑料材质，持久不褪色",
    price: "¥2.5",
    priceUnit: "起/张",
    image: "/placeholder.jpg",
    features: ["PVC材质", "防水防撕", "光泽表面", "72小时交付"],
    popular: false,
    badge: "耐用防水"
  },
  {
    id: "foil",
    name: "烫金名片",
    description: "奢华烫金工艺，打造高端商务形象",
    price: "¥3.2",
    priceUnit: "起/张",
    image: "/placeholder.jpg",
    features: ["烫金工艺", "特种纸张", "浮雕效果", "5-7天交付"],
    popular: false,
    badge: "奢华工艺"
  },
  {
    id: "transparent",
    name: "透明名片",
    description: "时尚透明材质，独特视觉效果",
    price: "¥4.0",
    priceUnit: "起/张",
    image: "/placeholder.jpg",
    features: ["透明PVC", "丝印工艺", "独特设计", "5-7天交付"],
    popular: false,
    badge: "时尚独特"
  },
  {
    id: "nfc",
    name: "NFC智能名片",
    description: "集成NFC芯片，一触即可分享联系信息",
    price: "¥15.0",
    priceUnit: "起/张",
    image: "/placeholder.jpg",
    features: ["NFC芯片", "智能交互", "个性定制", "7-10天交付"],
    popular: false,
    badge: "科技前沿"
  }
]

const features = [
  {
    icon: Star,
    title: "专业设计",
    description: "免费提供专业设计服务，确保您的名片脱颖而出"
  },
  {
    icon: Zap,
    title: "快速交付",
    description: "标准产品24-48小时交付，满足您的紧急需求"
  },
  {
    icon: Shield,
    title: "品质保证",
    description: "严格品质控制，不满意100%退款保证"
  },
  {
    icon: Clock,
    title: "7x24服务",
    description: "全天候客服支持，随时为您解答疑问"
  }
]

export default function BusinessCardsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">首页</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">产品</Link>
            <span>/</span>
            <span className="text-foreground">名片与卡片</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CreditCard className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                名片与卡片定制
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              从经济实惠的标准名片到高科技NFC智能名片，我们提供多种材质和工艺选择，
              让您的第一印象更加专业和难忘。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Sparkles className="mr-2 h-5 w-5" />
                免费设计咨询
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                查看设计案例
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              选择您的名片类型
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              不同材质和工艺，满足您的个性化需求和预算要求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessCardProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 relative overflow-hidden">
                {/* Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge 
                    variant={product.popular ? "default" : "secondary"}
                    className={product.popular ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    {product.badge}
                  </Badge>
                </div>

                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CreditCard className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors mb-2">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-base mb-4">
                        {product.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary">{product.price}</span>
                    <span className="text-sm text-muted-foreground">{product.priceUnit}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-3">产品特点：</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={`/products/business-cards/${product.id}`} className="flex-1">
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        查看详情
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              为什么选择我们的名片服务
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              专业品质，贴心服务，让您的每一张名片都成为最佳的商务名片
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            准备定制您的专属名片了吗？
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            联系我们的设计团队，获取免费设计建议和报价。让我们帮您打造令人印象深刻的商务名片。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Sparkles className="mr-2 h-5 w-5" />
              开始设计
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              联系客服
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 