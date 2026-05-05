# 数据结构与算法入门（多代码示例）

> 面向「能看懂、能改、能跑」的速学稿，与 [[programming-knowledge-core]] 中算法小节互补；本文件偏 **示例与直觉**。仓库规则见 [[REPO_LAYOUT]]。

## 目录

- [如何读复杂度](#如何读复杂度)
- [数组与列表](#数组与列表)
- [链表](#链表)
- [栈与队列](#栈与队列)
- [哈希表](#哈希表)
- [二叉树与二叉搜索树](#二叉树与二叉搜索树)
- [堆（优先队列）](#堆优先队列)
- [排序（三种代表性）](#排序三种代表性)
- [二分查找](#二分查找)
- [图的 DFS 与 BFS](#图的-dfs-与-bfs)
- [动态规划入门](#动态规划入门)

---

## 如何读复杂度

**直觉**：\(O(1)\) 与数据量无关；\(O(\log n)\) 每步砍掉一半；\(O(n)\) 扫一遍；\(O(n \log n)\) 常见优秀排序；\(O(n^2)\) 双重循环要小心数据规模。

下面代码里会随手标注「大概在干什么量级」，不必死记公式，先建立感觉。

---

## 数组与列表

Python 的 `list` 是**动态数组**：尾部追加均摊很快，**中间插入/删除**要搬动后面元素，变慢。

```python
# 访问与尾部操作：很快
nums = [10, 20, 30]
print(nums[1])      # 20  — O(1) 按下标访问
nums.append(40)     # 尾部加 — 均摊 O(1)
last = nums.pop()   # 尾部弹 — O(1)

# 头部或中间插入：要挪动后面的元素 — O(n)
nums.insert(0, 5)     # 在索引 0 插入 5，后面整体后移
```

**列表推导**：一行生成新列表，可读且往往不慢。

```python
# 0~9 里偶数的平方
squares = [x * x for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]
```

**误区**：需要频繁从**头部**弹出时，别用 `list.pop(0)`（很慢），改用下一节的 `deque`。

---

## 链表

链表由**节点**串成：每个节点存「值 + 下一个是谁」。插入删除**在已知节点附近**常是 \(O(1)\)，但找第 k 个要从头走，是 \(O(n)\)。

### 单链表节点与遍历

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def build_from_list(values):
    """把 Python 列表转成链表，方便测试"""
    dummy = ListNode(0)
    cur = dummy
    for v in values:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next  # 真头结点

def to_py_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

# 示例：1 -> 2 -> 3
head = build_from_list([1, 2, 3])
print(to_py_list(head))  # [1, 2, 3]
```

### 经典：反转链表

思路：逐个把箭头调转，`prev` 跟在后面接。

```python
def reverse_list(head: ListNode) -> ListNode:
    prev = None
    cur = head
    while cur:
        nxt = cur.next   # 先记住后面是谁
        cur.next = prev  # 当前指向反过来
        prev = cur       # prev 前进
        cur = nxt
    return prev  # 新的头

head = build_from_list([1, 2, 3])
new_head = reverse_list(head)
print(to_py_list(new_head))  # [3, 2, 1]
```

### 经典：快慢指针判断环

快指针每次走 2 步，慢指针走 1 步；若有环，必相遇。

```python
def has_cycle(head: ListNode) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
```

---

## 栈与队列

- **栈**：后进先出（LIFO），像叠盘子。  
- **队列**：先进先出（FIFO），像排队。

```python
from collections import deque

# 栈：只用 append + pop（同一端）
stack = []
stack.append(1)
stack.append(2)
print(stack.pop())  # 2

# 队列：deque 两端 O(1)，不要用 list.pop(0)
q = deque()
q.append(1)        # 右端入队
q.append(2)
print(q.popleft()) # 1  左端出队 — O(1)
```

### 例题：括号是否匹配

```python
def is_valid(s: str) -> bool:
    pair = {")": "(", "]": "[", "}": "{"}
    st = []
    for c in s:
        if c in "([{":
            st.append(c)
        else:
            if not st or st.pop() != pair[c]:
                return False
    return len(st) == 0

print(is_valid("()[]{}" ))  # True
print(is_valid("(]"))       # False
```

---

## 哈希表

**键 → 值** 的映射，平均查找/插入/删除接近 \(O(1)\)。Python 里就是 `dict` / `set`。

```python
# 统计字符出现次数
def count_chars(s: str) -> dict:
    cnt = {}
    for ch in s:
        cnt[ch] = cnt.get(ch, 0) + 1
    return cnt

print(count_chars("hello"))  # {'h':1,'e':1,'l':2,'o':1}

# 判断某值是否出现过 — 用 set 更省内存
seen = set()
for x in [1, 2, 2, 3]:
    if x in seen:
        print("重复:", x)
    seen.add(x)
```

**两数之和**（返回下标）：用字典存「值 → 下标」，一遍扫描。

```python
def two_sum(nums, target):
    need = {}  # 需要的补数 -> 当前下标（存之前扫过的）
    for i, v in enumerate(nums):
        if v in need:
            return [need[v], i]
        need[target - v] = i
    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
```

---

## 二叉树与二叉搜索树

### 二叉树遍历（递归，最好理解）

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def preorder(root):  # 根-左-右
    if not root:
        return
    print(root.val, end=" ")
    preorder(root.left)
    preorder(root.right)

def inorder(root):   # 左-根-右（BST 上会得到有序序列）
    if not root:
        return
    inorder(root.left)
    print(root.val, end=" ")
    inorder(root.right)
```

### 二叉搜索树（BST）里查找

左子树全更小，右子树全更大。

```python
def bst_search(root: TreeNode, val: int) -> bool:
    cur = root
    while cur:
        if val == cur.val:
            return True
        elif val < cur.val:
            cur = cur.left
        else:
            cur = cur.right
    return False

def bst_insert(root: TreeNode, val: int) -> TreeNode:
    if root is None:
        return TreeNode(val)
    if val < root.val:
        root.left = bst_insert(root.left, val)
    else:
        root.right = bst_insert(root.right, val)
    return root
```

---

## 堆（优先队列）

**最小堆**：堆顶总是最小元素；插入/弹出堆顶大约 \(O(\log n)\)。Python 用 `heapq`，底层是**小根堆**。

```python
import heapq

h = []
heapq.heappush(h, 3)
heapq.heappush(h, 1)
heapq.heappush(h, 2)
print(heapq.heappop(h))  # 1  总是先出最小

# 找列表里最大的 k 个数：维护大小为 k 的小根堆
def top_k(nums, k):
    return heapq.nlargest(k, nums)

print(top_k([3, 1, 4, 1, 5, 9, 2], 3))  # [9, 5, 4]
```

**大根堆技巧**：存 `-x`，弹出再取负。

---

## 排序（三种代表性）

### 冒泡（易懂，教学用；大数据别用）

相邻比较，一轮把最大「冒」到末尾。

```python
def bubble_sort(arr):
    a = arr[:]
    n = len(a)
    for i in range(n):
        swapped = False
        for j in range(0, n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a

print(bubble_sort([3, 1, 4, 1, 5]))  # [1, 1, 3, 4, 5]
```

### 归并排序（稳定，最坏 \(O(n \log n)\)）

分两半，排好再**合并两个有序数组**。

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(a, b):
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i])
            i += 1
        else:
            out.append(b[j])
            j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out

print(merge_sort([3, 1, 4, 1, 5]))  # [1, 1, 3, 4, 5]
```

### 快速排序（平均快，常考）

选基准 `pivot`，小的放左，大的放右，递归。

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    mid = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + mid + quick_sort(right)

print(quick_sort([3, 1, 4, 1, 5]))  # [1, 1, 3, 4, 5]
```

**实务**：生产环境直接用 `sorted(arr)` 即可（Timsort，高效稳定）。

---

## 二分查找

**前提**：序列**有序**。每次看中间，砍掉一半，\(O(\log n)\)。

```python
def bisect_left(arr, x):
    """第一个 >= x 的下标；不存在则返回 len(arr)"""
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] < x:
            lo = mid + 1
        else:
            hi = mid
    return lo

a = [1, 3, 3, 5, 7]
print(bisect_left(a, 3))  # 1
print(bisect_left(a, 4))  # 3
```

也可用标准库：

```python
import bisect
a = [1, 3, 3, 5, 7]
print(bisect.bisect_left(a, 3))   # 1
print(bisect.bisect_right(a, 3))  # 3  第一个 > 3
```

---

## 图的 DFS 与 BFS

用**邻接表**存图：`graph[u] = [v1, v2, ...]` 表示 u 指向的邻居。

```python
from collections import deque

def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start, end=" ")  # 访问顺序示例
    for nb in graph.get(start, []):
        if nb not in visited:
            dfs(graph, nb, visited)

def bfs(graph, start):
    visited = {start}
    q = deque([start])
    while q:
        u = q.popleft()
        print(u, end=" ")
        for nb in graph.get(u, []):
            if nb not in visited:
                visited.add(nb)
                q.append(nb)

# 0 — 1 — 2
#     |
#     3
g = {0: [1], 1: [0, 2, 3], 2: [1], 3: [1]}
print("DFS:", end=" "); dfs(g, 0); print()
print("BFS:", end=" "); bfs(g, 0); print()
```

**网格上的岛屿**：`1` 是陆地，`0` 是水；四连通 DFS/BFS 数连通块。

```python
def num_islands(grid):
    """grid 中 '1' 为陆地、'0' 为水；四连通数岛屿个数"""
    if not grid:
        return 0
    n, m = len(grid), len(grid[0])
    seen = set()

    def dfs(i, j):
        if not (0 <= i < n and 0 <= j < m):
            return
        if grid[i][j] != "1" or (i, j) in seen:
            return
        seen.add((i, j))
        for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            dfs(i + di, j + dj)

    cnt = 0
    for i in range(n):
        for j in range(m):
            if grid[i][j] == "1" and (i, j) not in seen:
                dfs(i, j)
                cnt += 1
    return cnt
```

*注：上面网格 DFS 为极简演示，生产/刷题时常把 `grid[i][j]` 改为 `"0"` 表示已访问，省 `seen` 集合。*

---

## 动态规划入门

**想法**：大问题拆成重叠子问题，**记住子问题答案**（表或递归缓存），避免重复算。

### 斐波那契（对比三种写法）

```python
# 1) 朴素递归 — 慢，重复计算爆炸
def fib_naive(n):
    if n < 2:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# 2) 记忆化 — 每个 n 只算一次
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n: int) -> int:
    if n < 2:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)

# 3) 自底向上填表 — 迭代，O(n) 时间 O(1) 空间可再压
def fib_dp(n: int) -> int:
    if n < 2:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print(fib_dp(10))  # 55
```

### 爬楼梯：每次 1 或 2 步，有多少种上到 n

到第 n 步只能从 n-1 或 n-2 来 → `ways[n] = ways[n-1] + ways[n-2]`。

```python
def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    a, b = 1, 2  # ways(1), ways(2)
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

print(climb_stairs(5))  # 8
```

---

## 小结

| 主题 | 记住一句话 |
|------|------------|
| 数组/列表 | 中间插删慢；头出队用 `deque` |
| 链表 | 反转、环、合并常考；注意 `next` 断链顺序 |
| 栈/队列 | 括号匹配、单调栈（进阶） |
| 哈希 | 计数、去重、\(O(n)\) 两数之和 |
| BST | 中序有序；查找像二分 |
| 堆 | TopK、合并 K 条有序链表 |
| 排序 | 理解归并/快排；实用用 `sorted` |
| 二分 | 有序 + 折半缩小范围 |
| 图 | DFS 深、BFS 层；网格四连通 |
| DP | 定义状态 → 转移 → 初值 → 顺序算 |

---

*下一步：可把「单调栈」「Trie」「并查集」等按同样风格补成附录，或链到 `moc` 里专题地图。*
