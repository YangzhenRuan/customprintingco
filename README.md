# CustomPrintingco 网站项目结构说明

## 项目概述
这是一个使用 Next.js 13+ 框架开发的现代化网站项目，采用了 App Router 架构。

## 目录结构说明

### 1. 根目录文件
- `package.json`: 项目依赖和脚本配置
- `next.config.mjs`: Next.js 配置文件
- `tailwind.config.ts`: Tailwind CSS 配置
- `tsconfig.json`: TypeScript 配置
- `postcss.config.mjs`: PostCSS 配置

### 2. 主要目录结构

#### `/app` - 页面路由和布局
- `layout.tsx`: 全局布局文件
- `page.tsx`: 首页
- 子目录对应不同页面路由：
  - `/about`: 关于我们
  - `/blog`: 博客
  - `/contact`: 联系我们
  - `/faq`: 常见问题
  - `/login`: 登录
  - `/signup`: 注册
  - `/track-order`: 订单追踪
  - `/privacy`: 隐私政策
  - `/terms`: 服务条款
  - `/forgot-password`: 忘记密码

#### `/components` - 可复用组件
- 存放所有可复用的 React 组件
- 建议按功能模块分类存放

#### `/hooks` - 自定义 Hooks
- 存放所有自定义的 React Hooks
- 按功能模块分类

#### `/lib` - 工具函数和配置
- 存放工具函数、API 调用、配置等
- 按功能模块分类

#### `/public` - 静态资源
- 图片、字体等静态资源文件
- 按资源类型分类存放

#### `/styles` - 样式文件
- 全局样式文件
- 主题配置
- 自定义样式

## 文件命名规范
1. 组件文件使用 PascalCase（如：`Button.tsx`）
2. 工具函数和 hooks 使用 camelCase（如：`useAuth.ts`）
3. 样式文件使用 kebab-case（如：`button-styles.css`）

## 代码组织原则
1. 相关功能应该放在同一目录下
2. 组件应该是可复用的，避免过度耦合
3. 页面组件应该放在 `/app` 目录下对应的路由目录中
4. 共享组件应该放在 `/components` 目录下
5. 业务逻辑和工具函数应该放在 `/lib` 目录下

## 开发注意事项
1. 遵循 Next.js 13+ 的文件约定
2. 使用 TypeScript 进行开发
3. 使用 Tailwind CSS 进行样式开发
4. 保持代码结构清晰，便于维护
5. 遵循 React 最佳实践 