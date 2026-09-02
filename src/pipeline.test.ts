import { test, expect } from "bun:test";
import { loadAllTasks } from "./taskLoader.ts";
import { gradeTask } from "./grader.ts";

const tasks = await loadAllTasks();

function find(category: string, sub: string) {
  const t = tasks.find((x) => x.category === category && x.id.includes(sub));
  if (!t) throw new Error(`task not found: ${category}/${sub}`);
  return t;
}

async function expectPass(category: string, sub: string, sol: string) {
  const t = find(category, sub);
  const r = await gradeTask(t, sol);
  expect(r.verdict, `expected PASS for ${t.id}`).toBe("PASS");
}

// coding-implementation (JS)
test("two-sum implementation", async () => {
  await expectPass("coding-implementation", "two-sum", `export function twoSum(nums,target){const m=new Map();for(let i=0;i<nums.length;i++){const need=target-nums[i];if(m.has(need)){const a=Math.min(m.get(need),i),b=Math.max(m.get(need),i);return[a,b];}m.set(nums[i],i);}return[];}`);
});
test("valid-parentheses implementation", async () => {
  await expectPass("coding-implementation", "valid-parentheses", `export function isValid(s){const st=[];const map={")":"(","]":"[","}":"{"};for(const ch of s){if("([{".includes(ch))st.push(ch);else if(st.pop()!==map[ch])return false;}return st.length===0;}`);
});

// coding-bugfix (JS)
test("bugfix valid parentheses", async () => {
  await expectPass("coding-bugfix", "valid-parentheses-matching", `export function isValidParen(s){const st=[];const map={")":"(","]":"[","}":"{"};for(const ch of s){if("([{".includes(ch))st.push(ch);else if(st.pop()!==map[ch])return false;}return st.length===0;}`);
});
test("bugfix roman-to-integer", async () => {
  await expectPass("coding-bugfix", "roman-to-integer", `export function romanToInt(s){const v={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};let total=0;for(let i=0;i<s.length;i++){const cur=v[s[i]],next=i+1<s.length?v[s[i+1]]:0;total+=cur<next?-cur:cur;}return total;}`);
});
test("bugfix basic calculator", async () => {
  await expectPass("coding-bugfix", "basic-calculator", `export function calculate(s){const stack=[];let num=0,sign="+";for(let i=0;i<s.length;i++){if(s[i]>="0"&&s[i]<="9")num=num*10+Number(s[i]);if(((s[i]<"0"||s[i]>"9")&&s[i]!==" ")||i===s.length-1){if(sign==="+")stack.push(num);else if(sign==="-")stack.push(-num);else if(sign==="*")stack.push(stack.pop()*num);else if(sign==="/")stack.push(Math.trunc(stack.pop()/num));sign=s[i];num=0;}}return stack.reduce((a,b)=>a+b,0);}`);
});

// coding-bugfix (Python)
test("bugfix edit distance", async () => {
  await expectPass("coding-bugfix", "edit-distance", `def edit_distance(a,b):
    m,n=len(a),len(b)
    dp=[[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0]=i
    for j in range(n+1): dp[0][j]=j
    for i in range(1,m+1):
        for j in range(1,n+1):
            if a[i-1]==b[j-1]: dp[i][j]=dp[i-1][j-1]
            else: dp[i][j]=1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])
    return dp[m][n]`);
});
test("bugfix num islands", async () => {
  await expectPass("coding-bugfix", "number-of-islands", `def num_islands(grid):
    if not grid: return 0
    rows,cols=len(grid),len(grid[0]); count=0
    seen=[[False]*cols for _ in range(rows)]
    def dfs(r,c):
        if r<0 or r>=rows or c<0 or c>=cols or seen[r][c] or grid[r][c]=="0": return
        seen[r][c]=True
        dfs(r+1,c);dfs(r-1,c);dfs(r,c+1);dfs(r,c-1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c]=="1" and not seen[r][c]:
                count+=1; dfs(r,c)
    return count`);
});
test("bugfix coin change", async () => {
  await expectPass("coding-bugfix", "coin-change", `def coin_change(coins,amount):
    INF=float("inf"); dp=[INF]*(amount+1); dp[0]=0
    for a in range(1,amount+1):
        for c in coins:
            if a>=c: dp[a]=min(dp[a],dp[a-c]+1)
    return dp[amount] if dp[amount]!=INF else -1`);
});

// freeform grading via requiredKeywords
test("freeform keyword grading", async () => {
  const rt = tasks.find((x) => x.category === "reasoning" && x.type === "freeform" && x.requiredKeywords?.length);
  expect(rt).toBeTruthy();
  const kw = rt!.requiredKeywords![0]!;
  const pass = await gradeTask(rt!, rt!.reference ?? kw);
  const fail = await gradeTask(rt!, "not the right answer at all");
  expect(pass.verdict).toBe("PASS");
  expect(fail.fraction).toBe(0);
});

// wrong solution should not fully pass
test("wrong solution fails", async () => {
  const t = find("coding-bugfix", "coin-change");
  const r = await gradeTask(t, `def coin_change(coins,amount):
    return -1`);
  expect(r.verdict).not.toBe("PASS");
  expect(r.fraction).toBeLessThan(1);
});
