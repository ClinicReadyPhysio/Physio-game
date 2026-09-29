// Checks every content file against the schema the game engine expects.
// Run with: npm test
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "js/content");
const ctx = vm.createContext({});
ctx.window = ctx; // content files use window.RR and the bare RR global
for (const f of readdirSync(dir).filter((f) => f.endsWith(".js")).sort()) {
  vm.runInContext(readFileSync(join(dir, f), "utf8"), ctx, { filename: f });
}
const RR = ctx.RR;

const AREAS = ["msk", "resp", "neuro", "ortho", "lead"];
const SKILLS = ["flags", "hypothesis", "assessment", "interpret", "manage", "priority", "escalate"];
const BIASES = ["premature", "anchoring", "satisficing", "framing", "availability", "commission"];
const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const text = (v) => typeof v === "string" && v.trim().length > 0;

const ids = new Set();
function uniqueId(id, where) {
  if (!text(id)) return fail(where, "missing id");
  if (ids.has(id)) fail(where, `duplicate id ${id}`);
  ids.add(id);
}

for (const c of RR.cases) {
  const w = `case ${c.id}`;
  uniqueId(c.id, w);
  for (const k of ["title", "setting", "patient", "intro", "pearl"]) if (!text(c[k])) fail(w, `missing ${k}`);
  if (!AREAS.includes(c.area)) fail(w, `unknown area ${c.area}`);
  if (!(c.mins > 0)) fail(w, "mins must be positive");
  if (!Array.isArray(c.refs) || !c.refs.length) fail(w, "needs at least one reference");
  if (!Array.isArray(c.stages) || c.stages.length < 3) fail(w, "needs at least 3 stages");
  (c.stages || []).forEach((st, i) => {
    const sw = `${w} stage ${i + 1}`;
    if (!SKILLS.includes(st.skill)) fail(sw, `unknown skill ${st.skill}`);
    if (!text(st.q) || !text(st.why)) fail(sw, "needs q and why");
    if (st.notes && !st.notes.every(text)) fail(sw, "empty note");
    if (st.obs && !st.obs.every((o) => Array.isArray(o) && text(o[0]) && text(o[1]))) fail(sw, "bad obs row");
    if (!Array.isArray(st.options) || st.options.length < 3) fail(sw, "needs at least 3 options");
    for (const o of st.options || []) {
      if (!text(o.t) || !text(o.fb)) fail(sw, "option needs t and fb");
      if (o.bias && !BIASES.includes(o.bias)) fail(sw, `unknown bias ${o.bias}`);
    }
    if (st.multi) {
      const right = st.options.filter((o) => o.ok === true).length;
      if (!st.options.every((o) => typeof o.ok === "boolean")) fail(sw, "multi options need ok true/false");
      if (right < 2 || right === st.options.length) fail(sw, "multi needs 2+ correct and 1+ incorrect");
    } else {
      const scores = st.options.map((o) => o.s);
      if (!scores.every((s) => Number.isInteger(s) && s >= 0 && s <= 10)) fail(sw, "scores must be 0-10");
      if (scores.filter((s) => s === 10).length !== 1) fail(sw, "needs exactly one best (10) option");
    }
  });
}

const BINS = ["now", "refer", "manage"];
const seen = new Set();
RR.flags.forEach((f, i) => {
  const w = `flag ${i + 1}`;
  if (!text(f.t) || !text(f.why)) fail(w, "needs t and why");
  if (!BINS.includes(f.a)) fail(w, `unknown answer ${f.a}`);
  if (seen.has(f.t)) fail(w, "duplicate vignette");
  seen.add(f.t);
});
for (const b of BINS) if (RR.flags.filter((f) => f.a === b).length < 5) fail("flags", `fewer than 5 '${b}' items`);

for (const sc of RR.caseload) {
  const w = `caseload ${sc.id}`;
  uniqueId(sc.id, w);
  if (!AREAS.includes(sc.area)) fail(w, `unknown area ${sc.area}`);
  const roles = (sc.roles || []).map((r) => r.k);
  if (roles.length < 2) fail(w, "needs 2+ roles");
  const pids = new Set();
  for (const p of sc.pts || []) {
    const pw = `${w} patient ${p.id}`;
    if (pids.has(p.id)) fail(pw, "duplicate patient id");
    pids.add(p.id);
    if (!text(p.name) || !text(p.info) || !text(p.why)) fail(pw, "needs name, info, why");
    if (!(Number.isInteger(p.tier) && p.tier > 0)) fail(pw, "tier must be a positive integer");
    if (!p.best.length) fail(pw, "needs a best allocation");
    for (const k of [...p.best, ...p.ok]) if (!roles.includes(k)) fail(pw, `unknown role ${k}`);
    if (p.best.some((k) => p.ok.includes(k))) fail(pw, "role listed as both best and ok");
  }
  const crit = (sc.pts || []).find((p) => p.id === sc.critical);
  if (!crit) fail(w, "critical patient not found");
  else if (crit.tier !== Math.min(...sc.pts.map((p) => p.tier)) || sc.pts.filter((p) => p.tier === crit.tier).length !== 1)
    fail(w, "critical patient must be the only one in the top tier");
}

const stages = RR.cases.reduce((n, c) => n + c.stages.length, 0);
if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\n${errors.length} problem(s) found.`);
  process.exit(1);
}
console.log(`Content OK: ${RR.cases.length} cases (${stages} steps), ${RR.flags.length} flag items, ${RR.caseload.length} caseload scenarios.`);
