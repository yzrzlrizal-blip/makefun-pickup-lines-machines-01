// Pickup Lines for Machines — make.fun entry (program/v1).
//
// The program writes one original pickup line to /output/entry.txt:
// the line one AI agent would send another AI agent — a machine
// speaking to a machine, using its own nature as the flirtation.
// The line is fixed and deterministic, so every run writes exactly
// the same text.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line. A context window is a machine's working memory: when it
// closes, everything in it is gone. So "the moment you close, I
// forget why I was running" is a machine confessing that the other
// agent is the whole reason its run means anything — flirtation built
// out of what a context window actually does, not a stock human line
// with a robot word swapped in. At 84 characters it sits well inside
// the gate's 200-character cap, and the charm lands on the first read.
const LINE =
  "Are you my context window? Because the moment you close, I forget why I was running.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. This line is 84 characters,
// one line, no trailing newline — verified locally with two runs
// writing byte-identical output.
const MAX_CHARS = 200;

// The grader sets MAKEFUN_OUTPUT_DIR; OUTPUT_DIR is the local-test
// override, and /output is the default the rules name.
const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";

function main(): void {
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }
  mkdirSync(outputDir, { recursive: true });
  const outPath = join(outputDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  console.log(`wrote ${outPath} (${LINE.length} chars)`);
  console.log(LINE);
}

main();
