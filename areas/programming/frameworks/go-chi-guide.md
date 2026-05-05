# chi 详解（特点 · 场景 · 与 Gin/Echo 对比）

> **轻量、符合 idiom 的路由器**：围绕标准库 **`http.Handler`** 组装；**中间件** 与 **路由分组** 表达力强。  
> 总览见 [[go-frameworks-index]]；语言见 [[go-quick-guide]]。仓库规则 [[REPO_LAYOUT]]。

## 一、解决什么问题

| 适合 | 不太适合 |
|------|----------|
| 希望 **少魔法**、Handler 可与其它 stdlib 中间件 **无缝组合** | 想要 **一键 JSON 绑定 + 校验** 全家桶（Gin/Echo 更省事） |
| **微服务** 多模块路由树、URL 设计复杂 | 强依赖「一个大 Context 塞满助手」的团队习惯（可能更喜 Gin） |

**特点**：**`chi.Router` 实现 `http.Handler`**；测试时直接 `httptest` 调 Handler，**心智与 stdlib 一致**。

---

## 二、核心示例

```go
package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})

	r.Route("/api", func(r chi.Router) {
		r.Get("/users/{id}", func(w http.ResponseWriter, r *http.Request) {
			id := chi.URLParam(r, "id")
			_, _ = w.Write([]byte(id))
		})
	})

	_ = http.ListenAndServe(":8080", r)
}
```

### 中间件（标准库签名）

```go
func tokenAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Authorization") == "" {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}
```

---

## 三、与 Gin / Echo 对比

| 维度 | chi | Gin | Echo |
|------|-----|-----|------|
| Handler 签名 | `http.HandlerFunc` | `func(*gin.Context)` | `func(echo.Context) error` |
| 与第三方 stdlib 中间件 | **最好** | 需适配 | 需适配 |
| 绑定/文档 | 手写或另接库 | 强 | 强 |

**何时选 chi**：**标准库优先**、可测性、与 **已有 `http.Handler` 生态** 深度混合。

---

## 四、延伸阅读

- [[go-gin-guide]] · [[go-echo-guide]] · [[go-net-http-guide]]
- [[programming-knowledge-core]] — 版本化 API、中间件顺序。
