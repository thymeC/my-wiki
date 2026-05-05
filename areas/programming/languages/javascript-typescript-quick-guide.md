# JavaScript / TypeScript 快速学习手册（设计思想 · 核心概念 · 数据结构）

> 每节附 **可在浏览器或 Node 运行的最小示例**，区分 **JS 运行时语义** 与 **TS 类型层**。  
> 姊妹篇：[[react-concepts-guide]]、[[vue-guide]]；通用主题见 [[programming-knowledge-core]]。仓库规则 [[REPO_LAYOUT]]。

## 目录

- [一、设计思想](#一设计思想)
- [二、事件循环与任务](#二事件循环与任务)
- [三、JavaScript 核心](#三javascript-核心)
- [四、TypeScript 层](#四typescript-层)
- [五、数据结构](#五数据结构)
- [六、异步：Promise 与 async/await](#六异步promise-与-asyncawait)
- [七、模块：ESM 与 CommonJS](#七模块esm-与-commonjs)
- [八、延伸阅读](#八延伸阅读)

---

## 一、设计思想

| 层面 | 观念 |
|------|------|
| **JS** | 原型、一等函数、动态类型；**单线程** 事件循环。 |
| **TS** | **结构类型**；在大型前端/Node 中换可维护性与重构安全。 |
| **工程** | 锁依赖版本 + ESLint/Prettier + `strict`。 |

---

## 二、事件循环与任务

**宏任务 vs 微任务**（微任务先清空）：

```javascript
console.log("1");
setTimeout(() => console.log("4 macro"), 0);
queueMicrotask(() => console.log("3 micro"));
Promise.resolve().then(() => console.log("2 micro"));
console.log("1 sync end");
// 输出顺序: 1 → 1 sync end → 2 micro → 3 micro → 4 macro
```

---

## 三、JavaScript 核心

### 3.1 比较与类型

```javascript
Object.is(NaN, NaN);        // true
Object.is(+0, -0);         // false
[] === [];                 // false（引用不同）
```

### 3.2 闭包

```javascript
function makeCounter() {
  let n = 0;
  return {
    inc: () => ++n,
    get: () => n,
  };
}
const c = makeCounter();
c.inc();
console.log(c.get()); // 1
```

### 3.3 `this` 与箭头函数

```javascript
const o = {
  name: "a",
  regular() {
    return this.name;
  },
  arrow: () => {
    // 词法 this：指向定义时的外层（此处可能是 global/globalThis）
    return this?.name;
  },
};
console.log(o.regular()); // "a"
```

显式绑定：

```javascript
function greet() {
  return this.user;
}
console.log(greet.call({ user: "Ada" })); // Ada
```

### 3.4 类（原型语法糖）

```javascript
class Base {
  constructor(x) {
    this.x = x;
  }
}
class Sub extends Base {
  constructor(x, y) {
    super(x);
    this.y = y;
  }
}
```

---

## 四、TypeScript 层

**结构子类型与窄化**：

```typescript
type Point = { x: number; y: number };

function len2(p: Point) {
  return p.x * p.x + p.y * p.y;
}

// 只要「至少有 x,y」即可传入
len2({ x: 1, y: 2, label: "a" });

function parseId(x: unknown): string {
  if (typeof x === "object" && x !== null && "id" in x) {
    const v = (x as { id: unknown }).id;
    if (typeof v === "string") return v;
  }
  throw new Error("bad id");
}
```

**泛型**：

```typescript
function first<T>(xs: readonly T[]): T | undefined {
  return xs[0];
}
```

---

## 五、数据结构

```typescript
const m = new Map<string, number>([
  ["a", 1],
  ["b", 2],
]);
m.set("a", m.get("a")! + 1);

const s = new Set([1, 1, 2]);
console.log(s.size); // 2

// Object 作字典：键只能是 string/symbol；无内建键序保证
const o: Record<string, number> = { x: 1 };
```

**LRU 思路（Map 保插入序）**：

```typescript
function touch<K, V>(m: Map<K, V>, k: K, v: V) {
  m.delete(k);
  m.set(k, v);
}
```

---

## 六、异步：Promise 与 async/await

```typescript
async function load(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

// 并行
const [a, b] = await Promise.all([
  load("/a").catch(() => ""),
  load("/b").catch(() => ""),
]);
```

**`finally`**：

```typescript
let busy = false;
async function withFlag() {
  busy = true;
  try {
    await Promise.resolve();
  } finally {
    busy = false;
  }
}
```

---

## 七、模块：ESM 与 CommonJS

**ESM（推荐）**：

```typescript
// math.ts
export const pi = Math.PI;
export default function add(a: number, b: number) {
  return a + b;
}
```

```typescript
// main.ts
import add, { pi } from "./math.js";
```

**CommonJS（Node 老代码）**：

```javascript
// cjs.js
module.exports = { x: 1 };
// require('./cjs.js')
```

互操作：在 TS 中配置 `esModuleInterop`；混合项目注意 **默认导出** 映射。

---

## 八、延伸阅读

- [[react-concepts-guide]] — 声明式 UI 与 Hooks。
- [[vue-guide]] — 模板 + 响应式。
- [[programming-knowledge-core]] — HTTP、Git、安全基础。
