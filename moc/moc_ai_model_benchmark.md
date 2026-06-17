# AI Model Benchmark 主流模型评测结果

> 来源：LMArena mirror / Cherry Studio (2026-06-16) / Artificial Analysis v4.1 (2026-06-16) / Vals.ai SWE-bench Verified (2026-06-13) / Morph SWE-bench Pro 汇总 (2026-06-09) / Awesome Agents 月榜 (2026-06-15)
> 状态：**2026年6月中旬最新**

---

## 核心 Benchmark 说明

| Benchmark | 含义 | 说明 |
|-----------|------|------|
| **GPQA Diamond** | 研究生级别科学问答（专家约 65-70%） | 90%+ 顶尖 |
| **SWE-bench Verified** | 500 个真实 GitHub Issue 修复任务 | 2026 年已接近饱和，适合作为方向信号 |
| **SWE-bench Pro** | 1,865 个多语言真实工程任务，含私有商业代码库 | 当前更推荐的 coding benchmark |
| **Arena Elo** | LMArena 盲测用户投票，人类偏好 | 动态变化快，注意日期和 vote volume |
| **AA Intelligence Index** | Artificial Analysis 综合推理/代码/agentic 任务指数 | v4.1 起更偏向 agentic workload |
| **GDPval-AA / Terminal-Bench** | 更接近知识工作/终端任务的 agentic benchmark | v4.1 权重提高 |
| **HumanEval / MMLU** | 传统代码/知识题 | 对 frontier model 已明显饱和 |

> 💡 **2026年6月关键变化**：Claude Fable 5 以多个 benchmark 第一发布，但因可用性限制目前不适合作为默认选型；可用模型中 Claude Opus 4.8 是综合最强候选，GPT-5.5 与 Gemini 3.1 Pro 紧随其后。Coding 场景应优先看 SWE-bench Pro，而不是已经饱和/污染的 SWE-bench Verified。

---

## 综合榜单（2026年6月）

> 多源手工汇总，优先标注「可用性」和「数据口径」。同一模型在不同 harness / scaffold 下分数不可直接混排。

| 排名 | 模型 | 公司 | 可用性 | GPQA | SWE Verified | SWE Pro | Arena Elo | AA v4.1 | 价格（In/Out） | 备注 |
|------|------|------|--------|------|--------------|---------|-----------|---------|----------------|------|
| 1* | **Claude Fable 5** | Anthropic | 暂停/不可用 | ~95% | **95.0%** | **80.3%**（vendor） | 1510±11 | **60** | $10 / $50 | benchmark #1，但当前不能作为实际默认选择 |
| 2 | **Claude Opus 4.8** | Anthropic | 可用 | 93.6% | **88.6%** | 69.2%（vendor） | 1486±7（thinking） | **56** | $5 / $25 | 当前可用综合最强；coding/agentic 强 |
| 3 | **GPT-5.5** | OpenAI | 可用 | 93.6% | 82.6%（Vals） | 58.6%（vendor） | 1481±5（high） | 55 | $5 / $30 | 接近 Opus 4.8，成本低于 Opus |
| 4 | **Gemini 3.1 Pro** | Google | 可用 | **94.3%** | 78.8-80.6% | 46.1%（SEAL）/ 54.2%（vendor） | 1487±4 | 46 | $2 / $12 | 推理/成本比优秀，GPQA 领先 |
| 5 | **Claude Opus 4.6 Thinking** | Anthropic | 可用 | — | 78.2-80.8% | 51.9%（SEAL）/ 47.1%（commercial） | **1504±4** | — | $5 / $25 | LMArena 仍很强；商业代码集表现稳定 |
| 6 | **Muse Spark** | Meta | 可用性待确认 | — | — | 55.0%（SEAL） | 1487±6（prelim） | — | N/A | SWE-bench Pro SEAL 第二；Arena 票量较少 |
| 7 | **MiniMax M3** | MiniMax | 开放权重/待发布口径 | 92.7% | 80.5%（tracker） | 暂无 SEAL | 1451±7 | 44 | N/A | open-weight 阵营新强者 |
| 8 | **Kimi K2.6** | Moonshot | 开放权重 | 90.5% | 80.2%（tracker） | 暂无 SEAL | 1462±5 | 43 | $0.95 / $4 | open-weight coding 重点关注 |
| 9 | **DeepSeek V4 Pro** | DeepSeek | 开放权重/API | 72.8%* | 80.6%* | 暂无 SEAL | 1457±5 | 44 | $0.43 / $0.87 | 成本极低；部分分数仍 vendor/third-party reported |
| 10 | **Qwen3.7 Max Preview** | Alibaba | 待确认 | TBD | TBD | 暂无 SEAL | 1474±10 | — | $1.25 / $3.75 | Arena 强，完整 GPQA/SWE 待发布 |

\* Fable 5、DeepSeek V4 部分数据来自发布/第三方汇总，独立复现不足；Fable 5 当前不可用。

### Chatbot Arena Elo 榜单（2026-06-16）

> 来源：Cherry Studio 的 LMArena 自动镜像。Arena Elo 是人类偏好分，不等于任务能力；preliminary 行需要结合票量看。

| 排名 | 模型 | Elo | Votes | 价格（In/Out） |
|------|------|-----|-------|----------------|
| 1 | **Claude Fable 5** | **1510±11** | 2,883 | $10 / $50 |
| 2 | **Claude Opus 4.6 Thinking** | 1504±4 | 42,797 | $5 / $25 |
| 3 | **Claude Opus 4.7 Thinking** | 1502±5 | 28,900 | $5 / $25 |
| 4 | **Claude Opus 4.6** | 1498±4 | 45,808 | $5 / $25 |
| 5 | **Claude Opus 4.7** | 1492±5 | 29,924 | $5 / $25 |
| 6 | **Muse Spark** | 1487±6 | 13,511 | N/A |
| 7 | **Gemini 3.1 Pro Preview** | 1487±4 | 55,403 | $2 / $12 |
| 8 | **Gemini 3 Pro** | 1486±4 | 41,317 | $2 / $12 |
| 9 | **Claude Opus 4.8 Thinking** | 1486±7 | 9,190 | $5 / $25 |
| 10 | **GPT-5.5 High** | 1481±5 | 24,620 | $5 / $30 |

### SWE-bench Verified 编程榜单（2026-06-13）

> 来源：Vals.ai，统一 bash-only harness。Verified 已被认为存在污染/饱和问题，适合看趋势，不适合作为 frontier coding 唯一排序。

| 排名 | 模型 | SWE-bench Verified | 备注 |
|------|------|-------------------|------|
| 1 | **Claude Fable 5** | **95.0%** | 当前不可用 |
| 2 | **Claude Opus 4.8** | **88.6%** | 当前可用最高 |
| 3 | **GPT-5.5** | 82.6% | OpenAI frontier |
| 4 | **Claude Opus 4.7** | 82.0% | Anthropic |
| 5 | **Gemini 3.5 Flash** | 78.8% | 高速/较低成本 |
| 6 | **Gemini 3.1 Pro Preview** | 78.8% | Google |
| 7 | **GPT-5.4 (xhigh)** | 78.2% | OpenAI |
| 8 | **Claude Opus 4.6 Thinking** | 78.2% | Anthropic |
| 9 | **Kimi K2.7 Code** | 78.2% | Moonshot coding |
| 10 | **GPT-5.3 Codex** | 78.0% | OpenAI coding |

### Artificial Analysis Intelligence Index v4.1（2026-06-16）

> v4.1 调整后更重视 agentic workloads：GDPval-AA v2 20%、Terminal-Bench 2.1 16%、τ³-Bench Banking 14%。以下采用 v4.1 文章中的 rebased 分数。

| 排名 | 模型 | AA v4.1 | 备注 |
|------|------|---------|------|
| 1 | **Claude Fable 5 + Opus 4.8 fallback** | **60** | 当前不可用；GDPval-AA v2 1818 |
| 2 | **Claude Opus 4.8 Max** | **56** | 当前可用最高；$1.78 / task |
| 3 | **GPT-5.5 xhigh** | 55 | 与 Opus 4.8 接近；$0.99 / task |
| 4 | **Gemini 3.1 Pro Preview** | 46 | 速度/成本表现好 |
| 5 | **DeepSeek V4 Pro Max** | 44 | open-weight/低成本；$0.04 / task |
| 5 | **MiniMax M3** | 44 | open-weight 领先组 |
| 7 | **Kimi K2.6** | 43 | open-weight 领先组 |
| 8 | **MiMo-V2.5-Pro** | 42 | open-weight 领先组 |

---

## 编程 Code 专项榜单（2026年6月）

> ⚠️ 结论先行：2026 年之后真实 coding 选型应优先看 SWE-bench Pro（尤其 commercial/private set），Verified 更像「上限和营销信号」。

### SWE-bench Pro — Scale SEAL Public Set（731 tasks）

> 统一 scaffolding，Pass@1；这是当前最可比的公开 Pro 榜单。

| 排名 | 模型 | Pro Public | 95% CI | 备注 |
|------|------|------------|--------|------|
| 1 | **GPT-5.4 (xHigh)** | **59.1%** | ±3.56 | SEAL public 第一 |
| 2 | **Muse Spark** | 55.0% | ±3.60 | 新 entry |
| 3 | **Claude Opus 4.6 Thinking** | 51.9% | ±3.61 | Anthropic 可比最高 |
| 4 | **Gemini 3.1 Pro Thinking** | 46.1% | ±3.60 | Google |
| 5 | **Claude Opus 4.5** | 45.9% | ±3.60 | Anthropic |
| 6 | **Claude Sonnet 4.5** | 43.6% | ±3.60 | 性价比线 |
| 7 | **Gemini 3 Pro Preview** | 43.3% | ±3.60 | Google |
| 8 | **Claude Sonnet 4** | 42.7% | ±3.59 | Anthropic |
| 9 | **GPT-5 High** | 41.8% | ±3.49 | OpenAI |
| 10 | **GPT-5.2 Codex** | 41.0% | ±3.57 | OpenAI coding |

### SWE-bench Pro — Commercial Set（276 private tasks）

> 私有商业代码库，更接近企业内部代码；样本较小，CI 更宽。

| 排名 | 模型 | Commercial | Public Set | 备注 |
|------|------|------------|------------|------|
| 1 | **Claude Opus 4.6 Thinking** | **47.1%** | 51.9% | 私有代码集最稳 |
| 2 | **Muse Spark** | 44.7% | 55.0% | public 到 private 掉点明显 |
| 3 | **GPT-5.4 (xHigh)** | 43.4% | 59.1% | public 第一，private 第三 |
| 4 | **Gemini 3.1 Pro Thinking** | 32.2% | 46.1% | private 掉点大 |
| 5 | **GPT-5.2 Codex** | 27.7% | 41.0% | OpenAI coding |

### SWE-bench Pro — Vendor-reported（不可与 SEAL 直接比较）

| 模型 | Pro | 口径 | 备注 |
|------|-----|------|------|
| **Claude Fable 5** | **80.3%** | Anthropic scaffold | 当前不可用 |
| **Claude Mythos Preview** | 77.8% | Anthropic scaffold | 当前不可用 |
| **Claude Opus 4.8** | 69.2% | Anthropic scaffold | 可用模型最高 vendor score |
| **GPT-5.5** | 58.6% | vendor scaffold | OpenAI |
| **Gemini 3.1 Pro** | 54.2% | vendor scaffold | Google |

### 编程选型建议

| 场景 | 推荐 | 原因 |
|------|------|------|
| **真实生产 Bug 修复 / 私有代码库** | Claude Opus 4.8；若只看 SEAL commercial，Claude Opus 4.6 Thinking | Opus 系列在 Verified、vendor Pro、commercial set 都稳定 |
| **公开可比 Pro 分数** | GPT-5.4 (xHigh) | Scale SEAL public set 59.1% 第一 |
| **高性价比工程任务** | Gemini 3.1 Pro / GPT-5.5 | 能力接近 frontier，价格低于 Opus |
| **开放权重 coding** | Kimi K2.6 / MiniMax M3 / DeepSeek V4 Pro；SEAL Pro 关注 Qwen3 Coder 480B | Verified 和 GPQA 进入 frontier 区间，但 Pro 覆盖仍薄 |
| **低延迟/批量任务** | Gemini 3.5 Flash / Grok 4.3 / DeepSeek V4 Flash | 成本和速度优先，适合结构化任务 |
| **不可作为默认** | Claude Fable 5 | benchmark 强但当前不可用，除非恢复访问 |

---

## 分项冠军（2026年6月）

| 场景 | 冠军 | 分数/状态 |
|------|------|-----------|
| **Benchmark 绝对第一** | Claude Fable 5 | 多榜第一，但当前不可用 |
| **可用综合第一** | Claude Opus 4.8 | AA v4.1 可用第一；SWE Verified 88.6% |
| **用户偏好 Arena** | Claude Fable 5 | 1510±11（票量低/不可用）；稳定可用榜看 Opus 4.6 Thinking 1504±4 |
| **编程 SWE-bench Verified** | Claude Fable 5 / Claude Opus 4.8 | 95.0%（不可用）/ 88.6%（可用） |
| **编程 SWE-bench Pro（vendor）** | Claude Fable 5 / Claude Opus 4.8 | 80.3%（不可用）/ 69.2%（可用） |
| **编程 SWE-bench Pro（SEAL public）** | GPT-5.4 (xHigh) | 59.1% |
| **编程 SWE-bench Pro（commercial/private）** | Claude Opus 4.6 Thinking | 47.1% |
| **科学推理 GPQA（可用）** | Gemini 3.1 Pro | 94.3% |
| **AA Intelligence Index（可用）** | Claude Opus 4.8 Max | 56（v4.1） |
| **Open-weight 综合** | MiniMax M3 / Kimi K2.6 / DeepSeek V4 Pro | AA 44/43/44；coding 分数需看口径 |
| **成本效率** | DeepSeek V4 Pro Max | AA v4.1 约 $0.04 / task |
| **速度/高吞吐** | Gemini 3.5 Flash | 适合低延迟结构化任务 |

---

## 关键洞察（2026年6月）

1. **“榜首”与“可用”分离**：Claude Fable 5 在多个 benchmark 上第一，但当前不可用；实际默认选型应从 Claude Opus 4.8、GPT-5.5、Gemini 3.1 Pro 中选。
2. **Coding benchmark 已换代**：SWE-bench Verified 已接近饱和并存在污染争议；SWE-bench Pro 的 public/commercial set 更能反映真实工程难度。
3. **同名 SWE-bench Pro 分数不能混用**：Scale SEAL public、Scale commercial、vendor scaffold 分数差距可达 10-30 个点，必须注明口径。
4. **Opus 4.8 是当前可用综合第一**：AA v4.1、SWE Verified、vendor Pro 都显示 Opus 4.8 处在可用模型前列。
5. **GPT-5.5 是强竞争者**：AA v4.1 与 Opus 4.8 只差 1 分，SWE Pro vendor 58.6%，价格低于 Opus 输出价。
6. **Gemini 3.1 Pro 的优势是成本/推理**：GPQA 94.3%、$2/$12 价格，使其适合高量推理任务。
7. **Open-weight 阵营进入 frontier 边缘**：Kimi K2.6、MiniMax M3、DeepSeek V4 Pro 在 Verified/AA/GPQA 上接近闭源模型，但独立 Pro 覆盖仍不足。

---

## 新模型/变化速览（2026年5-6月）

| 模型/事件 | 日期 | 亮点 |
|-----------|------|------|
| **Claude Fable 5** | 2026-06-09 | 多项 benchmark 第一；随后因可用性限制暂停 |
| **Claude Opus 4.8** | 2026-05-28 | 当前可用综合最强候选，SWE Verified 88.6%，vendor Pro 69.2% |
| **Artificial Analysis v4.1** | 2026-06-16 | 权重转向 agentic workloads，加入/升级 GDPval-AA v2、Terminal-Bench 2.1、τ³-Bench Banking |
| **MiniMax M3** | 2026-06 | open-weight 领先组，AA v4.1 44；SWE-bench Pro 独立覆盖仍待补齐 |
| **Kimi K2.6 / K2.7 Code** | 2026-05/06 | open-weight coding 重点关注，Verified 进入 78-80% 区间 |
| **Qwen3.7 Max Preview** | 2026-06 | Arena 1474±10，完整 GPQA/SWE 待确认 |
| **NVIDIA Nemotron 3 Ultra** | 2026-06 | 美国 open-weight 新高，AA Index 48（changelog） |

---

## 待探索

- [ ] Claude Fable 5 恢复访问与否，以及停用事件后各榜单是否保留其排名
- [ ] Claude Opus 4.8 / GPT-5.5 / Gemini 3.1 Pro 在统一 SWE-bench Pro SEAL 上的完整直接对比
- [ ] Kimi K2.6、MiniMax M3、DeepSeek V4 Pro 的独立 SWE-bench Pro 结果
- [ ] GPT-o3-pro、o4-mini 等 o 系列在新 agentic benchmark（GDPval-AA v2、τ³-Bench）下的表现
- [ ] 各模型真实部署成本：tokenizer 差异、cache 命中、工具调用开销、latency

---

## 相关链接

- LMArena： https://lmarena.ai
- Cherry Studio LMArena mirror： https://docs.cherry-ai.com/docs/en-us/other/lmarena
- Artificial Analysis Intelligence Index： https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index
- Artificial Analysis v4.1 说明： https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v4-1
- Vals.ai SWE-bench Verified： https://vals.ai/benchmarks/swebench
- SWE-bench 官方 Verified： https://www.swebench.com/verified
- SWE-bench Pro 汇总： https://www.morphllm.com/swe-bench-pro
- Awesome Agents 2026-06 月榜： https://awesomeagents.ai/leaderboards/overall-llm-rankings-jun-2026/
- 商业模型旧源（4月快照）： https://neuralstackly.com/
- Open LLM Leaderboard： https://www.onyx.app/open-llm-leaderboard
- 汇总排名： https://www.datalearner.com/leaderboards
