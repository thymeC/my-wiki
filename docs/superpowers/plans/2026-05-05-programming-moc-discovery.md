# Programming area MOC discovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make existing `areas/programming/` long-form notes discoverable from `moc/moc_index.md`, matching the repo workflow in [[REPO_LAYOUT]] (explore via `moc/`, settle in `areas/`).

**Architecture:** Extend the MOC index table with explicit rows for each programming guide so Obsidian graph and backlinks stay consistent with filenames. No new hub file unless you later want a dedicated `moc_programming.md` scratchpad.

**Tech stack:** Markdown, Obsidian-style `[[wikilinks]]`, paths under `areas/programming/`.

---

### Task 1: Register programming guides in `moc_index.md`

**Files:**

- Modify: `moc/moc_index.md` (section「主题 MOC 列表」table)
- Verify: `areas/programming/languages/programming-knowledge-core.md`, `areas/programming/tools/react-concepts-guide.md`, `areas/programming/languages/design-patterns-guide.md`, `areas/programming/algorithms/dsa-guide-with-code.md` exist

- [ ] **Step 1: Confirm four target files exist**

Run:

```bash
ls -1 areas/programming/languages/programming-knowledge-core.md \
      areas/programming/tools/react-concepts-guide.md \
      areas/programming/languages/design-patterns-guide.md \
      areas/programming/algorithms/dsa-guide-with-code.md
```

Expected: four paths listed, no errors.

- [ ] **Step 2: Insert programming rows into the MOC table**

After the existing table rows (before the `### 新建` heading), add a short subsection and rows so explorers see programming without hunting `REPO_LAYOUT` alone:

```markdown
### `areas/programming/` 成稿入口（从 MOC 直达）

| 笔记链接 | 说明 |
|----------|------|
| [[programming-knowledge-core]] | 编程核心速查（语言通识 + 实践横切） |
| [[react-concepts-guide]] | React 设计思想与 Hooks 概念 |
| [[design-patterns-guide]] | 设计模式速查 |
| [[dsa-guide-with-code]] | 数据结构与算法（含代码） |
```

- [ ] **Step 3: Open `moc_index.md` in Obsidian**

Click each `[[...]]` link. Expected: all four resolve to the correct notes.

- [ ] **Step 4: Commit**

```bash
git add moc/moc_index.md
git commit -m "docs(moc): link programming area guides from MOC index"
```

---

### Task 2 (optional): Add a lightweight `moc_programming.md` scratchpad

**Files:**

- Create: `moc/moc_programming.md`
- Modify: `moc/moc_index.md` (add one table row `[[moc_programming]]`)

- [ ] **Step 1: Create scratchpad from REPO_LAYOUT template**

Use the「新建 `moc_*.md` 时可用的结构」block already in `moc_index.md`; seed「已有线索」with the four `[[wikilinks]]` above.

- [ ] **Step 2: Register in index table**

Add `[[moc_programming]]` with description「编程主题探索草稿 / 链接汇总」.

- [ ] **Step 3: Commit**

```bash
git add moc/moc_programming.md moc/moc_index.md
git commit -m "docs(moc): add programming exploration scratchpad"
```

---

## Self-review

- **Spec coverage:** Task 1 covers discoverability from MOC; Task 2 covers optional exploration layer per repo conventions.
- **Placeholders:** None.
- **Consistency:** Wikilink targets match filenames (stem = link name) for Obsidian defaults.

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-05-programming-moc-discovery.md`. Two execution options:**

1. **Subagent-driven (recommended)** — dispatch a fresh subagent per task, review between tasks.
2. **Inline execution** — run tasks in this session using superpowers:executing-plans with checkpoints.

**Which approach do you want for the remaining checkboxes?**
