# React：库与生态（栈选型 · 元框架）

> **React 不是「全家桶框架」**，而是 **UI 库**：只管组件树与渲染；**路由、数据层、SSR** 要靠 **周边库** 或 **元框架**（Next.js、Remix 等）补齐。  
> 核心概念与 Hooks 见 [[react-concepts-guide]]；语言见 [[javascript-typescript-quick-guide]]；总索引 [[frontend-stack-index]]。仓库规则 [[REPO_LAYOUT]]。

## 术语：库 vs 框架（为什么要分清）

| 说法 | 通常指 | React 算不算？ |
|------|--------|----------------|
| **UI 库** | 专注界面渲染与组件模型 | **算** — 官方定位即 library |
| **应用框架** | 路由、数据约定、构建、SSR 等一体或强约定 | **不算** — 需自己选 React Router、Vite、Next 等 |
| **元框架** | 在 React **之上**再包一层约定（文件路由、loader、SSR） | **Next / Remix** 等才算 |

口语里说「React 框架」很常见，但记笔记时区分 **React（库）** 与 **Next（框架）**，选型时更不容易晕。

---

## 一、React 适合解决什么

| 适合 | 不太适合 |
|------|----------|
| 大型 SPA、设计系统、组件库与 TS 深度结合 | 只想扔几个静态页（可能过重） |
| 与 **Next / Remix** 做全栈或 SSR | 强需求「模板 + 官方路由/状态一体」且团队更熟 Vue（见 [[vue-framework-guide]]） |

---

## 二、常见组合栈（库 + 周边）

### 2.1 Vite + React（纯客户端 SPA）

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install && npm run dev
```

- **特点**：冷启动与 HMR 快；**无内置 SSR**；部署多为静态资源 + CDN。

### 2.2 React Router（客户端路由）

```tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

### 2.3 服务端状态：TanStack Query

适合 **REST/GraphQL 缓存、去重请求、后台刷新**：

```tsx
import { useQuery } from "@tanstack/react-query";

function User({ id }: { id: string }) {
  const { data, isPending } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetch(`/api/users/${id}`).then((r) => r.json()),
  });
  if (isPending) return <p>…</p>;
  return <p>{data.name}</p>;
}
```

### 2.4 客户端全局状态（简）

| 库 | 特点 |
|----|------|
| **Zustand** | API 小、无样板 |
| **Redux Toolkit** | 可预测、DevTools、中大型团队 |

---

## 三、真正的「框架」层：元框架

### Next.js（App Router）

- **适合**：SEO、SSR/SSG、API Routes、React Server Components 路线。
- **心智**：文件系统路由、`layout.tsx`、`server` vs `client` 组件边界。

### Remix

- **适合**：Web 标准（`Form`、`loader`/`action`）、嵌套路由、渐进增强表单。
- **与 Next**：Remix 更强调 **路由即 MVC**；Next 生态与托管集成更广。

---

## 四、与 Vue 对照（摘要）

| 维度 | React 常见栈 | Vue（**官方称 framework**） |
|------|--------------|------------------------------|
| 核心包角色 | **库**（渲染） | **框架**（渲染 + 官方生态） |
| 入口脚手架 | CRA（旧）/ Vite | Vite 官方模板 |
| 路由 | React Router（独立库） | Vue Router（官方） |
| 元框架 SSR | Next、Remix | Nuxt |
| 状态 | Zustand / RTK | Pinia（官方） |

详情见 [[vue-framework-guide]]、[[react-concepts-guide]] 中与 Vue 的对比章节。

---

## 五、延伸阅读

- [[react-concepts-guide]] — JSX、Hooks、Effect、Context。
- [[frontend-stack-index]] — 总入口。
- [[vue-guide]] — 与 Vue 3 对照阅读。
