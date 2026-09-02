import type { Task } from "./types.ts";

export async function loadAllTasks(): Promise<Task[]> {
  const modules = await Promise.all([
    import("./tasks/coding-implementation.ts"),
    import("./tasks/coding-algorithm.ts"),
    import("./tasks/coding-bugfix.ts"),
    import("./tasks/agentic.ts"),
    import("./tasks/code-reading.ts"),
    import("./tasks/reasoning.ts"),
    import("./tasks/math.ts"),
    import("./tasks/knowledge.ts"),
  ]);
  const all: Task[] = [];
  for (const m of modules) {
    const arr = m.default as Task[];
    for (const t of arr) all.push(t);
  }
  // Ensure unique ids
  const seen = new Set<string>();
  for (const t of all) {
    if (seen.has(t.id)) throw new Error(`Duplicate task id: ${t.id}`);
    seen.add(t.id);
  }
  return all;
}

export function statsByCategory(tasks: Task[]) {
  const map: Record<string, { count: number; byDiff: Record<number, number> }> = {};
  for (const t of tasks) {
    map[t.category] ??= { count: 0, byDiff: {} };
    map[t.category]!.count++;
    map[t.category]!.byDiff[t.difficulty] = (map[t.category]!.byDiff[t.difficulty] ?? 0) + 1;
  }
  return map;
}
