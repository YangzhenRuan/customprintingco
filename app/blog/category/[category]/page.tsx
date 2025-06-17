import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

interface Post {
  title: string
  description: string
  category: string
  date: string
  slug: string
  image?: string
}

// 模拟获取分类文章数据
async function getCategoryPosts(category: string): Promise<Post[]> {
  // 这里应该是从数据库或 CMS 获取数据
  return [
    {
      title: "AI 驱动的印刷技术革新",
      description: "探索人工智能如何改变印刷行业的未来",
      category: "技术",
      date: "2024-03-15",
      slug: "ai-printing-revolution",
      image: "/blog/ai-printing.jpg",
    },
    {
      title: "数字印刷 vs 传统印刷：如何选择？",
      description: "深入比较两种印刷方式的优缺点",
      category: "技术",
      date: "2024-03-05",
      slug: "digital-vs-traditional",
    },
  ]
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  
  return {
    title: `${categoryName} - CustomPrintingco 博客`,
    description: `浏览 CustomPrintingco 博客中的 ${categoryName} 相关文章`,
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const posts = await getCategoryPosts(params.category)
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            返回博客列表
          </Button>
        </Link>
      </div>

      {/* 分类标题 */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
        <p className="text-lg text-muted-foreground">
          浏览所有 {categoryName} 相关的文章
        </p>
      </div>

      {/* 文章列表 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug}>
            {post.image && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <div className="mb-2">
                <Badge variant="secondary">{post.category}</Badge>
              </div>
              <CardTitle className="text-xl">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{post.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 如果没有文章 */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">暂无文章</h3>
          <p className="text-muted-foreground">
            该分类下暂时没有文章，请稍后再来查看。
          </p>
        </div>
      )}
    </div>
  )
} 