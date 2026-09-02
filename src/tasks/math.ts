import type { Task } from "../types.ts";
import { mcTask as m, codeTaskDef as c } from "./helpers.ts";

const tasks: Task[] = [];

const py = "python" as const;
const pyPromptSuffix =
  "\n\nOutput ONLY the function definition in Python (e.g. `def ...`). No markdown fences, no explanation, no import statements other than stdlib, no main block, no tests.";

// ---------------------------------------------------------------------------
// MULTIPLE CHOICE
// ---------------------------------------------------------------------------

// 1. L1: arithmetic series sum
tasks.push(
  m({
    category: "math",
    difficulty: 1,
    title: "Sum of 1 to 100",
    prompt:
      "What is the sum of the first 100 positive integers, 1 + 2 + 3 + ... + 100?",
    options: ["4950", "5050", "5100", "50500"],
    correctIndex: 1,
    graderNote: "n(n+1)/2 with n=100 gives 100*101/2 = 5050.",
  }),
);

// 2. L1: modular arithmetic
tasks.push(
  m({
    category: "math",
    difficulty: 1,
    title: "Modular power 2^10 mod 7",
    prompt: "Compute (2^10) mod 7. Which of the following is the remainder?",
    options: ["0", "1", "2", "5"],
    correctIndex: 2,
    graderNote: "2^10 = 1024; 1024 = 7*146 + 2, remainder 2.",
  }),
);

// 3. L1: definite integral
tasks.push(
  m({
    category: "math",
    difficulty: 1,
    title: "Integral of 6x^2 on [0,1]",
    prompt: "Evaluate the definite integral \u222b\u2080\u00b9 6x\u00b2 dx. Which value is correct?",
    options: ["1", "2", "3", "6"],
    correctIndex: 1,
    graderNote: "Antiderivative is 2x^3; [2x^3]\u2080\u00b9 = 2.",
  }),
);

// 4. L2: trig integral
tasks.push(
  m({
    category: "math",
    difficulty: 2,
    title: "Integral of sin x on [0, pi]",
    prompt: "Evaluate the definite integral \u222b\u2080^\u03c0 sin(x) dx. Which value is correct?",
    options: ["0", "1", "2", "\u03c0"],
    correctIndex: 2,
    graderNote: "[-\u200bcos x]\u2080^\u03c0 = -cos(\u03c0) + cos(0) = 1 + 1 = 2.",
  }),
);

// 5. L2: gcd
tasks.push(
  m({
    category: "math",
    difficulty: 2,
    title: "gcd of 84 and 30",
    prompt: "What is the greatest common divisor of 84 and 30?",
    options: ["3", "6", "12", "14"],
    correctIndex: 1,
    graderNote: "84 = 2\u00b2\u00b73\u00b77, 30 = 2\u00b73\u00b75; gcd = 2\u00b73 = 6.",
  }),
);

// 6. L2: determinant of 2x2
tasks.push(
  m({
    category: "math",
    difficulty: 2,
    title: "Determinant of 2x2",
    prompt:
      "Compute the determinant of the matrix \u2308 4  1 \u2309\n\u230a 3  2 \u230b. Which value is correct?",
    options: ["5", "11", "-5", "2"],
    correctIndex: 0,
    graderNote: "det = 4\u00b72 \u2212 1\u00b73 = 8 \u2212 3 = 5.",
  }),
);

// 7. L2: binomial probability
tasks.push(
  m({
    category: "math",
    difficulty: 2,
    title: "Exactly two heads in three flips",
    prompt:
      "A fair coin is flipped 3 times. What is the probability of getting exactly 2 heads?",
    options: ["1/2", "3/8", "1/8", "3/4"],
    correctIndex: 1,
    graderNote: "C(3,2)/2^3 = 3/8.",
  }),
);

// 8. L3: limit
tasks.push(
  m({
    category: "math",
    difficulty: 3,
    title: "Limit of sin x / x",
    prompt: "Evaluate the limit as x \u2192 0 of (sin x)/x.",
    options: ["0", "1", "\u221e", "undefined"],
    correctIndex: 1,
    graderNote: "Classic fundamental limit: it equals 1.",
  }),
);

// 9. L3: combinatorics arrangements
tasks.push(
  m({
    category: "math",
    difficulty: 3,
    title: "Arrangements of MISSISSIPPI",
    prompt:
      "How many distinct arrangements of the 11 letters of the word MISSISSIPPI are there?",
    options: ["34650", "39916800", "1152", "27720"],
    correctIndex: 0,
    graderNote:
      "11 letters with M once, I four times, S four times, P twice: 11!/(4!4!2!1!) = 34650.",
  }),
);

// 10. L3: polynomial integral with fraction
tasks.push(
  m({
    category: "math",
    difficulty: 3,
    title: "Integral of x^2 + x on [0,2]",
    prompt: "Evaluate the definite integral \u222b\u2080\u00b2 (x\u00b2 + x) dx. Which value is correct?",
    options: ["8/3", "14/3", "10/3", "6"],
    correctIndex: 1,
    graderNote: "[x\u00b3/3 + x\u00b2/2]\u2080\u00b2 = 8/3 + 2 = 14/3.",
  }),
);

// ---------------------------------------------------------------------------
// CODE TASKS
// ---------------------------------------------------------------------------

// 11. L1: modular exponentiation
tasks.push(
  c({
    category: "math",
    difficulty: 1,
    title: "Modular exponentiation",
    lang: py,
    funcName: "mod_pow",
    signature: "mod_pow(base: int, exp: int, m: int) -> int",
    prompt:
      "Write `mod_pow(base, exp, m)` in Python returning (base^exp) mod m. Use fast modular exponentiation (repeated squaring); do not compute base^exp directly. `m` is positive and exp >= 0. Return the non-negative integer remainder." +
      pyPromptSuffix,
    ref: (base: number, exp: number, m: number) => {
      let r = 1;
      let b = base;
      let e = exp;
      while (e > 0) {
        if (e % 2 === 1) r = (r * b) % m;
        b = (b * b) % m;
        e = Math.floor(e / 2);
      }
      return r % m;
    },
    argSets: [
      [2, 10, 7],
      [3, 5, 13],
      [7, 3, 10],
      [2, 1000, 1000],
      [5, 0, 11],
      [123, 17, 997],
      [10, 20, 999],
    ],
    graderNote: "Fast exponent with modular reduction at each step.",
  }),
);

// 12. L2: determinant of 3x3
tasks.push(
  c({
    category: "math",
    difficulty: 2,
    title: "3x3 determinant",
    lang: py,
    funcName: "det3",
    signature: "det3(mat: list) -> int",
    prompt:
      "Write `det3(mat)` in Python that computes and returns the determinant of a 3x3 integer matrix supplied as a list of 3 rows (each a list of 3 integers). Return the exact integer determinant." +
      pyPromptSuffix,
    ref: (mat: number[][]) => {
      const [[a, b, c], [d, e, f], [g, h, i]] = mat.map((r) => r);
      return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
    },
    argSets: [
      [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]],
      [[[2, 0, 0], [0, 3, 0], [0, 0, 4]]],
      [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]],
      [[[3, 1, 2], [0, 2, 1], [1, 3, 4]]],
      [[[5, 1, 1], [1, 5, 1], [1, 1, 5]]],
      [[[2, -1, 0], [-1, 2, -1], [0, -1, 2]]],
      [[[-1, 2, 1], [0, 0, 0], [2, 1, -3]]],
    ],
    graderNote: "Expand along the first row: a(ei\u2212fh) \u2212 b(di\u2212fg) + c(dh\u2212eg).",
  }),
);

// 13. L2: dice sum ways (exact count)
tasks.push(
  c({
    category: "math",
    difficulty: 2,
    title: "Dice sum ways",
    lang: py,
    funcName: "dice_ways",
    signature: "dice_ways(k: int, s: int) -> int",
    prompt:
      "Write `dice_ways(k, s)` in Python returning the number of ordered outcomes of rolling `k` standard six-sided dice (each showing 1 through 6) whose values sum exactly to `s`. Return 0 if the sum is impossible. Use DP over the number of dice." +
      pyPromptSuffix,
    ref: (k: number, s: number) => {
      const dp = Array.from({ length: k + 1 }, () => new Array(s + 1).fill(0));
      dp[0][0] = 1;
      for (let i = 1; i <= k; i++) {
        for (let t = 0; t <= s; t++) {
          let sum = 0;
          for (let d = 1; d <= 6; d++) {
            if (t - d >= 0) sum += dp[i - 1][t - d];
          }
          dp[i][t] = sum;
        }
      }
      return dp[k][s];
    },
    argSets: [
      [2, 7],
      [2, 2],
      [1, 3],
      [3, 10],
      [2, 13],
      [5, 18],
      [2, 1],
      [4, 14],
    ],
    graderNote: "Count ordered dice outcomes; DP counts exact integer sums.",
  }),
);

// 14. L3: integer partitions
tasks.push(
  c({
    category: "math",
    difficulty: 3,
    title: "Integer partitions",
    lang: py,
    funcName: "partitions",
    signature: "partitions(n: int) -> int",
    prompt:
      "Write `partitions(n)` in Python returning the number of integer partitions of `n` \u2014 the count of ways to write `n` as a sum of positive integers where order does not matter. n is in [1, 60]. Use the coin-change style DP over the coin values 1..n." +
      pyPromptSuffix,
    ref: (n: number) => {
      const dp = new Array(n + 1).fill(0);
      dp[0] = 1;
      for (let i = 1; i <= n; i++) {
        for (let j = i; j <= n; j++) {
          dp[j] += dp[j - i];
        }
      }
      return dp[n];
    },
    argSets: [[1], [4], [6], [10], [15], [20], [30], [50]],
    graderNote:
      "Integer partition numbers: p(1)=1, p(4)=5, p(6)=11, p(10)=42, p(15)=176, p(20)=627, p(30)=5604, p(50)=204226.",
  }),
);

// 15. L3: digit DP - count without digit
tasks.push(
  c({
    category: "math",
    difficulty: 3,
    title: "Count numbers avoiding a digit",
    lang: py,
    funcName: "count_no_digit",
    signature: "count_no_digit(n: int, d: int) -> int",
    prompt:
      "Write `count_no_digit(n, d)` in Python returning how many integers in the range 1..n (inclusive) do NOT contain digit `d` anywhere in their decimal representation. d is an integer from 0 to 9. Use digit DP or a straightforward scan from 1 to n." +
      pyPromptSuffix,
    ref: (n: number, d: number) => {
      let count = 0;
      for (let x = 1; x <= n; x++) {
        let v = x;
        let ok = true;
        while (v > 0) {
          if (v % 10 === d) {
            ok = false;
            break;
          }
          v = Math.floor(v / 10);
        }
        if (ok) count++;
      }
      return count;
    },
    argSets: [
      [10, 0],
      [10, 1],
      [20, 1],
      [100, 0],
      [100, 9],
      [23, 2],
      [99, 6],
      [50, 5],
    ],
    graderNote:
      "count_no_digit(10,0)=9, (10,1)=8, (20,1)=9, (100,0)=90, (100,9)=81, (23,2)=17, (99,6)=80, (50,5)=44.",
  }),
);

export default tasks;
