# Go Web 栈索引（标准库与路由框架）

> **先掌握 `net/http`**，再按团队习惯选 **Gin / Echo / chi** 之一；差异主要在 **上下文抽象** 与 **中间件链** 手感。  
> 语言见 [[go-quick-guide]]；HTTP 见 [[programming-knowledge-core]]。仓库规则 [[REPO_LAYOUT]]。

## 一、专篇列表

| 笔记 | 定位 |
|------|------|
| [[go-net-http-guide]] | 标准库 `Server` / `ServeMux` / `Handler`，一切框架的底层。 |
| [[go-gin-guide]] | 高性能、`*gin.Context`、生态最大。 |
| [[go-echo-guide]] | 极简 API、中间件与 JSON 助手丰富。 |
| [[go-chi-guide]] | 轻量、**标准 `http.Handler`** 友好、路由分组清晰。 |

---

## 二、横向对比（选谁）

| 维度 | `net/http` | Gin | Echo | chi |
|------|------------|-----|------|-----|
| **抽象** | 无魔法 | `*gin.Context` | `echo.Context` | 原生 `ResponseWriter` + `Request` 为主 |
| **路由** | 1.22+ `ServeMux` 增强 | 树形高性能 | 树形 | 树形/轻量 |
| **学习曲线** | 需自己组中间件链 | 低 | 低 | 低（熟标准库更顺） |
| **生态/示例量** | 官方文档 | 最大 | 大 | 中 |
| **典型问题** | 完全可控、依赖少 | 高 QPS API、教程多 | 喜欢统一 Context API | 微服务、与 stdlib 互操作多 |

**实践建议**：库作者或极简网关可 **只 stdlib**；业务服务 **三选一** 即可，**观测性（日志/指标/追踪）** 比框架名字更重要。

---

## 三、与 Python/Java Web 的心智对照（简）

- Go **无 WSGI/ASGI** 之分：HTTP 即 `Handler`；并发用 **goroutine**，注意 **连接与 DB 池** 配置。
- 相对 **Spring**：Go 侧通常 **更少运行时魔法**，依赖注入多用手写或小型库（wire 等）。

---

## 延伸阅读

- [[programming-knowledge-core]] — REST、鉴权、超时。
