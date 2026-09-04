# llm-bench — LLM Intelligence Benchmark

A tough, auto-graded benchmark for measuring the **agentic / coding intelligence** of
LLMs (plus a smaller slice of reasoning, math, code-reading, and knowledge problems)
against any **OpenAI-compatible** `chat/completions` endpoint.

Every run produces:

- an **HTML report** (with charts: overall gauge, per-category bars, difficulty
  breakdown, verdict donut, plus every question and the model's raw answer), and
- a single cumulative **CSV** of per-task scores with timestamp + model id.

---

## Highlight

**306 tasks** across 8 categories, weighted toward agentic + coding intelligence:

| Category | Count | Style |
|---|---|---|
| `coding-implementation` | 79 | write a function → graded by hidden tests |
| `coding-bugfix` | 57 | fix a subtly-buggy function → graded by hidden tests |
| `coding-algorithm` | 60 | tough algorithms → graded by hidden tests |
| `agentic` | 40 | multi-step agents / tool-use reasoning |
| `code-reading` | 20 | comprehend subtle code behavior |
| `reasoning` | 25 | logic puzzles, truth-tellers, probability |
| `math` | 15 | exact math (MC + code) |
| `knowledge` | 10 | precise CS / general facts |

Every coding task is **auto-graded deterministically**: the model writes a function
(in JavaScript or Python), which is executed in an isolated sandbox against hidden
test cases. Expected outputs are derived at load-time from verified reference
implementations, so grading is objective and repeatable. Levels 1–3 give a difficulty
curve (roughly ⅓ each, with genuine Level-3 traps).

---

## Requirements

- [Bun](https://bun.dev) (runtime, JS/Python sandboxing)
- `python3` available on `PATH` (only needed for Python-language tasks; JS tasks use Bun)
- An OpenAI-compatible endpoint (OpenAI, a local server like vLLM/ollama/LM Studio,
  or a provider exposing `/v1/chat/completions`)

## Quick start

```bash
bun install
bun index.ts --model gpt-4o --api-key $OPENAI_API_KEY
# or point at any OpenAI-compatible server:
bun index.ts --base-url http://localhost:8000/v1 --model my-model --api-key x
```

The API key can also be supplied via `LLM_API_KEY`, `OPENAI_API_KEY`, or
`ANTHROPIC_API_KEY`. Default base URL is `$OPENAI_BASE_URL` or `https://api.openai.com/v1`.

## Usage

```
bun index.ts --model <model> [options]
bun index.ts list                 # list tasks by category/difficulty
bun index.ts --help
```

Options:

| Flag | Description |
|---|---|
| `--base-url <url>` | OpenAI-compatible base URL (ends in `/v1`) |
| `--api-key <key>` | API key |
| `--model <name>` | Model id/name (used in filenames & CSV) — required |
| `--count <n>` | Number of tasks to run (default: all 306) |
| `--categories <a,b>` | Only these categories |
| `--difficulty <1,2,3>` | Only these difficulty levels |
| `--filter <txt>` | Only tasks whose id/title contains the string |
| `--concurrency <n>` | Parallel requests (default: 4) |
| `--out-dir <path>` | Output directory (default: `results`) |
| `--seed <s>` | Deterministic task selection shuffle |
| `--timeout <sec>` | Per-request timeout (default: 120) |

Examples:

```bash
# run every task against a local model
bun index.ts --base-url http://localhost:8000/v1 --model qwen2.5-coder:32b --api-key sk-local

# just the hard coding + agentic problems
bun index.ts --model gpt-4o --api-key $OPENAI_API_KEY \
  --categories coding-implementation,coding-algorithm,coding-bugfix,agentic --difficulty 3

# quick smoke run
bun index.ts --model gpt-4o-mini --api-key $OPENAI_API_KEY --count 20 --concurrency 8
```

## Outputs

All artifacts are written to `--out-dir` (default `results/`, git-ignored).

- **`llm-bench_<timestamp>_<model>.html`** — one per run. Beautiful dark-themed report
  with an overall score gauge, per-category score bars, difficulty breakdown, verdict
  donut, a live filter, and a fully expanded list of every question with the model's
  exact answer and its per-case score.
- **`benchmark.csv`** — the single cumulative per-task score file. One row per task
  with `timestamp`, `iso`, `model_id`, `base_url`, `category`, `task_id`, `title`,
  `difficulty`, `max_score`, `score`, `fraction`, `pass`, `verdict`, `duration_ms`.
  Runs append to the same file so you can compare models over time.
- **`benchmark-scores.csv`** — one summary row per run (overall score vs max, %).

## Development

```bash
bun run verify        # load & structurally validate all tasks (id/title/case integrity)
bun test              # pipeline tests (JS + Python sandbox grading, freeform grading)
bunx tsc --noEmit     # typecheck
bun scripts/mock-server.ts   # tiny fake OpenAI-compatible server for offline testing
bun index.ts --base-url http://127.0.0.1:8790/v1 --model mock --api-key x --count 5
```

### Adding tasks

Tasks live in `src/tasks/*.ts` and export an array of `Task` objects. Use the builders
in `src/tasks/helpers.ts`:

```ts
import { codeTaskDef as c, promptTask as p, mcTask as m } from "./helpers.ts";

// Auto-graded coding task — expected outputs derived from your reference
tasks.push(c({
  category: "coding-algorithm", difficulty: 3, title: "My hard problem",
  lang: "javascript", funcName: "solve", signature: "solve(a, b): number",
  prompt: "Write `solve(a, b)` ... Output ONLY the ES module exporting `solve`. ...",
  ref: (a, b) => { /* correct JS implementation */ },
  argSets: [ [1, 2], [3, 4] ],   // each = one test case's argument list
}));

// Freeform (keyword-graded)
tasks.push(p({
  category: "agentic", difficulty: 2, title: "Plan the rollout",
  prompt: "Scenario...", requiredKeywords: ["canary"], reference: "...",
}));

// Multiple-choice
tasks.push(m({
  category: "knowledge", difficulty: 2, title: "TCP vs UDP",
  prompt: "Which guarantee...", options: ["A", "B", "C", "D"], correctIndex: 1,
}));
```

`codeTaskDef` computes `expected = ref(...args)` at load time, so your `ref` must be
correct, deterministic, and JSON-serializable. Add 6–10 solid `argSets` including edge
cases.

## How grading works

- **Code tasks** (`type: "code"`): the model's answer (markdown fences stripped) is
  written to a temp dir, imported as `solution.mjs` (JS) or `solution.py` (Python),
  and the named function is called on every hidden test case. Score = fraction of
  cases passing (full credit requires all). The sandbox runs with a strict timeout and
  proxies disabled.
- **Multiple-choice**: the answer is compared by letter and/or option text.
- **Freeform**: partial credit by fraction of `requiredKeywords` present.

## Notes & limitations

- Executing model-generated code runs in a subprocess with a timeout, but it is not a
  hardened security sandbox — **do not run untrusted/unknown endpoints**.
- `noUncheckedIndexedAccess` is off in `tsconfig.json` so reference implementations
  (which rely on heavy index access and are runtime-only) typecheck comfortably.

## Sample results (306-task runs)

Headline overall ranking across the models benchmarked so far, followed by the
per-category breakdown. These are snapshot results from a single full run per model
and will drift; regenerate the tables by running the benchmark yourself.

### Overall

| rank | model | score | % | time |
|---|---|---|---|---|
| 1 | glm-5.3-flash | 273.25/306 | 89.3% | 3.9 min |
| 2 | Ornith-1.5-35B-A3B (local) | 270.25/306 | 88.3% | 28.7 min |
| 3 | Qwen3.6-35B-A3B-oQ4e (local) | 265.92/306 | 86.9% | 117.5 min |
| 4 | glm-5.3 | 263.38/306 | 86.1% | 12.7 min |
| 5 | qwen3.8-flash | 260.28/306 | 85.1% | 12.3 min |
| 6 | deepseek-v4-flash-vision-exp | 255.16/306 | 83.4% | 6.2 min |
| 7 | Qwen3.8-27B-oQ4e (local) | 218.23/306 | 71.3% | 304.8 min |

### coding-implementation

| rank | model | % |
|---|---|---|
| 1 | Ornith-1.5-35B (local) | 94.6% |
| 2 | glm-5.3-flash | 93.3% |
| 3 | qwen3.8-flash | 92.4% |
| 4 | glm-5.3 | 91.2% |
| 5 | Qwen3.6-35B (local) | 90.9% |
| 6 | deepseek-v4-flash | 89.7% |
| 7 | Qwen3.8-27B (local) | 76.8% |

### coding-bugfix

| rank | model | % |
|---|---|---|
| 1 | glm-5.3-flash | 99.2% |
| 2 | deepseek-v4-flash | 97.7% |
| 3 | Qwen3.6-35B (local) | 97.5% |
| 4 | Ornith-1.5-35B (local) | 96.1% |
| 5 | glm-5.3 | 95.9% |
| 5 | qwen3.8-flash | 95.9% |
| 7 | Qwen3.8-27B (local) | 82.2% |

### coding-algorithm

| rank | model | % |
|---|---|---|
| 1 | Qwen3.6-35B (local) | 92.3% |
| 2 | glm-5.3-flash | 90.9% |
| 3 | Ornith-1.5-35B (local) | 90.2% |
| 4 | deepseek-v4-flash | 89.6% |
| 5 | glm-5.3 | 88.2% |
| 6 | qwen3.8-flash | 83.2% |
| 7 | Qwen3.8-27B (local) | 64.9% |

### agentic

| rank | model | % |
|---|---|---|
| 1 | glm-5.3-flash | 93.8% |
| 2 | Ornith-1.5-35B (local) | 89.1% |
| 3 | Qwen3.6-35B (local) | 85.3% |
| 4 | qwen3.8-flash | 82.5% |
| 5 | glm-5.3 | 81.9% |
| 6 | deepseek-v4-flash | 79.7% |
| 7 | Qwen3.8-27B (local) | 69.4% |

### code-reading

| rank | model | % |
|---|---|---|
| 1 | qwen3.8-flash | 55.0% |
| 2 | glm-5.3-flash | 50.0% |
| 2 | Ornith-1.5-35B (local) | 50.0% |
| 2 | Qwen3.6-35B (local) | 50.0% |
| 2 | glm-5.3 | 50.0% |
| 2 | Qwen3.8-27B (local) | 50.0% |
| 7 | deepseek-v4-flash | 45.0% |

### reasoning

| rank | model | % |
|---|---|---|
| 1 | glm-5.3 | 80.0% |
| 1 | Qwen3.6-35B (local) | 80.0% |
| 1 | Ornith-1.5-35B (local) | 80.0% |
| 4 | glm-5.3-flash | 76.0% |
| 4 | qwen3.8-flash | 76.0% |
| 4 | Qwen3.8-27B (local) | 76.0% |
| 7 | deepseek-v4-flash | 68.0% |

### math

| rank | model | % |
|---|---|---|
| 1 | glm-5.3-flash | 100% |
| 1 | Qwen3.6-35B (local) | 100% |
| 1 | Ornith-1.5-35B (local) | 100% |
| 4 | glm-5.3 | 93.3% |
| 4 | qwen3.8-flash | 93.3% |
| 6 | deepseek-v4-flash | 80.0% |
| 6 | Qwen3.8-27B (local) | 80.0% |

### knowledge

| rank | model | % |
|---|---|---|
| 1 | glm-5.3-flash | 70.0% |
| 1 | glm-5.3 | 70.0% |
| 3 | Ornith-1.5-35B (local) | 60.0% |
| 4 | qwen3.8-flash | 56.7% |
| 5 | deepseek-v4-flash | 50.0% |
| 6 | Qwen3.6-35B (local) | 40.0% |
| 7 | Qwen3.8-27B (local) | 30.0% |

