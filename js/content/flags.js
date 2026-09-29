/* Flag Fast items (MSK).
 * a: "now"    = same-day escalation (ED, 999, same-day specialist or crisis team)
 *    "refer"  = onward referral, not same day (GP, specialist, urgent clinic)
 *    "manage" = appropriate to manage in physio with safety-netting
 */
window.RR = window.RR || { cases: [], flags: [], caseload: [] };

RR.flags.push(
  // Same-day escalation
  { t: "Back pain with pain in both legs, new saddle numbness and difficulty starting to pass urine.", a: "now", why: "Suspected cauda equina syndrome. Same-day emergency MRI via the local pathway." },
  { t: "Hot, swollen knee, temperature 38.4 °C, can't weight-bear, takes methotrexate.", a: "now", why: "Septic arthritis until proven otherwise. Same-day aspiration." },
  { t: "Sudden severe neck pain and headache with dizziness, double vision and slurred speech.", a: "now", why: "Possible cervical arterial dissection or stroke. 999." },
  { t: "67-year-old with a new temporal headache, scalp tenderness and jaw pain when chewing.", a: "now", why: "Suspected giant cell arteritis. Same-day assessment and steroids to protect sight." },
  { t: "Leg weakness and tingling rising over 2 days after a diarrhoeal illness, now struggling with stairs.", a: "now", why: "Suspected Guillain-Barré syndrome. Same-day medical assessment: it can progress to breathing difficulty." },
  { t: "Sudden cold, pale, painful leg with no foot pulses.", a: "now", why: "Acute limb ischaemia. 999 or ED." },
  { t: "Chest tightness spreading to the jaw during your exercise class. Sweaty and grey.", a: "now", why: "Possible acute coronary syndrome. Stop and call 999." },
  { t: "Patient tells you they've been thinking about suicide, with a plan and the means.", a: "now", why: "Don't leave them alone. Same-day crisis support via local policy." },
  { t: "Previous breast cancer. New thoracic pain, worse lying flat, and unexplained weight loss.", a: "now", why: "Suspected spinal metastases. Contact the acute oncology or MSCC team within 24 hours." },
  { t: "Lung cancer: heavy legs, band-like thoracic pain and new difficulty passing urine.", a: "now", why: "Suspected MSCC with neurological signs. An oncological emergency." },
  { t: "Patient says their partner controls their money and they're scared to go home tonight.", a: "now", why: "Safeguarding concern with possible immediate risk. Follow local procedure today. 999 if in danger." },
  { t: "One-sided calf swelling and tenderness 2 weeks after a long-haul flight. Otherwise well.", a: "now", why: "Suspected DVT. Same-day assessment (Wells score, D-dimer or ultrasound)." },
  { t: "Sudden ‘worst ever’ headache at the top of a heavy lift in the gym.", a: "now", why: "Possible subarachnoid haemorrhage. 999." },
  { t: "Kidney transplant patient on immunosuppressants: new back pain and a fever of 38.5 °C.", a: "now", why: "Possible spinal infection (discitis or epidural abscess). Same-day medical assessment." },
  { t: "12-year-old with a limp and 3 weeks of knee pain. Hip internal rotation is painful and reduced.", a: "now", why: "Suspected slipped upper femoral epiphysis. Same-day orthopaedic assessment, non-weight-bearing. Knee pain in a child: examine the hip." },
  { t: "78-year-old on long-term steroids: fell 2 days ago, groin pain, can't weight-bear, leg shortened and turned out.", a: "now", why: "Suspected hip fracture. Send to ED." },
  { t: "Fell on an outstretched hand yesterday. Tender in the anatomical snuffbox. Not yet X-rayed.", a: "now", why: "Suspected scaphoid fracture. Splint and send for same-day imaging via the minor injuries unit or ED." },

  // Onward referral
  { t: "Calf pain after walking 200 m, eased by 5 minutes' rest. Weak foot pulses. Smoker.", a: "refer", why: "Intermittent claudication (peripheral arterial disease). GP or vascular referral, not an emergency." },
  { t: "75-year-old with osteoporosis: sudden thoracic pain after a sneeze. No neurological symptoms.", a: "refer", why: "Suspected vertebral fragility fracture. GP for imaging and a bone health review." },
  { t: "After a twisting injury, the knee locks. Can't straighten it fully: springy block.", a: "refer", why: "Suspected displaced meniscal tear. Urgent orthopaedic referral, seen within days." },
  { t: "70-year-old after a fall: can't lift the arm actively, but full passive range. No shoulder pain before.", a: "refer", why: "Suspected traumatic rotator cuff tear. Urgent referral for imaging and a surgical opinion." },
  { t: "26-year-old with over an hour of morning back stiffness, better with exercise, worse with rest, alternating buttock pain.", a: "refer", why: "Possible axial spondyloarthritis. Refer to rheumatology." },
  { t: "Clumsy hands, dropping things, unsteady walking, positive Hoffmann's sign.", a: "refer", why: "Suspected degenerative cervical myelopathy. Urgent spinal referral, or same day if it's deteriorating rapidly." },
  { t: "Pins and needles in both hands and feet since starting chemotherapy.", a: "refer", why: "Possible chemotherapy-induced neuropathy. Let the oncology team know." },
  { t: "Foot drop getting worse over a week (now 2/5), with back pain.", a: "refer", why: "Severe or progressive motor loss. Urgent spinal referral." },
  { t: "Rib pain after a coughing fit in an 80-year-old on long-term steroids. Breathing comfortably.", a: "refer", why: "Possible fragility rib fracture. GP review, analgesia and bone health." },
  { t: "Two months of swollen, stiff knuckles in both hands. Morning stiffness lasts 90 minutes.", a: "refer", why: "Suspected inflammatory arthritis. Urgent rheumatology referral (NICE NG100), even if blood tests are normal." },
  { t: "Shoulder and arm pain in a 64-year-old smoker, with weight loss and a cough for 6 weeks.", a: "refer", why: "Possible lung cancer, such as an apical tumour. Urgent GP review for a chest X-ray (NICE NG12)." },
  { t: "72-year-old with new pain and stiffness in both shoulders and hips, over 45 minutes every morning. No headache or visual symptoms.", a: "refer", why: "Possible polymyalgia rheumatica. GP review for bloods and treatment. Same day if headache, jaw pain or visual symptoms appear." },
  { t: "Pain in both Achilles tendons a week after starting ciprofloxacin.", a: "refer", why: "Fluoroquinolones can cause tendinopathy and rupture. Advise contacting the prescriber promptly about stopping it (MHRA advice), and offload the tendons." },
  { t: "New back pain in a 68-year-old with fatigue, repeated chest infections and unexplained anaemia.", a: "refer", why: "Possible myeloma. Urgent GP review for blood tests (NICE NG12)." },

  // Manage in physio
  { t: "38-year-old whose low back pain wakes them when turning over but settles quickly with a change of position.", a: "manage", why: "Mechanical night pain that eases with movement isn't a red flag. Unremitting night pain is." },
  { t: "Off work 6 weeks with back pain, believes ‘hurt means harm’, avoiding bending.", a: "manage", why: "Yellow flags change how you manage (psychologically informed care). They aren't a reason to refer on by themselves." },
  { t: "Heel pain worst on the first steps in the morning, easing after a few minutes.", a: "manage", why: "Typical plantar heel pain." },
  { t: "Tingling in the thumb and index finger at night, eased by shaking the hand.", a: "manage", why: "Typical carpal tunnel syndrome. Conservative care first. Refer if there's thenar wasting or weakness." },
  { t: "Three weeks after an ankle sprain: walking normally, swelling settling.", a: "manage", why: "Normal recovery. Progress loading and balance work." },
  { t: "Lateral elbow pain in a decorator, worse with gripping.", a: "manage", why: "Lateral elbow tendinopathy. Load management and exercise." },
  { t: "Sciatica with stable 4/5 big toe extension weakness for 3 weeks. Bladder and bowel normal.", a: "manage", why: "Stable, mild motor loss can be managed conservatively with safety-netting. Refer if it progresses." },
  { t: "Six weeks of back pain with leg pain that's steadily improving. Neurology normal, no red flags.", a: "manage", why: "Favourable natural history. Continue with safety-netting." },
  { t: "Patellar tendon pain in a volleyball player. Loads well and pain settles within 24 hours.", a: "manage", why: "Patellar tendinopathy. Progressive loading programme." },
  { t: "Gradual pain around the kneecap in a runner, worse on stairs and squatting. No swelling or locking.", a: "manage", why: "Patellofemoral pain. Education, load management and hip and knee strengthening." },
  { t: "Ring finger catches and clicks when making a fist. Tender nodule in the palm.", a: "manage", why: "Trigger finger. Advice and splinting, with injection if it persists." },
  { t: "Woke with a painful, stiff neck turned to one side. No trauma, neurology normal, already easing.", a: "manage", why: "Acute wry neck. Reassure, keep moving, and it usually settles within days." }
);
