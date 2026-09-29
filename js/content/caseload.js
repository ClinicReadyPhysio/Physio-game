/* Caseload scenarios (MSK): rank the list by priority, then allocate each item.
 * tier: 1 = deal with first. Items sharing a tier can go in either order.
 * best: ideal allocation(s). ok: acceptable alternatives (half marks).
 * critical: id of the item that must come first.
 */
window.RR = window.RR || { cases: [], flags: [], caseload: [] };

RR.caseload.push(
  {
    id: "cl-referrals",
    title: "The referral pile",
    area: "triage",
    setting: "MSK referral triage",
    brief: "You're triaging this morning's GP referrals. Put them in order of urgency, then decide where each one goes.",
    roles: [
      { k: "sameday", label: "Same day" },
      { k: "urgent", label: "Urgent" },
      { k: "routine", label: "Routine" },
      { k: "redirect", label: "Other service" }
    ],
    critical: "m1",
    pts: [
      { id: "m1", name: "Man, 42", info: "Two weeks of back pain. ‘Now numb in the saddle area and can't feel when he needs to wee.’", tier: 1, best: ["sameday"], ok: [], why: "Suspected CES. Phone him now and send him to ED. Don't wait for an appointment." },
      { id: "m2", name: "Woman, 30", info: "Five weeks postpartum. Both hands and wrists painful, 2 hours of morning stiffness, swollen knuckles.", tier: 2, best: ["redirect"], ok: ["urgent"], why: "Suspected inflammatory arthritis. Urgent rheumatology referral (NICE NG100). Physio isn't the right first service." },
      { id: "m3", name: "Man, 55", info: "Fell onto an outstretched arm 10 days ago. Can't lift the arm; weak external rotation.", tier: 2, best: ["urgent"], ok: ["redirect"], why: "Suspected traumatic cuff tear. Fast-track for imaging and a surgical opinion. Early repair gives better results." },
      { id: "m4", name: "Man, 24", info: "ACL reconstruction 2 weeks ago. Discharged by the surgical team with a rehab protocol.", tier: 3, best: ["urgent"], ok: ["routine"], why: "Post-op rehab should start promptly. Most services have a fast-track post-op pathway." },
      { id: "m5", name: "Woman, 62", info: "Three weeks of knee pain. X-ray shows moderate OA. Walking a mile.", tier: 4, best: ["routine"], ok: [], why: "Routine. Exercise and education are first-line for knee OA." },
      { id: "m6", name: "Woman, 38", info: "Five years of widespread pain, diagnosed with fibromyalgia. Asking for ‘physio for all-over pain’.", tier: 4, best: ["routine"], ok: ["redirect"], why: "Routine. Graded activity and education, or a pain management service if one is available locally." }
    ]
  },

  {
    id: "cl-friday",
    title: "Friday's pile",
    area: "triage",
    setting: "MSK referral triage",
    brief: "Six more referrals before the weekend. Rank them by urgency, then decide where each one goes.",
    roles: [
      { k: "sameday", label: "Same day" },
      { k: "urgent", label: "Urgent" },
      { k: "routine", label: "Routine" },
      { k: "redirect", label: "Other service" }
    ],
    critical: "f1",
    pts: [
      { id: "f1", name: "Woman, 78", info: "On long-term steroids. Fell 2 days ago. Groin pain, can't weight-bear, leg looks shorter.", tier: 1, best: ["sameday"], ok: [], why: "Suspected hip fracture. Contact her today and direct her to ED." },
      { id: "f2", name: "Man, 66", info: "New thoracic back pain, worse at night. Weight loss. Prostate cancer 5 years ago. No neurological symptoms reported.", tier: 2, best: ["sameday"], ok: ["urgent"], why: "Suspected spinal metastases. Discuss with the acute oncology or MSCC team within 24 hours and safety-net for neurological symptoms." },
      { id: "f3", name: "Man, 52", info: "Felt a pop at the back of his thigh while sprinting 5 days ago. Large bruise under the buttock. Weak knee bending.", tier: 3, best: ["urgent"], ok: ["sameday"], why: "Possible proximal hamstring avulsion. Needs an urgent surgical opinion: outcomes from repair are better when it's done early." },
      { id: "f4", name: "Woman, 31", info: "26 weeks pregnant. Pelvic girdle pain, struggling to turn in bed and climb stairs.", tier: 3, best: ["redirect"], ok: ["urgent"], why: "Refer to the pelvic health physiotherapy team, with priority because the pregnancy is progressing." },
      { id: "f5", name: "Man, 81", info: "Legs ache on walking 200 m, easing when he sits or leans on a shopping trolley.", tier: 4, best: ["routine"], ok: [], why: "Sounds like neurogenic claudication from lumbar stenosis. Routine, but check foot pulses to rule out a vascular cause." },
      { id: "f6", name: "Man, 40", info: "Acute wry neck after sleeping awkwardly 10 days ago. Already improving.", tier: 5, best: ["routine"], ok: [], why: "Self-limiting. Routine, or advice and self-management resources." }
    ]
  },

  {
    id: "cl-clinic",
    title: "Monday, 08:15",
    area: "triage",
    setting: "MSK outpatient clinic",
    brief: "Clinic starts at 08:30. You're the Band 6 with a Band 5 on their first MSK rotation and a therapy assistant. Six things need your attention.",
    roles: [
      { k: "me", label: "Me" },
      { k: "b5", label: "Band 5" },
      { k: "ass", label: "Assistant" },
      { k: "later", label: "Later today" }
    ],
    critical: "c1",
    pts: [
      { id: "c1", name: "Voicemail: Mr Khan", info: "Seen last week for sciatica. Since yesterday, numbness ‘down below’ and he's struggling to pass urine.", tier: 1, best: ["me"], ok: [], why: "Possible CES. Call him back now, direct him to ED, and phone ahead." },
      { id: "c2", name: "Your Band 5", info: "Wants to discuss their 09:00 new patient: shoulder pain, history of breast cancer.", tier: 2, best: ["me"], ok: [], why: "Supervise before the appointment, not after. Plan the screening questions together." },
      { id: "c3", name: "08:30 new patient", info: "Arrived early for your knee assessment.", tier: 3, best: ["me"], ok: [], why: "Your own booked patient. Start on time once the urgent call and supervision are done." },
      { id: "c4", name: "Knee OA class, 10:00", info: "Six patients booked. Room and equipment need setting up.", tier: 4, best: ["ass"], ok: [], why: "A good job to delegate. The assistant can set up and run the class from the programme." },
      { id: "c5", name: "GP phone call", info: "Wants advice on a patient with knee OA who's asking for an MRI.", tier: 4, best: ["later"], ok: ["me"], why: "Important but not urgent. Arrange a call back at lunchtime." },
      { id: "c6", name: "Overdue discharge letters", info: "Twelve letters from last week still to be signed off.", tier: 5, best: ["later"], ok: ["me"], why: "Schedule admin time. It matters for GPs, but it doesn't beat patient care this morning." }
    ]
  },

  {
    id: "cl-allocate",
    title: "Who sees whom",
    area: "triage",
    setting: "MSK new patient allocation",
    brief: "You're allocating this week's new patients. Your team: you (Band 6), a Band 5 on their first MSK rotation, a Band 7 advanced practitioner who runs the injection clinic, and group exercise classes. Rank by how soon each should be booked, then allocate.",
    roles: [
      { k: "me", label: "Me" },
      { k: "b5", label: "Band 5" },
      { k: "app", label: "Band 7 APP" },
      { k: "class", label: "Group class" }
    ],
    critical: "a1",
    pts: [
      { id: "a1", name: "Man, 34", info: "Day 10 after an Achilles tendon repair. Surgical protocol starts physio at 2 weeks.", tier: 1, best: ["me"], ok: ["b5"], why: "Time-critical post-op rehab with a protocol to follow. Book first. The Band 5 could take it with support." },
      { id: "a2", name: "Woman, 58", info: "18 months of shoulder pain. Two courses of physio and one injection with no lasting change. Sleep badly affected. Asking about surgery.", tier: 2, best: ["app"], ok: ["me"], why: "Complex and not responding. Needs an advanced practitioner's view on diagnosis, injection or surgical referral." },
      { id: "a3", name: "Woman, 36", info: "Persistent widespread pain, high distress, off work for 6 months.", tier: 3, best: ["me"], ok: [], why: "Complex and psychosocially demanding. Better with an experienced clinician than a first-rotation Band 5." },
      { id: "a4", name: "Man, 24", info: "Ankle sprain 3 weeks ago, improving. Wants to get back to football.", tier: 3, best: ["b5"], ok: ["class"], why: "Straightforward and rewarding. A good case for the Band 5." },
      { id: "a5", name: "Man, 45", info: "Two weeks of acute low back pain. STarT Back low risk.", tier: 4, best: ["b5"], ok: ["class"], why: "Low risk. One session of advice and reassurance, then self-management." },
      { id: "a6", name: "Woman, 70", info: "Knee OA. Keen to exercise, already walking 30 minutes a day.", tier: 4, best: ["class"], ok: ["b5"], why: "Ideal for a group education-and-exercise class such as ESCAPE-pain or GLA:D." }
    ]
  }
);
