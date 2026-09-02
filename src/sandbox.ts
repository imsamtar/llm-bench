import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { CodeSpec } from "./types.ts";

export interface SandboxOutcome {
  ok: boolean;
  results?: unknown[];
  error?: string;
  timedOut?: boolean;
}

const BENCH_JSON = "__BENCH_JSON__";

/** Strip markdown code fences and return the runnable source. */
export function extractCode(raw: string): string {
  const fenceRegex = /```(?:[a-zA-Z0-9_+-]*)?[^\n]*\n([\s\S]*?)```/g;
  const blocks: string[] = [];
  let m: RegExpExecArray | null;
  let hasFence = false;
  while ((m = fenceRegex.exec(raw)) !== null) {
    hasFence = true;
    blocks.push(m[1]!.replace(/\n+$/, ""));
  }
  if (hasFence) return blocks[0] ?? raw;
  return raw.trim();
}

function jsHarness(spec: CodeSpec): string {
  const fn = spec.funcName ?? "solution";
  return `
import { ${fn} } from "./solution.mjs";
const _cases = await Bun.file("./cases.json").json();
const _out = _cases.map((c) => {
  try { return { ok: true, v: ${fn}(...c.args) }; }
  catch (e) { return { ok: false, e: String(e && e.message || e) }; }
});
console.log("__BENCH_JSON__" + JSON.stringify(_out));
`;
}

function pyHarness(spec: CodeSpec): string {
  const fn = spec.funcName ?? "solution";
  return `
from solution import ${fn} as _fn
import json
_cases = json.load(open("cases.json"))
def _run(c):
    try:
        return {"ok": True, "v": _fn(*c["args"])}
    except Exception as e:
        return {"ok": False, "e": str(e)}
_out = [_run(c) for c in _cases]
print("__BENCH_JSON__" + json.dumps(_out, default=str))
`;
}

function parseStdout(stdout: string): { results: unknown[]; error?: string } {
  const idx = stdout.indexOf(BENCH_JSON);
  if (idx === -1) {
    return { results: [], error: `No machine-readable result.\nSTDOUT:\n${stdout.slice(0, 1500)}` };
  }
  const start = idx + BENCH_JSON.length;
  let end = stdout.indexOf("\n", start);
  if (end === -1) end = stdout.length;
  const line = stdout.slice(start, end).trim();
  try {
    return { results: JSON.parse(line) as unknown[] };
  } catch (e) {
    return { results: [], error: `Bad result JSON: ${line.slice(0, 500)} (${String(e)})` };
  }
}

async function run(cmd: string[], cwd: string, timeoutMs: number) {
  const proc = Bun.spawn(cmd, {
    cwd,
    stdout: "pipe",
    stderr: "pipe",
    env: { ...process.env, HTTP_PROXY: "", HTTPS_PROXY: "", ALL_PROXY: "", NO_PROXY: "*" },
  });
  let stdout = "";
  let stderr = "";
  const dec = new TextDecoder();
  const collectOut = (async () => {
    for await (const chunk of proc.stdout) stdout += dec.decode(chunk);
  })();
  const collectErr = (async () => {
    for await (const chunk of proc.stderr) stderr += dec.decode(chunk);
  })();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    try { proc.kill(); } catch {}
  }, timeoutMs);
  await Promise.all([proc.exited.catch(() => 1), collectOut, collectErr]).catch(() => {});
  clearTimeout(timer);
  return { stdout, stderr, timedOut };
}

export async function evaluateCode(
  rawAnswer: string,
  spec: CodeSpec,
  internalCases: unknown[],
): Promise<SandboxOutcome> {
  const code = extractCode(rawAnswer);
  const dir = mkdtempSync(join(tmpdir(), "llmbench-"));
  const timeoutMs = (spec.timeoutSec ?? 60) * 1000;
  try {
    writeFileSync(join(dir, "cases.json"), JSON.stringify(internalCases));
    if (spec.lang === "javascript") {
      writeFileSync(join(dir, "solution.mjs"), code);
      writeFileSync(join(dir, "main.mjs"), jsHarness(spec));
      const r = await run(["bun", "run", "main.mjs"], dir, timeoutMs);
      const p = parseStdout(r.stdout);
      const err = p.error
        ? `${p.error}\n${r.stderr ? `STDERR:\n${r.stderr.slice(0, 1200)}` : ""}`
        : undefined;
      return { ok: !p.error, results: p.results, error: err, timedOut: r.timedOut };
    } else if (spec.lang === "python") {
      writeFileSync(join(dir, "solution.py"), code);
      writeFileSync(join(dir, "main.py"), pyHarness(spec));
      const r = await run(["python3", "main.py"], dir, timeoutMs);
      const p = parseStdout(r.stdout);
      const err = p.error
        ? `${p.error}\n${r.stderr ? `STDERR:\n${r.stderr.slice(0, 1200)}` : ""}`
        : undefined;
      return { ok: !p.error, results: p.results, error: err, timedOut: r.timedOut };
    }
    return { ok: false, error: `Unsupported lang: ${spec.lang}` };
  } finally {
    try { rmSync(dir, { recursive: true, force: true }); } catch {}
  }
}
