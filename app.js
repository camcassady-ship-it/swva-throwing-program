'use strict';
const players = [...document.querySelectorAll('.player')];
players.forEach(box => {
  const video=box.querySelector('video'), play=box.querySelector('.play'), key=box.querySelector('.key'), full=box.querySelector('.full'), loop=box.querySelector('.loop'), mode=box.querySelector('.mode');
  const start=Number(box.dataset.start),end=Number(box.dataset.end);
  let keyMode=false,loopOn=true,raf;
  const updateMode=()=>{video.loop=!keyMode&&loopOn; key.setAttribute('aria-pressed',String(keyMode));loop.setAttribute('aria-pressed',String(loopOn));loop.textContent=`Loop: ${loopOn?'on':'off'}`;mode.textContent=keyMode?`Key move · ${start.toFixed(1)}–${end.toFixed(1)}s`:'Full demonstration';};
  const startPlaying=async()=>{try{await video.play();}catch(e){play.textContent='▶ Tap to play';}};
  const seek=t=>{if(video.readyState>0)video.currentTime=Math.max(0,Math.min(t,video.duration||t));else video.addEventListener('loadedmetadata',()=>{video.currentTime=t;},{once:true});};
  const tick=()=>{if(keyMode&&!video.paused&&video.currentTime>=end){if(loopOn){video.currentTime=start;}else{video.pause();video.currentTime=end;}}if(!video.paused)raf=requestAnimationFrame(tick);};
  video.addEventListener('play',()=>{players.forEach(other=>{if(other!==box)other.querySelector('video').pause();});play.textContent='❚❚ Pause';cancelAnimationFrame(raf);raf=requestAnimationFrame(tick);});
  video.addEventListener('pause',()=>{play.textContent='▶ Play';cancelAnimationFrame(raf);});
  video.addEventListener('ended',()=>{play.textContent='▶ Play';});
  video.addEventListener('error',()=>{box.querySelector('.video-error').hidden=false;});
  video.addEventListener('seeked',()=>{if(keyMode&&video.currentTime<start-0.1)video.currentTime=start;});
  play.addEventListener('click',()=>{if(video.paused){if(keyMode&&(video.currentTime>=end||video.currentTime<start))seek(start);startPlaying();}else video.pause();});
  // Native video controls provide tap-to-play, a timeline, and fullscreen.
  key.addEventListener('click',()=>{keyMode=true;loopOn=true;updateMode();seek(start);startPlaying();});
  full.addEventListener('click',()=>{keyMode=false;updateMode();seek(0);startPlaying();});
  loop.addEventListener('click',()=>{loopOn=!loopOn;updateMode();});
  box.querySelector('select').addEventListener('change',e=>{video.playbackRate=Number(e.target.value);});
  const step=direction=>{video.pause();const low=keyMode?start:0,high=keyMode?end:video.duration||0;video.currentTime=Math.max(low,Math.min(high,video.currentTime+direction/30));};
  box.querySelector('.back').addEventListener('click',()=>step(-1));box.querySelector('.forward').addEventListener('click',()=>step(1));
  updateMode();
});
const marks=[...document.querySelectorAll('.review input')];
let saved=[];try{saved=JSON.parse(localStorage.getItem('swva-reviewed-v1')||'[]');if(!Array.isArray(saved))saved=[];}catch(e){}
marks.forEach(mark=>{mark.checked=saved.includes(mark.dataset.step);mark.addEventListener('change',updateReviews);});
function updateReviews(){const checked=marks.filter(m=>m.checked).map(m=>m.dataset.step);try{localStorage.setItem('swva-reviewed-v1',JSON.stringify(checked));}catch(e){}document.querySelector('.review-total').textContent=`${checked.length} / 7 reviewed`;document.querySelectorAll('.drill-nav a').forEach(a=>a.classList.toggle('done',checked.includes(a.dataset.drill)));}
updateReviews();document.querySelector('#reset').addEventListener('click',()=>{marks.forEach(m=>m.checked=false);updateReviews();});
const navLinks=[...document.querySelectorAll('.drill-nav a')];
const sections=[...document.querySelectorAll('.drill')];
let scrollPending=false;
function updateActive(){const boundary=window.innerWidth<=640?150:170;let active=sections[0];for(const section of sections){if(section.getBoundingClientRect().top<=boundary)active=section;}navLinks.forEach(a=>{const on=a.hash===`#${active.id}`;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});scrollPending=false;}
window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateActive);}},{passive:true});updateActive();
// Do not leave a demonstration playing after the player scrolls to another drill.
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)entry.target.querySelector('video').pause();});},{threshold:0});players.forEach(p=>observer.observe(p));}
// Background tabs should not keep throwing clips playing or drift beyond a key loop.
document.addEventListener('visibilitychange',()=>{if(document.hidden)players.forEach(box=>box.querySelector('video').pause());});
