import type { Task } from "../types.ts";
import { mcTask as m, promptTask as p } from "./helpers.ts";

const tasks: Task[] = [];

// ── Difficulty 1 (3 tasks) ──────────────────────────────────────────

tasks.push(
  m({
    category: "knowledge",
    difficulty: 1,
    title: "Binary Search Worst-Case Time Complexity",
    prompt:
      "What is the worst-case time complexity of binary search on a sorted array of n elements?",
    options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
    correctIndex: 0,
    graderNote:
      "Binary search halves the search space each comparison, yielding O(log n). O(n) is linear search, O(n log n) is comparison-sort lower bound, O(1) is constant time.",
  }),
);

tasks.push(
  m({
    category: "knowledge",
    difficulty: 1,
    title: "TCP vs UDP Delivery Guarantee",
    prompt: "Which feature is provided by TCP but NOT by UDP?",
    options: [
      "Retransmission of lost packets",
      "Lower per-packet overhead",
      "Support for multicast communication",
      "Best-effort delivery model",
    ],
    correctIndex: 0,
    graderNote:
      "TCP retransmits lost packets for reliable delivery. UDP has lower overhead, supports multicast, and uses best-effort delivery — all inherent to UDP.",
  }),
);

tasks.push(
  m({
    category: "knowledge",
    difficulty: 1,
    title: "UTF-8 Maximum Bytes Per Code Point",
    prompt:
      "What is the maximum number of bytes a single Unicode code point can occupy in UTF-8 encoding?",
    options: ["4", "1", "2", "6"],
    correctIndex: 0,
    graderNote:
      "UTF-8 encodes code points in 1–4 bytes. The 4-byte form covers U+10000–U+10FFFF. Six-byte sequences existed in early drafts but were removed before standardization (RFC 3629).",
  }),
);

// ── Difficulty 2 (4 tasks) ──────────────────────────────────────────

tasks.push(
  m({
    category: "knowledge",
    difficulty: 2,
    title: "NP-Completeness Precise Definition",
    prompt:
      "Which statement precisely defines what it means for a problem to be NP-complete?",
    options: [
      "The problem is in NP and every problem in NP is polynomial-time reducible to it",
      "The problem can be solved in nondeterministic polynomial time",
      "The problem is in NP and has no known polynomial-time algorithm",
      "The problem requires exponential time in the worst case",
    ],
    correctIndex: 0,
    graderNote:
      "NP-complete = in NP + NP-hard (every NP problem poly-time reduces to it). Merely being in NP or lacking a known poly-time algorithm does not define NP-completeness.",
  }),
);

tasks.push(
  m({
    category: "knowledge",
    difficulty: 2,
    title: "Coffman Conditions — Which Is Not One?",
    prompt:
      "Which of the following is NOT one of the four Coffman conditions necessary for deadlock?",
    options: [
      "Starvation",
      "Mutual exclusion",
      "Hold and wait",
      "Circular wait",
    ],
    correctIndex: 0,
    graderNote:
      "The four Coffman conditions are: mutual exclusion, hold and wait, no preemption, and circular wait. Starvation is a related liveness concern but is not one of the four.",
  }),
);

tasks.push(
  m({
    category: "knowledge",
    difficulty: 2,
    title: "TCP Slow Start Window Growth",
    prompt:
      "During the slow start phase of TCP congestion control, how does the congestion window grow?",
    options: [
      "Doubles every round-trip time",
      "Increases by one segment per round-trip time",
      "Halves every round-trip time",
      "Remains constant until a loss event",
    ],
    correctIndex: 0,
    graderNote:
      "Slow start grows cwnd exponentially (doubles per RTT). Additive increase in congestion avoidance grows by ~1 per RTT. Halving is the response to congestion (fast retransmit/congestion avoidance).",
  }),
);

tasks.push(
  m({
    category: "knowledge",
    difficulty: 2,
    title: "Direct-Mapped Cache Set Selection Bits",
    prompt:
      "In a direct-mapped cache with 2^n sets, which bits of the memory address are used to determine the cache set?",
    options: [
      "The n bits immediately above the block offset bits",
      "The most significant n bits of the address",
      "All bits of the address XORed together",
      "The least significant n bits of the address",
    ],
    correctIndex: 0,
    graderNote:
      "Cache indexing uses the index field, which sits above the block-offset bits. Most-significant bits serve as the tag; least-significant bits overlap the offset and would alias incorrectly.",
  }),
);

// ── Difficulty 3 (3 tasks) ──────────────────────────────────────────

tasks.push(
  m({
    category: "knowledge",
    difficulty: 3,
    title: "Bloom Filter False Positive Property",
    prompt:
      "What is a defining characteristic of a Bloom filter's membership query?",
    options: [
      "It may return false positives but never false negatives",
      "It may return false negatives but never false positives",
      "It guarantees zero false positives when sufficiently sized",
      "It returns the exact count of matching elements",
    ],
    correctIndex: 0,
    graderNote:
      "Bloom filters are probabilistic: hash collisions can cause false positives (reporting membership when absent) but a false negative (missing a true member) is impossible by construction.",
  }),
);

tasks.push(
  p({
    category: "knowledge",
    difficulty: 3,
    title: "Origin of the Term Artificial Intelligence",
    prompt:
      "In what year and at which academic institution did the term 'artificial intelligence' first appear in a formal research proposal? Name the lead organizer of the workshop.",
    reference:
      "The term 'artificial intelligence' was coined at the Dartmouth Summer Research Project on Artificial Intelligence in 1956, organized by John McCarthy at Dartmouth College, Hanover, New Hampshire.",
    requiredKeywords: ["1956", "dartmouth", "mccarthy"],
    graderNote:
      "Must mention 1956, Dartmouth (College or Conference/Workshop), and John McCarthy. The workshop was technically a summer research project.",
  }),
);

tasks.push(
  p({
    category: "knowledge",
    difficulty: 3,
    title: "CAP Theorem Precise Statement",
    prompt:
      "State the CAP theorem precisely. Name the three guarantees, and explain which guarantee a CP system sacrifices when a network partition occurs.",
    reference:
      "The CAP theorem (Brewer's theorem) states that a distributed data store can simultaneously provide at most two of: Consistency (every read receives the most recent write), Availability (every request receives a non-error response), and Partition tolerance (the system continues despite arbitrary message loss between nodes). A CP system sacrifices availability during partitions.",
    requiredKeywords: ["consistency", "availability", "partition"],
    graderNote:
      "Must name all three properties (consistency, availability, partition tolerance) and correctly identify that a CP system sacrifices availability during network partitions.",
  }),
);

export default tasks;
