import type { Task } from "../types.ts";
import { codeTaskDef as c, promptTask as p } from "./helpers.ts";

const tasks: Task[] = [];

const js = "javascript" as const;
const py = "python" as const;

const jsSuffix =
  "\n\nOutput ONLY the function definition as an ES module exporting the function (e.g. `export function f(...)`). Do not include markdown fences, explanation, wrapper script, or tests.";
const pySuffix =
  "\n\nOutput ONLY the function definition (e.g. `def f(...)`). No markdown fences, no explanation, no main block.";

// ===========================================================================
// LEVEL 1 — simple multi-step stateful agents
// ===========================================================================

// 1. Robot footprints: count distinct cells visited
tasks.push(
  c({
    category: "agentic",
    difficulty: 1,
    title: "Robot footprints",
    lang: js,
    funcName: "robotCleaner",
    signature: "robotCleaner(moves: string[]): number",
    prompt:
      "A cleaning robot starts at floor position (0,0) and executes a list of moves, each one of 'N','S','E','W' (one unit each). Write `robotCleaner(moves)` returning the number of DISTINCT grid cells the robot visits, counting the starting cell as visited once." +
      jsSuffix,
    ref: (moves: string[]) => {
      const seen = new Set<string>(["0,0"]);
      let x = 0, y = 0;
      for (const m of moves) {
        if (m === "N") y++;
        else if (m === "S") y--;
        else if (m === "E") x++;
        else x--;
        seen.add(x + "," + y);
      }
      return seen.size;
    },
    argSets: [
      [["N", "E", "N", "E"]],
      [["N", "S", "E", "W"]],
      [[]],
      [["N", "N", "N"]],
      [["E", "E", "W", "W"]],
      [["S", "S", "S", "E"]],
      [["N", "E", "S", "W"]],
      [["E", "W", "N", "S"]],
    ],
  }),
);

// 2. Vending machine agent: return change as coin counts
tasks.push(
  c({
    category: "agentic",
    difficulty: 1,
    title: "Vending machine change",
    lang: js,
    funcName: "vendingMachine",
    signature: "vendingMachine(price: number, coins: number[]): number[] | null",
    prompt:
      "A vending machine agent is given the `price` of an item and a list of `coins` inserted by a customer (coin values in cents). If the total inserted is less than the price, return null. Otherwise return the change owed as an array [quarters, dimes, nickels, pennies] using coin values 25, 10, 5, 1 cents and as few coins as possible (greedy). Return null when the customer paid less than the price." +
      jsSuffix,
    ref: (price: number, coins: number[]) => {
      const total = coins.reduce((a, b) => a + b, 0);
      let change = total - price;
      if (change < 0) return null;
      const den = [25, 10, 5, 1];
      const counts: number[] = [];
      for (const d of den) {
        counts.push(Math.floor(change / d));
        change %= d;
      }
      return counts;
    },
    argSets: [
      [10, [25, 10]],
      [10, [5, 5, 5, 5]],
      [25, [25]],
      [30, [25, 10]],
      [5, [25]],
      [100, [25]],
      [50, [25, 25]],
      [15, [25, 5]],
    ],
  }),
);

// 3. Directory resolver: emulate `cd` navigation
tasks.push(
  c({
    category: "agentic",
    difficulty: 1,
    title: "Directory resolver",
    lang: js,
    funcName: "resolver",
    signature: "resolver(steps: string[]): string",
    prompt:
      "A shell agent navigates a filesystem. Starting at the root directory `/`, it applies a list of navigation `steps` in order. '..' goes up one level (if already at root, it stays at root), '.' does nothing, and any other string is a directory name that is entered. Write `resolver(steps)` returning the final absolute path as a string (e.g. '/a/b'). At the root return '/'. Steps are lowercase directory names and special tokens '..' and '.'." +
      jsSuffix,
    ref: (steps: string[]) => {
      const stack: string[] = [];
      for (const s of steps) {
        if (s === "..") {
          stack.pop();
        } else if (s === ".") {
          // no-op
        } else {
          stack.push(s);
        }
      }
      return stack.length ? "/" + stack.join("/") : "/";
    },
    argSets: [
      [["a", "b", "..", "c"]],
      [["a", "..", "b"]],
      [[".", ".."]],
      [["..", "..", "a"]],
      [["a", "."]],
      [[]],
      [["a", "b", "c"]],
      [["x", "..", "y", "..", "z"]],
    ],
  }),
);

// 4. Elevator agent: travel distance serving requests in order
tasks.push(
  c({
    category: "agentic",
    difficulty: 1,
    title: "Elevator commute distance",
    lang: js,
    funcName: "elevator",
    signature: "elevator(requests: number[]): number",
    prompt:
      "An elevator agent starts at floor 0 and services a list of floor `requests` one at a time, travelling directly between consecutive floors. Write `elevator(requests)` returning the total number of floors travelled to service all requests in the given order. Each request is a non-negative integer floor." +
      jsSuffix,
    ref: (requests: number[]) => {
      let cur = 0, total = 0;
      for (const r of requests) {
        total += Math.abs(r - cur);
        cur = r;
      }
      return total;
    },
    argSets: [
      [[3, 1, 5, 2]],
      [[]],
      [[0]],
      [[2]],
      [[5, 5, 5]],
      [[0, 9, 0, 9]],
      [[4, 1, 8, 1]],
      [[1, 1, 1]],
    ],
  }),
);

// 5. Stack agent: process push/pop commands
tasks.push(
  c({
    category: "agentic",
    difficulty: 1,
    title: "Stack operator",
    lang: js,
    funcName: "stackOps",
    signature: "stackOps(cmds: string[]): string[]",
    prompt:
      "A data-structure agent runs a stack. It processes a list of `cmds`, each either 'push <value>' or 'pop'. When a 'pop' is processed and the stack is non-empty, the popped value is recorded; if the stack is empty the pop is ignored. Write `stackOps(cmds)` returning the array of popped values in the order they were popped. Values are arbitrary strings without spaces." +
      jsSuffix,
    ref: (cmds: string[]) => {
      const stack: string[] = [];
      const out: string[] = [];
      for (const cmd of cmds) {
        const sp = cmd.indexOf(" ");
        if (sp === -1) {
          if (stack.length) out.push(stack.pop()!);
        } else {
          stack.push(cmd.slice(sp + 1));
        }
      }
      return out;
    },
    argSets: [
      [["push a", "push b", "pop", "pop"]],
      [["push x", "pop", "pop", "push y", "pop"]],
      [["pop", "pop"]],
      [["push 1", "push 2", "push 3", "pop"]],
      [["pop", "push a", "pop"]],
      [[]],
      [["push a", "pop", "push b", "pop", "push c", "pop"]],
      [["push v", "pop"]],
    ],
  }),
);

// 6. Secretary agent: stable sort tasks by priority
tasks.push(
  c({
    category: "agentic",
    difficulty: 1,
    title: "Secretary task ordering",
    lang: js,
    funcName: "secretary",
    signature: "secretary(tasks: number[][]): string[]",
    prompt:
      "A scheduling secretary receives a list of `tasks`, where each task is [priority, labelIndex] but here each task is [priority, label]. Write `secretary(tasks)` returning the array of labels ordered by ascending priority; when two tasks share a priority, keep their original (input) order (a stable sort). The label is a string, priority is a non-negative integer." +
      jsSuffix,
    ref: (tasks: number[][]) => {
      return tasks
        .map((t, i) => [t[0]!, t[1] as unknown as string, i] as const)
        .sort((a, b) => a[0] - b[0] || a[2] - b[2])
        .map((t) => t[1] as unknown as string);
    },
    argSets: [
      [[[2, "b"], [1, "a"], [3, "c"]]],
      [[[1, "x"], [1, "y"], [1, "z"]]],
      [[[3, "a"], [2, "b"], [3, "c"]]],
      [[[5, "hi"]]],
      [[]],
      [[[1, "a"], [0, "b"]]],
      [[[2, "q"], [1, "w"], [2, "e"], [1, "r"]]],
      [[[0, "z"], [0, "y"], [1, "x"]]],
    ],
  }),
);

// 7. Keyword agent: top-k words by frequency
tasks.push(
  c({
    category: "agentic",
    difficulty: 1,
    title: "Keyword ranking agent",
    lang: js,
    funcName: "topWords",
    signature: "topWords(text: string, k: number): string[]",
    prompt:
      "A content-analysis agent ranks keywords. Given `text` and an integer `k`, write `topWords(text, k)` returning the top `k` most frequent words (sequences of letters only, case-insensitive). Tally frequencies; sort by descending frequency, and break ties by ascending word. Return the top `k` words. If fewer than `k` distinct words exist, return all of them." +
      jsSuffix,
    ref: (text: string, k: number) => {
      const words = (text.toLowerCase().match(/[a-z]+/g) ?? []);
      const freq = new Map<string, number>();
      for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
      return [...freq.keys()]
        .sort((a, b) => freq.get(b)! - freq.get(a)! || (a < b ? -1 : a > b ? 1 : 0))
        .slice(0, k);
    },
    argSets: [
      ["the cat sat the cat", 2],
      ["a a b b c", 2],
      ["", 3],
      ["one", 1],
      ["b a c b a", 2],
      ["x y z", 3],
      ["aa aa bb bb cc", 1],
      ["Hello hello HELLO", 1],
    ],
  }),
);

// 8. Run-length decompressor
tasks.push(
  c({
    category: "agentic",
    difficulty: 1,
    title: "Run-length decompressor",
    lang: js,
    funcName: "decompress",
    signature: "decompress(s: string): string",
    prompt:
      "A logistics agent decodes a run-length encoded string. Each letter may be followed by a digit count indicating how many times it repeats; if a letter has no digit, it repeats once. Write `decompress(s)` returning the decoded string. Example: 'a3b2c4' -> 'aaabbcccc' and 'ab2c' -> 'abbc'. Counts are positive integers; input is valid." +
      jsSuffix,
    ref: (s: string) => {
      let out = "";
      let i = 0;
      while (i < s.length) {
        const ch = s[i];
        i++;
        let num = 0;
        while (i < s.length && s[i] >= "0" && s[i] <= "9") {
          num = num * 10 + (s.charCodeAt(i) - 48);
          i++;
        }
        if (num === 0) num = 1;
        out += ch.repeat(num);
      }
      return out;
    },
    argSets: [
      ["a3b2c4"],
      ["ab2c"],
      ["x5"],
      ["abc"],
      ["m12"],
      ["q"],
      ["a2b2c2"],
      ["z1y1"],
    ],
  }),
);

// ===========================================================================
// LEVEL 2 — state machines, greedy scheduling, simulation
// ===========================================================================

// 9. Pathfinding agent: shortest path (BFS) in a grid
tasks.push(
  c({
    category: "agentic",
    difficulty: 2,
    title: "Grid pathfinding agent",
    lang: js,
    funcName: "shortestSteps",
    signature: "shortestSteps(grid: number[][], start: number[], goal: number[]): number",
    prompt:
      "A delivery agent must find the shortest path across a grid. `grid` is an m x n matrix of 0 (open) and 1 (obstacle). `start` and `goal` are [row, col]. The agent moves up/down/left/right one cell at a time and cannot enter obstacles or leave the grid. Write `shortestSteps(grid, start, goal)` returning the minimum number of moves to reach the goal, or -1 if it is unreachable. (If already at the goal, return 0.)" +
      jsSuffix,
    ref: (grid: number[][], start: number[], goal: number[]) => {
      const m = grid.length, n = grid[0]!.length;
      const [sr, sc] = start, [gr, gc] = goal;
      if (grid[sr]![sc] === 1 || grid[gr]![gc] === 1) return -1;
      const dist: number[][] = Array.from({ length: m }, () => new Array(n).fill(-1));
      dist[sr]![sc] = 0;
      const q: number[][] = [[sr, sc]];
      const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      while (q.length) {
        const [r, c] = q.shift()!;
        if (r === gr && c === gc) return dist[r]![c]!;
        for (const [dr, dc] of dirs) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr]![nc] === 0 && dist[nr]![nc] === -1) {
            dist[nr]![nc] = dist[r]![c]! + 1;
            q.push([nr, nc]);
          }
        }
      }
      return -1;
    },
    argSets: [
      [[[0, 0, 0], [0, 1, 0], [0, 0, 0]], [0, 0], [2, 2]],
      [[[0, 0], [0, 0]], [0, 0], [1, 0]],
      [[[1, 0], [0, 0]], [0, 1], [1, 0]],
      [[[0]], [0, 0], [0, 0]],
      [[[0, 1], [1, 1]], [0, 0], [1, 1]],
      [[[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0]], [0, 0], [2, 3]],
      [[[0, 0], [0, 0], [0, 0]], [0, 0], [2, 1]],
      [[[0, 1], [1, 0]], [0, 0], [1, 1]],
    ],
  }),
);

// 10. Resource scheduler: max schedulable tasks by deadline
tasks.push(
  c({
    category: "agentic",
    difficulty: 2,
    title: "Deadline resource scheduler",
    lang: js,
    funcName: "schedule",
    signature: "schedule(tasks: number[][]): number",
    prompt:
      "A resource-scheduling agent must schedule the maximum number of tasks. Each task is [duration, deadline] (deadline exclusive; tasks are sequential and take integer time). The agent must pick a subset of tasks and an ordering so that each completes by its deadline. Write `schedule(tasks)` returning the maximum number of tasks that can all be scheduled. Algorithm: sort by deadline, process in order, and when the running total exceeds a deadline drop the longest-duration task so far." +
      jsSuffix,
    ref: (tasks: number[][]) => {
      const sorted = [...tasks].sort((a, b) => a[1]! - b[1]!);
      const heap: number[] = [];
      let cur = 0;
      for (const [d, dl] of sorted) {
        cur += d;
        heap.push(d);
        heap.sort((a, b) => b - a);
        if (cur > dl) {
          cur -= heap[0]!;
          heap.shift();
        }
      }
      return heap.length;
    },
    argSets: [
      [[[1, 2], [2, 1], [1, 3]]],
      [[[1, 2], [1, 2], [1, 2]]],
      [[[4, 4], [2, 4], [2, 4], [1, 4]]],
      [[[5, 5]]],
      [[[3, 2]]],
      [[]],
      [[[1, 10], [2, 10], [3, 10], [4, 10]]],
      [[[2, 3], [1, 3], [3, 3]]],
      [[[1, 1], [4, 1], [1, 4]]],
    ],
  }),
);

// 11. Turnstile simulator: event-driven state machine
tasks.push(
  c({
    category: "agentic",
    difficulty: 2,
    title: "Turnstile event simulator",
    lang: js,
    funcName: "turnstile",
    signature: "turnstile(events: string[]): [string, number]",
    prompt:
      "A metro agent simulates a turnstile. It begins in the LOCKED state. Each event is either 'coin' or 'pass'. A 'coin' unlocks the turnstile (if already unlocked it stays unlocked). A 'pass' while unlocked lets one person through (counts the pass) and locks the turnstile; a 'pass' while locked is ignored (and the turnstile stays locked). Write `turnstile(events)` applying the events in order and returning an array [finalState, passes] where finalState is 'locked' or 'unlocked' and passes is the total number of successful passes." +
      jsSuffix,
    ref: (events: string[]) => {
      let locked = true;
      let passes = 0;
      for (const e of events) {
        if (e === "coin") locked = false;
        else if (e === "pass") {
          if (!locked) {
            passes++;
            locked = true;
          }
        }
      }
      return [locked ? "locked" : "unlocked", passes];
    },
    argSets: [
      [["coin", "pass", "coin", "pass"]],
      [["pass", "coin", "pass"]],
      [["coin", "coin", "pass"]],
      [["coin", "pass"]],
      [[]],
      [["coin"]],
      [["pass", "pass", "coin", "pass", "pass"]],
      [["coin", "pass", "coin"]],
    ],
  }),
);

// 12. Token bucket rate limiter
tasks.push(
  c({
    category: "agentic",
    difficulty: 2,
    title: "Token bucket rate limiter",
    lang: js,
    funcName: "tokenBucket",
    signature: "tokenBucket(events: number[][], capacity: number, refillPerSec: number): boolean[]",
    prompt:
      "An API gateway uses a token bucket to rate-limit requests. The bucket starts full with `capacity` tokens and refills continuously at `refillPerSec` tokens per second, capped at `capacity`. `events` is a time-ordered list of [timeSeconds, cost]; process events in order: first refill using the elapsed time since the previous event (the first event's elapsed time starts from 0), then if at least `cost` tokens are available deduct them (request allowed, record true) else the request is denied (record false). Fractional tokens are allowed. Write `tokenBucket(events, capacity, refillPerSec)` returning an array of booleans, one per event." +
      jsSuffix,
    ref: (events: number[][], capacity: number, refillPerSec: number) => {
      let tokens = capacity;
      let last = 0;
      const out: boolean[] = [];
      for (const [t, cost] of events) {
        tokens = Math.min(capacity, tokens + (t - last) * refillPerSec);
        last = t;
        if (tokens >= cost) {
          tokens -= cost;
          out.push(true);
        } else {
          out.push(false);
        }
      }
      return out;
    },
    argSets: [
      [[[0, 1], [1, 1]], 10, 1],
      [[[0, 10]], 10, 1],
      [[[0, 10], [0, 1]], 10, 1],
      [[[0, 5], [1, 5]], 5, 10],
      [[[0, 4], [0, 4]], 5, 1],
      [[[0, 1], [100, 1]], 1, 0],
      [[[0, 2], [5, 2]], 3, 1],
      [[[1, 3]], 2, 1],
    ],
  }),
);

// 13. Balanced brackets validator
tasks.push(
  c({
    category: "agentic",
    difficulty: 2,
    title: "Bracket validator",
    lang: js,
    funcName: "balanced",
    signature: "balanced(s: string): boolean",
    prompt:
      "A syntax-checking agent validates a string containing only the characters '(', ')', '{', '}', '[', ']'. Write `balanced(s)` returning true if the brackets are correctly nested and every opener has a matching closer, else false. Example: '([{}])' -> true, '([)]' -> false." +
      jsSuffix,
    ref: (s: string) => {
      const stack: string[] = [];
      const map: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
      for (const ch of s) {
        if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);
        else if (stack.length && stack[stack.length - 1] === map[ch]) stack.pop();
        else return false;
      }
      return stack.length === 0;
    },
    argSets: [
      ["()"],
      ["()[]{}"],
      ["(]"],
      ["([)]"],
      ["{[]}"],
      [""],
      ["([{}])"],
      ["(("],
      ["{[()()]}"],
      ["}{"],
    ],
  }),
);

// 14. Stateful tokenizer: split into letter and digit runs
tasks.push(
  c({
    category: "agentic",
    difficulty: 2,
    title: "Token scanner",
    lang: js,
    funcName: "tokenize",
    signature: "tokenize(s: string): string[]",
    prompt:
      "A lexical-analysis agent tokenizes a string into maximal runs of letters (a-z, case-insensitive, normalized to lowercase) and maximal runs of digits (0-9). Any other character (punctuation, whitespace) is a token separator and is discarded. Write `tokenize(s)` returning the array of tokens in left-to-right order. Example: 'abc123def' -> ['abc','123','def'] and 'a!b@c' -> ['a','b','c']." +
      jsSuffix,
    ref: (s: string) => (s.match(/[a-z]+|[0-9]+/gi) ?? []).map((x) => x.toLowerCase()),
    argSets: [
      ["abc123def"],
      ["12ab34"],
      ["a!b@c"],
      [""],
      ["hello world"],
      ["A1B2C3"],
      ["999"],
      ["x_y-z"],
      ["zz99zz"],
    ],
  }),
);

// 15. Majority element (voting agent)
tasks.push(
  c({
    category: "agentic",
    difficulty: 2,
    title: "Election scrutineer",
    lang: js,
    funcName: "majorityElement",
    signature: "majorityElement(nums: number[]): number",
    prompt:
      "An election-counting agent must find the candidate who received strictly more than half of the votes. Given `nums` where each value is a vote for candidate `nums[i]`, a majority candidate is guaranteed to exist. Write `majorityElement(nums)` returning the majority value. Use Boyer-Moore voting for O(n) time and O(1) space." +
      jsSuffix,
    ref: (nums: number[]) => {
      let cand = nums[0]!, count = 0;
      for (const n of nums) {
        if (count === 0) { cand = n; count = 1; }
        else if (n === cand) count++;
        else count--;
      }
      return cand;
    },
    argSets: [
      [[3, 2, 3]],
      [[2, 2, 1, 1, 1, 2, 2]],
      [[6, 6, 6]],
      [[1]],
      [[1, 1, 9, 9, 1]],
      [[-1, -1, 2]],
      [[0, 0, 0, 1, 1, 0]],
      [[5, 4, 5, 5, 3, 5]],
    ],
  }),
);

// 16. LRU cache operator
tasks.push(
  c({
    category: "agentic",
    difficulty: 2,
    title: "LRU cache operator",
    lang: js,
    funcName: "lruAccess",
    signature: "lruAccess(capacity: number, accesses: number[]): number",
    prompt:
      "A cache agent manages an LRU (least-recently-used) cache of `capacity` slots. It processes a list of key `accesses` (integers). A 'hit' occurs when the key is already in the cache (it is moved to most-recent); a 'miss' occurs otherwise. On a miss the key is inserted, and if the cache is full the least-recently-used key is evicted. Write `lruAccess(capacity, accesses)` returning the total number of cache misses. If capacity is 0, every access is a miss." +
      jsSuffix,
    ref: (capacity: number, accesses: number[]) => {
      const order: number[] = [];
      let misses = 0;
      for (const key of accesses) {
        const idx = order.indexOf(key);
        if (idx !== -1) {
          order.splice(idx, 1);
          order.push(key);
        } else {
          misses++;
          if (order.length === capacity) order.shift();
          if (capacity > 0) order.push(key);
        }
      }
      return misses;
    },
    argSets: [
      [2, [1, 2, 1, 3, 1]],
      [1, [1, 2, 1, 3]],
      [2, [1, 1, 1]],
      [3, [1, 2, 3, 4, 1, 2, 3]],
      [0, [1, 2]],
      [2, []],
      [2, [1, 2, 3, 2, 1]],
      [4, [7, 7, 7, 7, 7]],
    ],
  }),
);

// 17. Disk head scheduler (shortest seek time first)
tasks.push(
  c({
    category: "agentic",
    difficulty: 2,
    title: "Disk head scheduler",
    lang: js,
    funcName: "diskScheduler",
    signature: "diskScheduler(head: number, requests: number[]): number",
    prompt:
      "A storage controller schedules disk requests with the Shortest Seek Time First policy. It starts with the head at track `head` and services the pending `requests` (track numbers). At each step it moves to the nearest pending track; if two tracks are equidistant it picks the smaller track number. Write `diskScheduler(head, requests)` returning the total distance (sum of absolute moves) travelled. All values are non-negative integers." +
      jsSuffix,
    ref: (head: number, requests: number[]) => {
      const pending = [...requests];
      let cur = head, total = 0;
      while (pending.length) {
        let best = 0;
        for (let i = 1; i < pending.length; i++) {
          const dBest = Math.abs(pending[best]! - cur);
          const dNew = Math.abs(pending[i]! - cur);
          if (dNew < dBest || (dNew === dBest && pending[i]! < pending[best]!)) best = i;
        }
        total += Math.abs(pending[best]! - cur);
        cur = pending[best]!;
        pending.splice(best, 1);
      }
      return total;
    },
    argSets: [
      [0, [1, 2, 3]],
      [5, [1, 2, 3]],
      [0, [10, 1, 2]],
      [100, [50, 150, 80]],
      [0, []],
      [0, [0, 0, 0]],
      [10, [9, 11, 12]],
      [0, [5, 5, 5]],
    ],
  }),
);

// 18. Build order (topological sort with cycle detection)
tasks.push(
  c({
    category: "agentic",
    difficulty: 2,
    title: "Build order planner",
    lang: js,
    funcName: "buildOrder",
    signature: "buildOrder(projects: string[], deps: string[][]): string[] | number",
    prompt:
      "A build agent must order project builds. `projects` is an array of unique project names. `deps` is a list of pairs [a, b] meaning project `a` depends on project `b` (b must be built before a). Write `buildOrder(projects, deps)` returning a valid build order (array of all project names) such that every dependency is built first. If it is impossible (a dependency cycle exists) return -1. When several projects are ready at once, build them in ascending alphabetical order so the result is deterministic." +
      jsSuffix,
    ref: (projects: string[], deps: string[][]) => {
      const indeg = new Map<string, number>();
      const adj = new Map<string, string[]>();
      for (const p of projects) { indeg.set(p, 0); adj.set(p, []); }
      for (const [a, b] of deps) {
        adj.get(b)!.push(a);
        indeg.set(a, indeg.get(a)! + 1);
      }
      const ready = projects.filter((p) => indeg.get(p) === 0).sort();
      const order: string[] = [];
      while (ready.length) {
        const cur = ready.shift()!;
        order.push(cur);
        for (const nx of adj.get(cur)!) {
          indeg.set(nx, indeg.get(nx)! - 1);
          if (indeg.get(nx) === 0) {
            ready.push(nx);
            ready.sort();
          }
        }
      }
      return order.length === projects.length ? order : -1;
    },
    argSets: [
      [["A", "B", "C"], [["B", "A"]]],
      [["A", "B", "C"], [["A", "B"]]],
      [["A", "B"], [["A", "B"], ["B", "A"]]],
      [["A", "B", "C"], []],
      [["X", "Y"], [["Y", "X"]]],
      [["P", "Q", "R"], [["P", "R"], ["Q", "R"]]],
      [["A", "B", "C"], [["B", "A"], ["C", "B"]]],
      [["M", "N", "O"], [["O", "N"], ["O", "M"]]],
      [["Z"], [["Z", "Z"]]],
    ],
  }),
);

// ===========================================================================
// LEVEL 3 — minimax, DP over decisions, parsers, multi-pass
// ===========================================================================

// 19. Regex-free nested list parser (python)
tasks.push(
  c({
    category: "agentic",
    difficulty: 3,
    title: "Nested list parser",
    lang: py,
    funcName: "parse_nested",
    signature: "parse_nested(s: str) -> list",
    prompt:
      "A data-ingestion agent must parse a nested-list string into actual nested Python lists. The string `s` is valid grammar: `[]` for an empty list, or `[` followed by comma-separated items where an item is either an integer (possibly negative) or another nested list, followed by `]`. Whitespace may appear anywhere between tokens. Write `parse_nested(s)` returning the nested list structure. Example: parse_nested('[1,[2,[3]],4]') -> [1,[2,[3]],4]." +
      pySuffix,
    ref: (s: string) => {
      let i = 0;
      const parse = (): number[] | number[] | any => {
        while (i < s.length && s[i] === " ") i++;
        const ch = s[i];
        if (ch === "[") {
          i++;
          const arr: any[] = [];
          while (true) {
            while (i < s.length && (s[i] === " " || s[i] === ",")) i++;
            if (s[i] === "]") { i++; return arr; }
            arr.push(parse());
            while (i < s.length && s[i] === " ") i++;
            if (s[i] === ",") i++;
          }
        } else {
          let sign = 1;
          if (s[i] === "-") { sign = -1; i++; }
          let num = 0;
          while (i < s.length && s[i] >= "0" && s[i] <= "9") {
            num = num * 10 + (s.charCodeAt(i) - 48);
            i++;
          }
          return sign * num;
        }
      };
      return parse();
    },
    argSets: [
      ["[1,[2,[3]],4]"],
      ["[]"],
      ["[[]]"],
      ["[1,2,3]"],
      ["[[1,2],[3,4]]"],
      ["[-1]"],
      ["[1,[],2]"],
      ["[[[]]]"],
      ["[1, [2, 3], 4]"],
    ],
  }),
);

// 20. Tic-tac-toe minimax result
tasks.push(
  c({
    category: "agentic",
    difficulty: 3,
    title: "Tic-tac-toe game solver",
    lang: js,
    funcName: "ticTacToeResult",
    signature: "ticTacToeResult(board: string): number",
    prompt:
      "A game agent computes the game-theoretic value of a tic-tac-toe position using minimax. `board` is a string of 9 characters ('0'..'8' read left-to-right, top-to-bottom), each 'X', 'O', or '.' (empty). It is X's turn to move, and no one has won yet. Write `ticTacToeResult(board)` returning 1 if X can force a win with perfect play, 0 if the best X can do is a draw, and -1 if O can force a win. X maximizes, O minimizes. Rows/cols/diagonals of three identical marks win." +
      jsSuffix,
    ref: (board: string) => {
      const b = board.split("");
      const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
      const win = (p: string) => lines.some(([a, x, d]) => b[a] === p && b[x] === p && b[d] === p);
      const full = () => b.every((x) => x !== ".");
      const mm = (turn: string): number => {
        if (win("X")) return 1;
        if (win("O")) return -1;
        if (full()) return 0;
        if (turn === "X") {
          let best = -Infinity;
          for (let i = 0; i < 9; i++) if (b[i] === ".") { b[i] = "X"; best = Math.max(best, mm("O")); b[i] = "."; }
          return best;
        } else {
          let best = Infinity;
          for (let i = 0; i < 9; i++) if (b[i] === ".") { b[i] = "O"; best = Math.min(best, mm("X")); b[i] = "."; }
          return best;
        }
      };
      return mm("X");
    },
    argSets: [
      ["........."],
      ["XO......."],
      ["XOXO....."],
      ["XX.OO...."],
      ["XOXOXOXO."],
      ["O..XX...O"],
      ["X.OXO...."],
      ["XO.XO...."],
    ],
  }),
);

// 21. Minimum spanning cost to connect points (python, Prim's)
tasks.push(
  c({
    category: "agentic",
    difficulty: 3,
    title: "Campus network cabling",
    lang: py,
    funcName: "min_span_cost",
    signature: "min_span_cost(points: list) -> int",
    prompt:
      "A network planner must cable together all campus buildings with minimal total wiring. Each building is a point [x, y]; the cost to connect two buildings is the Manhattan distance |x1-x2| + |y1-y2|. Write `min_span_cost(points)` returning the minimum total cost to connect all buildings so every pair is connected (a minimum spanning tree). Use Prim's algorithm, O(n^2)." +
      pySuffix,
    ref: (points: number[][]) => {
      const n = points.length;
      if (n <= 1) return 0;
      const dist = new Array(n).fill(Infinity);
      const inTree = new Array(n).fill(false);
      dist[0] = 0;
      let total = 0;
      for (let iter = 0; iter < n; iter++) {
        let u = -1;
        for (let i = 0; i < n; i++) {
          if (!inTree[i] && (u === -1 || dist[i]! < dist[u]!)) u = i;
        }
        inTree[u] = true;
        total += dist[u]!;
        for (let v = 0; v < n; v++) {
          if (!inTree[v]) {
            const cost = Math.abs(points[u]![0]! - points[v]![0]!) + Math.abs(points[u]![1]! - points[v]![1]!);
            if (cost < dist[v]!) dist[v] = cost;
          }
        }
      }
      return total;
    },
    argSets: [
      [[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]],
      [[[0, 0]]],
      [[[3, 12], [-2, 5], [-4, 1]]],
      [[[0, 0], [0, 0]]],
      [[[1, 1], [3, 3], [3, 1]]],
      [[[-2, -2], [-1, -1], [0, 0], [1, 1]]],
      [[[0, 0], [10, 10]]],
      [[[1, 5], [4, 6], [2, 1], [9, 4]]],
    ],
  }),
);

// 22. Minimum refueling stops
tasks.push(
  c({
    category: "agentic",
    difficulty: 3,
    title: "Min refuel stops",
    lang: js,
    funcName: "minRefuelStops",
    signature: "minRefuelStops(target: number, startFuel: number, stations: number[][]): number",
    prompt:
      "A car agent must reach a `target` distance with the fewest refueling stops. It starts with `startFuel` units (1 unit of fuel = 1 unit of distance). `stations` is a list of [position, fuel] sorted by position. The car may stop at any station it can reach and take all of that station's fuel. Write `minRefuelStops(target, startFuel, stations)` returning the minimum number of stops needed to reach or pass the target, or -1 if unreachable. When the car can't reach the target, greedily take fuel from the farthest-reachable highest-fuel station so far (max-heap)." +
      jsSuffix,
    ref: (target: number, startFuel: number, stations: number[][]) => {
      let cur = startFuel;
      let stops = 0;
      let i = 0;
      const heap: number[] = [];
      while (cur < target) {
        while (i < stations.length && stations[i]![0]! <= cur) {
          heap.push(stations[i]![1]!);
          i++;
        }
        if (!heap.length) return -1;
        heap.sort((a, b) => b - a);
        cur += heap.shift()!;
        stops++;
      }
      return stops;
    },
    argSets: [
      [1, 1, []],
      [100, 1, [[10, 100]]],
      [100, 10, [[10, 60], [20, 30], [30, 30], [60, 40]]],
      [100, 50, [[25, 30]]],
      [100, 100, []],
      [10, 1, [[1, 9], [9, 1]]],
      [70, 10, [[10, 50], [30, 20], [40, 5], [60, 15]]],
      [50, 5, [[5, 10], [15, 20], [35, 20], [45, 5]]],
    ],
  }),
);

// 23. Chemical formula parser (python)
tasks.push(
  c({
    category: "agentic",
    difficulty: 3,
    title: "Chemical formula counter",
    lang: py,
    funcName: "count_atoms",
    signature: "count_atoms(formula: str) -> dict",
    prompt:
      "A chemistry agent counts atoms in a chemical formula. `formula` is a valid string where an element is an uppercase letter followed by zero or more lowercase letters (e.g. 'H', 'O', 'Mg'), an element or parenthesized group may be followed by a positive integer count, and parentheses may nest. Write `count_atoms(formula)` returning a dict mapping each element (string) to its total count, with keys sorted alphabetically. Example: count_atoms('Mg(OH)2') -> {'H': 2, 'Mg': 1, 'O': 2}." +
      pySuffix,
    ref: (formula: string) => {
      let i = 0;
      const n = formula.length;
      const parse = (): Record<string, number> => {
        const out: Record<string, number> = {};
        while (i < n) {
          const c = formula[i];
          if (c === "(") {
            i++;
            const inner = parse();
            let num = 0;
            while (i < n && formula[i] >= "0" && formula[i] <= "9") { num = num * 10 + (formula.charCodeAt(i) - 48); i++; }
            if (num === 0) num = 1;
            for (const k of Object.keys(inner)) out[k] = (out[k] ?? 0) + inner[k]! * num;
          } else if (c === ")") {
            i++;
            return out;
          } else {
            let el = c;
            i++;
            while (i < n && formula[i] >= "a" && formula[i] <= "z") { el += formula[i]; i++; }
            let num = 0;
            while (i < n && formula[i] >= "0" && formula[i] <= "9") { num = num * 10 + (formula.charCodeAt(i) - 48); i++; }
            if (num === 0) num = 1;
            out[el] = (out[el] ?? 0) + num;
          }
        }
        return out;
      };
      const res = parse();
      const sorted: Record<string, number> = {};
      for (const k of Object.keys(res).sort()) sorted[k] = res[k]!;
      return sorted;
    },
    argSets: [
      ["H2O"],
      ["Mg(OH)2"],
      ["K4(ON(SO3)2)2"],
      ["H2"],
      ["C6H12O6"],
      ["(H2O)2"],
      ["NaCl"],
      ["((N2)2O)3"],
    ],
  }),
);

// 24. Text justification (python)
tasks.push(
  c({
    category: "agentic",
    difficulty: 3,
    title: "Paragraph formatter",
    lang: py,
    funcName: "justify",
    signature: "justify(words: list, max_width: int) -> list",
    prompt:
      "A printing agent formats a paragraph with full justification. Given `words` (a list of strings, no spaces) and `max_width`, return a list of lines each exactly `max_width` characters long. Greedily pack as many words as fit; a single-word (or last) line is left-justified (left-aligned, padded with trailing spaces), while other lines evenly distribute extra spaces between words, with any remaining extra spaces going to the leftmost gaps. Every line must have exactly `max_width` characters." +
      pySuffix,
    ref: (words: string[], maxWidth: number) => {
      const lines: string[][] = [];
      let cur: string[] = [];
      let len = 0;
      for (const w of words) {
        if (cur.length && len + 1 + w.length > maxWidth) {
          lines.push(cur);
          cur = [];
          len = 0;
        }
        if (cur.length) len += 1 + w.length;
        else len += w.length;
        cur.push(w);
      }
      if (cur.length) lines.push(cur);
      const out: string[] = [];
      for (let l = 0; l < lines.length; l++) {
        const line = lines[l]!;
        const isLast = l === lines.length - 1;
        const totalChars = line.reduce((a, w) => a + w.length, 0);
        const spaces = maxWidth - totalChars;
        if (line.length === 1 || isLast) {
          let s = line.join(" ");
          s += " ".repeat(maxWidth - s.length);
          out.push(s);
        } else {
          const gaps = line.length - 1;
          const each = Math.floor(spaces / gaps);
          const extra = spaces % gaps;
          let s = "";
          for (let j = 0; j < line.length; j++) {
            s += line[j]!;
            if (j < gaps) s += " ".repeat(each + (j < extra ? 1 : 0));
          }
          out.push(s);
        }
      }
      return out;
    },
    argSets: [
      [["This", "is", "an", "example", "of", "text", "justification."], 16],
      [["What", "must", "be", "acknowledgment", "shall", "be"], 16],
      [["a"], 1],
      [["hello", "world"], 10],
      [["ab", "cd", "ef"], 6],
      [["Science", "is", "what", "we", "understand", "well", "enough", "to", "explain", "to", "a", "computer.", "Art", "is", "everything", "else", "we", "do"], 20],
      [["Listen"], 6],
      [["one", "two", "three", "four"], 10],
    ],
  }),
);

// 25. Minimum window substring
tasks.push(
  c({
    category: "agentic",
    difficulty: 3,
    title: "Minimum window finder",
    lang: js,
    funcName: "minWindow",
    signature: "minWindow(s: string, t: string): string",
    prompt:
      "An agent must find the smallest contiguous substring of `s` that contains every character of `t` (including multiplicity). Write `minWindow(s, t)` returning the minimum-length such substring, or '' if no window exists. If multiple windows tie in length, return the one that appears first. Use a sliding window with character counts." +
      jsSuffix,
    ref: (s: string, t: string) => {
      const need = new Map<string, number>();
      for (const ch of t) need.set(ch, (need.get(ch) ?? 0) + 1);
      let have = 0;
      const needCount = need.size;
      let left = 0, bestL = 0, bestR = Infinity;
      const win = new Map<string, number>();
      for (let right = 0; right < s.length; right++) {
        const c = s[right];
        win.set(c, (win.get(c) ?? 0) + 1);
        if (need.has(c) && win.get(c) === need.get(c)) have++;
        while (have === needCount) {
          if (right - left < bestR - bestL) { bestR = right; bestL = left; }
          const lc = s[left];
          win.set(lc, win.get(lc)! - 1);
          if (need.has(lc) && win.get(lc)! < need.get(lc)!) have--;
          left++;
        }
      }
      return bestR === Infinity ? "" : s.slice(bestL, bestR + 1);
    },
    argSets: [
      ["ADOBECODEBANC", "ABC"],
      ["a", "a"],
      ["a", "aa"],
      ["aa", "aa"],
      ["ab", "b"],
      ["abca", "abc"],
      ["ba", "ab"],
      ["aabbcc", "abc"],
      ["zzz", "z"],
    ],
  }),
);

// 26. Word ladder (BFS)
tasks.push(
  c({
    category: "agentic",
    difficulty: 3,
    title: "Word ladder agent",
    lang: js,
    funcName: "wordLadder",
    signature: "wordLadder(beginWord: string, endWord: string, wordList: string[]): number",
    prompt:
      "A translation agent transforms one word into another by changing a single letter at a time, where each intermediate word must be in `wordList`. Write `wordLadder(beginWord, endWord, wordList)` returning the length of the shortest transformation chain counting the beginWord as step 1 (so directly changing to endWord from beginWord is length 2). Return 0 if no such chain exists. All words have the same length and are lowercase. If beginWord equals endWord return 1." +
      jsSuffix,
    ref: (beginWord: string, endWord: string, wordList: string[]) => {
      if (beginWord === endWord) return 1;
      const words = new Set(wordList);
      if (!words.has(endWord)) return 0;
      const queue: string[] = [beginWord];
      const dist = new Map<string, number>();
      dist.set(beginWord, 1);
      while (queue.length) {
        const cur = queue.shift()!;
        const d = dist.get(cur)!;
        for (let i = 0; i < cur.length; i++) {
          for (let c = 97; c <= 122; c++) {
            const ch = String.fromCharCode(c);
            if (ch === cur[i]) continue;
            const next = cur.slice(0, i) + ch + cur.slice(i + 1);
            if (next === endWord) return d + 1;
            if (words.has(next) && !dist.has(next)) {
              dist.set(next, d + 1);
              queue.push(next);
            }
          }
        }
      }
      return 0;
    },
    argSets: [
      ["hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]],
      ["hit", "cog", ["hot", "dot", "dog", "lot", "log"]],
      ["a", "c", ["b", "c"]],
      ["red", "tax", ["ted", "tex", "red", "tax", "tad", "rex"]],
      ["hot", "dog", ["hot", "dog", "dot"]],
      ["x", "x", ["x"]],
      ["a", "e", ["a", "e"]],
      ["sheep", "sheep", ["sheep", "sheer"]],
    ],
  }),
);

// 27. Cheapest flight with k stops
tasks.push(
  c({
    category: "agentic",
    difficulty: 3,
    title: "Cheapest flight within k stops",
    lang: js,
    funcName: "findCheapestPrice",
    signature: "findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number",
    prompt:
      "A booking agent finds the cheapest flight itinerary. There are `n` cities (0..n-1). `flights` is a list of [from, to, price] directed flights. Travel from `src` to `dst` using at most `k` stops (intermediate cities, so at most k+1 flights). Write `findCheapestPrice(n, flights, src, dst, k)` returning the cheapest price, or -1 if no itinerary with at most k stops exists. Use Bellman-Ford style relaxation over k+1 rounds." +
      jsSuffix,
    ref: (n: number, flights: number[][], src: number, dst: number, k: number) => {
      let dist = new Array(n).fill(Infinity);
      dist[src] = 0;
      for (let i = 0; i <= k; i++) {
        const next = [...dist];
        for (const [f, t, p] of flights) {
          if (dist[f]! + p < next[t]!) next[t] = dist[f]! + p;
        }
        dist = next;
      }
      return dist[dst] === Infinity ? -1 : dist[dst];
    },
    argSets: [
      [3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1],
      [3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0],
      [4, [[0, 1, 100], [1, 2, 100], [2, 3, 100], [0, 3, 300]], 0, 3, 1],
      [4, [[0, 1, 100], [1, 2, 100], [2, 3, 100], [1, 3, 200]], 0, 3, 1],
      [5, [[0, 1, 5], [1, 2, 5], [0, 2, 100], [2, 3, 5], [3, 4, 5]], 0, 4, 3],
      [3, [[0, 1, 1], [1, 2, 1]], 0, 2, 0],
      [2, [[0, 1, 1]], 0, 1, 5],
      [3, [[0, 2, 1], [2, 0, 1], [2, 1, 1]], 0, 1, 1],
    ],
  }),
);

// 28. Jump game II (min jumps)
tasks.push(
  c({
    category: "agentic",
    difficulty: 3,
    title: "Minimum jumps agent",
    lang: js,
    funcName: "jumpGameII",
    signature: "jumpGameII(nums: number[]): number",
    prompt:
      "A parkour agent at position 0 must reach the last index. At index i, `nums[i]` is the maximum number of steps it can jump forward (any integer 0..nums[i]). The last index is always reachable. Write `jumpGameII(nums)` returning the minimum number of jumps to reach the last index. If already at the last index (single element), return 0. Use a greedy BFS over reachable ranges." +
      jsSuffix,
    ref: (nums: number[]) => {
      if (nums.length <= 1) return 0;
      let jumps = 0, curEnd = 0, farthest = 0;
      for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]!);
        if (i === curEnd) {
          jumps++;
          curEnd = farthest;
        }
      }
      return jumps;
    },
    argSets: [
      [[2, 3, 1, 1, 4]],
      [[2, 3, 0, 1, 4]],
      [[1, 2, 3]],
      [[0]],
      [[1]],
      [[1, 1, 1, 1]],
      [[4, 1, 1, 1, 1]],
      [[1, 2, 1, 1, 1]],
      [[2, 1, 1, 1, 1]],
    ],
  }),
);

// ===========================================================================
// FREEFORM agentic scenario planning tasks
// ===========================================================================

// L1
tasks.push(
  p({
    category: "agentic",
    difficulty: 1,
    title: "Merge latest fix into feature branch",
    prompt:
      "You are a coding agent. Your release branch `main` just received a critical bugfix. There is a long-running feature branch `feat/checkout` that must now include that fix, but should not be merged into `main` yet. Give the exact ordered sequence of git commands to bring the fix into the feature branch and switch back to that branch so work can continue on it.",
    requiredKeywords: ["git checkout feat/checkout", "merge main"],
    reference:
      "git checkout feat/checkout\ngit merge main\n# now edit and commit on feat/checkout",
    graderNote: "Must switch to the feature branch and merge main into it (not vice versa).",
  }),
);

tasks.push(
  p({
    category: "agentic",
    difficulty: 1,
    title: "Deploy service to staging",
    prompt:
      "You are an ops agent about to release a web service version to the staging environment. Describe the ordered set of steps/commands you run: run the test suite, build the artifact, deploy it to staging, then verify the deployed instance is healthy by checking its health endpoint. Be specific about the commands and their order.",
    requiredKeywords: ["test", "build", "deploy", "health"],
    reference:
      "run tests, build the artifact, deploy to staging, then curl the health endpoint to verify",
    graderNote: "A correct concise answer names test, build, deploy, and a health check in order.",
  }),
);

// L2
tasks.push(
  p({
    category: "agentic",
    difficulty: 2,
    title: "Diagnose failing CI after a merge",
    prompt:
      "A teammate merged branch `feature-x` into `main`, and now the CI pipeline fails on `main` but passed on both branches before the merge. You suspect a merge conflict that was resolved incorrectly silently. Describe your ordered diagnosis and fix steps, naming the git commands you would run to reproduce, inspect the merge, bisect the problematic change, and confirm the fix with the test suite.",
    requiredKeywords: ["git checkout", "merge", "git bisect", "test"],
    reference:
      "checkout main and pull, reproduce the failing test, replay/merge feature-x, use git bisect to locate the bad change, fix, then run tests",
    graderNote: "Correct answer includes: checkout main, inspecting the merge, git bisect, and running tests.",
  }),
);

tasks.push(
  p({
    category: "agentic",
    difficulty: 2,
    title: "Zero-downtime service migration",
    prompt:
      "You must migrate a running service from an old cluster to a new one with zero user-visible downtime. Describe the ordered plan: start new instances, verify their health checks pass, drain connections from the old instances, shift traffic at the load balancer, and confirm you have a rollback plan in case the new instances fail.",
    requiredKeywords: ["health check", "drain", "load balancer", "rollback"],
    reference:
      "start new instances, verify health checks, drain old instances, switch the load balancer to the new pool, keep a rollback plan",
    graderNote: "Correct answer names health checks, draining old nodes, load balancer cutover, and rollback.",
  }),
);

tasks.push(
  p({
    category: "agentic",
    difficulty: 2,
    title: "Debug a memory leak in a daemon",
    prompt:
      "A long-running background daemon's resident memory grows steadily over days until it is killed by the OS. Describe your ordered debugging approach: reproduce the leak in a controlled way, capture heap snapshots at two points in time, compare the snapshots to find what accumulates, attribute the growth to a code path, then confirm the fix. Name the kinds of tools/techniques you would use.",
    requiredKeywords: ["reproduce", "heap", "snapshot", "profile"],
    reference:
      "reproduce the leak, take heap snapshots at intervals, diff snapshots to find the growth, profile attributions, then fix and confirm",
    graderNote: "Correct answer includes reproduce, heap snapshot(s), diffing them, and profiling.",
  }),
);

tasks.push(
  p({
    category: "agentic",
    difficulty: 2,
    title: "Onboard a teammate to local development",
    prompt:
      "A new engineer joins your team and must get the repository running locally on a fresh machine. List the ordered set of steps/commands you would tell them: get the repo, install dependencies, set up or check for required environment configuration, build if needed, and verify things work by running the test suite and starting the app. Be specific and ordered.",
    requiredKeywords: ["clone", "install", "environment", "test"],
    reference:
      "clone the repo, install dependencies, set up environment config, run tests, then start the app",
    graderNote: "Correct answer names cloning, installing deps, environment setup, and running tests/app.",
  }),
);

tasks.push(
  p({
    category: "agentic",
    difficulty: 2,
    title: "Canary rollout of a service",
    prompt:
      "You are rolling out v2 of an internal API to production and want to de-risk it. Describe the ordered plan for a staged canary release: deploy the new version to a small percentage of traffic, monitor error rates and latency, gradually increase the percentage as it stays healthy, and define the automatic rollback trigger and manual rollback procedure if metrics degrade.",
    requiredKeywords: ["canary", "gradual", "monitor", "rollback"],
    reference:
      "deploy a canary to a small traffic share, monitor error rate and latency, gradually increase the share, and roll back if metrics degrade",
    graderNote: "Correct answer includes canary, gradual traffic increase, monitoring, and rollback.",
  }),
);

// L3
tasks.push(
  p({
    category: "agentic",
    difficulty: 3,
    title: "Trace a slow request across services",
    prompt:
      "A user request that normally takes 50ms now takes 5 seconds. The request chains through three backend microservices. Describe your ordered cross-service investigation: reproduce the slow request, enable or inspect distributed tracing, examine logs and metrics for each hop, identify the service where latency spikes, find the root cause (e.g. lock contention, a slow query, or degraded dependency), and describe how to confirm the fix.",
    requiredKeywords: ["trace", "logs", "metrics", "root cause"],
    reference:
      "reproduce, follow the distributed trace across hops, inspect each service's logs and metrics, and pin the root cause at the spiking hop",
    graderNote: "Correct answer names tracing, per-hop logs/metrics, and isolating a root cause.",
  }),
);

tasks.push(
  p({
    category: "agentic",
    difficulty: 3,
    title: "Downtime-free database schema migration",
    prompt:
      "You must add columns and restructure a core table in a large live database without downtime or data loss. Describe the ordered migration plan: create the new schema in parallel, backfill data into the new columns, switch the application to dual-write/read from both old and new, then cut over reads, and detail how you would verify and roll back.",
    requiredKeywords: ["backfill", "dual-write", "cutover", "rollback"],
    reference:
      "create new schema, backfill old data, dual-write to both during transition, cut over reads, then drop old schema with a rollback plan",
    graderNote: "Correct answer includes backfill, dual-write, cutover, and rollback.",
  }),
);

tasks.push(
  p({
    category: "agentic",
    difficulty: 3,
    title: "Automate an on-call runbook response",
    prompt:
      "Your team runs a manual on-call runbook: when a specific alert fires, the on-call engineer must ssh in, read logs, restart a service, and post to the status page. Automate this. Describe the ordered pieces you would build: define precise alert triggers, write an automation script that performs detection and remediation, wire it to alerting and a status page, add escalation if remediation fails, and cover testing the runbook safely.",
    requiredKeywords: ["runbook", "alert", "escalation", "automation"],
    reference:
      "define alert triggers, encode the runbook as an automation script, wire it to alerting/status, add escalation on failure, and test it",
    graderNote: "Correct answer includes runbook, alerts/triggers, automation script, escalation, and testing.",
  }),
);

tasks.push(
  p({
    category: "agentic",
    difficulty: 3,
    title: "Design a self-healing autoscaling strategy",
    prompt:
      "Design a resilient autoscaling strategy for an API that must absorb traffic spikes automatically. Describe the ordered design: collect the right metrics (CPU, latency, queue depth), define autoscaling thresholds, run health checks that remove unhealthy instances, automatically scale instance count up and down, and include alerting plus a manual override in case automation misbehaves.",
    requiredKeywords: ["autoscaling", "metrics", "health", "alert"],
    reference:
      "collect metrics like CPU/latency, set autoscaling thresholds, use health checks to evict unhealthy instances, scale up/down, and alert with a manual override",
    graderNote: "Correct answer mentions autoscaling, chosen metrics, health checks, alerts, and a manual override.",
  }),
);

tasks.push(
  p({
    category: "agentic",
    difficulty: 3,
    title: "Recover from a bad commit in shared history",
    prompt:
      "A commit containing secrets was force-pushed and is now in your shared repository's history; you must scrub it without losing legitimate work. Describe your ordered recovery plan: take a full backup of the repo, rewrite history to remove the commit (naming the tool/approach), rotate or revoke the leaked secrets, coordinate with all team members to fetch the rewritten history, and verify the secret no longer appears anywhere.",
    requiredKeywords: ["backup", "rebase", "secret", "verify"],
    reference:
      "back up the repo, use git filter-repo/rebase to rewrite history removing the commit, rotate the leaked secret, have all members reset to the rewritten history, and verify removal",
    graderNote: "Correct answer includes backup, history rewrite (filter-repo/rebase), secret rotation, and verification.",
  }),
);

export default tasks;
