# Celery 详解（异步任务 · 与 Web 框架关系）

> **分布式任务队列**：把 **长耗时、可异步** 的工作从 HTTP 请求里拆出去；**Broker**（Redis/RabbitMQ）+ **Worker** + 可选 **Result backend**。  
> 语言见 [[python-quick-guide]]；总索引见 [[python-frameworks-index]]。仓库规则 [[REPO_LAYOUT]]。

## 一、解决什么问题

| 适合 | 不太适合 |
|------|----------|
| 报表、邮件、图片/视频处理、批量同步 | 要求 **同步拿到最终结果** 且延迟极短（应直接请求内完成或 SSE/轮询设计） |
| 削峰：请求只入队，Worker 慢慢消化 | 任务极多且要 **严格顺序**（需单队列/partition 策略） |
| 定时任务（配合 **Celery Beat**） | 已有成熟 **工作流引擎**需求（考虑 Airflow/Temporal 等另论） |

**与 Web 的关系**：**HTTP 只触发任务**（`delay`/`apply_async`），立即返回 `task_id`；客户端再 **轮询/回调** 取结果。

---

## 二、最小概念与代码

```python
# tasks.py
from celery import Celery

app = Celery("proj", broker="redis://localhost:6379/0", backend="redis://localhost:6379/1")

@app.task
def add(x: int, y: int) -> int:
    return x + y
```

```python
# 调用方（Flask/FastAPI/Django 视图中）
from .tasks import add

def enqueue():
    async_result = add.delay(2, 3)
    return {"task_id": async_result.id}
```

---

## 三、可靠性要点

| 主题 | 建议 |
|------|------|
| **幂等** | 任务可能重试；用 **业务幂等键** 或去重表。 |
| **重试** | `autoretry_for`、`retry_backoff`；区分 **可重试错误** 与 **永久失败**。 |
| **超时** | `time_limit` / `soft_time_limit`，避免 Worker 被拖死。 |
| **可见性超时** | Broker 级概念（如 Redis 消息确认），防止任务「永远丢失」或重复执行。 |

```python
@app.task(bind=True, autoretry_for=(Exception,), retry_backoff=True, max_retries=5)
def flaky(self, url: str):
    ...
```

---

## 四、与 Django / FastAPI

- **Django**：`django-celery-beat`、`django-celery-results` 生态成熟。
- **FastAPI**：保持 **应用与 Worker 进程分离**，共享 Broker；注意 **不共享内存状态**。

---

## 五、与其它方案对比（简）

| 方案 | 特点 |
|------|------|
| **Celery** | Python 生态默认项；Broker 灵活。 |
| **RQ** | 更简单，Redis 中心化；功能比 Celery 少。 |
| **云队列 + Lambda/Functions** | 运维外包；语言与锁厂商。 |

---

## 六、延伸阅读

- [[python-flask-guide]] · [[python-fastapi-guide]] · [[python-django-guide]]
- [[programming-knowledge-core]] — 消息语义、至少一次投递的含义。
