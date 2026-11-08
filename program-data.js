'use strict';
/* Stage copy is limited to the coach's verified stage documents.
   Where those documents are silent, the text says "per coach". */
window.DRILLS = {
  "marshall-1": { name: "Marshall 1’s", mark: "M1", file: "assets/1_marshall.mp4", poster: "assets/1_marshall.jpg", key: "assets/1_marshall_key.mp4", start: 0.4, end: 2.5, original: "drill-1" },
  "marshall-2": { name: "Marshall 2’s", mark: "M2", blurb: "Ask your coach to show Marshall 2’s before you throw." },
  "decel": { name: "Decel", mark: "D", blurb: "Ask your coach if Decel is its own movement, or if it is Marshall 1’s and Marshall 2’s." },
  "torque": { name: "Torques", mark: "T", file: "assets/2_torque.mp4", poster: "assets/2_torque.jpg", key: "assets/2_torque_key.mp4", start: 1.1, end: 3.2, original: "drill-2", alias: "Called Torque on the original color progression." },
  "walking-torque": { name: "Walking Torques", mark: "WT", file: "assets/4_walking.mp4", poster: "assets/4_walking.jpg", key: "assets/4_walking_key.mp4", start: 0.5, end: 3.1, original: "drill-4", alias: "Called Walking Torque on the original color progression." },
  "step-behind": { name: "Step Behind with Arm Swings", mark: "SB", file: "assets/step-behind.mp4", poster: "assets/step-behind.jpg", start: 3.4, end: 6.6, screen: "Step Behind With Arm Swings" },
  "double-crow": { name: "Double Crow Hop", mark: "DC", file: "assets/5_crow.mp4", poster: "assets/5_crow.jpg", key: "assets/5_crow_key.mp4", start: 2.3, end: 6.1, original: "drill-5", alias: "Also called Double Crow Hops." },
  "hookems": { name: "Hookems", mark: "H", file: "assets/3_hookems.mp4", poster: "assets/3_hookems.jpg", key: "assets/3_hookems_key.mp4", start: 4.9, end: 7.5, original: "drill-3" },
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
  { id: 1, numeral: "I", short: "Base", tab: "Precision long toss", title: "Build the Base with Precision Long Toss" },
  { id: 2, numeral: "II", short: "Intent", tab: "Throw with intent", title: "Learn to Throw with Intent" },
  { id: 3, numeral: "III", short: "Weighted", tab: "Change the stimulus", title: "Change the Stimulus: Weighted Balls" },
  { id: 4, numeral: "IV", short: "Blend", tab: "Weighted ball + long toss", title: "Blend Weighted Ball with Extended Long Toss" },
  { id: 5, numeral: "V", short: "NMF", tab: "NMF blend", title: "NMF Blend with Weighted Ball and Long Toss" }
];

window.UNIT_NOTE = "Balls go 7.5, then 5 oz, then 3.5. Ask your coach for the units on 7.5 and 3.5.";

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
    <div class="callout"><strong>Two session counts.</strong> Ask your coach which one to follow.</div>
    <div class="progress-check"><b>Advance the distance</b><p>Move farther when 3 of 5 throws reach your partner in the air, within reach and one step.</p><small>This 3-of-5 check is for Stage I. The color progression uses a separate 6-of-9 check. Ask your coach for ball weight, feet, and sets or reps. Do not use the color-chart balls on this stage.</small></div>
  </section>
  <section class="day-block nav-block" id="stage-1-medium" data-nav="stage-1-medium">
    <p class="eyebrow">Medium day</p>
    <h3>75–85% of max distance</h3>
    <ol class="day-list">
      <li><a href="#stage-1-marshall-1">Marshall 1’s</a></li>
      <li><a href="#stage-1-torque">Torques</a></li>
      <li><a href="#stage-1-walking-torque">Walking Torques</a></li>
      <li><a href="#stage-1-step-behind">Step Behind with Arm Swings</a></li>
    </ol>
    <p class="reps-note">Ask your coach for the ball weight, feet, and sets or reps.</p>
  </section>
  <section class="day-block nav-block" id="stage-1-max" data-nav="stage-1-max">
    <p class="eyebrow">Max distance day</p>
    <h3>Heavy day</h3>
    <p>Same movements as the medium day, plus Double Crow Hop, then Walking Torques on a line back in.</p>
    <ol class="day-list">
      <li><a href="#stage-1-marshall-1">Marshall 1’s</a></li>
      <li><a href="#stage-1-torque">Torques</a></li>
      <li><a href="#stage-1-walking-torque">Walking Torques</a></li>
      <li><a href="#stage-1-step-behind">Step Behind with Arm Swings</a></li>
      <li><a href="#stage-1-double-crow">Double Crow Hop</a></li>
      <li>Walking Torques on a line back in</li>
    </ol>
    <p class="reps-note">Ask your coach for the ball weight, feet, and sets or reps.</p>
  </section>
  <section class="day-block nav-block" id="stage-1-light" data-nav="stage-1-light">
    <p class="eyebrow">Light day</p>
    <h3>60–65% of max distance</h3>
    <ol class="day-list">
      <li><a href="#stage-1-marshall-1">Marshall 1’s</a></li>
      <li><a href="#stage-1-torque">Torques</a></li>
      <li><a href="#stage-1-walking-torque">Walking Torques</a></li>
    </ol>
    <p class="reps-note">Ask your coach for the ball weight, feet, and sets or reps.</p>
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
        <li>Sets: ask your coach.</li>
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
        <li>Week 1: 3 throws per drill, per ball.</li>
        <li>Week 2: 4.</li>
        <li>Week 3: 5.</li>
        <li>Order: heavy to light. No set count is given.</li>
      </ul></div>
    </div>
    <p>Warm up. Choose one drill in each category.</p>
    <div class="callout"><strong>Balls.</strong> ${window.UNIT_NOTE} Ask your coach for the distance. Do not match these balls to the color chart.</div>
    <p>Use a radar. Record the throws and take the average.</p>
  </section>`,
  4: `<section class="plan-block nav-block" id="stage-4-plan" data-nav="stage-4-plan">
    <div class="plan-card"><h3>Schedule</h3><ul>
      <li>3 weeks. 2 days a week. 6 sessions total.</li>
      <li>Warm up.</li>
      <li>Alternate weighted-ball days and extended-toss push days.</li>
      <li>Weather may allow 2 weighted-ball days.</li>
    </ul></div>
    <p>Weighted-ball day: the same five categories, the same balls, and the same week-by-week throws as Stage III.</p>
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
    <li>Regular progression out to 50–65 ft.</li>
    <li>5–20 throws per distance, then 10–15 ft farther.</li>
    <li>10–15 throws at max distance.</li>
    <li>Work back in on a line.</li>
    <li>Long hop at the farther distances until the ball reaches your partner in the air.</li>
  </ul>
  <p class="reps-note">Ask your coach which movements and ball weights to use on this day.</p>
</section>`;

window.NMF_INTRO = `<section class="plan-block nav-block" id="stage-5-nmf" data-nav="stage-5-nmf">
  <p class="eyebrow">NMF day</p>
  <h3>Choose one movement</h3>
  <p>Warm up. Choose one of Walking Torques, Double Plays, Double Crow Hop, Turn and Burns, or Step Behind with Arm Swings.</p>
  <p>5 throws of each of 7.5, 5, and 3.5. That is 15 throws. Effort is max.</p>
  <div class="callout"><strong>Coach-gated.</strong> This max-effort work is advanced. It is not a blanket plan for every youth player. ${window.UNIT_NOTE}</div>
</section>`;

window.WB_WAVE_NOTE = `<section class="plan-block nav-block" id="stage-5-wb" data-nav="stage-5-wb">
  <p class="eyebrow">Weighted-ball day</p>
  <h3>Same five categories</h3>
  <p>Choose one drill in each category. Balls 7.5, 5, and 3.5, heavy to light. Week 1, week 2, and week 3: 3, 4, and 5 throws per drill per ball.</p>
  <div class="callout"><strong>Nine-week stage.</strong> Ask your coach whether to repeat the week 1–3 throw counts across the 9 weeks. ${window.UNIT_NOTE}</div>
</section>`;

window.STAGE1_NOTE = {
  "marshall-1": "Used on the medium day, the max-distance day, and the light day.",
  "torque": "Used on the medium day, the max-distance day, and the light day.",
  "walking-torque": "Used on the medium day, the max-distance day, and the light day. On the max-distance day, Walking Torques on a line back in comes after Double Crow Hop.",
  "step-behind": "Used on the medium day and the max-distance day. Not listed on the light day.",
  "double-crow": "Max-distance day only, after the medium-day movements. Walking Torques on a line back in comes after it."
};

window.NMF_DRILLS = ["walking-torque", "double-plays", "double-crow", "turn-and-burns", "step-behind"];
