# 开发者说明（Docsify · GitHub Pages）

> 本仓库 **maple-red** 的网页版由 [Docsify](https://docsify.js.org/) 提供，部署在 **GitHub Pages**，自定义域名为 **maple-red.jingc.online**。

## 线上地址

| 环境 | URL |
|------|-----|
| **生产（自定义域）** | https://maple-red.jingc.online |
| GitHub Pages 默认域 | `https://<username>.github.io/my-wiki/`（若未配置 CNAME 时） |

---

## 技术栈

| 组件 | 说明 |
|------|------|
| **Docsify 4** | 无构建步骤；浏览器拉取 `.md` 并渲染 |
| **入口** | 根目录 `index.html` |
| **侧栏** | `_sidebar.md` |
| **样式** | `site/custom.css`；主题 `vue.css` / 系统深色 `dark.css` |
| **Obsidian 双链** | `site/wiki-links.js`（`[[wikilink]]` → Markdown 链接） |
| **插件** | search、copy-code、pagination |
| **GitHub Pages** | 分支 `main`，发布目录为仓库 **根目录** |
| **自定义域名** | 根目录 `CNAME` 内容为 `maple-red.jingc.online` |

Docsify **不是**把 Markdown 预编译成 HTML；推送后 GitHub Pages 只托管静态文件，渲染在访客浏览器完成。

---

## 本地预览

必须用 HTTP 服务（不要直接 `file://` 打开 `index.html`）：

```bash
cd /path/to/my-wiki
python3 -m http.server 8080
```

浏览器打开：http://localhost:8080/

本地 `basePath` 为 `/`。生产环境若使用 `*.github.io/<repo>/`，`index.html` 会自动检测并设置 `basePath`；**自定义域**下路径为站点根 `/`。

---

## 部署流程（GitHub Pages）

1. 将变更推送到 GitHub 的 `main` 分支（需包含 `index.html`、`_sidebar.md`、`site/`、`.nojekyll`、笔记 `.md` 等）。
2. 仓库 **Settings → Pages**：
   - **Source**：Deploy from a branch  
   - **Branch**：`main`  
   - **Folder**：`/ (root)`
3. 自定义域名（已配置）：
   - 根目录 **`CNAME`** 文件一行：`maple-red.jingc.online`
   - DNS：`maple-red.jingc.online` 的 **CNAME** 指向 `<username>.github.io`（或按 GitHub Pages 文档配置 **A / ALIAS**）
   - Pages 设置里填写 **Custom domain** 并等待 HTTPS 证书生效
4. 等待 Actions / Pages 部署完成（通常 1–3 分钟），访问 https://maple-red.jingc.online

**`.nojekyll`**：避免 GitHub 用 Jekyll 处理仓库，防止忽略以 `_` 开头的文件（如 `_sidebar.md`）。

---

## 新增或修改页面

1. **写笔记**：在 `moc/`、`areas/` 等目录添加或编辑 `.md`（Obsidian 双链 `[[note-name]]` 仍可在源文件中使用）。
2. **侧栏**：在 `_sidebar.md` 增加链接，例如  
   `[标题](areas/programming/languages/foo-guide.md)`
3. **双链映射**：若使用 `[[wikilink]]`，在 `site/wiki-links.js` 的 `WIKI_LINKS` 中增加  
   `"note-name": "path/to/file.md"`
4. **MOC 登记**：探索类主题可在 `moc/moc_index.md` 表格中登记（可选）。
5. 本地 `python3 -m http.server` 验证后 `git push`，Pages 自动更新。

默认首页在 `index.html` 的 `homepage: "moc/moc_index.md"`，可按需修改。

---

## 项目命名（与其它 jingc.online 站点）

对外站点代号：**`{颜色}-{名称}`** → **`https://{颜色}-{名称}.jingc.online`**

本仓库代号为 **maple-red**。新站点复制同一模式：新仓库或新 CNAME、新 `_sidebar.md`，代号与域名一致即可。

用户向说明见 [README.md](README.md)；笔记目录规则见 [REPO_LAYOUT.md](REPO_LAYOUT.md)。

---

## 故障排查

| 现象 | 处理 |
|------|------|
| 侧栏空白 | 确认 `_sidebar.md` 在根目录且存在 `.nojekyll` |
| 404 加载 `.md` | 确认文件已 push；路径与 `_sidebar.md` 一致 |
| 自定义域不生效 | 检查 DNS、`CNAME` 文件与 Pages 域名设置 |
| `[[wikilink]]` 不可点 | 在 `site/wiki-links.js` 补 `WIKI_LINKS` 条目 |
| GitHub Pages 仍显示旧版 | 硬刷新或清缓存；确认 push 的是 `main` 且 Pages 源为 root |

---

## 相关链接

- [Docsify 文档](https://docsify.js.org/)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Pages 自定义域](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
