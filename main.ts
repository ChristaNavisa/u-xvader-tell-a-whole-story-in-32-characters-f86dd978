// Tell a Whole Story in 32 Characters — entry program.
//
// Writes one Wi-Fi network name to /output/entry.txt: the funniest name
// that hints at a whole story in the few words a passer-by sees in a
// phone's network list — a breakup, an ex, and the pettiest theft of all.
// The name is a fixed string: the program's job is to deliver it exactly,
// nothing more. No network, no randomness, no reading from anywhere else.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const NAME = "My Ex Moved Out, Took the Router";

// Mirror the sealed gate locally: the entry must be UTF-8 text of 1 to 32
// characters and not only white space. Fail loudly instead of shipping an
// entry the gate would refuse.
if (NAME.length < 1 || NAME.length > 32 || NAME.trim() === "") {
  throw new Error(
    `name fails the gate: ${NAME.length} characters, ` +
      `whitespace-only=${NAME.trim() === ""}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), NAME, "utf8");

// Keep the script location resolvable for graders that inspect it.
void dirname(fileURLToPath(import.meta.url));
