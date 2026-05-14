/* ============================================================
   Devesh Ruttala — Portfolio v2 · interactions
   ============================================================ */

(() => {
  'use strict';

  const isFine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById('navBurger');
  const menu = document.querySelector('.nav-menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      menu.classList.remove('open');
    }));
  }

  /* ---------- Nav scroll state ---------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Custom cursor ---------- */
  if (isFine && !reduce) {
    const cursor = document.getElementById('cursor');
    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');

    let tx = innerWidth / 2, ty = innerHeight / 2;
    let dx = tx, dy = ty;
    let rx = tx, ry = ty;

    window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });

    const loop = () => {
      dx += (tx - dx) * 0.32;
      dy += (ty - dy) * 0.32;
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.querySelectorAll('[data-cursor]').forEach(el => {
      const mode = el.dataset.cursor;
      el.addEventListener('mouseenter', () => cursor.classList.add(mode));
      el.addEventListener('mouseleave', () => cursor.classList.remove(mode));
    });

    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
  }

  /* ---------- Magnetic buttons ---------- */
  if (isFine && !reduce) {
    document.querySelectorAll('.magnetic').forEach(el => {
      const strength = 0.35;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Reveal lines (hero) ---------- */
  const lines = document.querySelectorAll('.reveal-line');
  if (lines.length) {
    const lineIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          lineIO.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    lines.forEach(l => lineIO.observe(l));
  }

  /* ---------- Reveal generic ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => ro.observe(r));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const co = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseFloat(el.dataset.count);
      const float = target % 1 !== 0;
      const start = performance.now();
      const dur = 1600;
      const step = now => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        const v = target * eased;
        el.textContent = float ? v.toFixed(1) : Math.round(v).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      co.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => co.observe(c));

  /* ---------- Live clocks ---------- */
  const fmt = () => {
    const d = new Date();
    return d.toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata'
    });
  };
  const locTime = document.getElementById('locTime');
  const footTime = document.getElementById('footTime');
  const updateClock = () => {
    const t = fmt();
    if (locTime) locTime.textContent = `Local · ${t} IST`;
    if (footTime) footTime.textContent = `${t} IST`;
  };
  updateClock();
  setInterval(updateClock, 30000);

  /* ---------- Smooth anchor scroll with offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Photo tilt (hero) ---------- */
  if (isFine && !reduce) {
    const photo = document.querySelector('.photo-wrap');
    if (photo) {
      photo.addEventListener('mousemove', e => {
        const r = photo.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        photo.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      photo.addEventListener('mouseleave', () => {
        photo.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
      });
    }
  }
})();
