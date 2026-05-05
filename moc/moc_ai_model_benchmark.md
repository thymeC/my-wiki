# AI Model Benchmark 主流模型评测结果

> 来源：neuralstackly.com (2026-04-29) / ofox.ai (2026-04-22) / LMSYS Arena Live (2026-04)
> 状态：**2026年4月最新**

---

## 核心 Benchmark 说明

| Benchmark | 含义 | 说明 |
|-----------|------|------|
| **MMLU** | 57 学科通识知识理解 | 90%+ 顶尖 |
| **MATH** | 竞赛级数学题（Level 5 最难） | 95%+ 顶尖 |
| **GPQA Diamond** | 研究生级别科学问答（专家约 65-70%） | 85%+ 超越专家 |
| **HumanEval** | 164 道 Python 编程挑战 | 90%+ 顶尖 |
| **SWE-bench Verified** | 真实 GitHub Issues 自主解决率 | 75%+ 顶尖 |
| **Arena Elo** | LMSYS 盲测用户投票（越大越好） | 1400+ 顶尖 |
| **AA Intelligence Index** | Artificial Analysis 综合推理指数 | 50+ 顶尖 |
| **SimpleQA** | 事实准确性（越低越好，测 hallucination） | — |

> 💡 **2026年4月关键变化**：GPT-5.5、Claude Opus 4.7、Gemini 3.1 Pro 三足鼎立；开源 Kimi K2.6 进入第一梯队；DeepSeek V4 强势开源；GPT-o 系列新秀登场。

---

## 综合榜单（2026年4月）

### Overall 榜单 — neuralstackly 综合评分

| 排名 | 模型 | 公司 | MMLU | HumanEval | MATH | GPQA | Arena Elo | 综合分 | \$/1M In |
|------|------|------|------|-----------|------|------|-----------|--------|---------|
| 1 | **GPT-5.5 High** | OpenAI | 89.1 | 89.7 | 93.2 | 81.5 | 1488 | **98.1** | $2.49 |
| 2 | **Claude Opus 4.6** | Anthropic | 95.6 | 96.4 | 98.2 | 91.0 | 1493 | **94.2** | $15.00 |
| 3 | **Gemini 3.1 Pro** | Google | 94.3 | 93.2 | 98.1 | 94.1 | 1493 | **94.2** | $2.50 |
| 4 | **GPT-5.4** | OpenAI | 93.8 | 96.3 | 97.9 | 92.8 | 1467 | **94.2** | $2.50 |
| 5 | **Claude Opus 4.7** | Anthropic | 94.2 | 95.1 | 97.6 | 90.5 | 1496 | **90.3** | $15.00 |
| 6 | **Kimi K2.6** | Moonshot AI | 91.8 | 90.1 | 96.5 | 85.4 | **1529** | **88.5** | $0.95 |
| 6 | **GPT-5.3 Codex** | OpenAI | 91.2 | 95.8 | 96.2 | 84.8 | 1300 | **88.5** | $3.00 |
| 8 | **Grok 4.20** | xAI | 91.2 | 91.5 | 95.1 | 79.4 | 1481 | **88.0** | $3.00 |
| 9 | **GPT-5.4-mini** | OpenAI | 92.1 | 94.8 | 98.0 | 91.4 | 1438 | **81.5** | $1.75 |
| 10 | **Claude Sonnet 4.6** | Anthropic | 91.8 | 93.8 | 97.8 | 89.9 | 1463 | **84.6** | $6.00 |
| 10 | **Muse Spark** | Meta | 91.8 | 92.1 | 95.4 | 80.7 | 1489 | **84.6** | **$0.00**（免费） |
| 10 | **Qwen 3.6 Max** | 阿里 | 90.5 | 90.8 | 94.6 | 77.2 | 1362 | **84.6** | $1.60 |
| 10 | **DeepSeek V4 Pro** | DeepSeek | — | — | — | — | 1463 | **84.6** | **$0.43** |
| 14 | **Claude Sonnet 4.5** | Anthropic | 89.1 | 90.8 | 97.7 | 83.4 | 1453 | **83.8** | $3.00 |
| 15 | **GLM-5** | 智谱 | 89.7 | 88.1 | 94.5 | 86.2 | 1534 | **82.7** | $2.15 |
| 17 | **GLM-5.1** | 智谱 | 91.2 | 90.5 | 95.3 | 77.8 | 1470 | **80.8** | $1.00 |
| 18 | **MiniMax M2.7** | MiniMax | 89.2 | 86.8 | 93.5 | 82.1 | 1250 | **80.8** | **$0.32** |
| 20 | **DeepSeek V3** | DeepSeek | 85.1 | 84.2 | 88.5 | 72.4 | 1424 | **79.4** | **$0.27** |
| 21 | **Grok 4** | xAI | 88.0 | 87.5 | 93.2 | 81.8 | 1460 | **78.8** | $3.00 |
| 23 | **DeepSeek V4 Flash** | DeepSeek | — | — | — | — | 1433 | **75.0** | **$0.14** |
| 24 | **Gemini 2.0 Ultra** | Google | 90.8 | 89.6 | 95.2 | 90.4 | 1473 | **73.1** | $0.50 |
| 24 | **Gemini 3 Flash** | Google | — | — | — | — | — | **73.1** | **$0.50** |
| 28 | **DeepSeek V3.2** | DeepSeek | 89.5 | 89.3 | 93.2 | 75.8 | 1423 | **65.4** | **$0.28** |
| 29 | **Gemini 2.5 Pro** | Google | 93.5 | 92.0 | 98.5 | 91.9 | 1486 | **63.5** | $2.00 |
| 30 | **Gemma 3 27B** | Google | 80.5 | 79.8 | 83.8 | 68.5 | 950 | **59.6** | **$0.10** |
| 31 | **GPT-5.4 mini** | OpenAI | 87.2 | 88.5 | 91.5 | 79.8 | 1456 | **28.8** | $1.69 |
| 31 | **Mistral Large** | Mistral | 81.2 | 80.1 | 82.5 | 62.1 | 1415 | **28.8** | $2.00 |
| 37 | **Qwen 3.5 397B** | 阿里 | 89.5 | 88.9 | 95.6 | 88.4 | 1067 | **25.3** | $0.60 |
| 43 | **Llama 4 Maverick** | Meta | 87.2 | 86.1 | 91.5 | 78.2 | 1327 | **19.2** | **$0.20** |
| 45 | **Llama 3.1 405B** | Meta | 79.8 | 79.2 | 78.5 | 60.8 | 1333 | **17.3** | $3.00 |

### Chatbot Arena Elo 榜单（2026-04）

> LMSYS 真实用户盲测，人类偏好投票

| 排名 | 模型 | Elo |
|------|------|-----|
| 1 | **Claude Opus 4.7 Thinking** | **1504** |
| 2 | **Claude Opus 4.6 Thinking** | 1502 |
| 3 | **Claude Opus 4.7** | 1497 |
| 4 | **Claude Opus 4.6** | 1496 |
| 5 | **Muse Spark** | 1493 |
| 6 | **Gemini 3.1 Pro Preview** | 1493 |
| 7 | **Gemini 3 Pro** | 1486 |
| 8 | **Grok 4.20** | 1482 |
| 9 | **GPT-5.4 High** | 1482 |
| 10 | **Grok 4.20 Reasoning** | 1480 |

### SWE-bench Verified 编程榜单（2026-04）

> 真实 GitHub Issues 自主解决率

| 排名 | 模型 | SWE-bench Verified |
|------|------|-------------------|
| 1 | **Claude Opus 4.7** | **82.0%** |
| 2 | **Gemini 3.1 Pro Preview** | 78.8% |
| 3 | **Claude Opus 4.6 Thinking** | 78.2% |
| 4 | **GPT-5.4** | 78.2% |
| 5 | **GPT-5.3 Codex** | 78.0% |

### Artificial Analysis Intelligence Index（2026-04）

> 综合推理指数

| 模型 | AA Index |
|------|----------|
| Claude Opus 4.7 | **57** |
| Gemini 3.1 Pro Preview | **57** |
| GPT-5.4 | **57** |
| Kimi K2.6 | **54** |
| Claude Opus 4.6 | 53 |
| GPT-5.3 Codex | 53 |
| DeepSeek V4 Pro | 52 |

---

## 分项冠军（2026年4月）

| 场景 | 冠军 | 分数 |
|------|------|------|
| **综合得分** | GPT-5.5 High | 98.1 |
| **用户偏好 Arena** | Claude Opus 4.7 Thinking | 1504 Elo |
| **编程 SWE-bench** | Claude Opus 4.7 | 82.0% |
| **数学 MATH** | Claude Opus 4.6 | 98.2% |
| **科学推理 GPQA** | Gemini 3.1 Pro | 94.1% |
| **推理综合 AA Index** | Claude 4.7 / Gemini 3.1 / GPT-5.4 | 并列 57 |
| **开源第一** | Kimi K2.6 | Arena 1529 / AA Index 54 |
| **性价比第一** | DeepSeek V4 Flash | $0.14/M / Arena 1433 |
| **免费最强** | Muse Spark (Meta) | $0 / 综合 84.6 |
| **超长上下文** | Gemini 3.1 Pro | 1M token |
| **最新开源** | DeepSeek V4 Pro | 2026-04-24 |

---

## 关键洞察（2026年4月）

1. **三足鼎立**：Claude Opus 4.7、Gemini 3.1 Pro、GPT-5.4 在 AA Index 并列第一（57分），纯benchmark难分伯仲
2. **Anthropic 用户粘性最强**：Arena Elo 前5名 Anthropic 占4席，用户体验护城河深
3. **开源新王 Kimi K2.6**：1T MoE / 32B 激活参数，Arena Elo 1529（全场最高），进入第一梯队
4. **DeepSeek V4 搅局**：2026-04-24 发布，Pro 版本 $0.43/M，Flash $0.14/M，开源最强价格杀手
5. **Meta 免费入场**：Muse Spark 综合 84.6 分完全免费，不可忽视
6. **GPT-5.5 是新天花板**：综合 98.1 分，GPT-5 系列已到 5.5 代
7. **o系列推理模型待独立评测**：o3-pro、o4-mini 等尚未有独立 benchmark 分数（n=0）

---

## 新模型速览（2026年4月新发布）

| 模型 | 发布日期 | 亮点 |
|------|----------|------|
| **DeepSeek V4** | 2026-04-24 | 开源最强，MoE，Pro $0.43/M，Flash $0.14/M |
| **Claude Opus 4.7** | 2026-04-16 | SWE-bench 82%，Arena 1504 |
| **Muse Spark** | 2026-04 | Meta 免费模型，综合 84.6 |
| **GLM-5 / GLM-5.1** | 2026-04 | 智谱最新，Arena 1534（全场最高 Elo）|
| **Qwen 3.6 Max** | 2026-04 | 阿里闭源旗舰，综合 84.6 |
| **Grok 4.20** | 2026-04 | xAI 推理增强版，Arena 1482 |

---

## 待探索

- [ ] GPT-5.5、Claude Opus 4.7 完整独立评测数据（当前多为 vendor-reported）
- [ ] GPT-o3-pro、o4-mini 等新 o 系列独立 benchmark
- [ ] 端侧/本地部署模型评测（Llama 4 Scout、Gemma 3）
- [ ] 各模型实际部署成本对比

---

## 相关链接

- 商业模型排名：https://neuralstackly.com/benchmarks
- 开源模型排名：https://www.onyx.app/open-llm-leaderboard
- LM Arena：https://lmarena.ai
- 汇总排名：https://www.datalearner.com/leaderboards
- ofox.ai 2026-04 排名：https://ofox.ai/blog/llm-leaderboard-best-ai-models-ranked-2026/
