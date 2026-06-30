# MOC 总索引

本库把 **`moc/`** 当作 **「想了解」的入口**：用地图、清单、链接记录探索中的主题。成体系、要长期查阅的内容再进 **`areas/`**。  
**本 repo 文件夹与工作流**（权威）：[[REPO_LAYOUT]]。

## 快速判断：这条内容先放哪？

1. **只是链接、还没看** → `resources/`
2. **正在好奇、想理清 / 草稿式地图** → `moc/`（新建或更新 `moc_*.md`）
3. **已消化、要当知识库正文保存** → `areas/`
4. **明确属于某个可结项任务** → `projects/`

在 `moc/` 里记够一批后，可用 AI 按 `areas/` 下的分类，把素材整理成 `areas/` 里的成稿（你再校对）。

## 主题 MOC 列表

在 `moc/` 下新建 `moc_<主题>.md`，把链接加到下表。

| 主题 MOC | 说明 |
|----------|------|
| [[moc_ai_model_benchmark]] | AI 主流模型 Benchmark 评测结果汇总 |
| [[moc_ide_plugins]] | IDE / 编辑器插件与主题（含 Cursor 等） |
| [[moc_tableau_prep_builder]] | Tableau Prep Builder 用法、数据准备流程与个人经验 |
| [[moc_vscode_ide]] | VS Code / Cursor 界面图标过大时的缩放与字体设置 |
| [[organization-models-reference]] | **目录/PKM 模型通识**（合并稿，在 `areas/management/`） |
| [[moc_category_rule]] · [[moc_organization_models]] | 仅占位文件，链向合并稿，保留旧链接 |

### `areas/programming/` 成稿入口（从 MOC 直达）

| 笔记链接 | 说明 |
|----------|------|
| [[programming-knowledge-core]] | 编程核心速查（语言通识 + 实践横切） |
| [[design-patterns-guide]] | 设计模式速查 |
| [[dsa-guide-with-code]] | 数据结构与算法（含代码） |

**语言速查（`languages/`）**

| 笔记链接 | 说明 |
|----------|------|
| [[python-quick-guide]] | Python：思想 · 核心概念 · 数据结构 |
| [[go-quick-guide]] | Go：思想 · 并发 · slice/map |
| [[java-quick-guide]] | Java：JVM · 集合 · 并发一瞥 |
| [[javascript-typescript-quick-guide]] | JS/TS：事件循环 · 类型 · 异步 |

**框架与前端（`frameworks/` + `tools/`）**

| 笔记链接 | 说明 |
|----------|------|
| [[python-frameworks-index]] | Python Web 总索引与对比 |
| [[python-flask-guide]] · [[python-fastapi-guide]] · [[python-django-guide]] | Python 三大 Web 框架（各一篇） |
| [[python-sqlalchemy-guide]] · [[python-celery-guide]] | ORM / 任务队列 |
| [[spring-boot-guide]] | Java：Spring Boot |
| [[go-frameworks-index]] | Go Web 总索引 |
| [[go-net-http-guide]] · [[go-gin-guide]] · [[go-echo-guide]] · [[go-chi-guide]] | Go 标准库与主流路由 |
| [[frontend-stack-index]] | 前端栈索引：React（库）· Vue（框架）· 元框架 |
| [[react-ecosystem-guide]] · [[vue-framework-guide]] | React 库与生态 · Vue 框架（`frameworks/`） |
| [[react-concepts-guide]] | React：思想与 Hooks（`tools/`） |
| [[vue-guide]] | Vue 3：组合式 API · 生态（`tools/`） |

### 新建 `moc_*.md` 时可用的结构

```markdown
# MOC：主题名称

## 想搞懂的问题
- …

## 已有线索 / 链接
- …

## 待整理进 `areas/` 的要点（整理后删或改短）
- …

## 已沉淀到 `areas/`（可选）
- [[某篇]] — 简述
```

---

*习惯：愿意打开 `moc/` 就多记；定期把成熟块迁到 `areas/`，让 `moc/` 保持轻快。*
