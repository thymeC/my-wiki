# SQLAlchemy 详解（ORM · Core · 与 Django ORM 对照）

> **Python 生态主流数据访问层**：**Core**（SQL 表达式）+ **ORM**（对象关系映射）；常与 **Flask / FastAPI** 组合，**Alembic** 做迁移。  
> 语言见 [[python-quick-guide]]；Web 选型见 [[python-frameworks-index]]。仓库规则 [[REPO_LAYOUT]]。

## 一、解决什么问题

| 适合 | 不太适合 |
|------|----------|
| 非 Django 项目需要 **跨引擎**、复杂 SQL、可组合查询 | 已用 **Django ORM** 且无需第二套数据层 |
| 希望 **Python 代码表达 SQL**，又保留「落回原生 SQL」的逃生口 | 团队坚持纯手写 SQL + 薄 mapper（可用 Core 不用 ORM） |

**与 Django ORM**：Django ORM **深度绑定 Django**；SQLAlchemy 是 **独立库**，适合 FastAPI/Flask 等任意框架。

---

## 二、两层 API

### 2.1 Core（接近 SQL）

```python
from sqlalchemy import Table, Column, Integer, String, MetaData, select
from sqlalchemy import create_engine

metadata = MetaData()
user = Table(
    "user",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(50), nullable=False),
)

engine = create_engine("sqlite:///:memory:")
metadata.create_all(engine)

with engine.connect() as conn:
    conn.execute(user.insert().values(name="ada"))
    rows = conn.execute(select(user).where(user.c.id == 1)).mappings().all()
```

### 2.2 ORM（声明式模型）

```python
from sqlalchemy import create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

engine = create_engine("sqlite:///:memory:")
Base.metadata.create_all(engine)

with Session(engine) as session:
    session.add(User(name="lin"))
    session.commit()
    u = session.scalars(select(User).where(User.name == "lin")).one()
```

---

## 三、Session 与事务心智

- **Session 是工作单元**：变更在 `commit()` 前可 `rollback()`。
- **Web 中常见模式**：**每个请求一个 Session**（依赖注入），请求结束关闭。
- **N+1**：用 **`selectinload` / `joinedload`** 预加载关系。

```python
from sqlalchemy import select
from sqlalchemy.orm import selectinload

# 假设 User 有 posts 关系
session.scalars(select(User).options(selectinload(User.posts))).all()
```

---

## 四、迁移：Alembic

```bash
alembic init alembic
# 编辑 env.py 指向 metadata / Base.metadata
alembic revision --autogenerate -m "create user"
alembic upgrade head
```

---

## 五、与 Django ORM / 裸 SQL 对比

| 维度 | SQLAlchemy | Django ORM | 手写 SQL |
|------|------------|------------|----------|
| 框架绑定 | 无 | 强绑定 Django | 无 |
| 复杂查询组合 | Core 很强 | 尚可 | 最灵活 |
| Admin 自动生成 | 无 | 有 | 无 |

---

## 六、延伸阅读

- [[python-flask-guide]] · [[python-fastapi-guide]]
- [[python-django-guide]] — 若用 Django 通常不必叠 SQLAlchemy。
- [[programming-knowledge-core]] — 事务、隔离级别。
