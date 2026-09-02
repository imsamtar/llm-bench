import type { Task } from "../types.ts";
import { codeTaskDef as c, seq } from "./helpers.ts";

const tasks: Task[] = [];

const js = "javascript" as const;
const py = "python" as const;

// ---------------------------------------------------------------------------
// 1. Two Sum (index pairs)
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Two Sum — return indices",
    lang: js,
    funcName: "twoSum",
    signature: "twoSum(nums: number[], target: number): number[]",
    prompt:
      "Write a function `twoSum(nums, target)` that returns the indices of the two numbers that add up to `target`. You may assume exactly one solution exists, and you may not use the same element twice. Return the indices in any order.\n\nOutput ONLY the function definition (an ES module exporting `twoSum`), no explanation, no wrapper script.",
    ref: (nums: number[], target: number) => {
      const m = new Map<number, number>();
      for (let i = 0; i < nums.length; i++) {
        const need = target - nums[i]!;
        if (m.has(need)) return [m.get(need)!, i];
        m.set(nums[i]!, i);
      }
      return [];
    },
    argSets: [
      [[2, 7, 11, 15], 9],
      [[3, 2, 4], 6],
      [[3, 3], 6],
      [[1, 5, 8, 3, 4], 9],
      [[-3, 4, 3, 90], 0],
      [[0, 4, 3, 0], 0],
      [[-1, -2, -3, -4, -5], -8],
      [[7, 0, 1, 7], 14],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 2. Reverse words in a string
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Reverse word order",
    lang: js,
    funcName: "reverseWords",
    signature: "reverseWords(s: string): string",
    prompt:
      "Write a function `reverseWords(s)` that takes a sentence string `s` and returns the words in reverse order, separated by a single space, with leading/trailing whitespace trimmed and multiple spaces collapsed to one. Example: `reverseWords(\"  the sky is   blue \")` returns `\"blue is sky the\"`.\n\nOutput ONLY the ES module exporting `reverseWords`.",
    ref: (s: string) => s.trim().split(/\s+/).reverse().join(" "),
    argSets: [
      ["  the sky is   blue "],
      ["hello world"],
      ["a"],
      ["  b   c  d "],
      ["one two three four five six seven eight nine ten"],
      ["  "],
      ["space    separated   words   here"],
      ["CamelCase stays as is  "],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 3. Valid parentheses
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Valid parentheses",
    lang: js,
    funcName: "isValid",
    signature: "isValid(s: string): boolean",
    prompt:
      "Write a function `isValid(s)` that returns `true` if the string contains only balanced and correctly nested parentheses brackets of types `()`, `[]`, `{}`, else `false`. Example: `isValid(\"([{}])\") === true`, `isValid(\"([)]\") === false`.\n\nOutput ONLY the ES module exporting `isValid`.",
    ref: (s: string) => {
      const st: string[] = [];
      const map: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
      for (const ch of s) {
        if (ch === "(" || ch === "[" || ch === "{") st.push(ch);
        else if (st.pop() !== map[ch]) return false;
      }
      return st.length === 0;
    },
    argSets: [["()"], ["()[]{}"], ["(]"], ["([)]"], ["{[]}"], [""], ["((()))"], ["((]))"], ["[({})]"], ["([{)]}"], ["][" ]],
  }),
);

// ---------------------------------------------------------------------------
// 4. Climbing stairs (fibonacci)
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Climbing stairs",
    lang: js,
    funcName: "climbStairs",
    signature: "climbStairs(n: number): number",
    prompt:
      "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can climb 1 or 2 steps. Write `climbStairs(n)` returning the number of distinct ways to reach the top. `n` is between 1 and 45.\n\nOutput ONLY the ES module exporting `climbStairs`.",
    ref: (n: number) => {
      let a = 1, b = 1;
      for (let i = 1; i < n; i++) [a, b] = [b, a + b];
      return b;
    },
    argSets: [[1], [2], [3], [4], [5], [10], [20], [30], [45]],
  }),
);

// ---------------------------------------------------------------------------
// 5. Longest common prefix
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Longest common prefix",
    lang: js,
    funcName: "longestCommonPrefix",
    signature: "longestCommonPrefix(strs: string[]): string",
    prompt:
      "Write `longestCommonPrefix(strs)` returning the longest common prefix string among an array of strings. Return `\"\"` if there is none.\n\nOutput ONLY the ES module exporting `longestCommonPrefix`.",
    ref: (strs: string[]) => {
      if (!strs.length) return "";
      let p = strs[0]!;
      for (const s of strs.slice(1)) {
        let i = 0;
        while (i < p.length && i < s.length && p[i] === s[i]) i++;
        p = p.slice(0, i);
        if (!p) break;
      }
      return p;
    },
    argSets: [
      [["flower", "flow", "flight"]],
      [["dog", "racecar", "car"]],
      [[]],
      [["a"]],
      [["interspecies", "interstellar", "interstate"]],
      [["same", "same", "same"]],
      [["prefix", "pre", "prelude", "present"]],
      [["", "anything"]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 6. Palindrome number
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Palindrome number",
    lang: py,
    funcName: "is_palindrome",
    signature: "is_palindrome(x: int) -> bool",
    prompt:
      "Write `is_palindrome(x)` in Python that returns True if the integer `x` reads the same forward and backward, WITHOUT converting to string. Handle negatives (not palindromes).\n\nOutput ONLY the function `is_palindrome`.",
    ref: (x: number) => {
      if (x < 0) return false;
      let rev = 0, n = x;
      while (n > 0) {
        rev = rev * 10 + (n % 10);
        n = Math.floor(n / 10);
      }
      return rev === x;
    },
    argSets: [[121], [-121], [10], [0], [1001], [12321], [12345], [11], [-11], [1000001]],
  }),
);

// ---------------------------------------------------------------------------
// 7. Merge sorted arrays (in place variant)
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Merge sorted arrays in place",
    lang: js,
    funcName: "merge",
    signature: "merge(nums1: number[], m: number, nums2: number[], n: number): number[]",
    prompt:
      "You are given two sorted integer arrays nums1 and nums2. nums1 has length m+n but only the first m elements are meaningful (rest are 0). Write `merge(nums1, m, nums2, n)` that merges them in place and returns nums1, sorted ascending.\n\nOutput ONLY the ES module exporting `merge`.",
    ref: (nums1: number[], m: number, nums2: number[], n: number) => {
      let i = m - 1, j = n - 1, k = m + n - 1;
      while (j >= 0) {
        if (i >= 0 && nums1[i]! > nums2[j]!) nums1[k--] = nums1[i--]!;
        else nums1[k--] = nums2[j--]!;
      }
      return nums1;
    },
    argSets: [
      [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3],
      [[1], 1, [], 0],
      [[0], 0, [1], 1],
      [[4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3],
      [[-1, 0, 0, 0, 0], 2, [1, 2, 3], 3],
      [[2, 0], 1, [1], 1],
      [[10, 20, 0, 0, 0], 2, [1, 5, 30], 3],
      [[1, 2, 3, 0, 0, 0, 0], 3, [4, 5, 6, 7], 4],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 8. Integer to English words (incorrectly: to Roman) — Roman numeral
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Integer to Roman",
    lang: js,
    funcName: "intToRoman",
    signature: "intToRoman(num: number): string",
    prompt:
      "Write `intToRoman(num)` converting an integer 1..3999 to a Roman numeral. Use standard symbols and subtractive forms (IV, IX, XL, XC, CD, CM).\n\nOutput ONLY the ES module exporting `intToRoman`.",
    ref: (num: number) => {
      const vals: [number, string][] = [
        [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
        [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
        [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
      ];
      let out = "";
      for (const [v, s] of vals) while (num >= v) { out += s; num -= v; }
      return out;
    },
    argSets: [[1], [3], [4], [9], [58], [1994], [3999], [2023], [2024], [14], [49], [900], [940], [944], [3888]],
  }),
);

// ---------------------------------------------------------------------------
// 9. Roman to Integer
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Roman to Integer",
    lang: py,
    funcName: "roman_to_int",
    signature: "roman_to_int(s: str) -> int",
    prompt:
      "Write `roman_to_int(s)` in Python converting a valid Roman numeral string to an integer.\n\nOutput ONLY the function `roman_to_int`.",
    ref: (s: string) => {
      const m: Record<string, number> = {
        I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
      };
      let total = 0;
      for (let i = 0; i < s.length; i++) {
        const cur = m[s[i]!]!;
        const next = i + 1 < s.length ? m[s[i + 1]!]! : 0;
        total += cur < next ? -cur : cur;
      }
      return total;
    },
    argSets: [["III"], ["IV"], ["IX"], ["LVIII"], ["MCMXCIV"], ["MMXXIV"], ["DXLIX"], ["CMXCIX"], ["M"], ["XCIX"]],
  }),
);

// ---------------------------------------------------------------------------
// 10. Container with most water
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Container with most water",
    lang: js,
    funcName: "maxArea",
    signature: "maxArea(height: number[]): number",
    prompt:
      "Write `maxArea(height)` where height[i] is the height of a vertical line at i. Return the maximum area of water a container can hold (two lines + x-axis). Use two pointers, O(n).\n\nOutput ONLY the ES module exporting `maxArea`.",
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
      [[1, 8, 6, 2, 5, 4, 8, 3, 7, 2, 100, 99]],
      [[100, 1, 1, 1, 1, 100]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 11. Product of array except self
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Product of array except self",
    lang: js,
    funcName: "productExceptSelf",
    signature: "productExceptSelf(nums: number[]): number[]",
    prompt:
      "Write `productExceptSelf(nums)` returning an array such that answer[i] is the product of all elements of nums except nums[i]. Must run in O(n) without using division.\n\nOutput ONLY the ES module exporting `productExceptSelf`.",
    ref: (nums: number[]) => {
      const n = nums.length;
      const out = new Array(n).fill(1);
      let left = 1;
      for (let i = 0; i < n; i++) { out[i] = left; left *= nums[i]!; }
      let right = 1;
      for (let i = n - 1; i >= 0; i--) { out[i]! *= right; right *= nums[i]!; }
      return out;
    },
    argSets: [
      [[1, 2, 3, 4]],
      [[-1, 1, 0, -3, 3]],
      [[0, 0]],
      [[2, 3]],
      [[1, 2, 3, 4, 5]],
      [[-1, -2, -3]],
      [[5, 6, 7, 8]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 12. Move zeroes
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Move zeroes",
    lang: js,
    funcName: "moveZeroes",
    signature: "moveZeroes(nums: number[]): number[]",
    prompt:
      "Write `moveZeroes(nums)` that moves all zeroes to the end while maintaining the relative order of non-zero elements, in place, and returns nums.\n\nOutput ONLY the ES module exporting `moveZeroes`.",
    ref: (nums: number[]) => {
      let write = 0;
      for (let i = 0; i < nums.length; i++) if (nums[i] !== 0) nums[write++] = nums[i]!;
      for (; write < nums.length; write++) nums[write] = 0;
      return nums;
    },
    argSets: [
      [[0, 1, 0, 3, 12]],
      [[0]],
      [[1]],
      [[0, 0, 1]],
      [[1, 0, 2, 0, 3, 0]],
      [[5, 0, 0, 5, 0, 5]],
      [[0, 0, 0, 0]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 13. Is subsequence
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Is subsequence",
    lang: js,
    funcName: "isSubsequence",
    signature: "isSubsequence(s: string, t: string): boolean",
    prompt:
      "Write `isSubsequence(s, t)` returning true if s is a subsequence of t (s appears in t, order preserved, possibly not contiguous).\n\nOutput ONLY the ES module exporting `isSubsequence`.",
    ref: (s: string, t: string) => {
      let i = 0, j = 0;
      while (i < s.length && j < t.length) {
        if (s[i] === t[j]) i++;
        j++;
      }
      return i === s.length;
    },
    argSets: [
      ["abc", "ahbgdc"],
      ["axc", "ahbgdc"],
      ["", "anything"],
      ["b", "abc"],
      ["ace", "abcde"],
      ["aec", "abcde"],
      ["abc", "abc"],
      ["aaa", "aa"],
      ["leetcode", "leeeeeetcodeeee"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 14. Find pivot index
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Find pivot index",
    lang: py,
    funcName: "pivot_index",
    signature: "pivot_index(nums: list) -> int",
    prompt:
      "Write `pivot_index(nums)` in Python returning the leftmost pivot index where the sum of numbers to the left equals the sum to the right. Return -1 if none. Use 0 for empty sides.\n\nOutput ONLY the function `pivot_index`.",
    ref: (nums: number[]) => {
      const total = nums.reduce((a, b) => a + b, 0);
      let left = 0;
      for (let i = 0; i < nums.length; i++) {
        if (left === total - left - nums[i]!) return i;
        left += nums[i]!;
      }
      return -1;
    },
    argSets: [
      [[1, 7, 3, 6, 5, 6]],
      [[1, 2, 3]],
      [[2, 1, -1]],
      [[0]],
      [[1, 2, 3, 4, 5]],
      [[-1, -1, -1, -1, -1, 0]],
      [[1, 2, 3, 4, 5, 6, 21]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 15. Running sum
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Running sum",
    lang: js,
    funcName: "runningSum",
    signature: "runningSum(nums: number[]): number[]",
    prompt:
      "Write `runningSum(nums)` returning an array where each element is the cumulative sum of nums up to that index.\n\nOutput ONLY the ES module exporting `runningSum`.",
    ref: (nums: number[]) => {
      const out: number[] = [];
      let s = 0;
      for (const n of nums) { s += n; out.push(s); }
      return out;
    },
    argSets: [[[1, 2, 3, 4]], [[1, 1, 1, 1, 1]], [[3, 1, 2, 10, 1]], [[5]], [[-1, 2, -3, 4]]],
  }),
);

// ---------------------------------------------------------------------------
// 16. Single number (bit XOR)
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Single number",
    lang: js,
    funcName: "singleNumber",
    signature: "singleNumber(nums: number[]): number",
    prompt:
      "Write `singleNumber(nums)` where every element appears exactly twice except one which appears once. Return the single element. Use constant extra space and O(n) time (bitwise XOR).\n\nOutput ONLY the ES module exporting `singleNumber`.",
    ref: (nums: number[]) => {
      let x = 0;
      for (const n of nums) x ^= n;
      return x;
    },
    argSets: [[[2, 2, 1]], [[4, 1, 2, 1, 2]], [[1]], [[1, 1, 2, 2, 3, 3, 4, 4, 99]], [[7, 3, 7, 3, 5, 5, 9, 9, 8]]],
  }),
);

// ---------------------------------------------------------------------------
// 17. Counting bits
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Counting bits",
    lang: js,
    funcName: "countBits",
    signature: "countBits(n: number): number[]",
    prompt:
      "Write `countBits(n)` returning an array ans of length n+1 where ans[i] is the number of 1-bits in the binary representation of i, for all 0..n. O(n) time.\n\nOutput ONLY the ES module exporting `countBits`.",
    ref: (n: number) => {
      const ans = new Array(n + 1).fill(0);
      for (let i = 1; i <= n; i++) ans[i] = ans[i >> 1]! + (i & 1);
      return ans;
    },
    argSets: [[2], [5], [0], [1], [8], [16], [31], [100]],
  }),
);

// ---------------------------------------------------------------------------
// 18. Missing number
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Missing number",
    lang: py,
    funcName: "missing_number",
    signature: "missing_number(nums: list) -> int",
    prompt:
      "Write `missing_number(nums)` in Python. Given an array containing n distinct numbers taken from 0..n, return the one number in 0..n that is missing from the array. O(n) time, O(1) space.\n\nOutput ONLY the function `missing_number`.",
    ref: (nums: number[]) => {
      const n = nums.length;
      let x = n;
      for (let i = 0; i < n; i++) x ^= i ^ nums[i]!;
      return x;
    },
    argSets: [[[3, 0, 1]], [[0, 1]], [[9, 6, 4, 2, 3, 5, 7, 0, 1]], [[0]], [[1]], [[1, 2, 3]]],
  }),
);

// ---------------------------------------------------------------------------
// 19. Kids with greatest candies
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Kids with greatest candies",
    lang: js,
    funcName: "kidsWithCandies",
    signature: "kidsWithCandies(candies: number[], extra: number): boolean[]",
    prompt:
      "Write `kidsWithCandies(candies, extra)` returning a boolean array where result[i] is true if, after giving the kid extra candies, they have the greatest number of candies among all kids (ties allowed).\n\nOutput ONLY the ES module exporting `kidsWithCandies`.",
    ref: (candies: number[], extra: number) => {
      const max = Math.max(...candies);
      return candies.map((c) => c + extra >= max);
    },
    argSets: [
      [[2, 3, 5, 1, 3], 3],
      [[4, 2, 1, 1, 2], 1],
      [[12, 1, 12], 10],
      [[1], 0],
      [[1, 1, 1, 1], 0],
      [[5, 5, 5], 2],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 20. Can place flowers
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Can place flowers",
    lang: js,
    funcName: "canPlaceFlowers",
    signature: "canPlaceFlowers(flowerbed: number[], n: number): boolean",
    prompt:
      "Write `canPlaceFlowers(flowerbed, n)` where flowerbed[i] is 0 (empty) or 1 (flower). Return true if you can plant n new flowers without planting adjacent to existing or new ones.\n\nOutput ONLY the ES module exporting `canPlaceFlowers`.",
    ref: (bed: number[], n: number) => {
      let count = 0;
      let prev = 0;
      for (let i = 0; i < bed.length; i++) {
        if (bed[i] === 0 && prev === 0 && (i + 1 === bed.length || bed[i + 1] === 0)) {
          count++;
          prev = 1;
        } else {
          prev = bed[i]!;
        }
      }
      return count >= n;
    },
    argSets: [
      [[1, 0, 0, 0, 1], 1],
      [[1, 0, 0, 0, 1], 2],
      [[0, 0, 1, 0, 0], 1],
      [[0, 0, 0, 0, 0], 3],
      [[0, 0, 0, 0, 0], 1],
      [[1, 1, 1, 1], 0],
      [[0], 1],
      [[1], 1],
      [[0, 0], 1],
      [[1, 0, 0, 0, 0, 1], 2],
      [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0], 3],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 21. Merge strings alternately
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Merge strings alternately",
    lang: js,
    funcName: "mergeAlternately",
    signature: "mergeAlternately(word1: string, word2: string): string",
    prompt:
      "Write `mergeAlternately(word1, word2)` that merges the strings by adding letters in alternating order starting with word1. If a string is longer, append the remaining letters.\n\nOutput ONLY the ES module exporting `mergeAlternately`.",
    ref: (a: string, b: string) => {
      let out = "";
      const n = Math.max(a.length, b.length);
      for (let i = 0; i < n; i++) {
        if (i < a.length) out += a[i];
        if (i < b.length) out += b[i];
      }
      return out;
    },
    argSets: [
      ["abc", "pqr"],
      ["ab", "pqrs"],
      ["abcd", "pq"],
      ["", "xyz"],
      ["abc", ""],
      ["", ""],
      ["ace", "bdf"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 22. Greatest common divisor of strings
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Greatest common divisor of strings",
    lang: js,
    funcName: "gcdOfStrings",
    signature: "gcdOfStrings(str1: string, str2: string): string",
    prompt:
      "Write `gcdOfStrings(str1, str2)` returning the largest string `x` that divides both str1 and str2 (str1 = x repeated k times, str2 = x repeated m times). Return \"\" if none.\n\nOutput ONLY the ES module exporting `gcdOfStrings`.",
    ref: (a: string, b: string) => {
      const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
      if (a + b !== b + a) return "";
      return a.slice(0, gcd(a.length, b.length));
    },
    argSets: [
      ["ABCABC", "ABC"],
      ["ABABAB", "ABAB"],
      ["LEET", "CODE"],
      ["ABCDEF", "ABC"],
      ["AAAA", "AA"],
      ["ABABABAB", "ABABAB"],
      ["a", "a"],
      ["ABC", "ABCD"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 23. Reverse vowels of a string
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Reverse vowels of a string",
    lang: js,
    funcName: "reverseVowels",
    signature: "reverseVowels(s: string): string",
    prompt:
      "Write `reverseVowels(s)` that reverses only the vowels (a,e,i,o,u, both cases) in the string, leaving all other characters in place.\n\nOutput ONLY the ES module exporting `reverseVowels`.",
    ref: (s: string) => {
      const vowels = new Set("aeiouAEIOU");
      const arr = s.split("");
      let l = 0, r = arr.length - 1;
      while (l < r) {
        while (l < r && !vowels.has(arr[l]!)) l++;
        while (l < r && !vowels.has(arr[r]!)) r--;
        [arr[l], arr[r]] = [arr[r]!, arr[l]!];
        l++; r--;
      }
      return arr.join("");
    },
    argSets: [["hello"], ["leetcode"], ["aA"], ["aeiou"], ["xyz"], ["race a car"], ["Bun is fun"]],
  }),
);

// ---------------------------------------------------------------------------
// 24. Increasing triplet subsequence
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Increasing triplet subsequence",
    lang: js,
    funcName: "increasingTriplet",
    signature: "increasingTriplet(nums: number[]): boolean",
    prompt:
      "Write `increasingTriplet(nums)` returning true if there exist i < j < k where nums[i] < nums[j] < nums[k]. O(n) time, O(1) space.\n\nOutput ONLY the ES module exporting `increasingTriplet`.",
    ref: (nums: number[]) => {
      let f = Infinity, s = Infinity;
      for (const n of nums) {
        if (n <= f) f = n;
        else if (n <= s) s = n;
        else return true;
      }
      return false;
    },
    argSets: [
      [[1, 2, 3, 4, 5]],
      [[5, 4, 3, 2, 1]],
      [[2, 1, 5, 0, 4, 6]],
      [[1, 1, 1, 1, 1]],
      [[20, 100, 10, 12, 5, 13]],
      [[1, 2]],
      [[0, 4, 2, 1, 0, -1, 3]],
      [[2, 4, -2, -3]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 25. String compression
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "String compression",
    lang: js,
    funcName: "compress",
    signature: "compress(chars: string[]): number",
    prompt:
      "Write `compress(chars)` that compresses the array of characters in place using run-length encoding, so consecutive characters are replaced with the character followed by its count (only if count > 1). Return the new length of the (prefix of the) array.\n\nOutput ONLY the ES module exporting `compress`.",
    ref: (chars: string[]) => {
      let write = 0;
      let i = 0;
      while (i < chars.length) {
        const c = chars[i]!;
        let j = i;
        while (j < chars.length && chars[j] === c) j++;
        chars[write++] = c;
        const count = j - i;
        if (count > 1) {
          for (const d of String(count)) chars[write++] = d;
        }
        i = j;
      }
      return write;
    },
    argSets: [
      [["a", "a", "b", "b", "c", "c", "c"]],
      [["a"]],
      [["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]],
      [["x", "x", "x", "y", "z", "z"]],
      [["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 26. group anagrams
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Group anagrams",
    lang: js,
    funcName: "groupAnagrams",
    signature: "groupAnagrams(strs: string[]): string[][]",
    prompt:
      "Write `groupAnagrams(strs)` grouping strings that are anagrams together. Within each group and across groups, order does not matter for correctness but output should be an array of groups (each group an array of strings).\n\nOutput ONLY the ES module exporting `groupAnagrams`.",
    ref: (strs: string[]) => {
      const map = new Map<string, string[]>();
      for (const s of strs) {
        const key = [...s].sort().join("");
        (map.get(key) ?? map.set(key, []).get(key))!.push(s);
      }
      return [...map.values()];
    },
    argSets: [
      [["eat", "tea", "tan", "ate", "nat", "bat"]],
      [[""]],
      [["a"]],
      [["abc", "bca", "cab", "acb", "bac"]],
      [["ab", "ba", "aa", "ab", "bb", "ba"]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 27. String to integer (atoi)
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "String to integer (atoi)",
    lang: js,
    funcName: "myAtoi",
    signature: "myAtoi(s: string): number",
    prompt:
      "Write `myAtoi(s)` implementing the atoi algorithm: ignore leading whitespace; optional +/- sign; read digits; clamp to 32-bit signed range [-2^31, 2^31-1]. If no digits, return 0.\n\nOutput ONLY the ES module exporting `myAtoi`.",
    ref: (s: string) => {
      const MIN = -2147483648, MAX = 2147483647;
      let i = 0;
      while (i < s.length && s[i] === " ") i++;
      let sign = 1;
      if (s[i] === "+" || s[i] === "-") { if (s[i] === "-") sign = -1; i++; }
      let num = 0;
      while (i < s.length && s[i] >= "0" && s[i] <= "9") {
        num = num * 10 + (s.charCodeAt(i) - 48);
        if (sign * num >= MAX) return MAX;
        if (sign * num <= MIN) return MIN;
        i++;
      }
      return sign * num;
    },
    argSets: [["42"], ["   -42"], ["4193 with words"], ["words and 987"], ["-91283472332"], ["2147483648"], ["-2147483648"], ["   +123  "], [""], ["+-12"], ["   "], ["0000"], ["  000123zzz"]],
  }),
);

// ---------------------------------------------------------------------------
// 28. Longest substring without repeating characters
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Longest substring without repeating characters",
    lang: py,
    funcName: "length_of_longest_substring",
    signature: "length_of_longest_substring(s: str) -> int",
    prompt:
      "Write `length_of_longest_substring(s)` in Python returning the length of the longest substring without repeating characters.\n\nOutput ONLY the function `length_of_longest_substring`.",
    ref: (s: string) => {
      let best = 0, left = 0;
      const seen = new Map<string, number>();
      for (let right = 0; right < s.length; right++) {
        const ch = s[right]!;
        if (seen.has(ch) && seen.get(ch)! >= left) left = seen.get(ch)! + 1;
        seen.set(ch, right);
        best = Math.max(best, right - left + 1);
      }
      return best;
    },
    argSets: [["abcabcbb"], ["bbbbb"], ["pwwkew"], [""], [" "], ["au"], ["dvdf"], ["abba"], ["tmmzuxt"]],
  }),
);

// ---------------------------------------------------------------------------
// 29. Top K frequent elements
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Top K frequent elements",
    lang: js,
    funcName: "topKFrequent",
    signature: "topKFrequent(nums: number[], k: number): number[]",
    prompt:
      "Write `topKFrequent(nums, k)` returning the k most frequent elements, sorted by descending frequency; elements with equal frequency should be ordered by ascending value. This makes the result fully deterministic.",
    ref: (nums: number[], k: number) => {
      const freq = new Map<number, number>();
      for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);
      return [...freq.entries()]
        .sort((a, b) => b[1] - a[1] || a[0] - b[0])
        .slice(0, k)
        .map((e) => e[0]);
    },
    argSets: [
      [[1, 1, 1, 2, 2, 3], 2],
      [[1], 1],
      [[1, 1, 2, 2, 3, 3, 4], 3],
      [[5, 5, 5, 5, 1, 1, 2, 3], 2],
      [[3, 3, 1, 1, 2, 2, 2], 2],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 30. Duplicate zeros
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Duplicate zeros",
    lang: js,
    funcName: "duplicateZeros",
    signature: "duplicateZeros(arr: number[]): number[]",
    prompt:
      "Write `duplicateZeros(arr)` that duplicates each zero in the array by shifting the remaining elements to the right (rightmost elements are dropped so the length stays the same). Return the resulting array. Example: `duplicateZeros([1,0,2,3,0,4,5,0])` returns `[1,0,0,2,3,0,0,4]`.\n\nOutput ONLY the function definition as an ES module exporting `duplicateZeros`. No markdown fences, no explanation, no tests.",
    ref: (arr: number[]) => {
      const res = arr.slice();
      const n = res.length;
      for (let i = 0; i < n; i++) {
        if (res[i] === 0) {
          res.splice(i, 0, 0);
          res.pop();
          i++;
        }
      }
      return res;
    },
    argSets: [
      [[1, 0, 2, 3, 0, 4, 5, 0]],
      [[0, 0, 0]],
      [[1, 2, 3]],
      [[0, 1, 0, 1, 0]],
      [[8, 4, 0, 0, 5]],
      [[0]],
      [[1, 0, 0, 2]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 31. Squares of a sorted array
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Squares of a sorted array",
    lang: js,
    funcName: "sortedSquares",
    signature: "sortedSquares(nums: number[]): number[]",
    prompt:
      "Write `sortedSquares(nums)` given a sorted (ascending) array of integers, returning a new array of the squares of each number sorted in ascending order.\n\nOutput ONLY the function definition as an ES module exporting `sortedSquares`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[]) => nums.map((x) => x * x).sort((a, b) => a - b),
    argSets: [
      [[-4, -1, 0, 3, 10]],
      [[-7, -3, 2, 3, 11]],
      [[0]],
      [[-1, -1]],
      [[1, 2, 3, 4]],
      [[-5, -4, -3]],
      [[-2, 0, 2, 5]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 32. Find the difference
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Find the difference",
    lang: js,
    funcName: "findTheDifference",
    signature: "findTheDifference(s: string, t: string): string",
    prompt:
      "Write `findTheDifference(s, t)` where `t` is formed by shuffling `s` and adding one extra lowercase letter. Return the added letter.\n\nOutput ONLY the function definition as an ES module exporting `findTheDifference`. No markdown fences, no explanation, no tests.",
    ref: (s: string, t: string) => {
      let x = 0;
      for (const c of s) x ^= c.charCodeAt(0);
      for (const c of t) x ^= c.charCodeAt(0);
      return String.fromCharCode(x);
    },
    argSets: [
      ["abcd", "abcde"],
      ["", "y"],
      ["a", "aa"],
      ["ae", "aea"],
      ["xyc", "cyyx"],
      ["abc", "abcc"],
      ["aaaa", "aaaaa"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 33. Count odd numbers in an interval
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Count odd numbers in an interval",
    lang: js,
    funcName: "countOdds",
    signature: "countOdds(low: number, high: number): number",
    prompt:
      "Write `countOdds(low, high)` counting the number of odd integers in the inclusive range [low, high].\n\nOutput ONLY the function definition as an ES module exporting `countOdds`. No markdown fences, no explanation, no tests.",
    ref: (lo: number, hi: number) => Math.floor((hi + 1) / 2) - Math.floor(lo / 2),
    argSets: [[3, 7], [8, 10], [0, 10], [1, 1], [2, 2], [0, 0], [100, 200]],
  }),
);

// ---------------------------------------------------------------------------
// 34. Sum of unique elements
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Sum of unique elements",
    lang: js,
    funcName: "sumOfUnique",
    signature: "sumOfUnique(nums: number[]): number",
    prompt:
      "Write `sumOfUnique(nums)` returning the sum of the elements that appear exactly once in `nums`.\n\nOutput ONLY the function definition as an ES module exporting `sumOfUnique`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[]) => {
      const counts: Record<number, number> = {};
      for (const n of nums) counts[n] = (counts[n] ?? 0) + 1;
      let sum = 0;
      for (const n of nums) if (counts[n] === 1) sum += n;
      return sum;
    },
    argSets: [
      [[1, 2, 3, 2]],
      [[1, 1, 1, 1]],
      [[1, 2, 3, 4, 5]],
      [[1, 2, 2, 3, 3, 4]],
      [[5, 5, 5, 5]],
      [[1, 2, 1, 3, 3, 4, 4, 5]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 35. Ransom note
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Ransom note",
    lang: js,
    funcName: "canConstruct",
    signature: "canConstruct(ransomNote: string, magazine: string): boolean",
    prompt:
      "Write `canConstruct(ransomNote, magazine)` returning true if `ransomNote` can be constructed using the letters from `magazine` (each letter in magazine used at most once).\n\nOutput ONLY the function definition as an ES module exporting `canConstruct`. No markdown fences, no explanation, no tests.",
    ref: (ransom: string, magazine: string) => {
      const m: Record<string, number> = {};
      for (const ch of magazine) m[ch] = (m[ch] ?? 0) + 1;
      for (const ch of ransom) {
        if (!m[ch]) return false;
        m[ch]--;
      }
      return true;
    },
    argSets: [
      ["a", "b"],
      ["aa", "ab"],
      ["aa", "aab"],
      ["", ""],
      ["aab", "baa"],
      ["abc", "cbaa"],
      ["zzz", "zz"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 36. Shuffle string
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Shuffle string",
    lang: py,
    funcName: "restore_string",
    signature: "restore_string(s: str, indices: list) -> str",
    prompt:
      "Write `restore_string(s, indices)` in Python. Given a string `s` and a list of integers `indices` (a permutation of 0..len(s)-1), return a new string such that character at position `i` of `s` is moved to position `indices[i]` in the result.\n\nOutput ONLY the function definition `def restore_string(...)`. No markdown fences, no explanation.",
    ref: (s: string, indices: number[]) => {
      const out = new Array<string>(s.length);
      for (let i = 0; i < s.length; i++) out[indices[i]!] = s[i]!;
      return out.join("");
    },
    argSets: [
      ["codeleet", [4, 5, 6, 7, 0, 2, 1, 3]],
      ["abc", [0, 1, 2]],
      ["a", [0]],
      ["art", [1, 0, 2]],
      ["xyzab", [4, 2, 1, 0, 3, 5]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 37. Number of good pairs
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Number of good pairs",
    lang: js,
    funcName: "numIdenticalPairs",
    signature: "numIdenticalPairs(nums: number[]): number",
    prompt:
      "Write `numIdenticalPairs(nums)` returning the number of pairs (i, j) with i < j and nums[i] === nums[j].\n\nOutput ONLY the function definition as an ES module exporting `numIdenticalPairs`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[]) => {
      const counts: Record<number, number> = {};
      let good = 0;
      for (const n of nums) {
        good += counts[n] ?? 0;
        counts[n] = (counts[n] ?? 0) + 1;
      }
      return good;
    },
    argSets: [
      [[1, 2, 3, 1, 1, 3]],
      [[1, 1, 1, 1]],
      [[1, 2, 3]],
      [[5, 5, 5, 5, 5]],
      [[1, 2, 2, 3, 3]],
      [[1, 1, 1, 1, 1, 1]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 38. Defang IP address
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Defang IP address",
    lang: py,
    funcName: "defang_ip",
    signature: "defang_ip(address: str) -> str",
    prompt:
      "Write `defang_ip(address)` in Python that replaces every period \".\" in a valid IPv4 address with \"[.]\". Example: `defang_ip(\"1.1.1.1\")` returns `\"1[.]1[.]1[.]1\"`.\n\nOutput ONLY the function definition `def defang_ip(...)`. No markdown fences, no explanation.",
    ref: (address: string) => address.split(".").join("[.]"),
    argSets: [["1.1.1.1"], ["255.100.50.0"], ["0.0.0.0"], ["192.168.1.1"]],
  }),
);

// ---------------------------------------------------------------------------
// 39. Find nearest valid point
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Find nearest valid point",
    lang: js,
    funcName: "nearestValidPoint",
    signature: "nearestValidPoint(x: number, y: number, points: number[][]): number",
    prompt:
      "Write `nearestValidPoint(x, y, points)` where each point is [xi, yi]. A point is valid if it shares the same x or y coordinate as (x, y). Return the index of the valid point with the smallest Manhattan distance |x-xi| + |y-yi|; on a tie return the smallest index. Return -1 if no valid point.\n\nOutput ONLY the function definition as an ES module exporting `nearestValidPoint`. No markdown fences, no explanation, no tests.",
    ref: (x: number, y: number, points: number[][]) => {
      let best = -1;
      let minD = Infinity;
      for (let i = 0; i < points.length; i++) {
        const [px, py] = points[i]!;
        if (px === x || py === y) {
          const d = Math.abs(px! - x) + Math.abs(py! - y);
          if (d < minD) {
            minD = d;
            best = i;
          }
        }
      }
      return best;
    },
    argSets: [
      [3, 4, [[1, 2], [3, 1], [2, 4], [2, 3], [4, 4]]],
      [3, 4, [[1, 2], [3, 3], [4, 4]]],
      [0, 0, []],
      [1, 1, [[1, 1]]],
      [3, 4, [[3, 4]]],
      [1, 1, [[2, 2], [3, 3]]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 40. Smallest even multiple
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Smallest even multiple",
    lang: js,
    funcName: "smallestEvenMultiple",
    signature: "smallestEvenMultiple(n: number): number",
    prompt:
      "Write `smallestEvenMultiple(n)` returning the smallest positive integer divisible by both `n` and 2.\n\nOutput ONLY the function definition as an ES module exporting `smallestEvenMultiple`. No markdown fences, no explanation, no tests.",
    ref: (n: number) => (n % 2 === 0 ? n : 2 * n),
    argSets: [[5], [6], [1], [8], [3], [10], [2]],
  }),
);

// ---------------------------------------------------------------------------
// 41. Maximum 69 number
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Maximum 69 number",
    lang: js,
    funcName: "maximum69Number",
    signature: "maximum69Number(num: number): number",
    prompt:
      "Write `maximum69Number(num)`. The number contains only digits 6 and 9. You may change at most one digit (6 to 9, or 9 to 6). Return the maximum possible number. Changing the leftmost 6 to a 9 is optimal.\n\nOutput ONLY the function definition as an ES module exporting `maximum69Number`. No markdown fences, no explanation, no tests.",
    ref: (num: number) => {
      const s = String(num);
      const i = s.indexOf("6");
      if (i === -1) return num;
      return Number(s.slice(0, i) + "9" + s.slice(i + 1));
    },
    argSets: [[9669], [9996], [9999], [69], [6], [969], [6996]],
  }),
);

// ---------------------------------------------------------------------------
// 42. Halves are alike
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Halves are alike",
    lang: js,
    funcName: "halvesAreAlike",
    signature: "halvesAreAlike(s: string): boolean",
    prompt:
      "Write `halvesAreAlike(s)`. The string has even length. Return true if the first half and second half contain the same number of vowels (a, e, i, o, u, plus their uppercase forms).\n\nOutput ONLY the function definition as an ES module exporting `halvesAreAlike`. No markdown fences, no explanation, no tests.",
    ref: (s: string) => {
      const v = "aeiouAEIOU";
      const n = s.length / 2;
      let a = 0;
      let b = 0;
      for (let i = 0; i < n; i++) {
        if (v.includes(s[i]!)) a++;
        if (v.includes(s[i + n]!)) b++;
      }
      return a === b;
    },
    argSets: [["book"], ["textbook"], ["AbCdEfGh"], ["aA"], ["aeiou"], ["Mer-ryChristmas"]],
  }),
);

// ---------------------------------------------------------------------------
// 43. Left and right sum differences
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 1,
    title: "Left and right sum differences",
    lang: js,
    funcName: "leftRigthDifference",
    signature: "leftRigthDifference(nums: number[]): number[]",
    prompt:
      "Write `leftRigthDifference(nums)` returning an array where element i is the absolute difference between the sum of elements to the left of i and the sum of elements to the right of i (use 0 for empty sides).\n\nOutput ONLY the function definition as an ES module exporting `leftRigthDifference`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[]) => {
      const total = nums.reduce((a, b) => a + b, 0);
      let left = 0;
      const out: number[] = [];
      for (const n of nums) {
        out.push(Math.abs(left - (total - left - n)));
        left += n;
      }
      return out;
    },
    argSets: [
      [[10, 4, 8, 3]],
      [[1]],
      [[1, 2, 3, 4, 5]],
      [[100]],
      [[0, 0, 0]],
      [[5, 1, 2, 7, 3]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 44. Longest palindromic substring
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Longest palindromic substring",
    lang: js,
    funcName: "longestPalindrome",
    signature: "longestPalindrome(s: string): string",
    prompt:
      "Write `longestPalindrome(s)` returning the longest palindromic substring of `s`. If there are multiple of the same length, return the one starting earliest. Example: `longestPalindrome(\"babad\")` returns `\"bab\"`.\n\nOutput ONLY the function definition as an ES module exporting `longestPalindrome`. No markdown fences, no explanation, no tests.",
    ref: (s: string) => {
      if (!s.length) return "";
      let start = 0;
      let maxLen = 0;
      for (let i = 0; i < s.length; i++) {
        let l = i, r = i;
        while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
        const len1 = r - l - 1;
        l = i; r = i + 1;
        while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
        const len2 = r - l - 1;
        const len = Math.max(len1, len2);
        if (len > maxLen) {
          maxLen = len;
          start = i - Math.floor((len - 1) / 2);
        }
      }
      return s.slice(start, start + maxLen);
    },
    argSets: [
      ["babad"],
      ["cbbd"],
      ["a"],
      ["ac"],
      ["bb"],
      ["racecar"],
      ["abcba"],
      [""],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 45. Rotate array
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Rotate array right by k",
    lang: js,
    funcName: "rotate",
    signature: "rotate(nums: number[], k: number): number[]",
    prompt:
      "Write `rotate(nums, k)` rotating the array to the right by `k` steps (modular: k may exceed the length). Return the rotated array. Example: `rotate([1,2,3,4,5,6,7], 3)` returns `[5,6,7,1,2,3,4]`.\n\nOutput ONLY the function definition as an ES module exporting `rotate`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[], k: number) => {
      const n = nums.length;
      if (!n) return [];
      const r = k % n;
      return [...nums.slice(n - r), ...nums.slice(0, n - r)];
    },
    argSets: [
      [[1, 2, 3, 4, 5, 6, 7], 3],
      [[-1, -100, 3, 99], 2],
      [[1, 2], 3],
      [[1], 0],
      [[1, 2, 3], 0],
      [[1, 2, 3, 4], 4],
      [[1, 2, 3, 4, 5], 7],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 46. Sort colors (Dutch national flag)
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Sort colors",
    lang: js,
    funcName: "sortColors",
    signature: "sortColors(nums: number[]): number[]",
    prompt:
      "Write `sortColors(nums)` that sorts an array containing only 0s, 1s and 2s in one pass using constant extra space (Dutch national flag algorithm). Return the sorted array (all 0s, then 1s, then 2s).\n\nOutput ONLY the function definition as an ES module exporting `sortColors`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[]) => [...nums].sort((a, b) => a - b),
    argSets: [
      [[2, 0, 2, 1, 1, 0]],
      [[2, 0, 1]],
      [[0]],
      [[1, 1, 1, 2, 2]],
      [[0, 0, 2, 1, 1, 2, 0, 1]],
      [[2, 2, 0, 0, 1, 1]],
      [[1, 0]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 47. Next permutation
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Next permutation",
    lang: js,
    funcName: "nextPermutation",
    signature: "nextPermutation(nums: number[]): number[]",
    prompt:
      "Write `nextPermutation(nums)` returning the next lexicographic permutation of the array (as a new array). If it's already the greatest permutation, wrap around to the smallest (ascending). Example: `nextPermutation([1,2,3])` returns `[1,3,2]`.\n\nOutput ONLY the function definition as an ES module exporting `nextPermutation`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[]) => {
      const a = nums.slice();
      const n = a.length;
      let i = n - 2;
      while (i >= 0 && a[i]! >= a[i + 1]!) i--;
      if (i >= 0) {
        let j = n - 1;
        while (a[j]! <= a[i]!) j--;
        [a[i], a[j]] = [a[j]!, a[i]!];
      }
      let l = i + 1, r = n - 1;
      while (l < r) { [a[l], a[r]] = [a[r]!, a[l]!]; l++; r--; }
      return a;
    },
    argSets: [
      [[1, 2, 3]],
      [[3, 2, 1]],
      [[1, 1, 5]],
      [[1]],
      [[1, 3, 2]],
      [[2, 3, 1]],
      [[1, 2, 1, 2]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 48. Decode string
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Decode string",
    lang: js,
    funcName: "decodeString",
    signature: "decodeString(s: string): string",
    prompt:
      "Write `decodeString(s)`. The encoding rule is k[encoded_string] where the text inside the brackets is repeated exactly k times. The input is always valid. Example: `decodeString(\"3[a]2[bc]\")` returns `\"aaabcbc\"`. Output can be long.\n\nOutput ONLY the function definition as an ES module exporting `decodeString`. No markdown fences, no explanation, no tests.",
    ref: (s: string) => {
      const st: Array<[string, number]> = [];
      let cur = "";
      let num = 0;
      for (const ch of s) {
        if (ch >= "0" && ch <= "9") {
          num = num * 10 + (ch.charCodeAt(0) - 48);
        } else if (ch === "[") {
          st.push([cur, num]);
          cur = "";
          num = 0;
        } else if (ch === "]") {
          const [prev, times] = st.pop()!;
          cur = prev + cur.repeat(times);
        } else {
          cur += ch;
        }
      }
      return cur;
    },
    argSets: [
      ["3[a]2[bc]"],
      ["3[a2[c]]"],
      ["2[abc]3[cd]ef"],
      ["abc3[cd]xyz"],
      ["100[a]"],
      ["a"],
      [""],
      ["2[2[b]]"],
      ["3[a]3[a]"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 49. Validate IP address
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Validate IP address",
    lang: js,
    funcName: "validIPAddress",
    signature: "validIPAddress(queryIP: string): string",
    prompt:
      "Write `validIPAddress(queryIP)` returning \"IPv4\" if it is a valid IPv4 address, \"IPv6\" if a valid IPv6 address, else \"Neither\". IPv4: four decimal groups 0-255 with no leading zeros. IPv6: eight groups of 1-4 hex digits separated by colons.\n\nOutput ONLY the function definition as an ES module exporting `validIPAddress`. No markdown fences, no explanation, no tests.",
    ref: (ip: string) => {
      if (/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
        const p = ip.split(".");
        if (p.every((x) => {
          if (x.length > 1 && x[0] === "0") return false;
          const n = Number(x);
          return n >= 0 && n <= 255;
        })) return "IPv4";
        return "Neither";
      }
      if (/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(ip)) return "IPv6";
      return "Neither";
    },
    argSets: [
      ["172.16.254.1"],
      ["1.1.1.1"],
      ["01.01.01.01"],
      ["256.1.1.1"],
      ["2001:0db8:85a3:0000:0000:8a2e:0370:7334"],
      ["2001:db8:85a3:0:0:8A2E:0370:7334"],
      ["1e1.4.5.6"],
      ["0.0.0.0"],
      ["::1"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 50. Simplify path
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Simplify path",
    lang: js,
    funcName: "simplifyPath",
    signature: "simplifyPath(path: string): string",
    prompt:
      "Write `simplifyPath(path)` canonicalizing an absolute Unix-style file path: collapse multiple slashes, resolve \".\" and \"..\" (which goes up one level), and produce a path starting with a single \"/\". Example: `simplifyPath(\"/a//b/../../c/\")` returns `\"/c\"`.\n\nOutput ONLY the function definition as an ES module exporting `simplifyPath`. No markdown fences, no explanation, no tests.",
    ref: (path: string) => {
      const st: string[] = [];
      for (const part of path.split("/")) {
        if (part === "" || part === ".") continue;
        if (part === "..") st.pop();
        else st.push(part);
      }
      return "/" + st.join("/");
    },
    argSets: [
      ["/home/"],
      ["/../"],
      ["/home//foo/"],
      ["/a/./b/../../c/"],
      ["/a/../../b/../c//.//"],
      ["/"],
      ["/a//b////c/d//././/.."],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 51. Add binary
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Add binary strings",
    lang: py,
    funcName: "add_binary",
    signature: "add_binary(a: str, b: str) -> str",
    prompt:
      "Write `add_binary(a, b)` in Python that adds two binary strings and returns their sum as a binary string, without leading zeros. Example: `add_binary(\"11\", \"1\")` returns `\"100\"`.\n\nOutput ONLY the function definition `def add_binary(...)`. No markdown fences, no explanation.",
    ref: (a: string, b: string) => (BigInt("0b" + a) + BigInt("0b" + b)).toString(2),
    argSets: [
      ["11", "1"],
      ["1010", "1011"],
      ["0", "0"],
      ["1", "10"],
      ["111", "1"],
      ["101", "101"],
      ["11111111", "1"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 52. Plus one
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Plus one",
    lang: js,
    funcName: "plusOne",
    signature: "plusOne(digits: number[]): number[]",
    prompt:
      "Write `plusOne(digits)` where each element is a single digit of a large integer (most significant first, no leading zeros except the number 0 itself). Add one and return the resulting digits.\n\nOutput ONLY the function definition as an ES module exporting `plusOne`. No markdown fences, no explanation, no tests.",
    ref: (digits: number[]) => {
      const a = digits.slice();
      for (let i = a.length - 1; i >= 0; i--) {
        if (a[i]! < 9) { a[i]!++; return a; }
        a[i] = 0;
      }
      return [1, ...a];
    },
    argSets: [
      [[1, 2, 3]],
      [[4, 3, 2, 1]],
      [[9]],
      [[9, 9]],
      [[1, 9, 9]],
      [[0]],
      [[9, 8, 9]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 53. Jump game
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Jump game",
    lang: js,
    funcName: "canJump",
    signature: "canJump(nums: number[]): boolean",
    prompt:
      "Write `canJump(nums)`. You start at index 0, and from index i you can jump up to nums[i] steps ahead. Return true if you can reach the last index.\n\nOutput ONLY the function definition as an ES module exporting `canJump`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[]) => {
      let reach = 0;
      for (let i = 0; i < nums.length; i++) {
        if (i > reach) return false;
        reach = Math.max(reach, i + nums[i]!);
      }
      return true;
    },
    argSets: [
      [[2, 3, 1, 1, 4]],
      [[3, 2, 1, 0, 4]],
      [[0]],
      [[2, 0, 0]],
      [[1, 1, 1, 1]],
      [[5, 0, 0, 0, 0]],
      [[1, 2, 0, 1, 0]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 54. House robber
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "House robber",
    lang: js,
    funcName: "rob",
    signature: "rob(nums: number[]): number",
    prompt:
      "Write `rob(nums)` returning the maximum amount you can steal from non-adjacent houses, where nums[i] is the money in house i (you cannot rob two adjacent houses).\n\nOutput ONLY the function definition as an ES module exporting `rob`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[]) => {
      let prev = 0, cur = 0;
      for (const n of nums) {
        const t = Math.max(cur, prev + n);
        prev = cur;
        cur = t;
      }
      return cur;
    },
    argSets: [
      [[1, 2, 3, 1]],
      [[2, 7, 9, 3, 1]],
      [[2, 1, 1, 2]],
      [[1]],
      [[0]],
      [[1, 2]],
      [[5, 3, 4, 11, 2]],
      [[]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 55. Word pattern
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Word pattern",
    lang: js,
    funcName: "wordPattern",
    signature: "wordPattern(pattern: string, s: string): boolean",
    prompt:
      "Write `wordPattern(pattern, s)` returning true if `s` follows the same pattern, where each letter in `pattern` maps to exactly one word in `s` (bijection, one-to-one both ways). Example: `wordPattern(\"abba\", \"dog cat cat dog\")` is true.\n\nOutput ONLY the function definition as an ES module exporting `wordPattern`. No markdown fences, no explanation, no tests.",
    ref: (pattern: string, s: string) => {
      const words = s.split(" ");
      if (pattern.length !== words.length) return false;
      const p2w: Record<string, string> = {};
      const w2p: Record<string, string> = {};
      for (let i = 0; i < pattern.length; i++) {
        const p = pattern[i]!;
        const w = words[i]!;
        if (p2w[p] !== undefined && p2w[p] !== w) return false;
        if (w2p[w] !== undefined && w2p[w] !== p) return false;
        p2w[p] = w;
        w2p[w] = p;
      }
      return true;
    },
    argSets: [
      ["abba", "dog cat cat dog"],
      ["abba", "dog cat cat fish"],
      ["aaaa", "dog cat cat dog"],
      ["abba", "dog dog dog dog"],
      ["abc", "a b c"],
      ["aaa", "aa aa aa"],
      ["ab", "dog cat cat"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 56. Isomorphic strings
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Isomorphic strings",
    lang: py,
    funcName: "is_isomorphic",
    signature: "is_isomorphic(s: str, t: str) -> bool",
    prompt:
      "Write `is_isomorphic(s, t)` in Python returning True if the characters in `s` can be replaced to get `t`, as a one-to-one mapping of characters (no two characters map to the same character).\n\nOutput ONLY the function definition `def is_isomorphic(...)`. No markdown fences, no explanation.",
    ref: (s: string, t: string) => {
      const m1: Record<string, string> = {};
      const m2: Record<string, string> = {};
      for (let i = 0; i < s.length; i++) {
        const a = s[i]!;
        const b = t[i]!;
        if (m1[a] !== undefined && m1[a] !== b) return false;
        if (m2[b] !== undefined && m2[b] !== a) return false;
        m1[a] = b;
        m2[b] = a;
      }
      return true;
    },
    argSets: [
      ["egg", "add"],
      ["foo", "bar"],
      ["paper", "title"],
      ["ab", "aa"],
      ["badc", "baba"],
      ["", ""],
      ["aba", "bcd"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 57. Zigzag conversion
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Zigzag conversion",
    lang: js,
    funcName: "convert",
    signature: "convert(s: string, numRows: number): string",
    prompt:
      "Write `convert(s, numRows)` that writes the string in a zigzag pattern across `numRows` rows and reads it row by row. Example: `convert(\"PAYPALISHIRING\", 3)` returns `\"PAHNAPLSIIGYIR\"`.\n\nOutput ONLY the function definition as an ES module exporting `convert`. No markdown fences, no explanation, no tests.",
    ref: (s: string, rows: number) => {
      if (rows === 1 || rows >= s.length) return s;
      const arr = new Array<string>(rows).fill("");
      let r = 0;
      let down = true;
      for (const ch of s) {
        arr[r] += ch;
        if (down) {
          if (r === rows - 1) { down = false; r--; } else r++;
        } else {
          if (r === 0) { down = true; r++; } else r--;
        }
      }
      return arr.join("");
    },
    argSets: [
      ["PAYPALISHIRING", 3],
      ["PAYPALISHIRING", 4],
      ["A", 1],
      ["AB", 1],
      ["ABCD", 2],
      ["PAYPALISHIRING", 5],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 58. Repeated DNA sequences
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Repeated DNA sequences",
    lang: js,
    funcName: "findRepeatedDnaSequences",
    signature: "findRepeatedDnaSequences(s: string): string[]",
    prompt:
      "Write `findRepeatedDnaSequences(s)` returning all 10-letter-long substrings that occur more than once in the DNA string. Return them sorted lexicographically. Example: `findRepeatedDnaSequences(\"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\")` returns `[\"AAAAACCCCC\",\"CCCCCAAAAA\"]`.\n\nOutput ONLY the function definition as an ES module exporting `findRepeatedDnaSequences`. No markdown fences, no explanation, no tests.",
    ref: (s: string) => {
      const seen = new Set<string>();
      const twice = new Set<string>();
      for (let i = 0; i + 10 <= s.length; i++) {
        const sub = s.slice(i, i + 10);
        if (seen.has(sub)) twice.add(sub);
        seen.add(sub);
      }
      return [...twice].sort();
    },
    argSets: [
      ["AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"],
      ["AAAAAAAAAAAAA"],
      ["AAAAAAAAAA"],
      [""],
      ["GGGGGGGGGGGGGGGGGGGG"],
      ["AAAAACCCCCAAAAACCCCCCAAAA"] ,
    ],
  }),
);

// ---------------------------------------------------------------------------
// 59. Largest number
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Largest number formed by joining",
    lang: js,
    funcName: "largestNumber",
    signature: "largestNumber(nums: number[]): string",
    prompt:
      "Write `largestNumber(nums)` arranging the numbers to form the largest possible value when their string forms are concatenated, returned as a string. If the result would start with zeros (all zeros), return \"0\".\n\nOutput ONLY the function definition as an ES module exporting `largestNumber`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[]) => {
      const r = nums.map(String).sort((a, b) => (b + a).localeCompare(a + b)).join("");
      return r[0] === "0" ? "0" : r;
    },
    argSets: [
      [[10, 2]],
      [[3, 30, 34, 5, 9]],
      [[1]],
      [[0, 0]],
      [[1, 10, 100, 1000]],
      [[99, 9, 98]],
      [[121, 12]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 60. Kth largest element
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Kth largest element in array",
    lang: js,
    funcName: "findKthLargest",
    signature: "findKthLargest(nums: number[], k: number): number",
    prompt:
      "Write `findKthLargest(nums, k)` returning the kth largest element in the array (1-indexed, the largest is k=1). Return the value; ties count as separate positions. Example: `findKthLargest([3,2,1,5,6,4], 2)` returns 5.\n\nOutput ONLY the function definition as an ES module exporting `findKthLargest`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[], k: number) => [...nums].sort((a, b) => b - a)[k - 1]!,
    argSets: [
      [[3, 2, 1, 5, 6, 4], 2],
      [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4],
      [[1], 1],
      [[5, 5, 5, 5], 2],
      [[1, 2, 3, 4], 4],
      [[-1, -5, 0, 8], 1],
      [[10, 9, 8, 7, 6, 5], 3],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 61. Fraction to recurring decimal
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Fraction to recurring decimal",
    lang: js,
    funcName: "fractionToDecimal",
    signature: "fractionToDecimal(numerator: number, denominator: number): string",
    prompt:
      "Write `fractionToDecimal(numerator, denominator)` returning the decimal representation of the fraction as a string. Enclose the repeating part in parentheses. Example: `fractionToDecimal(4, 333)` returns `\"0.(012)\"`. Denominator is never 0.\n\nOutput ONLY the function definition as an ES module exporting `fractionToDecimal`. No markdown fences, no explanation, no tests.",
    ref: (numerator: number, denominator: number) => {
      if (numerator === 0) return "0";
      let sign = "";
      if ((numerator < 0) !== (denominator < 0)) sign = "-";
      let num = Math.abs(numerator);
      const den = Math.abs(denominator);
      const intPart = Math.floor(num / den);
      num = num % den;
      let frac = "";
      const seen = new Map<number, number>();
      let pos = 0;
      while (num !== 0) {
        if (seen.has(num)) {
          const idx = seen.get(num)!;
          frac = frac.slice(0, idx) + "(" + frac.slice(idx) + ")";
          break;
        }
        seen.set(num, pos);
        num *= 10;
        frac += String(Math.floor(num / den));
        num = num % den;
        pos++;
      }
      if (frac === "") return sign + intPart;
      return sign + intPart + "." + frac;
    },
    argSets: [
      [1, 2],
      [2, 1],
      [4, 333],
      [1, 3],
      [1, 6],
      [22, 7],
      [1, 500],
      [7, 12],
      [-50, 8],
      [1, 2],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 62. Push dominoes
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Push dominoes",
    lang: js,
    funcName: "pushDominoes",
    signature: "pushDominoes(dominoes: string): string",
    prompt:
      "Write `pushDominoes(dominoes)` where each character is '.', 'L' or 'R'. Simulate pushing all dominoes until stable: an 'R' pushes '.' to its right, an 'L' pushes '.' to its left; opposing forces of equal strength leave the middle '.' unaffected. Return the final stable string.\n\nOutput ONLY the function definition as an ES module exporting `pushDominoes`. No markdown fences, no explanation, no tests.",
    ref: (dominoes: string) => {
      const n = dominoes.length;
      const forces = new Array(n).fill(0);
      let f = 0;
      for (let i = 0; i < n; i++) {
        if (dominoes[i] === "R") f = n;
        else if (dominoes[i] === "L") f = 0;
        else f = Math.max(f - 1, 0);
        forces[i] += f;
      }
      f = 0;
      for (let i = n - 1; i >= 0; i--) {
        if (dominoes[i] === "L") f = n;
        else if (dominoes[i] === "R") f = 0;
        else f = Math.max(f - 1, 0);
        forces[i] -= f;
      }
      let out = "";
      for (const force of forces) out += force > 0 ? "R" : force < 0 ? "L" : ".";
      return out;
    },
    argSets: [
      [".L.R...LR..L.."],
      ["RR.L"],
      ["."],
      ["L"],
      ["R"],
      ["..R.."],
      [".R.L"],
      ["...."],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 63. Max consecutive ones II (flip at most one zero)
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 2,
    title: "Max consecutive ones with one flip",
    lang: py,
    funcName: "find_max_consecutive_ones",
    signature: "find_max_consecutive_ones(nums: list) -> int",
    prompt:
      "Write `find_max_consecutive_ones(nums)` in Python. The binary array contains 0s and 1s. You may flip at most one 0 to 1. Return the length of the longest subarray of 1s achievable.\n\nOutput ONLY the function definition `def find_max_consecutive_ones(...)`. No markdown fences, no explanation.",
    ref: (nums: number[]) => {
      let left = 0, zeros = 0, best = 0;
      for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeros++;
        while (zeros > 1) {
          if (nums[left] === 0) zeros--;
          left++;
        }
        best = Math.max(best, right - left + 1);
      }
      return best;
    },
    argSets: [
      [[1, 0, 1, 1, 0]],
      [[1, 1, 0, 1]],
      [[0, 0, 0]],
      [[1, 1, 1]],
      [[0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1]],
      [[1]],
      [[0]],
      [[1, 0, 1, 0, 1]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 64. Trapping rain water
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Trapping rain water",
    lang: js,
    funcName: "trap",
    signature: "trap(height: number[]): number",
    prompt:
      "Write `trap(height)` where height[i] is the height of a bar. Compute how much water it can trap after rain. Example: `trap([0,1,0,2,1,0,1,3,2,1,2,1])` returns 6.\n\nOutput ONLY the function definition as an ES module exporting `trap`. No markdown fences, no explanation, no tests.",
    ref: (h: number[]) => {
      const n = h.length;
      if (!n) return 0;
      const left = new Array(n);
      const right = new Array(n);
      left[0] = h[0]!;
      for (let i = 1; i < n; i++) left[i] = Math.max(left[i - 1]!, h[i]!);
      right[n - 1] = h[n - 1]!;
      for (let i = n - 2; i >= 0; i--) right[i] = Math.max(right[i + 1]!, h[i]!);
      let w = 0;
      for (let i = 0; i < n; i++) w += Math.min(left[i]!, right[i]!) - h[i]!;
      return w;
    },
    argSets: [
      [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
      [[4, 2, 0, 3, 2, 5]],
      [[1]],
      [[2, 0, 2]],
      [[3, 0, 1, 2]],
      [[5, 4, 3, 2, 1]],
      [[1, 2, 3, 4]],
      [[]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 65. Sliding window maximum
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Sliding window maximum",
    lang: js,
    funcName: "maxSlidingWindow",
    signature: "maxSlidingWindow(nums: number[], k: number): number[]",
    prompt:
      "Write `maxSlidingWindow(nums, k)` returning an array containing the max of each contiguous subarray of length k, using a monotonic deque for O(n) time.\n\nOutput ONLY the function definition as an ES module exporting `maxSlidingWindow`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[], k: number) => {
      const out: number[] = [];
      const dq: number[] = [];
      for (let i = 0; i < nums.length; i++) {
        while (dq.length && nums[dq[dq.length - 1]!]! <= nums[i]!) dq.pop();
        dq.push(i);
        if (dq[0]! <= i - k) dq.shift();
        if (i >= k - 1) out.push(nums[dq[0]!]!);
      }
      return out;
    },
    argSets: [
      [[1, 3, -1, -3, 5, 3, 6, 7], 3],
      [[1], 1],
      [[1, -1], 1],
      [[1, 2, 3, 4, 5], 2],
      [[5, 4, 3, 2, 1], 2],
      [[9, 11], 2],
      [[1, 1, 1, 1], 2],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 66. Median of two sorted arrays
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Median of two sorted arrays",
    lang: js,
    funcName: "findMedianSortedArrays",
    signature: "findMedianSortedArrays(nums1: number[], nums2: number[]): number",
    prompt:
      "Write `findMedianSortedArrays(nums1, nums2)` returning the median of the two sorted arrays combined. If the combined length is even, return the average of the two middle numbers (e.g. 2.5). O(log(m+n)).\n\nOutput ONLY the function definition as an ES module exporting `findMedianSortedArrays`. No markdown fences, no explanation, no tests.",
    ref: (a: number[], b: number[]) => {
      const all = a.concat(b).sort((x, y) => x - y);
      const len = all.length;
      if (len % 2) return all[Math.floor(len / 2)]!;
      return (all[len / 2 - 1]! + all[len / 2]!) / 2;
    },
    argSets: [
      [[1, 3], [2]],
      [[1, 2], [3, 4]],
      [[0, 0], [0, 0]],
      [[], [1]],
      [[2], []],
      [[1, 5, 9], [3, 7]],
      [[1, 1], [1, 1]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 67. First missing positive
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "First missing positive",
    lang: js,
    funcName: "firstMissingPositive",
    signature: "firstMissingPositive(nums: number[]): number",
    prompt:
      "Write `firstMissingPositive(nums)` returning the smallest positive integer (>= 1) that is not present in the array. O(n) time, O(1) extra space.\n\nOutput ONLY the function definition as an ES module exporting `firstMissingPositive`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[]) => {
      const s = new Set(nums);
      let i = 1;
      while (s.has(i)) i++;
      return i;
    },
    argSets: [
      [[1, 2, 0]],
      [[3, 4, -1, 1]],
      [[7, 8, 9, 11, 12]],
      [[1]],
      [[]],
      [[1, 2, 3, 4]],
      [[-5, -3, -1]],
      [[0, 2, 2, 1, 1]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 68. LRU cache via operations
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "LRU cache (operation sequence)",
    lang: js,
    funcName: "lruCache",
    signature: "lruCache(capacity: number, operations: Array<[string, number, number?]>): Array<number|null>",
    prompt:
      "Write `lruCache(capacity, operations)` implementing an LRU (least recently used) cache. Each operation is either [\"get\", key] or [\"put\", key, value]. get returns the value or -1 if absent (and marks it most recently used). put inserts/updates (marking most recently used), evicting the least recently used key when over capacity. Return an array of the results in order, using null for put operations.\n\nOutput ONLY the function definition as an ES module exporting `lruCache`. No markdown fences, no explanation, no tests.",
    ref: (capacity: number, operations: Array<[string, number, number?]>) => {
      const map = new Map<number, number>();
      const out: Array<number | null> = [];
      for (const op of operations) {
        if (op[0] === "get") {
          const k = op[1];
          if (map.has(k)) {
            const v = map.get(k)!;
            map.delete(k);
            map.set(k, v);
            out.push(v);
          } else {
            out.push(-1);
          }
        } else {
          const k = op[1];
          const v = op[2]!;
          if (map.has(k)) map.delete(k);
          else if (map.size === capacity) {
            const oldest = map.keys().next().value!;
            map.delete(oldest);
          }
          map.set(k, v);
          out.push(null);
        }
      }
      return out;
    },
    argSets: [
      [2, [["put", 1, 1], ["put", 2, 2], ["get", 1], ["put", 3, 3], ["get", 2], ["put", 4, 4], ["get", 1], ["get", 3], ["get", 4]]] as any,
      [1, [["put", 1, 1], ["put", 2, 2], ["get", 1]]] as any,
      [2, [["get", 1]]] as any,
      [3, [["put", 1, 10], ["put", 2, 20], ["put", 3, 30], ["get", 1], ["put", 4, 40], ["get", 2]]] as any,
      [2, [["put", 1, 1], ["put", 2, 2], ["put", 3, 3], ["get", 2]]] as any,
    ],
  }),
);

// ---------------------------------------------------------------------------
// 69. Edit distance
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Edit distance",
    lang: py,
    funcName: "min_distance",
    signature: "min_distance(word1: str, word2: str) -> int",
    prompt:
      "Write `min_distance(word1, word2)` in Python returning the minimum number of operations (insert, delete, replace) to convert word1 into word2.\n\nOutput ONLY the function definition `def min_distance(...)`. No markdown fences, no explanation.",
    ref: (a: string, b: string) => {
      const dp = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
      for (let i = 0; i <= a.length; i++) dp[i]![0] = i;
      for (let j = 0; j <= b.length; j++) dp[0]![j] = j;
      for (let i = 1; i <= a.length; i++)
        for (let j = 1; j <= b.length; j++) {
          if (a[i - 1] === b[j - 1]) dp[i]![j] = dp[i - 1]![j - 1]!;
          else dp[i]![j] = 1 + Math.min(dp[i - 1]![j]!, dp[i]![j - 1]!, dp[i - 1]![j - 1]!);
        }
      return dp[a.length]![b.length]!;
    },
    argSets: [
      ["horse", "ros"],
      ["intention", "execution"],
      ["", "a"],
      ["a", ""],
      ["", ""],
      ["abc", "abc"],
      ["leetcode", "practice"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 70. Burst balloons
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Burst balloons",
    lang: js,
    funcName: "maxCoins",
    signature: "maxCoins(nums: number[]): number",
    prompt:
      "Write `maxCoins(nums)`. You burst balloons to collect coins; bursting balloon i yields nums[i-1] * nums[i] * nums[i+1] (treat out-of-range as 1). Find the maximum coins you can collect by choosing the burst order.\n\nOutput ONLY the function definition as an ES module exporting `maxCoins`. No markdown fences, no explanation, no tests.",
    ref: (nums: number[]) => {
      const n = nums.length;
      const arr = [1, ...nums, 1];
      const dp = Array.from({ length: n + 2 }, () => new Array<number>(n + 2).fill(0));
      for (let len = 1; len <= n; len++)
        for (let i = 1; i <= n - len + 1; i++) {
          const j = i + len - 1;
          for (let k = i; k <= j; k++) {
            dp[i]![j] = Math.max(
              dp[i]![j]!,
              dp[i]![k - 1]! + arr[i - 1]! * arr[k]! * arr[j + 1]! + dp[k + 1]![j]!,
            );
          }
        }
      return dp[1]![n]!;
    },
    argSets: [
      [[3, 1, 5, 8]],
      [[1, 5]],
      [[1]],
      [[]],
      [[9, 9]],
      [[8, 2, 6, 8, 9, 8, 1, 5, 0]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 71. Candy
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Candy distribution",
    lang: js,
    funcName: "candy",
    signature: "candy(ratings: number[]): number",
    prompt:
      "Write `candy(ratings)` returning the minimum candies needed so that every child gets at least one, and a child with a higher rating than a neighbor gets strictly more candies than that neighbor.\n\nOutput ONLY the function definition as an ES module exporting `candy`. No markdown fences, no explanation, no tests.",
    ref: (ratings: number[]) => {
      const n = ratings.length;
      const cand = new Array(n).fill(1);
      for (let i = 1; i < n; i++) if (ratings[i]! > ratings[i - 1]!) cand[i] = cand[i - 1]! + 1;
      for (let i = n - 2; i >= 0; i--)
        if (ratings[i]! > ratings[i + 1]!) cand[i] = Math.max(cand[i]!, cand[i + 1]! + 1);
      return cand.reduce((a, b) => a + b, 0);
    },
    argSets: [
      [[1, 0, 2]],
      [[1, 2, 2]],
      [[1]],
      [[]],
      [[1, 2, 3, 4]],
      [[4, 3, 2, 1]],
      [[1, 2, 2, 1]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 72. Basic calculator II
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Basic calculator II",
    lang: js,
    funcName: "calculate",
    signature: "calculate(s: string): number",
    prompt:
      "Write `calculate(s)` evaluating a string expression containing non-negative integers and the operators +, -, *, / (integer division truncating). Respect operator precedence. The expression is valid. Example: `calculate(\"3+2*2\")` returns 7.\n\nOutput ONLY the function definition as an ES module exporting `calculate`. No markdown fences, no explanation, no tests.",
    ref: (s: string) => {
      const st: number[] = [];
      let num = 0;
      let op = "+";
      for (let i = 0; i < s.length; i++) {
        const ch = s[i]!;
        if (ch >= "0" && ch <= "9") num = num * 10 + (ch.charCodeAt(0) - 48);
        if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || i === s.length - 1) {
          if (op === "+") st.push(num);
          else if (op === "-") st.push(-num);
          else if (op === "*") st.push(st.pop()! * num);
          else st.push(Math.trunc(st.pop()! / num));
          op = ch;
          num = 0;
        }
      }
      return st.reduce((a, b) => a + b, 0);
    },
    argSets: [
      ["3+2*2"],
      [" 3/2 "],
      [" 3+5 / 2 "],
      ["100-1/3"],
      ["42"],
      ["1+1"],
      [" 2/2 "],
      ["10-3*2+4/2"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 73. Largest rectangle in histogram
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Largest rectangle in histogram",
    lang: js,
    funcName: "largestRectangleArea",
    signature: "largestRectangleArea(heights: number[]): number",
    prompt:
      "Write `largestRectangleArea(heights)` where heights[i] is the height of a bar of width 1. Return the area of the largest rectangle that can be formed within the histogram. O(n) with a stack.\n\nOutput ONLY the function definition as an ES module exporting `largestRectangleArea`. No markdown fences, no explanation, no tests.",
    ref: (h: number[]) => {
      const st: number[] = [];
      let max = 0;
      h.push(0);
      for (let i = 0; i < h.length; i++) {
        while (st.length && h[st[st.length - 1]!]! > h[i]!) {
          const tp = st.pop()!;
          const w = st.length ? i - st[st.length - 1]! - 1 : i;
          max = Math.max(max, h[tp]! * w);
        }
        st.push(i);
      }
      return max;
    },
    argSets: [
      [[2, 1, 5, 6, 2, 3]],
      [[2, 4]],
      [[1]],
      [[]],
      [[6, 5, 4, 3, 2, 1]],
      [[1, 2, 3, 4, 5]],
      [[2, 1, 2]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 74. Max points on a line
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Max points on a line",
    lang: js,
    funcName: "maxPoints",
    signature: "maxPoints(points: number[][]): number",
    prompt:
      "Write `maxPoints(points)` where each point is [x, y] (integers). Return the maximum number of points that lie on the same straight line.\n\nOutput ONLY the function definition as an ES module exporting `maxPoints`. No markdown fences, no explanation, no tests.",
    ref: (points: number[][]) => {
      const n = points.length;
      if (n <= 2) return n;
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      let best = 0;
      for (let i = 0; i < n; i++) {
        const map = new Map<string, number>();
        let same = 0;
        let cur = 0;
        for (let j = i + 1; j < n; j++) {
          const [x1, y1] = points[i]!;
          const [x2, y2] = points[j]!;
          if (x1 === x2 && y1 === y2) { same++; continue; }
          let dx = x2! - x1!;
          let dy = y2! - y1!;
          const g = gcd(Math.abs(dx), Math.abs(dy));
          dx /= g;
          dy /= g;
          if (dx < 0 || (dx === 0 && dy < 0)) { dx = -dx; dy = -dy; }
          const key = dx + "," + dy;
          const cnt = (map.get(key) ?? 0) + 1;
          map.set(key, cnt);
          cur = Math.max(cur, cnt);
        }
        best = Math.max(best, cur + same + 1);
      }
      return best;
    },
    argSets: [
      [[[1, 1], [2, 2], [3, 3]]],
      [[[1, 1], [3, 2], [5, 3], [4, 1], [2, 3], [1, 4]]],
      [[[0, 0]]],
      [[[0, 0], [1, 1]]],
      [[[1, 1], [2, 2], [2, 3]]],
      [[[0, 0], [0, 1], [0, 2], [1, 1], [2, 2]]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 75. Palindrome pairs
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Palindrome pairs",
    lang: js,
    funcName: "palindromePairs",
    signature: "palindromePairs(words: string[]): number[][]",
    prompt:
      "Write `palindromePairs(words)` returning all pairs of indices (i, j), i != j, such that the concatenation words[i] + words[j] is a palindrome. Return pairs sorted by (i, then j).\n\nOutput ONLY the function definition as an ES module exporting `palindromePairs`. No markdown fences, no explanation, no tests.",
    ref: (words: string[]) => {
      const isPal = (s: string) => {
        let l = 0, r = s.length - 1;
        while (l < r) if (s[l++] !== s[r--]) return false;
        return true;
      };
      const out: number[][] = [];
      for (let i = 0; i < words.length; i++)
        for (let j = 0; j < words.length; j++) {
          if (i === j) continue;
          if (isPal(words[i]! + words[j]!)) out.push([i, j]);
        }
      return out.sort((a, b) => a[0]! - b[0]! || a[1]! - b[1]!);
    },
    argSets: [
      [["abcd", "dcba", "lls", "s", "sssll"]],
      [["bat", "tab", "cat"]],
      [["a", ""]],
      [["a", "abc", "aba", ""]],
      [["ab", "ba", "a", "aa"]],
      [[""]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 76. Remove duplicate letters
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Remove duplicate letters (smallest lexicographic)",
    lang: js,
    funcName: "removeDuplicateLetters",
    signature: "removeDuplicateLetters(s: string): string",
    prompt:
      "Write `removeDuplicateLetters(s)` returning the smallest lexicographically result you can obtain by removing duplicate letters (each letter must appear exactly once, order corresponds to remaining character order). Example: `removeDuplicateLetters(\"bcabc\")` returns `\"abc\"`.\n\nOutput ONLY the function definition as an ES module exporting `removeDuplicateLetters`. No markdown fences, no explanation, no tests.",
    ref: (s: string) => {
      const count = new Array(26).fill(0);
      const seen = new Array(26).fill(false);
      for (const ch of s) count[ch.charCodeAt(0) - 97]++;
      const st: string[] = [];
      for (const ch of s) {
        const ci = ch.charCodeAt(0) - 97;
        count[ci]--;
        if (seen[ci]) continue;
        while (
          st.length &&
          st[st.length - 1]! > ch &&
          count[st[st.length - 1]!.charCodeAt(0) - 97] > 0
        ) {
          seen[st.pop()!.charCodeAt(0) - 97] = false;
        }
        st.push(ch);
        seen[ci] = true;
      }
      return st.join("");
    },
    argSets: [
      ["bcabc"],
      ["cbacdcbc"],
      ["a"],
      [""],
      ["aaabbb"],
      ["abcabcabc"],
      ["zxy"],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 77. Merge k sorted lists (arrays)
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Merge k sorted lists",
    lang: js,
    funcName: "mergeKLists",
    signature: "mergeKLists(lists: number[][]): number[]",
    prompt:
      "Write `mergeKLists(lists)` where lists is an array of sorted (ascending) integer arrays. Merge them all into one sorted array and return it.\n\nOutput ONLY the function definition as an ES module exporting `mergeKLists`. No markdown fences, no explanation, no tests.",
    ref: (lists: number[][]) => {
      const flat: number[] = [];
      for (const l of lists) flat.push(...l);
      return flat.sort((a, b) => a - b);
    },
    argSets: [
      [[[1, 4, 5], [1, 3, 4], [2, 6]]],
      [[[], []]],
      [[[1], [2], [3]]],
      [[[1, 2], [], [3, 4, 5]]],
      [[[1, 1, 1], [1, 1]]],
      [[[]]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 78. Number of islands
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Number of islands",
    lang: js,
    funcName: "numIslands",
    signature: "numIslands(grid: string[][]): number",
    prompt:
      "Write `numIslands(grid)` where grid is a 2D array of \"0\" (water) and \"1\" (land). Count the number of islands, where an island is a group of '1's connected 4-directionally (up/down/left/right).\n\nOutput ONLY the function definition as an ES module exporting `numIslands`. No markdown fences, no explanation, no tests.",
    ref: (grid: string[][]) => {
      const rows = grid.length;
      const cols = grid[0] ? grid[0]!.length : 0;
      let count = 0;
      const sink = (i: number, j: number) => {
        if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i]![j] === "0") return;
        grid[i]![j] = "0";
        sink(i + 1, j);
        sink(i - 1, j);
        sink(i, j + 1);
        sink(i, j - 1);
      };
      for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++)
          if (grid[i]![j] === "1") {
            count++;
            sink(i, j);
          }
      return count;
    },
    argSets: [
      [
        [
          ["1", "1", "1", "1", "0"],
          ["1", "1", "0", "1", "0"],
          ["1", "1", "0", "0", "0"],
          ["0", "0", "0", "0", "0"],
        ],
      ],
      [
        [
          ["1", "1", "0", "0", "0"],
          ["1", "1", "0", "0", "0"],
          ["0", "0", "1", "0", "0"],
          ["0", "0", "0", "1", "1"],
        ],
      ],
      [[[]]],
      [[["1"]]],
      [[["0"]]],
      [[["1", "0", "1"], ["0", "1", "0"], ["1", "0", "1"]]],
    ],
  }),
);

// ---------------------------------------------------------------------------
// 79. Valid Sudoku
// ---------------------------------------------------------------------------
tasks.push(
  c({
    category: "coding-implementation",
    difficulty: 3,
    title: "Valid Sudoku",
    lang: js,
    funcName: "isValidSudoku",
    signature: "isValidSudoku(board: string[][]): boolean",
    prompt:
      "Write `isValidSudoku(board)` validating a partially filled 9x9 Sudoku board (cells are \"1\"-\"9\" or \".\" for empty). Return true if no row, column, or 3x3 box contains a duplicate digit. It need not be solvable.\n\nOutput ONLY the function definition as an ES module exporting `isValidSudoku`. No markdown fences, no explanation, no tests.",
    ref: (board: string[][]) => {
      const rows = Array.from({ length: 9 }, () => new Set<string>());
      const cols = Array.from({ length: 9 }, () => new Set<string>());
      const boxes = Array.from({ length: 9 }, () => new Set<string>());
      for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++) {
          const cell = board[i]![j]!;
          if (cell === ".") continue;
          const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
          if (rows[i]!.has(cell) || cols[j]!.has(cell) || boxes[b]!.has(cell)) return false;
          rows[i]!.add(cell);
          cols[j]!.add(cell);
          boxes[b]!.add(cell);
        }
      return true;
    },
    argSets: [
      [
        [
          ["5", "3", ".", ".", "7", ".", ".", ".", "."],
          ["6", ".", ".", "1", "9", "5", ".", ".", "."],
          [".", "9", "8", ".", ".", ".", ".", "6", "."],
          ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
          ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
          ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
          [".", "6", ".", ".", ".", ".", "2", "8", "."],
          [".", ".", ".", "4", "1", "9", ".", ".", "5"],
          [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ],
      ],
      [
        [
          ["8", "3", ".", ".", "7", ".", ".", ".", "."],
          ["6", ".", ".", "1", "9", "5", ".", ".", "."],
          [".", "9", "8", ".", ".", ".", ".", "6", "."],
          ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
          ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
          ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
          [".", "6", ".", ".", ".", ".", "2", "8", "."],
          [".", ".", ".", "4", "1", "9", ".", ".", "5"],
          [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ],
      ],
      [
        Array(9).fill([".", ".", ".", ".", ".", ".", ".", ".", "."]),
      ],
      [
        [
          [".", ".", ".", ".", "5", ".", ".", "1", "."],
          [".", "4", ".", "3", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", "3", ".", ".", "1"],
          ["8", ".", ".", ".", ".", ".", ".", "2", "."],
          [".", ".", "2", ".", "7", ".", ".", ".", "."],
          [".", "1", "5", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", "2", ".", ".", "."],
          [".", "2", ".", "9", ".", ".", ".", ".", "."],
          [".", ".", "4", ".", ".", ".", ".", ".", "."],
        ],
      ],
    ],
  }),
);

export default tasks;


