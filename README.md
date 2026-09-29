# Reasoning Rounds

An MSK clinical reasoning game for physiotherapists working towards, or at, Band 6 level. It's built for short sessions: most rounds take 1 to 5 minutes, on a phone or a computer.

## How to play

| Mode | Time | What you practise |
| --- | --- | --- |
| **Case Rounds** | 3–5 min | Work an MSK patient from referral to plan. New findings appear as the case unfolds. At each step you pick an answer, then say how sure you are. |
| **Flag Fast** | 60 s | Sort one-line vignettes into *same-day escalation*, *refer on* or *manage in physio*. Streaks earn bonus points. Sending an emergency to ‘manage’ counts as a dangerous miss. |
| **Caseload** | 3 min | Triage a referral pile or a busy clinic morning by priority, then allocate each item: same day, urgent, routine or another service, or to yourself, a Band 5, an assistant, an advanced practitioner or a group class. |

**Confidence scoring.** In Case Rounds, choosing *Certain* multiplies a right answer by 1.25 but costs 4 points if you're wrong. *Guessing* is safe but scores less. Your profile shows how often you're right at each confidence level, which is a quick check on overconfidence.

**Bias checks.** Some wrong answers are tagged with the cognitive bias they represent (anchoring, premature closure, framing and others), so you learn to spot the pattern, not just the fact.

**Progress.** You earn XP and move up through resistance-band colours, from Tan (first MSK placement) to Gold (consultant MSK physio). A daily case gives bonus XP and keeps your streak going. The reasoning profile tracks eight skills: red flags and serious pathology, generating hypotheses, choosing tests, interpreting findings, beliefs and psychosocial factors, management, triage and delegation, and referral and communication.

## Content

- 17 branching MSK cases, filterable by region:
  - **Spine:** cauda equina, metastatic cord compression, cervical myelopathy, cervical radiculopathy, psychosocial low back pain, axial SpA (reviewing a Band 5's stuck case)
  - **Upper limb:** frozen shoulder, rotator cuff related shoulder pain, lateral elbow tendinopathy, scaphoid fracture
  - **Lower limb:** ACL and locked knee, Achilles rupture, gluteal tendinopathy, knee OA, ankle sprain and the Ottawa rules
  - **Inflammatory and persistent pain:** early inflammatory arthritis, persistent widespread pain
- 43 MSK red flag vignettes
- 4 caseload scenarios (two referral piles, a clinic morning, new patient allocation)

Each case ends with a *Band 6 pearl* and references to the guidance it draws on (NICE, GIRFT, BESS and key trials such as CSAW, KANON, LEAP and STarT Back).

> For education and reflection only. Scenarios are simplified. Always follow your local policies and current national guidance.

## Running it

No install needed. Open `index.html` in a browser.

To put it online for free, turn on **GitHub Pages** for this repository (Settings → Pages → deploy from the `main` branch, root folder). Then open the link on your phone and add it to your home screen.

To make a single self-contained file you can send to your phone or use offline:

```sh
npm run build   # writes dist/reasoning-rounds.html
```

Progress is saved in the browser you play in.

## Adding your own cases

Content lives in `js/content/`. `msk.js` and `regional.js` add cases, `flags.js` adds Flag Fast vignettes, and `caseload.js` adds caseload scenarios. The schema is described at the top of `msk.js`, `flags.js` and `caseload.js`. A case looks like this:

```js
RR.cases.push({
  id: "msk-example",            // unique
  title: "Short, memorable name",
  area: "spine",                // spine | upper | lower | whole
  setting: "MSK outpatients",
  mins: 4,
  patient: "Name, age, context",
  intro: "The referral or first thing you learn.",
  stages: [
    {
      skill: "hypothesis",      // flags | hypothesis | assessment | interpret | person | manage | priority | escalate
      notes: ["New information revealed at this step"],
      obs: [["Grip", "18 kg", "left 32 kg"]],   // optional readout tiles for measurements
      q: "The question",
      options: [
        { t: "Best answer", s: 10, fb: "Why it's right" },
        { t: "Partly right", s: 5, fb: "What's missing" },
        { t: "Wrong", s: 0, fb: "Why not", bias: "anchoring" }
      ],
      why: "The teaching point shown after answering"
    }
    // For select-all-that-apply steps, add multi: true and give options ok: true/false instead of s.
  ],
  pearl: "One practical takeaway",
  refs: ["Guideline or paper"]
});
```

Then check your content:

```sh
npm test
```

The validator catches missing fields, duplicate ids, steps without exactly one best answer, and caseload scenarios where the most urgent item isn't clearly first.
