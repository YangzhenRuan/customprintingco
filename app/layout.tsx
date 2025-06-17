import type { Metadata } from 'next'
import './globals.css'
import AppHeader from '@/components/layout/app-header'
import AppFooter from '@/components/layout/app-footer'

export const metadata: Metadata = {
  title: 'CustomPrintingCo - AI驱动的定制印刷解决方案',
  description: '使用人工智能技术创建个性化定制商品，提供专业的印刷和设计服务',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <AppHeader />
          <main className="flex-1">
            {children}
          </main>
          <AppFooter />
        </div>
      </body>
    </html>
  )
}
