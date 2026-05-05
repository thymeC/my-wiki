# 编程核心知识速查（Python 示例）

> 面向个人知识库的 80/20 速查稿：定义 + 要点 + 最小示例 + 误区/考点。权威落地规则见 [[REPO_LAYOUT]]。

## 目录

- [编程基础](#编程基础)
- [数据结构与算法](#数据结构与算法)
- [面向对象与函数式思想](#面向对象与函数式思想)
- [版本控制 Git](#版本控制-git)
- [软件开发实践](#软件开发实践)
- [数据库基础](#数据库基础)
- [网络基础](#网络基础)
- [前端框架（React）](#前端框架react)
- [扩展思考题](#扩展思考题)

---

## 编程基础

### 变量与类型

**定义**：变量是绑定到某个对象的名称；类型描述对象的行为与取值集合。

**要点**：
- Python 是动态类型：名字可随时重新绑定到不同类型对象。
- 常用内置类型：`int`、`float`、`str`、`bool`、`list`、`dict`、`tuple`、`set`、`None`。
- `is` 比较对象身份，`==` 比较值；小整数等可能被驻留，勿依赖 `is` 比相等。

**示例**：

```python
x = 10          # int
y = 3.14        # float
s = f"x={x}"    # str，f-string 常用
a = [1, 2]
b = a           # b 与 a 同一列表对象
b.append(3)     # a 也会变成 [1, 2, 3]
```

**误区 / 考点**：可变默认参数（`def f(x, lst=[])` 会共享同一列表）；`==` 与 `is` 混用；忽略 `None` 与空容器区别。

---

### 条件与循环

**定义**：条件分支按布尔表达式选择路径；循环在条件或迭代器上重复执行。

**要点**：
- `if / elif / else`；真值：`None`、空容器、`0`、`False` 等为假。
- `for` 遍历可迭代对象；`while` 适合未知次数。
- `break` 跳出循环，`continue` 下一迭代；`for ... else`：未 `break` 时执行 `else`（少用需读懂）。

**示例**：

```python
for i, v in enumerate(["a", "b"]):
    if v == "b":
        break
else:
    print("no break")  # 上面 break 了则不会执行

squares = [x * x for x in range(5) if x % 2 == 0]  # 列表推导
```

**误区 / 考点**：在 `for` 里修改正在遍历的列表；死循环条件；`else` 与 `if` 对齐误解。

---

### 函数

**定义**：函数是把一段逻辑封装成可调用单元，可接收参数并返回值。

**要点**：
- `def` 定义；`*args` 收多余位置参数，`**kwargs` 收关键字参数。
- 返回值默认 `None`；多返回值常用元组解包。
- 一等函数：可赋值、当参数传递（高阶函数基础）。

**示例**：

```python
def add(a: int, b: int = 0) -> int:
    return a + b

def wrap(fn, *args, **kwargs):
    print("before")
    return fn(*args, **kwargs)

wrap(add, 1, b=2)
```

**误区 / 考点**：可变默认参数；在函数内 `x += 1` 对外层不可变名的误解（需 `nonlocal`/`global`）。

---

### 作用域与命名空间

**定义**：作用域决定「哪里能读到哪个名字」；LEGB：Local → Enclosing → Global → Built-in。

**要点**：
- 读变量沿 LEGB 查找；赋值默认创建局部名（除非 `global`/`nonlocal`）。
- 闭包：内层函数记住外层非全局的自由变量绑定。

**示例**：

```python
def outer():
    c = 0
    def inner():
        nonlocal c
        c += 1
        return c
    return inner

f = outer()
f()  # 1
f()  # 2
```

**误区 / 考点**：循环里创建 lambda 全捕获同一变量（用默认参数 `lambda i=i: ...` 修复）；`global` 滥用。

---

### 递归

**定义**：函数直接或间接调用自身，把问题分解为同结构的子问题。

**要点**：
- 必须有基准情形（终止条件），否则栈溢出。
- 深度大时 Python 默认递归深度有限，可改用显式栈或迭代。

**示例**：

```python
def fact(n: int) -> int:
    if n <= 1:
        return 1
    return n * fact(n - 1)
```

**误区 / 考点**：忘基准情形；能用简单循环解决的深度递归；重复子问题未记忆化导致指数复杂度。

---

## 数据结构与算法

> 扩展阅读（更多示例与可运行代码）：[[dsa-guide-with-code]]。

### 数组 / 列表与复杂度直觉

**定义**：连续存储的线性序列；Python `list` 是动态数组，按索引 O(1) 访问，尾部均摊 O(1) 追加，中间插入删除 O(n)。

**要点**：
- 切片 `lst[i:j]` 是新列表；`del`、`insert` 会搬移元素。
- 需要频繁头插可考虑 `collections.deque`。

**示例**：

```python
from collections import deque
q = deque([1, 2])
q.appendleft(0)   # O(1)
```

**误区 / 考点**：认为 `list` 头删是 O(1)；大列表中间插入性能。

---

### 链表（概念）

**定义**：节点通过指针链接的线性结构，插入删除已知节点位置常为 O(1)，按索引访问 O(n)。

**要点**：
- 单链表、双链表；经典题：反转、环检测（快慢指针）、合并有序链。
- Python 无内置链表，面试多用类手写 `Node`。

**示例**：

```python
class Node:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

**误区 / 考点**：断链顺序；空指针；与数组复杂度对比。

---

### 栈与队列

**定义**：栈 LIFO；队列 FIFO。用于括号匹配、DFS（栈）、BFS（队列）、单调栈等。

**要点**：
- 栈：`list.append` + `list.pop()`。
- 队列：`collections.deque` 双端 O(1)。

**示例**：

```python
def is_valid_paren(s: str) -> bool:
    st = []
    m = {")": "(", "]": "[", "}": "{"}
    for c in s:
        if c in "([{":
            st.append(c)
        else:
            if not st or st.pop() != m[c]:
                return False
    return not st
```

**误区 / 考点**：用 `list.pop(0)` 当队列是 O(n)。

---

### 哈希表

**定义**：通过哈希函数将键映射到桶，均摊 O(1) 查找/插入/删除（冲突时用链地址或开放寻址）。

**要点**：
- Python `dict` / `set`；键需可哈希（不可变一般可哈希）。
- 遍历顺序在 3.7+ 插入有序（实现细节，算法题勿依赖「有序」语义）。

**示例**：

```python
cnt = {}
for ch in "hello":
    cnt[ch] = cnt.get(ch, 0) + 1
```

**误区 / 考点**：可变对象作键；依赖浮点键精确相等；忽略最坏冲突。

---

### 排序与二分

**定义**：排序使序列有序；二分在有序结构上每次砍掉一半，O(log n) 查找。

**要点**：
- 常用：`sorted`、原地 `list.sort`；稳定排序 `sorted` 用 Timsort。
- `bisect` 模块维护有序列表插入位置。

**示例**：

```python
import bisect
a = [1, 3, 3, 5]
i = bisect.bisect_left(a, 3)  # 第一个 >= 3 的下标
```

**误区 / 考点**：`sort` 返回 `None`；二分边界 off-by-one；对无序数组误用二分。

---

### 搜索：DFS / BFS

**定义**：DFS 纵深优先（栈/递归）；BFS 层序（队列），最短路在无权图上常用 BFS。

**要点**：
- 图需 `visited` 防重复；网格可走四连通/八连通。
- 递归深度注意栈限制。

**示例**（网格岛屿计数思路片段）：

```python
def dfs(g, i, j, seen):
    if not (0 <= i < len(g) and 0 <= j < len(g[0])): return
    if g[i][j] == 0 or (i, j) in seen: return
    seen.add((i, j))
    for di, dj in ((1,0),(-1,0),(0,1),(0,-1)):
        dfs(g, i+di, j+dj, seen)
```

**误区 / 考点**：忘标记已访问；递归栈溢出；BFS 队列用错。

---

### 动态规划入门

**定义**：把问题拆为重叠子问题，保存子问题结果避免重复计算，通常填表或自顶向下记忆化。

**要点**：
- 先想状态 `dp[i]` 或 `dp[i][j]` 表示什么；转移方程；初值；顺序。
- 斐波那契：朴素递归重复算 → 记忆化或递推。

**示例**：

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
```

**误区 / 考点**：状态定义不清；维度爆炸；能用贪心却误用 DP。

---

## 面向对象与函数式思想

> 设计模式（多语言对照示例）：[[design-patterns-guide]]。

### 面向对象核心

**定义**：把数据与操作数据的方法绑在对象上，用类描述共性，用继承与多态复用与替换行为。

**要点**：
- 封装：`_protected`、`__name_mangling` 约定，非强制私有。
- 继承：子类扩展/重写；`super()` 调用父类。
- 多态：同一接口不同实现；鸭子类型「像就行」。

**示例**：

```python
class Animal:
    def speak(self) -> str:
        raise NotImplementedError

class Dog(Animal):
    def speak(self) -> str:
        return "woof"
```

**误区 / 考点**：过度继承；在 `__init__` 外忘记初始化；混淆类属性与实例属性。

---

### 函数式常见手法

**定义**：强调函数为一等值、尽量避免可变状态与副作用，用组合子表达逻辑。

**要点**：
- `map` / `filter` / `reduce`；推导式往往更清晰。
- 纯函数：相同输入相同输出、无副作用，易测。
- `functools.partial` 柯里化一部分参数。

**示例**：

```python
from functools import reduce
import operator

nums = [1, 2, 3]
total = reduce(operator.add, nums, 0)
squares = list(map(lambda x: x * x, nums))
```

**误区 / 考点**：为函数式而函数式导致难读；在 Python 里强行避免一切副作用不现实。

---

## 版本控制 Git

### 三区与常用命令

**定义**：工作区（磁盘文件）→ 暂存区（index）→ 本地仓库（commits）；远程是另一副本。

**要点**：
- `git status` / `diff` / `add` / `commit` / `log --oneline`。
- `checkout`/`switch` 切分支；`restore` 撤销工作区/暂存（新命令更直观）。
- `clone` / `pull` / `push`；冲突时手动合并再 `add` + `commit`。

**示例**：

```bash
git checkout -b feature/login
# ... edit ...
git add -p
git commit -m "feat: login form"
git push -u origin feature/login
```

**误区 / 考点**：`git add .` 误加秘密；在错误分支开发；强推 `push -f` 破坏协作；忽略 `.gitignore`。

---

### 分支工作流（简）

**定义**：用分支隔离功能与发布线，合并回主干保持历史可维护。

**要点**：
- **GitHub Flow**：`main` 可发布，功能分支 PR 合并。
- **Git Flow**：`develop` / `release` / `hotfix` 更重，适合发版频繁团队。
- `rebase` 线性历史 vs `merge` 保留分叉；协作分支上已推送历史慎用 `rebase`。

**误区 / 考点**：长期分支与主干差异过大；rebase 公共分支；提交信息无意义。

---

## 软件开发实践

### 调试

**定义**：定位程序行为与预期偏差的过程。

**要点**：
- 读栈追踪与日志；二分法缩小范围；最小复现。
- Python：`pdb.set_trace()`、`breakpoint()`、IDE 断点、`-m trace`。

**示例**：

```python
def buggy(x):
    breakpoint()
    return 1 / x

buggy(0)  # 进入 pdb 检查 x
```

**误区 / 考点**：只 print 大海捞针；修复后不补测试；忽略异常被吞。

---

### 测试

**定义**：用自动化用例验证行为，回归时快速发现破坏。

**要点**：
- 单元测试测小单元；集成测模块协作；`pytest` 在 Python 生态常用。
- Arrange-Act-Assert；Mock 外部 IO；覆盖率是参考非目标。

**示例**：

```python
# test_math.py
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
```

**误区 / 考点**：测实现细节导致脆弱测试；无断言的“烟测”；与真实环境完全脱节。

---

### 重构与代码规范

**定义**：在不改变外部行为前提下改善内部结构；规范降低阅读成本。

**要点**：
- 小步重构 + 测试保护；常见手法：提取函数、改名、消除重复。
- PEP 8：命名、行宽、import 顺序；`ruff`/`black` 自动化。
- 圈复杂度过高应拆分。

**误区 / 考点**：无测试大改；过度抽象；把风格争论当架构。

---

## 数据库基础

### SQL 核心

**定义**：声明式语言描述「要什么数据」，由引擎决定执行计划。

**要点**：
- CRUD：`SELECT`/`INSERT`/`UPDATE`/`DELETE`；`WHERE` 过滤；`JOIN` 连接表。
- 聚合：`GROUP BY` + `HAVING`（过滤组）；`ORDER BY`/`LIMIT`。
- 防止 SQL 注入：参数化查询，勿拼接字符串。

**示例**（概念，具体方言略异）：

```sql
SELECT u.name, COUNT(o.id) AS cnt
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name
HAVING COUNT(o.id) >= 1
ORDER BY cnt DESC
LIMIT 10;
```

**误区 / 考点**：`WHERE` 与 `HAVING` 混用；`JOIN` 忘了条件变笛卡尔积；SELECT * 在生产滥用。

---

### 索引

**定义**：额外数据结构（常见 B+ 树）以空间换时间，加速查找与排序。

**要点**：
- 主键/唯一索引；联合索引最左前缀；过多索引拖慢写入。
- 覆盖索引：索引列已含查询所需字段则少回表。

**误区 / 考点**：对低基数字段盲目加索引；忽略索引列顺序；大 OFFSET 深分页性能。

---

### 事务与 ACID

**定义**：事务是一组操作的原子单元；ACID：原子性、一致性、隔离性、持久性。

**要点**：
- 原子性：全成或全败；隔离级别影响脏读/不可重复读/幻读。
- `BEGIN` / `COMMIT` / `ROLLBACK`；应用层幂等与重试策略。

**误区 / 考点**：长事务锁表；把「一致性」全推给数据库忽略业务约束；忽略默认隔离级别差异。

---

## 网络基础

### HTTP / HTTPS

**定义**：HTTP 是无状态应用层协议；HTTPS = HTTP + TLS，提供加密与身份校验。

**要点**：
- 方法：GET（安全/幂等语义）、POST、PUT、PATCH、DELETE；状态码 2xx/4xx/5xx。
- 头：`Content-Type`、`Authorization`、`Cookie`；HTTPS 防窃听与中间人（证书链）。

**误区 / 考点**：GET 带敏感信息；混用 HTTP/HTTPS 资源；忽略缓存头语义。

---

### TCP / IP（极简）

**定义**：IP 负责主机到主机寻址与分包；TCP 提供可靠、有序、面向连接的字节流。

**要点**：
- 三次握手建连，四次挥手断开；滑动窗口、重传、拥塞控制（了解即可）。
- UDP 无连接低延迟但不保证可靠；DNS 常用 UDP。

**误区 / 考点**：把「HTTP 长连接」与 TCP 概念混淆；认为 UDP「永远更快」不顾丢包。

---

### RESTful API

**定义**：用 HTTP 方法与资源 URL 表达 CRUD，常用 JSON；状态无服务器会话（理想上）。

**要点**：
- 资源名词复数 `/users/{id}`；正确使用动词语义。
- 版本化 `/v1/` 或头；分页 `?page=&size=`；统一错误格式。

**示例**（Flask 极简）：

```python
from flask import Flask, jsonify, request
app = Flask(__name__)
users = {1: {"name": "Ada"}}

@app.get("/users/<int:user_id>")
def get_user(user_id):
    u = users.get(user_id)
    return jsonify(u) if u else ("", 404)
```

**误区 / 考点**：全用 POST；在 body 里藏动词；无幂等设计的 DELETE/PUT。

---

## 前端框架（React）

> 设计思想、核心概念与 Hooks 示例：[[react-concepts-guide]]（`areas/programming/tools/`）。

---

## 扩展思考题

1. **体系**：若把本文某一节（如「动态规划」或「事务」）扩成独立深度笔记，你会拆成哪几个子主题、与 `areas/programming/` 下现有文件夹如何对应？

2. **实践**：选一个你最近写过的 bug，用「调试 → 最小复现 → 测试防止回归」写一条案例笔记，你会记录哪些命令与结论？

3. **迁移**：当单库笔记增多时，你会如何用 `moc/` 做主题地图、再用 AI 按 [[REPO_LAYOUT]] 迁到 `areas/programming/` 子目录——试写一条提示词模板。
