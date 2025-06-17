'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Share2, Twitter, Linkedin, Facebook, Home, ChevronRight } from "lucide-react"
import { MDXRemote } from 'next-mdx-remote/rsc'

interface BlogPostProps {
  post: {
    title: string
    description: string
    category: string
    date: string
    image: string
    content: string
    author: {
      name: string
      role: string
      avatar: string
    }
  }
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <>
      {/* 面包屑导航 */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" />
              首页
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/blog" className="hover:text-primary transition-colors">
              博客
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{post.category}</span>
          </nav>
        </div>
      </div>

      {/* 文章头部 */}
      <div className="bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="mb-6 -ml-2 gap-2">
                <ArrowLeft className="h-4 w-4" />
                返回博客
              </Button>
            </Link>

            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {post.description}
              </p>
            </div>

            {/* 作者和日期信息 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{post.author.name}</div>
                    <div className="text-sm text-muted-foreground">{post.author.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{post.date}</span>
                </div>
              </div>

              {/* 分享按钮 */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">分享:</span>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Facebook className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 文章封面图 */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 文章内容 */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-foreground/90 prose-strong:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border">
            <MDXRemote source={post.content} />
          </div>

          {/* 作者详细信息 */}
          <div className="mt-12 p-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">{post.author.name}</h3>
                <p className="text-muted-foreground mb-3">{post.author.role}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {post.author.name} 是我们团队的核心成员，专注于为客户提供最优质的印刷解决方案和技术支持。
                  拥有丰富的行业经验，致力于推动印刷技术的创新发展。
                </p>
              </div>
            </div>
          </div>

          {/* 返回博客按钮 */}
          <div className="mt-8 text-center">
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                返回博客列表
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
} 