# Django 详解（特点 · 场景 · 与同类对比）

> **Batteries included** 的全栈框架：ORM、迁移、Admin、Auth、模板、中间件一体。  
> 语言见 [[python-quick-guide]]；总索引见 [[python-frameworks-index]]。仓库规则 [[REPO_LAYOUT]]。

## 一、解决什么问题

| 适合 | 不太适合 |
|------|----------|
| **业务后台**、内容管理、权限模型清晰的中大型 Web | 只想做一个 **极薄网关**、团队强烈偏好「零框架」 |
| 需要 **Admin** 快速运营/内部使用 | API 极轻且只要 OpenAPI+async（可评估 FastAPI） |
| **多应用**、统一用户与迁移链 | 强实时双工为主（考虑 Channels / 其它栈） |

**设计思想**：**约定优于配置** — `INSTALLED_APPS`、`urls.py`、`settings.py` 结构固定，协作成本低。

---

## 二、核心概念（MTV / MVC）

- **Model**：`models.Model` + 迁移。
- **Template**：服务端渲染（前后端分离项目可弱化）。
- **View**：函数视图或类视图，处理请求并返回响应。

```python
# models.py（示意）
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=8, decimal_places=2)

# views.py
from django.http import JsonResponse
from .models import Book

def book_list(request):
    data = list(Book.objects.values("id", "title", "price")[:50])
    return JsonResponse({"items": data})
```

---

## 三、ORM 要点

```python
# 惰性 QuerySet，链式过滤
qs = Book.objects.filter(price__gte=10).order_by("-id")[:10]

# 避免 N+1：select_related / prefetch_related
books = Book.objects.select_related("author").all()
```

**迁移**：

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 四、REST 与 DRF

对外 JSON API 常用 **Django REST framework**：

- **Serializer**：校验与序列化。
- **ViewSet + Router**：CRUD 样板少写。
- **权限/认证**：与 Django Auth 集成。

（具体 DRF 配置可在你项目中另开笔记。）

---

## 五、与 Flask / FastAPI 对比

| 项 | Django | Flask | FastAPI |
|----|--------|-------|---------|
| 内置 ORM/Admin | ✓ | ✗ | ✗ |
| 默认异步 | 弱（Channels 另说） | 同步为主 | async 一等 |
| 项目结构 | 强约定 | 自由 | 较自由 |
| 上手（做完整后台） | 快 | 需自拼 | API 快、后台需另搭 |

**选择一句话**：**要「带后台的一体化业务系统」选 Django**；**要「薄 API + async 契约」选 FastAPI**；**要「极简可插拔」选 Flask**。

---

## 六、延伸阅读

- [[python-flask-guide]] · [[python-fastapi-guide]]
- [[python-celery-guide]] — Django 集成任务队列极常见。
- [[programming-knowledge-core]] — SQL、事务、安全（CSRF 等）。
