import type { Task } from "../types.ts";
import { mcTask as m, promptTask as p } from "./helpers.ts";

const tasks: Task[] = [];

// ---------------- Level 1 ----------------

tasks.push(m({
  category: "code-reading", difficulty: 1,
  title: "Short-circuit OR assignment",
  prompt: "```js\nlet x = 0;\nlet y = x || 100;\nconsole.log(y);\n```\nWhat does this print?",
  options: [
    "100 (0 is falsy, so the || returns the right operand)",
    "0 (|| returns the left operand unchanged)",
    "undefined",
    "It throws because 0 cannot be assigned",
  ],
  correctIndex: 0,
}));

tasks.push(m({
  category: "code-reading", difficulty: 1,
  title: "String slice indices",
  prompt: "```python\ns = \"python\"\nprint(s[1:4])\n```\nWhat does this print?",
  options: ["yth", "pyt", "tho", "ython"],
  correctIndex: 0,
}));

tasks.push(m({
  category: "code-reading", difficulty: 1,
  title: "Integer division truncation",
  prompt: "```python\nprint(-7 // 2)\n```\nWhat does this print?",
  options: ["-4 (floor division rounds toward negative infinity)", "-3 (rounds toward zero)", "-3.5", "TypeError"],
  correctIndex: 0,
}));

tasks.push(m({
  category: "code-reading", difficulty: 1,
  title: "Array pop return value",
  prompt: "```js\nconst arr = [1, 2, 3];\nconst last = arr.pop();\nconsole.log(last, arr.length);\n```\nWhat does this print?",
  options: ["3 2", "2 2", "3 3", "undefined 3"],
  correctIndex: 0,
}));

tasks.push(p({
  category: "code-reading", difficulty: 1,
  title: "Modulo sign",
  prompt: "```python\nprint(10 % 3)\n```\nWhat does this print? (give the numeric value)",
  requiredKeywords: ["1"],
  reference: "1",
}));

tasks.push(p({
  category: "code-reading", difficulty: 1,
  title: "Bitwise AND of powers",
  prompt: "```js\nconsole.log(12 & 10);\n```\nWhat number does this print?",
  requiredKeywords: ["8"],
  reference: "8",
}));

tasks.push(p({
  category: "code-reading", difficulty: 1,
  title: "Boolean OR of truthy values",
  prompt: "```js\nconsole.log('a' || 'b');\n```\nWhat string does this print?",
  requiredKeywords: ["a"],
  reference: "\"a\"",
}));

// ---------------- Level 2 ----------------

tasks.push(m({
  category: "code-reading", difficulty: 2,
  title: "Loop closure over let",
  prompt: "```js\nconst fns = [];\nfor (let i = 0; i < 3; i++) {\n  fns.push(() => i);\n}\nconsole.log(fns[0](), fns[2]());\n```\nWhat does this print?",
  options: ["0 2 (let creates a fresh binding per iteration)", "3 3", "2 2", "0 0"],
  correctIndex: 0,
}));

tasks.push(m({
  category: "code-reading", difficulty: 2,
  title: "Promise microtask ordering",
  prompt: "```js\nconsole.log('A');\nPromise.resolve().then(() => console.log('B'));\nconsole.log('C');\n```\nWhat is the output order?",
  options: ["A C B (microtasks run after the synchronous script)", "A B C", "B A C", "A B C with B possibly last"],
  correctIndex: 0,
}));

tasks.push(m({
  category: "code-reading", difficulty: 2,
  title: "Mutability aliasing in Python",
  prompt: "```python\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))\n```\nWhat does this print?",
  options: ["4 (b references the same list object as a)", "3 (b is a copy)", "1", "Error"],
  correctIndex: 0,
}));

tasks.push(m({
  category: "code-reading", difficulty: 2,
  title: "this binding in method call",
  prompt: "```js\nconst obj = {\n  val: 42,\n  get: function() { return this.val; },\n};\nconst fn = obj.get;\nconsole.log(fn());\n```\nWhat does this print?",
  options: ["undefined (bare call has undefined this, not the object)", "42 (this refers to obj)", "ReferenceError", "null"],
  correctIndex: 0,
}));

tasks.push(m({
  category: "code-reading", difficulty: 2,
  title: "Floating-point accumulation",
  prompt: "```js\nlet sum = 0;\nfor (let i = 0; i < 10; i++) sum += 0.1;\nconsole.log(sum === 1.0);\n```\nWhat does this print?",
  options: ["false (binary floating-point cannot exactly represent repeated 0.1)", "true", "NaN", "TypeError"],
  correctIndex: 0,
}));

tasks.push(p({
  category: "code-reading", difficulty: 2,
  title: "JS left shift overflow",
  prompt: "```js\nconsole.log(1 << 31);\n```\nWhat number does this print? (Note the sign bit.)",
  requiredKeywords: ["-2147483648"],
  reference: "-2147483648",
}));

tasks.push(p({
  category: "code-reading", difficulty: 2,
  title: "Async function returns Promise",
  prompt: "```js\nasync function f() { return 5; }\nconsole.log(f() instanceof Promise);\n```\nWhat Boolean does this print?",
  requiredKeywords: ["true"],
  reference: "true",
}));

// ---------------- Level 3 ----------------

tasks.push(m({
  category: "code-reading", difficulty: 3,
  title: "Nested closure captures final value",
  prompt: "```js\nfunction makeAll() {\n  const fns = [];\n  for (var i = 0; i < 3; i++) {\n    fns.push(function() { return i; });\n  }\n  return fns;\n}\nconst f = makeAll();\nconsole.log(f[0]());\n```\nWhat does this print?",
  options: ["3 (var hoists one shared binding; after the loop i is 3)", "0", "2", "undefined"],
  correctIndex: 0,
}));

tasks.push(m({
  category: "code-reading", difficulty: 3,
  title: "try/except else ordering",
  prompt: "```python\ntry:\n    a = 10\n    b = 0\n    c = a / b\nexcept ZeroDivisionError:\n    print('divided')\nelse:\n    print('else')\nfinally:\n    print('finally')\n```\nWhat gets printed?",
  options: ["divided then finally (exception skips else)", "else then finally", "divided then else then finally", "only finally"],
  correctIndex: 0,
}));

tasks.push(m({
  category: "code-reading", difficulty: 3,
  title: "Recursion unwinding order",
  prompt: "```js\nfunction un(n) {\n  if (n === 0) return;\n  un(n - 1);\n  console.log(n);\n}\nun(3);\n```\nWhat is printed (in order)?",
  options: ["1 2 3 (console.log runs after the recursive call returns)", "3 2 1", "0 1 2 3", "3 2 1 0"],
  correctIndex: 0,
}));

tasks.push(p({
  category: "code-reading", difficulty: 3,
  title: "Default mutable argument trap",
  prompt: "```python\ndef add(item, acc=[]):\n    acc.append(item)\n    return acc\nprint(len(add('x')), len(add('y')))\n```\nWhat two numbers print in order?",
  requiredKeywords: ["1", "2"],
  reference: "1 2",
}));

tasks.push(p({
  category: "code-reading", difficulty: 3,
  title: "Recursion depth output",
  prompt: "```js\nlet total = 0;\nfunction count(n) {\n  if (n > 2) return;\n  total += n;\n  count(n + 1);\n  total += n;\n}\ncount(0);\nconsole.log(total);\n```\nWhat number does this print?",
  requiredKeywords: ["6"],
  reference: "6",
}));

tasks.push(p({
  category: "code-reading", difficulty: 3,
  title: "Functional composition evaluation order",
  prompt: "```js\nconst double = x => x * 2;\nconst inc = x => x + 1;\nconst compose = (...fns) => x => fns.reduceRight((acc, f) => f(acc), x);\nconsole.log(compose(double, inc)(5));\n```\nWhat number does this print?",
  requiredKeywords: ["12"],
  reference: "12 (double(inc(5)) = (5+1)*2)",
}));

export default tasks;
