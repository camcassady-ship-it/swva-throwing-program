'use strict';
(function (root) {
  function esc(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  const POOL = [
    { pitcher: 'Koufax', name: 'Sandy Koufax', view: 'Windup', src: 'assets/pro_koufax_windup.mp4', poster: 'assets/pro_koufax_windup.jpg', small: true },
    { pitcher: 'Koufax', name: 'Sandy Koufax', view: 'Side', src: 'assets/pro_koufax_side.mp4', poster: 'assets/pro_koufax_side.jpg' },
    { pitcher: 'deGrom', name: 'Jacob deGrom', view: 'Side', src: 'assets/pro_degrom_side.mp4', poster: 'assets/pro_degrom_side.jpg' },
    { pitcher: 'deGrom', name: 'Jacob deGrom', view: 'Behind', src: 'assets/pro_degrom_goat.mp4', poster: 'assets/pro_degrom_goat.jpg' },
    { pitcher: 'Kelly', name: 'Joe Kelly', view: 'Open side', src: 'assets/pro_kelly.mp4', poster: 'assets/pro_kelly.jpg' },
    { pitcher: 'Sale', name: 'Chris Sale', view: 'Open side', src: 'assets/pro_sale_side.mp4', poster: 'assets/pro_sale_side.jpg' },
    { pitcher: 'Rosenthal', name: 'Trevor Rosenthal', view: 'Front', src: 'assets/pro_rosenthal_front.mp4', poster: 'assets/pro_rosenthal_front.jpg' },
    { pitcher: 'Verlander', name: 'Justin Verlander', view: 'Front', src: 'assets/pro_verlander_front.mp4', poster: 'assets/pro_verlander_front.jpg' }
  ];

  const RYAN = {
    slow: { name: 'Nolan Ryan', view: 'Slow-motion side', src: 'assets/pro_ryan_slow.mp4', poster: 'assets/pro_ryan_slow.jpg' },
    front: { name: 'Nolan Ryan', view: 'Front', src: 'assets/pro_ryan_astros_front.mp4', poster: 'assets/pro_ryan_astros_front.jpg' },
    behind: { name: 'Nolan Ryan', view: 'Behind the mound', src: 'assets/pro_ryan_behind.mp4', poster: 'assets/pro_ryan_behind.jpg' }
  };

  function hashSeed(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function todayKey() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  }

  function rotation(seedText) {
    const rng = mulberry32(hashSeed(seedText || todayKey()));
    const byPitcher = {};
    POOL.forEach(clip => {
      if (!byPitcher[clip.pitcher]) byPitcher[clip.pitcher] = [];
      byPitcher[clip.pitcher].push(clip);
    });
    const names = Object.keys(byPitcher);
    for (let i = names.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const swap = names[i];
      names[i] = names[j];
      names[j] = swap;
    }
    return names.map(name => {
      const options = byPitcher[name];
      return options[Math.floor(rng() * options.length)];
    });
  }

  function clipHTML(clip) {
    const small = clip.small ? ' is-small' : '';
    const label = `MLB example: ${clip.name}, ${clip.view}`;
    return `<figure class="mlb-clip${small}"><figcaption><b>MLB example: ${esc(clip.name)}</b><small>${esc(clip.view)}</small></figcaption><video aria-label="${esc(label)}" playsinline muted loop preload="none" poster="${esc(clip.poster)}"><source src="${esc(clip.src)}" type="video/mp4">Your browser does not support video. <a href="${esc(clip.src)}">Open the clip</a>.</video></figure>`;
  }

  function rowHTML(clips) {
    return clips.map(clipHTML).join('');
  }

  function fillRampDays() {
    const picks = rotation();
    const fixed = { light: RYAN.slow, medium: RYAN.front, hard: RYAN.behind };
    ['light', 'medium', 'hard'].forEach((day, index) => {
      const row = document.querySelector(`.mlb-row[data-day-pro="${day}"]`);
      if (!row) return;
      row.innerHTML = rowHTML([fixed[day], picks[index * 2], picks[index * 2 + 1]]);
    });
    bind(document);
  }

  function stageRow(stageId) {
    const picks = rotation();
    const ryan = { 2: RYAN.front, 3: RYAN.behind, 4: RYAN.slow, 5: RYAN.behind }[stageId] || RYAN.front;
    const second = picks[(stageId - 2) % picks.length];
    return `<div class="mlb-row mlb-row-stage">${rowHTML([ryan, second])}</div>`;
  }

  function sync() {
    const clips = [...document.querySelectorAll('.mlb-clip video')];
    let best = null;
    let bestRatio = 0;
    const viewport = root.innerHeight || 800;
    clips.forEach(video => {
      if (video.closest('[hidden]')) {
        video.pause();
        return;
      }
      const box = video.getBoundingClientRect();
      const visible = Math.min(box.bottom, viewport) - Math.max(box.top, 0);
      const ratio = box.height > 0 ? visible / box.height : 0;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        best = video;
      }
    });
    clips.forEach(video => {
      const keep = video === best && bestRatio >= 0.55 && video.dataset.userPaused !== '1' && !video.closest('[hidden]');
      if (!keep) video.pause();
    });
    if (best && bestRatio >= 0.55 && best.dataset.userPaused !== '1' && !best.closest('[hidden]')) {
      const pending = best.play();
      if (pending) pending.catch(() => {});
    }
  }

  function onClipClick(video) {
    if (!video.paused) {
      video.dataset.userPaused = '1';
      video.pause();
      return;
    }
    document.querySelectorAll('.mlb-clip video').forEach(other => {
      if (other !== video) {
        other.pause();
        other.dataset.userPaused = '1';
      }
    });
    video.dataset.userPaused = '0';
    const pending = video.play();
    if (pending) pending.catch(() => {});
  }

  function bind(scope) {
    const rootNode = scope || document;
    rootNode.querySelectorAll('.mlb-row').forEach(row => {
      if (row.dataset.mlbBound === '1') return;
      row.dataset.mlbBound = '1';
      row.addEventListener('scroll', () => root.requestAnimationFrame(sync), { passive: true });
    });
    rootNode.querySelectorAll('.mlb-clip video').forEach(video => {
      if (video.dataset.mlbBound === '1') return;
      video.dataset.mlbBound = '1';
      video.addEventListener('click', () => onClipClick(video));
    });
  }

  root.TerriersMlb = { RYAN, rotation, clipHTML, rowHTML, fillRampDays, stageRow, sync, bind };
})(typeof window !== 'undefined' ? window : globalThis);
