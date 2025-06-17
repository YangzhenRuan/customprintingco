import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllPosts, getCategories } from "@/lib/blog"
import { Calendar, User, ArrowRight } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "博客 - CustomPrintingco",
    description: "了解最新的印刷技术和行业动态",
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const categories = await getCategories()

  // 获取特色文章（最新的文章）
  const featuredPost = posts[0]
  // 获取其他文章
  const recentPosts = posts.slice(1)

  return (
    <>
      {/* 头部区域 */}
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight mb-6">博客</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              探索印刷行业的最新技术趋势、创新解决方案和最佳实践。
              从 AI 驱动的设计工具到可持续印刷技术，我们为您带来行业前沿洞察。
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* 分类过滤器 */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Link href="/blog">
            <Button variant="secondary" size="sm" className="rounded-full">
              全部
            </Button>
          </Link>
          {categories.map((category) => (
            <Link key={category} href={`/blog/category/${category}`}>
              <Button variant="outline" size="sm" className="rounded-full hover:bg-secondary">
                {category}
              </Button>
            </Link>
          ))}
        </div>

        {/* 特色文章 */}
        {featuredPost && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1"></div>
              <Badge variant="secondary" className="px-3 py-1">特色文章</Badge>
              <div className="h-px bg-gradient-to-l from-primary to-transparent flex-1"></div>
            </div>
            
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] md:aspect-auto">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-4">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {featuredPost.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="font-medium">{featuredPost.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <span>阅读全文</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* 最新文章网格 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">最新文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group border-0 bg-card/50">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <span>{post.author.name}</span>
                      </div>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* 订阅区域 */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center border">
          <h3 className="text-2xl font-bold mb-4">订阅我们的博客</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            获取最新的印刷技术资讯、行业趋势分析和创新解决方案，直接发送到您的邮箱
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="输入您的邮箱地址"
              className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button className="px-6 py-3 rounded-lg">
              订阅更新
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            我们尊重您的隐私，不会向第三方分享您的邮箱地址
          </p>
        </div>
      </div>
    </>
  )
}
