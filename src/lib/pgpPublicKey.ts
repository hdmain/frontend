import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Armored PGP public key (alfadmin <admin@alfahost.eu>). */
export function getPgpPublicKey(): string {
  return readFileSync(join(process.cwd(), "pubkey.txt"), "utf8").trimEnd() + "\n";
}
