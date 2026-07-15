/* ============================================================
   FISIO VALEE — Interacciones
   Scroll mantequilla (Lenis + GSAP), reveals y fondo suave animado.
   ============================================================ */

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('nav-active'));
    document.querySelectorAll('.nav-links a').forEach(a =>
        a.addEventListener('click', () => nav.classList.remove('nav-active')));
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== FONDO SUAVE: orbes difuminados + pétalos flotantes ===== */
if (!reducedMotion) (function () {
    const cv = document.getElementById('canvas-soft');
    if (!cv) return;
    const cx = cv.getContext('2d');
    let W, H, orbs, motes;

    function init() {
        W = cv.width = window.innerWidth;
        H = cv.height = window.innerHeight;

        // Orbes grandes y difusos que respiran (verde salvia / teal / rosa)
        const palette = [
            [111, 179, 163],  // teal claro
            [168, 195, 184],  // salvia
            [217, 165, 160],  // rosa
        ];
        orbs = Array.from({ length: 5 }, (_, i) => ({
            x: Math.random() * W, y: Math.random() * H,
            r: 160 + Math.random() * 180,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.12,
            color: palette[i % palette.length],
            phase: Math.random() * Math.PI * 2,
        }));

        // Motas pequeñas que flotan hacia arriba (como polen / calma)
        const count = W < 700 ? 18 : 36;
        motes = Array.from({ length: count }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            r: 1 + Math.random() * 2.4,
            vy: 0.15 + Math.random() * 0.35,
            drift: Math.random() * Math.PI * 2,
            alpha: 0.15 + Math.random() * 0.3,
        }));
    }
    init();
    window.addEventListener('resize', () => { if (window.innerWidth !== W) init(); else { H = cv.height = window.innerHeight; } }, { passive: true });

    let t = 0;
    function frame() {
        cx.clearRect(0, 0, W, H);

        // Orbes difusos
        for (const o of orbs) {
            o.x += o.vx; o.y += o.vy;
            if (o.x < -o.r) o.x = W + o.r; if (o.x > W + o.r) o.x = -o.r;
            if (o.y < -o.r) o.y = H + o.r; if (o.y > H + o.r) o.y = -o.r;

            const breathe = 1 + Math.sin(t * 0.008 + o.phase) * 0.12;
            const r = o.r * breathe;
            const [cr, cg, cb] = o.color;
            const g = cx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
            g.addColorStop(0, `rgba(${cr},${cg},${cb},0.10)`);
            g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
            cx.fillStyle = g;
            cx.fillRect(o.x - r, o.y - r, r * 2, r * 2);
        }

        // Motas flotantes
        for (const m of motes) {
            m.y -= m.vy;
            m.x += Math.sin(t * 0.01 + m.drift) * 0.25;
            if (m.y < -10) { m.y = H + 10; m.x = Math.random() * W; }

            cx.beginPath();
            cx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
            cx.fillStyle = `rgba(74,143,128,${m.alpha})`;
            cx.fill();
        }

        t++;
        requestAnimationFrame(frame);
    }
    frame();
})();

/* ===== SCROLL MANTEQUILLA: Lenis + GSAP ===== */
if (window.Lenis && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.2 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    // Anclas suaves
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -72 }); }
        });
    });

    // Barra de progreso
    gsap.to('#scroll-progress', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
    });

    // Reveals escalonados
    ScrollTrigger.batch('.reveal', {
        start: 'top 85%', once: true,
        onEnter: batch => batch.forEach((el, i) => gsap.delayedCall(i * 0.1, () => el.classList.add('visible')))
    });

    // Parallax sutil del retrato
    if (!reducedMotion) {
        gsap.to('.hero-visual', {
            y: 60, ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 }
        });
    }
} else {
    // Fallback sin librerías
    const obs = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
