/* Ortho, frailty and leadership cases. Schema: see msk.js. */
window.RR = window.RR || { cases: [], flags: [], caseload: [] };

RR.cases.push(
  {
    id: "ortho-nof",
    title: "Day one",
    area: "ortho",
    setting: "Orthogeriatric ward",
    mins: 4,
    patient: "Edna, 86, day 1 after a left hip hemiarthroplasty",
    intro: "Fractured neck of femur after a fall at home. Before the fall: lived alone, walked with a stick, independent with care.",
    stages: [
      {
        skill: "manage",
        q: "When should Edna first get out of bed, according to national guidance?",
        options: [
          { t: "On the day of or the day after surgery, unless medically or surgically contraindicated", s: 10, fb: "Correct. Early mobilisation is a national hip fracture standard." },
          { t: "Day 3, to reduce the risk of dislocation", s: 0, fb: "No evidence for delaying. Delay increases complications." },
          { t: "Once she's pain-free", s: 2, fb: "Pain should be managed so she can move, not used as a reason to wait." },
          { t: "Once the catheter is out", s: 2, fb: "Lines and catheters rarely prevent mobilisation." }
        ],
        why: "NICE CG124 and the National Hip Fracture Database standard: mobilise out of bed by the day after surgery."
      },
      {
        skill: "interpret",
        obs: [["BP lying", "118/66", "mmHg"], ["BP sitting", "92/54", "at 1 min"], ["HR", "104", "bpm"], ["Hb", "81", "g/L (pre-op 112)"]],
        notes: [
          "Drowsier than yesterday. Calls you ‘Mary’ (her sister's name). Picking at the sheets.",
          "Sitting on the edge of the bed, she says she feels ‘swimmy’."
        ],
        multi: true,
        q: "What's going on? Select all that apply.",
        options: [
          { t: "Possible delirium: screen with the 4AT", ok: true, fb: "Yes. An acute change in cognition after surgery." },
          { t: "Orthostatic hypotension: a symptomatic postural drop", ok: true, fb: "Yes. A 26 mmHg systolic drop with symptoms." },
          { t: "Post-operative anaemia is likely contributing", ok: true, fb: "Yes. Hb has fallen by 31 g/L." },
          { t: "Normal post-op tiredness. Carry on and stand her.", ok: false, fb: "Symptomatic hypotension plus new confusion is not normal." },
          { t: "This is probably her baseline dementia", ok: false, fb: "Get a collateral history. Acute change is delirium until proven otherwise." }
        ],
        why: "Delirium is common after hip fracture and linked to worse outcomes. The 4AT is quick and doesn't need special training."
      },
      {
        skill: "escalate",
        q: "What do you do now?",
        options: [
          { t: "Lie her back down, recheck her obs, and escalate to the orthogeriatric team (postural drop, Hb 81, possible delirium). Plan to try again later today once she's been reviewed. Document.", s: 10, fb: "Correct. Spot, stop, escalate, then try again the same day." },
          { t: "Stand her anyway with two staff. Day-one mobilisation is the target.", s: 1, fb: "Hitting the target isn't worth a syncope or fall.", bias: "commission" },
          { t: "Cancel physio until she's fully orientated", s: 2, fb: "Delirium can last days. Immobility makes it worse." },
          { t: "Hoist her to the chair and leave her there", s: 2, fb: "Sitting upright with an untreated postural drop is still a risk." }
        ],
        why: "The medical team will decide on fluids or transfusion (NICE NG24 thresholds are usually 70 g/L, or 80 g/L with acute coronary syndrome). Your job is to recognise it, stop, escalate and come back."
      },
      {
        skill: "escalate",
        notes: ["Next day: IV fluids given. She stands with a frame and two to assist, and walks 3 m."],
        q: "Her daughter asks: ‘Will Mum be able to go home?’ What's the best reply?",
        options: [
          { t: "‘It's early, and we'll know more over the next few days. Can you tell me how she was managing before, and what help she has? That will help us plan together.’", s: 10, fb: "Correct. Honest, involves the family and gathers the history you need." },
          { t: "‘No, she'll need a care home.’", s: 0, fb: "Premature, and it could be wrong." },
          { t: "‘Yes, she'll be fine in a couple of days.’", s: 1, fb: "False reassurance you can't back up." },
          { t: "‘You'd have to ask the doctors.’", s: 2, fb: "Rehab potential is your area. Don't pass it on." }
        ],
        why: "Families are your best source of collateral history, and discharge planning starts on day one."
      }
    ],
    pearl: "Early mobilisation is a goal, not a rule. Spot, stop, escalate and try again the same day. That keeps her safe without losing the day.",
    refs: ["NICE CG124: Hip fracture management", "National Hip Fracture Database (RCP)", "The 4AT: the4at.com", "NICE NG24: Blood transfusion"]
  },

  {
    id: "frailty-falls",
    title: "Found on the floor",
    area: "ortho",
    setting: "Community / rapid response",
    mins: 4,
    patient: "Arthur, 84, lives alone",
    intro: "Three falls in 2 months. The last time, he was on the floor for 3 hours overnight. Medications: amlodipine, doxazosin, furosemide, zopiclone and four others.",
    stages: [
      {
        skill: "assessment",
        multi: true,
        q: "Which belong in his falls assessment? Select all that apply.",
        options: [
          { t: "Lying and standing blood pressure", ok: true, fb: "Yes." },
          { t: "Flag falls-risk medicines for a GP or pharmacist review", ok: true, fb: "Yes. Doxazosin, zopiclone and furosemide all stand out." },
          { t: "Gait, strength and balance (e.g. TUG, 30-second chair stand)", ok: true, fb: "Yes." },
          { t: "Whether he can get up from the floor, and a plan for a long lie", ok: true, fb: "Yes. He's already had a 3-hour lie." },
          { t: "Wait for a DEXA scan before starting anything", ok: false, fb: "Bone health matters, but it shouldn't delay intervention." },
          { t: "Give a frame for all indoor walking before assessing", ok: false, fb: "Assess first. The wrong aid can increase falls." }
        ],
        why: "The World Falls Guidelines (2022) recommend a multifactorial assessment for high-risk older adults: gait and balance, medications, orthostatic BP, vision, continence, cognition, feet and footwear, environment, fear of falling and bone health."
      },
      {
        skill: "interpret",
        obs: [["BP lying", "142/80", "mmHg"], ["BP standing", "116/72", "at 3 min"], ["TUG", "19", "s, with stick"], ["Chair stand", "6", "in 30 s"]],
        notes: ["Dizzy on standing. Can't get up from the floor on his own."],
        q: "How do you interpret the blood pressure?",
        options: [
          { t: "Symptomatic orthostatic hypotension, probably made worse by doxazosin, amlodipine and furosemide", s: 10, fb: "Correct. A 26 mmHg systolic drop with symptoms." },
          { t: "Normal age-related variation", s: 0, fb: "A drop of 20 mmHg systolic or more is abnormal at any age." },
          { t: "White coat effect", s: 0, fb: "That raises BP. It doesn't cause a drop on standing." },
          { t: "Dehydration only", s: 4, fb: "Could contribute, but his medications are an obvious, fixable cause." }
        ],
        why: "Orthostatic hypotension: a sustained drop of 20 mmHg systolic or 10 mmHg diastolic within 3 minutes of standing. Alpha-blockers like doxazosin are common culprits."
      },
      {
        skill: "manage",
        q: "What's the best plan?",
        options: [
          { t: "A progressive, individual strength and balance programme at a meaningful dose (e.g. Otago or FaME), teach him to get up from the floor, pendant alarm, GP or pharmacist medication review, OT home assessment", s: 10, fb: "Correct. Multifactorial, and the exercise is challenging enough to work." },
          { t: "A seated exercise leaflet and discharge", s: 2, fb: "Seated exercise doesn't challenge balance enough to reduce falls." },
          { t: "Advise him to stop going out, to avoid falls", s: 0, fb: "Leads to deconditioning, isolation and more falls." },
          { t: "Refer to the falls clinic and close the case", s: 3, fb: "Useful, but it leaves the floor-rise and exercise gaps unaddressed." }
        ],
        why: "Exercise that challenges balance reduces falls by about a quarter (Cochrane, 2019). Longer programmes with more hours of practice have larger effects."
      }
    ],
    pearl: "Every fall is a symptom. Look for the causes (medicines, BP, strength, balance, environment), and always teach how to get up or call for help. A long lie causes harm of its own.",
    refs: ["World Guidelines for Falls Prevention (Montero-Odasso et al., 2022)", "NICE CG161: Falls in older people", "Sherrington et al., Cochrane review (2019)"]
  },

  {
    id: "lead-incident",
    title: "The op note",
    area: "lead",
    setting: "Orthopaedic ward, Band 6 lead",
    mins: 4,
    patient: "Your Band 5, 3 weeks into their ortho rotation",
    intro: "They come to you, upset: ‘I walked Mr Patel full weight-bearing this morning. Then I saw the op note: non-weight-bearing for 6 weeks.’ Mr Patel is day 2 after an ankle ORIF. He says his pain is no different.",
    stages: [
      {
        skill: "escalate",
        q: "What's your first action?",
        options: [
          { t: "Make sure the patient is safe: check him, tell the surgical team so they can decide whether he needs a review or X-ray, and be open with him about what happened", s: 10, fb: "Correct. The patient comes first, and so does honesty with him." },
          { t: "Reassure your Band 5 that he seems fine", s: 1, fb: "You can't know that without the surgical team's view." },
          { t: "Pass it to the clinical lead to deal with", s: 3, fb: "You're the senior on the ward. Act now and inform them too." },
          { t: "Complete an incident report and move on", s: 4, fb: "Needed, but it isn't the first step." }
        ],
        why: "HCPC standards include a professional duty of candour: be open with service users when something has gone wrong."
      },
      {
        skill: "escalate",
        multi: true,
        q: "Which should happen today? Select all that apply.",
        options: [
          { t: "Submit an incident report on the local system", ok: true, fb: "Yes. It's how the organisation learns." },
          { t: "Explain to Mr Patel what happened and apologise", ok: true, fb: "Yes." },
          { t: "Make sure the correct weight-bearing status is clearly documented and visible", ok: true, fb: "Yes. Prevent a repeat on the next shift." },
          { t: "Debrief your Band 5 supportively", ok: true, fb: "Yes. They're upset, and they came to you. That's the culture you want." },
          { t: "Start a formal disciplinary referral", ok: false, fb: "Not appropriate for an honest error reported openly." },
          { t: "Move your Band 5 off the ortho ward", ok: false, fb: "Punitive, and nobody learns from it." }
        ],
        why: "A just culture separates honest error, which calls for support and system fixes, from reckless behaviour."
      },
      {
        skill: "priority",
        notes: ["In supervision they explain: ‘The physio referral said FWB. I didn't check the op note.’"],
        q: "What's the most effective learning response?",
        options: [
          { t: "Reflect together with a structured model, agree a personal learning goal (always check the op note), fix the system (the referral wrongly said FWB) and share the learning at in-service training", s: 10, fb: "Correct. Individual learning plus a system fix." },
          { t: "Tell them to be more careful", s: 2, fb: "Doesn't change anything." },
          { t: "Add extra checks for them only", s: 4, fb: "Treats the person and ignores the faulty referral." },
          { t: "Nothing more. They've learned their lesson.", s: 0, fb: "The faulty referral process will catch someone else." }
        ],
        why: "The Patient Safety Incident Response Framework (PSIRF, 2022) focuses on learning and system improvement rather than blame."
      }
    ],
    pearl: "When something goes wrong, fix the patient first, then the system, then support the person. Most errors have a system fingerprint.",
    refs: ["HCPC Standards of conduct, performance and ethics", "NHS England Patient Safety Incident Response Framework (2022)", "NHS England: A just culture guide"]
  }
);
