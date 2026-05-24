# my-wiki（maple-red）

个人知识库，用 Obsidian 写 Markdown，用 **Docsify** 在网页上阅读。

## 在线访问

**https://maple-red.jingc.online**

默认首页为 [MOC 总索引](moc/moc_index.md)。仓库内约定与工作流见 [REPO_LAYOUT](REPO_LAYOUT.md)。

---

## 项目命名：颜色 + 名称

在 `jingc.online` 下，每个对外站点使用 **`{颜色}-{名称}`** 作为项目代号，并作为子域名：

| 项目代号 | 站点 | 说明 |
|--------|------|------|
| **maple-red** | https://maple-red.jingc.online | 本仓库：个人 wiki（编程笔记、MOC 等） |

**规则（后续站点同样遵守）**

- **格式**：`{color}-{name}`，全小写，单词用连字符 `-` 连接。  
  例：`maple-red`、`ocean-blue`、`pine-green`。
- **域名**：`https://{color}-{name}.jingc.online`
- **颜色**：取一种可联想的颜色词（maple / ocean / pine …）+ 具体色名或意象（red / blue / green …），便于区分不同项目，而不是在 URL 里用 hex 色值。

本仓库在 GitHub 上仍叫 `my-wiki`；**maple-red** 是对外发布与域名使用的项目名。

---

## 仓库里有什么

| 路径 | 作用 |
|------|------|
| `moc/` | 探索中的主题地图、清单 |
| `areas/` | 已整理、长期查阅的正文 |
| `resources/` | 待读链接 |
| `projects/` | 有起止的项目材料 |

笔记文件名：小写英文 + 连字符，如 `python-quick-guide.md`；MOC 草稿建议 `moc_<主题>.md`。

---

## 开发与部署

站点由 **Docsify** 渲染，通过 **GitHub Pages** 发布。维护说明见 [DEVELOPER.md](DEVELOPER.md)。
