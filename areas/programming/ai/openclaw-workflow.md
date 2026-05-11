# OpenClaw 工作流笔记

## 场景：将对话内容同步到 GitHub 仓库

**时间**：2026-05-12

### 问题

如何将 OpenClaw 对话中的问题自动上传到 GitHub 仓库的合适位置？

### 解决方案

1. 提供 GitHub 仓库地址
2. 根据仓库的 `REPO_LAYOUT.md` 确定文件分类
3. 将内容写入对应目录

### 目录映射

根据本仓库的 PARA 结构：

- `resources/` - 待读链接
- `moc/` - 探索中的主题
- `areas/` - 已整理的知识（**目标位置**）
- `projects/` - 项目材料

AI 相关的内容应放在 `areas/programming/ai/` 目录下。

### 后续优化

- [ ] 考虑建立自动化脚本
- [ ] 定期整理 moc/ 中的草稿到 areas/
