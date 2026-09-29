/* Reasoning Rounds: game engine.
 * Content lives in js/content/*.js and registers itself on window.RR.
 * Progress saves to localStorage, and to the artifact's per-user store
 * when the page runs as a claude.ai artifact with the db capability.
 */
(function () {
  "use strict";

  var RR = window.RR;
  var app = document.getElementById("app");

  var AREAS = { msk: "MSK", resp: "Respiratory", neuro: "Neuro", ortho: "Ortho & frailty", lead: "Leadership" };
  var SKILLS = {
    flags: "Red flags & safety",
    hypothesis: "Generating hypotheses",
    assessment: "Choosing assessments",
    interpret: "Interpreting findings",
    manage: "Planning management",
    priority: "Prioritising & delegating",
    escalate: "Escalating & communicating"
  };
  var BIASES = {
    premature: ["Premature closure", "Accepting a diagnosis before it explains all the findings."],
    anchoring: ["Anchoring", "Sticking with a first impression when new information should change it."],
    satisficing: ["Search satisficing", "Stopping the search once one explanation turns up."],
    framing: ["Framing effect", "Letting the way a referral or handover presents the problem steer your reasoning."],
    availability: ["Availability bias", "Judging likelihood by what comes to mind easily, such as the common or recent case."],
    commission: ["Commission bias", "Feeling you must act, even when stopping is the safer choice."]
  };
  var CONF = {
    low: { label: "Guessing", sub: "×0.8, no penalty", mult: 0.8, miss: 0 },
    med: { label: "Fairly sure", sub: "×1, −2 if wrong", mult: 1, miss: -2 },
    high: { label: "Certain", sub: "×1.25, −4 if wrong", mult: 1.25, miss: -4 }
  };
  var BINS = {
    now: { label: "Same-day escalation", sub: "ED, 999, on-call or crisis team" },
    refer: { label: "Refer on", sub: "GP or specialist, not today" },
    manage: { label: "Manage in physio", sub: "With safety-netting" }
  };
  var BIN_KEYS = ["now", "refer", "manage"];
  var LEVELS = [
    { xp: 0, band: "Tan", title: "First placement", color: "#c9a57a" },
    { xp: 100, band: "Yellow", title: "Final-year student", color: "#f2c200" },
    { xp: 250, band: "Red", title: "Band 5 rotational", color: "#d8392f" },
    { xp: 500, band: "Green", title: "Senior Band 5", color: "#2e9e5b" },
    { xp: 850, band: "Blue", title: "Band 6", color: "#2f6fd6" },
    { xp: 1300, band: "Black", title: "Senior Band 6", color: "#1b1b1b" },
    { xp: 1900, band: "Silver", title: "Band 7 specialist", color: "#aab4ba" },
    { xp: 2700, band: "Gold", title: "Consultant physio", color: "#c9a227" }
  ];
  var FLAG_SECONDS = 60;
  var DAILY_BONUS = 20;

  /* ---------- Progress ---------- */

  var KEY = "reasoning-rounds:v1";

  function blank() {
    return {
      v: 1, xp: 0, updatedAt: 0,
      streak: { n: 0, best: 0, last: null },
      skills: {},
      calib: { low: { n: 0, g: 0 }, med: { n: 0, g: 0 }, high: { n: 0, g: 0 } },
      cases: {}, cl: {},
      flag: { best: 0, plays: 0 },
      daily: { date: null }
    };
  }

  function normalise(p) {
    var b = blank();
    if (!p || typeof p !== "object") return b;
    var calib = p.calib || {};
    return {
      v: 1,
      xp: Number(p.xp) || 0,
      updatedAt: Number(p.updatedAt) || 0,
      streak: Object.assign(b.streak, p.streak),
      skills: Object.assign({}, p.skills),
      calib: {
        low: Object.assign(b.calib.low, calib.low),
        med: Object.assign(b.calib.med, calib.med),
        high: Object.assign(b.calib.high, calib.high)
      },
      cases: Object.assign({}, p.cases),
      cl: Object.assign({}, p.cl),
      flag: Object.assign(b.flag, p.flag),
      daily: Object.assign(b.daily, p.daily)
    };
  }

  function readLocal() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }
  function writeLocal(p) {
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { /* storage unavailable */ }
  }

  var P = normalise(readLocal());

  var Sync = {
    ref: null, busy: false, pending: false, timer: null,
    init: function () {
      var c = window.claude;
      if (!c || typeof c.use !== "function") return;
      var self = this;
      Promise.all([c.use("db"), c.use("user")]).then(function (caps) {
        var db = caps[0], user = caps[1];
        if (!db || !user) return null;
        return user.id().then(function (uid) {
          if (!uid) return null;
          var ref = db.doc("data/users/" + uid + "/progress");
          return ref.get().then(function (snap) {
            self.ref = ref;
            var remote = snap.exists ? snap.data() : null;
            if (remote && (Number(remote.updatedAt) || 0) > P.updatedAt) {
              P = normalise(JSON.parse(JSON.stringify(remote)));
              writeLocal(P);
              if (S.view === "home") render({ keepScroll: true });
            } else if (P.updatedAt) {
              self.queue();
            }
          });
        });
      }).catch(function () { self.ref = null; });
    },
    queue: function () {
      if (!this.ref) return;
      var self = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(function () { self.flush(); }, 1200);
    },
    flush: function () {
      var self = this;
      if (!this.ref) return;
      if (this.busy) { this.pending = true; return; }
      this.busy = true;
      this.ref.set(JSON.parse(JSON.stringify(P))).catch(function (e) {
        var code = e && e.code;
        if (code === "invalid_argument" || code === "revoked" || code === "not_granted" || code === "capability_disabled") self.ref = null;
      }).then(function () {
        self.busy = false;
        if (self.pending) { self.pending = false; self.flush(); }
      });
    }
  };

  function save() {
    P.updatedAt = Date.now();
    writeLocal(P);
    Sync.queue();
  }

  /* ---------- Helpers ---------- */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function shuffle(a) {
    var b = a.slice();
    for (var i = b.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  }
  function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function sum(a, f) { return a.reduce(function (t, x) { return t + f(x); }, 0); }
  function signed(n) { return (n > 0 ? "+" : n < 0 ? "−" : "") + Math.abs(n); }
  function pctOf(g, m) { return m ? Math.round((100 * g) / m) : null; }

  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function dayNum(s) {
    var p = s.split("-").map(Number);
    return Math.round(Date.UTC(p[0], p[1] - 1, p[2]) / 86400000);
  }
  function touchStreak() {
    var t = today(), s = P.streak;
    if (s.last === t) return;
    s.n = s.last && dayNum(t) - dayNum(s.last) === 1 ? s.n + 1 : 1;
    s.last = t;
    s.best = Math.max(s.best, s.n);
  }
  function liveStreak() {
    var s = P.streak;
    if (!s.last) return 0;
    return dayNum(today()) - dayNum(s.last) <= 1 ? s.n : 0;
  }
  function levelOf(xp) {
    var i = 0;
    while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1].xp) i++;
    return { i: i, cur: LEVELS[i], next: LEVELS[i + 1] || null };
  }
  function addSkill(k, got, max) {
    var s = P.skills[k] || (P.skills[k] = { g: 0, m: 0 });
    s.g += got; s.m += max;
  }
  function caseById(id) { return RR.cases.filter(function (c) { return c.id === id; })[0]; }
  function clById(id) { return RR.caseload.filter(function (c) { return c.id === id; })[0]; }
  function dailyCase() {
    var n = RR.cases.length;
    return RR.cases[((dayNum(today()) % n) + n) % n];
  }
  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function scrollToEl(sel, block) {
    var el = app.querySelector(sel);
    if (el) el.scrollIntoView({ block: block || "nearest", behavior: reducedMotion() ? "auto" : "smooth" });
  }

  /* ---------- View state ---------- */

  var S = { view: "home", filter: "all", run: null, confirmReset: false };

  function go(view) { S.view = view; render(); }

  function render(opts) {
    var views = {
      home: viewHome, "case": viewCase, caseEnd: viewCaseEnd,
      flagIntro: viewFlagIntro, flagPlay: viewFlagPlay, flagEnd: viewFlagEnd,
      cl: viewCaseload
    };
    var focused = focusKey(document.activeElement);
    app.innerHTML = '<div class="wrap">' + (views[S.view] || viewHome)() + "</div>";
    if (!opts || !opts.keepScroll) window.scrollTo(0, 0);
    if (focused) {
      var match = Array.prototype.filter.call(app.querySelectorAll("[data-act]"), function (el) { return focusKey(el) === focused; })[0];
      if (match && !match.disabled) match.focus({ preventScroll: true });
    }
  }

  // Identifies a control across re-renders so keyboard focus stays put.
  function focusKey(el) {
    if (!el || !el.dataset || !el.dataset.act || !app.contains(el)) return null;
    var d = el.dataset;
    return [d.act, d.i, d.id, d.f, d.p, d.r, d.b, d.c, d.s].join("|");
  }

  function topbar(title, extra, backLabel) {
    return '<div class="topbar"><button class="btn btn-ghost" data-act="home">← ' + esc(backLabel || "Home") + "</button>" +
      '<div class="grow"><div class="ttl">' + esc(title) + "</div>" + (extra || "") + "</div></div>";
  }

  /* ---------- Home ---------- */

  function viewHome() {
    var lv = levelOf(P.xp);
    var span = lv.next ? lv.next.xp - lv.cur.xp : 1;
    var fill = lv.next ? Math.max(3, Math.round((100 * (P.xp - lv.cur.xp)) / span)) : 100;
    var played = Object.keys(P.cases).length;
    var streak = liveStreak();
    var dc = dailyCase();
    var dailyDone = P.daily.date === today();

    var h = "";
    h += '<header class="mast"><div class="brand"><span class="eyebrow">Physio clinical reasoning · Band 6</span>' +
      '<h1>Reasoning <span class="tape-word">Rounds</span></h1></div>' +
      '<div class="streak"><span class="small muted">Day streak</span><b>' + streak + '</b><span class="small muted">Best</span><b>' + P.streak.best + "</b></div></header>";

    h += '<section class="level" aria-label="Your level"><div class="level-top"><div><div class="eyebrow">Resistance band</div>' +
      '<div class="level-title"><span class="swatch" style="background:' + lv.cur.color + '"></span>' + esc(lv.cur.band) + " · " + esc(lv.cur.title) + "</div></div>" +
      '<div class="level-xp"><b>' + P.xp + '</b> XP<div class="small">' +
      (lv.next ? lv.next.xp - P.xp + " XP to " + esc(lv.next.band) : "Top band reached") + "</div></div></div>" +
      '<div class="band-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + fill + '"><div class="band-fill" style="width:' + fill + "%;background-color:" + lv.cur.color + '"></div></div>' +
      '<div class="level-foot"><span>' + played + " of " + RR.cases.length + " cases played · Flag Fast best " + P.flag.best + "</span>" +
      (lv.next ? "<span>Next: " + esc(lv.next.band) + " band, " + esc(lv.next.title) + "</span>" : "<span>Consultant level. Keep your streak going.</span>") + "</div></section>";

    h += '<section class="panel daily"><div><div class="eyebrow">Today\'s case' + (dailyDone ? " · done" : " · +" + DAILY_BONUS + " XP bonus") + "</div>" +
      "<h2>" + esc(dc.title) + '</h2><p class="muted">' + esc(AREAS[dc.area]) + " · " + esc(dc.patient) + " · about " + dc.mins + " min</p></div>" +
      '<button class="btn ' + (dailyDone ? "" : "btn-tape") + '" data-act="daily">' + (dailyDone ? "Play again" : "Start today's case") + "</button></section>";

    h += '<section class="section"><div class="section-head"><h3>Quick play</h3><span class="small muted">Pick one. Each takes a few minutes.</span></div><div class="modes">' +
      '<button class="mode" data-act="nextCase"><span class="eyebrow">Branching cases</span><h3>Case Rounds</h3>' +
      '<p class="small muted">Work a patient from referral to plan. Commit to an answer and a confidence level at every step.</p>' +
      '<span class="mode-meta">3–5 MIN · ' + RR.cases.length + " CASES</span></button>" +
      '<button class="mode" data-act="flagIntro"><span class="eyebrow">Timed sort</span><h3>Flag Fast</h3>' +
      '<p class="small muted">60 seconds of vignettes. Escalate today, refer on, or manage in physio?</p>' +
      '<span class="mode-meta">60 SEC · BEST ' + P.flag.best + "</span></button>" +
      '<button class="mode" data-act="nextCl"><span class="eyebrow">Prioritise & delegate</span><h3>Caseload</h3>' +
      '<p class="small muted">Rank a list of referrals, then allocate each one across your team.</p>' +
      '<span class="mode-meta">3 MIN · ' + RR.caseload.length + " SCENARIOS</span></button></div></section>";

    h += viewLibrary();
    h += viewProfile();

    h += '<footer class="foot"><p>For education and reflection only. Scenarios are simplified. Always follow your local policies and current national guidance.</p>' +
      (S.confirmReset
        ? '<div class="confirm"><span>Delete all progress, XP and streaks?</span><button class="btn" data-act="resetYes">Delete progress</button><button class="btn btn-ghost" data-act="resetNo">Keep it</button></div>'
        : '<div><button class="btn btn-ghost small" data-act="reset">Reset progress</button></div>') +
      "</footer>";
    return h;
  }

  function viewLibrary() {
    var f = S.filter;
    var chips = [["all", "All"]].concat(Object.keys(AREAS).map(function (k) { return [k, AREAS[k]]; }));
    var h = '<section class="section"><div class="section-head"><h3>Case library</h3><span class="small muted">Tap any case to play it.</span></div>' +
      '<div class="chips" role="group" aria-label="Filter by rotation">' +
      chips.map(function (c) { return '<button class="chip" data-act="filter" data-f="' + c[0] + '" aria-pressed="' + (f === c[0]) + '">' + esc(c[1]) + "</button>"; }).join("") +
      '</div><div class="caselist">';

    var rows = "";
    RR.cases.forEach(function (c) {
      if (f !== "all" && c.area !== f) return;
      var rec = P.cases[c.id];
      rows += '<button class="caserow" data-act="case" data-id="' + c.id + '"><span class="t">' + esc(c.title) + "</span>" +
        '<span class="s">' + esc(AREAS[c.area]) + " · " + esc(c.setting) + " · " + c.stages.length + " steps</span>" +
        '<span class="score">' + (rec ? pip(rec.best) + "Best " + rec.best + "%" : '<span class="muted">New</span>') + "</span></button>";
    });
    RR.caseload.forEach(function (c) {
      if (f !== "all" && c.area !== f) return;
      var rec = P.cl[c.id];
      rows += '<button class="caserow" data-act="cl" data-id="' + c.id + '"><span class="t">' + esc(c.title) + "</span>" +
        '<span class="s">Caseload · ' + esc(c.setting) + " · " + c.pts.length + " patients</span>" +
        '<span class="score">' + (rec ? pip(rec.best) + "Best " + rec.best + "%" : '<span class="muted">New</span>') + "</span></button>";
    });
    if (!rows) rows = '<div class="caserow"><span class="s">No cases for this rotation yet.</span></div>';
    return h + rows + "</div></section>";
  }

  function pip(pct) {
    var cls = pct >= 80 ? "good" : pct >= 50 ? "part" : "bad";
    return '<i class="pip ' + cls + '"></i>';
  }

  function viewProfile() {
    var h = '<section class="panel" aria-label="Reasoning profile"><div class="section-head"><h3>Reasoning profile</h3>' +
      '<button class="btn btn-ghost small" data-act="weakest">Practise your weakest skill →</button></div><div class="skills">';
    Object.keys(SKILLS).forEach(function (k) {
      var s = P.skills[k];
      var v = s ? pctOf(s.g, s.m) : null;
      h += '<div class="skill"><span>' + esc(SKILLS[k]) + '</span><span class="bar"><i style="width:' + (v || 0) + '%"></i></span>' +
        '<span class="v">' + (v === null ? "–" : v + "%") + "</span></div>";
    });
    h += '</div><div class="eyebrow">Confidence vs accuracy</div><div class="calib">';
    ["low", "med", "high"].forEach(function (k) {
      var c = P.calib[k];
      var v = pctOf(c.g, c.n);
      h += '<div><span class="small muted">' + CONF[k].label + "</span><b>" + (v === null ? "–" : v + "%") + '</b><span class="small muted">right, ' + c.n + " answers</span></div>";
    });
    return h + '</div><p class="small">' + esc(calibMessage()) + "</p></section>";
  }

  function calibMessage() {
    var c = P.calib, total = c.low.n + c.med.n + c.high.n;
    if (total < 6) return "Answer a few more case questions to see how well your confidence matches your accuracy.";
    var hi = pctOf(c.high.g, c.high.n), lo = pctOf(c.low.g, c.low.n);
    if (c.high.n >= 3 && hi < 75) return "When you're certain, you're right " + hi + "% of the time. Slow down on the answers that feel obvious: that's where overconfidence hides.";
    if (c.low.n >= 3 && lo >= 60) return "Your guesses are right " + lo + "% of the time. You know more than you think. Trust your reasoning a little more.";
    return "Your confidence tracks your accuracy well.";
  }

  /* ---------- Case rounds ---------- */

  function startCase(id, daily) {
    var c = caseById(id);
    if (!c) return go("home");
    S.run = {
      type: "case", id: id, daily: !!daily, i: 0,
      order: c.stages.map(function (st) { return shuffle(range(st.options.length)); }),
      sel: [], done: false, res: []
    };
    go("case");
  }

  function nextCaseId(excludeId) {
    var pool = RR.cases.filter(function (c) { return c.id !== excludeId && (S.filter === "all" || c.area === S.filter); });
    if (!pool.length) pool = RR.cases.filter(function (c) { return c.id !== excludeId; });
    var unplayed = pool.filter(function (c) { return !P.cases[c.id]; });
    if (unplayed.length) return unplayed[0].id;
    pool = pool.slice().sort(function (a, b) { return P.cases[a.id].best - P.cases[b.id].best; });
    return pool[0].id;
  }

  function stageScore(st, sel) {
    if (st.multi) {
      var correct = st.options.filter(function (o) { return o.ok; }).length;
      var hit = 0, wrong = 0;
      sel.forEach(function (i) { if (st.options[i].ok) hit++; else wrong++; });
      return Math.max(0, Math.round((10 * (hit - wrong)) / correct));
    }
    return st.options[sel[0]].s;
  }

  function viewCase() {
    var r = S.run, c = caseById(r.id), st = c.stages[r.i];
    var steps = '<div class="steps" aria-label="Step ' + (r.i + 1) + " of " + c.stages.length + '">' +
      c.stages.map(function (_, j) { return "<i class=\"" + (j < r.i ? "done" : j === r.i ? "now" : "") + "\"></i>"; }).join("") + "</div>";
    var h = topbar(c.title, steps, "Exit");

    h += '<section class="panel chart"><div class="chart-head"><div class="eyebrow">' + esc(c.setting) + "</div><h2>" + esc(c.patient) + "</h2><p>" + esc(c.intro) + "</p></div>";
    for (var j = 0; j <= r.i; j++) {
      var s = c.stages[j];
      if (s.obs) {
        h += '<div class="monitor" aria-label="Observations">' + s.obs.map(function (o) {
          return '<div><div class="k">' + esc(o[0]) + '</div><div class="n">' + esc(o[1]) + '</div><div class="u">' + esc(o[2] || "") + "</div></div>";
        }).join("") + "</div>";
      }
      if (s.notes) {
        h += '<ul class="notes">' + s.notes.map(function (n) {
          return '<li class="' + (j === r.i ? "new" : "") + '">' + esc(n) + "</li>";
        }).join("") + "</ul>";
      }
    }
    h += "</section>";

    h += '<section class="panel question" id="qpanel"><div class="eyebrow">Step ' + (r.i + 1) + " · " + esc(SKILLS[st.skill]) + "</div>" +
      '<p class="q">' + esc(st.q) + '</p><div class="options">';

    var best = st.multi ? null : Math.max.apply(null, st.options.map(function (o) { return o.s; }));
    r.order[r.i].forEach(function (oi, pos) {
      var o = st.options[oi];
      var picked = r.sel.indexOf(oi) >= 0;
      var cls = "opt" + (st.multi ? " multi" : "");
      if (r.done) {
        if (st.multi) cls += o.ok ? (picked ? " is-best" : " is-part") : (picked ? " is-wrong" : " is-dim");
        else cls += o.s === best ? " is-best" : picked ? (o.s >= 4 ? " is-part" : " is-wrong") : " is-dim";
      }
      var key = st.multi ? (picked || (r.done && o.ok) ? "✓" : "") : String.fromCharCode(65 + pos);
      var note = "";
      if (r.done) {
        var prefix = st.multi && o.ok && !picked ? "Missed. " : "";
        note = '<span class="ofb">' + esc(prefix + o.fb) + "</span>";
      }
      h += '<button class="' + cls + '" data-act="opt" data-i="' + oi + '" aria-pressed="' + picked + '"' + (r.done ? " disabled" : "") + ">" +
        '<span class="key" aria-hidden="true">' + key + "</span><span>" + esc(o.t) + "</span>" + note + "</button>";
    });
    h += "</div>";

    if (!r.done && r.sel.length) {
      h += '<div class="confidence rise"><div class="eyebrow">How sure are you? Choosing locks in your answer.</div><div class="conf-row">' +
        ["low", "med", "high"].map(function (k) {
          return '<button class="btn" data-act="conf" data-c="' + k + '">' + CONF[k].label + "<small>" + CONF[k].sub + "</small></button>";
        }).join("") + "</div></div>";
    } else if (!r.done) {
      h += '<p class="small muted">' + (st.multi ? "Select every option you'd choose, then rate your confidence." : "Choose one answer, then rate your confidence.") + "</p>";
    }

    if (r.done) {
      var res = r.res[r.i];
      var head = { good: "Spot on", part: "Partly there", bad: "Missed it" }[res.grade];
      var biases = [];
      r.sel.forEach(function (i) { var b = st.options[i].bias; if (b && BIASES[b] && biases.indexOf(b) < 0) biases.push(b); });
      h += '<div class="verdict ' + res.grade + ' rise" aria-live="polite"><div class="verdict-head"><strong>' + head + "</strong>" +
        '<span class="mono small">' + res.raw + "/10 · " + CONF[res.conf].label + " · " + signed(res.pts) + " pts</span></div>" +
        biases.map(function (b) { return '<div class="bias"><b>Bias check: ' + esc(BIASES[b][0]) + "</b><br>" + esc(BIASES[b][1]) + "</div>"; }).join("") +
        '<p class="why"><b>Why it matters.</b> ' + esc(st.why) + "</p></div>" +
        '<div class="btn-row"><button class="btn btn-tape" data-act="next">' + (r.i + 1 < c.stages.length ? "Next step →" : "See results →") + "</button></div>";
    }
    return h + "</section>";
  }

  function pickOption(i) {
    var r = S.run, st = caseById(r.id).stages[r.i];
    if (r.done) return;
    if (st.multi) {
      var at = r.sel.indexOf(i);
      if (at >= 0) r.sel.splice(at, 1); else r.sel.push(i);
    } else {
      r.sel = [i];
    }
    var hadConf = !!app.querySelector(".confidence");
    render({ keepScroll: true });
    if (!hadConf) scrollToEl(".confidence");
  }

  function answer(conf) {
    var r = S.run, st = caseById(r.id).stages[r.i];
    if (r.done || !r.sel.length) return;
    var raw = stageScore(st, r.sel);
    var grade = raw >= 8 ? "good" : raw >= 4 ? "part" : "bad";
    var C = CONF[conf];
    var pts = grade === "good" ? Math.round(raw * C.mult) : grade === "part" ? raw : C.miss;
    r.done = true;
    r.res[r.i] = { raw: raw, grade: grade, conf: conf, pts: pts, skill: st.skill };
    addSkill(st.skill, raw, 10);
    P.calib[conf].n++;
    if (grade === "good") P.calib[conf].g++;
    save();
    render({ keepScroll: true });
    scrollToEl(".verdict");
    var nextBtn = app.querySelector('[data-act="next"]');
    if (nextBtn) nextBtn.focus({ preventScroll: true });
  }

  function nextStage() {
    var r = S.run, c = caseById(r.id);
    if (r.i + 1 < c.stages.length) {
      r.i++; r.sel = []; r.done = false;
      render({ keepScroll: true });
      scrollToEl(app.querySelector(".notes li.new") ? ".notes li.new" : "#qpanel", "start");
    } else {
      finishCase();
    }
  }

  function finishCase() {
    var r = S.run, c = caseById(r.id);
    var total = sum(r.res, function (x) { return x.pts; });
    var raw = sum(r.res, function (x) { return x.raw; });
    var pct = Math.round((100 * raw) / (c.stages.length * 10));
    var bonus = 0;
    if (r.daily && P.daily.date !== today()) { bonus = DAILY_BONUS; P.daily.date = today(); }
    var gained = Math.max(0, total) + bonus;
    var before = levelOf(P.xp).i;
    P.xp += gained;
    var rec = P.cases[c.id] || (P.cases[c.id] = { best: 0, plays: 0 });
    rec.plays++;
    rec.best = Math.max(rec.best, pct);
    touchStreak();
    save();
    r.summary = { total: total, pct: pct, xp: gained, bonus: bonus, levelUp: levelOf(P.xp).i > before };
    go("caseEnd");
  }

  function levelUpNote(show) {
    if (!show) return "";
    var lv = levelOf(P.xp).cur;
    return '<p><b>New band:</b> <span class="swatch" style="background:' + lv.color + '"></span>' + esc(lv.band) + " · " + esc(lv.title) + "</p>";
  }

  function viewCaseEnd() {
    var r = S.run, c = caseById(r.id), m = r.summary;
    var h = topbar(c.title);
    h += '<section class="panel"><div class="eyebrow">Case complete</div><div class="result-hero"><div class="bignum">' + m.pct + "<small>% reasoning score</small></div>" +
      '<span class="xp-pill">+' + m.xp + " XP</span></div>" +
      (m.bonus ? '<p class="small muted">Includes the +' + m.bonus + " XP bonus for today's case.</p>" : "") + levelUpNote(m.levelUp) +
      '<div class="stage-list">' + r.res.map(function (x) {
        return "<div><span>" + esc(SKILLS[x.skill]) + '</span><span class="tag">' + CONF[x.conf].label + '</span><span class="mono"><i class="pip ' + x.grade + '"></i>' + signed(x.pts) + "</span></div>";
      }).join("") + "</div></section>";
    h += '<section class="pearl"><div class="eyebrow">Band 6 pearl</div><p>' + esc(c.pearl) + "</p></section>";
    h += '<section class="section"><div class="eyebrow">Further reading</div><ul class="refs">' + c.refs.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></section>";
    h += '<div class="btn-row"><button class="btn btn-tape" data-act="nextCase">Next case →</button><button class="btn" data-act="case" data-id="' + c.id + '">Replay</button><button class="btn" data-act="home">Home</button></div>';
    return h;
  }

  /* ---------- Flag Fast ---------- */

  function viewFlagIntro() {
    var h = topbar("Flag Fast");
    h += '<section class="panel"><div class="eyebrow">60-second round</div><h2>Where does this patient go?</h2>' +
      "<p>Each card is a one-line vignette. Sort it into one of three bins as fast as you safely can. A streak adds bonus points. Calling a same-day emergency ‘manage in physio’ counts as a dangerous miss.</p>" +
      '<div class="bins explain">' + BIN_KEYS.map(function (k, i) {
        return '<div class="bin ' + k + '"><span class="kbd">Key ' + (i + 1) + "</span>" + esc(BINS[k].label) + "<small>" + esc(BINS[k].sub) + "</small></div>";
      }).join("") + "</div>" +
      '<p class="small muted">Your best: ' + P.flag.best + " points from " + P.flag.plays + " rounds.</p>" +
      '<div class="btn-row"><button class="btn btn-tape" data-act="flagStart">Start the clock</button></div></section>';
    return h;
  }

  function flagStart() {
    S.run = {
      type: "flag", deck: shuffle(range(RR.flags.length)), pos: 0, score: 0, streak: 0, bestStreak: 0,
      answers: [], endsAt: Date.now() + FLAG_SECONDS * 1000, lock: false, fx: null, timer: null
    };
    go("flagPlay");
    flagTick();
  }

  function flagItem(r) { return RR.flags[r.deck[r.pos % r.deck.length]]; }

  function viewFlagPlay() {
    var r = S.run;
    var left = Math.max(0, Math.ceil((r.endsAt - Date.now()) / 1000));
    var it = flagItem(r);
    var last = r.answers[r.answers.length - 1];
    var flash = "";
    if (r.fx === "hit") flash = '<span class="flash">Correct ' + signed(last.pts) + "</span>";
    if (r.fx === "miss") flash = '<span class="flash">It was: ' + esc(BINS[RR.flags[last.idx].a].label) + "</span>";
    var shown = r.fx ? RR.flags[last.idx] : it;
    var h = '<div class="topbar"><button class="btn btn-ghost" data-act="flagQuit">← Stop</button><div class="grow"><div class="ttl">Flag Fast</div></div>' +
      '<span class="mono"><b id="ff-left">' + left + "</b>s</span></div>" +
      '<div class="timer" aria-hidden="true"><i id="ff-bar" style="width:' + (100 * left) / FLAG_SECONDS + '%"></i></div>' +
      '<div class="hud"><span class="mono">Score <b>' + r.score + '</b></span><span class="mono">Streak <b>' + r.streak + "</b></span></div>" +
      '<div class="flagcard ' + (r.fx || "") + '" aria-live="polite">' + flash + "<span>" + esc(shown.t) + "</span></div>" +
      '<div class="bins">' + BIN_KEYS.map(function (k, i) {
        return '<button class="bin ' + k + '" data-act="bin" data-b="' + k + '"' + (r.lock ? " disabled" : "") + '><span class="kbd">' + (i + 1) + "</span>" + esc(BINS[k].label) + "</button>";
      }).join("") + "</div>";
    return h;
  }

  function flagTick() {
    var r = S.run;
    if (!r || r.type !== "flag" || S.view !== "flagPlay") return;
    var ms = Math.max(0, r.endsAt - Date.now());
    var secs = Math.ceil(ms / 1000);
    var el = document.getElementById("ff-left");
    var bar = document.getElementById("ff-bar");
    if (el) el.textContent = secs;
    if (bar) bar.style.width = (100 * ms) / (FLAG_SECONDS * 1000) + "%";
    if (ms <= 0) { flagEnd(); return; }
    r.timer = setTimeout(flagTick, 200);
  }

  function flagAnswer(bin) {
    var r = S.run;
    if (!r || r.lock || S.view !== "flagPlay") return;
    var idx = r.deck[r.pos % r.deck.length];
    var ok = bin === RR.flags[idx].a;
    var pts = 0;
    if (ok) { r.streak++; pts = 10 + Math.min(r.streak - 1, 5) * 2; r.score += pts; } else { r.streak = 0; }
    r.bestStreak = Math.max(r.bestStreak, r.streak);
    r.answers.push({ idx: idx, pick: bin, ok: ok, pts: pts });
    r.fx = ok ? "hit" : "miss";
    r.lock = true;
    render({ keepScroll: true });
    setTimeout(function () {
      if (S.run !== r || S.view !== "flagPlay") return;
      r.pos++;
      if (r.pos % r.deck.length === 0) r.deck = shuffle(r.deck);
      r.fx = null; r.lock = false;
      render({ keepScroll: true });
    }, ok ? 450 : 1400);
  }

  function flagEnd() {
    var r = S.run;
    clearTimeout(r.timer);
    var n = r.answers.length, right = r.answers.filter(function (a) { return a.ok; }).length;
    var danger = r.answers.filter(function (a) { return !a.ok && RR.flags[a.idx].a === "now" && a.pick === "manage"; }).length;
    var gained = Math.round(r.score / 4);
    var before = levelOf(P.xp).i;
    var newBest = r.score > P.flag.best;
    P.flag.plays++;
    P.flag.best = Math.max(P.flag.best, r.score);
    r.answers.forEach(function (a) { addSkill("flags", a.ok ? 4 : 0, 4); });
    P.xp += gained;
    if (n) touchStreak();
    save();
    r.summary = { n: n, right: right, danger: danger, xp: gained, newBest: newBest && r.score > 0, levelUp: levelOf(P.xp).i > before };
    go("flagEnd");
  }

  function viewFlagEnd() {
    var r = S.run, m = r.summary;
    var h = topbar("Flag Fast");
    h += '<section class="panel"><div class="eyebrow">Round over' + (m.newBest ? " · new best" : "") + '</div><div class="result-hero"><div class="bignum">' + r.score + "<small> points</small></div>" +
      '<span class="xp-pill">+' + m.xp + " XP</span></div>" +
      '<p class="mono small">' + m.right + "/" + m.n + " correct · " + (m.n ? Math.round((100 * m.right) / m.n) : 0) + "% accuracy · best streak " + r.bestStreak + "</p>" + levelUpNote(m.levelUp) +
      (m.danger ? '<div class="alert"><b>' + m.danger + " dangerous " + (m.danger === 1 ? "miss" : "misses") + ".</b> A same-day emergency was sorted as ‘manage in physio’. Review these first.</div>" : "") +
      "</section>";
    var misses = r.answers.filter(function (a) { return !a.ok; });
    if (misses.length) {
      h += '<section class="section"><h3>Review your misses</h3><div class="review">' + misses.map(function (a) {
        var it = RR.flags[a.idx];
        var danger = it.a === "now" && a.pick === "manage";
        return '<div class="item' + (danger ? " danger" : "") + '"><p>' + esc(it.t) + '</p><div class="ans"><span>You: <span class="lbl-' + a.pick + '">' + esc(BINS[a.pick].label) + "</span></span>" +
          '<span>Answer: <span class="lbl-' + it.a + '">' + esc(BINS[it.a].label) + '</span></span></div><p class="small muted">' + esc(it.why) + "</p></div>";
      }).join("") + "</div></section>";
    } else if (m.n) {
      h += '<p class="muted">No misses this round.</p>';
    }
    h += '<div class="btn-row"><button class="btn btn-tape" data-act="flagStart">Play again</button><button class="btn" data-act="home">Home</button></div>';
    return h;
  }

  /* ---------- Caseload ---------- */

  function startCl(id) {
    var sc = clById(id);
    if (!sc) return go("home");
    S.run = { type: "cl", id: id, step: "intro", order: shuffle(sc.pts.map(function (p) { return p.id; })), rank: {}, alloc: {} };
    go("cl");
  }

  function nextClId() {
    var pool = RR.caseload.slice().sort(function (a, b) {
      var pa = P.cl[a.id] ? P.cl[a.id].plays : 0, pb = P.cl[b.id] ? P.cl[b.id].plays : 0;
      return pa - pb;
    });
    return pool[0].id;
  }

  function tierRange(sc, p) {
    var lo = 1 + sc.pts.filter(function (q) { return q.tier < p.tier; }).length;
    var hi = sc.pts.filter(function (q) { return q.tier <= p.tier; }).length;
    return [lo, hi];
  }

  function roleLabel(sc, k) {
    var r = sc.roles.filter(function (x) { return x.k === k; })[0];
    return r ? r.label : k;
  }

  function scoreCl(sc, r) {
    var rows = sc.pts.map(function (p) {
      var rg = tierRange(sc, p), rk = r.rank[p.id];
      var rp = rk >= rg[0] && rk <= rg[1] ? 10 : rk === rg[0] - 1 || rk === rg[1] + 1 ? 5 : 0;
      var ap = p.best.indexOf(r.alloc[p.id]) >= 0 ? 10 : p.ok.indexOf(r.alloc[p.id]) >= 0 ? 5 : 0;
      return { p: p, rg: rg, rk: rk, rp: rp, ap: ap };
    });
    var got = sum(rows, function (x) { return x.rp + x.ap; });
    return { rows: rows, pct: Math.round((100 * got) / (rows.length * 20)), criticalMissed: r.rank[sc.critical] !== 1 };
  }

  function viewCaseload() {
    var r = S.run, sc = clById(r.id);
    var h = topbar(sc.title, "", "Exit");
    if (r.step === "intro") {
      h += '<section class="panel"><div class="eyebrow">Caseload · ' + esc(sc.setting) + "</div><h2>" + esc(sc.title) + "</h2><p>" + esc(sc.brief) + "</p>" +
        '<p class="small muted">Step 1: rank the patients in the order you would see them. Step 2: choose who sees each one. Patients of equal priority can go in either order.</p>' +
        '<div class="chips">' + sc.roles.map(function (x) { return '<span class="tag">' + esc(x.label) + "</span>"; }).join("") + "</div>" +
        '<div class="btn-row"><button class="btn btn-tape" data-act="clStep" data-s="rank">Start ranking</button></div></section>';
      return h;
    }
    if (r.step === "rank") {
      var n = Object.keys(r.rank).length;
      h += '<section class="section"><div class="eyebrow">Step 1 of 2 · Prioritise</div><h2>Who do you see first?</h2>' +
        '<p class="muted">Tap patients in the order you would see them. Tap a numbered patient to undo.</p><div class="pts">' +
        r.order.map(function (pid) {
          var p = sc.pts.filter(function (q) { return q.id === pid; })[0];
          var rk = r.rank[pid];
          return '<button class="pt' + (rk ? " ranked" : "") + '" data-act="clRank" data-p="' + pid + '" aria-pressed="' + !!rk + '"><span class="rank">' + (rk || "") + '</span><span class="nm">' + esc(p.name) + '</span><span class="inf">' + esc(p.info) + "</span></button>";
        }).join("") + '</div><div class="btn-row"><button class="btn btn-tape" data-act="clStep" data-s="assign"' + (n < sc.pts.length ? " disabled" : "") + ">Next: allocate →</button>" +
        '<button class="btn" data-act="clClear"' + (n ? "" : " disabled") + ">Clear order</button></div></section>";
      return h;
    }
    var ordered = sc.pts.slice().sort(function (a, b) { return r.rank[a.id] - r.rank[b.id]; });
    if (r.step === "assign") {
      var done = ordered.every(function (p) { return r.alloc[p.id]; });
      h += '<section class="section"><div class="eyebrow">Step 2 of 2 · Delegate</div><h2>Who sees each patient?</h2>' +
        '<p class="muted">Match each patient to the right person or decision.</p><div class="pts">' +
        ordered.map(function (p) {
          return '<div class="pt ranked"><span class="rank">' + r.rank[p.id] + '</span><span class="nm">' + esc(p.name) + '</span><span class="inf">' + esc(p.info) + "</span>" +
            '<div class="chips roles" role="group" aria-label="Allocate ' + esc(p.name) + '">' + sc.roles.map(function (x) {
              return '<button class="chip" data-act="clAlloc" data-p="' + p.id + '" data-r="' + x.k + '" aria-pressed="' + (r.alloc[p.id] === x.k) + '">' + esc(x.label) + "</button>";
            }).join("") + "</div></div>";
        }).join("") + '</div><div class="btn-row"><button class="btn btn-tape" data-act="clSubmit"' + (done ? "" : " disabled") + ">Submit plan</button>" +
        '<button class="btn" data-act="clStep" data-s="rank">← Back to ranking</button></div></section>';
      return h;
    }
    var m = r.summary;
    h += '<section class="panel"><div class="eyebrow">Caseload reviewed</div><div class="result-hero"><div class="bignum">' + m.pct + "<small>% match</small></div>" +
      '<span class="xp-pill">+' + m.xp + " XP</span></div>" + levelUpNote(m.levelUp) +
      (m.criticalMissed ? '<div class="alert"><b>Safety check:</b> your first patient wasn\'t the most unwell one. The sickest, most unstable patient comes first.</div>' : "") + "</section>";
    h += '<div class="pts">' + m.rows.slice().sort(function (a, b) { return a.rk - b.rk; }).map(function (x) {
      var p = x.p;
      var cls = function (v) { return v === 10 ? "ok-good" : v === 5 ? "ok-part" : "ok-bad"; };
      var exp = x.rg[0] === x.rg[1] ? "#" + x.rg[0] : "#" + x.rg[0] + "–" + x.rg[1];
      return '<div class="pt ranked"><span class="rank">' + x.rk + '</span><span class="nm">' + esc(p.name) + '</span><span class="inf">' + esc(p.info) + "</span>" +
        '<div class="res"><div class="ln"><span class="' + cls(x.rp) + '">Order</span><span>You #' + x.rk + " · Expert " + exp + "</span></div>" +
        '<div class="ln"><span class="' + cls(x.ap) + '">Allocation</span><span>You: ' + esc(roleLabel(sc, r.alloc[p.id])) + " · Best: " + esc(p.best.map(function (k) { return roleLabel(sc, k); }).join(" or ")) + "</span></div>" +
        '<p class="muted">' + esc(p.why) + "</p></div></div>";
    }).join("") + "</div>";
    h += '<div class="btn-row"><button class="btn btn-tape" data-act="nextCl">Next scenario →</button><button class="btn" data-act="cl" data-id="' + sc.id + '">Replay</button><button class="btn" data-act="home">Home</button></div>';
    return h;
  }

  function clRank(pid) {
    var r = S.run;
    if (r.rank[pid]) {
      var k = r.rank[pid];
      delete r.rank[pid];
      Object.keys(r.rank).forEach(function (q) { if (r.rank[q] > k) r.rank[q]--; });
    } else {
      r.rank[pid] = Object.keys(r.rank).length + 1;
    }
    render({ keepScroll: true });
  }

  function clSubmit() {
    var r = S.run, sc = clById(r.id);
    var res = scoreCl(sc, r);
    res.rows.forEach(function (x) { addSkill("priority", x.rp, 10); addSkill("priority", x.ap, 10); });
    var gained = Math.round(res.pct / 2);
    var before = levelOf(P.xp).i;
    P.xp += gained;
    var rec = P.cl[sc.id] || (P.cl[sc.id] = { best: 0, plays: 0 });
    rec.plays++;
    rec.best = Math.max(rec.best, res.pct);
    touchStreak();
    save();
    r.summary = { rows: res.rows, pct: res.pct, criticalMissed: res.criticalMissed, xp: gained, levelUp: levelOf(P.xp).i > before };
    r.step = "result";
    render();
  }

  /* ---------- Practise weakest ---------- */

  function practiseWeakest() {
    var worst = null;
    Object.keys(SKILLS).forEach(function (k) {
      var s = P.skills[k];
      var v = s && s.m ? s.g / s.m : -1;
      if (!worst || v < worst.v) worst = { k: k, v: v };
    });
    if (worst.k === "priority") return startCl(nextClId());
    var pool = RR.cases.filter(function (c) { return c.stages.some(function (st) { return st.skill === worst.k; }); });
    pool.sort(function (a, b) {
      var ba = P.cases[a.id] ? P.cases[a.id].best : -1, bb = P.cases[b.id] ? P.cases[b.id].best : -1;
      return ba - bb;
    });
    startCase(pool[0].id);
  }

  /* ---------- Events ---------- */

  app.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]");
    if (!el || el.disabled) return;
    var d = el.dataset;
    switch (d.act) {
      case "home":
        if (S.run && S.run.timer) clearTimeout(S.run.timer);
        S.run = null; S.confirmReset = false; go("home"); break;
      case "filter": S.filter = d.f; render({ keepScroll: true }); break;
      case "daily": startCase(dailyCase().id, true); break;
      case "case": startCase(d.id); break;
      case "nextCase": startCase(nextCaseId(S.run && S.run.type === "case" ? S.run.id : null)); break;
      case "opt": pickOption(Number(d.i)); break;
      case "conf": answer(d.c); break;
      case "next": nextStage(); break;
      case "flagIntro": S.run = null; go("flagIntro"); break;
      case "flagStart": flagStart(); break;
      case "bin": flagAnswer(d.b); break;
      case "flagQuit": flagEnd(); break;
      case "cl": startCl(d.id); break;
      case "nextCl": startCl(nextClId()); break;
      case "clStep": S.run.step = d.s; render(); break;
      case "clRank": clRank(d.p); break;
      case "clClear": S.run.rank = {}; render({ keepScroll: true }); break;
      case "clAlloc": S.run.alloc[d.p] = d.r; render({ keepScroll: true }); break;
      case "clSubmit": clSubmit(); break;
      case "weakest": practiseWeakest(); break;
      case "reset": S.confirmReset = true; render({ keepScroll: true }); break;
      case "resetNo": S.confirmReset = false; render({ keepScroll: true }); break;
      case "resetYes":
        P = blank(); S.confirmReset = false; save(); render(); break;
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var n = Number(e.key);
    if (S.view === "flagPlay" && n >= 1 && n <= 3) { e.preventDefault(); flagAnswer(BIN_KEYS[n - 1]); return; }
    if (S.view === "case" && S.run) {
      var st = caseById(S.run.id).stages[S.run.i];
      if (!S.run.done && n >= 1 && n <= st.options.length) { e.preventDefault(); pickOption(S.run.order[S.run.i][n - 1]); }
    }
  });

  /* ---------- Boot ---------- */

  // Keeps an in-progress case or caseload across a live page update.
  // A Flag Fast round is timed, so it restarts at its intro screen.
  function snapshot() {
    var keep = S.run && S.run.type !== "flag";
    return { view: S.view, filter: S.filter, run: keep ? JSON.parse(JSON.stringify(S.run)) : null };
  }

  function start(data) {
    var snap = data && data.view ? data : null;
    if (snap) {
      S.filter = AREAS[snap.filter] ? snap.filter : "all";
      var run = snap.run;
      if (run && run.type === "case" && caseById(run.id) && (snap.view === "case" || snap.view === "caseEnd")) {
        S.run = run; S.view = snap.view;
      } else if (run && run.type === "cl" && clById(run.id) && snap.view === "cl") {
        S.run = run; S.view = "cl";
      } else if (/^flag/.test(snap.view)) {
        S.view = "flagIntro";
      }
    }
    render();
    Sync.init();
  }

  var hot = window.claude && window.claude.hot;
  if (hot && typeof hot.snapshot === "function") {
    try { hot.snapshot(snapshot); } catch (e) { /* hot reload unavailable */ }
  }
  if (hot && typeof hot.ready === "function") hot.ready(start);
  else start((hot && hot.data) || {});
})();
