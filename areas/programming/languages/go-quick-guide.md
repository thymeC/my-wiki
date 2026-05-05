# Go 快速学习手册（设计思想 · 核心概念 · 数据结构）

> 每节附 **最小代码**，对齐「显式错误 + 组合 + 并发」心智模型。  
> 姊妹篇：Web 见 [[go-frameworks-index]] 与各框架专篇；通用主题见 [[programming-knowledge-core]]。仓库规则 [[REPO_LAYOUT]]。

## 目录

- [一、设计思想](#一设计思想)
- [二、程序结构与模块](#二程序结构与模块)
- [三、类型系统与接口](#三类型系统与接口)
- [四、函数与方法](#四函数与方法)
- [五、内建数据结构](#五内建数据结构)
- [六、错误与资源](#六错误与资源)
- [七、并发：goroutine 与 channel](#七并发goroutine-与-channel)
- [八、延伸阅读](#八延伸阅读)

---

## 一、设计思想

| 观念 | 含义 |
|------|------|
| **少魔法** | 控制流直白；继承层次浅。 |
| **组合** | 小接口 + struct **嵌入** 复用字段与方法。 |
| **错误是值** | `(T, error)` 返回；`if err != nil` 是常态。 |
| **并发** | goroutine + channel + `select`。 |
| **静态编译** | 单二进制、交叉编译友好。 |

**Hello 与导出规则**（首字母大写 = 包外可见）：

```go
package main

import "fmt"

type appConfig struct { Port int } // 小写：包内私有
type Server struct { Name string } // 大写：可导出

func main() {
	fmt.Println("hello")
}
```

---

## 二、程序结构与模块

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println(strings.ToUpper("go"))
}
```

- `go mod init example.com/m` → `go.mod` 记录 module path 与依赖。
- `go get example.com/pkg@v1.2.3` / `go mod tidy`。

---

## 三、类型系统与接口

**隐式实现接口**：

```go
type Greeter interface {
	Greet() string
}

type Bot struct{}

func (Bot) Greet() string { return "hi" }

func SayHello(g Greeter) { println(g.Greet()) }

// Bot 未写 implements，但方法集匹配
```

**泛型（1.18+）**：

```go
func Keys[K comparable, V any](m map[K]V) []K {
	out := make([]K, 0, len(m))
	for k := range m {
		out = append(out, k)
	}
	return out
}
```

---

## 四、函数与方法

**多返回值与 defer**：

```go
import "fmt"

func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, fmt.Errorf("divide by zero")
	}
	return a / b, nil
}

func demo() {
	fmt.Println("start")
	defer fmt.Println("defer 1")
	defer fmt.Println("defer 2") // 先执行 defer 2 再 defer 1（LIFO）
	fmt.Println("body")
}
```

**值接收者 vs 指针接收者**（要改字段或大结构体时用指针）：

```go
type Counter struct{ n int }

func (c *Counter) Inc() { c.n++ }
func (c Counter) Value() int { return c.n }
```

---

## 五、内建数据结构

### 5.1 slice

```go
s := []int{1, 2, 3}
s = append(s, 4)

// 共享底层：别名修改互相影响
a := make([]int, 3, 8)
b := a[1:3]
b[0] = 99
// a[1] 也是 99
```

### 5.2 map

```go
m := map[string]int{"a": 1}
m["b"] = 2
if v, ok := m["c"]; ok {
	_ = v
}
delete(m, "a")
```

### 5.3 string 与 rune

```go
s := "你好"
for _, r := range s { // 按 Unicode 码点
	_ = r
}
```

### 5.4 struct 嵌入

```go
type Base struct{ ID int }
type User struct {
	Base
	Name string
}

var u User
u.ID = 1    // 字段提升
u.Name = "a"
```

---

## 六、错误与资源

**包装与判断**：

```go
var ErrNotFound = errors.New("not found")

func load(id string) error {
	if id == "" {
		return fmt.Errorf("load: %w", ErrNotFound)
	}
	return nil
}

func handle() {
	err := load("")
	if errors.Is(err, ErrNotFound) {
		// ...
	}
}
```

---

## 七、并发：goroutine 与 channel

```go
ch := make(chan int)
go func() { ch <- 42 }()
x := <-ch // 阻塞直到收到 42
_ = x
```

**带缓冲与非阻塞尝试**：

```go
ch := make(chan int, 1)
ch <- 1

select {
case v := <-ch:
	_ = v
default:
	// channel 空且无人发送时走这里
}
```

**`select` 多路等待**：

```go
a, b := make(chan string), make(chan string)
go func() { a <- "from a" }()
go func() { b <- "from b" }()

select {
case msg := <-a:
	_ = msg
case msg := <-b:
	_ = msg
}
```

**`WaitGroup` + Mutex**：

```go
var mu sync.Mutex
var wg sync.WaitGroup
sum := 0
for i := 0; i < 10; i++ {
	wg.Add(1)
	go func(i int) {
		defer wg.Done()
		mu.Lock()
		sum += i
		mu.Unlock()
	}(i)
}
wg.Wait()
```

---

## 八、延伸阅读

- [[go-frameworks-index]] — 标准库与 Gin/Echo/chi 选型总览。
- [[go-net-http-guide]] · [[go-gin-guide]] · [[go-echo-guide]] · [[go-chi-guide]]
- [[programming-knowledge-core]] — HTTP、Git、测试思维。
