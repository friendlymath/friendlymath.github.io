import { movimentoRidotto } from '../lib/studio';

/** Coriandoli di festa: piccola animazione su canvas, saltata se l'utente preferisce meno movimento. */
export function coriandoli(origine?: HTMLElement) {
  if (movimentoRidotto()) return;
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  Object.assign(cv.style, { position: 'fixed', inset: '0', width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: '50' });
  document.body.appendChild(cv);
  const dpr = Math.min(2, devicePixelRatio || 1);
  cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
  const ctx = cv.getContext('2d')!;
  ctx.scale(dpr, dpr);
  const r = origine?.getBoundingClientRect();
  const x0 = r ? r.left + r.width / 2 : innerWidth / 2;
  const y0 = r ? r.top + 20 : innerHeight / 3;
  const colori = ['#ffc93c', '#f07a2c', '#1f9d5c', '#7b5cd6', '#3f7fd8', '#d64545'];
  const simboli = ['+', '×', '=', 'π', '½', '√', '∞'];
  const pezzi = Array.from({ length: 90 }, () => ({
    x: x0, y: y0, vx: (Math.random() - .5) * 12, vy: -Math.random() * 11 - 4,
    g: .32 + Math.random() * .1, a: Math.random() * 6, va: (Math.random() - .5) * .3,
    c: colori[(Math.random() * colori.length) | 0], s: Math.random() < .25 ? simboli[(Math.random() * simboli.length) | 0] : '',
    w: 6 + Math.random() * 6,
  }));
  let t = 0;
  const passo = () => {
    t++;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of pezzi) {
      p.vy += p.g; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += p.va;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c;
      ctx.globalAlpha = Math.max(0, 1 - t / 140);
      if (p.s) { ctx.font = `900 ${p.w * 2.2}px sans-serif`; ctx.fillText(p.s, 0, 0); } else ctx.fillRect(-p.w / 2, -p.w / 4, p.w, p.w / 2);
      ctx.restore();
    }
    if (t < 140) requestAnimationFrame(passo); else cv.remove();
  };
  requestAnimationFrame(passo);
}
