'use strict';
(function () {
  const players = new Set();
  let observer = null;

  function ensureObserver() {
    if (observer || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          const video = entry.target.querySelector('video');
          if (video) video.pause();
        }
      });
    }, { threshold: 0 });
  }

  function mountPlayers(root) {
    ensureObserver();
    (root || document).querySelectorAll('.player').forEach(box => {
      if (box.dataset.ready === '1') return;
      const video = box.querySelector('video');
      if (!video) return;
      box.dataset.ready = '1';
      players.add(box);
      bindPlayer(box, video);
      if (observer) observer.observe(box);
    });
  }

  function releasePlayers(root) {
    if (!root) return;
    root.querySelectorAll('.player').forEach(box => {
      const video = box.querySelector('video');
      if (video) video.pause();
      players.delete(box);
      if (observer) observer.unobserve(box);
    });
  }

  function bindPlayer(box, video) {
    const play = box.querySelector('.play');
    const key = box.querySelector('.key');
    const full = box.querySelector('.full');
    const loop = box.querySelector('.loop');
    const mode = box.querySelector('.mode');
    const speed = box.querySelector('select');
    const back = box.querySelector('.back');
    const forward = box.querySelector('.forward');
    const error = box.querySelector('.video-error');
    const start = Number(box.dataset.start);
    const end = Number(box.dataset.end);
    let keyMode = false;
    let loopOn = true;
    let raf = 0;

    const updateMode = () => {
      video.loop = !keyMode && loopOn;
      if (key) key.setAttribute('aria-pressed', String(keyMode));
      if (loop) {
        loop.setAttribute('aria-pressed', String(loopOn));
        loop.textContent = `Loop: ${loopOn ? 'on' : 'off'}`;
      }
      if (mode) {
        mode.textContent = keyMode && Number.isFinite(start) && Number.isFinite(end)
          ? `Key move · ${start.toFixed(1)}–${end.toFixed(1)}s`
          : 'Full demonstration';
      }
    };

    const startPlaying = async () => {
      try { await video.play(); }
      catch (e) { if (play) play.textContent = '▶ Tap to play'; }
    };

    const seek = t => {
      const apply = () => {
        const duration = Number.isFinite(video.duration) ? video.duration : t;
        video.currentTime = Math.max(0, Math.min(t, duration));
      };
      if (video.readyState > 0) apply();
      else video.addEventListener('loadedmetadata', apply, { once: true });
    };

    const tick = () => {
      if (keyMode && !video.paused && Number.isFinite(end) && video.currentTime >= end) {
        if (loopOn && Number.isFinite(start)) video.currentTime = start;
        else { video.pause(); video.currentTime = end; }
      }
      if (!video.paused) raf = requestAnimationFrame(tick);
    };

    video.addEventListener('play', () => {
      players.forEach(other => {
        if (other !== box) {
          const otherVideo = other.querySelector('video');
          if (otherVideo) otherVideo.pause();
        }
      });
      if (play) play.textContent = '❚❚ Pause';
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    });
    video.addEventListener('pause', () => { if (play) play.textContent = '▶ Play'; cancelAnimationFrame(raf); });
    video.addEventListener('ended', () => { if (play) play.textContent = '▶ Play'; });
    video.addEventListener('error', () => { if (error) error.hidden = false; });
    video.addEventListener('seeked', () => {
      if (keyMode && Number.isFinite(start) && video.currentTime < start - 0.1) video.currentTime = start;
    });

    if (play) play.addEventListener('click', () => {
      if (video.paused) {
        if (keyMode && Number.isFinite(start) && Number.isFinite(end) && (video.currentTime >= end || video.currentTime < start)) seek(start);
        startPlaying();
      } else video.pause();
    });
    if (key) key.addEventListener('click', () => {
      if (!Number.isFinite(start) || !Number.isFinite(end)) return;
      keyMode = true;
      loopOn = true;
      updateMode();
      seek(start);
      startPlaying();
    });
    if (full) full.addEventListener('click', () => {
      keyMode = false;
      updateMode();
      seek(0);
      startPlaying();
    });
    if (loop) loop.addEventListener('click', () => { loopOn = !loopOn; updateMode(); });
    if (speed) speed.addEventListener('change', e => { video.playbackRate = Number(e.target.value); });

    const step = direction => {
      video.pause();
      const low = keyMode && Number.isFinite(start) ? start : 0;
      const high = keyMode && Number.isFinite(end) ? end : (Number.isFinite(video.duration) ? video.duration : 0);
      const next = (Number.isFinite(video.currentTime) ? video.currentTime : 0) + direction / 30;
      video.currentTime = Math.max(low, Math.min(high || next, next));
    };
    if (back) back.addEventListener('click', () => step(-1));
    if (forward) forward.addEventListener('click', () => step(1));
    updateMode();
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) return;
    players.forEach(box => {
      const video = box.querySelector('video');
      if (video) video.pause();
    });
  });

  window.mountPlayers = mountPlayers;
  window.releasePlayers = releasePlayers;
})();
