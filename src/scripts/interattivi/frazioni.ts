/** Frazioni equivalenti: la stessa barretta tagliata in parti diverse. */
import { linguaPagina } from '../../lib/lingua';
const T = (it: string, en: string) => (linguaPagina() === 'en' ? en : it);
const LOC = () => (linguaPagina() === 'en' ? 'en-GB' : 'it-IT');
export function monta(area: HTMLElement) {
  area.innerHTML = `
    <div class="fraz">
      <label>${T('Numeratore', 'Numerator')} <input type="range" min="1" max="12" value="1" data-n></label>
      <label>${T('Denominatore', 'Denominator')} <input type="range" min="1" max="12" value="2" data-d></label>
      <div class="barra" data-barra aria-hidden="true"></div>
      <p class="valore" aria-live="polite" data-valore></p>
      <p class="tenue">${T('Trova altre frazioni che riempiono <b>esattamente la stessa parte</b> della barretta di sopra:', 'Find other fractions that fill <b>exactly the same part</b> of the bar above:')}</p>
      <div class="barra rif" data-rif aria-hidden="true"></div>
      <p class="tenue">${T('Riferimento', 'Reference')}: <b>1/2</b>. <button type="button" class="btn vuoto" data-cambia>${T('Cambia riferimento', 'Change reference')}</button></p>
    </div>`;
  const st = document.createElement('style');
  st.textContent = `.fraz label{display:flex;gap:.6rem;align-items:center;font-weight:700;margin:.3rem 0}.fraz input{flex:1}
  .fraz .barra{display:flex;height:48px;border-radius:10px;overflow:hidden;border:3px solid var(--testo);margin:.6rem 0}
  .fraz .barra span{flex:1;border-right:2px solid var(--testo);transition:background .2s}.fraz .barra span:last-child{border-right:0}
  .fraz .barra span.on{background:var(--gioco)}.fraz .rif span.on{background:var(--fiducia)}
  .fraz .valore{font-size:1.3rem;font-weight:800;text-align:center;margin:.3rem 0}`;
  area.appendChild(st);
  const riferimenti = [[1, 2], [1, 3], [2, 3], [3, 4], [2, 5]];
  let r = 0;
  const n = area.querySelector<HTMLInputElement>('[data-n]')!, d = area.querySelector<HTMLInputElement>('[data-d]')!;
  const disegnaBarra = (el: HTMLElement, num: number, den: number) => {
    el.innerHTML = Array.from({ length: den }, (_, i) => `<span class="${i < num ? 'on' : ''}"></span>`).join('');
  };
  const mcd = (a: number, b: number): number => (b ? mcd(b, a % b) : a);
  const aggiorna = () => {
    let num = Number(n.value), den = Number(d.value);
    if (num > den) { num = den; n.value = String(den); }
    const [rn, rd] = riferimenti[r];
    disegnaBarra(area.querySelector('[data-barra]')!, num, den);
    disegnaBarra(area.querySelector('[data-rif]')!, rn, rd);
    const uguale = num * rd === rn * den;
    const g = mcd(num, den);
    area.querySelector('[data-valore]')!.innerHTML = `${num}/${den} ${uguale ? `= ${rn}/${rd} 🎉 ${T('equivalenti!', 'equivalent!')}` : `≠ ${rn}/${rd}`}${g > 1 ? ` <span class="tenue">(${T('semplificata', 'simplified')}: ${num / g}/${den / g})</span>` : ''}`;
    area.querySelectorAll('p.tenue b')[1].textContent = `${rn}/${rd}`;
  };
  n.addEventListener('input', aggiorna); d.addEventListener('input', aggiorna);
  area.querySelector('[data-cambia]')!.addEventListener('click', () => { r = (r + 1) % riferimenti.length; aggiorna(); });
  aggiorna();
}
