import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  CreditCard, 
  FileText, 
  Flag, 
  Sticker, 
  Shirt, 
  Gift, 
  Package,
  ArrowRight,
  Star,
  Zap,
  TrendingUp
} from "lucide-react"

const productCategories = [
  {
    id: "business-cards",
    title: "名片与卡片",
    description: "专业商务名片、会员卡、礼品卡等各类卡片定制",
    icon: CreditCard,
    color: "bg-blue-500",
    products: ["标准名片", "高端名片", "塑料名片", "烫金名片", "NFC智能名片", "会员卡", "礼品卡"],
    popular: true
  },
  {
    id: "marketing",
    title: "宣传印刷品",
    description: "传单、宣传册、海报等营销宣传材料",
    icon: FileText,
    color: "bg-green-500",
    products: ["传单", "宣传册", "明信片", "小册子", "产品目录", "菜单", "信纸信头"],
    popular: true
  },
  {
    id: "signs-banners",
    title: "标识标牌",
    description: "横幅、标牌、海报等大型展示用品",
    icon: Flag,
    color: "bg-purple-500",
    products: ["乙烯基横幅", "布料横幅", "易拉宝", "旗帜", "庭院标牌", "亚克力标牌", "金属标牌"]
  },
  {
    id: "stickers-labels",
    title: "贴纸标签",
    description: "定制贴纸、产品标签、包装标签等",
    icon: Sticker,
    color: "bg-yellow-500",
    products: ["定制贴纸", "异形切割贴纸", "全息贴纸", "产品标签", "快递标签", "地址标签", "条码标签"]
  },
  {
    id: "apparel",
    title: "服装定制",
    description: "T恤、帽子、包袋等个性化服装配饰",
    icon: Shirt,
    color: "bg-red-500",
    products: ["T恤", "Polo衫", "连帽衫", "外套", "帽子", "包袋", "围裙"],
    trending: true
  },
  {
    id: "promotional",
    title: "促销礼品",
    description: "马克杯、笔记本、U盘等企业推广礼品",
    icon: Gift,
    color: "bg-indigo-500",
    products: ["马克杯", "保温杯", "水杯", "笔类", "笔记本", "鼠标垫", "U盘", "充电器"]
  },
  {
    id: "packaging",
    title: "包装用品",
    description: "快递盒、包装袋、礼品盒等包装解决方案",
    icon: Package,
    color: "bg-teal-500",
    products: ["快递盒", "产品包装盒", "礼品盒", "纸袋", "塑料袋", "包装袋", "快递袋"],
    trending: true
  }
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              专业印刷服务
              <span className="block text-primary mt-2">满足您的每一个需求</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              从商务名片到大型横幅，从个性化服装到企业礼品，我们提供全方位的定制印刷解决方案。
              高品质材料，快速交付，让您的品牌脱颖而出。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                免费咨询报价
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                查看作品案例
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              产品分类
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              我们提供七大类产品服务，涵盖您业务发展的各个方面
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 relative overflow-hidden">
                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex gap-2">
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
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="mb-6">
                      <h4 className="font-semibold text-sm text-muted-foreground mb-3">主要产品：</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.products.slice(0, 4).map((product, index) => (
                          <span key={index} className="text-xs bg-muted px-2 py-1 rounded-md">
                            {product}
                          </span>
                        ))}
                        {category.products.length > 4 && (
                          <span className="text-xs text-muted-foreground">
                            +{category.products.length - 4} 更多
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Link href={`/products/${category.id}`}>
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        查看详情
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              为什么选择我们
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              专业品质，贴心服务，让您的每一次定制都物超所值
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4">快速交付</h3>
              <p className="text-muted-foreground">
                标准产品24-48小时交付，急单服务当天完成，满足您的紧急需求
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4">品质保证</h3>
              <p className="text-muted-foreground">
                采用进口优质材料，先进印刷设备，严格品质控制，确保每件产品完美无瑕
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4">个性定制</h3>
              <p className="text-muted-foreground">
                专业设计团队，一对一服务，从创意到成品，打造独一无二的专属产品
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            准备开始您的定制项目了吗？
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            联系我们的专业团队，获取免费报价和设计建议。让我们帮您实现完美的印刷效果。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              立即咨询
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              在线下单
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 