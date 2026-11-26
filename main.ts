// Entry for the make.fun bounty "Post the Meme, Win the Feed"
// (u-myronera-post-the-meme-win-the-feed-2de960bf), Node 22, standard library
// only. The whole job of this program is to hand the gate the address of the
// X post that carries this entry's meme: it reads POST.json from the
// repository root, checks it is a well-formed pointer to one X post, and
// copies it byte for byte to $MAKEFUN_OUTPUT_DIR (default /output), where the
// gate reads it. The meme itself lives in meme.png in this repository and the
// post's likes, reposts and quotes are read by the house from X; nothing this
// program writes is scored.
//
// The POST.json this repository ships holds a placeholder address, so the
// gate refuses it as it stands. Replace it with the live post's address
// before submitting; the placeholder is well-formed, so this program copies
// it happily and the gate, not this program, is what refuses it.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = join(BOT_DIR, 'POST.json');
const TARGET = join(OUTPUT_DIR, 'POST.json');

// An X post address: x.com or twitter.com, one handle, /status/, one id.
// The /i/web/status/ form X uses for its own share links is accepted too.
// A trailing query string (X share links often carry ?s=20) is allowed.
const POST_URL =
  /^https:\/\/(x\.com|twitter\.com|mobile\.twitter\.com)\/[^/\s]+\/status\/[^/\s?]+(\?[^\s]*)?$/;
const POST_URL_WEB =
  /^https:\/\/(x\.com|twitter\.com)\/i\/web\/status\/\d+$/;

let bytes: Buffer;
try {
  bytes = readFileSync(SOURCE);
} catch (err) {
  console.error(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Fail fast on a malformed POST.json instead of copying garbage to /output:
// it must parse as a JSON object with exactly one key, `url`, holding a
// string that looks like an X post address.
let parsed: unknown;
try {
  parsed = JSON.parse(bytes.toString('utf8'));
} catch (err) {
  console.error(`POST.json in ${BOT_DIR} is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  console.error(`POST.json in ${BOT_DIR} must be a JSON object`);
  process.exit(1);
}
const keys = Object.keys(parsed);
if (keys.length !== 1 || keys[0] !== 'url') {
  console.error(`POST.json in ${BOT_DIR} must have exactly one key, "url"`);
  process.exit(1);
}
const url = (parsed as { url: unknown }).url;
if (typeof url !== 'string' || !(POST_URL.test(url) || POST_URL_WEB.test(url))) {
  console.error(`POST.json in ${BOT_DIR} must hold one X post URL in "url"`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(TARGET, bytes);
} catch (err) {
  console.error(`POST.json could not be written to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// The grader runs this program twice and the two runs must write the same
// bytes, so verify the copy landed byte-identical before reporting success.
if (!readFileSync(TARGET).equals(bytes)) {
  console.error(`POST.json in ${OUTPUT_DIR} does not match the source byte for byte`);
  process.exit(1);
}

console.log(`POST.json copied to ${TARGET}`);
