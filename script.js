/* ═══════════════════════════════════════════════
   Namira Haris — Portfolio · v2
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initPenCursor();
  initNav();
  initTypewriter();
  initReveal();
  initFilters();
  initVideoCards();
  initAudioPlayers();
  initBackTop();
  initMagnetic();
  initContact();
});

/* ── Pen cursor ── */
function initPenCursor() {
  const pen  = document.getElementById('cursorPen');
  const ring = document.getElementById('cursorRing');
  if (!pen || !ring) return;

  let mx = 0, my = 0;  // actual mouse
  let rx = 0, ry = 0;  // ring (lagged)

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    // Pen tip is at (1,1) of the SVG — offset by 1px so tip = cursor
    pen.style.left = mx + 'px';
    pen.style.top  = my + 'px';
  });

  // Ring follows with smooth lag
  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.addEventListener('mousedown', () => ring.classList.add('click'));
  document.addEventListener('mouseup',   () => ring.classList.remove('click'));

  // Grow ring on interactive elements
  const hoverTargets = 'a, button, .filter-btn, .project-card, .contact-item, .magnetic, .card-video-trigger';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  document.addEventListener('mouseleave', () => {
    pen.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    pen.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

/* ── Sticky nav ── */
function initNav() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── Typewriter ── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Multimedia journalist.',
    'Interactive storyteller.',
    'Data-driven reporter.',
    'Digital narrative designer.',
    'Award-winning journalist.',
    'Senior Editor, Storybench.',
  ];

  let pi = 0, ci = 0, deleting = false, pause = 0;

  function tick() {
    const phrase = phrases[pi];
    if (deleting) {
      ci--;
      el.textContent = phrase.slice(0, ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; pause = 380; }
    } else {
      ci++;
      el.textContent = phrase.slice(0, ci);
      if (ci === phrase.length) { deleting = true; pause = 1800; }
    }
    setTimeout(tick, pause || (deleting ? 42 : 72));
    pause = 0;
  }

  setTimeout(tick, 900);
}

/* ── Scroll reveal ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal-up');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // Stagger siblings in same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal-up:not(.in-view)')];
      const idx = Math.max(0, siblings.indexOf(entry.target));
      setTimeout(() => entry.target.classList.add('in-view'), Math.min(idx * 75, 300));
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ── Project filters ── */
function initFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  const count = document.getElementById('projectCount');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !show);
        if (show) {
          card.classList.remove('in-view');
          setTimeout(() => card.classList.add('in-view'), 60);
          visible++;
        }
      });

      if (count) count.textContent = visible + ' piece' + (visible !== 1 ? 's' : '');

      // Fix large-card span when not in web/all
      const largeCard = document.querySelector('.card-large');
      if (largeCard) {
        largeCard.style.gridColumn = (filter === 'all' || filter === 'web') ? '' : '1';
      }
    });
  });
}

/* ── Video modal ── */
function initVideoCards() {
  const modal    = document.getElementById('videoModal');
  const backdrop = document.getElementById('videoBackdrop');
  const closeBtn = document.getElementById('videoClose');
  const iframe   = document.getElementById('videoIframe');
  const titleEl  = document.getElementById('videoTitle');
  if (!modal) return;

  document.querySelectorAll('.card-video-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      iframe.src = trigger.dataset.iframe;
      if (titleEl) titleEl.textContent = trigger.dataset.title;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => {
    modal.classList.remove('open');
    setTimeout(() => { iframe.src = ''; }, 400);
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
}

/* ── Audio players ── */
function initAudioPlayers() {
  document.querySelectorAll('.audio-play-btn').forEach(btn => {
    const src    = btn.dataset.audio;
    const waveId = btn.id.replace('audioBtn', 'waveform');
    const wave   = document.getElementById(waveId);
    let audio    = null;
    let playing  = false;

    const pause = () => {
      audio?.pause();
      playing = false;
      btn.classList.remove('playing');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
      wave?.classList.remove('playing');
    };

    btn.addEventListener('click', () => {
      if (!audio) {
        audio = new Audio(src);
        audio.addEventListener('ended', pause);
      }
      if (playing) {
        pause();
      } else {
        document.querySelectorAll('.audio-play-btn.playing').forEach(b => b.click());
        audio.play();
        playing = true;
        btn.classList.add('playing');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
        wave?.classList.add('playing');
      }
    });
  });
}

/* ── Back to top ── */
function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Magnetic buttons ── */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s var(--ease-out)';
      setTimeout(() => { el.style.transition = ''; }, 400);
    });
  });
}

/* ── Contact scroll ── */
function initContact() {
  document.getElementById('openContact')?.addEventListener('click', () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  });
}
