'use strict';
/* ENHANCE copy follows the coach's stage documents.
   Unspecified sets/reps use "1–3 sets × 3–5 throws".
   Unspecified ball weight is 5 oz. Specified counts and weights stay. */
window.DRILLS = {
  "marshall-1": {
    name: "Marshall 1’s", mark: "M1", file: "assets/1_marshall.mp4", poster: "assets/1_marshall.jpg", key: "assets/1_marshall_key.mp4", start: 0.4, end: 2.5, original: "drill-1",
    cues: [
      "Start tall in a narrow, balanced stance.",
      "Move your arm smoothly; keep it connected to your turn.",
      "Turn toward your partner without yanking your head.",
      "Finish under control. Reset before the next throw."
    ]
  },
  "marshall-2": { name: "Marshall 2’s", mark: "M2", blurb: "Ask your coach to show Marshall 2’s before you throw." },
  "decel": { name: "Decel", mark: "D", blurb: "Ask your coach if Decel is its own movement, or if it is Marshall 1’s and Marshall 2’s." },
  "torque": {
    name: "Torques", mark: "T", file: "assets/2_torque.mp4", poster: "assets/2_torque.jpg", key: "assets/2_torque_key.mp4", start: 1.1, end: 3.2, original: "drill-2", alias: "Called Torque on RAMP.",
    cues: [
      "Start in an open, athletic stance with soft knees.",
      "Let your hips lead; let your chest follow.",
      "Feel a smooth turn, not a forced twist.",
      "Send your throw to the target and finish balanced."
    ]
  },
  "walking-torque": {
    name: "Walking Torques", mark: "WT", file: "assets/4_walking.mp4", poster: "assets/4_walking.jpg", key: "assets/4_walking_key.mp4", start: 0.5, end: 3.1, original: "drill-4", alias: "Called Walking Torque on RAMP.",
    cues: [
      "Walk in with small, relaxed steps.",
      "Flow into your torque position without rushing.",
      "Let your hips start the turn; bring your chest through.",
      "Carry your momentum toward the target, then regain balance."
    ]
  },
  "step-behind": { name: "Step Behind with Arm Swings", mark: "SB", file: "assets/step-behind.mp4", poster: "assets/step-behind.jpg", start: 3.4, end: 6.6, screen: "Step Behind With Arm Swings" },
  "double-crow": {
    name: "Double Crow Hop", mark: "DC", file: "assets/5_crow.mp4", poster: "assets/5_crow.jpg", key: "assets/5_crow_key.mp4", start: 2.3, end: 6.1, original: "drill-5", alias: "Also called Double Crow Hops.",
    cues: [
      "Use two smooth crow hops toward your partner.",
      "Keep the hops low and your eyes on the target.",
      "Let your legs build momentum; do not muscle the throw.",
      "Finish moving forward under control, not falling sideways."
    ]
  },
  "hookems": {
    name: "Hookems", mark: "H", file: "assets/3_hookems.mp4", poster: "assets/3_hookems.jpg", key: "assets/3_hookems_key.mp4", start: 4.9, end: 7.5, original: "drill-3",
    cues: [
      "Have your coach set the angled plyo and starting position.",
      "Pivot smoothly, like a controlled pickoff move.",
      "Let your body turn carry your arm toward the target.",
      "Stay balanced through release; do not force the arm back."
    ]
  },
  "double-hops": { name: "Double Hops", mark: "DH", blurb: "Ask your coach if Double Hops is the same as Double Crow Hop." },
  "jump-backs": { name: "Jump Backs", mark: "JB", file: "assets/jump-backs.mp4", poster: "assets/jump-backs.jpg", start: 5.6, end: 8.8, screen: "Jump Backs" },
  "quick-picks": { name: "Quick Picks", mark: "QP", file: "assets/quick-picks.mp4", poster: "assets/quick-picks.jpg", start: 2.0, end: 6.4, screen: "Quick Picks" },
  "double-plays": { name: "Double Plays", mark: "DP", file: "assets/double-plays.mp4", poster: "assets/double-plays.jpg", start: 5.0, end: 7.8, screen: "Double Plays" },
  "turn-and-burns": { name: "Turn and Burns", mark: "TB", file: "assets/turn-and-burns.mp4", poster: "assets/turn-and-burns.jpg", start: 7.5, end: 10.8, screen: "Turn & Burns" },
  "running-step-behind": { name: "Running Step Behind with Arm Swings", mark: "RS", blurb: "Ask your coach if this is the same as Step Behind with Arm Swings." }
};

window.CATEGORIES = [
  { id: "decel", title: "Decel", drills: ["marshall-1", "marshall-2", "decel"] },
  { id: "connection", title: "Connection", drills: ["torque", "walking-torque"] },
  { id: "arm-action", title: "Arm action", drills: ["jump-backs", "quick-picks", "double-plays"] },
  { id: "lower-half", title: "Lower half", drills: ["hookems", "double-hops"] },
  { id: "athleticism", title: "Athleticism", drills: ["turn-and-burns", "running-step-behind"] }
];

window.STAGES = [
  { id: 2, numeral: "2", short: "Intent", tab: "Throw with intent", title: "Learn to Throw with Intent" },
  { id: 3, numeral: "3", short: "Weighted", tab: "Change the stimulus", title: "Change the Stimulus: Weighted Balls" },
  { id: 4, numeral: "4", short: "Blend", tab: "Weighted ball + long toss", title: "Blend Weighted Ball with Extended Long Toss" },
  { id: 5, numeral: "5", short: "NMF", tab: "NMF blend", title: "NMF Blend with Weighted Ball and Long Toss" }
];

window.UNIT_NOTE = "Balls go 7.5 oz, then 5 oz, then 3.5 oz.";
window.DEFAULT_VOLUME = "1–3 sets × 3–5 throws";

window.PLAN_HTML = {
  1: `<section class="plan-block nav-block" id="stage-1-plan" data-nav="stage-1-plan">
    <div class="plan-grid">
      <div class="plan-card"><h3>Schedule</h3><ul>
        <li>Length: 6 weeks.</li>
        <li>3–4 days a week, 18–24 sessions.</li>
        <li>Or 4 days a week, 24 sessions.</li>
      </ul></div>
      <div class="plan-card"><h3>Distance cycle</h3><ul>
        <li>Medium: 75–85% of max distance.</li>
        <li>Max distance, also called a heavy day.</li>
        <li>Light: 60–65% of max distance.</li>
      </ul></div>
    </div>
    <div class="callout"><strong>Two session counts.</strong> Ask your coach which one to follow. Ball weight: 5 oz.</div>
    <div class="ladder" aria-label="Distance ladder. Working out: 20 yards, then 30, then 40, and on to max, in 10-yard steps. Working back in: drop 20 yards at a time.">
      <div>
        <p class="ladder-label">Working out · +10 yd</p>
        <ol class="ladder-row">
          <li><span>20</span></li>
          <li><span>30</span></li>
          <li><span>40</span></li>
          <li><span class="more">…</span></li>
          <li><span>Max</span></li>
        </ol>
      </div>
      <div>
        <p class="ladder-label">Working back in · −20 yd</p>
        <ol class="ladder-row">
          <li><span>Max</span></li>
          <li><span>−20</span></li>
          <li><span>−20</span></li>
          <li><span>20</span></li>
        </ol>
      </div>
    </div>
    <div class="progress-check"><b>Advance the long toss</b><p>Move farther when 3 of 5 throws are on target. On target means the ball reaches your partner in the air, within reach and one step.</p><small>This 3-of-5 check is for the Stage 1 long toss. The RAMP cards use a separate rule: 6 of 9 catchable with the catcher in his stance, then move up. After 5 rounds, go to the stretch, then the full delivery.</small></div>
  </section>
  <section class="day-block nav-block" id="stage-1-out" data-nav="stage-1-out">
    <p class="eyebrow">Working out</p>
    <h3>8–10 sets of 3 of 5 on target</h3>
    <ol class="day-list">
      <li>Start at 20 yards.</li>
      <li>Move back in increments of 10 yards.</li>
      <li>Complete 8–10 sets of 3 of 5 on-target throws to proceed as far out as possible.</li>
    </ol>
  </section>
  <section class="day-block nav-block" id="stage-1-in" data-nav="stage-1-in">
    <p class="eyebrow">Working back in</p>
    <h3>3–5 sets of 3 of 5 on target</h3>
    <ol class="day-list">
      <li>Reduce the distance in 20-yard increments.</li>
      <li>Execute 3–5 sets of 3 of 5 on-target throws in total.</li>
    </ol>
  </section>
  <section class="day-block nav-block" id="stage-1-position" data-nav="stage-1-position">
    <p class="eyebrow">Position work at 40 &amp; 20 yds</p>
    <h3>Throwing and receiving</h3>
    <p>Perform position-specific throwing and receiving upon reaching 40 and 20 yards.</p>
    <p class="reps-note">${window.DEFAULT_VOLUME}. Ball weight: 5 oz.</p>
  </section>
  <section class="day-block nav-block" id="stage-1-pitchers" data-nav="stage-1-pitchers">
    <p class="eyebrow">Pitchers at 20–25 yds</p>
    <h3>Flatground, picks, PFP</h3>
    <p>At the 20-yard mark, pitchers ought to adjust to a distance of 20–25 yards—based on personal comfort and capability—to carry out flatground work and position-specific drills, including picks and PFP plays.</p>
    <p class="reps-note">${window.DEFAULT_VOLUME}. Ball weight: 5 oz.</p>
  </section>
  <section class="day-block nav-block" id="stage-1-medium" data-nav="stage-1-medium">
    <p class="eyebrow">Medium day</p>
    <h3>75–85% of max distance</h3>
    <ol class="day-list">
      <li><a href="#drill-1">Marshall 1’s</a></li>
      <li><a href="#drill-2">Torque</a></li>
      <li><a href="#drill-4">Walking Torque</a></li>
    </ol>
    <p class="reps-note">Also used in Stage 1: Step Behind with Arm Swings, on this day. <a href="#stage-2-step-behind">Watch it in ENHANCE · Stage 2</a>.</p>
  </section>
  <section class="day-block nav-block" id="stage-1-max" data-nav="stage-1-max">
    <p class="eyebrow">Max distance day</p>
    <h3>Heavy day</h3>
    <p>Same movements as the medium day, plus Double Crow Hop, then Walking Torques on a line back in.</p>
    <ol class="day-list">
      <li><a href="#drill-1">Marshall 1’s</a></li>
      <li><a href="#drill-2">Torque</a></li>
      <li><a href="#drill-4">Walking Torque</a></li>
      <li><a href="#drill-5">Double Crow Hop</a></li>
      <li><a href="#drill-4">Walking Torque on a line back in</a></li>
    </ol>
    <p class="reps-note">Also used in Stage 1: Step Behind with Arm Swings, on this day. <a href="#stage-2-step-behind">Watch it in ENHANCE · Stage 2</a>.</p>
  </section>
  <section class="day-block nav-block" id="stage-1-light" data-nav="stage-1-light">
    <p class="eyebrow">Light day</p>
    <h3>60–65% of max distance</h3>
    <ol class="day-list">
      <li><a href="#drill-1">Marshall 1’s</a></li>
      <li><a href="#drill-2">Torque</a></li>
      <li><a href="#drill-4">Walking Torque</a></li>
    </ol>
  </section>`,
  2: `<section class="plan-block nav-block" id="stage-2-plan" data-nav="stage-2-plan">
    <div class="plan-grid">
      <div class="plan-card"><h3>Schedule</h3><ul>
        <li>3 weeks.</li>
        <li>2 days a week.</li>
        <li>6 sessions total.</li>
      </ul></div>
      <div class="plan-card"><h3>Each chosen drill</h3><ul>
        <li>Ball: 5 oz.</li>
        <li>Throws: 5.</li>
        <li>Sets: 1–3.</li>
        <li>Distance: ask your coach.</li>
      </ul></div>
    </div>
    <p>Warm up. Choose one favorite drill in each of the five categories. Do not throw every drill.</p>
    <p>Use a radar. Record the throws, take the average, and push that average.</p>
  </section>`,
  3: `<section class="plan-block nav-block" id="stage-3-plan" data-nav="stage-3-plan">
    <div class="plan-grid">
      <div class="plan-card"><h3>Schedule</h3><ul>
        <li>3 weeks.</li>
        <li>2 days a week.</li>
        <li>6 sessions total.</li>
      </ul></div>
      <div class="plan-card"><h3>Throws per ball</h3><ul>
        <li>Sets: 1–3.</li>
        <li>Week 1: 3 throws per drill, per ball.</li>
        <li>Week 2: 4.</li>
        <li>Week 3: 5.</li>
        <li>Order: heavy to light.</li>
      </ul></div>
    </div>
    <p>Warm up. Choose one drill in each category.</p>
    <div class="callout"><strong>Balls.</strong> ${window.UNIT_NOTE} Ask your coach for the distance. Do not match these balls to the RAMP colors.</div>
    <p>Use a radar. Record the throws and take the average.</p>
  </section>`,
  4: `<section class="plan-block nav-block" id="stage-4-plan" data-nav="stage-4-plan">
    <div class="plan-card"><h3>Schedule</h3><ul>
      <li>3 weeks. 2 days a week. 6 sessions total.</li>
      <li>Warm up.</li>
      <li>Alternate weighted-ball days and extended-toss push days.</li>
      <li>Weather may allow 2 weighted-ball days.</li>
    </ul></div>
    <p>Weighted-ball day: the same five categories, the same balls, the same 1–3 sets, and the same week-by-week throws as ENHANCE · Stage 3.</p>
    <div class="callout"><strong>Balls.</strong> ${window.UNIT_NOTE}</div>
  </section>`,
  5: `<section class="plan-block nav-block" id="stage-5-plan" data-nav="stage-5-plan">
    <div class="plan-grid">
      <div class="plan-card"><h3>Schedule</h3><ul>
        <li>Length: 9 weeks.</li>
        <li>2–3 days a week, 18 sessions.</li>
        <li>Or a 10-day cycle, about 21 sessions.</li>
      </ul></div>
      <div class="plan-card"><h3>10-day cycle</h3><ul>
        <li>Day 1: NMF.</li>
        <li>Day 4: extended toss.</li>
        <li>Day 7: weighted ball.</li>
      </ul></div>
    </div>
    <div class="callout"><strong>Two session counts.</strong> Ask your coach which one to follow. The other days in the 10-day cycle are up to your coach. Do not treat them as automatic rest days.</div>
  </section>`
};

window.TOSS_HTML = `<section class="plan-block nav-block" id="TOSS_ID" data-nav="TOSS_ID">
  <p class="eyebrow">Extended toss day</p>
  <h3>Work out, then back in</h3>
  <ul>
    <li>Ball weight: 5 oz.</li>
    <li>Regular progression out to 50–65 ft.</li>
    <li>5–20 throws per distance, then 10–15 ft farther.</li>
    <li>10–15 throws at max distance.</li>
    <li>Work back in on a line.</li>
    <li>Long hop at the farther distances until the ball reaches your partner in the air.</li>
  </ul>
  <p class="reps-note">Ask your coach which movements to use on this day.</p>
</section>`;

window.NMF_INTRO = `<section class="plan-block nav-block" id="stage-5-nmf" data-nav="stage-5-nmf">
  <p class="eyebrow">NMF day</p>
  <h3>Choose one movement</h3>
  <p>Warm up. Choose one of Walking Torques, Double Plays, Double Crow Hop, Turn and Burns, or Step Behind with Arm Swings.</p>
  <p>5 throws of each of 7.5 oz, 5 oz, and 3.5 oz. That is 15 throws. Effort is max.</p>
  <div class="callout"><strong>Coach-gated.</strong> This max-effort work is advanced. It is not a blanket plan for every youth player.</div>
</section>`;

window.WB_WAVE_NOTE = `<section class="plan-block nav-block" id="stage-5-wb" data-nav="stage-5-wb">
  <p class="eyebrow">Weighted-ball day</p>
  <h3>Same five categories</h3>
  <p>Choose one drill in each category. Balls 7.5 oz, 5 oz, and 3.5 oz, heavy to light. Sets: 1–3. Week 1, week 2, and week 3: 3, 4, and 5 throws per drill per ball.</p>
  <div class="callout"><strong>Nine-week stage.</strong> Ask your coach whether to repeat the week 1–3 throw counts across the 9 weeks.</div>
</section>`;

window.STAGE1_NOTE = {
  "marshall-1": "Used on the medium day, the max-distance day, and the light day. Ball weight: 5 oz.",
  "torque": "Used on the medium day, the max-distance day, and the light day. Ball weight: 5 oz.",
  "walking-torque": "Used on the medium day, the max-distance day, and the light day. On the max-distance day, Walking Torques on a line back in comes after Double Crow Hop. Ball weight: 5 oz.",
  "step-behind": "Used on the medium day and the max-distance day. Not listed on the light day. Ball weight: 5 oz.",
  "double-crow": "Max-distance day only, after the medium-day movements. Walking Torques on a line back in comes after it. Ball weight: 5 oz."
};

window.NMF_DRILLS = ["walking-torque", "double-plays", "double-crow", "turn-and-burns", "step-behind"];
