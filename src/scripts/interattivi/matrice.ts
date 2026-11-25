import { movimentoRidotto } from '../../lib/studio';
/** Una matrice 2×2 come trasformazione del piano: la griglia si deforma con continuità. */
import { linguaPagina } from '../../lib/lingua';
export function monta(area: HTMLElement) {
  const EN = linguaPagina() === 'en';
  const preset: Record<string, number[]> = EN
    ? { 'Identity': [1, 0, 0, 1], 'Rotation 90°': [0, -1, 1, 0], 'Shear': [1, 1, 0, 1], 'Scale ×2': [2, 0, 0, 2], 'Reflection': [-1, 0, 0, 1], 'Squash': [1.5, 0, 0, 0.5] }
    : { 'Identità': [1, 0, 0, 1], 'Rotazione 90°': [0, -1, 1, 0], 'Taglio': [1, 1, 0, 1], 'Ingrandimento ×2': [2, 0, 0, 2], 'Riflessione': [-1, 0, 0, 1], 'Schiacciamento': [1.5, 0, 0, 0.5] };
  let M = [1, 1, 0, 1], cur = [1, 0, 0, 1], anim = 0;
  area.innerHTML = `<div class="mx"><div class="preset" role="group">${Object.keys(preset).map((k) => `<button type="button" class="btn vuoto" data-p="${k}">${k}</button>`).join('')}</div>
    <canvas width="520" height="400" aria-label="${EN ? 'Grid of the plane transformed by the matrix' : 'Griglia del piano trasformata dalla matrice'}"></canvas>
    <p class="esito-mx" aria-live="polite" data-esito></p></div>`;
  const st = document.createElement('style');
  st.textContent = `.preset{display:flex;flex-wrap:wrap;gap:.35rem}.preset .btn{padding:.4em .8em;font-size:.9rem}.mx canvas{width:100%;max-width:560px;height:auto;display:block;margin:.6rem auto;background:#141826;border-radius:14px}.esito-mx{text-align:center;font-weight:800;font-family:ui-monospace,monospace}`;
  area.appendChild(st);
  const cv = area.querySelector('canvas')!, ctx = cv.getContext('2d')!;
  const S = 40, O = [260, 200];
  const T = (m: number[], x: number, y: number) => [O[0] + (m[0] * x + m[1] * y) * S, O[1] - (m[2] * x + m[3] * y) * S];
  const disegna = () => {
    ctx.fillStyle = '#141826'; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.strokeStyle = 'rgba(255,255,255,.08)';
    for (let k = -8; k <= 8; k++) { ctx.beginPath(); ctx.moveTo(O[0] + k * S, 0); ctx.lineTo(O[0] + k * S, 400); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, O[1] + k * S); ctx.lineTo(520, O[1] + k * S); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(143,180,255,.55)'; ctx.lineWidth = 1.5;
    for (let k = -8; k <= 8; k++) {
      let [a, b] = T(cur, k, -8), [c, d] = T(cur, k, 8); ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke();
      [a, b] = T(cur, -8, k); [c, d] = T(cur, 8, k); ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke();
    }
    const [ux, uy] = T(cur, 1, 1); const [ax, ay] = T(cur, 1, 0); const [bx, by] = T(cur, 0, 1);
    ctx.fillStyle = 'rgba(255,214,107,.25)'; ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.lineTo(ax, ay); ctx.lineTo(ux, uy); ctx.lineTo(bx, by); ctx.closePath(); ctx.fill();
    const freccia = (x: number, y: number, col: string) => { ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.lineTo(x, y); ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill(); };
    freccia(ax, ay, '#5fd39a'); freccia(bx, by, '#ff8080');
    const det = cur[0] * cur[3] - cur[1] * cur[2];
    area.querySelector('[data-esito]')!.textContent = `[ ${cur[0].toFixed(1)}  ${cur[1].toFixed(1)} ; ${cur[2].toFixed(1)}  ${cur[3].toFixed(1)} ]   area ×${det.toFixed(2)}`.replace(/\./g, EN ? '.' : ',');
  };
  const vaiA = (m: number[]) => {
    cancelAnimationFrame(anim);
    const da = [...cur], t0 = performance.now(), dur = movimentoRidotto() ? 1 : 900;
    const passo = (ora: number) => {
      const s = Math.min(1, (ora - t0) / dur), e = s < .5 ? 2 * s * s : 1 - (-2 * s + 2) ** 2 / 2;
      cur = da.map((v, i) => v + (m[i] - v) * e); disegna();
      if (s < 1) anim = requestAnimationFrame(passo);
    };
    anim = requestAnimationFrame(passo);
  };
  area.querySelectorAll<HTMLButtonElement>('[data-p]').forEach((b) => b.addEventListener('click', () => { M = preset[b.dataset.p!]; vaiA(M); }));
  disegna();
  setTimeout(() => vaiA(M), 400);
}
