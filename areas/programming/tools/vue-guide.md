# Vue 3 详解（设计思想 · 组合式 API · 生态 · 与 React 对比）

> **渐进式框架**：从局部挂载到全站 SPA；**组合式 API** + **Proxy 响应式** + **SFC** 是当前默认主路径。  
> **Vue 官方称框架**；栈与 Nuxt：[[vue-framework-guide]] · [[frontend-stack-index]]。对照 React（**库**）：[[react-concepts-guide]] · [[react-ecosystem-guide]]。语言：[[javascript-typescript-quick-guide]]。仓库规则 [[REPO_LAYOUT]]。

## 目录

- [一、解决什么问题](#一解决什么问题)
- [二、设计思想](#二设计思想)
- [三、单文件组件（SFC）](#三单文件组件sfc)
- [四、响应式：`ref` 与 `reactive`](#四响应式ref-与-reactive)
- [五、组合式 API 详解](#五组合式-api-详解)
- [六、内置指令与组件通信](#六内置指令与组件通信)
- [七、Vue Router](#七vue-router)
- [八、Pinia 状态管理](#八pinia-状态管理)
- [九、可组合函数 Composable](#九可组合函数-composable)
- [十、构建与 TS](#十构建与-ts)
- [十一、与 React 对比与选型](#十一与-react-对比与选型)
- [十二、延伸阅读](#十二延伸阅读)

---

## 一、解决什么问题

| 适合 | 不太适合 |
|------|----------|
| 希望 **模板与脚本同文件**、产品/设计协作读 HTML 更顺 | 团队已 **全链路 JSX** 且强依赖 React 生态独占库 |
| **官方路由 + 官方状态** 一体，减少选型争论 | 强需求 **React Server Components** 元框架路线（Next 生态） |
| 渐进增强：老页面里 **只挂一个 Vue 组件** | 极端追求 **编译期最小运行时**（可看 Svelte 等另论） |

---

## 二、设计思想

| 观念 | 含义 |
|------|------|
| **渐进式** | 可只引入一个组件；也可 Router + Pinia + Vite 全栈。 |
| **响应式** | 修改 **响应式数据** → 依赖它的视图自动更新；Vue 3 用 **Proxy**。 |
| **组合优于配置** | 用 **composable** 抽逻辑，而非深继承。 |
| **单文件组件** | `.vue` = `<template>` + `<script>` + `<style>`，边界清晰。 |

---

## 三、单文件组件（SFC）

```vue
<script setup lang="ts">
import { ref, computed } from "vue";

const count = ref(0);
const doubled = computed(() => count.value * 2);
function inc() {
  count.value++;
}
</script>

<template>
  <button type="button" @click="inc">
    {{ count }} / {{ doubled }}
  </button>
</template>

<style scoped>
button {
  font-size: 1rem;
}
</style>
```

- **`script setup`**：顶层绑定自动暴露给模板；少写 `export default`。
- **`scoped`**：样式只作用于当前组件根（通过属性选择器实现）。

---

## 四、响应式：`ref` 与 `reactive`

**`ref`**：适合标量或需要 **整体替换** 的对象引用。

```ts
import { ref } from "vue";
const n = ref(0);
n.value++; // script 中要 .value
```

**`reactive`**：适合 **嵌套对象**；注意 **解构会丢失响应式**。

```ts
import { reactive, toRefs } from "vue";
const state = reactive({ x: 1, y: 2 });
const { x, y } = toRefs(state); // 保持 ref
```

---

## 五、组合式 API 详解

```vue
<script setup lang="ts">
import { computed, watch, watchEffect, onMounted } from "vue";

const q = ref("");
const len = computed(() => q.value.length);

watch(q, (v, prev) => {
  console.log("q changed", v, prev);
});

watchEffect(() => {
  document.title = `len=${len.value}`;
});

onMounted(() => {
  console.log("mounted");
});
</script>
```

- **`watch`**：侦听特定源；**`watchEffect`**：自动收集依赖，立即跑一遍。

---

## 六、内置指令与组件通信

**父子**：`props` + `emit`（类型可用 `defineProps` / `defineEmits`）。

```vue
<!-- Child.vue -->
<script setup lang="ts">
const props = defineProps<{ title: string }>();
const emit = defineEmits<{ (e: "close"): void }>();
</script>

<template>
  <header>{{ props.title }}</header>
  <button @click="emit('close')">×</button>
</template>
```

**列表与 `key`**：

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.text }}</li>
  </ul>
</template>
```

**`v-model`**（Vue 3 多 `v-model` 与自定义；子组件 **`defineModel` 需 Vue 3.4+**）：

```vue
<!-- 父 -->
<Child v-model:title="title" />

<!-- 子 -->
<script setup lang="ts">
const title = defineModel<string>("title");
</script>
<template><input v-model="title" /></template>
```

更早版本用 `props` + `emit('update:title', value)`；或单值 `modelValue` / `update:modelValue`。

---

## 七、Vue Router

```ts
import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    {
      path: "/about",
      component: () => import("./views/About.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 鉴权示例：需要登录则重定向
  next();
});

export default router;
```

---

## 八、Pinia 状态管理

```ts
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const name = ref("guest");
  function login(n: string) {
    name.value = n;
  }
  return { name, login };
});
```

```vue
<script setup lang="ts">
import { useUserStore } from "@/stores/user";
const user = useUserStore();
</script>
<template>
  <span>{{ user.name }}</span>
</template>
```

**与 Vuex**：新项目优先 **Pinia**（更贴合组合式、TS 友好）。

---

## 九、可组合函数 Composable

```ts
import { onMounted, onUnmounted, ref } from "vue";

export function useWindowWidth() {
  const width = ref(0);
  function update() {
    width.value = window.innerWidth;
  }
  onMounted(() => {
    update();
    window.addEventListener("resize", update);
  });
  onUnmounted(() => window.removeEventListener("resize", update));
  return { width };
}
```

**与 React Hooks**：Composable 是 **普通函数**，无「顶层调用顺序」的硬性规则，但 **仍应在 setup 顶层调用** 以保持生命周期正确。

---

## 十、构建与 TS

- **Vite**：官方默认；开发 ESM + 快速 HMR。
- **TS**：`lang="ts"` + `strict`；组件 props 类型用 `defineProps` 泛型。

---

## 十一、与 React 对比与选型

| 维度 | Vue 3 | React 18+ |
|------|-------|-----------|
| 官方定位 | **渐进式框架** | **UI 库**（应用框架见 Next/Remix） |
| UI 表达 | 模板 + SFC | JSX 为主 |
| 状态驱动 | Proxy 自动追踪 | `setState` / `useState` 显式触发 |
| 逻辑复用 | Composables | Hooks（规则更严） |
| 官方栈 | Router、Pinia 官方 | 路由/状态分散在生态 |
| 典型优势 | 上手曲线、单文件可读性 | 超大生态、元框架（Next 等） |

**一句话**：**偏「产品迭代快、团队希望官方栈收敛」** 常选 Vue；**偏「超大前端、TS+生态独占」** 常选 React。两者都能交付生产级应用，差异多在 **团队习惯与招聘**。

---

## 十二、延伸阅读

- [[react-concepts-guide]] — JSX、Hooks、与 Vue 对照。
- [[react-ecosystem-guide]] — React **作为库** 与 Next 等元框架。
- [[javascript-typescript-quick-guide]] — 事件循环、模块、TS 窄化。
