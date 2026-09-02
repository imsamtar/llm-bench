import { mkdirSync } from "node:fs";
import { join } from "node:path";
import type { RunResult, RunSummary } from "./types.ts";

const CATEGORY_LABELS: Record<string, string> = {
  "coding-implementation": "Coding · Implementation",
  "coding-algorithm": "Coding · Algorithm",
  "coding-bugfix": "Coding · Bugfix",
  agentic: "Agentic / Tool-use",
  "code-reading": "Code Comprehension",
  reasoning: "Reasoning",
  math: "Mathematics",
  knowledge: "Knowledge",
};

function esc(s: unknown): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function writeHtmlReport(
  outDir: string,
  summary: RunSummary,
  results: RunResult[],
  meta: { version: string; totalAvailable: number; filter?: string },
) {
  mkdirSync(outDir, { recursive: true });
  const filename = `llm-bench_${summary.timestamp}_${slug(summary.modelId)}.html`;
  const html = buildHtml(summary, results, meta);
  Bun.write(join(outDir, filename), html);
  return join(outDir, filename);
}

function slug(s: string): string {
  return s.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 48);
}

function buildHtml(summary: RunSummary, results: RunResult[], meta: { version: string; totalAvailable: number; filter?: string }): string {
  const catKeys = Object.keys(summary.byCategory);
  const catPct = catKeys.map((k) => {
    const c = summary.byCategory[k]!;
    return { label: CATEGORY_LABELS[k] ?? k, key: k, pct: c.max === 0 ? 0 : (c.score / c.max) * 100, score: c.score, max: c.max };
  });
  catPct.sort((a, b) => b.pct - a.pct);

  const passCount = results.filter((r) => r.pass).length;
  const partialCount = results.filter((r) => !r.pass && r.fraction > 0).length;
  const failCount = results.filter((r) => r.fraction === 0 && r.verdict !== "ERROR").length;
  const errCount = results.filter((r) => r.verdict === "ERROR").length;

  const byDiff = { 1: [0, 0, 0], 2: [0, 0, 0], 3: [0, 0, 0] } as Record<number, number[]>;
  for (const r of results) {
    byDiff[r.difficulty][r.fraction === 1 ? 0 : r.fraction > 0 ? 1 : 2]++;
  }

  const resultsRows = [...results]
    .slice()
    .sort((a, b) => b.fraction - a.fraction)
    .map(
      (r) => `
    <article class="card task ${verdictClass(r)}" data-cat="${esc(r.category)}" data-verdict="${esc(r.verdict)}">
      <header class="task-head">
        <div>
          <span class="chip cat">${esc(CATEGORY_LABELS[r.category] ?? r.category)}</span>
          <span class="chip diff d${r.difficulty}">Level ${r.difficulty}</span>
          <span class="chip verdict">${esc(r.verdict)}</span>
          ${r.casesTotal ? `<span class="chip">${r.casesPassed}/${r.casesTotal} cases</span>` : ""}
        </div>
        <div class="task-score">${(r.fraction * 100).toFixed(0)}<span class="unit">%</span></div>
      </header>
      <h3 class="task-title">${esc(r.taskId)} · ${esc(r.title)}</h3>
      <details>
        <summary>Prompt</summary>
        <pre class="prompt">${esc(r.prompt)}</pre>
      </details>
      <details>
        <summary>Model answer${r.error ? " (error)" : ""}</summary>
        <pre class="answer">${esc(r.modelAnswer || "(no answer)")}</pre>
        ${r.error ? `<div class="error">${esc(r.error)}</div>` : ""}
      </details>
    </article>`,
    )
    .join("\n");

  const catData = JSON.stringify(catPct.map((c) => c.pct)).replace(/</g, "\\u003c");
  const catLabels = JSON.stringify(catPct.map((c) => c.label)).replace(/</g, "\\u003c");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>LLM Intelligence Benchmark — ${esc(summary.modelId)}</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
<style>
  :root{
    --bg:#0b0e14; --panel:#121724; --panel2:#171d2e; --line:#232b3f;
    --text:#e7ecf5; --muted:#8b95ab; --brand:#5b8cff; --good:#34d399; --warn:#fbbf24; --bad:#f87171;
  }
  *{box-sizing:border-box}
  body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.5}
  .wrap{max-width:1080px;margin:0 auto;padding:32px 20px 80px}
  .topbar{display:flex;align-items:center;gap:16px;margin-bottom:8px}
  .logo{font-weight:700;letter-spacing:.3px;font-size:18px}
  .logo .dot{color:var(--brand)}
  .sub{color:var(--muted);font-size:13px}
  .hero{display:grid;grid-template-columns:auto 1fr;gap:28px;align-items:center;background:linear-gradient(135deg,var(--panel), var(--panel2));border:1px solid var(--line);border-radius:20px;padding:28px;margin-top:20px}
  .gauge{width:170px;height:170px;position:relative}
  .gauge canvas{width:100%!important;height:100%!important}
  .gauge .lbl{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
  .gauge .pct{font-size:38px;font-weight:800}
  .gauge .of{font-size:12px;color:var(--muted)}
  .meta h1{margin:0 0 6px;font-size:24px;word-break:break-all}
  .meta .stat{display:flex;gap:28px;flex-wrap:wrap;margin-top:12px}
  .stat b{display:block;font-size:22px}
  .stat span{color:var(--muted);font-size:12px}
  .section{margin-top:40px}
  .section h2{font-size:16px;text-transform:uppercase;letter-spacing:1px;color:var(--muted);font-weight:600}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:14px}
  .chart-card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:18px}
  .chart-card h3{margin:0 0 10px;font-size:13px;color:var(--muted);font-weight:600}
  .chart-card .box{position:relative;height:240px}
  .donut-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:10px}
  .legend{font-size:12px;color:var(--muted)}
  .legend i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px}
  .toolbar{position:sticky;top:0;background:rgba(11,14,20,.9);backdrop-filter:blur(8px);padding:12px 0;z-index:5;margin-top:34px;border-bottom:1px solid var(--line)}
  .toolbar input{background:var(--panel2);border:1px solid var(--line);color:var(--text);padding:9px 12px;border-radius:10px;width:100%;font-size:14px}
  .tasks{margin-top:18px;display:flex;flex-direction:column;gap:14px}
  .card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:18px}
  .task-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
  .chip{font-size:11px;padding:3px 9px;border-radius:999px;border:1px solid var(--line);color:var(--muted);margin-right:4px;white-space:nowrap}
  .chip.cat{color:var(--brand);border-color:rgba(91,140,255,.35)}
  .chip.d1{color:var(--good)} .chip.d2{color:var(--warn)} .chip.d3{color:var(--bad)}
  .chip.verdict{font-weight:600}
  .task-score{font-size:26px;font-weight:800;flex-shrink:0}
  .task-score .unit{font-size:13px;color:var(--muted)}
  .task-title{margin:12px 0 8px;font-size:15px}
  details{margin-top:8px;border:1px solid var(--line);border-radius:10px;overflow:hidden}
  summary{cursor:pointer;padding:9px 12px;font-size:13px;color:var(--muted);background:var(--panel2)}
  summary:hover{color:var(--text)}
  pre{white-space:pre-wrap;word-break:break-word;margin:0;padding:14px;font-size:12.5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#0a0d13;color:#cdd6e4;max-height:420px;overflow:auto}
  pre.prompt{color:#9fb4d8}
  .error{color:var(--bad);padding:8px 12px;font-size:12px}
  tr.pass .task-score{color:var(--good)}
</style>
</head>
<body>
<div class="wrap">
  <div class="topbar">
    <div class="logo">LLM<span class="dot">·</span>BENCH <span style="color:var(--muted);font-weight:400;font-size:13px">v${meta.version}</span></div>
  </div>
  <div class="sub">Run at ${esc(summary.iso)} · ${esc(summary.baseUrl)}${meta.filter ? ` · filter: ${esc(meta.filter)}` : ""}</div>

  <div class="hero">
    <div class="gauge"><canvas id="gauge"></canvas><div class="lbl"><div class="pct">${summary.overallPct.toFixed(1)}</div><div class="of">of 100%</div></div></div>
    <div class="meta">
      <h1>${esc(summary.modelId)}</h1>
      <div class="stat">
        <div><b>${summary.totalTasks}</b><span>tasks run</span></div>
        <div><b>${summary.totalScore.toFixed(1)}</b><span>points of ${summary.totalMax.toFixed(0)}</span></div>
        <div><b>${passCount}</b><span>full passes</span></div>
        <div><b>${partialCount}</b><span>partial</span></div>
        <div><b>${failCount}</b><span>failed</span></div>
        <div><b>${errCount}</b><span>errors</span></div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Performance by category</h2>
    <div class="grid2">
      <div class="chart-card"><h3>Score by category (%)</h3><div class="box"><canvas id="cat"></canvas></div></div>
      <div class="chart-card"><h3>Difficulty breakdown</h3><div class="box"><canvas id="diff"></canvas></div></div>
    </div>
  </div>

  <div class="section">
    <h2>Verdict distribution</h2>
    <div class="chart-card" style="max-width:480px"><div class="box" style="height:200px"><canvas id="donut"></canvas></div></div>
  </div>

  <div class="section toolbar">
    <input id="search" type="search" placeholder="Filter by task id, title, category, or verdict…"/>
  </div>

  <div class="section">
    <h2>All questions &amp; answers <span style="text-transform:none;color:var(--muted)">(${results.length})</span></h2>
    <div class="tasks">${resultsRows}</div>
  </div>
</div>

<script>
const catLabels = ${catLabels};
const catPct = ${catData};

new Chart(document.getElementById("gauge"), {
  type: "doughnut",
  data: { datasets: [{ data: [${summary.overallPct}, ${(100 - summary.overallPct).toFixed(2)}], backgroundColor: ["#5b8cff", "#171d2e"], borderWidth: 0 }] },
  options: { cutout: "78%", plugins: { legend: { display: false }, tooltip: { enabled: false } }, animation: { duration: 900 } }
});

new Chart(document.getElementById("cat"), {
  type: "bar",
  data: { labels: catLabels, datasets: [{ label: "Score %", data: catPct, backgroundColor: "#5b8cff", borderRadius: 8, maxBarThickness: 44 }] },
  options: { indexAxis: "y", responsive: true, maintainAspectRatio: false, scales: { x: { max: 100, grid: { color: "#1f2737" }, ticks: { color: "#8b95ab" } }, y: { grid: { display: false }, ticks: { color: "#cdd6e4" } } }, plugins: { legend: { display: false } } }
});

new Chart(document.getElementById("diff"), {
  type: "bar",
  data: { labels: ["Level 1", "Level 2", "Level 3"], datasets: [
    { label: "Pass", data: [${byDiff[1][0]},${byDiff[2][0]},${byDiff[3][0]}], backgroundColor: "#34d399" },
    { label: "Partial", data: [${byDiff[1][1]},${byDiff[2][1]},${byDiff[3][1]}], backgroundColor: "#fbbf24" },
    { label: "Fail", data: [${byDiff[1][2]},${byDiff[2][2]},${byDiff[3][2]}], backgroundColor: "#f87171" }
  ] },
  options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true, grid: { color: "#1f2737" }, ticks: { color: "#cdd6e4" } }, y: { stacked: true, grid: { color: "#1f2737" }, ticks: { color: "#8b95ab" } } } }
});

new Chart(document.getElementById("donut"), {
  type: "doughnut",
  data: { labels: ["PASS","PARTIAL","FAIL","ERROR"], datasets: [{ data: [${passCount},${partialCount},${failCount},${errCount}], backgroundColor: ["#34d399","#fbbf24","#f87171","#8b95ab"], borderWidth: 0 }] },
  options: { cutout: "62%", responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
});

const search = document.getElementById("search");
search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  document.querySelectorAll(".task").forEach((el) => {
    const hay = el.textContent.toLowerCase();
    el.style.display = !q || hay.includes(q) ? "" : "none";
  });
});
</script>
</body>
</html>`;
}

function verdictClass(r: RunResult): string {
  if (r.verdict === "PASS") return "tr pass";
  if (r.verdict === "ERROR") return "tr err";
  if (r.verdict === "PARTIAL") return "tr part";
  return "tr fail";
}
