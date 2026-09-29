# Reasoning Rounds

A clinical reasoning game for physiotherapists working towards, or at, Band 6 level. It's built for short sessions: most rounds take 1 to 5 minutes, on a phone or a computer.

## How to play

| Mode | Time | What you practise |
| --- | --- | --- |
| **Case Rounds** | 3–5 min | Work a patient from referral to plan. New findings appear as the case unfolds. At each step you pick an answer, then say how sure you are. |
| **Flag Fast** | 60 s | Sort one-line vignettes into *same-day escalation*, *refer on* or *manage in physio*. Streaks earn bonus points. Sending an emergency to ‘manage’ counts as a dangerous miss. |
| **Caseload** | 3 min | Rank a list of referrals by priority, then allocate each one to yourself, a Band 5, an assistant, or no physio. |

**Confidence scoring.** In Case Rounds, choosing *Certain* multiplies a right answer by 1.25 but costs 4 points if you're wrong. *Guessing* is safe but scores less. Your profile shows how often you're right at each confidence level, which is a quick check on overconfidence.

**Bias checks.** Some wrong answers are tagged with the cognitive bias they represent (anchoring, premature closure, framing and others), so you learn to spot the pattern, not just the fact.

**Progress.** You earn XP and move up through resistance-band colours, from Tan (first placement) to Gold (consultant). A daily case gives bonus XP and keeps your streak going. The reasoning profile tracks seven skills: red flags, hypotheses, assessment choice, interpretation, management, prioritisation, and escalation.

## Content

- 15 branching cases across MSK, respiratory and on-call, neuro, ortho and frailty, and leadership
- 40 red flag vignettes
- 4 caseload scenarios (surgical ward, on-call, MSK triage, stroke unit)

Each case ends with a *Band 6 pearl* and references to the guidance it draws on (NICE, BTS, GIRFT, BESS and key trials).

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

Content lives in `js/content/`. Each file adds to `RR.cases`, `RR.flags` or `RR.caseload`. The schema is described at the top of `js/content/msk.js`, `flags.js` and `caseload.js`. A case looks like this:

```js
RR.cases.push({
  id: "msk-example",            // unique
  title: "Short, memorable name",
  area: "msk",                  // msk | resp | neuro | ortho | lead
  setting: "MSK outpatients",
  mins: 4,
  patient: "Name, age, context",
  intro: "The referral or first thing you learn.",
  stages: [
    {
      skill: "hypothesis",      // flags | hypothesis | assessment | interpret | manage | priority | escalate
      notes: ["New information revealed at this step"],
      obs: [["SpO2", "94%", "room air"]],   // optional monitor readouts
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

The validator catches missing fields, duplicate ids, steps without exactly one best answer, and caseload scenarios where the sickest patient isn't clearly first.
