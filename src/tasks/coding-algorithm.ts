import type { Task } from "../types.ts";
import { codeTaskDef as c } from "./helpers.ts";

const tasks: Task[] = [];

const js = "javascript" as const;
const py = "python" as const;

const jsPromptSuffix =
  "\n\nOutput ONLY the function definition as an ES module exporting the function (e.g. `export function ...`). Do not include markdown fences, explanation, wrapper script, or tests.";
const pyPromptSuffix =
  "\n\nOutput ONLY the function definition (e.g. `def ...`). No markdown fences, no explanation, no main block.";

// ---------------------------------------------------------------------------
// LEVEL 1
// ---------------------------------------------------------------------------

// 1. Two-sum count of pairs (deterministic: returns count)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Target sum pair count",
    lang: js,
    funcName: "pairCount",
    signature: "pairCount(nums: number[], target: number): number",
    prompt:
      "Write a function `pairCount(nums, target)` that returns the number of (unordered) index pairs (i, j) with i < j such that `nums[i] + nums[j] === target`." +
      jsPromptSuffix,
    ref: (nums: number[], target: number) => {
      let count = 0;
      for (let i = 0; i < nums.length; i++)
        for (let j = i + 1; j < nums.length; j++)
          if (nums[i]! + nums[j]! === target) count++;
      return count;
    },
    argSets: [
      [[1, 2, 3, 4, 5], 6],
      [[1, 1, 1, 1], 2],
      [[0, 0, 0], 0],
      [[], 5],
      [[3], 3],
      [[-1, 0, 1, 2, -2], 0],
      [[1, 2, 3], 100],
      [[5, 5, 5, 5, 5], 10],
    ],
  }),
);

// 2. Find the second largest distinct element
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Second largest element",
    lang: py,
    funcName: "second_largest",
    signature: "second_largest(nums: list) -> int",
    prompt:
      "Write `second_largest(nums)` in Python returning the second largest DISTINCT element. Return None if there are fewer than two distinct elements." +
      pyPromptSuffix,
    ref: (nums: number[]) => {
      let first = -Infinity, second = -Infinity;
      for (const n of nums) {
        if (n > first) { second = first; first = n; }
        else if (n > second && n < first) second = n;
      }
      return second === -Infinity ? null : second;
    },
    argSets: [
      [[3, 1, 4, 1, 5]],
      [[5, 5, 5]],
      [[7]],
      [[10, 9, 8, 7]],
      [[1, 2]],
      [[2, 2, 1]],
      [[-1, -5, -3, -2]],
      [[100, 50, 50, 75]],
    ],
  }),
);

// 3. Fibonacci index parity of count (deterministic count of odd numbers in range)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Count primes up to n",
    lang: js,
    funcName: "countPrimes",
    signature: "countPrimes(n: number): number",
    prompt:
      "Write `countPrimes(n)` returning the number of prime numbers strictly less than `n`. Use a sieve for efficiency. `n` is in [0, 10^6]." +
      jsPromptSuffix,
    ref: (n: number) => {
      if (n <= 2) return 0;
      const isPrime = new Uint8Array(n).fill(1);
      isPrime[0] = isPrime[1] = 0;
      for (let i = 2; i * i < n; i++) {
        if (isPrime[i]) for (let j = i * i; j < n; j += i) isPrime[j] = 0;
      }
      let count = 0;
      for (let i = 2; i < n; i++) if (isPrime[i]) count++;
      return count;
    },
    argSets: [[0], [1], [2], [10], [20], [100], [1000], [50000]],
  }),
);

// 4. Array intersection (sorted, deterministic) - level 1
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Sorted array intersection",
    lang: py,
    funcName: "intersection",
    signature: "intersection(a: list, b: list) -> list",
    prompt:
      "Write `intersection(a, b)` in Python returning a sorted list of the distinct values common to both lists `a` and `b`." +
      pyPromptSuffix,
    ref: (a: number[], b: number[]) => {
      const setA = new Set(a);
      const out = [...new Set(b.filter((x) => setA.has(x)))].sort((x, y) => x - y);
      return out;
    },
    argSets: [
      [[1, 2, 2, 1], [2, 2]],
      [[4, 9, 5], [9, 4, 9, 8, 4]],
      [[], [1, 2, 3]],
      [[1, 2, 3], []],
      [[1, 1, 1], [1, 1]],
      [[1, 2, 3], [4, 5, 6]],
      [[3, 1, 2], [2, 3, 1]],
      [[1, 2, 3, 4], [3, 4, 5, 6]],
    ],
  }),
);

// 5. Decimal sum of digits
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Sum of digits",
    lang: js,
    funcName: "sumDigits",
    signature: "sumDigits(n: number): number",
    prompt:
      "Write `sumDigits(n)` returning the sum of the decimal digits of non-negative integer `n`. Example: `sumDigits(1234) === 10`." +
      jsPromptSuffix,
    ref: (n: number) => {
      let s = 0;
      let x = n;
      while (x > 0) { s += x % 10; x = Math.floor(x / 10); }
      return n === 0 ? 0 : s;
    },
    argSets: [[0], [5], [1234], [99999], [10], [1000000], [24680], [7]],
  }),
);

// 6. Contains duplicate
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Contains duplicate",
    lang: py,
    funcName: "has_duplicate",
    signature: "has_duplicate(nums: list) -> bool",
    prompt:
      "Write `has_duplicate(nums)` in Python returning True if any value appears at least twice in the list, else False." +
      pyPromptSuffix,
    ref: (nums: number[]) => new Set(nums).size !== nums.length,
    argSets: [
      [[1, 2, 3, 1]],
      [[1, 2, 3, 4]],
      [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]],
      [[]],
      [[5]],
      [[-1, -2, -1]],
      [[0, 1, 2, 3]],
    ],
  }),
);

// 7. Max value in array (deterministic tie-break returns count of max)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Frequency of maximum",
    lang: js,
    funcName: "maxCount",
    signature: "maxCount(nums: number[]): number",
    prompt:
      "Write `maxCount(nums)` returning how many times the maximum value appears in the array. Return 0 for an empty array." +
      jsPromptSuffix,
    ref: (nums: number[]) => {
      if (!nums.length) return 0;
      const max = Math.max(...nums);
      return nums.filter((x) => x === max).length;
    },
    argSets: [
      [[3, 1, 3, 3, 2]],
      [[]],
      [[7]],
      [[1, 1, 1]],
      [[-1, -5, -1, -1]],
      [[100, 99, 100, 98, 100]],
      [[0, 0, 0, 0]],
    ],
  }),
);

// 8. Perfect square check
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Is perfect square",
    lang: py,
    funcName: "is_perfect_square",
    signature: "is_perfect_square(n: int) -> bool",
    prompt:
      "Write `is_perfect_square(n)` in Python returning True if `n` is a perfect square (non-negative integer square), else False. Do not rely on floating point root; use integer arithmetic." +
      pyPromptSuffix,
    ref: (n: number) => {
      if (n < 0) return false;
      let lo = 0, hi = n;
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const sq = mid * mid;
        if (sq === n) return true;
        if (sq < n) lo = mid + 1;
        else hi = mid - 1;
      }
      return false;
    },
    argSets: [[0], [1], [4], [16], [25], [100], [2147395600], [24], [2], [3], [2147483647]],
  }),
);

// 9. Count negative numbers in sorted grid
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Count negatives in grid",
    lang: js,
    funcName: "countNegatives",
    signature: "countNegatives(grid: number[][]): number",
    prompt:
      "Write `countNegatives(grid)` returning the number of negative numbers in an `m x n` grid where each row is sorted in decreasing order (and each column is sorted in decreasing order)." +
      jsPromptSuffix,
    ref: (grid: number[][]) => {
      const m = grid.length, n = grid[0]!.length;
      let count = 0;
      let row = 0, col = n - 1;
      while (row < m && col >= 0) {
        if (grid[row]![col]! < 0) { count += m - row; col--; }
        else row++;
      }
      return count;
    },
    argSets: [
      [[[4, 3, 2, -1], [3, 2, 1, -1], [1, 1, -1, -2], [-1, -1, -2, -3]]],
      [[[3, 2], [1, 0]]],
      [[[1, -1], [-1, -1]]],
      [[[-1]]],
      [[[5, 4, 3, 2, 1]]],
      [[[0]]],
      [[[3, -2], [2, -3], [1, -4]]],
    ],
  }),
);

// 10. Richest customer wealth
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Maximum row sum",
    lang: py,
    funcName: "max_wealth",
    signature: "max_wealth(accounts: list) -> int",
    prompt:
      "Write `max_wealth(accounts)` in Python where `accounts[i]` is a list of the bank balances of customer i. Return the wealth (sum) of the richest customer." +
      pyPromptSuffix,
    ref: (accounts: number[][]) => {
      let best = 0;
      for (const row of accounts) {
        const s = row.reduce((a, b) => a + b, 0);
        if (s > best) best = s;
      }
      return best;
    },
    argSets: [
      [[[1, 2, 3], [3, 2, 1]]],
      [[[1, 5], [7, 3], [3, 5]]],
      [[[2, 8, 7], [7, 1, 3], [1, 9, 5]]],
      [[[1]]],
      [[[0, 0, 0], [1, 1, 1]]],
      [[[5, 5], [4, 4], [3, 3]]],
    ],
  }),
);

// 11. Number of 1 bits (popcount) - level 1 but bit manipulation
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Hamming weight",
    lang: js,
    funcName: "hammingWeight",
    signature: "hammingWeight(n: number): number",
    prompt:
      "Write `hammingWeight(n)` returning the number of 1 bits in the 32-bit unsigned binary representation of non-negative integer `n`." +
      jsPromptSuffix,
    ref: (n: number) => {
      let x = n >>> 0;
      let count = 0;
      while (x > 0) { x &= x - 1; count++; }
      return count;
    },
    argSets: [[0], [1], [2], [3], [7], [8], [255], [2147483647], [1024]],
  }),
);

// 12. Sorted squares
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Squares of sorted array",
    lang: js,
    funcName: "sortedSquares",
    signature: "sortedSquares(nums: number[]): number[]",
    prompt:
      "Write `sortedSquares(nums)` where `nums` is sorted ascending (may contain negatives). Return an array of the squares of each number, sorted ascending. Use two pointers for O(n)." +
      jsPromptSuffix,
    ref: (nums: number[]) => nums.map((x) => x * x).sort((a, b) => a - b),
    argSets: [
      [[-4, -1, 0, 3, 10]],
      [[-7, -3, 2, 3, 11]],
      [[-5, -4, -1]],
      [[0, 1, 2, 3]],
      [[1, 2, 3, 4]],
      [[-10, -10, 0, 10, 10]],
      [[-2, -1, 0, 1, 2]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// LEVEL 2
// ---------------------------------------------------------------------------

// 13. Merge intervals
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Merge intervals",
    lang: js,
    funcName: "merge",
    signature: "merge(intervals: number[][]): number[][]",
    prompt:
      "Write `merge(intervals)` merging all overlapping intervals. `intervals` is an array of `[start, end]` pairs (end inclusive). Return the merged intervals sorted by start." +
      jsPromptSuffix,
    ref: (intervals: number[][]) => {
      const sorted = [...intervals].sort((a, b) => a[0]! - b[0]!);
      const out: number[][] = [];
      for (const [s, e] of sorted) {
        if (!out.length || out[out.length - 1]![1]! < s) out.push([s, e]);
        else out[out.length - 1]![1] = Math.max(out[out.length - 1]![1]!, e);
      }
      return out;
    },
    argSets: [
      [[[1, 3], [2, 6], [8, 10], [15, 18]]],
      [[[1, 4], [4, 5]]],
      [[[1, 2], [3, 4], [5, 6]]],
      [[[1, 10]]],
      [[[2, 3], [1, 2], [3, 4], [4, 5]]],
      [[[1, 4], [0, 2], [3, 5]]],
      [[[6, 8], [1, 9], [2, 4], [4, 7]]],
    ],
  }),
);

// 14. Meeting rooms - can attend all (interval non-overlap check)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Can attend all meetings",
    lang: py,
    funcName: "can_attend",
    signature: "can_attend(intervals: list) -> bool",
    prompt:
      "Write `can_attend(intervals)` in Python. `intervals` is a list of `[start, end]` meetings where end is exclusive. Return True if a person can attend all meetings without overlap." +
      pyPromptSuffix,
    ref: (intervals: number[][]) => {
      const sorted = [...intervals].sort((a, b) => a[0]! - b[0]!);
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i]![0]! < sorted[i - 1]![1]!) return false;
      }
      return true;
    },
    argSets: [
      [[[0, 30], [5, 10], [15, 20]]],
      [[[7, 10], [2, 4]]],
      [[[1, 5], [5, 10], [10, 15]]],
      [[[1, 2], [2, 3], [3, 4], [4, 5]]],
      [[[0, 8], [8, 10], [5, 9]]],
      [[[13, 15], [1, 13]]],
      [[]],
      [[[0, 1], [1, 2]]],
    ],
  }),
);

// 15. Longest consecutive sequence length
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Longest consecutive sequence",
    lang: js,
    funcName: "longestConsecutive",
    signature: "longestConsecutive(nums: number[]): number",
    prompt:
      "Write `longestConsecutive(nums)` returning the length of the longest consecutive elements sequence (values differing by 1) in the array, treating the array as an unordered set. O(n) time." +
      jsPromptSuffix,
    ref: (nums: number[]) => {
      const set = new Set(nums);
      let best = 0;
      for (const n of set) {
        if (!set.has(n - 1)) {
          let len = 1;
          let x = n;
          while (set.has(x + 1)) { x++; len++; }
          best = Math.max(best, len);
        }
      }
      return best;
    },
    argSets: [
      [[100, 4, 200, 1, 3, 2]],
      [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]],
      [[]],
      [[1]],
      [[1, 1, 1, 1]],
      [[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]],
      [[5, 4, 3, 2, 1]],
    ],
  }),
);

// 16. Task scheduler (intervals with cooldown) - count min intervals
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Task scheduler",
    lang: py,
    funcName: "least_interval",
    signature: "least_interval(tasks: list, n: int) -> int",
    prompt:
      "Write `least_interval(tasks, n)` in Python. `tasks` is a list of letters where each letter is a task type. Return the least number of unit time slots needed so the same task type is separated by at least `n` units of idle time." +
      pyPromptSuffix,
    ref: (tasks: string[], n: number) => {
      const freq = new Map<string, number>();
      for (const t of tasks) freq.set(t, (freq.get(t) ?? 0) + 1);
      const vals = [...freq.values()];
      const maxFreq = Math.max(...vals);
      const maxCount = vals.filter((v) => v === maxFreq).length;
      const partCount = maxFreq - 1;
      const partLength = n + 1;
      const emplace = partCount * (partLength - maxCount) + maxCount * partCount + maxCount;
      return Math.max(tasks.length, partCount * partLength + maxCount);
    },
    argSets: [
      [["A", "A", "A", "B", "B", "B"], 2],
      [["A", "C", "A", "B", "D", "B"], 1],
      [["A", "A", "A", "B", "B", "B"], 3],
      [["A"], 5],
      [["A", "A", "A", "A", "A", "A"], 2],
      [["A", "B", "C", "D", "E", "F"], 3],
      [["A", "A", "A", "B", "B", "B", "C", "C", "C"], 1],
    ],
  }),
);

// 17. Jump game (can reach end)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Jump game",
    lang: js,
    funcName: "canJump",
    signature: "canJump(nums: number[]): boolean",
    prompt:
      "Write `canJump(nums)` where `nums[i]` is the maximum jump length from position i. Return true if you can reach the last index, else false. Greedy, O(n)." +
      jsPromptSuffix,
    ref: (nums: number[]) => {
      let reach = 0;
      for (let i = 0; i < nums.length; i++) {
        if (i > reach) return false;
        reach = Math.max(reach, i + nums[i]!);
      }
      return reach >= nums.length - 1;
    },
    argSets: [
      [[2, 3, 1, 1, 4]],
      [[3, 2, 1, 0, 4]],
      [[0]],
      [[0, 1]],
      [[1, 1, 1, 1]],
      [[2, 0, 0]],
      [[2, 5, 0, 0]],
      [[3, 0, 8, 2, 0, 0, 1]],
    ],
  }),
);

// 18. House robber (DP)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "House robber",
    lang: js,
    funcName: "rob",
    signature: "rob(nums: number[]): number",
    prompt:
      "Write `rob(nums)` returning the max sum you can steal from non-adjacent houses. `nums[i]` is money in house i; you cannot rob two adjacent houses. DP." +
      jsPromptSuffix,
    ref: (nums: number[]) => {
      let prev = 0, cur = 0;
      for (const n of nums) [prev, cur] = [cur, Math.max(cur, prev + n)];
      return cur;
    },
    argSets: [
      [[1, 2, 3, 1]],
      [[2, 7, 9, 3, 1]],
      [[]],
      [[5]],
      [[1, 2]],
      [[2, 1, 1, 2]],
      [[1, 3, 1, 3, 100]],
      [[100, 1, 1, 100]],
    ],
  }),
);

// 19. Best time to buy and sell stock
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Max profit one transaction",
    lang: py,
    funcName: "max_profit",
    signature: "max_profit(prices: list) -> int",
    prompt:
      "Write `max_profit(prices)` in Python returning the maximum profit from buying one day and selling on a later day. Return 0 if no profit possible." +
      pyPromptSuffix,
    ref: (prices: number[]) => {
      let min = Infinity, best = 0;
      for (const p of prices) {
        min = Math.min(min, p);
        best = Math.max(best, p - min);
      }
      return best;
    },
    argSets: [
      [[7, 1, 5, 3, 6, 4]],
      [[7, 6, 4, 3, 1]],
      [[1]],
      [[1, 2, 3, 4, 5]],
      [[5, 4, 3]],
      [[2, 9, 1, 5, 6]],
      [[3, 100, 1, 97]],
      [[6, 2, 3, 8, 1, 4]],
    ],
  }),
);

// 20. Container with most water (two pointers) - categorical variant returns area
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Max water container",
    lang: js,
    funcName: "maxArea",
    signature: "maxArea(height: number[]): number",
    prompt:
      "Write `maxArea(height)` where `height[i]` is the height of a vertical line at position i. Return the maximum area of water that two lines and the x-axis (distance between their indices) can hold. O(n) two pointers." +
      jsPromptSuffix,
    ref: (h: number[]) => {
      let l = 0, r = h.length - 1, best = 0;
      while (l < r) {
        best = Math.max(best, Math.min(h[l]!, h[r]!) * (r - l));
        if (h[l]! < h[r]!) l++;
        else r--;
      }
      return best;
    },
    argSets: [
      [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
      [[1, 1]],
      [[4, 3, 2, 1, 4]],
      [[1, 2, 1]],
      [[2, 3, 10, 5, 7, 8, 9]],
      [[100, 1, 1, 1, 1, 100]],
      [[3, 9, 2, 8, 4, 7, 5]],
    ],
  }),
);

// 21. Three sum closest / triple sum deterministic: count triplets with sum == target
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Count triplets equal sum",
    lang: py,
    funcName: "triplet_count",
    signature: "triplet_count(nums: list, target: int) -> int",
    prompt:
      "Write `triplet_count(nums, target)` in Python returning the number of index triplets (i, j, k) with i < j < k such that `nums[i] + nums[j] + nums[k] === target`." +
      pyPromptSuffix,
    ref: (nums: number[], target: number) => {
      let count = 0;
      nums.sort((a, b) => a - b);
      const n = nums.length;
      for (let i = 0; i < n - 2; i++) {
        let lo = i + 1, hi = n - 1;
        while (lo < hi) {
          const s = nums[i]! + nums[lo]! + nums[hi]!;
          if (s === target) {
            let li = lo, hi0 = hi;
            const a = nums[lo], b = nums[hi];
            if (a === b) {
              const len = hi - lo + 1;
              count += (len * (len - 1)) / 2;
              lo = hi;
            } else {
              let c1 = 0;
              while (li < n && nums[li] === a) { c1++; li++; }
              let c2 = 0;
              while (hi0 >= 0 && nums[hi0] === b) { c2++; hi0--; }
              count += c1 * c2;
              lo = li;
              hi = hi0;
            }
            while (lo < n && nums[lo] === a) lo++;
            while (hi >= 0 && nums[hi] === b) hi--;
          } else if (s < target) {
            lo++;
          } else {
            hi--;
          }
        }
        while (i + 1 < n && nums[i + 1] === nums[i]) i++;
      }
      return count;
    },
    argSets: [
      [[1, 1, 1, 1, 1], 3],
      [[0, 0, 0, 0], 0],
      [[1, 2, 3, 4, 5], 9],
      [[-1, 0, 1, 2, -1, -4], 0],
      [[1, 2, 3], 6],
      [[1, 1, 2, 2, 3, 3], 6],
      [[]],
      [[5, 5, 5, 5, 5, 5], 15],
    ],
  }),
);

// 22. Subarray sum equals k (count) - prefix sums + hashmap
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Subarray sum equals k count",
    lang: js,
    funcName: "subarraySum",
    signature: "subarraySum(nums: number[], k: number): number",
    prompt:
      "Write `subarraySum(nums, k)` returning the number of contiguous subarrays whose sum equals `k`. Use a prefix-sum hash map for O(n)." +
      jsPromptSuffix,
    ref: (nums: number[], k: number) => {
      const map = new Map<number, number>();
      map.set(0, 1);
      let sum = 0, count = 0;
      for (const n of nums) {
        sum += n;
        count += map.get(sum - k) ?? 0;
        map.set(sum, (map.get(sum) ?? 0) + 1);
      }
      return count;
    },
    argSets: [
      [[1, 1, 1], 2],
      [[1, 2, 3], 3],
      [[1], 0],
      [[0, 0, 0, 0], 0],
      [[-1, -1, 1], 0],
      [[1, -1, 1, -1], 0],
      [[3, 4, 7, 2, -3, 1, 4, 2], 7],
      [[1, 2, 1, 2, 1], 3],
    ],
  }),
);

// 23. Daily temperatures (monotonic stack) - returns days until warmer
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Daily temperatures",
    lang: js,
    funcName: "dailyTemperatures",
    signature: "dailyTemperatures(temperatures: number[]): number[]",
    prompt:
      "Write `dailyTemperatures(temperatures)` returning an array where answer[i] is the number of days until a warmer temperature (strictly greater), or 0 if no warmer day comes. Monotonic stack, O(n)." +
      jsPromptSuffix,
    ref: (temps: number[]) => {
      const n = temps.length;
      const out = new Array(n).fill(0);
      const stack: number[] = [];
      for (let i = 0; i < n; i++) {
        while (stack.length && temps[stack[stack.length - 1]!]! < temps[i]!) {
          const idx = stack.pop()!;
          out[idx] = i - idx;
        }
        stack.push(i);
      }
      return out;
    },
    argSets: [
      [[73, 74, 75, 71, 69, 72, 76, 73]],
      [[30, 40, 50, 60]],
      [[30, 60, 90]],
      [[90, 80, 70, 60]],
      [[100]],
      [[55, 54, 53, 100]],
      [[34, 80, 80, 34, 34, 34, 100]],
    ],
  }),
);

// 24. Number of islands (BFS/DFS grid)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Number of Islands",
    lang: py,
    funcName: "num_islands",
    signature: "num_islands(grid: list) -> int",
    prompt:
      "Write `num_islands(grid)` in Python. `grid` is an m x n list of '0'/'1' strings where '1' is land. Return the number of islands, where an island is 1-cells connected horizontally or vertically." +
      pyPromptSuffix,
    ref: (grid: string[][]) => {
      if (!grid.length) return 0;
      const m = grid.length, n = grid[0]!.length;
      const done: boolean[][] = grid.map(() => new Array(n).fill(false));
      let count = 0;
      const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          if (grid[i]![j] === "1" && !done[i]![j]) {
            count++;
            const stack = [[i, j]];
            done[i]![j] = true;
            while (stack.length) {
              const [r, c] = stack.pop()!;
              for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr]![nc] === "1" && !done[nr]![nc]) {
                  done[nr]![nc] = true;
                  stack.push([nr, nc]);
                }
              }
            }
          }
        }
      }
      return count;
    },
    argSets: [
      [["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]],
      [["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]],
      [["0"]],
      [["1"]],
      [["1", "0", "1"], ["0", "1", "0"], ["1", "0", "1"]],
      [["0", "0", "0"], ["0", "0", "0"]],
      [["1", "1"], ["1", "1"]],
    ],
  }),
);

// 25. Course schedule (cycle detection in DAG) - can finish
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Course schedule cycle check",
    lang: js,
    funcName: "canFinish",
    signature: "canFinish(numCourses: number, prerequisites: number[][]): boolean",
    prompt:
      "Write `canFinish(numCourses, prerequisites)` returning true if all courses can be finished. `prerequisites[i] = [a, b]` means you must take course b before course a. Return false if there is a cycle. Topological sort / Kahn's algorithm." +
      jsPromptSuffix,
    ref: (numCourses: number, prereqs: number[][]) => {
      const adj: number[][] = Array.from({ length: numCourses }, () => []);
      const indeg = new Array(numCourses).fill(0);
      for (const [a, b] of prereqs) { adj[b]!.push(a); indeg[a]!++; }
      const q: number[] = [];
      for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
      let count = 0;
      while (q.length) {
        const c = q.shift()!;
        count++;
        for (const nx of adj[c]!) if (--indeg[nx] === 0) q.push(nx);
      }
      return count === numCourses;
    },
    argSets: [
      [2, [[1, 0]]],
      [2, [[1, 0], [0, 1]]],
      [3, [[0, 1], [2, 1], [1, 0]]],
      [4, [[1, 0], [2, 0], [3, 1], [3, 2]]],
      [5, [[0, 1], [2, 3], [3, 0], [1, 2]]],
      [1, []],
      [6, [[1, 0], [2, 1], [3, 2], [4, 3], [5, 4]]],
    ],
  }),
);

// 26. Coin change - minimum coins (DP) clone: min coins to reach amount
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Minimum coins to amount",
    lang: py,
    funcName: "coin_change",
    signature: "coin_change(coins: list, amount: int) -> int",
    prompt:
      "Write `coin_change(coins, amount)` in Python returning the fewest number of coins needed to make `amount` with unlimited coins of each denomination. Return -1 if impossible." +
      pyPromptSuffix,
    ref: (coins: number[], amount: number) => {
      const dp = new Array(amount + 1).fill(Infinity);
      dp[0] = 0;
      for (let a = 1; a <= amount; a++) {
        for (const c of coins) if (c <= a) dp[a] = Math.min(dp[a], dp[a - c]! + 1);
      }
      return dp[amount] === Infinity ? -1 : dp[amount];
    },
    argSets: [
      [[1, 2, 5], 11],
      [[2], 3],
      [[1], 0],
      [[1, 3, 4, 5], 7],
      [[2, 4, 6], 3],
      [[186, 419, 83, 408], 6249],
      [[1, 2, 5], 100],
    ],
  }),
);

// 27. Wiggle sort (deterministic: return number of "peaks" pattern variant - longest wiggle subsequence length)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Wiggle subsequence length",
    lang: js,
    funcName: "wiggleMaxLength",
    signature: "wiggleMaxLength(nums: number[]): number",
    prompt:
      "Write `wiggleMaxLength(nums)` returning the length of the longest subsequence that alternates strictly up and down (wiggle). Consecutive equal values collapse. Example `[1,7,4,9,2,5]` -> 6." +
      jsPromptSuffix,
    ref: (nums: number[]) => {
      if (!nums.length) return 0;
      let up = 1, down = 1;
      for (let i = 1; i < nums.length; i++) {
        if (nums[i]! > nums[i - 1]!) up = down + 1;
        else if (nums[i]! < nums[i - 1]!) down = up + 1;
      }
      return Math.max(up, down);
    },
    argSets: [
      [[1, 7, 4, 9, 2, 5]],
      [[1, 17, 5, 10, 13, 15, 10, 5, 16, 8]],
      [[1, 2, 3, 4, 5]],
      [[5, 4, 3, 2, 1]],
      [[1, 1, 1]],
      [[1]],
      [[1, 1]],
    ],
  }),
);

// 28. Minimum size subarray sum (sliding window)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Min subarray length sum >= target",
    lang: js,
    funcName: "minSubArrayLen",
    signature: "minSubArrayLen(target: number, nums: number[]): number",
    prompt:
      "Write `minSubArrayLen(target, nums)` returning the minimal length of a contiguous subarray whose sum is >= `target`, or 0 if none. Sliding window, O(n)." +
      jsPromptSuffix,
    ref: (target: number, nums: number[]) => {
      let left = 0, sum = 0, best = Infinity;
      for (let right = 0; right < nums.length; right++) {
        sum += nums[right]!;
        while (sum >= target) {
          best = Math.min(best, right - left + 1);
          sum -= nums[left]!;
          left++;
        }
      }
      return best === Infinity ? 0 : best;
    },
    argSets: [
      [7, [2, 3, 1, 2, 4, 3]],
      [4, [1, 4, 4]],
      [11, [1, 1, 1, 1, 1, 1, 1, 1]],
      [15, [5, 1, 3, 5, 10, 7, 4, 9, 2, 8]],
      [100, [1, 2, 3]],
      [6, [1, 2, 3, 4, 5]],
      [1, [1]],
      [5, [2, 3, 1, 1, 1]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// LEVEL 3
// ---------------------------------------------------------------------------

// 29. Max product subarray
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Maximum product subarray",
    lang: js,
    funcName: "maxProduct",
    signature: "maxProduct(nums: number[]): number",
    prompt:
      "Write `maxProduct(nums)` returning the maximum product of any contiguous (non-empty) subarray. `nums` can contain negatives and zeros. O(n) with tracking max/min." +
      jsPromptSuffix,
    ref: (nums: number[]) => {
      let best = -Infinity;
      let curMax = 1, curMin = 1;
      for (const n of nums) {
        const a = curMax * n, b = curMin * n;
        curMax = Math.max(n, a, b);
        curMin = Math.min(n, a, b);
        best = Math.max(best, curMax);
      }
      return best;
    },
    argSets: [
      [[2, 3, -2, 4]],
      [[-2, 0, -1]],
      [[0]],
      [[-1]],
      [[1, -2, 3, -4]],
      [[2, -5, 3, 1, -1, 0, -2]],
      [[-2, -3, 4, -1]],
      [[0, 0, 0]],
    ],
  }),
);

// 30. Longest increasing subsequence length
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Longest increasing subsequence",
    lang: py,
    funcName: "lis_length",
    signature: "lis_length(nums: list) -> int",
    prompt:
      "Write `lis_length(nums)` in Python returning the length of the longest strictly increasing subsequence. O(n log n) using patience sorting." +
      pyPromptSuffix,
    ref: (nums: number[]) => {
      const tails: number[] = [];
      for (const n of nums) {
        let lo = 0, hi = tails.length;
        while (lo < hi) {
          const mid = Math.floor((lo + hi) / 2);
          if (tails[mid]! < n) lo = mid + 1;
          else hi = mid;
        }
        if (lo === tails.length) tails.push(n);
        else tails[lo] = n;
      }
      return tails.length;
    },
    argSets: [
      [[10, 9, 2, 5, 3, 7, 101, 18]],
      [[0, 1, 0, 3, 2, 3]],
      [[7, 7, 7, 7]],
      [[1, 2, 3, 4, 5]],
      [[5, 4, 3, 2, 1]],
      [[4, 10, 4, 3, 8, 9]],
      [[3, 1, 2, 1, 8, 5, 6, 7]],
      [[1]],
    ],
  }),
);

// 31. Find median of two sorted arrays (hard)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Median of two sorted arrays",
    lang: js,
    funcName: "findMedianSortedArrays",
    signature: "findMedianSortedArrays(nums1: number[], nums2: number[]): number",
    prompt:
      "Write `findMedianSortedArrays(nums1, nums2)` returning the median of the two sorted arrays combined, as a number. If even length return the average of the two middle values. O(log(min(m,n)))." +
      jsPromptSuffix,
    ref: (a: number[], b: number[]) => {
      if (a.length > b.length) [a, b] = [b, a];
      const m = a.length, n = b.length;
      let lo = 0, hi = m;
      const total = m + n;
      while (lo <= hi) {
        const i = Math.floor((lo + hi) / 2);
        const j = Math.floor((total + 1) / 2) - i;
        const aL = i === 0 ? -Infinity : a[i - 1]!;
        const aR = i === m ? Infinity : a[i]!;
        const bL = j === 0 ? -Infinity : b[j - 1]!;
        const bR = j === n ? Infinity : b[j]!;
        if (aL <= bR && bL <= aR) {
          const maxLeft = Math.max(aL, bL);
          if (total % 2 === 1) return maxLeft;
          const minRight = Math.min(aR, bR);
          return (maxLeft + minRight) / 2;
        } else if (aL > bR) {
          hi = i - 1;
        } else {
          lo = i + 1;
        }
      }
      return 0;
    },
    argSets: [
      [[1, 3], [2]],
      [[1, 2], [3, 4]],
      [[0, 0], [0, 0]],
      [[], [1]],
      [[2], []],
      [[1, 3, 5, 7], [2, 4, 6, 8, 10]],
      [[1, 5, 9], [2, 3, 4, 6, 7, 8, 10, 11]],
      [[-5, -1], [-4, 0, 2]],
    ],
  }),
);

// 32. Burst balloons / matrix chain - use "burst balloon" deterministic max coins
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Burst balloons max coins",
    lang: py,
    funcName: "max_coins",
    signature: "max_coins(nums: list) -> int",
    prompt:
      "Write `max_coins(nums)` in Python. Balloons numbered 0..n-1 have value in `nums`. Popping balloon i earns `nums[i-1] * nums[i] * nums[i+1]` (out-of-bound balloons are treated as value 1). Return the maximum coins obtainable by popping all balloons. Use DP over intervals." +
      pyPromptSuffix,
    ref: (nums: number[]) => {
      const n = nums.length;
      const arr = [1, ...nums, 1];
      const dp: number[][] = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(0));
      for (let len = 1; len <= n; len++) {
        for (let l = 1; l + len - 1 <= n; l++) {
          const r = l + len - 1;
          for (let k = l; k <= r; k++) {
            dp[l]![r] = Math.max(
              dp[l]![r]!,
              dp[l]![k - 1]! + dp[k + 1]![r]! + arr[l - 1]! * arr[k]! * arr[r + 1]!,
            );
          }
        }
      }
      return dp[1]![n]!;
    },
    argSets: [
      [[3, 1, 5, 8]],
      [[1, 5]],
      [[5]],
      [[3, 7, 9]],
      [[1, 2, 3, 4, 5]],
      [[2, 1, 2, 1, 2]],
      [[]],
    ],
  }),
);

// 33. Word break (can segment) - level 3 DP
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Word break",
    lang: js,
    funcName: "wordBreak",
    signature: "wordBreak(s: string, wordDict: string[]): boolean",
    prompt:
      "Write `wordBreak(s, wordDict)` returning true if `s` can be segmented into words from `wordDict` (words can be reused). DP." +
      jsPromptSuffix,
    ref: (s: string, dict: string[]) => {
      const set = new Set(dict);
      const dp = new Array(s.length + 1).fill(false);
      dp[0] = true;
      for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
          if (dp[j] && set.has(s.slice(j, i))) { dp[i] = true; break; }
        }
      }
      return dp[s.length]!;
    },
    argSets: [
      ["leetcode", ["leet", "code"]],
      ["applepenapple", ["apple", "pen"]],
      ["catsandog", ["cats", "dog", "sand", "and", "cat"]],
      ["aaaaaaa", ["aaaa", "aaa"]],
      ["a", ["a"]],
      ["a", ["b"]],
      ["", ["a"]],
      ["ccbb", ["bc", "cb"]],
      ["cars", ["car", "ca", "rs"]],
    ],
  }),
);

// 34. Trapping rain water
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Trapping rain water",
    lang: py,
    funcName: "trap",
    signature: "trap(height: list) -> int",
    prompt:
      "Write `trap(height)` in Python returning how much water can be trapped between the bars described by `height`. O(n) two-pointer or left/right max arrays." +
      pyPromptSuffix,
    ref: (h: number[]) => {
      const n = h.length;
      if (!n) return 0;
      const left = new Array(n).fill(0);
      const right = new Array(n).fill(0);
      left[0] = h[0]!;
      for (let i = 1; i < n; i++) left[i] = Math.max(left[i - 1]!, h[i]!);
      right[n - 1] = h[n - 1]!;
      for (let i = n - 2; i >= 0; i--) right[i] = Math.max(right[i + 1]!, h[i]!);
      let water = 0;
      for (let i = 0; i < n; i++) water += Math.min(left[i]!, right[i]!) - h[i]!;
      return water;
    },
    argSets: [
      [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
      [[4, 2, 0, 3, 2, 5]],
      [[1, 0, 1]],
      [[3, 0, 2, 0, 4]],
      [[2, 0, 0, 2]],
      [[0, 1, 2, 3]],
      [[3, 2, 1, 0]],
      [[1]],
    ],
  }),
);

// 35. Kth largest element (heap/quickselect)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Kth largest element",
    lang: js,
    funcName: "findKthLargest",
    signature: "findKthLargest(nums: number[], k: number): number",
    prompt:
      "Write `findKthLargest(nums, k)` returning the kth largest element (1-indexed) in the unsorted array. Use quickselect or a heap; do not fully sort if you can avoid it." +
      jsPromptSuffix,
    ref: (nums: number[], k: number) => {
      const sorted = [...nums].sort((a, b) => b - a);
      return sorted[k - 1]!;
    },
    argSets: [
      [[3, 2, 1, 5, 6, 4], 2],
      [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4],
      [[1], 1],
      [[7, 7, 7, 7, 7], 3],
      [[-1, -2, -3, -4, -5], 1],
      [[1, 2, 3, 4, 5, 6, 7, 8, 9], 9],
      [[2, 10, 8, 4, 6, 12, 1, 3], 3],
    ],
  }),
);

// 36. Minimum path sum (DP grid)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Minimum path in grid",
    lang: js,
    funcName: "minPathSum",
    signature: "minPathSum(grid: number[][]): number",
    prompt:
      "Write `minPathSum(grid)` returning the minimum sum from top-left to bottom-right moving only down or right. `grid` is m x n of non-negative numbers. DP." +
      jsPromptSuffix,
    ref: (grid: number[][]) => {
      const m = grid.length, n = grid[0]!.length;
      const dp = Array.from({ length: m }, () => new Array(n).fill(0));
      dp[0]![0] = grid[0]![0]!;
      for (let i = 1; i < m; i++) dp[i]![0] = dp[i - 1]![0]! + grid[i]![0]!;
      for (let j = 1; j < n; j++) dp[0]![j] = dp[0]![j - 1]! + grid[0]![j]!;
      for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++)
          dp[i]![j] = Math.min(dp[i - 1]![j]!, dp[i]![j - 1]!) + grid[i]![j]!;
      return dp[m - 1]![n - 1]!;
    },
    argSets: [
      [[[1, 3, 1], [1, 5, 1], [4, 2, 1]]],
      [[[1, 2, 3], [4, 5, 6]]],
      [[[1]]],
      [[[1, 2], [1, 1]]],
      [[[5, 0, 0], [0, 1, 0], [0, 0, 9]]],
      [[[3, 8, 2], [4, 1, 9], [7, 6, 5]]],
    ],
  }),
);

// 37. Sliding window maximum
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Sliding window maximum",
    lang: py,
    funcName: "max_sliding_window",
    signature: "max_sliding_window(nums: list, k: int) -> list",
    prompt:
      "Write `max_sliding_window(nums, k)` in Python returning an array containing the maximum element for each contiguous window of size `k`. Use a monotonic (deque) queue, O(n)." +
      pyPromptSuffix,
    ref: (nums: number[], k: number) => {
      const out: number[] = [];
      const dq: number[] = [];
      for (let i = 0; i < nums.length; i++) {
        while (dq.length && dq[0]! <= i - k) dq.shift();
        while (dq.length && nums[dq[dq.length - 1]!]! <= nums[i]!) dq.pop();
        dq.push(i);
        if (i >= k - 1) out.push(nums[dq[0]!]!);
      }
      return out;
    },
    argSets: [
      [[1, 3, -1, -3, 5, 3, 6, 7], 3],
      [[1], 1],
      [[1, -1], 1],
      [[9, 11], 2],
      [[4, -2], 2],
      [[1, 3, 1, 2, 0, 5], 3],
      [[5, 5, 5, 5, 5, 5], 4],
      [[1, 2, 3, 4, 5, 6], 2],
    ],
  }),
);

// 38. Split array largest sum - binary search on answer (or min max subarray sum)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Split array largest sum",
    lang: js,
    funcName: "splitArray",
    signature: "splitArray(nums: number[], k: number): number",
    prompt:
      "Write `splitArray(nums, k)` returning the minimum possible largest sum among `k` contiguous subarrays when partitioning `nums`. Use binary search on the answer with a feasibility check, O(n log(sum))." +
      jsPromptSuffix,
    ref: (nums: number[], k: number) => {
      const can = (cap: number) => {
        let parts = 1, sum = 0;
        for (const n of nums) {
          if (n > cap) return false;
          if (sum + n > cap) { parts++; sum = n; }
          else sum += n;
          if (parts > k) return false;
        }
        return parts <= k;
      };
      let lo = Math.max(...nums), hi = nums.reduce((a, b) => a + b, 0);
      while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (can(mid)) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    },
    argSets: [
      [[7, 2, 5, 10, 8], 2],
      [[1, 2, 3, 4, 5], 2],
      [[1, 4, 4], 3],
      [[2, 3, 1, 2, 4, 3], 3],
      [[5, 5, 5, 5], 2],
      [[1, 1000000], 1],
      [[1, 2, 3], 1],
      [[10, 20, 30, 40], 2],
    ],
  }),
);

// 39. Largest rectangle in histogram
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Largest rectangle in histogram",
    lang: js,
    funcName: "largestRectangleArea",
    signature: "largestRectangleArea(heights: number[]): number",
    prompt:
      "Write `largestRectangleArea(heights)` returning the area of the largest rectangle that can be formed within the bar chart `heights` (bars of width 1). Monotonic stack, O(n)." +
      jsPromptSuffix,
    ref: (h: number[]) => {
      const stack: number[] = [];
      let best = 0;
      const n = h.length;
      for (let i = 0; i <= n; i++) {
        const cur = i === n ? 0 : h[i]!;
        while (stack.length && cur < h[stack[stack.length - 1]!]!) {
          const height = h[stack.pop()!]!;
          const width = stack.length ? i - stack[stack.length - 1]! - 1 : i;
          best = Math.max(best, height * width);
        }
        stack.push(i);
      }
      return best;
    },
    argSets: [
      [[2, 1, 5, 6, 2, 3]],
      [[2, 4]],
      [[1]],
      [[0]],
      [[6, 2, 5, 4, 5, 1, 6]],
      [[2, 1, 2]],
      [[4, 4, 4, 4]],
      [[3, 5, 1, 7, 5, 9]],
    ],
  }),
);

// 40. Edit distance
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Edit distance",
    lang: py,
    funcName: "edit_distance",
    signature: "edit_distance(word1: str, word2: str) -> int",
    prompt:
      "Write `edit_distance(word1, word2)` in Python returning the minimum number of insert, delete, or substitute operations to convert `word1` into `word2`. DP, O(m*n)." +
      pyPromptSuffix,
    ref: (a: string, b: string) => {
      const m = a.length, n = b.length;
      const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
      for (let i = 0; i <= m; i++) dp[i]![0] = i;
      for (let j = 0; j <= n; j++) dp[0]![j] = j;
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (a[i - 1] === b[j - 1]) dp[i]![j] = dp[i - 1]![j - 1]!;
          else dp[i]![j] = 1 + Math.min(dp[i - 1]![j]!, dp[i]![j - 1]!, dp[i - 1]![j - 1]!);
        }
      }
      return dp[m]![n]!;
    },
    argSets: [
      ["horse", "ros"],
      ["intention", "execution"],
      ["", ""],
      ["a", "a"],
      ["a", "b"],
      ["abc", ""],
      ["", "abc"],
      ["kitten", "sitting"],
      ["flaw", "lawn"],
    ],
  }),
);

// 41. Dungeon game / min initial health - use "min init health" variant
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Min initial health in grid",
    lang: py,
    funcName: "calculate_min_hp",
    signature: "calculate_min_hp(dungeon: list) -> int",
    prompt:
      "Write `calculate_min_hp(dungeon)` in Python. `dungeon` is an m x n grid; negative cells reduce health, positive cells restore it, 0 is neutral. You start at top-left and move only right/down; health can never drop to 0 or below. Return the minimum initial health needed to reach bottom-right. DP from bottom-right." +
      pyPromptSuffix,
    ref: (dun: number[][]) => {
      const m = dun.length, n = dun[0]!.length;
      const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(Infinity));
      dp[m]![n - 1] = dp[m - 1]![n] = 1;
      for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
          const need = Math.min(dp[i + 1]![j]!, dp[i]![j + 1]!) - dun[i]![j]!;
          dp[i]![j] = need <= 0 ? 1 : need;
        }
      }
      return dp[0]![0]!;
    },
    argSets: [
      [[[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]],
      [[[0]]],
      [[[1, -3, 3], [0, -2, 0], [-3, -3, -3]]],
      [[[-5]]],
      [[[5, 5], [5, 5]]],
      [[[-1, -2], [3, -4]]],
      [[[2, 1], [1, -5]]],
    ],
  }),
);

// 42. Palindrome partitioning - count of palindromic substrings (deterministic)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Count palindromic substrings",
    lang: js,
    funcName: "countSubstrings",
    signature: "countSubstrings(s: string): number",
    prompt:
      "Write `countSubstrings(s)` returning the number of palindromic substrings in `s` (a single character counts as a palindrome). Expand around centers, O(n^2)." +
      jsPromptSuffix,
    ref: (s: string) => {
      let count = 0;
      const n = s.length;
      for (let c = 0; c < n; c++) {
        count++;
        let l = c - 1, r = c + 1;
        while (l >= 0 && r < n && s[l] === s[r]) { count++; l--; r++; }
        l = c; r = c + 1;
        while (l >= 0 && r < n && s[l] === s[r]) { count++; l--; r++; }
      }
      return count;
    },
    argSets: [
      ["abc"],
      ["aaa"],
      ["ababa"],
      ["a"],
      ["aa"],
      ["racecar"],
      ["abcdcba"],
      ["abccba"],
      ["aabb"],
    ],
  }),
);

// 43. Longest valid parentheses
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Longest valid parentheses",
    lang: js,
    funcName: "longestValidParentheses",
    signature: "longestValidParentheses(s: string): number",
    prompt:
      "Write `longestValidParentheses(s)` returning the length of the longest valid (well-formed) parentheses substring. Characters are '(' and ')'. Stack or two-pass scan." +
      jsPromptSuffix,
    ref: (s: string) => {
      const stack: number[] = [-1];
      let best = 0;
      for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") stack.push(i);
        else {
          stack.pop();
          if (!stack.length) stack.push(i);
          else best = Math.max(best, i - stack[stack.length - 1]!);
        }
      }
      return best;
    },
    argSets: [
      ["(()"],
      [")()())"],
      [""],
      ["()"],
      ["((()))"],
      ["()(()"],
      ["(()())"],
      ["())(())(()"]
    ],
  }),
);

// 44. Decode ways (DP count)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Decode ways",
    lang: py,
    funcName: "num_decodings",
    signature: "num_decodings(s: str) -> int",
    prompt:
      "Write `num_decodings(s)` in Python. A message of digits is decoded by mapping 1->A ... 26->Z. Return the number of ways to decode the digit string `s` (only digits). Return 0 if none. DP." +
      pyPromptSuffix,
    ref: (s: string) => {
      if (!s.length) return 0;
      const n = s.length;
      const dp = new Array(n + 1).fill(0);
      dp[0] = 1;
      dp[1] = s[0] === "0" ? 0 : 1;
      for (let i = 2; i <= n; i++) {
        const one = Number(s.slice(i - 1, i));
        const two = Number(s.slice(i - 2, i));
        if (one >= 1 && one <= 9) dp[i] += dp[i - 1]!;
        if (two >= 10 && two <= 26) dp[i] += dp[i - 2]!;
      }
      return dp[n]!;
    },
    argSets: [
      ["12"],
      ["226"],
      ["0"],
      ["06"],
      ["11106"],
      ["1111111111"],
      ["10"],
      ["27"],
      ["101"],
    ],
  }),
);

// 45. Unique paths (DP / combinatorics count)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Unique paths on grid",
    lang: js,
    funcName: "uniquePaths",
    signature: "uniquePaths(m: number, n: number): number",
    prompt:
      "Write `uniquePaths(m, n)` returning the number of distinct paths from top-left to bottom-right of an m x n grid, moving only right or down. `m, n` in [1, 100]." +
      jsPromptSuffix,
    ref: (m: number, n: number) => {
      const row = new Array(n).fill(1);
      for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++) row[j] = row[j]! + row[j - 1]!;
      return row[n - 1]!;
    },
    argSets: [
      [3, 7],
      [3, 2],
      [1, 1],
      [7, 3],
      [100, 100],
      [1, 100],
      [100, 1],
      [23, 12],
    ],
  }),
);

// 46. Minimum number of arrows to burst balloons (interval greedy)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Min arrows to burst balloons",
    lang: js,
    funcName: "findMinArrowShots",
    signature: "findMinArrowShots(points: number[][]): number",
    prompt:
      "Write `findMinArrowShots(points)` where `points[i] = [xstart, xend]` are balloon horizontal extents (inclusive). An arrow shot at x bursts all balloons containing x. Return the minimum number of arrows to burst all balloons." +
      jsPromptSuffix,
    ref: (points: number[][]) => {
      if (!points.length) return 0;
      const sorted = [...points].sort((a, b) => a[1]! - b[1]!);
      let arrows = 1;
      let end = sorted[0]![1]!;
      for (const [s, e] of sorted.slice(1)) {
        if (s > end) { arrows++; end = e; }
      }
      return arrows;
    },
    argSets: [
      [[[10, 16], [2, 8], [1, 6], [7, 12]]],
      [[[1, 2], [3, 4], [5, 6], [7, 8]]],
      [[[1, 2], [2, 3], [3, 4], [4, 5]]],
      [[[1, 2]]],
      [[]],
      [[[1, 5], [2, 3], [4, 6], [7, 8], [8, 9]]],
      [[[-2147483648, 2147483647], [-5, 5], [0, 1]]],
    ],
  }),
);

// 47. Maximum profit job scheduling (weighted interval DP) - returns max profit
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Max profit job scheduling",
    lang: py,
    funcName: "job_scheduling",
    signature: "job_scheduling(startTime: list, endTime: list, profit: list) -> int",
    prompt:
      "Write `job_scheduling(startTime, endTime, profit)` in Python. Job i runs from startTime[i] to endTime[i] (exclusive end) and pays profit[i]. You can choose non-overlapping jobs. Return the maximum profit. Sort by end, DP with binary search." +
      pyPromptSuffix,
    ref: (startTime: number[], endTime: number[], profit: number[]) => {
      const jobs = startTime.map((s, i) => [s, endTime[i]!, profit[i]!]);
      jobs.sort((a, b) => a[1]! - b[1]!);
      const multisetEnd = jobs.map((j) => j[1]!);
      const ends = [...new Set(multisetEnd)].sort((a, b) => a - b);
      const dp = new Map<number, number>();
      dp.set(0, 0);
      let best = 0;
      for (const [s, e, p] of jobs) {
        const pred = (() => {
          let lo = 0, hi = ends.length;
          while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (ends[mid]! <= s) lo = mid + 1;
            else hi = mid;
          }
          return lo === 0 ? 0 : ends[lo - 1]!;
        })();
        const prevMax = [...dp.entries()].filter(([k]) => k <= pred).reduce((a, [k, v]) => Math.max(a, v), 0);
        best = Math.max(best, prevMax + p);
        dp.set(e, Math.max(dp.get(e) ?? 0, best));
      }
      return [...dp.values()].reduce((a, b) => Math.max(a, b), 0);
    },
    argSets: [
      [[1, 2, 3, 3], [3, 4, 5, 6], [50, 10, 40, 70]],
      [[1, 2, 3, 4, 6], [3, 5, 10, 6, 9], [20, 20, 100, 70, 60]],
      [[1, 1, 1], [2, 3, 4], [5, 6, 4]],
      [[1], [2], [10]],
      [[1, 2, 3], [1, 2, 3], [5, 5, 5]],
      [[1, 3, 5], [2, 4, 6], [3, 4, 5]],
      [[1, 2, 2, 3], [3, 4, 5, 6], [50, 10, 40, 70]],
    ],
  }),
);

// 48. Best time to buy/sell stock with cooldown (DP decision) - max profit
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Stock with cooldown max profit",
    lang: js,
    funcName: "maxProfitCooldown",
    signature: "maxProfitCooldown(prices: number[]): number",
    prompt:
      "Write `maxProfitCooldown(prices)` returning the max profit from trading a stock. You may buy and sell multiple times (one share at a time), but you must wait one day (cooldown) after selling before buying again. State DP." +
      jsPromptSuffix,
    ref: (prices: number[]) => {
      let sold = 0, held = -Infinity, rest = 0;
      for (const p of prices) {
        const prevSold = sold;
        sold = held + p;
        held = Math.max(held, rest - p);
        rest = Math.max(rest, prevSold);
      }
      return Math.max(sold, rest);
    },
    argSets: [
      [[1, 2, 3, 0, 2]],
      [[1]],
      [[1, 2]],
      [[2, 1, 4, 5, 2, 9, 7]],
      [[1, 2, 4]],
      [[6, 1, 3, 2, 4, 7]],
      [[3, 3, 5, 0, 0, 3, 1, 4]],
      [[7, 1, 5, 3, 6, 4]],
    ],
  }),
);

// 49. Longest mountain in array (deterministic length)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Longest mountain",
    lang: py,
    funcName: "longest_mountain",
    signature: "longest_mountain(arr: list) -> int",
    prompt:
      "Write `longest_mountain(arr)` in Python returning the length of the longest subarray that is a mountain: strictly increasing then strictly decreasing, length >= 3. Return 0 if none." +
      pyPromptSuffix,
    ref: (arr: number[]) => {
      let best = 0, i = 1;
      const n = arr.length;
      while (i < n) {
        while (i < n && arr[i]! <= arr[i - 1]!) i++;
        if (i >= n) break;
        let up = 0, down = 0;
        while (i < n && arr[i]! > arr[i - 1]!) { i++; up++; }
        while (i < n && arr[i]! < arr[i - 1]!) { i++; down++; }
        if (up > 0 && down > 0) best = Math.max(best, up + down + 1);
      }
      return best;
    },
    argSets: [
      [[2, 1, 4, 7, 3, 2, 5]],
      [[2, 2, 2]],
      [[1, 2, 3]],
      [[3, 2, 1]],
      [[1, 3, 2, 4, 5, 4, 3, 2, 1, 2, 3]],
      [[0, 2, 1]],
      [[1, 2, 1, 2, 1, 2, 1]],
      [[1, 2, 3, 4, 5, 4, 3, 2, 1, 0]],
    ],
  }),
);

// 50. Gray code deterministic: return value of nth gray code number (numerical, big-int safe small n)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 1,
    title: "Nth gray code value",
    lang: js,
    funcName: "nthGray",
    signature: "nthGray(n: number): number",
    prompt:
      "Write `nthGray(n)` returning the integer value of the nth Gray code. Gray code for n (0-indexed) is `n ^ (n >> 1)`. n is a non-negative integer." +
      jsPromptSuffix,
    ref: (n: number) => n ^ (n >> 1),
    argSets: [[0], [1], [2], [3], [7], [15], [16], [31], [100], [255], [1023], [1048576]],
  }),
);

// 51. K closest points to origin (deterministic sorted by distance then coords)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "K closest points to origin",
    lang: js,
    funcName: "kClosest",
    signature: "kClosest(points: number[][], k: number): number[][]",
    prompt:
      "Write `kClosest(points, k)` returning the `k` points closest to the origin (0,0). Sort by squared Euclidean distance; ties broken by x then y ascending so output is deterministic." +
      jsPromptSuffix,
    ref: (points: number[][], k: number) =>
      [...points]
        .sort((a, b) => {
          const da = a[0]! * a[0]! + a[1]! * a[1]!;
          const db = b[0]! * b[0]! + b[1]! * b[1]!;
          if (da !== db) return da - db;
          if (a[0]! !== b[0]!) return a[0]! - b[0]!;
          return a[1]! - b[1]!;
        })
        .slice(0, k),
    argSets: [
      [[[1, 3], [-2, 2]], 1],
      [[[3, 3], [5, -1], [-2, 4]], 2],
      [[[1, 1], [2, 2], [1, -1]], 2],
      [[[0, 0], [1, 1], [-1, -1]], 2],
      [[[1, 1]], 1],
      [[[3, 4], [4, 3], [0, 5], [5, 0]], 3],
    ],
  }),
);

// 52. Rotate array by k (deterministic, returns rotated)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Rotate array right by k",
    lang: py,
    funcName: "rotate",
    signature: "rotate(nums: list, k: int) -> list",
    prompt:
      "Write `rotate(nums, k)` in Python returning the array rotated to the RIGHT by `k` steps (elements move right, wrapping). `k` can exceed array length. Do it in O(1) extra space (reverse trick) and return the array." +
      pyPromptSuffix,
    ref: (nums: number[], k: number) => {
      const n = nums.length;
      if (!n) return nums;
      k = ((k % n) + n) % n;
      const rev = (arr: number[], l: number, r: number) => {
        while (l < r) { const t = arr[l]!; arr[l] = arr[r]!; arr[r] = t; l++; r--; }
      };
      rev(nums, 0, n - 1);
      rev(nums, 0, k - 1);
      rev(nums, k, n - 1);
      return nums;
    },
    argSets: [
      [[1, 2, 3, 4, 5, 6, 7], 3],
      [[-1, -100, 3, 99], 2],
      [[1, 2], 3],
      [[1], 0],
      [[1, 2, 3, 4], 4],
      [[1, 2, 3, 4, 5], 7],
      [[1, 2, 3, 4, 5, 6], 2],
      [[1, 2, 3], 0],
    ],
  }),
);

// 53. Combination - count subsets summing to target (0/1 knapsack count, deterministic)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Count subsets summing to target",
    lang: py,
    funcName: "subset_sum_count",
    signature: "subset_sum_count(nums: list, target: int) -> int",
    prompt:
      "Write `subset_sum_count(nums, target)` in Python returning the number of subsets (distinct index selections, non-empty or empty is fine) whose sum equals `target`. Values can be non-negative; use DP." +
      pyPromptSuffix,
    ref: (nums: number[], target: number) => {
      const dp = new Array(target + 1).fill(0);
      dp[0] = 1;
      for (const n of nums) {
        for (let s = target; s >= n; s--) dp[s] = dp[s]! + dp[s - n]!;
      }
      return dp[target]!;
    },
    argSets: [
      [[1, 2, 3], 3],
      [[1, 1, 1, 1], 2],
      [[1, 2, 3, 4], 5],
      [[1], 1],
      [[1, 2, 3], 7],
      [[0, 0, 1], 1],
      [[1, 2, 3, 4, 5, 6], 10],
    ],
  }),
);

// 54. Next permutation (deterministic returns array)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Next permutation",
    lang: js,
    funcName: "nextPermutation",
    signature: "nextPermutation(nums: number[]): number[]",
    prompt:
      "Write `nextPermutation(nums)` returning the lexicographically next greater permutation of `nums` (in place). If no next greater permutation exists, return the array in ascending order. Return the resulting array." +
      jsPromptSuffix,
    ref: (nums: number[]) => {
      const n = nums.length;
      let i = n - 2;
      while (i >= 0 && nums[i]! >= nums[i + 1]!) i--;
      if (i >= 0) {
        let j = n - 1;
        while (nums[j]! <= nums[i]!) j--;
        [nums[i], nums[j]] = [nums[j]!, nums[i]!];
      }
      let l = i + 1, r = n - 1;
      while (l < r) { [nums[l], nums[r]] = [nums[r]!, nums[l]!]; l++; r--; }
      return nums;
    },
    argSets: [
      [[1, 2, 3]],
      [[3, 2, 1]],
      [[1, 1, 5]],
      [[1, 5, 1]],
      [[2, 3, 1]],
      [[1]],
      [[1, 1]],
      [[5, 4, 3, 2, 1]],
    ],
  }),
);

// 55. Count of derangements modulo - use small n exact integer via DP
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Count derangements",
    lang: js,
    funcName: "derangements",
    signature: "derangements(n: number): number",
    prompt:
      "Write `derangements(n)` returning the number of permutations of n items in which no element appears in its original position (derangements), computed exactly by DP: D(0)=1, D(1)=0, D(n)=(n-1)*(D(n-1)+D(n-2)). n in [0, 20]." +
      jsPromptSuffix,
    ref: (n: number) => {
      if (n === 0) return 1;
      if (n === 1) return 0;
      let a = 1, b = 0;
      for (let i = 2; i <= n; i++) { const c = (i - 1) * (a + b); a = b; b = c; }
      return b;
    },
    argSets: [[0], [1], [2], [3], [4], [5], [6], [10], [15], [20]],
  }),
);

// 56. Multiply strings without big-int (digit by digit) - level 3
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Multiply large numbers",
    lang: js,
    funcName: "multiply",
    signature: "multiply(num1: string, num2: string): string",
    prompt:
      "Write `multiply(num1, num2)` taking two non-negative integer strings and returning their product as a string without converting the whole thing to a native integer. Use grade-school digit multiplication." +
      jsPromptSuffix,
    ref: (a: string, b: string) => {
      if (a === "0" || b === "0") return "0";
      const m = a.length, n = b.length;
      const res = new Array(m + n).fill(0);
      for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
          const mul = (a.charCodeAt(i) - 48) * (b.charCodeAt(j) - 48);
          const p1 = i + j, p2 = i + j + 1;
          const sum = mul + res[p2]!;
          res[p2] = sum % 10;
          res[p1] = res[p1]! + Math.floor(sum / 10);
        }
      }
      let out = "";
      let started = false;
      for (const d of res) { if (d !== 0 || started) { out += d; started = true; } }
      return out || "0";
    },
    argSets: [
      ["2", "3"],
      ["123", "456"],
      ["0", "0"],
      ["9", "9"],
      ["999", "999"],
      ["123456789", "987654321"],
      ["1", "1000000"],
      ["4000000000000", "2000000000000"],
    ],
  }),
);

// 57. Reverse pairs type - count of pairs (i<j, nums[i] > 2*nums[j]) - hard merge sort
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Count reverse pairs",
    lang: py,
    funcName: "reverse_pairs",
    signature: "reverse_pairs(nums: list) -> int",
    prompt:
      "Write `reverse_pairs(nums)` in Python returning the number of pairs (i, j) with i < j and `nums[i] > 2 * nums[j]`. Use a merge-sort-based count, O(n log n)." +
      pyPromptSuffix,
    ref: (nums: number[]) => {
      let count = 0;
      const mergeSort = (lo: number, hi: number): number[] => {
        if (lo === hi) return [nums[lo]!];
        const mid = Math.floor((lo + hi) / 2);
        const left = mergeSort(lo, mid);
        const right = mergeSort(mid + 1, hi);
        let j = 0;
        for (const x of left) {
          while (j < right.length && right[j]! * 2 < x) j++;
          count += j;
        }
        const merged: number[] = [];
        let i = 0;
        j = 0;
        while (i < left.length && j < right.length) {
          if (left[i]! <= right[j]!) merged.push(left[i++]!);
          else merged.push(right[j++]!);
        }
        merged.push(...left.slice(i), ...right.slice(j));
        return merged;
      };
      if (nums.length) mergeSort(0, nums.length - 1);
      return count;
    },
    argSets: [
      [[1, 3, 2, 3, 1]],
      [[2, 4, 3, 5, 1]],
      [[1, 1, 1, 1, 1]],
      [[5, 4, 3, 2, 1]],
      [[1, 2, 3, 4]],
      [[2147483647, 2147483647, 2147483647]],
      [[1]],
      [[2, 1, 2, 1, 2]],
    ],
  }),
);

// 58. Coin change 2 - number of combinations (deterministic)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Number of coin combinations",
    lang: js,
    funcName: "coinChange2",
    signature: "coinChange2(amount: number, coins: number[]): number",
    prompt:
      "Write `coinChange2(amount, coins)` returning the number of distinct combinations of coins (order does NOT matter) that sum to `amount`, using unlimited coins. 1D DP: `dp[s] += dp[s - c]` iterating coins outer loop." +
      jsPromptSuffix,
    ref: (amount: number, coins: number[]) => {
      const dp = new Array(amount + 1).fill(0);
      dp[0] = 1;
      for (const c of coins) for (let s = c; s <= amount; s++) dp[s] = dp[s]! + dp[s - c]!;
      return dp[amount]!;
    },
    argSets: [
      [5, [1, 2, 5]],
      [3, [2]],
      [10, [10]],
      [0, [1]],
      [100, [1, 5, 10, 25]],
      [5, [1, 2]],
      [500, [3, 5, 7, 8]],
    ],
  }),
);

// 59. Largest number (sort by custom comparator, deterministic string)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 2,
    title: "Largest number from array",
    lang: js,
    funcName: "largestNumber",
    signature: "largestNumber(nums: number[]): string",
    prompt:
      "Write `largestNumber(nums)` returning the string formed by arranging the numbers so they concatenate to the largest possible number. Return it as a string (strip leading zeros)." +
      jsPromptSuffix,
    ref: (nums: number[]) => {
      const strs = nums.map(String);
      strs.sort((a, b) => {
        const ab = a + b, ba = b + a;
        if (ab === ba) return 0;
        return ab > ba ? -1 : 1;
      });
      if (strs[0] === "0") return "0";
      return strs.join("");
    },
    argSets: [
      [[10, 2]],
      [[3, 30, 34, 5, 9]],
      [[1]],
      [[0, 0]],
      [[3, 30, 300]],
      [[432, 43243, 432, 43]],
      [[0, 1, 0]],
      [[111, 1111, 1]],
    ],
  }),
);

// 60. Candy distribution (ratings -> min candies)
tasks.push(
  c({
    category: "coding-algorithm",
    difficulty: 3,
    title: "Min candies distribution",
    lang: py,
    funcName: "candy",
    signature: "candy(ratings: list) -> int",
    prompt:
      "Write `candy(ratings)` in Python. Children sit in a row with `ratings[i]`. Each child must get at least 1 candy, and a child with a higher rating than a neighbor must get more candies than that neighbor. Return the minimum total candies. Two-pass left/right arrays." +
      pyPromptSuffix,
    ref: (ratings: number[]) => {
      const n = ratings.length;
      const left = new Array(n).fill(1);
      for (let i = 1; i < n; i++) if (ratings[i]! > ratings[i - 1]!) left[i] = left[i - 1]! + 1;
      let right = 1;
      let total = Math.max(left[n - 1]!, right);
      for (let i = n - 2; i >= 0; i--) {
        if (ratings[i]! > ratings[i + 1]!) right++;
        else right = 1;
        total += Math.max(left[i]!, right);
      }
      return total;
    },
    argSets: [
      [[1, 0, 2]],
      [[1, 2, 2]],
      [[1]],
      [[1, 2, 3, 4, 5]],
      [[5, 4, 3, 2, 1]],
      [[1, 3, 2, 2, 1]],
      [[3, 2, 1, 2, 3]],
    ],
  }),
);

export default tasks;
