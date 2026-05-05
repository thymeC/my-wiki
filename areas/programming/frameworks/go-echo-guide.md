# Echo 详解（特点 · 场景 · 与 Gin/chi 对比）

> **极简、可插拔的 Go Web 框架**：中心抽象是 **`echo.Context`**，内置 JSON、JWT、Validator 等助手较多。  
> 总览见 [[go-frameworks-index]]；语言见 [[go-quick-guide]]。仓库规则 [[REPO_LAYOUT]]。

## 一、解决什么问题

| 适合 | 不太适合 |
|------|----------|
| 喜欢 **统一 Echo API**、文档清晰 | 强需求 **所有 Handler 保持标准库签名**（看 chi） |
| REST + **中间件** 链 + 绑定一站式 | 只想要 **最小依赖**（`net/http` 或 chi） |

**特点**：错误常 **`return err`**，由 **HTTPErrorHandler** 统一转响应；与 Gin 的 `c.JSON` 风格不同但同样清晰。

---

## 二、核心示例

```go
package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello")
	})

	e.GET("/users/:id", func(c echo.Context) error {
		id := c.Param("id")
		return c.JSON(http.StatusOK, map[string]string{"id": id})
	})

	e.Logger.Fatal(e.Start(":8080"))
}
```

### 绑定与校验

```go
type user struct {
	Name string `json:"name" validate:"required"`
	Age  int    `json:"age" validate:"gte=0"`
}

func create(c echo.Context) error {
	var u user
	if err := c.Bind(&u); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusCreated, u)
}
```

---

## 三、与 Gin / chi 对比

| 维度 | Echo | Gin | chi |
|------|------|-----|-----|
| 错误风格 | `return error` | 多 `c.JSON` + return | 手写 `http.Error` 等 |
| Context | `echo.Context` | `*gin.Context` | 标准库为主 |
| 插件感 | **可插拔** 中间件命名统一 | 中间件极多 | 最小核心 |

**何时选 Echo**：喜欢 **显式 error 返回** 与 **Echo 生态**（JWT、CORS 等）拼装体验。

---

## 四、延伸阅读

- [[go-gin-guide]] · [[go-chi-guide]] · [[go-net-http-guide]]
- [[programming-knowledge-core]] — 日志与 trace id 贯通。
