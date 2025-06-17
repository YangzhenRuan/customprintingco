"use client"

import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { MDXRemote } from 'next-mdx-remote/rsc'

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

      {/* 文章头部 */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-4">
          {post.category}
        </Badge>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{post.description}</p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{post.date}</span>
          </div>
        </div>
      </div>

      {/* 文章封面图 */}
      <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      {/* 文章内容 */}
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} />
      </div>

      {/* 作者信息 */}
      <div className="mt-12 p-6 bg-muted rounded-lg">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{post.author.name}</h3>
            <p className="text-muted-foreground">{post.author.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
