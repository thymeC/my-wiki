# React：设计思想与核心概念（含代码示例）

> 帮助从「为什么这样设计」理解 React；示例以 **函数组件 + Hooks**（当前主流）为主。  
> **React 是库，不是框架**；栈与元框架（Vite、Next、Router、Query）：[[react-ecosystem-guide]] · [[frontend-stack-index]]。HTTP/REST 见 [[programming-knowledge-core]]。仓库规则 [[REPO_LAYOUT]]。

## 目录

- [一、设计思想（先建立心智模型）](#一设计思想先建立心智模型)
- [二、组件与 JSX](#二组件与-jsx)
- [三、Props：从父到子的数据通道](#三props从父到子的数据通道)
- [四、State 与渲染：UI 是状态的函数](#四state-与渲染ui-是状态的函数)
- [五、副作用 useEffect](#五副作用-useeffect)
- [六、列表与 key](#六列表与-key)
- [七、状态提升与数据流](#七状态提升与数据流)
- [八、受控组件](#八受控组件)
- [九、Context：跨层传递](#九context跨层传递)
- [十、自定义 Hook](#十自定义-hook)
- [十一、虚拟 DOM 与协调（概念）](#十一虚拟-dom-与协调概念)
- [十二、适用场景与生态选型](#十二适用场景与生态选型)
- [十三、与 Vue / 其它方案对比](#十三与-vue--其它方案对比)
- [十四、小结与延伸阅读](#十四小结与延伸阅读)

---

## 一、设计思想（先建立心智模型）

| 思想 | 含义 | 对你写代码的启发 |
|------|------|------------------|
| **声明式 UI** | 描述「**界面长什么样**」，而不是一步步命令式改 DOM。 | 写 `return <div>...</div>`，由 React 算出与真实 DOM 的差异并更新。 |
| **组件化** | UI 拆成**独立、可复用**的块，每块封装结构与行为。 | 页面 = 小组件拼装；改一处不影响全局。 |
| **单向数据流** | 数据从父 **props** 向下；子组件通过 **回调** 把事件往上报。 | 可预测：数据从哪来、谁改，路径清晰。 |
| **状态驱动视图** | **状态变 → 重新计算 UI**（重新执行组件函数）。 | 少直接操作 DOM；改 `state` 即可。 |
| **组合优于继承** | 用 **children / 插槽式 props** 拼功能，而不是深继承树。 | `<Layout><Main /></Layout>` 比类继承更常见。 |

React 不负责路由、全局状态、请求库——这些由 **生态**（React Router、Redux/Zustand、TanStack Query 等）补齐，核心是 **渲染与组件模型**。因此和 **Next.js / Remix** 这类「带路由与约定的应用框架」要分开记：**React = 库，Next = 框架（基于 React）**。

---

## 二、组件与 JSX

**组件**本质是返回 **React 元素**（描述 UI 的对象树）的函数。  
**JSX** 是语法糖：` <div />` 会被编译成 `React.createElement('div', ...)`。

```jsx
// App.jsx — 函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

export default function App() {
  return (
    <div>
      <Welcome name="Ada" />
      <Welcome name="Lin" />
    </div>
  );
}
```

```jsx
// 入口（React 18）
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);
```

**要点**：组件名**大写**（区分原生标签 `div`）；一个组件应**单一职责**。

---

## 三、Props：从父到子的数据通道

**Props** 只读：子组件**不要**直接修改 props（应通过回调让父组件改 state）。

```jsx
function Avatar({ user, size = 40 }) {
  return (
    <img
      src={user.avatarUrl}
      alt={user.name}
      width={size}
      height={size}
      style={{ borderRadius: "50%" }}
    />
  );
}

export function Profile({ user }) {
  return (
    <section>
      <Avatar user={user} size={64} />
      <h2>{user.name}</h2>
    </section>
  );
}
```

**解构默认值** `size = 40` 很常见；复杂校验可用 TypeScript 或 `propTypes`。

---

## 四、State 与渲染：UI 是状态的函数

**State** 是会触发**重新渲染**的数据，必须用 **`useState`**（或其它提供 state 的 Hook）声明；**不要**用普通变量指望界面更新。

```jsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount((c) => c + 1)}>函数式更新</button>
    </div>
  );
}
```

**函数式更新** `setCount(c => c + 1)`：在依赖「旧 state」连续更新时更可靠（避免闭包读到旧值）。

**批量更新**：React 18 在事件处理里会把多次 `setState` **合并**，减少渲染次数。

---

## 五、副作用 useEffect

**副作用**：请求 API、订阅、定时器、手动改 DOM——与「纯渲染」无关、且通常要**清理**。

```jsx
import { useState, useEffect } from "react";

export function UserCard({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      if (!cancelled) setUser(data);
    }
    load();
    return () => {
      cancelled = true; // 防止卸载后 setState
    };
  }, [userId]); // userId 变则重新执行

  if (!user) return <p>加载中…</p>;
  return <div>{user.name}</div>;
}
```

**依赖数组** `[]`：只挂载跑一次；`[userId]`：`userId` 变再跑；不写依赖易出 **stale closure**  bug。

**不要**在渲染函数里直接 `fetch` 无清理逻辑——应用 `useEffect`。

---

## 六、列表与 key

列表用 **`map`**；每项需要稳定 **`key`**（最好在列表内唯一且**不随重排随意变**），帮助协调算法识别节点。

```jsx
function TodoList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <input type="checkbox" checked={item.done} readOnly />
          {item.text}
        </li>
      ))}
    </ul>
  );
}
```

**误区**：用 **数组下标** 作 key（重排序/插入时状态会错位）；key 放在**循环的最外层**元素上。

---

## 七、状态提升与数据流

多个子组件共享同一数据时，把 state **提到最近公共父组件**，通过 props 下发、回调上报。

```jsx
import { useState } from "react";

function TemperatureInput({ scale, value, onChange }) {
  return (
    <label>
      {scale === "c" ? "摄氏" : "华氏"}
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function Calculator() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const onC = (v) => {
    setCelsius(v);
    setFahrenheit(v === "" ? "" : String((Number(v) * 9) / 5 + 32));
  };
  const onF = (v) => {
    setFahrenheit(v);
    setCelsius(v === "" ? "" : String(((Number(v) - 32) * 5) / 9));
  };

  return (
    <div>
      <TemperatureInput scale="c" value={celsius} onChange={onC} />
      <TemperatureInput scale="f" value={fahrenheit} onChange={onF} />
    </div>
  );
}
```

这就是 **单向数据流**：真相只有一个（父里的 state），子只负责展示与触发变更。

---

## 八、受控组件

表单元素的值由 **React state** 控制：`value` + `onChange`，单一数据源。

```jsx
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="邮箱"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">登录</button>
    </form>
  );
}
```

**非受控**：用 `ref` 读 DOM，适合简单场景或与第三方集成。

---

## 九、Context：跨层传递

避免 props **层层 drilling**，可把「主题、当前用户、语言」等放进 **Context**。

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      当前：{theme}
    </button>
  );
}
```

**注意**：Context **变化**会让消费该 Context 的组件**重渲染**；高频变更数据更适合专用状态库或状态机。

---

## 十、自定义 Hook

以 **`use` 开头**的函数，内部可调用其它 Hook，用于**复用有状态逻辑**（不是复用 UI）。

```jsx
import { useState, useEffect } from "react";

function useWindowWidth() {
  const [w, setW] = useState(() => window.innerWidth);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}

export function ResponsiveHint() {
  const width = useWindowWidth();
  return <p>窗口宽度：{width}px</p>;
}
```

---

## 十一、虚拟 DOM 与协调（概念）

- **虚拟 DOM**：用 JS 对象描述 UI 树，**先在内存里 diff**，再**批量**更新真实 DOM，减少低效的直接操作。  
- **协调（Reconciliation）**：同层比较、类型不同则整棵子树重建；**key** 帮助识别列表中「谁是谁」。  
- 不必手写 diff——理解即可：**正确 key + 合理组件边界** 有助于性能。

生产环境还可配合 **`memo`**、`useMemo`、`useCallback` 减少子树重算（属于优化手段，**先写对再量**）。

```jsx
import { memo } from "react";

const ExpensiveRow = memo(function ExpensiveRow({ title }) {
  console.log("render row", title);
  return <div>{title}</div>;
});
```

---

## 十二、适用场景与生态选型

**React 最擅长解决的，是「把复杂 UI 状态拆成可组合的声明式组件」**，而不是「开箱即得全家桶」。

| 场景 | 常见选型 |
|------|----------|
| 路由 | **React Router**、TanStack Router |
| 服务端状态 / 缓存 | **TanStack Query**、SWR、RTK Query |
| 客户端全局状态 | **Zustand**、Redux Toolkit、Jotai（按团队复杂度选） |
| 表单 | React Hook Form、Formik |
| 元框架（SSR/SSG） | **Next.js**、Remix、Astro（React 岛） |

**心智**：React 核心只管 **渲染与组件模型**；**数据从哪来、URL 怎么变** 由生态补齐，因此 **组合自由度高**，也意味着 **架构决策要自己做**。

---

## 十三、与 Vue / 其它方案对比

| 维度 | React | Vue 3 |
|------|-------|-------|
| 官方定位 | **UI 库**（library） | **渐进式框架**（framework） |
| 模板 | **JSX**（JS 里写标签） | **单文件模板** + 可选 JSX |
| 响应式 | 显式 `setState` / `useState` 触发更新 | **Proxy** 追踪依赖，改数据即驱动视图 |
| 逻辑复用 | **Hooks**（有调用顺序规则） | **Composables**（普通函数，灵活度高） |
| 官方全家桶 | 弱（路由/状态另选） | **Vue Router + Pinia** 官方维护 |
| 学习曲线 | JSX + Hooks 规则需适应 | 模板 + 组合式 API 对新手常更直观 |

**与 Svelte / Solid（简）**：编译期优化更重，运行时更小；生态与招聘面通常 **React/Vue 更大**。

**选型直觉**：强 TS 大型应用、与设计系统深度定制 → **React 库** 很常见；希望 **模板可读 + 官方栈一体** → **Vue 框架**。详见对照篇 [[vue-guide]]、栈选型 [[react-ecosystem-guide]]。

---

## 十四、小结与延伸阅读

| 概念 | 一句话 |
|------|--------|
| 组件 | 返回 UI 描述的函数（或类） |
| JSX | 声明式写 UI 的语法糖 |
| Props | 父→子，只读 |
| State | 驱动重渲染的可变数据，用 `useState` 等 |
| Effect | `useEffect` 处理副作用与清理 |
| 单向流 | 状态提升 + 回调上报 |
| Context | 跨多层的共享只读/半读数据 |
| Hook | 复用状态逻辑，遵守 Hooks 规则 |

**官方文档**： [react.dev](https://react.dev)（新版文档含图与沙箱）。  
**对照阅读**：[[vue-guide]]；栈与元框架：[[react-ecosystem-guide]] · [[frontend-stack-index]]。  
**下一步笔记**：React Router、TanStack Query、错误边界与 Suspense，可单独建 `moc_react` 或在 `areas/programming/tools/` 续写。
