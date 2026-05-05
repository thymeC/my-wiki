# Flask 详解（特点 · 场景 · 与同类对比）

> **WSGI 微框架**：核心极小，路由 + 请求上下文；能力靠 **扩展** 拼装。  
> 语言见 [[python-quick-guide]]；总索引与对比见 [[python-frameworks-index]]。仓库规则 [[REPO_LAYOUT]]。

## 一、解决什么问题

| 适合 | 不太适合 |
|------|----------|
| 中小 REST/JSON 服务、内部工具、原型 | 要强内置 Admin/权限/ORM 一体化（更偏 Django） |
| 与 **大量同步第三方库** 深度耦合 | 全链路 async I/O 且希望类型即文档（更偏 FastAPI） |
| 团队已熟悉「轻内核 + 自选组件」 | 需要框架级强约定减少分歧（更偏 Django） |

**设计思想**：**微内核** — 不包含 ORM/表单/用户系统；由社区扩展（Flask-SQLAlchemy、Flask-Migrate、Flask-JWT-Extended 等）按需叠加。

---

## 二、核心机制（带代码）

### 2.1 应用与路由

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.get("/api/items/<int:item_id>")
def get_item(item_id: int):
    return jsonify(id=item_id, q=request.args.get("q"))

@app.post("/api/items")
def create_item():
    data = request.get_json(silent=True) or {}
    return jsonify(created=data), 201
```

### 2.2 蓝图（按模块拆分）

```python
from flask import Blueprint, Flask

api = Blueprint("api", __name__, url_prefix="/api")

@api.get("/health")
def health():
    return {"ok": True}

app = Flask(__name__)
app.register_blueprint(api)
```

### 2.3 请求上下文

`request`、`session`、`g` 依赖 **请求作用域**（线程或 greenlet）；不要在全局随意缓存请求相关数据。

```python
from flask import g, request

@app.before_request
def set_trace_id():
    g.trace_id = request.headers.get("X-Trace-Id", "-")
```

### 2.4 错误处理

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.errorhandler(404)
def not_found(e):
    return jsonify(error="not_found"), 404
```

---

## 三、生态与部署

- **生产服务器**：**Gunicorn**、**Waitress**（纯 Python）；前接 Nginx 做 TLS/静态。
- **模板**：Jinja2（服务端渲染或混合架构）。
- **配置**：`app.config` / 环境变量；区分 `FLASK_ENV` 或自建 profile。

```bash
export FLASK_APP=app:create_app
flask run --reload
```

---

## 四、与 FastAPI / Django 对比（摘要）

| 项 | Flask | FastAPI | Django |
|----|-------|---------|--------|
| 协议 | WSGI（主） | ASGI | WSGI（主） |
| 校验与文档 | 手写或扩展 | Pydantic + OpenAPI 内置 | DRF 等 |
| ORM | 自选 | 自选 | 内置 |

**与 FastAPI**：若你坚持 **同步栈**、或依赖链暂不支持 async，Flask 更省心；若对外 API 多、要强契约与 async，选 FastAPI。

**与 Django**：要 **Admin + Auth + ORM 一体** 且接受框架体积，Django 更快落地；Flask 更适合「只做一层薄 API」。

---

## 五、延伸阅读

- [[python-fastapi-guide]] · [[python-django-guide]]
- [[python-sqlalchemy-guide]] — 常见搭配。
- [[programming-knowledge-core]] — HTTP、安全基础。
