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
| [[organization-models-reference]] | **目录/PKM 模型通识**（合并稿，在 `areas/management/`） |
| [[moc_category_rule]] · [[moc_organization_models]] | 仅占位文件，链向合并稿，保留旧链接 |

### `areas/programming/` 成稿入口（从 MOC 直达）

| 笔记链接 | 说明 |
|----------|------|
| [[programming-knowledge-core]] | 编程核心速查（语言通识 + 实践横切） |
| [[react-concepts-guide]] | React 设计思想与 Hooks 概念 |
| [[design-patterns-guide]] | 设计模式速查 |
| [[dsa-guide-with-code]] | 数据结构与算法（含代码） |

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
