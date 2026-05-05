# Go `net/http` 详解（标准库 HTTP 服务）

> **所有 Go Web 框架的底层**：`Handler` 接口 + `Server`；理解它再选 Gin/Echo/chi 不会晕。  
> 对比与选型见 [[go-frameworks-index]]；语言见 [[go-quick-guide]]。仓库规则 [[REPO_LAYOUT]]。

## 一、解决什么问题

| 适合 | 不太适合 |
|------|----------|
| **网关、健康检查、极小服务** | 需要大量 **开箱路由/绑定/文档**（用框架更快） |
| 希望 **零第三方依赖**、完全掌控中间件链 | 团队要求 **统一 Context 助手**（Gin/Echo 更省事） |

---

## 二、`Handler` 与 `ServeMux`

```go
package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})
	mux.HandleFunc("GET /hello/{name}", func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name") // Go 1.22+ 路径参数
		_, _ = fmt.Fprintf(w, "hi %s", name)
	})

	srv := &http.Server{
		Addr:              ":8080",
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second, // 防慢头攻击
	}
	_ = srv.ListenAndServe()
}
```

---

## 三、中间件模式（手写）

```go
func logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 前置日志
		next.ServeHTTP(w, r)
	})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api", func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("ok"))
	})
	var h http.Handler = mux
	h = logging(h)
	_ = http.ListenAndServe(":8080", h)
}
```

---

## 四、与 Gin / Echo / chi 对比（摘要）

| 项 | `net/http` | 框架 |
|----|------------|------|
| 路由参数 / 绑定 | 1.22+ 改善，仍偏底层 | 路径参数、JSON bind 一站式 |
| 生态中间件 | 自己接或散件 | 社区插件多 |
| 性能 | 足够；瓶颈常在业务与 IO | Gin 等微优化多一些 |

---

## 五、延伸阅读

- [[go-gin-guide]] · [[go-echo-guide]] · [[go-chi-guide]]
- [[programming-knowledge-core]] — TLS 终止、反向代理。
