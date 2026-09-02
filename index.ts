import { loadAllTasks, statsByCategory } from "./src/taskLoader.ts";
import { runBenchmark, summarize } from "./src/runner.ts";
import { writeHtmlReport } from "./src/reportHtml.ts";
import { appendCsvRows, appendSummaryRow, toCsvRow } from "./src/reportCsv.ts";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import type { CliArgs, Task } from "./src/types.ts";

const VERSION = "1.0.0";

function usage() {
  console.log(`
LLM Intelligence Benchmark v${VERSION}

Run 300+ tough, auto-graded tasks (mostly agentic/coding intelligence) against
any OpenAI-compatible chat-completions endpoint, then emit a beautiful HTML
report (with charts) and a cumulative CSV of scores.

Usage:
  bun index.ts --model <model> [options]
  bun index.ts list [--categories a,b,c]   # list available tasks

Options:
  --base-url <url>     OpenAI-compatible base URL (default: $OPENAI_BASE_URL or https://api.openai.com/v1)
  --api-key <key>      API key (default: $OPENAI_API_KEY or $LLM_API_KEY or $ANTHROPIC_API_KEY)
  --model <name>       Model id/name (required) — used in filenames & CSV
  --count <n>          Number of tasks to run (default: all)
  --categories <a,b>   Only these categories
  --difficulty <1,2,3> Only these difficulty levels
  --filter <contains>  Only tasks whose id/title contains this string
  --concurrency <n>    Parallel requests (default: 4)
  --out-dir <path>     Output directory for HTML+CSV (default: results)
  --seed <n>           Shuffle seed for selection (default: random)
  --timeout <sec>      Per-request timeout (default: 120)
`);
}

function envKey(): string | undefined {
  return process.env.LLM_API_KEY ?? process.env.OPENAI_API_KEY ?? process.env.ANTHROPIC_API_KEY;
}
function envBase(): string | undefined {
  return process.env.OPENAI_BASE_URL;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    baseUrl: envBase() ?? "https://api.openai.com/v1",
    apiKey: envKey() ?? "",
    model: "",
    concurrency: 4,
    outDir: "results",
    requestTimeoutSec: 120,
  };
  const take = (flag: string): string => {
    const i = argv.indexOf(flag);
    if (i === -1 || i + 1 >= argv.length) return "";
    return argv[i + 1]!;
  };
  const a = argv.slice();
  const model = take("--model");
  if (model) args.model = model;
  const base = take("--base-url");
  if (base) args.baseUrl = base;
  const key = take("--api-key");
  if (key) args.apiKey = key;
  const count = take("--count");
  if (count) args.count = parseInt(count, 10);
  const cats = take("--categories");
  if (cats) args.categories = cats.split(",").map((s) => s.trim()).filter(Boolean);
  const diffs = take("--difficulty");
  if (diffs) args.difficulty = diffs.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));
  const filter = take("--filter");
  if (filter) args.filter = filter;
  const conc = take("--concurrency");
  if (conc) args.concurrency = parseInt(conc, 10);
  const out = take("--out-dir");
  if (out) args.outDir = out;
  const to = take("--timeout");
  if (to) args.requestTimeoutSec = parseInt(to, 10);
  const seed = take("--seed");
  if (seed) (args as CliArgs & { seed?: string }).seed = seed;
  return args;
}

function selectTasks(all: Task[], args: CliArgs): Task[] {
  let tasks = all;
  if (args.categories && args.categories.length) {
    const set = new Set(args.categories);
    tasks = tasks.filter((t) => set.has(t.category));
  }
  if (args.difficulty && args.difficulty.length) {
    const set = new Set(args.difficulty);
    tasks = tasks.filter((t) => set.has(t.difficulty));
  }
  if (args.filter) {
    const f = args.filter.toLowerCase();
    tasks = tasks.filter((t) => t.id.toLowerCase().includes(f) || t.title.toLowerCase().includes(f));
  }
  const seed = (args as CliArgs & { seed?: string }).seed;
  if (seed) {
    let h = 0;
    for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    tasks = shuffle(tasks, h);
  } else {
    tasks = shuffle(tasks, Math.floor(Math.random() * 1e9));
  }
  if (args.count && args.count < tasks.length) tasks = tasks.slice(0, args.count);
  return tasks;
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = arr.slice();
  let s = seed || 1;
  const rnd = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

async function cmdList(argv: string[]): Promise<void> {
  const tasks = await loadAllTasks();
  const arg = parseArgs(argv);
  const sel = selectTasks(tasks, arg);
  const s = statsByCategory(sel);
  console.log(`Available: ${tasks.length} tasks. Selected: ${sel.length}\n`);
  for (const [cat, info] of Object.entries(s)) {
    console.log(`${cat.padEnd(26)} ${String(info.count).padStart(4)}   L1:${info.byDiff[1] ?? 0}  L2:${info.byDiff[2] ?? 0}  L3:${info.byDiff[3] ?? 0}`);
  }
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    usage();
    return;
  }
  if (argv[0] === "list") {
    await cmdList(argv.slice(1));
    return;
  }

  const args = parseArgs(argv);
  if (!args.model) {
    console.error("Error: --model is required.\n");
    usage();
    process.exit(1);
  }
  if (!args.apiKey) {
    console.error(
      "Error: no API key. Provide --api-key, or set LLM_API_KEY / OPENAI_API_KEY / ANTHROPIC_API_KEY.\n",
    );
    process.exit(1);
  }

  const all = await loadAllTasks();
  const selected = selectTasks(all, args);
  if (selected.length === 0) {
    console.error("No tasks matched the given filters.");
    process.exit(1);
  }

  mkdirSync(args.outDir, { recursive: true });
  console.log(`\nLLM Intelligence Benchmark v${VERSION}`);
  console.log(`Endpoint : ${args.baseUrl}`);
  console.log(`Model    : ${args.model}`);
  console.log(`Tasks    : ${selected.length} (of ${all.length} available)`);
  console.log(`Concurrency: ${args.concurrency}\n`);

  const started = Date.now();
  const results = await runBenchmark(selected, args, (done, total) => {
    const pct = total === 0 ? 100 : Math.round((done / total) * 100);
    process.stdout.write(`\r  progress ${String(done).padStart(String(total).length)}/${total}  (${pct}%)  `);
  });
  process.stdout.write("\n");

  const summary = summarize(results, args);

  // CSV: cumulative per-task results + one summary row
  const rows = results.map((r) => toCsvRow(r, summary.iso, summary.modelId, summary.baseUrl));
  appendCsvRows(args.outDir, "benchmark.csv", rows);
  appendSummaryRow(args.outDir, {
    timestamp: summary.timestamp,
    iso: summary.iso,
    modelId: summary.modelId,
    baseUrl: summary.baseUrl,
    totalTasks: summary.totalTasks,
    totalMax: summary.totalMax,
    totalScore: summary.totalScore,
    overallPct: summary.overallPct,
  });

  const htmlPath = writeHtmlReport(args.outDir, summary, results, {
    version: VERSION,
    totalAvailable: all.length,
    filter: args.filter,
  });

  const secs = ((Date.now() - started) / 1000).toFixed(1);
  console.log(`\nScore: ${summary.totalScore.toFixed(2)} / ${summary.totalMax.toFixed(0)}  (${summary.overallPct.toFixed(1)}%)`);
  console.log(`Elapsed: ${secs}s`);
  console.log(`Report : ${htmlPath}`);
  console.log(`CSV    : ${join(args.outDir, "benchmark.csv")}\n`);

  for (const key of Object.keys(summary.byCategory)) {
    const c = summary.byCategory[key]!;
    const pct = c.max === 0 ? 0 : (c.score / c.max) * 100;
    console.log(`  ${key.padEnd(24)} ${String(c.count).padStart(4)}  ${(c.score).toFixed(2).padStart(6)}/${String(c.max).padStart(4)}  ${pct.toFixed(1).padStart(5)}%`);
  }
}

await main();
