/* Respiratory and on-call cases. Schema: see msk.js. */
window.RR = window.RR || { cases: [], flags: [], caseload: [] };

RR.cases.push(
  {
    id: "resp-postop",
    title: "The 2am bleep",
    area: "resp",
    setting: "Respiratory on-call",
    mins: 5,
    patient: "Frank, 72, day 1 after open right hemicolectomy",
    intro: "Ex-smoker (40 pack-years), no lung disease diagnosed. The surgical nurse bleeps you at 02:00.",
    stages: [
      {
        skill: "priority",
        notes: ["Nurse: ‘His sats have dropped from 95% on 2 litres to 90% on 4 litres over 3 hours. He's got a wet cough but can't clear it. He sounds rattly.’"],
        q: "Is this an appropriate on-call?",
        options: [
          { t: "Yes. Worsening oxygenation with sputum he can't clear is physio-amenable and can't wait. Attend, and ask the nurse to inform the medical team about the rising O2 requirement.", s: 10, fb: "Correct. A physio-amenable problem that will get worse by morning, with medical review in parallel." },
          { t: "No. The day team can see him at 08:30.", s: 0, fb: "Six more hours of retained secretions risks further collapse and hypoxaemia." },
          { t: "Only if a doctor has requested it", s: 4, fb: "Most trusts accept on-call referrals from nurses. The problem decides, not the job title." },
          { t: "Yes, but only once an ABG has been done", s: 3, fb: "Useful information, but it shouldn't hold up treating an obvious retention problem." }
        ],
        why: "On-call test: is there a problem physio can change, and will it get worse if it waits until morning? Rising O2 need also needs medical review, whatever you do."
      },
      {
        skill: "interpret",
        obs: [["SpO2", "90%", "4 L NC"], ["RR", "26", "/min"], ["HR", "104", "bpm"], ["BP", "128/76", "mmHg"], ["Temp", "37.6", "°C"]],
        notes: [
          "Weak, wet, ineffective cough. ‘It hurts to cough.’ PCA not being used much.",
          "Auscultation: reduced breath sounds and coarse crackles, right base.",
          "CXR: raised right hemidiaphragm, right lower zone volume loss.",
          "ABG on 4 L: pH 7.44, PaCO2 4.6 kPa, PaO2 7.9 kPa, HCO3 24, BE 0."
        ],
        q: "How do you interpret the ABG?",
        options: [
          { t: "Type 1 respiratory failure", s: 10, fb: "Correct. PaO2 below 8 kPa with a normal-to-low PaCO2." },
          { t: "Type 2 respiratory failure", s: 0, fb: "PaCO2 isn't raised." },
          { t: "Compensated metabolic acidosis", s: 0, fb: "pH, HCO3 and base excess are all normal." },
          { t: "Acceptable gas for day 1 after surgery", s: 0, fb: "A PaO2 of 7.9 kPa on 4 litres is not acceptable." }
        ],
        why: "Type 1: PaO2 < 8 kPa, PaCO2 normal or low. Type 2: PaO2 < 8 kPa with PaCO2 > 6 kPa. Always read the PaO2 against the oxygen they're on."
      },
      {
        skill: "hypothesis",
        multi: true,
        q: "Which problems are most likely driving his hypoxaemia? Select all that apply.",
        options: [
          { t: "Sputum retention with an ineffective cough", ok: true, fb: "Yes." },
          { t: "Loss of lung volume (right lower lobe atelectasis) from pain, lying supine and reduced mobility", ok: true, fb: "Yes. Classic after upper abdominal surgery." },
          { t: "Poorly controlled pain limiting deep breaths and cough", ok: true, fb: "Yes. And it's fixable." },
          { t: "Acute pulmonary oedema", ok: false, fb: "Worth considering, but a one-sided picture with a wet cough on day 1 after a laparotomy fits retention and volume loss." },
          { t: "Bronchospasm", ok: false, fb: "No wheeze, no history." }
        ],
        why: "Build a problem list of physio-amenable problems: volume loss, sputum retention, poor cough. Then treat the cause of each."
      },
      {
        skill: "manage",
        q: "What's your first-line plan?",
        options: [
          { t: "Optimise analgesia first (with the nurse), then sit him up or into left side-lying, ACBT with wound support for huffs and cough, humidified oxygen, and sit out or mobilise if safe", s: 10, fb: "Correct. Analgesia makes everything else possible. Affected side up helps V/Q matching and drainage." },
          { t: "Nasopharyngeal suction straight away", s: 3, fb: "Invasive. Keep it for when he can't clear despite other techniques." },
          { t: "Head-down tilt with percussion", s: 2, fb: "Head-down after abdominal surgery is poorly tolerated and rarely needed. Percussion isn't first-line here." },
          { t: "Leave an incentive spirometer and review in the morning", s: 2, fb: "Doesn't address the retained secretions tonight." }
        ],
        why: "Position for the problem: with right lower lobe volume loss, lying on the left with the right side up improves ventilation to the affected lung and aids drainage."
      },
      {
        skill: "escalate",
        notes: ["After 30 minutes he clears a moderate amount of thick yellow sputum. SpO2 94% on 3 L, RR 22."],
        q: "What's your next step?",
        options: [
          { t: "Document, hand over a plan to the nurse (positioning, hourly supported cough, sit out in the morning), send a sputum sample, update the medical team about possible infection, and hand over to the day team", s: 10, fb: "Correct. The treatment works overnight only if the ward can continue it." },
          { t: "Leave. Problem solved.", s: 2, fb: "Without a plan and a handover, the secretions will build up again." },
          { t: "Stay until he's off oxygen", s: 0, fb: "Not a reasonable goal tonight, and other patients may need you." },
          { t: "Ask for him to be moved to HDU", s: 2, fb: "He's improving. That's a medical decision, and nothing here suggests it's needed." }
        ],
        why: "On-call work ends with a handover: what you found, what you did, what the ward should do and when to call again."
      }
    ],
    pearl: "Ask what the physio-amenable problem is before choosing a technique. Hypoxaemia alone is not a physio problem. Sputum retention, volume loss and a poor cough are.",
    refs: ["BTS Guideline for oxygen use in healthcare and emergency settings (2017)", "Royal College of Physicians: NEWS2 (2017)"]
  },

  {
    id: "resp-copd",
    title: "Good sats, bad sign",
    area: "resp",
    setting: "Respiratory ward",
    mins: 4,
    patient: "Maureen, 69, COPD (FEV1 38% predicted)",
    intro: "Admitted yesterday with an infective exacerbation. Referred for ‘sputum clearance’. Prescribed oxygen target: 88–92%.",
    stages: [
      {
        skill: "flags",
        obs: [["SpO2", "97%", "4 L NC"], ["RR", "14", "/min"], ["HR", "98", "bpm"], ["ACVPU", "V", "new"]],
        notes: ["Drowsy but rousable to voice. Her daughter says she's ‘not herself’. Crackles both bases."],
        q: "What's your most important concern on arrival?",
        options: [
          { t: "Drowsiness with SpO2 above her target range. Possible hypercapnia from too much oxygen.", s: 10, fb: "Correct. A new drop in consciousness plus oxygen above target is a warning sign." },
          { t: "Sputum retention", s: 4, fb: "It's why you were called, but it isn't the priority now.", bias: "framing" },
          { t: "She's tired after a bad night. Come back later.", s: 0, fb: "New drowsiness is a NEWS2 red score. Don't walk away from it." },
          { t: "SpO2 97% is reassuring", s: 0, fb: "Her target is 88–92%. 97% is above it." }
        ],
        why: "In people at risk of hypercapnic respiratory failure, excess oxygen can raise CO2 through V/Q mismatch, the Haldane effect and loss of hypoxic vasoconstriction."
      },
      {
        skill: "interpret",
        notes: ["ABG on 4 L: pH 7.28, PaCO2 8.9 kPa, PaO2 11.2 kPa, HCO3 31, BE +6."],
        q: "How do you interpret the ABG?",
        options: [
          { t: "Acute-on-chronic type 2 respiratory failure: respiratory acidosis with partial metabolic compensation", s: 10, fb: "Correct. Raised HCO3 shows long-standing CO2 retention. The low pH shows an acute rise on top." },
          { t: "Fully compensated chronic type 2 respiratory failure", s: 3, fb: "The pH is abnormal, so it's not fully compensated." },
          { t: "Metabolic alkalosis", s: 0, fb: "The pH is acidotic." },
          { t: "Type 1 respiratory failure", s: 0, fb: "PaCO2 is high." }
        ],
        why: "Read pH, then PaCO2, then HCO3. Acidosis plus high CO2 means a respiratory cause. A raised HCO3 means the kidneys have been compensating for days."
      },
      {
        skill: "escalate",
        q: "What do you do first?",
        options: [
          { t: "Reduce oxygen within the prescription to reach 88–92% (e.g. a 24–28% Venturi) and escalate urgently to the medical team. She should be considered for NIV.", s: 10, fb: "Correct. Controlled oxygen, plus a medical review for NIV." },
          { t: "Stop the oxygen to make her breathe", s: 0, fb: "Dangerous. Abruptly stopping oxygen causes rebound hypoxaemia." },
          { t: "ACBT to clear sputum, then reassess", s: 2, fb: "Her immediate problem is ventilatory failure, not secretions." },
          { t: "Increase the oxygen because she's drowsy", s: 0, fb: "This would make the hypercapnia worse." }
        ],
        why: "BTS/ICS guidance: consider NIV when pH < 7.35 and PaCO2 > 6.5 kPa persist despite optimal medical treatment. Nasal cannula FiO2 is imprecise. A Venturi mask gives controlled oxygen."
      },
      {
        skill: "manage",
        notes: ["NIV started (IPAP 20, EPAP 5). An hour later she's more alert, with a wet cough she struggles to clear."],
        q: "What's your approach?",
        options: [
          { t: "Short airway clearance (positioning, ACBT, supported huff) during a planned NIV break or with NIV in place, keeping SpO2 in target, timed with the team, then straight back on NIV", s: 10, fb: "Correct. Coordinated, brief and monitored." },
          { t: "Take her off NIV for an hour of treatment", s: 2, fb: "Far too long. She could decompensate." },
          { t: "No physio. It's contraindicated on NIV.", s: 0, fb: "Airway clearance is often needed on NIV. It just needs planning." },
          { t: "Wait until she's off NIV completely", s: 2, fb: "Retained secretions can cause NIV to fail." }
        ],
        why: "Humidification and well-timed airway clearance help NIV succeed. Agree the timing with nursing and medical staff."
      }
    ],
    pearl: "Read the prescription, not just the sats. A ‘good’ SpO2 of 97% in someone with a target of 88–92% is a warning sign, not reassurance.",
    refs: ["BTS Guideline for oxygen use in healthcare and emergency settings (2017)", "BTS/ICS Guideline: ventilatory management of acute hypercapnic respiratory failure (2016)"]
  },

  {
    id: "resp-icu",
    title: "Yesterday's plan",
    area: "resp",
    setting: "Critical care on-call",
    mins: 4,
    patient: "Sam, 34, day 3 ventilated after a road traffic collision",
    intro: "Multiple left rib fractures, left chest drain for a pneumothorax. Referral: left lower lobe collapse on CXR, FiO2 up from 0.35 to 0.5. PEEP 8.",
    stages: [
      {
        skill: "interpret",
        notes: ["This morning's CXR report: left lower lobe collapse; left drain in situ; NEW small right apical pneumothorax (undrained)."],
        multi: true,
        q: "Which techniques should you avoid right now? Select all that apply.",
        options: [
          { t: "Manual hyperinflation (MHI)", ok: true, fb: "Yes. An undrained pneumothorax is a contraindication." },
          { t: "Ventilator hyperinflation (VHI)", ok: true, fb: "Yes. Same concern: higher pressures could enlarge the pneumothorax." },
          { t: "Percussion over the left chest", ok: true, fb: "Yes. Avoid percussion over rib fractures." },
          { t: "Positioning", ok: false, fb: "Usually still possible with care." },
          { t: "Closed suction", ok: false, fb: "Still available." }
        ],
        why: "Re-read the latest imaging before every treatment. An undrained pneumothorax changes what's safe."
      },
      {
        skill: "escalate",
        q: "What's your immediate priority about the new pneumothorax?",
        options: [
          { t: "Speak to the ICU consultant or registrar before treating: confirm they know, ask whether a right drain is planned, and agree a plan", s: 10, fb: "Correct. Close the loop before you touch the patient." },
          { t: "Proceed with MHI at low pressures", s: 0, fb: "Still a contraindication." },
          { t: "Document ‘not for physio’ and leave", s: 3, fb: "The collapse still needs a plan. Talk to the team instead." },
          { t: "Treat with positioning and suction and mention it later", s: 5, fb: "Reasonable techniques, but confirm first that the team knows about the new finding." }
        ],
        why: "Reports get missed on busy units. Checking the team knows is part of safe practice, not a formality."
      },
      {
        skill: "manage",
        notes: ["Right drain inserted. Two hours later: MAP 72 on low-dose noradrenaline (stable), PEEP 8, FiO2 0.5, SpO2 93%. Thick secretions on suction."],
        q: "What's your plan now?",
        options: [
          { t: "Right side-lying (left side up) if tolerated, MHI or VHI within safe pressure limits now both pneumothoraces are drained, closed suction and humidification. Monitor SpO2, HR and MAP throughout.", s: 10, fb: "Correct. VHI avoids losing PEEP when you disconnect the circuit." },
          { t: "Head-down tilt with percussion over the left chest", s: 2, fb: "Percussion over rib fractures and head-down tilt in a patient on vasopressors aren't appropriate." },
          { t: "Wait until he's extubated", s: 0, fb: "The collapse is affecting oxygenation now." },
          { t: "Suction only", s: 4, fb: "Helps with secretions but won't re-expand the collapsed lobe." }
        ],
        why: "Position to put the affected lung uppermost, recruit volume, then clear. Check your unit's MHI/VHI policy for pressure limits."
      }
    ],
    pearl: "In critical care, things change hour to hour. Re-read the imaging, drug chart and ventilator settings before every treatment.",
    refs: ["Standard critical care physiotherapy practice. Follow your unit's MHI/VHI policy."]
  }
);
