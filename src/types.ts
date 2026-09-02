export type Category =
  | "coding-implementation"
  | "coding-algorithm"
  | "coding-bugfix"
  | "agentic"
  | "code-reading"
  | "reasoning"
  | "math"
  | "knowledge";

export type TaskType = "code" | "freeform" | "multiple_choice";

export type CodeLang = "javascript" | "python" | "shell" | "sql";

export interface CodeSpec {
  lang: CodeLang;
  /** Instruction about what to produce, e.g. the expected function signature. */
  signature: string;
  /** How to extract the runnable artifact from the model's answer. */
  extract: "function" | "stdout-hello" | "verbatim" | "output";
  /** For `function`: name of the function to call for each test case. */
  funcName?: string;
  /** Timeout in seconds for the whole evaluation. */
  timeoutSec?: number;
  /** Test cases. For `function` type, each {args, expected}. */
  cases: CodeCase[];
  /** Whether outputs must match after JSON normalization. */
  strict?: boolean;
}

export interface CodeCase {
  args: unknown[];
  expected: unknown;
}

export interface Task {
  id: string;
  category: Category;
  difficulty: 1 | 2 | 3;
  title: string;
  prompt: string;
  type: TaskType;
  /** Internal grader notes, never sent to the model. */
  graderNote?: string;
  code?: CodeSpec;
  /** For freeform: expected rough answer used to derive keyword matching. */
  reference?: string;
  requiredKeywords?: string[];
  forbiddenKeywords?: string[];
  /** For multiple_choice. */
  options?: string[];
  correctIndex?: number;
  maxScore: number;
}

export interface RunResult {
  taskId: string;
  category: Category;
  difficulty: number;
  title: string;
  maxScore: number;
  score: number;
  /** 0..1 fraction */
  fraction: number;
  pass: boolean;
  /** 0..N cases passed */
  casesPassed?: number;
  casesTotal?: number;
  prompt: string;
  modelAnswer: string;
  verdict: string;
  error?: string;
  durationMs: number;
}

export interface RunSummary {
  timestamp: string;
  iso: string;
  modelId: string;
  baseUrl: string;
  totalTasks: number;
  totalMax: number;
  totalScore: number;
  overallPct: number;
  byCategory: Record<string, { score: number; max: number; count: number }>;
}

export interface CliArgs {
  baseUrl: string;
  apiKey: string;
  model: string;
  categories?: string[];
  count?: number;
  concurrency: number;
  outDir: string;
  filter?: string;
  difficulty?: number[];
  minScore?: number;
  requestTimeoutSec: number;
  session?: string;
}
