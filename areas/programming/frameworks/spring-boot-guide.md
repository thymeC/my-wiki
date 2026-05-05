# Spring Boot 详解（IoC · 自动配置 · Web · 与同类对比）

> **企业 Java 默认起点**：在 **Spring Framework** 之上提供 **起步依赖（starter）**、**自动配置**、**内嵌服务器**，快速产可运行服务。  
> 语言见 [[java-quick-guide]]；HTTP 等见 [[programming-knowledge-core]]。仓库规则 [[REPO_LAYOUT]]。

## 一、解决什么问题

| 适合 | 不太适合 |
|------|----------|
| **REST/JSON 服务**、与 JDBC/JPA、消息、缓存集成 | 极轻量、拒绝反射与启动扫描（可考虑 Micronaut/Quarkus 等，另论） |
| 团队已标准化 **Spring** 技能栈 | 纯函数式极简栈且强约束无容器（小众） |

**与「纯 Spring Framework」**：Boot **不是替代** IoC，而是 **减少 XML/样板配置**，用 `classpath` 上的 jar **推断**默认 Bean。

---

## 二、核心：IoC 容器与 Bean

**依赖注入** — 构造器注入（推荐）：

```java
@Service
public class OrderService {
    private final OrderRepository orders;
    public OrderService(OrderRepository orders) {
        this.orders = orders;
    }
}
```

**构造型注解**：`@Component`、`@Service`、`@Repository`、`@RestController`（都会被组件扫描）。

**入口**：

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

---

## 三、Spring MVC（Web）

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService users;
    public UserController(UserService users) { this.users = users; }

    @GetMapping("/{id}")
    public UserDto get(@PathVariable long id) {
        return users.find(id);
    }

    @PostMapping
    public UserDto create(@RequestBody CreateUserRequest body) {
        return users.create(body);
    }
}
```

**全局异常**：

```java
@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorBody> handle404(NotFoundException ex) {
        return ResponseEntity.status(404).body(new ErrorBody(ex.getMessage()));
    }
}
```

---

## 四、数据访问与事务

**Spring Data JPA**：

```java
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

**事务边界**（注意：**自调用**不经过代理时 `@Transactional` 可能失效）：

```java
@Service
public class TxDemo {
    @Transactional
    public void transfer() { /* ... */ }
}
```

---

## 五、配置与 Profile

```yaml
# application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/app
server:
  port: 8080
---
spring:
  config:
    activate:
      on-profile: dev
logging:
  level:
    root: INFO
```

```bash
java -jar app.jar --spring.profiles.active=prod
```

---

## 六、与 Micronaut / Quarkus / Jakarta EE 对比（简）

| 维度 | Spring Boot | Micronaut / Quarkus |
|------|-------------|---------------------|
| 启动与反射 | 传统反射+扫描为主（持续优化） | 编译期生成多，启动快、内存可更低 |
| 生态与招聘 | 最大 | 较小但增长 |
| 学习资料 | 最多 | 较少 |

**选型一句话**：**默认 Spring Boot**；若 **Serverless/容器极敏启动** 再评估 Quarkus/Micronaut。

---

## 七、AOP 与横切

日志、鉴权、事务可用 **@Aspect**（AspectJ 风格）或拦截器；理解 **代理机制** 有助于排查「事务不生效」类问题。

---

## 八、延伸阅读

- [[java-quick-guide]] — 集合、并发、模块。
- [[design-patterns-guide]] — 模板方法、代理等与 Spring 的呼应。
- [[programming-knowledge-core]] — REST、安全基础。
