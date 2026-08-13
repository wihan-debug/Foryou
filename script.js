/* ===================================
   FOR YOU — TikTok Romantic Love Gift
   Script
=================================== */
'use strict';

/* ───────────────────────────────────
   POLAROID DATA
   6 curated photos with their captions
─────────────────────────────────── */
const POLAROIDS = [
  { file: 'IMG-20260705-WA0172.jpeg',  caption: 'my safe place' },
  { file: 'IMG-20260705-WA0165.jpeg',  caption: 'little moments' },
  { file: 'IMG-20260705-WA0167.jpeg',  caption: 'favorite nights' },
  { file: 'IMG-20260705-WA0164.jpeg',  caption: 'home is you' },
  { file: 'IMG-20260705-WA0166.jpeg',  caption: 'my happiness' },
  { file: 'IMG_20260705_140250.jpg',   caption: 'my whole world' },
];

/* ───────────────────────────────────
   PETAL PARTICLES
─────────────────────────────────── */
const PETAL_EMOJIS = ['🌸', '🌹', '❤️', '🌺', '🍀'];

function spawnPetals() {
  const container = document.getElementById('petals-container');
  const count = 22;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (10 + Math.random() * 14) + 's';
    el.style.animationDelay    = (Math.random() * 18) + 's';
    el.style.fontSize           = (0.7 + Math.random() * 0.9) + 'rem';
    container.appendChild(el);
  }
}

/* ───────────────────────────────────
   CONFETTI
─────────────────────────────────── */
const CONFETTI_COLORS = ['#C8294A', '#D4943A', '#F0C060', '#F9DDB8', '#FCE4E8', '#fff'];

function launchConfetti() {
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top  = '-10px';
    el.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    el.style.animationDelay    = (Math.random() * 0.8) + 's';
    el.style.animationDuration = (1.2 + Math.random() * 1.2) + 's';
    el.style.width  = (6 + Math.random() * 8) + 'px';
    el.style.height = (6 + Math.random() * 8) + 'px';
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

/* ───────────────────────────────────
   SLIDE ENGINE
─────────────────────────────────── */
const SLIDES     = [];
const DOTS       = [];
let currentSlide = 0;
let isAnimating  = false;

// Touch/drag state
let touchStartX = 0;
let touchStartY = 0;
let isDragging  = false;

function goToSlide(index, direction) {
  if (isAnimating) return;
  if (index < 0 || index >= SLIDES.length) return;
  if (index === currentSlide) return;

  isAnimating = true;
  const prev = currentSlide;
  currentSlide = index;

  // Set states
  SLIDES[prev].className   = 'slide state-left';
  SLIDES[index].className  = 'slide state-right';

  // Apply background class
  applyBgClass(index);

  // Force reflow so transition fires
  SLIDES[index].offsetHeight;
  SLIDES[index].className = 'slide state-active';

  // Update dots
  DOTS.forEach((d, i) => d.classList.toggle('active', i === index));

  setTimeout(() => { isAnimating = false; }, 550);
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function applyBgClass(index) {
  const bgMap = {
    0: 'bg-scallop',
    1: 'bg-dots',
    2: 'bg-stripe',
    3: 'bg-scallop2',
    4: 'bg-gingham',
  };
  SLIDES.forEach(s => s.classList.remove('bg-scallop', 'bg-dots', 'bg-stripe', 'bg-scallop2', 'bg-gingham'));
  if (bgMap[index]) SLIDES[index].classList.add(bgMap[index]);
}

function initSlides() {
  const container = document.getElementById('slide-container');

  document.querySelectorAll('.slide').forEach((s, i) => {
    SLIDES.push(s);
    // Initial state
    if (i === 0) {
      s.className = 'slide state-active';
      applyBgClass(0);
    } else {
      s.className = 'slide state-right';
    }
  });

  document.querySelectorAll('.dot').forEach((d, i) => {
    DOTS.push(d);
    d.addEventListener('click', () => goToSlide(i));
  });

  // Continue buttons
  document.querySelectorAll('.slide-next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.dataset.next, 10);
      goToSlide(next);
    });
  });

  // Touch/swipe support
  container.addEventListener('touchstart', onTouchStart, { passive: true });
  container.addEventListener('touchend',   onTouchEnd,   { passive: true });

  // Mouse drag support (desktop)
  container.addEventListener('mousedown', onMouseDown);
  container.addEventListener('mouseup',   onMouseUp);
}

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) nextSlide();
    else         prevSlide();
  }
}
function onMouseDown(e) {
  touchStartX = e.clientX;
  isDragging = true;
}
function onMouseUp(e) {
  if (!isDragging) return;
  isDragging = false;
  const dx = e.clientX - touchStartX;
  if (Math.abs(dx) > 60) {
    if (dx < 0) nextSlide();
    else         prevSlide();
  }
}

/* ───────────────────────────────────
   POLAROID GRID
─────────────────────────────────── */
function buildPolaroids() {
  const grid = document.getElementById('polaroid-grid');
  if (!grid) return;

  POLAROIDS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.style.transform = `rotate(${(Math.random() * 6 - 3).toFixed(1)}deg)`;

    const img = document.createElement('img');
    img.className = 'polaroid-photo';
    img.src = p.file;
    img.alt = p.caption;
    img.loading = 'lazy';

    const cap = document.createElement('div');
    cap.className = 'polaroid-caption';
    cap.textContent = p.caption;

    card.appendChild(img);
    card.appendChild(cap);

    // Swipe-away on click
    card.addEventListener('click', () => swipePolaroid(card));

    // Touch swipe on individual card
    let cardTouchX = 0;
    card.addEventListener('touchstart', e => { cardTouchX = e.touches[0].clientX; }, { passive: true });
    card.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - cardTouchX;
      if (Math.abs(dx) > 30) swipePolaroid(card, dx > 0 ? 'right' : 'left');
    }, { passive: true });

    grid.appendChild(card);
  });
}

function swipePolaroid(card, direction = 'left') {
  if (card.dataset.swiped) return;
  card.dataset.swiped = '1';
  card.classList.add(direction === 'right' ? 'swiped-right' : 'swiped-left');
  card.addEventListener('animationend', () => {
    card.style.visibility = 'hidden';
  });
}

/* ───────────────────────────────────
   YOUTUBE TV PLAYER
─────────────────────────────────── */
let ytPlayer = null;
let ytReady  = false;

function onYouTubeIframeAPIReady() {
  ytReady = true;
  // API loaded but we'll use simple postMessage instead for reliability
}

function tvPlay() {
  const iframe = document.getElementById('yt-iframe');
  if (!iframe) return;
  iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}
function tvPause() {
  const iframe = document.getElementById('yt-iframe');
  if (!iframe) return;
  iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
}
function tvRestart() {
  const iframe = document.getElementById('yt-iframe');
  if (!iframe) return;
  iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*');
  iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}

function initTV() {
  let playing = false;

  const playBtn    = document.getElementById('tv-play');
  const restartBtn = document.getElementById('tv-restart');

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (playing) {
        tvPause();
        playBtn.textContent = '▶';
      } else {
        tvPlay();
        playBtn.textContent = '⏸';
      }
      playing = !playing;
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      tvRestart();
      playing = true;
      if (playBtn) playBtn.textContent = '⏸';
    });
  }
}

/* ───────────────────────────────────
   ENVELOPE OPENER
─────────────────────────────────── */
function initEnvelope() {
  const btn      = document.getElementById('env-open-btn');
  const envObj   = document.querySelector('.envelope-obj');
  const screen   = document.getElementById('envelope-screen');
  const slides   = document.getElementById('slide-container');

  function openEnvelope() {
    envObj.classList.add('opened');

    setTimeout(() => {
      screen.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      screen.style.opacity    = '0';
      screen.style.transform  = 'scale(1.08)';
    }, 600);

    setTimeout(() => {
      screen.style.display = 'none';
      slides.style.display = 'block';
      // Trigger slide entrance animation
      SLIDES[0].classList.remove('state-right');
      SLIDES[0].classList.add('state-active');
    }, 1250);
  }

  btn.addEventListener('click', openEnvelope);
  envObj.addEventListener('click', openEnvelope);
}

/* ───────────────────────────────────
   CONFETTI BUTTON
─────────────────────────────────── */
function initConfetti() {
  const btn = document.getElementById('confetti-btn');
  if (btn) btn.addEventListener('click', launchConfetti);
}

/* ───────────────────────────────────
   RESTART BUTTON
─────────────────────────────────── */
function initRestart() {
  const btn = document.getElementById('restart-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    // Fade out and reload
    document.body.style.transition = 'opacity 0.5s';
    document.body.style.opacity    = '0';
    setTimeout(() => location.reload(), 500);
  });
}

/* ───────────────────────────────────
   KEYBOARD NAVIGATION
─────────────────────────────────── */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prevSlide();
  });
}

/* ───────────────────────────────────
   INIT
─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  spawnPetals();
  initSlides();
  buildPolaroids();
  initTV();
  initEnvelope();
  initConfetti();
  initRestart();
  initKeyboard();
});

// Load YouTube IFrame API for postMessage control
(function loadYTApi() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
})();
