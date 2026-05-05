# FastAPI 详解（特点 · 场景 · 与同类对比）

> **ASGI 优先的现代 API 框架**：**类型注解** → 自动校验 + **OpenAPI 文档**；原生 **`async`**。  
> 构建在 **Starlette** + **Pydantic** 之上。语言见 [[python-quick-guide]]；总索引见 [[python-frameworks-index]]。仓库规则 [[REPO_LAYOUT]]。

## 一、解决什么问题

| 适合 | 不太适合 |
|------|----------|
| 对外/对内 **REST API**，希望 **契约即代码** | 强依赖 **仅同步** 且无法线程池隔离的阻塞库（需评估或换库） |
| **高并发 I/O**（数据库/HTTP 客户端支持 async） | 需要 Django 级 **Admin + 内置用户体系** 开箱即用 |
| 微服务、BFF、与前端 **联调靠 Swagger** | 团队完全排斥类型注解与 Pydantic 心智 |

**设计思想**：把 **HTTP 层** 与 **数据模型层**（Pydantic）绑在一起，减少「文档与实现漂移」。

---

## 二、核心机制（带代码）

### 2.1 路径、查询、Body

```python
from fastapi import FastAPI, Query
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.get("/items/{item_id}")
async def read_item(
    item_id: int,
    q: str | None = Query(default=None, max_length=50),
):
    return {"item_id": item_id, "q": q}

@app.post("/items")
async def create_item(item: Item):
    return {"received": item.model_dump()}
```

### 2.2 依赖注入 `Depends`

把 **DB 会话、鉴权、配置** 抽成依赖，便于测试与复用。

```python
from typing import Annotated
from fastapi import Depends, FastAPI, Header, HTTPException

app = FastAPI()

async def verify_token(x_token: Annotated[str | None, Header()] = None):
    if x_token != "secret":
        raise HTTPException(status_code=400, detail="bad token")
    return x_token

@app.get("/secure/me")
async def me(token: Annotated[str, Depends(verify_token)]):
    return {"token": token}
```

### 2.3 同步路由（必要时）

阻塞代码可放 **普通 `def`**，Starlette 会放到线程池（注意仍占用 worker 容量）。

```python
@app.get("/cpu")
def heavy():
    return {"ok": True}  # CPU 密集仍建议多进程 worker
```

### 2.4 生命周期

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    yield
    # shutdown

app = FastAPI(lifespan=lifespan)
```

---

## 三、运行与文档

```bash
uvicorn main:app --reload
# 文档：/docs（Swagger）、/redoc
```

**生产**：多 worker 进程 + Nginx；CPU 密集任务下放 **Celery** 或独立服务。

---

## 四、与 Flask / Django / Starlette 对比

| 项 | FastAPI | Flask | Django | Starlette |
|----|---------|-------|--------|-----------|
| 角色 | 高级 API 框架 | WSGI 微框架 | 全栈框架 | ASGI 工具箱（更底层） |
| 校验/文档 | 内置强 | 弱（扩展补） | DRF 等 | 无（自建） |
| 上手 | 需会类型与 async | 极易 | 概念多 | 更偏库作者 |

**与 Starlette**：FastAPI **包含** Starlette 的能力；一般业务写 FastAPI 即可，除非你只要极简路由。

**与 Flask**：同步生态极多时选 Flask；**async 就绪** 且重视 OpenAPI 时选 FastAPI。

---

## 五、延伸阅读

- [[python-flask-guide]] · [[python-django-guide]]
- [[python-sqlalchemy-guide]] — ORM 与 async 会话注意点。
- [[programming-knowledge-core]] — REST、状态码语义。
