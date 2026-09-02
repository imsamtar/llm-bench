import type { Task, CliArgs, RunResult, RunSummary } from "./types.ts";
import { chat } from "./client.ts";
import { gradeTask } from "./grader.ts";

function buildMessages(task: Task): { role: "system" | "user"; content: string }[] {
  let system = "";
  if (task.type === "code") {
    system =
      "You are an expert programmer being benchmarked. Follow the prompt's exact function signature and language. " +
      "Output ONLY the single function/module implementation as plain source code (no markdown fences, no explanation, no test code, no wrapper script). " +
      "The evaluator will import your code and call the specified function against hidden test cases, so correctness and exact names matter.";
  } else if (task.type === "multiple_choice") {
    system =
      "You are being benchmarked. Answer the question with the single best option. Prefer replying with just the letter (e.g. \"B\") optionally followed by the option text.";
  } else {
    system =
      "You are being benchmarked on reasoning and knowledge. Answer precisely and completely. Concise but self-contained answers are best.";
  }
  return [
    { role: "system", content: system },
    { role: "user", content: task.prompt },
  ];
}

export async function runTask(task: Task, args: CliArgs): Promise<RunResult> {
  const start = performance.now();
  let modelAnswer = "";
  let error: string | undefined;
  try {
    modelAnswer = await chat({
      baseUrl: args.baseUrl,
      apiKey: args.apiKey,
      model: args.model,
      messages: buildMessages(task),
      temperature: 0.2,
      maxTokens: 6000,
      timeoutMs: args.requestTimeoutSec * 1000,
    });
  } catch (e) {
    error = `Request error: ${e instanceof Error ? e.message : String(e)}`;
  }
  const durationMs = performance.now() - start;

  if (error) {
    return {
      taskId: task.id,
      category: task.category,
      difficulty: task.difficulty,
      title: task.title,
      maxScore: task.maxScore,
      score: 0,
      fraction: 0,
      pass: false,
      prompt: task.prompt,
      modelAnswer: modelAnswer || "",
      verdict: "ERROR",
      error,
      durationMs,
    };
  }

  const graded = await gradeTask(task, modelAnswer);
  return {
    taskId: task.id,
    category: task.category,
    difficulty: task.difficulty,
    title: task.title,
    maxScore: task.maxScore,
    prompt: task.prompt,
    modelAnswer,
    durationMs,
    ...graded,
  };
}

export async function runBenchmark(tasks: Task[], args: CliArgs, onProgress?: (done: number, total: number) => void) {
  const results: RunResult[] = [];
  let cursor = 0;
  const worker = async (): Promise<void> => {
    while (true) {
      const idx = cursor++;
      if (idx >= tasks.length) return;
      const r = await runTask(tasks[idx]!, args);
      results.push(r);
      onProgress?.(results.length, tasks.length);
    }
  };
  const workers = Array.from({ length: Math.max(1, args.concurrency) }, () => worker());
  await Promise.all(workers);
  return results;
}

export function summarize(results: RunResult[], args: CliArgs): RunSummary {
  let totalScore = 0;
  let totalMax = 0;
  const byCategory: Record<string, { score: number; max: number; count: number }> = {};
  for (const r of results) {
    totalScore += r.score;
    totalMax += r.maxScore;
    const cat = byCategory[r.category] ?? (byCategory[r.category] = { score: 0, max: 0, count: 0 });
    cat.score += r.score;
    cat.max += r.maxScore;
    cat.count++;
  }
  const iso = new Date().toISOString();
  const tsParts = iso.replace(/[:.]/g, "-").slice(0, 19);
  return {
    timestamp: tsParts,
    iso,
    modelId: args.model,
    baseUrl: args.baseUrl,
    totalTasks: results.length,
    totalMax,
    totalScore,
    overallPct: totalMax === 0 ? 0 : (totalScore / totalMax) * 100,
    byCategory,
  };
}
