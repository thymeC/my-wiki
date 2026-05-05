# 设计模式入门（Python / Java / C 对照）

> 经典模式来自 *GoF*（《设计模式》）与后续实践：在**反复出现的设计问题**上，给出可复用的**对象协作方案**。  
> 本文选 **6 个高频模式**，每种用三种语言各给**最小可运行思路**（C 无原生类，多用 **struct + 函数指针** 表达同一思想）。  
> 仓库规则见 [[REPO_LAYOUT]]；OOP 总览见 [[programming-knowledge-core]]。

## 目录

- [使用前必读](#使用前必读)
- [单例 Singleton](#单例-singleton)
- [简单工厂 Simple Factory](#简单工厂-simple-factory)
- [策略 Strategy](#策略-strategy)
- [观察者 Observer](#观察者-observer)
- [适配器 Adapter](#适配器-adapter)
- [装饰器 Decorator](#装饰器-decorator)
- [小结表](#小结表)

---

## 使用前必读

- **不要为了用模式而用模式**：先能写出清晰代码，再识别「重复结构」是否值得抽象。  
- **三语言角色**：Python/Java 适合表达**面向对象**写法；C 用**过程 + 数据驱动**模拟同一**意图**（接口在 C 里常是函数指针表）。  
- **命名**：下文 Java 示例为独立片段；C 示例为教学用极简 `.c` 风格，未拆头文件。

---

## 单例 Singleton

**意图**：全局**最多一个实例**，并提供统一访问点（配置、连接池、日志器等）。

**注意**：多线程下需**双重检查锁**或静态初始化（Java `enum` 单例）；Python 模块级变量也常「天然单例」。

### Python

```python
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# 用法
a = Singleton()
b = Singleton()
assert a is b
```

更 Pythonic 的场景：模块顶层 `config = {...}`，别处 `import config` 即共享。

### Java

```java
public class Singleton {
    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

### C（静态实例 + 全局访问函数）

```c
#include <stdlib.h>

typedef struct { int dummy; } AppConfig;

static AppConfig *g_cfg = NULL;

AppConfig *app_config_get(void) {
    if (!g_cfg)
        g_cfg = calloc(1, sizeof(AppConfig));
    return g_cfg;
}
```

---

## 简单工厂 Simple Factory

**意图**：把「创建哪种具体对象」**集中**在一处，调用方只依赖**抽象接口**（或统一返回类型），减少 `new` 散落。

### Python

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def draw(self): ...

class Circle(Shape):
    def draw(self): return "circle"

class Square(Shape):
    def draw(self): return "square"

def create_shape(kind: str) -> Shape:
    if kind == "circle":
        return Circle()
    if kind == "square":
        return Square()
    raise ValueError(kind)

print(create_shape("circle").draw())
```

### Java

```java
interface Shape { String draw(); }

class Circle implements Shape {
    public String draw() { return "circle"; }
}

class Square implements Shape {
    public String draw() { return "square"; }
}

class ShapeFactory {
    static Shape create(String kind) {
        switch (kind) {
            case "circle": return new Circle();
            case "square": return new Square();
            default: throw new IllegalArgumentException(kind);
        }
    }
}
```

### C（用枚举区分类型 + 统一「接口」函数指针）

```c
#include <stdio.h>
#include <stdlib.h>

typedef enum { SHAPE_CIRCLE, SHAPE_SQUARE } ShapeKind;

typedef struct {
    ShapeKind kind;
    const char *(*draw)(void *self);
} Shape;

static const char *circle_draw(void *self) { (void)self; return "circle"; }
static const char *square_draw(void *self) { (void)self; return "square"; }

Shape *shape_create(ShapeKind k) {
    Shape *s = malloc(sizeof(Shape));
    s->kind = k;
    s->draw = (k == SHAPE_CIRCLE) ? circle_draw : square_draw;
    return s;
}

/* int main() { Shape *s = shape_create(SHAPE_CIRCLE); puts(s->draw(s)); free(s); } */
```

---

## 策略 Strategy

**意图**：一族**可互换算法**封装起来，让调用方依赖**抽象策略接口**，运行期切换行为（替代大量 `if-else`）。

### Python

```python
from typing import Protocol

class PayStrategy(Protocol):
    def pay(self, amount: int) -> str: ...

class Alipay:
    def pay(self, amount: int) -> str:
        return f"alipay:{amount}"

class WechatPay:
    def pay(self, amount: int) -> str:
        return f"wechat:{amount}"

class Order:
    def __init__(self, strategy: PayStrategy):
        self.strategy = strategy

    def checkout(self, amount: int):
        return self.strategy.pay(amount)

print(Order(WechatPay()).checkout(100))
```

### Java

```java
interface PayStrategy {
    String pay(int amount);
}

class Alipay implements PayStrategy {
    public String pay(int amount) { return "alipay:" + amount; }
}

class Order {
    private final PayStrategy strategy;
    Order(PayStrategy s) { this.strategy = s; }
    String checkout(int amount) { return strategy.pay(amount); }
}
```

### C

```c
#include <stdio.h>

typedef struct PayStrategy PayStrategy;
struct PayStrategy {
    const char *(*pay)(const PayStrategy *self, int amount);
};

typedef struct {
    PayStrategy base;
} Alipay;

static const char *alipay_pay(const PayStrategy *self, int amount) {
    (void)self;
    static char buf[64];
    snprintf(buf, sizeof buf, "alipay:%d", amount);
    return buf;
}

static void alipay_init(Alipay *a) {
    a->base.pay = alipay_pay;
}
```

---

## 观察者 Observer

**意图**：一对多依赖：主题（Subject）状态变化时**通知**所有观察者，解耦「谁关心」与「怎么通知」。

### Python

```python
class Subject:
    def __init__(self):
        self._observers = []

    def attach(self, obs):
        self._observers.append(obs)

    def notify(self, data):
        for o in self._observers:
            o.update(data)

class EmailObserver:
    def update(self, data):
        print("email", data)

sub = Subject()
sub.attach(EmailObserver())
sub.notify("order paid")
```

### Java

```java
import java.util.*;

interface Observer { void update(String data); }

class Subject {
    private final List<Observer> observers = new ArrayList<>();
    void attach(Observer o) { observers.add(o); }
    void notifyObservers(String data) {
        for (Observer o : observers) o.update(data);
    }
}
```

### C（回调函数列表简化版）

```c
#include <stdio.h>

#define MAX_OBS 8
typedef void (*OnEvent)(const char *data);

typedef struct {
    OnEvent slots[MAX_OBS];
    int n;
} Subject;

void subject_attach(Subject *s, OnEvent cb) {
    if (s->n < MAX_OBS) s->slots[s->n++] = cb;
}

void subject_notify(Subject *s, const char *data) {
    for (int i = 0; i < s->n; i++) s->slots[i](data);
}

static void log_cb(const char *d) { printf("log: %s\n", d); }
```

---

## 适配器 Adapter

**意图**：让**不兼容的接口**能一起工作（包一层，把调用转成对方已有的 API）。典型：对接第三方库、老代码。

### Python

```python
# 已有类（不想改）
class OldPrinter:
    def old_print(self, s: str): return f"OLD:{s}"

# 目标接口
class ModernPrinter:
    def print_line(self, s: str) -> str: ...

class PrinterAdapter(ModernPrinter):
    def __init__(self, old: OldPrinter):
        self._old = old

    def print_line(self, s: str) -> str:
        return self._old.old_print(s)

print(PrinterAdapter(OldPrinter()).print_line("hi"))
```

### Java

```java
interface Modern { String printLine(String s); }

class OldLib {
    String oldPrint(String s) { return "OLD:" + s; }
}

class Adapter implements Modern {
    private final OldLib old;
    Adapter(OldLib o) { this.old = o; }
    public String printLine(String s) { return old.oldPrint(s); }
}
```

### C

```c
/* 旧 API */
const char *legacy_render(int x) {
    static char b[32];
    snprintf(b, sizeof b, "legacy:%d", x);
    return b;
}

/* 新接口希望：字符串 in -> 字符串 out */
typedef const char *(*RenderFn)(const char *s);

const char *adapter_render(const char *s) {
    int x = atoi(s);
    return legacy_render(x);
}
```

---

## 装饰器 Decorator

**意图**：**动态**给对象**叠加职责**，比继承更灵活（组合若干层「包装」）。

### Python（语言级 `@decorator` 另有用法；此处为**对象装饰**）

```python
class Coffee:
    def cost(self) -> int: return 10
    def desc(self) -> str: return "coffee"

class MilkDecorator:
    def __init__(self, c: Coffee):
        self._c = c
    def cost(self) -> int: return self._c.cost() + 2
    def desc(self) -> str: return self._c.desc() + "+milk"

c = MilkDecorator(Coffee())
print(c.desc(), c.cost())
```

### Java（IO 流是经典装饰器）

```java
interface Beverage { int cost(); String desc(); }

class Coffee implements Beverage {
    public int cost() { return 10; }
    public String desc() { return "coffee"; }
}

abstract class Condiment implements Beverage {
    protected final Beverage inner;
    Condiment(Beverage b) { this.inner = b; }
}

class Milk extends Condiment {
    Milk(Beverage b) { super(b); }
    public int cost() { return inner.cost() + 2; }
    public String desc() { return inner.desc() + "+milk"; }
}
```

### C（结构体嵌套 + 转发）

```c
typedef struct { int (*cost)(void *); const char *(*desc)(void *); } BeverageOps;

typedef struct {
    const BeverageOps *ops;
} Beverage;

typedef struct {
    Beverage base;
    Beverage *inner;
} MilkDecor;

static int coffee_cost(void *self) { (void)self; return 10; }
static const char *coffee_desc(void *self) { (void)self; return "coffee"; }

static const BeverageOps COFFEE_OPS = { .cost = coffee_cost, .desc = coffee_desc };

static int milk_cost(void *self) {
    MilkDecor *m = (MilkDecor *)self;
    return m->inner->ops->cost(m->inner) + 2;
}

static const char *milk_desc(void *self) {
    MilkDecor *m = (MilkDecor *)self;
    return "coffee+milk"; /* 教学简写，可拼接 inner->desc */
}

static const BeverageOps MILK_OPS = { .cost = milk_cost, .desc = milk_desc };
```

---

## 小结表

| 模式 | 一句话 | 典型场景 |
|------|--------|----------|
| 单例 | 全局唯一实例 | 配置、日志、池 |
| 简单工厂 | 集中创建逻辑 | 根据类型/配置 new 对象 |
| 策略 | 可替换算法 | 支付、排序、折扣规则 |
| 观察者 | 状态变更广播 | GUI、事件、消息 |
| 适配器 | 接口转换 | 集成第三方、兼容旧 API |
| 装饰器 | 动态叠加能力 | IO 流、中间件、计费叠加 |

---

## 扩展阅读（可自建 MOC）

- 其它常用：**模板方法**、**状态**、**命令**、**责任链**、**外观 Facade**、**代理 Proxy**。  
- 若某模式要写成「刷题式笔记」，可在 `moc/` 建 `moc_design_patterns` 链到本文与具体项目案例。
