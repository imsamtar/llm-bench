import type { Task } from "../types.ts";
import { codeTaskDef as c } from "./helpers.ts";

const tasks: Task[] = [];
const js = "javascript" as const;
const py = "python" as const;

// ---------------------------------------------------------------------------
// LEVEL 1
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Sum of an array", lang: js,
    funcName: "sumArray", signature: "sumArray(arr: number[]): number",
    prompt: `Compute the sum of all numbers in an array.

\`\`\`js
// BUGGY
export function sumArray(arr) {
  let s = 0;
  for (let i = 0; i <= arr.length; i++) {
    s += arr[i];
  }
  return s;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`sumArray\`. No markdown fences, no explanation.`,
    ref: (arr: number[]) => arr.reduce((a, b) => a + b, 0),
    argSets: [[[1,2,3]], [[5]], [[1,1,1,1,1]], [[-1,-2,-3]], [[100,200]], [[0,0,0]], [[1]], [[7,8,9,10]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Count even numbers", lang: py,
    funcName: "count_evens", signature: "count_evens(nums: list[int]) -> int",
    prompt: `Count how many numbers in the list are even.

\`\`\`python
# BUGGY
def count_evens(nums):
    c = 0
    for n in nums:
        if n % 2 == 1:
            c += 1
    return c
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def count_evens(nums):\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => nums.filter((n) => n % 2 === 0).length,
    argSets: [[[1,2,3,4,5,6]], [[2,4,6]], [[1,3,5]], [[0]], [[-2,-1,0,1,2]], [[8]], [[1]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Maximum value", lang: js,
    funcName: "maxValue", signature: "maxValue(arr: number[]): number",
    prompt: `Return the maximum value in the array. Assume the array is non-empty.

\`\`\`js
// BUGGY
export function maxValue(arr) {
  let best = 0;
  for (const n of arr) {
    if (n > best) best = n;
  }
  return best;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`maxValue\`. No markdown fences, no explanation.`,
    ref: (arr: number[]) => Math.max(...arr),
    argSets: [[[3,1,2]], [[-1,-5,-2]], [[10,20,30]], [[0,0,0]], [[-1,0,1]], [[-100,-50]], [[42]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Reverse a string", lang: py,
    funcName: "reverse_string", signature: "reverse_string(s: str) -> str",
    prompt: `Return the string reversed.

\`\`\`python
# BUGGY
def reverse_string(s):
    return s[::-2]
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def reverse_string(s):\`. No markdown fences, no explanation.`,
    ref: (s: string) => s.split("").reverse().join(""),
    argSets: [["abc"], ["hello"], ["a"], [""], ["racecar"], ["xyz"], ["abba"], ["abcdefgh"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Factorial", lang: js,
    funcName: "factorial", signature: "factorial(n: number): number",
    prompt: `Return n! (the product of all integers from 1 to n). n is >= 1.

\`\`\`js
// BUGGY
export function factorial(n) {
  let r = 1;
  for (let i = 2; i < n; i++) {
    r *= i;
  }
  return r;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`factorial\`. No markdown fences, no explanation.`,
    ref: (n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; },
    argSets: [[1], [2], [3], [5], [7], [10], [4], [6]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Average of list", lang: py,
    funcName: "average", signature: "average(nums: list[float]) -> float",
    prompt: `Return the arithmetic mean of a non-empty list of numbers.

\`\`\`python
# BUGGY
def average(nums):
    return sum(nums) / (len(nums) + 1)
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def average(nums):\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => nums.reduce((a, b) => a + b, 0) / nums.length,
    argSets: [[[1,2,3]], [[10,20]], [[5]], [[1,1,1,1]], [[0,0,0,0,0]], [[4,6,8,10]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Count vowels", lang: js,
    funcName: "countVowels", signature: "countVowels(s: string): number",
    prompt: `Count the vowels (a, e, i, o, u) in the string s, case-insensitively.

\`\`\`js
// BUGGY
export function countVowels(s) {
  let c = 0;
  for (const ch of s) {
    if ("aeiou".includes(ch)) c++;
  }
  return c;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`countVowels\`. No markdown fences, no explanation.`,
    ref: (s: string) => (s.match(/[aeiou]/gi) ?? []).length,
    argSets: [["hello"], ["AEIOU"], ["xyz"], ["Hello World"], ["Programming"], [""], ["aeiou AEIOU"], ["This is a test"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Count negatives", lang: js,
    funcName: "countNegatives", signature: "countNegatives(arr: number[]): number",
    prompt: `Count how many numbers are strictly less than zero.

\`\`\`js
// BUGGY
export function countNegatives(arr) {
  let c = 0;
  for (const n of arr) {
    if (n <= 0) c++;
  }
  return c;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`countNegatives\`. No markdown fences, no explanation.`,
    ref: (arr: number[]) => arr.filter((n) => n < 0).length,
    argSets: [[[1,-2,3,-4,0]], [[-1,-1]], [[1,2,3]], [[0,0]], [[-5,0,5]], [[0]], [[], []]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Sum of squares", lang: py,
    funcName: "sum_of_squares", signature: "sum_of_squares(nums: list[int]) -> int",
    prompt: `Return the sum of the squares of each number.

\`\`\`python
# BUGGY
def sum_of_squares(nums):
    return sum(n * 2 for n in nums)
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def sum_of_squares(nums):\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => nums.reduce((a, n) => a + n * n, 0),
    argSets: [[[1,2,3]], [[0,0]], [[-1,-2]], [[5]], [[1,1,1]], [[2,3,4,5]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "First positive index", lang: js,
    funcName: "firstPositiveIndex", signature: "firstPositiveIndex(arr: number[]): number",
    prompt: `Return the index of the first positive number in the array, or -1 if there is none.

\`\`\`js
// BUGGY
export function firstPositiveIndex(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) return arr[i];
  }
  return -1;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`firstPositiveIndex\`. No markdown fences, no explanation.`,
    ref: (arr: number[]) => arr.findIndex((n) => n > 0),
    argSets: [[[-1,0,5,2]], [[1,2,3]], [[-1,-2]], [[0]], [[0,0,7]], [[-5,3]], [[9]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Palindrome string check", lang: py,
    funcName: "is_palindrome_str", signature: "is_palindrome_str(s: str) -> bool",
    prompt: `Return True if s is a palindrome ignoring case (e.g. "Racecar" is a palindrome).

\`\`\`python
# BUGGY
def is_palindrome_str(s):
    return s == s[::-1]
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def is_palindrome_str(s):\`. No markdown fences, no explanation.`,
    ref: (s: string) => s.toLowerCase() === s.toLowerCase().split("").reverse().join(""),
    argSets: [["racecar"], ["Racecar"], ["abc"], ["aaaa"], ["A"], ["aba"], ["AbBa"], ["hello"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Last element", lang: js,
    funcName: "lastElement", signature: "lastElement(arr: number[]): number",
    prompt: `Return the last element of a non-empty array.

\`\`\`js
// BUGGY
export function lastElement(arr) {
  return arr[arr.length];
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`lastElement\`. No markdown fences, no explanation.`,
    ref: (arr: number[]) => arr[arr.length - 1],
    argSets: [[[1,2,3]], [[5]], [[1,1]], [[7,8,9]], [[-1,0,2]], [[100]], [[4,4,4,4]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Contains substring", lang: py,
    funcName: "contains_substring", signature: "contains_substring(s: str, sub: str) -> bool",
    prompt: `Return True if substring \`sub\` appears within \`s\`, ignoring case.

\`\`\`python
# BUGGY
def contains_substring(s, sub):
    return sub in s
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def contains_substring(s, sub):\`. No markdown fences, no explanation.`,
    ref: (s: string, sub: string) => s.toLowerCase().includes(sub.toLowerCase()),
    argSets: [["Hello World", "hello"], ["abc", "x"], ["HELLO", "ell"], ["abc", "ABC"], ["test", "es"], ["xyz", "zz"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Fibonacci n-th term", lang: js,
    funcName: "fib", signature: "fib(n: number): number",
    prompt: `Return the n-th Fibonacci number (F(0)=0, F(1)=1, F(2)=1, F(3)=2, ...). n >= 0.

\`\`\`js
// BUGGY
export function fib(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const t = a + b;
    a = b;
    b = t;
  }
  return a;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`fib\`. No markdown fences, no explanation.`,
    ref: (n: number) => {
      if (n <= 1) return n;
      let a = 0, b = 1;
      for (let i = 2; i <= n; i++) { const t = a + b; a = b; b = t; }
      return b;
    },
    argSets: [[0], [1], [2], [5], [7], [10], [3], [8]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Absolute value", lang: js,
    funcName: "absValue", signature: "absValue(x: number): number",
    prompt: `Return the absolute value of x.

\`\`\`js
// BUGGY
export function absValue(x) {
  if (x < 0) return x;
  return -x;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`absValue\`. No markdown fences, no explanation.`,
    ref: (x: number) => Math.abs(x),
    argSets: [[5], [-5], [0], [100], [-1], [-1000], [7], [3]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 1, title: "Prime check", lang: py,
    funcName: "is_prime", signature: "is_prime(n: int) -> bool",
    prompt: `Return True if n is a prime number (n >= 2).

\`\`\`python
# BUGGY
import math
def is_prime(n):
    for i in range(2, n // 2):
        if n % i == 0:
            return False
    return True
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def is_prime(n):\`. No markdown fences, no explanation.`,
    ref: (n: number) => {
      if (n < 2) return false;
      for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
      return true;
    },
    argSets: [[2], [4], [7], [10], [13], [1], [9], [17], [25], [19]],
  }),
);

// ---------------------------------------------------------------------------
// LEVEL 2
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Merge intervals", lang: js,
    funcName: "mergeIntervals", signature: "mergeIntervals(intervals: number[][]): number[][]",
    prompt: `Given intervals as [start, end] pairs (end inclusive), merge all overlapping intervals and return merged intervals (sorted by start). Example: [[1,3],[2,6],[8,10],[15,18]] -> [[1,6],[8,10],[15,18]].

\`\`\`js
// BUGGY
export function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const out = [];
  for (const [s, e] of intervals) {
    if (out.length && s <= out[out.length - 1][1]) {
      out[out.length - 1] = [out[out.length - 1][0], e];
    } else {
      out.push([s, e]);
    }
  }
  return out;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`mergeIntervals\`. No markdown fences, no explanation.`,
    ref: (intervals: number[][]) => {
      const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
      const out: number[][] = [];
      for (const [s, e] of sorted) {
        if (out.length && s <= out[out.length - 1][1]) {
          out[out.length - 1][1] = Math.max(out[out.length - 1][1], e);
        } else out.push([s, e]);
      }
      return out;
    },
    argSets: [
      [[[1,3],[2,6],[8,10],[15,18]]],
      [[[1,4],[2,3]]],
      [[[1,5],[2,8]]],
      [[[1,8],[2,5]]],
      [[[1,5]]],
      [[[1,4],[5,6]]],
      [[[2,3],[4,5],[6,7],[1,10]]],
    ],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Longest consecutive sequence", lang: py,
    funcName: "longest_consecutive", signature: "longest_consecutive(nums: list[int]) -> int",
    prompt: `Given an unsorted array of integers, return the length of the longest consecutive elements sequence (e.g. [100,4,200,1,3,2] -> 4, the sequence 1,2,3,4).

\`\`\`python
# BUGGY
def longest_consecutive(nums):
    s = set(nums)
    best = 0
    for n in s:
        if n - 1 not in s:
            cur = n
            length = 1
            while cur in s:
                cur += 1
                length += 1
            best = max(best, length)
    return best
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def longest_consecutive(nums):\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => {
      const s = new Set(nums);
      let best = 0;
      for (const n of s) {
        if (!s.has(n - 1)) {
          let cur = n, len = 0;
          while (s.has(cur)) { cur++; len++; }
          best = Math.max(best, len);
        }
      }
      return best;
    },
    argSets: [[[100,4,200,1,3,2]], [[0,3,7,2,5,8,4,6,0,1]], [[1,2,3,4,5]], [[1]], [[5,4,3]], [[9,8,7,6,10,1,2]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Two sum (fix reuse)", lang: js,
    funcName: "twoSum", signature: "twoSum(nums: number[], target: number): number[]",
    prompt: `Return the indices (ascending) of the two numbers that add up to target. Exactly one solution exists and you may not use the same element twice.

\`\`\`js
// BUGGY
export function twoSum(nums, target) {
  const m = new Map();
  for (let i = 0; i < nums.length; i++) {
    m.set(nums[i], i);
    const need = target - nums[i];
    if (m.has(need)) return [m.get(need), i].sort((a, b) => a - b);
  }
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`twoSum\`. No markdown fences, no explanation.`,
    ref: (nums: number[], target: number) => {
      const m = new Map<number, number>();
      for (let i = 0; i < nums.length; i++) {
        const need = target - nums[i]!;
        if (m.has(need)) {
          const a = Math.min(m.get(need)!, i), b = Math.max(m.get(need)!, i);
          return [a, b];
        }
        m.set(nums[i]!, i);
      }
      return [];
    },
    argSets: [[[3,3],6], [[2,7,11,15],9], [[3,2,4],6], [[1,5,8,3,4],9], [[-3,4,3,90],0], [[0,4,3,0],0]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Valid parentheses (matching)", lang: js,
    funcName: "isValidParen", signature: "isValidParen(s: string): boolean",
    prompt: `Return true if the string has balanced, correctly nested brackets of types () [] {}. Example: "([{}])" is valid, "([)]" is not.

\`\`\`js
// BUGGY
export function isValidParen(s) {
  const st = [];
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      st.push(ch);
    } else {
      if (!st.length) return false;
      st.pop();
    }
  }
  return st.length === 0;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`isValidParen\`. No markdown fences, no explanation.`,
    ref: (s: string) => {
      const st: string[] = [];
      const map: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
      for (const ch of s) {
        if ("([{".includes(ch)) st.push(ch);
        else if (st.pop() !== map[ch]) return false;
      }
      return st.length === 0;
    },
    argSets: [["()"], ["()[]{}"], ["([)]"], ["{[]}"], ["(]"], ["([{}])"], ["([)]"], [""]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Binary search direction", lang: py,
    funcName: "binary_search", signature: "binary_search(arr: list[int], target: int) -> int",
    prompt: `Return the index of target in the sorted array arr, or -1 if not present.

\`\`\`python
# BUGGY
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            hi = mid - 1
        else:
            lo = mid + 1
    return -1
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def binary_search(arr, target):\`. No markdown fences, no explanation.`,
    ref: (arr: number[], target: number) => {
      let lo = 0, hi = arr.length - 1;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (arr[mid] === target) return mid;
        if (arr[mid]! < target) lo = mid + 1;
        else hi = mid - 1;
      }
      return -1;
    },
    argSets: [[[1,2,3,4,5],4], [[1,2,3,4,5],0], [[1,3,5,7],5], [[1,3,5,7],9], [[10],10], [[1],2], [[1,2,3,4,5],3]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Remove duplicates in sorted array", lang: py,
    funcName: "remove_duplicates", signature: "remove_duplicates(nums: list[int]) -> int",
    prompt: `Given a sorted array, remove duplicates in place and return the number of unique elements (the first k slots hold the unique values).

\`\`\`python
# BUGGY
def remove_duplicates(nums):
    j = 0
    for i in range(1, len(nums)):
        if nums[i] != nums[j]:
            j += 1
            nums[j] = nums[i]
    return j
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def remove_duplicates(nums):\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => {
      let j = 0;
      for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[j]) { j++; nums[j] = nums[i]; }
      }
      return j + 1;
    },
    argSets: [[[1,1,2]], [[0,0,1,1,1,2,2,3,3,4]], [[1,2,3]], [[1,1,1]], [[1]], [[1,1,2,2,3,3]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "First word repeated", lang: js,
    funcName: "firstRepeat", signature: "firstRepeat(text: string): string",
    prompt: `Given a text of space-separated words, return the first word that appears more than once, or "" if none. Example: "cat dog cat bird" -> "cat".

\`\`\`js
// BUGGY
export function firstRepeat(text) {
  const seen = new Set();
  for (const w of text.split(/\s+/)) {
    if (!seen.has(w)) return w;
    seen.add(w);
  }
  return "";
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`firstRepeat\`. No markdown fences, no explanation.`,
    ref: (text: string) => {
      const seen = new Set<string>();
      for (const w of text.trim().split(/\s+/)) {
        if (seen.has(w)) return w;
        seen.add(w);
      }
      return "";
    },
    argSets: [["x y y"], ["a b c b d"], ["cat dog cat bird"], ["a b c"], [""], ["one two three one"], ["a a"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Majority element", lang: py,
    funcName: "majority_element", signature: "majority_element(nums: list[int]) -> int",
    prompt: `Return the majority element (the element that appears more than n/2 times). It is guaranteed to exist.

\`\`\`python
# BUGGY
def majority_element(nums):
    return sorted(nums)[len(nums) // 2 - 1]
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def majority_element(nums):\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => nums.slice().sort((a, b) => a - b)[Math.floor(nums.length / 2)],
    argSets: [[[3,2,3]], [[2,2,1,1,1,2,2]], [[1]], [[3,3,4,4,4]], [[5,5,5,1,1]], [[1,2,2,2,1,1,1]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Rotate array right by k", lang: js,
    funcName: "rotateRight", signature: "rotateRight(nums: number[], k: number): number[]",
    prompt: `Return a new array equal to nums rotated to the RIGHT by k positions. Example: rotateRight([1,2,3,4,5], 2) -> [4,5,1,2,3].

\`\`\`js
// BUGGY
export function rotateRight(nums, k) {
  k %= nums.length;
  const rev = [...nums];
  const out = new Array(nums.length);
  for (let i = 0; i < nums.length; i++) {
    out[i] = rev[(i + k) % nums.length];
  }
  return out;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`rotateRight\`. No markdown fences, no explanation.`,
    ref: (nums: number[], k: number) => {
      const n = nums.length;
      if (n === 0) return [];
      const kk = ((k % n) + n) % n;
      return nums.slice(n - kk).concat(nums.slice(0, n - kk));
    },
    argSets: [[[1,2,3,4,5],2], [[1,2,3],1], [[1,2],3], [[1,2,3,4],4], [[-1,-100,3,99],2], [[1],5], [[1,2,3],0]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Run-length compress", lang: js,
    funcName: "compress", signature: "compress(s: string): string",
    prompt: `Run-length encode s: replace consecutive runs with the character followed by its count. Example: "aaabb" -> "a3b2", "abc" -> "a1b1c1".

\`\`\`js
// BUGGY
export function compress(s) {
  if (!s.length) return "";
  let out = "";
  let c = 1;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      c++;
    } else {
      out += s[i - 1] + c;
      c = 1;
    }
  }
  return out;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`compress\`. No markdown fences, no explanation.`,
    ref: (s: string) => {
      if (!s.length) return "";
      let out = "";
      let c = 1;
      for (let i = 1; i <= s.length; i++) {
        if (i < s.length && s[i] === s[i - 1]) c++;
        else { out += s[i - 1] + c; c = 1; }
      }
      return out;
    },
    argSets: [["aaabb"], ["abc"], ["a"], [""], ["aabbbcccc"], ["zzz"], ["aaabbb"], ["hello"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Anagram check", lang: py,
    funcName: "is_anagram", signature: "is_anagram(a: str, b: str) -> bool",
    prompt: `Return True if a and b are anagrams (same characters in the same quantities). Example: "listen"/"silent" -> True, "aab"/"abb" -> False.

\`\`\`python
# BUGGY
def is_anagram(a, b):
    return set(a) == set(b)
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def is_anagram(a, b):\`. No markdown fences, no explanation.`,
    ref: (a: string, b: string) => a.split("").sort().join("") === b.split("").sort().join(""),
    argSets: [["listen","silent"], ["aab","abb"], ["abc","cab"], ["rat","car"], ["",""], ["ab","ab"], ["tea","eat"], ["anagram","nagaram"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Longest common prefix", lang: js,
    funcName: "longestCommonPrefix", signature: "longestCommonPrefix(strs: string[]): string",
    prompt: `Return the longest common prefix of an array of strings, or "" if none. Example: ["flower","flow","flight"] -> "fl".

\`\`\`js
// BUGGY
export function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  let pref = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (pref.length && !strs[i].startsWith(pref)) {
      pref = pref.slice(1);
    }
  }
  return pref;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`longestCommonPrefix\`. No markdown fences, no explanation.`,
    ref: (strs: string[]) => {
      if (!strs.length) return "";
      let p = strs[0]!;
      for (const s of strs.slice(1)) {
        while (p.length && !s.startsWith(p)) p = p.slice(0, p.length - 1);
        if (!p) return "";
      }
      return p;
    },
    argSets: [["flower","flow","flight"], ["dog","racecar","car"], ["a"], ["interspecies","interstellar","interstate"], ["","anything"], ["same","same"], ["prefix","pre"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Is subsequence", lang: py,
    funcName: "is_subsequence", signature: "is_subsequence(s: str, t: str) -> bool",
    prompt: `Return True if s is a subsequence of t (chars of s appear in t in order, not necessarily contiguous). Example: "abc" in "ahbgdc" -> True.

\`\`\`python
# BUGGY
def is_subsequence(s, t):
    i = j = 0
    while i < len(s) and j < len(t):
        if s[i] == t[j]:
            i += 1
            j += 1
        else:
            i += 1
    return i == len(s)
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def is_subsequence(s, t):\`. No markdown fences, no explanation.`,
    ref: (s: string, t: string) => {
      let i = 0, j = 0;
      while (i < s.length && j < t.length) {
        if (s[i] === t[j]) i++;
        j++;
      }
      return i === s.length;
    },
    argSets: [["abc","ahbgdc"], ["abc","ahbgdc"], ["b","abc"], ["ba","ab"], ["axc","ahbgdc"], ["","abc"], ["abc","abc"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Plus one (carry)", lang: js,
    funcName: "plusOne", signature: "plusOne(digits: number[]): number[]",
    prompt: `Given an array of digits representing a non-negative integer (no leading zeros), return the array of digits for that integer plus one. Example: [1,2,3] -> [1,2,4], [9,9] -> [1,0,0].

\`\`\`js
// BUGGY
export function plusOne(digits) {
  digits[digits.length - 1] += 1;
  return digits;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`plusOne\`. No markdown fences, no explanation.`,
    ref: (digits: number[]) => {
      const d = digits.slice();
      for (let i = d.length - 1; i >= 0; i--) {
        if (d[i] < 9) { d[i]++; return d; }
        d[i] = 0;
      }
      return [1, ...d];
    },
    argSets: [[[1,2,3]], [[9]], [[4,3,2,1]], [[9,9]], [[1,9,9]], [[9,0,9]], [[0]], [[8,9,9,9]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Reverse words in string", lang: js,
    funcName: "reverseWords", signature: "reverseWords(s: string): string",
    prompt: `Reverse the order of words in s, collapsing multiple spaces to one and trimming. Example: "  the sky is   blue " -> "blue is sky the".

\`\`\`js
// BUGGY
export function reverseWords(s) {
  return s.trim().split(" ").reverse().join(" ");
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`reverseWords\`. No markdown fences, no explanation.`,
    ref: (s: string) => s.trim().split(/\s+/).reverse().join(" "),
    argSets: [["  the sky is   blue "], ["hello world"], ["a"], ["one two three"], ["  b   c  d "], [""], ["space    separated"], ["  " ]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Missing number", lang: py,
    funcName: "missing_number", signature: "missing_number(nums: list[int]) -> int",
    prompt: `Given n distinct numbers taken from 0..n, return the one number in 0..n missing from the array. Example: [3,0,1] -> 2.

\`\`\`python
# BUGGY
def missing_number(nums):
    n = len(nums)
    return n * (n - 1) // 2 - sum(nums)
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def missing_number(nums):\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => {
      const n = nums.length;
      return (n * (n + 1)) / 2 - nums.reduce((a, b) => a + b, 0);
    },
    argSets: [[[3,0,1]], [[0,1]], [[9,6,4,2,3,5,7,0,1]], [[0]], [[1]], [[1,2,3]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Maximum subarray (Kadane)", lang: py,
    funcName: "max_subarray", signature: "max_subarray(nums: list[int]) -> int",
    prompt: `Return the sum of the contiguous subarray with the largest sum (including negative numbers; for an all-negative array return the largest single element). Example: [-2,1,-3,4,-1,2,1,-5,4] -> 6.

\`\`\`python
# BUGGY
def max_subarray(nums):
    best = 0
    cur = 0
    for n in nums:
        cur = max(0, cur + n)
        best = max(best, cur)
    return best
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def max_subarray(nums):\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => {
      let best = nums[0]!, cur = nums[0]!;
      for (const n of nums.slice(1)) {
        cur = Math.max(n, cur + n);
        best = Math.max(best, cur);
      }
      return best;
    },
    argSets: [[[-2,1,-3,4,-1,2,1,-5,4]], [[1]], [[-1,-2,-3]], [[5,4,-1,7,8]], [[-2,-1]], [[1,2,3]], [[-1,0,-1]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Roman to integer", lang: js,
    funcName: "romanToInt", signature: "romanToInt(s: string): number",
    prompt: `Convert a valid Roman numeral string to an integer, handling subtractive forms (IV=4, IX=9, XL=40, etc.).

\`\`\`js
// BUGGY
export function romanToInt(s) {
  const v = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (const ch of s) total += v[ch];
  return total;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`romanToInt\`. No markdown fences, no explanation.`,
    ref: (s: string) => {
      const v: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
      let total = 0;
      for (let i = 0; i < s.length; i++) {
        const cur = v[s[i]!]!, next = i + 1 < s.length ? v[s[i + 1]!]! : 0;
        total += cur < next ? -cur : cur;
      }
      return total;
    },
    argSets: [["III"], ["IV"], ["IX"], ["LVIII"], ["MCMXCIV"], ["XC"], ["CMXCIX"], ["XIV"], ["XLII"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Climbing stairs", lang: py,
    funcName: "climb_stairs", signature: "climb_stairs(n: int) -> int",
    prompt: `You can climb 1 or 2 steps at a time. Return the number of distinct ways to reach the top of n steps (n >= 1).

\`\`\`python
# BUGGY
def climb_stairs(n):
    if n <= 1:
        return 1
    prev, cur = 1, 1
    for _ in range(2, n):
        prev, cur = cur, prev + cur
    return cur
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def climb_stairs(n):\`. No markdown fences, no explanation.`,
    ref: (n: number) => {
      if (n <= 1) return 1;
      let prev = 1, cur = 1;
      for (let i = 2; i <= n; i++) { const t = prev + cur; prev = cur; cur = t; }
      return cur;
    },
    argSets: [[1], [2], [3], [5], [7], [10], [4], [6]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Move zeroes", lang: js,
    funcName: "moveZeroes", signature: "moveZeroes(nums: number[]): number[]",
    prompt: `Move all zeros to the end while keeping the relative order of non-zero elements. Return the array. Example: [0,1,0,3,12] -> [1,3,12,0,0].

\`\`\`js
// BUGGY
export function moveZeroes(nums) {
  let i = 0;
  for (const n of nums) {
    if (n !== 0) nums[i++] = n;
  }
  return nums;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`moveZeroes\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => {
      const nz = nums.filter((x) => x !== 0);
      return nz.concat(Array(nums.length - nz.length).fill(0));
    },
    argSets: [[[0,1,0,3,12]], [[0]], [[1,0,2,0,3]], [[5,0,0,5]], [[1,2,3]], [[0,0,1]], [[0,0,0,1]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "First unique character", lang: py,
    funcName: "first_uniq_char", signature: "first_uniq_char(s: str) -> int",
    prompt: `Return the index of the first non-repeating character in s, or -1 if none. Example: "loveleetcode" -> 2 (the 'v').

\`\`\`python
# BUGGY
def first_uniq_char(s):
    for i, ch in enumerate(s):
        if s.count(ch) > 1:
            return i
    return -1
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def first_uniq_char(s):\`. No markdown fences, no explanation.`,
    ref: (s: string) => {
      const freq = new Map<string, number>();
      for (const ch of s) freq.set(ch, (freq.get(ch) ?? 0) + 1);
      for (let i = 0; i < s.length; i++) if (freq.get(s[i]) === 1) return i;
      return -1;
    },
    argSets: [["loveleetcode"], ["leetcode"], ["aabb"], ["ab"], ["a"], ["aabbccd"], ["dddccdbba"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Reverse integer", lang: js,
    funcName: "reverseInt", signature: "reverseInt(x: number): number",
    prompt: `Reverse the digits of an integer, keeping its sign, dropping any leading zeros in the result. Example: 123 -> 321, -120 -> -21. All results fit in 32-bit int range.

\`\`\`js
// BUGGY
export function reverseInt(x) {
  const rev = Number(String(x).split("").reverse().join(""));
  return rev;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`reverseInt\`. No markdown fences, no explanation.`,
    ref: (x: number) => {
      const sign = x < 0 ? -1 : 1;
      const rev = Number(String(Math.abs(x)).split("").reverse().join(""));
      return sign * rev;
    },
    argSets: [[123], [-120], [120], [0], [-123], [5], [100], [-5], [10]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "First non-repeating (word rate)", lang: py,
    funcName: "kth_factor", signature: "kth_factor(n: int, k: int) -> int",
    prompt: `Return the k-th factor (in ascending order) of the positive integer n, or -1 if there are fewer than k factors. Example: n=12, k=3 -> 3 (factors 1,2,3,4,6,12).

\`\`\`python
# BUGGY
def kth_factor(n, k):
    factors = []
    for i in range(1, n + 1):
        if n % i == 0:
            factors.append(i)
    return factors[k] if k < len(factors) else -1
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def kth_factor(n, k):\`. No markdown fences, no explanation.`,
    ref: (n: number, k: number) => {
      let count = 0;
      for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
          count++;
          if (count === k) return i;
        }
      }
      return -1;
    },
    argSets: [[12,3], [12,6], [7,2], [1,1], [12,7], [4,2], [10,4]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Sort even and odd indices", lang: js,
    funcName: "sortByParity", signature: "sortByParity(nums: number[]): number[]",
    prompt: `Return a new array with all even numbers first (in original relative order) followed by all odd numbers (in original relative order). Example: [3,1,2,4] -> [2,4,3,1].

\`\`\`js
// BUGGY
export function sortByParity(nums) {
  const evens = nums.filter((n) => n % 2 === 1);
  const odds = nums.filter((n) => n % 2 === 0);
  return evens.concat(odds);
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`sortByParity\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => nums.filter((n) => n % 2 === 0).concat(nums.filter((n) => n % 2 === 1)),
    argSets: [[[3,1,2,4]], [[0]], [[1,3,5]], [[2,4,6]], [[1,2,3,4,5,6]], [[0,1]], [[2,1,0]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Find the single number (XOR)", lang: js,
    funcName: "singleNumber", signature: "singleNumber(nums: number[]): number",
    prompt: `Every element appears exactly twice except one that appears once. Return the single element. Example: [4,1,2,1,2] -> 4.

\`\`\`js
// BUGGY
export function singleNumber(nums) {
  let x = 0;
  for (const n of nums) x += n;
  return x;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`singleNumber\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => nums.reduce((a, b) => a ^ b, 0),
    argSets: [[[4,1,2,1,2]], [[2,2,1]], [[1]], [[1,1,2,2,3]], [[7,3,7,3,5,5,9]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Two-pointer container water", lang: py,
    funcName: "max_area", signature: "max_area(height: list[int]) -> int",
    prompt: `Given vertical line heights height[i] at index i, return the maximum water a container formed by two lines can hold (width * min of the two heights). Example: [1,8,6,2,5,4,8,3,7] -> 49.

\`\`\`python
# BUGGY
def max_area(height):
    l, r = 0, len(height) - 1
    best = 0
    while l < r:
        best = max(best, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return best * 2
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def max_area(height):\`. No markdown fences, no explanation.`,
    ref: (height: number[]) => {
      let l = 0, r = height.length - 1, best = 0;
      while (l < r) {
        best = Math.max(best, Math.min(height[l]!, height[r]!) * (r - l));
        if (height[l]! < height[r]!) l++; else r--;
      }
      return best;
    },
    argSets: [[[1,8,6,2,5,4,8,3,7]], [[1,1]], [[4,3,2,1,4]], [[1,2,1]], [[2,3,10,5,7,8,9]], [[1,2,3,4,5,6,7,8,9,100]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Guess number (off by one)", lang: py,
    funcName: "count_bits", signature: "count_bits(n: int) -> list[int]",
    prompt: `Return an array result of length n+1 where result[i] is the number of 1 bits in i. Example: count_bits(2) -> [0,1,1].

\`\`\`python
# BUGGY
def count_bits(n):
    ans = [0] * (n + 1)
    for i in range(1, n):
        ans[i] = ans[i // 2] + (i % 2)
    return ans
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def count_bits(n):\`. No markdown fences, no explanation.`,
    ref: (n: number) => {
      const ans = new Array(n + 1).fill(0);
      for (let i = 1; i <= n; i++) ans[i] = ans[i >> 1]! + (i & 1);
      return ans;
    },
    argSets: [[2], [5], [0], [1], [8], [16], [3]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 2, title: "Happy number", lang: js,
    funcName: "isHappy", signature: "isHappy(n: number): boolean",
    prompt: `Return true if n is a happy number: repeatedly replace n with the sum of the squares of its digits, until it becomes 1 (true) or cycles forever (false). Example: 19 -> true, 2 -> false.

\`\`\`js
// BUGGY
export function isHappy(n) {
  const seen = new Set();
  while (n !== 1) {
    let s = 0;
    while (n > 0) {
      const d = n % 10;
      s += d * d;
      n = Math.floor(n / 10);
    }
    n = s;
  }
  return true;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`isHappy\`. No markdown fences, no explanation.`,
    ref: (n: number) => {
      const seen = new Set<number>();
      while (n !== 1) {
        if (seen.has(n)) return false;
        seen.add(n);
        let s = 0;
        while (n > 0) { const d = n % 10; s += d * d; n = Math.floor(n / 10); }
        n = s;
      }
      return true;
    },
    argSets: [[19], [2], [7], [1], [4], [13], [100]],
  }),
);

// ---------------------------------------------------------------------------
// LEVEL 3
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "Product of array except self", lang: js,
    funcName: "productExceptSelf", signature: "productExceptSelf(nums: number[]): number[]",
    prompt: `Return an array where answer[i] is the product of all elements except nums[i], in O(n) without division. Example: [1,2,3,4] -> [24,12,8,6].

\`\`\`js
// BUGGY
export function productExceptSelf(nums) {
  const n = nums.length;
  const out = new Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) {
    out[i] = left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    right *= nums[i];
    out[i] *= right;
  }
  return out;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`productExceptSelf\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => {
      const n = nums.length;
      const out = new Array(n).fill(1);
      let left = 1;
      for (let i = 0; i < n; i++) { out[i] = left; left *= nums[i]!; }
      let right = 1;
      for (let i = n - 1; i >= 0; i--) { out[i]! *= right; right *= nums[i]!; }
      return out;
    },
    argSets: [[[1,2,3,4]], [[-1,1,0,-3,3]], [[2,3]], [[1,2,3,4,5]], [[1]], [[-1,-2,-3]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "Longest palindromic substring", lang: py,
    funcName: "longest_palindrome", signature: "longest_palindrome(s: str) -> str",
    prompt: `Return the longest palindromic substring of s. If multiple have the same max length, return the earliest one. Example: "babad" -> "bab", "cbbd" -> "bb".

\`\`\`python
# BUGGY
def longest_palindrome(s):
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l + 1:r]
    best = ""
    for i in range(len(s)):
        cand = expand(i, i)
        if len(cand) > len(best):
            best = cand
    return best
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def longest_palindrome(s):\`. No markdown fences, no explanation.`,
    ref: (s: string) => {
      const expand = (l: number, r: number) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
        return s.slice(l + 1, r);
      };
      let best = "";
      for (let i = 0; i < s.length; i++) {
        for (const cand of [expand(i, i), expand(i, i + 1)]) {
          if (cand.length > best.length) best = cand;
        }
      }
      return best;
    },
    argSets: [["babad"], ["cbbd"], ["a"], ["ac"], ["aaaa"], ["abacdfgdcaba"], ["racecar"], ["bb"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "Trapping rain water", lang: py,
    funcName: "trap", signature: "trap(height: list[int]) -> int",
    prompt: `Given n non-negative integers representing an elevation map (bar widths of 1), compute how much water it can trap after raining. Example: [0,1,0,2,1,0,1,3,2,1,2,1] -> 6.

\`\`\`python
# BUGGY
def trap(height):
    n = len(height)
    if n < 3:
        return 0
    total = 0
    for i in range(1, n - 1):
        left = max(height[:i])
        right = height[i]
        m = min(left, right)
        if m > height[i]:
            total += m - height[i]
    return total
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def trap(height):\`. No markdown fences, no explanation.`,
    ref: (height: number[]) => {
      const n = height.length;
      const L = new Array(n).fill(0), R = new Array(n).fill(0);
      L[0] = height[0]!;
      for (let i = 1; i < n; i++) L[i] = Math.max(L[i - 1]!, height[i]!);
      R[n - 1] = height[n - 1]!;
      for (let i = n - 2; i >= 0; i--) R[i] = Math.max(R[i + 1]!, height[i]!);
      let total = 0;
      for (let i = 0; i < n; i++) total += Math.min(L[i]!, R[i]!) - height[i]!;
      return total;
    },
    argSets: [[[0,1,0,2,1,0,1,3,2,1,2,1]], [[4,2,0,3,2,5]], [[3,2,1]], [[1,0,1]], [[5]], [[0,1,0,1,0,1,0]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "Edit distance", lang: py,
    funcName: "edit_distance", signature: "edit_distance(a: str, b: str) -> int",
    prompt: `Return the minimum number of operations (insert, delete, replace) to convert string a into string b. Example: edit_distance("horse","ros") -> 3, ("intention","execution") -> 5.

\`\`\`python
# BUGGY
def edit_distance(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def edit_distance(a, b):\`. No markdown fences, no explanation.`,
    ref: (a: string, b: string) => {
      const m = a.length, n = b.length;
      const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
      for (let i = 0; i <= m; i++) dp[i][0] = i;
      for (let j = 0; j <= n; j++) dp[0][j] = j;
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
          else dp[i][j] = 1 + Math.min(dp[i - 1][j]!, dp[i][j - 1]!, dp[i - 1][j - 1]!);
        }
      }
      return dp[m][n];
    },
    argSets: [["horse","ros"], ["intention","execution"], ["","abc"], ["abc",""], ["a","a"], ["kitten","sitting"], ["flaw","lawn"], ["abc","abc"]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "Coin change (min coins)", lang: py,
    funcName: "coin_change", signature: "coin_change(coins: list[int], amount: int) -> int",
    prompt: `Return the fewest number of coins needed to make up 'amount', or -1 if impossible. Example: coins=[1,2,5], amount=11 -> 3 (5+5+1).

\`\`\`python
# BUGGY
def coin_change(coins, amount):
    INF = float("inf")
    dp = [INF] * (amount + 1)
    dp[0] = 0
    for a in range(amount + 1):
        for c in coins:
            if a >= c:
                dp[a] = min(dp[a], dp[a - c])
    return dp[amount] if dp[amount] != INF else -1
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def coin_change(coins, amount):\`. No markdown fences, no explanation.`,
    ref: (coins: number[], amount: number) => {
      const INF = Infinity;
      const dp = new Array(amount + 1).fill(INF);
      dp[0] = 0;
      for (let a = 1; a <= amount; a++)
        for (const c of coins) if (a >= c) dp[a] = Math.min(dp[a], dp[a - c]! + 1);
      return dp[amount] === INF ? -1 : dp[amount];
    },
    argSets: [[[1,2,5],11], [[2],3], [[1],0], [[1,5,10,25],30], [[186,419,83,408],6249], [[2,5],4], [[3,4],1]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "Word break", lang: py,
    funcName: "word_break", signature: "word_break(s: str, words: list[str]) -> bool",
    prompt: `Return True if s can be segmented into a sequence of dictionary words (words may be reused). Example: s="leetcode", words=["leet","code"] -> True.

\`\`\`python
# BUGGY
def word_break(s, words):
    st = set(words)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in st:
                dp[i] = True
                break
    return dp[len(s)]
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def word_break(s, words):\`. No markdown fences, no explanation.`,
    ref: (s: string, words: string[]) => {
      const st = new Set(words);
      const dp = new Array(s.length + 1).fill(false);
      dp[0] = true;
      for (let i = 1; i <= s.length; i++)
        for (let j = 0; j < i; j++)
          if (dp[j] && st.has(s.slice(j, i))) { dp[i] = true; break; }
      return dp[s.length];
    },
    argSets: [["leetcode",["leet","code"]], ["applepenapple",["apple","pen"]], ["catsandog",["cats","dog","sand","and","cat"]], ["a",["b"]], ["",["a"]], ["aaaaaaa",["aaaa","aa"]], ["bb",["b"]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "Largest rectangle in histogram", lang: js,
    funcName: "largestRectangle", signature: "largestRectangle(heights: number[]): number",
    prompt: `Given bar heights of a histogram (width 1 each), return the area of the largest rectangle that can be formed. Example: [2,1,5,6,2,3] -> 10.

\`\`\`js
// BUGGY
export function largestRectangle(heights) {
  let max = 0;
  for (let i = 0; i < heights.length; i++) {
    let h = heights[i];
    for (let j = i; j < heights.length; j++) {
      h = Math.min(h, heights[j]);
      max = Math.max(max, h * (j - i));
    }
  }
  return max;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`largestRectangle\`. No markdown fences, no explanation.`,
    ref: (heights: number[]) => {
      let max = 0;
      for (let i = 0; i < heights.length; i++) {
        let h = heights[i]!;
        for (let j = i; j < heights.length; j++) {
          h = Math.min(h, heights[j]!);
          max = Math.max(max, h * (j - i + 1));
        }
      }
      return max;
    },
    argSets: [[[2,1,5,6,2,3]], [[2,4]], [[1]], [[1,1,1,1]], [[3,3,3]], [[6,2,5,4,5,1,6]], [[1,1,5,5,1,1]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "Sliding window maximum", lang: py,
    funcName: "max_sliding_window", signature: "max_sliding_window(nums: list[int], k: int) -> list[int]",
    prompt: `Return an array of the max of each contiguous window of size k. Example: nums=[1,3,-1,-3,5,3,6,7], k=3 -> [3,3,5,5,6,7].

\`\`\`python
# BUGGY
def max_sliding_window(nums, k):
    from collections import deque
    q = deque()
    out = []
    for i, n in enumerate(nums):
        while q and nums[q[-1]] <= n:
            q.pop()
        q.append(i)
        if q[0] <= i - k:
            q.popleft()
        if i >= k:
            out.append(nums[q[0]])
    return out
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def max_sliding_window(nums, k):\`. No markdown fences, no explanation.`,
    ref: (nums: number[], k: number) => {
      const q: number[] = [];
      const out: number[] = [];
      for (let i = 0; i < nums.length; i++) {
        while (q.length && nums[q[q.length - 1]!]! <= nums[i]!) q.pop();
        q.push(i);
        if (q[0]! <= i - k) q.shift();
        if (i >= k - 1) out.push(nums[q[0]!]!);
      }
      return out;
    },
    argSets: [[[1,3,-1,-3,5,3,6,7],3], [[1],1], [[7,6,5,4],2], [[1,-1],1], [[4,1,3,2],2], [[1,1,1,1,1],2]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "Median of two sorted arrays", lang: js,
    funcName: "findMedian", signature: "findMedian(a: number[], b: number[]): number",
    prompt: `Return the median of two sorted arrays a and b combined. Example: a=[1,3], b=[2] -> 2; a=[1,2], b=[3,4] -> 2.5.

\`\`\`js
// BUGGY
export function findMedian(a, b) {
  const merged = a.concat(b).sort((x, y) => x - y);
  const mid = Math.floor(merged.length / 2);
  return merged[mid];
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`findMedian\`. No markdown fences, no explanation.`,
    ref: (a: number[], b: number[]) => {
      const merged = a.concat(b).sort((x, y) => x - y);
      const n = merged.length, mid = Math.floor(n / 2);
      if (n % 2 === 1) return merged[mid];
      return (merged[mid - 1]! + merged[mid]!) / 2;
    },
    argSets: [[[1,3],[2]], [[1,2],[3,4]], [[1],[2,3,4]], [[],[1]], [[1,2,3],[]], [[0,0],[0,0]], [[-5,-1],[1,5]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "First missing positive", lang: js,
    funcName: "firstMissingPositive", signature: "firstMissingPositive(nums: number[]): number",
    prompt: `Return the smallest missing positive integer from nums (treat as unsorted; O(n) time, O(1) space). Example: [3,4,-1,1] -> 2, [1,2,0] -> 3.

\`\`\`js
// BUGGY
export function firstMissingPositive(nums) {
  const present = new Set(nums);
  let x = 1;
  while (present.has(x)) x++;
  return x;
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`firstMissingPositive\`. No markdown fences, no explanation. (Note: a Set-based solution does not satisfy the O(1) space requirement, so implement the in-place index-marking or constant-space approach.)`,
    ref: (nums: number[]) => {
      const n = nums.length;
      for (let i = 0; i < n; i++) {
        while (nums[i]! > 0 && nums[i]! <= n && nums[nums[i]! - 1] !== nums[i]) {
          const t = nums[i]!;
          nums[i] = nums[t - 1]!;
          nums[t - 1] = t;
        }
      }
      for (let i = 0; i < n; i++) if (nums[i] !== i + 1) return i + 1;
      return n + 1;
    },
    argSets: [[[3,4,-1,1]], [[1,2,0]], [[7,8,9,11,12]], [[1]], [[2]], [[0,2,2,1,1]], [[-1,-2,-3]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "Largest number from array", lang: py,
    funcName: "largest_number", signature: "largest_number(nums: list[int]) -> str",
    prompt: `Arrange the numbers so they form the largest possible number when concatenated. Return the result as a string (no leading zeros unless the number is 0). Example: [3,30,34,5,9] -> "9534330".

\`\`\`python
# BUGGY
import functools
def largest_number(nums):
    def cmp(a, b):
        return -1 if a + b < b + a else 1
    s = [str(n) for n in nums]
    s.sort(key=functools.cmp_to_key(cmp))
    res = "".join(s)
    return res
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def largest_number(nums):\`. No markdown fences, no explanation.`,
    ref: (nums: number[]) => {
      const s = nums.map(String);
      s.sort((x, y) => (y + x).localeCompare(x + y));
      const res = s.join("");
      return res.replace(/^0+(?=.)/, "") || "0";
    },
    argSets: [[[3,30,34,5,9]], [[10,2]], [[3,30,34,5,9]], [[0,0]], [[1]], [[9,90,99]], [[432,43,4321]], [[12,121]]],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "Number of islands", lang: py,
    funcName: "num_islands", signature: "num_islands(grid: list[list[str]]) -> int",
    prompt: `Given an m x n 2D grid of '1's (land) and '0's (water), return the number of islands. An island is a group of adjacent lands connected horizontally/vertically. Example: a 4x5 grid with two '1' clusters -> 2.

\`\`\`python
# BUGGY
def num_islands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == "0":
            return
        grid[r][c] = "0"
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count += 1
                dfs(r, c)
    return count
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected \`def num_islands(grid):\`. No markdown fences, no explanation.`,
    ref: (grid: string[][]) => {
      if (!grid.length) return 0;
      const rows = grid.length, cols = grid[0]!.length;
      const g = grid.map((row) => row.slice());
      let count = 0;
      const dfs = (r: number, c: number) => {
        if (r < 0 || r >= rows || c < 0 || c >= cols || g[r]![c] === "0") return;
        g[r]![c] = "0";
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
      };
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          if (g[r]![c] === "1") { count++; dfs(r, c); }
      return count;
    },
    argSets: [
      [[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]],
      [[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]],
      [[["1"]]],
      [[["0"]]],
      [[["1","0","1"],["0","1","0"],["1","0","1"]]],
      [[]],
      [[["1","1"],["1","1"]]],
    ],
  }),
);
tasks.push(
  c({
    category: "coding-bugfix", difficulty: 3, title: "Basic calculator II", lang: js,
    funcName: "calculate", signature: "calculate(s: string): number",
    prompt: `Evaluate the string expression s which contains non-negative integers, spaces, and operators + - * /. Apply the operators between operands in standard precedence. Integer division truncates toward zero. Example: "3+2*2" -> 7, " 3/2 " -> 1.

\`\`\`js
// BUGGY
export function calculate(s) {
  const stack = [];
  let num = 0, sign = "+";
  for (let i = 0; i < s.length; i++) {
    if (s[i] >= "0" && s[i] <= "9") num = num * 10 + Number(s[i]);
    if ((s[i] < "0" || s[i] > "9") && s[i] !== " " || i === s.length - 1) {
      if (sign === "+") stack.push(num);
      else if (sign === "-") stack.push(-num);
      else if (sign === "*") stack.push(stack.pop() * num);
      else if (sign === "/") stack.push(Math.trunc(stack.pop() / num));
      sign = s[i];
      num = 0;
    }
  }
  return stack.reduce((a, b) => a + b, 0);
}
\`\`\`

Rewrite the function so it is correct. Output ONLY the corrected function as an ES module exporting \`calculate\`. No markdown fences, no explanation.`,
    ref: (s: string) => {
      const stack: number[] = [];
      let num = 0, sign = "+";
      for (let i = 0; i < s.length; i++) {
        if (s[i]! >= "0" && s[i]! <= "9") num = num * 10 + Number(s[i]);
        if ((s[i]! < "0" || s[i]! > "9") && s[i] !== " " || i === s.length - 1) {
          if (sign === "+") stack.push(num);
          else if (sign === "-") stack.push(-num);
          else if (sign === "*") stack.push(stack.pop()! * num);
          else if (sign === "/") stack.push(Math.trunc(stack.pop()! / num));
          sign = s[i]!;
          num = 0;
        }
      }
      return stack.reduce((a, b) => a + b, 0);
    },
    argSets: [["3+2*2"], [" 3/2 "], [" 3+5 / 2 "], ["1-1+1"], ["42"], ["14-3/2"], ["2*3*4"], ["100-5*4/2"]],
  }),
);

export default tasks;
