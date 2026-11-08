'use strict';
(function () {
  const panel = document.getElementById('stage-panel');
  const nav = document.getElementById('context-nav');
  const picker = document.querySelector('.stage-picker');
  const { DRILLS, CATEGORIES, STAGES, PLAN_HTML, TOSS_HTML, NMF_INTRO, WB_WAVE_NOTE, STAGE1_NOTE, NMF_DRILLS, UNIT_NOTE } = window;
  if (!panel || !nav || !DRILLS || !picker) return;

  let rendered = 0;
  let navSignature = '';
  let activeKey = '';
  let vidSeq = 0;

  const ORIGINAL_NAV = [
    ['drill-1', '1', 'Marshall 1’s'],
    ['drill-2', '2', 'Torque'],
    ['drill-3', '3', 'Hookems'],
    ['drill-4', '4', 'Walking Torque'],
    ['drill-5', '5', 'Double Crow Hop'],
    ['drill-6', '6', 'Stretch'],
    ['drill-7', '7', 'Full']
  ];

  function esc(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function stackHeight() {
    const stack = document.querySelector('.sticky-stack');
    return stack ? stack.offsetHeight : 120;
  }

  function syncOffset() {
    document.documentElement.style.scrollPaddingTop = `${stackHeight() + 8}px`;
  }

  function chips(pairs) {
    return `<div class="balls">${pairs.map(([k, v]) => `<span class="ball"><span><b>${esc(k)}</b><small>${esc(v)}</small></span></span>`).join('')}</div>`;
  }

  function playerHTML(drill, label) {
    if (!drill.file) {
      return `<div class="text-demo"><div class="diamond" aria-hidden="true"><span>${esc(drill.mark || '—')}</span></div><p class="eyebrow">With your coach</p><h3>${esc(drill.name)}</h3><p>Ask your coach to show this movement before you throw.</p><div class="text-note">Watch your coach, then throw only what is on the card.</div></div>`;
    }
    vidSeq += 1;
    const vid = `video-s${vidSeq}`;
    const links = drill.key
      ? `<details class="clip-link"><summary>Open standalone clips</summary><a href="${esc(drill.key)}">Key-move clip ↗</a> <a href="${esc(drill.file)}">Full demonstration ↗</a></details>`
      : `<details class="clip-link"><summary>Open this clip</summary><a href="${esc(drill.file)}">Full demonstration ↗</a></details>`;
    return `<div class="player" data-start="${drill.start}" data-end="${drill.end}">
      <div class="video-wrap"><video id="${vid}" aria-label="${esc(label)} demonstration" playsinline muted loop controls preload="metadata" poster="${esc(drill.poster)}"><source src="${esc(drill.file)}" type="video/mp4">Your browser does not support video. <a href="${esc(drill.file)}">Open the video</a>.</video></div>
      <div class="video-caption"><span class="mode">Full demonstration</span><span>Tap video to play / pause</span></div>
      <div class="controls"><button type="button" class="play primary" aria-controls="${vid}">▶ Play</button><button type="button" class="key" aria-pressed="false">↻ Replay key move</button><button type="button" class="full">Full video</button><button type="button" class="loop" aria-pressed="true">Loop: on</button></div>
      <div class="fine-controls"><label>Speed <select aria-label="Playback speed for ${esc(label)}"><option value="0.25">0.25×</option><option value="0.5">0.5×</option><option value="1" selected>1×</option></select></label><div class="frames"><button type="button" class="back" aria-label="Previous frame">◀ Frame</button><button type="button" class="forward" aria-label="Next frame">Frame ▶</button></div></div>
      <p class="player-note">Key move: ${Number(drill.start).toFixed(1)}–${Number(drill.end).toFixed(1)}s · Frame buttons pause the video.</p>
      <p class="video-error" hidden>Video could not load. <a href="${esc(drill.file)}">Open the full video directly</a>.</p>
      ${links}
    </div>`;
  }

  function drillCard(stageId, drillId, rx, navId, domId) {
    const drill = DRILLS[drillId];
    const id = domId || `stage-${stageId}-${drillId}`;
    const screen = drill.screen ? `<p class="screen-title">On-screen title: ${esc(drill.screen)}</p>` : '';
    const alias = drill.alias ? `<p class="reps-note">${esc(drill.alias)}</p>` : '';
    const original = drill.original ? `<p class="also"><a href="#${drill.original}">Original color progression card</a></p>` : '';
    const blurb = drill.blurb ? `<p class="reps-note">${esc(drill.blurb)}</p>` : '';
    return `<section class="drill" id="${id}" data-nav="${navId}">
      <div class="drill-heading"><div class="step-number">${esc(drill.mark || '')}</div><div><p class="eyebrow">${esc(rx.eyebrow)}</p><h2>${esc(drill.name)}</h2>${screen}</div><span class="distance per-coach">${esc(rx.badge)}<small>${esc(rx.badgeLabel)}</small></span></div>
      <div class="drill-grid">${playerHTML(drill, drill.name)}<div class="drill-instructions"><h3>This stage</h3>${chips(rx.chips)}<p class="reps-note">${esc(rx.note)}</p>${alias}${blurb}${original}<h3 class="cue-heading">Cues</h3><p class="reps-note">Ask your coach for the cues on this movement.</p></div></div>
    </section>`;
  }

  function intentRx(name) {
    return {
      eyebrow: 'Stage II · one choice in this category',
      badge: '5',
      badgeLabel: 'throws',
      chips: [['Movement', name], ['Ball', '5 oz'], ['Throws', '5'], ['Sets', 'Ask your coach'], ['Distance', 'Ask your coach']],
      note: 'Choose one drill in this category. Ask your coach about sets and distance.'
    };
  }

  function weightedRx(name, extra) {
    return {
      eyebrow: 'Weighted ball · one choice in this category',
      badge: '3 balls',
      badgeLabel: 'heavy to light',
      chips: [['Movement', name], ['Balls', '7.5, then 5 oz, then 3.5'], ['Week 1', '3 throws per ball'], ['Week 2', '4 throws per ball'], ['Week 3', '5 throws per ball']],
      note: `Throws are per drill, per ball. Ask your coach about sets and distance. ${UNIT_NOTE}${extra || ''}`
    };
  }

  function baseRx(drillId) {
    const drill = DRILLS[drillId];
    return {
      eyebrow: 'Stage I · precision long toss',
      badge: 'Per coach',
      badgeLabel: 'weight / reps',
      chips: [['Movement', drill.name], ['Ball weight', 'Per coach'], ['Sets / reps', 'Per coach'], ['Feet', 'Per coach']],
      note: STAGE1_NOTE[drillId] || 'Per coach.'
    };
  }

  function nmfRx(name) {
    return {
      eyebrow: 'Stage V · NMF · choose one',
      badge: '15',
      badgeLabel: 'throws',
      chips: [['Movement', name], ['Each ball', '5 throws'], ['Balls', '7.5, 5, 3.5'], ['Total', '15 throws'], ['Effort', 'Max']],
      note: `Choose one of the five movements. Five throws of each ball is 15 throws. ${UNIT_NOTE} Ask your coach before max-effort work. It is not a plan for every player.`
    };
  }

  function categoriesHTML(stageId, rxFor) {
    return CATEGORIES.map(cat => {
      const id = `stage-${stageId}-${cat.id}`;
      const cards = cat.drills.map(drillId => drillCard(stageId, drillId, rxFor(DRILLS[drillId].name), id)).join('');
      return `<section class="category nav-block" id="${id}" data-nav="${id}"><div class="category-head"><h3>${esc(cat.title)}</h3><span class="choose">Choose one</span></div><p class="reps-note">One favorite in this category. Not every drill.</p></section>${cards}`;
    }).join('');
  }

  function stageHTML(stage) {
    const id = stage.id;
    let body = PLAN_HTML[id] || '';
    if (id === 1) {
      const cards = ['marshall-1', 'torque', 'walking-torque', 'step-behind', 'double-crow']
        .map(drillId => drillCard(1, drillId, baseRx(drillId), 'stage-1-movements')).join('');
      body += `<section class="category nav-block" id="stage-1-movements" data-nav="stage-1-movements"><div class="category-head"><h3>Movements</h3><span class="choose">Watch, then throw</span></div><p class="reps-note">Each movement is listed once. The day lists above say when it is used.</p></section>${cards}`;
    }
    if (id === 2) body += categoriesHTML(2, intentRx);
    if (id === 3) body += categoriesHTML(3, name => weightedRx(name));
    if (id === 4) {
      body += categoriesHTML(4, name => weightedRx(name));
      body += TOSS_HTML.replaceAll('TOSS_ID', 'stage-4-toss');
    }
    if (id === 5) {
      body += NMF_INTRO;
      body += NMF_DRILLS.map(drillId => drillCard(5, drillId, nmfRx(DRILLS[drillId].name), 'stage-5-nmf', `stage-5-nmf-${drillId}`)).join('');
      body += WB_WAVE_NOTE;
      body += categoriesHTML(5, name => weightedRx(name, ' Ask your coach whether to repeat the week 1–3 counts across the 9 weeks.'));
      body += TOSS_HTML.replaceAll('TOSS_ID', 'stage-5-toss');
    }
    return `<article class="stage-plan" id="stage-${id}"><p class="eyebrow">Stage ${esc(stage.numeral)}</p><h2>${esc(stage.title)}</h2>${body}</article>`;
  }

  function renderStage(id) {
    const stage = STAGES.find(item => item.id === id);
    if (!stage) return;
    if (window.releasePlayers) releasePlayers(panel);
    vidSeq = 0;
    panel.innerHTML = stageHTML(stage);
    rendered = id;
    if (window.mountPlayers) mountPlayers(panel);
    updateTabs();
  }

  function showPrompt() {
    if (window.releasePlayers) releasePlayers(panel);
    rendered = 0;
    panel.innerHTML = '<div class="stage-empty"><p>Choose a stage. The address updates, for example <a href="#stage-3">#stage-3</a>, so you can text that link to a player.</p></div>';
    updateTabs();
  }

  function updateTabs() {
    const route = parseHash();
    picker.querySelectorAll('[data-stage]').forEach(tab => {
      const on = route && String(route.stage) === tab.dataset.stage;
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function parseHash() {
    const h = location.hash.replace(/^#/, '');
    const match = h.match(/^stage-([1-5])(?:-([\s\S]+))?$/);
    if (!match) return null;
    return { stage: Number(match[1]), target: h };
  }

  function jumpTo(id) {
    const el = id && document.getElementById(id);
    if (!el) return;
    const jump = () => {
      const top = el.getBoundingClientRect().top + window.scrollY - stackHeight() - 8;
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    };
    jump();
    requestAnimationFrame(() => { jump(); requestAnimationFrame(jump); });
  }

  function applyHash(options) {
    const route = parseHash();
    syncOffset();
    if (!route) {
      if (!location.hash || location.hash === '#stages' || location.hash === '#top') {
        if (rendered) showPrompt();
      }
      updateTabs();
      renderNav();
      if (!(options && options.nosroll)) jumpTo(location.hash.replace(/^#/, ''));
      return;
    }
    if (rendered !== route.stage) renderStage(route.stage);
    else updateTabs();
    renderNav();
    if (!(options && options.nosroll)) jumpTo(route.target);
  }

  function currentRegion() {
    const original = document.getElementById('original');
    if (!original) return 'stage';
    return original.getBoundingClientRect().top <= stackHeight() + 8 ? 'original' : 'stage';
  }

  function renderNav() {
    const region = currentRegion();
    const route = parseHash();
    const signature = `${region}:${route ? route.stage : rendered || 0}`;
    if (nav.dataset.signature === signature) return;
    nav.dataset.signature = signature;
    navSignature = signature;
    activeKey = '';
    if (region === 'original') {
      nav.setAttribute('aria-label', 'Original color progression');
      nav.innerHTML = '<a href="#stages">Stages</a>' + ORIGINAL_NAV.map(([id, n, label]) => `<a href="#${id}" data-drill="${n}"><span>${n}</span> ${label}</a>`).join('');
    } else if (route) {
      nav.setAttribute('aria-label', `Stage ${route.stage}`);
      const links = stageLinks(route.stage);
      nav.innerHTML = '<a href="#stages">Stages</a>' + links + '<a href="#original">Original</a>';
    } else {
      nav.setAttribute('aria-label', 'Program stages');
      nav.innerHTML = STAGES.map(stage => `<a href="#stage-${stage.id}"><span>${stage.numeral}</span> ${esc(stage.short)}</a>`).join('') + '<a href="#original">Original</a>';
    }
    updateReviews();
  }

  function stageLinks(id) {
    const map = {
      1: [['stage-1-plan', 'Plan'], ['stage-1-medium', 'Medium'], ['stage-1-max', 'Max distance'], ['stage-1-light', 'Light'], ['stage-1-movements', 'Movements']],
      2: [['stage-2-plan', 'Plan'], ['stage-2-decel', 'Decel'], ['stage-2-connection', 'Connection'], ['stage-2-arm-action', 'Arm action'], ['stage-2-lower-half', 'Lower half'], ['stage-2-athleticism', 'Athleticism']],
      3: [['stage-3-plan', 'Plan'], ['stage-3-decel', 'Decel'], ['stage-3-connection', 'Connection'], ['stage-3-arm-action', 'Arm action'], ['stage-3-lower-half', 'Lower half'], ['stage-3-athleticism', 'Athleticism']],
      4: [['stage-4-plan', 'Plan'], ['stage-4-decel', 'Decel'], ['stage-4-connection', 'Connection'], ['stage-4-arm-action', 'Arm action'], ['stage-4-lower-half', 'Lower half'], ['stage-4-athleticism', 'Athleticism'], ['stage-4-toss', 'Long toss']],
      5: [['stage-5-plan', 'Plan'], ['stage-5-nmf', 'NMF'], ['stage-5-wb', 'Weighted'], ['stage-5-decel', 'Decel'], ['stage-5-connection', 'Connection'], ['stage-5-arm-action', 'Arm action'], ['stage-5-lower-half', 'Lower half'], ['stage-5-athleticism', 'Athleticism'], ['stage-5-toss', 'Long toss']]
    };
    return (map[id] || []).map(([href, label]) => `<a href="#${href}">${esc(label)}</a>`).join('');
  }

  function highlightNav() {
    const line = stackHeight() + 24;
    const region = currentRegion();
    let key = '';
    if (region === 'original') {
      const sections = [...document.querySelectorAll('#original .drill')];
      let active = sections[0];
      sections.forEach(section => { if (section.getBoundingClientRect().top <= line) active = section; });
      key = active ? active.id : '';
    } else {
      const nodes = [...document.querySelectorAll('#stage-panel .nav-block, #stage-panel .drill')];
      let active = null;
      nodes.forEach(node => { if (node.getBoundingClientRect().top <= line) active = node; });
      key = active ? (active.dataset.nav || active.id) : '';
    }
    nav.querySelectorAll('a').forEach(link => {
      const on = key && link.hash === `#${key}`;
      link.classList.toggle('active', on);
      if (on) link.setAttribute('aria-current', region === 'original' ? 'step' : 'true');
      else link.removeAttribute('aria-current');
    });
    if (key && key !== activeKey) {
      activeKey = key;
      const current = nav.querySelector('a.active');
      if (current) {
        const left = current.offsetLeft - nav.clientWidth / 2 + current.offsetWidth / 2;
        nav.scrollTo({ left: Math.max(0, left), behavior: 'auto' });
      }
    }
  }

  const marks = [...document.querySelectorAll('.review input')];
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem('swva-reviewed-v1') || '[]');
    if (!Array.isArray(saved)) saved = [];
  } catch (e) { saved = []; }
  marks.forEach(mark => {
    mark.checked = saved.includes(mark.dataset.step);
    mark.addEventListener('change', updateReviews);
  });

  function updateReviews() {
    const checked = marks.filter(mark => mark.checked).map(mark => mark.dataset.step);
    try { localStorage.setItem('swva-reviewed-v1', JSON.stringify(checked)); } catch (e) {}
    const total = document.querySelector('.review-total');
    if (total) total.textContent = `${checked.length} / 7 reviewed`;
    nav.querySelectorAll('a[data-drill]').forEach(link => link.classList.toggle('done', checked.includes(link.dataset.drill)));
  }

  const reset = document.querySelector('#reset');
  if (reset) reset.addEventListener('click', () => { marks.forEach(mark => { mark.checked = false; }); updateReviews(); });

  let scrollPending = false;
  window.addEventListener('scroll', () => {
    if (scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(() => {
      const before = nav.dataset.signature;
      renderNav();
      if (nav.dataset.signature === before) highlightNav();
      else highlightNav();
      scrollPending = false;
    });
  }, { passive: true });

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('hashchange', () => applyHash());
  window.addEventListener('resize', syncOffset);
  syncOffset();
  if (window.mountPlayers) mountPlayers(document);
  applyHash();
  updateReviews();
  highlightNav();
  window.addEventListener('load', () => {
    applyHash();
    setTimeout(() => applyHash(), 150);
  });
})();
