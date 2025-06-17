"use client"

import Link from "next/link"
import { Printer, Search, LogIn, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors">
            <Printer className="h-6 w-6" />
            <span className="hidden sm:inline">CustomPrintingCo</span>
            <span className="sm:hidden">CPC</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2">
                  首页
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/products" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2">
                  所有产品
                </Link>
              </NavigationMenuItem>

              {/* 名片与卡片 */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">名片与卡片</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">商务名片</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/business-cards/standard" className="text-sm hover:text-primary">标准名片</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/business-cards/premium" className="text-sm hover:text-primary">高端名片</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/business-cards/plastic" className="text-sm hover:text-primary">塑料名片</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/business-cards/foil" className="text-sm hover:text-primary">烫金名片</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/business-cards/nfc" className="text-sm hover:text-primary">NFC智能名片</NavigationMenuLink></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">其他卡片</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/cards/loyalty" className="text-sm hover:text-primary">会员卡</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/cards/gift" className="text-sm hover:text-primary">礼品卡</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/cards/appointment" className="text-sm hover:text-primary">预约卡</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/cards/id" className="text-sm hover:text-primary">员工证件</NavigationMenuLink></li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* 宣传印刷品 */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">宣传印刷品</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[600px] grid-cols-3">
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">宣传单页</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/flyers/standard" className="text-sm hover:text-primary">标准传单</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/flyers/folded" className="text-sm hover:text-primary">折页传单</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/postcards" className="text-sm hover:text-primary">明信片</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/door-hangers" className="text-sm hover:text-primary">门挂广告</NavigationMenuLink></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">册子与手册</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/brochures" className="text-sm hover:text-primary">宣传册</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/booklets" className="text-sm hover:text-primary">小册子</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/catalogs" className="text-sm hover:text-primary">产品目录</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/menus" className="text-sm hover:text-primary">菜单</NavigationMenuLink></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">商务文具</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/letterhead" className="text-sm hover:text-primary">信纸信头</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/envelopes" className="text-sm hover:text-primary">信封</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/notepads" className="text-sm hover:text-primary">便签本</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/folders" className="text-sm hover:text-primary">文件夹</NavigationMenuLink></li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* 标识标牌 */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">标识标牌</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">横幅标语</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/banners/vinyl" className="text-sm hover:text-primary">乙烯基横幅</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/banners/fabric" className="text-sm hover:text-primary">布料横幅</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/banners/retractable" className="text-sm hover:text-primary">易拉宝</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/flags" className="text-sm hover:text-primary">旗帜</NavigationMenuLink></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">标牌指示</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/signs/yard" className="text-sm hover:text-primary">庭院标牌</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/signs/acrylic" className="text-sm hover:text-primary">亚克力标牌</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/signs/metal" className="text-sm hover:text-primary">金属标牌</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/posters" className="text-sm hover:text-primary">海报</NavigationMenuLink></li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* 贴纸标签 */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">贴纸标签</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">装饰贴纸</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/stickers/custom" className="text-sm hover:text-primary">定制贴纸</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/stickers/die-cut" className="text-sm hover:text-primary">异形切割贴纸</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/stickers/holographic" className="text-sm hover:text-primary">全息贴纸</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/stickers/transparent" className="text-sm hover:text-primary">透明贴纸</NavigationMenuLink></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">功能标签</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/labels/product" className="text-sm hover:text-primary">产品标签</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/labels/shipping" className="text-sm hover:text-primary">快递标签</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/labels/address" className="text-sm hover:text-primary">地址标签</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/labels/barcode" className="text-sm hover:text-primary">条码标签</NavigationMenuLink></li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* 服装定制 */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">服装定制</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">上衣类</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/apparel/t-shirts" className="text-sm hover:text-primary">T恤</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/apparel/polo" className="text-sm hover:text-primary">Polo衫</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/apparel/hoodies" className="text-sm hover:text-primary">连帽衫</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/apparel/jackets" className="text-sm hover:text-primary">外套</NavigationMenuLink></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">配饰类</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/apparel/caps" className="text-sm hover:text-primary">帽子</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/apparel/bags" className="text-sm hover:text-primary">包袋</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/apparel/aprons" className="text-sm hover:text-primary">围裙</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/apparel/scarves" className="text-sm hover:text-primary">围巾</NavigationMenuLink></li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* 促销礼品 */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">促销礼品</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[600px] grid-cols-3">
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">杯具用品</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/drinkware/mugs" className="text-sm hover:text-primary">马克杯</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/drinkware/tumblers" className="text-sm hover:text-primary">保温杯</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/drinkware/bottles" className="text-sm hover:text-primary">水杯</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/drinkware/glasses" className="text-sm hover:text-primary">玻璃杯</NavigationMenuLink></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">办公用品</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/office/pens" className="text-sm hover:text-primary">笔类</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/office/notebooks" className="text-sm hover:text-primary">笔记本</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/office/mousepads" className="text-sm hover:text-primary">鼠标垫</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/office/calendars" className="text-sm hover:text-primary">日历</NavigationMenuLink></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">科技配件</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/tech/usb" className="text-sm hover:text-primary">U盘</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/tech/chargers" className="text-sm hover:text-primary">充电器</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/tech/speakers" className="text-sm hover:text-primary">音响</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/tech/phone-accessories" className="text-sm hover:text-primary">手机配件</NavigationMenuLink></li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* 包装用品 */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">包装用品</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">包装盒</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/packaging/mailer-boxes" className="text-sm hover:text-primary">快递盒</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/packaging/product-boxes" className="text-sm hover:text-primary">产品包装盒</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/packaging/gift-boxes" className="text-sm hover:text-primary">礼品盒</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/packaging/food-boxes" className="text-sm hover:text-primary">食品包装盒</NavigationMenuLink></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-sm">包装袋</h3>
                      <ul className="space-y-2">
                        <li><NavigationMenuLink href="/products/packaging/paper-bags" className="text-sm hover:text-primary">纸袋</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/packaging/plastic-bags" className="text-sm hover:text-primary">塑料袋</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/packaging/pouches" className="text-sm hover:text-primary">包装袋</NavigationMenuLink></li>
                        <li><NavigationMenuLink href="/products/packaging/mailers" className="text-sm hover:text-primary">快递袋</NavigationMenuLink></li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/blog" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2">
                  博客
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/track-order">
              <Button variant="ghost" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                订单查询
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                登录
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                首页
              </Link>
              
              {/* Mobile Product Categories */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-semibold text-foreground">产品分类</div>
                <Link
                  href="/products/business-cards"
                  className="block px-6 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  名片与卡片
                </Link>
                <Link
                  href="/products/marketing"
                  className="block px-6 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  宣传印刷品
                </Link>
                <Link
                  href="/products/apparel"
                  className="block px-6 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  服装定制
                </Link>
                <Link
                  href="/products/promotional"
                  className="block px-6 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  促销礼品
                </Link>
              </div>

              <Link
                href="/blog"
                className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                博客
              </Link>
              
              <div className="pt-2 border-t">
                <Link
                  href="/track-order"
                  className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  订单查询
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  登录
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
