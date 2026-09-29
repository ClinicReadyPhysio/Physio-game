/* Caseload scenarios: rank patients by priority, then allocate each one.
 * tier: 1 = see first. Patients sharing a tier can be in either order.
 * best: ideal allocation(s). ok: acceptable alternatives (half marks).
 * critical: id of the patient who must be seen first.
 */
window.RR = window.RR || { cases: [], flags: [], caseload: [] };

RR.caseload.push(
  {
    id: "cl-surgical",
    title: "Monday on surgery",
    area: "resp",
    setting: "General surgical ward, 08:30",
    brief: "You're the Band 6 with Sophie (Band 5, four months into her respiratory rotation) and Raj (Band 3 therapy assistant). Six referrals are waiting.",
    roles: [
      { k: "me", label: "Me" },
      { k: "b5", label: "Band 5" },
      { k: "ass", label: "Assistant" },
      { k: "none", label: "No physio" }
    ],
    critical: "s1",
    pts: [
      { id: "s1", name: "Mrs Okafor, 71", info: "Day 2 after a laparotomy. Overnight O2 went from 2 L to 5 L, SpO2 92%, RR 26. Weak, painful cough, crackles left base.", tier: 1, best: ["me"], ok: [], why: "Deteriorating and physio-amenable. The most complex and unstable patient needs the most experienced clinician first." },
      { id: "s2", name: "Mr Hughes, 59", info: "Day 1 after a laparoscopic right hemicolectomy (enhanced recovery pathway). Obs stable on room air. First mobilisation due.", tier: 2, best: ["b5"], ok: ["me"], why: "Day-1 mobilisation is time-sensitive on enhanced recovery. A routine first post-op assessment suits a Band 5." },
      { id: "s3", name: "Mrs Clarke, 82", info: "Day 5 after a laparotomy. Medically fit for discharge today. Lives in a first-floor flat and needs a stairs assessment.", tier: 2, best: ["b5"], ok: ["me"], why: "Discharges are time-critical for patient flow and transport. A straightforward stairs assessment suits a Band 5." },
      { id: "s4", name: "Mr Ahmed, 77", info: "Day 4 after surgery. Established plan: walking 20 m with a frame and one assist, daily practice.", tier: 3, best: ["ass"], ok: ["b5"], why: "A stable patient on an established plan: ideal for the assistant." },
      { id: "s5", name: "Mrs Doyle, 62", info: "Day 1 after surgery. SpO2 97% on room air, no chest concerns. Surgeon has written ‘chest physio please’.", tier: 4, best: ["b5"], ok: ["ass", "none"], why: "Low risk. A brief screen, advice on early mobilisation and deep breathing, then likely discharge from physio." },
      { id: "s6", name: "Mr Lewis, 45", info: "Day 3 after an appendicectomy. Walking independently on the ward. Nurse's routine referral: ‘please see’.", tier: 5, best: ["none"], ok: ["ass"], why: "Independent. No physio need. Check with the nurse by phone and close the referral." }
    ]
  },

  {
    id: "cl-oncall",
    title: "01:30 and four bleeps",
    area: "resp",
    setting: "Respiratory on-call, alone",
    brief: "You're the on-call physio. Four calls come in within ten minutes. Decide the order, then whether to attend.",
    roles: [
      { k: "attend", label: "Attend" },
      { k: "advise", label: "Phone advice" },
      { k: "decline", label: "Not for physio" }
    ],
    critical: "o1",
    pts: [
      { id: "o1", name: "ICU bed 4", info: "Intubated. SpO2 suddenly down to 86% on FiO2 0.7. Left lower lobe collapse on CXR, thick secretions. ICU registrar asking you to come now.", tier: 1, best: ["attend"], ok: [], why: "Acute, severe and physio-amenable, with the medical team asking for you. Go first." },
      { id: "o2", name: "Surgical ward, 70M", info: "Day 2 after a laparotomy. SpO2 91% on 4 L (was 95% on 2 L). Weak cough, can't clear secretions. Stable for 2 hours.", tier: 2, best: ["attend"], ok: [], why: "Physio-amenable and won't improve by morning. Go second, and ask the nurse to get medical review of the rising O2 need meanwhile." },
      { id: "o3", name: "Medical ward, 88F", info: "Known heart failure. Frothy pink sputum, SpO2 88% on 4 L, fine crackles both bases. Nurse: ‘she sounds wet’.", tier: 3, best: ["decline"], ok: ["advise"], why: "Sounds like pulmonary oedema, which needs urgent medical treatment, not physio. Tell the nurse to call the medical team now." },
      { id: "o4", name: "Respiratory ward, 56M", info: "COPD on NIV. Gas improving. Anxious and asking for ‘physio to help my breathing’.", tier: 4, best: ["advise"], ok: ["decline"], why: "Stable. Advise on positioning and mask comfort by phone, and hand over to the day team." }
    ]
  },

  {
    id: "cl-msktriage",
    title: "The referral pile",
    area: "msk",
    setting: "MSK referral triage",
    brief: "You're triaging this morning's GP referrals. Put them in order of urgency, then decide where each one goes.",
    roles: [
      { k: "ed", label: "ED today" },
      { k: "urgent", label: "Urgent" },
      { k: "routine", label: "Routine" },
      { k: "redirect", label: "Other service" }
    ],
    critical: "m1",
    pts: [
      { id: "m1", name: "Man, 42", info: "Two weeks of back pain. ‘Now numb in the saddle area and can't feel when he needs to wee.’", tier: 1, best: ["ed"], ok: [], why: "Suspected CES. Phone the patient now and send them to ED. Don't wait for an appointment." },
      { id: "m2", name: "Woman, 30", info: "Five weeks postpartum. Both hands and wrists painful, 2 hours of morning stiffness, swollen knuckles.", tier: 2, best: ["redirect"], ok: ["urgent"], why: "Suspected inflammatory arthritis. Urgent rheumatology referral (NICE NG100). Physio isn't the right first service." },
      { id: "m3", name: "Man, 55", info: "Fell onto an outstretched arm 10 days ago. Can't lift the arm; weak external rotation.", tier: 2, best: ["urgent"], ok: ["redirect"], why: "Suspected traumatic cuff tear. Fast-track for imaging and a surgical opinion. Early repair gives better results." },
      { id: "m4", name: "Man, 24", info: "ACL reconstruction 2 weeks ago. Discharged by the surgical team with a rehab protocol.", tier: 3, best: ["urgent"], ok: ["routine"], why: "Post-op rehab should start promptly. Most services have an expedited post-op pathway." },
      { id: "m5", name: "Woman, 62", info: "Three weeks of knee pain. X-ray shows moderate OA. Walking a mile.", tier: 4, best: ["routine"], ok: [], why: "Routine. Exercise and education are first-line for knee OA." },
      { id: "m6", name: "Woman, 38", info: "Five-year history of widespread pain, diagnosed with fibromyalgia. Asking for ‘physio for all-over pain’.", tier: 4, best: ["routine"], ok: ["redirect"], why: "Routine. Graded activity and education, or a pain management service if one is available locally." }
    ]
  },

  {
    id: "cl-stroke",
    title: "Tuesday on the stroke unit",
    area: "neuro",
    setting: "Acute stroke unit, 08:45",
    brief: "You're the Band 6 with a Band 5 on their neuro rotation and a therapy assistant. Six patients need seeing.",
    roles: [
      { k: "me", label: "Me" },
      { k: "b5", label: "Band 5" },
      { k: "ass", label: "Assistant" },
      { k: "none", label: "Not today" }
    ],
    critical: "k1",
    pts: [
      { id: "k1", name: "Mr Grant, 81", info: "Day 3. New aspiration pneumonia, SpO2 93% on 2 L, weak cough, secretions pooling.", tier: 1, best: ["me"], ok: ["b5"], why: "An acute respiratory problem comes first. The senior clinician takes the most unstable patient." },
      { id: "k2", name: "Mrs Hale, 76", info: "Day 12. Left hemiplegia with pushing. Has slipped from her chair twice. Nurses need a positioning plan.", tier: 2, best: ["me"], ok: [], why: "A safety risk that needs a senior-led MDT handling plan today." },
      { id: "k3", name: "Mr Obi, 64", info: "Day 1. Right MCA stroke, thrombolysed yesterday. Needs an initial physio assessment.", tier: 2, best: ["b5"], ok: ["me"], why: "Initial assessment should happen within 72 hours. A good learning opportunity for the Band 5, with support." },
      { id: "k4", name: "Mrs Singh, 70", info: "Day 20. Medically fit, going home today after last week's home visit. Needs a final stairs check.", tier: 2, best: ["b5"], ok: ["ass"], why: "Time-sensitive discharge and a straightforward task." },
      { id: "k5", name: "Mr Byrne, 68", info: "Day 6. Established walking practice with a frame and one assist. Stable.", tier: 3, best: ["ass"], ok: ["b5"], why: "Stable, on an established plan: the assistant can deliver it." },
      { id: "k6", name: "Mrs Webb, 88", info: "Day 30. Waiting for a care home place. On a maintenance exercise programme.", tier: 4, best: ["ass"], ok: ["none"], why: "Lowest clinical priority. The assistant can continue her programme." }
    ]
  }
);
