# Vue 框架与生态（栈选型 · Nuxt）

> **Vue** 官方定位为 **渐进式框架**（比 React 多一层「官方路由/状态」生态）；与 **React 作为 UI 库** 的对比见下表与 [[react-ecosystem-guide]]。  
> 组合式 API 与组件细节见 [[vue-guide]]；语言见 [[javascript-typescript-quick-guide]]；总索引 [[frontend-stack-index]]。仓库规则 [[REPO_LAYOUT]]。

## 一、Vue 解决什么问题

| 适合 | 不太适合 |
|------|----------|
| 希望 **SFC 单文件**、模板与样式同文件协作 | 团队已全栈 JSX 且强绑定 React 独占库 |
| **官方栈**（Router + Pinia）减少选型争论 | 强依赖 **RSC / Next 独占** 能力时看 React 元框架 |

---

## 二、常见组合栈

### 2.1 Vite + Vue（SPA）

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app && npm install && npm run dev
```

- 与 React 的 Vite 模板对称；**构建与 DX** 与 React 侧一致。

### 2.2 Vue Router（与 [[vue-guide]] 呼应）

- `createRouter` + `createWebHistory`；导航守卫做鉴权与标题。

### 2.3 Pinia（全局状态）

- 官方推荐；与 Options API / 组合式 API 均可配合；见 [[vue-guide]] 示例。

---

## 三、元框架：Nuxt

- **Nuxt 3**：基于 **Vite**；**文件路由**、`server/api` 目录、`useFetch`/`useAsyncData` 做数据获取。
- **适合**：需要 **SSR/SSG**、SEO、一体化 Vue 全栈；与 **Next** 在 React 侧角色类似。

**与「纯 Vite + Vue」**：仅前端 SPA、无 SEO 硬需求时，不必上 Nuxt。

---

## 四、与 React 栈对照（摘要）

| 维度 | Vue | React |
|------|-----|-------|
| UI 写法 | 模板 + SFC | JSX 为主 |
| 官方路由/状态 | Vue Router、Pinia | 生态自选 |
| 元框架 SSR | **Nuxt** | **Next**、Remix |
| 深度概念稿 | [[vue-guide]] | [[react-concepts-guide]] |

---

## 五、延伸阅读

- [[vue-guide]] — `ref`、Router、Pinia、与 React 对比表。
- [[react-ecosystem-guide]] — React **库** + 栈与元框架。
- [[frontend-stack-index]] — 总入口。
