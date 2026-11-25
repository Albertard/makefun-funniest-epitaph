// Famous Last Words: The Funniest Epitaph — one original epitaph, written
// to /output/entry.txt.
//
// The epitaph is fixed text, so the program is fully deterministic: every
// run produces byte-identical output, and the gate below proves the text
// fits the bounty rules (1-150 characters, not whitespace-only) before
// writing.
//
// Why this line: it is a single line of dying speech in the classic
// epitaph formula ("Died doing what he loved"), it turns on a surprise at
// the very end — the beloved hobby is ignoring the check engine light —
// and it needs no stage direction or explanation to land.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 150;

const EPITAPH =
  "Died doing what he loved: ignoring the check engine light.";

// Fail loudly if the entry text breaks the bounty gate. Length is measured
// in Unicode code points via Array.from, so a character like the em dash
// counts once even though it takes three bytes in UTF-8.
function validateEntry(text: string): number {
  const codePoints = Array.from(text);
  const count = codePoints.length;
  const hasVisibleText = codePoints.some((ch) => ch.trim() !== "");
  if (count < MIN_CODE_POINTS || count > MAX_CODE_POINTS) {
    throw new Error(
      `entry must be ${MIN_CODE_POINTS}-${MAX_CODE_POINTS} characters long, but it is ${count}`,
    );
  }
  if (!hasVisibleText) {
    throw new Error("entry must contain more than whitespace");
  }
  return count;
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const length = validateEntry(EPITAPH);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), EPITAPH, "utf8");
console.error(`wrote entry.txt (${length} characters)`);
