import { loadAllTasks } from "../src/taskLoader.ts";
import { gradeTask } from "../src/grader.ts";

const tasks = await loadAllTasks();
console.log(`Total tasks loaded: ${tasks.length}`);

const byCat: Record<string, number> = {};
for (const t of tasks) byCat[t.category] = (byCat[t.category] ?? 0) + 1;
console.log(byCat);

// Structural validation
const problems: string[] = [];
const seenId = new Map<string, number>();
const seenTitle = new Map<string, number>();
for (const t of tasks) {
  seenId.set(t.id, (seenId.get(t.id) ?? 0) + 1);
  seenTitle.set(`${t.category}::${t.title.toLowerCase()}`, (seenTitle.get(`${t.category}::${t.title.toLowerCase()}`) ?? 0) + 1);
  if (!t.id || !t.title || !t.prompt) problems.push(`${t.id}: missing id/title/prompt`);
  if (!["1", "2", "3"].includes(String(t.difficulty))) problems.push(`${t.id}: bad difficulty`);
  if (t.maxScore <= 0) problems.push(`${t.id}: bad maxScore`);
  if (t.type === "code" && t.code) {
    if (!t.code.cases.length) problems.push(`${t.id}: no test cases`);
    if (!t.code.funcName) problems.push(`${t.id}: missing funcName`);
    for (const c of t.code.cases) {
      if (!c.args || !c.args.length) problems.push(`${t.id}: empty args in a case`);
      const e = c.expected;
      if (e !== null && typeof e === "number" && !Number.isFinite(e)) {
        problems.push(`${t.id}: non-finite expected ${e}`);
      }
    }
  }
  if (t.type === "multiple_choice") {
    if (!t.options || t.options.length < 2) problems.push(`${t.id}: MC needs options`);
    if (t.correctIndex == null || t.correctIndex < 0 || (t.options ? t.correctIndex >= t.options.length : true)) {
      problems.push(`${t.id}: MC bad correctIndex`);
    }
  }
}

for (const [id, n] of seenId) if (n > 1) problems.push(`Duplicate task id: ${id}`);
for (const [key, n] of seenTitle) if (n > 1) problems.push(`Duplicate title within category: ${key}`);

if (problems.length) {
  console.error("\nPROBLEMS:");
  for (const p of problems) console.error("  " + p);
  process.exit(1);
}

// Self-grading sanity: for each code task, grade using a perfect solution that
// IS the reference (we can't access refs after load, so this only checks grading
// invariants via a stubbed correct answer is not possible). Instead we validate
// JSON-safe expected serialization.
console.log("\nAll task definitions are structurally valid.");
console.log(`Passed structural checks for ${tasks.length} tasks.`);
