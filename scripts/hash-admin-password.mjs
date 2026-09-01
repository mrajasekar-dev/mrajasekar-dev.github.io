#!/usr/bin/env node
// One-off local utility: hashes a password for ADMIN_PASSWORD_HASH.
// Run it yourself in your own terminal (not through an AI session) so the
// plaintext password is never seen or logged anywhere else:
//
//   node scripts/hash-admin-password.mjs
//
import { randomBytes, scryptSync } from "node:crypto";
import readline from "node:readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let masked = false;
const originalWrite = rl._writeToOutput.bind(rl);
rl._writeToOutput = (str) => {
  if (masked && str !== "\r\n" && !str.includes("\n")) {
    rl.output.write("*".repeat(str.length));
  } else {
    originalWrite(str);
  }
};

rl.question("Choose an admin password: ", (password) => {
  masked = false;
  console.log();

  if (!password) {
    console.error("No password entered.");
    process.exit(1);
  }

  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  const stored = `${salt.toString("hex")}:${hash.toString("hex")}`;

  console.log("Add this as a Vercel env var (Production + Preview):\n");
  console.log(`ADMIN_PASSWORD_HASH=${stored}`);
  console.log(`SESSION_SECRET=${randomBytes(32).toString("hex")}`);

  rl.close();
  process.exit(0);
});

masked = true;
