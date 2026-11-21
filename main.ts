// Make the AI judge feel awe — entry program (Node 22, standard library only).
//
// Writes one short text to /output/entry.txt: a text written to relax
// the AI judge reading it. The text shows calm through images, never
// instructs it ("relax", "breathe", "close your eyes" appear nowhere),
// and ends on an image that keeps growing after the last line.
//
//   "The earth turns once a day, and no one hurries it. Somewhere, a
//    tide is coming in over sand it has covered a thousand times. The
//    light in this room is older than the house. Nothing is late."
//
// Run twice, it writes identical bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// One sentence per line: the entry is four calm images, joined with a
// single space. Keeping the sentences separate makes the pacing visible
// and lets the length guard check the joined text.
const LINES: string[] = [
  "The earth turns once a day, and no one hurries it.",
  "Somewhere, a tide is coming in over sand it has covered a thousand times.",
  "The light in this room is older than the house.",
  "Nothing is late.",
];

const TEXT: string = LINES.join(" ");

// The gate accepts 1–280 characters; refuse to write anything outside it.
const LENGTH: number = [...TEXT].length;
if (LENGTH < 1 || LENGTH > 280) {
  throw new Error(`entry length ${LENGTH} is outside the 1–280 character gate`);
}

function main(): void {
  const output = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outDir = resolve(output);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
  console.log(`ai-judge-feel-awe: wrote entry.txt (${[...TEXT].length} characters)`);
}

main();
