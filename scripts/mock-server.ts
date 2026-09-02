// Minimal OpenAI-compatible mock server for end-to-end pipeline testing.
// Responds to /chat/completions with a fixed message; grades will mostly FAIL,
// which is fine — this only validates that the runner, HTML report, and CSV
// generation work end-to-end.
Bun.serve({
  port: 8790,
  routes: {
    "/v1/chat/completions": {
      POST: () =>
        new Response(
          JSON.stringify({
            choices: [{ message: { role: "assistant", content: "mock answer" } }],
          }),
          { headers: { "Content-Type": "application/json" } },
        ),
    },
  },
});
console.log("mock listening on http://127.0.0.1:8790");
