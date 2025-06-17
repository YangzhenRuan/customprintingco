'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Share2, Twitter, Linkedin, Facebook } from "lucide-react"
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
    <div className="min-h-screen bg-background">
      {/* 面包屑导航 */}
      <div className="border-b bg-card/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              首页
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">
              博客
            </Link>
            <span>/</span>
            <span className="text-foreground">{post.category}</span>
          </div>
        </div>
      </div>

      {/* 文章头部 */}
      <div className="bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="mb-8 -ml-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回博客
              </Button>
            </Link>

            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {post.description}
              </p>
            </div>

            {/* 作者和日期信息 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={48}
                    height={48}
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
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
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
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-foreground/90 prose-strong:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border">
            <MDXRemote source={post.content} />
          </div>

          {/* 作者详细信息 */}
          <div className="mt-16 p-8 bg-gradient-to-r from-card/50 to-secondary/10 rounded-2xl border">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                <p className="text-muted-foreground mb-4">{post.author.role}</p>
                <p className="text-foreground/80 leading-relaxed">
                  {post.author.name} 是我们团队的核心成员，专注于为客户提供最优质的印刷解决方案和技术支持。
                  拥有丰富的行业经验，致力于推动印刷技术的创新发展。
                </p>
              </div>
            </div>
          </div>

          {/* 相关文章推荐 */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8">继续阅读</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog" className="group">
                <div className="p-6 rounded-xl border bg-card/30 hover:bg-card/50 transition-colors">
                  <Badge variant="secondary" className="mb-3">技术</Badge>
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    探索更多印刷技术文章
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    了解最新的印刷技术趋势和创新解决方案
                  </p>
                </div>
              </Link>
              <Link href="/blog" className="group">
                <div className="p-6 rounded-xl border bg-card/30 hover:bg-card/50 transition-colors">
                  <Badge variant="secondary" className="mb-3">行业动态</Badge>
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    关注行业最新动态
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    获取印刷行业的最新资讯和市场趋势分析
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 