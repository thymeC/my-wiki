# Gin 详解（特点 · 场景 · 与 Echo/chi 对比）

> **高性能 HTTP Web 框架**：路由树、中间件链、JSON 绑定；API 风格接近 Node **Express**。  
> 总览见 [[go-frameworks-index]]；语言见 [[go-quick-guide]]。仓库规则 [[REPO_LAYOUT]]。

## 一、解决什么问题

| 适合 | 不太适合 |
|------|----------|
| **REST/JSON API**、要高 QPS 基线、示例多 | 强偏好 **只使用标准库 `http.Handler`** 的代码风格（看 chi） |
| 团队熟悉「全局 Engine + Context」模型 | 极轻 DSL，只要路由分组（chi 也强） |

**特点**：**`*gin.Context`** 贯穿请求；**绑定**（JSON/Query/URI）与 **渲染** 内建；生态 **最大**。

---

## 二、核心示例

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong"})
	})

	v1 := r.Group("/api/v1")
	{
		v1.GET("/users/:id", func(c *gin.Context) {
			id := c.Param("id")
			c.JSON(200, gin.H{"id": id})
		})
	}

	_ = r.Run(":8080")
}
```

### 中间件

```go
r.Use(func(c *gin.Context) {
	// 前置
	c.Next()
	// 后置（可读 status）
})
```

### JSON 绑定与校验

```go
type body struct {
	Name string `json:"name" binding:"required"`
	Age  int    `json:"age" binding:"gte=0"`
}

func create(c *gin.Context) {
	var b body
	if err := c.ShouldBindJSON(&b); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(201, b)
}
```

---

## 三、与 Echo / chi 对比

| 维度 | Gin | Echo | chi |
|------|-----|------|-----|
| Context | `*gin.Context` | `echo.Context` | 多为标准 `http.Handler` |
| 性能口碑 | 极佳 | 很好 | 很好 |
| 绑定/错误处理 | 成熟 | 成熟 | 更偏手写 |
| 与 stdlib 互操作 | 可 `http.Handler` 适配 | 可 | **最顺** |

**何时选 Gin**：要 **文档+中间件+绑定** 一条龙，且不在意强绑在 `gin.Context` 上。

---

## 四、延伸阅读

- [[go-echo-guide]] · [[go-chi-guide]] · [[go-net-http-guide]]
- [[programming-knowledge-core]] — 超时、优雅停机（`srv.Shutdown`）。
