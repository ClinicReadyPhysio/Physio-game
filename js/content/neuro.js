/* Neuro cases. Schema: see msk.js. */
window.RR = window.RR || { cases: [], flags: [], caseload: [] };

RR.cases.push(
  {
    id: "neuro-pusher",
    title: "Leaning in",
    area: "neuro",
    setting: "Stroke unit",
    mins: 4,
    patient: "Elaine, 76, day 5 after a right MCA infarct",
    intro: "Left hemiparesis and left inattention. Nursing staff: ‘She keeps falling to the left in the chair and fights us when we straighten her up.’",
    stages: [
      {
        skill: "hypothesis",
        notes: ["In sitting, she leans to the left and actively pushes with her right arm and leg. When you try to bring her to midline, she resists."],
        q: "What's your leading hypothesis?",
        options: [
          { t: "Contraversive pushing (pusher syndrome)", s: 10, fb: "Correct. Active pushing towards the weak side with the strong limbs, plus resistance to correction." },
          { t: "Left neglect alone", s: 4, fb: "Often present too, but neglect doesn't explain active pushing and resistance." },
          { t: "Left trunk weakness", s: 3, fb: "Weakness makes people fall towards the weak side, but they don't push there or resist correction." },
          { t: "Agitation or a behavioural problem", s: 0, fb: "Labelling it behavioural misses a treatable perceptual problem." }
        ],
        why: "Pushers perceive ‘upright’ as tilted towards the unaffected side, so they push to correct a posture they believe is wrong."
      },
      {
        skill: "assessment",
        q: "Which tool would you use to quantify it?",
        options: [
          { t: "Scale for Contraversive Pushing (SCP)", s: 10, fb: "Correct. It rates posture, abduction and extension of the unaffected limbs, and resistance to correction, in sitting and standing." },
          { t: "Burke Lateropulsion Scale", s: 7, fb: "A valid alternative that's also used in practice." },
          { t: "Berg Balance Scale", s: 3, fb: "Measures balance, not pushing." },
          { t: "Modified Ashworth Scale", s: 0, fb: "Measures resistance to passive stretch (spasticity)." }
        ],
        why: "Measure it, so you can show change and communicate it consistently to the team."
      },
      {
        skill: "manage",
        q: "What's the best treatment approach?",
        options: [
          { t: "Help her see what upright looks like (door frames, your body, a mirror) and set tasks that shift her weight towards her right, such as reaching to that side. Don't fight the push.", s: 10, fb: "Correct. Visual feedback about verticality and functional reaching to the unaffected side." },
          { t: "Hold her firmly in midline to retrain posture", s: 0, fb: "Resisting the push usually makes it stronger." },
          { t: "Encourage her to push up through her right arm", s: 0, fb: "This reinforces the pushing." },
          { t: "Keep her in bed until the pushing resolves", s: 0, fb: "Deconditioning with no benefit. Most pushing improves with rehab." }
        ],
        why: "Karnath and Broetz: help the patient realise they're not upright, use visual cues to find vertical, then practise moving to and holding the upright position during activity."
      },
      {
        skill: "escalate",
        q: "Nursing staff keep pulling her upright in the chair and she's getting distressed. What do you do?",
        options: [
          { t: "Brief the team, agree one consistent handling and positioning plan, put up a simple guide by the bed and demonstrate it at the next transfer", s: 10, fb: "Correct. Consistent 24-hour handling matters as much as your session." },
          { t: "Tell them to stop sitting her out", s: 2, fb: "Sitting out matters. The handling is the problem." },
          { t: "Write the plan in the physio notes", s: 3, fb: "Necessary but not enough. Nurses and HCAs do most of the transfers." },
          { t: "Leave it to OT", s: 1, fb: "A shared plan needs you in it." }
        ],
        why: "As a Band 6, spreading good practice across the MDT has more impact than a single treatment session."
      }
    ],
    pearl: "Pushing is a problem of perception, not strength. Fighting it makes it stronger. Change what she sees, then what she reaches for.",
    refs: ["Karnath & Broetz (2003): Understanding and treating ‘pusher syndrome’", "Karnath et al. (2000): Scale for Contraversive Pushing", "National Clinical Guideline for Stroke for the UK and Ireland (2023)"]
  },

  {
    id: "neuro-gbs",
    title: "Rising weakness",
    area: "neuro",
    setting: "Acute medical ward",
    mins: 3,
    patient: "Tom, 29, admitted yesterday",
    intro: "Weakness and tingling rising from his feet over 3 days, starting a week after a bout of gastroenteritis. Referral: ‘Please assess mobility.’",
    stages: [
      {
        skill: "flags",
        q: "What should you assess first?",
        options: [
          { t: "Respiratory muscle function: forced vital capacity and its trend, cough strength and bulbar signs", s: 10, fb: "Correct. Suspected Guillain-Barré syndrome can progress to respiratory failure." },
          { t: "Transfers, for discharge planning", s: 0, fb: "He's only a day into an evolving illness." },
          { t: "Peak cough flow alone", s: 5, fb: "Useful, but FVC is the key monitoring measure." },
          { t: "SpO2", s: 3, fb: "A late sign. In neuromuscular weakness, SpO2 often stays normal until very late." }
        ],
        why: "In neuromuscular respiratory weakness, measure the pump (FVC, cough, bulbar function) rather than just the gas."
      },
      {
        skill: "interpret",
        notes: [
          "Weight 80 kg. FVC this morning 2.8 L; now 1.5 L.",
          "Weak cough. Speaking in shorter sentences, nasal-sounding voice."
        ],
        q: "What does an FVC of 1.5 L mean?",
        options: [
          { t: "About 19 mL/kg: below 20 mL/kg, falling fast, with bulbar signs. High risk of respiratory failure. Escalate to critical care now.", s: 10, fb: "Correct. 1500 ÷ 80 ≈ 19 mL/kg." },
          { t: "Normal for his size", s: 0, fb: "His predicted FVC would be around 4.5–5 L." },
          { t: "Borderline. Recheck in 4 hours.", s: 3, fb: "The trend and bulbar signs make waiting unsafe." },
          { t: "Recheck tomorrow", s: 0, fb: "He could need intubation before then." }
        ],
        why: "The 20/30/40 rule: FVC < 20 mL/kg, MIP weaker than −30 cmH2O or MEP < 40 cmH2O predict the need for ventilation. The trend matters as much as the number."
      },
      {
        skill: "escalate",
        q: "What's the right action?",
        options: [
          { t: "Stay with him, tell the nurse in charge, and call the medical registrar or critical care outreach now with an SBAR that includes the FVC trend", s: 10, fb: "Correct. Immediate escalation with the numbers that matter." },
          { t: "Write it in the notes for the ward round", s: 1, fb: "Too slow for a patient deteriorating this quickly." },
          { t: "Call your physio team lead", s: 3, fb: "Fine to inform later, but the medical team needs to know first." },
          { t: "Start IPPB to boost his lung volumes", s: 2, fb: "Doesn't address the underlying deterioration. He needs a critical care assessment." }
        ],
        why: "Escalate with numbers: ‘FVC fallen from 2.8 to 1.5 L in 6 hours, now 19 mL/kg, with bulbar signs.’ It gets action faster than ‘he seems weaker’."
      }
    ],
    pearl: "In neuromuscular weakness, the sats monitor will reassure you until it's too late. Measure the pump, not just the gas.",
    refs: ["Lawn et al. (2001): Anticipating mechanical ventilation in Guillain-Barré syndrome"]
  },

  {
    id: "neuro-pd",
    title: "Stuck in the doorway",
    area: "neuro",
    setting: "Elderly care ward",
    mins: 4,
    patient: "Derek, 74, Parkinson's disease for 9 years",
    intro: "Admitted after a fall at home. The nurse says he's ‘much worse than on admission’: freezing at every doorway and needing two to stand.",
    stages: [
      {
        skill: "hypothesis",
        notes: [
          "Home regimen: co-careldopa at 07:00, 11:00, 15:00 and 19:00.",
          "Drug chart: doses given at 09:30 and 14:00 yesterday, 10:15 today. Two doses missed."
        ],
        q: "What's the most likely reason he's worse?",
        options: [
          { t: "Missed and delayed levodopa doses", s: 10, fb: "Correct. Parkinson's medication is time-critical. Delays cause ‘off’ periods, rigidity and freezing." },
          { t: "Natural progression of Parkinson's", s: 1, fb: "Progression happens over months, not a couple of days." },
          { t: "Deconditioning from bed rest", s: 3, fb: "Possible, but too fast. The drug chart gives a better explanation." },
          { t: "Fear of falling after his fall", s: 3, fb: "Can contribute, but it doesn't explain the new rigidity." }
        ],
        why: "Parkinson's UK's ‘Get It On Time’: medication must be given within 30 minutes of the prescribed time. Missed doses in hospital cause avoidable harm."
      },
      {
        skill: "escalate",
        q: "What do you do about it?",
        options: [
          { t: "Raise it today with the nurse in charge and the medical team, and ask for a pharmacy review. Record his usual timings and ask about self-administration.", s: 10, fb: "Correct. Fix the root cause, not just the symptom." },
          { t: "Treat the freezing with cueing and leave the medication to nursing", s: 4, fb: "Cueing helps, but the drug problem will keep undoing your work." },
          { t: "Document it only", s: 2, fb: "Documenting without escalating doesn't protect the patient." },
          { t: "Adjust the dose timings on the chart yourself", s: 0, fb: "Outside your scope. Escalate to a prescriber." }
        ],
        why: "Physios see function hour by hour, so you're well placed to spot ‘off’ periods and link them to medication timing."
      },
      {
        skill: "manage",
        notes: ["Doses back on time. Walks with a frame but still freezes at doorways."],
        q: "Which strategy best helps freezing at doorways?",
        options: [
          { t: "External cues: floor lines to step over, a rhythmic count or metronome, and focusing on one big first step", s: 10, fb: "Correct. External cues bypass the faulty automatic control of movement." },
          { t: "Tell him to concentrate harder on walking", s: 2, fb: "Attention helps a little, but without a cue it's not enough." },
          { t: "A wheeled frame for everything", s: 4, fb: "Frames can worsen freezing and festination in some people. Assess rather than assume." },
          { t: "Ask him to walk faster through doorways", s: 1, fb: "Rushing often makes freezing worse." }
        ],
        why: "Visual, auditory and attentional cues are core Parkinson's physiotherapy strategies. Practise them in the places where he actually freezes."
      },
      {
        skill: "assessment",
        q: "Before he goes home, which other falls-related check is most important?",
        options: [
          { t: "Lying and standing blood pressure", s: 10, fb: "Correct. Orthostatic hypotension is common in Parkinson's and can be worsened by levodopa." },
          { t: "Grip strength", s: 2, fb: "Not a priority here." },
          { t: "Six-minute walk test", s: 3, fb: "Useful for fitness, but it doesn't target an important falls cause." },
          { t: "Straight leg raise", s: 0, fb: "Not relevant." }
        ],
        why: "Falls in Parkinson's are usually multifactorial: freezing, postural instability, orthostatic hypotension, dual-tasking and medication timing."
      }
    ],
    pearl: "When function changes quickly in someone with Parkinson's, check the drug chart before anything else.",
    refs: ["Parkinson's UK: Get It On Time", "European Physiotherapy Guideline for Parkinson's Disease (KNGF/ParkinsonNet, 2014)", "NICE NG71: Parkinson's disease in adults"]
  }
);
