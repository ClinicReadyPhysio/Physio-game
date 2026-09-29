/* Flag Fast items.
 * a: "now"    = same-day escalation (ED, 999, on-call team, crisis team)
 *    "refer"  = onward referral, not same day (GP, specialist, urgent clinic)
 *    "manage" = appropriate to manage in physio with safety-netting
 */
window.RR = window.RR || { cases: [], flags: [], caseload: [] };

RR.flags.push(
  { t: "Back pain with pain in both legs, new saddle numbness and difficulty starting to pass urine.", a: "now", why: "Suspected cauda equina syndrome. Same-day emergency MRI via the local pathway." },
  { t: "Day 3 after a knee replacement: swollen calf, pleuritic chest pain, HR 115.", a: "now", why: "Suspected PE. Stop and get medical help now." },
  { t: "38-year-old whose low back pain wakes them when turning over but settles quickly with a change of position.", a: "manage", why: "Mechanical night pain that eases with movement isn't a red flag. Unremitting night pain is." },
  { t: "Hot, swollen knee, temperature 38.4 °C, can't weight-bear, takes methotrexate.", a: "now", why: "Septic arthritis until proven otherwise. Same-day aspiration." },
  { t: "Sudden severe neck pain and headache with dizziness, double vision and slurred speech.", a: "now", why: "Possible cervical arterial dissection or stroke. 999." },
  { t: "67-year-old with a new temporal headache, scalp tenderness and jaw pain when chewing.", a: "now", why: "Suspected giant cell arteritis. Same-day assessment and steroids to protect sight." },
  { t: "Off work 6 weeks with back pain, believes ‘hurt means harm’, avoiding bending.", a: "manage", why: "Yellow flags change how you manage (psychologically informed care). They aren't a reason to refer on by themselves." },
  { t: "Leg weakness rising over 2 days after a diarrhoeal illness, now struggling with stairs.", a: "now", why: "Suspected Guillain-Barré syndrome. Same-day medical assessment with vital capacity monitoring." },
  { t: "Ward patient's NEWS2 score is 7 just before your session.", a: "now", why: "A NEWS2 of 7 or more needs an emergency response from a critical care competent team." },
  { t: "Calf pain after walking 200 m, eased by 5 minutes' rest. Weak foot pulses. Smoker.", a: "refer", why: "Intermittent claudication (peripheral arterial disease). GP or vascular referral, not an emergency." },
  { t: "Sudden cold, pale, painful leg with no foot pulses.", a: "now", why: "Acute limb ischaemia. 999 or ED." },
  { t: "Chest tightness spreading to the jaw during an exercise class. Sweaty and grey.", a: "now", why: "Possible acute coronary syndrome. Stop and call 999 or the emergency team." },
  { t: "Patient tells you they've been thinking about suicide, with a plan and the means.", a: "now", why: "Don't leave them alone. Same-day crisis support via local policy." },
  { t: "Heel pain worst on the first steps in the morning, easing after a few minutes.", a: "manage", why: "Typical plantar heel pain." },
  { t: "Tingling in the thumb and index finger at night, eased by shaking the hand.", a: "manage", why: "Typical carpal tunnel syndrome. Conservative care first. Refer if there's thenar wasting or weakness." },
  { t: "75-year-old with osteoporosis: sudden thoracic pain after a sneeze. No neurological symptoms.", a: "refer", why: "Suspected vertebral fragility fracture. GP for imaging and a bone health review." },
  { t: "Previous breast cancer. New thoracic pain, worse lying flat, and unexplained weight loss.", a: "now", why: "Suspected spinal metastases. Contact the acute oncology or MSCC team within 24 hours." },
  { t: "After a twisting injury, the knee locks. Can't straighten it fully: springy block.", a: "refer", why: "Suspected displaced meniscal tear. Urgent orthopaedic referral, seen within days." },
  { t: "70-year-old after a fall: can't lift the arm actively, but full passive range. No shoulder pain before.", a: "refer", why: "Suspected traumatic rotator cuff tear. Urgent referral for imaging and a surgical opinion." },
  { t: "Three weeks after an ankle sprain: walking normally, swelling settling.", a: "manage", why: "Normal recovery. Progress loading and balance work." },
  { t: "26-year-old with over an hour of morning back stiffness, better with exercise, worse with rest, alternating buttock pain.", a: "refer", why: "Possible axial spondyloarthritis. Refer to rheumatology." },
  { t: "Clumsy hands, dropping things, unsteady walking, positive Hoffmann's sign.", a: "refer", why: "Suspected degenerative cervical myelopathy. Urgent spinal referral, or same day if it's deteriorating rapidly." },
  { t: "New facial droop and arm weakness on the ward, started 15 minutes ago.", a: "now", why: "Suspected stroke. Call the stroke team or 999 immediately." },
  { t: "Patient says their partner controls their money and they're scared to go home tonight.", a: "now", why: "Safeguarding concern with possible immediate risk. Follow local procedure today. 999 if in danger." },
  { t: "Ventilated patient: sudden SpO2 drop, high airway pressures, no breath sounds on one side, BP falling.", a: "now", why: "Possible tension pneumothorax. Call for medical help immediately." },
  { t: "GBS patient weighing 75 kg: FVC has fallen from 2.8 L to 1.4 L.", a: "now", why: "About 19 mL/kg, below 20 mL/kg. Escalate to critical care now." },
  { t: "Day 1 after a laparotomy: SpO2 95% on 2 L, RR 16, productive cough, clearing well by himself.", a: "manage", why: "Stable and clearing. Mobilise and encourage self-management." },
  { t: "New irregular pulse of 140 at rest before an exercise session. Feels breathless.", a: "now", why: "Possible fast AF. Don't exercise. Get a medical review now." },
  { t: "Lung cancer: heavy legs, band-like thoracic pain and new difficulty passing urine.", a: "now", why: "Suspected MSCC with neurological signs. An oncological emergency." },
  { t: "Lateral elbow pain in a decorator, worse with gripping.", a: "manage", why: "Lateral elbow tendinopathy. Load management and exercise." },
  { t: "Pins and needles in both hands and feet since starting chemotherapy.", a: "refer", why: "Possible chemotherapy-induced neuropathy. Let the oncology team know." },
  { t: "One-sided calf swelling and tenderness 2 weeks after a long-haul flight. Otherwise well.", a: "now", why: "Suspected DVT. Same-day assessment (Wells score, D-dimer or ultrasound)." },
  { t: "Sciatica with stable 4/5 big toe extension weakness for 3 weeks. Bladder and bowel normal.", a: "manage", why: "Stable, mild motor loss can be managed conservatively with safety-netting. Refer if it progresses." },
  { t: "Foot drop getting worse over a week (now 2/5), with back pain.", a: "refer", why: "Severe or progressive motor loss. Urgent spinal referral." },
  { t: "Stroke patient, day 10: shoulder pain on passive movement, one finger-breadth of subluxation.", a: "manage", why: "Hemiplegic shoulder. Positioning, support and careful handling, and teach the team." },
  { t: "Sudden ‘worst ever’ headache at the top of a heavy lift in the gym.", a: "now", why: "Possible subarachnoid haemorrhage. 999." },
  { t: "Six weeks of back pain with leg pain that's steadily improving. Neurology normal, no red flags.", a: "manage", why: "Favourable natural history. Continue with safety-netting." },
  { t: "Kidney transplant patient on immunosuppressants: new back pain and a fever of 38.5 °C.", a: "now", why: "Possible spinal infection (discitis or epidural abscess). Same-day medical assessment." },
  { t: "Patellar tendon pain in a volleyball player. Loads well and pain settles within 24 hours.", a: "manage", why: "Patellar tendinopathy. Progressive loading programme." },
  { t: "Rib pain after a coughing fit in an 80-year-old on long-term steroids. Breathing comfortably, sats normal.", a: "refer", why: "Possible fragility rib fracture. GP review, analgesia and bone health." }
);
