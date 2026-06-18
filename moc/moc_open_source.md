# MOC：开源贡献路线

> 目标：从“想混一下开源社区”变成“能稳定找到问题、提交小而确定的 PR、逐步形成自己的开源方向”。
> 快照日期：2026-06-18。GitHub issue 变化很快，开始前一定点击链接确认 issue 是否仍 open、是否已被认领。

---

## 先定策略：第一步不是刷存在感，而是建立可信记录

开源社区里最有复利的路径通常不是一上来做大功能，而是：

1. 找一个你真的会用、愿意长期关注的项目。
2. 从一个小问题开始：文档、测试、报错信息、示例、边界 bug。
3. 严格读 `README` / `CONTRIBUTING.md` / `CODE_OF_CONDUCT.md`。
4. 先跑通本地测试，再改动。
5. 提一个范围很小、说明清楚、容易 review 的 PR。
6. 礼貌响应反馈，把第一次合并当作建立信用的起点。

判断一个 issue 是否适合第一次贡献，看这几项：

| 判断项 | 好信号 | 避坑信号 |
|--------|--------|----------|
| 范围 | 只涉及 1-3 个文件；目标清楚 | “重构”“重新设计”“支持全平台” |
| 标签 | `good first issue` / `help wanted` / `beginner` / `documentation` | 没有复现、讨论混乱、长期无人回应 |
| 维护活跃度 | 最近几天/几周有提交或 maintainer 回复 | 最近一年无人维护 |
| 环境成本 | 本地能较快跑起来；测试命令清楚 | 环境巨大且文档不完整 |
| 个人兴趣 | 你本来就用或想深入这类技术 | 只因为 star 多而选 |

---

## 发现 issue 的入口

| 入口 | 用法 |
|------|------|
| [goodfirstissue.dev](https://goodfirstissue.dev/) | 按语言浏览热门项目的 beginner-friendly issue。 |
| [GitHub good-first-issue topic](https://github.com/topics/good-first-issue) | 找带 `good-first-issue` 主题的仓库。 |
| [GitHub help-wanted topic](https://github.com/topics/help-wanted) | 找明确欢迎外部帮助的项目。 |
| [First Timers Only](https://www.firsttimersonly.com/) | 理解 `first-timers-only` 文化，适合第一次 PR 的心态建设。 |
| [up-for-grabs.net](https://up-for-grabs.net/) | 聚合项目维护者主动标出的可认领任务。 |
| GitHub 搜索 | `is:issue is:open label:"good first issue" language:TypeScript`，把语言换成自己会的。 |

---

## 热门仓库候选雷达

> 说明：星标/活跃信息来自 GitHub 只读查询快照；“新手 issue 数”优先参考 goodfirstissue.dev 当前页面快照。它们代表“值得点进去看”的候选，不代表一定要抢这些 issue。

### 前端 / TypeScript / 文档生态

| 仓库 | 为什么值得看 | 当前可切入点 |
|------|--------------|--------------|
| [facebook/docusaurus](https://github.com/facebook/docusaurus) | 文档站生成器，TypeScript，社区成熟；goodfirstissue.dev 显示约 9 个新手 issue。 | 文档、示例、插件行为、站点构建问题。 |
| [storybookjs/storybook](https://github.com/storybookjs/storybook) | UI 组件开发标准工具；goodfirstissue.dev 显示约 17 个新手 issue。 | 文档、测试、addon、小型 UI bug。 |
| [pnpm/pnpm](https://github.com/pnpm/pnpm) | 高速包管理器；goodfirstissue.dev 显示约 12 个新手 issue。 | 文档、命令行边界、测试用例。 |
| [hoppscotch/hoppscotch](https://github.com/hoppscotch/hoppscotch) | 开源 API 客户端，类似 Postman；GitHub 快照约 79k stars。 | 前端体验、文档、接口调试流程。 |
| [appwrite/appwrite](https://github.com/appwrite/appwrite) | 开源后端云平台；goodfirstissue.dev 显示约 11 个新手 issue。 | 文档、SDK 示例、控制台体验。 |
| [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid) | Markdown 图表生态核心项目；GitHub 快照约 88k stars。 | 文档、图表语法示例、渲染边界 case。 |
| [vuetifyjs/vuetify](https://github.com/vuetifyjs/vuetify) | Vue 组件库；goodfirstissue.dev 显示约 20 个新手 issue。 | 组件文档、样式 bug、示例补全。 |

### AI / 数据 / 可观测性

| 仓库 | 为什么值得看 | 当前可切入点 |
|------|--------------|--------------|
| [ollama/ollama](https://github.com/ollama/ollama) | 本地 LLM 运行工具，GitHub 快照约 174k stars；goodfirstissue.dev 显示约 4 个新手 issue。 | Go 代码、CLI、文档、模型运行体验。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | AI 模型生态核心库，GitHub 快照约 161k stars。 | 文档、模型示例、测试；优先看 `Good First Documentation Issue`。 |
| [grafana/grafana](https://github.com/grafana/grafana) | 可观测性和仪表盘核心项目；goodfirstissue.dev 显示约 19 个新手 issue。 | 前端面板、文档、告警/数据源相关小问题。 |
| [grafana/loki](https://github.com/grafana/loki) | 日志系统，Grafana 生态；goodfirstissue.dev 显示约 19 个新手 issue。 | Go、文档、测试、日志查询边界。 |
| [opensearch-project/OpenSearch](https://github.com/opensearch-project/OpenSearch) | 开源搜索引擎；goodfirstissue.dev 显示约 20 个新手 issue。 | Java、测试、文档、小型 bug。 |
| [opensearch-project/OpenSearch-Dashboards](https://github.com/opensearch-project/OpenSearch-Dashboards) | OpenSearch 可视化界面；goodfirstissue.dev 显示约 17 个新手 issue。 | TypeScript、UI、文档。 |

### 后端 / 云原生 / 基础设施

| 仓库 | 为什么值得看 | 当前可切入点 |
|------|--------------|--------------|
| [testcontainers/testcontainers-java](https://github.com/testcontainers/testcontainers-java) | Java 测试基础设施常用库；goodfirstissue.dev 显示约 16 个新手 issue。 | Java、测试、文档、示例容器。 |
| [jetstack/cert-manager](https://github.com/cert-manager/cert-manager) | Kubernetes TLS 证书管理；goodfirstissue.dev 显示约 12 个新手 issue。 | Go、K8s 文档、测试、控制器边界。 |
| [nextcloud/server](https://github.com/nextcloud/server) | 开源网盘/协作平台；goodfirstissue.dev 显示约 20 个新手 issue。 | PHP、前端、文档、可访问性。 |
| [mattermost/mattermost-server](https://github.com/mattermost/mattermost-server) | 开源协作平台；goodfirstissue.dev 显示约 20 个新手 issue。 | Go、后端 bug、文档、测试。 |
| [tauri-apps/tauri](https://github.com/tauri-apps/tauri) | Rust + Web 的跨端应用框架；goodfirstissue.dev 显示约 10 个新手 issue。 | Rust、文档、示例、平台兼容。 |
| [rust-lang/rust-clippy](https://github.com/rust-lang/rust-clippy) | Rust lint 工具；goodfirstissue.dev 显示约 10 个新手 issue。 | 新 lint、测试、诊断文案。 |
| [ipython/ipython](https://github.com/ipython/ipython) | Python 交互环境；goodfirstissue.dev 显示约 20 个新手 issue。 | Python、文档、交互行为、小 bug。 |

---

## 我的第一条贡献建议

如果你没有特别强的技术偏好，建议从 **文档 / 示例 / 测试** 进入，而不是直接挑战核心架构。

推荐优先级：

1. **Docusaurus / Storybook / pnpm**：前端与文档生态，反馈面广，PR 容易展示。
2. **IPython / Testcontainers Java**：如果想走 Python 或 Java 工程能力路线。
3. **Grafana / Loki / OpenSearch**：如果想进入可观测性、搜索、基础设施方向。
4. **Ollama / Transformers**：如果想把开源贡献和 AI 方向绑定，但竞争会更激烈。
5. **Tauri / rust-clippy**：如果想长期深挖 Rust。

第一次 issue 的理想画像：

- 标题里有 typo、docs、example、test、error message、small bug。
- issue 描述里有复现步骤或期望行为。
- 最近 30 天内有人回复或打标签。
- 没有人明确说 “I am working on this”。
- 你能在本地复现，或者至少能跑通相关测试/文档构建。

---

## 可复制的开场模板

认领 issue 前：

```text
Hi, I would like to work on this issue as my first contribution to this project.
I have read the contributing guide and will start by reproducing the problem locally.
Is this still available?
```

如果你已经定位到方向：

```text
I looked into this and think the change may be limited to <file/module>.
My plan is to add/update <test/docs/example> and keep the PR focused.
Please let me know if this direction sounds reasonable.
```

PR 描述模板：

```markdown
## What changed
- ...

## Why
Fixes #<issue-number>.

## How I tested
- [ ] Ran ...
- [ ] Added/updated ...

## Notes
This is my first contribution to the project, so feedback is welcome.
```

---

## 第一次 PR 操作清单

1. 选仓库：从上面的候选雷达挑 1 个你愿意持续关注的项目。
2. 读文档：`README.md`、`CONTRIBUTING.md`、`CODE_OF_CONDUCT.md`、PR 模板。
3. 找 issue：优先 `good first issue`、`help wanted`、`documentation`、`tests`。
4. 确认可做：看是否有人认领、是否有 maintainer 近期回复。
5. 留言认领：说明自己是 first-time contributor，并问是否 still available。
6. Fork + clone：不要直接在主分支改。
7. 建分支：`git checkout -b fix/<short-topic>`。
8. 跑基线：改之前先跑项目推荐的 test / lint / docs build。
9. 小步修改：只解决一个 issue，不顺手重构。
10. 补测试或截图：代码改动尽量有测试；文档/UI 改动给截图或预览。
11. 清晰提交：遵守项目 commit 规范；不确定时用简单动词，如 `docs: clarify ...`。
12. 发 PR：填完整模板，链接 issue，写清楚测试结果。
13. 跟进 review：感谢反馈；不同意时给事实、复现、文档依据。

---

## 形成长期路线

第一次 PR 合并后，不要马上到处撒网。更稳的路线：

1. 在同一个项目继续做 2-3 个小 PR，熟悉 maintainer 风格。
2. 记录每次贡献：问题、定位过程、测试命令、review 反馈。
3. 从文档/测试过渡到 bug fix，再到小功能。
4. 选择一个方向沉淀标签：
   - 前端工程：Docusaurus / Storybook / pnpm / Vite 生态。
   - AI 工程：Ollama / Transformers / LangChain 周边。
   - 基础设施：Grafana / Loki / OpenSearch / cert-manager。
   - 语言生态：rust-clippy / IPython / Testcontainers。
5. 把贡献过程写成中文复盘，反过来成为你的开源名片。

---

## 参考资料

- [GitHub Blog：Getting started with OSS contributions](https://github.blog/developer-skills/github/github-for-beginners-getting-started-with-oss-contributions/)
- [Good First Issue](https://goodfirstissue.dev/)
- [First Timers Only](https://www.firsttimersonly.com/)
- [GitHub topic: good-first-issue](https://github.com/topics/good-first-issue)
- [GitHub topic: help-wanted](https://github.com/topics/help-wanted)
- [How to contribute to open source for the first time](https://codably.dev/open-source/how-to-contribute-to-open-source-for-the-first-time)
