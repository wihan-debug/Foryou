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
  { file: 'my safe place.jpeg',   caption: 'my safe place' },
  { file: 'little moments.jpeg',  caption: 'little moments' },
  { file: 'favorite night.jpeg',  caption: 'favorite nights' },
  { file: 'home is you.jpeg',     caption: 'home is you' },
  { file: 'my happiness.jpeg',    caption: 'my happiness' },
  { file: 'my whole world.jpeg',  caption: 'my whole world' },
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

function launchConfetti(colors, originX, originY) {
  const cols = colors || CONFETTI_COLORS;
  const ox = originX != null ? originX : null;
  const oy = originY != null ? originY : null;
  for (let i = 0; i < 90; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = ox != null
      ? (ox + (Math.random() - 0.5) * 60) + 'px'
      : Math.random() * 100 + 'vw';
    el.style.top  = oy != null ? oy + 'px' : '-10px';
    el.style.background = cols[Math.floor(Math.random() * cols.length)];
    el.style.animationDelay    = (Math.random() * 0.6) + 's';
    el.style.animationDuration = (1.0 + Math.random() * 1.4) + 's';
    el.style.width  = (5 + Math.random() * 9) + 'px';
    el.style.height = (5 + Math.random() * 9) + 'px';
    el.style.borderRadius = Math.random() > 0.4 ? '50%' : '2px';
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

/* ───────────────────────────────────
   🥚 EASTER EGGS — Hidden Love Bombs
   7 secret spots, each one unique
─────────────────────────────────── */
const EGGS = [
  {
    id: 'egg-flower',
    emoji: '🌸',
    heading: 'I love you.',
    body: 'No reason needed.\nJust because you are you.',
    colors: ['#C8294A','#F9C8D4','#fff','#FADADD'],
    style: 'rose',
  },
  {
    id: 'egg-star',
    emoji: '⭐',
    heading: 'I love you.',
    body: 'Across every star and galaxy.\nYou are my favorite sky.',
    colors: ['#F0C060','#D4943A','#fff','#FDE9C3'],
    style: 'gold',
  },
  {
    id: 'egg-forever',
    emoji: '💫',
    heading: 'I love you',
    body: 'beyond every forever\nthat has ever been written.',
    colors: ['#D4943A','#F0C060','#fff','#FDE9C3'],
    style: 'gold',
  },
  {
    id: 'egg-guitar',
    emoji: '🎵',
    heading: 'I love you',
    body: 'in every song,\nin every silence between the notes.',
    colors: ['#9B1B30','#C8294A','#F9C8D4','#fff'],
    style: 'dark',
  },
  {
    id: 'egg-balloon',
    emoji: '🎈',
    heading: 'I still love you.',
    body: 'Higher than the clouds,\ndeeper than the sea.',
    colors: ['#E8657A','#F9DDB8','#fff'],
    style: 'rose',
  },
  {
    id: 'egg-memories',
    emoji: '📸',
    heading: 'I still love you.',
    body: 'In every photo.\nIn every moment\nwe haven\'t taken yet.',
    colors: ['#C8294A','#F0C060','#fff','#F9DDB8'],
    style: 'warm',
  },
  {
    id: 'egg-bear',
    emoji: '🐻',
    heading: 'I still love you.',
    body: 'More than yesterday.\nLess than tomorrow.\nAlways.',
    colors: ['#D4943A','#C8294A','#FDE9C3','#fff'],
    style: 'warm',
  },
  {
    id: 'egg-polaroid',
    emoji: '♾️',
    heading: 'I still love you.',
    body: 'You are my safe place,\nmy home,\nmy whole world.',
    colors: ['#C8294A','#F9C8D4','#D4943A','#fff'],
    style: 'rose',
  },
  {
    id: 'egg-rose',
    emoji: '🌹',
    heading: 'I will always love you.',
    body: 'In every life.\nIn every world.\nIn every version of forever.\n\nAlways.',
    colors: ['#9B1B30','#C8294A','#D4943A','#F0C060','#fff'],
    style: 'grand',
  },
  {
    id: 'egg-star2',
    emoji: '✨',
    heading: 'I will always love you.',
    body: 'Until all the stars run out of light.',
    colors: ['#F0C060','#D4943A','#fff'],
    style: 'gold',
  }
];

let activeEgg = null;

function showEgg(eggId, originEl) {
  if (activeEgg) return; // only one at a time
  const egg = EGGS.find(e => e.id === eggId);
  if (!egg) return;

  // Confetti burst from element position
  if (originEl) {
    const r = originEl.getBoundingClientRect();
    launchConfetti(egg.colors, r.left + r.width / 2, r.top + r.height / 2);
  } else {
    launchConfetti(egg.colors);
  }

  // Build toast
  const toast = document.createElement('div');
  toast.className = `egg-toast egg-${egg.style}`;
  toast.setAttribute('role', 'dialog');
  toast.setAttribute('aria-modal', 'true');

  toast.innerHTML = `
    <div class="egg-inner">
      <div class="egg-emoji">${egg.emoji}</div>
      <div class="egg-heading">${egg.heading}</div>
      <div class="egg-body">${egg.body.replace(/\n/g, '<br>')}</div>
      <button class="egg-close" aria-label="Close">✕</button>
    </div>
  `;

  document.body.appendChild(toast);
  activeEgg = toast;

  // Auto-dismiss after 5.5s, or on tap
  const dismiss = () => {
    toast.classList.add('egg-out');
    toast.addEventListener('animationend', () => {
      toast.remove();
      activeEgg = null;
    }, { once: true });
  };

  toast.querySelector('.egg-close').addEventListener('click', dismiss);
  toast.addEventListener('click', e => {
    if (e.target === toast || e.target.classList.contains('egg-inner')) dismiss();
  });
  setTimeout(dismiss, 5500);

  // Animate in
  requestAnimationFrame(() => toast.classList.add('egg-in'));
}

function initEasterEggs() {
  // Map element IDs / selectors to egg IDs
  const targets = [
    { selector: '.env-deco-1',      egg: 'egg-flower'   },
    { selector: '.env-deco-2',      egg: 'egg-star'     },
    { selector: '#lt-forever',      egg: 'egg-forever'  },
    { selector: '.tv-guitar',       egg: 'egg-guitar'   },
    { selector: '.sh-b1',           egg: 'egg-balloon'  },
    { selector: '.memories-title',  egg: 'egg-memories' },
    { selector: '.ear-l',           egg: 'egg-bear'     },
    { selector: '.fd1',             egg: 'egg-rose'     },
    { selector: '.fd2',             egg: 'egg-star2'    },
  ];

  targets.forEach(({ selector, egg }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.style.cursor = 'pointer';
    el.addEventListener('click', e => {
      e.stopPropagation();
      showEgg(egg, el);
    });
  });

  // Polaroid Easter egg — triggered on 3rd card ("favorite nights")
  window._polaroidEggPending = true;
}


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

    // Polaroid Easter egg — on 3rd card ("favorite nights" = index 2)
    if (i === 2 && window._polaroidEggPending) {
      card.addEventListener('click', e => {
        e.stopPropagation();
        showEgg('egg-polaroid', card);
      }, { once: true });
    }

    // Swipe-away on click (keep this after the egg listener)
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
  initEasterEggs();
});

// Load YouTube IFrame API for postMessage control
(function loadYTApi() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
})();
