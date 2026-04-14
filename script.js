// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animCursor() {
  cursor.style.transform = `translate(${mx - 7}px, ${my - 7}px)`;
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  ring.style.transform = `translate(${rx}px, ${ry}px)`;
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2)';
    ring.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.opacity = '.5';
  });
});

// ── Scroll Reveal ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const siblings = Array.from(e.target.parentElement.children);
      const index = siblings.indexOf(e.target);
      e.target.style.transitionDelay = `${(index % 3) * 0.1}s`;
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
