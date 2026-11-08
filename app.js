'use strict';
(function () {
  const panel = document.getElementById('stage-panel');
  const nav = document.getElementById('context-nav');
  const picker = document.querySelector('.stage-picker');
  const { DRILLS, CATEGORIES, STAGES, PLAN_HTML, TOSS_HTML, NMF_INTRO, WB_WAVE_NOTE, STAGE1_NOTE, NMF_DRILLS } = window;
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
    const original = drill.original ? `<p class="also"><a href="#${drill.original}">RAMP card</a></p>` : '';
    const blurb = drill.blurb ? `<p class="reps-note">${esc(drill.blurb)}</p>` : '';
    const cues = drill.cues && drill.cues.length
      ? `<h3 class="cue-heading">Coaching cues</h3><ol class="cues">${drill.cues.map(cue => `<li>${esc(cue)}</li>`).join('')}</ol>`
      : `<h3 class="cue-heading">Cues</h3><p class="reps-note">Ask your coach for the cues on this movement.</p>`;
    const eyebrow = `ENHANCE · Stage ${stageId}${rx.detail ? ` · ${rx.detail}` : ''}`;
    const badgeClass = rx.compact ? ' per-coach' : '';
    return `<section class="drill" id="${id}" data-nav="${navId}">
      <div class="drill-heading"><div class="step-number">${esc(drill.mark || '')}</div><div><p class="eyebrow">${esc(eyebrow)}</p><h2>${esc(drill.name)}</h2>${screen}</div><span class="distance${badgeClass}">${esc(rx.badge)}<small>${esc(rx.badgeLabel)}</small></span></div>
      <div class="drill-grid">${playerHTML(drill, drill.name)}<div class="drill-instructions"><h3>This stage</h3>${chips(rx.chips)}<p class="reps-note">${esc(rx.note)}</p>${alias}${blurb}${original}${cues}</div></div>
    </section>`;
  }

  function intentRx(name) {
    return {
      detail: 'one choice in this category',
      badge: '5',
      badgeLabel: 'throws',
      chips: [['Movement', name], ['Ball', '5 oz'], ['Throws', '5'], ['Sets', '1–3'], ['Distance', 'Ask your coach']],
      note: 'Choose one drill in this category. Ask your coach for the distance.'
    };
  }

  function weightedRx(name, extra) {
    return {
      detail: 'one choice in this category',
      badge: '3 balls',
      badgeLabel: 'heavy to light',
      compact: true,
      chips: [['Movement', name], ['Balls', '7.5 oz, then 5 oz, then 3.5 oz'], ['Sets', '1–3'], ['Week 1', '3 throws per ball'], ['Week 2', '4 throws per ball'], ['Week 3', '5 throws per ball']],
      note: `Throws are per drill, per ball. Ask your coach for the distance.${extra || ''}`
    };
  }

  function nmfRx(name) {
    return {
      detail: 'NMF · choose one',
      badge: '15',
      badgeLabel: 'throws',
      chips: [['Movement', name], ['Each ball', '5 throws'], ['Balls', '7.5 oz, 5 oz, 3.5 oz'], ['Total', '15 throws'], ['Effort', 'Max']],
      note: 'Choose one of the five movements. Five throws of each ball is 15 throws. Ask your coach before max-effort work. It is not a plan for every player.'
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
    return `<article class="stage-plan" id="stage-${id}"><p class="eyebrow">ENHANCE · Stage ${esc(stage.numeral)}</p><h2>${esc(stage.title)}</h2>${body}</article>`;
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

  function updateTabs() {
    const route = parseHash();
    const selected = route && route.stage >= 2 ? String(route.stage) : (rendered >= 2 ? String(rendered) : '');
    picker.querySelectorAll('[data-stage]').forEach(tab => {
      tab.setAttribute('aria-selected', tab.dataset.stage === selected ? 'true' : 'false');
    });
  }

  let selectedDay = 'medium';

  function explicitDay() {
    const h = location.hash.replace(/^#/, '');
    if (h === 'light' || h === 'stage-1-light') return 'light';
    if (h === 'medium' || h === 'stage-1-medium') return 'medium';
    if (h === 'hard' || h === 'stage-1-hard' || h === 'stage-1-max' || h === 'drill-5') return 'hard';
    if (h === 'ramp' || h === 'original' || h === 'stage-1' || h === '' || h === 'top') return 'medium';
    return null;
  }

  function currentDay() {
    return explicitDay() || selectedDay;
  }

  function showDay(day) {
    selectedDay = day;
    document.querySelectorAll('#day-selector [data-day]').forEach(tab => {
      tab.setAttribute('aria-selected', tab.dataset.day === day ? 'true' : 'false');
    });
    document.querySelectorAll('[data-day-sheet]').forEach(sheet => {
      sheet.hidden = sheet.dataset.daySheet !== day;
    });
    document.querySelectorAll('[data-day-pro]').forEach(panel => {
      const video = panel.querySelector('video');
      panel.hidden = panel.dataset.dayPro !== day;
      if (panel.hidden && video) video.pause();
    });
    const hash = location.hash.replace(/^#/, '');
    document.querySelectorAll('#stage-1 .drill').forEach(card => {
      const days = (card.dataset.days || '').split(/\s+/);
      const show = days.includes(day) || hash === card.id;
      card.hidden = !show;
      if (!show) card.querySelectorAll('video').forEach(video => video.pause());
    });
  }

  function parseHash() {
    const h = location.hash.replace(/^#/, '');
    if (h === 'light' || h === 'stage-1-light') return { stage: 1, target: 'light' };
    if (h === 'medium' || h === 'stage-1-medium') return { stage: 1, target: 'medium' };
    if (h === 'hard' || h === 'stage-1-hard' || h === 'stage-1-max') return { stage: 1, target: 'hard' };
    if (h === 'ramp' || h === 'original' || h === 'stage-1') return { stage: 1, target: 'stage-1' };
    if (h === 'stages' || h === 'enhance') return { stage: 2, target: 'enhance' };
    const match = h.match(/^stage-([1-5])(?:-([\s\S]+))?$/);
    if (!match) return null;
    const stage = Number(match[1]);
    return { stage, target: h };
  }

  function jumpTo(id) {
    const el = id && document.getElementById(id);
    if (!el) return;
    const jump = () => {
      const top = el.getBoundingClientRect().top + window.scrollY - stackHeight() - 8;
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    };
    jump();
    requestAnimationFrame(() => {
      jump();
      requestAnimationFrame(() => {
        jump();
        renderNav();
        highlightNav();
      });
    });
  }

  function applyHash(options) {
    const route = parseHash();
    syncOffset();
    showDay(currentDay());
    const enhanceStage = route && route.stage >= 2 ? route.stage : (rendered >= 2 ? rendered : 2);
    if (rendered !== enhanceStage) renderStage(enhanceStage);
    else updateTabs();
    renderNav();
    if (options && options.nosroll) return;
    if (route) jumpTo(route.target);
    else if (location.hash && location.hash !== '#top') jumpTo(location.hash.replace(/^#/, ''));
  }

  function currentRegion() {
    const enhance = document.getElementById('enhance');
    if (!enhance) return 'ramp';
    return enhance.getBoundingClientRect().top <= stackHeight() + 16 ? 'enhance' : 'ramp';
  }

  function renderNav() {
    const region = currentRegion();
    const route = parseHash();
    const signature = `${region}:${currentDay()}:${route ? route.stage : rendered || 0}`;
    if (nav.dataset.signature === signature) return;
    nav.dataset.signature = signature;
    navSignature = signature;
    activeKey = '';
    if (region === 'ramp') {
      nav.setAttribute('aria-label', 'RAMP · Stage 1');
      const day = currentDay();
      const drills = [...document.querySelectorAll('#stage-1 .drill')].filter(card => !card.hidden).map(card => {
        const n = card.id.replace('drill-', '');
        const label = card.querySelector('h2').textContent;
        return `<a href="#${card.id}" data-drill="${n}"><span>${n}</span> ${esc(label)}</a>`;
      }).join('');
      nav.innerHTML = `<a href="#enhance">ENHANCE</a><a href="#how">HOW</a><a href="#light"${day === 'light' ? ' aria-current="true"' : ''}>Light</a><a href="#medium"${day === 'medium' ? ' aria-current="true"' : ''}>Medium</a><a href="#hard"${day === 'hard' ? ' aria-current="true"' : ''}>Hard</a>` + drills;
    } else {
      const stage = route && route.stage >= 2 ? route.stage : (rendered >= 2 ? rendered : 2);
      nav.setAttribute('aria-label', `ENHANCE · Stage ${stage}`);
      nav.innerHTML = '<a href="#ramp">RAMP</a>' + stageLinks(stage);
    }
    updateReviews();
  }

  function stageLinks(id) {
    const map = {
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
    if (region === 'ramp') {
      const sections = [...document.querySelectorAll('#stage-1 .nav-block:not([hidden]), #stage-1 .drill:not([hidden])')];
      let active = sections[0];
      sections.forEach(section => { if (section.getBoundingClientRect().top <= line) active = section; });
      key = active ? (active.dataset.nav || active.id) : '';
    } else {
      const nodes = [...document.querySelectorAll('#stage-panel .nav-block, #stage-panel .drill')];
      let active = null;
      nodes.forEach(node => { if (node.getBoundingClientRect().top <= line) active = node; });
      key = active ? (active.dataset.nav || active.id) : '';
    }
    nav.querySelectorAll('a').forEach(link => {
      const on = key && link.hash === `#${key}`;
      link.classList.toggle('active', on);
      if (on) link.setAttribute('aria-current', 'true');
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
