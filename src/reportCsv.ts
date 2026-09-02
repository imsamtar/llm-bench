import { appendFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import type { RunResult } from "./types.ts";

const COLS = [
  "timestamp",
  "iso",
  "model_id",
  "base_url",
  "category",
  "task_id",
  "title",
  "difficulty",
  "max_score",
  "score",
  "fraction",
  "pass",
  "verdict",
  "duration_ms",
] as const;

export function csvEscape(s: string): string {
  const str = String(s);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export function toCsvRow(r: RunResult, iso: string, modelId: string, baseUrl: string): string {
  const vals: Record<(typeof COLS)[number], string> = {
    timestamp: iso.replace(/[:.]/g, "-").slice(0, 19),
    iso,
    model_id: modelId,
    base_url: baseUrl,
    category: r.category,
    task_id: r.taskId,
    title: csvEscape(r.title),
    difficulty: String(r.difficulty),
    max_score: String(r.maxScore),
    score: String(Number(r.score.toFixed(4))),
    fraction: String(Number(r.fraction.toFixed(4))),
    pass: String(r.pass),
    verdict: r.verdict,
    duration_ms: String(Math.round(r.durationMs)),
  };
  return COLS.map((c) => csvEscape(vals[c])).join(",");
}

function fileExists(p: string): boolean {
  try {
    return existsSync(p) && Bun.file(p).size > 0;
  } catch {
    return false;
  }
}

/** Append the per-task result rows for a run to a cumulative CSV (adds header if new). */
export function appendCsvRows(outDir: string, file: string, rows: string[]) {
  mkdirSync(outDir, { recursive: true });
  const full = join(outDir, file);
  const header = COLS.join(",");
  if (rows.length === 0) return;
  if (!fileExists(full)) appendFileSync(full, header + "\n");
  appendFileSync(full, rows.join("\n") + "\n");
}

/** Append a summary row (one per run) to a separate cumulative scores CSV. */
export function appendSummaryRow(outDir: string, summary: {
  timestamp: string; iso: string; modelId: string; baseUrl: string;
  totalTasks: number; totalMax: number; totalScore: number; overallPct: number;
}) {
  mkdirSync(outDir, { recursive: true });
  const full = join(outDir, "benchmark-scores.csv");
  const header =
    "timestamp,iso,model_id,base_url,total_tasks,total_max,total_score,overall_pct";
  const row = [
    summary.timestamp,
    summary.iso,
    csvEscape(summary.modelId),
    csvEscape(summary.baseUrl),
    String(summary.totalTasks),
    String(Number(summary.totalMax.toFixed(2))),
    String(Number(summary.totalScore.toFixed(2))),
    String(Number(summary.overallPct.toFixed(2))),
  ].join(",");
  if (!fileExists(full)) appendFileSync(full, header + "\n");
  appendFileSync(full, row + "\n");
}
