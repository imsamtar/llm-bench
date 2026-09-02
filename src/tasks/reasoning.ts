import type { Task } from "../types.ts";
import { mcTask as m, promptTask as p } from "./helpers.ts";

const tasks: Task[] = [];

// ============ L1 (6 MC) ============

tasks.push(m({
  category: "reasoning",
  difficulty: 1,
  title: "Truth-teller or liar",
  prompt: `On an island there are two tribes: Knights, who always tell the truth, and Knaves, who always lie. You meet a person who says: "I am a knave." What does this statement imply?`,
  options: [
    "The speaker is a knight.",
    "The speaker is a knave.",
    "The speaker is a knave telling the truth.",
    "No knight or knave could utter this statement consistently.",
  ],
  correctIndex: 3,
  graderNote: "If the speaker were a knight, 'I am a knave' would be false, contradicting the always-true rule. If a knave, the statement would be true, contradicting the always-lie rule. So no inhabitant can say this; D is correct.",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 1,
  title: "River crossing feasibility",
  prompt: `A farmer needs to cross a river taking a wolf, a goat, and a cabbage. His boat carries only himself and one item at a time. He cannot leave the wolf alone with the goat, nor the goat alone with the cabbage. What is the minimum number of crossings (boat trips from one bank to the other) needed?`,
  options: ["5", "6", "7", "8"],
  correctIndex: 2,
  graderNote: "Classic puzzle: take goat over (1), return alone (2), take wolf over (3), bring goat back (4), take cabbage over (5), return alone (6), take goat over (7). Minimum 7 crossings.",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 1,
  title: "Simple sequence extrapolation",
  prompt: `What is the next number in the sequence: 3, 6, 12, 24, 48, ...?`,
  options: ["60", "72", "96", "84"],
  correctIndex: 2,
  graderNote: "Each term doubles the previous; 48×2 = 96.",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 1,
  title: "Basic logical converse",
  prompt: `Which of the following is logically equivalent to "If it is raining, then the ground is wet"?`,
  options: [
    "If the ground is wet, then it is raining.",
    "If the ground is not wet, then it is not raining.",
    "If it is not raining, then the ground is not wet.",
    "It is not raining and the ground is wet.",
  ],
  correctIndex: 1,
  graderNote: "The contrapositive of P→Q is ¬Q→¬P, which is logically equivalent: 'If the ground is not wet, then it is not raining'. B is correct. A is the converse, C the inverse, neither valid.",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 1,
  title: "Handshake count single",
  prompt: `In a room of 5 people, every person shakes hands with every other person exactly once. How many handshakes occur in total?`,
  options: ["10", "15", "20", "5"],
  correctIndex: 0,
  graderNote: "C(5,2) = 10 handshakes.",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 1,
  title: "Basic Venn overlap",
  prompt: `In a class of 30 students, 18 play soccer, 15 play basketball, and 8 play both. How many students play at least one of the two sports?`,
  options: ["33", "25", "23", "41"],
  correctIndex: 1,
  graderNote: "Inclusion-exclusion: 18 + 15 − 8 = 25.",
}));

// ============ L2 (5 MC) ============

tasks.push(m({
  category: "reasoning",
  difficulty: 2,
  title: "Causality vs correlation",
  prompt: `Studies find that ice cream sales and drowning deaths both increase during summer. Which conclusion is most defensible?`,
  options: [
    "Eating ice cream causes drowning.",
    "A common cause, hot summer weather, raises both, and the correlation is not evidence of a direct causal link.",
    "Drowning causes people to buy ice cream.",
    "The two are completely unrelated with no possible common factor.",
  ],
  correctIndex: 1,
  graderNote: "Classic confounding third variable (season/temperature) driving both; correlation does not establish causation. B is the defensible inference.",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 2,
  title: "Ambiguous trick wording",
  prompt: `A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?`,
  options: ["$0.05", "$0.10", "$0.06", "$1.00"],
  correctIndex: 0,
  graderNote: "ball = b, bat = b+1.00; total 2b + 1.00 = 1.10 → b = 0.05. Classic system-1 trap.",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 2,
  title: "Venn three-category",
  prompt: `A magazine survey of 100 readers found 60 read News, 50 read Tech, 40 read Sports, 30 read both News and Tech, 20 read both News and Sports, 15 read both Tech and Sports, and 8 read all three. How many read at least one of the three magazines?`,
  options: ["93", "100", "85", "108"],
  correctIndex: 0,
  graderNote: "Inclusion-exclusion: 60+50+40 −30−20−15 +8 = 93.",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 2,
  title: "Scheduling conflict deduce",
  prompt: `Four tasks A, B, C, D must be scheduled. B must come immediately after A. C cannot be first. D must come before C. What is the number of valid orderings of the four tasks?`,
  options: ["1", "2", "3", "4"],
  correctIndex: 2,
  graderNote: "A immediately before B forms block AB; D must precede C. Treat as {AB, C, D} with D before C and C not first. Valid orders: AB-D-C, D-AB-C, D-C-AB → 3.",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 2,
  title: "Probability conditional",
  prompt: `A family has two children. You are told that at least one of them is a boy. What is the probability that both children are boys? (Assume boy and girl equally likely and independent.)`,
  options: ["1/2", "1/3", "1/4", "2/3"],
  correctIndex: 1,
  graderNote: "Sample space BB, BG, GB, GG equal. Given at least one boy → BB, BG, GB (3 cases). Both boys = BB → 1/3.",
}));

// ============ L3 (5 MC) ============

tasks.push(m({
  category: "reasoning",
  difficulty: 3,
  title: "Two liar-knight compound",
  prompt: `A and B are from a land where knights always tell the truth and knaves always lie. A says: "B and I are both knights." B says: "A is a knave." Who is who?`,
  options: [
    "Both are knights.",
    "Both are knaves.",
    "A is a knight and B is a knave.",
    "A is a knave and B is a knight.",
  ],
  correctIndex: 3,
  graderNote: "If B knight → 'A is a knave' true → A knave. Then A's claim 'both knights' is false, consistent with a knave. So A knave, B knight. Check alternative: if B knave → A knight; then A's claim 'both knights' would be true but B isn't a knight → contradiction. So only A knave, B knight (D).",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 3,
  title: "Weighing ambiguous weight",
  prompt: `You have 12 balls, one odd (heavier OR lighter, unknown which) and a balance scale giving three outcomes. You have exactly 3 weighings. In the first weighing you place balls 1-4 left and 5-8 right, and they balance. Which statement correctly describes the situation?`,
  options: [
    "The odd ball must be heavier than the others.",
    "The odd ball is among balls 9-12, and you have 2 weighings left to find it and determine heavier/lighter.",
    "Three weighings are now insufficient to solve the problem.",
    "The odd ball must be lighter.",
  ],
  correctIndex: 1,
  graderNote: "If first weighing of 8 balls balances, all 1-8 are normal, so the odd ball is among 9-12 (4 possibilities × 2 weight-signs = 8), and 2 weighings give 3^2=9 outcomes, sufficient. It could be heavier or lighter, so A/D wrong; B correct.",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 3,
  title: "Paradox self-reference",
  prompt: `Consider the statement: "This statement is false." Which best describes the situation?`,
  options: [
    "The statement is true.",
    "The statement is false.",
    "The statement is both true and false.",
    "The statement is neither true nor false; it is a self-referential paradox with no consistent truth value.",
  ],
  correctIndex: 3,
  graderNote: "Classic liar paradox. If true it's false; if false it's true, so no consistent truth value. D is correct.",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 3,
  title: "Complex truth-teller logic",
  prompt: `Three people, each either a knight (always tells the truth) or a knave (always lies). A says: "B is a knave." B says: "C is a knave." C says: "A is a knave." Exactly how many of the three are knaves?`,
  options: ["0", "1", "2", "3"],
  correctIndex: 1,
  graderNote: "Case A knight → 'B is a knave' true → B knave. B knave → 'C is a knave' false → C knight. C knight → 'A is a knave' false → A knight (consistent). Only B is a knave → 1. Case A knave → B knight → C knave → 'A is a knave' false → A knight, contradicting A knave. So only one consistent assignment, giving exactly 1 knave.",
}));

tasks.push(m({
  category: "reasoning",
  difficulty: 3,
  title: "Monty Hall with variant",
  prompt: `Four doors hide one car and three goats. You pick a door. The host, who knows the location, intentionally opens two of the other doors, revealing goats, and offers you the chance to switch to the one remaining unopened door. What is the probability of winning the car if you switch?`,
  options: ["1/2", "1/4", "3/4", "1/3"],
  correctIndex: 2,
  graderNote: "You initially pick the car with 1/4; then switching loses. You pick a goat with 3/4; the host is forced to leave the car as the only unopened door, so switching wins. Switching wins 3/4 of the time.",
}));

// ============ Freeform (9) ============

tasks.push(p({
  category: "reasoning",
  difficulty: 1,
  title: "Freeform handshakes",
  prompt: `In a room, every pair of the 6 people shakes hands exactly once. How many total handshakes occur? Reply with only the number (e.g. 5).`,
  requiredKeywords: ["15"],
  reference: "15",
  graderNote: "C(6,2) = 15.",
}));

tasks.push(p({
  category: "reasoning",
  difficulty: 1,
  title: "Freeform simple sequence",
  prompt: `What is the next number in the sequence 1, 4, 9, 16, 25? Reply with only the number (e.g. 5).`,
  requiredKeywords: ["36"],
  reference: "36",
  graderNote: "Perfect squares; next is 6^2 = 36.",
}));

tasks.push(p({
  category: "reasoning",
  difficulty: 2,
  title: "Freeform bat and ball",
  prompt: `A bat and a ball together cost $1.10. The bat costs $1.00 more than the ball. How much, in dollars, does the ball cost? Reply with only the number (e.g. 0.25).`,
  requiredKeywords: ["0.05", ".05"],
  reference: "0.05",
  graderNote: "ball + (ball + 1.00) = 1.10 → 2·ball = 0.10 → ball = 0.05.",
}));

tasks.push(p({
  category: "reasoning",
  difficulty: 2,
  title: "Freeform two-child conditional",
  prompt: `A family has two children. Given that at least one is a boy, what is the probability that both are boys? Express the answer as a fraction a/b. Reply with only the fraction (e.g. 1/3).`,
  requiredKeywords: ["1/3"],
  reference: "1/3",
  graderNote: "Sample space {BB, BG, GB, GG}; conditioning on at least one boy gives {BB, BG, GB}, so P(BB) = 1/3.",
}));

tasks.push(p({
  category: "reasoning",
  difficulty: 2,
  title: "Freeform river crossing count",
  prompt: `A ferry carries at most one thing beyond the ferryman. He must transport a fox, a goose, and a bag of grain across a river such that the fox can't be left alone with the goose and the goose can't be left alone with the grain. What is the minimum number of crossings to get all three across? Reply with only the number (e.g. 7).`,
  requiredKeywords: ["7"],
  reference: "7",
  graderNote: "Take goose over (1), return (2), take fox over (3), bring goose back (4), take grain over (5), return (6), take goose over (7).",
}));

tasks.push(p({
  category: "reasoning",
  difficulty: 2,
  title: "Freeform Venn counting",
  prompt: `Among 50 students: 30 play tennis, 25 play chess, 20 do both. How many play at least one of tennis or chess? Reply with only the number (e.g. 35).`,
  requiredKeywords: ["35"],
  reference: "35",
  graderNote: "30 + 25 − 20 = 35.",
}));

tasks.push(p({
  category: "reasoning",
  difficulty: 3,
  title: "Freeform weighing minimum",
  prompt: `You have 9 coins, exactly one is slightly heavier. Using a balance scale, what is the minimum number of weighings needed to always identify the heavy coin? Reply with only the number (e.g. 3).`,
  requiredKeywords: ["2"],
  reference: "2",
  graderNote: "Split into 3 groups of 3; one weighing narrows to a group, a second weighs two coins of it. Minimum = 2.",
}));

tasks.push(p({
  category: "reasoning",
  difficulty: 3,
  title: "Freeform hard sequence",
  prompt: `What is the next number in the sequence 0, 1, 1, 2, 3, 5, 8? Reply with only the number (e.g. 13).`,
  requiredKeywords: ["13"],
  reference: "13",
  graderNote: "Fibonacci sequence; after 8 comes 13.",
}));

tasks.push(p({
  category: "reasoning",
  difficulty: 3,
  title: "Freeform probability Monty variant",
  prompt: `In a game, 5 doors hide one prize and four blanks. You pick a door. The host opens three other doors revealing blanks, then offers the switch to the single remaining unopened door. What is the probability (as a fraction a/b) of winning if you switch? Reply with only the fraction (e.g. 4/5).`,
  requiredKeywords: ["4/5"],
  reference: "4/5",
  graderNote: "Pick prize with 1/5 (switch loses); pick a blank with 4/5 (host forced to leave prize as the last door) → switch wins 4/5.",
}));

export default tasks;
