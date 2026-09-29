// Inlines styles.css and every local script into single-file builds:
//   dist/reasoning-rounds.html  a standalone page (open offline, send to a phone)
//   dist/artifact.html          the same page as a body fragment, for hosts that
//                               supply their own <html>/<head> wrapper
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const html = read("index.html");

function block(name) {
  const m = html.match(new RegExp(`<!-- build:${name} -->([\\s\\S]*?)<!-- /build:${name} -->`));
  if (!m) throw new Error(`Missing build:${name} markers in index.html`);
  return m[1].trim();
}

function inline(src) {
  return src
    .replace(/<link rel="stylesheet" href="(?!https?:)([^"]+)">/g, (_, p) => `<style>\n${read(p)}\n</style>`)
    .replace(/<script src="(?!https?:)([^"]+)"><\/script>/g, (_, p) => {
      const js = read(p);
      if (/<\/script/i.test(js)) throw new Error(`${p} contains a closing script tag`);
      return `<script>\n${js}\n</script>`;
    });
}

const title = html.match(/<title>[\s\S]*?<\/title>/)[0];
const head = inline(block("head"));
const body = inline(block("body"));

mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(
  join(root, "dist/reasoning-rounds.html"),
  `<!doctype html>\n<html lang="en-GB">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${title}\n${head}\n</head>\n<body>\n${body}\n</body>\n</html>\n`
);
writeFileSync(join(root, "dist/artifact.html"), `${title}\n${head}\n${body}\n`);
console.log("Built dist/reasoning-rounds.html and dist/artifact.html");
