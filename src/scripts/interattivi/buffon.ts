/** Ago di Buffon: lancia aghi su un pavimento a righe e stima π. Aghi lunghi quanto la distanza fra le righe (l = t). */
const it = (x: number, d: number) => x.toLocaleString('it-IT', { minimumFractionDigits: d, maximumFractionDigits: d });

export function monta(area: HTMLElement) {
  area.innerHTML = `
    <canvas width="640" height="400" style="width:100%;height:auto;border-radius:12px;background:var(--superficie-2)" aria-label="Pavimento con righe parallele su cui cadono gli aghi"></canvas>
    <div class="comandi" style="display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;margin-top:.6rem">
      <button type="button" class="btn" data-n="1">Lancia 1 ago</button>
      <button type="button" class="btn" data-n="100">Lancia 100</button>
      <button type="button" class="btn gioco" data-n="1000">Lancia 1000</button>
      <button type="button" class="btn vuoto" data-reset>Pulisci</button>
    </div>
    <p aria-live="polite" data-stima style="text-align:center;font-weight:800;margin:.6rem 0 0"></p>`;
  const cv = area.querySelector('canvas')!;
  const ctx = cv.getContext('2d')!;
  const t = 80; // distanza tra le righe (px), uguale alla lunghezza dell'ago
  const l = 80;
  let lanci = 0, incroci = 0;
  const css = getComputedStyle(document.documentElement);
  const colore = (v: string) => css.getPropertyValue(v).trim();
  const righe = () => {
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.strokeStyle = colore('--fiducia'); ctx.lineWidth = 3;
    for (let y = 0; y <= cv.height; y += t) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cv.width, y); ctx.stroke(); }
  };
  const stima = () => {
    const el = area.querySelector('[data-stima]')!;
    if (!incroci) { el.textContent = `Lanci: ${lanci}. Nessun incrocio ancora.`; return; }
    const pi = (2 * l * lanci) / (t * incroci);
    el.textContent = `Lanci: ${lanci} · incroci: ${incroci} · stima di π ≈ ${it(pi, 4)} (π vero ≈ 3,1416)`;
  };
  const lancia = (n: number) => {
    ctx.lineWidth = 1.5;
    for (let i = 0; i < n; i++) {
      const cx = Math.random() * cv.width, cy = Math.random() * cv.height;
      const a = Math.random() * Math.PI;
      const dx = (l / 2) * Math.cos(a), dy = (l / 2) * Math.sin(a);
      const y1 = cy - dy, y2 = cy + dy;
      const incrocia = Math.floor(y1 / t) !== Math.floor(y2 / t);
      lanci++; if (incrocia) incroci++;
      ctx.strokeStyle = incrocia ? colore('--gioco') : colore('--testo-tenue');
      ctx.globalAlpha = n > 100 ? .35 : .9;
      ctx.beginPath(); ctx.moveTo(cx - dx, y1); ctx.lineTo(cx + dx, y2); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    stima();
  };
  area.querySelectorAll<HTMLButtonElement>('[data-n]').forEach((b) => b.addEventListener('click', () => lancia(Number(b.dataset.n))));
  area.querySelector('[data-reset]')!.addEventListener('click', () => { lanci = 0; incroci = 0; righe(); stima(); });
  righe(); stima();
}
