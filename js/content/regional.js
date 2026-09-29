/* MSK cases: regional presentations, inflammatory and persistent pain,
 * and supervision. Schema: see msk.js. */
window.RR = window.RR || { cases: [], flags: [], caseload: [] };

RR.cases.push(
  {
    id: "lbp-psych",
    title: "Hurt equals harm",
    area: "spine",
    setting: "MSK outpatients",
    mins: 5,
    patient: "Sarah, 41, care home assistant",
    intro: "Six weeks of low back pain after helping a resident up. No leg pain. Red flag screen negative. Off work for 4 weeks. GP letter: ‘Patient requesting MRI.’",
    stages: [
      {
        skill: "person",
        notes: [
          "‘Every time it twinges I think something's going to snap.’",
          "Avoids bending. Sleeping on the sofa. Worried she'll lose her job.",
          "STarT Back Tool: total 7/9, psychosocial subscale 5/5."
        ],
        q: "What does her STarT Back result tell you?",
        options: [
          { t: "High risk of a poor outcome, mainly because of psychosocial factors. She needs psychologically informed physiotherapy.", s: 10, fb: "Correct. A total of 4+ with a psychosocial subscale of 4+ puts her in the high-risk group." },
          { t: "Medium risk: standard physiotherapy", s: 3, fb: "Medium risk needs a subscale score of 3 or less. Hers is 5." },
          { t: "Low risk: advice and self-management", s: 0, fb: "Low risk is a total of 3 or less." },
          { t: "High risk, so she needs an MRI", s: 1, fb: "The tool stratifies care. It says nothing about imaging." }
        ],
        why: "In the STarT Back trial, matching treatment to risk group improved disability and was cost-effective. High-risk patients got physiotherapy that addressed beliefs, fear and distress alongside exercise."
      },
      {
        skill: "escalate",
        q: "She asks for an MRI ‘to see what's damaged’. What's the best response?",
        options: [
          { t: "Explain that scans aren't recommended for back pain like hers because they rarely change treatment and often show normal age changes that add worry. Then ask what she's afraid a scan would show.", s: 10, fb: "Correct. Honest, and it opens up the fear behind the request." },
          { t: "Agree to ask for one, to reassure her", s: 2, fb: "Imaging without a clinical reason tends to increase worry and healthcare use, not reduce them." },
          { t: "Tell her scans are a waste of NHS money", s: 1, fb: "Dismissive. It will damage trust." },
          { t: "Say she can have one if she isn't better in 6 weeks", s: 3, fb: "Makes the scan a goal. Imaging should depend on whether the result would change management." }
        ],
        why: "NICE NG59: don't routinely offer imaging for low back pain in a non-specialist setting. Explore the concern behind a scan request. It's usually fear, or wanting to be believed."
      },
      {
        skill: "interpret",
        notes: ["Her GP had already ordered an MRI. Report: ‘Disc desiccation L4/5 and L5/S1. Broad-based disc bulge L4/5. Mild facet arthropathy. No neural compromise.’"],
        q: "How do you explain the report to her?",
        options: [
          { t: "‘These are very common in people your age who have no back pain at all, a bit like wrinkles on the inside. Nothing is pressing on a nerve, and nothing here means your back is fragile.’", s: 10, fb: "Correct. Accurate, reassuring and without threatening language." },
          { t: "‘You have degenerative disc disease, so avoid heavy lifting.’", s: 0, fb: "A label that implies ongoing damage, with advice that reinforces fear." },
          { t: "‘The bulge is causing your pain, so we'll need to protect it.’", s: 2, fb: "The link between bulges and pain is weak, and ‘protect it’ adds threat." },
          { t: "‘I can't comment on scans. Ask your GP.’", s: 3, fb: "You can, and you should. Leaving it unexplained lets her fill the gap with worry." }
        ],
        why: "Brinjikji et al. (2015): in people with no back pain, around two-thirds of 40-year-olds have disc degeneration and half have disc bulges. Words like ‘degenerative’, ‘wear and tear’ and ‘crumbling’ increase threat."
      },
      {
        skill: "manage",
        q: "What's the best plan?",
        options: [
          { t: "Validate her pain, explain it, set shared goals, and use graded exposure to bending and lifting. Plan a phased return to work with her employer; your fit note can recommend adjusted duties.", s: 10, fb: "Correct. It targets her fear, her function and her job." },
          { t: "Massage and TENS until the pain settles, then start exercise", s: 2, fb: "Passive care delays the active work and implies she must be pain-free first." },
          { t: "Core stability exercises to protect her spine", s: 3, fb: "The exercise is fine, but ‘protect’ tells her the spine is vulnerable." },
          { t: "Stay off work until she's pain-free", s: 0, fb: "Long absence predicts poorer recovery. Work is part of treatment." }
        ],
        why: "NICE NG59 recommends exercise, with psychological approaches for people with obstacles to recovery. In England, physiotherapists can issue fit notes."
      }
    ],
    pearl: "The strongest predictors of persistent back pain are usually in the history, not the scan: beliefs, fear, mood and work. Ask about them as carefully as you screen for red flags.",
    refs: ["NICE NG59: Low back pain and sciatica in over 16s", "Hill et al., Lancet 2011: STarT Back trial", "Brinjikji et al., AJNR 2015: imaging findings in people without back pain"]
  },

  {
    id: "axspa-supervision",
    title: "Eight sessions, no better",
    area: "spine",
    setting: "MSK outpatients, supervising a Band 5",
    mins: 5,
    patient: "Josh, 27, software developer",
    intro: "Your Band 5 catches you between patients: ‘Josh has had 8 sessions for mechanical low back pain. His core exercises are great, but he's no better. I'm thinking of discharging him.’",
    stages: [
      {
        skill: "escalate",
        q: "What's the most useful first step?",
        options: [
          { t: "Ask them to talk you through their reasoning: the original hypotheses, what they've tested and what doesn't fit. Then suggest reviewing Josh together.", s: 10, fb: "Correct. It revisits the diagnosis and turns the case into supervision." },
          { t: "Agree to discharge. He's had plenty of sessions.", s: 1, fb: "Closes the case without asking why it hasn't worked." },
          { t: "Suggest adding manual therapy", s: 2, fb: "Changes the treatment without questioning the diagnosis.", bias: "momentum" },
          { t: "Take the patient over yourself", s: 3, fb: "It might help Josh, but your Band 5 learns nothing." }
        ],
        why: "When a patient isn't improving as expected, question the diagnosis before changing the treatment."
      },
      {
        skill: "hypothesis",
        notes: [
          "Pain started gradually at 23. Morning stiffness about 90 minutes.",
          "Wakes around 4am with back pain that eases once he gets up and moves.",
          "Better with exercise, worse with rest. Alternating buttock pain.",
          "Ibuprofen ‘works really well’. Had a swollen, painful heel last year."
        ],
        q: "What's your leading hypothesis now?",
        options: [
          { t: "Axial spondyloarthritis", s: 10, fb: "Correct. Classic inflammatory back pain, plus enthesitis and a strong response to NSAIDs." },
          { t: "Non-specific low back pain with poor exercise adherence", s: 1, fb: "His adherence is good. The original label is being carried forward despite what the history now shows.", bias: "anchoring" },
          { t: "Lumbar disc prolapse", s: 1, fb: "No leg pain or neurology, and the pattern improves with activity." },
          { t: "Sacroiliac joint dysfunction", s: 3, fb: "The buttock pain may be coming from the SIJ, but ‘dysfunction’ misses the inflammatory cause." }
        ],
        why: "Inflammatory back pain: onset before 40, gradual, better with exercise but not rest, waking in the second half of the night, and long morning stiffness. Diagnosis in the UK is often delayed by 8 years or more."
      },
      {
        skill: "flags",
        q: "What do you do?",
        options: [
          { t: "Refer to rheumatology for spondyloarthritis assessment (he meets NICE referral criteria), let the GP know, and keep him exercising", s: 10, fb: "Correct. Exercise stays central, but he needs a specialist diagnosis and possibly disease-modifying treatment." },
          { t: "Request an X-ray of his sacroiliac joints", s: 3, fb: "X-rays are often normal early in the disease. Rheumatology will decide on imaging, usually MRI." },
          { t: "Refer to orthopaedics for a lumbar MRI", s: 2, fb: "Wrong specialty, and a lumbar MRI can miss sacroiliitis." },
          { t: "Continue physio and review in 6 weeks", s: 1, fb: "Adds to an already long delay." }
        ],
        why: "NICE NG65: if back pain started before 45 and has lasted over 3 months, refer to rheumatology when 4 or more features are present. These include onset before 35, waking in the second half of the night, buttock pain, improvement with movement, improvement within 48 hours of NSAIDs, enthesitis, psoriasis, and a relative with SpA. Josh has 6."
      },
      {
        skill: "escalate",
        q: "How do you close the loop with your Band 5?",
        options: [
          { t: "Debrief: which cues were there, which bias kept the first label going, and a learning goal such as screening for inflammatory back pain at every initial assessment", s: 10, fb: "Correct. Supportive, specific and forward-looking." },
          { t: "Tell them they missed it", s: 1, fb: "True, but blame without learning makes people less likely to ask for help." },
          { t: "Say nothing. The patient's sorted.", s: 0, fb: "A missed teaching moment." },
          { t: "Email them the NICE guideline", s: 4, fb: "Useful, but it won't build the reasoning habit on its own." }
        ],
        why: "Naming the bias makes it easier to spot next time."
      }
    ],
    pearl: "When a patient isn't getting better, go back to the diagnosis before you change the treatment. A stuck case is often a wrong hypothesis.",
    refs: ["NICE NG65: Spondyloarthritis in over 16s", "National Axial Spondyloarthritis Society (NASS)"]
  },

  {
    id: "cx-radic",
    title: "Down to the thumb",
    area: "spine",
    setting: "MSK outpatients",
    mins: 4,
    patient: "Leanne, 46, hairdresser",
    intro: "Three weeks of neck pain with sharp pain down the right arm into the thumb and index finger, plus pins and needles. Worse looking up to wash clients' hair.",
    stages: [
      {
        skill: "hypothesis",
        q: "What's your leading hypothesis?",
        options: [
          { t: "C6 cervical radiculopathy", s: 10, fb: "Correct. Dermatomal arm pain, paraesthesia, and provocation by neck extension." },
          { t: "Carpal tunnel syndrome", s: 3, fb: "The median nerve covers the thumb and index finger, but CTS doesn't explain the neck pain or arm pain on neck extension." },
          { t: "Rotator cuff related shoulder pain", s: 1, fb: "Doesn't explain the pain below the elbow or the paraesthesia." },
          { t: "Thoracic outlet syndrome", s: 2, fb: "Possible but much rarer, and TOS usually affects the ulnar side of the hand." }
        ],
        why: "In radiculopathy, arm pain is often worse than neck pain. C6 refers to the thumb and index finger; C7 to the middle finger; C8 to the little finger."
      },
      {
        skill: "assessment",
        multi: true,
        q: "Which tests make up the most useful cluster to confirm it? Select all that apply.",
        options: [
          { t: "Upper limb neurodynamic test 1 (median nerve bias)", ok: true, fb: "Yes. The most sensitive test in the cluster." },
          { t: "Spurling's test", ok: true, fb: "Yes. Specific, but not very sensitive." },
          { t: "Neck distraction test", ok: true, fb: "Yes. Relief of arm symptoms on distraction supports the diagnosis." },
          { t: "Phalen's test", ok: false, fb: "A carpal tunnel test." },
          { t: "Hawkins-Kennedy test", ok: false, fb: "A shoulder test." }
        ],
        why: "Wainner et al. (2003): the cluster is ULNT1, Spurling's, distraction, and cervical rotation under 60° to the affected side. With 3 positive, radiculopathy becomes considerably more likely. With all 4 positive, it's very likely."
      },
      {
        skill: "interpret",
        notes: ["ULNT1 positive. Distraction eases her arm pain. Spurling's is negative."],
        q: "Spurling's test is highly specific but has low sensitivity. What does her negative Spurling's mean?",
        options: [
          { t: "Very little on its own. A low-sensitivity test often misses true cases, so a negative doesn't rule radiculopathy out.", s: 10, fb: "Correct." },
          { t: "It rules out radiculopathy", s: 0, fb: "Only a negative on a highly sensitive test helps rule out." },
          { t: "It points to CTS instead", s: 0, fb: "A negative neck test doesn't confirm a wrist diagnosis." },
          { t: "It's a false negative, so ignore it", s: 3, fb: "It's probably not informative, but ‘ignore’ is the wrong habit. Weigh every test against its accuracy." }
        ],
        why: "SpPIn and SnNOut: a positive on a highly Specific test helps rule In. A negative on a highly Sensitive test helps rule Out."
      },
      {
        skill: "manage",
        notes: ["Wrist extension 4+/5 on the right. Reduced biceps and brachioradialis reflexes. No upper motor neurone signs, gait normal. Arm pain disturbs her sleep."],
        q: "What's your plan?",
        options: [
          { t: "Explain the usually good outlook, talk to her GP about pain relief (including neuropathic options), advise on positions of ease and start graded exercise. Monitor neurology. Refer to spinal services if weakness progresses or pain stays severe.", s: 10, fb: "Correct. Active, and monitored with clear triggers for referral." },
          { t: "Urgent surgical referral because of the weakness", s: 2, fb: "Mild, stable weakness doesn't need urgent surgery. Progressive or severe weakness does." },
          { t: "Cervical manipulation to take pressure off the nerve", s: 2, fb: "Not first-line in acute radiculopathy, and the risk isn't worth it." },
          { t: "A soft collar for 6 weeks", s: 1, fb: "Prolonged immobilisation isn't recommended." }
        ],
        why: "Most cervical radiculopathy improves over weeks to months without surgery. Monitor for progressive motor loss and signs of myelopathy."
      }
    ],
    pearl: "Know what each test can and can't do. A negative on a low-sensitivity test tells you very little. Clusters beat single tests.",
    refs: ["Wainner et al., Spine 2003: clinical prediction rule for cervical radiculopathy", "NICE CKS: Neck pain, cervical radiculopathy"]
  },

  {
    id: "shoulder-rcrsp",
    title: "The decompression question",
    area: "upper",
    setting: "MSK outpatients",
    mins: 4,
    patient: "Graham, 58, keen golfer",
    intro: "Five months of pain on the outside of his shoulder. A private surgeon has suggested a subacromial decompression ‘to make more space’. He wants your opinion.",
    stages: [
      {
        skill: "hypothesis",
        notes: ["Full passive range. Painful arc on abduction. Pain on resisted abduction and external rotation. Neck screen clear."],
        q: "What's the most likely diagnosis?",
        options: [
          { t: "Rotator cuff related shoulder pain", s: 10, fb: "Correct. Pain on loading with full passive range." },
          { t: "Frozen shoulder", s: 1, fb: "Passive range is full." },
          { t: "Acromioclavicular joint pain", s: 4, fb: "Possible, but ACJ pain is usually felt on top of the shoulder, with a painful arc near the end of range." },
          { t: "Glenohumeral osteoarthritis", s: 1, fb: "OA restricts passive range." }
        ],
        why: "‘Rotator cuff related shoulder pain’ has replaced ‘impingement’. Special tests can't reliably identify which structure is at fault, so they add little to treatment decisions."
      },
      {
        skill: "manage",
        q: "What does the evidence say about the decompression?",
        options: [
          { t: "Two large trials found decompression no better than a placebo operation for this kind of shoulder pain. Exercise-based rehab is first-line.", s: 10, fb: "Correct. CSAW and FIMPACT." },
          { t: "Surgery gives better long-term results than rehab", s: 1, fb: "Not supported by the trials." },
          { t: "Decompression is indicated once pain lasts over 3 months", s: 0, fb: "There's no time-based trigger for surgery." },
          { t: "It depends on the shape of his acromion", s: 2, fb: "Acromion shape doesn't predict who does well." }
        ],
        why: "CSAW (Lancet, 2018): decompression was no better than arthroscopy alone. FIMPACT (BMJ, 2018): no better than diagnostic arthroscopy or exercise."
      },
      {
        skill: "manage",
        q: "How do you set up his exercise programme?",
        options: [
          { t: "Progressive cuff and shoulder loading, moving on to functional and golf-specific work. Allow pain up to about 4–5/10 if it settles within 24 hours. Progress over around 12 weeks.", s: 10, fb: "Correct. A pain-monitoring approach with enough load to drive change." },
          { t: "Stop golf and all overhead activity until he's pain-free", s: 2, fb: "Unloading alone rarely resolves it, and he may lose what matters to him." },
          { t: "Low-load, pain-free exercises only", s: 4, fb: "Often underdosed. Some pain during exercise is acceptable." },
          { t: "Scapular posture exercises alone", s: 3, fb: "Posture correction on its own doesn't load the cuff." }
        ],
        why: "The pain-monitoring model (Silbernagel) allows exercise with some pain, as long as it settles by the next day and isn't worsening week to week."
      },
      {
        skill: "escalate",
        notes: ["At 6 weeks he's 30% better, but pain still limits his golf. He asks about a steroid injection."],
        q: "What do you say?",
        options: [
          { t: "Discuss it as an option for short-term pain relief that can help him keep loading, explain the risks, and offer or refer through the local pathway", s: 10, fb: "Correct. An honest account of what it can and can't do." },
          { t: "Refuse. Injections damage tendons.", s: 2, fb: "Overstated. A single injection carries a small risk and gives short-term benefit." },
          { t: "Tell him it will cure the problem", s: 1, fb: "The effect usually lasts weeks, not a cure." },
          { t: "Stop rehab and have the injection instead", s: 2, fb: "The injection supports the rehab. It doesn't replace it." }
        ],
        why: "Subacromial steroid injection gives short-term pain relief. Combined with exercise, it can help people keep going with rehab."
      }
    ],
    pearl: "Full passive range with pain on loading points to the cuff. The ‘impingement’ story sells surgery; the evidence supports loading.",
    refs: ["Beard et al., Lancet 2018: CSAW trial", "Paavola et al., BMJ 2018: FIMPACT trial", "BESS/BOA Patient Care Pathway: Subacromial shoulder pain (Kulkarni et al., 2015)"]
  },

  {
    id: "elbow-lateral",
    title: "Tennis without the tennis",
    area: "upper",
    setting: "MSK outpatients",
    mins: 3,
    patient: "Deb, 45, painter and decorator",
    intro: "Three months of lateral elbow pain, worse gripping brushes and lifting paint tins. Had a steroid injection from her GP 2 months ago. It helped for 3 weeks.",
    stages: [
      {
        skill: "assessment",
        multi: true,
        q: "Which findings support lateral elbow tendinopathy? Select all that apply.",
        options: [
          { t: "Pain on resisted wrist or middle finger extension", ok: true, fb: "Yes." },
          { t: "Reduced pain-free grip strength compared with the other side", ok: true, fb: "Yes. It's also a useful outcome measure." },
          { t: "Tenderness at the lateral epicondyle", ok: true, fb: "Yes." },
          { t: "Arm pain and tingling reproduced by neck movements", ok: false, fb: "Points to the neck. Cervical radiculopathy can mimic or coexist with lateral elbow pain." },
          { t: "Locking and clicking of the elbow", ok: false, fb: "Suggests an intra-articular problem." }
        ],
        why: "Always screen the neck in lateral elbow pain."
      },
      {
        skill: "manage",
        q: "She asks for another steroid injection. What do you advise?",
        options: [
          { t: "Explain that injections relieve pain in the short term but are linked to worse outcomes and more recurrence at one year. Progressive loading and changes to how she works are a better long-term plan.", s: 10, fb: "Correct." },
          { t: "Have another. They're harmless.", s: 1, fb: "The evidence suggests they slow recovery." },
          { t: "Try a third if the second doesn't work", s: 0, fb: "Repeated injections make the long-term outlook worse." },
          { t: "Rest the arm in a splint", s: 2, fb: "Complete rest doesn't restore the tendon's capacity." }
        ],
        why: "Bisset et al. (BMJ, 2006) and Coombes et al. (JAMA, 2013): steroid injection gave better short-term results but worse outcomes at one year, with more recurrence."
      },
      {
        skill: "person",
        q: "She's self-employed and can't take time off. What's the best plan for her work?",
        options: [
          { t: "Change the load: lighter or thicker-handled tools, varied grip, pacing and breaks, and a brace if it helps. Start isometric, then progressive wrist extensor loading. Explain that recovery often takes months.", s: 10, fb: "Correct. It fits her livelihood and builds capacity." },
          { t: "Stop work for 6 weeks", s: 2, fb: "Not realistic for her, and rest alone won't fix it." },
          { t: "Work through the pain and ignore it", s: 2, fb: "Unmanaged load keeps the tendon irritated." },
          { t: "Deep friction massage as the main treatment", s: 3, fb: "May ease pain briefly, but it doesn't build capacity." }
        ],
        why: "Education, load modification and exercise are the core of treatment. Most people improve over 6 to 12 months."
      }
    ],
    pearl: "Short-term relief can cost long-term recovery. Know how the effect of each treatment changes over time, not just how it feels this week.",
    refs: ["Bisset et al., BMJ 2006", "Coombes et al., JAMA 2013"]
  },

  {
    id: "wrist-scaphoid",
    title: "Just a sprain",
    area: "upper",
    setting: "MSK first contact",
    mins: 3,
    patient: "Ryan, 19, skateboarder",
    intro: "Fell onto an outstretched hand 10 days ago. The minor injuries unit X-rayed it: ‘No fracture seen. Wrist sprain.’ Still sore and struggling to grip.",
    stages: [
      {
        skill: "flags",
        notes: ["Tender in the anatomical snuffbox and over the scaphoid tubercle. Pain on pushing the thumb along its long axis."],
        q: "What's your leading concern?",
        options: [
          { t: "A scaphoid fracture that didn't show on the first X-ray", s: 10, fb: "Correct. Mechanism and findings fit, whatever the first X-ray showed." },
          { t: "Wrist sprain, since the X-ray was normal", s: 1, fb: "The label from the minor injuries unit is doing your thinking for you.", bias: "momentum" },
          { t: "De Quervain's tenosynovitis", s: 2, fb: "An overuse condition. This started with a fall." },
          { t: "Distal radius fracture", s: 2, fb: "Tenderness is over the scaphoid, not the radius." }
        ],
        why: "Scaphoid fractures are often invisible on the first X-ray."
      },
      {
        skill: "escalate",
        q: "What do you do?",
        options: [
          { t: "Splint the wrist and arrange further imaging through the local fracture pathway (e.g. virtual fracture clinic or ED)", s: 10, fb: "Correct. Protect it now and get definitive imaging." },
          { t: "Start wrist mobility and strengthening", s: 0, fb: "Loading an unprotected fracture risks non-union." },
          { t: "Repeat the X-ray in 6 weeks if it's still sore", s: 3, fb: "Too slow. It risks the fracture healing badly or not at all." },
          { t: "Refer routinely to hand therapy", s: 2, fb: "Doesn't get him imaged or protected." }
        ],
        why: "NICE NG38 recommends considering MRI for suspected scaphoid fractures. A missed fracture risks non-union and avascular necrosis."
      },
      {
        skill: "interpret",
        notes: ["MRI: undisplaced fracture of the scaphoid waist."],
        q: "Which part of the scaphoid is most at risk of avascular necrosis after a fracture?",
        options: [
          { t: "The proximal pole, because the blood supply enters distally", s: 10, fb: "Correct. The proximal fragment can lose its blood supply." },
          { t: "The distal tubercle", s: 2, fb: "The tubercle is well supplied and usually heals well." },
          { t: "All parts heal equally well", s: 0, fb: "Healing depends on location." },
          { t: "Waist fractures never cause problems", s: 0, fb: "Waist fractures are the most common and still carry a risk of non-union." }
        ],
        why: "The scaphoid's blood supply runs from distal to proximal. The more proximal the fracture, the higher the risk of non-union and avascular necrosis."
      }
    ],
    pearl: "A normal X-ray isn't a normal wrist. Examine the patient in front of you, not the report.",
    refs: ["NICE NG38: Fractures (non-complex): assessment and management"]
  },

  {
    id: "hip-gluteal",
    title: "Can't lie on that side",
    area: "lower",
    setting: "MSK outpatients",
    mins: 3,
    patient: "Helen, 56, recently joined a walking group",
    intro: "Six months of lateral hip pain. Worse on stairs, standing on one leg, lying on either side, and crossing her legs.",
    stages: [
      {
        skill: "assessment",
        q: "Which test is most useful for confirming gluteal tendinopathy?",
        options: [
          { t: "Single-leg stance for 30 seconds, reproducing lateral hip pain", s: 10, fb: "Correct. A positive result has high specificity." },
          { t: "FADIR", s: 3, fb: "Mainly a test for intra-articular hip pain." },
          { t: "Trendelenburg sign", s: 4, fb: "Shows abductor weakness, but it isn't diagnostic." },
          { t: "Thomas test", s: 1, fb: "Assesses hip flexor length." }
        ],
        why: "Grimaldi et al. (2017): greater trochanter tenderness is sensitive, so no tenderness makes gluteal tendinopathy unlikely. Single-leg stance and loaded adduction tests are specific, so a positive result helps confirm it."
      },
      {
        skill: "manage",
        q: "What advice matters most early on?",
        options: [
          { t: "Reduce compression of the tendon: don't cross your legs or hang on one hip when standing, put a pillow between your knees in side-lying, and avoid low chairs", s: 10, fb: "Correct. Hip adduction compresses the tendon against the trochanter." },
          { t: "Stretch the ITB and glutes every day", s: 1, fb: "Stretching into adduction adds compression and often makes it worse." },
          { t: "Stop walking completely", s: 2, fb: "She can often keep walking with adjusted distance and pace." },
          { t: "Foam roll the outside of the thigh", s: 2, fb: "Compresses the irritated area." }
        ],
        why: "Tendons respond to both tension and compression. For gluteal tendinopathy, cutting compression usually brings the quickest relief."
      },
      {
        skill: "manage",
        q: "She asks whether a steroid injection is better than physio.",
        options: [
          { t: "In the LEAP trial, education plus exercise did better than a steroid injection at 8 weeks and at 1 year", s: 10, fb: "Correct." },
          { t: "The injection is better both short and long term", s: 1, fb: "Not what the trial found." },
          { t: "They work equally well", s: 3, fb: "Education plus exercise did better." },
          { t: "Surgery has the best evidence", s: 0, fb: "Surgery is only for a small number who don't respond to other treatment." }
        ],
        why: "LEAP (Mellor et al., BMJ 2018) compared education plus exercise, a single steroid injection, and wait-and-see. Education plus exercise had the best outcomes."
      }
    ],
    pearl: "Know what load aggravates the tissue you're treating. For gluteal tendons, compression matters as much as tension.",
    refs: ["Mellor et al., BMJ 2018: LEAP trial", "Grimaldi et al., Am J Sports Med 2017: clinical tests for gluteal tendinopathy"]
  },

  {
    id: "knee-oa",
    title: "Bone on bone",
    area: "lower",
    setting: "MSK outpatients",
    mins: 4,
    patient: "Tony, 67, retired builder",
    intro: "Two years of right knee pain, worse walking and on stairs. Morning stiffness about 15 minutes. ‘The X-ray said bone on bone. I reckon I need a new knee, or at least a clean-out.’",
    stages: [
      {
        skill: "interpret",
        q: "Does he need imaging to diagnose knee osteoarthritis?",
        options: [
          { t: "No. OA can be diagnosed clinically in people aged 45+ with activity-related joint pain and no morning stiffness, or stiffness of 30 minutes or less.", s: 10, fb: "Correct. That's the NICE clinical diagnosis." },
          { t: "Yes. An MRI shows the cartilage.", s: 1, fb: "Not needed for diagnosis, and it rarely changes management." },
          { t: "Yes. Everyone needs a weight-bearing X-ray.", s: 2, fb: "Only when the diagnosis is uncertain or other conditions are suspected." },
          { t: "Only if his blood tests are normal", s: 1, fb: "Bloods aren't needed for a typical presentation." }
        ],
        why: "NICE NG226 (2022): diagnose OA clinically without imaging in typical cases. How bad the X-ray looks is a poor guide to pain and function."
      },
      {
        skill: "person",
        q: "He's worried walking will ‘wear the joint out’. What do you say?",
        options: [
          { t: "‘Joints need movement to stay healthy. Exercise reduces pain and helps you do more, and the X-ray doesn't tell us what you're capable of.’", s: 10, fb: "Correct. It reframes the threat and supports activity." },
          { t: "‘Yes, rest it to save the cartilage.’", s: 0, fb: "Inactivity leads to weakness, more pain and weight gain." },
          { t: "‘Avoid stairs and long walks.’", s: 2, fb: "Encourages avoidance he doesn't need." },
          { t: "‘Only swimming is safe for you.’", s: 3, fb: "Swimming is fine, but land-based strengthening matters too." }
        ],
        why: "‘Bone on bone’ and ‘wear and tear’ increase fear and avoidance. Education and exercise programmes such as GLA:D and ESCAPE-pain improve pain and function."
      },
      {
        skill: "manage",
        q: "He asks about a knee arthroscopy ‘clean-out’.",
        options: [
          { t: "Arthroscopic washout and debridement doesn't help OA and isn't recommended unless there's a clear history of the knee mechanically locking", s: 10, fb: "Correct." },
          { t: "Good idea. It smooths the cartilage.", s: 0, fb: "Trials show no meaningful benefit." },
          { t: "Only if an MRI shows a meniscal tear", s: 2, fb: "Degenerative meniscal tears are common, and arthroscopy for them does no better than placebo surgery." },
          { t: "It will delay the need for a knee replacement", s: 1, fb: "There's no evidence for that." }
        ],
        why: "Kirkley et al. (NEJM, 2008) found no benefit from arthroscopy for knee OA. Sihvonen et al. (NEJM, 2013) found partial meniscectomy no better than sham surgery for degenerative tears."
      },
      {
        skill: "manage",
        q: "What's the core of his management plan?",
        options: [
          { t: "Tailored exercise (strengthening plus aerobic), education and support with weight loss. Discuss joint replacement if symptoms still badly affect his life despite this.", s: 10, fb: "Correct. That's NICE's core treatment, with a clear route to surgery if it's needed." },
          { t: "Glucosamine and a knee brace", s: 1, fb: "NICE advises against glucosamine." },
          { t: "Acupuncture and a TENS machine", s: 1, fb: "NICE advises against acupuncture for OA, and neither is a core treatment." },
          { t: "Wait for a knee replacement. Exercise won't help with X-ray changes this severe.", s: 0, fb: "Exercise helps at every stage. X-ray severity doesn't predict who benefits." }
        ],
        why: "NICE NG226: refer for joint replacement when symptoms substantially affect quality of life and non-surgical care hasn't worked. Don't base it on X-ray findings or age."
      }
    ],
    pearl: "Treat the person, not the X-ray. Words like ‘bone on bone’ and ‘wear and tear’ can do more harm than the arthritis.",
    refs: ["NICE NG226: Osteoarthritis in over 16s (2022)", "Kirkley et al., NEJM 2008", "Sihvonen et al., NEJM 2013"]
  },

  {
    id: "ankle-ottawa",
    title: "Four steps",
    area: "lower",
    setting: "MSK first contact",
    mins: 3,
    patient: "Aisha, 31, netball player",
    intro: "Landed on an opponent's foot yesterday and rolled her ankle inwards. Swollen and bruised on the outside of the ankle and foot.",
    stages: [
      {
        skill: "assessment",
        notes: [
          "She walked 5 steps unaided into the room, limping.",
          "Tender over the anterior talofibular ligament. Not tender at the posterior edge or tip of either malleolus.",
          "Tender at the base of the 5th metatarsal."
        ],
        q: "Applying the Ottawa rules, does she need an X-ray?",
        options: [
          { t: "Yes. Tenderness at the base of the 5th metatarsal makes the foot rule positive.", s: 10, fb: "Correct. Any one positive criterion means an X-ray." },
          { t: "No. She can weight-bear 4 steps.", s: 2, fb: "Weight-bearing is only one criterion. You stopped checking too soon.", bias: "satisficing" },
          { t: "No. ATFL tenderness means it's a ligament sprain.", s: 1, fb: "She could have a sprain and a fracture." },
          { t: "Yes. Every ankle sprain needs an X-ray.", s: 2, fb: "The rules exist to avoid unnecessary X-rays." }
        ],
        why: "Ottawa rules: X-ray the ankle for pain in the malleolar zone plus bone tenderness at the posterior edge or tip of either malleolus. X-ray the foot for pain in the midfoot plus tenderness at the navicular or base of the 5th metatarsal. Either one also applies if she couldn't weight-bear 4 steps both at the time and when examined. The rules are highly sensitive, so a negative reliably rules out fracture."
      },
      {
        skill: "interpret",
        q: "The X-ray shows a 5th metatarsal fracture. Which location has the highest risk of non-union?",
        options: [
          { t: "The junction between the base and the shaft (a Jones fracture)", s: 10, fb: "Correct. It's at a watershed in the blood supply." },
          { t: "An avulsion of the tuberosity at the very base", s: 2, fb: "Usually heals well with symptom-led care and weight-bearing as tolerated." },
          { t: "An avulsion at the tip of the lateral malleolus", s: 1, fb: "Not the 5th metatarsal." },
          { t: "The base of the 1st metatarsal", s: 0, fb: "Wrong bone." }
        ],
        why: "Tuberosity avulsions are the most common and usually heal with symptom-led care. Jones fractures need fracture clinic follow-up because of the higher risk of non-union."
      },
      {
        skill: "manage",
        notes: ["Report: small avulsion of the 5th metatarsal tuberosity, plus a lateral ligament sprain. Walking boot, weight-bearing as tolerated."],
        q: "At 3 weeks, what should her rehab emphasise to reduce the risk of another sprain?",
        options: [
          { t: "Progressive balance and strength training continued for several months, then a graded return to netball with sport-specific drills", s: 10, fb: "Correct. Balance training reduces recurrence." },
          { t: "Rest until pain-free, then go straight back to netball", s: 1, fb: "The biggest risk factor for a sprain is a previous one." },
          { t: "Calf stretching only", s: 1, fb: "Doesn't address balance or strength." },
          { t: "Tape it for every match instead of rehab", s: 3, fb: "Taping or bracing helps on return to sport, but doesn't replace rehab." }
        ],
        why: "Hupperets et al. (BMJ, 2009): an unsupervised proprioceptive training programme after a sprain reduced recurrent sprains."
      }
    ],
    pearl: "A decision rule only works if you check every criterion. Being able to walk doesn't clear the foot.",
    refs: ["Stiell et al. (1992–93): Ottawa ankle rules", "Bachmann et al., BMJ 2003: accuracy of the Ottawa ankle rules", "Hupperets et al., BMJ 2009"]
  },

  {
    id: "hands-ra",
    title: "Swollen knuckles",
    area: "whole",
    setting: "MSK outpatients",
    mins: 3,
    patient: "Nadia, 38, receptionist",
    intro: "GP referral: ‘Bilateral hand pain, ?overuse from typing. Please treat.’ Eight weeks of symptoms.",
    stages: [
      {
        skill: "hypothesis",
        notes: [
          "Morning stiffness about 90 minutes. Pain across the knuckles of both hands and the balls of both feet. Tired all the time.",
          "Soft, swollen MCP joints. Squeezing across the MCP joints is painful."
        ],
        q: "What's your leading hypothesis?",
        options: [
          { t: "Early inflammatory arthritis, such as rheumatoid arthritis", s: 10, fb: "Correct. Symmetrical small-joint swelling with long morning stiffness." },
          { t: "Overuse tenosynovitis from typing", s: 2, fb: "The referral steered you there, but it doesn't explain the feet, the fatigue or the joint swelling.", bias: "framing" },
          { t: "Hand osteoarthritis", s: 2, fb: "Hand OA mostly affects the finger joints nearest the tips, the middle finger joints and the thumb base, with short-lived stiffness." },
          { t: "Bilateral carpal tunnel syndrome", s: 1, fb: "Doesn't cause joint swelling." }
        ],
        why: "Clues to inflammatory arthritis: morning stiffness over 30 minutes, swollen joints, symmetrical small-joint involvement, a positive MCP or MTP squeeze test, and systemic symptoms."
      },
      {
        skill: "flags",
        notes: ["GP bloods: rheumatoid factor negative, CRP mildly raised."],
        q: "What do you do?",
        options: [
          { t: "Refer urgently to rheumatology anyway. Suspected persistent synovitis needs urgent referral even when blood tests are normal.", s: 10, fb: "Correct." },
          { t: "RF is negative, so it isn't RA. Treat as overuse.", s: 1, fb: "Many people with RA are RF-negative, especially early on.", bias: "premature" },
          { t: "Wait 3 months to see if it settles", s: 1, fb: "The window where early treatment helps most would be lost." },
          { t: "Routine referral to hand therapy", s: 2, fb: "Doesn't get her to a diagnosis or disease-modifying treatment." }
        ],
        why: "NICE NG100: refer urgently if persistent synovitis is suspected and small joints of the hands or feet are affected, even with normal inflammatory markers or negative RF. Early disease-modifying treatment improves long-term outcomes."
      },
      {
        skill: "person",
        q: "While she waits for rheumatology, what's your role?",
        options: [
          { t: "Explain why you've referred her, advise on pacing and staying active, give gentle hand exercises, safety-net for flares, and let her GP know", s: 10, fb: "Correct. Supportive care while the referral goes through." },
          { t: "Heavy grip strengthening through pain to beat the stiffness", s: 2, fb: "Hard loading of actively inflamed joints can flare them." },
          { t: "Discharge her. It's not a physio problem.", s: 2, fb: "Physiotherapy has a lot to offer in inflammatory arthritis." },
          { t: "Splint all her joints and advise rest", s: 3, fb: "Resting splints can help a flare, but blanket rest leads to stiffness and weakness." }
        ],
        why: "Exercise, education and pacing are core parts of physiotherapy for inflammatory arthritis, alongside medical treatment."
      }
    ],
    pearl: "Negative bloods don't rule out inflammatory arthritis. The pattern in the history and the swelling in the joints count most.",
    refs: ["NICE NG100: Rheumatoid arthritis in adults"]
  },

  {
    id: "persistent-pain",
    title: "Everything hurts",
    area: "whole",
    setting: "MSK outpatients",
    mins: 4,
    patient: "Marcus, 44, former HGV driver",
    intro: "Three years of pain in his back, neck, shoulders and legs. Poor sleep, constant fatigue. Many normal investigations. Takes codeine and pregabalin. ‘Nobody believes me.’",
    stages: [
      {
        skill: "hypothesis",
        q: "Which pain mechanism is most likely to dominate?",
        options: [
          { t: "Nociplastic pain", s: 10, fb: "Correct. Widespread pain, poor sleep and fatigue, with no clear tissue damage or nerve lesion." },
          { t: "Nociceptive pain from several injured tissues", s: 2, fb: "Doesn't explain widespread pain with normal investigations." },
          { t: "Neuropathic pain", s: 3, fb: "Needs a lesion or disease of the nervous system in a matching distribution." },
          { t: "It's psychological, not real", s: 0, fb: "Nociplastic pain is real pain." }
        ],
        why: "Nociplastic pain (IASP, 2017): pain from altered nociception without evidence of tissue damage or a nerve lesion. It's often widespread, with poor sleep, fatigue and heightened sensitivity."
      },
      {
        skill: "person",
        q: "He says, ‘Nobody believes me.’ What's the best response?",
        options: [
          { t: "‘Your pain is real, and I believe you. What is it stopping you doing, and what matters most to you?’", s: 10, fb: "Correct. It validates him and moves the focus to what he wants to get back to." },
          { t: "‘Your tests are all normal, so there's nothing seriously wrong.’", s: 3, fb: "True, but it can sound dismissive." },
          { t: "‘It's all in your head.’", s: 0, fb: "Invalidating, and it's wrong." },
          { t: "‘Let's get more scans to find the source.’", s: 1, fb: "More investigation reinforces the search for a structural cause." }
        ],
        why: "Validation builds trust, and trust comes before any education or exercise."
      },
      {
        skill: "manage",
        q: "What's the best approach?",
        options: [
          { t: "Pain education that makes sense of his experience, goals based on what he values, graded activity he enjoys, sleep and pacing strategies, and work with his GP on reviewing medication and psychological support", s: 10, fb: "Correct. A multidimensional plan." },
          { t: "Weekly hands-on treatment to each painful area", s: 1, fb: "Builds dependence and doesn't change the underlying problem." },
          { t: "Rest until the pain settles", s: 0, fb: "Leads to deconditioning and more pain." },
          { t: "Discharge. Physio can't help.", s: 1, fb: "Exercise and education are among the best-supported treatments for this." }
        ],
        why: "NICE NG193 recommends exercise and psychological therapies for chronic primary pain, and advises against starting opioids or gabapentinoids. Anyone already taking them should have a shared review with their prescriber."
      },
      {
        skill: "interpret",
        notes: ["Six weeks later: his pain score hasn't changed, but he's walking the dog every day and sleeping better."],
        q: "How do you judge his progress?",
        options: [
          { t: "Real progress. Function, sleep and participation are meaningful outcomes even when pain intensity hasn't changed.", s: 10, fb: "Correct." },
          { t: "No progress, because his pain score is the same", s: 1, fb: "Pain intensity is only one outcome, and often the slowest to change." },
          { t: "Refer for more investigations", s: 1, fb: "Nothing new suggests a different diagnosis." },
          { t: "Push the intensity up until his pain drops", s: 2, fb: "Risks a boom-and-bust flare." }
        ],
        why: "Choose outcome measures that capture what matters to the person, such as the Patient-Specific Functional Scale, sleep or activity levels."
      }
    ],
    pearl: "In persistent pain, measure progress in the patient's life, not just in pain scores.",
    refs: ["NICE NG193: Chronic pain (primary and secondary) in over 16s (2021)", "IASP: definition of nociplastic pain (2017)"]
  }
);
