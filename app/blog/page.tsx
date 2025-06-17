"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User, ChevronRight } from "lucide-react"
import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPosts, getCategories } from "@/lib/blog"

export const metadata: Metadata = {
  title: "博客 - CustomPrintingco",
  description: "了解最新的印刷技术和行业动态",
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const categories = await getCategories()
  
  // 获取特色文章（最新的两篇）
  const featuredPosts = posts.slice(0, 2)
  // 获取最新文章（除特色文章外的其他文章）
  const recentPosts = posts.slice(2)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 头部区域 */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">博客</h1>
        <p className="text-lg text-muted-foreground">
          探索印刷行业的最新动态、技术趋势和最佳实践
        </p>
      </div>

      {/* 分类导航 */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/blog/category/${category}`}
            className="rounded-full bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/80"
          >
            {category}
          </Link>
        ))}
      </div>

      {/* 特色文章 */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">特色文章</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
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
            </Card>
          ))}
        </div>
      </div>

      {/* 最新文章 */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">最新文章</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {recentPosts.map((post) => (
            <Card key={post.slug}>
              <CardHeader>
                <div className="mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <CardTitle className="text-lg">
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
      </div>

      {/* 订阅区域 */}
      <div className="mt-12 rounded-lg bg-muted p-8 text-center">
        <h3 className="mb-4 text-2xl font-bold">订阅我们的博客</h3>
        <p className="mb-6 text-muted-foreground">
          获取最新的印刷行业资讯和技术更新
        </p>
        <div className="mx-auto max-w-md">
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="输入您的邮箱"
              className="flex-1 rounded-md border px-4 py-2"
            />
            <Button>订阅</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
