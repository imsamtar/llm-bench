import type { Task, RunResult } from "./types.ts";
import { evaluateCode } from "./sandbox.ts";

function norm(v: unknown): unknown {
  if (v === null || v === undefined) return "__undefined__";
  if (typeof v === "bigint") return String(v);
  if (typeof v === "number") {
    if (Number.isNaN(v)) return "__nan__";
    if (!Number.isFinite(v)) return String(v);
    return v;
  }
  if (Array.isArray(v)) return v.map(norm);
  if (typeof v === "object") {
    const o: Record<string, unknown> = {};
    for (const k of Object.keys(v as Record<string, unknown>).sort()) {
      o[k] = norm((v as Record<string, unknown>)[k]);
    }
    return o;
  }
  return v;
}

function deepEq(a: unknown, b: unknown): boolean {
  return JSON.stringify(norm(a)) === JSON.stringify(norm(b));
}

function gradeMc(task: Task, answer: string): { fraction: number; verdict: string } {
  const opts = task.options!;
  const ai = task.correctIndex!;
  const correctText = opts[ai];
  const a = answer.trim();
  const al = a.toLowerCase();
  // Try letter: "b" or "b. ..." or "(b)"
  const letterMatch = a.match(/^\s*\(?([a-zA-Z])\)?[.\s)]/);
  if (letterMatch) {
    const idx = letterMatch[1]!.toLowerCase().charCodeAt(0) - 97;
    if (idx === ai) return { fraction: 1, verdict: "PASS" };
  }
  // Try text match
  const ca = al.replace(/[^a-z0-9 ]/g, " ");
  const ct = correctText.toLowerCase().replace(/[^a-z0-9 ]/g, " ");
  if (ca.includes(ct)) return { fraction: 1, verdict: "PASS" };
  return { fraction: 0, verdict: "FAIL" };
}

function gradeFreeform(task: Task, answer: string): { fraction: number; verdict: string } {
  const a = answer.toLowerCase();
  const required = task.requiredKeywords ?? [];
  if (required.length === 0) {
    // No keywords: give benefit based on non-empty, or reference substring.
    const ref = (task.reference ?? "").toLowerCase();
    if (!ref) return { fraction: a.trim() ? 1 : 0, verdict: a.trim() ? "PASS" : "FAIL" };
    return { fraction: a.includes(ref) ? 1 : 0, verdict: a.includes(ref) ? "PASS" : "FAIL" };
  }
  let hits = 0;
  for (const k of required) if (a.includes(k.toLowerCase())) hits++;
  const fraction = hits / required.length;
  return {
    fraction,
    verdict: fraction === 1 ? "PASS" : fraction === 0 ? "FAIL" : "PARTIAL",
  };
}

export async function gradeTask(task: Task, modelAnswer: string): Promise<Omit<RunResult, "taskId" | "category" | "difficulty" | "title" | "maxScore" | "prompt" | "modelAnswer" | "durationMs">> {
  if (task.type === "code" && task.code) {
    const spec = task.code;
    const total = spec.cases.length;
    const out = await evaluateCode(modelAnswer, spec, spec.cases);
    if (!out.ok || !out.results) {
      return {
        score: 0, fraction: 0, pass: false,
        casesPassed: 0, casesTotal: total,
        verdict: "FAIL", error: out.error,
      };
    }
    let passed = 0;
    for (let i = 0; i < total; i++) {
      const expected = spec.cases[i]!.expected;
      const got = out.results[i] as { ok?: boolean; v?: unknown; e?: string } | undefined;
      if (got && got.ok && deepEq(norm(got.v), norm(expected))) passed++;
    }
    const fraction = total === 0 ? 0 : passed / total;
    return {
      score: task.maxScore * fraction,
      fraction,
      pass: passed === total,
      casesPassed: passed,
      casesTotal: total,
      verdict: fraction === 1 ? "PASS" : fraction === 0 ? "FAIL" : "PARTIAL",
      error: undefined,
    };
  }
  if (task.type === "multiple_choice") {
    const { fraction, verdict } = gradeMc(task, modelAnswer);
    return { score: task.maxScore * fraction, fraction, pass: fraction === 1, verdict };
  }
  const { fraction, verdict } = gradeFreeform(task, modelAnswer);
  return { score: task.maxScore * fraction, fraction, pass: fraction === 1, verdict };
}
