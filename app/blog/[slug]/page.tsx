import { Metadata } from "next"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { BlogPost } from "./blog-post"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: '文章未找到 - CustomPrintingco 博客',
      description: '抱歉，您请求的文章不存在。',
    }
  }
  
  return {
    title: `${post.title} - CustomPrintingco 博客`,
    description: post.description,
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">文章未找到</h1>
        <p className="text-lg text-muted-foreground mb-8">
          抱歉，您请求的文章不存在。
        </p>
        <Link href="/blog">
          <Button>返回博客列表</Button>
        </Link>
      </div>
    )
  }
  
  return <BlogPost post={post} />
}
