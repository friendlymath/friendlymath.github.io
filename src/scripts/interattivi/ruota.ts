import { movimentoRidotto } from '../../lib/studio';
/** Una ruota che rotola: dopo un giro ha percorso π volte il diametro. */
import { linguaPagina } from '../../lib/lingua';
const T = (it: string, en: string) => (linguaPagina() === 'en' ? en : it);
const LOC = () => (linguaPagina() === 'en' ? 'en-GB' : 'it-IT');
export function monta(area: HTMLElement) {
  area.innerHTML = `<div class="ru"><svg viewBox="0 0 440 170" data-svg role="img" aria-label="${T('Una ruota di diametro 1 rotola e srotola la sua circonferenza', 'A wheel with diameter 1 rolls and unrolls its circumference')}"></svg>
    <div class="com-ru"><button type="button" class="btn" data-via>▶ ${T('Fai rotolare', 'Roll it')}</button><button type="button" class="btn vuoto" data-reset>↺</button></div>
    <p class="esito-ru" aria-live="polite" data-esito>${T('Diametro = 1. Quanta strada farà in un giro?', 'Diameter = 1. How far will it travel in one turn?')}</p></div>`;
  const st = document.createElement('style');
  st.textContent = `.ru svg{width:100%;display:block;background:var(--superficie-2);border-radius:12px}.com-ru{display:flex;gap:.4rem;margin:.5rem 0}.esito-ru{font-weight:800;text-align:center}`;
  area.appendChild(st);
  const U = 100, r = U / 2, x0 = 30, yS = 140;
  let t = 0, anim = 0;
  const disegna = () => {
    const ang = t * 2 * Math.PI, cx = x0 + r + t * Math.PI * U;
    const px = cx - r * Math.sin(ang), py = yS - r - r * Math.cos(ang) * -1;
    let tacche = '';
    for (let k = 0; k <= 3; k++) tacche += `<line x1="${x0 + k * U + r}" y1="${yS}" x2="${x0 + k * U + r}" y2="${yS + 10}" stroke="var(--testo)" stroke-width="2"/><text x="${x0 + k * U + r}" y="${yS + 24}" text-anchor="middle" font-size="12" font-weight="800" fill="var(--testo)">${k}</text>`;
    area.querySelector('[data-svg]')!.innerHTML = `
      <line x1="0" y1="${yS}" x2="440" y2="${yS}" stroke="var(--testo-tenue)" stroke-width="3"/>${tacche}
      <line x1="${x0 + r}" y1="${yS}" x2="${cx}" y2="${yS}" stroke="var(--pericolo)" stroke-width="6" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${yS - r}" r="${r}" fill="var(--fiducia-chiaro)" stroke="var(--fiducia)" stroke-width="4"/>
      <line x1="${cx - r * Math.cos(-ang)}" y1="${yS - r - r * Math.sin(-ang)}" x2="${cx + r * Math.cos(-ang)}" y2="${yS - r + r * Math.sin(-ang)}" stroke="var(--fiducia)" stroke-width="2"/>
      <circle cx="${px}" cy="${py}" r="7" fill="var(--pericolo)"/>`;
    if (t >= 1) area.querySelector('[data-esito]')!.innerHTML = T('🎉 Un giro completo = <b>π ≈ 3,14</b> diametri. La linea rossa è la circonferenza «srotolata».', '🎉 One full turn = <b>π ≈ 3.14</b> diameters. The red line is the “unrolled” circumference.');
  };
  const via = () => {
    cancelAnimationFrame(anim);
    if (movimentoRidotto()) { t = 1; disegna(); return; }
    const inizio = performance.now();
    const passo = (ora: number) => { t = Math.min(1, (ora - inizio) / 3000); disegna(); if (t < 1) anim = requestAnimationFrame(passo); };
    anim = requestAnimationFrame(passo);
  };
  area.querySelector('[data-via]')!.addEventListener('click', () => { t = 0; via(); });
  area.querySelector('[data-reset]')!.addEventListener('click', () => { cancelAnimationFrame(anim); t = 0; area.querySelector('[data-esito]')!.textContent = T('Diametro = 1. Quanta strada farà in un giro?', 'Diameter = 1. How far will it travel in one turn?'); disegna(); });
  disegna();
}
