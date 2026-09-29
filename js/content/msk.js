/* MSK outpatient cases.
 * Case schema (shared by every content file):
 *   id, title, area, setting, mins, patient, intro,
 *   stages: [{ skill, notes?, obs?, q, multi?, options, why }],
 *   pearl, refs
 * Single-answer options: { t, s (0-10), fb, bias? }
 * Multi-select options:  { t, ok (true/false), fb }
 */
window.RR = window.RR || { cases: [], flags: [], caseload: [] };

RR.cases.push(
  {
    id: "msk-ces",
    title: "The wiping question",
    area: "msk",
    setting: "MSK outpatients",
    mins: 4,
    patient: "Dean, 44, warehouse operative",
    intro: "GP referral: ‘Low back pain with left-sided sciatica for 6 weeks. Please assess and treat.’ This is his second appointment. He says things have changed since last week.",
    stages: [
      {
        skill: "flags",
        notes: [
          "Back pain much worse over the last 3 days.",
          "Pain now travels down both legs, left worse than right.",
          "When asked directly: ‘It feels a bit numb when I wipe after the toilet.’",
          "Has had to strain to start passing urine since yesterday."
        ],
        q: "What is your leading concern?",
        options: [
          { t: "Suspected cauda equina syndrome", s: 10, fb: "Correct. Bilateral leg symptoms, new saddle sensory change and bladder hesitancy together mean suspected CES until proven otherwise." },
          { t: "Bilateral radiculopathy from a disc prolapse, for conservative care", s: 2, fb: "A disc prolapse is the likely cause, but calling it radiculopathy stops the search before you've explained the saddle and bladder symptoms.", bias: "premature" },
          { t: "Urinary tract infection alongside his back pain", s: 0, fb: "This explains the bladder symptom in isolation and ignores the saddle numbness and bilateral leg pain.", bias: "satisficing" },
          { t: "Central sensitisation with widespread symptoms", s: 0, fb: "New objective-sounding neurological symptoms need a structural explanation first. Don't label change as sensitisation." }
        ],
        why: "Progression from one leg to both, plus any new saddle, bladder, bowel or sexual change, should make you ask ‘why not CES?’ Early (incomplete) CES often presents with subtle, patient-reported changes like this."
      },
      {
        skill: "assessment",
        multi: true,
        q: "You have 10 minutes of the appointment left. Which assessments are most useful now? Select all that apply.",
        options: [
          { t: "Detailed questions on bladder, bowel and sexual function, with a timeline of onset", ok: true, fb: "Yes. Timing and progression of these symptoms matter to the receiving team." },
          { t: "Lower limb neurological exam: myotomes, dermatomes and reflexes", ok: true, fb: "Yes. Quick, and it gives a baseline for comparison." },
          { t: "Slump and straight leg raise to confirm neural sensitivity", ok: false, fb: "Won't change your decision. The history has already made it." },
          { t: "Book a post-void bladder scan in clinic before deciding", ok: false, fb: "Usually unavailable in outpatients, and it would delay an emergency referral." },
          { t: "Digital rectal exam to confirm anal tone before referring", ok: false, fb: "Not part of routine physio practice in most services, and it must never delay onward referral." }
        ],
        why: "The history makes the decision. Examination can be normal in early CES, so a normal exam does not rule it out. Nothing you do in clinic should delay the referral."
      },
      {
        skill: "escalate",
        q: "What do you do now?",
        options: [
          { t: "Same-day emergency referral via the local suspected CES pathway (usually ED or on-call spinal/orthopaedics) for emergency MRI. Phone ahead, document, give a CES card.", s: 10, fb: "Correct. Suspected CES is time-critical. A direct referral plus a phone call avoids lost time." },
          { t: "Request an urgent outpatient MRI and review in a week with safety-netting advice", s: 2, fb: "Too slow. Symptoms are already progressing. The window to protect bladder function may be hours." },
          { t: "Advise him to see his GP today", s: 3, fb: "An extra step that loses time and may lose the detail of your findings. You have the information, so refer directly." },
          { t: "Treat today with repeated movements and review in 48 hours", s: 0, fb: "Unsafe. This delays emergency imaging in a possible surgical emergency." }
        ],
        why: "The national suspected CES pathway (GIRFT, 2023) expects emergency MRI for suspected CES, 24/7. Your job is to recognise it, refer directly and document clearly."
      },
      {
        skill: "escalate",
        q: "The on-call registrar asks why you think this is CES. Which handover is best?",
        options: [
          { t: "‘I'm referring a 44-year-old with suspected CES. 6 weeks of back pain and left sciatica; over 3 days, bilateral leg pain, new saddle numbness and urinary hesitancy since yesterday. Reduced sensation L5/S1 bilaterally. He needs emergency MRI. He's on his way to ED with my letter.’", s: 10, fb: "Clear SBAR: situation, background, assessment, recommendation. The receiving clinician can act on it straight away." },
          { t: "‘He's had back pain for ages, and last week it was a bit better, but then he lifted a box on Tuesday, and his wife thinks...’", s: 3, fb: "The key facts are buried in the story. Lead with your concern." },
          { t: "‘Can you see a man with bad back pain and some numbness?’", s: 2, fb: "Too vague. It doesn't say what you suspect or how urgent it is." },
          { t: "‘He definitely has CES and needs decompression today.’", s: 4, fb: "Right urgency, but it overstates certainty and skips the findings that justify it." }
        ],
        why: "SBAR keeps an escalation short and actionable. Say what you suspect and what you need in the first sentence."
      }
    ],
    pearl: "Document the negatives in every back pain assessment: ‘No saddle anaesthesia; bladder, bowel and sexual function normal.’ Safety-net everyone with radicular pain, verbally and in writing.",
    refs: ["GIRFT National Suspected Cauda Equina Syndrome Pathway (2023)", "NICE NG59: Low back pain and sciatica in over 16s"]
  },

  {
    id: "msk-frozen",
    title: "Stuck in the night",
    area: "msk",
    setting: "MSK outpatients",
    mins: 4,
    patient: "Priya, 52, primary school teacher",
    intro: "Four months of right shoulder pain with no injury. Now can't reach behind her back or put her hair up. Wakes most nights and can't lie on the right side. Type 2 diabetes.",
    stages: [
      {
        skill: "hypothesis",
        multi: true,
        q: "Which hypotheses belong on your working list at this stage? Select all that apply.",
        options: [
          { t: "Frozen shoulder", ok: true, fb: "Yes. Age, diabetes, night pain and a progressive loss of function fit well." },
          { t: "Rotator cuff related shoulder pain", ok: true, fb: "Yes. The most common cause of shoulder pain, and you haven't examined her yet." },
          { t: "Glenohumeral osteoarthritis", ok: true, fb: "Yes. It also restricts passive range, so it's the key mimic to exclude." },
          { t: "Posterior shoulder instability", ok: false, fb: "Doesn't fit her age, history or presentation." },
          { t: "Thoracic outlet syndrome", ok: false, fb: "No neurovascular symptoms to support it." }
        ],
        why: "Hold several hypotheses until the examination separates them. Stiffness and pain in a 52-year-old with diabetes makes frozen shoulder likely, but cuff pain and OA are its common mimics."
      },
      {
        skill: "assessment",
        q: "Which single finding best separates frozen shoulder from rotator cuff related shoulder pain?",
        options: [
          { t: "Marked loss of passive external rotation compared with the other side", s: 10, fb: "Correct. Frozen shoulder restricts passive ROM, with external rotation most affected. Cuff pain usually preserves passive range." },
          { t: "Painful arc between 60 and 120 degrees", s: 3, fb: "Common in cuff pain, but it doesn't discriminate between the two." },
          { t: "Positive Hawkins-Kennedy test", s: 2, fb: "Poor specificity. A stiff, painful shoulder will often be ‘positive’." },
          { t: "Reduced active flexion", s: 2, fb: "Both conditions reduce active range. Compare active with passive." }
        ],
        why: "Active range is reduced in both. The discriminator is passive range, especially external rotation."
      },
      {
        skill: "interpret",
        notes: [
          "Passive ER 15° (left 70°). Passive abduction 70°. Firm, painful end-feel.",
          "Cervical screen clear. Strength hard to assess through pain."
        ],
        q: "Before confirming frozen shoulder, what is the key investigation?",
        options: [
          { t: "Plain X-ray, to exclude glenohumeral OA and a missed posterior dislocation", s: 10, fb: "Correct. Both restrict passive ER and can look identical on examination." },
          { t: "MRI shoulder", s: 3, fb: "Not routinely needed. MRI doesn't add much for a clinical diagnosis of frozen shoulder." },
          { t: "Ultrasound to look for a cuff tear", s: 3, fb: "Won't explain a global loss of passive range." },
          { t: "None. Frozen shoulder is a clinical diagnosis.", s: 4, fb: "It is a clinical diagnosis, but UK pathways recommend an X-ray first to exclude the mimics." }
        ],
        why: "The BESS/BOA pathway: frozen shoulder is diagnosed clinically, and a plain X-ray excludes the two conditions most likely to mimic it."
      },
      {
        skill: "manage",
        notes: ["X-ray normal. She's in the painful early phase and not sleeping."],
        q: "What is the most appropriate plan?",
        options: [
          { t: "Explain the natural history, advise on pain relief, discuss an intra-articular steroid injection, and give gentle exercises within comfort. Review.", s: 10, fb: "Correct. In the painful phase, the aim is pain control and education. Injection gives useful short-term relief." },
          { t: "Firm end-range stretching and joint mobilisations to break down adhesions", s: 2, fb: "Likely to flare an irritable shoulder. Dose to irritability." },
          { t: "Refer straight away for arthroscopic capsular release", s: 3, fb: "Surgery is for people who don't improve with non-surgical care." },
          { t: "Rest in a sling until the pain settles", s: 0, fb: "Immobilisation will worsen stiffness." }
        ],
        why: "UK FROST (2020) found early structured physiotherapy with steroid injection, manipulation under anaesthesia and capsular release gave similar outcomes at 12 months. Surgery carried more risk and cost. If she didn't already have diabetes, you'd consider an HbA1c check."
      }
    ],
    pearl: "Let tissue irritability set the dose. In the high-irritability phase, less is more: pain relief, injection and education. Save the stretching for when the pain settles.",
    refs: ["BESS/BOA Patient Care Pathway for Frozen Shoulder (Rangan et al., 2015)", "UK FROST trial (Rangan et al., Lancet, 2020)"]
  },

  {
    id: "msk-knee",
    title: "The pop",
    area: "msk",
    setting: "MSK outpatients",
    mins: 5,
    patient: "Kai, 23, 5-a-side footballer",
    intro: "Twisted on a planted foot 5 days ago. Felt a ‘pop’, couldn't carry on, and the knee was swollen within 2 hours. Now walking with a limp.",
    stages: [
      {
        skill: "hypothesis",
        q: "What does swelling within 2 hours of the injury suggest?",
        options: [
          { t: "Haemarthrosis, most commonly from an ACL rupture", s: 10, fb: "Correct. Rapid swelling means blood in the joint. Other causes include patellar dislocation and osteochondral fracture." },
          { t: "Reactive effusion from a meniscal tear", s: 4, fb: "Meniscal effusions usually build up over 6 to 24 hours, not within 2." },
          { t: "Prepatellar bursitis", s: 0, fb: "Doesn't fit a twisting injury with a pop and an intra-articular effusion." },
          { t: "Septic arthritis", s: 0, fb: "No infective features, and the swelling followed trauma immediately." }
        ],
        why: "Timing of swelling is a cheap, powerful question. Fast means blood; slow (overnight) suggests a synovial effusion."
      },
      {
        skill: "assessment",
        q: "Which is the most sensitive clinical test for an ACL rupture in a recently injured knee?",
        options: [
          { t: "Lachman test", s: 10, fb: "Correct. The most sensitive clinical test, and tolerable in a swollen knee." },
          { t: "Pivot shift", s: 5, fb: "Very specific, but guarding makes it insensitive in an awake, acutely injured patient." },
          { t: "Anterior drawer at 90° flexion", s: 4, fb: "Less sensitive acutely. Hamstring guarding and effusion limit it." },
          { t: "McMurray's test", s: 0, fb: "A meniscal test." }
        ],
        why: "Use a sensitive test to rule out and a specific test to rule in. In the acute knee, Lachman does most of the work."
      },
      {
        skill: "manage",
        notes: ["Lachman: increased anterior translation with a soft end-point."],
        q: "Kai asks: ‘Do I need an operation?’ What's the best reply?",
        options: [
          { t: "‘Not necessarily. For many people, rehab first with surgery later if the knee keeps giving way does as well as early surgery. It depends on your goals, like returning to pivoting sport. I'll refer you to the knee clinic so we can decide together, and we'll start rehab now either way.’", s: 10, fb: "Correct. Accurate, honest and shared. Prehab helps whatever the final decision." },
          { t: "‘Yes. Nobody plays football without an ACL.’", s: 2, fb: "Overstated. Some people cope well without reconstruction." },
          { t: "‘No. Surgery isn't better than physio.’", s: 3, fb: "Overstates the evidence. Many people who want to return to pivoting sport opt for reconstruction." },
          { t: "‘Let's wait for the MRI before talking about it. Avoid exercise until then.’", s: 2, fb: "Rest loses time. Quads activation, range and swelling control should start now." }
        ],
        why: "In the KANON trial, young active adults given structured rehab with optional delayed reconstruction had outcomes similar to early reconstruction at 2 and 5 years, and about half never needed surgery."
      },
      {
        skill: "flags",
        notes: [
          "Two weeks into rehab: twice this week the knee ‘locked’ and he had to wiggle it to straighten.",
          "Today he lacks 10° of extension with a springy block."
        ],
        q: "What does the springy block to extension change?",
        options: [
          { t: "Suggests a displaced meniscal tear (e.g. bucket handle). Needs urgent orthopaedic referral.", s: 10, fb: "Correct. A true mechanical block needs urgent assessment. Displaced tears do better with early repair." },
          { t: "It's effusion and hamstring guarding. Carry on with ACL rehab.", s: 2, fb: "You already have a diagnosis, so the new finding is being explained away.", bias: "anchoring" },
          { t: "Suggests a PCL injury", s: 0, fb: "A PCL injury doesn't cause mechanical locking." },
          { t: "Leave it until the knee clinic appointment", s: 2, fb: "The knee clinic needs to know now. Upgrade the referral." }
        ],
        why: "A locked knee (a springy block to extension) points to a displaced meniscal fragment. It needs urgent referral, typically to be seen within days."
      }
    ],
    pearl: "A new finding should reopen the case. Premature closure is most likely when you already have a diagnosis that explains most of the picture.",
    refs: ["KANON trial (Frobell et al., NEJM 2010; BMJ 2013)", "BASK Meniscal Surgery Consensus (Abram et al., 2018)"]
  },

  {
    id: "msk-achilles",
    title: "But he can walk",
    area: "msk",
    setting: "MSK / urgent care",
    mins: 4,
    patient: "Mark, 47, badminton player",
    intro: "Lunged for a drop shot 2 hours ago. ‘Felt like someone kicked me in the back of the heel.’ Walked in with a limp. He can point his foot down when sitting.",
    stages: [
      {
        skill: "hypothesis",
        q: "He can walk and actively point his foot. What's your leading hypothesis?",
        options: [
          { t: "Acute Achilles tendon rupture", s: 10, fb: "Correct. The mechanism and the ‘kicked’ sensation are classic. Walking and plantarflexion don't exclude it." },
          { t: "Medial gastrocnemius strain", s: 4, fb: "A reasonable differential, but the heel-level ‘kick’ points to the tendon." },
          { t: "Flare of Achilles tendinopathy", s: 2, fb: "Sudden onset with a kick sensation is an acute rupture until proven otherwise." },
          { t: "Ankle sprain", s: 0, fb: "Mechanism and location don't fit." }
        ],
        why: "Tibialis posterior, the peronei and the long toe flexors can all plantarflex the ankle. Being able to walk is one of the main reasons Achilles ruptures get missed."
      },
      {
        skill: "assessment",
        multi: true,
        q: "Which tests give you the most diagnostic confidence? Select all that apply.",
        options: [
          { t: "Simmonds' (Thompson) calf squeeze test, prone", ok: true, fb: "Yes. No plantarflexion on squeezing the calf is a positive test." },
          { t: "Matles test (resting angle with knees flexed to 90°, prone)", ok: true, fb: "Yes. The injured foot hangs in neutral or dorsiflexion." },
          { t: "Palpating for a gap in the tendon", ok: true, fb: "Yes. Often 2 to 6 cm above the insertion." },
          { t: "Single-leg heel raise", ok: false, fb: "Not appropriate in the acute phase, and it doesn't tell you enough." },
          { t: "Resisted plantarflexion strength in sitting", ok: false, fb: "Often preserved thanks to the other plantarflexors." }
        ],
        why: "Two or more positive findings from calf squeeze, Matles and palpable gap make the diagnosis highly likely. Diagnosis is clinical; ultrasound helps when you're unsure."
      },
      {
        skill: "escalate",
        notes: ["Simmonds' positive. Matles positive. Palpable gap 4 cm above the insertion."],
        q: "What is your next step?",
        options: [
          { t: "Same-day referral via the local Achilles pathway (ED or fracture clinic) for immobilisation in equinus, with a VTE risk assessment", s: 10, fb: "Correct. Get the tendon ends apposed early. Immobilised lower limbs need VTE assessment." },
          { t: "Book an ultrasound for next week. Crutches meanwhile.", s: 3, fb: "Delay lets the tendon ends separate. The clinical diagnosis is already strong." },
          { t: "Start an eccentric loading programme", s: 0, fb: "A tendinopathy treatment. Harmful for a rupture." },
          { t: "Routine orthopaedic referral", s: 2, fb: "This is time-sensitive. Routine is too slow." }
        ],
        why: "The ACHILLES trial (NEJM, 2022) found similar 12-month function after non-operative care, open repair and minimally invasive repair. Non-operative care had more re-ruptures and surgery had more nerve injuries. Whatever the choice, early equinus immobilisation matters."
      },
      {
        skill: "manage",
        notes: ["Managed non-operatively in a functional boot with heel wedges."],
        q: "Which principle matters most in his early rehab?",
        options: [
          { t: "Avoid stretching into dorsiflexion early. Protect against tendon lengthening and progress load by criteria.", s: 10, fb: "Correct. Tendon elongation is linked to lasting weakness and poorer function." },
          { t: "Regain full dorsiflexion quickly with calf stretches", s: 2, fb: "Risks healing in a lengthened position." },
          { t: "Start plyometrics at 8 weeks if pain-free", s: 2, fb: "Pain isn't a good guide to tendon capacity. Progress by strength and endurance criteria." },
          { t: "Keep it completely rested until 12 weeks", s: 2, fb: "Protected, graded loading in the boot is standard." }
        ],
        why: "Heel-raise height and endurance are useful markers. Many people take 9 to 12 months to return to jumping sport."
      }
    ],
    pearl: "‘Can walk’ and ‘can plantarflex’ are the two findings most likely to mislead you. Test the tendon, not the function.",
    refs: ["Maffulli (1998): clinical diagnosis of Achilles rupture", "ACHILLES trial (Myhrvold et al., NEJM 2022)", "NICE NG89: VTE in over 16s"]
  },

  {
    id: "msk-dcm",
    title: "Butterfingers",
    area: "msk",
    setting: "MSK outpatients",
    mins: 4,
    patient: "Joan, 68, retired librarian",
    intro: "GP referral: ‘?Bilateral carpal tunnel syndrome, some neck pain.’ Six months of tingling in both hands. Dropping cups, struggling with buttons. ‘My walking's gone a bit wobbly too.’",
    stages: [
      {
        skill: "hypothesis",
        q: "What's the most important hypothesis to test?",
        options: [
          { t: "Degenerative cervical myelopathy (DCM)", s: 10, fb: "Correct. Clumsy hands plus a change in gait in an older adult is DCM until you've examined for it." },
          { t: "Bilateral carpal tunnel syndrome", s: 3, fb: "The referral framed it this way, but CTS doesn't explain the gait change.", bias: "framing" },
          { t: "Peripheral neuropathy", s: 4, fb: "A valid differential, but missing DCM costs more, so test for it first." },
          { t: "Age-related deconditioning", s: 0, fb: "Doesn't explain the hand symptoms." }
        ],
        why: "DCM is the most common cause of spinal cord dysfunction in adults. It's often mistaken for CTS, and diagnosis is often delayed by more than 2 years."
      },
      {
        skill: "assessment",
        multi: true,
        q: "Which findings would support DCM? Select all that apply.",
        options: [
          { t: "Positive Hoffmann's sign", ok: true, fb: "Yes. An upper motor neurone sign." },
          { t: "Brisk reflexes or an inverted supinator jerk", ok: true, fb: "Yes." },
          { t: "Unsteady tandem gait or a positive Romberg", ok: true, fb: "Yes. Loss of dorsal column function." },
          { t: "Positive Phalen's test", ok: false, fb: "Suggests CTS, but CTS and DCM can coexist. It doesn't rule DCM out." },
          { t: "Reduced cervical rotation", ok: false, fb: "Common and non-specific at this age." }
        ],
        why: "Look for upper motor neurone signs. Signs can lag behind symptoms, so a convincing history still warrants referral."
      },
      {
        skill: "escalate",
        notes: [
          "Hoffmann's positive bilaterally. Brisk biceps and knee reflexes.",
          "Tandem gait unsteady. Grip-and-release: 14 in 10 seconds (slow)."
        ],
        q: "What do you do?",
        options: [
          { t: "Urgent referral to the spinal team for MRI and a surgical opinion. Explain, and safety-net for rapid deterioration.", s: 10, fb: "Correct. Moderate DCM with progressive symptoms usually benefits from surgical decompression." },
          { t: "Start cervical traction and manual therapy", s: 0, fb: "Unsafe in myelopathy. Avoid manipulation." },
          { t: "Nerve conduction studies for CTS first", s: 3, fb: "Delays assessment of the more serious problem." },
          { t: "Routine orthopaedic referral", s: 4, fb: "Right direction, wrong urgency. Neurological loss may not recover." }
        ],
        why: "AO Spine guidance recommends surgery for moderate and severe DCM. Rapid deterioration (e.g. new bladder symptoms or a sudden loss of walking) needs emergency referral."
      }
    ],
    pearl: "Treat the referral diagnosis as a hypothesis to test, not a conclusion. Bilateral hand symptoms plus a change in gait means examine for upper motor neurone signs.",
    refs: ["AO Spine guideline for DCM (Fehlings et al., 2017)", "Davies et al., BMJ 2018: Degenerative cervical myelopathy", "Myelopathy.org"]
  },

  {
    id: "msk-mscc",
    title: "Nothing touches it",
    area: "msk",
    setting: "MSK outpatients",
    mins: 4,
    patient: "Brian, 71, retired bus driver",
    intro: "Six weeks of mid-back pain. Prostate cancer treated 4 years ago. GP notes ‘probable mechanical thoracic pain’.",
    stages: [
      {
        skill: "flags",
        notes: [
          "Pain around T8, band-like around the ribs. Worse lying flat at night.",
          "‘Nothing touches it.’ Lost about 5 kg without trying.",
          "Denies any neurological symptoms when asked in general terms."
        ],
        q: "What's your leading concern?",
        options: [
          { t: "Spinal metastases, with a risk of spinal cord compression", s: 10, fb: "Correct. Cancer history, thoracic pain, pain worse lying flat, and weight loss." },
          { t: "Thoracic facet joint dysfunction", s: 0, fb: "The GP's framing and a common diagnosis are pulling you away from the red flags.", bias: "availability" },
          { t: "Osteoporotic wedge fracture", s: 4, fb: "Possible, especially after hormone therapy, but it doesn't explain the weight loss. Cancer must come first." },
          { t: "Shingles before the rash appears", s: 2, fb: "Six weeks is too long for pre-eruptive shingles." }
        ],
        why: "Prostate, breast, lung, kidney and thyroid cancers and myeloma commonly spread to bone. In someone with a cancer history, new spinal pain is metastatic until proven otherwise."
      },
      {
        skill: "assessment",
        multi: true,
        q: "What do you check now? Select all that apply.",
        options: [
          { t: "Ask specifically about leg weakness, heaviness or walking difficulty", ok: true, fb: "Yes. Ask directly. Patients often don't volunteer these." },
          { t: "Ask about bladder, bowel and saddle sensation", ok: true, fb: "Yes." },
          { t: "Examine lower limb power, sensation (look for a sensory level), reflexes and plantars", ok: true, fb: "Yes. You're looking for signs of cord compression." },
          { t: "PA pressures to reproduce his pain", ok: false, fb: "Won't change the decision, and it isn't needed." },
          { t: "Thoracic mobility tests for a self-management plan", ok: false, fb: "Premature. Exclude serious pathology first." }
        ],
        why: "You're screening for cord compression: a sensory level, upper motor neurone signs and gait change."
      },
      {
        skill: "escalate",
        notes: [
          "On direct questioning: ‘My legs have felt heavy for about 3 days.’",
          "Hip flexion 4/5 bilaterally. Brisk knee reflexes. Plantars upgoing."
        ],
        q: "What action do you take?",
        options: [
          { t: "Contact the acute oncology / MSCC coordinator immediately via the local pathway. This is an oncological emergency needing MRI of the whole spine within 24 hours.", s: 10, fb: "Correct. Neurological signs make this an emergency. Don't send him home to wait." },
          { t: "Urgent letter to the GP for a 2-week-wait referral", s: 3, fb: "Far too slow once neurological signs are present." },
          { t: "Request a routine MRI of the thoracic spine", s: 2, fb: "Wrong urgency, and the whole spine should be imaged because multi-level disease is common." },
          { t: "Gentle thoracic mobility and review next week", s: 0, fb: "Unsafe." }
        ],
        why: "NICE guidance on spinal metastases and MSCC treats suspected MSCC with neurological symptoms or signs as an emergency. Neurological status at diagnosis, especially the ability to walk, is the strongest predictor of outcome."
      }
    ],
    pearl: "Ask about neurological symptoms directly. ‘Any other symptoms?’ is not a screen. Weakness, heaviness and unsteadiness are often put down to the pain.",
    refs: ["NICE NG234: Spinal metastases and metastatic spinal cord compression (2023)"]
  }
);
