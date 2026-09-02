import type { Task, Category, CodeSpec, CodeCase } from "../types.ts";

let seq = 0;

export interface CodeTaskDef {
  category: Category;
  difficulty: 1 | 2 | 3;
  title: string;
  prompt: string;
  lang: "javascript" | "python";
  funcName: string;
  signature: string;
  /** Reference implementation used to derive expected outputs. */
  ref: (...args: any[]) => unknown;
  /** Each entry is one test case's argument list. */
  argSets: unknown[][];
  timeoutSec?: number;
  graderNote?: string;
}

/** Compute expected outputs from the reference and build a code Task. */
export function codeTaskDef(
  p: Omit<CodeTaskDef, "argSets"> & { argSets: unknown[][] },
  prefix = "task",
): Task {
  const cases: CodeCase[] = p.argSets.map((args) => ({
    args,
    expected: p.ref(...args),
  }));
  const spec: CodeSpec = {
    lang: p.lang,
    signature: p.signature,
    extract: "function",
    funcName: p.funcName,
    timeoutSec: p.timeoutSec ?? 30,
    cases,
    strict: true,
  };
  return {
    id: `${prefix}-${String(++seq).padStart(4, "0")}-${slug(p.title)}`,
    category: p.category,
    difficulty: p.difficulty,
    title: p.title,
    prompt: p.prompt,
    type: "code",
    code: spec,
    graderNote: p.graderNote,
    maxScore: 1,
  };
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}

export interface PromptDef {
  category: Category;
  difficulty: 1 | 2 | 3;
  title: string;
  prompt: string;
  type?: "freeform";
  reference?: string;
  requiredKeywords?: string[];
  forbiddenKeywords?: string[];
  maxScore?: number;
  graderNote?: string;
}

export function promptTask(p: PromptDef, prefix = "task"): Task {
  return {
    id: `${prefix}-${String(++seq).padStart(4, "0")}-${slug(p.title)}`,
    category: p.category,
    difficulty: p.difficulty,
    title: p.title,
    prompt: p.prompt,
    type: "freeform",
    reference: p.reference,
    requiredKeywords: p.requiredKeywords,
    forbiddenKeywords: p.forbiddenKeywords,
    graderNote: p.graderNote,
    maxScore: p.maxScore ?? 1,
  };
}

export interface McDef {
  category: Category;
  difficulty: 1 | 2 | 3;
  title: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  graderNote?: string;
}

export function mcTask(p: McDef, prefix = "task"): Task {
  return {
    id: `${prefix}-${String(++seq).padStart(4, "0")}-${slug(p.title)}`,
    category: p.category,
    difficulty: p.difficulty,
    title: p.title,
    prompt: p.prompt,
    type: "multiple_choice",
    options: p.options,
    correctIndex: p.correctIndex,
    graderNote: p.graderNote,
    maxScore: 1,
  };
}

export { seq };
