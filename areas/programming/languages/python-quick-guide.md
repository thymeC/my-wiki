# Python 快速学习手册（设计思想 · 核心概念 · 数据结构）

> 面向个人知识库的 **80/20 速查**：每节附 **可运行或可直接照抄的最小代码**，便于对照记忆。  
> 姊妹篇：通用编程横切见 [[programming-knowledge-core]]；Python Web 栈见 [[python-frameworks-index]]；模式见 [[design-patterns-guide]]。仓库规则 [[REPO_LAYOUT]]。

## 目录

- [一、设计思想](#一设计思想)
- [二、执行与导入模型](#二执行与导入模型)
- [三、类型、对象与协议](#三类型对象与协议)
- [四、核心语法块](#四核心语法块)
- [五、内建与标准库数据结构](#五内建与标准库数据结构)
- [六、函数式与迭代](#六函数式与迭代)
- [七、错误与资源管理](#七错误与资源管理)
- [八、并发一瞥（补框架前置）](#八并发一瞥补框架前置)
- [九、包管理与环境](#九包管理与环境)
- [十、延伸阅读](#十延伸阅读)

---

## 一、设计思想

| 观念 | 含义 |
|------|------|
| **可读性优先** | 缩进即结构；「一种明显做法」优于炫技。 |
| **鸭子类型** | 不关心名义类型，关心「有没有对应方法/协议」；配合 **EAFP**（先尝试再处理异常）常见。 |
| **协议（Protocol）** | 结构化子类型：`typing.Protocol` 描述「需要哪些方法」。 |
| **batteries included** | 标准库覆盖文件、网络、异步等；复杂场景再上第三方。 |
| **GIL** | 多线程 **CPU 密集** 难并行；**多进程 / asyncio / C 扩展** 是常见解。 |

**EAFP 示例**（先尝试，再捕获）：

```python
def get_score(row: dict) -> int:
    try:
        return int(row["score"])
    except (KeyError, TypeError, ValueError):
        return 0
```

**LBYL 对照**（先检查再操作）：适合竞态敏感或异常极罕见的路径；多数业务代码 EAFP 更短。

```python
def get_score_lbyl(row: dict) -> int:
    if "score" not in row:
        return 0
    v = row["score"]
    if not isinstance(v, (int, str)):
        return 0
    try:
        return int(v)
    except ValueError:
        return 0
```

---

## 二、执行与导入模型

**模块只执行一次**，结果进 `sys.modules`：

```python
import sys
import mymod  # 首次执行 mymod.py
assert "mymod" in sys.modules
```

**入口脚本** vs **被导入**：

```python
# app.py
def main() -> None:
    print("running")

if __name__ == "__main__":
    main()
```

**LEGB 与 `nonlocal`**：

```python
def outer():
    x = 1

    def inner():
        nonlocal x
        x += 1
        return x

    return inner

f = outer()
assert f() == 2 and f() == 3
```

**包内相对导入**（必须在包内模块中使用）：

```python
# pkg/sub/api.py
from .utils import helper  # 同包
from ..config import DEBUG  # 父包
```

---

## 三、类型、对象与协议

**赋值是名字绑定**（共享同一对象）：

```python
a = [1, 2]
b = a
b.append(3)
assert a == [1, 2, 3]  # a、b 指向同一 list
```

**`dataclass` 与冻结实例**：

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(1.0, 2.0)
# p.x = 0  # dataclasses.FrozenInstanceError
```

**`Protocol`（结构化子类型）**：

```python
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None: ...

class Sprite:
    def draw(self) -> None:
        print("sprite")

def render(obj: Drawable) -> None:
    obj.draw()

render(Sprite())  # Sprite 未继承 Drawable，但形状匹配
```

**枚举**：

```python
from enum import Enum, auto

class JobState(Enum):
    PENDING = auto()
    DONE = auto()

assert JobState.PENDING != JobState.DONE
```

---

## 四、核心语法块

**列表 / 字典 / 集合推导**：

```python
xs = [n * n for n in range(5) if n % 2 == 0]
m = {k: k * 10 for k in range(3)}
s = {c for c in "hello"}  # {'h','e','l','o'}
```

**生成器（惰性）**：

```python
def count_up(start: int):
    n = start
    while True:
        yield n
        n += 1

g = count_up(0)
assert next(g) == 0 and next(g) == 1

squares = (n * n for n in range(10_000_000))  # 不占满内存建列表
```

**上下文管理器**：

```python
from contextlib import contextmanager

@contextmanager
def open_resource(name: str):
    print("acquire", name)
    try:
        yield name
    finally:
        print("release", name)

with open_resource("db") as r:
    print("use", r)
```

**装饰器**：

```python
from functools import wraps
from typing import Callable, TypeVar

F = TypeVar("F", bound=Callable[..., object])

def logged(fn: F) -> F:
    @wraps(fn)
    def wrapper(*args: object, **kwargs: object):
        print("call", fn.__name__)
        return fn(*args, **kwargs)
    return wrapper  # type: ignore[return-value]

@logged
def add(a: int, b: int) -> int:
    return a + b
```

**`*args` / `**kwargs`**：

```python
def trace(tag: str, *args: object, **kwargs: object) -> None:
    print(tag, args, kwargs)

trace("x", 1, 2, a=3)  # x (1, 2) {'a': 3}
```

---

## 五、内建与标准库数据结构

### 5.1 `list` / `dict` / `set` / `tuple`

```python
# list：栈
stack: list[int] = []
stack.append(1)
stack.pop()

# dict：计数
hits: dict[str, int] = {}
for word in ["a", "b", "a"]:
    hits[word] = hits.get(word, 0) + 1

# set：去重与集合运算
a, b = {1, 2}, {2, 3}
assert a & b == {2} and a | b == {1, 2, 3}

# tuple 作 dict 键（元素都可哈希时）
loc = {(0, 0): "origin"}
```

**字符串拼接**：大量片段用 `join`，避免 `+=` 在循环里反复拷贝。

```python
parts = ["a", "b", "c"]
s = "".join(parts)
```

### 5.2 `collections`

```python
from collections import deque, defaultdict, Counter

dq: deque[int] = deque()
dq.append(1)
dq.appendleft(0)  # O(1)

dd: dict[str, list[int]] = defaultdict(list)
dd["k"].append(1)  # 无需先 if "k" in dd

c = Counter(["x", "y", "x"])
assert c.most_common(1) == [("x", 2)]
```

### 5.3 `heapq`（最小堆）

```python
import heapq

h: list[int] = []
heapq.heappush(h, 3)
heapq.heappush(h, 1)
assert heapq.heappop(h) == 1
```

### 5.4 排序

```python
rows = [{"k": 2}, {"k": 1}]
rows.sort(key=lambda r: r["k"])
assert [r["k"] for r in rows] == [1, 2]
```

---

## 六、函数式与迭代

```python
from functools import partial, reduce
import operator
import itertools

# partial：固定参数
basetwo = partial(int, base=2)
assert basetwo("101") == 5

# reduce
assert reduce(operator.mul, [1, 2, 3, 4], 1) == 24

# itertools：拼接、切片无限迭代器
assert list(itertools.islice(itertools.count(10), 3)) == [10, 11, 12]
```

---

## 七、错误与资源管理

```python
import logging

def load_config(path: str) -> dict:
    try:
        with open(path, encoding="utf-8") as f:
            text = f.read()
    except OSError as e:
        logging.exception("read failed: %s", path)
        raise RuntimeError("config missing") from e
    else:
        return {"raw": text}  # 无异常时执行
    finally:
        pass  # 无论是否异常都执行（此处占位）
```

---

## 八、并发一瞥（补框架前置）

**`asyncio` 最小例**（与 ASGI / FastAPI 同轨）：

```python
import asyncio

async def fetch(n: int) -> int:
    await asyncio.sleep(0.01)
    return n * n

async def main() -> None:
    results = await asyncio.gather(fetch(1), fetch(2), fetch(3))
    assert results == [1, 4, 9]

asyncio.run(main())
```

**线程池跑阻塞任务**（避免阻塞事件循环）：

```python
import asyncio
from concurrent.futures import ThreadPoolExecutor

def blocking_io() -> str:
    return "ok"

async def run_in_pool() -> str:
    loop = asyncio.get_running_loop()
    with ThreadPoolExecutor(1) as pool:
        return await loop.run_in_executor(pool, blocking_io)
```

---

## 九、包管理与环境

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -U pip
pip freeze > requirements.txt
```

生产建议：锁 **小版本**（`==`）或使用 **Poetry / uv** 生成 lockfile。

---

## 十、延伸阅读

- [[python-frameworks-index]] — Flask / FastAPI / Django 等索引与对比入口。
- [[programming-knowledge-core]] — Git、HTTP、DB 等横切主题。
- [[dsa-guide-with-code]] — 算法与复杂度直觉。
