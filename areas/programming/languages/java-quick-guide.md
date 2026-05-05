# Java 快速学习手册（设计思想 · 核心概念 · 数据结构）

> 每节附 **可编译的最小片段**（现代 Java），便于对照 JVM / 集合 / 并发。  
> 姊妹篇：[[spring-boot-guide]]；通用主题见 [[programming-knowledge-core]]。仓库规则 [[REPO_LAYOUT]]。

## 目录

- [一、设计思想](#一设计思想)
- [二、JVM 与基本类型](#二jvm-与基本类型)
- [三、类、接口与记录类](#三类接口与记录类)
- [四、面向对象要点](#四面向对象要点)
- [五、集合框架](#五集合框架)
- [六、异常与资源](#六异常与资源)
- [七、并发一瞥](#七并发一瞥)
- [八、模块与构建](#八模块与构建)
- [九、延伸阅读](#九延伸阅读)

---

## 一、设计思想

| 观念 | 含义 |
|------|------|
| **名义类型** | 实现接口需显式 `implements`。 |
| **强静态类型** | 编译期检查；泛型减少强制转换。 |
| **JVM** | 字节码 + GC；调优在服务端常见。 |
| **生态** | Spring 是企业 Web 事实标准，见专篇。 |

---

## 二、JVM 与基本类型

**基本类型 vs 包装类**（装箱拆箱有成本，密集数值循环需注意）：

```java
int a = 1;
Integer b = Integer.valueOf(2);
int c = b; // 自动拆箱

var list = new java.util.ArrayList<Integer>();
list.add(a); // 自动装箱
```

**`var` 局部类型推断（10+）**：

```java
var map = new java.util.HashMap<String, Integer>();
map.put("k", 1);
```

---

## 三、类、接口与记录类

**接口 + 默认方法 + 记录类**：

```java
public sealed interface Shape permits Circle, Rect {}

public record Circle(double r) implements Shape {}
public record Rect(double w, double h) implements Shape {}

public final class Demo {
    public static double area(Shape s) {
        return switch (s) {
            case Circle c -> Math.PI * c.r() * c.r();
            case Rect r -> r.w() * r.h();
        };
    }
}
```

---

## 四、面向对象要点

**访问修饰符**：`private` / `protected` / 包可见 / `public`。

**`final`**：

```java
public final class Config {
    private final String env;
    public Config(String env) { this.env = env; }
    public String env() { return env; }
}
```

---

## 五、集合框架

**List / Set / Map 基本用法**：

```java
import java.util.*;

List<String> xs = new ArrayList<>();
xs.add("a");
xs.add("b");

Set<Integer> s = new HashSet<>();
s.add(1);
s.add(1);
assert s.size() == 1;

Map<String, Integer> m = new HashMap<>();
m.put("a", 1);
m.merge("a", 2, Integer::sum); // a -> 3
```

**`Deque` 作栈**：

```java
Deque<String> st = new ArrayDeque<>();
st.push("a");
String top = st.pop();
```

**Stream**：

```java
import java.util.stream.*;

var sum = Stream.of(1, 2, 3)
    .filter(n -> n > 1)
    .mapToInt(Integer::intValue)
    .sum();
```

**并发集合**：

```java
import java.util.concurrent.*;

ConcurrentHashMap<String, Long> cache = new ConcurrentHashMap<>();
cache.computeIfAbsent("key", k -> 1L);
```

---

## 六、异常与资源

```java
import java.nio.file.*;

public class IoDemo {
    public static String readAll(Path path) throws Exception {
        try (var in = Files.newInputStream(path)) {
            return new String(in.readAllBytes());
        }
    }
}
```

---

## 七、并发一瞥

**`ExecutorService`**：

```java
import java.util.concurrent.*;

try (var ex = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<Integer> f = ex.submit(() -> 40 + 2);
    assert f.get() == 42;
}
```

（若 JDK < 21，改用 `newFixedThreadPool`。）

**`synchronized` 块**：

```java
public class Counter {
    private int n;
    public synchronized void inc() { n++; }
    public synchronized int get() { return n; }
}
```

---

## 八、模块与构建

- **Maven**：`pom.xml` 管理依赖与插件。
- **Gradle**：`build.gradle.kts` 更灵活；Spring Boot 常用其插件打包 fat jar。

```bash
./mvnw spring-boot:run
# 或
./gradlew bootRun
```

---

## 九、延伸阅读

- [[spring-boot-guide]] — Spring Boot / MVC / 数据访问。
- [[design-patterns-guide]] — 经典模式在 Java 中极常见。
- [[programming-knowledge-core]] — HTTP、DB、Git。
