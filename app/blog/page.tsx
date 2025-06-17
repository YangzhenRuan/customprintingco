import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPosts, getCategories } from "@/lib/blog"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "博客 - CustomPrintingco",
    description: "了解最新的印刷技术和行业动态",
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">博客</h1>
        <p className="text-xl text-muted-foreground">
          了解最新的印刷技术和行业动态
        </p>
      </div>

      {/* 分类导航 */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/blog">
          <Badge variant="secondary" className="cursor-pointer">
            全部
          </Badge>
        </Link>
        {categories.map((category) => (
          <Link key={category} href={`/blog/category/${category}`}>
            <Badge variant="secondary" className="cursor-pointer">
              {category}
            </Badge>
          </Link>
        ))}
      </div>

      {/* 文章列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="relative aspect-video">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <Badge variant="secondary" className="mb-2">
                  {post.category}
                </Badge>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
