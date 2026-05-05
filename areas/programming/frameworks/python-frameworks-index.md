# Python Web 与配套栈索引（WSGI / ASGI · 选型总览）

> 本页是 **入口与对比表**；各框架有 **独立成篇** 的详细笔记。语言基础见 [[python-quick-guide]]。仓库规则 [[REPO_LAYOUT]]。

## 一、协议层：WSGI 与 ASGI

| 模型 | 请求模型 | 典型场景 | 代表 |
|------|----------|----------|------|
| **WSGI** | 同步调用链，一个 worker 处理一个请求（多进程/多线程扩展） | 传统 CRUD、CPU 与 I/O 混合、大量同步库 | Flask、Django（常见部署） |
| **ASGI** | 异步事件循环，协程 + WebSocket | 高并发 I/O、长连接、与 `async`/`await` 一致 | FastAPI、Starlette、Uvicorn |

**部署心智**：WSGI 常用 **Gunicorn + gevent/eventlet**（可选）或 **Waitress**；ASGI 用 **Uvicorn / Hypercorn**，前面仍可挂 Nginx。

---

## 二、Web 框架专篇（点进阅读）

| 笔记 | 一句话 |
|------|--------|
| [[python-flask-guide]] | 微内核、同步、扩展生态成熟；适合中小服务与原型。 |
| [[python-fastapi-guide]] | 类型驱动校验 + OpenAPI + 原生 async；适合 API 与微服务。 |
| [[python-django-guide]] | 全家桶 + ORM + Admin；适合后台重、内容/业务系统。 |

---

## 三、配套库专篇

| 笔记 | 一句话 |
|------|--------|
| [[python-sqlalchemy-guide]] | 非 Django 场景的主流 ORM/SQL 工具层；与 Flask/FastAPI 常组合。 |
| [[python-celery-guide]] | 异步任务队列（Broker + Worker）；与 Web 请求解耦。 |

---

## 四、横向对比（选谁）

| 维度 | Flask | FastAPI | Django |
|------|-------|---------|--------|
| **默认哲学** | 微框架，你自己拼 | 现代 API，契约与文档优先 | 约定优于配置，一体化 |
| **同步/异步** | 同步为主（可扩展 async） | async 一等公民 | 传统同步为主；Channels 走 ASGI |
| **内置 ORM/Admin** | 无（自选 SQLAlchemy 等） | 无 | 有 |
| **自动 OpenAPI** | 需扩展 | 内置 | DRF 等扩展 |
| **学习曲线** | 低 | 中（需会类型注解） | 中到高（概念多） |
| **典型问题域** | 简单 API、与遗留同步栈集成 | 高并发 I/O、对外 API 契约 | 后台、权限、CMS、快速搭全栈 |

**组合建议**：

- **Flask + SQLAlchemy + Alembic**：自由度高，团队熟悉同步 Python 时很稳。
- **FastAPI + SQLAlchemy 2.0/async 或纯 Repository**：偏 API 网关、BFF。
- **Django + DRF**：管理端、用户体系、迁移链一体，少造轮子。

---

## 五、测试入口（各专篇内亦有示例）

- **pytest** + **httpx** / Starlette **TestClient**（FastAPI）/ Flask **test_client**。
- 异步路由用 **pytest-asyncio**。

---

## 延伸阅读

- [[programming-knowledge-core]] — HTTP、REST、数据库基础。
- [[design-patterns-guide]] — 依赖注入、中间件等思想对照。
